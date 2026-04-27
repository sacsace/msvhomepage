import { promises as fs } from "fs";
import path from "path";
import type { TaxCalendarEvent } from "@/types/tax-calendar-event";

export type { TaxCalendarEvent } from "@/types/tax-calendar-event";

const dataFile = path.join(process.cwd(), "data", "tax-calendar.json");

async function ensureDir() {
  await fs.mkdir(path.dirname(dataFile), { recursive: true });
}

export async function readTaxCalendar(): Promise<TaxCalendarEvent[]> {
  await ensureDir();
  try {
    const raw = await fs.readFile(dataFile, "utf-8");
    const parsed = JSON.parse(raw) as TaxCalendarEvent[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function writeTaxCalendar(items: TaxCalendarEvent[]): Promise<void> {
  await ensureDir();
  await fs.writeFile(dataFile, JSON.stringify(items, null, 2), "utf-8");
}

export function sortTaxCalendarByDate(list: TaxCalendarEvent[]): TaxCalendarEvent[] {
  return [...list].sort((a, b) => {
    if (a.date !== b.date) return a.date.localeCompare(b.date);
    return a.kind.localeCompare(b.kind);
  });
}
