import { NextResponse } from "next/server";
import { getPayrollMailDiagnostics, getPayrollMailMode, resolvePayrollDefaultFrom } from "@/lib/payroll-mailer/delivery";
import { resolveSmtpFromEnv } from "@/lib/payroll-mailer/smtp";

export const runtime = "nodejs";

/** Railway Variables는 런타임에만 존재 */
export const dynamic = "force-dynamic";

export async function GET() {
  const mode = getPayrollMailMode();
  const diagnostics = getPayrollMailDiagnostics();
  const fromEnv = resolveSmtpFromEnv();
  const defaultFrom = resolvePayrollDefaultFrom();

  const config =
    mode === "smtp" && fromEnv.host
      ? {
          host: fromEnv.host,
          port: fromEnv.port ?? 587,
          secure: fromEnv.secure ?? false,
          user: fromEnv.user ?? "",
          from: fromEnv.from ?? defaultFrom,
        }
      : defaultFrom
        ? { from: defaultFrom }
        : fromEnv.from
          ? { from: fromEnv.from }
          : null;

  return NextResponse.json({
    mode,
    diagnostics,
    defaultFrom,
    config,
  });
}
