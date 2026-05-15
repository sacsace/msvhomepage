import "server-only";

import nodemailer from "nodemailer";
import { z } from "zod";
import type { SmtpSettings } from "@/types/payroll-mailer";

export const smtpSettingsSchema = z.object({
  host: z.string().min(1, "SMTP host is required."),
  port: z.number().int().positive(),
  secure: z.boolean(),
  user: z.string().min(1, "SMTP user is required."),
  pass: z.string().min(1, "SMTP password is required."),
  from: z.string().min(1, "From address is required."),
});

export const resolveSmtpFromEnv = (): Partial<SmtpSettings> => {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 587);
  const user = process.env.SMTP_USER;
  const from = process.env.SMTP_FROM;

  if (!host || !user || !from || Number.isNaN(port)) {
    return {};
  }

  return {
    host,
    port,
    secure: process.env.SMTP_SECURE === "true",
    user,
    from,
    pass: process.env.SMTP_PASS ?? "",
  };
};

export const resolveSmtpConfig = (input?: Partial<SmtpSettings>): SmtpSettings => {
  const fromEnv = resolveSmtpFromEnv();
  const merged: SmtpSettings = {
    host: input?.host || fromEnv.host || "",
    port: input?.port ?? fromEnv.port ?? 587,
    secure: input?.secure ?? fromEnv.secure ?? false,
    user: input?.user || fromEnv.user || "",
    pass: input?.pass || fromEnv.pass || "",
    from: input?.from || fromEnv.from || "",
  };

  const parsed = smtpSettingsSchema.safeParse(merged);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0]?.message ?? "Invalid SMTP settings.";
    throw new Error(firstIssue);
  }

  return parsed.data;
};

export const createMailTransporter = (smtp: SmtpSettings) =>
  nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: smtp.secure,
    /** Port 587 (STARTTLS): helps Gmail/Outlook on cloud hosts. */
    requireTLS: !smtp.secure && smtp.port === 587,
    auth: {
      user: smtp.user,
      pass: smtp.pass,
    },
  });

