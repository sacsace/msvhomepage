"use client";

import { useState } from "react";

export function AdminPasswordChangeForm() {
  const [currentPassword, setCurrent] = useState("");
  const [newPassword, setNew] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    if (newPassword !== confirm) {
      setMsg({ type: "err", text: "새 비밀번호와 확인이 일치하지 않습니다." });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/admin/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setMsg({ type: "err", text: data.error || "변경에 실패했습니다." });
        return;
      }
      setMsg({ type: "ok", text: "비밀번호를 변경했습니다. 다음 로그인부터 새 비밀번호를 사용하세요." });
      setCurrent("");
      setNew("");
      setConfirm("");
    } catch {
      setMsg({ type: "err", text: "네트워크 오류가 발생했습니다." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="max-w-md space-y-4">
      {msg ? (
        <p
          className={`rounded-md px-3 py-2 text-sm ${
            msg.type === "ok"
              ? "border border-teal-200 bg-teal-50 text-teal-900"
              : "border border-red-200 bg-red-50 text-red-900"
          }`}
        >
          {msg.text}
        </p>
      ) : null}
      <div>
        <label htmlFor="cur-pw" className="block text-xs font-medium text-zinc-600">
          현재 비밀번호
        </label>
        <input
          id="cur-pw"
          type="password"
          autoComplete="current-password"
          required
          value={currentPassword}
          onChange={(e) => setCurrent(e.target.value)}
          className="mt-1 w-full rounded border border-zinc-200 px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label htmlFor="new-pw" className="block text-xs font-medium text-zinc-600">
          새 비밀번호 (8자 이상)
        </label>
        <input
          id="new-pw"
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          maxLength={128}
          value={newPassword}
          onChange={(e) => setNew(e.target.value)}
          className="mt-1 w-full rounded border border-zinc-200 px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label htmlFor="new-pw2" className="block text-xs font-medium text-zinc-600">
          새 비밀번호 확인
        </label>
        <input
          id="new-pw2"
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          maxLength={128}
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="mt-1 w-full rounded border border-zinc-200 px-3 py-2 text-sm"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
      >
        {loading ? "저장 중…" : "비밀번호 변경"}
      </button>
    </form>
  );
}
