import { absoluteSiteUrl } from "@/lib/seo-metadata";
import { company } from "@/lib/site-content";
import type { SiteLocale } from "@/lib/site-locale";
import { withLocalePrefix } from "@/lib/site-locale";
import type { Article } from "@/types/article";

type Props = { article: Article; locale: SiteLocale };

function articleLanguageCode(locale: SiteLocale): string {
  if (locale === "en") return "en-IN";
  if (locale === "zh") return "zh-CN";
  return "ko-KR";
}

/** 자료실 글 상세 — Article 스키마 */
export function ArticleJsonLd({ article, locale }: Props) {
  const internalPath = `/articles/${encodeURIComponent(article.slug)}`;
  const url = absoluteSiteUrl(withLocalePrefix(internalPath, locale));
  const description =
    article.excerpt?.trim().length > 0 ? article.excerpt.trim() : article.title;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description,
    datePublished: article.createdAt,
    dateModified: article.updatedAt,
    author: { "@type": "Organization", name: company.legalName },
    publisher: {
      "@type": "Organization",
      name: company.legalName,
      logo: { "@type": "ImageObject", url: absoluteSiteUrl("/msv-wordmark.png") },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    inLanguage: articleLanguageCode(locale),
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
  );
}
