import type { MetadataRoute } from "next";
import { getCachedAnnouncements, getCachedArticles } from "@/lib/public-page-data-cache";
import { groupCompanies, siteUrl } from "@/lib/site-content";

/** 사이트맵은 캐시된 공지·자료 목록을 사용합니다(공개 페이지와 동일 TTL). */
export const revalidate = 60;

function lastMod(iso: string | undefined): Date {
  if (!iso) return new Date();
  const t = new Date(iso).getTime();
  return Number.isNaN(t) ? new Date() : new Date(t);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const [articles, announcements] = await Promise.all([
    getCachedArticles(),
    getCachedAnnouncements(),
  ]);

  const staticPaths: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/about/team`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${siteUrl}/about/clients`, lastModified: now, changeFrequency: "monthly", priority: 0.82 },
    { url: `${siteUrl}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/services/corporate-incorporation`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/services/corporate-incorporation/apply`, lastModified: now, changeFrequency: "monthly", priority: 0.72 },
    { url: `${siteUrl}/services/frro`, lastModified: now, changeFrequency: "monthly", priority: 0.78 },
    {
      url: `${siteUrl}/services/form-41-registration`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.76,
    },
    {
      url: `${siteUrl}/services/india-accounting-glossary`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.72,
    },
    { url: `${siteUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${siteUrl}/software`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${siteUrl}/software/mvs`, lastModified: now, changeFrequency: "monthly", priority: 0.72 },
    { url: `${siteUrl}/software/herenow`, lastModified: now, changeFrequency: "monthly", priority: 0.72 },
    { url: `${siteUrl}/group`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${siteUrl}/notice`, lastModified: now, changeFrequency: "weekly", priority: 0.75 },
    { url: `${siteUrl}/ongoing`, lastModified: now, changeFrequency: "weekly", priority: 0.65 },
    { url: `${siteUrl}/articles`, lastModified: now, changeFrequency: "weekly", priority: 0.65 },
    { url: `${siteUrl}/team`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/en`, lastModified: now, changeFrequency: "monthly", priority: 0.35 },
    { url: `${siteUrl}/zh`, lastModified: now, changeFrequency: "monthly", priority: 0.35 },
  ];

  const groupEntries: MetadataRoute.Sitemap = groupCompanies.map((g) => ({
    url: `${siteUrl}/group/${g.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));

  const articleEntries: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${siteUrl}/articles/${encodeURIComponent(a.slug)}`,
    lastModified: lastMod(a.updatedAt ?? a.createdAt),
    changeFrequency: "monthly" as const,
    priority: 0.55,
  }));

  const noticeEntries: MetadataRoute.Sitemap = announcements.map((a) => ({
    url: `${siteUrl}/notice/${a.id}`,
    lastModified: lastMod(a.updatedAt ?? a.createdAt),
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }));

  return [...staticPaths, ...groupEntries, ...articleEntries, ...noticeEntries];
}
