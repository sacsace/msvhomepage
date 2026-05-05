function hasDatabaseConfig(): boolean {
  if (process.env.DATABASE_URL?.trim()) return true;
  return Boolean(
    process.env.DB_HOST?.trim() &&
      process.env.DB_NAME?.trim() &&
      process.env.DB_USER?.trim(),
  );
}

/**
 * Node 서버 기동 시 Prisma로 DB 연결만 점검합니다.
 * (`instrumentation.ts`는 Edge 정적 분석 대상이라 로직을 이 파일로 분리했습니다.)
 */
export async function runDatabaseStartupCheck(): Promise<void> {
  if (String(process.env.MSV_SKIP_DB_STARTUP_CHECK || "").trim() === "1") return;
  if (process.env.MSV_LENIENT_DB_BUILD === "1") return;

  if (!hasDatabaseConfig()) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "\n[MSV] DB 연결 정보가 없습니다. `web/.env.development` 또는 `.env.local`에 " +
          "`DATABASE_URL` 또는 `DB_HOST`·`DB_NAME`·`DB_USER`(·`DB_PASSWORD`)를 설정하세요.\n",
      );
    }
    return;
  }

  try {
    const { prisma } = await import("@/lib/prisma");
    await prisma.$connect();
    await prisma.$queryRawUnsafe("SELECT 1");
    await prisma.$disconnect();
    if (process.env.NODE_ENV === "development") {
      console.info("[MSV] PostgreSQL 기동 시 연결 검사 통과(점검 후 연결 반환).");
    }
  } catch (e) {
    try {
      const { prisma } = await import("@/lib/prisma");
      await prisma.$disconnect();
    } catch {
      /* ignore */
    }
    const msg = e instanceof Error ? e.message : String(e);
    console.error(
      "\n[MSV] ========== PostgreSQL 연결 실패 (서버 기동 시점) ==========\n" +
        "Prisma/관리자 기능은 DB가 필요합니다. 아래를 확인한 뒤 dev 서버를 다시 켜세요.\n" +
        "• `DATABASE_URL` 또는 `DB_HOST`·`DB_PORT`·`DB_NAME`·`DB_USER`·`DB_PASSWORD`가 실제 서버와 일치하는지\n" +
        "• embedded 없이 `next dev`만 쓰는 경우: 잘못된 `.msv-embedded.env` 대신 `MSV_IGNORE_EMBEDDED_ENV=1` 또는 해당 파일 정리\n" +
        "• 점검: `cd web` → `npm run db:ping` 또는 `npm run db:doctor` (embedded 자동 해제 시도)\n" +
        "• 이 검사를 끄려면: `MSV_SKIP_DB_STARTUP_CHECK=1` (임시)\n" +
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
}
