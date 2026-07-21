import fs from "node:fs";
import path from "node:path";
import { resolveUploadDiskPath } from "@/lib/uploads-storage";
import { uploadBlobExists } from "@/lib/upload-blob-store";

/**
 * 공개 URL에 해당하는 파일이 있는지 (서버에서만 사용).
 * `/uploads/...` 는 디스크 또는 Postgres 백업을 확인합니다.
 */
function stripUrlQueryHash(urlPath: string): string {
  const q = urlPath.indexOf("?");
  const h = urlPath.indexOf("#");
  const end = Math.min(q === -1 ? urlPath.length : q, h === -1 ? urlPath.length : h);
  return urlPath.slice(0, end);
}

export async function publicFileExists(urlPath: string): Promise<boolean> {
  const normalized = stripUrlQueryHash(urlPath.trim());
  if (!normalized.startsWith("/")) return false;
  if (normalized.startsWith("/uploads/")) {
    const disk = resolveUploadDiskPath(normalized);
    if (disk && fs.existsSync(disk)) return true;
    return uploadBlobExists(normalized);
  }
  const rel = normalized.replace(/^\//, "");
  const full = path.join(process.cwd(), "public", rel);
  return fs.existsSync(full);
}
