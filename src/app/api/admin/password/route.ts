import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { verifyAdminPassword } from "@/lib/admin-auth";
import { writePasswordHash } from "@/lib/admin-password-store";
import { requireAdmin } from "@/lib/require-admin";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  try {
    const body = (await request.json()) as { currentPassword?: string; newPassword?: string };
    const current = String(body.currentPassword || "");
    const next = String(body.newPassword || "");
    if (!verifyAdminPassword(current)) {
      return NextResponse.json({ error: "현재 비밀번호가 올바르지 않습니다." }, { status: 400 });
    }
    if (next.length < 8 || next.length > 128) {
      return NextResponse.json({ error: "새 비밀번호는 8~128자로 입력해 주세요." }, { status: 400 });
    }
    const hash = bcrypt.hashSync(next, 10);
    await writePasswordHash(hash);
    return NextResponse.json({ ok: true });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "저장 실패";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
