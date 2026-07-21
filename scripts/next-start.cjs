/**
 * Railway 등은 `PORT` 를 주입합니다. `next start` 에 포트를 명시해 바인딩 불일치를 줄입니다.
 * 기동 전 업로드 루트(볼륨) 디렉터리를 준비합니다.
 */
const { spawn, spawnSync } = require("child_process");
const path = require("path");

const root = path.join(__dirname, "..");
const port = String(process.env.PORT || "3000").trim() || "3000";
const nextBin = path.join(root, "node_modules", "next", "dist", "bin", "next");
const ensureUploads = path.join(__dirname, "ensure-uploads-root.cjs");

const ensure = spawnSync(process.execPath, [ensureUploads], {
  cwd: root,
  stdio: "inherit",
  env: process.env,
});
if (ensure.status !== 0 && ensure.status != null) {
  console.warn(`[uploads] ensure-uploads-root exited with ${ensure.status} (continuing startup)`);
}

const child = spawn(process.execPath, [nextBin, "start", "-H", "0.0.0.0", "-p", port], {
  cwd: root,
  stdio: "inherit",
  env: process.env,
});

child.on("exit", (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  process.exit(code == null ? 1 : code);
});
