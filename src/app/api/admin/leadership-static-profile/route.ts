import { NextResponse } from "next/server";
import { adminApiCatchResponse } from "@/lib/db-api-error-response";
import { upsertLeadershipStaticProfile } from "@/lib/leadership-static-profile-store";
import { requireAdmin } from "@/lib/require-admin";
import { leadership } from "@/lib/site-content";

export const runtime = "nodejs";

function isStaticLeadershipEmail(key: string): boolean {
  return leadership.some((m) => m.email.toLowerCase() === key);
}

export async function PATCH(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  try {
    const body = (await request.json()) as { email?: string; name?: string; role?: string };
    const key = String(body.email || "")
      .trim()
      .toLowerCase();
    const name = String(body.name || "").trim();
    const role = String(body.role || "").trim();
    if (!key) {
      return NextResponse.json({ error: "이메일이 필요합니다." }, { status: 400 });
    }
    if (!isStaticLeadershipEmail(key)) {
      return NextResponse.json(
        { error: "site-content에 정의된 기본 경영진 이메일만 수정할 수 있습니다." },
        { status: 400 },
      );
    }
    if (!name || !role) {
      return NextResponse.json({ error: "이름과 직함은 필수입니다." }, { status: 400 });
    }
    await upsertLeadershipStaticProfile(key, { name, role });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[api/admin/leadership-static-profile PATCH]", e);
    return adminApiCatchResponse(e, "저장 실패");
  }
}
