import { NextResponse } from "next/server";
import { adminApiCatchResponse } from "@/lib/db-api-error-response";
import { leadership } from "@/lib/site-content";
import { createLeadershipExtra, getLeadershipExtra } from "@/lib/leadership-extra-store";
import { requireAdmin } from "@/lib/require-admin";

export const runtime = "nodejs";

const emailOk = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/i.test(s);

export async function POST(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  try {
    const body = (await request.json()) as {
      email?: string;
      name?: string;
      role?: string;
      sortOrder?: number;
    };
    const emailRaw = String(body.email || "").trim();
    const key = emailRaw.toLowerCase();
    const name = String(body.name || "").trim();
    const role = String(body.role || "").trim();
    const sortOrder = body.sortOrder;

    if (!key || !emailOk(key)) {
      return NextResponse.json({ error: "유효한 이메일을 입력해 주세요." }, { status: 400 });
    }
    if (!name || !role) {
      return NextResponse.json({ error: "이름과 직함은 필수입니다." }, { status: 400 });
    }
    if (leadership.some((m) => m.email.toLowerCase() === key)) {
      return NextResponse.json(
        { error: "이 이메일은 site-content 기본 경영진과 겹칩니다." },
        { status: 400 },
      );
    }
    if (await getLeadershipExtra(key)) {
      return NextResponse.json({ error: "이미 등록된 이메일입니다." }, { status: 400 });
    }

    await createLeadershipExtra({
      emailLower: key,
      name,
      role,
      sortOrder: sortOrder !== undefined ? Number(sortOrder) : 100,
    });
    return NextResponse.json({ ok: true, email: key }, { status: 201 });
  } catch (e) {
    console.error("[api/admin/leadership-members POST]", e);
    return adminApiCatchResponse(e, "등록 실패");
  }
}
