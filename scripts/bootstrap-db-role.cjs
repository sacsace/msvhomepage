/**
 * 슈퍼유저로 접속해 `DB_USER` / `DB_PASSWORD` / `DB_NAME` 에 맞는 역할·DB 를 만듭니다.
 * `load-merged-env` 와 동일 규칙(개발 파일 또는 MSV_MERGE_PRODUCTION=1 일 때 운영 파일).
 */
const path = require("path");
const { Client } = require("pg");
const {
  buildDatabaseUrl,
  resolveSslModeFromEnv,
} = require("./build-database-url.cjs");
const { loadMergedEnvFromFiles } = require("./load-merged-env.cjs");

function assertIdent(name, label) {
  if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(name)) {
    throw new Error(
      `${label} 식별자가 올바르지 않습니다(영문·숫자·밑줄만): ${name}`,
    );
  }
}

function quoteIdent(s) {
  assertIdent(s, "식별자");
  return `"${s.replace(/"/g, '""')}"`;
}

function quoteLiteral(s) {
  return `'${String(s).replace(/'/g, "''")}'`;
}

function resolveAdminUrl(merged) {
  let u = (merged.POSTGRES_ADMIN_URL || "").trim();
  if (u) return u;
  const pass = (merged.POSTGRES_SUPERUSER_PASSWORD || "").trim();
  const host = (merged.DB_HOST || "localhost").trim();
  const port = (merged.DB_PORT || "5432").trim();
  const superUser = (merged.POSTGRES_SUPERUSER_USER || "postgres").trim();
  if (!pass) return null;
  const ssl = resolveSslModeFromEnv(merged, host.toLowerCase());
  return `postgresql://${encodeURIComponent(superUser)}:${encodeURIComponent(pass)}@${host}:${port}/postgres?sslmode=${ssl}`;
}

async function main() {
  const root = path.join(__dirname, "..");
  const merged = loadMergedEnvFromFiles(root);
  const appUrl = buildDatabaseUrl(merged);
  if (appUrl) merged.DATABASE_URL = appUrl;

  const adminUrl = resolveAdminUrl(merged);
  if (!adminUrl) {
    console.error(
      "[db:bootstrap] 슈퍼유저로 `postgres` DB 에 붙을 수 없습니다.\n" +
        "  다음 중 하나를 설정한 뒤 다시 실행하세요.\n" +
        "  • 비밀 파일(.env.local / .env.production.local) — POSTGRES_ADMIN_URL=postgresql://postgres:…@호스트:5432/postgres?…\n" +
        "  • POSTGRES_SUPERUSER_PASSWORD=(슈퍼유저 비밀번호)\n" +
        "  • PowerShell — $env:POSTGRES_SUPERUSER_PASSWORD='...'; npm run db:bootstrap",
    );
    process.exit(1);
  }

  const dbUser = (merged.DB_USER || "mvs_user").trim();
  const dbPass =
    merged.DB_PASSWORD != null ? String(merged.DB_PASSWORD) : "";
  const dbName = (merged.DB_NAME || "msv").trim();
  assertIdent(dbUser, "DB_USER");
  assertIdent(dbName, "DB_NAME");
  if (!dbPass) {
    console.error(
      "[db:bootstrap] DB_PASSWORD 가 비어 있습니다. `.env.development` 또는 `.env.production` 을 확인하세요.",
    );
    process.exit(1);
  }

  const redacted = adminUrl.replace(/:([^:@/]+)@/, ":****@");
  console.info("[db:bootstrap] 관리 연결:", redacted);

  const client = new Client({ connectionString: adminUrl });
  await client.connect();

  const userExists = await client.query(
    "SELECT 1 FROM pg_roles WHERE rolname = $1",
    [dbUser],
  );
  if (userExists.rowCount === 0) {
    await client.query(
      `CREATE ROLE ${quoteIdent(dbUser)} WITH LOGIN PASSWORD ${quoteLiteral(dbPass)}`,
    );
    console.info(`[db:bootstrap] 역할 생성: ${dbUser}`);
  } else {
    await client.query(
      `ALTER ROLE ${quoteIdent(dbUser)} WITH LOGIN PASSWORD ${quoteLiteral(dbPass)}`,
    );
    console.info(`[db:bootstrap] 역할 비밀번호 갱신: ${dbUser}`);
  }

  const dbExists = await client.query(
    "SELECT 1 FROM pg_database WHERE datname = $1",
    [dbName],
  );
  if (dbExists.rowCount === 0) {
    await client.query(
      `CREATE DATABASE ${quoteIdent(dbName)} OWNER ${quoteIdent(dbUser)}`,
    );
    console.info(`[db:bootstrap] DB 생성: ${dbName}`);
  } else {
    await client.query(
      `ALTER DATABASE ${quoteIdent(dbName)} OWNER TO ${quoteIdent(dbUser)}`,
    );
    console.info(`[db:bootstrap] DB 이미 있음: ${dbName} (소유자: ${dbUser} 로 정렬)`);
  }

  await client.query(
    `GRANT CONNECT, TEMP ON DATABASE ${quoteIdent(dbName)} TO ${quoteIdent(dbUser)}`,
  );

  await client.end();

  const dbAdminUrl = adminUrl.replace(/\/postgres(\?|$)/, `/${dbName}$1`);
  const dbAdmin = new Client({ connectionString: dbAdminUrl });
  await dbAdmin.connect();
  await dbAdmin.query(
    `GRANT USAGE, CREATE ON SCHEMA public TO ${quoteIdent(dbUser)}`,
  );
  await dbAdmin.query(
    `GRANT SELECT, INSERT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER ON ALL TABLES IN SCHEMA public TO ${quoteIdent(dbUser)}`,
  );
  await dbAdmin.query(
    `ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER ON TABLES TO ${quoteIdent(dbUser)}`,
  );
  await dbAdmin.end();
  console.info(`[db:bootstrap] 권한 정렬 완료: ${dbUser}@${dbName}`);

  console.info(
    "[db:bootstrap] 완료. 다음: npm run db:ping → npm run db:push (운영은 db:ping:prod → db:push:prod)",
  );
}

main().catch((e) => {
  console.error("[db:bootstrap] 실패:", e.message || e);
  process.exit(1);
});
