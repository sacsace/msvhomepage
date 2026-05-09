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
 * SMTP TCP 연결을 IPv4로 고정합니다. Railway 등에서 `smtp.gmail.com`이 IPv6로만 풀리면
 * `connect ENETUNREACH … :587` 형태로 실패하는 경우가 있어 nodemailer에 그대로 전달합니다.
 */
export const smtpSocketIpv4Only = { family: 4 as const };

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
