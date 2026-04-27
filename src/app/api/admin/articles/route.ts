import { NextResponse } from "next/server";
import { readArticles, writeArticles } from "@/lib/articles-store";
import { makeArticleSlug } from "@/lib/slug";
import type { Article } from "@/types/article";
import { requireAdmin } from "@/lib/require-admin";

export const runtime = "nodejs";

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;
  return NextResponse.json(await readArticles());
}

export async function POST(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  try {
    const json = (await request.json()) as Partial<Article>;
    const title = String(json.title || "").trim();
    const body = String(json.body || "").trim();
    const excerpt = String(json.excerpt ?? "").trim() || body.slice(0, 160);
    if (!title || !body) {
      return NextResponse.json({ error: "제목과 본문은 필수입니다." }, { status: 400 });
    }
    const all = await readArticles();
    let slug = String(json.slug || "").trim() || makeArticleSlug(title);
    if (all.some((a) => a.slug === slug)) {
      slug = makeArticleSlug(title);
    }
    const now = new Date().toISOString();
    const item: Article = {
      id: crypto.randomUUID(),
      title,
      slug,
      excerpt,
      body,
      createdAt: now,
      updatedAt: now,
    };
    all.unshift(item);
    await writeArticles(all);
    return NextResponse.json(item, { status: 201 });
  } catch {
    return NextResponse.json({ error: "저장 실패" }, { status: 500 });
  }
}
