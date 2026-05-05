"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { LeadershipMember } from "@/types/leadership";

type Props = { initialMembers: LeadershipMember[] };

function buildExtraFields(members: LeadershipMember[]) {
  const next: Record<string, { name: string; role: string; sortOrder: string }> = {};
  for (const m of members) {
    if (m.source === "extra") {
      const k = m.email.toLowerCase();
      next[k] = {
        name: m.name,
        role: m.role,
        sortOrder: String(m.sortOrder ?? 100),
      };
    }
  }
  return next;
}

function buildStaticFields(members: LeadershipMember[]) {
  const next: Record<string, { name: string; role: string }> = {};
  for (const m of members) {
    if (m.source === "static") {
      next[m.email.toLowerCase()] = { name: m.name, role: m.role };
    }
  }
  return next;
}

export function StaffPhotosManager({ initialMembers }: Props) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loadingKey, setLoadingKey] = useState<string | null>(null);
  const [summaries, setSummaries] = useState<Record<string, string>>(
    Object.fromEntries(initialMembers.map((m) => [m.email.toLowerCase(), m.summary])),
  );
  const [extraFields, setExtraFields] = useState<Record<string, { name: string; role: string; sortOrder: string }>>(
    () => buildExtraFields(initialMembers),
  );
  const [staticFields, setStaticFields] = useState<Record<string, { name: string; role: string }>>(
    () => buildStaticFields(initialMembers),
  );

  const [addEmail, setAddEmail] = useState("");
  const [addName, setAddName] = useState("");
  const [addRole, setAddRole] = useState("");
  const [addSort, setAddSort] = useState("100");

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
      const res = await fetch("/api/admin/staff-photos", {
        method: "POST",
        body: fd,
        credentials: "same-origin",
      });
      const data = (await res.json()) as { error?: string };
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
        credentials: "same-origin",
        body: JSON.stringify({ email }),
      });
      const data = (await res.json()) as { error?: string };
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
        credentials: "same-origin",
        body: JSON.stringify({ email, summary }),
      });
      const data = (await res.json()) as { error?: string };
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

  async function addMember(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoadingKey("add");
    try {
      const res = await fetch("/api/admin/leadership-members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({
          email: addEmail.trim(),
          name: addName.trim(),
          role: addRole.trim(),
          sortOrder: (() => {
            const n = Number.parseInt(addSort, 10);
            return Number.isFinite(n) ? n : 100;
          })(),
        }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(String(data.error || "추가 실패"));
        return;
      }
      setAddEmail("");
      setAddName("");
      setAddRole("");
      setAddSort("100");
      router.refresh();
    } catch {
      setError("추가 중 오류가 발생했습니다.");
    } finally {
      setLoadingKey(null);
    }
  }

  async function saveStaticMeta(email: string) {
    const k = email.toLowerCase();
    const f = staticFields[k];
    if (!f) return;
    setError(null);
    setLoadingKey(`static-meta:${email}`);
    try {
      const res = await fetch("/api/admin/leadership-static-profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({
          email,
          name: f.name,
          role: f.role,
        }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(String(data.error || "저장 실패"));
        return;
      }
      router.refresh();
    } catch {
      setError("저장 중 오류가 발생했습니다.");
    } finally {
      setLoadingKey(null);
    }
  }

  async function saveExtraMeta(email: string) {
    const k = email.toLowerCase();
    const f = extraFields[k];
    if (!f) return;
    setError(null);
    setLoadingKey(`meta:${email}`);
    try {
      const res = await fetch(`/api/admin/leadership-members/${encodeURIComponent(email)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({
          name: f.name,
          role: f.role,
          sortOrder: (() => {
            const n = Number.parseInt(f.sortOrder, 10);
            return Number.isFinite(n) ? n : 100;
          })(),
        }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(String(data.error || "저장 실패"));
        return;
      }
      router.refresh();
    } catch {
      setError("저장 중 오류가 발생했습니다.");
    } finally {
      setLoadingKey(null);
    }
  }

  async function removeExtraMember(email: string) {
    if (!confirm("추가 경영진을 목록에서 제거합니다. 사진·소개 DB 데이터도 함께 삭제됩니다.")) return;
    setError(null);
    setLoadingKey(`del:${email}`);
    try {
      const res = await fetch(`/api/admin/leadership-members/${encodeURIComponent(email)}`, {
        method: "DELETE",
        credentials: "same-origin",
      });
      const data = (await res.json()) as { error?: string };
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

  return (
    <div className="space-y-8">
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <p className="text-sm text-zinc-600">
        JPEG / PNG / WebP, 최대 5MB. 업로드 시 DB(<code className="rounded bg-zinc-100 px-1">StaffPhoto</code>)에
        경로가 저장되고 파일은 <code className="rounded bg-zinc-100 px-1">public/uploads/team/</code>에 저장됩니다.
        인사말 본문은 DB(<code className="rounded bg-zinc-100 px-1">LeadershipSummary</code>)에 저장되며
        회사 소개·팀 페이지에 반영됩니다. 기본 인원은 <code className="rounded bg-zinc-100 px-1">site-content.ts</code>
        의 <code className="rounded bg-zinc-100 px-1">leadership</code>에 두고, 추가 인원은 아래 폼으로 등록합니다.
        기본 경영진의 이름·직함은 아래에서 수정하면 DB에 저장되어 공개 페이지에 반영됩니다(저장 전까지는 코드 기본값과 동일하게 보일 수 있습니다).
      </p>

      <section className="rounded border border-zinc-200 bg-zinc-50 p-4">
        <h2 className="text-sm font-semibold text-zinc-900">경영진 추가</h2>
        <form onSubmit={(ev) => void addMember(ev)} className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <label className="block text-xs text-zinc-600">
            이메일 (로그인용 아님, 식별용)
            <input
              type="email"
              required
              value={addEmail}
              onChange={(e) => setAddEmail(e.target.value)}
              className="mt-1 w-full rounded border border-zinc-200 px-2 py-1.5 text-sm"
              placeholder="name@company.com"
            />
          </label>
          <label className="block text-xs text-zinc-600">
            이름
            <input
              required
              value={addName}
              onChange={(e) => setAddName(e.target.value)}
              className="mt-1 w-full rounded border border-zinc-200 px-2 py-1.5 text-sm"
            />
          </label>
          <label className="block text-xs text-zinc-600">
            직함
            <input
              required
              value={addRole}
              onChange={(e) => setAddRole(e.target.value)}
              className="mt-1 w-full rounded border border-zinc-200 px-2 py-1.5 text-sm"
            />
          </label>
          <label className="block text-xs text-zinc-600">
            표시 순서 (작을수록 앞)
            <input
              type="number"
              value={addSort}
              onChange={(e) => setAddSort(e.target.value)}
              className="mt-1 w-full rounded border border-zinc-200 px-2 py-1.5 text-sm"
            />
          </label>
          <div className="sm:col-span-2 lg:col-span-4">
            <button
              type="submit"
              disabled={loadingKey !== null}
              className="rounded border border-zinc-900 bg-zinc-900 px-4 py-2 text-sm text-white disabled:opacity-50"
            >
              {loadingKey === "add" ? "추가 중…" : "경영진 추가"}
            </button>
          </div>
        </form>
      </section>

      <ul className="space-y-6">
        {initialMembers.map((m) => {
          const k = m.email.toLowerCase();
          const isExtra = m.source === "extra";
          const ef = extraFields[k];
          const sf = staticFields[k];
          return (
            <li key={m.email} className="border border-zinc-200 bg-white p-4 sm:flex sm:items-start sm:gap-6">
              <div className="relative mx-auto h-24 w-24 shrink-0 overflow-hidden rounded-full border border-zinc-200 bg-zinc-50 sm:mx-0">
                {m.photoSrc ? (
                  <Image src={m.photoSrc} alt={m.name} fill className="object-cover object-top" sizes="96px" />
                ) : (
                  <span className="flex h-full w-full items-center justify-center text-xs text-zinc-400">없음</span>
                )}
              </div>
              <div className="mt-4 min-w-0 flex-1 sm:mt-0">
                {isExtra && ef ? (
                  <div className="mb-3 grid gap-2 sm:grid-cols-3">
                    <label className="block text-xs text-zinc-600">
                      이름
                      <input
                        value={ef.name}
                        onChange={(e) =>
                          setExtraFields((prev) => ({
                            ...prev,
                            [k]: { ...ef, name: e.target.value },
                          }))
                        }
                        className="mt-1 w-full rounded border border-zinc-200 px-2 py-1.5 text-sm"
                      />
                    </label>
                    <label className="block text-xs text-zinc-600">
                      직함
                      <input
                        value={ef.role}
                        onChange={(e) =>
                          setExtraFields((prev) => ({
                            ...prev,
                            [k]: { ...ef, role: e.target.value },
                          }))
                        }
                        className="mt-1 w-full rounded border border-zinc-200 px-2 py-1.5 text-sm"
                      />
                    </label>
                    <label className="block text-xs text-zinc-600">
                      표시 순서
                      <input
                        type="number"
                        value={ef.sortOrder}
                        onChange={(e) =>
                          setExtraFields((prev) => ({
                            ...prev,
                            [k]: { ...ef, sortOrder: e.target.value },
                          }))
                        }
                        className="mt-1 w-full rounded border border-zinc-200 px-2 py-1.5 text-sm"
                      />
                    </label>
                    <div className="flex flex-wrap gap-2 sm:col-span-3">
                      <button
                        type="button"
                        disabled={loadingKey !== null}
                        onClick={() => void saveExtraMeta(m.email)}
                        className="rounded border border-zinc-300 px-3 py-1.5 text-sm text-zinc-700 hover:bg-zinc-50 disabled:opacity-50"
                      >
                        {loadingKey === `meta:${m.email}` ? "저장 중…" : "기본 정보 저장"}
                      </button>
                      <button
                        type="button"
                        disabled={loadingKey !== null}
                        onClick={() => void removeExtraMember(m.email)}
                        className="rounded border border-red-200 px-3 py-1.5 text-sm text-red-700 hover:bg-red-50 disabled:opacity-50"
                      >
                        {loadingKey === `del:${m.email}` ? "삭제 중…" : "경영진 제거"}
                      </button>
                    </div>
                  </div>
                ) : sf ? (
                  <div className="mb-3 grid gap-2 sm:grid-cols-2">
                    <label className="block text-xs text-zinc-600">
                      이름
                      <input
                        value={sf.name}
                        onChange={(e) =>
                          setStaticFields((prev) => ({
                            ...prev,
                            [k]: { ...sf, name: e.target.value },
                          }))
                        }
                        className="mt-1 w-full rounded border border-zinc-200 px-2 py-1.5 text-sm"
                      />
                    </label>
                    <label className="block text-xs text-zinc-600">
                      직함
                      <input
                        value={sf.role}
                        onChange={(e) =>
                          setStaticFields((prev) => ({
                            ...prev,
                            [k]: { ...sf, role: e.target.value },
                          }))
                        }
                        className="mt-1 w-full rounded border border-zinc-200 px-2 py-1.5 text-sm"
                      />
                    </label>
                    <div className="flex flex-wrap gap-2 sm:col-span-2">
                      <button
                        type="button"
                        disabled={loadingKey !== null}
                        onClick={() => void saveStaticMeta(m.email)}
                        className="rounded border border-zinc-300 px-3 py-1.5 text-sm text-zinc-700 hover:bg-zinc-50 disabled:opacity-50"
                      >
                        {loadingKey === `static-meta:${m.email}` ? "저장 중…" : "기본 정보 저장"}
                      </button>
                    </div>
                  </div>
                ) : null}
                <p className="mt-0.5 text-sm text-zinc-600">{m.email}</p>
                {m.photoSrc ? <p className="mt-2 break-all text-xs text-zinc-400">{m.photoSrc}</p> : null}
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
                    value={summaries[k] ?? ""}
                    onChange={(e) =>
                      setSummaries((prev) => ({
                        ...prev,
                        [k]: e.target.value,
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
          );
        })}
      </ul>
    </div>
  );
}
