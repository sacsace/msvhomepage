import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getRequestLocale } from "@/lib/get-request-locale";
import { legacyRedirectSeo } from "@/lib/i18n/redirect-pages-locale";
import { noIndexPageSeo } from "@/lib/seo-metadata";
import { withLocalePrefix } from "@/lib/site-locale";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const seo = legacyRedirectSeo(locale, "qna");
  return noIndexPageSeo({ title: seo.title, description: seo.description });
}

/** 예전 주소 `/qna` → 문의 페이지의 질의응답 구역 */
export default async function QnaPage() {
  const locale = await getRequestLocale();
  redirect(withLocalePrefix("/contact", locale));
}
