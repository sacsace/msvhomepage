import { randomUUID } from "crypto";
import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { adminApiCatchResponse } from "@/lib/db-api-error-response";
import { requireAdmin } from "@/lib/require-admin";

export const runtime = "nodejs";

const MAX_BYTES = 10 * 1024 * 1024;

/** MIME → 저장 확장자 (소문자) */
const mimeToExt: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "application/pdf": "pdf",
  "application/zip": "zip",
  "application/x-zip-compressed": "zip",
  "text/plain": "txt",
  "application/msword": "doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
  "application/vnd.ms-excel": "xls",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
};

const imageMime = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

function safeOriginalName(name: string): string {
  const base = path.basename(name || "file")
    .replace(/[\r\n\0]/g, "")
    .replace(/[^\w.\s\uAC00-\uD7A3\-()]+/g, "_")
    .trim()
    .slice(0, 180);
  return base.length > 0 ? base : "file";
}

export async function POST(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  try {
    const formData = await request.formData();
    const kind = String(formData.get("kind") || "file").trim();
    const file = formData.get("file");
    if (!(file instanceof File) || file.size === 0) {
      return NextResponse.json({ error: "파일을 선택해 주세요." }, { status: 400 });
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: "파일은 10MB 이하여야 합니다." }, { status: 400 });
    }
    if (kind === "image" && !imageMime.has(file.type)) {
      return NextResponse.json(
        { error: "JPEG, PNG, WebP, GIF 이미지만 업로드할 수 있습니다." },
        { status: 400 },
      );
    }
    const ext = mimeToExt[file.type];
    if (!ext) {
      return NextResponse.json({ error: "허용되지 않는 파일 형식입니다." }, { status: 400 });
    }

    const buf = Buffer.from(await file.arrayBuffer());
    const filename = `${randomUUID()}.${ext}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads", "articles");
    await fs.mkdir(uploadDir, { recursive: true });
    await fs.writeFile(path.join(uploadDir, filename), buf);
    const publicPath = `/uploads/articles/${filename}`;
    const originalName = safeOriginalName(file.name);

    return NextResponse.json({ url: publicPath, originalName });
  } catch (e) {
    console.error("[api/admin/articles/upload POST]", e);
    return adminApiCatchResponse(e, "업로드 실패");
  }
}
