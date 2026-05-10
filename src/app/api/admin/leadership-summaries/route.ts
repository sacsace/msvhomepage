import { NextResponse } from "next/server";
import { adminApiCatchResponse } from "@/lib/db-api-error-response";
import { isLeadershipEmailAllowed } from "@/lib/leadership-allow";
import { removeLeadershipSummary, upsertLeadershipSummaryMerged } from "@/lib/leadership-summaries-store";
import { requireAdmin } from "@/lib/require-admin";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  try {
    const body = (await request.json()) as { email?: string; summary?: string; summaryEn?: string };
    const email = String(body.email || "").trim().toLowerCase();
    if (!email || !(await isLeadershipEmailAllowed(email))) {
      return NextResponse.json({ error: "등록된 경영진 이메일만 수정할 수 있습니다." }, { status: 400 });
    }
    const hasSummary = body.summary !== undefined;
    const hasSummaryEn = body.summaryEn !== undefined;
    if (!hasSummary && !hasSummaryEn) {
      return NextResponse.json({ error: "summary 또는 summaryEn 중 하나는 필요합니다." }, { status: 400 });
    }
    const summary = hasSummary ? String(body.summary ?? "").trim() : undefined;
    const summaryEn = hasSummaryEn ? String(body.summaryEn ?? "").trim() : undefined;
    if (hasSummary && hasSummaryEn && summary === "" && summaryEn === "") {
      await removeLeadershipSummary(email);
      return NextResponse.json({ ok: true, removed: true });
    }
    await upsertLeadershipSummaryMerged(email, {
      ...(hasSummary ? { summary: summary! } : {}),
      ...(hasSummaryEn ? { summaryEn: summaryEn! } : {}),
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[api/admin/leadership-summaries POST]", e);
    return adminApiCatchResponse(e, "저장 실패");
  }
}
