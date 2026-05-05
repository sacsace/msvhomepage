/**
 * TCP 연결 대기 (embedded Postgres 가 accept 할 때까지).
 * 사용: node scripts/wait-tcp.mjs [host] [port] [timeoutMs]
 */
import net from "node:net";

const host = process.argv[2] || "127.0.0.1";
const port = Number(
  process.argv[3] || process.env.MSV_EMBEDDED_PORT || 55432,
);
const timeoutMs = Number(process.argv[4] || 120000);
const start = Date.now();

function tryOnce() {
  return new Promise((resolve, reject) => {
    const s = net.connect({ host, port }, () => {
      s.end();
      resolve();
    });
    s.on("error", () => reject(new Error("connect")));
  });
}

async function main() {
  while (Date.now() - start <= timeoutMs) {
    try {
      await tryOnce();
      console.info(`[wait-tcp] ${host}:${port} 준비됨`);
      return;
    } catch {
      await new Promise((r) => setTimeout(r, 300));
    }
  }
  console.error(`[wait-tcp] ${timeoutMs}ms 안에 ${host}:${port} 에 연결하지 못했습니다.`);
  process.exit(1);
}

await main();
