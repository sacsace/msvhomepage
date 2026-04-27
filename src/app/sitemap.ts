import type { MetadataRoute } from "next";
import { readAnnouncements } from "@/lib/announcements-store";
import { readArticles } from "@/lib/articles-store";
import { groupCompanies, siteUrl } from "@/lib/site-content";

export const dynamic = "force-dynamic";

function lastMod(iso: string | undefined): Date {
  if (!iso) return new Date();
  const t = new Date(iso).getTime();
  return Number.isNaN(t) ? new Date() : new Date(t);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const articles = await readArticles();
  const announcements = await readAnnouncements();

  const staticPaths: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${siteUrl}/mvs-intro`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${siteUrl}/group`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${siteUrl}/notice`, lastModified: now, changeFrequency: "weekly", priority: 0.75 },
    { url: `${siteUrl}/ongoing`, lastModified: now, changeFrequency: "weekly", priority: 0.65 },
    { url: `${siteUrl}/articles`, lastModified: now, changeFrequency: "weekly", priority: 0.65 },
    { url: `${siteUrl}/team`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
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
