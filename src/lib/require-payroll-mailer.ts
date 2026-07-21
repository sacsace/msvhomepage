import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  PAYROLL_MAILER_COOKIE,
  payrollMailerPasswordConfigured,
  verifyPayrollMailerToken,
} from "@/lib/payroll-mailer-auth";

export async function requirePayrollMailerAccess(): Promise<NextResponse | null> {
  if (!(await payrollMailerPasswordConfigured())) {
    return NextResponse.json(
      { message: "급여 명세서 발송 기능이 아직 설정되지 않았습니다. 관리자에게 문의하세요." },
      { status: 503 },
    );
  }
  const token = (await cookies()).get(PAYROLL_MAILER_COOKIE)?.value;
  if (!(await verifyPayrollMailerToken(token))) {
    return NextResponse.json({ message: "급여 명세서 발송 비밀번호가 필요합니다." }, { status: 401 });
  }
  return null;
}
