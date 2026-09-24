"use client";

import { useState } from "react";
import { PasswordInput } from "@/components/admin/PasswordInput";

type Props = {
  /** DB·환경 변수에 저장된 관리자 아이디 */
  defaultLoginId: string;
};

const fieldClass =
  "mt-1 w-full rounded border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-500";

export function AdminPasswordChangeForm({ defaultLoginId }: Props) {
  const [loginId, setLoginId] = useState(defaultLoginId);
  const [currentPassword, setCurrent] = useState("");
  const [newPassword, setNew] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    if (!loginId.trim()) {
      setMsg({ type: "err", text: "아이디를 입력해 주세요." });
      return;
    }
    if (newPassword !== confirm) {
      setMsg({ type: "err", text: "새 비밀번호와 확인이 일치하지 않습니다." });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/admin/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          loginId: loginId.trim(),
          currentPassword,
          newPassword,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setMsg({ type: "err", text: data.error || "변경에 실패했습니다." });
        return;
      }
      setMsg({ type: "ok", text: "비밀번호를 변경했습니다. 다음 로그인부터 새 비밀번호를 사용하세요." });
      setLoginId(defaultLoginId);
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
    <form onSubmit={onSubmit} className="space-y-4">
      {msg ? (
        <p
          className={`rounded border px-3 py-2 text-sm ${
            msg.type === "ok"
              ? "border-emerald-300 bg-emerald-50 text-emerald-900"
              : "border-red-300 bg-red-50 text-red-800"
          }`}
        >
          {msg.text}
        </p>
      ) : null}
      <div>
        <label htmlFor="admin-login-id" className="block text-xs font-medium text-slate-600">
          아이디
        </label>
        <input
          id="admin-login-id"
          type="text"
          autoComplete="username"
          required
          value={loginId}
          onChange={(e) => setLoginId(e.target.value)}
          className={fieldClass}
        />
      </div>
      <PasswordInput
        id="cur-pw"
        label="현재 비밀번호"
        value={currentPassword}
        onChange={setCurrent}
        autoComplete="current-password"
      />
      <PasswordInput
        id="new-pw"
        label="새 비밀번호 (8자 이상)"
        value={newPassword}
        onChange={setNew}
        autoComplete="new-password"
        minLength={8}
        maxLength={128}
      />
      <PasswordInput
        id="new-pw2"
        label="새 비밀번호 확인"
        value={confirm}
        onChange={setConfirm}
        autoComplete="new-password"
        minLength={8}
        maxLength={128}
      />
      <button
        type="submit"
        disabled={loading}
        className="border border-msv-navy bg-msv-navy px-4 py-2 text-sm font-semibold text-white transition hover:bg-msv-navy/90 disabled:opacity-50"
      >
        {loading ? "저장 중…" : "비밀번호 변경"}
      </button>
    </form>
  );
}
