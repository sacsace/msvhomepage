import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { adminApiCatchResponse } from "@/lib/db-api-error-response";
import type { Client } from "@/types/client";
import { removeStoredClientLogoFile } from "@/lib/client-logo-utils";
import { readClients, writeClients } from "@/lib/clients-store";
import { requireAdmin } from "@/lib/require-admin";

export const runtime = "nodejs";

const mimeToExt: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/svg+xml": "svg",
};

type Ctx = { params: Promise<{ id: string }> };

export async function POST(request: Request, ctx: Ctx) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const { id } = await ctx.params;
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    if (!(file instanceof File) || file.size === 0) {
      return NextResponse.json({ error: "로고 이미지 파일을 선택해 주세요." }, { status: 400 });
    }
    const ext = mimeToExt[file.type];
    if (!ext) {
      return NextResponse.json(
        { error: "JPEG, PNG, WebP, SVG 이미지만 업로드할 수 있습니다." },
        { status: 400 },
      );
    }
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "파일은 5MB 이하여야 합니다." }, { status: 400 });
    }

    const all = await readClients();
    const idx = all.findIndex((c) => c.id === id);
    if (idx === -1) {
      return NextResponse.json({ error: "고객사를 찾을 수 없습니다." }, { status: 404 });
    }

    const cur = all[idx];
    await removeStoredClientLogoFile(cur.logoSrc);

    const buf = Buffer.from(await file.arrayBuffer());
    const safeId = id.replace(/[^a-z0-9-]+/gi, "x");
    const filename = `${safeId}-${Date.now()}.${ext}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads", "clients");
    await fs.mkdir(uploadDir, { recursive: true });
    await fs.writeFile(path.join(uploadDir, filename), buf);
    const publicPath = `/uploads/clients/${filename}`;

    const updated: Client = {
      ...cur,
      logoSrc: publicPath,
      updatedAt: new Date().toISOString(),
    };
    all[idx] = updated;
    await writeClients(all);
    return NextResponse.json({ ok: true, logoSrc: publicPath });
  } catch (e) {
    console.error("[api/admin/clients logo POST]", e);
    return adminApiCatchResponse(e, "업로드 실패");
  }
}

export async function DELETE(_request: Request, ctx: Ctx) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const { id } = await ctx.params;
  try {
    const all = await readClients();
    const idx = all.findIndex((c) => c.id === id);
    if (idx === -1) {
      return NextResponse.json({ error: "고객사를 찾을 수 없습니다." }, { status: 404 });
    }
    const cur = all[idx];
    await removeStoredClientLogoFile(cur.logoSrc);
    const updated: Client = {
      ...cur,
      logoSrc: undefined,
      updatedAt: new Date().toISOString(),
    };
    all[idx] = updated;
    await writeClients(all);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[api/admin/clients logo DELETE]", e);
    return adminApiCatchResponse(e, "삭제 실패");
  }
}
