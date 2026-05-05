import { headers } from "next/headers";
import type { SiteLocale } from "@/lib/site-locale";

/** 미들웨어가 설정한 `x-msv-locale` (한국어 경로에서는 미설정 → ko) */
export async function getRequestLocale(): Promise<SiteLocale> {
  const h = await headers();
  const v = h.get("x-msv-locale");
  if (v === "en" || v === "zh") return v;
  return "ko";
}
