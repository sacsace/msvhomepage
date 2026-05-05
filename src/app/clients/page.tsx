import { permanentRedirect } from "next/navigation";
import { getRequestLocale } from "@/lib/get-request-locale";
import { withLocalePrefix } from "@/lib/site-locale";

/** 예전 공개 URL 호환 — About 하위 고객사 페이지로 고정 */
export default async function ClientsPageRedirect() {
  const locale = await getRequestLocale();
  permanentRedirect(withLocalePrefix("/about/clients", locale));
}
