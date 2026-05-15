import { loadEnvConfig } from "@next/env";
import fs from "fs";
import type { NextConfig } from "next";
import path from "path";
import { createRequire } from "module";
import { applyMsvEmbeddedDatabaseEnvFromDisk, resolveMsvWebRoot } from "./src/lib/msv-embedded-env-merge";

const require = createRequire(import.meta.url);
type WebpackLib = { NormalModuleReplacementPlugin: new (r: RegExp, p: string) => unknown };
const NextWebpack = require("next/dist/compiled/webpack/webpack-lib.js") as WebpackLib;

// Prisma/서버 코드보다 먼저 실행되어야 합니다. Turbopack에서도 `env("DATABASE_URL")` 검사 통과용.
// `next build` 시 NODE_ENV=production 이라도, 로컬에서 `.env.production` 이 비어 있으면 DB_* 가 없을 수 있어
// 개발용 파일을 먼저 적재한 뒤 운영 파일로 덮어씁니다(중복 키는 후자 우선).
const projectDir = path.join(process.cwd());
loadEnvConfig(projectDir, true);
loadEnvConfig(projectDir, false);

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
  const webRoot = resolveMsvWebRoot(projectDir);
  const p = path.join(webRoot, ".msv-embedded.env");
  if (!fs.existsSync(p)) return;

  const readyFlag = path.join(webRoot, ".msv-embedded-pg", ".embedded-ready");
  const forceEmbedded = String(process.env.MSV_FORCE_EMBEDDED_ENV || "").trim() === "1";
  if (!forceEmbedded && !fs.existsSync(readyFlag)) {
    if (process.env.NODE_ENV !== "production") {
      const rel = (abs: string) => path.relative(projectDir, abs) || abs;
      console.info(
        "[MSV] `.msv-embedded.env` 는 있으나 embedded Postgres 준비 신호가 없어 병합하지 않습니다.\n" +
          `  • webRoot(resolveMsvWebRoot): ${webRoot}\n` +
          `  • env 파일: ${rel(p)} (존재)\n` +
          `  • ready 플래그: ${rel(readyFlag)} (없음)\n` +
          "  • `npm run dev` 는 `wait-embedded-ready` 가 새 `.embedded-ready` 를 본 뒤에 Next 를 띄웁니다. " +
          "이 메시지가 뜨면 이전 세션 잔여 ready 로 조기 통과했거나, embedded 기동이 느린 경우일 수 있습니다.\n" +
          "  • 시스템 DB만 쓸 때: `.env.local` 에 DATABASE_URL/DB_* 또는 MSV_IGNORE_EMBEDDED_ENV=1\n" +
          "  • 잔존 env 만 강제: MSV_FORCE_EMBEDDED_ENV=1",
      );
    }
    return;
  }
  applyMsvEmbeddedDatabaseEnvFromDisk(webRoot);
}
applyMsvEmbeddedEnv();

/**
 * 다른 PC·휴대폰이 `http://<개발기IP>:3100` 으로 접속할 때 Next 16 dev 가 막는 `_next`/HMR 요청 허용.
 * `MSV_ALLOWED_DEV_ORIGINS` 에 LAN IP 등을 넣으세요. 쉼표·공백 구분.
 *
 * `127.0.0.1`·`::1` 은 항상 포함합니다. 일부 브라우저/OS에서 `localhost` 와 다른 루프백으로 Origin 이
 * 잡히면 크로스사이트 차단이 WebSocket 을 끊어 `ERR_CONNECTION_RESET` 처럼 보일 수 있습니다.
 */
const userAllowedDevOrigins = String(process.env.MSV_ALLOWED_DEV_ORIGINS || "")
  .split(/[\s,]+/)
  .map((s) => s.trim())
  .filter(Boolean);
/** `localhost` 는 Next 기본 허용과 겹칠 수 있으나, 일부 환경에서 Host/Origin 검사 시 명시가 안전합니다. */
const loopbackDevOrigins = ["localhost", "127.0.0.1", "::1"];
const allowedDevOrigins = [
  ...loopbackDevOrigins,
  ...userAllowedDevOrigins.filter((o) => !loopbackDevOrigins.includes(o)),
];

const nextConfig: NextConfig = {
  allowedDevOrigins,
  // Prisma Client 는 `prisma/schema.prisma` 의 `output` (`prisma/generated/client`) 로 생성됩니다.
  serverExternalPackages: ["puppeteer-core", "@sparticuz/chromium"],
  /**
   * instrumentation·DB 점검 체인은 **클라이언트**·**Edge** 번들에서도 그래프에 잡힐 수 있습니다.
   * Next가 넘기는 `isServer`는 Node 서버·Edge 서버 모두 `true`이므로, `nextRuntime === "edge"` 일 때도
   * `fs`/`path` 없는 스tub으로 치환해야 합니다. (`nextRuntime === "nodejs"` 만 실제 모듈)
   */
  webpack: (config, ctx) => {
    const nextRuntime = "nextRuntime" in ctx ? (ctx as { nextRuntime?: string }).nextRuntime : undefined;
    const isNodeWebpackServer = Boolean(ctx.isServer && nextRuntime === "nodejs");
    if (isNodeWebpackServer) {
      return config;
    }

    const mergeStub = path.resolve(projectDir, "src/lib/msv-embedded-env-merge.client.stub.ts");
    const mergeReal = path.resolve(projectDir, "src/lib/msv-embedded-env-merge.ts");
    const dbCheckStub = path.resolve(projectDir, "src/instrumentation-db-check.client.stub.ts");
    const dbCheckReal = path.resolve(projectDir, "src/instrumentation-db-check.ts");

    config.resolve.alias = {
      ...(config.resolve.alias as Record<string, string | string[]>),
      "@/lib/msv-embedded-env-merge": mergeStub,
      [mergeReal]: mergeStub,
      [dbCheckReal]: dbCheckStub,
    };

    config.plugins = config.plugins ?? [];
    config.plugins.push(
      new NextWebpack.NormalModuleReplacementPlugin(
        /(^|[\\/])instrumentation-db-check\.ts$/,
        dbCheckStub,
      ),
      new NextWebpack.NormalModuleReplacementPlugin(
        /(^|[\\/])msv-embedded-env-merge\.ts$/,
        mergeStub,
      ),
    );
    return config;
  },
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
      { pathname: "/msv-lockup-navy.png" },
      { pathname: "/msv-lockup-sixdot-navy.png" },
      { pathname: "/msv-lockup-bottomlink-navy.png" },
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
