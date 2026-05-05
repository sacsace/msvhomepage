import { permanentRedirect } from "next/navigation";
import { getRequestLocale } from "@/lib/get-request-locale";
import { withLocalePrefix } from "@/lib/site-locale";

/** 예전 주소 `/mvs-intro` → MVS 페이지 */
export default async function LegacyMvsIntroPage() {
  const locale = await getRequestLocale();
  permanentRedirect(withLocalePrefix("/software/mvs", locale));
}
