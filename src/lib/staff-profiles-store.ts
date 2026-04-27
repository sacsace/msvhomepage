import { promises as fs } from "fs";
import path from "path";
import type { StaffProfile } from "@/types/staff-profile";

const dataFile = path.join(process.cwd(), "data", "staff-profiles.json");

async function ensureDir() {
  await fs.mkdir(path.dirname(dataFile), { recursive: true });
}

export async function readStaffProfiles(): Promise<StaffProfile[]> {
  await ensureDir();
  try {
    const raw = await fs.readFile(dataFile, "utf-8");
    const parsed = JSON.parse(raw) as StaffProfile[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function writeStaffProfiles(items: StaffProfile[]): Promise<void> {
  await ensureDir();
  await fs.writeFile(dataFile, JSON.stringify(items, null, 2), "utf-8");
}
