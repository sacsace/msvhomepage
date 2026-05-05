/**
 * embedded-pg-serve.mjs 가 DB·스키마·(선택)시드까지 끝낸 뒤 쓰는 `.embedded-ready` 를 기다립니다.
 * TCP(포트)만 보면 이전에 남은 postgres 에 먼저 붙는 레이스를 피합니다.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const readyPath = path.join(root, ".msv-embedded-pg", ".embedded-ready");
const timeoutMs = Number(process.env.MSV_EMBEDDED_WAIT_MS || 300000);
const intervalMs = 300;
const start = Date.now();

while (Date.now() - start <= timeoutMs) {
  if (fs.existsSync(readyPath)) {
    console.info(`[wait-embedded] 준비됨 (${path.relative(root, readyPath)})`);
    process.exit(0);
  }
  await new Promise((r) => setTimeout(r, intervalMs));
}

console.error(
  `[wait-embedded] ${timeoutMs}ms 안에 embedded PostgreSQL 준비 신호를 받지 못했습니다.\n` +
    "  • 다른 터미널에서 이미 `npm run dev` 가 돌고 있는지 확인하세요.\n" +
    "  • `web/.msv-embedded-pg` 를 삭제한 뒤 다시 시도하거나, `MSV_EMBEDDED_DEBUG=1` 로 postgres 로그를 확인하세요.",
);
process.exit(1);
