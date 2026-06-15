import "server-only";

import type { SmtpSettings } from "@/types/payroll-mailer";
import { transactionalSendFailureUserHint } from "@/lib/transactional-email";
import { createMailTransporter, resolveUserSmtpConfig } from "@/lib/payroll-mailer/smtp";

export type PayrollMailAttachment = { filename: string; content: Buffer; contentType?: string };

function formatPayrollFromHeader(from: string): string {
  const t = from.trim();
  if (t.includes("<")) return t;
  return t;
}

export async function verifyPayrollMailDelivery(input: Partial<SmtpSettings>): Promise<void> {
  const smtp = resolveUserSmtpConfig(input);
  const transporter = await createMailTransporter(smtp);
  await transporter.verify();
}

export async function sendPayrollEmail(args: {
  smtpInput: Partial<SmtpSettings>;
  to: string;
  cc?: string[];
  subject: string;
  text: string;
  html: string;
  attachments?: PayrollMailAttachment[];
}): Promise<void> {
  const smtp = resolveUserSmtpConfig(args.smtpInput);
  const transporter = await createMailTransporter(smtp);
  const fromHeader = formatPayrollFromHeader(smtp.from);
  const cc = args.cc?.filter((address) => address.trim().length > 0);

  await transporter.sendMail({
    from: fromHeader,
    to: args.to,
    ...(cc?.length ? { cc } : {}),
    subject: args.subject,
    text: args.text,
    html: args.html,
    attachments: args.attachments?.map((a) => ({
      filename: a.filename,
      content: a.content,
      contentType: a.contentType ?? "application/pdf",
    })),
  });
}

export function payrollSendFailureMessage(err: unknown): string {
  const hint = transactionalSendFailureUserHint(err);
  const detail = err instanceof Error ? err.message : String(err);
  return hint ? `${hint} (${detail.slice(0, 200)})` : detail.slice(0, 300);
}
