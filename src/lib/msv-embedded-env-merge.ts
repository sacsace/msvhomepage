import fs from "fs";
import path from "path";

/** `stat` + ready 플래그가 같으면 디스크 재읽기·로그 생략(Prisma 프록시가 URL을 자주 평가함) */
let applyEmbeddedCacheStamp = "";
let applyEmbeddedCacheResult = false;
let applyEmbeddedInfoLogged = false;

/**
 * `npm run dev` 가 `web/` 이 아닌 상위 폴더에서 실행된 경우를 보완합니다.
 */
export function resolveMsvWebRoot(fallback: string = process.cwd()): string {
  const base = path.resolve(fallback);
  if (fs.existsSync(path.join(base, "prisma", "schema.prisma"))) return base;
  const nested = path.join(base, "web");
  if (fs.existsSync(path.join(nested, "prisma", "schema.prisma"))) return nested;
  return base;
}

/**
 * `next.config.ts` · `instrumentation-db-check.ts` · `prisma.ts` 에서 공통 사용.
 * `.msv-embedded.env` 의 `DB_*` 를 process.env 에 반영하고 `DATABASE_URL` 을 지워 `resolveDatabaseUrl()` 이 parts 를 쓰게 합니다.
 * @returns embedded DB 변수를 병합했으면 true
 */
export function applyMsvEmbeddedDatabaseEnvFromDisk(cwd?: string): boolean {
  const root = resolveMsvWebRoot(cwd ?? process.cwd());
  const skip =
    String(process.env.MSV_IGNORE_EMBEDDED_ENV || "").trim() === "1" ||
    String(process.env.MSV_USE_SYSTEM_DB_ONLY || "").trim() === "1";
  if (skip) return false;

  const envPath = path.join(root, ".msv-embedded.env");
  if (!fs.existsSync(envPath)) return false;

  const readyFlag = path.join(root, ".msv-embedded-pg", ".embedded-ready");
  const forceEmbedded = String(process.env.MSV_FORCE_EMBEDDED_ENV || "").trim() === "1";
  const readyExists = fs.existsSync(readyFlag);
  if (!forceEmbedded && !readyExists) return false;

  let stamp: string;
  try {
    stamp = `${envPath}:${fs.statSync(envPath).mtimeMs}:${readyExists ? 1 : 0}:${forceEmbedded ? 1 : 0}`;
  } catch {
    stamp = "";
  }
  if (stamp && stamp === applyEmbeddedCacheStamp) {
    return applyEmbeddedCacheResult;
  }

  const raw = fs.readFileSync(envPath, "utf8");
  let mergedEmbeddedDbVars = false;
  for (const line of raw.split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const eq = t.indexOf("=");
    if (eq <= 0) continue;
    const key = t.slice(0, eq).trim();
    let val = t.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (key.startsWith("DB_")) {
      process.env[key] = val;
      mergedEmbeddedDbVars = true;
      continue;
    }
    const existing = process.env[key];
    if (existing !== undefined && String(existing).trim() !== "") {
      continue;
    }
    if (key === "DATABASE_URL" && process.env.DB_HOST?.trim()) {
      continue;
    }
    process.env[key] = val;
  }
  if (mergedEmbeddedDbVars) {
    delete process.env.DATABASE_URL;
    if (process.env.NODE_ENV !== "production" && !applyEmbeddedInfoLogged) {
      applyEmbeddedInfoLogged = true;
      console.info(
        "[MSV] embedded Postgres용 DB_* 를 `.msv-embedded.env` 로 적용했습니다. `.env.local` 의 DATABASE_URL 은 무시되며 `resolveDatabaseUrl()` 이 DB_* 로 조합합니다.",
      );
    }
  }
  if (stamp) {
    applyEmbeddedCacheStamp = stamp;
    applyEmbeddedCacheResult = mergedEmbeddedDbVars;
  }
  return mergedEmbeddedDbVars;
}
