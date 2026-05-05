import { NextResponse } from "next/server";
import {
  isDbConnectionSlotExhaustion,
  isRecoverableDbError,
} from "@/lib/prisma-read-fallback";

/** UI 한 줄 요약 — 상세는 `detail`로 내려 접기·별도 표시에 씁니다. */
const DB_CONNECT_ERROR =
  "PostgreSQL에 연결하거나 인증하지 못했습니다. `cd web` 후 `npm run db:doctor`(자동 진단) 또는 `npm run db:ping`을 실행해 보세요.";

const DB_CONNECT_DETAIL =
  "`DATABASE_URL` 또는 `DB_*`가 실제 서버와 일치하는지 확인하세요. embedded(55432) 의심 시 터미널에서 `npm run db:doctor`가 `.env.local`에 `MSV_IGNORE_EMBEDDED_ENV=1`을 쓸 수 있습니다. " +
    "그래도 안 되면 PostgreSQL 기동·`npm run db:bootstrap`·비밀번호를 점검한 뒤 dev 서버를 다시 시작하세요.";

const DB_SLOT_ERROR =
  "PostgreSQL 동시 연결 한도에 도달했습니다. 다른 클라이언트(pgAdmin 등)·옛 dev 서버를 종료한 뒤 Postgres를 재시작하거나 `max_connections`를 늘리세요.";

const DB_SLOT_DETAIL =
  "이 메시지는 비밀번호 오류가 아니라, 서버가 받을 수 있는 연결 수가 가득 찼을 때 납니다. " +
    "Windows: 서비스에서 PostgreSQL 재시작, 또는 `pg_stat_activity`로 유휴 세션 정리. " +
    "앱·CLI는 `connection_limit=1`을 쓰도록 맞춰 두었으므로, 여전히 나오면 DB 쪽 한도·다른 앱 점유를 의심하세요. " +
    "개발만 쓰는 DB면 `postgresql.conf`의 `max_connections` 상향 후 재기동을 검토하세요.";

/** 관리자 API catch: DB 끊김·자격 오류는 짧은 `error` + 선택 `detail`, 그 외는 generic + detail */
export function adminApiCatchJson(
  e: unknown,
  genericError: string,
): { status: number; body: { error: string; detail?: string } } {
  if (isDbConnectionSlotExhaustion(e)) {
    return { status: 503, body: { error: DB_SLOT_ERROR, detail: DB_SLOT_DETAIL } };
  }
  if (isRecoverableDbError(e)) {
    return { status: 503, body: { error: DB_CONNECT_ERROR, detail: DB_CONNECT_DETAIL } };
  }
  const msg = e instanceof Error ? e.message : String(e);
  return { status: 500, body: { error: genericError, detail: msg.slice(0, 500) } };
}

export function adminApiCatchResponse(e: unknown, genericError: string): NextResponse {
  const { status, body } = adminApiCatchJson(e, genericError);
  return NextResponse.json(body, { status });
}
