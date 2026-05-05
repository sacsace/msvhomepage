/**
 * `npm install` 직후 prisma generate. Windows DLL 잠금(EPERM) 시 설치는 성공시키고 경고만 남깁니다.
 */
const { spawnSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const genDir = path.join(root, "prisma", "generated", "client");
try {
  fs.rmSync(genDir, { recursive: true, force: true });
} catch {
  /* ignore */
}
const r = spawnSync(
  "npx",
  [
    "cross-env",
    "DATABASE_URL=postgresql://prisma:prisma@127.0.0.1:5432/dummy?schema=public",
    "prisma",
    "generate",
  ],
  {
    cwd: root,
    encoding: "utf8",
    shell: true,
    stdio: ["ignore", "pipe", "pipe"],
  },
);

if (r.status === 0) {
  process.exit(0);
}

const out = `${r.stderr || ""}\n${r.stdout || ""}`;
console.error(out.trim());
if (/EPERM|operation not permitted/i.test(out)) {
  console.warn(
    "\n[postinstall] Prisma generate failed (file lock). Stop other Node/Next processes, then run: npx prisma generate\n",
  );
  process.exit(0);
}

process.exit(typeof r.status === "number" ? r.status : 1);
