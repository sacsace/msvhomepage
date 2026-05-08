/** 그룹사 소개 페이지 갤러리 한 장 — 파일은 `web/public` 아래에 두고 `src`는 루트 기준 경로 */
export type GroupCompanyImage = {
  /** 예: `/group/wilmat/showroom-1.jpg` */
  src: string;
  alt: string;
  /** 썸네일 아래 짧은 설명(선택) */
  caption?: string;
};

/** `site-content.ts`의 `groupCompanies` 항목 형태 */
export type GroupCompany = {
  slug: string;
  /** 네비·푸터 등 짧은 표기 */
  menuLabel: string;
  legalName: string;
  role: string;
  highlights: readonly string[];
  /** 선택. 주요 납품·시공 실적 등(영문 표기 등) — 있으면 「주요 고객」 카드로 표시 */
  majorCustomers?: readonly string[];
  /** `public` 기준 경로 — 있으면 그룹사 상단 히어로에 표시(예: `/group/.../logo.png`) */
  logoSrc?: string;
  /** 소개 페이지 본문(여러 문단, `\n\n` 구분) */
  intro: string;
  website?: string;
  /** 선택. `public` 기준 경로 — 비즈니스 소개 PDF 등 */
  profilePdf?: string;
  /** 선택. 제품·현장 사진 등 — 있으면 소개 페이지에 그리드로 표시 */
  gallery?: readonly GroupCompanyImage[];
};
