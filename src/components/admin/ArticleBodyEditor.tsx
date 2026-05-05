"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  initialHtml: string;
  onHtmlChange: (html: string) => void;
};

function escapeHtmlText(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function IconBold() {
  return (
    <span className="font-serif text-sm font-bold leading-none" aria-hidden>
      B
    </span>
  );
}

function IconItalic() {
  return (
    <span className="font-serif text-sm italic leading-none" aria-hidden>
      I
    </span>
  );
}

function IconUnderline() {
  return (
    <span className="text-xs font-semibold leading-none underline decoration-2 underline-offset-2" aria-hidden>
      U
    </span>
  );
}

function IconHeading() {
  return (
    <span className="text-[11px] font-bold leading-none tracking-tight" aria-hidden>
      H2
    </span>
  );
}

function IconList() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path strokeLinecap="round" d="M9 6h12M9 12h12M9 18h12M5 6h.01M5 12h.01M5 18h.01" />
    </svg>
  );
}

function IconListOrdered() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path strokeLinecap="round" d="M11 6h10M11 12h10M11 18h10M5 6h1v1H5V6zm0 6h2v1H5v-1zm0 5h1v2H5v-2z" />
    </svg>
  );
}

function IconQuote() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path strokeLinecap="round" d="M7 8H5a2 2 0 00-2 2v5h4M17 8h-2a2 2 0 00-2 2v5h4" />
    </svg>
  );
}

function IconLink() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path strokeLinecap="round" d="M10 13a5 5 0 007.07 0l1.41-1.41a5 5 0 000-7.07 5 5 0 00-7.07 0M14 11a5 5 0 00-7.07 0L5.52 12.4a5 5 0 000 7.08 5 5 0 007.07 0" />
    </svg>
  );
}

function IconImage() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <circle cx="8.5" cy="10" r="1.5" fill="currentColor" stroke="none" />
      <path d="M21 17l-5-5-4 4-3-3-5 5" />
    </svg>
  );
}

function IconAttach() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path strokeLinecap="round" d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66L9.64 16.78a2 2 0 01-2.83-2.83l8.49-8.48" />
    </svg>
  );
}

function IconResize() {
  return (
    <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path strokeLinecap="round" d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
    </svg>
  );
}

type ToolbarBtnProps = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  active?: boolean;
  children: React.ReactNode;
};

function ToolbarBtn({ label, onClick, disabled, active, children }: ToolbarBtnProps) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={active}
      disabled={disabled}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={[
        "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-slate-600 transition-colors",
        "hover:bg-slate-100 hover:text-slate-900",
        "disabled:pointer-events-none disabled:opacity-40",
        active ? "bg-slate-200 text-slate-900" : "bg-transparent",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function ToolbarSep() {
  return <div className="mx-0.5 hidden h-6 w-px shrink-0 bg-slate-200 sm:block" aria-hidden />;
}

function getImageFromEditorSelection(root: HTMLElement | null): HTMLImageElement | null {
  if (!root) return null;
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return null;
  const anchor = sel.anchorNode;
  if (!anchor) return null;
  const el = anchor.nodeType === Node.ELEMENT_NODE ? (anchor as Element) : anchor.parentElement;
  const img = el?.closest("img");
  if (img && root.contains(img)) return img as HTMLImageElement;
  return null;
}

const IMG_STYLE_FULL =
  "max-width:100%;width:100%;height:auto;display:block;margin-left:auto;margin-right:auto;";
const IMG_STYLE_75 =
  "max-width:75%;width:75%;height:auto;display:block;margin-left:auto;margin-right:auto;";
const IMG_STYLE_50 =
  "max-width:50%;width:50%;height:auto;display:block;margin-left:auto;margin-right:auto;";
const IMG_STYLE_33 =
  "max-width:33%;width:33%;height:auto;display:block;margin-left:auto;margin-right:auto;";
/** 원본 비율, 컨테이너 너비만 넘지 않게 */
const IMG_STYLE_NATURAL =
  "max-width:100%;width:auto;height:auto;display:block;margin-left:auto;margin-right:auto;";

/** 사용자 입력 → 인라인 스타일 (저장 시 sanitize 통과용) */
function parseImageWidthInput(raw: string): { style: string } | { error: string } {
  const t = raw.trim().toLowerCase().replace(/\s/g, "");
  if (!t) return { error: "값을 입력해 주세요." };
  const pct = t.match(/^(\d{1,3})%$/);
  if (pct) {
    const n = Number(pct[1]);
    if (n < 5 || n > 100) return { error: "퍼센트는 5~100 사이로 입력해 주세요." };
    return {
      style: `max-width:${n}%;width:${n}%;height:auto;display:block;margin-left:auto;margin-right:auto;`,
    };
  }
  const px = t.match(/^(\d{2,4})px$/);
  if (px) {
    const n = Number(px[1]);
    if (n < 80 || n > 2000) return { error: "픽셀은 80~2000 사이로 입력해 주세요." };
    return {
      style: `width:${n}px;max-width:100%;height:auto;display:block;margin-left:auto;margin-right:auto;`,
    };
  }
  return { error: "형식: 숫자+% (예: 60%) 또는 숫자+px (예: 480px)" };
}

export function ArticleBodyEditor({ initialHtml, onHtmlChange }: Props) {
  const editorRef = useRef<HTMLDivElement>(null);
  const onHtmlChangeRef = useRef(onHtmlChange);
  const [hint, setHint] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const imgInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [selectedImg, setSelectedImg] = useState<HTMLImageElement | null>(null);
  const [customWidthInput, setCustomWidthInput] = useState("");
  const [cmdActive, setCmdActive] = useState({ bold: false, italic: false, underline: false });

  useEffect(() => {
    onHtmlChangeRef.current = onHtmlChange;
  }, [onHtmlChange]);

  const commitImageSelection = useCallback((next: HTMLImageElement | null, prev: HTMLImageElement | null) => {
    if (prev !== next) setCustomWidthInput("");
    setSelectedImg(next);
  }, []);

  useEffect(() => {
    const el = editorRef.current;
    if (!el) return;
    el.innerHTML = initialHtml || "";
  }, [initialHtml]);

  useEffect(() => {
    const root = editorRef.current;
    if (!root) return;
    root.querySelectorAll("img[data-msv-selected]").forEach((n) => {
      n.removeAttribute("data-msv-selected");
    });
    if (selectedImg && root.contains(selectedImg)) {
      selectedImg.setAttribute("data-msv-selected", "1");
    }
    return () => {
      if (selectedImg) selectedImg.removeAttribute("data-msv-selected");
    };
  }, [selectedImg]);

  const sync = () => {
    const el = editorRef.current;
    if (el) onHtmlChangeRef.current(el.innerHTML);
  };

  const focusEditor = () => {
    editorRef.current?.focus();
  };

  const refreshCmdState = useCallback(() => {
    if (!editorRef.current?.contains(document.activeElement)) return;
    setCmdActive({
      bold: document.queryCommandState("bold"),
      italic: document.queryCommandState("italic"),
      underline: document.queryCommandState("underline"),
    });
  }, []);

  const runCmd = (command: string, value?: string) => {
    commitImageSelection(null, selectedImg);
    focusEditor();
    document.execCommand(command, false, value);
    sync();
    refreshCmdState();
  };

  const insertHtml = (html: string) => {
    focusEditor();
    document.execCommand("insertHTML", false, html);
    sync();
    refreshCmdState();
  };

  const onLink = () => {
    const url = window.prompt("링크 URL (https://… 또는 / 경로)");
    if (!url?.trim()) return;
    runCmd("createLink", url.trim());
  };

  const updateImageSelection = useCallback(() => {
    const root = editorRef.current;
    const img = getImageFromEditorSelection(root);
    commitImageSelection(img, selectedImg);
  }, [selectedImg, commitImageSelection]);

  const applyImageSize = (preset: "full" | "75" | "50" | "33" | "natural") => {
    const img = selectedImg;
    if (!img || !editorRef.current?.contains(img)) return;
    const styles: Record<typeof preset, string> = {
      full: IMG_STYLE_FULL,
      "75": IMG_STYLE_75,
      "50": IMG_STYLE_50,
      "33": IMG_STYLE_33,
      natural: IMG_STYLE_NATURAL,
    };
    img.setAttribute("style", styles[preset]);
    setCustomWidthInput("");
    setHint(null);
    focusEditor();
    sync();
  };

  const applyImageCustomWidth = () => {
    const img = selectedImg;
    if (!img || !editorRef.current?.contains(img)) return;
    const parsed = parseImageWidthInput(customWidthInput);
    if ("error" in parsed) {
      setHint(parsed.error);
      return;
    }
    img.setAttribute("style", parsed.style);
    setCustomWidthInput("");
    setHint(null);
    focusEditor();
    sync();
  };

  async function handleUpload(kind: "image" | "file", file: File | null) {
    if (!file || file.size === 0) return;
    setHint(null);
    setBusy(true);
    try {
      const fd = new FormData();
      fd.set("file", file);
      fd.set("kind", kind);
      const res = await fetch("/api/admin/articles/upload", {
        method: "POST",
        body: fd,
        credentials: "same-origin",
      });
      const data = (await res.json()) as { error?: string; url?: string; originalName?: string };
      if (!res.ok) {
        setHint(data.error || "업로드에 실패했습니다.");
        return;
      }
      const url = data.url!;
      const label = escapeHtmlText(data.originalName || file.name);
      if (kind === "image") {
        insertHtml(`<p><img src="${url}" alt="" style="${IMG_STYLE_FULL}" /></p>`);
        requestAnimationFrame(() => {
          const root = editorRef.current;
          if (!root) return;
          const im = Array.from(root.querySelectorAll("img")).find((n) => n.getAttribute("src") === url);
          if (im) commitImageSelection(im, selectedImg);
        });
      } else {
        insertHtml(`<p><a href="${url}">${label}</a></p>`);
      }
    } catch {
      setHint("업로드 중 오류가 났습니다.");
    } finally {
      setBusy(false);
      if (kind === "image" && imgInputRef.current) imgInputRef.current.value = "";
      if (kind === "file" && fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  return (
    <div ref={wrapRef} className="space-y-2">
      <div className="overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-sm ring-1 ring-slate-900/5">
        <div className="flex flex-wrap items-center gap-0.5 px-1.5 py-1.5 sm:flex-nowrap sm:px-2">
          <ToolbarBtn
            label="굵게"
            disabled={busy}
            active={cmdActive.bold}
            onClick={() => runCmd("bold")}
          >
            <IconBold />
          </ToolbarBtn>
          <ToolbarBtn
            label="기울임"
            disabled={busy}
            active={cmdActive.italic}
            onClick={() => runCmd("italic")}
          >
            <IconItalic />
          </ToolbarBtn>
          <ToolbarBtn
            label="밑줄"
            disabled={busy}
            active={cmdActive.underline}
            onClick={() => runCmd("underline")}
          >
            <IconUnderline />
          </ToolbarBtn>
          <ToolbarSep />
          <ToolbarBtn label="제목" disabled={busy} onClick={() => runCmd("formatBlock", "h2")}>
            <IconHeading />
          </ToolbarBtn>
          <ToolbarBtn label="글머리 목록" disabled={busy} onClick={() => runCmd("insertUnorderedList")}>
            <IconList />
          </ToolbarBtn>
          <ToolbarBtn label="번호 목록" disabled={busy} onClick={() => runCmd("insertOrderedList")}>
            <IconListOrdered />
          </ToolbarBtn>
          <ToolbarBtn label="인용" disabled={busy} onClick={() => runCmd("formatBlock", "blockquote")}>
            <IconQuote />
          </ToolbarBtn>
          <ToolbarBtn label="링크" disabled={busy} onClick={onLink}>
            <IconLink />
          </ToolbarBtn>
          <ToolbarSep />
          <ToolbarBtn label="이미지 삽입" disabled={busy} onClick={() => imgInputRef.current?.click()}>
            <IconImage />
          </ToolbarBtn>
          <ToolbarBtn label="파일 첨부" disabled={busy} onClick={() => fileInputRef.current?.click()}>
            <IconAttach />
          </ToolbarBtn>
        </div>

        {selectedImg ? (
          <div className="space-y-2 border-t border-slate-100 bg-slate-50/90 px-2 py-2">
            <div className="flex flex-wrap items-center gap-1">
              <span className="mr-1 inline-flex items-center gap-1 text-xs font-medium text-slate-600">
                <IconResize />
                이미지 너비
              </span>
              {(
                [
                  { key: "natural", label: "원본" },
                  { key: "33", label: "33%" },
                  { key: "50", label: "50%" },
                  { key: "75", label: "75%" },
                  { key: "full", label: "100%" },
                ] as const
              ).map(({ key, label }) => (
                <button
                  key={key}
                  type="button"
                  disabled={busy}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => applyImageSize(key)}
                  className="rounded-md border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 disabled:opacity-40"
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap items-end gap-2 border-t border-slate-200/80 pt-2">
              <label className="flex min-w-[8rem] flex-col gap-0.5">
                <span className="text-xs font-medium text-slate-600">직접 입력</span>
                <span className="text-[10px] leading-tight text-slate-400">예: 480px, 62%</span>
                <input
                  type="text"
                  value={customWidthInput}
                  onChange={(e) => setCustomWidthInput(e.target.value)}
                  onMouseDown={(e) => e.stopPropagation()}
                  disabled={busy}
                  placeholder="480px 또는 60%"
                  className="mt-0.5 w-36 rounded-md border border-slate-200 bg-white px-2 py-1.5 text-xs tabular-nums outline-none focus:border-sky-400 disabled:opacity-50"
                />
              </label>
              <button
                type="button"
                disabled={busy}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => applyImageCustomWidth()}
                className="rounded-md border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-slate-800 disabled:opacity-40"
              >
                적용
              </button>
            </div>
          </div>
        ) : null}
      </div>

      <input
        ref={imgInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={(e) => void handleUpload("image", e.target.files?.[0] ?? null)}
      />
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.zip,.txt,.doc,.docx,.xls,.xlsx,image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={(e) => void handleUpload("file", e.target.files?.[0] ?? null)}
      />

      {hint ? <p className="text-xs text-red-600">{hint}</p> : null}
      {busy ? <p className="text-xs text-slate-500">업로드 중…</p> : null}

      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        className="min-h-[240px] w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-relaxed text-slate-900 shadow-sm outline-none ring-slate-900/5 transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100 [&_a]:text-sky-700 [&_a]:underline [&_blockquote]:my-3 [&_blockquote]:border-l-2 [&_blockquote]:border-slate-200 [&_blockquote]:pl-4 [&_blockquote]:text-slate-600 [&_h2]:mt-3 [&_h2]:text-lg [&_h2]:font-semibold [&_img]:max-w-full [&_img]:cursor-pointer [&_img]:rounded-sm [&_img[data-msv-selected]]:ring-2 [&_img[data-msv-selected]]:ring-sky-400 [&_img[data-msv-selected]]:ring-offset-2 [&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-6"
        onInput={() => {
          sync();
          refreshCmdState();
        }}
        onClick={(e) => {
          const t = e.target;
          if (t instanceof HTMLImageElement && editorRef.current?.contains(t)) {
            commitImageSelection(t, selectedImg);
            setHint(null);
          }
        }}
        onMouseUp={() => {
          updateImageSelection();
          refreshCmdState();
        }}
        onKeyUp={() => {
          updateImageSelection();
          refreshCmdState();
        }}
        onBlur={(e) => {
          sync();
          const rt = e.relatedTarget as Node | null;
          requestAnimationFrame(() => {
            const wrap = wrapRef.current;
            const ae = document.activeElement;
            const stillInside =
              !!wrap &&
              ((rt != null && wrap.contains(rt)) || (ae != null && wrap.contains(ae)));
            if (stillInside) return;
            commitImageSelection(null, selectedImg);
            setCmdActive({ bold: false, italic: false, underline: false });
          });
        }}
        data-placeholder="본문"
      />
      <p className="text-xs text-slate-500">
        본문 안 이미지를 한 번 클릭하면 툴바 아래에서 프리셋(%) 또는 480px·60% 형식으로 너비를 맞출 수 있습니다. 이미지·첨부는 서버{" "}
        <code className="rounded bg-slate-100 px-1">/uploads/articles/</code> 에 저장됩니다.
      </p>
    </div>
  );
}
