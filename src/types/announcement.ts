export type Announcement = {
  id: string;
  title: string;
  body: string;
  pinned: boolean;
  createdAt: string;
  updatedAt: string;
};

/** 공개 목록·홈 미리보기용(본문 미포함) — `unstable_cache` 직렬화 크기 제한 대응 */
export type AnnouncementListItem = {
  id: string;
  title: string;
  pinned: boolean;
  createdAt: string;
  updatedAt: string;
  /** 목록·요약용 평문(HTML 제거·길이 제한) */
  summary: string;
};
