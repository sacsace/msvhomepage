/**
 * Wilmat 그룹사 페이지 「주요 고객」 표시용.
 * 파비콘은 DuckDuckGo 아이콘 서비스(공개 도메인 기준) — 상표·저작권은 각 권리자에게 귀속됩니다.
 */
export type WilmatMajorCustomerSource = {
  readonly name: string;
  /** `icons.duckduckgo.com/ip3/{domain}.ico` — 없으면 텍스트만 */
  readonly faviconDomain?: string;
};

export const WILMAT_MAJOR_CUSTOMERS: readonly WilmatMajorCustomerSource[] = [
  { name: "Kempegowda International Airport", faviconDomain: "bengaluruairport.com" },
  { name: "Embassy Group", faviconDomain: "embassygroup.com" },
  { name: "DLF Mall", faviconDomain: "dlf.in" },
  { name: "Sheraton Grand Hotel", faviconDomain: "marriott.com" },
  { name: "Hilton Hotel Convention Center", faviconDomain: "hilton.com" },
  { name: "Lido Mall, MG Road" },
  { name: "Kia Motors India", faviconDomain: "kia.in" },
  { name: "Brigade Group", faviconDomain: "brigadegroup.com" },
  { name: "Hyatt", faviconDomain: "hyatt.com" },
  { name: "Kia Motors Showroom", faviconDomain: "kia.in" },
  { name: "Marriott Hotel", faviconDomain: "marriott.com" },
  { name: "Prestige Group", faviconDomain: "prestigeconstructions.com" },
] as const;

export function wilmatMajorCustomerFaviconUrl(domain: string): string {
  const host = domain.replace(/^www\./i, "").trim();
  return `https://icons.duckduckgo.com/ip3/${encodeURIComponent(host)}.ico`;
}

export type WilmatMajorCustomerDisplayRow = {
  readonly name: string;
  readonly logoSrc?: string;
};

export function wilmatMajorCustomerDisplayRows(): readonly WilmatMajorCustomerDisplayRow[] {
  return WILMAT_MAJOR_CUSTOMERS.map((c) => ({
    name: c.name,
    logoSrc: c.faviconDomain ? wilmatMajorCustomerFaviconUrl(c.faviconDomain) : undefined,
  }));
}
