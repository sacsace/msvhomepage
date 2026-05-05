"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import type { StaffProfile } from "@/types/staff-profile";

type Props = { initialItems: StaffProfile[] };

export function StaffProfilesManager({ initialItems }: Props) {
  const [items, setItems] = useState(initialItems);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loadingKey, setLoadingKey] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setError(null);
    const res = await fetch("/api/admin/staff-profiles", { cache: "no-store" });
    if (res.status === 401) {
      window.location.href = "/admin/login";
      return;
    }
    if (!res.ok) {
      setError("목록을 불러오지 못했습니다.");
      return;
    }
    setItems(await res.json());
  }, []);

  async function create(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const photoFile = fd.get("photo");
    const res = await fetch("/api/admin/staff-profiles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: fd.get("name"),
        role: fd.get("role"),
        email: fd.get("email"),
        intro: fd.get("intro"),
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(String(data.error || "등록 실패"));
      return;
    }
    if (photoFile instanceof File && photoFile.size > 0) {
      setLoadingKey("create-photo");
      try {
        const pfd = new FormData();
        pfd.set("id", String(data.id || ""));
        pfd.set("file", photoFile);
        const pRes = await fetch("/api/admin/staff-profiles/photo", { method: "POST", body: pfd });
        const pData = await pRes.json();
        if (!pRes.ok) {
          setError(`직원은 등록되었지만 사진 업로드에 실패했습니다: ${String(pData.error || "업로드 실패")}`);
        }
      } finally {
        setLoadingKey(null);
      }
    }
    form.reset();
    await reload();
  }

  async function save(e: React.FormEvent<HTMLFormElement>, id: string) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const res = await fetch(`/api/admin/staff-profiles/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: fd.get("name"),
        role: fd.get("role"),
        email: fd.get("email"),
        intro: fd.get("intro"),
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
    const res = await fetch(`/api/admin/staff-profiles/${id}`, { method: "DELETE" });
    if (!res.ok) {
      setError("삭제 실패");
      return;
    }
    await reload();
  }

  async function uploadPhoto(id: string, file: File | null) {
    if (!file?.size) {
      setError("파일을 선택해 주세요.");
      return;
    }
    setError(null);
    setLoadingKey(`photo:${id}`);
    try {
      const fd = new FormData();
      fd.set("id", id);
      fd.set("file", file);
      const res = await fetch("/api/admin/staff-profiles/photo", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) {
        setError(String(data.error || "업로드 실패"));
        return;
      }
      await reload();
    } finally {
      setLoadingKey(null);
    }
  }

  async function clearPhoto(id: string) {
    if (!confirm("업로드한 직원 사진을 삭제할까요?")) return;
    setError(null);
    setLoadingKey(`photo:${id}`);
    try {
      const res = await fetch("/api/admin/staff-profiles/photo", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(String(data.error || "삭제 실패"));
        return;
      }
      await reload();
    } finally {
      setLoadingKey(null);
    }
  }

  return (
    <div className="space-y-10">
      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <section className="border border-zinc-200 bg-white p-5">
        <h2 className="text-sm font-medium text-zinc-900">직원 추가</h2>
        <form onSubmit={create} className="mt-4 space-y-3">
          <input name="name" required placeholder="이름" className="w-full border border-zinc-200 px-3 py-2 text-sm" />
          <label className="block text-sm text-zinc-700">
            담당 부서
            <input
              name="role"
              required
              placeholder="예: 회계, 인사, 총무"
              className="mt-1 block w-full border border-zinc-200 px-3 py-2 text-sm"
            />
          </label>
          <input name="email" placeholder="이메일 (선택)" className="w-full border border-zinc-200 px-3 py-2 text-sm" />
          <textarea
            name="intro"
            required
            rows={4}
            placeholder="소개"
            className="w-full border border-zinc-200 px-3 py-2 text-sm"
          />
          <label className="block text-sm text-zinc-700">
            사진 (선택)
            <input
              name="photo"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="mt-1 block w-full text-sm text-zinc-700 file:mr-3 file:rounded file:border file:border-zinc-300 file:bg-white file:px-3 file:py-1.5 file:text-sm hover:file:bg-zinc-50"
            />
          </label>
          <button type="submit" className="border border-zinc-900 bg-zinc-900 px-4 py-2 text-sm text-white">
            {loadingKey === "create-photo" ? "사진 처리 중…" : "등록"}
          </button>
        </form>
      </section>

      <section>
        <h2 className="text-sm font-medium text-zinc-900">직원 목록</h2>
        <ul className="mt-4 space-y-6">
          {items.map((s) => (
            <li key={s.id} className="border border-zinc-200 bg-white p-4 sm:flex sm:items-start sm:gap-6">
              <div className="relative mx-auto h-24 w-24 shrink-0 overflow-hidden rounded-full border border-zinc-200 bg-zinc-50 sm:mx-0">
                {s.photoSrc ? (
                  <Image src={s.photoSrc} alt={s.name} fill className="object-cover object-top" sizes="96px" />
                ) : (
                  <span className="flex h-full w-full items-center justify-center text-xs text-zinc-400">없음</span>
                )}
              </div>
              <div className="mt-4 min-w-0 flex-1 sm:mt-0">
                {editingId === s.id ? (
                  <form onSubmit={(e) => void save(e, s.id)} className="space-y-3">
                    <input name="name" required defaultValue={s.name} className="w-full border border-zinc-200 px-3 py-2 text-sm" />
                    <label className="block text-sm text-zinc-700">
                      담당 부서
                      <input
                        name="role"
                        required
                        defaultValue={s.role}
                        placeholder="예: 회계, 인사, 총무"
                        className="mt-1 block w-full border border-zinc-200 px-3 py-2 text-sm"
                      />
                    </label>
                    <input
                      name="email"
                      defaultValue={s.email || ""}
                      placeholder="이메일 (선택)"
                      className="w-full border border-zinc-200 px-3 py-2 text-sm"
                    />
                    <textarea
                      name="intro"
                      required
                      rows={4}
                      defaultValue={s.intro}
                      className="w-full border border-zinc-200 px-3 py-2 text-sm"
                    />
                    <div className="flex gap-2">
                      <button type="submit" className="border border-zinc-900 bg-zinc-900 px-3 py-1.5 text-sm text-white">
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
                    <p className="text-xs font-medium text-zinc-500">담당 부서</p>
                    <p className="text-sm font-semibold text-zinc-700">{s.role}</p>
                    <p className="mt-1 font-medium text-zinc-900">{s.name}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <label className="inline-flex cursor-pointer rounded border border-zinc-300 bg-white px-3 py-1.5 text-sm text-zinc-800 hover:bg-zinc-50">
                        <span>{loadingKey === `photo:${s.id}` ? "처리 중…" : "사진 올리기"}</span>
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          className="sr-only"
                          disabled={loadingKey !== null}
                          onChange={(e) => {
                            const f = e.target.files?.[0];
                            e.target.value = "";
                            if (f) void uploadPhoto(s.id, f);
                          }}
                        />
                      </label>
                      <button
                        type="button"
                        disabled={loadingKey !== null}
                        onClick={() => void clearPhoto(s.id)}
                        className="rounded border border-zinc-300 px-3 py-1.5 text-sm text-zinc-700 hover:bg-zinc-50 disabled:opacity-50"
                      >
                        사진 삭제
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingId(s.id)}
                        className="text-sm text-zinc-600 underline-offset-2 hover:underline"
                      >
                        수정
                      </button>
                      <button
                        type="button"
                        onClick={() => void remove(s.id)}
                        className="text-sm text-red-600 hover:underline"
                      >
                        삭제
                      </button>
                    </div>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
