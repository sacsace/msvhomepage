import { NextResponse } from "next/server";
import { adminApiCatchResponse } from "@/lib/db-api-error-response";
import {
  mergeMailSettings,
  readMailSettings,
  readMailSettingsPublic,
  writeMailSettings,
} from "@/lib/mail-settings-store";
import { requireAdmin } from "@/lib/require-admin";
import type { MailSettings } from "@/types/mail-settings";

export const runtime = "nodejs";

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;
  return NextResponse.json(await readMailSettingsPublic());
}

export async function POST(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  try {
    const patch = (await request.json()) as Partial<MailSettings>;
    const existing = await readMailSettings();
    const merged = mergeMailSettings(existing, patch);
    await writeMailSettings(merged);
    return NextResponse.json(await readMailSettingsPublic());
  } catch (e) {
    console.error("[api/admin/mail-settings POST]", e);
    return adminApiCatchResponse(e, "저장 실패");
  }
}
