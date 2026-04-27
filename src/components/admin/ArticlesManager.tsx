"use client";

import { useCallback, useState } from "react";
import type { Article } from "@/types/article";

type Props = { initialItems: Article[] };

export function ArticlesManager({ initialItems }: Props) {
  const [items, setItems] = useState(initialItems);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setError(null);
    try {
      const res = await fetch("/api/admin/articles");
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
    const form = e.currentTarget;
    const fd = new FormData(form);
    const res = await fetch("/api/admin/articles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: fd.get("title"),
        excerpt: fd.get("excerpt") || undefined,
        body: fd.get("body"),
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(String(data.error || "등록 실패"));
      return;
    }
    form.reset();
    await reload();
  }

  async function saveEdit(e: React.FormEvent<HTMLFormElement>, id: string) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const res = await fetch(`/api/admin/articles/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: fd.get("title"),
        excerpt: fd.get("excerpt"),
        body: fd.get("body"),
        slug: fd.get("slug") || undefined,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(String(data.error || "저장 실패"));
      return;
    }
    setEditingId(null);
    await reload();
  }

  async function remove(id: string) {
    if (!confirm("삭제할까요?")) return;
    const res = await fetch(`/api/admin/articles/${id}`, { method: "DELETE" });
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
          <textarea
            name="body"
            required
            rows={8}
            placeholder="본문"
            className="w-full border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-zinc-400"
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
                  <textarea
                    name="body"
                    required
                    rows={8}
                    defaultValue={a.body}
                    className="w-full border border-zinc-200 px-3 py-2 text-sm"
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
                      onClick={() => setEditingId(null)}
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
                      onClick={() => setEditingId(a.id)}
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
