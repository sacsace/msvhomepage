import type { StaffProfile } from "@/types/staff-profile";
import { prisma } from "@/lib/prisma";
import { withRecoverableDbRead } from "@/lib/prisma-read-fallback";

function toProfile(row: {
  id: string;
  name: string;
  role: string;
  intro: string;
  email: string | null;
  photoSrc: string | null;
  createdAt: Date;
  updatedAt: Date;
}): StaffProfile {
  return {
    id: row.id,
    name: row.name,
    role: row.role,
    intro: row.intro,
    email: row.email ?? undefined,
    photoSrc: row.photoSrc ?? undefined,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

export async function readStaffProfiles(): Promise<StaffProfile[]> {
  return withRecoverableDbRead([], async () => {
    const rows = await prisma.staffProfile.findMany();
    return rows.map(toProfile);
  });
}

export async function writeStaffProfiles(items: StaffProfile[]): Promise<void> {
  const data = items.map((p) => ({
    id: p.id,
    name: p.name,
    role: p.role,
    intro: p.intro,
    email: p.email ?? null,
    photoSrc: p.photoSrc ?? null,
    createdAt: new Date(p.createdAt),
    updatedAt: new Date(p.updatedAt),
  }));
  await prisma.$transaction(async (tx) => {
    await tx.staffProfile.deleteMany();
    if (data.length) await tx.staffProfile.createMany({ data });
  });
}
