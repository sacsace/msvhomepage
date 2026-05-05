import type { QnaAnswer, QnaThread } from "@/types/qna";
import { prisma } from "@/lib/prisma";
import { withRecoverableDbRead } from "@/lib/prisma-read-fallback";

export type { QnaThread, QnaAnswer } from "@/types/qna";

function parseAnswers(raw: unknown): QnaAnswer[] {
  if (!Array.isArray(raw)) return [];
  return raw.filter(Boolean) as QnaAnswer[];
}

function toThread(row: {
  id: string;
  title: string;
  body: string;
  author: string;
  createdAt: Date;
  answers: unknown;
}): QnaThread {
  return {
    id: row.id,
    title: row.title,
    body: row.body,
    author: row.author,
    createdAt: row.createdAt.toISOString(),
    answers: parseAnswers(row.answers),
  };
}

export async function readThreads(): Promise<QnaThread[]> {
  return withRecoverableDbRead([], async () => {
    const rows = await prisma.qnaThread.findMany();
    return rows.map(toThread);
  });
}

export async function writeThreads(threads: QnaThread[]): Promise<void> {
  const data = threads.map((t) => ({
    id: t.id,
    title: t.title,
    body: t.body,
    author: t.author,
    createdAt: new Date(t.createdAt),
    answers: t.answers as object,
  }));
  await prisma.$transaction(async (tx) => {
    await tx.qnaThread.deleteMany();
    if (data.length) await tx.qnaThread.createMany({ data });
  });
}

export function sortThreadsByActivity(threads: QnaThread[]): QnaThread[] {
  return [...threads].sort((a, b) => {
    const lastA = Math.max(
      new Date(a.createdAt).getTime(),
      ...a.answers.map((x) => new Date(x.createdAt).getTime()),
    );
    const lastB = Math.max(
      new Date(b.createdAt).getTime(),
      ...b.answers.map((x) => new Date(x.createdAt).getTime()),
    );
    return lastB - lastA;
  });
}
