"use client";

import { useCallback, useEffect, useState } from "react";
import type { CompanyProfilePdfMeta } from "@/lib/company-profile-pdf";

function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(2)} MB`;
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}

export function CompanyProfilePdfForm() {
  const [meta, setMeta] = useState<CompanyProfilePdfMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/company-profile-pdf", { cache: "no-store" });
      const data = (await res.json()) as CompanyProfilePdfMeta & { error?: string };
      if (!res.ok) {
        setError(data.error ?? "파일 정보를 불러오지 못했습니다.");
        setMeta(null);
        return;
      }
      setMeta(data);
    } catch {
      setError("파일 정보를 불러오지 못했습니다.");
      setMeta(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage(null);
    setError(null);
    const input = (e.currentTarget.elements.namedItem("file") as HTMLInputElement | null)?.files?.[0];
    if (!input) {
      setError("PDF 파일을 선택해 주세요.");
      return;
    }
    setUploading(true);
    try {
      const fd = new FormData();
      fd.set("file", input);
      const res = await fetch("/api/admin/company-profile-pdf", { method: "POST", body: fd });
      const data = (await res.json()) as CompanyProfilePdfMeta & { error?: string };
      if (!res.ok) {
        setError(data.error ?? "업로드에 실패했습니다.");
        return;
      }
      setMeta(data);
      setMessage("회사 프로필 PDF가 교체되었습니다. 공개 사이트 링크에 즉시 반영됩니다.");
      e.currentTarget.reset();
    } catch {
      setError("업로드에 실패했습니다.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-700">
        {loading ? (
          <p>파일 정보를 불러오는 중…</p>
        ) : meta?.exists ? (
          <ul className="space-y-1">
            <li>
              공개 경로:{" "}
              <a href={meta.path} target="_blank" rel="noopener noreferrer" className="font-medium text-msv-navy underline-offset-2 hover:underline">
                {meta.path}
              </a>
            </li>
            {meta.sizeBytes != null ? <li>크기: {formatBytes(meta.sizeBytes)}</li> : null}
            {meta.updatedAt ? <li>마지막 수정: {formatDate(meta.updatedAt)}</li> : null}
          </ul>
        ) : (
          <p className="break-keep">등록된 PDF 없음 — 업로드 시 공개 「회사 프로필 PDF」 링크에 연결.</p>
        )}
      </div>

      {error ? (
        <p className="rounded border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-800">{error}</p>
      ) : null}
      {message ? (
        <p className="rounded border border-emerald-300 bg-emerald-50 px-3 py-2 text-sm text-emerald-900">{message}</p>
      ) : null}

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label htmlFor="company-profile-pdf" className="block text-sm font-semibold text-slate-800">
            새 PDF 파일
          </label>
          <p className="mt-1 text-xs text-slate-600 break-keep">PDF만 · 최대 25MB · 업로드 시 기존 파일 덮어쓰기</p>
          <input
            id="company-profile-pdf"
            name="file"
            type="file"
            accept="application/pdf,.pdf"
            className="mt-2 block w-full max-w-md text-sm text-slate-700 file:mr-3 file:rounded file:border file:border-slate-300 file:bg-white file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-slate-800"
          />
        </div>
        <button
          type="submit"
          disabled={uploading}
          className="rounded border border-msv-navy bg-msv-navy px-4 py-2 text-sm font-semibold text-white transition hover:bg-msv-navy/90 disabled:opacity-60"
        >
          {uploading ? "업로드 중…" : "PDF 교체·업로드"}
        </button>
      </form>
    </div>
  );
}
