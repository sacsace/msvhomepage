export const TAX_CALENDAR_KINDS = [
  "TDS",
  "GST",
  "PT",
  "ESI",
  "ECB",
  "ADVANCE_TAX",
  "SHAREHOLDER_MEETING",
] as const;

export type TaxCalendarKind = (typeof TAX_CALENDAR_KINDS)[number];

export type TaxCalendarEvent = {
  id: string;
  /** YYYY-MM-DD (로컬 기준) */
  date: string;
  kind: TaxCalendarKind;
  title?: string;
  note?: string;
  createdAt: string;
  updatedAt: string;
};
