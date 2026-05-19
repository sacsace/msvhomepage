import type { TransactionalEmailMode } from "@/lib/transactional-email";
import type { SmtpSettings } from "@/types/payroll-mailer";

export const isSmtpConfigured = (settings: SmtpSettings) =>
  Boolean(settings.host && settings.user && settings.pass && settings.from);

/** Resend 등 API 모드에서는 발신(From)만 있으면 발송 가능 */
export const isPayrollMailReady = (
  settings: SmtpSettings,
  mode: TransactionalEmailMode = "smtp",
) => {
  const from = settings.from?.trim();
  if (!from) return false;
  if (mode !== "smtp") return true;
  return Boolean(settings.host && settings.user && settings.pass);
};
