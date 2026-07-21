import { NextResponse } from "next/server";
import { UPLOADS_PUBLIC_PREFIX } from "@/lib/uploads-storage";
import { readUploadFile } from "@/lib/upload-blob-store";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ path?: string[] }> };

/**
 * 업로드 파일 서빙.
 * 디스크(볼륨·public/uploads) → 없으면 Postgres UploadedBlob 복원 후 응답.
 */
export async function GET(_request: Request, ctx: Ctx) {
  const { path: segments } = await ctx.params;
  if (!segments?.length) {
    return new NextResponse(null, { status: 404 });
  }
  const publicPath = `${UPLOADS_PUBLIC_PREFIX}/${segments.join("/")}`;
  const file = await readUploadFile(publicPath);
  if (!file) {
    return new NextResponse(null, { status: 404 });
  }
  return new NextResponse(new Uint8Array(file.data), {
    headers: {
      "Content-Type": file.mime,
      "Cache-Control": "public, max-age=86400",
    },
  });
}
