import { promises as fs } from "node:fs";
import { NextResponse } from "next/server";
import { mimeForUploadFile, resolveUploadDiskPath, UPLOADS_PUBLIC_PREFIX } from "@/lib/uploads-storage";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ path?: string[] }> };

/**
 * `MSV_UPLOADS_ROOT` 로 저장된 파일은 `public/` 밖에 있어 정적 서빙이 안 됨 → 여기서 스트리밍.
 * 로컬 기본(`public/uploads`)은 동일 URL이 정적 파일로 먼저 처리되는 경우가 많음.
 */
export async function GET(_request: Request, ctx: Ctx) {
  const { path: segments } = await ctx.params;
  if (!segments?.length) {
    return new NextResponse(null, { status: 404 });
  }
  const publicPath = `${UPLOADS_PUBLIC_PREFIX}/${segments.join("/")}`;
  const disk = resolveUploadDiskPath(publicPath);
  if (!disk) {
    return new NextResponse(null, { status: 404 });
  }
  try {
    const buf = await fs.readFile(disk);
    const ct = mimeForUploadFile(disk);
    return new NextResponse(buf, {
      headers: {
        "Content-Type": ct,
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch {
    return new NextResponse(null, { status: 404 });
  }
}
