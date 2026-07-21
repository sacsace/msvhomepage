import { NextResponse } from "next/server";
import { describeUploadsDiskRoot } from "@/lib/uploads-storage";

export const runtime = "nodejs";

/**
 * Railway/K8s 등 **프로세스 생존** 확인용. Prisma·DB를 쓰지 않습니다.
 * 홈(`/`)은 DB 캐시를 타면 첫 기동·DB 지연 시 헬스체크가 실패할 수 있어 이 경로를 씁니다.
 * `uploads.persistent` 가 false 이면 웹 서비스에 Volume 이 없는 상태입니다(재배포 시 이미지 유실).
 */
export function GET() {
  const uploads = describeUploadsDiskRoot();
  return NextResponse.json(
    {
      ok: true,
      service: "msv-web",
      at: new Date().toISOString(),
      uploads: {
        persistent: uploads.persistent,
        source: uploads.source,
      },
    },
    { status: 200, headers: { "cache-control": "no-store" } },
  );
}
