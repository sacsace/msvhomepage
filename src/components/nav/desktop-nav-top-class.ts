/** 데스크톱 헤더 1차 메뉴 — 선택 시 연한 회색 캡슐 */
export function desktopNavTopSegmentClass(active: boolean): string {
  return active
    ? "rounded-full bg-slate-200/90 font-semibold text-msv-navy"
    : "rounded-full font-medium text-slate-600 hover:bg-slate-100 hover:text-msv-navy";
}

/** 메가메뉴·드롭다운 내 링크 — 현재 경로(또는 접두 일치) 하이라이트 */
export function desktopNavMegaMenuItemClass(active: boolean): string {
  return active
    ? "rounded-md bg-slate-200/90 font-semibold text-msv-navy"
    : "font-medium text-slate-600 hover:bg-slate-100 hover:text-msv-navy";
}
