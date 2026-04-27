import { NextResponse } from "next/server";
import { readArticles, writeArticles } from "@/lib/articles-store";
import { makeArticleSlug } from "@/lib/slug";
import type { Article } from "@/types/article";
import { requireAdmin } from "@/lib/require-admin";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, ctx: Ctx) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const { id } = await ctx.params;
  try {
    const patch = (await request.json()) as Partial<Article>;
    const all = await readArticles();
    const idx = all.findIndex((a) => a.id === id);
    if (idx === -1) return NextResponse.json({ error: "없음" }, { status: 404 });
    const cur = all[idx];
    let slug = patch.slug !== undefined ? String(patch.slug).trim() : cur.slug;
    const title = patch.title !== undefined ? String(patch.title).trim() : cur.title;
    const body = patch.body !== undefined ? String(patch.body).trim() : cur.body;
    const excerpt =
      patch.excerpt !== undefined ? String(patch.excerpt).trim() : cur.excerpt;
    if (!title || !body) {
      return NextResponse.json({ error: "제목·본문 비움 불가" }, { status: 400 });
    }
    if (slug !== cur.slug && all.some((a) => a.slug === slug && a.id !== id)) {
      slug = makeArticleSlug(title);
    }
    const next: Article = {
      ...cur,
      title,
      body,
      excerpt: excerpt || body.slice(0, 160),
      slug,
      updatedAt: new Date().toISOString(),
    };
    all[idx] = next;
    await writeArticles(all);
    return NextResponse.json(next);
  } catch {
    return NextResponse.json({ error: "수정 실패" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, ctx: Ctx) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const { id } = await ctx.params;
  const all = await readArticles();
  const next = all.filter((a) => a.id !== id);
  if (next.length === all.length) {
    return NextResponse.json({ error: "없음" }, { status: 404 });
  }
  await writeArticles(next);
  return NextResponse.json({ ok: true });
}
