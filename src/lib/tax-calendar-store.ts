import { readFile } from "node:fs/promises";
import path from "node:path";
import type { TaxCalendarEvent } from "@/types/tax-calendar-event";
import { normalizeTaxCalendarRecurrence } from "@/types/tax-calendar-event";
import {
  defaultTaxCalendarExpandRange,
  expandTaxCalendarEvents,
} from "@/lib/tax-calendar-expand";
import { prisma } from "@/lib/prisma";
import { withRecoverableDbRead } from "@/lib/prisma-read-fallback";

export type { TaxCalendarEvent } from "@/types/tax-calendar-event";

/** `data/tax-calendar.json` — DB가 비었을 때·읽기 실패 시 표시용 기본 일정 */
let defaultTaxCalendarFileCache: TaxCalendarEvent[] | undefined;

async function loadDefaultTaxCalendarFromJson(): Promise<TaxCalendarEvent[]> {
  if (defaultTaxCalendarFileCache !== undefined) {
    return defaultTaxCalendarFileCache;
  }
  try {
    const filePath = path.join(process.cwd(), "data", "tax-calendar.json");
    const raw = await readFile(filePath, "utf8");
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) {
      defaultTaxCalendarFileCache = [];
      return defaultTaxCalendarFileCache;
    }
    defaultTaxCalendarFileCache = parsed as TaxCalendarEvent[];
    return defaultTaxCalendarFileCache;
  } catch {
    defaultTaxCalendarFileCache = [];
    return defaultTaxCalendarFileCache;
  }
}

function toEvent(row: {
  id: string;
  date: string;
  kind: string;
  title: string | null;
  note: string | null;
  recurrence?: string | null;
  createdAt: Date;
  updatedAt: Date;
}): TaxCalendarEvent {
  return {
    id: row.id,
    date: row.date,
    kind: row.kind,
    title: row.title ?? undefined,
    note: row.note ?? undefined,
    recurrence: normalizeTaxCalendarRecurrence(row.recurrence),
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

/** 관리자·API용 — DB에 저장된 템플릿(반복 규칙 포함) */
export async function readTaxCalendarTemplates(): Promise<TaxCalendarEvent[]> {
  const fileDefaults = await loadDefaultTaxCalendarFromJson();
  return withRecoverableDbRead(fileDefaults, async () => {
    const rows = await prisma.taxCalendarEvent.findMany();
    if (rows.length > 0) {
      return rows.map(toEvent);
    }
    return fileDefaults;
  });
}

/** 공개 사이트용 — 반복 일정을 연도 구간으로 펼친 목록 */
export async function readTaxCalendarExpanded(
  range = defaultTaxCalendarExpandRange(),
): Promise<TaxCalendarEvent[]> {
  const templates = await readTaxCalendarTemplates();
  return expandTaxCalendarEvents(templates, range.fromYear, range.toYear);
}

/** @deprecated 공개 페이지는 `readTaxCalendarExpanded` 사용 */
export async function readTaxCalendar(): Promise<TaxCalendarEvent[]> {
  return readTaxCalendarExpanded();
}

export async function writeTaxCalendar(items: TaxCalendarEvent[]): Promise<void> {
  const data = items.map((e) => ({
    id: e.id,
    date: e.date,
    kind: e.kind,
    title: e.title ?? null,
    note: e.note ?? null,
    recurrence: normalizeTaxCalendarRecurrence(e.recurrence),
    createdAt: new Date(e.createdAt),
    updatedAt: new Date(e.updatedAt),
  }));
  await prisma.$transaction(async (tx) => {
    await tx.taxCalendarEvent.deleteMany();
    if (data.length) await tx.taxCalendarEvent.createMany({ data });
  });
}

export function sortTaxCalendarByDate(list: TaxCalendarEvent[]): TaxCalendarEvent[] {
  return [...list].sort((a, b) => {
    if (a.date !== b.date) return a.date.localeCompare(b.date);
    return a.kind.localeCompare(b.kind);
  });
}
