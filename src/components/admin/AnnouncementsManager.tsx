"use client";

import { useCallback, useState } from "react";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { readRichBodyFromForm } from "@/lib/admin-read-rich-body";
import { isRichTextMeaningful, textExcerpt } from "@/lib/richtext";
import type { Announcement } from "@/types/announcement";

type Props = { initialItems: Announcement[] };

type FormBanner = { message: string; detail?: string };

export function AnnouncementsManager({ initialItems }: Props) {
  const [items, setItems] = useState(initialItems);
  const [banner, setBanner] = useState<FormBanner | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [createTitle, setCreateTitle] = useState("");
  const [createBody, setCreateBody] = useState("");
  const [createPinned, setCreatePinned] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const [editPinned, setEditPinned] = useState(false);

  const reload = useCallback(async () => {
    setBanner(null);
    try {
      const res = await fetch("/api/admin/announcements", { credentials: "same-origin" });
      if (res.status === 401) {
        window.location.href = "/admin/login";
        return;
      }
      if (!res.ok) throw new Error("fail");
      setItems(await res.json());
    } catch {
      setBanner({ message: "목록을 불러오지 못했습니다." });
    }
  }, []);

  async function create(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const bodyHtml = readRichBodyFromForm(form);
    if (!createTitle.trim() || !isRichTextMeaningful(bodyHtml)) {
      setBanner({
        message: "제목과 본문은 필수입니다. 본문 에디터에 텍스트를 입력했는지 확인해 주세요.",
      });
      return;
    }
    const res = await fetch("/api/admin/announcements", {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: createTitle,
        body: bodyHtml,
        pinned: createPinned,
      }),
    });
    let data: { error?: string; detail?: string } = {};
    try {
      data = (await res.json()) as { error?: string; detail?: string };
    } catch {
      data = { error: "서버 응답을 해석하지 못했습니다. 네트워크·로그인 상태를 확인해 주세요." };
    }
    if (!res.ok) {
      setBanner({
        message: data.error || "등록 실패",
        ...(data.detail ? { detail: data.detail } : {}),
      });
      return;
    }
    setCreateTitle("");
    setCreateBody("");
    setCreatePinned(false);
    await reload();
  }

  async function saveEdit(e: React.FormEvent<HTMLFormElement>, id: string) {
    e.preventDefault();
    const form = e.currentTarget;
    const bodyHtml = readRichBodyFromForm(form);
    if (!editTitle.trim() || !isRichTextMeaningful(bodyHtml)) {
      setBanner({
        message: "제목과 본문은 필수입니다. 본문 에디터에 텍스트를 입력했는지 확인해 주세요.",
      });
      return;
    }
    const res = await fetch(`/api/admin/announcements/${id}`, {
      method: "PATCH",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: editTitle,
        body: bodyHtml,
        pinned: editPinned,
      }),
    });
    let data: { error?: string; detail?: string } = {};
    try {
      data = (await res.json()) as { error?: string; detail?: string };
    } catch {
      data = { error: "서버 응답을 해석하지 못했습니다." };
    }
    if (!res.ok) {
      setBanner({
        message: data.error || "저장 실패",
        ...(data.detail ? { detail: data.detail } : {}),
      });
      return;
    }
    setEditingId(null);
    setEditTitle("");
    setEditBody("");
    setEditPinned(false);
    await reload();
  }

  async function remove(id: string) {
    if (!confirm("삭제할까요?")) return;
    const res = await fetch(`/api/admin/announcements/${id}`, {
      method: "DELETE",
      credentials: "same-origin",
    });
    if (!res.ok) {
      setBanner({ message: "삭제 실패" });
      return;
    }
    await reload();
  }

  return (
    <div className="space-y-10">
      {banner ? (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50/90 px-4 py-3 text-sm text-red-900"
        >
          <p className="font-medium leading-snug">{banner.message}</p>
          {banner.detail ? (
            <details className="mt-2 text-xs leading-relaxed text-red-800/95">
              <summary className="cursor-pointer font-medium text-red-900/90 underline-offset-2 hover:underline">
                자세한 안내
              </summary>
              <p className="mt-2 border-t border-red-200/80 pt-2">{banner.detail}</p>
            </details>
          ) : null}
        </div>
      ) : null}

      <section className="border border-zinc-200 bg-white p-5">
        <h2 className="text-sm font-medium text-zinc-900">새 공지</h2>
        <form onSubmit={create} className="mt-4 space-y-3">
          <input
            required
            value={createTitle}
            onChange={(e) => setCreateTitle(e.target.value)}
            placeholder="제목"
            className="w-full border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-zinc-400"
          />
          <RichTextEditor value={createBody} onChange={setCreateBody} />
          <label className="flex items-center gap-2 text-sm text-zinc-700">
            <input
              type="checkbox"
              checked={createPinned}
              onChange={(e) => setCreatePinned(e.target.checked)}
              className="rounded border-zinc-300"
            />
            상단 고정
          </label>
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
                    required
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full border border-zinc-200 px-3 py-2 text-sm"
                  />
                  <RichTextEditor value={editBody} onChange={setEditBody} minHeightClassName="min-h-[15rem]" />
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={editPinned}
                      onChange={(e) => setEditPinned(e.target.checked)}
                      className="rounded border-zinc-300"
                    />
                    고정
                  </label>
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
                        setEditTitle("");
                        setEditBody("");
                        setEditPinned(false);
                      }}
                      className="border border-zinc-200 px-3 py-1.5 text-sm"
                    >
                      취소
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-zinc-400">
                        {a.pinned ? <span className="font-medium text-zinc-600">고정</span> : null}
                        <time dateTime={a.createdAt}>
                          {new Date(a.createdAt).toLocaleString("ko-KR")}
                        </time>
                      </div>
                      <h3 className="mt-1 font-medium text-zinc-900">{a.title}</h3>
                      <p className="mt-2 line-clamp-3 text-sm text-zinc-600">{textExcerpt(a.body, 180)}</p>
                    </div>
                    <div className="flex shrink-0 gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingId(a.id);
                          setEditTitle(a.title);
                          setEditBody(a.body);
                          setEditPinned(a.pinned);
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
                  </div>
                  <p className="mt-2 text-xs text-zinc-400">ID: {a.id}</p>
                </>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
