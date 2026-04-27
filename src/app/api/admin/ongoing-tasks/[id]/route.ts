import { NextResponse } from "next/server";
import { isRichTextMeaningful } from "@/lib/richtext";
import { readOngoingTasks, writeOngoingTasks } from "@/lib/ongoing-tasks-store";
import { requireAdmin } from "@/lib/require-admin";
import type { OngoingTask } from "@/types/ongoing-task";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, ctx: Ctx) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const { id } = await ctx.params;
  try {
    const patch = (await request.json()) as Partial<OngoingTask>;
    const all = await readOngoingTasks();
    const idx = all.findIndex((a) => a.id === id);
    if (idx === -1) {
      return NextResponse.json({ error: "없음" }, { status: 404 });
    }
    const cur = all[idx];
    const next: OngoingTask = {
      ...cur,
      title: patch.title !== undefined ? String(patch.title).trim() : cur.title,
      body: patch.body !== undefined ? String(patch.body).trim() : cur.body,
      updatedAt: new Date().toISOString(),
    };
    if (!next.title || !isRichTextMeaningful(next.body)) {
      return NextResponse.json({ error: "제목·내용 비움 불가" }, { status: 400 });
    }
    all[idx] = next;
    await writeOngoingTasks(all);
    return NextResponse.json(next);
  } catch {
    return NextResponse.json({ error: "수정 실패" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, ctx: Ctx) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const { id } = await ctx.params;
  const all = await readOngoingTasks();
  const next = all.filter((a) => a.id !== id);
  if (next.length === all.length) {
    return NextResponse.json({ error: "없음" }, { status: 404 });
  }
  await writeOngoingTasks(next);
  return NextResponse.json({ ok: true });
}
