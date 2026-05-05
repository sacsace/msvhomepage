"use client";

import { useCallback, useState } from "react";
import type { Article } from "@/types/article";
import { isRichTextMeaningful } from "@/lib/richtext";
import { ArticleBodyEditor } from "@/components/admin/ArticleBodyEditor";

type Props = { initialItems: Article[] };

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

  return (
    <div className="space-y-10">
      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <section className="border border-zinc-200 bg-white p-5">
        <h2 className="text-sm font-medium text-zinc-900">새 글</h2>
        <form onSubmit={create} className="mt-4 space-y-3">
          <input
            name="title"
            required
            placeholder="제목"
            className="w-full border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-zinc-400"
          />
          <input
            name="excerpt"
            placeholder="요약 (비우면 본문 앞부분 사용)"
            className="w-full border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-zinc-400"
          />
          <ArticleBodyEditor
            key={`new-${createEditorKey}`}
            initialHtml=""
            onHtmlChange={setCreateBody}
          />
          <button
            type="submit"
            className="border border-zinc-900 bg-zinc-900 px-4 py-2 text-sm text-white"
          >
            등록
          </button>
        </form>
      </section>

      <section>
        <h2 className="text-sm font-medium text-zinc-900">목록</h2>
        <ul className="mt-4 space-y-6">
          {items.map((a) => (
            <li key={a.id} className="border border-zinc-200 bg-white p-4">
              {editingId === a.id ? (
                <form onSubmit={(e) => void saveEdit(e, a.id)} className="space-y-3">
                  <input
                    name="title"
                    required
                    defaultValue={a.title}
                    className="w-full border border-zinc-200 px-3 py-2 text-sm"
                  />
                  <input
                    name="slug"
                    defaultValue={a.slug}
                    className="w-full border border-zinc-200 px-3 py-2 font-mono text-xs"
                  />
                  <input
                    name="excerpt"
                    defaultValue={a.excerpt}
                    className="w-full border border-zinc-200 px-3 py-2 text-sm"
                  />
                  <ArticleBodyEditor
                    key={a.id}
                    initialHtml={a.body}
                    onHtmlChange={setEditBody}
                  />
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="border border-zinc-900 bg-zinc-900 px-3 py-1.5 text-sm text-white"
                    >
                      저장
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingId(null);
                        setEditBody("");
                      }}
                      className="border border-zinc-200 px-3 py-1.5 text-sm"
                    >
                      취소
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <h3 className="font-medium text-zinc-900">{a.title}</h3>
                  <p className="mt-1 font-mono text-xs text-zinc-500">/{a.slug}</p>
                  <p className="mt-2 line-clamp-2 text-sm text-zinc-600">{a.excerpt}</p>
                  <div className="mt-3 flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setError(null);
                        setEditBody(a.body);
                        setEditingId(a.id);
                      }}
                      className="text-sm text-zinc-600 underline-offset-2 hover:underline"
                    >
                      수정
                    </button>
                    <button
                      type="button"
                      onClick={() => void remove(a.id)}
                      className="text-sm text-red-600 hover:underline"
                    >
                      삭제
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
