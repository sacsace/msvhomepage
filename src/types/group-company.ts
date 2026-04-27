/** `site-content.ts`의 `groupCompanies` 항목 형태 */
export type GroupCompany = {
  slug: string;
  /** 네비·푸터 등 짧은 표기 */
  menuLabel: string;
  legalName: string;
  role: string;
  highlights: readonly string[];
  /** 소개 페이지 본문(여러 문단, `\n\n` 구분) */
  intro: string;
  website?: string;
};
