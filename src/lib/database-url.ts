/**
 * PostgreSQL 연결 문자열.
 * - `DATABASE_URL` 이 있으면 우선 사용
 * - 없으면 `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD` 로 조합
 * - SSL: `DB_SSLMODE` / `DATABASE_SSLMODE` 없으면 localhost 계열은 disable, 그 외 require (`scripts/build-database-url.cjs` 와 동일)
 */
function resolveSslMode(hostLower: string): string {
  const raw = String(
    process.env.DB_SSLMODE?.trim() ||
      process.env.DATABASE_SSLMODE?.trim() ||
      "",
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

function databaseUrlFromParts(): string | null {
  const host = process.env.DB_HOST?.trim();
  const port = process.env.DB_PORT?.trim() || "5432";
  const name = process.env.DB_NAME?.trim();
  const user = process.env.DB_USER?.trim();
  const password =
    process.env.DB_PASSWORD != null ? String(process.env.DB_PASSWORD) : "";

  if (!host || !name || !user) return null;

  const u = encodeURIComponent(user);
  const p = encodeURIComponent(password);
  const sslmode = resolveSslMode(host.toLowerCase());
  return `postgresql://${u}:${p}@${host}:${port}/${name}?schema=public&sslmode=${sslmode}`;
}

export function resolveDatabaseUrl(): string {
  const ignoreEmbedded =
    String(process.env.MSV_IGNORE_EMBEDDED_ENV || "").trim() === "1" ||
    String(process.env.MSV_USE_SYSTEM_DB_ONLY || "").trim() === "1";

  const partsUrl = databaseUrlFromParts();
  let u = process.env.DATABASE_URL?.trim() ?? "";

  const embeddedPort = String(process.env.MSV_EMBEDDED_PORT || "55432").trim();
  const looksLikeEmbeddedUrl =
    Boolean(u) &&
    (u.includes(`:${embeddedPort}/`) || u.includes(`:${embeddedPort}?`));

  if (!ignoreEmbedded && looksLikeEmbeddedUrl && partsUrl) {
    u = partsUrl;
  }

  if (!u) {
    u = partsUrl ?? "";
  }
  if (!u) {
    // `npm run build` 시 `MSV_LENIENT_DB_BUILD=1` — Next가 페이지 데이터 수집으로 API/스토어를
    // 불러오면서 prisma 모듈이 로드될 수 있음. CI·Railway 등 빌드 단계에 DB 변수가 없어도
    // 모듈 초기화만 통과하게 함(`prisma generate`와 동일한 더미). 런타임(`next start`)에는
    // 반드시 실제 `DATABASE_URL` / `DB_*` 를 넣어야 함.
    if (String(process.env.MSV_LENIENT_DB_BUILD || "").trim() === "1") {
      return "postgresql://prisma:prisma@127.0.0.1:5432/dummy?schema=public&sslmode=disable";
    }
    throw new Error(
      "DB 연결 정보가 없습니다. `DATABASE_URL` 또는 " +
        "`DB_HOST`+`DB_PORT`+`DB_NAME`+`DB_USER`(+`DB_PASSWORD`)를 " +
        "`.env.development`·`.env.local`(개발) 또는 `.env.production`(운영)에 설정하세요.",
    );
  }
  const low = u.toLowerCase();
  if (low.startsWith("file:")) {
    throw new Error(
      "이 프로젝트는 PostgreSQL만 사용합니다. SQLite용 `DATABASE_URL=file:...` 를 제거하세요.",
    );
  }
  if (
    !low.startsWith("postgres://") &&
    !low.startsWith("postgresql://") &&
    !low.startsWith("prisma+postgres://") &&
    !low.startsWith("prisma+postgresql://")
  ) {
    throw new Error(
      "DATABASE_URL은 PostgreSQL 연결 문자열이어야 합니다. (postgresql:// 또는 postgres:// 로 시작)",
    );
  }
  assertAppDbUserNotPostgresBuiltin(u);
  return u;
}

/** `postgresql://` / `prisma+postgresql://` 등에서 사용자명만 추출합니다. */
export function parsePostgresUrlUser(databaseUrl: string): string | null {
  const raw = databaseUrl.trim();
  if (!raw) return null;
  const normalized = raw.replace(/^prisma\+/i, "");
  try {
    const parsed = new URL(normalized);
    const proto = parsed.protocol.toLowerCase();
    if (proto !== "postgresql:" && proto !== "postgres:") return null;
    const user = decodeURIComponent(parsed.username || "");
    return user || null;
  } catch {
    return null;
  }
}

/**
 * 앱은 PostgreSQL 기본 역할 `postgres`(대개 SUPERUSER)로 붙지 않습니다.
 * 전용 역할은 `npm run db:bootstrap` 등으로 만들고 `DB_USER`/`DATABASE_URL`에 반영하세요.
 * 임시로 허용하려면 `MSV_ALLOW_POSTGRES_APP_USER=1`.
 */
function assertAppDbUserNotPostgresBuiltin(databaseUrl: string): void {
  if (String(process.env.MSV_ALLOW_POSTGRES_APP_USER || "").trim() === "1") {
    return;
  }
  const dbUser = parsePostgresUrlUser(databaseUrl);
  if (!dbUser || dbUser.toLowerCase() !== "postgres") return;
  throw new Error(
    "앱(Prisma) 연결에는 PostgreSQL 기본 역할 `postgres`를 쓰면 안 됩니다. " +
      "`DB_USER`에 전용 역할(예: mvs_user)을 두고, 관리용 비밀번호는 `POSTGRES_SUPERUSER_PASSWORD`/`POSTGRES_ADMIN_URL`로만 bootstrap에 쓰세요. " +
      "로컬: `web`에서 `npm run db:bootstrap` 후 `.env`의 `DATABASE_URL`/`DB_USER`를 전용 역할로 맞춥니다. " +
      "임시 예외: `MSV_ALLOW_POSTGRES_APP_USER=1`",
  );
}

/**
 * Prisma → PostgreSQL `connection_limit` 힌트(미설정 시).
 * Turbopack·소형 PostgreSQL에서 `Too many database connections` 완화.
 * URL에 이미 `connection_limit`이 있으면 그대로 둡니다.
 * `PRISMA_CONNECTION_LIMIT` 또는 `MSV_PRISMA_CONNECTION_LIMIT`(1~50).
 * CLI는 `scripts/prisma-pool-url.cjs` 의 `finalizePrismaDatabaseUrl` 로 `connection_limit`·`connect_timeout`·`pool_timeout` 을 맞춥니다.
 */
export function withPrismaConnectionPoolHint(url: string): string {
  if (/\bconnection_limit=/.test(url)) return url;
  const raw = process.env.PRISMA_CONNECTION_LIMIT ?? process.env.MSV_PRISMA_CONNECTION_LIMIT ?? "";
  const parsed = Number.parseInt(String(raw).trim(), 10);
  /** 개발 기본 1 — HMR 시에도 DB 슬롯을 최소로 */
  const limit =
    Number.isFinite(parsed) && parsed >= 1 && parsed <= 50
      ? parsed
      : process.env.NODE_ENV === "development"
        ? 1
        : 2;
  const sep = url.includes("?") ? "&" : "?";
  return `${url}${sep}connection_limit=${limit}`;
}

function appendQueryParamIfMissing(url: string, key: string, value: string): string {
  if (!url) return url;
  const pattern = new RegExp(`[?&]${key}=`, "i");
  if (pattern.test(url)) return url;
  const sep = url.includes("?") ? "&" : "?";
  return `${url}${sep}${key}=${encodeURIComponent(value)}`;
}

/**
 * Prisma(libpq) — 미설정 시에만 추가.
 * - `connect_timeout`(초): TCP·인증 대기 상한 — 걸린 연결 시도가 슬롯을 오래 점유하지 않게 함.
 * - `pool_timeout`(초): 풀에서 연결을 얻기까지 대기 상한.
 * 풀 내부의 “유휴 연결 반환”은 Prisma 엔진이 처리합니다. 서버 쪽 `idle_session_timeout`은
 * 풀링 앱에 부적합할 수 있어 URL에 넣지 않습니다.
 */
export function withPrismaQueryEngineTimeouts(url: string): string {
  let u = appendQueryParamIfMissing(url, "connect_timeout", "10");
  u = appendQueryParamIfMissing(u, "pool_timeout", "15");
  return u;
}
