import type { SiteLocale } from "@/lib/site-locale";
import { pickLocale } from "@/lib/site-locale";

export function notFoundSeo(locale: SiteLocale) {
  return {
    title: pickLocale(locale, { ko: "페이지를 찾을 수 없습니다", en: "Page not found", zh: "页面未找到" }),
    description: pickLocale(locale, {
      ko: "요청하신 페이지가 없거나 주소가 변경되었습니다.",
      en: "The page you requested does not exist or the URL has changed.",
      zh: "您访问的页面不存在或链接已变更。",
    }),
  };
}
