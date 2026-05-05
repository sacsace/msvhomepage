import type { CompanyHistoryEntry } from "@/types/company-history-entry";
import { companyHistory as siteContentFallback } from "@/lib/site-content";
import { prisma } from "@/lib/prisma";
import { withRecoverableDbRead } from "@/lib/prisma-read-fallback";
import { Prisma } from "@prisma-generated";

function isCompanyHistoryTableMissingError(e: unknown): boolean {
  if (e instanceof Prisma.PrismaClientKnownRequestError) {
    if (e.code === "P2021") return true;
  }
  const msg = e instanceof Error ? e.message : String(e);
  return /does not exist in the current database|relation .* does not exist/i.test(msg);
}

export type { CompanyHistoryEntry } from "@/types/company-history-entry";

/** 공개 페이지용 — 시기·내용 (DB에 행이 없으면 site-content 기본 연혁) */
export type CompanyHistoryDisplayRow = { when: string; what: string };

function toEntry(row: {
  id: string;
  sortOrder: number;
  period: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
}): CompanyHistoryEntry {
  return {
    id: row.id,
    sortOrder: row.sortOrder,
    period: row.period,
    body: row.body,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

/** DB 조회 — 테이블 없음과 「빈 테이블」을 구분 */
async function queryCompanyHistoryFromDb(): Promise<
  { status: "missing-table" } | { status: "ok"; rows: CompanyHistoryEntry[] }
> {
  try {
    const rows = await prisma.companyHistoryEntry.findMany({ orderBy: { sortOrder: "asc" } });
    return { status: "ok", rows: rows.map(toEntry) };
  } catch (e: unknown) {
    if (isCompanyHistoryTableMissingError(e)) {
      console.warn(
        "[MSV] CompanyHistoryEntry 테이블이 없습니다. `npx prisma db push`(또는 migrate) 후 다시 시도해 주세요.",
      );
      return { status: "missing-table" };
    }
    throw e;
  }
}

/**
 * 공개 연혁 — 관리자 저장(DB)만 표시합니다.
 * - DB에 행이 있으면: 그 순서·내용
 * - DB가 비어 있고 테이블은 있음: 빈 배열(회사 소개에서 안내 문구)
 * - 테이블이 아직 없음: 배포 전·로컬 편의용 `site-content` 기본 연혁
 */
export async function readCompanyHistoryPublic(): Promise<CompanyHistoryDisplayRow[]> {
  return withRecoverableDbRead(
    siteContentFallback.map((r) => ({ when: r.when, what: r.what })),
    async () => {
      const q = await queryCompanyHistoryFromDb();
      if (q.status === "missing-table") {
        return siteContentFallback.map((r) => ({ when: r.when, what: r.what }));
      }
      if (q.rows.length === 0) {
        return [];
      }
      return q.rows.map((r) => ({ when: r.period, what: r.body }));
    },
  );
}

/** 관리자 초기 폼 — DB에 행이 없으면 site-content를 초안으로(편집 후 저장 시 DB 반영) */
export async function readCompanyHistoryAdminInitial(): Promise<CompanyHistoryEntry[]> {
  return withRecoverableDbRead(
    siteContentFallback.map((r, i) => ({
      id: `draft-${i}`,
      sortOrder: i,
      period: r.when,
      body: r.what,
      createdAt: "",
      updatedAt: "",
    })),
    async () => {
      const q = await queryCompanyHistoryFromDb();
      if (q.status === "missing-table" || q.rows.length === 0) {
        return siteContentFallback.map((r, i) => ({
          id: `draft-${i}`,
          sortOrder: i,
          period: r.when,
          body: r.what,
          createdAt: "",
          updatedAt: "",
        }));
      }
      return q.rows;
    },
  );
}

export async function replaceCompanyHistory(
  items: readonly { period: string; body: string }[],
): Promise<void> {
  const cleaned = items
    .map((r) => ({
      period: String(r.period || "").trim(),
      body: String(r.body || "").trim(),
    }))
    .filter((r) => r.period.length > 0 && r.body.length > 0);

  try {
    await prisma.$transaction(async (tx) => {
      await tx.companyHistoryEntry.deleteMany();
      if (cleaned.length === 0) return;
      await tx.companyHistoryEntry.createMany({
        data: cleaned.map((r, i) => ({
          sortOrder: i,
          period: r.period,
          body: r.body,
        })),
      });
    });
  } catch (e: unknown) {
    if (isCompanyHistoryTableMissingError(e)) {
      throw new Error(
        "연혁 테이블이 아직 없습니다. 프로젝트 루트에서 `npx prisma db push`(또는 migrate)로 스키마를 반영한 뒤 저장해 주세요.",
      );
    }
    throw e;
  }
}
