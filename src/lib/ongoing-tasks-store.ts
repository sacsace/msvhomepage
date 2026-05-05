import type { OngoingTask } from "@/types/ongoing-task";
import { prisma } from "@/lib/prisma";
import { withRecoverableDbRead } from "@/lib/prisma-read-fallback";

export type { OngoingTask } from "@/types/ongoing-task";

function toTask(row: {
  id: string;
  title: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
}): OngoingTask {
  return {
    id: row.id,
    title: row.title,
    body: row.body,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

export async function readOngoingTasks(): Promise<OngoingTask[]> {
  return withRecoverableDbRead([], async () => {
    const rows = await prisma.ongoingTask.findMany();
    return rows.map(toTask);
  });
}

export async function writeOngoingTasks(items: OngoingTask[]): Promise<void> {
  const data = items.map((t) => ({
    id: t.id,
    title: t.title,
    body: t.body,
    createdAt: new Date(t.createdAt),
    updatedAt: new Date(t.updatedAt),
  }));
  await prisma.$transaction(async (tx) => {
    await tx.ongoingTask.deleteMany();
    if (data.length) await tx.ongoingTask.createMany({ data });
  });
}

export function sortOngoingTasks(list: OngoingTask[]): OngoingTask[] {
  return [...list].sort((a, b) => {
    const u = new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    if (u !== 0) return u;
    const c = new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    if (c !== 0) return c;
    return b.id.localeCompare(a.id);
  });
}
