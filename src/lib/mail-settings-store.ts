import { promises as fs } from "fs";
import path from "path";
import type { MailSettings } from "@/types/mail-settings";

const dataFile = path.join(process.cwd(), "data", "mail-settings.json");

const defaults: MailSettings = {
  host: "",
  port: 587,
  secure: false,
  user: "",
  pass: "",
  fromAddress: "",
  toAddress: "info@msventures.in",
};

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

export async function readMailSettings(): Promise<MailSettings> {
  await fs.mkdir(path.dirname(dataFile), { recursive: true });
  try {
    const raw = await fs.readFile(dataFile, "utf-8");
    const parsed = JSON.parse(raw) as Partial<MailSettings>;
    return normalize({ ...defaults, ...parsed });
  } catch {
    return { ...defaults };
  }
}

export async function writeMailSettings(settings: MailSettings): Promise<void> {
  await fs.mkdir(path.dirname(dataFile), { recursive: true });
  await fs.writeFile(dataFile, JSON.stringify(normalize(settings), null, 2), "utf-8");
}

/** 관리자 응답용: 비밀번호는 내려주지 않음 */
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
