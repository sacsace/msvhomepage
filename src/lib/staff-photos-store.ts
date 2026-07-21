import { unlinkUploadByPublicPath } from "@/lib/uploads-storage";
import { deleteUploadFile } from "@/lib/upload-blob-store";
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
    await deleteUploadFile(urlPath);
  } else {
    await unlinkUploadByPublicPath(urlPath);
  }
}
