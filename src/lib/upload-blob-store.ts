import "server-only";

import { promises as fs } from "node:fs";
import fsSync from "node:fs";
import path from "node:path";
import { prisma } from "@/lib/prisma";
import { withRecoverableDbRead } from "@/lib/prisma-read-fallback";
import {
  getUploadsDiskRoot,
  mimeForUploadFile,
  resolveUploadDiskPath,
  UPLOADS_PUBLIC_PREFIX,
} from "@/lib/uploads-storage";

function isUploadPublicPath(publicPath: string): boolean {
  return publicPath.startsWith(`${UPLOADS_PUBLIC_PREFIX}/`) && !publicPath.includes("..");
}

/** 디스크에 쓰고 Postgres에도 백업 — 재배포 후에도 복원 가능 */
export async function persistUploadFile(
  publicPath: string,
  data: Buffer,
  mime?: string,
): Promise<void> {
  if (!isUploadPublicPath(publicPath)) {
    throw new Error(`Invalid upload path: ${publicPath}`);
  }
  const disk = resolveUploadDiskPath(publicPath);
  if (!disk) throw new Error(`Cannot resolve upload path: ${publicPath}`);
  await fs.mkdir(path.dirname(disk), { recursive: true });
  await fs.writeFile(disk, data);

  const contentType = mime || mimeForUploadFile(disk);
  const bytes = new Uint8Array(data);
  try {
    await prisma.uploadedBlob.upsert({
      where: { publicPath },
      create: { publicPath, mime: contentType, data: bytes },
      update: { mime: contentType, data: bytes },
    });
  } catch (e) {
    // 스키마 미적용·DB 일시 장애 시에도 디스크 저장은 유지
    console.warn("[uploads] Postgres blob backup skipped:", e instanceof Error ? e.message : e);
  }
}

export async function deleteUploadFile(publicPath: string | undefined): Promise<void> {
  if (!publicPath || !isUploadPublicPath(publicPath)) return;
  const disk = resolveUploadDiskPath(publicPath);
  if (disk) {
    try {
      await fs.unlink(disk);
    } catch {
      /* ignore */
    }
  }
  try {
    await prisma.uploadedBlob.deleteMany({ where: { publicPath } });
  } catch {
    /* ignore */
  }
}

/** 디스크 우선, 없으면 DB에서 읽어 디스크에 복원 */
export async function readUploadFile(publicPath: string): Promise<{ data: Buffer; mime: string } | null> {
  if (!isUploadPublicPath(publicPath)) return null;
  const disk = resolveUploadDiskPath(publicPath);
  if (disk && fsSync.existsSync(disk)) {
    try {
      const data = await fs.readFile(disk);
      return { data, mime: mimeForUploadFile(disk) };
    } catch {
      /* fall through to DB */
    }
  }

  const row = await withRecoverableDbRead(null, async () =>
    prisma.uploadedBlob.findUnique({ where: { publicPath } }),
  );
  if (!row?.data) return null;

  const data = Buffer.from(row.data);
  if (disk) {
    try {
      await fs.mkdir(path.dirname(disk), { recursive: true });
      await fs.writeFile(disk, data);
    } catch {
      /* serve without cache */
    }
  }
  return { data, mime: row.mime || mimeForUploadFile(publicPath) };
}

export async function uploadBlobExists(publicPath: string): Promise<boolean> {
  if (!isUploadPublicPath(publicPath)) return false;
  const disk = resolveUploadDiskPath(publicPath);
  if (disk && fsSync.existsSync(disk)) return true;
  const row = await withRecoverableDbRead(null, async () =>
    prisma.uploadedBlob.findUnique({
      where: { publicPath },
      select: { publicPath: true },
    }),
  );
  return Boolean(row);
}

/**
 * 기동 시: DB → 디스크 복원 + 디스크(깃/베이크) → DB 백업.
 * Railway 재배포 후 이미지가 비어도 Postgres에서 되돌린다.
 */
export async function syncUploadBlobsWithDisk(): Promise<{ restored: number; backedUp: number }> {
  let restored = 0;
  let backedUp = 0;
  const root = getUploadsDiskRoot();

  try {
    const blobs = await prisma.uploadedBlob.findMany({ select: { publicPath: true, mime: true, data: true } });
    for (const row of blobs) {
      const disk = resolveUploadDiskPath(row.publicPath);
      if (!disk) continue;
      if (fsSync.existsSync(disk)) continue;
      try {
        await fs.mkdir(path.dirname(disk), { recursive: true });
        await fs.writeFile(disk, Buffer.from(row.data));
        restored += 1;
      } catch {
        /* skip one */
      }
    }
  } catch (e) {
    console.warn("[uploads] blob→disk restore skipped:", e instanceof Error ? e.message : e);
  }

  const subdirs = ["team", "staff", "articles", "clients"] as const;
  for (const sub of subdirs) {
    const dir = path.join(root, sub);
    if (!fsSync.existsSync(dir)) continue;
    const walk = async (absDir: string, urlBase: string) => {
      let entries: string[];
      try {
        entries = await fs.readdir(absDir);
      } catch {
        return;
      }
      for (const name of entries) {
        if (name === ".gitkeep") continue;
        const full = path.join(absDir, name);
        let st: fsSync.Stats;
        try {
          st = fsSync.statSync(full);
        } catch {
          continue;
        }
        if (st.isDirectory()) {
          await walk(full, `${urlBase}/${name}`);
          continue;
        }
        if (!st.isFile()) continue;
        const publicPath = `${urlBase}/${name}`;
        try {
          const existing = await prisma.uploadedBlob.findUnique({
            where: { publicPath },
            select: { publicPath: true },
          });
          if (existing) continue;
          const data = await fs.readFile(full);
          await prisma.uploadedBlob.create({
            data: { publicPath, mime: mimeForUploadFile(full), data: new Uint8Array(data) },
          });
          backedUp += 1;
        } catch {
          /* skip */
        }
      }
    };
    await walk(dir, `${UPLOADS_PUBLIC_PREFIX}/${sub}`);
  }

  // public/uploads 베이크본도 볼륨 루트와 다를 때 백업
  const publicRoot = path.join(process.cwd(), "public", "uploads");
  if (path.resolve(publicRoot) !== path.resolve(root) && fsSync.existsSync(publicRoot)) {
    for (const sub of subdirs) {
      const dir = path.join(publicRoot, sub);
      if (!fsSync.existsSync(dir)) continue;
      const walk = async (absDir: string, urlBase: string) => {
        let entries: string[];
        try {
          entries = await fs.readdir(absDir);
        } catch {
          return;
        }
        for (const name of entries) {
          if (name === ".gitkeep") continue;
          const full = path.join(absDir, name);
          let st: fsSync.Stats;
          try {
            st = fsSync.statSync(full);
          } catch {
            continue;
          }
          if (st.isDirectory()) {
            await walk(full, `${urlBase}/${name}`);
            continue;
          }
          if (!st.isFile()) continue;
          const publicPath = `${urlBase}/${name}`;
          const primaryDisk = resolveUploadDiskPath(publicPath);
          try {
            if (primaryDisk && !fsSync.existsSync(primaryDisk)) {
              await fs.mkdir(path.dirname(primaryDisk), { recursive: true });
              await fs.copyFile(full, primaryDisk);
              restored += 1;
            }
            const existing = await prisma.uploadedBlob.findUnique({
              where: { publicPath },
              select: { publicPath: true },
            });
            if (existing) continue;
            const data = await fs.readFile(full);
            await prisma.uploadedBlob.create({
              data: { publicPath, mime: mimeForUploadFile(full), data: new Uint8Array(data) },
            });
            backedUp += 1;
          } catch {
            /* skip */
          }
        }
      };
      await walk(dir, `${UPLOADS_PUBLIC_PREFIX}/${sub}`);
    }
  }

  if (restored > 0 || backedUp > 0) {
    console.info(`[uploads] sync blobs: restored=${restored} backedUp=${backedUp}`);
  }
  return { restored, backedUp };
}
