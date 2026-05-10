import { prisma } from "@/lib/prisma";
import { isPrismaErrorCode, withRecoverableDbRead } from "@/lib/prisma-read-fallback";

export type PageViewDailyCount = { readonly date: string; readonly count: number };
export type PageViewPathCount = { readonly path: string; readonly count: number };

export type AdminPageViewStats = {
  readonly total: number;
  readonly last7Days: readonly PageViewDailyCount[];
  readonly topPaths: readonly PageViewPathCount[];
  /** DB 테이블 없음 등으로 집계를 못 했을 때 */
  readonly unavailable: boolean;
};

const emptyStats: AdminPageViewStats = {
  total: 0,
  last7Days: [],
  topPaths: [],
  unavailable: true,
};

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
    const topRows = await prisma.sitePageView.groupBy({
      by: ["path"],
      where: { createdAt: { gte: since30 } },
      _count: { path: true },
      orderBy: { _count: { path: "desc" } },
      take: 12,
    });

    return {
      total,
      last7Days: fillLast7Days(dailyRows),
      topPaths: topRows.map((r) => ({ path: r.path, count: r._count.path })),
      unavailable: false,
    };
  });
}
