import { NextResponse } from "next/server";
import { resolveSmtpFromEnv } from "@/lib/payroll-mailer/smtp";

export const runtime = "nodejs";

export async function GET() {
  const fromEnv = resolveSmtpFromEnv();
  if (!fromEnv.host) {
    return NextResponse.json({ config: null });
  }

  return NextResponse.json({
    config: {
      host: fromEnv.host,
      port: fromEnv.port ?? 587,
      secure: fromEnv.secure ?? false,
      user: fromEnv.user ?? "",
      from: fromEnv.from ?? "",
    },
  });
}
