import { promises as fs } from "fs";
import path from "path";
import type { OngoingTask } from "@/types/ongoing-task";

export type { OngoingTask } from "@/types/ongoing-task";

const dataFile = path.join(process.cwd(), "data", "ongoing-tasks.json");

async function ensureDir() {
  await fs.mkdir(path.dirname(dataFile), { recursive: true });
}

export async function readOngoingTasks(): Promise<OngoingTask[]> {
  await ensureDir();
  try {
    const raw = await fs.readFile(dataFile, "utf-8");
    const parsed = JSON.parse(raw) as OngoingTask[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function writeOngoingTasks(items: OngoingTask[]): Promise<void> {
  await ensureDir();
  await fs.writeFile(dataFile, JSON.stringify(items, null, 2), "utf-8");
}

/** 최신 업데이트·최신 등록 순(위가 가장 최근) */
export function sortOngoingTasks(list: OngoingTask[]): OngoingTask[] {
  return [...list].sort((a, b) => {
    const u = new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    if (u !== 0) return u;
    const c = new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    if (c !== 0) return c;
    return b.id.localeCompare(a.id);
  });
}
