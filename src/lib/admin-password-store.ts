import { prisma } from "@/lib/prisma";
import { withRecoverableDbRead } from "@/lib/prisma-read-fallback";

export async function readPasswordHash(): Promise<string | null> {
  return withRecoverableDbRead(null, async () => {
    const row = await prisma.adminAuth.findUnique({ where: { id: 1 } });
    const h = String(row?.passwordHash ?? "").trim();
    return h.length > 12 ? h : null;
  });
}

export async function writePasswordHash(hash: string): Promise<void> {
  await prisma.adminAuth.upsert({
    where: { id: 1 },
    create: { id: 1, passwordHash: hash },
    update: { passwordHash: hash },
  });
}
