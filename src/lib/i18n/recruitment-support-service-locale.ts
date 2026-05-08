import type { SiteLocale } from "@/lib/site-locale";
import { pickLocale } from "@/lib/site-locale";
import { company } from "@/lib/site-content";

export type RecruitmentSupportServiceCopy = {
  metaTitle: string;
  metaDescription: string;
  pageTitle: string;
  pageDescription: string;
  scopeTitle: string;
  scopeItems: readonly string[];
  backToServices: string;
  contactCta: string;
};

const ko: RecruitmentSupportServiceCopy = {
  metaTitle: "채용지원 서비스",
  metaDescription: "현지 인력 채용부터 온보딩까지 채용 실무를 지원합니다.",
  pageTitle: "채용지원 서비스",
  pageDescription: "인도 현지 채용 프로세스를 실무 중심으로 지원해 채용 리드타임을 줄입니다.",
  scopeTitle: "지원 범위",
  scopeItems: [
    "직무 정의·채용 공고 작성 및 채널 운영",
    "이력서 선별, 인터뷰 일정 조율, 후보자 커뮤니케이션",
    "오퍼·입사 서류 및 초기 온보딩 프로세스 지원",
  ],
  backToServices: "회계 서비스로 돌아가기",
  contactCta: "문의하기",
};

const en: RecruitmentSupportServiceCopy = {
  metaTitle: "Recruitment support",
  metaDescription: `${company.shortName} — hands-on hiring support in India from sourcing through onboarding.`,
  pageTitle: "Recruitment support",
  pageDescription:
    "We support India hiring operations end-to-end to shorten time-to-fill and reduce process friction.",
  scopeTitle: "What we cover",
  scopeItems: [
    "Role definitions, job descriptions and channel management",
    "CV screening, interview scheduling and candidate communication",
    "Offer letters, joining paperwork and early onboarding support",
  ],
  backToServices: "Back to services",
  contactCta: "Contact us",
};

const zh: RecruitmentSupportServiceCopy = {
  metaTitle: "招聘支持服务",
  metaDescription: `${company.shortName} — 从当地招聘到入职手续的实务支持。`,
  pageTitle: "招聘支持服务",
  pageDescription: "以实务为导向协助印度本地招聘流程，缩短招聘周期。",
  scopeTitle: "服务范围",
  scopeItems: [
    "岗位职责界定、职位说明撰写与发布渠道运营",
    "简历筛选、面试安排与候选人沟通",
    "录用通知、入职资料及初期入职流程协助",
  ],
  backToServices: "返回服务页",
  contactCta: "联系我们",
};

export function recruitmentSupportServiceCopy(locale: SiteLocale): RecruitmentSupportServiceCopy {
  return pickLocale(locale, { ko, en, zh });
}
