import fsSync from "node:fs";
import { promises as fs } from "node:fs";
import path from "node:path";

/** 공개 URL 접두 — DB·프론트와 동일하게 유지 */
export const UPLOADS_PUBLIC_PREFIX = "/uploads";

const ALLOWED_TOP = new Set(["team", "staff", "articles", "clients"]);

/**
 * 디스크상 업로드 루트.
 * 우선순위:
 * 1. `MSV_UPLOADS_ROOT` (명시)
 * 2. `RAILWAY_VOLUME_MOUNT_PATH` (Railway가 볼륨 연결 시 자동 주입)
 * 3. `public/uploads` (로컬·볼륨 미연결 — PaaS에서는 재배포 시 유실)
 */
export function getUploadsDiskRoot(): string {
  const explicit = process.env.MSV_UPLOADS_ROOT?.trim();
  if (explicit) return path.resolve(explicit);

  const railwayVolume = process.env.RAILWAY_VOLUME_MOUNT_PATH?.trim();
  if (railwayVolume) return path.resolve(railwayVolume);

  return path.join(process.cwd(), "public", "uploads");
}

function getPublicUploadsDiskRoot(): string {
  return path.join(process.cwd(), "public", "uploads");
}

function getUploadsReadRoots(): string[] {
  const primary = path.resolve(getUploadsDiskRoot());
  const fallback = path.resolve(getPublicUploadsDiskRoot());
  return primary === fallback ? [primary] : [primary, fallback];
}

/** 운영 로그·헬스용 — 어디에 쓰는지 / 볼륨인지 */
export function describeUploadsDiskRoot(): {
  root: string;
  source: "MSV_UPLOADS_ROOT" | "RAILWAY_VOLUME_MOUNT_PATH" | "public/uploads";
  persistent: boolean;
} {
  if (process.env.MSV_UPLOADS_ROOT?.trim()) {
    return { root: getUploadsDiskRoot(), source: "MSV_UPLOADS_ROOT", persistent: true };
  }
  if (process.env.RAILWAY_VOLUME_MOUNT_PATH?.trim()) {
    return { root: getUploadsDiskRoot(), source: "RAILWAY_VOLUME_MOUNT_PATH", persistent: true };
  }
  return { root: getUploadsDiskRoot(), source: "public/uploads", persistent: false };
}

export function uploadsSubdir(name: "team" | "staff" | "articles" | "clients"): string {
  return path.join(getUploadsDiskRoot(), name);
}

/**
 * `/uploads/team/foo.jpg` 형태만 허용. path traversal 차단.
 * 볼륨·`public/uploads` 둘 다 읽어, 마이그레이션 중에도 깨지지 않게 함.
 */
export function resolveUploadDiskPath(publicUrlPath: string): string | null {
  const p = publicUrlPath.trim();
  if (!p.startsWith(`${UPLOADS_PUBLIC_PREFIX}/`)) return null;
  const rel = p.slice(UPLOADS_PUBLIC_PREFIX.length + 1);
  const segments = rel.split("/").filter(Boolean);
  if (segments.length < 2) return null;
  if (!ALLOWED_TOP.has(segments[0] ?? "")) return null;
  if (segments.some((s) => s === ".." || s === ".")) return null;

  const roots = getUploadsReadRoots();
  const validCandidates: string[] = [];
  for (const root of roots) {
    const full = path.resolve(root, ...segments);
    if (!full.startsWith(root + path.sep) && full !== root) {
      continue;
    }
    validCandidates.push(full);
    if (fsSync.existsSync(full)) {
      return full;
    }
  }
  return validCandidates[0] ?? null;
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
