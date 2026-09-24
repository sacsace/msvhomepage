/**
 * 홈(`/`) 섹션 타이포그래피 토큰
 */
export const homeTypo = {
  /** 밝은 배경 · 섹션 라벨 */
  kickerBlue: "text-[13px] font-semibold text-msv-blue",

  /** 네이비 카드 · 라벨 */
  kickerOnNavy: "text-[13px] font-semibold text-white/75",

  /** 주간 달력 소구역 라벨 */
  kickerWeek: "text-[12px] font-medium text-white/60",

  /** 스포트라이트 카드 — 설명형 라벨 */
  leadInNavy: "text-[13px] font-semibold text-msv-navy/80",

  /** 서비스 그리드 좌측 패널 라벨 */
  kickerOnDarkPanel: "text-[13px] font-semibold text-white/70",

  /** 히어로 상단 메타(회사 태그라인) */
  heroMeta: "text-[13px] font-medium text-white/75",

  /** 밝은 카드 제목 */
  cardHeading: "text-lg font-semibold text-slate-900 sm:text-xl",

  /** 네이비 카드 제목 */
  cardHeadingWhite: "text-lg font-semibold text-white sm:text-xl",

  /** 큰 섹션 제목 — 밝은 배경 */
  sectionHeading: "text-xl font-semibold text-slate-900 sm:text-2xl",

  /** 큰 섹션 제목 — 네이비 카드 */
  sectionHeadingNavy: "text-xl font-semibold text-msv-navy sm:text-2xl",

  /** 본문 */
  body: "text-[15px] leading-relaxed text-slate-600 sm:text-base",

  /** 본문 — 어두운 배경 위 */
  bodyOnDark: "text-[15px] leading-relaxed text-white/85 sm:text-base",

  /** 보조 한 줄 */
  bodySm: "text-sm leading-relaxed text-slate-600",

  /** 네이비 카드 보조 설명 */
  bodyWhiteMuted: "text-sm leading-relaxed text-white/70 sm:text-[15px]",

  /** 인라인 링크형 CTA */
  linkCta: "text-sm font-semibold text-msv-blue underline-offset-4 hover:underline",

  /** 리스트·카드 소제목 */
  itemTitle: "text-[15px] font-semibold leading-snug text-slate-900",

  /** 히어로 하단 메타 */
  heroFoot: "text-xs text-white/55",

  /** max-w-6xl 내부 좌우 패딩 */
  pageInset: "px-5 sm:px-8",
} as const;

/** 스포트라이트 카드 상단 구분선 + 문장 */
export const homeSpotlightLeadRow = "flex items-stretch gap-3";
