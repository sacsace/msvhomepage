import { prisma } from "@/lib/prisma";
import { withRecoverableDbRead } from "@/lib/prisma-read-fallback";

export type AdminAuthRecord = {
  loginId: string | null;
  passwordHash: string | null;
};

export async function readAdminAuth(): Promise<AdminAuthRecord> {
  return withRecoverableDbRead({ loginId: null, passwordHash: null }, async () => {
    const row = await prisma.adminAuth.findUnique({ where: { id: 1 } });
    const loginId = String(row?.loginId ?? "").trim();
    const h = String(row?.passwordHash ?? "").trim();
    return {
      loginId: loginId || null,
      passwordHash: h.length > 12 ? h : null,
    };
  });
}

export async function readPasswordHash(): Promise<string | null> {
  const auth = await readAdminAuth();
  return auth.passwordHash;
}

export async function writePasswordHash(hash: string): Promise<void> {
  const existing = await readAdminAuth();
  const loginId = existing.loginId?.trim() || "root";
  await prisma.adminAuth.upsert({
    where: { id: 1 },
    create: { id: 1, loginId, passwordHash: hash },
    update: { passwordHash: hash },
  });
}

export async function writeAdminAuth(loginId: string, passwordHash: string): Promise<void> {
  const id = loginId.trim();
  await prisma.adminAuth.upsert({
    where: { id: 1 },
    create: { id: 1, loginId: id || "root", passwordHash },
    update: { loginId: id || "root", passwordHash },
  });
}
