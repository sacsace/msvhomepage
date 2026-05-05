import { NextResponse } from "next/server";
import { adminApiCatchResponse } from "@/lib/db-api-error-response";
import { readArticles, writeArticles } from "@/lib/articles-store";
import { makeArticleSlug } from "@/lib/slug";
import type { Article } from "@/types/article";
import { requireAdmin } from "@/lib/require-admin";
import { isRichTextMeaningful, sanitizeRichHtml, textExcerpt } from "@/lib/richtext";

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
    const body =
      patch.body !== undefined ? sanitizeRichHtml(String(patch.body).trim()) : cur.body;
    let excerpt: string;
    if (patch.excerpt === undefined) {
      excerpt = cur.excerpt;
    } else {
      const t = String(patch.excerpt).trim();
      excerpt = t || textExcerpt(body, 160);
    }
    if (!title || !isRichTextMeaningful(body)) {
      return NextResponse.json({ error: "제목·본문 비움 불가" }, { status: 400 });
    }
    if (slug !== cur.slug && all.some((a) => a.slug === slug && a.id !== id)) {
      slug = makeArticleSlug(title);
    }
    const next: Article = {
      ...cur,
      title,
      body,
      excerpt,
      slug,
      updatedAt: new Date().toISOString(),
    };
    all[idx] = next;
    await writeArticles(all);
    return NextResponse.json(next);
  } catch (e) {
    console.error("[api/admin/articles PATCH]", e);
    return adminApiCatchResponse(e, "수정 실패");
  }
}

export async function DELETE(_request: Request, ctx: Ctx) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const { id } = await ctx.params;
  try {
    const all = await readArticles();
    const next = all.filter((a) => a.id !== id);
    if (next.length === all.length) {
      return NextResponse.json({ error: "없음" }, { status: 404 });
    }
    await writeArticles(next);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[api/admin/articles DELETE]", e);
    return adminApiCatchResponse(e, "삭제 실패");
  }
}
