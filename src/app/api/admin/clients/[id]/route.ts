import { NextResponse } from "next/server";
import type { Client } from "@/types/client";
import { isStoredClientLogo, removeStoredClientLogoFile } from "@/lib/client-logo-utils";
import { readClients, writeClients } from "@/lib/clients-store";
import { requireAdmin } from "@/lib/require-admin";

export const runtime = "nodejs";

function sanitizeLogoSrcInput(raw: string | undefined): string | undefined {
  const t = String(raw ?? "").trim();
  if (!t) return undefined;
  if (t.startsWith("/uploads/clients/") && !t.includes("..")) return t;
  try {
    const u = new URL(t);
    if (u.protocol === "http:" || u.protocol === "https:") return t;
  } catch {
    return undefined;
  }
  return undefined;
}

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, ctx: Ctx) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const { id } = await ctx.params;
  try {
    const json = (await request.json()) as Partial<Client>;
    const all = await readClients();
    const idx = all.findIndex((c) => c.id === id);
    if (idx === -1) {
      return NextResponse.json({ error: "없음" }, { status: 404 });
    }
    const cur = all[idx];
    const name = json.name !== undefined ? String(json.name).trim() : cur.name;
    if (!name) {
      return NextResponse.json({ error: "고객사명은 필수입니다." }, { status: 400 });
    }

    let nextLogoSrc = cur.logoSrc;
    if (json.logoSrc !== undefined) {
      const next = sanitizeLogoSrcInput(String(json.logoSrc || "").trim() || undefined);
      if (isStoredClientLogo(cur.logoSrc) && cur.logoSrc !== next) {
        await removeStoredClientLogoFile(cur.logoSrc);
      }
      nextLogoSrc = next;
    }

    const updated: Client = {
      ...cur,
      name,
      logoSrc: nextLogoSrc,
      sector: json.sector !== undefined ? String(json.sector || "").trim() || undefined : cur.sector,
      website:
        json.website !== undefined ? String(json.website || "").trim() || undefined : cur.website,
      note: json.note !== undefined ? String(json.note || "").trim() || undefined : cur.note,
      sortOrder:
        json.sortOrder !== undefined && Number.isFinite(Number(json.sortOrder))
          ? Number(json.sortOrder)
          : cur.sortOrder,
      updatedAt: new Date().toISOString(),
    };
    all[idx] = updated;
    await writeClients(all);
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "저장 실패" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, ctx: Ctx) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const { id } = await ctx.params;
  const all = await readClients();
  const victim = all.find((c) => c.id === id);
  if (!victim) {
    return NextResponse.json({ error: "없음" }, { status: 404 });
  }
  await removeStoredClientLogoFile(victim.logoSrc);
  const next = all.filter((c) => c.id !== id);
  await writeClients(next);
  return NextResponse.json({ ok: true });
}
