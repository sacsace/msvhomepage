import fs from "node:fs";
import path from "node:path";

/** `web/public` 기준 `/path` 존재 여부 (서버에서만 사용) */
export function publicFileExists(urlPath: string): boolean {
  if (!urlPath.startsWith("/")) return false;
  const rel = urlPath.replace(/^\//, "");
  const full = path.join(process.cwd(), "public", rel);
  return fs.existsSync(full);
}
