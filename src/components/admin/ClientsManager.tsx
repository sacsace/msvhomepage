"use client";

import { useCallback, useMemo, useState } from "react";
import type { Client } from "@/types/client";
import { sortClientsPublic } from "@/lib/clients-sort";
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

type Props = { initialItems: Client[] };

async function uploadLogo(clientId: string, file: File): Promise<{ ok: boolean; error?: string }> {
  const ufd = new FormData();
  ufd.set("file", file);
  const res = await fetch(`/api/admin/clients/${clientId}/logo`, {
    method: "POST",
    credentials: "same-origin",
    body: ufd,
  });
  const data = (await res.json()) as { error?: string };
  if (!res.ok) return { ok: false, error: String(data.error || "업로드 실패") };
  return { ok: true };
}

async function removeLogo(clientId: string): Promise<{ ok: boolean; error?: string }> {
  const res = await fetch(`/api/admin/clients/${clientId}/logo`, {
    method: "DELETE",
    credentials: "same-origin",
  });
  const data = (await res.json()) as { error?: string };
  if (!res.ok) return { ok: false, error: String(data.error || "삭제 실패") };
  return { ok: true };
}

function displaySort(a: Client, b: Client) {
  return a.sortOrder - b.sortOrder || a.name.localeCompare(b.name, "ko");
}

export function ClientsManager({ initialItems }: Props) {
  const [items, setItems] = useState(initialItems);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const displayItems = useMemo(() => [...items].sort(displaySort), [items]);

  const reload = useCallback(async () => {
    setError(null);
    try {
      const res = await fetch("/api/admin/clients", { credentials: "same-origin" });
      if (res.status === 401) {
        window.location.href = "/admin/login";
        return;
      }
      if (!res.ok) throw new Error("fail");
      const raw = (await res.json()) as Client[];
      setItems(sortClientsPublic(raw));
    } catch {
      setError("목록을 불러오지 못했습니다.");
    }
  }, []);

  async function create(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const logoFile = fd.get("logo");
    const res = await fetch("/api/admin/clients", {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: fd.get("name"),
        sector: fd.get("sector"),
        website: fd.get("website"),
        note: fd.get("note"),
        sortOrder: fd.get("sortOrder") ? Number(fd.get("sortOrder")) : undefined,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(String(data.error || "등록 실패"));
      return;
    }
    const newClient = data as Client;
    if (logoFile instanceof File && logoFile.size > 0) {
      const up = await uploadLogo(newClient.id, logoFile);
      if (!up.ok) {
        setError(up.error || "로고 업로드 실패(고객사는 등록됨)");
        form.reset();
        await reload();
        return;
      }
    }
    form.reset();
    await reload();
  }

  async function saveEdit(e: React.FormEvent<HTMLFormElement>, id: string) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const logoFile = fd.get("logo");
    const res = await fetch(`/api/admin/clients/${id}`, {
      method: "PATCH",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: fd.get("name"),
        sector: fd.get("sector"),
        website: fd.get("website"),
        note: fd.get("note"),
        sortOrder: fd.get("sortOrder") ? Number(fd.get("sortOrder")) : 0,
        logoSrc: String(fd.get("logoSrc") ?? "").trim(),
        showOnHome: fd.get("showOnHome") === "on",
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(String(data.error || "저장 실패"));
      return;
    }
    if (logoFile instanceof File && logoFile.size > 0) {
      const up = await uploadLogo(id, logoFile);
      if (!up.ok) {
        setError(up.error || "로고 업로드 실패(나머지 정보는 저장됨)");
        setEditingId(null);
        await reload();
        return;
      }
    }
    setEditingId(null);
    await reload();
  }

  async function remove(id: string) {
    if (!confirm("삭제할까요?")) return;
    const res = await fetch(`/api/admin/clients/${id}`, {
      method: "DELETE",
      credentials: "same-origin",
    });
    if (!res.ok) {
      setError("삭제 실패");
      return;
    }
    await reload();
  }

  async function toggleShowOnHome(id: string, checked: boolean) {
    const cur = items.find((i) => i.id === id);
    if (!cur) return;
    if (checked && !cur.showOnHome) {
      const n = items.filter((i) => i.showOnHome).length;
      if (n >= 12) {
        setError("메인 화면 표시는 최대 12개까지입니다.");
        return;
      }
    }
    setError(null);
    const res = await fetch(`/api/admin/clients/${id}`, {
      method: "PATCH",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ showOnHome: checked }),
    });
    const data = (await res.json()) as { error?: string };
    if (!res.ok) {
      setError(String(data.error || "저장 실패"));
      return;
    }
    await reload();
  }

  async function clearLogoOnly(id: string) {
    if (!confirm("등록된 로고를 제거할까요?")) return;
    setError(null);
    const r = await removeLogo(id);
    if (!r.ok) {
      setError(r.error || "로고 제거 실패");
      return;
    }
    await reload();
  }

  const homeCount = items.filter((c) => c.showOnHome).length;

  const createForm = (
    <form onSubmit={(e) => void create(e)} className="grid gap-3 border-t border-zinc-100 px-4 py-4 sm:grid-cols-2 sm:px-5 sm:py-5">
      <input
        name="name"
        required
        placeholder="고객사명 *"
        className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm outline-none transition-shadow focus:border-zinc-400 focus:ring-2 focus:ring-zinc-900/5 sm:col-span-2"
      />
      <input
        name="sector"
        placeholder="산업·분야 (선택)"
        className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm outline-none transition-shadow focus:border-zinc-400 focus:ring-2 focus:ring-zinc-900/5"
      />
      <input
        name="website"
        placeholder="웹사이트 URL (선택)"
        className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm outline-none transition-shadow focus:border-zinc-400 focus:ring-2 focus:ring-zinc-900/5"
      />
      <input
        name="sortOrder"
        type="number"
        placeholder="정렬 순서 (숫자 작을수록 앞)"
        className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm outline-none transition-shadow focus:border-zinc-400 focus:ring-2 focus:ring-zinc-900/5"
      />
      <label className="flex flex-col gap-1 sm:col-span-2">
        <span className="text-xs font-medium text-zinc-600">로고 이미지 (선택) — JPEG, PNG, WebP, SVG, 5MB 이하</span>
        <input
          name="logo"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/svg+xml"
          className="text-sm text-zinc-700 file:mr-3 file:rounded-lg file:border-0 file:bg-zinc-100 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-zinc-800"
        />
      </label>
      <textarea
        name="note"
        rows={2}
        placeholder="비고 (선택)"
        className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm outline-none transition-shadow focus:border-zinc-400 focus:ring-2 focus:ring-zinc-900/5 sm:col-span-2"
      />
      <button
        type="submit"
        className="rounded-lg border border-zinc-900 bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800 sm:col-span-2"
      >
        등록
      </button>
    </form>
  );

  const editForm = (c: Client) => (
    <form onSubmit={(e) => void saveEdit(e, c.id)} className="space-y-3">
      <input
        name="name"
        required
        defaultValue={c.name}
        className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm"
      />
      <input
        name="sector"
        defaultValue={c.sector ?? ""}
        placeholder="산업"
        className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm"
      />
      <input
        name="website"
        defaultValue={c.website ?? ""}
        placeholder="웹사이트"
        className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm"
      />
      <input
        name="sortOrder"
        type="number"
        defaultValue={c.sortOrder}
        className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm"
      />
      <input
        name="logoSrc"
        defaultValue={c.logoSrc ?? ""}
        placeholder="로고 URL (선택, https://… 또는 업로드 후 자동 경로)"
        className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm"
      />
      <label className="flex flex-col gap-1">
        <span className="text-xs font-medium text-zinc-600">로고 파일 교체 (선택)</span>
        <input
          name="logo"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/svg+xml"
          className="text-sm text-zinc-700 file:mr-3 file:rounded-lg file:border-0 file:bg-zinc-100 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-zinc-800"
        />
      </label>
      <textarea
        name="note"
        rows={2}
        defaultValue={c.note ?? ""}
        className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm"
      />
      <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-800">
        <input name="showOnHome" type="checkbox" defaultChecked={Boolean(c.showOnHome)} className="size-4" />
        메인 화면에 표시 (최대 12개)
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
          onClick={() => setEditingId(null)}
          className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-sm"
        >
          취소
        </button>
      </div>
    </form>
  );

  return (
    <div className="space-y-6">
      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <section>
        <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
          <h2 className="text-base font-semibold tracking-tight text-zinc-900">게시판</h2>
          <p className="text-xs tabular-nums text-zinc-500">
            총 {displayItems.length}건 · 메인 <span className="font-medium text-zinc-700">{homeCount}</span>/12
          </p>
        </div>
        <div className={adminBoardCard}>
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[880px] border-collapse text-left">
              <thead>
                <tr>
                  <th className={`${adminBoardTh} w-10 text-center`}>No</th>
                  <th className={`${adminBoardTh} w-[4.5rem]`}>로고</th>
                  <th className={adminBoardTh}>고객사</th>
                  <th className={`${adminBoardTh} max-w-[10rem]`}>분야</th>
                  <th className={`${adminBoardTh} w-24 text-center`}>메인</th>
                  <th className={`${adminBoardTh} w-14 text-center`}>순서</th>
                  <th className={`${adminBoardTh} w-36 text-right`}>관리</th>
                </tr>
              </thead>
              <tbody>
                {displayItems.length === 0 ? (
                  <tr>
                    <td colSpan={7} className={`${adminBoardTd} py-10 text-center text-sm text-zinc-500`}>
                      등록된 고객사가 없습니다.
                    </td>
                  </tr>
                ) : null}
                {displayItems.map((c, i) => {
                  const no = String(i + 1).padStart(2, "0");
                  if (editingId === c.id) {
                    return (
                      <tr key={c.id} className="bg-zinc-50/70">
                        <td colSpan={7} className="border-b border-zinc-100 px-4 py-4 sm:px-5">
                          {editForm(c)}
                        </td>
                      </tr>
                    );
                  }
                  return (
                    <tr key={c.id} className={adminBoardRow}>
                      <td className={`${adminBoardTd} w-10 text-center text-xs tabular-nums text-zinc-400`}>{no}</td>
                      <td className={`${adminBoardTd} w-[4.5rem]`}>
                        {c.logoSrc ? (
                          <div className="flex h-11 w-14 items-center justify-center rounded-lg border border-zinc-100 bg-zinc-50/80 p-0.5">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={c.logoSrc} alt="" className="max-h-9 max-w-full object-contain" />
                          </div>
                        ) : (
                          <span className="text-xs text-zinc-300">—</span>
                        )}
                      </td>
                      <td className={`${adminBoardTd} min-w-[8rem] font-medium text-zinc-900`}>
                        <span className="line-clamp-2">{c.name}</span>
                        {c.website ? (
                          <a
                            href={c.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-0.5 block truncate text-[11px] font-normal text-blue-600 hover:underline"
                          >
                            {c.website}
                          </a>
                        ) : null}
                      </td>
                      <td className={`${adminBoardTd} max-w-[10rem] text-zinc-600`}>
                        <span className="line-clamp-2 text-xs">{(c.sector || "").trim() || "—"}</span>
                      </td>
                      <td className={`${adminBoardTd} text-center`}>
                        <div className="flex flex-col items-center gap-1">
                          {c.showOnHome ? (
                            <span className="inline-block rounded-full bg-zinc-900 px-2 py-0.5 text-[10px] font-semibold text-white">
                              ON
                            </span>
                          ) : null}
                          <label className="flex cursor-pointer items-center justify-center gap-1.5">
                            <input
                              type="checkbox"
                              checked={Boolean(c.showOnHome)}
                              disabled={!c.showOnHome && homeCount >= 12}
                              onChange={(e) => void toggleShowOnHome(c.id, e.target.checked)}
                              className="size-3.5 rounded border-zinc-300 disabled:cursor-not-allowed disabled:opacity-40"
                              title="메인 화면 표시"
                            />
                          </label>
                        </div>
                      </td>
                      <td className={`${adminBoardTd} text-center text-xs tabular-nums text-zinc-500`}>{c.sortOrder}</td>
                      <td className={`${adminBoardTd} text-right`}>
                        <div className="flex flex-col items-end gap-1 sm:flex-row sm:justify-end sm:gap-1">
                          {c.logoSrc ? (
                            <button
                              type="button"
                              onClick={() => void clearLogoOnly(c.id)}
                              className={adminGhostBtn}
                            >
                              로고 제거
                            </button>
                          ) : null}
                          <button
                            type="button"
                            onClick={() => {
                              setError(null);
                              setEditingId(c.id);
                            }}
                            className={adminGhostBtn}
                          >
                            수정
                          </button>
                          <button type="button" onClick={() => void remove(c.id)} className={adminDangerBtn}>
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
            {displayItems.length === 0 ? (
              <li className="px-4 py-10 text-center text-sm text-zinc-500">등록된 고객사가 없습니다.</li>
            ) : null}
            {displayItems.map((c, i) => {
              const no = String(i + 1).padStart(2, "0");
              if (editingId === c.id) {
                return (
                  <li key={c.id} className="bg-zinc-50/70 p-4">
                    {editForm(c)}
                  </li>
                );
              }
              return (
                <li key={c.id} className="px-4 py-3.5">
                  <div className="flex gap-3">
                    <span className="text-[11px] font-medium tabular-nums text-zinc-300">{no}</span>
                    {c.logoSrc ? (
                      <div className="flex h-14 w-20 shrink-0 items-center justify-center rounded-lg border border-zinc-100 bg-zinc-50 p-1">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={c.logoSrc} alt="" className="max-h-12 max-w-full object-contain" />
                      </div>
                    ) : null}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-medium text-zinc-900">{c.name}</p>
                        {c.showOnHome ? (
                          <span className="rounded-full bg-zinc-900 px-2 py-0.5 text-[10px] font-semibold text-white">
                            메인
                          </span>
                        ) : null}
                        <span className="text-[11px] tabular-nums text-zinc-400">순서 {c.sortOrder}</span>
                      </div>
                      <label className="mt-1.5 flex cursor-pointer items-center gap-2 text-xs text-zinc-600">
                        <input
                          type="checkbox"
                          checked={Boolean(c.showOnHome)}
                          disabled={!c.showOnHome && homeCount >= 12}
                          onChange={(e) => void toggleShowOnHome(c.id, e.target.checked)}
                          className="size-4 rounded border-zinc-300 disabled:cursor-not-allowed disabled:opacity-40"
                        />
                        메인 화면
                      </label>
                      {c.sector ? <p className="mt-1 text-xs text-zinc-600">{c.sector}</p> : null}
                      {c.website ? (
                        <a
                          href={c.website}
                          className="mt-1 block truncate text-xs text-blue-600 hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {c.website}
                        </a>
                      ) : null}
                      {c.note ? <p className="mt-1 line-clamp-2 text-xs text-zinc-500">{c.note}</p> : null}
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-1">
                      {c.logoSrc ? (
                        <button type="button" onClick={() => void clearLogoOnly(c.id)} className={adminGhostBtn}>
                          로고 제거
                        </button>
                      ) : null}
                      <button
                        type="button"
                        onClick={() => {
                          setError(null);
                          setEditingId(c.id);
                        }}
                        className={adminGhostBtn}
                      >
                        수정
                      </button>
                      <button type="button" onClick={() => void remove(c.id)} className={adminDangerBtn}>
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
        <summary className={adminDetailsSummary}>고객사 추가</summary>
        {createForm}
      </details>
    </div>
  );
}
