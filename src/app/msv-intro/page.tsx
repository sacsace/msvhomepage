import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getRequestLocale } from "@/lib/get-request-locale";
import { legacyRedirectSeo } from "@/lib/i18n/redirect-pages-locale";
import { noIndexPageSeo } from "@/lib/seo-metadata";
import { withLocalePrefix } from "@/lib/site-locale";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const seo = legacyRedirectSeo(locale, "msv-intro");
  return noIndexPageSeo({ title: seo.title, description: seo.description });
}

/** 예전 주소 `/msv-intro` → `/software/mvs` */
export default async function MsvIntroRedirectPage() {
  const locale = await getRequestLocale();
  redirect(withLocalePrefix("/software/mvs", locale));
}
