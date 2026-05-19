import "server-only";

import nodemailer from "nodemailer";
import { z } from "zod";
import type { SmtpSettings } from "@/types/payroll-mailer";
import { smtpConnectTarget, smtpSocketIpv4Only } from "@/lib/mail-settings-store";

export const smtpSettingsSchema = z.object({
  host: z.string().min(1, "SMTP host is required."),
  port: z.number().int().positive(),
  secure: z.boolean(),
  user: z.string().min(1, "SMTP user is required."),
  pass: z.string().min(1, "SMTP password is required."),
  from: z.string().min(1, "From address is required."),
});

export const resolveSmtpFromEnv = (): Partial<SmtpSettings> => {
  const host = process.env.SMTP_HOST?.trim();
  const port = Number(process.env.SMTP_PORT ?? 587);
  const user = process.env.SMTP_USER?.trim();
  const from =
    process.env.SMTP_FROM?.trim() ||
    process.env.MSV_TRANSACTIONAL_FROM?.trim() ||
    "";

  const partial: Partial<SmtpSettings> = {};
  if (from) partial.from = from;
  if (host && user && !Number.isNaN(port)) {
    partial.host = host;
    partial.port = port;
    partial.secure = process.env.SMTP_SECURE === "true";
    partial.user = user;
    partial.pass = process.env.SMTP_PASS ?? "";
  }

  return partial;
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

/** Same strategy as admin transactional SMTP: IPv4 + A-record host to avoid ENETUNREACH on IPv6 (e.g. Railway). */
const smtpTimeouts = () => ({
  connectionTimeout: 12_000,
  greetingTimeout: 10_000,
  socketTimeout: 27_000,
});

export async function createMailTransporter(smtp: SmtpSettings) {
  const tcp = await smtpConnectTarget(smtp.host);
  const timeouts = smtpTimeouts();
  return nodemailer.createTransport({
    host: tcp.host,
    ...(tcp.servername ? { servername: tcp.servername } : {}),
    port: smtp.port,
    secure: smtp.secure,
    requireTLS: !smtp.secure && smtp.port === 587,
    ...timeouts,
    ...smtpSocketIpv4Only,
    auth: {
      user: smtp.user,
      pass: smtp.pass,
    },
  });
}

