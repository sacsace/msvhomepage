import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { StandardPageBody } from "@/components/layout/StandardPageBody";
import { getCachedArticleBySlug } from "@/lib/public-page-data-cache";
import { publicContentCard } from "@/lib/public-page-styles";
import { hasHtmlTag, sanitizeRichHtml, textExcerpt } from "@/lib/richtext";
import { staticPageSeo } from "@/lib/seo-metadata";
import { company, siteUrl } from "@/lib/site-content";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const decoded = decodeURIComponent(slug);
  const article = await getCachedArticleBySlug(decoded);
  if (!article) return { title: "글" };
  const description =
    article.excerpt?.trim().length > 0 ? article.excerpt.trim() : textExcerpt(article.body);
  return staticPageSeo(`/articles/${encodeURIComponent(article.slug)}`, {
    title: article.title,
    absoluteTitle: `${article.title} | 자료실`,
    description,
  });
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = await getCachedArticleBySlug(decodeURIComponent(slug));
  if (!article) notFound();

  const bodyHtml = hasHtmlTag(article.body) ? sanitizeRichHtml(article.body) : null;

  const articleUrl = `${siteUrl}/articles/${encodeURIComponent(article.slug)}`;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.excerpt || textExcerpt(article.body, 200),
    datePublished: article.createdAt,
    dateModified: article.updatedAt,
    author: { "@type": "Organization", name: company.legalName },
    publisher: {
      "@type": "Organization",
      name: company.legalName,
      logo: { "@type": "ImageObject", url: `${siteUrl}/msv-logo.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
    url: articleUrl,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <PageHeader
        title={article.title}
        belowDescription={
          <>
            <p className="text-sm text-white/72">
              <Link
                href="/articles"
                className="font-medium text-msv-blue-soft hover:text-white hover:underline"
              >
                자료실 목록
              </Link>
            </p>
            <time dateTime={article.createdAt} className="mt-2 block text-xs text-white/58 tabular-nums">
              {new Date(article.createdAt).toLocaleDateString("ko-KR")}
            </time>
            {article.excerpt ? (
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/82">{article.excerpt}</p>
            ) : null}
          </>
        }
      />
      <StandardPageBody width="3xl">
        <article className={publicContentCard}>
          <div className="text-sm leading-relaxed text-slate-700">
            {bodyHtml ? (
              <div
                className="article-body [&_a]:text-blue-700 [&_a]:underline [&_blockquote]:my-4 [&_blockquote]:border-l-2 [&_blockquote]:border-slate-200 [&_blockquote]:pl-4 [&_blockquote]:text-slate-600 [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-semibold [&_h3]:mt-6 [&_h3]:text-lg [&_h3]:font-semibold [&_img]:my-4 [&_img]:max-w-full [&_img]:rounded-sm [&_li]:my-0.5 [&_ol]:my-3 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:my-3 [&_pre]:my-4 [&_pre]:overflow-x-auto [&_pre]:rounded-md [&_pre]:bg-slate-50 [&_pre]:p-3 [&_pre]:text-xs [&_ul]:my-3 [&_ul]:list-disc [&_ul]:pl-6"
                dangerouslySetInnerHTML={{ __html: bodyHtml }}
              />
            ) : (
              <p className="whitespace-pre-wrap">{article.body}</p>
            )}
          </div>
          <p className="mt-10 border-t border-slate-100 pt-6 text-sm">
            <Link href="/articles" className="text-slate-600 underline-offset-4 hover:underline">
              ← 목록
            </Link>
          </p>
        </article>
      </StandardPageBody>
    </>
  );
}
