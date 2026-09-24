import { company } from "@/lib/site-content";
import type { SiteLocale } from "@/lib/site-locale";
import { pickLocale } from "@/lib/site-locale";

/** 사이트 기본 meta description (120–160자 권장) */
export const defaultSiteDescriptionKo =
  "인도 법인설립, 공장설립, 비즈니스 컨설팅, 법인회계, 세무감사를 MSV가 지원합니다. 방갈로르 현지 CPA 팀이 GST·TDS·FDI·FEMA·자본 송금까지 실행하며, 한국 본사와 연계해 인도 진출·운영을 돕습니다.";

export const defaultSiteDescriptionEn =
  "MSV (Minsub Ventures) supports India entity accounting, tax and on-the-ground execution from Bangalore. Our resident CPA-led team handles bookkeeping, GST, TDS, corporate tax, FDI and FEMA filings, capital remittances and equity events as one accountable team for foreign companies entering India.";

export const defaultSiteDescriptionZh =
  "MSV（민섭 벤처스）为印度实体会计、税务与现场执行提供一体化支持。班加罗尔常驻注册会计师团队负责 IFRS/Ind AS 记账、GST、TDS、企业所得税、FDI 与 FEMA 申报，以及增资与资本汇出等实务，服务外国企业印度落地与运营。";

export function defaultSiteDescription(locale: SiteLocale): string {
  return pickLocale(locale, {
    ko: defaultSiteDescriptionKo,
    en: defaultSiteDescriptionEn,
    zh: defaultSiteDescriptionZh,
  });
}

/** 홈 `<title>` — 검색 스니펫에 핵심 서비스 키워드가 보이도록 구성 */
export const homePageTitleKo = `${company.shortName} | 인도 법인설립·공장설립·비즈니스 컨설팅·법인회계·세무감사`;

export const homePageTitleEn = `${company.shortName} | India entity accounting & tax — bookkeeping through statutory filings`;

export const homePageTitleZh = `${company.shortName} | 印度实体会计与税务 — 从记账到法定申报`;

export function homePageTitle(locale: SiteLocale): string {
  return pickLocale(locale, {
    ko: homePageTitleKo,
    en: homePageTitleEn,
    zh: homePageTitleZh,
  });
}
