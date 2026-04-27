import { NextResponse } from "next/server";
import { isRichTextMeaningful } from "@/lib/richtext";
import { readOngoingTasks, sortOngoingTasks, writeOngoingTasks } from "@/lib/ongoing-tasks-store";
import { requireAdmin } from "@/lib/require-admin";
import type { OngoingTask } from "@/types/ongoing-task";

export const runtime = "nodejs";

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;
  return NextResponse.json(sortOngoingTasks(await readOngoingTasks()));
}

export async function POST(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  try {
    const json = (await request.json()) as Partial<OngoingTask>;
    const title = String(json.title || "").trim();
    const body = String(json.body || "").trim();
    if (!title || !isRichTextMeaningful(body)) {
      return NextResponse.json({ error: "제목과 내용은 필수입니다." }, { status: 400 });
    }
    const now = new Date().toISOString();
    const item: OngoingTask = {
      id: crypto.randomUUID(),
      title,
      body,
      createdAt: now,
      updatedAt: now,
    };
    const all = await readOngoingTasks();
    all.unshift(item);
    await writeOngoingTasks(all);
    return NextResponse.json(item, { status: 201 });
  } catch {
    return NextResponse.json({ error: "저장 실패" }, { status: 500 });
  }
}
