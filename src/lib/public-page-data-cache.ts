import { unstable_cache } from "next/cache";
import {
  getAnnouncement,
  readAnnouncementsListPublic,
} from "@/lib/announcements-store";
import { findArticleBySlug, readArticlesListPublic } from "@/lib/articles-store";
import { readClients } from "@/lib/clients-store";
import { readCompanyHistoryPublic } from "@/lib/company-history-store";
import { getLeadershipForPublic } from "@/lib/leadership-resolve";
import { readOngoingTasks } from "@/lib/ongoing-tasks-store";
import { readStaffProfiles } from "@/lib/staff-profiles-store";
import { readTaxCalendar } from "@/lib/tax-calendar-store";

/**
 * 공개 마케팅 페이지의 DB·파일 읽기 캐시(초).
 * 관리자 수정 반영은 최대 이 시간만큼 지연될 수 있습니다.
 * (홈 공지·달력 등 — 너무 길면 메인 반영이 느리게 느껴질 수 있음)
 *
 * Next 16: `export const revalidate` 는 페이지·레이아웃에서 **숫자 리터럴**만
 * 정적 분석됩니다. 값을 바꾸면 `app/page.tsx`, `app/notice/...` 의 `revalidate` 리터럴도 같이 맞출 것.
 */
export const PUBLIC_PAGE_DATA_REVALIDATE_SEC = 15;

const opts = { revalidate: PUBLIC_PAGE_DATA_REVALIDATE_SEC } as const;

/** 공지 목록(본문 제외) — Next 데이터 캐시 항목당 2MB 제한 회피 */
export const getCachedAnnouncementsList = unstable_cache(
  () => readAnnouncementsListPublic(),
  ["msv-public-announcements-list"],
  opts,
);

/** 공지 단건(상세) — 항목별 캐시 */
export function getCachedAnnouncementById(id: string) {
  return unstable_cache(
    () => getAnnouncement(id),
    ["msv-public-announcement", id],
    opts,
  )();
}

export const getCachedTaxCalendar = unstable_cache(
  () => readTaxCalendar(),
  ["msv-public-tax-calendar"],
  opts,
);

export const getCachedCompanyHistoryPublic = unstable_cache(
  () => readCompanyHistoryPublic(),
  ["msv-public-company-history"],
  opts,
);

export const getCachedClients = unstable_cache(() => readClients(), ["msv-public-clients"], opts);

export const getCachedOngoingTasks = unstable_cache(
  () => readOngoingTasks(),
  ["msv-public-ongoing-tasks"],
  opts,
);

/** 자료실 목록(본문 제외) — Next 데이터 캐시 항목당 2MB 제한 회피 */
export const getCachedArticlesList = unstable_cache(
  () => readArticlesListPublic(),
  ["msv-public-articles-list"],
  opts,
);

export const getCachedLeadershipForPublic = unstable_cache(
  () => getLeadershipForPublic(),
  ["msv-public-leadership", "summary-en"],
  opts,
);

export const getCachedStaffProfiles = unstable_cache(
  () => readStaffProfiles(),
  ["msv-public-staff-profiles"],
  opts,
);

/** 슬러그별 자료실 글 — 목록 캐시와 별도 엔트리 */
export function getCachedArticleBySlug(slug: string) {
  return unstable_cache(
    () => findArticleBySlug(slug),
    ["msv-public-article-slug", slug],
    opts,
  )();
}
