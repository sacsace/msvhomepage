"use client";

import { useLayoutEffect, useRef } from "react";
import { insertAtCursor, prefixEachLine, wrapSelection } from "@/lib/contact-message-format";
import type { ContactFormStrings } from "@/lib/i18n/contact-locale";

type Props = {
  id: string;
  value: string;
  onChange: (next: string) => void;
  copy: ContactFormStrings;
};

const tbBtn =
  "rounded-md border border-transparent px-2 py-1 text-xs font-medium text-slate-600 transition hover:border-slate-200 hover:bg-white hover:text-msv-navy";

export function ContactMessageField({ id, value, onChange, copy }: Props) {
  const taRef = useRef<HTMLTextAreaElement>(null);
  const caretPending = useRef<{ start: number; end: number } | null>(null);

  useLayoutEffect(() => {
    const c = caretPending.current;
    const el = taRef.current;
    if (!c || !el) return;
    el.setSelectionRange(c.start, c.end);
    caretPending.current = null;
  }, [value]);

  const wrap = (before: string, after: string, placeholder: string) => {
    const el = taRef.current;
    if (!el) return;
    const s = el.selectionStart;
    const e = el.selectionEnd;
    const r = wrapSelection(value, s, e, before, after, placeholder);
    caretPending.current = { start: r.selStart, end: r.selEnd };
    onChange(r.value);
  };

  const prefix = (p: string | ((i: number) => string)) => {
    const el = taRef.current;
    if (!el) return;
    const s = el.selectionStart;
    const e = el.selectionEnd;
    if (s === e) {
      if (p === "- ") {
        const ins = copy.listInsert;
        const r = insertAtCursor(value, s, s, ins);
        const i = ins.indexOf(copy.listWord);
        if (i >= 0) {
          caretPending.current = { start: s + i, end: s + i + copy.listWord.length };
        }
        onChange(r.value);
        return;
      }
      if (p === "> ") {
        const ins = copy.quoteInsert;
        const r = insertAtCursor(value, s, s, ins);
        const i = ins.indexOf(copy.quoteWord);
        if (i >= 0) {
          caretPending.current = { start: s + i, end: s + i + copy.quoteWord.length };
        }
        onChange(r.value);
        return;
      }
      if (typeof p === "function") {
        const ins = copy.numberedInsert;
        const r = insertAtCursor(value, s, s, ins);
        const i = ins.indexOf(copy.firstNumberedWord);
        if (i >= 0) {
          caretPending.current = { start: s + i, end: s + i + copy.firstNumberedWord.length };
        }
        onChange(r.value);
        return;
      }
    }
    const r = prefixEachLine(value, s, e, p);
    caretPending.current = { start: r.selStart, end: r.selEnd };
    onChange(r.value);
  };

  const insert = (chunk: string) => {
    const el = taRef.current;
    if (!el) return;
    const s = el.selectionStart;
    const e = el.selectionEnd;
    const r = insertAtCursor(value, s, e, chunk);
    caretPending.current = { start: r.selStart, end: r.selEnd };
    onChange(r.value);
  };

  const onLink = () => {
    const el = taRef.current;
    if (!el) return;
    const s = el.selectionStart;
    const e = el.selectionEnd;
    const sel = value.slice(s, e);
    const label = sel.trim() || copy.linkTextPlaceholder;
    const url =
      typeof window !== "undefined" ? window.prompt(copy.linkPromptTitle, copy.linkPromptDefault) : null;
    if (url == null || !String(url).trim()) return;
    const md = `[${label}](${String(url).trim()})`;
    const r = insertAtCursor(value, s, e, md);
    caretPending.current = { start: r.selStart, end: r.selEnd };
    onChange(r.value);
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-1.5">
      <label htmlFor={id} className="block shrink-0 text-sm font-semibold text-msv-navy">
        {copy.labelMessage} <span className="text-red-500">*</span>
      </label>
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white focus-within:border-msv-blue focus-within:ring-2 focus-within:ring-msv-blue/20">
        <div
          role="toolbar"
          aria-label={copy.messageToolbar}
          className="flex flex-wrap items-center gap-0.5 border-b border-slate-200 bg-slate-50 px-1.5 py-1 sm:gap-1 sm:px-2"
        >
          <button
            type="button"
            className={tbBtn}
            title={`${copy.tbBold} (Markdown **)`}
            aria-label={copy.tbBold}
            onClick={() => wrap("**", "**", copy.wrapBoldPlaceholder)}
          >
            <span className="font-bold">B</span>
          </button>
          <button
            type="button"
            className={tbBtn}
            title={`${copy.tbItalic} (Markdown _)`}
            aria-label={copy.tbItalic}
            onClick={() => wrap("_", "_", copy.wrapItalicPlaceholder)}
          >
            <span className="italic">I</span>
          </button>
          <button
            type="button"
            className={tbBtn}
            title={`${copy.tbCode} (Markdown \`)`}
            aria-label={copy.tbCode}
            onClick={() => wrap("`", "`", "code")}
          >
            {"</>"}
          </button>
          <span className="mx-0.5 hidden h-4 w-px bg-slate-200 sm:inline" aria-hidden />
          <button
            type="button"
            className={tbBtn}
            title={copy.tbList}
            aria-label={copy.tbList}
            onClick={() => prefix("- ")}
          >
            {copy.tbList}
          </button>
          <button
            type="button"
            className={tbBtn}
            title={copy.tbNumbered}
            aria-label={copy.tbNumbered}
            onClick={() => prefix((i) => `${i + 1}. `)}
          >
            {copy.tbNumbered}
          </button>
          <button type="button" className={tbBtn} title={copy.tbQuote} aria-label={copy.tbQuote} onClick={() => prefix("> ")}>
            {copy.tbQuote}
          </button>
          <span className="mx-0.5 hidden h-4 w-px bg-slate-200 sm:inline" aria-hidden />
          <button
            type="button"
            className={tbBtn}
            title={`${copy.tbRule} ---`}
            aria-label={copy.tbRule}
            onClick={() => insert("\n\n---\n\n")}
          >
            {copy.tbRule}
          </button>
          <button type="button" className={tbBtn} title={copy.tbLink} aria-label={copy.tbLink} onClick={onLink}>
            {copy.tbLink}
          </button>
        </div>
        <textarea
          ref={taRef}
          id={id}
          required
          rows={6}
          maxLength={20000}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="min-h-[10.5rem] flex-1 resize-y border-0 px-3.5 py-2.5 text-sm leading-relaxed text-slate-900 outline-none placeholder:text-slate-400"
          aria-describedby={`${id}-hint`}
        />
      </div>
      <p id={`${id}-hint`} className="text-[11px] leading-snug text-slate-500">
        {copy.messageHint}
      </p>
    </div>
  );
}
