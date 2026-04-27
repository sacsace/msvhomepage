import { promises as fs } from "fs";
import path from "path";
import type { QnaThread } from "@/types/qna";

export type { QnaThread, QnaAnswer } from "@/types/qna";

const dataFile = path.join(process.cwd(), "data", "qna.json");

async function ensureDataDir() {
  await fs.mkdir(path.dirname(dataFile), { recursive: true });
}

export async function readThreads(): Promise<QnaThread[]> {
  await ensureDataDir();
  try {
    const raw = await fs.readFile(dataFile, "utf-8");
    const parsed = JSON.parse(raw) as QnaThread[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function writeThreads(threads: QnaThread[]): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(dataFile, JSON.stringify(threads, null, 2), "utf-8");
}

/** 최근 활동(질문·답글) 기준 내림차순 */
export function sortThreadsByActivity(threads: QnaThread[]): QnaThread[] {
  return [...threads].sort((a, b) => {
    const lastA = Math.max(
      new Date(a.createdAt).getTime(),
      ...a.answers.map((x) => new Date(x.createdAt).getTime()),
    );
    const lastB = Math.max(
      new Date(b.createdAt).getTime(),
      ...b.answers.map((x) => new Date(x.createdAt).getTime()),
    );
    return lastB - lastA;
  });
}
