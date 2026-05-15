import { NextResponse } from "next/server";
import { z } from "zod";
import { escapeHtml } from "@/lib/payroll-mailer/html-escape";
import { createMailTransporter, resolveSmtpConfig, smtpSettingsSchema } from "@/lib/payroll-mailer/smtp";

export const runtime = "nodejs";

const testEmailSchema = z.object({
  smtp: smtpSettingsSchema.optional(),
  testEmail: z.string().email("Please enter a valid test email address."),
});

export async function POST(request: Request) {
  try {
    const rawBody = await request.json();
    const parsed = testEmailSchema.safeParse(rawBody);

    if (!parsed.success) {
      return NextResponse.json(
        { message: parsed.error.issues[0]?.message ?? "Invalid request body." },
        { status: 400 },
      );
    }

    const smtp = resolveSmtpConfig(parsed.data.smtp);
    const transporter = createMailTransporter(smtp);

    await transporter.verify();

    const textBody = [
      "This is a test message from the payroll payslip mailer.",
      "",
      `From: ${smtp.from}`,
      `SMTP host: ${smtp.host}`,
      "",
      "MS Ventures — Payroll payslip email system",
    ].join("\n");

    const fromSafe = escapeHtml(smtp.from);
    const hostSafe = escapeHtml(smtp.host);

    const htmlBody = `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8" /></head>
<body style="margin:0;padding:24px;font-family:Segoe UI,Roboto,Helvetica,Arial,sans-serif;background:#f8fafc;color:#0f172a;">
  <table role="presentation" width="100%" style="max-width:520px;margin:0 auto;background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:20px 22px;">
    <tr><td>
      <p style="margin:0 0 8px;font-size:12px;color:#0f766e;font-weight:700;">[Test]</p>
      <p style="margin:0 0 12px;font-size:18px;font-weight:700;">SMTP connection check</p>
      <p style="margin:0 0 16px;line-height:1.6;font-size:14px;color:#334155;">This email confirms that the payroll payslip mailer can send through your SMTP settings.</p>
      <p style="margin:0;font-size:13px;color:#64748b;">From: ${fromSafe}<br />Host: ${hostSafe}</p>
    </td></tr>
  </table>
</body></html>`;

    await transporter.sendMail({
      from: smtp.from,
      to: parsed.data.testEmail,
      subject: "[Test] Payroll payslip mailer — SMTP connection",
      text: textBody,
      html: htmlBody,
    });

    return NextResponse.json({
      message: `Test message sent to ${parsed.data.testEmail}.`,
    });
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Failed to send test email." },
      { status: 500 },
    );
  }
}
