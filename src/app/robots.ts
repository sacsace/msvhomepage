import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-content";

/** 레거시·비공개 경로 — ko 및 /en·/zh 접두 모두 차단 */
const LEGACY_DISALLOW = [
  "/api/",
  "/admin",
  "/admin/",
  "/qna",
  "/en/qna",
  "/zh/qna",
  "/clients",
  "/en/clients",
  "/zh/clients",
  "/mvs-intro",
  "/en/mvs-intro",
  "/zh/mvs-intro",
  "/msv-intro",
  "/en/msv-intro",
  "/zh/msv-intro",
  "/team",
  "/en/team",
  "/zh/team",
] as const;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [...LEGACY_DISALLOW],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl.replace(/^https?:\/\//, ""),
  };
}
