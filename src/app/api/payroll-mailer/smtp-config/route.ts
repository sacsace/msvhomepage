import { NextResponse } from "next/server";
import { resolveSmtpHintsFromEnv } from "@/lib/payroll-mailer/smtp";

export const runtime = "nodejs";

export async function GET() {
  const hints = resolveSmtpHintsFromEnv();
  const config =
    hints.host && hints.user
      ? {
          host: hints.host,
          port: hints.port ?? 587,
          secure: hints.secure ?? false,
          user: hints.user,
          from: hints.from ?? "",
        }
      : null;

  return NextResponse.json({ config });
}
