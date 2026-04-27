import { NextResponse } from "next/server";
import type { Client } from "@/types/client";
import { readClients, writeClients } from "@/lib/clients-store";
import { requireAdmin } from "@/lib/require-admin";

export const runtime = "nodejs";

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;
  const list = await readClients();
  return NextResponse.json(list);
}

export async function POST(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  try {
    const json = (await request.json()) as Partial<Client>;
    const name = String(json.name || "").trim();
    if (!name) {
      return NextResponse.json({ error: "고객사명은 필수입니다." }, { status: 400 });
    }
    const now = new Date().toISOString();
    const all = await readClients();
    const maxOrder = all.reduce((m, c) => Math.max(m, c.sortOrder), 0);
    const item: Client = {
      id: crypto.randomUUID(),
      name,
      sector: String(json.sector || "").trim() || undefined,
      website: String(json.website || "").trim() || undefined,
      note: String(json.note || "").trim() || undefined,
      sortOrder: Number.isFinite(Number(json.sortOrder)) ? Number(json.sortOrder) : maxOrder + 1,
      createdAt: now,
      updatedAt: now,
    };
    all.push(item);
    await writeClients(all);
    return NextResponse.json(item, { status: 201 });
  } catch {
    return NextResponse.json({ error: "저장 실패" }, { status: 500 });
  }
}
