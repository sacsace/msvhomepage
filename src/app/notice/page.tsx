import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { StandardPageBody } from "@/components/layout/StandardPageBody";
import { sortAnnouncementsPublic } from "@/lib/announcements-store";
import { getRequestLocale } from "@/lib/get-request-locale";
import { noticeDateFormatLocale, noticePagesCopy } from "@/lib/i18n/notice-pages-locale";
import { getCachedAnnouncementsList } from "@/lib/public-page-data-cache";
import { staticPageSeoLocalized } from "@/lib/seo-metadata";
import { withLocalePrefix } from "@/lib/site-locale";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const c = noticePagesCopy(locale);
  return staticPageSeoLocalized("/notice", { title: c.metaTitle, description: c.metaDescription }, locale);
}

/** Next 빌드는 리터럴만 인식 — `PUBLIC_PAGE_DATA_REVALIDATE_SEC`(15)와 동일 */
export const revalidate = 15;

const listGrid =
  "md:grid md:grid-cols-[3.5rem_7.5rem_3.25rem_minmax(0,1fr)] md:items-center md:gap-x-4" as const;

export default async function NoticeListPage() {
  const locale = await getRequestLocale();
  const L = (path: string) => withLocalePrefix(path, locale);
  const c = noticePagesCopy(locale);
  const dateLoc = noticeDateFormatLocale(locale);
  const list = sortAnnouncementsPublic(await getCachedAnnouncementsList());

  return (
    <>
      <PageHeader title={c.pageTitle} description={c.pageDescription} descriptionWide />
      <StandardPageBody>
        {list.length === 0 ? (
          <p className="text-sm text-slate-500">{c.emptyMessage}</p>
        ) : (
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div
              className={`hidden border-b border-slate-200 bg-slate-50 px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-slate-500 ${listGrid}`}
            >
              <span className="text-center">{c.colNo}</span>
              <span>{c.colDate}</span>
              <span className="text-center">{c.colPinned}</span>
              <div className="flex min-w-0 items-baseline justify-between gap-2 normal-case sm:gap-4">
                <span className="min-w-0 flex-1 text-left">{c.colTitle}</span>
                <span className="max-w-[42%] shrink-0 text-right sm:max-w-[48%] md:max-w-[50%]">{c.colSummary}</span>
              </div>
            </div>
            <ul role="list">
              {list.map((a, i) => (
                <li
                  key={a.id}
                  className={`border-b border-slate-200 px-4 py-4 last:border-b-0 transition-colors hover:bg-slate-50/90 sm:px-5 sm:py-4 ${listGrid}`}
                >
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2 md:mb-0 md:contents">
                    <span
                      className="inline-flex min-w-[2rem] items-center justify-center rounded-md border border-msv-blue/25 bg-msv-blue-soft px-2 py-1 text-xs font-bold tabular-nums text-msv-blue md:justify-self-center"
                      aria-hidden
                    >
                      {String(list.length - i).padStart(2, "0")}
                    </span>
                    <time
                      dateTime={a.createdAt}
                      className="text-xs tabular-nums text-slate-500 md:pt-0.5 md:text-left"
                    >
                      {new Date(a.createdAt).toLocaleDateString(dateLoc)}
                    </time>
                    <span className="md:justify-self-center md:pt-0.5">
                      {a.pinned ? (
                        <span className="rounded border border-msv-blue/20 bg-msv-blue-soft/70 px-1.5 py-0.5 text-[10px] font-semibold text-msv-blue">
                          {c.pinnedBadge}
                        </span>
                      ) : (
                        <span className="text-xs text-slate-300 md:inline">—</span>
                      )}
                    </span>
                  </div>
                  <div className="min-w-0 md:min-h-0">
                    <Link
                      href={L(`/notice/${a.id}`)}
                      className="group flex min-w-0 items-baseline gap-2 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-msv-blue sm:gap-4"
                    >
                      <span className="min-w-0 flex-1 truncate text-xs font-semibold leading-snug text-msv-navy sm:text-sm group-hover:text-msv-blue group-hover:underline">
                        {a.title}
                      </span>
                      <span className="max-w-[42%] shrink-0 truncate text-right text-sm font-normal leading-snug text-slate-600 sm:max-w-[48%] md:max-w-[50%]">
                        {a.summary}
                      </span>
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </StandardPageBody>
    </>
  );
}
