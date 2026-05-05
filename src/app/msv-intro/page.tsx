import { redirect } from "next/navigation";
import { getRequestLocale } from "@/lib/get-request-locale";
import { withLocalePrefix } from "@/lib/site-locale";

/** 예전 주소 `/msv-intro` → `/software/mvs` */
export default async function MsvIntroRedirectPage() {
  const locale = await getRequestLocale();
  redirect(withLocalePrefix("/software/mvs", locale));
}
