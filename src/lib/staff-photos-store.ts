import { promises as fs } from "fs";
import path from "path";

const dataFile = path.join(process.cwd(), "data", "staff-photos.json");

async function ensureDir() {
  await fs.mkdir(path.dirname(dataFile), { recursive: true });
}

export async function readStaffPhotos(): Promise<Record<string, string>> {
  await ensureDir();
  try {
    const raw = await fs.readFile(dataFile, "utf-8");
    const parsed = JSON.parse(raw) as unknown;
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      return parsed as Record<string, string>;
    }
    return {};
  } catch {
    return {};
  }
}

export async function writeStaffPhotos(map: Record<string, string>): Promise<void> {
  await ensureDir();
  await fs.writeFile(dataFile, JSON.stringify(map, null, 2), "utf-8");
}

export async function setStaffPhoto(email: string, publicPath: string): Promise<void> {
  const key = email.trim().toLowerCase();
  const map = await readStaffPhotos();
  map[key] = publicPath;
  await writeStaffPhotos(map);
}

export async function removeStaffPhoto(email: string): Promise<void> {
  const key = email.trim().toLowerCase();
  const map = await readStaffPhotos();
  const urlPath = map[key];
  delete map[key];
  await writeStaffPhotos(map);
  if (urlPath?.startsWith("/uploads/")) {
    try {
      const rel = urlPath.replace(/^\//, "");
      const full = path.join(process.cwd(), "public", rel);
      await fs.unlink(full);
    } catch {
      /* 파일 없음 등 무시 */
    }
  }
}
