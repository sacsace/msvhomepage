/** 공개 사이트 언어 — URL 접두 `/en`, `/zh` 와 미들웨어 `x-msv-locale` 와 동일 */

export type SiteLocale = "ko" | "en" | "zh";

export function localeFromPathname(pathname: string): SiteLocale {
  if (pathname === "/en" || pathname.startsWith("/en/")) return "en";
  if (pathname === "/zh" || pathname.startsWith("/zh/")) return "zh";
  return "ko";
}

/** `/en/about` → `/about` (브라우저 URL 기준) */
export function stripLocalePrefix(pathname: string): string {
  if (pathname === "/en" || pathname === "/zh") return "/";
  if (pathname.startsWith("/en/")) return pathname.slice(3) || "/";
  if (pathname.startsWith("/zh/")) return pathname.slice(3) || "/";
  return pathname;
}

const STATIC_EXT = /\.(?:pdf|png|jpe?g|gif|webp|svg|ico|txt|xml|json|map|woff2?)$/i;

/** 정적 파일·API·관리자 경로는 접두를 붙이지 않음 */
export function withLocalePrefix(href: string, locale: SiteLocale): string {
  if (locale === "ko") return href;
  if (!href.startsWith("/")) return href;
  if (href.startsWith("/api") || href.startsWith("/admin")) return href;

  const pathOnly = href.split(/[?#]/)[0] ?? href;
  if (STATIC_EXT.test(pathOnly)) return href;

  const prefix = locale === "en" ? "/en" : "/zh";
  const tail = href.slice(pathOnly.length);
  if (pathOnly === "/") return `${prefix}${tail}`;
  if (pathOnly === prefix || pathOnly.startsWith(`${prefix}/`)) return href;
  return `${prefix}${pathOnly}${tail}`;
}

/** ko / en / zh UI·콘텐츠 분기 */
export function pickLocale<T>(locale: SiteLocale, map: { ko: T; en: T; zh: T }): T {
  if (locale === "en") return map.en;
  if (locale === "zh") return map.zh;
  return map.ko;
}

/** 내비 활성: 비접두 경로 `href` 와 현재 `pathname`(접두 포함 가능) 비교 */
export function isNavActive(pathname: string, href: string): boolean {
  const bare = stripLocalePrefix(pathname.split("#")[0] || pathname);
  const pathHref = href.split("#")[0] || href;
  if (bare === pathHref) return true;
  if (pathHref === "/" || !bare.startsWith(`${pathHref}/`)) return false;
  // `/services`는 하위 전용 URL(합병·청산 등)과 구분 — 접두 매칭으로 전부 활성 처리하지 않음
  if (pathHref === "/services") return false;
  return true;
}
