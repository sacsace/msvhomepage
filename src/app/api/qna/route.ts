import { NextResponse } from "next/server";
import { readThreads, writeThreads } from "@/lib/qna-store";
import type { QnaAnswer, QnaThread } from "@/types/qna";

export const runtime = "nodejs";

function sortThreads(threads: QnaThread[]) {
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

export async function GET() {
  const threads = sortThreads(await readThreads());
  return NextResponse.json(threads);
}

export async function POST(request: Request) {
  try {
    const json = (await request.json()) as {
      kind?: string;
      title?: string;
      body?: string;
      author?: string;
      threadId?: string;
    };

    const threads = await readThreads();

    if (json.kind === "question") {
      const title = String(json.title || "").trim();
      const body = String(json.body || "").trim();
      const author = String(json.author || "").trim();
      if (!title || !body || !author) {
        return NextResponse.json(
          { error: "제목, 내용, 작성자는 필수입니다." },
          { status: 400 },
        );
      }
      const thread: QnaThread = {
        id: crypto.randomUUID(),
        title,
        body,
        author,
        createdAt: new Date().toISOString(),
        answers: [],
      };
      threads.unshift(thread);
      await writeThreads(threads);
      return NextResponse.json(thread, { status: 201 });
    }

    if (json.kind === "answer") {
      const threadId = String(json.threadId || "").trim();
      const body = String(json.body || "").trim();
      const author = String(json.author || "").trim();
      if (!threadId || !body || !author) {
        return NextResponse.json(
          { error: "글 ID, 내용, 작성자는 필수입니다." },
          { status: 400 },
        );
      }
      const idx = threads.findIndex((t) => t.id === threadId);
      if (idx === -1) {
        return NextResponse.json({ error: "질문을 찾을 수 없습니다." }, { status: 404 });
      }
      const answer: QnaAnswer = {
        id: crypto.randomUUID(),
        body,
        author,
        createdAt: new Date().toISOString(),
      };
      threads[idx] = {
        ...threads[idx],
        answers: [...threads[idx].answers, answer],
      };
      await writeThreads(threads);
      return NextResponse.json(threads[idx], { status: 201 });
    }

    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  } catch {
    return NextResponse.json({ error: "저장에 실패했습니다." }, { status: 500 });
  }
}
