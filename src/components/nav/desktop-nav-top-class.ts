/** 데스크톱 헤더 1차 메뉴 — 애플 톤의 캡슐형·낮은 채도 배경 */
export function desktopNavTopSegmentClass(active: boolean): string {
  return active
    ? "rounded-full bg-slate-900/[0.06] font-semibold text-msv-navy"
    : "rounded-full font-medium text-slate-600 hover:bg-slate-900/[0.04] hover:text-msv-navy";
}
