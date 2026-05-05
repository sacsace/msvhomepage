import { NextResponse } from "next/server";
import { adminApiCatchResponse } from "@/lib/db-api-error-response";
import { readTaxCalendar, writeTaxCalendar } from "@/lib/tax-calendar-store";
import { requireAdmin } from "@/lib/require-admin";
import { parseTaxCalendarKindInput, type TaxCalendarEvent } from "@/types/tax-calendar-event";

export const runtime = "nodejs";

const dateRe = /^\d{4}-\d{2}-\d{2}$/;

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, ctx: Ctx) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const { id } = await ctx.params;
  try {
    const patch = (await request.json()) as Partial<TaxCalendarEvent>;
    const all = await readTaxCalendar();
    const idx = all.findIndex((e) => e.id === id);
    if (idx === -1) return NextResponse.json({ error: "없음" }, { status: 404 });
    const cur = all[idx];
    const nextDate = patch.date !== undefined ? String(patch.date).trim() : cur.date;
    if (!dateRe.test(nextDate)) {
      return NextResponse.json({ error: "날짜는 YYYY-MM-DD 형식이어야 합니다." }, { status: 400 });
    }
    const rawKind = patch.kind !== undefined ? patch.kind : cur.kind;
    const parsedKind = parseTaxCalendarKindInput(rawKind);
    if (!parsedKind.ok) {
      return NextResponse.json({ error: parsedKind.message }, { status: 400 });
    }
    const nextKind = parsedKind.kind;
    const nextTitle = patch.title !== undefined ? String(patch.title).trim() : cur.title ?? "";
    const nextNote = patch.note !== undefined ? String(patch.note).trim() : cur.note ?? "";
    const next: TaxCalendarEvent = {
      ...cur,
      date: nextDate,
      kind: nextKind,
      title: nextTitle || undefined,
      note: nextNote || undefined,
      updatedAt: new Date().toISOString(),
    };
    all[idx] = next;
    await writeTaxCalendar(all);
    return NextResponse.json(next);
  } catch (e) {
    console.error("[api/admin/tax-calendar PATCH]", e);
    return adminApiCatchResponse(e, "수정 실패");
  }
}

export async function DELETE(_request: Request, ctx: Ctx) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const { id } = await ctx.params;
  try {
    const all = await readTaxCalendar();
    const next = all.filter((e) => e.id !== id);
    if (next.length === all.length) return NextResponse.json({ error: "없음" }, { status: 404 });
    await writeTaxCalendar(next);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[api/admin/tax-calendar DELETE]", e);
    return adminApiCatchResponse(e, "삭제 실패");
  }
}
