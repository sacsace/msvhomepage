"use client";

import { useCallback, useState } from "react";
import type { Article } from "@/types/article";
import { isRichTextMeaningful } from "@/lib/richtext";
import { ArticleBodyEditor } from "@/components/admin/ArticleBodyEditor";
import {
  adminBoardCard,
  adminBoardRow,
  adminBoardTd,
  adminBoardTh,
  adminDangerBtn,
  adminDetailsShell,
  adminDetailsSummary,
  adminGhostBtn,
} from "@/components/admin/admin-board-styles";

type Props = { initialItems: Article[] };

function formatListDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("ko-KR", { year: "numeric", month: "short", day: "numeric" });
  } catch {
    return iso;
  }
}

export function ArticlesManager({ initialItems }: Props) {
  const [items, setItems] = useState(initialItems);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [createEditorKey, setCreateEditorKey] = useState(0);
  const [createBody, setCreateBody] = useState("");
  const [editBody, setEditBody] = useState("");

  const reload = useCallback(async () => {
    setError(null);
    try {
      const res = await fetch("/api/admin/articles", { credentials: "same-origin" });
      if (res.status === 401) {
        window.location.href = "/admin/login";
        return;
      }
      if (!res.ok) throw new Error("fail");
      setItems(await res.json());
    } catch {
      setError("목록을 불러오지 못했습니다.");
    }
  }, []);

  async function create(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    if (!isRichTextMeaningful(createBody)) {
      setError("본문을 입력해 주세요.");
      return;
    }
    const form = e.currentTarget;
    const fd = new FormData(form);
    const res = await fetch("/api/admin/articles", {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: fd.get("title"),
        excerpt: fd.get("excerpt") || undefined,
        body: createBody,
      }),
    });
    let data: { error?: string } = {};
    try {
      data = (await res.json()) as { error?: string };
    } catch {
      data = { error: "서버 응답을 해석하지 못했습니다. 네트워크·로그인 상태를 확인해 주세요." };
    }
    if (!res.ok) {
      setError(String(data.error || "등록 실패"));
      return;
    }
    form.reset();
    setCreateBody("");
    setCreateEditorKey((k) => k + 1);
    await reload();
  }

  async function saveEdit(e: React.FormEvent<HTMLFormElement>, id: string) {
    e.preventDefault();
    setError(null);
    if (!isRichTextMeaningful(editBody)) {
      setError("본문을 비울 수 없습니다.");
      return;
    }
    const form = e.currentTarget;
    const fd = new FormData(form);
    const res = await fetch(`/api/admin/articles/${id}`, {
      method: "PATCH",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: fd.get("title"),
        excerpt: fd.get("excerpt"),
        body: editBody,
        slug: fd.get("slug") || undefined,
      }),
    });
    let data: { error?: string } = {};
    try {
      data = (await res.json()) as { error?: string };
    } catch {
      data = { error: "서버 응답을 해석하지 못했습니다." };
    }
    if (!res.ok) {
      setError(String(data.error || "저장 실패"));
      return;
    }
    setEditingId(null);
    await reload();
  }

  async function remove(id: string) {
    if (!confirm("삭제할까요?")) return;
    const res = await fetch(`/api/admin/articles/${id}`, {
      method: "DELETE",
      credentials: "same-origin",
    });
    if (!res.ok) {
      setError("삭제 실패");
      return;
    }
    await reload();
  }

  const createForm = (
    <form onSubmit={create} className="space-y-3 border-t border-zinc-100 px-4 py-4 sm:px-5 sm:py-5">
      <input
        name="title"
        required
        placeholder="제목"
        className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm outline-none transition-shadow focus:border-zinc-400 focus:ring-2 focus:ring-zinc-900/5"
      />
      <input
        name="excerpt"
        placeholder="요약 (비우면 본문 앞부분 사용)"
        className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm outline-none transition-shadow focus:border-zinc-400 focus:ring-2 focus:ring-zinc-900/5"
      />
      <ArticleBodyEditor key={`new-${createEditorKey}`} initialHtml="" onHtmlChange={setCreateBody} />
      <button
        type="submit"
        className="rounded-lg border border-zinc-900 bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800"
      >
        등록
      </button>
    </form>
  );

  return (
    <div className="space-y-6">
      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <section>
        <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
          <h2 className="text-base font-semibold tracking-tight text-zinc-900">게시판</h2>
          <p className="text-xs tabular-nums text-zinc-500">총 {items.length}건</p>
        </div>

        <details className={`${adminDetailsShell} mb-4`}>
          <summary className={adminDetailsSummary}>새 글 작성</summary>
          {createForm}
        </details>

        <div className={adminBoardCard}>
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[720px] border-collapse text-left">
              <thead>
                <tr>
                  <th className={`${adminBoardTh} w-10 text-center`}>No</th>
                  <th className={adminBoardTh}>제목</th>
                  <th className={`${adminBoardTh} w-[9rem]`}>슬러그</th>
                  <th className={adminBoardTh}>요약</th>
                  <th className={`${adminBoardTh} w-28 whitespace-nowrap`}>수정일</th>
                  <th className={`${adminBoardTh} w-28 text-right`}>관리</th>
                </tr>
              </thead>
              <tbody>
                {items.length === 0 ? (
                  <tr>
                    <td colSpan={6} className={`${adminBoardTd} py-10 text-center text-sm text-zinc-500`}>
                      등록된 글이 없습니다.
                    </td>
                  </tr>
                ) : null}
                {items.map((a, i) => {
                  const no = String(items.length - i).padStart(2, "0");
                  const excerpt = (a.excerpt || "").trim() || "—";
                  if (editingId === a.id) {
                    return (
                      <tr key={a.id} className="bg-zinc-50/70">
                        <td colSpan={6} className="border-b border-zinc-100 px-4 py-4 sm:px-5">
                          <form onSubmit={(e) => void saveEdit(e, a.id)} className="space-y-3">
                            <input
                              name="title"
                              required
                              defaultValue={a.title}
                              className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm"
                            />
                            <input
                              name="slug"
                              defaultValue={a.slug}
                              className="w-full rounded-lg border border-zinc-200 px-3 py-2 font-mono text-xs"
                            />
                            <input
                              name="excerpt"
                              defaultValue={a.excerpt}
                              className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm"
                            />
                            <ArticleBodyEditor key={a.id} initialHtml={a.body} onHtmlChange={setEditBody} />
                            <div className="flex flex-wrap gap-2">
                              <button
                                type="submit"
                                className="rounded-lg border border-zinc-900 bg-zinc-900 px-3 py-1.5 text-sm text-white"
                              >
                                저장
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingId(null);
                                  setEditBody("");
                                }}
                                className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-sm"
                              >
                                취소
                              </button>
                            </div>
                          </form>
                        </td>
                      </tr>
                    );
                  }
                  return (
                    <tr key={a.id} className={adminBoardRow}>
                      <td className={`${adminBoardTd} w-10 text-center text-xs tabular-nums text-zinc-400`}>{no}</td>
                      <td className={`${adminBoardTd} max-w-[14rem] font-medium text-zinc-900`}>
                        <span className="line-clamp-2">{a.title}</span>
                      </td>
                      <td className={`${adminBoardTd} max-w-[9rem]`}>
                        <span className="line-clamp-2 font-mono text-[11px] text-zinc-500">/{a.slug}</span>
                      </td>
                      <td className={`${adminBoardTd} max-w-[12rem] text-zinc-600`}>
                        <span className="line-clamp-2 text-xs">{excerpt}</span>
                      </td>
                      <td className={`${adminBoardTd} whitespace-nowrap text-xs tabular-nums text-zinc-500`}>
                        {formatListDate(a.updatedAt)}
                      </td>
                      <td className={`${adminBoardTd} text-right`}>
                        <div className="flex justify-end gap-1">
                          <button
                            type="button"
                            onClick={() => {
                              setError(null);
                              setEditBody(a.body);
                              setEditingId(a.id);
                            }}
                            className={adminGhostBtn}
                          >
                            수정
                          </button>
                          <button type="button" onClick={() => void remove(a.id)} className={adminDangerBtn}>
                            삭제
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <ul className="divide-y divide-zinc-100 md:hidden" role="list">
            {items.length === 0 ? (
              <li className="px-4 py-10 text-center text-sm text-zinc-500">등록된 글이 없습니다.</li>
            ) : null}
            {items.map((a, i) => {
              const no = String(items.length - i).padStart(2, "0");
              if (editingId === a.id) {
                return (
                  <li key={a.id} className="bg-zinc-50/70 p-4">
                    <form onSubmit={(e) => void saveEdit(e, a.id)} className="space-y-3">
                      <input
                        name="title"
                        required
                        defaultValue={a.title}
                        className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm"
                      />
                      <input
                        name="slug"
                        defaultValue={a.slug}
                        className="w-full rounded-lg border border-zinc-200 px-3 py-2 font-mono text-xs"
                      />
                      <input
                        name="excerpt"
                        defaultValue={a.excerpt}
                        className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm"
                      />
                      <ArticleBodyEditor key={`m-${a.id}`} initialHtml={a.body} onHtmlChange={setEditBody} />
                      <div className="flex gap-2">
                        <button
                          type="submit"
                          className="rounded-lg border border-zinc-900 bg-zinc-900 px-3 py-1.5 text-sm text-white"
                        >
                          저장
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingId(null);
                            setEditBody("");
                          }}
                          className="rounded-lg border border-zinc-200 px-3 py-1.5 text-sm"
                        >
                          취소
                        </button>
                      </div>
                    </form>
                  </li>
                );
              }
              return (
                <li key={a.id} className="px-4 py-3.5">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[11px] font-medium tabular-nums text-zinc-300">{no}</span>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-zinc-900">{a.title}</p>
                      <p className="mt-0.5 font-mono text-[11px] text-zinc-500">/{a.slug}</p>
                      <p className="mt-1 line-clamp-2 text-xs text-zinc-600">{(a.excerpt || "").trim() || "—"}</p>
                      <time className="mt-1.5 block text-[11px] tabular-nums text-zinc-400">
                        {formatListDate(a.updatedAt)}
                      </time>
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-1">
                      <button
                        type="button"
                        onClick={() => {
                          setError(null);
                          setEditBody(a.body);
                          setEditingId(a.id);
                        }}
                        className={adminGhostBtn}
                      >
                        수정
                      </button>
                      <button type="button" onClick={() => void remove(a.id)} className={adminDangerBtn}>
                        삭제
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </div>
  );
}
