/**
 * DATABASE_URL 로 Postgres 에 TCP 연결·인증만 확인합니다.
 */
const path = require("path");
const { buildDatabaseUrl } = require("./build-database-url.cjs");
const { loadMergedEnvFromFiles } = require("./load-merged-env.cjs");
const { finalizePrismaDatabaseUrl } = require("./prisma-pool-url.cjs");

const root = path.join(__dirname, "..");
const merged = loadMergedEnvFromFiles(root);

const url = finalizePrismaDatabaseUrl(buildDatabaseUrl(merged).trim(), {
  cli: true,
});
if (!url) {
  console.error(
    "[db:ping] DATABASE_URL 또는 DB_HOST/DB_NAME/DB_USER 가 없습니다. .env.development/.env.local 또는 MSV_MERGE_PRODUCTION=1 일 때 .env.production 을 확인하세요.",
  );
  process.exit(1);
}

const redacted = url.replace(/:([^:@/]+)@/, ":****@");
console.info("[db:ping] 연결 시도:", redacted);

Object.assign(process.env, merged, { DATABASE_URL: url });

const { PrismaClient } = require("../prisma/generated/client");
const prisma = new PrismaClient();

prisma
  .$connect()
  .then(async () => {
    const rows = await prisma.$queryRaw`SELECT 1 AS ok`;
    console.info("[db:ping] 성공:", rows);
    await prisma.$disconnect();
    process.exit(0);
  })
  .catch(async (e) => {
    console.error("[db:ping] 실패:", e.message || e);
    try {
      await prisma.$disconnect();
    } catch {
      /* ignore */
    }
    process.exit(1);
  });
