import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import { getRequestLocale } from "@/lib/get-request-locale";
import { legacyRedirectSeo } from "@/lib/i18n/redirect-pages-locale";
import { noIndexPageSeo } from "@/lib/seo-metadata";
import { withLocalePrefix } from "@/lib/site-locale";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const seo = legacyRedirectSeo(locale, "mvs-intro");
  return noIndexPageSeo({ title: seo.title, description: seo.description });
}

/** 예전 주소 `/mvs-intro` → MVS 페이지 */
export default async function LegacyMvsIntroPage() {
  const locale = await getRequestLocale();
  permanentRedirect(withLocalePrefix("/software/mvs", locale));
}
