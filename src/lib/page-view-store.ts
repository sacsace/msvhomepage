import { prisma } from "@/lib/prisma";
import { isPrismaErrorCode, withRecoverableDbRead } from "@/lib/prisma-read-fallback";

export type PageViewDailyCount = { readonly date: string; readonly count: number };
export type PageViewPathCount = { readonly path: string; readonly count: number };
/** `sourceKey` 가 빈 문자열이면 직접·리퍼러 없음(같은 사이트 내 이동 등) */
export type PageViewReferrerSourceCount = { readonly sourceKey: string; readonly count: number };

export type PageViewRecentRow = {
  readonly id: string;
  readonly path: string;
  readonly referrer: string | null;
  readonly createdAt: Date;
};

export type AdminPageViewStats = {
  readonly total: number;
  /** 최근 30일(rolling) 조회 수 */
  readonly viewsLast30Days: number;
  readonly last7Days: readonly PageViewDailyCount[];
  readonly topPaths: readonly PageViewPathCount[];
  /** 최근 30일, 리퍼러 호스트(또는 비 HTTP 문자열 앞부분) 기준 */
  readonly topReferrerSources: readonly PageViewReferrerSourceCount[];
  /** 최신 순 상세 로그(최대 50건) */
  readonly recentPageViews: readonly PageViewRecentRow[];
  /** DB 테이블 없음 등으로 집계를 못 했을 때 */
  readonly unavailable: boolean;
};

const emptyStats: AdminPageViewStats = {
  total: 0,
  viewsLast30Days: 0,
  last7Days: [],
  topPaths: [],
  topReferrerSources: [],
  recentPageViews: [],
  unavailable: true,
};

/** 관리자 표에 쓰는 짧은 리퍼러 표시(전체 URL은 API·DB에만 보관) */
export function formatPageViewReferrerDisplay(referrer: string | null | undefined, directLabel: string): string {
  const raw = referrer?.trim();
  if (!raw) return directLabel;
  try {
    const u = new URL(raw);
    const tail = `${u.pathname}${u.search}`;
    const short = tail.length > 56 ? `${tail.slice(0, 53)}…` : tail;
    return short && short !== "/" ? `${u.hostname}${short}` : u.hostname;
  } catch {
    return raw.length > 96 ? `${raw.slice(0, 93)}…` : raw;
  }
}

function dayKeyUtc(d: Date | string): string {
  if (typeof d === "string") return d.slice(0, 10);
  return d.toISOString().slice(0, 10);
}

function fillLast7Days(rows: { d: Date | string; c: bigint }[]): PageViewDailyCount[] {
  const byDay = new Map<string, number>();
  for (const r of rows) {
    const key = dayKeyUtc(r.d);
    byDay.set(key, Number(r.c));
  }
  const out: PageViewDailyCount[] = [];
  const today = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() - i));
    const key = d.toISOString().slice(0, 10);
    out.push({ date: key, count: byDay.get(key) ?? 0 });
  }
  return out;
}

export async function recordSitePageView(path: string, referrer: string | null): Promise<void> {
  const p = path.slice(0, 512);
  const ref = referrer ? referrer.slice(0, 512) : null;
  try {
    await prisma.sitePageView.create({
      data: { path: p, referrer: ref },
    });
  } catch (e: unknown) {
    if (isPrismaErrorCode(e, "P2021")) {
      if (process.env.NODE_ENV === "development") {
        console.warn("[MSV] SitePageView 테이블 없음 — `npx prisma db push` 후 방문 기록이 저장됩니다.");
      }
      return;
    }
    throw e;
  }
}

export async function getAdminPageViewStats(): Promise<AdminPageViewStats> {
  return withRecoverableDbRead(emptyStats, async () => {
    const since7 = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const since30 = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    /** 테이블 없음 시 `Promise.all`은 여러 쿼리가 동시에 실패하며 prisma:error 로그가 겹칠 수 있어 순차 실행 */
    const total = await prisma.sitePageView.count();
    const dailyRows = await prisma.$queryRaw<{ d: Date | string; c: bigint }[]>`
      SELECT ("createdAt" AT TIME ZONE 'UTC')::date AS d, COUNT(*)::bigint AS c
      FROM "SitePageView"
      WHERE "createdAt" >= ${since7}
      GROUP BY 1
      ORDER BY 1 ASC
    `;
    const viewsLast30Days = await prisma.sitePageView.count({
      where: { createdAt: { gte: since30 } },
    });

    const topRows = await prisma.sitePageView.groupBy({
      by: ["path"],
      where: { createdAt: { gte: since30 } },
      _count: { path: true },
      orderBy: { _count: { path: "desc" } },
      take: 20,
    });

    const refRows = await prisma.$queryRaw<{ source_key: string; c: bigint }[]>`
      SELECT
        CASE
          WHEN "referrer" IS NULL OR btrim(CAST("referrer" AS text)) = '' THEN ''
          ELSE COALESCE(
            NULLIF(
              lower(substring(CAST("referrer" AS text) from '^https?://([^/?#]+)')),
              ''
            ),
            left(btrim(CAST("referrer" AS text)), 120)
          )
        END AS source_key,
        COUNT(*)::bigint AS c
      FROM "SitePageView"
      WHERE "createdAt" >= ${since30}
      GROUP BY 1
      ORDER BY c DESC
      LIMIT 20
    `;

    const recentRows = await prisma.sitePageView.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
      select: { id: true, path: true, referrer: true, createdAt: true },
    });

    return {
      total,
      viewsLast30Days,
      last7Days: fillLast7Days(dailyRows),
      topPaths: topRows.map((r) => ({ path: r.path, count: r._count.path })),
      topReferrerSources: refRows.map((r) => ({
        sourceKey: r.source_key,
        count: Number(r.c),
      })),
      recentPageViews: recentRows,
      unavailable: false,
    };
  });
}
