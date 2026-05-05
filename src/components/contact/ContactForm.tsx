"use client";

import { useState } from "react";
import { ContactMessageField } from "@/components/contact/ContactMessageField";
import type { ContactFormStrings } from "@/lib/i18n/contact-locale";

type Props = {
  copy: ContactFormStrings;
};

export function ContactForm({ copy }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [errMsg, setErrMsg] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message, company }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setErrMsg(data.error || copy.errSend);
        setStatus("err");
        return;
      }
      setStatus("ok");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch {
      setErrMsg(copy.errNetwork);
      setStatus("err");
    }
  }

  const fieldClass =
    "mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-msv-blue focus:ring-2 focus:ring-msv-blue/20";

  return (
    <div id="inquiry" className="scroll-mt-28 flex h-full min-h-0 flex-col">
      <div className="flex min-h-0 flex-1 flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_1px_2px_rgb(15_23_42/0.04)] sm:p-8">
        <h2 className="sr-only">{copy.formSr}</h2>

        <div className="flex min-h-0 flex-1 flex-col gap-5">
          {status === "ok" ? (
            <p className="shrink-0 rounded-xl border border-teal-200/80 bg-teal-50/90 px-4 py-3.5 text-sm leading-relaxed text-teal-900">
              {copy.success}
            </p>
          ) : null}

          {status === "err" && errMsg ? (
            <p className="shrink-0 rounded-xl border border-red-200/80 bg-red-50/90 px-4 py-3.5 text-sm leading-relaxed text-red-900">
              {errMsg}
            </p>
          ) : null}

          <form onSubmit={onSubmit} className="flex min-h-0 flex-1 flex-col gap-5">
            <input
              type="text"
              name="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
            />
            <div className="grid shrink-0 gap-5 sm:grid-cols-2 sm:gap-x-5 sm:gap-y-0">
              <div className="min-w-0">
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
              <div className="min-w-0">
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
              <label htmlFor="inq-subject" className="block text-sm font-semibold text-msv-navy">
                {copy.labelSubject}
              </label>
              <input
                id="inq-subject"
                maxLength={200}
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className={fieldClass}
              />
            </div>
            <ContactMessageField id="inq-msg" value={message} onChange={setMessage} copy={copy} />
            <div className="mt-auto shrink-0 pt-0.5">
              <button
                type="submit"
                disabled={status === "loading"}
                className="rounded-xl bg-msv-navy px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-msv-navy/90 disabled:opacity-60"
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
