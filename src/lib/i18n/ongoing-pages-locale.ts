import type { SiteLocale } from "@/lib/site-locale";
import { pickLocale } from "@/lib/site-locale";
import { company } from "@/lib/site-content";

export type OngoingPagesCopy = {
  metaTitle: string;
  metaDescription: string;
  pageTitle: string;
  pageDescription: string;
  emptyMessage: string;
  colNo: string;
  colDate: string;
  colTitleSummary: string;
};

const ko: OngoingPagesCopy = {
  metaTitle: "프로젝트 현황",
  metaDescription: `${company.shortName}에서 현재 진행 중인 프로젝트·업무 현황을 안내합니다.`,
  pageTitle: "프로젝트 현황",
  pageDescription:
    "진행 중인 주요 프로젝트·업무를 정리해 두었습니다. 자세한 협의는 문의를 통해 연락 주시기 바랍니다.",
  emptyMessage: "등록된 진행 업무가 없습니다.",
  colNo: "번호",
  colDate: "업데이트",
  colTitleSummary: "제목 · 요약",
};

const en: OngoingPagesCopy = {
  metaTitle: "Project status",
  metaDescription: `Current projects and workstreams at ${company.shortName}.`,
  pageTitle: "Project status",
  pageDescription:
    "A summary of major projects and work in progress. For details, please contact us through the inquiry form.",
  emptyMessage: "No active projects listed yet.",
  colNo: "No.",
  colDate: "Updated",
  colTitleSummary: "Title · summary",
};

const zh: OngoingPagesCopy = {
  metaTitle: "项目动态",
  metaDescription: `${company.shortName} 当前进行中的项目与业务动态。`,
  pageTitle: "项目动态",
  pageDescription: "汇总进行中的主要项目与业务。如需进一步沟通，请通过咨询与我们联系。",
  emptyMessage: "暂无进行中的项目。",
  colNo: "序号",
  colDate: "更新",
  colTitleSummary: "标题 · 摘要",
};

export function ongoingPagesCopy(locale: SiteLocale): OngoingPagesCopy {
  return pickLocale(locale, { ko, en, zh });
}

export function ongoingDateFormatLocale(locale: SiteLocale): string {
  return pickLocale(locale, { ko: "ko-KR", en: "en-GB", zh: "zh-CN" });
}
