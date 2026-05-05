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
    console.warn("[MSV embedded] 남은 postmaster.pid 만 정리합니다(프로세스 없음).");
    try {
      fs.unlinkSync(pidFile);
    } catch {
      /* ok */
    }
    return;
  }

  console.warn(
    `[MSV embedded] 이전 embedded PostgreSQL(pid ${oldPid})이 동일 데이터 디렉터리를 점유 중입니다. 종료합니다.`,
  );
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

/** taskkill: 0 성공, 128 대상 없음(무시), 그 외 로그 */
function spawnTaskkillLogged(args, label) {
  const r = spawnSync("taskkill", args, { encoding: "utf8" });
  const msg = [r.stdout, r.stderr].filter(Boolean).join("").trim();
  if (r.status === 0) {
    if (msg) {
      console.info(`[MSV embedded] ${label}: ${msg}`);
    }
    return;
  }
  if (r.status === 128) {
    return;
  }
  console.warn(`[MSV embedded] ${label} taskkill 실패 (exit ${r.status})${msg ? `: ${msg}` : ""}`);
}

/**
 * CommandLine 에 marker 가 포함된 postgres.exe 만 종료(보수적).
 */
function killWindowsPostgresByCommandLineMarker(marker) {
  if (process.platform !== "win32") {
    return;
  }
  const ps =
    "$ErrorActionPreference='SilentlyContinue'; " +
    "Get-CimInstance Win32_Process -Filter \"Name='postgres.exe'\" | " +
    "ForEach-Object { if ($null -ne $_.CommandLine -and $_.CommandLine -like '*" +
    marker +
    "*') { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue } }";
  spawnSync("powershell", ["-NoProfile", "-ExecutionPolicy", "Bypass", "-Command", ps], {
    stdio: ["pipe", "inherit", "inherit"],
    encoding: "utf8",
  });
}

/**
 * Windows: initdb 전 공유 메모리 충돌을 줄이기 위해 postgres.exe 를 정리합니다.
 * - 기본: `postgres.exe` 전부 종료(로컬 다른 PostgreSQL 도 꺼질 수 있음).
 * - `MSV_EMBEDDED_PRESERVE_FOREIGN_POSTGRES=1`: embedded 경로만 선택 종료(공유 메모리 오류 시 수동으로 postgres 정리 필요).
 */
async function killWindowsEmbeddedPostgresInterference() {
  if (process.platform !== "win32") {
    return;
  }
  if (process.env.MSV_EMBEDDED_PRESERVE_FOREIGN_POSTGRES === "1") {
    console.warn(
      "[MSV embedded] MSV_EMBEDDED_PRESERVE_FOREIGN_POSTGRES=1 — postgres.exe 전체 자동 종료를 건너뜁니다. " +
        "공유 메모리 오류가 나면 작업 관리자에서 postgres.exe 를 종료하세요.",
    );
    killWindowsPostgresByCommandLineMarker(".msv-embedded-pg");
    await sleep(1500);
    return;
  }
  console.warn(
    "[MSV embedded] Windows: `pre-existing shared memory block` 방지를 위해 postgres.exe 를 모두 종료합니다. " +
      "다른 로컬 PostgreSQL 을 유지하려면 `MSV_EMBEDDED_PRESERVE_FOREIGN_POSTGRES=1` 로 `npm run dev` 하세요.",
  );
  spawnTaskkillLogged(["/IM", "postgres.exe", "/F", "/T"], "postgres.exe 전체");
  await sleep(2500);
}

function killListenersOnPort(port) {
  if (process.env.MSV_EMBEDDED_NO_KILL_STALE === "1") {
    return;
  }
  if (process.platform === "win32") {
    for (const pid of listeningPidsOnPortWin32(port)) {
      if (pid === process.pid) {
        continue;
      }
      console.warn(`[MSV embedded] 포트 ${port} LISTENING 프로세스(pid ${pid})를 종료합니다(이전 embedded 잔존 가능).`);
      spawnTaskkillLogged(["/PID", String(pid), "/F", "/T"], `taskkill pid ${pid}`);
    }
    return;
  }
  const out = spawnSync("lsof", ["-t", `-iTCP:${port}`, "-sTCP:LISTEN"], { encoding: "utf8" });
  if (out.status !== 0 || !out.stdout) {
    return;
  }
  for (const line of out.stdout.trim().split(/\n/)) {
    const pid = Number.parseInt(line, 10);
    if (!Number.isFinite(pid) || pid === process.pid) {
      continue;
    }
    console.warn(`[MSV embedded] 포트 ${port} LISTENING(pid ${pid})를 종료합니다.`);
    try {
      process.kill(pid, "SIGTERM");
    } catch {
      /* ok */
    }
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
const dataExists = fs.existsSync(pgVersionPath);
let creds = loadJson(credPath);

if (dataExists && !creds) {
  console.error(
    "[MSV embedded] `.msv-embedded-pg/data` 는 있는데 `credentials.json` 이 없습니다.\n" +
      "  폴더 `web/.msv-embedded-pg` 전체를 삭제한 뒤 `npm run dev` 를 다시 실행하세요.",
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
      fs.unlinkSync(readyFlag);
    } catch {
      /* 없으면 무시 */
    }

    await releaseEmbeddedDataDirIfStale(dataDir);
    await killWindowsEmbeddedPostgresInterference();

    if (await tcpListening("127.0.0.1", preferredEmbeddedPort)) {
      killListenersOnPort(preferredEmbeddedPort);
      await sleep(2500);
    }

    let port;
    const portMax = preferredEmbeddedPort + 40;

    if (dataExists) {
      if (await tcpListening("127.0.0.1", preferredEmbeddedPort)) {
        console.error(
          `[MSV embedded] 기존 클러스터(.msv-embedded-pg/data)가 있는데 포트 ${preferredEmbeddedPort} 를 비울 수 없습니다.\n` +
            "  같은 데이터 디렉터리로 다른 포트에 올리면 shared memory 오류가 납니다. 반드시 이전 postgres 를 끈 뒤 같은 포트로 다시 시작하세요.\n" +
            "  • 다른 터미널의 `npm run dev` 종료\n" +
            `  • PowerShell: netstat -ano | findstr LISTENING | findstr :${preferredEmbeddedPort}\n` +
            "  • 처음부터 다시: `web/.msv-embedded-pg` 폴더 삭제 후 재실행\n" +
            "  • 자동 종료를 끄려면: MSV_EMBEDDED_NO_KILL_STALE=1",
        );
        process.exit(1);
      }
      port = preferredEmbeddedPort;
    } else {
      port = preferredEmbeddedPort;
      while (await tcpListening("127.0.0.1", port)) {
        if (port >= portMax) {
          console.error(
            `[MSV embedded] ${preferredEmbeddedPort}~${portMax} 범위에 비어 있는 포트가 없습니다.\n` +
              "  점유 중인 postgres 를 종료하거나 `MSV_EMBEDDED_PORT` 로 다른 시작 포트를 지정하세요.",
          );
          process.exit(1);
        }
        console.warn(`[MSV embedded] 포트 ${port} 사용 중 — ${port + 1} 로 시도합니다.`);
        port++;
      }
      if (port !== preferredEmbeddedPort) {
        console.info(`[MSV embedded] 사용 포트: ${port} (기본 ${preferredEmbeddedPort} 대신)`);
      }
    }

    const maxConn = Math.min(
      200,
      Math.max(
        30,
        Number.parseInt(String(process.env.MSV_EMBEDDED_MAX_CONNECTIONS || "80"), 10) || 80,
      ),
    );

    const pg = new EmbeddedPostgres({
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
      onError: (err) => console.error("[MSV embedded]", err),
    });

    if (!dataExists) {
      await killWindowsEmbeddedPostgresInterference();
      const rangeLo = preferredEmbeddedPort;
      const rangeHi = preferredEmbeddedPort + 48;
      for (const pid of listeningPidsInPortRangeWin32(rangeLo, rangeHi)) {
        if (pid === process.pid) {
          continue;
        }
        console.warn(
          `[MSV embedded] embedded 포트 대역 ${rangeLo}-${rangeHi} LISTENING pid ${pid} 종료(잔류 방지).`,
        );
        spawnTaskkillLogged(["/PID", String(pid), "/F", "/T"], `taskkill embedded-range pid ${pid}`);
      }
      killListenersOnPort(port);
      await sleep(6000);
      console.info("[MSV embedded] initdb (최초 1회, 1~2분 걸릴 수 있습니다)…");
      try {
        await pg.initialise();
      } catch (initErr) {
        console.error("[MSV embedded] initdb 실패:", initErr);
        console.error(
          "[MSV embedded] 다음을 시도해 보세요.\n" +
            "  1) 작업 관리자에서 `postgres.exe`·서비스(PostgreSQL) 완전히 종료 후 `web/.msv-embedded-pg/data` 삭제 → `npm run dev`\n" +
            "  2) 다른 로컬 PG 를 끄면 안 될 때: `MSV_EMBEDDED_PRESERVE_FOREIGN_POSTGRES=1` 를 켠 채로는 embedded initdb 가 실패할 수 있으니, 잠시 다른 PG 를 중지하세요.\n" +
            "  3) DB 없이 프론트만: `npm run dev:no-embed`\n" +
            "  4) 자세한 PG 로그: `MSV_EMBEDDED_DEBUG=1 npm run dev`",
        );
        throw initErr;
      }
    }

    console.info(`[MSV embedded] PostgreSQL 시작 (포트 ${port})…`);
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
      console.info("[MSV embedded] 역할 생성:", u);
    } else {
      await client.query(`ALTER ROLE ${qi(u)} WITH PASSWORD ${escPass}`);
      console.info("[MSV embedded] 역할 비밀번호 갱신:", u);
    }
    const dr = await client.query("SELECT 1 FROM pg_database WHERE datname = $1", [db]);
    if (dr.rowCount === 0) {
      await client.query(`CREATE DATABASE ${qi(db)} OWNER ${qi(u)}`);
      console.info("[MSV embedded] DB 생성:", db);
    }
    await client.end();

    writeEnvFile(port, creds.appPassword);
    console.info("[MSV embedded] 연결 정보 저장:", path.relative(root, envOut));

    const schemaFlag = path.join(root, ".msv-embedded-pg", ".schema-pushed");
    if (!fs.existsSync(schemaFlag)) {
      console.info("[MSV embedded] prisma db push…");
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
        { cwd: root, stdio: "inherit", env: { ...process.env } },
      );
      if (push.status !== 0) {
        console.error("[MSV embedded] prisma db push 실패");
        process.exit(push.status ?? 1);
      }
      fs.writeFileSync(schemaFlag, `${new Date().toISOString()}\n`, "utf8");
    }

    const seedFlag = path.join(root, ".msv-embedded-pg", ".seed-done");
    if (!fs.existsSync(seedFlag) && process.env.MSV_SKIP_EMBEDDED_SEED !== "1") {
      console.info("[MSV embedded] prisma db seed…");
      const seed = spawnSync(
        process.execPath,
        [path.join(root, "scripts", "merged-env-run.cjs"), "npx", "prisma", "db", "seed"],
        { cwd: root, stdio: "inherit", env: { ...process.env } },
      );
      if (seed.status === 0) {
        fs.writeFileSync(seedFlag, `${new Date().toISOString()}\n`, "utf8");
      } else {
        console.warn("[MSV embedded] seed 실패. 나중에: npm run db:seed");
      }
    }

    fs.mkdirSync(path.dirname(readyFlag), { recursive: true });
    fs.writeFileSync(readyFlag, `${process.pid}\n`, "utf8");

    console.info("[MSV embedded] 준비 완료 (Next 와 함께 종료 시 DB 도 중지됩니다).");
  } catch (e) {
    try {
      fs.unlinkSync(readyFlag);
    } catch {
      /* ok */
    }
    console.error("[MSV embedded] 실패:", e);
    if (process.platform === "win32" && String(e).includes("shared memory")) {
      console.error(
        "[MSV embedded] shared memory 오류: 다른 PostgreSQL(서비스·Docker 포함)이 떠 있거나 이전 프로세스가 남았을 수 있습니다. " +
          "`postgres.exe`·관련 서비스를 모두 중지한 뒤 `web/.msv-embedded-pg/data` 를 삭제하고 `npm run dev` 를 다시 실행하세요. " +
          "(`MSV_EMBEDDED_PRESERVE_FOREIGN_POSTGRES=1` 이면 자동 전체 종료를 건너뛰므로, 그 경우 수동으로 정리해야 합니다.)",
      );
    }
    process.exit(1);
  }
})();
