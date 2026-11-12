import type { SiteLocale } from "@/lib/site-locale";
import { pickLocale } from "@/lib/site-locale";

export type ArticlesPagesCopy = {
  metaTitle: string;
  metaDescription: string;
  pageTitle: string;
  pageDescription: string;
  emptyTitle: string;
  emptyHint: string;
  listNavLabel: string;
  backToList: string;
  titleSuffix: string;
  notFoundTitle: string;
};

const ko: ArticlesPagesCopy = {
  metaTitle: "자료실",
  metaDescription: "인도 진출·회계·세무 등 자료실 게시글 목록",
  pageTitle: "자료실",
  pageDescription: "인도 비즈니스와 관련된 자료·안내 글을 모아 두었습니다.",
  emptyTitle: "등록된 글이 없습니다.",
  emptyHint: "새 글이 등록되면 이곳에 표시됩니다.",
  listNavLabel: "자료실 목록",
  backToList: "← 목록",
  titleSuffix: "자료실",
  notFoundTitle: "글",
};

const en: ArticlesPagesCopy = {
  metaTitle: "Resource library",
  metaDescription: "Articles and resources on India market entry, accounting, tax, and operations.",
  pageTitle: "Resource library",
  pageDescription: "Guides and articles on India business, accounting, tax, and operations.",
  emptyTitle: "No articles yet.",
  emptyHint: "New articles will appear here when published.",
  listNavLabel: "Back to library",
  backToList: "← Back to list",
  titleSuffix: "Resource library",
  notFoundTitle: "Article",
};

const zh: ArticlesPagesCopy = {
  metaTitle: "资料库",
  metaDescription: "印度进驻、会计、税务等相关资料与文章列表。",
  pageTitle: "资料库",
  pageDescription: "汇集与印度业务相关的资料与说明文章。",
  emptyTitle: "暂无文章。",
  emptyHint: "发布新文章后将在此显示。",
  listNavLabel: "返回资料库",
  backToList: "← 返回列表",
  titleSuffix: "资料库",
  notFoundTitle: "文章",
};

export function articlesPagesCopy(locale: SiteLocale): ArticlesPagesCopy {
  return pickLocale(locale, { ko, en, zh });
}

export function articlesDateFormatLocale(locale: SiteLocale): string {
  return pickLocale(locale, { ko: "ko-KR", en: "en-GB", zh: "zh-CN" });
}

/** @deprecated Use `articlesPagesCopy(locale)` for list SEO */
export function articlesListSeo(locale: SiteLocale) {
  const c = articlesPagesCopy(locale);
  return { title: c.metaTitle, description: c.metaDescription };
}

/** @deprecated Use `articlesPagesCopy(locale)` for detail SEO */
export function articlesDetailSeo(locale: SiteLocale) {
  const c = articlesPagesCopy(locale);
  return { titleSuffix: c.titleSuffix, notFoundTitle: c.notFoundTitle };
}
