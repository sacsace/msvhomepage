"use client";

import { useState } from "react";

export function ContactForm() {
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
        setErrMsg(data.error || "전송에 실패했습니다.");
        setStatus("err");
        return;
      }
      setStatus("ok");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch {
      setErrMsg("네트워크 오류가 발생했습니다.");
      setStatus("err");
    }
  }

  return (
    <div id="inquiry" className="scroll-mt-28">
      <div className="msv-card rounded-xl p-6 sm:p-8">
        <h2 className="sr-only">문의 양식</h2>

        {status === "ok" ? (
          <p className="rounded-lg border border-teal-200 bg-teal-50 px-4 py-3 text-sm text-teal-900">
            문의가 접수되었습니다. 필요 시 담당자가 회신 드립니다.
          </p>
        ) : null}

        {status === "err" && errMsg ? (
          <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900">{errMsg}</p>
        ) : null}

        <form
          onSubmit={onSubmit}
          className={`space-y-5 ${status === "ok" || (status === "err" && errMsg) ? "mt-6" : ""}`}
        >
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
          <div>
            <label htmlFor="inq-name" className="block text-xs font-medium text-slate-600">
              이름 <span className="text-red-500">*</span>
            </label>
            <input
              id="inq-name"
              required
              maxLength={120}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1.5 w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none ring-msv-blue focus:border-msv-blue focus:ring-2"
            />
          </div>
          <div>
            <label htmlFor="inq-email" className="block text-xs font-medium text-slate-600">
              이메일 <span className="text-red-500">*</span>
            </label>
            <input
              id="inq-email"
              type="email"
              required
              maxLength={254}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5 w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none ring-msv-blue focus:border-msv-blue focus:ring-2"
            />
          </div>
          <div>
            <label htmlFor="inq-subject" className="block text-xs font-medium text-slate-600">
              제목
            </label>
            <input
              id="inq-subject"
              maxLength={200}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="mt-1.5 w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none ring-msv-blue focus:border-msv-blue focus:ring-2"
            />
          </div>
          <div>
            <label htmlFor="inq-msg" className="block text-xs font-medium text-slate-600">
              문의 내용 <span className="text-red-500">*</span>
            </label>
            <textarea
              id="inq-msg"
              required
              rows={6}
              maxLength={20000}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-1.5 w-full resize-y rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none ring-msv-blue focus:border-msv-blue focus:ring-2"
            />
          </div>
          <button
            type="submit"
            disabled={status === "loading"}
            className="rounded-md bg-msv-navy px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-msv-navy/90 disabled:opacity-60"
          >
            {status === "loading" ? "전송 중…" : "보내기"}
          </button>
        </form>
      </div>
    </div>
  );
}
