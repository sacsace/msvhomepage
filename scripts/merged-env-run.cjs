/**
 * `.env.development` + `.env.local` (기본) 또는 `MSV_MERGE_PRODUCTION=1` 일 때
 * `.env.production` + `.env.production.local` 을 합친 뒤 명령을 실행합니다.
 * 파일 레이어가 셸의 동일 키보다 우선합니다.
 */
const path = require("path");
const { spawnSync } = require("child_process");
const { buildDatabaseUrl } = require("./build-database-url.cjs");
const { loadMergedEnvFromFiles } = require("./load-merged-env.cjs");
const { finalizePrismaDatabaseUrl } = require("./prisma-pool-url.cjs");

const root = path.join(__dirname, "..");
const merged = loadMergedEnvFromFiles(root);
const built = buildDatabaseUrl(merged);
if (built) {
  merged.DATABASE_URL = finalizePrismaDatabaseUrl(built, { cli: true });
}

const argv = process.argv.slice(2);
if (argv.length === 0) {
  console.error("Usage: node scripts/merged-env-run.cjs <command> [args...]");
  process.exit(1);
}

const isWin = process.platform === "win32";
const cmd = argv[0];
const args = argv.slice(1);
const r = spawnSync(cmd, args, {
  cwd: root,
  env: merged,
  stdio: "inherit",
  shell: isWin,
});
process.exit(r.status === null ? 1 : r.status);
