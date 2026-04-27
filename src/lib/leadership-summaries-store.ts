import { promises as fs } from "fs";
import path from "path";

const dataFile = path.join(process.cwd(), "data", "leadership-summaries.json");

async function ensureDir() {
  await fs.mkdir(path.dirname(dataFile), { recursive: true });
}

export async function readLeadershipSummaries(): Promise<Record<string, string>> {
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

async function writeLeadershipSummaries(map: Record<string, string>): Promise<void> {
  await ensureDir();
  await fs.writeFile(dataFile, JSON.stringify(map, null, 2), "utf-8");
}

export async function setLeadershipSummary(email: string, summary: string): Promise<void> {
  const key = email.trim().toLowerCase();
  const map = await readLeadershipSummaries();
  map[key] = summary.trim();
  await writeLeadershipSummaries(map);
}

export async function removeLeadershipSummary(email: string): Promise<void> {
  const key = email.trim().toLowerCase();
  const map = await readLeadershipSummaries();
  delete map[key];
  await writeLeadershipSummaries(map);
}
