/** 데스크톱 헤더 1차 메뉴(직결 `NavLink`·드롭다운 트리거) 활성/비활성 */
export function desktopNavTopSegmentClass(active: boolean): string {
  return active
    ? "bg-slate-100 font-semibold text-msv-navy"
    : "font-medium text-slate-600 hover:bg-slate-50 hover:text-msv-navy";
}
