import { NextResponse } from "next/server";
import { readTaxCalendar, writeTaxCalendar } from "@/lib/tax-calendar-store";
import { requireAdmin } from "@/lib/require-admin";
import { TAX_CALENDAR_KINDS, type TaxCalendarEvent, type TaxCalendarKind } from "@/types/tax-calendar-event";

export const runtime = "nodejs";

const dateRe = /^\d{4}-\d{2}-\d{2}$/;

function isKind(v: unknown): v is TaxCalendarKind {
  return typeof v === "string" && (TAX_CALENDAR_KINDS as readonly string[]).includes(v);
}

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;
  return NextResponse.json(await readTaxCalendar());
}

export async function POST(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  try {
    const json = (await request.json()) as Partial<TaxCalendarEvent>;
    const date = String(json.date || "").trim();
    if (!dateRe.test(date)) {
      return NextResponse.json({ error: "날짜는 YYYY-MM-DD 형식이어야 합니다." }, { status: 400 });
    }
    if (!isKind(json.kind)) {
      return NextResponse.json({ error: "유효하지 않은 일정 유형입니다." }, { status: 400 });
    }
    const title = json.title !== undefined ? String(json.title).trim() : "";
    const note = json.note !== undefined ? String(json.note).trim() : "";
    const now = new Date().toISOString();
    const item: TaxCalendarEvent = {
      id: crypto.randomUUID(),
      date,
      kind: json.kind,
      title: title || undefined,
      note: note || undefined,
      createdAt: now,
      updatedAt: now,
    };
    const all = await readTaxCalendar();
    all.push(item);
    await writeTaxCalendar(all);
    return NextResponse.json(item, { status: 201 });
  } catch {
    return NextResponse.json({ error: "저장 실패" }, { status: 500 });
  }
}
