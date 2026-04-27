import { promises as fs } from "fs";
import path from "path";
import type { Article } from "@/types/article";

export type { Article } from "@/types/article";

const dataFile = path.join(process.cwd(), "data", "articles.json");

async function ensureDir() {
  await fs.mkdir(path.dirname(dataFile), { recursive: true });
}

export async function readArticles(): Promise<Article[]> {
  await ensureDir();
  try {
    const raw = await fs.readFile(dataFile, "utf-8");
    const parsed = JSON.parse(raw) as Article[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function writeArticles(items: Article[]): Promise<void> {
  await ensureDir();
  await fs.writeFile(dataFile, JSON.stringify(items, null, 2), "utf-8");
}

export async function findArticleBySlug(slug: string): Promise<Article | null> {
  const items = await readArticles();
  return items.find((a) => a.slug === slug) ?? null;
}

export function sortArticlesByDate(list: Article[]): Article[] {
  return [...list].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}
