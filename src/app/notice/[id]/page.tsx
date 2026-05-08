import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { StandardPageBody } from "@/components/layout/StandardPageBody";
import { getRequestLocale } from "@/lib/get-request-locale";
import { noticeDateFormatLocale, noticePagesCopy } from "@/lib/i18n/notice-pages-locale";
import { getCachedAnnouncementById } from "@/lib/public-page-data-cache";
import { publicArticleBodyProse, publicContentCard } from "@/lib/public-page-styles";
import { hasHtmlTag, sanitizeRichHtml, textExcerpt } from "@/lib/richtext";
import { staticPageSeoLocalized } from "@/lib/seo-metadata";
import { company, siteUrl } from "@/lib/site-content";
import { withLocalePrefix } from "@/lib/site-locale";

/** Next 빌드는 리터럴만 인식 — `PUBLIC_PAGE_DATA_REVALIDATE_SEC`(15)와 동일 */
export const revalidate = 15;

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const locale = await getRequestLocale();
  const c = noticePagesCopy(locale);
  const item = await getCachedAnnouncementById(id);
  if (!item) return { title: c.metaFallbackTitle };
  return staticPageSeoLocalized(
    `/notice/${id}`,
    {
      title: item.title,
      absoluteTitle: `${item.title} | ${c.detailTitleSuffix}`,
      description: textExcerpt(item.body),
    },
    locale,
  );
}

export default async function NoticeDetailPage({ params }: Props) {
  const { id } = await params;
  const locale = await getRequestLocale();
  const L = (path: string) => withLocalePrefix(path, locale);
  const c = noticePagesCopy(locale);
  const dateLoc = noticeDateFormatLocale(locale);
  const item = await getCachedAnnouncementById(id);
  if (!item) notFound();

  const path = L(`/notice/${item.id}`);
  const pageUrl = `${siteUrl}${path}`;

  const noticeJsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: item.title,
    description: textExcerpt(item.body),
    datePublished: item.createdAt,
    dateModified: item.updatedAt,
    publisher: { "@type": "Organization", name: company.legalName },
    mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
    url: pageUrl,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(noticeJsonLd) }}
      />
      <PageHeader
        title={item.title}
        belowDescription={
          <>
            <p className="text-sm text-white/72">
              <Link
                href={L("/notice")}
                className="font-medium text-msv-blue-soft hover:text-white hover:underline"
              >
                {c.listNavLabel}
              </Link>
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-white/58 tabular-nums">
              {item.pinned ? (
                <span className="rounded border border-white/25 bg-white/10 px-1.5 py-0.5 font-medium text-white/90">
                  {c.pinnedBadge}
                </span>
              ) : null}
              <time dateTime={item.createdAt}>{new Date(item.createdAt).toLocaleDateString(dateLoc)}</time>
            </div>
          </>
        }
      />
      <StandardPageBody width="6xl">
        <article className={publicContentCard}>
          <div className="text-sm leading-relaxed text-slate-700">
            {hasHtmlTag(item.body) ? (
              <div
                className={publicArticleBodyProse}
                dangerouslySetInnerHTML={{ __html: sanitizeRichHtml(item.body) }}
              />
            ) : (
              <p className="whitespace-pre-wrap">{item.body}</p>
            )}
          </div>
          <p className="mt-10 border-t border-slate-100 pt-6 text-sm">
            <Link href={L("/notice")} className="text-slate-600 underline-offset-4 hover:underline">
              {c.backToList}
            </Link>
          </p>
        </article>
      </StandardPageBody>
    </>
  );
}
