import { prisma } from "@/lib/prisma";
import { withRecoverableDbRead } from "@/lib/prisma-read-fallback";

export async function readPayrollMailerPasswordHash(): Promise<string | null> {
  return withRecoverableDbRead(null, async () => {
    const row = await prisma.payrollMailerAuth.findUnique({ where: { id: 1 } });
    const h = String(row?.passwordHash ?? "").trim();
    return h.length > 12 ? h : null;
  });
}

export async function writePayrollMailerPasswordHash(hash: string): Promise<void> {
  await prisma.payrollMailerAuth.upsert({
    where: { id: 1 },
    create: { id: 1, passwordHash: hash },
    update: { passwordHash: hash },
  });
}
