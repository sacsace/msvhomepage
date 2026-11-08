/**
 * 홈(`/`) — modern geometric sans (Gothic A1)
 * 제목·본문 동일 패밀리, 굵기·자간으로만 위계
 */
export const homeTypo = {
  kickerBlue:
    "font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500",

  kickerOnNavy:
    "font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55",

  kickerWeek: "font-sans text-[11px] font-medium uppercase tracking-[0.14em] text-white/50",

  leadInNavy:
    "font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500",

  kickerOnDarkPanel:
    "font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-white/55",

  heroMeta: "font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500",

  cardHeading:
    "font-sans text-[clamp(1.65rem,3vw,2.25rem)] font-semibold leading-[1.15] tracking-[-0.03em] text-msv-ink",

  cardHeadingWhite:
    "font-sans text-[clamp(1.65rem,3vw,2.25rem)] font-semibold leading-[1.15] tracking-[-0.03em] text-white",

  sectionHeading:
    "font-sans text-[clamp(1.85rem,3.8vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-msv-ink",

  sectionHeadingNavy:
    "font-sans text-[clamp(1.85rem,3.8vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-msv-ink",

  body: "font-sans text-[15px] font-normal leading-[1.75] text-slate-600 sm:text-base",

  bodyOnDark: "font-sans text-[15px] font-normal leading-[1.75] text-white/82 sm:text-base",

  bodySm: "font-sans text-sm font-normal leading-[1.7] text-slate-600",

  bodyWhiteMuted: "font-sans text-sm font-normal leading-[1.7] text-white/68 sm:text-[15px]",

  linkCta:
    "font-sans text-xs font-semibold tracking-[0.08em] text-msv-ink underline decoration-msv-mint underline-offset-8 transition hover:text-slate-600",

  itemTitle:
    "font-sans text-[1.05rem] font-semibold leading-snug tracking-[-0.02em] text-msv-ink",

  heroFoot: "font-sans text-[11px] tracking-[0.04em] text-slate-500",

  pageInset: "px-5 sm:px-8 lg:px-12",
} as const;

export const homeSpotlightLeadRow = "flex items-stretch gap-5";
