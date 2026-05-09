"use client";

import { useEffect, useState } from "react";
import type { ContactFormStrings, InquiryTypeValue } from "@/lib/i18n/contact-locale";

type Props = {
  copy: ContactFormStrings;
};

export function ContactForm({ copy }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [inquiryType, setInquiryType] = useState<"" | InquiryTypeValue>("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "err">("idle");
  const [errMsg, setErrMsg] = useState("");
  const [toast, setToast] = useState(false);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(false), 6000);
    return () => window.clearTimeout(t);
  }, [toast]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          inquiryType,
          subject,
          message,
          company: honeypot,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setErrMsg(data.error || copy.errSend);
        setStatus("err");
        return;
      }
      setName("");
      setEmail("");
      setInquiryType("");
      setSubject("");
      setMessage("");
      setStatus("idle");
      setToast(true);
    } catch {
      setErrMsg(copy.errNetwork);
      setStatus("err");
    }
  }

  const fieldClass =
    "mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-msv-blue focus:ring-2 focus:ring-msv-blue/20";

  return (
    <div id="inquiry" className="scroll-mt-28 flex h-full min-h-0 flex-col">
      {toast ? (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-1/2 z-[100] w-[min(100%-2rem,28rem)] -translate-x-1/2 rounded-xl border border-teal-200/90 bg-teal-50 px-4 py-3.5 text-center text-sm font-medium leading-relaxed text-teal-900 shadow-lg"
        >
          {copy.success}
        </div>
      ) : null}

      <div className="flex min-h-0 flex-1 flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_1px_2px_rgb(15_23_42/0.04)] sm:p-8">
        <h2 className="sr-only">{copy.formSr}</h2>

        <div className="flex min-h-0 flex-1 flex-col gap-6">
          {status === "err" && errMsg ? (
            <p className="shrink-0 rounded-xl border border-red-200/80 bg-red-50/90 px-4 py-3.5 text-sm leading-relaxed text-red-900">
              {errMsg}
            </p>
          ) : null}

          <form onSubmit={onSubmit} className="flex min-h-0 flex-1 flex-col gap-6">
            <input
              type="text"
              name="company"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
            />
            <div className="grid shrink-0 gap-6 sm:grid-cols-2 sm:gap-x-6">
              <div className="min-w-0 sm:col-span-1">
                <label htmlFor="inq-name" className="block text-sm font-semibold text-msv-navy">
                  {copy.labelName} <span className="text-red-500">*</span>
                </label>
                <input
                  id="inq-name"
                  required
                  maxLength={120}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={fieldClass}
                />
              </div>
              <div className="min-w-0 sm:col-span-1">
                <label htmlFor="inq-email" className="block text-sm font-semibold text-msv-navy">
                  {copy.labelEmail} <span className="text-red-500">*</span>
                </label>
                <input
                  id="inq-email"
                  type="email"
                  required
                  maxLength={254}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={fieldClass}
                />
              </div>
            </div>

            <div className="shrink-0">
              <label htmlFor="inq-type" className="block text-sm font-semibold text-msv-navy">
                {copy.labelInquiryType} <span className="text-red-500">*</span>
              </label>
              <select
                id="inq-type"
                required
                value={inquiryType}
                onChange={(e) => setInquiryType(e.target.value as InquiryTypeValue | "")}
                className={`${fieldClass} cursor-pointer`}
              >
                <option value="" disabled>
                  {copy.inquiryTypeUnset}
                </option>
                {copy.inquiryTypes.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="shrink-0">
              <label htmlFor="inq-subject" className="block text-sm font-semibold text-msv-navy">
                {copy.labelSubject}
              </label>
              <input
                id="inq-subject"
                maxLength={200}
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder={copy.placeholderSubject}
                className={fieldClass}
              />
            </div>

            <div className="flex min-h-0 flex-1 flex-col">
              <label htmlFor="inq-msg" className="block text-sm font-semibold text-msv-navy">
                {copy.labelMessage} <span className="text-red-500">*</span>
              </label>
              <textarea
                id="inq-msg"
                required
                rows={8}
                maxLength={20000}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={copy.placeholderMessage}
                className={`${fieldClass} min-h-[12rem] flex-1 resize-y leading-relaxed`}
              />
            </div>

            <div className="mt-auto shrink-0 pt-0.5">
              <button
                type="submit"
                disabled={status === "loading"}
                className="min-h-[44px] w-full rounded-xl bg-msv-navy px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-msv-navy/90 disabled:opacity-60 sm:w-auto"
              >
                {status === "loading" ? copy.submitting : copy.submit}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
