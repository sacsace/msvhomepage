"use client";

import { useEffect, useState } from "react";
import type { PayrollMailerMailSettingsCopy } from "@/lib/i18n/payroll-mailer-locale";
import type { TransactionalEmailMode } from "@/lib/transactional-email";
import { isPayrollMailReady } from "@/lib/payroll-mailer/smtp-client";
import type { SmtpSettings } from "@/types/payroll-mailer";
import { EMPTY_SMTP_SETTINGS, SMTP_STORAGE_KEY } from "@/types/payroll-mailer";

type MailDiagnostics = {
  mode: string;
  onRailway: boolean;
  providerEnv: string | null;
  hasResendKey: boolean;
  hasSendgridKey: boolean;
  hasPostmarkToken: boolean;
  transactionalFrom: string | null;
};

type MailSettingsPanelProps = {
  settings: SmtpSettings;
  onChange: (settings: SmtpSettings) => void;
  mail: PayrollMailerMailSettingsCopy;
  onModeChange?: (mode: TransactionalEmailMode) => void;
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

export function MailSettingsPanel({ settings, onChange, mail, onModeChange }: MailSettingsPanelProps) {
  const [testEmail, setTestEmail] = useState("");
  const [saveMessage, setSaveMessage] = useState("");
  const [testMessage, setTestMessage] = useState("");
  const [testStatus, setTestStatus] = useState<"idle" | "success" | "error">("idle");
  const [isTesting, setIsTesting] = useState(false);
  const [envHint, setEnvHint] = useState("");
  const [deliveryMode, setDeliveryMode] = useState<TransactionalEmailMode>("smtp");
  const [diagnostics, setDiagnostics] = useState<MailDiagnostics | null>(null);

  const isApi = deliveryMode !== "smtp";
  const mailReady = isPayrollMailReady(settings, deliveryMode);

  useEffect(() => {
    const loadDefaults = async () => {
      try {
        const response = await fetch("/api/payroll-mailer/smtp-config", { cache: "no-store" });
        const payload = await response.json();
        if (!response.ok) return;

        const mode = (payload.mode ?? "smtp") as TransactionalEmailMode;
        setDeliveryMode(mode);
        onModeChange?.(mode);
        if (payload.diagnostics) {
          setDiagnostics(payload.diagnostics as MailDiagnostics);
        }

        const stored = sessionStorage.getItem(SMTP_STORAGE_KEY);
        if (stored) return;

        if (payload.config) {
          onChange({
            ...EMPTY_SMTP_SETTINGS,
            ...payload.config,
            pass: "",
          });
          setEnvHint(mode !== "smtp" ? mail.envHintApi : mail.envHint);
        } else if (payload.defaultFrom) {
          onChange({
            ...EMPTY_SMTP_SETTINGS,
            from: payload.defaultFrom as string,
          });
          setEnvHint(mode !== "smtp" ? mail.envHintApi : mail.envHint);
        }
      } catch {
        // ignore
      }
    };

    void loadDefaults();
  }, [onChange, onModeChange, mail.envHint, mail.envHintApi]);

  const updateField = <K extends keyof SmtpSettings>(key: K, value: SmtpSettings[K]) => {
    onChange({ ...settings, [key]: value });
    setSaveMessage("");
    setTestMessage("");
    setTestStatus("idle");
  };

  const saveSettings = () => {
    if (!mailReady) {
      setSaveMessage(isApi ? mail.saveFillFrom : mail.saveFillAll);
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
    if (!mailReady) {
      setTestStatus("error");
      setTestMessage(isApi ? mail.testNeedFrom : mail.testNeedSmtp);
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
      const smtpPayload = isApi ? { from: settings.from.trim() } : settings;

      const response = await fetch("/api/payroll-mailer/test-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          smtp: smtpPayload,
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

  const apiKeyMissing =
    diagnostics?.onRailway &&
    !diagnostics.hasResendKey &&
    !diagnostics.hasSendgridKey &&
    !diagnostics.hasPostmarkToken;

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">{mail.title}</h2>
          <p className="mt-1 text-sm text-slate-600">{isApi ? mail.leadApi : mail.leadSmtp}</p>
        </div>
        {!isApi ? (
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
        ) : null}
      </div>

      {diagnostics?.onRailway ? (
        <div
          className={`mt-4 rounded-lg border px-4 py-3 text-sm leading-relaxed ${
            isApi
              ? "border-emerald-200 bg-emerald-50 text-emerald-950"
              : "border-amber-200 bg-amber-50 text-amber-950"
          }`}
        >
          <p className="font-semibold">{mail.railwayDiagTitle}</p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-[13px]">
            <li>
              {mail.diagMode}: <strong>{diagnostics.mode}</strong>
              {isApi ? " — HTTPS API" : " — SMTP"}
            </li>
            <li>
              {mail.diagResendKey}: <strong>{diagnostics.hasResendKey ? "OK" : "—"}</strong>
            </li>
            <li>
              {mail.diagProvider}: {diagnostics.providerEnv ?? "(—)"}
            </li>
            <li>
              {mail.diagFrom}: {diagnostics.transactionalFrom ?? "(—)"}
            </li>
          </ul>
          {apiKeyMissing ? <p className="mt-2 font-medium">{mail.railwayApiKeyMissing}</p> : null}
        </div>
      ) : null}

      {!isApi && diagnostics?.onRailway ? (
        <p className="mt-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-950">
          {mail.railwaySmtpBlocked}
        </p>
      ) : null}

      {isApi ? (
        <div className="mt-4 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs leading-relaxed text-amber-950">
          <p className="font-medium">HTTPS API ({deliveryMode})</p>
          <p className="mt-1 text-amber-900/90">{mail.apiModeHint}</p>
        </div>
      ) : null}

      {envHint ? <p className="mt-3 rounded bg-blue-50 p-3 text-sm text-blue-800">{envHint}</p> : null}

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {!isApi ? (
          <>
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
          </>
        ) : null}
        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium text-slate-700">{mail.from}</label>
          <input
            type="text"
            value={settings.from}
            onChange={(e) => updateField("from", e.target.value)}
            placeholder={isApi ? mail.fromApiPlaceholder : "MS Ventures Payroll <no-reply@yourdomain.com>"}
            className="w-full rounded border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
        {!isApi ? (
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
        ) : null}
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
        <span className={`self-center text-sm ${mailReady ? "text-emerald-700" : "text-amber-700"}`}>
          {mailReady
            ? isApi
              ? mail.statusReadyApi
              : mail.statusReady
            : isApi
              ? mail.statusIncompleteApi
              : mail.statusIncomplete}
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

      <p className="mt-4 text-xs text-slate-500">{isApi ? mail.footerNoteApi : mail.footerNote}</p>
    </section>
  );
}
