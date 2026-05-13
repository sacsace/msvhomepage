/**
 * Webpack 클라이언트 번들 전용 스tub.
 * 실제 `instrumentation-db-check.ts`는 Node·Prisma·fs 에만 사용됩니다.
 */
export async function runDatabaseStartupCheck(): Promise<void> {}
