import fs from "fs";
import path from "path";

/**
 * `npm run dev` 가 `web/` 이 아닌 상위 폴더에서 실행된 경우를 보완합니다.
 * (`next.config.ts` 등에서도 import — `@/` alias 없이 relative path 사용)
 */
export function resolveMsvWebRoot(fallback: string = process.cwd()): string {
  const base = path.resolve(fallback);
  if (fs.existsSync(path.join(base, "prisma", "schema.prisma"))) return base;
  const nested = path.join(base, "web");
  if (fs.existsSync(path.join(nested, "prisma", "schema.prisma"))) return nested;
  return base;
}
