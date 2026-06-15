import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import { getRequestLocale } from "@/lib/get-request-locale";
import { legacyRedirectSeo } from "@/lib/i18n/redirect-pages-locale";
import { noIndexPageSeo } from "@/lib/seo-metadata";
import { withLocalePrefix } from "@/lib/site-locale";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const seo = legacyRedirectSeo(locale, "clients");
  return noIndexPageSeo({ title: seo.title, description: seo.description });
}

/** 예전 공개 URL 호환 — About 하위 고객사 페이지로 고정 */
export default async function ClientsPageRedirect() {
  const locale = await getRequestLocale();
  permanentRedirect(withLocalePrefix("/about/clients", locale));
}
