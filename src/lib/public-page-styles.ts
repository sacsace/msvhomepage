/** 히어로 아래 본문 — 연한 배경·좌우(맥스폭·세로 패딩은 StandardPageBody에서 조합) */
export const publicPageCanvasPad =
  "w-full bg-[#f5f6f8] px-4 py-12 sm:px-6 sm:py-14";

export const publicPageBodyShell = "w-full bg-[#f5f6f8] px-4 sm:px-6";
export const publicPageBodyPadDefault = "py-12 sm:py-14";
export const publicPageBodyPadSpacious = "py-14 sm:py-16";

/** 공개 내부 페이지 — 회사 소개·팀 등에서 공통 카드 셸 */
export const publicContentCard =
  "rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_1px_2px_rgb(15_23_42/0.04)] transition-[border-color,box-shadow] duration-200 hover:border-slate-300/90 hover:shadow-[0_4px_14px_rgb(15_23_42/0.06)] sm:p-8";

/** 자료실·공지 등 리치 HTML 본문 공통 타이포(자료실 상세와 동일) */
export const publicArticleBodyProse =
  "article-body [&_a]:text-blue-700 [&_a]:underline [&_blockquote]:my-4 [&_blockquote]:border-l-2 [&_blockquote]:border-slate-200 [&_blockquote]:pl-4 [&_blockquote]:text-slate-600 [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-semibold [&_h3]:mt-6 [&_h3]:text-lg [&_h3]:font-semibold [&_img]:my-4 [&_img]:max-w-full [&_img]:rounded-sm [&_li]:my-0.5 [&_ol]:my-3 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:my-3 [&_pre]:my-4 [&_pre]:overflow-x-auto [&_pre]:rounded-md [&_pre]:bg-slate-50 [&_pre]:p-3 [&_pre]:text-xs [&_ul]:my-3 [&_ul]:list-disc [&_ul]:pl-6";

/** 직원 그리드용 작은 카드 — 테두리 대신 얕은 그림자·호버(애플 톤) */
export const publicProfileTile =
  "rounded-3xl bg-white/95 px-4 py-5 shadow-[0_2px_20px_-4px_rgba(15,23,42,0.07)] ring-1 ring-slate-900/[0.035] transition-[transform,box-shadow] duration-300 ease-out will-change-transform hover:-translate-y-0.5 hover:shadow-[0_12px_40px_-10px_rgba(15,23,42,0.14)] sm:px-5 sm:py-6";

/** 섹션 세로 간격 */
export const publicSectionBlock = "mt-14 scroll-mt-24 sm:mt-16";
