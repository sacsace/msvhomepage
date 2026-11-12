import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-content";

/**
 * 레거시·비공개만 차단. 공개 페이지(/about/team 등)는 막지 않습니다.
 * Google robots.txt는 prefix 매칭이므로 `/team`은 `/team`·`/team/...`만 해당합니다.
 */
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
  "/team/",
  "/en/team",
  "/en/team/",
  "/zh/team",
  "/zh/team/",
] as const;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [...LEGACY_DISALLOW],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: [...LEGACY_DISALLOW],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
