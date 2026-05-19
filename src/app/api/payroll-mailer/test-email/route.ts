import { NextResponse } from "next/server";
import { z } from "zod";
import { escapeHtml } from "@/lib/payroll-mailer/html-escape";
import {
  getPayrollMailMode,
  payrollSendFailureMessage,
  sendPayrollEmail,
  verifyPayrollMailDelivery,
} from "@/lib/payroll-mailer/delivery";

export const runtime = "nodejs";

const payrollSmtpInputSchema = z.object({
  host: z.string().optional(),
  port: z.number().int().positive().optional(),
  secure: z.boolean().optional(),
  user: z.string().optional(),
  pass: z.string().optional(),
  from: z.string().min(1, "발신 주소(From)가 필요합니다."),
});

const testEmailSchema = z.object({
  smtp: payrollSmtpInputSchema.optional(),
  testEmail: z.string().email("유효한 테스트 수신 이메일을 입력하세요."),
});

export async function POST(request: Request) {
  try {
    const rawBody = await request.json();
    const parsed = testEmailSchema.safeParse(rawBody);

    if (!parsed.success) {
      return NextResponse.json(
        { message: parsed.error.issues[0]?.message ?? "요청 형식이 올바르지 않습니다." },
        { status: 400 },
      );
    }

    const smtpInput = parsed.data.smtp;
    await verifyPayrollMailDelivery(smtpInput);

    const mode = getPayrollMailMode();
    const fromDisplay = smtpInput?.from?.trim() ?? "";

    const textBody = [
      "Payroll payslip mailer — test message.",
      "",
      `Delivery: ${mode}`,
      `From: ${fromDisplay}`,
      "",
      "MS Ventures — Payroll payslip email system",
    ].join("\n");

    const fromSafe = escapeHtml(fromDisplay);
    const modeSafe = escapeHtml(mode);

    const htmlBody = `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8" /></head>
<body style="margin:0;padding:24px;font-family:Segoe UI,Roboto,Helvetica,Arial,sans-serif;background:#f8fafc;color:#0f172a;">
  <table role="presentation" width="100%" style="max-width:520px;margin:0 auto;background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:20px 22px;">
    <tr><td>
      <p style="margin:0 0 8px;font-size:12px;color:#0f766e;font-weight:700;">[Test]</p>
      <p style="margin:0 0 12px;font-size:18px;font-weight:700;">Payroll mailer connection check</p>
      <p style="margin:0 0 16px;line-height:1.6;font-size:14px;color:#334155;">This email confirms that the payroll payslip mailer can send using your configured delivery settings.</p>
      <p style="margin:0;font-size:13px;color:#64748b;">Mode: ${modeSafe}<br />From: ${fromSafe}</p>
    </td></tr>
  </table>
</body></html>`;

    await sendPayrollEmail({
      smtpInput,
      to: parsed.data.testEmail,
      subject: `[Test] Payroll payslip mailer — ${mode}`,
      text: textBody,
      html: htmlBody,
    });

    return NextResponse.json({
      message: `테스트 메일을 ${parsed.data.testEmail} 로 보냈습니다. (${mode})`,
    });
  } catch (error) {
    return NextResponse.json(
      { message: payrollSendFailureMessage(error) },
      { status: 500 },
    );
  }
}
