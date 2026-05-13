/**
 * DB 연결·인증 실패 시 읽기 전용 경로에서 안전한 기본값으로 넘깁니다.
 * - `next build` + `MSV_LENIENT_DB_BUILD=1` (package.json `build`)
 * - `next dev` (`NODE_ENV=development`) — 잘못된 자격이어도 홈 등이 500 대신 빈 데이터
 * - 강제: `MSV_DEV_DB_LENIENT=1` (운영 `next start` 에서는 쓰지 마세요)
 */
function shouldRecoverFromDbReadFailure(): boolean {
  return (
    process.env.MSV_LENIENT_DB_BUILD === "1" ||
    process.env.NODE_ENV === "development" ||
    process.env.MSV_DEV_DB_LENIENT === "1"
  );
}

/** 동시 연결 한도 초과(인증 실패와 구분) */
export function isDbConnectionSlotExhaustion(e: unknown): boolean {
  const msg = e instanceof Error ? e.message : String(e);
  return /Too many database connections|too many clients already|remaining connection slots|53300/i.test(
    msg,
  );
}

/** Prisma `PrismaClientKnownRequestError` 등 — `code` 필드로 판별 */
export function isPrismaErrorCode(e: unknown, code: string): boolean {
  return (
    typeof e === "object" &&
    e !== null &&
    "code" in e &&
    String((e as { code: unknown }).code) === code
  );
}

/** `$queryRaw` 등이 없는 릴레이션을 가리킬 때(Postgres `42P01` undefined_table). */
function isRawQueryMissingRelation(e: unknown): boolean {
  if (!isPrismaErrorCode(e, "P2010")) return false;
  const meta = (e as { meta?: { code?: string; message?: string } }).meta;
  if (String(meta?.code ?? "") === "42P01") return true;
  const blob = `${meta?.message ?? ""}${e instanceof Error ? e.message : ""}`;
  return /42P01|undefined_table|릴레이션\(relation\)이 없습니다|does not exist/i.test(blob);
}

/** 연결·인증·타임아웃 등(읽기 복구 / API 사용자 메시지에 공통 사용) */
export function isRecoverableDbError(e: unknown): boolean {
  const msg = e instanceof Error ? e.message : String(e);
  const name = e instanceof Error ? e.name : "";
  const prismaCode =
    typeof e === "object" && e !== null && "code" in e ? String((e as { code: unknown }).code) : "";
  /** Prisma 엔진(로컬 바이너리)과 Node 간 연결 지연 — 느린 디스크·HMR·백신 스캔 시 dev 에서 잦음 */
  if (prismaCode === "UND_ERR_CONNECT_TIMEOUT") {
    return shouldRecoverFromDbReadFailure();
  }
  if (name === "PrismaClientInitializationError") {
    return true;
  }
  /** 스키마는 있는데 DB에 테이블이 없을 때 — dev/lenient에서만 빈 값으로 넘김(운영 `next start`는 false) */
  if (isPrismaErrorCode(e, "P2021")) {
    return shouldRecoverFromDbReadFailure();
  }
  /** Raw SQL이 아직 없는 테이블을 읽을 때 — P2021과 동일하게 취급 */
  if (isRawQueryMissingRelation(e)) {
    return shouldRecoverFromDbReadFailure();
  }
  /** DB에 컬럼이 없을 때(스키마가 DB보다 앞섬, 예: `showOnHome` 미적용) — dev/lenient에서만 읽기 폴백 */
  if (isPrismaErrorCode(e, "P2022")) {
    return shouldRecoverFromDbReadFailure();
  }
  return /P1000|P1012|P1001|Authentication failed|Can't reach database server|ECONNREFUSED|PrismaClientInitializationError|Timed out fetching a new connection|Connect Timeout Error|UND_ERR_CONNECT|Too many database connections|too many clients already|remaining connection slots|53300/i.test(
    msg,
  );
}

export async function withRecoverableDbRead<T>(
  fallback: T,
  run: () => Promise<T>,
): Promise<T> {
  if (!shouldRecoverFromDbReadFailure()) return run();
  try {
    return await run();
  } catch (e: unknown) {
    if (isRecoverableDbError(e)) {
      const preview =
        e instanceof Error ? e.message.slice(0, 200) : String(e).slice(0, 200);
      const reason =
        process.env.MSV_LENIENT_DB_BUILD === "1"
          ? "MSV_LENIENT_DB_BUILD"
          : process.env.MSV_DEV_DB_LENIENT === "1"
            ? "MSV_DEV_DB_LENIENT"
            : "next dev";
      console.warn(`[MSV] DB read skipped (${reason}):`, preview);
      if (
        (isPrismaErrorCode(e, "P2021") || isRawQueryMissingRelation(e)) &&
        process.env.NODE_ENV === "development"
      ) {
        console.warn(
          "[MSV] 테이블 누락(P2021·raw 42P01) — `web` 폴더에서 `npx prisma db push`(또는 `node scripts/merged-env-run.cjs npx prisma db push`)로 DB 스키마를 맞추세요.",
        );
      }
      if (isPrismaErrorCode(e, "P2022") && process.env.NODE_ENV === "development") {
        console.warn(
          "[MSV] 컬럼 누락(P2022) — `web`에서 `node scripts/merged-env-run.cjs npx prisma db push` 로 DB를 스키마에 맞추세요.",
        );
      }
      if (
        typeof e === "object" &&
        e !== null &&
        "code" in e &&
        String((e as { code: unknown }).code) === "UND_ERR_CONNECT_TIMEOUT" &&
        process.env.NODE_ENV === "development"
      ) {
        console.warn(
          "[MSV] Prisma 엔진 연결 타임아웃 — 보통 느린 디스크·HMR·일시 과부하입니다. dev 재시작 또는 `.next` 정리 후 재시도하세요.",
        );
      }
      return fallback;
    }
    throw e;
  }
}
