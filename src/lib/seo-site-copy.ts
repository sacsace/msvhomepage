import { company } from "@/lib/site-content";
import type { SiteLocale } from "@/lib/site-locale";
import { pickLocale } from "@/lib/site-locale";

/** 사이트 기본 meta description (120–160자 권장) */
export const defaultSiteDescriptionKo =
  "인도 법인설립, 공장설립, 비즈니스 컨설팅, 법인회계, 세무감사를 MSV가 지원합니다. 고객 전용으로 업무 통합 시스템(MVS)·GPS 기반 출퇴근 기록(HeresNow)을 제공하며, 방갈로르 CPA 팀이 GST·TDS·FDI·FEMA까지 실행합니다.";

export const defaultSiteDescriptionEn =
  "MSV provides accounting and tax services for businesses in India, plus incorporation, factory setup and business consulting from Bangalore. Clients also receive the MVS integrated business system and HeresNow GPS attendance, with in-house support for GST, TDS, FDI and FEMA filings.";

export const defaultSiteDescriptionZh =
  "MSV 提供印度公司设立、工厂落地、商务咨询、法人会计与税务审计支持，并为客户提供业务集成系统（MVS）与基于 GPS 的考勤（HeresNow）。班加罗尔 CPA 团队执行 GST、TDS、FDI 与 FEMA 等实务。";

export function defaultSiteDescription(locale: SiteLocale): string {
  return pickLocale(locale, {
    ko: defaultSiteDescriptionKo,
    en: defaultSiteDescriptionEn,
    zh: defaultSiteDescriptionZh,
  });
}

/** 홈 `<title>` — 검색 스니펫에 핵심 서비스 키워드가 보이도록 구성 */
export const homePageTitleKo = `${company.shortName} | 인도 법인설립·공장설립·비즈니스 컨설팅·법인회계·세무감사`;

export const homePageTitleEn = `${company.shortName} | Accounting and tax services for businesses in India`;

export const homePageTitleZh = `${company.shortName} | 印度实体会计与税务 — 从记账到法定申报`;

export function homePageTitle(locale: SiteLocale): string {
  return pickLocale(locale, {
    ko: homePageTitleKo,
    en: homePageTitleEn,
    zh: homePageTitleZh,
  });
}
