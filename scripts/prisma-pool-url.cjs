/**
 * Prisma CLI·짧은 스크립트용 — URL에 `connection_limit` 추가.
 * 앱 런타임은 `src/lib/database-url.ts` 의 `withPrismaConnectionPoolHint` 와 정책을 맞춥니다.
 * @param {{ cli?: boolean }} opts — `cli: true` 이면 env 미지정 시 기본 1(마이그레이션·seed·ping 이 슬롯을 덜 잡음)
 */
function withPrismaConnectionPoolHint(url, opts = {}) {
  const cli = Boolean(opts.cli);
  if (!url || typeof url !== "string") return url;
  if (/\bconnection_limit=/.test(url)) return url;
  const raw = String(
    process.env.PRISMA_CONNECTION_LIMIT ||
      process.env.MSV_PRISMA_CONNECTION_LIMIT ||
      "",
  ).trim();
  const parsed = Number.parseInt(raw, 10);
  let limit;
  if (Number.isFinite(parsed) && parsed >= 1 && parsed <= 50) {
    limit = parsed;
  } else if (cli) {
    limit = 1;
  } else {
    limit = process.env.NODE_ENV === "development" ? 1 : 2;
  }
  const sep = url.includes("?") ? "&" : "?";
  return `${url}${sep}connection_limit=${limit}`;
}

function appendIfMissing(url, key, val) {
  if (!url || typeof url !== "string") return url;
  if (new RegExp(`[?&]${key}=`, "i").test(url)) return url;
  return url + (url.includes("?") ? "&" : "?") + key + "=" + encodeURIComponent(val);
}

/** `src/lib/database-url.ts` 의 `withPrismaQueryEngineTimeouts` 와 동일 값 */
function withPrismaQueryEngineTimeouts(url) {
  let u = appendIfMissing(url, "connect_timeout", "10");
  u = appendIfMissing(u, "pool_timeout", "15");
  return u;
}

function finalizePrismaDatabaseUrl(url, opts) {
  return withPrismaQueryEngineTimeouts(withPrismaConnectionPoolHint(url, opts));
}

module.exports = {
  withPrismaConnectionPoolHint,
  withPrismaQueryEngineTimeouts,
  finalizePrismaDatabaseUrl,
};
