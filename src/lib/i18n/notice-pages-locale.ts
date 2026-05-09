import type { SiteLocale } from "@/lib/site-locale";
import { pickLocale } from "@/lib/site-locale";
import { company } from "@/lib/site-content";

export type NoticePagesCopy = {
  metaTitle: string;
  metaDescription: string;
  pageTitle: string;
  pageDescription: string;
  emptyMessage: string;
  colNo: string;
  colDate: string;
  colPinned: string;
  colTitle: string;
  colSummary: string;
  pinnedBadge: string;
  /** 상세 상단·하단 목록 링크 */
  listNavLabel: string;
  /** 본문 아래 « 목록 » */
  backToList: string;
  /** `<title>` 접미: `제목 | …` */
  detailTitleSuffix: string;
  /** 메타 전용(항목 없음 등) */
  metaFallbackTitle: string;
};

const ko: NoticePagesCopy = {
  metaTitle: "공지사항",
  metaDescription: `${company.shortName} 공지사항 목록`,
  pageTitle: "공지사항",
  pageDescription: "회사 소식과 안내를 올립니다.",
  emptyMessage: "등록된 공지가 없습니다.",
  colNo: "번호",
  colDate: "등록일",
  colPinned: "고정",
  colTitle: "제목",
  colSummary: "요약",
  pinnedBadge: "고정",
  listNavLabel: "공지사항 목록",
  backToList: "← 목록",
  detailTitleSuffix: "공지사항",
  metaFallbackTitle: "공지",
};

const en: NoticePagesCopy = {
  metaTitle: "Announcements",
  metaDescription: `${company.shortName} — announcements and notices.`,
  pageTitle: "Announcements",
  pageDescription: "Company news and notices.",
  emptyMessage: "No announcements yet.",
  colNo: "No.",
  colDate: "Date",
  colPinned: "Pin",
  colTitle: "Title",
  colSummary: "Summary",
  pinnedBadge: "Pinned",
  listNavLabel: "All announcements",
  backToList: "← Back to list",
  detailTitleSuffix: "Announcements",
  metaFallbackTitle: "Announcements",
};

const zh: NoticePagesCopy = {
  metaTitle: "公告",
  metaDescription: `${company.shortName} — 公告列表。`,
  pageTitle: "公告",
  pageDescription: "发布公司动态与通知。",
  emptyMessage: "暂无公告。",
  colNo: "序号",
  colDate: "发布日期",
  colPinned: "置顶",
  colTitle: "标题",
  colSummary: "摘要",
  pinnedBadge: "置顶",
  listNavLabel: "公告列表",
  backToList: "← 返回列表",
  detailTitleSuffix: "公告",
  metaFallbackTitle: "公告",
};

export function noticePagesCopy(locale: SiteLocale): NoticePagesCopy {
  return pickLocale(locale, { ko, en, zh });
}

/** `toLocaleDateString` 인자 */
export function noticeDateFormatLocale(locale: SiteLocale): string {
  return pickLocale(locale, { ko: "ko-KR", en: "en-GB", zh: "zh-CN" });
}
