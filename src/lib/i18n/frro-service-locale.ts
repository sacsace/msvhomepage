import type { SiteLocale } from "@/lib/site-locale";
import { pickLocale } from "@/lib/site-locale";
import { company } from "@/lib/site-content";

export type FrroServiceCopy = {
  metaTitle: string;
  metaDescription: string;
  pageTitle: string;
  pageDescription: string;
  scopeTitle: string;
  scopeItems: readonly string[];
  footNote: string;
  backToServices: string;
  contactCta: string;
};

const ko: FrroServiceCopy = {
  metaTitle: "FRRO 서비스",
  metaDescription: `${company.shortName} 인도 FRRO(지역 외국인 등록) 관련 등록·연장·변경 신고 실무 지원`,
  pageTitle: "FRRO 서비스",
  pageDescription:
    "인도 체류 외국인의 지역 외국인 등록(FRRO) 관련 절차를 현지 규정에 맞춰 정리하고, 신고·연장·변경 업무를 실무 중심으로 지원합니다.",
  scopeTitle: "지원 범위",
  scopeItems: [
    "초기 등록(C Registration) 및 연장(E Registration) 절차 안내·서류 정리",
    "체류지·여권·비자 정보 변경 시 FRRO 온라인/방문 신고 지원",
    "출국 의무(Exit permit) 등 요건이 붙는 경우 사전 점검 및 일정 조율",
    "고용주·주재원 담당자와의 커뮤니케이션(한국어·영어) 및 방문 동행(필요 시 협의)",
  ],
  footNote:
    "FRRO는 주(邦)·지역별로 운영 방식과 온라인 포털이 다를 수 있으며, 비자 종류·체류 목적에 따라 요구 서류가 달라집니다. 최종 판단은 담당 FRRO 및 이민 당국 기준이 우선합니다.",
  backToServices: "서비스로 돌아가기",
  contactCta: "문의하기",
};

const en: FrroServiceCopy = {
  metaTitle: "FRRO services",
  metaDescription: `${company.shortName} — practical support for India FRRO (Foreigners Regional Registration Office) registration, extensions and change filings.`,
  pageTitle: "FRRO services",
  pageDescription:
    "We align FRRO steps with local practice and support registrations, extensions and change-of-circumstance filings for foreign nationals staying in India.",
  scopeTitle: "What we cover",
  scopeItems: [
    "Guidance and document preparation for initial (C) registration and extension (E) registration",
    "Support for online or in-person FRRO filings when address, passport or visa details change",
    "Pre-checks and scheduling where exit permits or similar conditions apply",
    "Liaison with employers and assignee teams (Korean/English) and optional accompaniment by arrangement",
  ],
  footNote:
    "FRRO processes and portals differ by state and district, and required documents vary by visa category and purpose of stay. The responsible FRRO and immigration authorities have the final say.",
  backToServices: "Back to services",
  contactCta: "Contact us",
};

const zh: FrroServiceCopy = {
  metaTitle: "FRRO 服务",
  metaDescription: `${company.shortName} — 印度 FRRO（外国人地区登记处）相关登记、延期与变更申报实务协助。`,
  pageTitle: "FRRO 服务",
  pageDescription:
    "依据当地实务梳理在印度居留外国人的 FRRO 相关手续，并以实务为导向协助登记、延期与变更申报。",
  scopeTitle: "服务范围",
  scopeItems: [
    "首次登记（C Registration）与延期（E Registration）流程说明及材料整理",
    "居留地址、护照或签证信息变更时的 FRRO 线上/到场申报协助",
    "涉及出境许可（Exit permit）等要求时的预先核对与日程协调",
    "与雇主、外派负责人沟通（韩语/英语）及在需要时协商陪同到场",
  ],
  footNote:
    "FRRO 的办理方式与线上系统可能因邦/地区而异，所需材料亦因签证类别与居留目的不同。最终以主管 FRRO 及移民机关要求为准。",
  backToServices: "返回服务页",
  contactCta: "联系我们",
};

export function frroServiceCopy(locale: SiteLocale): FrroServiceCopy {
  return pickLocale(locale, { ko, en, zh });
}
