import type { SiteLocale } from "@/lib/site-locale";
import { pickLocale } from "@/lib/site-locale";

export function articlesListSeo(locale: SiteLocale) {
  return {
    title: pickLocale(locale, { ko: "자료실", en: "Resource library", zh: "资料库" }),
    description: pickLocale(locale, {
      ko: "인도 진출·회계·세무 등 자료실 게시글 목록",
      en: "Articles and resources on India market entry, accounting, tax, and operations.",
      zh: "印度进驻、会计、税务等相关资料与文章列表。",
    }),
  };
}

export function articlesDetailSeo(locale: SiteLocale) {
  return {
    titleSuffix: pickLocale(locale, { ko: "자료실", en: "Resource library", zh: "资料库" }),
    notFoundTitle: pickLocale(locale, { ko: "글", en: "Article", zh: "文章" }),
  };
}
