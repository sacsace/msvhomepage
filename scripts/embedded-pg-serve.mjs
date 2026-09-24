/**
 * 로컬 전용 embedded PostgreSQL (포트 기본 55432).
 * - `mvs_user` / `msv` / 비밀번호 자동 생성 → `.msv-embedded.env` 기록
 * - 최초: `prisma db push` + `db seed`
 * concurrently 와 함께 쓰며, 이 프로세스를 종료하면 DB 도 종료됩니다.
 */
import fs from "node:fs";
import net from "node:net";
import path from "node:path";
import { fileURLToPath } from "node:url";
import crypto from "node:crypto";
import { spawnSync } from "node:child_process";
import EmbeddedPostgres from "embedded-postgres";
import { devError, devInfo, devOk, devVerbose, devWarn } from "./dev-log.mjs";

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

/**
 * 비정상 종료 등으로 postmaster 가 남으면 동일 dataDir 재기동 시
 * "pre-existing shared memory block is still in use" 가 납니다.
 */
async function releaseEmbeddedDataDirIfStale(dataDirPath) {
  const pidFile = path.join(dataDirPath, "postmaster.pid");
  if (!fs.existsSync(pidFile)) {
    return;
  }
  let firstLine = "";
  try {
    firstLine = (fs.readFileSync(pidFile, "utf8").split(/\r?\n/)[0] || "").trim();
  } catch {
    return;
  }
  const oldPid = Number.parseInt(firstLine, 10);
  if (!Number.isFinite(oldPid) || oldPid <= 0) {
    try {
      fs.unlinkSync(pidFile);
    } catch {
      /* ok */
    }
    return;
  }

  let alive = false;
  if (process.platform === "win32") {
    const r = spawnSync("tasklist", ["/FI", `PID eq ${oldPid}`], { encoding: "utf8" });
    alive = Boolean(r.stdout && new RegExp(`\\b${oldPid}\\b`).test(r.stdout));
  } else {
    try {
      process.kill(oldPid, 0);
      alive = true;
    } catch {
      alive = false;
    }
  }

  if (!alive) {
    devInfo("[pg] 남은 postmaster.pid 정리(프로세스 없음)");
    try {
      fs.unlinkSync(pidFile);
    } catch {
      /* ok */
    }
    return;
  }

  devInfo(`[pg] 이전 embedded PostgreSQL(pid ${oldPid}) 종료`);
  if (process.platform === "win32") {
    spawnSync("taskkill", ["/PID", String(oldPid), "/F", "/T"], { stdio: "inherit" });
  } else {
    try {
      process.kill(oldPid, "SIGTERM");
    } catch {
      /* ok */
    }
  }
  await sleep(2500);
  try {
    if (fs.existsSync(pidFile)) {
      fs.unlinkSync(pidFile);
    }
  } catch {
    /* ok */
  }
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const preferredEmbeddedPort = Number(process.env.MSV_EMBEDDED_PORT || 55432);
const dataDir = path.join(root, ".msv-embedded-pg", "data");
const credPath = path.join(root, ".msv-embedded-pg", "credentials.json");
const envOut = path.join(root, ".msv-embedded.env");
const readyFlag = path.join(root, ".msv-embedded-pg", ".embedded-ready");

function unlinkReadyFlagQuiet() {
  try {
    if (fs.existsSync(readyFlag)) fs.unlinkSync(readyFlag);
  } catch {
    /* ok */
  }
}

function registerEmbeddedShutdown(pgRef) {
  let stopping = false;
  const stop = async () => {
    if (stopping) return;
    stopping = true;
    unlinkReadyFlagQuiet();
    try {
      await pgRef?.stop?.();
    } catch {
      /* ok */
    }
    process.exit(0);
  };
  process.once("SIGTERM", () => void stop());
  process.once("SIGINT", () => void stop());
}

function tcpListening(host, port) {
  return new Promise((resolve) => {
    const s = net.connect({ host, port }, () => {
      s.end();
      resolve(true);
    });
    s.setTimeout(800, () => {
      s.destroy();
      resolve(false);
    });
    s.on("error", () => resolve(false));
  });
}

/**
 * Windows: netstat -ano 한 줄에서 로컬 TCP 포트와 PID 추출.
 * (이전 구현은 `:${port}` 가 줄 어디에나 있으면 매칭되어 잘못된 PID를 잡을 수 있었습니다.)
 */
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
  for (const line of r.stdout.split(/\r?\n/)) {
    const parsed = parseTcpListeningLocalPortPidWin32(line);
    if (parsed && parsed.localPort === port) {
      pids.add(parsed.pid);
    }
  }
  return [...pids];
}

/** embedded 가 쓰는 포트 대역(기본 55432 + 여유)의 LISTEN PID 를 한 번에 수집 */
function listeningPidsInPortRangeWin32(from, to) {
  const r = spawnSync("netstat", ["-ano"], { encoding: "utf8" });
  const pids = new Set();
  for (const line of r.stdout.split(/\r?\n/)) {
    const parsed = parseTcpListeningLocalPortPidWin32(line);
    if (parsed && parsed.localPort >= from && parsed.localPort <= to) {
      pids.add(parsed.pid);
    }
  }
  return [...pids];
}

function isProcessAlive(pid) {
  if (!Number.isFinite(pid) || pid <= 0) return false;
  if (process.platform === "win32") {
    const r = spawnSync("tasklist", ["/FI", `PID eq ${pid}`], { encoding: "utf8" });
    return Boolean(r.stdout && new RegExp(`\\b${pid}\\b`).test(r.stdout));
  }
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

function getListeningPidsOnPort(port) {
  if (process.platform === "win32") {
    return listeningPidsOnPortWin32(port);
  }
  const out = spawnSync("lsof", ["-t", `-iTCP:${port}`, "-sTCP:LISTEN"], { encoding: "utf8" });
  if (out.status !== 0 || !out.stdout) return [];
  const pids = [];
  for (const line of out.stdout.trim().split(/\n/)) {
    const pid = Number.parseInt(line, 10);
    if (Number.isFinite(pid) && pid > 0) pids.push(pid);
  }
  return pids;
}

class ZombiePortError extends Error {
  constructor(port) {
    super(`포트 ${port} 좀비`);
    this.name = "ZombiePortError";
    this.port = port;
  }
}

function wipeEmbeddedClusterData() {
  const base = path.join(root, ".msv-embedded-pg");
  try {
    fs.rmSync(path.join(base, "data"), { recursive: true, force: true });
  } catch {
    /* ok */
  }
  for (const name of [".schema-pushed", ".seed-done", ".embedded-ready"]) {
    try {
      fs.unlinkSync(path.join(base, name));
    } catch {
      /* ok */
    }
  }
}

function spawnTaskkillLogged(args, label) {
  const r = spawnSync("taskkill", args, { encoding: "utf8" });
  const msg = [r.stdout, r.stderr].filter(Boolean).join("").trim();
  if (r.status === 0) {
    devInfo(`[pg] ${label}${msg ? `: ${msg}` : ""}`);
    return;
  }
  if (r.status === 128) return;
  devWarn(`[pg] ${label} taskkill 실패 (exit ${r.status})${msg ? `: ${msg}` : ""}`);
}

/**
 * CommandLine 에 marker 가 포함된 postgres.exe 만 종료(보수적).
 */
function killWindowsPostgresByCommandLineMarker(marker) {
  if (process.platform !== "win32") return;
  const ps =
    "$ErrorActionPreference='SilentlyContinue'; " +
    "Get-CimInstance Win32_Process -Filter \"Name='postgres.exe'\" | " +
    "ForEach-Object { if ($null -ne $_.CommandLine -and $_.CommandLine -like '*" +
    marker +
    "*') { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue } }";
  spawnSync("powershell", ["-NoProfile", "-ExecutionPolicy", "Bypass", "-Command", ps], {
    stdio: "pipe",
    encoding: "utf8",
  });
}

function killWindowsEmbeddedPostgresProcesses() {
  if (process.platform !== "win32") return;
  for (const marker of [".msv-embedded-pg", "@embedded-postgres", "embedded-postgres\\windows"]) {
    killWindowsPostgresByCommandLineMarker(marker);
  }
}

/**
 * Windows: initdb 전 공유 메모리 충돌을 줄이기 위해 embedded 관련 postgres.exe 만 정리합니다.
 * - 기본: `.msv-embedded-pg` 경로가 포함된 postgres.exe 만 종료(다른 로컬 PostgreSQL 유지).
 * - `MSV_EMBEDDED_KILL_ALL_POSTGRES=1`: postgres.exe 전부 종료(공유 메모리 오류가 계속될 때만).
 */
async function killWindowsEmbeddedPostgresInterference() {
  if (process.platform !== "win32") return;
  if (process.env.MSV_EMBEDDED_KILL_ALL_POSTGRES === "1") {
    devWarn("[pg] postgres.exe 전체 종료 (MSV_EMBEDDED_KILL_ALL_POSTGRES=1)");
    spawnTaskkillLogged(["/IM", "postgres.exe", "/F", "/T"], "postgres.exe 전체");
    await sleep(2500);
    return;
  }
  killWindowsEmbeddedPostgresProcesses();
  await sleep(1500);
}

function killListenersOnPort(port, { quiet = false } = {}) {
  if (process.env.MSV_EMBEDDED_NO_KILL_STALE === "1") return;
  if (process.platform === "win32") {
    for (const pid of listeningPidsOnPortWin32(port)) {
      if (pid === process.pid) continue;
      if (!quiet) devWarn(`[pg] 포트 ${port} pid ${pid} 종료`);
      spawnTaskkillLogged(["/PID", String(pid), "/F", "/T"], `pid ${pid}`);
    }
    return;
  }
  const out = spawnSync("lsof", ["-t", `-iTCP:${port}`, "-sTCP:LISTEN"], { encoding: "utf8" });
  if (out.status !== 0 || !out.stdout) return;
  for (const line of out.stdout.trim().split(/\n/)) {
    const pid = Number.parseInt(line, 10);
    if (!Number.isFinite(pid) || pid === process.pid) continue;
    if (!quiet) devWarn(`[pg] 포트 ${port} pid ${pid} 종료`);
    try {
      process.kill(pid, "SIGTERM");
    } catch {
      /* ok */
    }
  }
}

/** 포트가 비워질 때까지 embedded postgres·LISTEN 프로세스 정리(재시도) */
async function ensurePortFree(port) {
  if (process.env.MSV_EMBEDDED_NO_KILL_STALE === "1") {
    if (await tcpListening("127.0.0.1", port)) {
      throw new Error(`포트 ${port} 사용 중 (MSV_EMBEDDED_NO_KILL_STALE=1)`);
    }
    return;
  }
  const maxAttempts = 12;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    if (!(await tcpListening("127.0.0.1", port))) return;

    const pids = getListeningPidsOnPort(port).filter((p) => p !== process.pid);
    const alive = pids.filter((p) => isProcessAlive(p));
    if (pids.length > 0 && alive.length === 0) {
      throw new ZombiePortError(port);
    }

    if (attempt === 1) devWarn(`[pg] 포트 ${port} 점유 — 정리 중…`);
    killListenersOnPort(port, { quiet: true });
    await killWindowsEmbeddedPostgresInterference();
    await sleep(600 + attempt * 450);
  }
  if (await tcpListening("127.0.0.1", port)) {
    throw new Error(
      `포트 ${port}를 비울 수 없습니다. 다른 npm run dev 종료 후 web/.msv-embedded-pg 삭제를 시도하세요.`,
    );
  }
}

function loadJson(p) {
  try {
    return JSON.parse(fs.readFileSync(p, "utf8"));
  } catch {
    return null;
  }
}

function randomPass() {
  return crypto.randomBytes(18).toString("base64url");
}

function qi(ident) {
  if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(ident)) {
    throw new Error(`invalid ident: ${ident}`);
  }
  return `"${ident.replace(/"/g, '""')}"`;
}

function formatPasswordLine(pw) {
  if (/[\r\n"#=\s]/.test(pw)) {
    return `"${pw.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
  }
  return pw;
}

function writeEnvFile(port, appPassword) {
  const body = [
    "# MSV embedded-postgres (npm run dev 시 자동 생성). 시스템 PostgreSQL 불필요.",
    "DB_HOST=127.0.0.1",
    `DB_PORT=${port}`,
    "DB_NAME=msv",
    "DB_USER=mvs_user",
    `DB_PASSWORD=${formatPasswordLine(appPassword)}`,
    "DB_SSLMODE=disable",
    "",
  ].join("\n");
  fs.writeFileSync(envOut, body, "utf8");
}

const pgVersionPath = path.join(dataDir, "PG_VERSION");
let clusterReady = fs.existsSync(pgVersionPath);
let creds = loadJson(credPath);

if (clusterReady && !creds) {
  console.error(
    "[pg] `.msv-embedded-pg/data`는 있는데 `credentials.json` 없음 — `web/.msv-embedded-pg` 삭제 후 재실행",
  );
  process.exit(1);
}

if (!creds) {
  creds = {
    postgresPassword: randomPass(),
    appPassword: randomPass(),
  };
  fs.mkdirSync(path.dirname(credPath), { recursive: true });
  fs.writeFileSync(credPath, JSON.stringify(creds, null, 2) + "\n", "utf8");
}

await (async () => {
  let pg = null;
  try {
    /**
     * Windows: 사용자/셸 로케일(예: Korean_Korea.949)이 initdb 자식에게 넘어가면
     * 텍스트 검색 설정 매칭 실패로 클러스터 생성이 중단될 수 있어 LC_* / LANG 을 C 로 고정합니다.
     * (embedded-postgres 가 spawn 시 process.env 를 병합합니다.)
     */
    if (process.platform === "win32") {
      for (const key of [
        "LC_ALL",
        "LC_COLLATE",
        "LC_CTYPE",
        "LC_MESSAGES",
        "LC_MONETARY",
        "LC_NUMERIC",
        "LC_TIME",
        "LANG",
        "LANGUAGE",
      ]) {
        process.env[key] = "C";
      }
    }

    try {
      if (fs.existsSync(readyFlag)) fs.unlinkSync(readyFlag);
    } catch {
      /* 없으면 무시 */
    }

    await releaseEmbeddedDataDirIfStale(dataDir);

    let port;
    const portMax = preferredEmbeddedPort + 40;

    if (clusterReady) {
      try {
        await ensurePortFree(preferredEmbeddedPort);
        port = preferredEmbeddedPort;
      } catch (e) {
        if (e instanceof ZombiePortError) {
          devWarn(`[pg] 포트 ${e.port} 좀비 — embedded 프로세스 정리 후 클러스터 재생성`);
          await killWindowsEmbeddedPostgresInterference();
          wipeEmbeddedClusterData();
          await sleep(2000);
          clusterReady = false;
          port = preferredEmbeddedPort;
          while (await tcpListening("127.0.0.1", port)) {
            if (port >= portMax) {
              devError(`[pg] ${preferredEmbeddedPort}~${portMax} 에 빈 포트 없음`);
              process.exit(1);
            }
            port++;
          }
          if (port !== preferredEmbeddedPort) {
            devInfo(`[pg] 좀비 포트 ${preferredEmbeddedPort} 건너뛰고 ${port} 사용`);
          }
        } else {
          devError("[pg]", e instanceof Error ? e.message : e);
          devError(`[pg] 점검: netstat -ano | findstr :${preferredEmbeddedPort}`);
          process.exit(1);
        }
      }
    } else {
      port = preferredEmbeddedPort;
      while (await tcpListening("127.0.0.1", port)) {
        if (port >= portMax) {
          devError(`[pg] ${preferredEmbeddedPort}~${portMax} 에 빈 포트 없음`);
          process.exit(1);
        }
        devInfo(`[pg] 포트 ${port} 사용 중 → ${port + 1}`);
        port++;
      }
      if (port !== preferredEmbeddedPort) {
        devInfo(`[pg] 포트 ${port} 사용 (기본 ${preferredEmbeddedPort})`);
      }
    }

    const maxConn = Math.min(
      200,
      Math.max(
        30,
        Number.parseInt(String(process.env.MSV_EMBEDDED_MAX_CONNECTIONS || "80"), 10) || 80,
      ),
    );

    pg = new EmbeddedPostgres({
      databaseDir: dataDir,
      port,
      user: "postgres",
      password: creds.postgresPassword,
      persistent: true,
      /**
       * Windows에서 시스템 로케일(예: Korean_Korea.949)이 그대로 쓰이면 initdb 가 실패할 수 있어
       * 클러스터 로케일·인코딩만 고정합니다. (--text-search-config 는 locale C 와 경고/불일치가 나와 제거)
       */
      initdbFlags: ["--locale=C", "--encoding=UTF8"],
      /** dev 중 Next·Prisma CLI·pg 클라이언트가 동시에 붙을 수 있어 기본 PG 한도보다 여유를 둡니다. */
      postgresFlags: ["-c", `max_connections=${maxConn}`],
      onLog: (msg) => {
        if (process.env.MSV_EMBEDDED_DEBUG === "1") {
          process.stderr.write(`[MSV embedded][pg] ${msg}`);
        }
      },
      onError: (err) => devError("[pg]", err),
    });

    if (!clusterReady) {
      await killWindowsEmbeddedPostgresInterference();
      const rangeLo = preferredEmbeddedPort;
      const rangeHi = preferredEmbeddedPort + 48;
      for (const pid of listeningPidsInPortRangeWin32(rangeLo, rangeHi)) {
        if (pid === process.pid) {
          continue;
        }
        devInfo(`[pg] embedded 포트 대역 pid ${pid} 종료`);
        spawnTaskkillLogged(["/PID", String(pid), "/F", "/T"], `taskkill embedded-range pid ${pid}`);
      }
      killListenersOnPort(port, { quiet: true });
      await sleep(6000);
      devInfo("[pg] initdb (최초 1회, 1~2분 소요 가능)…");
      try {
        await pg.initialise();
      } catch (initErr) {
        devError("[pg] initdb 실패:", initErr);
        devError(
          "[pg] postgres.exe 종료 · `web/.msv-embedded-pg/data` 삭제 · `MSV_EMBEDDED_DEBUG=1 npm run dev`",
        );
        throw initErr;
      }
    }

    devInfo(`[pg] PostgreSQL 시작 (포트 ${port})…`);
    await pg.start().catch((err) => {
      throw err instanceof Error
        ? err
        : new Error(
            "PostgreSQL 시작 실패(라이브러리가 원인을 넘기지 않는 경우가 있습니다). " +
              "shared memory / postmaster 잔존이면 `web/.msv-embedded-pg` 삭제 또는 점유 포트의 postgres 종료 후 재시도. " +
              "로그: MSV_EMBEDDED_DEBUG=1 npm run dev",
          );
    });

    const { Client } = await import("pg");
    const client = new Client({
      host: "127.0.0.1",
      port,
      user: "postgres",
      password: creds.postgresPassword,
      database: "postgres",
    });
    await client.connect();
    const u = "mvs_user";
    const db = "msv";
    const up = creds.appPassword;
    const escPass = client.escapeLiteral(up);
    const ur = await client.query("SELECT 1 FROM pg_roles WHERE rolname = $1", [u]);
    if (ur.rowCount === 0) {
      await client.query(
        `CREATE ROLE ${qi(u)} WITH LOGIN PASSWORD ${escPass}`,
      );
      devInfo("[pg] 역할 생성:", u);
    } else {
      await client.query(`ALTER ROLE ${qi(u)} WITH PASSWORD ${escPass}`);
      devInfo("[pg] 역할 비밀번호 갱신:", u);
    }
    const dr = await client.query("SELECT 1 FROM pg_database WHERE datname = $1", [db]);
    if (dr.rowCount === 0) {
      await client.query(`CREATE DATABASE ${qi(db)} OWNER ${qi(u)}`);
      devInfo("[pg] DB 생성:", db);
    }
    await client.end();

    writeEnvFile(port, creds.appPassword);
    devInfo("[pg] 연결 정보:", path.relative(root, envOut));

    const schemaFlag = path.join(root, ".msv-embedded-pg", ".schema-pushed");
    const childStdio = devVerbose ? "inherit" : "pipe";
    if (!fs.existsSync(schemaFlag)) {
      devInfo("[pg] prisma db push…");
      const push = spawnSync(
        process.execPath,
        [
          path.join(root, "scripts", "merged-env-run.cjs"),
          "npx",
          "prisma",
          "db",
          "push",
          "--skip-generate",
        ],
        {
          cwd: root,
          stdio: childStdio,
          // `.embedded-ready` 는 push 직후에 쓰이므로, 없으면 load-merged-env 가 `.msv-embedded.env` 를 스킵한다.
          env: { ...process.env, MSV_FORCE_EMBEDDED_ENV: "1" },
        },
      );
      if (push.status !== 0) {
        if (!devVerbose && push.stderr) devError(push.stderr.toString());
        if (!devVerbose && push.stdout) devError(push.stdout.toString());
        devError("[pg] prisma db push 실패");
        process.exit(push.status ?? 1);
      }
      fs.writeFileSync(schemaFlag, `${new Date().toISOString()}\n`, "utf8");
    }

    const seedFlag = path.join(root, ".msv-embedded-pg", ".seed-done");
    if (!fs.existsSync(seedFlag) && process.env.MSV_SKIP_EMBEDDED_SEED !== "1") {
      devInfo("[pg] prisma db seed…");
      const seed = spawnSync(
        process.execPath,
        [path.join(root, "scripts", "merged-env-run.cjs"), "npx", "prisma", "db", "seed"],
        {
          cwd: root,
          stdio: childStdio,
          env: { ...process.env, MSV_FORCE_EMBEDDED_ENV: "1" },
        },
      );
      if (seed.status === 0) {
        fs.writeFileSync(seedFlag, `${new Date().toISOString()}\n`, "utf8");
      } else {
        devWarn("[pg] seed 실패 — 나중에 `npm run db:seed`");
        if (!devVerbose && seed.stderr) devError(seed.stderr.toString());
      }
    }

    fs.mkdirSync(path.dirname(readyFlag), { recursive: true });
    fs.writeFileSync(readyFlag, `${process.pid}\n`, "utf8");

    registerEmbeddedShutdown(pg);

    devOk(`[dev] DB ready 127.0.0.1:${port}`);
  } catch (e) {
    try {
      fs.unlinkSync(readyFlag);
    } catch {
      /* ok */
    }
    devError("[pg] 실패:", e);
    if (process.platform === "win32" && String(e).includes("shared memory")) {
      devError("[pg] shared memory — postgres.exe 정리 후 `web/.msv-embedded-pg/data` 삭제");
    }
    process.exit(1);
  }
})();
