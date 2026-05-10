import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * Railway/K8s 등 **프로세스 생존** 확인용. Prisma·DB를 쓰지 않습니다.
 * 홈(`/`)은 DB 캐시를 타면 첫 기동·DB 지연 시 헬스체크가 실패할 수 있어 이 경로를 씁니다.
 */
export function GET() {
  return NextResponse.json(
    { ok: true, service: "msv-web", at: new Date().toISOString() },
    { status: 200, headers: { "cache-control": "no-store" } },
  );
}
