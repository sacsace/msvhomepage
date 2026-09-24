/**
 * `prisma generate` 전에 기존 엔진을 정리합니다.
 * Windows: 실행 중인 query-engine 이 exe 를 잠그면 rename EPERM 이 납니다.
 */
const { spawnSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const dir = path.join(root, "prisma", "generated", "client");

function releaseWindowsQueryEngineLocks() {
  if (process.platform !== "win32") return;
  if (String(process.env.MSV_SKIP_PRISMA_ENGINE_KILL || "").trim() === "1") return;

  const marker = "prisma" + path.sep + "generated" + path.sep + "client";
  const ps =
    "$ErrorActionPreference='SilentlyContinue'; " +
    "Get-Process query-engine-windows -ErrorAction SilentlyContinue | " +
    "Where-Object { $_.Path -like '*" +
    marker +
    "*' } | " +
    "ForEach-Object { Stop-Process -Id $_.Id -Force -ErrorAction SilentlyContinue }";
  spawnSync("powershell", ["-NoProfile", "-ExecutionPolicy", "Bypass", "-Command", ps], {
    encoding: "utf8",
  });
  spawnSync("powershell", ["-NoProfile", "-Command", "Start-Sleep -Milliseconds 400"], {
    encoding: "utf8",
  });
}

releaseWindowsQueryEngineLocks();

try {
  fs.rmSync(dir, { recursive: true, force: true });
} catch (e) {
  console.warn(
    "[clean-prisma] generated/client 삭제 실패 — `npm run dev` 등 Node/Next를 먼저 종료한 뒤 다시 시도하세요.",
  );
  if (e instanceof Error && e.message) console.warn(`[clean-prisma] ${e.message}`);
}
