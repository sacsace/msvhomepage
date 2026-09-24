import type { TaxCalendarEvent, TaxCalendarRecurrence } from "@/types/tax-calendar-event";
import { normalizeTaxCalendarRecurrence, parseTaxCalendarYmd } from "@/types/tax-calendar-event";

function daysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

function padYmd(year: number, month: number, day: number): string {
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function expandedId(templateId: string, ymd: string): string {
  return `${templateId}::${ymd}`;
}

/** 공개 달력에 표시할 연도 범위(현재 연도 기준) */
export function defaultTaxCalendarExpandRange(now = new Date()): { fromYear: number; toYear: number } {
  const y = now.getFullYear();
  return { fromYear: y - 2, toYear: y + 3 };
}

/** 단일 템플릿이 특정 연·월에 해당하는지 (관리자 필터) */
export function taxCalendarTemplateMatchesPeriod(
  event: TaxCalendarEvent,
  year: number,
  month: number | null,
): boolean {
  const recurrence = normalizeTaxCalendarRecurrence(event.recurrence);
  const parts = parseTaxCalendarYmd(event.date);
  if (!parts) return false;
  const { year: refYear, month: refMonth } = parts;

  if (recurrence === "FIXED") {
    if (refYear !== year) return false;
    if (month !== null && refMonth !== month) return false;
    return true;
  }
  if (recurrence === "YEARLY") {
    if (month !== null && refMonth !== month) return false;
    return true;
  }
  // MONTHLY — 해당 연도·월 모두 표시
  if (month !== null) return true;
  return true;
}

/** 템플릿 목록을 연·월 구간으로 펼침 */
export function expandTaxCalendarEvents(
  templates: TaxCalendarEvent[],
  fromYear: number,
  toYear: number,
): TaxCalendarEvent[] {
  const out: TaxCalendarEvent[] = [];

  for (const template of templates) {
    const recurrence = normalizeTaxCalendarRecurrence(template.recurrence);
    const parts = parseTaxCalendarYmd(template.date);
    if (!parts) continue;
    const { month: refMonth, day: refDay } = parts;

    if (recurrence === "FIXED") {
      if (parts.year >= fromYear && parts.year <= toYear) {
        out.push(template);
      }
      continue;
    }

    if (recurrence === "YEARLY") {
      for (let year = fromYear; year <= toYear; year += 1) {
        if (refDay > daysInMonth(year, refMonth)) continue;
        const ymd = padYmd(year, refMonth, refDay);
        out.push({
          ...template,
          id: expandedId(template.id, ymd),
          date: ymd,
        });
      }
      continue;
    }

    // MONTHLY
    for (let year = fromYear; year <= toYear; year += 1) {
      for (let month = 1; month <= 12; month += 1) {
        if (refDay > daysInMonth(year, month)) continue;
        const ymd = padYmd(year, month, refDay);
        out.push({
          ...template,
          id: expandedId(template.id, ymd),
          date: ymd,
        });
      }
    }
  }

  return out;
}

export function formatTaxCalendarTemplateDateLabel(
  event: TaxCalendarEvent,
  recurrence?: TaxCalendarRecurrence,
): string {
  const r = recurrence ?? normalizeTaxCalendarRecurrence(event.recurrence);
  const parts = parseTaxCalendarYmd(event.date);
  if (!parts) return event.date;

  const { year, month, day } = parts;
  if (r === "MONTHLY") return `매월 ${day}일`;
  if (r === "YEARLY") return `매년 ${month}월 ${day}일`;
  return event.date;
}
