import fs from "node:fs/promises";
import path from "node:path";
import { prisma } from "@/lib/prisma";
import { withRecoverableDbRead } from "@/lib/prisma-read-fallback";

export async function readStaffPhotos(): Promise<Record<string, string>> {
  return withRecoverableDbRead({}, async () => {
    const rows = await prisma.staffPhoto.findMany();
    const map: Record<string, string> = {};
    for (const r of rows) {
      map[r.emailLower] = r.path;
    }
    return map;
  });
}

async function writeAll(map: Record<string, string>): Promise<void> {
  await prisma.$transaction(async (tx) => {
    await tx.staffPhoto.deleteMany();
    const entries = Object.entries(map);
    if (entries.length) {
      await tx.staffPhoto.createMany({
        data: entries.map(([emailLower, photoPath]) => ({
          emailLower,
          path: photoPath,
        })),
      });
    }
  });
}

export async function writeStaffPhotos(map: Record<string, string>): Promise<void> {
  await writeAll(map);
}

export async function setStaffPhoto(email: string, publicPath: string): Promise<void> {
  const key = email.trim().toLowerCase();
  await prisma.staffPhoto.upsert({
    where: { emailLower: key },
    create: { emailLower: key, path: publicPath },
    update: { path: publicPath },
  });
}

export async function removeStaffPhoto(email: string): Promise<void> {
  const key = email.trim().toLowerCase();
  const row = await prisma.staffPhoto.findUnique({ where: { emailLower: key } });
  await prisma.staffPhoto.deleteMany({ where: { emailLower: key } });
  const urlPath = row?.path;
  if (urlPath?.startsWith("/uploads/")) {
    try {
      const rel = urlPath.replace(/^\//, "");
      const full = path.join(process.cwd(), "public", rel);
      await fs.unlink(full);
    } catch {
      /* 파일 없음 등 무시 */
    }
  }
}
