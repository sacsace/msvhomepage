import "server-only";

import type { MailSettings } from "@/types/mail-settings";
import type { SmtpSettings } from "@/types/payroll-mailer";
import {
  getTransactionalEmailDiagnostics,
  getTransactionalEmailMode,
  parseEmailAddressOnly,
  sendTransactionalEmail,
  transactionalSendFailureUserHint,
  type TransactionalEmailMode,
} from "@/lib/transactional-email";
import { createMailTransporter, resolveSmtpConfig, resolveSmtpFromEnv } from "@/lib/payroll-mailer/smtp";

export type PayrollMailAttachment = { filename: string; content: Buffer; contentType?: string };

export type PayrollMailConfig = {
  mode: TransactionalEmailMode;
  envelopeFrom: string;
  fromHeader: string;
  smtp?: SmtpSettings;
};

export function getPayrollMailMode(): TransactionalEmailMode {
  return getTransactionalEmailMode();
}

export function getPayrollMailDiagnostics() {
  return getTransactionalEmailDiagnostics();
}

/** Railway·로컬 공통 — 발신 주소 기본값 */
export function resolvePayrollDefaultFrom(): string {
  const fromEnv = resolveSmtpFromEnv();
  const transactionalFrom = process.env.MSV_TRANSACTIONAL_FROM?.trim();
  if (transactionalFrom) return transactionalFrom;
  if (fromEnv.from?.trim()) return fromEnv.from.trim();
  return "";
}

function formatPayrollFromHeader(from: string): string {
  const t = from.trim();
  if (t.includes("<")) return t;
  const email = parseEmailAddressOnly(t) || t;
  return `MS Ventures Payroll <${email}>`;
}

export function resolvePayrollMailConfig(input?: Partial<SmtpSettings>): PayrollMailConfig {
  const mode = getTransactionalEmailMode();
  const envFrom = resolvePayrollDefaultFrom();
  const fromRaw = (input?.from?.trim() || envFrom).trim();

  if (!fromRaw) {
    throw new Error(
      mode === "smtp"
        ? "발신 주소(From)가 비어 있습니다."
        : "발신 주소(From)가 비어 있습니다. 인증된 도메인 주소(예: lee@msventures.in)를 입력하거나 MSV_TRANSACTIONAL_FROM 환경 변수를 설정하세요.",
    );
  }

  const envelopeFrom = parseEmailAddressOnly(fromRaw) || fromRaw;
  const fromHeader = formatPayrollFromHeader(fromRaw);

  if (mode !== "smtp") {
    return { mode, envelopeFrom, fromHeader };
  }

  const smtp = resolveSmtpConfig({
    host: input?.host,
    port: input?.port,
    secure: input?.secure,
    user: input?.user,
    pass: input?.pass,
    from: fromRaw,
  });

  return { mode, envelopeFrom, fromHeader, smtp };
}

export async function verifyPayrollMailDelivery(input?: Partial<SmtpSettings>): Promise<void> {
  const cfg = resolvePayrollMailConfig(input);
  if (cfg.mode === "smtp" && cfg.smtp) {
    const transporter = await createMailTransporter(cfg.smtp);
    await transporter.verify();
  }
}

function emptyMailSettingsForApi(fromAddress: string): MailSettings {
  return {
    host: "",
    port: 587,
    secure: false,
    user: "",
    pass: "",
    fromAddress,
    toAddress: "",
  };
}

export async function sendPayrollEmail(args: {
  smtpInput?: Partial<SmtpSettings>;
  to: string;
  subject: string;
  text: string;
  html: string;
  attachments?: PayrollMailAttachment[];
}): Promise<void> {
  const cfg = resolvePayrollMailConfig(args.smtpInput);

  if (cfg.mode === "smtp" && cfg.smtp) {
    const transporter = await createMailTransporter(cfg.smtp);
    await transporter.sendMail({
      from: cfg.fromHeader,
      to: args.to,
      subject: args.subject,
      text: args.text,
      html: args.html,
      attachments: args.attachments?.map((a) => ({
        filename: a.filename,
        content: a.content,
        contentType: a.contentType ?? "application/pdf",
      })),
    });
    return;
  }

  await sendTransactionalEmail({
    settings: emptyMailSettingsForApi(cfg.envelopeFrom),
    to: [args.to],
    subject: args.subject,
    text: args.text,
    html: args.html,
    fromHeader: cfg.fromHeader,
    envelopeFrom: cfg.envelopeFrom,
    attachments: args.attachments?.map((a) => ({
      filename: a.filename,
      content: a.content,
    })),
  });
}

export function payrollSendFailureMessage(err: unknown): string {
  const hint = transactionalSendFailureUserHint(err);
  const detail = err instanceof Error ? err.message : String(err);
  return hint ? `${hint} (${detail.slice(0, 200)})` : detail.slice(0, 300);
}
