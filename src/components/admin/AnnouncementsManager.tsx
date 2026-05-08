"use client";

import { useCallback, useState } from "react";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { readRichBodyFromForm } from "@/lib/admin-read-rich-body";
import { isRichTextMeaningful, textExcerpt } from "@/lib/richtext";
import type { Announcement } from "@/types/announcement";
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

type Props = { initialItems: Announcement[] };

type FormBanner = { message: string; detail?: string };

function formatListDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("ko-KR", { year: "numeric", month: "short", day: "numeric" });
  } catch {
    return iso;
  }
}

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

  const createForm = (
    <form onSubmit={create} className="space-y-3 border-t border-zinc-100 px-4 py-4 sm:px-5 sm:py-5">
      <input
        required
        value={createTitle}
        onChange={(e) => setCreateTitle(e.target.value)}
        placeholder="제목"
        className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm outline-none transition-shadow focus:border-zinc-400 focus:ring-2 focus:ring-zinc-900/5"
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
        className="rounded-lg border border-zinc-900 bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800"
      >
        등록
      </button>
    </form>
  );

  return (
    <div className="space-y-6">
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

      <section>
        <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
          <h2 className="text-base font-semibold tracking-tight text-zinc-900">게시판</h2>
          <p className="text-xs tabular-nums text-zinc-500">총 {items.length}건</p>
        </div>

        <div className={adminBoardCard}>
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[760px] border-collapse text-left">
              <thead>
                <tr>
                  <th className={`${adminBoardTh} w-10 text-center`}>No</th>
                  <th className={`${adminBoardTh} w-20 text-center`}>고정</th>
                  <th className={adminBoardTh}>제목</th>
                  <th className={adminBoardTh}>요약</th>
                  <th className={`${adminBoardTh} w-28 whitespace-nowrap`}>수정일</th>
                  <th className={`${adminBoardTh} w-28 text-right`}>관리</th>
                </tr>
              </thead>
              <tbody>
                {items.length === 0 ? (
                  <tr>
                    <td colSpan={6} className={`${adminBoardTd} py-10 text-center text-sm text-zinc-500`}>
                      등록된 공지가 없습니다.
                    </td>
                  </tr>
                ) : null}
                {items.map((a, i) => {
                  const no = String(items.length - i).padStart(2, "0");
                  const excerpt = textExcerpt(a.body, 140);
                  if (editingId === a.id) {
                    return (
                      <tr key={a.id} className="bg-zinc-50/70">
                        <td colSpan={6} className="border-b border-zinc-100 px-4 py-4 sm:px-5">
                          <form onSubmit={(e) => void saveEdit(e, a.id)} className="space-y-3">
                            <input
                              required
                              value={editTitle}
                              onChange={(e) => setEditTitle(e.target.value)}
                              className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm"
                            />
                            <RichTextEditor value={editBody} onChange={setEditBody} minHeightClassName="min-h-[15rem]" />
                            <label className="flex items-center gap-2 text-sm">
                              <input
                                type="checkbox"
                                checked={editPinned}
                                onChange={(e) => setEditPinned(e.target.checked)}
                                className="rounded border-zinc-300"
                              />
                              상단 고정
                            </label>
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
                                  setEditTitle("");
                                  setEditBody("");
                                  setEditPinned(false);
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
                      <td className={`${adminBoardTd} w-20 text-center`}>
                        {a.pinned ? (
                          <span className="inline-block rounded-full bg-zinc-900 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                            고정
                          </span>
                        ) : (
                          <span className="text-xs text-zinc-300">—</span>
                        )}
                      </td>
                      <td className={`${adminBoardTd} max-w-[14rem] font-medium text-zinc-900`}>
                        <span className="line-clamp-2">{a.title}</span>
                      </td>
                      <td className={`${adminBoardTd} max-w-[18rem] text-zinc-600`}>
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
                              setBanner(null);
                              setEditingId(a.id);
                              setEditTitle(a.title);
                              setEditBody(a.body);
                              setEditPinned(a.pinned);
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
              <li className="px-4 py-10 text-center text-sm text-zinc-500">등록된 공지가 없습니다.</li>
            ) : null}
            {items.map((a, i) => {
              const no = String(items.length - i).padStart(2, "0");
              if (editingId === a.id) {
                return (
                  <li key={a.id} className="bg-zinc-50/70 p-4">
                    <form onSubmit={(e) => void saveEdit(e, a.id)} className="space-y-3">
                      <input
                        required
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm"
                      />
                      <RichTextEditor
                        value={editBody}
                        onChange={setEditBody}
                        minHeightClassName="min-h-[15rem]"
                      />
                      <label className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={editPinned}
                          onChange={(e) => setEditPinned(e.target.checked)}
                          className="rounded border-zinc-300"
                        />
                        상단 고정
                      </label>
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
                            setEditTitle("");
                            setEditBody("");
                            setEditPinned(false);
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
                      <div className="flex flex-wrap items-center gap-2">
                        {a.pinned ? (
                          <span className="rounded-full bg-zinc-900 px-2 py-0.5 text-[10px] font-semibold text-white">
                            고정
                          </span>
                        ) : null}
                        <time className="text-[11px] tabular-nums text-zinc-400">{formatListDate(a.updatedAt)}</time>
                      </div>
                      <p className="mt-1 font-medium text-zinc-900">{a.title}</p>
                      <p className="mt-1 line-clamp-2 text-xs text-zinc-600">{textExcerpt(a.body, 120)}</p>
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-1">
                      <button
                        type="button"
                        onClick={() => {
                          setBanner(null);
                          setEditingId(a.id);
                          setEditTitle(a.title);
                          setEditBody(a.body);
                          setEditPinned(a.pinned);
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

      <details className={adminDetailsShell}>
        <summary className={adminDetailsSummary}>새 공지 작성</summary>
        {createForm}
      </details>
    </div>
  );
}
