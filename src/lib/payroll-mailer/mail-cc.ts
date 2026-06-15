import { z } from "zod";

const emailSchema = z.string().email();

/** Comma or semicolon separated CC list (deduplicated, trimmed). */
export function parseCcAddresses(raw: string | undefined): string[] {
  if (!raw?.trim()) return [];
  const seen = new Set<string>();
  const out: string[] = [];
  for (const part of raw.split(/[,;]+/)) {
    const trimmed = part.trim();
    if (!trimmed || seen.has(trimmed.toLowerCase())) continue;
    seen.add(trimmed.toLowerCase());
    out.push(trimmed);
  }
  return out;
}

/** Returns the first invalid address, or null if all valid. */
export function findInvalidCcAddress(emails: string[]): string | null {
  for (const address of emails) {
    if (!emailSchema.safeParse(address).success) return address;
  }
  return null;
}
