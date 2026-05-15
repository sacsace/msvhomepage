import type { SmtpSettings } from "@/types/payroll-mailer";

export const isSmtpConfigured = (settings: SmtpSettings) =>
  Boolean(settings.host && settings.user && settings.pass && settings.from);
