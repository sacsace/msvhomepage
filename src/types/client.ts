export type Client = {
  id: string;
  name: string;
  /** 로고 이미지 공개 경로 (예: `/uploads/clients/...`) */
  logoSrc?: string;
  sector?: string;
  website?: string;
  note?: string;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
};
