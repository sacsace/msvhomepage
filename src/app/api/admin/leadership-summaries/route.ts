import { NextResponse } from "next/server";
import { adminApiCatchResponse } from "@/lib/db-api-error-response";
import { isLeadershipEmailAllowed } from "@/lib/leadership-allow";
import { removeLeadershipSummary, setLeadershipSummary } from "@/lib/leadership-summaries-store";
import { requireAdmin } from "@/lib/require-admin";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  try {
    const body = (await request.json()) as { email?: string; summary?: string };
    const email = String(body.email || "").trim().toLowerCase();
    const summary = String(body.summary || "").trim();
    if (!email || !(await isLeadershipEmailAllowed(email))) {
      return NextResponse.json({ error: "등록된 경영진 이메일만 수정할 수 있습니다." }, { status: 400 });
    }
    if (!summary) {
      await removeLeadershipSummary(email);
      return NextResponse.json({ ok: true, removed: true });
    }
    await setLeadershipSummary(email, summary);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[api/admin/leadership-summaries POST]", e);
    return adminApiCatchResponse(e, "저장 실패");
  }
}
