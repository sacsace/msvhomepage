"use client";

import { useState } from "react";
import type { QnaThread } from "@/types/qna";

type Props = { initialThreads: QnaThread[] };

export function QnaView({ initialThreads }: Props) {
  const [threads, setThreads] = useState(initialThreads);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);

  async function refresh() {
    const res = await fetch("/api/qna", { cache: "no-store" });
    if (!res.ok) return;
    const data = (await res.json()) as QnaThread[];
    setThreads(data);
  }

  async function submitQuestion(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy("q");
    setError(null);
    const form = e.currentTarget;
    const payload = {
      kind: "question",
      title: String(new FormData(form).get("title") || "").trim(),
      body: String(new FormData(form).get("body") || "").trim(),
      author: String(new FormData(form).get("author") || "").trim(),
    };
    try {
      const res = await fetch("/api/qna", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(String(data.error || "등록에 실패했습니다."));
        return;
      }
      form.reset();
      await refresh();
    } catch {
      setError("등록에 실패했습니다.");
    } finally {
      setBusy(null);
    }
  }

  async function submitAnswer(e: React.FormEvent<HTMLFormElement>, threadId: string) {
    e.preventDefault();
    setBusy(threadId);
    setError(null);
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      kind: "answer",
      threadId,
      body: String(fd.get("body") || "").trim(),
      author: String(fd.get("author") || "").trim(),
    };
    try {
      const res = await fetch("/api/qna", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(String(data.error || "답변 등록에 실패했습니다."));
        return;
      }
      form.reset();
      await refresh();
    } catch {
      setError("답변 등록에 실패했습니다.");
    } finally {
      setBusy(null);
    }
  }

  return (
    <div id="qna" className="scroll-mt-28 border-t border-slate-200 pt-12">
      <p className="text-xs font-semibold uppercase tracking-wider text-msv-blue">Q&amp;A</p>
      <h2 className="mt-2 text-lg font-bold text-msv-navy">온라인 질의응답</h2>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">
        질문을 남기시면 담당자 또는 다른 이용자가 답글을 달 수 있습니다. 긴급·법적 판단이 필요한 사항은 위 이메일로 문의해 주세요.
      </p>

      <section className="mt-10">
        <h3 className="text-sm font-medium text-slate-900">질문 등록</h3>
        <form onSubmit={submitQuestion} className="mt-4 space-y-3">
          <input
            name="title"
            required
            placeholder="제목"
            className="w-full border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400"
          />
          <input
            name="author"
            required
            placeholder="작성자"
            className="w-full border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400"
          />
          <textarea
            name="body"
            required
            rows={4}
            placeholder="질문 내용"
            className="w-full resize-y border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400"
          />
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          <button
            type="submit"
            disabled={busy === "q"}
            className="rounded-sm border border-msv-navy bg-msv-navy px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
          >
            {busy === "q" ? "등록 중…" : "질문 등록"}
          </button>
        </form>
      </section>

      <section className="mt-14">
        <h3 className="text-sm font-medium text-slate-900">질문 목록</h3>
        {threads.length === 0 ? (
          <p className="mt-4 text-sm text-slate-500">등록된 질문이 없습니다.</p>
        ) : (
          <ul className="mt-6 space-y-10">
            {threads.map((t) => (
              <li key={t.id} className="border-b border-slate-100 pb-10 last:border-0">
                <div className="flex flex-wrap items-baseline gap-2 text-xs text-slate-500">
                  <time dateTime={t.createdAt}>{new Date(t.createdAt).toLocaleString("ko-KR")}</time>
                  <span>·</span>
                  <span>{t.author}</span>
                </div>
                <p className="mt-2 text-lg font-medium text-slate-900">{t.title}</p>
                <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-slate-600">{t.body}</p>

                {t.answers.length > 0 ? (
                  <ul className="mt-6 space-y-4 border-l-2 border-msv-blue/25 pl-4">
                    {t.answers.map((a) => (
                      <li key={a.id}>
                        <div className="text-xs text-slate-500">
                          {a.author} · {new Date(a.createdAt).toLocaleString("ko-KR")}
                        </div>
                        <p className="mt-1 whitespace-pre-wrap text-sm text-slate-700">{a.body}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-4 text-sm text-slate-400">아직 답변이 없습니다.</p>
                )}

                <div className="mt-6">
                  <p className="text-xs font-medium text-slate-700">답글 달기</p>
                  <form onSubmit={(e) => void submitAnswer(e, t.id)} className="mt-2 space-y-2">
                    <input
                      name="author"
                      required
                      placeholder="작성자"
                      className="w-full max-w-xs border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400"
                    />
                    <textarea
                      name="body"
                      required
                      rows={3}
                      placeholder="답변 내용"
                      className="w-full border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400"
                    />
                    <button
                      type="submit"
                      disabled={busy === t.id}
                      className="text-sm font-medium text-msv-blue underline-offset-4 hover:underline disabled:opacity-50"
                    >
                      {busy === t.id ? "등록 중…" : "답변 등록"}
                    </button>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
