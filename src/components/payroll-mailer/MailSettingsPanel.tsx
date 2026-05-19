"use client";

import { useEffect, useState } from "react";
import type { PayrollMailerMailSettingsCopy } from "@/lib/i18n/payroll-mailer-locale";
import { isSmtpConfigured } from "@/lib/payroll-mailer/smtp-client";
import type { SmtpSettings } from "@/types/payroll-mailer";
import { EMPTY_SMTP_SETTINGS, SMTP_STORAGE_KEY } from "@/types/payroll-mailer";

type MailSettingsPanelProps = {
  settings: SmtpSettings;
  onChange: (settings: SmtpSettings) => void;
  mail: PayrollMailerMailSettingsCopy;
};

const PRESETS: Record<string, Partial<SmtpSettings>> = {
  Gmail: {
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
  },
  Outlook: {
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
  },
};

export function MailSettingsPanel({ settings, onChange, mail }: MailSettingsPanelProps) {
  const [testEmail, setTestEmail] = useState("");
  const [saveMessage, setSaveMessage] = useState("");
  const [testMessage, setTestMessage] = useState("");
  const [testStatus, setTestStatus] = useState<"idle" | "success" | "error">("idle");
  const [isTesting, setIsTesting] = useState(false);
  const [envHint, setEnvHint] = useState("");

  useEffect(() => {
    const loadDefaults = async () => {
      try {
        const response = await fetch("/api/payroll-mailer/smtp-config");
        const payload = await response.json();
        if (!response.ok) return;

        const stored = sessionStorage.getItem(SMTP_STORAGE_KEY);
        if (stored) return;

        if (payload.config) {
          onChange({
            ...EMPTY_SMTP_SETTINGS,
            ...payload.config,
            pass: "",
          });
          setEnvHint(mail.envHint);
        }
      } catch {
        // ignore
      }
    };

    void loadDefaults();
  }, [onChange, mail.envHint]);

  const updateField = <K extends keyof SmtpSettings>(key: K, value: SmtpSettings[K]) => {
    onChange({ ...settings, [key]: value });
    setSaveMessage("");
    setTestMessage("");
    setTestStatus("idle");
  };

  const saveSettings = () => {
    if (!isSmtpConfigured(settings)) {
      setSaveMessage(mail.saveFillAll);
      return;
    }
    sessionStorage.setItem(SMTP_STORAGE_KEY, JSON.stringify(settings));
    setSaveMessage(mail.savedSession);
  };

  const clearSettings = () => {
    sessionStorage.removeItem(SMTP_STORAGE_KEY);
    onChange(EMPTY_SMTP_SETTINGS);
    setTestEmail("");
    setSaveMessage(mail.cleared);
    setTestMessage("");
    setTestStatus("idle");
    setEnvHint("");
  };

  const sendTestMail = async () => {
    if (!isSmtpConfigured(settings)) {
      setTestStatus("error");
      setTestMessage(mail.testNeedSmtp);
      return;
    }
    if (!testEmail.trim()) {
      setTestStatus("error");
      setTestMessage(mail.testNeedEmail);
      return;
    }

    setIsTesting(true);
    setTestMessage("");
    setTestStatus("idle");

    try {
      const response = await fetch("/api/payroll-mailer/test-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          smtp: settings,
          testEmail: testEmail.trim(),
        }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message ?? mail.testFail);
      }
      setTestStatus("success");
      setTestMessage(result.message ?? mail.testSuccess);
    } catch (error) {
      setTestStatus("error");
      setTestMessage(error instanceof Error ? error.message : mail.testFail);
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">{mail.title}</h2>
          <p className="mt-1 text-sm text-slate-600">{mail.lead}</p>
          <p className="mt-2 text-sm text-slate-500">{mail.multiUserNote}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {Object.entries(PRESETS).map(([name, preset]) => (
            <button
              key={name}
              type="button"
              onClick={() => onChange({ ...settings, ...preset })}
              className="rounded border border-slate-300 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100"
            >
              {name} {mail.presetSuffix}
            </button>
          ))}
        </div>
      </div>

      {envHint ? <p className="mt-3 rounded bg-blue-50 p-3 text-sm text-blue-800">{envHint}</p> : null}

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">{mail.smtpHost}</label>
          <input
            type="text"
            value={settings.host}
            onChange={(e) => updateField("host", e.target.value)}
            placeholder="smtp.gmail.com"
            className="w-full rounded border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">{mail.smtpPort}</label>
          <input
            type="number"
            value={settings.port}
            onChange={(e) => updateField("port", Number(e.target.value) || 587)}
            className="w-full rounded border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">{mail.smtpUser}</label>
          <input
            type="text"
            value={settings.user}
            onChange={(e) => updateField("user", e.target.value)}
            placeholder="your-email@example.com"
            className="w-full rounded border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">{mail.smtpPassword}</label>
          <input
            type="password"
            value={settings.pass}
            onChange={(e) => updateField("pass", e.target.value)}
            placeholder={mail.smtpPasswordPlaceholder}
            className="w-full rounded border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium text-slate-700">{mail.from}</label>
          <input
            type="text"
            value={settings.from}
            onChange={(e) => updateField("from", e.target.value)}
            placeholder="Your Company Payroll <you@company.com>"
            className="w-full rounded border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
        <div className="flex items-center gap-2 md:col-span-2">
          <input
            id="smtp-secure"
            type="checkbox"
            checked={settings.secure}
            onChange={(e) => updateField("secure", e.target.checked)}
          />
          <label htmlFor="smtp-secure" className="text-sm text-slate-700">
            {mail.secureLabel}
          </label>
        </div>
      </div>

      <div className="mt-5 border-t border-slate-200 pt-5">
        <label className="mb-1 block text-sm font-medium text-slate-700">{mail.testEmailLabel}</label>
        <div className="flex flex-wrap gap-3">
          <input
            type="email"
            value={testEmail}
            onChange={(e) => setTestEmail(e.target.value)}
            placeholder="test@example.com"
            className="min-w-[240px] flex-1 rounded border border-slate-300 px-3 py-2 text-sm"
          />
          <button
            type="button"
            disabled={isTesting}
            onClick={() => void sendTestMail()}
            className="rounded bg-emerald-700 px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {isTesting ? mail.sending : mail.sendTest}
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={saveSettings}
          className="rounded bg-slate-800 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
        >
          {mail.save}
        </button>
        <button
          type="button"
          onClick={clearSettings}
          className="rounded border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          {mail.reset}
        </button>
        <span
          className={`self-center text-sm ${
            isSmtpConfigured(settings) ? "text-emerald-700" : "text-amber-700"
          }`}
        >
          {isSmtpConfigured(settings) ? mail.statusReady : mail.statusIncomplete}
        </span>
      </div>

      {saveMessage ? <p className="mt-3 text-sm text-slate-700">{saveMessage}</p> : null}
      {testMessage ? (
        <p
          className={`mt-3 rounded p-3 text-sm ${
            testStatus === "success" ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-700"
          }`}
        >
          {testMessage}
        </p>
      ) : null}

      <p className="mt-4 text-xs text-slate-500">{mail.footerNote}</p>
    </section>
  );
}
