/**
 * embedded-pg-serve.mjs 가 DB·스키마·(선택)시드까지 끝낸 뒤 쓰는 `.embedded-ready` 를 기다립니다.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { devError, devInfo, devVerbose } from "./dev-log.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const readyPath = path.join(root, ".msv-embedded-pg", ".embedded-ready");
const devLogFlags = [
  ".embedded-env-logged",
  ".db-startup-check-logged",
  ".db-startup-pass-logged",
];
const timeoutMs = Number(process.env.MSV_EMBEDDED_WAIT_MS || 300000);
const intervalMs = 300;
const start = Date.now();

try {
  if (fs.existsSync(readyPath)) {
    fs.unlinkSync(readyPath);
    devInfo("[wait] 이전 `.embedded-ready` 정리 — DB 준비 대기");
  }
  for (const name of devLogFlags) {
    const p = path.join(root, ".msv-embedded-pg", name);
    if (fs.existsSync(p)) fs.unlinkSync(p);
  }
} catch (e) {
  devError("[wait] ready 플래그 정리 실패:", e);
}

let lastProgressLog = start;
while (Date.now() - start <= timeoutMs) {
  if (fs.existsSync(readyPath)) {
    process.exit(0);
  }
  const now = Date.now();
  if (devVerbose && now - lastProgressLog >= 5000) {
    const elapsedS = Math.round((now - start) / 1000);
    devInfo(`[wait] embedded PostgreSQL 대기… ${elapsedS}s`);
    lastProgressLog = now;
  }
  await new Promise((r) => setTimeout(r, intervalMs));
}

devError(
  `[wait] ${Math.round(timeoutMs / 1000)}s 안에 DB 준비 신호를 받지 못했습니다.\n` +
    "  • 다른 터미널에서 `npm run dev` 가 실행 중인지 확인\n" +
    "  • `web/.msv-embedded-pg` 삭제 후 재시도 · `MSV_EMBEDDED_DEBUG=1` 로 PG 로그",
);
process.exit(1);
