import { NextResponse } from "next/server";
import { readStaffProfiles, writeStaffProfiles } from "@/lib/staff-profiles-store";
import { requireAdmin } from "@/lib/require-admin";
import type { StaffProfile } from "@/types/staff-profile";

export const runtime = "nodejs";

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;
  return NextResponse.json(await readStaffProfiles());
}

export async function POST(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  try {
    const json = (await request.json()) as Partial<StaffProfile>;
    const name = String(json.name || "").trim();
    const role = String(json.role || "").trim();
    const intro = String(json.intro || "").trim();
    const email = String(json.email || "").trim() || undefined;
    if (!name || !role || !intro) {
      return NextResponse.json({ error: "이름·직책·소개는 필수입니다." }, { status: 400 });
    }
    const now = new Date().toISOString();
    const item: StaffProfile = {
      id: crypto.randomUUID(),
      name,
      role,
      intro,
      email,
      createdAt: now,
      updatedAt: now,
    };
    const all = await readStaffProfiles();
    all.unshift(item);
    await writeStaffProfiles(all);
    return NextResponse.json(item, { status: 201 });
  } catch {
    return NextResponse.json({ error: "저장 실패" }, { status: 500 });
  }
}
