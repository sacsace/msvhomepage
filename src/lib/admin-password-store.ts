import fs from "node:fs";
import { promises as fsp } from "node:fs";
import path from "node:path";

const dataFile = path.join(process.cwd(), "data", "admin-auth.json");

type FileShape = { passwordHash?: string };

/** 동기: 로그인 검증·설정 여부 판별용 */
export function readPasswordHashSync(): string | null {
  try {
    const raw = fs.readFileSync(dataFile, "utf-8");
    const j = JSON.parse(raw) as FileShape;
    const h = String(j.passwordHash ?? "").trim();
    return h.length > 12 ? h : null;
  } catch {
    return null;
  }
}

export async function writePasswordHash(hash: string): Promise<void> {
  await fsp.mkdir(path.dirname(dataFile), { recursive: true });
  await fsp.writeFile(dataFile, JSON.stringify({ passwordHash: hash }, null, 2), "utf-8");
}
