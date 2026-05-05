"use client";

import { useEffect, useState } from "react";
import type { MailSettings } from "@/types/mail-settings";

type PublicSettings = Omit<MailSettings, "pass"> & { hasPassword: boolean };
type MailPreset = "gmail" | "custom";

function applyPreset(base: PublicSettings & { pass: string }, preset: MailPreset) {
  if (preset === "gmail") {
    return {
      ...base,
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      fromAddress: base.fromAddress || base.user || "",
    };
  }
  return base;
}

export function MailSettingsForm() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const [preset, setPreset] = useState<MailPreset>("gmail");
  const [form, setForm] = useState<PublicSettings & { pass: string }>({
    host: "",
    port: 587,
    secure: false,
    user: "",
    pass: "",
    fromAddress: "",
    toAddress: "lee@msventures.in, info@msventures.in",
    hasPassword: false,
  });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/admin/mail-settings", { cache: "no-store" });
        if (!res.ok) throw new Error("불러오기 실패");
        const data = (await res.json()) as PublicSettings;
        if (!cancelled) {
          const next: PublicSettings & { pass: string } = {
            host: data.host ?? "",
            port: Number.isFinite(Number(data.port)) ? Number(data.port) : 587,
            secure: Boolean(data.secure),
            user: data.user ?? "",
            pass: "",
            fromAddress: data.fromAddress ?? "",
            toAddress: data.toAddress ?? "lee@msventures.in, info@msventures.in",
            hasPassword: Boolean(data.hasPassword),
          };
          const detectedPreset: MailPreset = next.host === "smtp.gmail.com" ? "gmail" : "custom";
          setPreset(detectedPreset);
          setForm(next);
          if (!next.host) {
            setPreset("gmail");
            setForm((prev) => applyPreset(prev, "gmail"));
          }
        }
      } catch {
        if (!cancelled) setMsg({ type: "err", text: "설정을 불러오지 못했습니다." });
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMsg(null);
    try {
      const res = await fetch("/api/admin/mail-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          host: form.host,
          port: form.port,
          secure: form.secure,
          user: form.user,
          pass: form.pass,
          fromAddress: form.fromAddress,
          toAddress: form.toAddress,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setMsg({ type: "err", text: (data as { error?: string }).error || "저장 실패" });
        return;
      }
      const next = data as PublicSettings;
      setForm((f) => ({
        ...f,
        ...next,
        pass: "",
      }));
      setMsg({ type: "ok", text: "저장했습니다." });
    } catch {
      setMsg({ type: "err", text: "저장 중 오류가 발생했습니다." });
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <p className="text-sm text-zinc-500">불러오는 중…</p>;
  }

  return (
    <form onSubmit={onSubmit} className="max-w-xl space-y-5">
      {msg ? (
        <p
          className={`rounded-md px-3 py-2 text-sm ${
            msg.type === "ok" ? "border border-teal-200 bg-teal-50 text-teal-900" : "border border-red-200 bg-red-50 text-red-900"
          }`}
        >
          {msg.text}
        </p>
      ) : null}

      <div>
        <label className="block text-xs font-medium text-zinc-600">SMTP 프리셋</label>
        <div className="mt-1 flex flex-wrap items-center gap-2">
          <select
            value={preset}
            onChange={(e) => {
              const next = e.target.value as MailPreset;
              setPreset(next);
              setForm((prev) => applyPreset(prev, next));
            }}
            className="rounded border border-zinc-200 px-3 py-2 text-sm"
          >
            <option value="gmail">Gmail / Google Workspace</option>
            <option value="custom">직접 입력</option>
          </select>
          <p className="text-xs text-zinc-500">
            Gmail은 <code className="rounded bg-zinc-100 px-1">smtp.gmail.com:465</code> + SSL/TLS로 자동 채워집니다.
          </p>
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-zinc-600">SMTP 호스트</label>
        <input
          value={form.host}
          onChange={(e) => setForm((f) => ({ ...f, host: e.target.value }))}
          placeholder="smtp.example.com"
          className="mt-1 w-full rounded border border-zinc-200 px-3 py-2 text-sm"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-xs font-medium text-zinc-600">포트</label>
          <input
            type="number"
            min={1}
            max={65535}
            value={form.port}
            onChange={(e) => setForm((f) => ({ ...f, port: Number(e.target.value) || 587 }))}
            className="mt-1 w-full rounded border border-zinc-200 px-3 py-2 text-sm"
          />
        </div>
        <div className="flex items-end pb-2">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-700">
            <input
              type="checkbox"
              checked={form.secure}
              onChange={(e) => setForm((f) => ({ ...f, secure: e.target.checked }))}
            />
            SSL/TLS (465 등)
          </label>
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium text-zinc-600">SMTP 사용자</label>
        <input
          value={form.user}
          onChange={(e) => setForm((f) => ({ ...f, user: e.target.value }))}
          className="mt-1 w-full rounded border border-zinc-200 px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-zinc-600">SMTP 비밀번호</label>
        <input
          type="password"
          value={form.pass}
          onChange={(e) => setForm((f) => ({ ...f, pass: e.target.value }))}
          placeholder={form.hasPassword ? "변경 시에만 입력" : "비밀번호"}
          autoComplete="new-password"
          className="mt-1 w-full rounded border border-zinc-200 px-3 py-2 text-sm"
        />
        {form.hasPassword ? <p className="mt-1 text-xs text-zinc-500">이미 저장된 비밀번호가 있습니다. 바꾸려면 새 값을 입력하세요.</p> : null}
      </div>
      <div>
        <label className="block text-xs font-medium text-zinc-600">SMTP MAIL FROM (인증과 맞는 주소)</label>
        <input
          value={form.fromAddress}
          onChange={(e) => setForm((f) => ({ ...f, fromAddress: e.target.value }))}
          placeholder="info@msventures.in"
          className="mt-1 w-full rounded border border-zinc-200 px-3 py-2 text-sm"
        />
        <p className="mt-1 text-xs text-zinc-500">
          Gmail 등 SMTP 인증에 쓰는 주소(예: info@)를 넣습니다. 웹 문의 메일의 &quot;표시 발신자&quot;는 양식에 적은
          이메일로 보내지며, 회신은 그 주소로 갑니다.
        </p>
      </div>
      <div>
        <label className="block text-xs font-medium text-zinc-600">문의 수신(To)</label>
        <input
          value={form.toAddress}
          onChange={(e) => setForm((f) => ({ ...f, toAddress: e.target.value }))}
          placeholder="lee@msventures.in, info@msventures.in"
          className="mt-1 w-full rounded border border-zinc-200 px-3 py-2 text-sm"
        />
        <p className="mt-1 text-xs text-zinc-500">여러 명이면 쉼표(,)로 구분합니다.</p>
      </div>
      <button
        type="submit"
        disabled={saving}
        className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
      >
        {saving ? "저장 중…" : "저장"}
      </button>
    </form>
  );
}
