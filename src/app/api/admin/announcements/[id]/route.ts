import { NextResponse } from "next/server";
import { adminApiCatchResponse } from "@/lib/db-api-error-response";
import {
  deleteAnnouncement,
  getAnnouncement,
  updateAnnouncement,
} from "@/lib/announcements-store";
import { isRichTextMeaningful } from "@/lib/richtext";
import type { Announcement } from "@/types/announcement";
import { requireAdmin } from "@/lib/require-admin";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, ctx: Ctx) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const { id } = await ctx.params;
  try {
    const patch = (await request.json()) as Partial<Announcement>;
    const cur = await getAnnouncement(id);
    if (!cur) {
      return NextResponse.json({ error: "없음" }, { status: 404 });
    }
    const next: Announcement = {
      ...cur,
      title: patch.title !== undefined ? String(patch.title).trim() : cur.title,
      body: patch.body !== undefined ? String(patch.body).trim() : cur.body,
      pinned: patch.pinned !== undefined ? Boolean(patch.pinned) : cur.pinned,
      updatedAt: new Date().toISOString(),
    };
    if (!next.title || !isRichTextMeaningful(next.body)) {
      return NextResponse.json({ error: "제목·내용 비움 불가" }, { status: 400 });
    }
    await updateAnnouncement(id, next);
    return NextResponse.json(next);
  } catch (e) {
    console.error("[api/admin/announcements PATCH]", e);
    return adminApiCatchResponse(e, "수정 실패");
  }
}

export async function DELETE(_request: Request, ctx: Ctx) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const { id } = await ctx.params;
  try {
    const removed = await deleteAnnouncement(id);
    if (!removed) {
      return NextResponse.json({ error: "없음" }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[api/admin/announcements DELETE]", e);
    return adminApiCatchResponse(e, "삭제 실패");
  }
}
