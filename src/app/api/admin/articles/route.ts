import { NextResponse } from "next/server";
import { adminApiCatchResponse } from "@/lib/db-api-error-response";
import { readArticles, writeArticles } from "@/lib/articles-store";
import { makeArticleSlug } from "@/lib/slug";
import type { Article } from "@/types/article";
import { requireAdmin } from "@/lib/require-admin";
import { isRichTextMeaningful, sanitizeRichHtml, textExcerpt } from "@/lib/richtext";

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
    const body = sanitizeRichHtml(String(json.body || "").trim());
    const excerptRaw = String(json.excerpt ?? "").trim();
    const excerpt = excerptRaw || textExcerpt(body, 160);
    if (!title || !isRichTextMeaningful(body)) {
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
  } catch (e) {
    console.error("[api/admin/articles POST]", e);
    return adminApiCatchResponse(e, "저장 실패");
  }
}
