/**
 * JWITS 그룹사 페이지 「주요 고객사」 표시용.
 * 파비콘은 DuckDuckGo 아이콘 서비스(공개 도메인 기준) — 상표·저작권은 각 권리자에게 귀속됩니다.
 * 도메인을 알 수 없는 항목은 로고 없이 이름만 표시합니다.
 */
import { wilmatMajorCustomerFaviconUrl, type WilmatMajorCustomerDisplayRow } from "@/lib/wilmat-major-customers";
import type { SiteLocale } from "@/lib/site-locale";

type JwitsMajorCustomerSource = {
  readonly ko: string;
  readonly en: string;
  readonly zh: string;
  /** DDG 파비콘 — `staticLogoSrc`가 있으면 사용하지 않음 */
  readonly faviconDomain?: string;
  /** `/…` public 정적 로고(SVG/PNG 등) */
  readonly staticLogoSrc?: string;
};

const JWITS_MAJOR_CUSTOMER_SOURCES: readonly JwitsMajorCustomerSource[] = [
  { ko: "기아 인디아", en: "Kia India", zh: "起亚印度", faviconDomain: "kia.in" },
  { ko: "두림 야스카와", en: "Durim Yaskawa", zh: "斗林安川（Durim Yaskawa）", faviconDomain: "doolim-yaskawa.com" },
  { ko: "정현 E&G", en: "Junghyun E&G", zh: "正贤 E&G", faviconDomain: "junghyun.co.kr" },
  {
    ko: "현대엔지니어링 인디아",
    en: "Hyundai Engineering India",
    zh: "现代工程印度（Hyundai Engineering India）",
    staticLogoSrc: "/group/jw-industrial-tech-service/customers/hyundai-engineering-logo.svg",
  },
  {
    ko: "파일란트",
    en: "Pailant",
    zh: "Pailant",
    staticLogoSrc: "/group/jw-industrial-tech-service/customers/pailant-logo.svg",
  },
  { ko: "R-Teac Engineering", en: "R-Teac Engineering", zh: "R-Teac Engineering", faviconDomain: "rtaec.com" },
  {
    ko: "Rotia Automotive India",
    en: "Rotia Automotive India",
    zh: "Rotia Automotive India",
    /* 공개 웹사이트 미확인 — 로고 생략 */
  },
] as const;

export function jwitsMajorCustomerDisplayRows(locale: SiteLocale): readonly WilmatMajorCustomerDisplayRow[] {
  const nameKey = locale === "zh" ? "zh" : locale === "en" ? "en" : "ko";
  return JWITS_MAJOR_CUSTOMER_SOURCES.map((row) => ({
    name: row[nameKey],
    logoSrc:
      row.staticLogoSrc ?? (row.faviconDomain ? wilmatMajorCustomerFaviconUrl(row.faviconDomain) : undefined),
  }));
}
