import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  PAYROLL_MAILER_COOKIE,
  payrollMailerPasswordConfigured,
  verifyPayrollMailerToken,
} from "@/lib/payroll-mailer-auth";

export const runtime = "nodejs";

export async function GET() {
  const configured = await payrollMailerPasswordConfigured();
  const token = (await cookies()).get(PAYROLL_MAILER_COOKIE)?.value;
  const unlocked = configured && (await verifyPayrollMailerToken(token));
  return NextResponse.json({ configured, unlocked });
}
