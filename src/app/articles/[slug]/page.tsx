import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { StandardPageBody } from "@/components/layout/StandardPageBody";
import { getRequestLocale } from "@/lib/get-request-locale";
import { articlesDetailSeo } from "@/lib/i18n/articles-pages-locale";
import { getCachedArticleBySlug } from "@/lib/public-page-data-cache";
import { publicArticleBodyProse, publicContentCard } from "@/lib/public-page-styles";
import { hasHtmlTag, sanitizeRichHtml, textExcerpt } from "@/lib/richtext";
import { ArticleJsonLd } from "@/components/seo/ArticleJsonLd";
import { dynamicPageSeoLocalized, noIndexPageSeo } from "@/lib/seo-metadata";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await getRequestLocale();
  const seo = articlesDetailSeo(locale);
  const { slug } = await params;
  const decoded = decodeURIComponent(slug);
  const article = await getCachedArticleBySlug(decoded);
  if (!article) return noIndexPageSeo({ title: seo.notFoundTitle });
  const description =
    article.excerpt?.trim().length > 0 ? article.excerpt.trim() : textExcerpt(article.body);
  const internalPath = `/articles/${encodeURIComponent(article.slug)}`;
  return dynamicPageSeoLocalized(internalPath, locale, {
    title: article.title,
    absoluteTitle: `${article.title} | ${seo.titleSuffix}`,
    description,
  });
}

export default async function ArticleDetailPage({ params }: Props) {
  const locale = await getRequestLocale();
  const { slug } = await params;
  const article = await getCachedArticleBySlug(decodeURIComponent(slug));
  if (!article) notFound();

  const bodyHtml = hasHtmlTag(article.body) ? sanitizeRichHtml(article.body) : null;

  return (
    <>
      <ArticleJsonLd article={article} locale={locale} />
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
      <StandardPageBody width="6xl">
        <article className={publicContentCard}>
          <div className="text-sm leading-relaxed text-slate-700">
            {bodyHtml ? (
              <div className={publicArticleBodyProse} dangerouslySetInnerHTML={{ __html: bodyHtml }} />
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
