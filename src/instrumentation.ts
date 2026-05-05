/**
 * Next 서버(Node) 기동 시 한 번 실행됩니다.
 * DB 점검은 `instrumentation-db-check.ts` — Edge 번들은 이 파일만 정적으로 훑습니다.
 * (같은 줄 번호의 Edge 경고가 반복되면 `web/.next` 삭제 후 dev 재시작.)
 */
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const mod = "./instrumentation" + "-db-check";
    const { runDatabaseStartupCheck } = await import(mod);
    await runDatabaseStartupCheck();
  }
}
