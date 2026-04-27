import type { Metadata } from "next";
import Link from "next/link";
import { staticPageSeo } from "@/lib/seo-metadata";
import { PageHeader } from "@/components/layout/PageHeader";
import { readArticles, sortArticlesByDate } from "@/lib/articles-store";
import { textExcerpt } from "@/lib/richtext";

export const metadata: Metadata = staticPageSeo("/articles", {
  title: "관련 글",
  description: "인도 진출·회계·세무 등 관련 글 목록",
});

export const dynamic = "force-dynamic";

const listGrid =
  "md:grid md:grid-cols-[3.5rem_7.5rem_minmax(0,1fr)] md:items-start md:gap-x-4" as const;

export default async function ArticlesListPage() {
  const list = sortArticlesByDate(await readArticles());

  return (
    <>
      <PageHeader title="관련 글" description="인도 비즈니스와 관련된 자료 및 안내 글입니다." />
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
        {list.length === 0 ? (
          <p className="text-sm text-slate-500">등록된 글이 없습니다.</p>
        ) : (
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div
              className={`hidden border-b border-slate-200 bg-slate-50 px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-slate-500 ${listGrid}`}
            >
              <span className="text-center">번호</span>
              <span>업데이트</span>
              <span>제목 · 요약</span>
            </div>
            <ul role="list">
              {list.map((a, i) => {
                const preview =
                  a.excerpt?.trim().length > 0 ? a.excerpt.trim() : textExcerpt(a.body, 160);
                return (
                  <li
                    key={a.id}
                    className={`border-b border-slate-200 px-4 py-4 last:border-b-0 transition-colors hover:bg-slate-50/90 sm:px-5 sm:py-4 ${listGrid}`}
                  >
                    <div className="mb-3 flex items-center justify-between gap-3 md:mb-0 md:contents">
                      <span
                        className="inline-flex min-w-[2rem] items-center justify-center rounded-md border border-msv-blue/25 bg-msv-blue-soft px-2 py-1 text-xs font-bold tabular-nums text-msv-blue md:justify-self-center"
                        aria-hidden
                      >
                        {String(list.length - i).padStart(2, "0")}
                      </span>
                      <time
                        dateTime={a.updatedAt}
                        className="shrink-0 text-xs tabular-nums text-slate-500 md:pt-0.5 md:text-left"
                      >
                        {new Date(a.updatedAt).toLocaleDateString("ko-KR")}
                      </time>
                    </div>
                    <div className="min-w-0 md:min-h-0">
                      <Link
                        href={`/articles/${encodeURIComponent(a.slug)}`}
                        className="group block rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-msv-blue"
                      >
                        <h2 className="text-base font-bold leading-snug text-msv-navy group-hover:text-msv-blue group-hover:underline">
                          {a.title}
                        </h2>
                        <p className="mt-1.5 text-sm leading-relaxed text-slate-600 line-clamp-3 md:line-clamp-2">
                          {preview}
                        </p>
                      </Link>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
