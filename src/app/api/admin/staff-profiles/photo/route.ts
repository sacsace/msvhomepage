import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { readStaffProfiles, writeStaffProfiles } from "@/lib/staff-profiles-store";
import { requireAdmin } from "@/lib/require-admin";

export const runtime = "nodejs";

const mimeToExt: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

async function removeUploadedPhoto(photoSrc?: string) {
  if (!photoSrc?.startsWith("/uploads/staff/")) return;
  try {
    const full = path.join(process.cwd(), "public", photoSrc.replace(/^\//, ""));
    await fs.unlink(full);
  } catch {
    // ignore
  }
}

export async function POST(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  try {
    const formData = await request.formData();
    const id = String(formData.get("id") || "").trim();
    const file = formData.get("file");
    if (!id) {
      return NextResponse.json({ error: "직원 ID가 필요합니다." }, { status: 400 });
    }
    if (!(file instanceof File) || file.size === 0) {
      return NextResponse.json({ error: "이미지 파일을 선택해 주세요." }, { status: 400 });
    }
    const ext = mimeToExt[file.type];
    if (!ext) {
      return NextResponse.json({ error: "JPEG, PNG, WebP 이미지만 업로드할 수 있습니다." }, { status: 400 });
    }
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "파일은 5MB 이하여야 합니다." }, { status: 400 });
    }

    const all = await readStaffProfiles();
    const idx = all.findIndex((s) => s.id === id);
    if (idx === -1) {
      return NextResponse.json({ error: "직원을 찾을 수 없습니다." }, { status: 404 });
    }

    const buf = Buffer.from(await file.arrayBuffer());
    const safe = id.replace(/[^a-z0-9._-]+/gi, "_");
    const filename = `${safe}-${Date.now()}.${ext}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads", "staff");
    await fs.mkdir(uploadDir, { recursive: true });
    await fs.writeFile(path.join(uploadDir, filename), buf);
    const publicPath = `/uploads/staff/${filename}`;

    await removeUploadedPhoto(all[idx].photoSrc);
    all[idx] = {
      ...all[idx],
      photoSrc: publicPath,
      updatedAt: new Date().toISOString(),
    };
    await writeStaffProfiles(all);
    return NextResponse.json({ ok: true, photoSrc: publicPath });
  } catch {
    return NextResponse.json({ error: "업로드 실패" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  try {
    const body = (await request.json()) as { id?: string };
    const id = String(body.id || "").trim();
    if (!id) {
      return NextResponse.json({ error: "직원 ID가 필요합니다." }, { status: 400 });
    }
    const all = await readStaffProfiles();
    const idx = all.findIndex((s) => s.id === id);
    if (idx === -1) {
      return NextResponse.json({ error: "직원을 찾을 수 없습니다." }, { status: 404 });
    }
    await removeUploadedPhoto(all[idx].photoSrc);
    all[idx] = {
      ...all[idx],
      photoSrc: undefined,
      updatedAt: new Date().toISOString(),
    };
    await writeStaffProfiles(all);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "삭제 실패" }, { status: 500 });
  }
}
