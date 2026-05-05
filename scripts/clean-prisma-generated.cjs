/**
 * `prisma generate` 전에 기존 엔진 DLL 을 지워 Windows EPERM(rename) 을 줄입니다.
 */
const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "..", "prisma", "generated", "client");
try {
  fs.rmSync(dir, { recursive: true, force: true });
} catch {
  /* ignore */
}
