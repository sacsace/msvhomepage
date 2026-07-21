import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { adminApiCatchJson } from "@/lib/db-api-error-response";
import { payrollMailerPasswordConfigured } from "@/lib/payroll-mailer-auth";
import { writePayrollMailerPasswordHash } from "@/lib/payroll-mailer-password-store";
import { requireAdmin } from "@/lib/require-admin";

export const runtime = "nodejs";

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;
  const configured = await payrollMailerPasswordConfigured();
  return NextResponse.json({ configured });
}

export async function POST(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  try {
    const body = (await request.json()) as { password?: string; confirmPassword?: string };
    const password = String(body.password ?? "").trim();
    const confirmPassword = String(body.confirmPassword ?? "").trim();
    if (password.length < 4 || password.length > 128) {
      return NextResponse.json({ error: "비밀번호는 4~128자로 입력해 주세요." }, { status: 400 });
    }
    if (password !== confirmPassword) {
      return NextResponse.json({ error: "비밀번호와 확인이 일치하지 않습니다." }, { status: 400 });
    }
    const hash = bcrypt.hashSync(password, 10);
    await writePayrollMailerPasswordHash(hash);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[api/admin/payroll-mailer-password POST]", e);
    const { status, body } = adminApiCatchJson(e, "저장 실패");
    return NextResponse.json(body, { status });
  }
}
