import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { StandardPageBody } from "@/components/layout/StandardPageBody";
import { getCachedAnnouncements } from "@/lib/public-page-data-cache";
import { publicContentCard } from "@/lib/public-page-styles";
import { hasHtmlTag, sanitizeRichHtml, textExcerpt } from "@/lib/richtext";
import { staticPageSeo } from "@/lib/seo-metadata";
import { company, siteUrl } from "@/lib/site-content";

export const revalidate = 60;

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const list = await getCachedAnnouncements();
  const item = list.find((a) => a.id === id);
  if (!item) return { title: "공지" };
  return staticPageSeo(`/notice/${id}`, {
    title: item.title,
    absoluteTitle: `${item.title} | 공지사항`,
    description: textExcerpt(item.body),
  });
}

export default async function NoticeDetailPage({ params }: Props) {
  const { id } = await params;
  const list = await getCachedAnnouncements();
  const item = list.find((a) => a.id === id);
  if (!item) notFound();

  const pageUrl = `${siteUrl}/notice/${item.id}`;
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
                href="/notice"
                className="font-medium text-msv-blue-soft hover:text-white hover:underline"
              >
                공지사항 목록
              </Link>
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-white/58">
              {item.pinned ? (
                <span className="rounded border border-white/25 bg-white/10 px-1.5 py-0.5 font-medium text-white/90">
                  고정
                </span>
              ) : null}
              <time dateTime={item.createdAt} className="tabular-nums">
                {new Date(item.createdAt).toLocaleString("ko-KR")}
              </time>
            </div>
          </>
        }
      />
      <StandardPageBody width="3xl">
        <article className={publicContentCard}>
          {hasHtmlTag(item.body) ? (
            <div
              className="text-sm leading-relaxed text-slate-700 [&_a]:text-msv-blue [&_a]:underline [&_img]:h-auto [&_img]:max-w-full [&_li]:ml-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:my-2 [&_ul]:list-disc [&_ul]:pl-5"
              dangerouslySetInnerHTML={{ __html: sanitizeRichHtml(item.body) }}
            />
          ) : (
            <div className="text-sm leading-relaxed text-slate-700">
              <p className="whitespace-pre-wrap">{item.body}</p>
            </div>
          )}
          <p className="mt-10 border-t border-slate-100 pt-6 text-sm">
            <Link href="/notice" className="text-slate-600 underline-offset-4 hover:underline">
              ← 목록
            </Link>
          </p>
        </article>
      </StandardPageBody>
    </>
  );
}
