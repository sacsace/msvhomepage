import { redirect } from "next/navigation";
import { getRequestLocale } from "@/lib/get-request-locale";
import { withLocalePrefix } from "@/lib/site-locale";

/** 예전 주소 `/qna` → 문의 페이지의 질의응답 구역 */
export default async function QnaPage() {
  const locale = await getRequestLocale();
  redirect(withLocalePrefix("/contact", locale));
}
