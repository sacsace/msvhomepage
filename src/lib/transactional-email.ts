import nodemailer from "nodemailer";
import type { MailSettings } from "@/types/mail-settings";
import { smtpConnectTarget, smtpSocketIpv4Only } from "@/lib/mail-settings-store";

export type TransactionalEmailMode = "smtp" | "resend" | "sendgrid" | "postmark";

/** `MSV_EMAIL_PROVIDER` 가 없으면 API 키 환경 변수로 자동 선택, 없으면 smtp */
export function getTransactionalEmailMode(): TransactionalEmailMode {
  const explicit = process.env.MSV_EMAIL_PROVIDER?.trim().toLowerCase();
  if (explicit === "resend" || explicit === "sendgrid" || explicit === "postmark" || explicit === "smtp") {
    return explicit;
  }
  if (process.env.RESEND_API_KEY?.trim()) return "resend";
  if (process.env.SENDGRID_API_KEY?.trim()) return "sendgrid";
  if (process.env.POSTMARK_SERVER_TOKEN?.trim()) return "postmark";
  return "smtp";
}

/** 관리자 화면·진단용 — 비밀 값은 노출하지 않음 */
export function getTransactionalEmailDiagnostics() {
  const mode = getTransactionalEmailMode();
  return {
    mode,
    onRailway: Boolean(process.env.RAILWAY_ENVIRONMENT?.trim()),
    providerEnv: process.env.MSV_EMAIL_PROVIDER?.trim() || null,
    hasResendKey: Boolean(process.env.RESEND_API_KEY?.trim()),
    hasSendgridKey: Boolean(process.env.SENDGRID_API_KEY?.trim()),
    hasPostmarkToken: Boolean(process.env.POSTMARK_SERVER_TOKEN?.trim()),
    transactionalFrom: process.env.MSV_TRANSACTIONAL_FROM?.trim() || null,
  };
}

/** Resend/SendGrid 등에 넣을 발신 주소 — DB `fromAddress` → `MSV_TRANSACTIONAL_FROM` → 수신(To) 첫 주소 */
export function resolveTransactionalFromAddress(settings: MailSettings): string {
  const fromDb = String(settings.fromAddress || "").trim();
  if (fromDb) return fromDb;
  const envFrom = process.env.MSV_TRANSACTIONAL_FROM?.trim();
  if (envFrom) return envFrom;
  const firstTo =
    String(settings.toAddress || "")
      .split(/[,;\n]+/)
      .map((s) => s.trim())
      .find(Boolean) || "";
  return firstTo;
}

/** `"Name" <a@b.com>` 또는 `a@b.com` 에서 메일 주소만 */
export function parseEmailAddressOnly(s: string): string {
  const t = s.trim();
  const m = t.match(/<([^>]+)>/);
  return (m ? m[1] : t).trim();
}

function readBoundedIntEnv(name: string, fallback: number, min: number, max: number): number {
  const raw = process.env[name]?.trim();
  if (!raw) return fallback;
  const n = Number.parseInt(raw, 10);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, n));
}

/** 기본 12초 — 무한 대기 방지. `MSV_SMTP_CONNECTION_TIMEOUT_MS`(5000~60000)로 조정 가능 */
function smtpClientTimeouts(): { connectionTimeout: number; greetingTimeout: number; socketTimeout: number } {
  const connectionTimeout = readBoundedIntEnv("MSV_SMTP_CONNECTION_TIMEOUT_MS", 12_000, 5000, 60_000);
  return {
    connectionTimeout,
    greetingTimeout: Math.min(connectionTimeout, 10_000),
    socketTimeout: connectionTimeout + 15_000,
  };
}

/** 공개 API에는 원문 전체를 넣지 말고, 관리자 테스트 등에만 보조 문구로 사용 */
export function transactionalSendFailureUserHint(err: unknown): string | null {
  const code =
    err && typeof err === "object" && "code" in err && typeof (err as { code?: unknown }).code === "string"
      ? (err as { code: string }).code
      : "";
  const msg = (err instanceof Error ? err.message : String(err)).toLowerCase();
  const timedOut =
    code === "ETIMEDOUT" ||
    msg.includes("connection timeout") ||
    (msg.includes("timeout") && (msg.includes("conn") || code === "ESOCKETTIMEDOUT"));
  if (timedOut) {
    return "SMTP 서버에 TCP 연결이 되지 않았습니다(타임아웃). 호스트·포트·방화벽을 확인하세요. Railway 등에서 아웃바운드 SMTP가 막혀 있으면 RESEND_API_KEY, SENDGRID_API_KEY, POSTMARK_SERVER_TOKEN 중 하나를 서버 환경 변수로 넣고(선택: MSV_EMAIL_PROVIDER) HTTPS 메일 API로 보내세요.";
  }
  if (code === "ECONNREFUSED" || msg.includes("connection refused")) {
    return "SMTP 연결이 거절되었습니다. 포트·SSL/TLS 설정이 호스트와 맞는지 확인하세요.";
  }
  if (code === "ENOTFOUND" || msg.includes("getaddrinfo") || msg.includes("enotfound")) {
    return "SMTP 호스트 이름을 DNS에서 찾을 수 없습니다. 호스트 철자를 확인하세요.";
  }
  return null;
}

export type TransactionalAttachment = { filename: string; content: Buffer };

export type SendTransactionalEmailInput = {
  settings: MailSettings;
  to: string[];
  subject: string;
  text: string;
  replyTo?: string;
  /** SMTP: nodemailer `from` 헤더. API: 선택(없으면 `envelopeFrom`만 사용) */
  fromHeader?: string;
  /** SMTP: MAIL FROM. API와 SMTP 공통으로 실제 발신 도메인에 맞는 주소 권장 */
  envelopeFrom: string;
  attachments?: TransactionalAttachment[];
};

function attachmentsToBase64(
  list: TransactionalAttachment[] | undefined,
): { filename: string; content: string; contentType?: string }[] {
  if (!list?.length) return [];
  return list.map((a) => ({
    filename: a.filename,
    content: a.content.toString("base64"),
    contentType: "application/octet-stream",
  }));
}

async function sendViaResend(input: SendTransactionalEmailInput): Promise<void> {
  const key = process.env.RESEND_API_KEY?.trim();
  if (!key) throw new Error("RESEND_API_KEY가 설정되지 않았습니다.");

  const body: Record<string, unknown> = {
    from: input.fromHeader ?? input.envelopeFrom,
    to: input.to,
    subject: input.subject,
    text: input.text,
  };
  if (input.replyTo?.trim()) body.reply_to = [input.replyTo.trim()];
  const att = attachmentsToBase64(input.attachments);
  if (att.length) {
    body.attachments = att.map((a) => ({
      filename: a.filename,
      content: a.content,
    }));
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const raw = await res.text();
  if (!res.ok) {
    let msg = raw.slice(0, 400);
    try {
      const j = JSON.parse(raw) as { message?: string };
      if (j?.message) msg = j.message;
    } catch {
      /* ignore */
    }
    throw new Error(`Resend ${res.status}: ${msg}`);
  }
}

async function sendViaSendGrid(input: SendTransactionalEmailInput): Promise<void> {
  const key = process.env.SENDGRID_API_KEY?.trim();
  if (!key) throw new Error("SENDGRID_API_KEY가 설정되지 않았습니다.");

  const fromRaw = input.fromHeader ?? input.envelopeFrom;
  const fromEmail = fromRaw.includes("<")
    ? fromRaw.replace(/^.*<([^>]+)>.*$/, "$1").trim()
    : fromRaw.trim();
  const fromNameMatch = fromRaw.match(/^(.+?)\s*</);
  const fromName = fromNameMatch ? fromNameMatch[1].replace(/^["']|["']$/g, "").trim() : undefined;

  const personalizations = [
    {
      to: input.to.map((email) => ({ email })),
      ...(input.replyTo?.trim() ? { reply_to: { email: input.replyTo.trim() } } : {}),
    },
  ];

  const msg: Record<string, unknown> = {
    personalizations,
    from: { email: fromEmail, ...(fromName ? { name: fromName } : {}) },
    subject: input.subject,
    content: [{ type: "text/plain", value: input.text }],
  };

  const att = attachmentsToBase64(input.attachments);
  if (att.length) {
    (msg as { attachments?: unknown }).attachments = att.map((a) => ({
      content: a.content,
      filename: a.filename,
      type: a.contentType || "application/octet-stream",
      disposition: "attachment",
    }));
  }

  const res = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify(msg),
  });
  if (!res.ok) {
    const raw = await res.text();
    throw new Error(`SendGrid ${res.status}: ${raw.slice(0, 400)}`);
  }
}

async function sendViaPostmark(input: SendTransactionalEmailInput): Promise<void> {
  const token = process.env.POSTMARK_SERVER_TOKEN?.trim();
  if (!token) throw new Error("POSTMARK_SERVER_TOKEN이 설정되지 않았습니다.");

  const body: Record<string, unknown> = {
    From: input.fromHeader ?? input.envelopeFrom,
    To: input.to.join(","),
    Subject: input.subject,
    TextBody: input.text,
    MessageStream: process.env.POSTMARK_MESSAGE_STREAM?.trim() || "outbound",
  };
  if (input.replyTo?.trim()) body.ReplyTo = input.replyTo.trim();

  const att = input.attachments;
  if (att?.length) {
    body.Attachments = att.map((a) => ({
      Name: a.filename,
      Content: a.content.toString("base64"),
      ContentType: "application/octet-stream",
    }));
  }

  const res = await fetch("https://api.postmarkapp.com/email", {
    method: "POST",
    headers: { "X-Postmark-Server-Token": token, "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(body),
  });
  const raw = await res.text();
  if (!res.ok) {
    let msg = raw.slice(0, 400);
    try {
      const j = JSON.parse(raw) as { Message?: string };
      if (j?.Message) msg = j.Message;
    } catch {
      /* ignore */
    }
    throw new Error(`Postmark ${res.status}: ${msg}`);
  }
}

async function sendViaSmtp(input: SendTransactionalEmailInput): Promise<void> {
  const settings = input.settings;
  if (!settings.host.trim()) throw new Error("SMTP 호스트가 비어 있습니다.");

  const hasUser = Boolean(settings.user.trim());
  const hasPass = Boolean(String(settings.pass || "").trim());
  const useAuth = hasUser && hasPass;
  const tcp = await smtpConnectTarget(settings.host);
  const timeouts = smtpClientTimeouts();
  const transporter = nodemailer.createTransport({
    host: tcp.host,
    ...(tcp.servername ? { servername: tcp.servername } : {}),
    port: settings.port,
    secure: settings.secure,
    ...timeouts,
    ...smtpSocketIpv4Only,
    ...(!settings.secure && settings.port === 587 ? { requireTLS: true } : {}),
    ...(useAuth ? { auth: { user: settings.user, pass: settings.pass } } : {}),
  });

  const from = input.fromHeader ?? input.envelopeFrom;
  await transporter.sendMail({
    envelope: { from: input.envelopeFrom, to: input.to },
    from,
    sender: input.envelopeFrom,
    ...(input.replyTo?.trim() ? { replyTo: input.replyTo.trim() } : {}),
    to: input.to,
    subject: input.subject,
    text: input.text,
    ...(input.attachments?.length
      ? {
          attachments: input.attachments.map((a) => ({
            filename: a.filename,
            content: a.content,
          })),
        }
      : {}),
  });
}

/** 문의·법인 설립·테스트 등 공통 발송 — Railway 등 SMTP 차단 시 HTTPS API 사용 */
export async function sendTransactionalEmail(input: SendTransactionalEmailInput): Promise<void> {
  const mode = getTransactionalEmailMode();
  if (mode === "smtp") {
    await sendViaSmtp(input);
    return;
  }
  if (mode === "resend") {
    await sendViaResend(input);
    return;
  }
  if (mode === "sendgrid") {
    await sendViaSendGrid(input);
    return;
  }
  await sendViaPostmark(input);
}

/** SMTP 모드에서만 호스트 필수 */
export function mailSettingsHasSmtpHost(settings: MailSettings): boolean {
  return Boolean(settings.host.trim());
}
