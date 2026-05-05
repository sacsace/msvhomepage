export type Client = {
  id: string;
  name: string;
  /** 로고 이미지 공개 경로 (예: `/uploads/clients/...`) */
  logoSrc?: string;
  sector?: string;
  website?: string;
  note?: string;
  sortOrder: number;
  /** 메인 화면 「주요 고객사」에 노출(최대 12개) — 관리 UI: 「메인 화면」 */
  showOnHome?: boolean;
  createdAt: string;
  updatedAt: string;
};
