import { unlinkUploadByPublicPath } from "@/lib/uploads-storage";

export function isStoredClientLogo(src: string | undefined): boolean {
  return Boolean(src?.startsWith("/uploads/clients/"));
}

export async function removeStoredClientLogoFile(src: string | undefined): Promise<void> {
  await unlinkUploadByPublicPath(src);
}
