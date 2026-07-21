import { NextResponse } from "next/server";
import { z } from "zod";
import { payrollSendFailureMessage, sendPayrollEmail, verifyPayrollMailDelivery } from "@/lib/payroll-mailer/delivery";
import { smtpSettingsSchema } from "@/lib/payroll-mailer/smtp";
import { requirePayrollMailerAccess } from "@/lib/require-payroll-mailer";

export const runtime = "nodejs";

const testEmailSchema = z.object({
  smtp: smtpSettingsSchema,
  testEmail: z.string().email("유효한 테스트 수신 이메일을 입력하세요."),
});

export async function POST(request: Request) {
  try {
    const denied = await requirePayrollMailerAccess();
    if (denied) return denied;

    const rawBody = await request.json();
    const parsed = testEmailSchema.safeParse(rawBody);

    if (!parsed.success) {
      return NextResponse.json(
        { message: parsed.error.issues[0]?.message ?? "요청 형식이 올바르지 않습니다." },
        { status: 400 },
      );
    }

    const { smtp, testEmail } = parsed.data;
    await verifyPayrollMailDelivery(smtp);

    const textBody = [
      "Payroll payslip mailer — test message.",
      "",
      `From: ${smtp.from}`,
      "",
      "If you received this, your SMTP settings are working.",
    ].join("\n");

    const htmlBody = `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8" /></head>
<body style="margin:0;padding:24px;font-family:Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
  <p><strong>[Test]</strong> Payroll mailer SMTP connection check.</p>
  <p>From: ${smtp.from}</p>
</body></html>`;

    await sendPayrollEmail({
      smtpInput: smtp,
      to: testEmail,
      subject: "[Test] Payroll payslip mailer",
      text: textBody,
      html: htmlBody,
    });

    return NextResponse.json({
      message: `테스트 메일을 ${testEmail} 로 보냈습니다.`,
    });
  } catch (error) {
    return NextResponse.json(
      { message: payrollSendFailureMessage(error) },
      { status: 500 },
    );
  }
}
