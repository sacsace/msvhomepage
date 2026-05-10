import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { StandardPageBody } from "@/components/layout/StandardPageBody";
import { sortArticlesByDate } from "@/lib/articles-store";
import { getRequestLocale } from "@/lib/get-request-locale";
import { staticPageSeoLocalized } from "@/lib/seo-metadata";
import { getCachedArticlesList } from "@/lib/public-page-data-cache";
import { pickLocale, type SiteLocale } from "@/lib/site-locale";

function articlesSeo(locale: SiteLocale) {
  return {
    title: pickLocale(locale, { ko: "자료실", en: "Resource library", zh: "资料库" }),
    description: pickLocale(locale, {
      ko: "인도 진출·회계·세무 등 자료실 게시글 목록",
      en: "Articles and resources on India market entry, accounting, tax, and operations.",
      zh: "印度进驻、会计、税务等相关资料与文章列表。",
    }),
  };
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const { title, description } = articlesSeo(locale);
  return staticPageSeoLocalized("/articles", { title, description }, locale);
}

export const revalidate = 60;

function ListChevron() {
  return (
    <span
      className="flex size-6 shrink-0 items-center justify-center rounded-full text-slate-400 transition-[background-color,color] duration-200 ease-out group-hover:bg-black/[0.04] group-hover:text-slate-600"
      aria-hidden
    >
      <svg className="size-3.5" viewBox="0 0 20 20" fill="currentColor">
        <path
          fillRule="evenodd"
          d="M8.22 5.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 010-1.06z"
          clipRule="evenodd"
        />
      </svg>
    </span>
  );
}

export default async function ArticlesListPage() {
  const list = sortArticlesByDate(await getCachedArticlesList());

  return (
    <>
      <PageHeader
        title="자료실"
        description="인도 비즈니스와 관련된 자료·안내 글을 모아 두었습니다."
        descriptionWide
      />
      <StandardPageBody>
        {list.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200/90 bg-white/90 px-6 py-12 text-center shadow-[0_1px_8px_rgb(15_23_42/0.04)]">
            <p className="text-sm font-medium tracking-tight text-slate-700">등록된 글이 없습니다.</p>
            <p className="mt-1.5 text-xs leading-relaxed text-slate-500">새 글이 등록되면 이곳에 표시됩니다.</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-200/85 bg-white shadow-[0_1px_10px_rgb(15_23_42/0.045)] ring-1 ring-slate-900/[0.02]">
            <ul role="list" className="divide-y divide-black/[0.06]">
              {list.map((a, i) => {
                const preview = a.listPreview;
                const indexLabel = String(list.length - i).padStart(2, "0");
                const href = `/articles/${encodeURIComponent(a.slug)}`;
                const showPreview = preview.trim().length > 0 && preview.trim() !== a.title.trim();

                return (
                  <li key={a.id}>
                    <Link
                      href={href}
                      className="group flex items-center gap-2 px-3 py-2.5 transition-[background-color] duration-200 ease-out active:bg-slate-100/80 sm:gap-3 sm:px-4 sm:py-3 sm:hover:bg-slate-50/95"
                    >
                      <span
                        className="w-6 shrink-0 select-none text-right text-[11px] font-medium tabular-nums text-slate-300 sm:w-7"
                        aria-hidden
                      >
                        {indexLabel}
                      </span>
                      <p className="min-w-0 flex-1 truncate text-sm leading-snug sm:text-[15px]">
                        <span className="font-semibold text-slate-900 transition-colors duration-200 group-hover:text-msv-blue">
                          {a.title}
                        </span>
                        {showPreview ? (
                          <>
                            <span className="text-slate-300"> · </span>
                            <span className="font-normal text-slate-500">{preview}</span>
                          </>
                        ) : null}
                      </p>
                      <time
                        dateTime={a.updatedAt}
                        className="shrink-0 whitespace-nowrap text-xs tabular-nums text-slate-400 sm:text-[13px]"
                      >
                        {new Date(a.updatedAt).toLocaleDateString("ko-KR")}
                      </time>
                      <ListChevron />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </StandardPageBody>
    </>
  );
}
