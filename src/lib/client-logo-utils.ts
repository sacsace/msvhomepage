import { deleteUploadFile } from "@/lib/upload-blob-store";

/** `/uploads/clients/...` 형태만 업로드 로고로 본다 */
export function isStoredClientLogo(src: string | undefined): boolean {
  return Boolean(src?.startsWith("/uploads/clients/"));
}

export async function removeStoredClientLogoFile(src: string | undefined): Promise<void> {
  if (!isStoredClientLogo(src)) return;
  await deleteUploadFile(src);
}
