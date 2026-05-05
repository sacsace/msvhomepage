import { NextResponse } from "next/server";
import { adminApiCatchResponse } from "@/lib/db-api-error-response";
import { createAnnouncement, readAnnouncements } from "@/lib/announcements-store";
import { isRichTextMeaningful } from "@/lib/richtext";
import type { Announcement } from "@/types/announcement";
import { requireAdmin } from "@/lib/require-admin";

export const runtime = "nodejs";

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;
  const list = await readAnnouncements();
  return NextResponse.json(list);
}

export async function POST(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  try {
    const json = (await request.json()) as Partial<Announcement>;
    const title = String(json.title || "").trim();
    const body = String(json.body || "").trim();
    const pinned = Boolean(json.pinned);
    if (!title || !isRichTextMeaningful(body)) {
      return NextResponse.json({ error: "제목과 내용은 필수입니다." }, { status: 400 });
    }
    const now = new Date().toISOString();
    const item: Announcement = {
      id: crypto.randomUUID(),
      title,
      body,
      pinned,
      createdAt: now,
      updatedAt: now,
    };
    await createAnnouncement(item);
    return NextResponse.json(item, { status: 201 });
  } catch (e) {
    console.error("[api/admin/announcements POST]", e);
    return adminApiCatchResponse(e, "저장 실패");
  }
}
