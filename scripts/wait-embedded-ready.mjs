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

/**
 * 이전 `npm run dev` 가 비정상 종료되면 `.embedded-ready` 가 디스크에 남습니다.
 * `embedded-pg-serve.mjs` 는 기동 직후 이 파일을 지우지만, concurrently 때문에
 * wait 가 **그보다 먼저** 남은 파일을 보고 즉시 통과하면 Next 만 먼저 떠서
 * `.msv-embedded.env` 병합이 스킵되는 레이스가 납니다. 그래서 대기 루프에 들어가기 전에
 * 잔여 신호를 무조건 제거하고, 이번 세션의 embedded 가 다시 쓴 뒤에만 통과합니다.
 */
try {
  if (fs.existsSync(readyPath)) {
    fs.unlinkSync(readyPath);
    console.info(
      "[wait-embedded] 이전 세션 잔여 `.embedded-ready` 를 삭제했습니다. " +
        "이번 `embedded-pg-serve` 가 새 준비 신호를 쓸 때까지 대기합니다.",
    );
  }
} catch (e) {
  console.warn("[wait-embedded] 잔여 ready 플래그 정리 실패(무시):", e);
}

let lastProgressLog = start;
while (Date.now() - start <= timeoutMs) {
  if (fs.existsSync(readyPath)) {
    console.info(`[wait-embedded] 준비됨 (${path.relative(root, readyPath)})`);
    process.exit(0);
  }
  const now = Date.now();
  if (now - lastProgressLog >= 5000) {
    const elapsedS = Math.round((now - start) / 1000);
    const limitS = Math.round(timeoutMs / 1000);
    console.info(`[wait-embedded] embedded PostgreSQL 대기 중… ${elapsedS}s / ${limitS}s`);
    lastProgressLog = now;
  }
  await new Promise((r) => setTimeout(r, intervalMs));
}

console.error(
  `[wait-embedded] ${timeoutMs}ms 안에 embedded PostgreSQL 준비 신호를 받지 못했습니다.\n` +
    "  • 다른 터미널에서 이미 `npm run dev` 가 돌고 있는지 확인하세요.\n" +
    "  • `web/.msv-embedded-pg` 를 삭제한 뒤 다시 시도하거나, `MSV_EMBEDDED_DEBUG=1` 로 postgres 로그를 확인하세요.",
);
process.exit(1);
