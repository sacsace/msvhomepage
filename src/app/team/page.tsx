import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import { getRequestLocale } from "@/lib/get-request-locale";
import { legacyRedirectSeo } from "@/lib/i18n/redirect-pages-locale";
import { noIndexPageSeo } from "@/lib/seo-metadata";
import { withLocalePrefix } from "@/lib/site-locale";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const seo = legacyRedirectSeo(locale, "team");
  return noIndexPageSeo({ title: seo.title, description: seo.description });
}

/** 예전 `/team` → 팀원 소개(`/about/team`)로 통합 */
export default async function TeamPageRedirect() {
  const locale = await getRequestLocale();
  permanentRedirect(withLocalePrefix("/about/team", locale));
}
