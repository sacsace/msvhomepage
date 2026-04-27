"use client";

import { useCallback, useState } from "react";
import type { Client } from "@/types/client";

type Props = { initialItems: Client[] };

async function uploadLogo(clientId: string, file: File): Promise<{ ok: boolean; error?: string }> {
  const ufd = new FormData();
  ufd.set("file", file);
  const res = await fetch(`/api/admin/clients/${clientId}/logo`, {
    method: "POST",
    body: ufd,
  });
  const data = (await res.json()) as { error?: string };
  if (!res.ok) return { ok: false, error: String(data.error || "업로드 실패") };
  return { ok: true };
}

async function removeLogo(clientId: string): Promise<{ ok: boolean; error?: string }> {
  const res = await fetch(`/api/admin/clients/${clientId}/logo`, { method: "DELETE" });
  const data = (await res.json()) as { error?: string };
  if (!res.ok) return { ok: false, error: String(data.error || "삭제 실패") };
  return { ok: true };
}

export function ClientsManager({ initialItems }: Props) {
  const [items, setItems] = useState(initialItems);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setError(null);
    try {
      const res = await fetch("/api/admin/clients");
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
    const logoFile = fd.get("logo");
    const res = await fetch("/api/admin/clients", {
      method: "POST",
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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: fd.get("name"),
        sector: fd.get("sector"),
        website: fd.get("website"),
        note: fd.get("note"),
        sortOrder: fd.get("sortOrder") ? Number(fd.get("sortOrder")) : 0,
        logoSrc: String(fd.get("logoSrc") ?? "").trim(),
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
    const res = await fetch(`/api/admin/clients/${id}`, { method: "DELETE" });
    if (!res.ok) {
      setError("삭제 실패");
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

  return (
    <div className="space-y-10">
      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <section className="border border-zinc-200 bg-white p-5">
        <h2 className="text-sm font-medium text-zinc-900">고객사 추가</h2>
        <form onSubmit={(e) => void create(e)} className="mt-4 grid gap-3 sm:grid-cols-2">
          <input
            name="name"
            required
            placeholder="고객사명 *"
            className="border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-zinc-400 sm:col-span-2"
          />
          <input
            name="sector"
            placeholder="산업·분야 (선택)"
            className="border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-zinc-400"
          />
          <input
            name="website"
            placeholder="웹사이트 URL (선택)"
            className="border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-zinc-400"
          />
          <input
            name="sortOrder"
            type="number"
            placeholder="정렬 순서 (숫자 작을수록 앞)"
            className="border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-zinc-400"
          />
          <label className="flex flex-col gap-1 sm:col-span-2">
            <span className="text-xs font-medium text-zinc-600">로고 이미지 (선택) — JPEG, PNG, WebP, SVG, 5MB 이하</span>
            <input
              name="logo"
              type="file"
              accept="image/jpeg,image/png,image/webp,image/svg+xml"
              className="text-sm text-zinc-700 file:mr-3 file:rounded file:border-0 file:bg-zinc-100 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-zinc-800"
            />
          </label>
          <textarea
            name="note"
            rows={2}
            placeholder="비고 (선택)"
            className="border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-zinc-400 sm:col-span-2"
          />
          <button
            type="submit"
            className="rounded bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 sm:col-span-2"
          >
            등록
          </button>
        </form>
      </section>

      <section>
        <h2 className="text-sm font-medium text-zinc-900">등록된 고객사</h2>
        <ul className="mt-4 space-y-4">
          {items.length === 0 ? (
            <li className="text-sm text-zinc-500">등록된 고객사가 없습니다.</li>
          ) : (
            items
              .slice()
              .sort((a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name, "ko"))
              .map((c) => (
                <li key={c.id} className="border border-zinc-200 bg-white p-4">
                  {editingId === c.id ? (
                    <form onSubmit={(e) => void saveEdit(e, c.id)} className="space-y-3">
                      <input
                        name="name"
                        required
                        defaultValue={c.name}
                        className="w-full border border-zinc-200 px-3 py-2 text-sm"
                      />
                      <input
                        name="sector"
                        defaultValue={c.sector ?? ""}
                        placeholder="산업"
                        className="w-full border border-zinc-200 px-3 py-2 text-sm"
                      />
                      <input
                        name="website"
                        defaultValue={c.website ?? ""}
                        placeholder="웹사이트"
                        className="w-full border border-zinc-200 px-3 py-2 text-sm"
                      />
                      <input
                        name="sortOrder"
                        type="number"
                        defaultValue={c.sortOrder}
                        className="w-full border border-zinc-200 px-3 py-2 text-sm"
                      />
                      <input
                        name="logoSrc"
                        defaultValue={c.logoSrc ?? ""}
                        placeholder="로고 URL (선택, https://… 또는 업로드 후 자동 경로)"
                        className="w-full border border-zinc-200 px-3 py-2 text-sm"
                      />
                      <label className="flex flex-col gap-1">
                        <span className="text-xs font-medium text-zinc-600">로고 파일 교체 (선택)</span>
                        <input
                          name="logo"
                          type="file"
                          accept="image/jpeg,image/png,image/webp,image/svg+xml"
                          className="text-sm text-zinc-700 file:mr-3 file:rounded file:border-0 file:bg-zinc-100 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-zinc-800"
                        />
                      </label>
                      <textarea
                        name="note"
                        rows={2}
                        defaultValue={c.note ?? ""}
                        className="w-full border border-zinc-200 px-3 py-2 text-sm"
                      />
                      <div className="flex flex-wrap gap-2">
                        <button type="submit" className="rounded bg-zinc-900 px-3 py-1.5 text-sm text-white">
                          저장
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingId(null)}
                          className="rounded border border-zinc-300 px-3 py-1.5 text-sm"
                        >
                          취소
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="flex min-w-0 flex-1 gap-3">
                        {c.logoSrc ? (
                          <div className="flex h-16 w-28 shrink-0 items-center justify-center rounded border border-zinc-200 bg-zinc-50 p-1">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={c.logoSrc}
                              alt={`${c.name} 로고`}
                              className="max-h-14 max-w-full object-contain"
                            />
                          </div>
                        ) : null}
                        <div className="min-w-0">
                          <p className="font-medium text-zinc-900">{c.name}</p>
                          {c.sector ? <p className="mt-1 text-sm text-zinc-600">{c.sector}</p> : null}
                          {c.website ? (
                            <a
                              href={c.website}
                              className="mt-1 block text-sm text-blue-600 hover:underline"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {c.website}
                            </a>
                          ) : null}
                          {c.note ? <p className="mt-2 text-sm text-zinc-500">{c.note}</p> : null}
                          <p className="mt-2 text-xs text-zinc-400">순서: {c.sortOrder}</p>
                        </div>
                      </div>
                      <div className="flex shrink-0 flex-wrap gap-2">
                        {c.logoSrc ? (
                          <button
                            type="button"
                            onClick={() => void clearLogoOnly(c.id)}
                            className="rounded border border-zinc-300 px-2 py-1 text-xs text-zinc-700"
                          >
                            로고 제거
                          </button>
                        ) : null}
                        <button
                          type="button"
                          onClick={() => setEditingId(c.id)}
                          className="rounded border border-zinc-300 px-2 py-1 text-xs"
                        >
                          수정
                        </button>
                        <button
                          type="button"
                          onClick={() => void remove(c.id)}
                          className="rounded border border-red-200 px-2 py-1 text-xs text-red-700"
                        >
                          삭제
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              ))
          )}
        </ul>
      </section>
    </div>
  );
}
