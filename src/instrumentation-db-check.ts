import "server-only";

import fs from "fs";
import path from "path";
import { applyMsvEmbeddedDatabaseEnvFromDisk, resolveMsvWebRoot } from "@/lib/msv-embedded-env-merge";
import { resolveDatabaseUrl } from "@/lib/database-url";
import { msvDisconnectAndResetPrismaSingleton } from "@/lib/prisma";

function maskDatabaseUrlForLog(url: string | undefined): string {
  if (!url?.trim()) return "(없음)";
  try {
    const normalized = url.replace(/^postgresql:/i, "http:").replace(/^postgres:/i, "http:");
    const u = new URL(normalized);
    if (u.password) u.password = "****";
    return u.toString().replace(/^http:/i, "postgresql:");
  } catch {
    return `${url.slice(0, 40)}…`;
  }
}

function hasDatabaseConfig(): boolean {
  if (process.env.DATABASE_URL?.trim()) return true;
  return Boolean(
    process.env.DB_HOST?.trim() &&
      process.env.DB_NAME?.trim() &&
      process.env.DB_USER?.trim(),
  );
}

function shouldRetryEmbeddedDev(): boolean {
  if (process.env.NODE_ENV !== "development") return false;
  if (String(process.env.MSV_IGNORE_EMBEDDED_ENV || "").trim() === "1") return false;
  if (String(process.env.MSV_USE_SYSTEM_DB_ONLY || "").trim() === "1") return false;
  try {
    return fs.existsSync(path.join(resolveMsvWebRoot(), ".msv-embedded-pg", ".embedded-ready"));
  } catch {
    return false;
  }
}

/**
 * Node 서버 기동 시 Prisma로 DB 연결만 점검합니다.
 * (`instrumentation.ts`는 Edge 정적 분석 대상이라 로직을 이 파일로 분리했습니다.)
 */
export async function runDatabaseStartupCheck(): Promise<void> {
  if (String(process.env.MSV_SKIP_DB_STARTUP_CHECK || "").trim() === "1") return;
  if (process.env.MSV_LENIENT_DB_BUILD === "1") return;

  /** `next.config` 보다 먼저 실행되는 환경에서도 embedded DB_* 가 반영되도록 */
  applyMsvEmbeddedDatabaseEnvFromDisk();

  if (process.env.NODE_ENV === "development") {
    const wr = resolveMsvWebRoot();
    const readyPath = path.join(wr, ".msv-embedded-pg", ".embedded-ready");
    console.info(
      "[MSV] DB 기동 점검 시작 — " +
        `embedded-ready=${fs.existsSync(readyPath) ? "있음" : "없음"}, ` +
        `재시도모드=${shouldRetryEmbeddedDev() ? "on" : "off"}, ` +
        `cwd=${process.cwd()}`,
    );
  }

  if (!hasDatabaseConfig()) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "\n[MSV] DB 연결 정보가 없습니다. `web/.env.development` 또는 `.env.local`에 " +
          "`DATABASE_URL` 또는 `DB_HOST`·`DB_NAME`·`DB_USER`(·`DB_PASSWORD`)를 설정하세요.\n",
      );
    }
    return;
  }

  const maxAttempts = shouldRetryEmbeddedDev() ? 25 : 1;
  const delayMs = 600;
  let lastErr: unknown;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    applyMsvEmbeddedDatabaseEnvFromDisk();
    try {
      const { prisma } = await import("@/lib/prisma");
      await prisma.$connect();
      await prisma.$queryRawUnsafe("SELECT 1");
      await prisma.$disconnect();
      if (process.env.NODE_ENV === "development") {
        console.info("[MSV] PostgreSQL 기동 시 연결 검사 통과(점검 후 연결 반환).");
      }
      return;
    } catch (e) {
      lastErr = e;
      msvDisconnectAndResetPrismaSingleton();
      if (attempt < maxAttempts) {
        if (process.env.NODE_ENV === "development") {
          const extra =
            e && typeof e === "object" && "code" in e
              ? ` code=${String((e as { code?: string }).code)}`
              : "";
          console.warn(
            `[MSV] DB 연결 실패 (${attempt}/${maxAttempts})${extra} — ${delayMs}ms 후 재시도. ` +
              `DB_HOST=${process.env.DB_HOST ?? "(없음)"} DB_PORT=${process.env.DB_PORT ?? "(없음)"} ` +
              `DATABASE_URL=${maskDatabaseUrlForLog(process.env.DATABASE_URL)} ` +
              `resolve=${maskDatabaseUrlForLog(resolveDatabaseUrl())}`,
          );
        }
        await new Promise((r) => setTimeout(r, delayMs));
        continue;
      }
    }
  }

  const e = lastErr;
  const msg = e instanceof Error ? e.message : String(e);
  const code = e && typeof e === "object" && "code" in e ? String((e as { code?: string }).code) : "";
  const wr = resolveMsvWebRoot();
  const readyPath = path.join(wr, ".msv-embedded-pg", ".embedded-ready");
  console.error(
    "\n[MSV] ========== PostgreSQL 연결 실패 (서버 기동 시점) ==========\n" +
      "Prisma/관리자 기능은 DB가 필요합니다. 아래를 확인한 뒤 dev 서버를 다시 켜세요.\n" +
      "• `DATABASE_URL` 또는 `DB_HOST`·`DB_PORT`·`DB_NAME`·`DB_USER`·`DB_PASSWORD`가 실제 서버와 일치하는지\n" +
      "• embedded 없이 `next dev`만 쓰는 경우: 잘못된 `.msv-embedded.env` 대신 `MSV_IGNORE_EMBEDDED_ENV=1` 또는 해당 파일 정리\n" +
      "• 점검: `cd web` → `npm run db:ping` 또는 `npm run db:doctor` (embedded 자동 해제 시도)\n" +
      "• 이 검사를 끄려면: `MSV_SKIP_DB_STARTUP_CHECK=1` (임시)\n" +
      `진단: cwd=${process.cwd()} webRoot=${wr} embedded-ready=${fs.existsSync(readyPath) ? "있음" : "없음"}\n` +
      `  process.env.DATABASE_URL=${maskDatabaseUrlForLog(process.env.DATABASE_URL)}\n` +
      `  resolveDatabaseUrl()=${maskDatabaseUrlForLog(resolveDatabaseUrl())}\n` +
      (code ? `  Prisma/client code: ${code}\n` : "") +
      `원문: ${msg}\n` +
      "===============================================================\n",
  );
  const abortOnDb =
    process.env.NODE_ENV === "development" &&
    (String(process.env.MSV_ABORT_ON_DB_FAILURE || "").trim() === "1" ||
      String(process.env["MSV_EXIT_ON_DB_FAILURE"] || "").trim() === "1");
  if (abortOnDb) {
    throw new Error(
      "[MSV] PostgreSQL 연결 실패로 서버 기동을 중단합니다 (MSV_ABORT_ON_DB_FAILURE=1 또는 예전 이름 MSV_EXIT_ON_DB_FAILURE=1). 위 로그를 확인하세요.",
    );
  }
}
