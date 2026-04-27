"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  value: string;
  onChange: (next: string) => void;
  minHeightClassName?: string;
};

function cleanImage(img: HTMLImageElement) {
  img.style.maxWidth = "100%";
  if (!img.style.width) img.style.width = "60%";
  if (!img.style.height) img.style.height = "auto";
  if (!img.style.display) img.style.display = "block";
  if (!img.style.marginLeft) img.style.marginLeft = "0";
  if (!img.style.marginRight) img.style.marginRight = "auto";
}

export function RichTextEditor({
  value,
  onChange,
  minHeightClassName = "min-h-[13rem]",
}: Props) {
  const editorRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const selectedImageRef = useRef<HTMLImageElement | null>(null);
  const [hasSelectedImage, setHasSelectedImage] = useState(false);
  const [imageWidth, setImageWidth] = useState(60);

  useEffect(() => {
    const el = editorRef.current;
    if (!el) return;
    if (el.innerHTML !== value) {
      el.innerHTML = value || "";
    }
  }, [value]);

  function syncValue() {
    const html = editorRef.current?.innerHTML ?? "";
    onChange(html);
  }

  function focusEditor() {
    editorRef.current?.focus();
  }

  function runCommand(command: string, arg?: string) {
    focusEditor();
    document.execCommand(command, false, arg);
    syncValue();
  }

  function insertLink() {
    const href = window.prompt("링크 주소를 입력하세요 (https://...)");
    if (!href) return;
    runCommand("createLink", href.trim());
  }

  function onSelectImage(img: HTMLImageElement) {
    cleanImage(img);
    selectedImageRef.current = img;
    setHasSelectedImage(true);
    const w = Number.parseInt(img.style.width || "60", 10);
    setImageWidth(Number.isFinite(w) ? Math.min(100, Math.max(20, w)) : 60);
    syncValue();
  }

  function applyImageAlign(align: "left" | "center" | "right") {
    const img = selectedImageRef.current;
    if (!img) return;
    img.style.display = "block";
    img.style.marginLeft = align === "right" ? "auto" : "0";
    img.style.marginRight = align === "left" ? "auto" : "0";
    if (align === "center") {
      img.style.marginLeft = "auto";
      img.style.marginRight = "auto";
    }
    syncValue();
  }

  function applyImageWidth(nextWidth: number) {
    const img = selectedImageRef.current;
    if (!img) return;
    img.style.width = `${nextWidth}%`;
    img.style.height = "auto";
    setImageWidth(nextWidth);
    syncValue();
  }

  function removeSelectedImage() {
    const img = selectedImageRef.current;
    if (!img) return;
    img.remove();
    selectedImageRef.current = null;
    setHasSelectedImage(false);
    syncValue();
  }

  function insertImage(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      const src = String(reader.result || "");
      if (!src) return;
      focusEditor();
      document.execCommand("insertImage", false, src);
      const imgs = editorRef.current?.querySelectorAll("img");
      const latest = imgs?.item((imgs.length || 1) - 1);
      if (latest instanceof HTMLImageElement) {
        cleanImage(latest);
        onSelectImage(latest);
      }
      syncValue();
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2 rounded border border-zinc-200 bg-zinc-50 p-2">
        <button type="button" onClick={() => runCommand("bold")} className="rounded border border-zinc-300 bg-white px-2 py-1 text-xs">
          굵게
        </button>
        <button type="button" onClick={() => runCommand("italic")} className="rounded border border-zinc-300 bg-white px-2 py-1 text-xs">
          기울임
        </button>
        <button type="button" onClick={() => runCommand("underline")} className="rounded border border-zinc-300 bg-white px-2 py-1 text-xs">
          밑줄
        </button>
        <button type="button" onClick={() => runCommand("insertUnorderedList")} className="rounded border border-zinc-300 bg-white px-2 py-1 text-xs">
          목록
        </button>
        <button type="button" onClick={() => runCommand("insertOrderedList")} className="rounded border border-zinc-300 bg-white px-2 py-1 text-xs">
          번호
        </button>
        <button type="button" onClick={() => runCommand("justifyLeft")} className="rounded border border-zinc-300 bg-white px-2 py-1 text-xs">
          좌정렬
        </button>
        <button type="button" onClick={() => runCommand("justifyCenter")} className="rounded border border-zinc-300 bg-white px-2 py-1 text-xs">
          가운데
        </button>
        <button type="button" onClick={() => runCommand("justifyRight")} className="rounded border border-zinc-300 bg-white px-2 py-1 text-xs">
          우정렬
        </button>
        <button type="button" onClick={insertLink} className="rounded border border-zinc-300 bg-white px-2 py-1 text-xs">
          링크
        </button>
        <button type="button" onClick={() => runCommand("unlink")} className="rounded border border-zinc-300 bg-white px-2 py-1 text-xs">
          링크 해제
        </button>
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="rounded border border-zinc-300 bg-white px-2 py-1 text-xs"
        >
          이미지
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.currentTarget.files?.[0];
            if (file) insertImage(file);
            e.currentTarget.value = "";
          }}
        />
      </div>

      {hasSelectedImage ? (
        <div className="flex flex-wrap items-center gap-3 rounded border border-zinc-200 bg-white p-3 text-xs">
          <span className="font-medium text-zinc-700">이미지</span>
          <label className="flex items-center gap-2">
            크기
            <input
              type="range"
              min={20}
              max={100}
              step={1}
              value={imageWidth}
              onChange={(e) => applyImageWidth(Number(e.target.value))}
            />
            <span className="tabular-nums">{imageWidth}%</span>
          </label>
          <button type="button" className="rounded border border-zinc-300 px-2 py-1" onClick={() => applyImageAlign("left")}>
            좌
          </button>
          <button type="button" className="rounded border border-zinc-300 px-2 py-1" onClick={() => applyImageAlign("center")}>
            가운데
          </button>
          <button type="button" className="rounded border border-zinc-300 px-2 py-1" onClick={() => applyImageAlign("right")}>
            우
          </button>
          <button type="button" className="rounded border border-red-300 px-2 py-1 text-red-700" onClick={removeSelectedImage}>
            이미지 삭제
          </button>
        </div>
      ) : null}

      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={syncValue}
        onClick={(e) => {
          const t = e.target;
          if (t instanceof HTMLImageElement) {
            onSelectImage(t);
          } else {
            selectedImageRef.current = null;
            setHasSelectedImage(false);
          }
        }}
        className={`w-full rounded border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-400 ${minHeightClassName} [&_a]:text-msv-blue [&_a]:underline [&_img]:h-auto [&_img]:max-w-full [&_li]:ml-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:my-2 [&_ul]:list-disc [&_ul]:pl-5`}
      />
    </div>
  );
}
