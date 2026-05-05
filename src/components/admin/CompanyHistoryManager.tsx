"use client";

import { useCallback, useState } from "react";
import type { CompanyHistoryEntry } from "@/types/company-history-entry";

type Props = { initialItems: CompanyHistoryEntry[] };

function newRowId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `r-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function CompanyHistoryManager({ initialItems }: Props) {
  const [items, setItems] = useState<CompanyHistoryEntry[]>(() =>
    initialItems.map((r, i) => ({
      ...r,
      sortOrder: i,
    })),
  );
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [savedHint, setSavedHint] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setError(null);
    try {
      const res = await fetch("/api/admin/company-history", { credentials: "same-origin" });
      if (res.status === 401) {
        window.location.href = "/admin/login";
        return;
      }
      if (!res.ok) throw new Error("fail");
      const next = (await res.json()) as CompanyHistoryEntry[];
      setItems(next.map((r, i) => ({ ...r, sortOrder: i })));
    } catch {
      setError("목록을 불러오지 못했습니다.");
    }
  }, []);

  function updateRow(id: string, patch: Partial<Pick<CompanyHistoryEntry, "period" | "body">>) {
    setItems((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
    setSavedHint(null);
  }

  function addRow() {
    const i = items.length;
    setItems((prev) => [
      ...prev,
      {
        id: newRowId(),
        sortOrder: i,
        period: "",
        body: "",
        createdAt: "",
        updatedAt: "",
      },
    ]);
    setSavedHint(null);
  }

  function removeRow(id: string) {
    setItems((prev) => prev.filter((r) => r.id !== id).map((r, idx) => ({ ...r, sortOrder: idx })));
    setSavedHint(null);
  }

  function move(id: string, dir: -1 | 1) {
    setItems((prev) => {
      const idx = prev.findIndex((r) => r.id === id);
      const j = idx + dir;
      if (idx < 0 || j < 0 || j >= prev.length) return prev;
      const copy = [...prev];
      const t = copy[idx]!;
      copy[idx] = copy[j]!;
      copy[j] = t;
      return copy.map((r, i) => ({ ...r, sortOrder: i }));
    });
    setSavedHint(null);
  }

  async function save() {
    setError(null);
    setSavedHint(null);
    setBusy(true);
    try {
      const payload = {
        items: items.map((r) => ({ period: r.period.trim(), body: r.body.trim() })),
      };
      const res = await fetch("/api/admin/company-history", {
        method: "PUT",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      let data: CompanyHistoryEntry[] | { error?: string; detail?: string } = [];
      try {
        data = (await res.json()) as CompanyHistoryEntry[] | { error?: string; detail?: string };
      } catch {
        data = { error: "서버 응답을 해석하지 못했습니다." };
      }
      if (!res.ok) {
        const err = data as { error?: string; detail?: string };
        const parts = [err.error, err.detail].filter(Boolean);
        setError(parts.length ? parts.join(" — ") : "저장 실패");
        return;
      }
      const next = data as CompanyHistoryEntry[];
      setItems(next.map((r, i) => ({ ...r, sortOrder: i })));
      setSavedHint("저장했습니다. 회사 소개 페이지에 반영됩니다.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-6">
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      {savedHint ? <p className="text-sm text-emerald-700">{savedHint}</p> : null}

      <p className="text-sm text-zinc-600">
        시기(예: 2018년 9월)와 내용을 입력합니다. 위에서부터 순서대로 공개 페이지에 표시됩니다. DB에 저장된 행이 없을 때는
        코드에 있는 기본 연혁이 보이며, 여기서 저장하면 DB 값으로 대체됩니다.
      </p>

      <div className="overflow-x-auto rounded-lg border border-zinc-200 bg-white">
        <table className="min-w-[36rem] w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-zinc-200 bg-zinc-50">
              <th className="px-3 py-2 font-medium text-zinc-700">순서</th>
              <th className="px-3 py-2 font-medium text-zinc-700">시기</th>
              <th className="px-3 py-2 font-medium text-zinc-700">내용</th>
              <th className="px-3 py-2 font-medium text-zinc-700">이동</th>
              <th className="px-3 py-2 font-medium text-zinc-700">삭제</th>
            </tr>
          </thead>
          <tbody>
            {items.map((row, index) => (
              <tr key={row.id} className="border-b border-zinc-100 align-top last:border-0">
                <td className="px-3 py-2 tabular-nums text-zinc-500">{index + 1}</td>
                <td className="px-3 py-2">
                  <input
                    type="text"
                    value={row.period}
                    onChange={(e) => updateRow(row.id, { period: e.target.value })}
                    className="w-full min-w-[7rem] rounded border border-zinc-200 px-2 py-1.5 text-sm outline-none focus:border-zinc-400"
                    placeholder="2018년 9월"
                    disabled={busy}
                  />
                </td>
                <td className="px-3 py-2">
                  <textarea
                    value={row.body}
                    onChange={(e) => updateRow(row.id, { body: e.target.value })}
                    rows={2}
                    className="w-full min-w-[14rem] resize-y rounded border border-zinc-200 px-2 py-1.5 text-sm outline-none focus:border-zinc-400"
                    placeholder="내용"
                    disabled={busy}
                  />
                </td>
                <td className="px-3 py-2 whitespace-nowrap">
                  <button
                    type="button"
                    disabled={busy || index === 0}
                    onClick={() => move(row.id, -1)}
                    className="rounded border border-zinc-200 px-2 py-1 text-xs text-zinc-700 hover:bg-zinc-50 disabled:opacity-40"
                  >
                    ↑
                  </button>{" "}
                  <button
                    type="button"
                    disabled={busy || index === items.length - 1}
                    onClick={() => move(row.id, 1)}
                    className="rounded border border-zinc-200 px-2 py-1 text-xs text-zinc-700 hover:bg-zinc-50 disabled:opacity-40"
                  >
                    ↓
                  </button>
                </td>
                <td className="px-3 py-2">
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => removeRow(row.id)}
                    className="text-xs font-medium text-red-600 hover:underline disabled:opacity-40"
                  >
                    삭제
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          disabled={busy}
          onClick={addRow}
          className="rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-50 disabled:opacity-40"
        >
          행 추가
        </button>
        <button
          type="button"
          disabled={busy}
          onClick={() => void reload()}
          className="rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-50 disabled:opacity-40"
        >
          서버에서 다시 불러오기
        </button>
        <button
          type="button"
          disabled={busy}
          onClick={() => void save()}
          className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-40"
        >
          {busy ? "저장 중…" : "전체 저장"}
        </button>
      </div>
    </div>
  );
}
