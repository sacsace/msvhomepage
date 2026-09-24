import fs from "fs";
import path from "path";
import { resolveMsvWebRoot } from "./msv-web-root";

const EMBEDDED_ENV_CACHE_KEY = "__msvEmbeddedEnvApplyCache";
const EMBEDDED_ENV_LOG_KEY = "__msvEmbeddedEnvInfoLogged";

type EmbeddedEnvCache = { stamp: string; result: boolean };

function readEmbeddedEnvCache(): EmbeddedEnvCache | undefined {
  return (globalThis as typeof globalThis & { [EMBEDDED_ENV_CACHE_KEY]?: EmbeddedEnvCache })[
    EMBEDDED_ENV_CACHE_KEY
  ];
}

function writeEmbeddedEnvCache(cache: EmbeddedEnvCache): void {
  (globalThis as typeof globalThis & { [EMBEDDED_ENV_CACHE_KEY]?: EmbeddedEnvCache })[
    EMBEDDED_ENV_CACHE_KEY
  ] = cache;
}

function logEmbeddedEnvAppliedOnce(): void {
  if (process.env.NODE_ENV === "production") return;
  if (String(process.env.MSV_DEV_VERBOSE || "").trim() !== "1") return;
  const g = globalThis as typeof globalThis & { [EMBEDDED_ENV_LOG_KEY]?: boolean };
  if (g[EMBEDDED_ENV_LOG_KEY]) return;
  g[EMBEDDED_ENV_LOG_KEY] = true;
  console.info(
    "[MSV] embedded Postgres용 DB_* 를 `.msv-embedded.env` 로 적용했습니다.",
  );
}

export { resolveMsvWebRoot } from "./msv-web-root";

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
  if (stamp) {
    const cached = readEmbeddedEnvCache();
    if (cached && cached.stamp === stamp) {
      return cached.result;
    }
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
    logEmbeddedEnvAppliedOnce();
  }
  if (stamp) {
    writeEmbeddedEnvCache({ stamp, result: mergedEmbeddedDbVars });
  }
  return mergedEmbeddedDbVars;
}
