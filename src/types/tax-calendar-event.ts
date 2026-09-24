export const TAX_CALENDAR_KINDS = [
  "TDS",
  "GST",
  "PT",
  "ESI",
  "ECB",
  "ADVANCE_TAX",
  "SHAREHOLDER_MEETING",
  "HOLIDAY",
] as const;

export type TaxCalendarKind = (typeof TAX_CALENDAR_KINDS)[number];

const PRESET_SET = new Set<string>(TAX_CALENDAR_KINDS);

export function isTaxCalendarPresetKind(v: string): v is TaxCalendarKind {
  return PRESET_SET.has(v);
}

/** 관리 폼: 프리셋 선택 + 직접 입력 전환용(서버로는 보내지 않음) */
export const TAX_CALENDAR_FORM_CUSTOM = "__MSV_CUSTOM_KIND__";

export const TAX_CALENDAR_KIND_LABEL_FULL: Record<TaxCalendarKind, string> = {
  TDS: "TDS",
  GST: "GST",
  PT: "PT (Professional Tax)",
  ESI: "ESI",
  ECB: "ECB",
  ADVANCE_TAX: "Advance Tax",
  SHAREHOLDER_MEETING: "주주회의",
  HOLIDAY: "휴일",
};

/** 홈 달력 칩 등 짧은 표기 */
export const TAX_CALENDAR_KIND_LABEL_COMPACT: Record<TaxCalendarKind, string> = {
  TDS: "TDS",
  GST: "GST",
  PT: "PT",
  ESI: "ESI",
  ECB: "ECB",
  ADVANCE_TAX: "Adv.Tax",
  SHAREHOLDER_MEETING: "주주회의",
  HOLIDAY: "휴일",
};

export const TAX_CALENDAR_KIND_LABEL_COMPACT_EN: Record<TaxCalendarKind, string> = {
  TDS: "TDS",
  GST: "GST",
  PT: "PT",
  ESI: "ESI",
  ECB: "ECB",
  ADVANCE_TAX: "Adv.Tax",
  SHAREHOLDER_MEETING: "AGM",
  HOLIDAY: "Holiday",
};

export const TAX_CALENDAR_KIND_LABEL_COMPACT_ZH: Record<TaxCalendarKind, string> = {
  TDS: "TDS",
  GST: "GST",
  PT: "PT",
  ESI: "ESI",
  ECB: "ECB",
  ADVANCE_TAX: "预缴税款",
  SHAREHOLDER_MEETING: "股东会",
  HOLIDAY: "假日",
};

const MAX_CUSTOM_KIND_LEN = 60;

export function taxCalendarKindLabelFull(kind: string): string {
  const t = kind.trim();
  if (isTaxCalendarPresetKind(t)) return TAX_CALENDAR_KIND_LABEL_FULL[t];
  return t || "기타";
}

export function taxCalendarKindLabelCompact(kind: string, maxLen = 18, locale: "ko" | "en" | "zh" = "ko"): string {
  const t = kind.trim();
  if (isTaxCalendarPresetKind(t)) {
    if (locale === "en") return TAX_CALENDAR_KIND_LABEL_COMPACT_EN[t];
    if (locale === "zh") return TAX_CALENDAR_KIND_LABEL_COMPACT_ZH[t];
    return TAX_CALENDAR_KIND_LABEL_COMPACT[t];
  }
  if (t.length <= maxLen) {
    if (locale === "en") return t || "Other";
    if (locale === "zh") return t || "其他";
    return t || "기타";
  }
  return `${t.slice(0, Math.max(1, maxLen - 1))}…`;
}

/** API 본문의 `kind` — 프리셋 키 또는 직접 입력 문자열 */
export function parseTaxCalendarKindInput(v: unknown): { ok: true; kind: string } | { ok: false; message: string } {
  if (typeof v !== "string") return { ok: false, message: "유형이 필요합니다." };
  const s = v.trim();
  if (!s) return { ok: false, message: "유형을 선택하거나 직접 입력해 주세요." };
  if (isTaxCalendarPresetKind(s)) return { ok: true, kind: s };
  if (s === TAX_CALENDAR_FORM_CUSTOM) return { ok: false, message: "유형을 입력해 주세요." };
  if (s.length > MAX_CUSTOM_KIND_LEN) {
    return { ok: false, message: `직접 입력 유형은 ${MAX_CUSTOM_KIND_LEN}자 이내로 입력해 주세요.` };
  }
  if (/[\r\n\x00-\x08\x0b\x0c\x0e-\x1f]/.test(s)) {
    return { ok: false, message: "유형에 줄바꿈·제어문자는 사용할 수 없습니다." };
  }
  return { ok: true, kind: s };
}

export const TAX_CALENDAR_RECURRENCES = ["YEARLY", "MONTHLY", "FIXED"] as const;

export type TaxCalendarRecurrence = (typeof TAX_CALENDAR_RECURRENCES)[number];

export const TAX_CALENDAR_RECURRENCE_LABELS: Record<TaxCalendarRecurrence, string> = {
  YEARLY: "매년",
  MONTHLY: "매월",
  FIXED: "지정일",
};

const RECURRENCE_SET = new Set<string>(TAX_CALENDAR_RECURRENCES);

export function normalizeTaxCalendarRecurrence(v: unknown): TaxCalendarRecurrence {
  if (typeof v === "string" && RECURRENCE_SET.has(v)) return v as TaxCalendarRecurrence;
  return "FIXED";
}

export function parseTaxCalendarRecurrenceInput(
  v: unknown,
  defaultRecurrence: TaxCalendarRecurrence = "YEARLY",
): { ok: true; recurrence: TaxCalendarRecurrence } | { ok: false; message: string } {
  if (v === undefined || v === null || v === "") {
    return { ok: true, recurrence: defaultRecurrence };
  }
  if (typeof v !== "string") return { ok: false, message: "반복 유형이 올바르지 않습니다." };
  const s = v.trim().toUpperCase();
  if (!RECURRENCE_SET.has(s)) return { ok: false, message: "반복 유형이 올바르지 않습니다." };
  return { ok: true, recurrence: s as TaxCalendarRecurrence };
}

export function parseTaxCalendarYmd(date: string): { year: number; month: number; day: number } | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date.trim());
  if (!m) return null;
  const year = Number(m[1]);
  const month = Number(m[2]);
  const day = Number(m[3]);
  if (month < 1 || month > 12 || day < 1 || day > 31) return null;
  return { year, month, day };
}

export type TaxCalendarEvent = {
  id: string;
  /** YYYY-MM-DD (로컬 기준) */
  date: string;
  /** `TAX_CALENDAR_KINDS` 값 또는 관리자 직접 입력 문자열 */
  kind: string;
  title?: string;
  note?: string;
  /** YEARLY(매년) | MONTHLY(매월) | FIXED(지정일 1회) */
  recurrence?: TaxCalendarRecurrence;
  createdAt: string;
  updatedAt: string;
};
