import { promises as fs } from "node:fs";
import path from "node:path";

/** 공개 URL 접두 — DB·프론트와 동일하게 유지 */
export const UPLOADS_PUBLIC_PREFIX = "/uploads";

const ALLOWED_TOP = new Set(["team", "staff", "articles", "clients"]);

/**
 * 디스크상 업로드 루트.
 * - 미설정: `public/uploads` (로컬·기존 동작)
 * - Railway 등: 볼륨 마운트 경로를 `MSV_UPLOADS_ROOT` 로 지정 (예: `/data/msv-uploads`)
 */
export function getUploadsDiskRoot(): string {
  const raw = process.env.MSV_UPLOADS_ROOT?.trim();
  if (raw) return path.resolve(raw);
  return path.join(process.cwd(), "public", "uploads");
}

export function uploadsSubdir(name: "team" | "staff" | "articles" | "clients"): string {
  return path.join(getUploadsDiskRoot(), name);
}

/**
 * `/uploads/team/foo.jpg` 형태만 허용. path traversal 차단.
 */
export function resolveUploadDiskPath(publicUrlPath: string): string | null {
  const p = publicUrlPath.trim();
  if (!p.startsWith(`${UPLOADS_PUBLIC_PREFIX}/`)) return null;
  const rel = p.slice(UPLOADS_PUBLIC_PREFIX.length + 1);
  const segments = rel.split("/").filter(Boolean);
  if (segments.length < 2) return null;
  if (!ALLOWED_TOP.has(segments[0] ?? "")) return null;
  if (segments.some((s) => s === ".." || s === ".")) return null;

  const root = path.resolve(getUploadsDiskRoot());
  const full = path.resolve(root, ...segments);
  if (!full.startsWith(root + path.sep) && full !== root) {
    return null;
  }
  return full;
}

export async function unlinkUploadByPublicPath(publicUrlPath: string | undefined): Promise<void> {
  if (!publicUrlPath?.startsWith(UPLOADS_PUBLIC_PREFIX)) return;
  const disk = resolveUploadDiskPath(publicUrlPath);
  if (!disk) return;
  try {
    await fs.unlink(disk);
  } catch {
    /* 없음 등 무시 */
  }
}

export function mimeForUploadFile(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  const map: Record<string, string> = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".webp": "image/webp",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
    ".zip": "application/zip",
    ".txt": "text/plain",
    ".doc": "application/msword",
    ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ".xls": "application/vnd.ms-excel",
    ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  };
  return map[ext] ?? "application/octet-stream";
}
