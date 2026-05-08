import type { MetadataRoute } from "next";
import { absoluteSiteUrl } from "@/lib/seo-metadata";
import { getCachedAnnouncementsList, getCachedArticlesList } from "@/lib/public-page-data-cache";
import { groupCompanies } from "@/lib/site-content";
import type { SiteLocale } from "@/lib/site-locale";
import { withLocalePrefix } from "@/lib/site-locale";

/** 사이트맵은 캐시된 공지·자료 목록을 사용합니다(공개 페이지와 동일 TTL). */
export const revalidate = 60;

const SEO_LOCALES: readonly SiteLocale[] = ["ko", "en", "zh"];

function lastMod(iso: string | undefined): Date {
  if (!iso) return new Date();
  const t = new Date(iso).getTime();
  return Number.isNaN(t) ? new Date() : new Date(t);
}

function urlsForAllLocales(
  internalPath: string,
  row: { changeFrequency: MetadataRoute.Sitemap[0]["changeFrequency"]; priority: number },
  lastModified: Date,
): MetadataRoute.Sitemap {
  const path = internalPath.startsWith("/") ? internalPath : `/${internalPath}`;
  return SEO_LOCALES.map((locale) => ({
    url: absoluteSiteUrl(withLocalePrefix(path, locale)),
    lastModified,
    changeFrequency: row.changeFrequency,
    priority: row.priority,
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const [articles, announcements] = await Promise.all([
    getCachedArticlesList(),
    getCachedAnnouncementsList(),
  ]);

  const staticDefs: ReadonlyArray<{
    path: string;
    changeFrequency: MetadataRoute.Sitemap[0]["changeFrequency"];
    priority: number;
  }> = [
    { path: "/", changeFrequency: "weekly", priority: 1 },
    { path: "/about", changeFrequency: "monthly", priority: 0.9 },
    { path: "/about/ci", changeFrequency: "monthly", priority: 0.84 },
    { path: "/about/team", changeFrequency: "monthly", priority: 0.85 },
    { path: "/about/clients", changeFrequency: "monthly", priority: 0.82 },
    { path: "/services", changeFrequency: "monthly", priority: 0.9 },
    { path: "/services/corporate-incorporation", changeFrequency: "monthly", priority: 0.8 },
    { path: "/services/corporate-incorporation/apply", changeFrequency: "monthly", priority: 0.72 },
    { path: "/services/frro", changeFrequency: "monthly", priority: 0.78 },
    { path: "/services/form-41-registration", changeFrequency: "monthly", priority: 0.76 },
    { path: "/services/ecb", changeFrequency: "monthly", priority: 0.76 },
    { path: "/services/license-registration", changeFrequency: "monthly", priority: 0.74 },
    { path: "/services/recruitment-support", changeFrequency: "monthly", priority: 0.72 },
    { path: "/services/personal-income-tax-calculator", changeFrequency: "monthly", priority: 0.72 },
    { path: "/services/corporate-tax-calculator", changeFrequency: "monthly", priority: 0.72 },
    { path: "/services/professional-tax-calculator", changeFrequency: "monthly", priority: 0.7 },
    { path: "/services/india-accounting-glossary", changeFrequency: "monthly", priority: 0.72 },
    { path: "/contact", changeFrequency: "monthly", priority: 0.85 },
    { path: "/software", changeFrequency: "monthly", priority: 0.75 },
    { path: "/software/mvs", changeFrequency: "monthly", priority: 0.72 },
    { path: "/software/herenow", changeFrequency: "monthly", priority: 0.72 },
    { path: "/group", changeFrequency: "monthly", priority: 0.75 },
    { path: "/notice", changeFrequency: "weekly", priority: 0.75 },
    { path: "/ongoing", changeFrequency: "weekly", priority: 0.65 },
    { path: "/articles", changeFrequency: "weekly", priority: 0.65 },
    { path: "/team", changeFrequency: "monthly", priority: 0.6 },
  ];

  const staticPaths: MetadataRoute.Sitemap = staticDefs.flatMap((def) =>
    urlsForAllLocales(def.path, { changeFrequency: def.changeFrequency, priority: def.priority }, now),
  );

  const groupEntries: MetadataRoute.Sitemap = groupCompanies.flatMap((g) =>
    urlsForAllLocales(`/group/${g.slug}`, { changeFrequency: "monthly", priority: 0.65 }, now),
  );

  const articleEntries: MetadataRoute.Sitemap = articles.flatMap((a) =>
    urlsForAllLocales(`/articles/${encodeURIComponent(a.slug)}`, { changeFrequency: "monthly", priority: 0.55 }, lastMod(a.updatedAt ?? a.createdAt)),
  );

  const noticeEntries: MetadataRoute.Sitemap = announcements.flatMap((a) =>
    urlsForAllLocales(`/notice/${a.id}`, { changeFrequency: "weekly", priority: 0.5 }, lastMod(a.updatedAt ?? a.createdAt)),
  );

  return [...staticPaths, ...groupEntries, ...articleEntries, ...noticeEntries];
}
