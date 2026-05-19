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

/** 개발용 폼 힌트만 — 비밀번호는 넣지 않음. 공개 급여 도구 발송에는 사용하지 않음 */
export const resolveSmtpHintsFromEnv = (): Partial<SmtpSettings> => {
  const host = process.env.SMTP_HOST?.trim();
  const port = Number(process.env.SMTP_PORT ?? 587);
  const user = process.env.SMTP_USER?.trim();
  const from = process.env.SMTP_FROM?.trim() || "";

  if (!host || !user || Number.isNaN(port)) {
    return from ? { from } : {};
  }

  return {
    host,
    port,
    secure: process.env.SMTP_SECURE === "true",
    user,
    from,
  };
};

/** 요청 본문(사용자 입력)만으로 SMTP 구성 — 서버 Resend/환경 변수로 대체하지 않음 */
export const resolveUserSmtpConfig = (input?: Partial<SmtpSettings>): SmtpSettings => {
  const merged: SmtpSettings = {
    host: input?.host?.trim() || "",
    port: input?.port ?? 587,
    secure: input?.secure ?? false,
    user: input?.user?.trim() || "",
    pass: input?.pass ?? "",
    from: input?.from?.trim() || "",
  };

  const parsed = smtpSettingsSchema.safeParse(merged);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0]?.message ?? "SMTP 설정이 올바르지 않습니다.";
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

