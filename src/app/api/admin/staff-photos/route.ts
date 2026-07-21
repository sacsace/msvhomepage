import { NextResponse } from "next/server";
import { adminApiCatchResponse } from "@/lib/db-api-error-response";
import { isLeadershipEmailAllowed } from "@/lib/leadership-allow";
import { requireAdmin } from "@/lib/require-admin";
import { removeStaffPhoto, setStaffPhoto } from "@/lib/staff-photos-store";
import { persistUploadFile } from "@/lib/upload-blob-store";

export const runtime = "nodejs";

const mimeToExt: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

export async function POST(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    const formData = await request.formData();
    const emailRaw = String(formData.get("email") || "").trim().toLowerCase();
    const file = formData.get("file");

    if (!emailRaw || !(await isLeadershipEmailAllowed(emailRaw))) {
      return NextResponse.json({ error: "등록된 경영진 이메일만 업로드할 수 있습니다." }, { status: 400 });
    }
    if (!(file instanceof File) || file.size === 0) {
      return NextResponse.json({ error: "이미지 파일을 선택해 주세요." }, { status: 400 });
    }
    const ext = mimeToExt[file.type];
    if (!ext) {
      return NextResponse.json(
        { error: "JPEG, PNG, WebP 이미지만 업로드할 수 있습니다." },
        { status: 400 },
      );
    }
    const max = 5 * 1024 * 1024;
    if (file.size > max) {
      return NextResponse.json({ error: "파일은 5MB 이하여야 합니다." }, { status: 400 });
    }

    const buf = Buffer.from(await file.arrayBuffer());
    const safe = emailRaw.replace(/[^a-z0-9@._-]+/gi, "_");
    const filename = `${safe}-${Date.now()}.${ext}`;
    const publicPath = `/uploads/team/${filename}`;
    await persistUploadFile(publicPath, buf, file.type);
    await setStaffPhoto(emailRaw, publicPath);

    return NextResponse.json({ email: emailRaw, photoPath: publicPath }, { status: 201 });
  } catch (e) {
    console.error("[api/admin/staff-photos POST]", e);
    return adminApiCatchResponse(e, "업로드 실패");
  }
}

export async function DELETE(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  try {
    const body = (await request.json()) as { email?: string };
    const email = String(body.email || "")
      .trim()
      .toLowerCase();
    if (!email || !(await isLeadershipEmailAllowed(email))) {
      return NextResponse.json({ error: "유효하지 않은 이메일입니다." }, { status: 400 });
    }
    await removeStaffPhoto(email);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[api/admin/staff-photos DELETE]", e);
    return adminApiCatchResponse(e, "삭제 실패");
  }
}
