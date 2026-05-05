/**
 * DB 연결 진단 후, embedded URL 때문에 실패하는 경우 `.env.local`에
 * `MSV_IGNORE_EMBEDDED_ENV=1`을 넣어 시스템 DB(DB_* / DATABASE_URL)를 쓰도록 자동 보정합니다.
 *
 * 사용: `cd web` → `npm run db:doctor`
 */
const fs = require("fs");
const path = require("path");
const { buildDatabaseUrl } = require("./build-database-url.cjs");
const { loadMergedEnvFromFiles, parseEnvFile } = require("./load-merged-env.cjs");
const { finalizePrismaDatabaseUrl } = require("./prisma-pool-url.cjs");

const root = path.join(__dirname, "..");

function redact(u) {
  return String(u || "").replace(/:([^:@/]+)@/, ":****@");
}

async function tryPing(databaseUrl) {
  if (!databaseUrl) return false;
  const url = finalizePrismaDatabaseUrl(databaseUrl, { cli: true });
  const { PrismaClient } = require("../prisma/generated/client");
  const prisma = new PrismaClient({
    datasources: { db: { url } },
    log: [],
  });
  try {
    await prisma.$connect();
    await prisma.$queryRaw`SELECT 1`;
    await prisma.$disconnect();
    return true;
  } catch {
    try {
      await prisma.$disconnect();
    } catch {
      /* ignore */
    }
    return false;
  }
}

/** embedded 없이 `.env.development` + `.env.local` 만 병합 */
function loadDevAndLocalOnly() {
  const first = parseEnvFile(path.join(root, ".env.development"));
  const second = parseEnvFile(path.join(root, ".env.local"));
  return { ...process.env, ...first, ...second };
}

function upsertEnvLocal(key, value) {
  const p = path.join(root, ".env.local");
  const line = `${key}=${value}`;
  let body = "";
  if (fs.existsSync(p)) {
    body = fs.readFileSync(p, "utf8");
  }
  const lines = body.split(/\r?\n/);
  let found = false;
  const out = lines.map((ln) => {
    const t = ln.trim();
    if (!t || t.startsWith("#")) return ln;
    const eq = ln.indexOf("=");
    if (eq <= 0) return ln;
    const k = ln.slice(0, eq).trim();
    if (k === key) {
      found = true;
      return line;
    }
    return ln;
  });
  if (!found) {
    if (out.length && out[out.length - 1] !== "") out.push("");
    out.push(line);
  }
  fs.writeFileSync(p, out.join("\n").replace(/\n+$/, "\n"), "utf8");
}

async function main() {
  const mergedDefault = loadMergedEnvFromFiles(root);
  const url0 = buildDatabaseUrl(mergedDefault).trim();
  if (!url0) {
    console.error(
      "[db:doctor] DATABASE_URL 또는 DB_HOST·DB_NAME·DB_USER 가 없습니다. web/.env.development 를 확인하세요.",
    );
    process.exit(1);
  }

  console.info("[db:doctor] 현재 병합 URL:", redact(url0));
  if (await tryPing(url0)) {
    console.info("[db:doctor] 연결 정상입니다. 추가 설정이 필요 없습니다.");
    process.exit(0);
  }

  console.warn("[db:doctor] 위 URL로 연결·인증에 실패했습니다. embedded 제외 병합으로 재시도합니다…");

  const mergedNoEmb = loadMergedEnvFromFiles(root, { forceSkipEmbedded: true });
  const url1 = buildDatabaseUrl(mergedNoEmb).trim();
  if (url1 && url1 !== url0 && (await tryPing(url1))) {
    upsertEnvLocal("MSV_IGNORE_EMBEDDED_ENV", "1");
    console.info(
      "[db:doctor] 해결: embedded 연결 문자열 대신 시스템 DB 설정으로 연결되었습니다.\n" +
        "        web/.env.local 에 MSV_IGNORE_EMBEDDED_ENV=1 을 기록했습니다. Next dev 서버를 한 번 재시작하세요.",
    );
    process.exit(0);
  }

  if (url1 && url1 === url0) {
    console.warn("[db:doctor] embedded 병합 여부와 무관하게 동일 URL입니다. 다른 원인(비밀번호·Postgres 미기동)을 의심합니다.");
  }

  const mergedDevLocal = loadDevAndLocalOnly();
  const url2 = buildDatabaseUrl(mergedDevLocal).trim();
  if (url2 && url2 !== url0 && (await tryPing(url2))) {
    upsertEnvLocal("MSV_IGNORE_EMBEDDED_ENV", "1");
    console.info(
      "[db:doctor] 해결: `.env.development`(+`.env.local`)의 DB_* 만으로 연결되었습니다.\n" +
        "        web/.env.local 에 MSV_IGNORE_EMBEDDED_ENV=1 을 기록했습니다. dev 서버를 재시작하세요.",
    );
    process.exit(0);
  }

  console.error(
    "[db:doctor] 자동 보정으로는 연결되지 않았습니다.\n" +
      "  • PostgreSQL 이 실행 중인지, DB_USER/DB_PASSWORD/DB_NAME 이 맞는지 확인하세요.\n" +
      "  • 역할·DB 생성: npm run db:bootstrap (또는 prisma/init-db.sql)\n" +
      "  • 시도한 URL(요약): 기본=" +
      redact(url0) +
      (url1 && url1 !== url0 ? ` / embedded제외=${redact(url1)}` : "") +
      (url2 && url2 !== url0 && url2 !== url1 ? ` / dev+local=${redact(url2)}` : ""),
  );
  process.exit(1);
}

main().catch((e) => {
  console.error("[db:doctor] 오류:", e);
  process.exit(1);
});
