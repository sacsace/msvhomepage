import { prisma } from "@/lib/prisma";
import { withRecoverableDbRead } from "@/lib/prisma-read-fallback";

export async function readLeadershipSummaries(): Promise<Record<string, string>> {
  return withRecoverableDbRead({}, async () => {
    const rows = await prisma.leadershipSummary.findMany();
    const map: Record<string, string> = {};
    for (const r of rows) {
      map[r.emailLower] = r.summary;
    }
    return map;
  });
}

export async function setLeadershipSummary(email: string, summary: string): Promise<void> {
  const key = email.trim().toLowerCase();
  await prisma.leadershipSummary.upsert({
    where: { emailLower: key },
    create: { emailLower: key, summary: summary.trim() },
    update: { summary: summary.trim() },
  });
}

export async function removeLeadershipSummary(email: string): Promise<void> {
  const key = email.trim().toLowerCase();
  await prisma.leadershipSummary.deleteMany({ where: { emailLower: key } });
}
