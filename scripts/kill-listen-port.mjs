/**
 * 개발 서버 포트(기본 3100)에 LISTEN 중인 프로세스를 종료합니다.
 * - Windows: netstat -ano 파싱 후 taskkill
 * - macOS/Linux: lsof -tiTCP:<port> -sTCP:LISTEN (없으면 조용히 통과)
 * 비활성화: MSV_SKIP_KILL_DEV_PORT=1
 */
import { spawnSync } from "node:child_process";

function parseTcpListeningLocalPortPidWin32(line) {
  const trimmed = line.trim();
  if (!/^TCP\s+/i.test(trimmed)) {
    return null;
  }
  const parts = trimmed.split(/\s+/);
  if (parts.length < 4) {
    return null;
  }
  const local = parts[1];
  const state = parts[3];
  const pid = Number(parts.at(-1));
  if (!Number.isFinite(pid) || pid <= 0) {
    return null;
  }
  if (!/LISTENING/i.test(state)) {
    return null;
  }
  const m = local.match(/:(\d+)$/);
  if (!m) {
    return null;
  }
  const localPort = Number(m[1]);
  if (!Number.isFinite(localPort)) {
    return null;
  }
  return { localPort, pid };
}

function listeningPidsOnPortWin32(port) {
  const r = spawnSync("netstat", ["-ano"], { encoding: "utf8" });
  const pids = new Set();
  if (!r.stdout) {
    return [];
  }
  for (const line of r.stdout.split(/\r?\n/)) {
    const parsed = parseTcpListeningLocalPortPidWin32(line);
    if (parsed && parsed.localPort === port) {
      pids.add(parsed.pid);
    }
  }
  return [...pids];
}

function listeningPidsOnPortUnix(port) {
  const r = spawnSync("lsof", ["-nP", `-iTCP:${port}`, "-sTCP:LISTEN", "-t"], {
    encoding: "utf8",
  });
  if (r.status !== 0 || !r.stdout?.trim()) {
    return [];
  }
  const pids = new Set();
  for (const line of r.stdout.trim().split(/\n/)) {
    const pid = Number.parseInt(line, 10);
    if (Number.isFinite(pid) && pid > 0) {
      pids.add(pid);
    }
  }
  return [...pids];
}

function killPidWin32(pid) {
  const r = spawnSync("taskkill", ["/PID", String(pid), "/F", "/T"], {
    encoding: "utf8",
  });
  const msg = [r.stdout, r.stderr].filter(Boolean).join("").trim();
  if (r.status === 0 || r.status === 128) {
    return true;
  }
  console.warn(`[kill-listen-port] taskkill pid ${pid} 실패 (exit ${r.status})${msg ? `: ${msg}` : ""}`);
  return false;
}

function killPidUnix(pid) {
  try {
    process.kill(pid, "SIGTERM");
    return true;
  } catch (e) {
    console.warn(`[kill-listen-port] kill SIGTERM pid ${pid}:`, e);
    return false;
  }
}

const skip = String(process.env.MSV_SKIP_KILL_DEV_PORT || "").trim() === "1";
const portRaw = process.argv[2] || process.env.MSV_DEV_PORT || "3100";
const port = Number.parseInt(String(portRaw), 10);
if (!Number.isFinite(port) || port < 1 || port > 65535) {
  console.error(`[kill-listen-port] 잘못된 포트: ${portRaw}`);
  process.exit(1);
}

if (skip) {
  console.info(`[kill-listen-port] MSV_SKIP_KILL_DEV_PORT=1 — 포트 ${port} 정리 생략`);
  process.exit(0);
}

const myPid = process.pid;
let pids =
  process.platform === "win32" ? listeningPidsOnPortWin32(port) : listeningPidsOnPortUnix(port);

pids = pids.filter((p) => p !== myPid);

if (pids.length === 0) {
  console.info(`[kill-listen-port] 포트 ${port} LISTEN 중인 다른 프로세스 없음`);
  process.exit(0);
}

console.info(`[kill-listen-port] 포트 ${port} 사용 중인 PID: ${pids.join(", ")} — 종료 시도`);
for (const pid of pids) {
  if (process.platform === "win32") {
    killPidWin32(pid);
  } else {
    killPidUnix(pid);
  }
}

process.exit(0);
