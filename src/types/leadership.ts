export type LeadershipMember = {
  role: string;
  name: string;
  email: string;
  summary: string;
  /** `web/public` 기준 경로. 파일이 있으면 팀·회사 소개에서 사진으로 표시합니다. */
  photoSrc?: string;
};
