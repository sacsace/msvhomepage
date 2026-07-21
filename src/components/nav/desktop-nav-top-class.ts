/** 데스크톱 헤더 1차 메뉴 — 애플 톤의 캡슐형·낮은 채도 배경 */
export function desktopNavTopSegmentClass(active: boolean): string {
  return active
    ? "rounded-full bg-slate-900/[0.11] font-bold text-msv-navy shadow-sm"
    : "rounded-full font-medium text-slate-600 hover:bg-slate-900/[0.04] hover:text-msv-navy";
}

/** 메가메뉴·드롭다운 내 링크 — 현재 경로(또는 접두 일치) 하이라이트 */
export function desktopNavMegaMenuItemClass(active: boolean): string {
  return active
    ? "border border-msv-blue/60 bg-[#dcecff] font-bold text-[#082f5b] shadow-[inset_3px_0_0_#0071e3,0_1px_3px_rgba(15,23,42,0.10)]"
    : "font-medium text-slate-600 hover:bg-slate-100 hover:text-msv-navy";
}
