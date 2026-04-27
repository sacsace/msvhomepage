import { NextResponse } from "next/server";
import { leadership } from "@/lib/site-content";
import { removeLeadershipSummary, setLeadershipSummary } from "@/lib/leadership-summaries-store";
import { requireAdmin } from "@/lib/require-admin";

export const runtime = "nodejs";

const allowedEmails = new Set(leadership.map((m) => m.email.toLowerCase()));

export async function POST(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  try {
    const body = (await request.json()) as { email?: string; summary?: string };
    const email = String(body.email || "").trim().toLowerCase();
    const summary = String(body.summary || "").trim();
    if (!email || !allowedEmails.has(email)) {
      return NextResponse.json({ error: "등록된 경영진 이메일만 수정할 수 있습니다." }, { status: 400 });
    }
    if (!summary) {
      await removeLeadershipSummary(email);
      return NextResponse.json({ ok: true, removed: true });
    }
    await setLeadershipSummary(email, summary);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "저장 실패" }, { status: 500 });
  }
}
