import type { SiteLocale } from "@/lib/site-locale";
import { pickLocale } from "@/lib/site-locale";

export function legacyRedirectSeo(locale: SiteLocale, kind: "qna" | "clients" | "mvs-intro" | "msv-intro") {
  const titles = {
    qna: pickLocale(locale, { ko: "문의", en: "Contact", zh: "联系" }),
    clients: pickLocale(locale, { ko: "고객사", en: "Clients", zh: "客户" }),
    "mvs-intro": pickLocale(locale, { ko: "MVS 소개", en: "MVS overview", zh: "MVS 介绍" }),
    "msv-intro": pickLocale(locale, { ko: "MVS 소개", en: "MVS overview", zh: "MVS 介绍" }),
  } as const;
  return {
    title: titles[kind],
    description: pickLocale(locale, {
      ko: "이전 주소입니다. 새 페이지로 이동합니다.",
      en: "Legacy URL. You will be redirected to the current page.",
      zh: "旧地址，将跳转到新页面。",
    }),
  };
}
