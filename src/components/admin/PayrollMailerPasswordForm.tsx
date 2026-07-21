"use client";

import { useEffect, useState } from "react";

export function PayrollMailerPasswordForm() {
  const [configured, setConfigured] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    void (async () => {
      try {
        const res = await fetch("/api/admin/payroll-mailer-password", { cache: "no-store" });
        const data = (await res.json()) as { configured?: boolean };
        if (res.ok) {
          setConfigured(Boolean(data.configured));
        }
      } catch {
        setConfigured(false);
      }
    })();
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    if (password !== confirm) {
      setMsg({ type: "err", text: "비밀번호와 확인이 일치하지 않습니다." });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/admin/payroll-mailer-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, confirmPassword: confirm }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setMsg({ type: "err", text: data.error || "저장에 실패했습니다." });
        return;
      }
      setMsg({ type: "ok", text: "급여 명세서 발송 비밀번호를 저장했습니다." });
      setConfigured(true);
      setPassword("");
      setConfirm("");
    } catch {
      setMsg({ type: "err", text: "네트워크 오류가 발생했습니다." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="max-w-md space-y-4">
      {configured === null ? (
        <p className="text-sm text-zinc-500">불러오는 중…</p>
      ) : (
        <p className="rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-700">
          {configured
            ? "비밀번호가 설정되어 있습니다. 새 비밀번호를 저장하면 기존 비밀번호를 대체합니다."
            : "아직 비밀번호가 없습니다. 아래에서 설정하면 급여 명세서 발송 페이지에서 입력해야 메일 설정·발송을 사용할 수 있습니다."}
        </p>
      )}
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
        <label htmlFor="payroll-mailer-pw" className="block text-xs font-medium text-zinc-600">
          비밀번호 (4자 이상)
        </label>
        <input
          id="payroll-mailer-pw"
          type="password"
          autoComplete="new-password"
          required
          minLength={4}
          maxLength={128}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 w-full rounded border border-zinc-200 px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label htmlFor="payroll-mailer-pw2" className="block text-xs font-medium text-zinc-600">
          비밀번호 확인
        </label>
        <input
          id="payroll-mailer-pw2"
          type="password"
          autoComplete="new-password"
          required
          minLength={4}
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
        {loading ? "저장 중…" : "비밀번호 저장"}
      </button>
    </form>
  );
}
