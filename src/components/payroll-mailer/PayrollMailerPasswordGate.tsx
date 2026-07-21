"use client";

import { useState } from "react";

type GateCopy = {
  title: string;
  lead: string;
  passwordLabel: string;
  submit: string;
  submitting: string;
  wrongPassword: string;
  genericError: string;
};

type Props = {
  copy: GateCopy;
  onUnlocked: () => void;
};

export function PayrollMailerPasswordGate({ copy, onUnlocked }: Props) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/payroll-mailer/verify-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await res.json().catch(() => ({}))) as { message?: string };
      if (!res.ok) {
        setError(data.message || copy.wrongPassword);
        return;
      }
      onUnlocked();
    } catch {
      setError(copy.genericError);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">{copy.title}</h2>
      <p className="mt-2 text-sm text-slate-600">{copy.lead}</p>
      <form onSubmit={onSubmit} className="mt-5 max-w-md space-y-4">
        <div>
          <label htmlFor="payroll-mailer-access-pw" className="mb-1 block text-sm font-medium text-slate-700">
            {copy.passwordLabel}
          </label>
          <input
            id="payroll-mailer-access-pw"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded border border-slate-300 px-3 py-2 text-sm text-slate-800"
          />
        </div>
        {error ? <p className="rounded bg-red-50 p-3 text-sm text-red-700">{error}</p> : null}
        <button
          type="submit"
          disabled={loading}
          className="rounded bg-blue-700 px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {loading ? copy.submitting : copy.submit}
        </button>
      </form>
    </section>
  );
}
