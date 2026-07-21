import { NextResponse } from "next/server";
import {
  createPayrollMailerToken,
  payrollMailerCookieOptions,
  payrollMailerPasswordConfigured,
  PAYROLL_MAILER_COOKIE,
  verifyPayrollMailerPassword,
} from "@/lib/payroll-mailer-auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!(await payrollMailerPasswordConfigured())) {
    return NextResponse.json(
      { message: "급여 명세서 발송 기능이 아직 설정되지 않았습니다. 관리자에게 문의하세요." },
      { status: 503 },
    );
  }

  let password = "";
  try {
    const body = (await request.json()) as { password?: string };
    password = String(body.password ?? "").trim();
  } catch {
    return NextResponse.json({ message: "요청 형식이 올바르지 않습니다." }, { status: 400 });
  }

  if (!password) {
    return NextResponse.json({ message: "비밀번호를 입력하세요." }, { status: 400 });
  }

  if (!(await verifyPayrollMailerPassword(password))) {
    return NextResponse.json({ message: "비밀번호가 올바르지 않습니다." }, { status: 401 });
  }

  const token = await createPayrollMailerToken();
  const response = NextResponse.json({ ok: true });
  response.cookies.set(PAYROLL_MAILER_COOKIE, token, payrollMailerCookieOptions(request));
  return response;
}
