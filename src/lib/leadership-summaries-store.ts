import { prisma } from "@/lib/prisma";
import { withRecoverableDbRead } from "@/lib/prisma-read-fallback";

export type LeadershipSummaryRow = {
  summary: string;
  summaryEn: string;
};

export async function readLeadershipSummaries(): Promise<Record<string, LeadershipSummaryRow>> {
  return withRecoverableDbRead<Record<string, LeadershipSummaryRow>>({}, async () => {
    const rows = await prisma.leadershipSummary.findMany();
    const map: Record<string, LeadershipSummaryRow> = {};
    for (const r of rows) {
      map[r.emailLower] = { summary: r.summary, summaryEn: r.summaryEn ?? "" };
    }
    return map;
  });
}

/**
 * 한·영 소개 중 전달된 필드만 갱신하고, 둘 다 비면 행을 삭제합니다.
 */
export async function upsertLeadershipSummaryMerged(
  email: string,
  patch: { summary?: string; summaryEn?: string },
): Promise<void> {
  const key = email.trim().toLowerCase();
  const existing = await prisma.leadershipSummary.findUnique({ where: { emailLower: key } });
  const nextSummary = patch.summary !== undefined ? patch.summary.trim() : (existing?.summary ?? "");
  const nextEn = patch.summaryEn !== undefined ? patch.summaryEn.trim() : (existing?.summaryEn ?? "");

  if (!nextSummary && !nextEn) {
    await prisma.leadershipSummary.deleteMany({ where: { emailLower: key } });
    return;
  }

  await prisma.leadershipSummary.upsert({
    where: { emailLower: key },
    create: { emailLower: key, summary: nextSummary, summaryEn: nextEn },
    update: { summary: nextSummary, summaryEn: nextEn },
  });
}

export async function removeLeadershipSummary(email: string): Promise<void> {
  const key = email.trim().toLowerCase();
  await prisma.leadershipSummary.deleteMany({ where: { emailLower: key } });
}
