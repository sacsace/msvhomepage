import { promises as fs } from "fs";
import path from "path";
import type { Announcement } from "@/types/announcement";

export type { Announcement } from "@/types/announcement";

const dataFile = path.join(process.cwd(), "data", "announcements.json");

async function ensureDir() {
  await fs.mkdir(path.dirname(dataFile), { recursive: true });
}

export async function readAnnouncements(): Promise<Announcement[]> {
  await ensureDir();
  try {
    const raw = await fs.readFile(dataFile, "utf-8");
    const parsed = JSON.parse(raw) as Announcement[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function writeAnnouncements(items: Announcement[]): Promise<void> {
  await ensureDir();
  await fs.writeFile(dataFile, JSON.stringify(items, null, 2), "utf-8");
}

export function sortAnnouncementsPublic(list: Announcement[]): Announcement[] {
  return [...list].sort((a, b) => {
    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}
