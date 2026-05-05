import { NextResponse } from "next/server";
import { adminApiCatchResponse } from "@/lib/db-api-error-response";
import {
  readCompanyHistoryAdminInitial,
  replaceCompanyHistory,
} from "@/lib/company-history-store";
import { requireAdmin } from "@/lib/require-admin";

export const runtime = "nodejs";

const MAX_ROWS = 100;
const MAX_PERIOD = 120;
const MAX_BODY = 2000;

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;
  try {
    return NextResponse.json(await readCompanyHistoryAdminInitial());
  } catch (e) {
    console.error("[api/admin/company-history GET]", e);
    return adminApiCatchResponse(e, "불러오기 실패");
  }
}

export async function PUT(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  try {
    const json = (await request.json()) as { items?: unknown };
    const raw = json.items;
    if (!Array.isArray(raw)) {
      return NextResponse.json({ error: "items 배열이 필요합니다." }, { status: 400 });
    }
    if (raw.length > MAX_ROWS) {
      return NextResponse.json({ error: `연혁은 최대 ${MAX_ROWS}행까지입니다.` }, { status: 400 });
    }
    const items: { period: string; body: string }[] = [];
    for (const el of raw) {
      if (el === null || typeof el !== "object") {
        return NextResponse.json({ error: "각 행은 객체여야 합니다." }, { status: 400 });
      }
      const o = el as Record<string, unknown>;
      const period = String(o.period ?? "").trim();
      const body = String(o.body ?? "").trim();
      if (!period || !body) {
        return NextResponse.json({ error: "시기·내용은 모두 비울 수 없습니다." }, { status: 400 });
      }
      if (period.length > MAX_PERIOD || body.length > MAX_BODY) {
        return NextResponse.json({ error: "시기 또는 내용이 너무 깁니다." }, { status: 400 });
      }
      items.push({ period, body });
    }
    await replaceCompanyHistory(items);
    return NextResponse.json(await readCompanyHistoryAdminInitial());
  } catch (e) {
    console.error("[api/admin/company-history PUT]", e);
    return adminApiCatchResponse(e, "저장 실패");
  }
}
