import { unstable_cache } from "next/cache";
import { readAnnouncements } from "@/lib/announcements-store";
import { readArticles, findArticleBySlug } from "@/lib/articles-store";
import { readClients } from "@/lib/clients-store";
import { readCompanyHistoryPublic } from "@/lib/company-history-store";
import { getLeadershipForPublic } from "@/lib/leadership-resolve";
import { readOngoingTasks } from "@/lib/ongoing-tasks-store";
import { readStaffProfiles } from "@/lib/staff-profiles-store";
import { readTaxCalendar } from "@/lib/tax-calendar-store";

/**
 * 공개 마케팅 페이지의 DB·파일 읽기 캐시(초).
 * 관리자 수정 반영은 최대 이 시간만큼 지연될 수 있습니다.
 */
export const PUBLIC_PAGE_DATA_REVALIDATE_SEC = 60;

const opts = { revalidate: PUBLIC_PAGE_DATA_REVALIDATE_SEC } as const;

export const getCachedAnnouncements = unstable_cache(
  () => readAnnouncements(),
  ["msv-public-announcements"],
  opts,
);

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

export const getCachedArticles = unstable_cache(() => readArticles(), ["msv-public-articles"], opts);

export const getCachedLeadershipForPublic = unstable_cache(
  () => getLeadershipForPublic(),
  ["msv-public-leadership"],
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
