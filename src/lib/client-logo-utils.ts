import { promises as fs } from "fs";
import path from "path";

export function isStoredClientLogo(src: string | undefined): boolean {
  return Boolean(src?.startsWith("/uploads/clients/"));
}

export async function removeStoredClientLogoFile(src: string | undefined): Promise<void> {
  if (!isStoredClientLogo(src)) return;
  try {
    const full = path.join(process.cwd(), "public", src!.replace(/^\//, ""));
    await fs.unlink(full);
  } catch {
    // ignore
  }
}
