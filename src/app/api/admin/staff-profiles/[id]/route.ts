import { NextResponse } from "next/server";
import { adminApiCatchResponse } from "@/lib/db-api-error-response";
import { readStaffProfiles, writeStaffProfiles } from "@/lib/staff-profiles-store";
import { requireAdmin } from "@/lib/require-admin";
import type { StaffProfile } from "@/types/staff-profile";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, ctx: Ctx) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const { id } = await ctx.params;
  try {
    const json = (await request.json()) as Partial<StaffProfile>;
    const all = await readStaffProfiles();
    const idx = all.findIndex((s) => s.id === id);
    if (idx === -1) {
      return NextResponse.json({ error: "없음" }, { status: 404 });
    }
    const cur = all[idx];
    const next: StaffProfile = {
      ...cur,
      name: json.name !== undefined ? String(json.name).trim() : cur.name,
      role: json.role !== undefined ? String(json.role).trim() : cur.role,
      intro: json.intro !== undefined ? String(json.intro).trim() : cur.intro,
      email: json.email !== undefined ? String(json.email || "").trim() || undefined : cur.email,
      updatedAt: new Date().toISOString(),
    };
    if (!next.name || !next.role || !next.intro) {
      return NextResponse.json({ error: "이름·담당 부서·소개는 필수입니다." }, { status: 400 });
    }
    all[idx] = next;
    await writeStaffProfiles(all);
    return NextResponse.json(next);
  } catch (e) {
    console.error("[api/admin/staff-profiles PATCH]", e);
    return adminApiCatchResponse(e, "수정 실패");
  }
}

export async function DELETE(_request: Request, ctx: Ctx) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const { id } = await ctx.params;
  try {
    const all = await readStaffProfiles();
    const next = all.filter((s) => s.id !== id);
    if (next.length === all.length) {
      return NextResponse.json({ error: "없음" }, { status: 404 });
    }
    await writeStaffProfiles(next);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[api/admin/staff-profiles DELETE]", e);
    return adminApiCatchResponse(e, "삭제 실패");
  }
}
