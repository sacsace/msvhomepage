import fs from "node:fs";
import path from "node:path";
import { resolveUploadDiskPath } from "@/lib/uploads-storage";

/**
 * 공개 URL에 해당하는 파일이 서버 디스크에 있는지 (서버에서만 사용).
 * - `/uploads/...` → `MSV_UPLOADS_ROOT` 또는 `public/uploads` 아래 실제 경로 확인
 * - 그 외 → `public/` 정적 자산
 */
export function publicFileExists(urlPath: string): boolean {
  if (!urlPath.startsWith("/")) return false;
  if (urlPath.startsWith("/uploads/")) {
    const disk = resolveUploadDiskPath(urlPath);
    return Boolean(disk && fs.existsSync(disk));
  }
  const rel = urlPath.replace(/^\//, "");
  const full = path.join(process.cwd(), "public", rel);
  return fs.existsSync(full);
}
