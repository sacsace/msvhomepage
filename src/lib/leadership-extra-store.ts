import { prisma } from "@/lib/prisma";
import { withRecoverableDbRead } from "@/lib/prisma-read-fallback";

export type LeadershipExtraRow = {
  emailLower: string;
  role: string;
  name: string;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
};

export async function readLeadershipExtras(): Promise<LeadershipExtraRow[]> {
  return withRecoverableDbRead([], async () =>
    prisma.leadershipExtraMember.findMany({
      orderBy: [{ sortOrder: "asc" }, { emailLower: "asc" }],
    }),
  );
}

export async function createLeadershipExtra(input: {
  emailLower: string;
  role: string;
  name: string;
  sortOrder?: number;
}): Promise<void> {
  await prisma.leadershipExtraMember.create({
    data: {
      emailLower: input.emailLower,
      role: input.role.trim(),
      name: input.name.trim(),
      sortOrder: Number.isFinite(input.sortOrder) ? Number(input.sortOrder) : 100,
    },
  });
}

export async function updateLeadershipExtra(
  emailLower: string,
  input: { role?: string; name?: string; sortOrder?: number },
): Promise<void> {
  await prisma.leadershipExtraMember.update({
    where: { emailLower },
    data: {
      ...(input.role !== undefined ? { role: input.role.trim() } : {}),
      ...(input.name !== undefined ? { name: input.name.trim() } : {}),
      ...(input.sortOrder !== undefined ? { sortOrder: input.sortOrder } : {}),
    },
  });
}

export async function deleteLeadershipExtra(emailLower: string): Promise<boolean> {
  const r = await prisma.leadershipExtraMember.deleteMany({ where: { emailLower } });
  return r.count > 0;
}

export async function getLeadershipExtra(emailLower: string): Promise<LeadershipExtraRow | null> {
  return prisma.leadershipExtraMember.findUnique({ where: { emailLower } });
}
