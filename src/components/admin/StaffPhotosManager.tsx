"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { LeadershipMember } from "@/types/leadership";

type Props = { initialMembers: LeadershipMember[] };

export function StaffPhotosManager({ initialMembers }: Props) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loadingKey, setLoadingKey] = useState<string | null>(null);
  const [summaries, setSummaries] = useState<Record<string, string>>(
    Object.fromEntries(initialMembers.map((m) => [m.email.toLowerCase(), m.summary])),
  );

  async function upload(email: string, file: File | null) {
    if (!file?.size) {
      setError("파일을 선택해 주세요.");
      return;
    }
    setError(null);
    setLoadingKey(`photo:${email}`);
    try {
      const fd = new FormData();
      fd.set("email", email);
      fd.set("file", file);
      const res = await fetch("/api/admin/staff-photos", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) {
        setError(String(data.error || "업로드 실패"));
        return;
      }
      router.refresh();
    } catch {
      setError("업로드 중 오류가 발생했습니다.");
    } finally {
      setLoadingKey(null);
    }
  }

  async function clearPhoto(email: string) {
    if (!confirm("관리자에 등록된 사진만 삭제합니다. site-content 기본 사진이 있으면 그대로 보일 수 있습니다.")) return;
    setError(null);
    setLoadingKey(`photo:${email}`);
    try {
      const res = await fetch("/api/admin/staff-photos", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(String(data.error || "삭제 실패"));
        return;
      }
      router.refresh();
    } catch {
      setError("삭제 중 오류가 발생했습니다.");
    } finally {
      setLoadingKey(null);
    }
  }

  async function saveSummary(email: string) {
    setError(null);
    setLoadingKey(`summary:${email}`);
    try {
      const summary = summaries[email.toLowerCase()] ?? "";
      const res = await fetch("/api/admin/leadership-summaries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, summary }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(String(data.error || "소개 저장 실패"));
        return;
      }
      router.refresh();
    } catch {
      setError("소개 저장 중 오류가 발생했습니다.");
    } finally {
      setLoadingKey(null);
    }
  }

  return (
    <div className="space-y-8">
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <p className="text-sm text-zinc-600">
        JPEG / PNG / WebP, 최대 5MB. 업로드 시 <code className="rounded bg-zinc-100 px-1">data/staff-photos.json</code>에
        경로가 저장되고 파일은 <code className="rounded bg-zinc-100 px-1">public/uploads/team/</code>에 저장됩니다.
        인사말 본문은 <code className="rounded bg-zinc-100 px-1">data/leadership-summaries.json</code>에 저장되며
        회사 소개 페이지 인사말 카드에 즉시 반영됩니다.
      </p>
      <ul className="space-y-6">
        {initialMembers.map((m) => (
          <li key={m.email} className="border border-zinc-200 bg-white p-4 sm:flex sm:items-start sm:gap-6">
            <div className="relative mx-auto h-24 w-24 shrink-0 overflow-hidden rounded-full border border-zinc-200 bg-zinc-50 sm:mx-0">
              {m.photoSrc ? (
                <Image src={m.photoSrc} alt={m.name} fill className="object-cover object-top" sizes="96px" />
              ) : (
                <span className="flex h-full w-full items-center justify-center text-xs text-zinc-400">없음</span>
              )}
            </div>
            <div className="mt-4 min-w-0 flex-1 sm:mt-0">
              <p className="text-xs font-medium text-zinc-500">{m.role}</p>
              <p className="font-medium text-zinc-900">{m.name}</p>
              <p className="mt-0.5 text-sm text-zinc-600">{m.email}</p>
              {m.photoSrc ? (
                <p className="mt-2 break-all text-xs text-zinc-400">{m.photoSrc}</p>
              ) : null}
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <label className="inline-flex cursor-pointer rounded border border-zinc-300 bg-white px-3 py-1.5 text-sm text-zinc-800 hover:bg-zinc-50">
                  <span>{loadingKey === `photo:${m.email}` ? "처리 중…" : "사진 올리기"}</span>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="sr-only"
                    disabled={loadingKey !== null}
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      e.target.value = "";
                      if (f) void upload(m.email, f);
                    }}
                  />
                </label>
                <button
                  type="button"
                  disabled={loadingKey !== null}
                  onClick={() => void clearPhoto(m.email)}
                  className="rounded border border-zinc-300 px-3 py-1.5 text-sm text-zinc-700 hover:bg-zinc-50 disabled:opacity-50"
                >
                  관리자 사진 삭제
                </button>
              </div>
              <div className="mt-4 space-y-2">
                <label htmlFor={`summary-${m.email}`} className="text-xs font-medium text-zinc-600">
                  인사말 / 소개 본문
                </label>
                <textarea
                  id={`summary-${m.email}`}
                  value={summaries[m.email.toLowerCase()] ?? ""}
                  onChange={(e) =>
                    setSummaries((prev) => ({
                      ...prev,
                      [m.email.toLowerCase()]: e.target.value,
                    }))
                  }
                  rows={4}
                  className="w-full rounded border border-zinc-200 px-3 py-2 text-sm text-zinc-700"
                />
                <button
                  type="button"
                  disabled={loadingKey !== null}
                  onClick={() => void saveSummary(m.email)}
                  className="rounded border border-zinc-300 px-3 py-1.5 text-sm text-zinc-700 hover:bg-zinc-50 disabled:opacity-50"
                >
                  {loadingKey === `summary:${m.email}` ? "저장 중…" : "소개 저장"}
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
