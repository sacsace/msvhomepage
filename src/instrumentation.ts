/**
 * Next 서버(Node) 기동 시 한 번 실행됩니다.
 * DB 점검은 `instrumentation-db-check.ts`.
 * `import()` 경로는 **문자열 리터럴**이어야 합니다. (`"./x" + "-y"` 는 Webpack 번들에서 MODULE_NOT_FOUND)
 */
export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;

  const { runDatabaseStartupCheck } = await import("./instrumentation-db-check");

  /**
   * 개발 모드에서 DB 점검을 `await` 하면 embedded·Prisma 준비 레이스 동안 HTTP 포트가 열리지 않아
   * 브라우저에 ERR_CONNECTION_REFUSED 가 나올 수 있습니다. 운영·강제 모드에서만 동기 대기합니다.
   */
  const block =
    process.env.NODE_ENV === "production" ||
    String(process.env.MSV_BLOCKING_DB_STARTUP_CHECK || "").trim() === "1";

  const syncUploads = async () => {
    try {
      const { syncUploadBlobsWithDisk } = await import("./lib/upload-blob-store");
      await syncUploadBlobsWithDisk();
    } catch (err: unknown) {
      console.warn("[MSV] 업로드 blob 동기화 건너뜀:", err instanceof Error ? err.message : err);
    }
  };

  if (block) {
    await runDatabaseStartupCheck();
    await syncUploads();
    return;
  }

  void runDatabaseStartupCheck()
    .then(() => syncUploads())
    .catch((err: unknown) => {
      console.error("[MSV] (백그라운드) PostgreSQL 기동 점검 실패:", err);
    });
}
