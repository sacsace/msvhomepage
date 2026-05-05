/**
 * Prisma / 앱에서 쓰는 PostgreSQL `DATABASE_URL` 을 만듭니다.
 * - 앱은 전용 `DB_USER`(예: mvs_user)만 사용하세요. `postgres` 기본 역할(대개 SUPERUSER)은 bootstrap 전용입니다.
 * - `DATABASE_URL` 이 있으면 그대로 사용
 * - 없으면 `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD` 로 조합
 * - `DB_SSLMODE` / `DATABASE_SSLMODE` 가 없으면 localhost 계열은 disable, 그 외는 require (운영 호환)
 */
function resolveSslModeFromEnv(env, hostLower) {
  const raw = String(
    (env.DB_SSLMODE || env.DATABASE_SSLMODE || "").trim(),
  ).toLowerCase();
  const allowed = new Set([
    "disable",
    "allow",
    "prefer",
    "require",
    "verify-ca",
    "verify-full",
  ]);
  if (raw && allowed.has(raw)) return raw;
  const local =
    hostLower === "localhost" ||
    hostLower === "127.0.0.1" ||
    hostLower === "::1";
  return local ? "disable" : "require";
}

function buildDatabaseUrl(env) {
  const direct = (env.DATABASE_URL || "").trim();
  if (direct) return direct;

  const host = (env.DB_HOST || "").trim();
  const port = (env.DB_PORT || "5432").trim();
  const name = (env.DB_NAME || "").trim();
  const user = (env.DB_USER || "").trim();
  const password = env.DB_PASSWORD != null ? String(env.DB_PASSWORD) : "";

  if (!host || !name || !user) return "";

  const u = encodeURIComponent(user);
  const p = encodeURIComponent(password);
  const sslmode = resolveSslModeFromEnv(env, host.toLowerCase());
  return `postgresql://${u}:${p}@${host}:${port}/${name}?schema=public&sslmode=${sslmode}`;
}

module.exports = { buildDatabaseUrl, resolveSslModeFromEnv };
