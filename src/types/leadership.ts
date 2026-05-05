export type LeadershipMember = {
  role: string;
  name: string;
  email: string;
  summary: string;
  /** `web/public` 기준 경로. 파일이 있으면 팀·회사 소개에서 사진으로 표시합니다. */
  photoSrc?: string;
  /** `static`: site-content 고정 인원, `extra`: 관리자 추가 인원 */
  source?: "static" | "extra";
  /** 추가 경영진만 — 목록 정렬용 */
  sortOrder?: number;
};
