import { cookies } from "next/headers";
import { ADMIN_UI_LOCALE_COOKIE, type AdminUiLocale } from "@/lib/admin-ui-locale-constants";

export type { AdminUiLocale } from "@/lib/admin-ui-locale-constants";

export async function getAdminUiLocale(): Promise<AdminUiLocale> {
  const raw = (await cookies()).get(ADMIN_UI_LOCALE_COOKIE)?.value;
  return raw === "en" ? "en" : "ko";
}
