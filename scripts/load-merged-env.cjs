/**
 * Prisma/DB CLI용 환경 병합.
 * - 기본: `.env.development` + (조건부) `.msv-embedded.env` + `.env.local` (맨 마지막이 우선)
 * - `.msv-embedded.env` 는 embedded 가 실제로 뜬 뒤 생기는 `.msv-embedded-pg/.embedded-ready` 가 있을 때만 병합
 *   (`npm run dev` 권장). 잔존 파일만 쓰려면 `MSV_FORCE_EMBEDDED_ENV=1`
 * - `MSV_IGNORE_EMBEDDED_ENV=1` 또는 `MSV_USE_SYSTEM_DB_ONLY=1` 이면 embedded 파일 병합 안 함
 * - `MSV_MERGE_PRODUCTION=1`: `.env.production` + `.env.production.local`
 */
const fs = require("fs");
const path = require("path");

function parseEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return {};
  const raw = fs.readFileSync(filePath, "utf8");
  const out = {};
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
    out[key] = val;
  }
  return out;
}

function useProductionEnvFiles() {
  const v = String(process.env.MSV_MERGE_PRODUCTION || "").trim().toLowerCase();
  return v === "1" || v === "true" || v === "yes";
}

/**
 * @param {string} root web/ 디렉터리 절대 경로
 * @param {{ forceSkipEmbedded?: boolean }} [options]
 * @returns {Record<string, string>}
 */
function loadMergedEnvFromFiles(root, options) {
  const forceSkipEmbedded = options && options.forceSkipEmbedded === true;
  const prod = useProductionEnvFiles();
  const first = prod
    ? parseEnvFile(path.join(root, ".env.production"))
    : parseEnvFile(path.join(root, ".env.development"));
  const skipEmbedded =
    forceSkipEmbedded ||
    String(process.env.MSV_IGNORE_EMBEDDED_ENV || "").trim() === "1" ||
    String(process.env.MSV_USE_SYSTEM_DB_ONLY || "").trim() === "1";
  const embeddedPath = path.join(root, ".msv-embedded.env");
  const readyPath = path.join(root, ".msv-embedded-pg", ".embedded-ready");
  const forceEmbedded = String(process.env.MSV_FORCE_EMBEDDED_ENV || "").trim() === "1";
  const useEmbeddedFile =
    !prod &&
    !skipEmbedded &&
    fs.existsSync(embeddedPath) &&
    (forceEmbedded || fs.existsSync(readyPath));
  const embedded = useEmbeddedFile ? parseEnvFile(embeddedPath) : {};
  const second = prod
    ? parseEnvFile(path.join(root, ".env.production.local"))
    : parseEnvFile(path.join(root, ".env.local"));
  return { ...process.env, ...first, ...embedded, ...second };
}

module.exports = {
  parseEnvFile,
  loadMergedEnvFromFiles,
  useProductionEnvFiles,
};
