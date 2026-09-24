import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { adminApiCatchJson } from "@/lib/db-api-error-response";
import { resolvedAdminLoginId, resolvedEnvAdminLoginId } from "@/lib/admin-auth";
import { readAdminAuth, writePasswordHash } from "@/lib/admin-password-store";
import { requireAdmin } from "@/lib/require-admin";

export const runtime = "nodejs";

async function verifyCurrentPassword(loginId: string, current: string): Promise<boolean> {
  const storedId = await resolvedAdminLoginId();
  if (loginId !== storedId) return false;

  const auth = await readAdminAuth();
  if (auth.passwordHash) {
    return bcrypt.compareSync(current, auth.passwordHash);
  }

  const expectedPw = process.env.ADMIN_PASSWORD?.trim();
  if (!expectedPw) return false;
  return loginId === resolvedEnvAdminLoginId() && current === expectedPw;
}

export async function POST(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  try {
    const body = (await request.json()) as {
      loginId?: string;
      currentPassword?: string;
      newPassword?: string;
    };
    const loginId = String(body.loginId || "").trim();
    const current = String(body.currentPassword || "");
    const next = String(body.newPassword || "");

    if (!loginId) {
      return NextResponse.json({ error: "아이디를 입력해 주세요." }, { status: 400 });
    }
    if (!(await verifyCurrentPassword(loginId, current))) {
      return NextResponse.json({ error: "아이디 또는 현재 비밀번호가 올바르지 않습니다." }, { status: 400 });
    }
    if (next.length < 8 || next.length > 128) {
      return NextResponse.json({ error: "새 비밀번호는 8~128자로 입력해 주세요." }, { status: 400 });
    }
    const hash = bcrypt.hashSync(next, 10);
    await writePasswordHash(hash);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[api/admin/password POST]", e);
    const { status, body } = adminApiCatchJson(e, "저장 실패");
    return NextResponse.json(body, { status });
  }
}
