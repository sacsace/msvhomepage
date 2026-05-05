import { NextResponse } from "next/server";
import { adminApiCatchResponse } from "@/lib/db-api-error-response";
import { leadership } from "@/lib/site-content";
import {
  deleteLeadershipExtra,
  getLeadershipExtra,
  updateLeadershipExtra,
} from "@/lib/leadership-extra-store";
import { removeLeadershipSummary } from "@/lib/leadership-summaries-store";
import { requireAdmin } from "@/lib/require-admin";
import { removeStaffPhoto } from "@/lib/staff-photos-store";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ encoded: string }> };

export async function PATCH(request: Request, ctx: Ctx) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const { encoded } = await ctx.params;
  const key = decodeURIComponent(encoded).trim().toLowerCase();
  if (!key) {
    return NextResponse.json({ error: "유효하지 않습니다." }, { status: 400 });
  }
  if (leadership.some((m) => m.email.toLowerCase() === key)) {
    return NextResponse.json({ error: "기본 경영진은 site-content에서 수정하세요." }, { status: 400 });
  }
  const row = await getLeadershipExtra(key);
  if (!row) {
    return NextResponse.json({ error: "없음" }, { status: 404 });
  }
  try {
    const body = (await request.json()) as {
      name?: string;
      role?: string;
      sortOrder?: number;
    };
    await updateLeadershipExtra(key, {
      name: body.name !== undefined ? String(body.name) : undefined,
      role: body.role !== undefined ? String(body.role) : undefined,
      sortOrder:
        body.sortOrder !== undefined && Number.isFinite(Number(body.sortOrder))
          ? Number(body.sortOrder)
          : undefined,
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[api/admin/leadership-members PATCH]", e);
    return adminApiCatchResponse(e, "저장 실패");
  }
}

export async function DELETE(_request: Request, ctx: Ctx) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const { encoded } = await ctx.params;
  const key = decodeURIComponent(encoded).trim().toLowerCase();
  if (!key) {
    return NextResponse.json({ error: "유효하지 않습니다." }, { status: 400 });
  }
  if (leadership.some((m) => m.email.toLowerCase() === key)) {
    return NextResponse.json({ error: "기본 경영진은 삭제할 수 없습니다." }, { status: 400 });
  }
  const row = await getLeadershipExtra(key);
  if (!row) {
    return NextResponse.json({ error: "없음" }, { status: 404 });
  }
  try {
    await removeStaffPhoto(key);
    await removeLeadershipSummary(key);
    await deleteLeadershipExtra(key);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[api/admin/leadership-members DELETE]", e);
    return adminApiCatchResponse(e, "삭제 실패");
  }
}
