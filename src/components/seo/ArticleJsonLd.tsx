import { absoluteSiteUrl } from "@/lib/seo-metadata";
import { company } from "@/lib/site-content";
import type { Article } from "@/types/article";

type Props = { article: Article };

/** 자료실 글 상세 — Article 스키마 */
export function ArticleJsonLd({ article }: Props) {
  const path = `/articles/${encodeURIComponent(article.slug)}`;
  const url = absoluteSiteUrl(path);
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
    inLanguage: "ko-KR",
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
  );
}
