import { loadEnvConfig } from "@next/env";
import fs from "node:fs";
import type { NextConfig } from "next";
import path from "path";

// Prisma/서버 코드보다 먼저 실행되어야 합니다. Turbopack에서도 `env("DATABASE_URL")` 검사 통과용.
// `next build` 시 NODE_ENV=production 이라도, 로컬에서 `.env.production` 이 비어 있으면 DB_* 가 없을 수 있어
// 개발용 파일을 먼저 적재한 뒤 운영 파일로 덮어씁니다(중복 키는 후자 우선).
const projectDir = path.join(process.cwd());
loadEnvConfig(projectDir, true);
loadEnvConfig(projectDir, false);

/** `npm run dev` 의 embedded-postgres 가 쓰는 연결 정보(있으면 DB_* 를 덮어씀) */
function applyMsvEmbeddedEnv() {
  const skip =
    String(process.env.MSV_IGNORE_EMBEDDED_ENV || "").trim() === "1" ||
    String(process.env.MSV_USE_SYSTEM_DB_ONLY || "").trim() === "1";
  if (skip) {
    if (process.env.NODE_ENV !== "production") {
      console.info(
        "[MSV] .msv-embedded.env 적용 안 함 — MSV_IGNORE_EMBEDDED_ENV 또는 MSV_USE_SYSTEM_DB_ONLY=1 (.env.local 등)",
      );
    }
    return;
  }
  const p = path.join(projectDir, ".msv-embedded.env");
  if (!fs.existsSync(p)) return;

  const readyFlag = path.join(projectDir, ".msv-embedded-pg", ".embedded-ready");
  const forceEmbedded = String(process.env.MSV_FORCE_EMBEDDED_ENV || "").trim() === "1";
  if (!forceEmbedded && !fs.existsSync(readyFlag)) {
    if (process.env.NODE_ENV !== "production") {
      console.info(
        "[MSV] `.msv-embedded.env` 는 있으나 embedded Postgres 준비 신호(`.msv-embedded-pg/.embedded-ready`)가 없어 병합하지 않습니다. " +
          "`npm run dev`(embedded 포함)로 띄우거나, 시스템 DB면 `.env.local`에 DATABASE_URL/DB_* 또는 MSV_IGNORE_EMBEDDED_ENV=1. " +
          "잔존 env 파일만 강제 적용: MSV_FORCE_EMBEDDED_ENV=1",
      );
    }
    return;
  }

  const raw = fs.readFileSync(p, "utf8");
  for (const line of raw.split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const eq = t.indexOf("=");
    if (eq <= 0) continue;
    const key = t.slice(0, eq).trim();
    let val = t.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    const existing = process.env[key];
    if (existing !== undefined && String(existing).trim() !== "") {
      continue;
    }
    // 시스템 DB만 쓰는 설정(DB_HOST)이 있으면 embedded 가 쓰는 DATABASE_URL(55432 등)은 덮어쓰지 않음
    if (key === "DATABASE_URL" && process.env.DB_HOST?.trim()) {
      continue;
    }
    process.env[key] = val;
  }
}
applyMsvEmbeddedEnv();

/**
 * 다른 PC·휴대폰이 `http://<개발기IP>:3100` 으로 접속할 때 Next 16이 막는 dev 전용 리소스(HMR 등) 허용.
 * 관리자 페이지·클라이언트 번들이 비어 보이면 **접속하는 쪽 기기의 IP**(브라우저가 보내는 Origin)를 넣으세요. 쉼표·공백 구분.
 * 예: `.env.local` → `MSV_ALLOWED_DEV_ORIGINS=192.168.0.119` (테스트 폰/노트북 IP)
 */
const allowedDevOrigins = String(process.env.MSV_ALLOWED_DEV_ORIGINS || "")
  .split(/[\s,]+/)
  .map((s) => s.trim())
  .filter(Boolean);

const nextConfig: NextConfig = {
  ...(allowedDevOrigins.length > 0 ? { allowedDevOrigins } : {}),
  // Prisma Client 는 `prisma/schema.prisma` 의 `output` (`prisma/generated/client`) 로 생성됩니다.
  serverExternalPackages: [],
  turbopack: {
    root: path.join(process.cwd()),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "icons.duckduckgo.com",
        pathname: "/**",
      },
    ],
    /** Next 16: 로컬 `next/image` src는 패턴 등록 필요. `search` 생략 시 `?v=` 등 쿼리 허용 */
    localPatterns: [
      { pathname: "/msv-wordmark.png" },
      { pathname: "/msv-wordmark-header.png" },
      { pathname: "/about/**" },
      { pathname: "/group/**" },
      { pathname: "/uploads/**" },
      { pathname: "/team/**" },
      { pathname: "/software/**" },
      { pathname: "/company-credentials/**" },
    ],
  },
};

export default nextConfig;
