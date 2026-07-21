import fs from "node:fs";
import path from "node:path";
import { resolveUploadDiskPath } from "@/lib/uploads-storage";

/**
 * 공개 URL에 해당하는 파일이 서버 디스크에 있는지 (서버에서만 사용).
 * - `/uploads/...` → `MSV_UPLOADS_ROOT` 또는 `public/uploads` 아래 실제 경로 확인
 * - 그 외 → `public/` 정적 자산
 */
function stripUrlQueryHash(urlPath: string): string {
  const q = urlPath.indexOf("?");
  const h = urlPath.indexOf("#");
  const end = Math.min(q === -1 ? urlPath.length : q, h === -1 ? urlPath.length : h);
  return urlPath.slice(0, end);
}

export function publicFileExists(urlPath: string): boolean {
  const normalized = stripUrlQueryHash(urlPath.trim());
  if (!normalized.startsWith("/")) return false;
  if (normalized.startsWith("/uploads/")) {
    const disk = resolveUploadDiskPath(normalized);
    return Boolean(disk && fs.existsSync(disk));
  }
  const rel = normalized.replace(/^\//, "");
  const full = path.join(process.cwd(), "public", rel);
  return fs.existsSync(full);
}
