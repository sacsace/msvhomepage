/**
 * 홈(`/`) 섹션 타이포그래피 토큰 — 눈썹·제목·본문·캡션 스케일 통일
 * (Tailwind 클래스 조각. 수정 시 홈 관련 컴포넌트만 영향.)
 */
export const homeTypo = {
  /** 밝은 배경 · 파란 대문자 눈썹 (Notice, 회계 실무 역량, VALUES …) */
  kickerBlue: "text-[11px] font-semibold uppercase tracking-[0.16em] text-msv-blue",

  /** 네이비 카드 · 파란 톤 눈썹 (Compliance 제목 위) */
  kickerOnNavy: "text-[11px] font-semibold uppercase tracking-[0.16em] text-msv-blue-soft/90",

  /** 주간 달력 소구역 라벨 */
  kickerWeek: "text-[11px] font-semibold uppercase tracking-[0.14em] text-white/55",

  /** 스포트라이트 카드 — 한글 설명형 눈썹(대문자 강제 없음) */
  leadInNavy: "text-[11px] font-semibold tracking-[0.02em] text-msv-navy/75 sm:text-[12px]",

  /** 서비스 그리드 좌측 네이비 패널 눈썹 */
  kickerOnDarkPanel: "text-[11px] font-semibold uppercase tracking-[0.16em] text-white/60",

  /** 히어로 상단 메타(회사 태그라인) — 기술 톤 유지 */
  heroMeta: "font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-white/68",

  /** 밝은 카드 제목 (공지·달력 등) */
  cardHeading: "text-xl font-semibold tracking-[-0.025em] text-slate-900 sm:text-[1.375rem] sm:leading-snug",

  /** 네이비 카드 제목 */
  cardHeadingWhite: "text-xl font-semibold tracking-[-0.025em] text-white sm:text-[1.375rem] sm:leading-snug",

  /** 큰 섹션 제목 — 밝은 배경(핵심 강점, 서비스 좌측 패널 제목) */
  sectionHeading: "text-[1.375rem] font-semibold tracking-[-0.027em] text-slate-900 sm:text-[1.625rem] sm:leading-snug",

  /** 큰 섹션 제목 — 네이비 카드(msv-card) */
  sectionHeadingNavy: "text-[1.375rem] font-semibold tracking-[-0.027em] text-msv-navy sm:text-[1.6875rem] sm:leading-snug",

  /** 본문(슬레이트) */
  body: "text-[15px] font-normal leading-relaxed tracking-[-0.013em] text-slate-600 sm:text-base sm:leading-[1.62]",

  /** 본문 — 어두운 히어로/패널 위 */
  bodyOnDark: "text-[15px] font-normal leading-relaxed tracking-[-0.011em] text-white/82 sm:text-base sm:leading-[1.58]",

  /** 보조 한 줄(서비스 패널 등 약간 작은 본문) */
  bodySm: "text-sm font-normal leading-relaxed tracking-[-0.01em] text-slate-600 sm:text-[15px] sm:leading-relaxed",

  /** 네이비 카드 보조 설명 */
  bodyWhiteMuted: "text-[13px] font-normal leading-relaxed tracking-[-0.01em] text-white/68 sm:text-[15px] sm:leading-relaxed",

  /** 인라인 링크형 CTA */
  linkCta: "text-sm font-semibold text-msv-blue underline-offset-4 hover:underline",

  /** 리스트·카드 소제목 */
  itemTitle: "text-[15px] font-semibold leading-snug tracking-[-0.015em] text-slate-900",

  /** 히어로 하단 메타 */
  heroFoot: "text-xs font-medium tracking-wide text-white/45",

  /** max-w-6xl 내부 좌우 패딩 통일 */
  pageInset: "px-5 sm:px-8",
} as const;

/** 스포트라이트 카드 상단 눈금 + 문장 */
export const homeSpotlightLeadRow = "flex items-stretch gap-3";
