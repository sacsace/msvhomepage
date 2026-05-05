import { NextResponse } from "next/server";
import { adminApiCatchResponse } from "@/lib/db-api-error-response";
import { readTaxCalendar, writeTaxCalendar } from "@/lib/tax-calendar-store";
import { requireAdmin } from "@/lib/require-admin";
import { parseTaxCalendarKindInput, type TaxCalendarEvent } from "@/types/tax-calendar-event";

export const runtime = "nodejs";

const dateRe = /^\d{4}-\d{2}-\d{2}$/;

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
    const parsedKind = parseTaxCalendarKindInput(json.kind);
    if (!parsedKind.ok) {
      return NextResponse.json({ error: parsedKind.message }, { status: 400 });
    }
    const title = json.title !== undefined ? String(json.title).trim() : "";
    const note = json.note !== undefined ? String(json.note).trim() : "";
    const now = new Date().toISOString();
    const item: TaxCalendarEvent = {
      id: crypto.randomUUID(),
      date,
      kind: parsedKind.kind,
      title: title || undefined,
      note: note || undefined,
      createdAt: now,
      updatedAt: now,
    };
    const all = await readTaxCalendar();
    all.push(item);
    await writeTaxCalendar(all);
    return NextResponse.json(item, { status: 201 });
  } catch (e) {
    console.error("[api/admin/tax-calendar POST]", e);
    return adminApiCatchResponse(e, "저장 실패");
  }
}
