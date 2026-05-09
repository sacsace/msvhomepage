import dns from "node:dns/promises";
import net from "node:net";
import type { MailSettings } from "@/types/mail-settings";
import { prisma } from "@/lib/prisma";
import { withRecoverableDbRead } from "@/lib/prisma-read-fallback";

const defaults: MailSettings = {
  host: "",
  port: 587,
  secure: false,
  user: "",
  pass: "",
  fromAddress: "",
  toAddress: "lee@msventures.in, info@msventures.in",
};

/**
 * SMTP TCP 연결 힌트. nodemailer DNS 단계에서 IPv6가 먼저/무작위로 선택되면 `ENETUNREACH`가 날 수 있어
 * 함께 씁니다. 실제 IPv4 강제는 `smtpConnectTarget`으로 호스트를 A 레코드로 풀어 쓰는 편이 확실합니다.
 */
export const smtpSocketIpv4Only = { family: 4 as const };

/**
 * `smtp.gmail.com` 등이 AAAA(IPv6)로 연결되다 실패하는 호스팅 대비: 호스트명이면 IPv4 주소로 풀고,
 * TLS SNI·인증서 검증을 위해 `servername`에 원래 호스트명을 넘깁니다.
 */
export async function smtpConnectTarget(smtpHost: string): Promise<{ host: string; servername?: string }> {
  const h = String(smtpHost ?? "").trim();
  if (!h) return { host: h };
  if (net.isIP(h)) return { host: h };
  try {
    const v4 = await dns.resolve4(h);
    if (!v4.length) return { host: h };
    return { host: v4[0]!, servername: h };
  } catch {
    return { host: h };
  }
}

/** `toAddress` 필드에 쉼표·세미콜론 등으로 적힌 수신자 목록 */
export function parseSmtpRecipientList(toAddress: string): string[] {
  return toAddress
    .split(/[,;\n]+/)
    .map((x) => x.trim())
    .filter(Boolean);
}

function normalize(partial: Partial<MailSettings>): MailSettings {
  const port = Number(partial.port);
  return {
    host: String(partial.host ?? "").trim(),
    port: Number.isFinite(port) && port > 0 ? Math.floor(port) : defaults.port,
    secure: Boolean(partial.secure),
    user: String(partial.user ?? "").trim(),
    pass: String(partial.pass ?? ""),
    fromAddress: String(partial.fromAddress ?? "").trim(),
    toAddress: String(partial.toAddress ?? defaults.toAddress).trim() || defaults.toAddress,
  };
}

function rowToSettings(row: {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  fromAddress: string;
  toAddress: string;
}): MailSettings {
  return normalize({
    host: row.host,
    port: row.port,
    secure: row.secure,
    user: row.user,
    pass: row.pass,
    fromAddress: row.fromAddress,
    toAddress: row.toAddress,
  });
}

export async function readMailSettings(): Promise<MailSettings> {
  return withRecoverableDbRead(defaults, async () => {
    let row = await prisma.mailSettings.findUnique({ where: { id: 1 } });
    if (!row) {
      row = await prisma.mailSettings.create({
        data: {
          id: 1,
          host: defaults.host,
          port: defaults.port,
          secure: defaults.secure,
          user: defaults.user,
          pass: defaults.pass,
          fromAddress: defaults.fromAddress,
          toAddress: defaults.toAddress,
        },
      });
    }
    return rowToSettings(row);
  });
}

export async function writeMailSettings(settings: MailSettings): Promise<void> {
  const n = normalize(settings);
  await prisma.mailSettings.upsert({
    where: { id: 1 },
    create: {
      id: 1,
      host: n.host,
      port: n.port,
      secure: n.secure,
      user: n.user,
      pass: n.pass,
      fromAddress: n.fromAddress,
      toAddress: n.toAddress,
    },
    update: {
      host: n.host,
      port: n.port,
      secure: n.secure,
      user: n.user,
      pass: n.pass,
      fromAddress: n.fromAddress,
      toAddress: n.toAddress,
    },
  });
}

export async function readMailSettingsPublic(): Promise<
  Omit<MailSettings, "pass"> & { hasPassword: boolean }
> {
  const s = await readMailSettings();
  return {
    host: s.host,
    port: s.port,
    secure: s.secure,
    user: s.user,
    fromAddress: s.fromAddress,
    toAddress: s.toAddress,
    hasPassword: s.pass.length > 0,
  };
}

export function mergeMailSettings(existing: MailSettings, patch: Partial<MailSettings>): MailSettings {
  const passInput = patch.pass !== undefined ? String(patch.pass) : undefined;
  const pass =
    passInput !== undefined && passInput.length > 0 ? passInput : existing.pass;
  return normalize({
    ...existing,
    ...patch,
    pass,
  });
}
