import type { Article, ArticleListItem } from "@/types/article";
import { prisma } from "@/lib/prisma";
import { withRecoverableDbRead } from "@/lib/prisma-read-fallback";
import { textExcerpt } from "@/lib/richtext";

export type { Article, ArticleListItem } from "@/types/article";

function toArticle(row: {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
}): Article {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    body: row.body,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

export async function readArticles(): Promise<Article[]> {
  return withRecoverableDbRead([], async () => {
    const rows = await prisma.article.findMany();
    return rows.map(toArticle);
  });
}

/** 공개 목록 — 본문은 DB에서 읽되 응답·캐시에는 `listPreview`만 포함 */
export async function readArticlesListPublic(): Promise<ArticleListItem[]> {
  return withRecoverableDbRead([], async () => {
    const rows = await prisma.article.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        body: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return rows.map((row) => {
      const excerpt = row.excerpt?.trim() ?? "";
      const listPreview =
        excerpt.length > 0 ? textExcerpt(excerpt, 160) : textExcerpt(row.body, 120);
      return {
        id: row.id,
        title: row.title,
        slug: row.slug,
        createdAt: row.createdAt.toISOString(),
        updatedAt: row.updatedAt.toISOString(),
        excerpt,
        listPreview,
      };
    });
  });
}

export async function writeArticles(items: Article[]): Promise<void> {
  const data = items.map((a) => ({
    id: a.id,
    title: a.title,
    slug: a.slug,
    excerpt: a.excerpt,
    body: a.body,
    createdAt: new Date(a.createdAt),
    updatedAt: new Date(a.updatedAt),
  }));
  await prisma.$transaction(async (tx) => {
    await tx.article.deleteMany();
    if (data.length) await tx.article.createMany({ data });
  });
}

export async function findArticleBySlug(slug: string): Promise<Article | null> {
  return withRecoverableDbRead(null, async () => {
    const row = await prisma.article.findUnique({ where: { slug } });
    return row ? toArticle(row) : null;
  });
}

export function sortArticlesByDate<T extends { createdAt: string }>(list: readonly T[]): T[] {
  return [...list].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}
