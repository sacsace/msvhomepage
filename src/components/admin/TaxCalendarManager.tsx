"use client";

import { useCallback, useState } from "react";
import {
  TAX_CALENDAR_FORM_CUSTOM,
  TAX_CALENDAR_KINDS,
  TAX_CALENDAR_KIND_LABEL_FULL,
  isTaxCalendarPresetKind,
  taxCalendarKindLabelFull,
  type TaxCalendarEvent,
  type TaxCalendarKind,
} from "@/types/tax-calendar-event";

type Props = { initialItems: TaxCalendarEvent[] };

function initialKindSelect(kind: string): TaxCalendarKind | typeof TAX_CALENDAR_FORM_CUSTOM {
  return isTaxCalendarPresetKind(kind) ? kind : TAX_CALENDAR_FORM_CUSTOM;
}

export function TaxCalendarManager({ initialItems }: Props) {
  const [items, setItems] = useState(initialItems);
  const [error, setError] = useState<string | null>(null);
  const [date, setDate] = useState("");
  const [kindSelect, setKindSelect] = useState<TaxCalendarKind | typeof TAX_CALENDAR_FORM_CUSTOM>("GST");
  const [customKind, setCustomKind] = useState("");
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setError(null);
    try {
      const res = await fetch("/api/admin/tax-calendar");
      if (res.status === 401) {
        window.location.href = "/admin/login";
        return;
      }
      if (!res.ok) throw new Error("fail");
      setItems(await res.json());
    } catch {
      setError("목록을 불러오지 못했습니다.");
    }
  }, []);

  function resolveKindForSubmit(): string | null {
    if (kindSelect === TAX_CALENDAR_FORM_CUSTOM) {
      const t = customKind.trim();
      return t || null;
    }
    return kindSelect;
  }

  async function create(e: React.FormEvent) {
    e.preventDefault();
    if (!date) {
      setError("날짜를 선택하세요.");
      return;
    }
    const kind = resolveKindForSubmit();
    if (!kind) {
      setError("유형을 직접 입력해 주세요.");
      return;
    }
    const res = await fetch("/api/admin/tax-calendar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date, kind, title: title || undefined, note: note || undefined }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(String(data.error || "등록 실패"));
      return;
    }
    setTitle("");
    setNote("");
    setCustomKind("");
    setKindSelect("GST");
    await reload();
  }

  async function remove(id: string) {
    if (!confirm("삭제할까요?")) return;
    const res = await fetch(`/api/admin/tax-calendar/${id}`, { method: "DELETE" });
    if (!res.ok) {
      setError("삭제 실패");
      return;
    }
    setEditingId(null);
    await reload();
  }

  async function saveRow(id: string, partial: Partial<TaxCalendarEvent>) {
    const res = await fetch(`/api/admin/tax-calendar/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(partial),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(String(data.error || "저장 실패"));
      return;
    }
    setEditingId(null);
    await reload();
  }

  const sorted = [...items].sort((a, b) => a.date.localeCompare(b.date) || a.kind.localeCompare(b.kind));

  return (
    <div className="space-y-8">
      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <section className="border border-zinc-200 bg-white p-5">
        <h2 className="text-sm font-medium text-zinc-900">일정 추가</h2>
        <form onSubmit={create} className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end">
          <label className="block text-xs text-zinc-600">
            날짜
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 block w-full rounded border border-zinc-300 px-2 py-1.5 text-sm sm:w-40"
              required
            />
          </label>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
            <label className="block text-xs text-zinc-600">
              유형
              <select
                value={kindSelect}
                onChange={(e) => {
                  const v = e.target.value as TaxCalendarKind | typeof TAX_CALENDAR_FORM_CUSTOM;
                  setKindSelect(v);
                  if (v !== TAX_CALENDAR_FORM_CUSTOM) setCustomKind("");
                }}
                className="mt-1 block w-full rounded border border-zinc-300 px-2 py-1.5 text-sm sm:w-52"
              >
                {TAX_CALENDAR_KINDS.map((k) => (
                  <option key={k} value={k}>
                    {TAX_CALENDAR_KIND_LABEL_FULL[k]}
                  </option>
                ))}
                <option value={TAX_CALENDAR_FORM_CUSTOM}>직접 입력</option>
              </select>
            </label>
            {kindSelect === TAX_CALENDAR_FORM_CUSTOM ? (
              <label className="block min-w-[10rem] text-xs text-zinc-600 sm:min-w-[12rem]">
                유형 직접 입력
                <input
                  value={customKind}
                  onChange={(e) => setCustomKind(e.target.value)}
                  className="mt-1 block w-full rounded border border-zinc-300 px-2 py-1.5 text-sm"
                  placeholder="예: RBI 보고, FEMA"
                  maxLength={60}
                  aria-required
                />
              </label>
            ) : null}
          </div>
          <label className="block min-w-[8rem] flex-1 text-xs text-zinc-600">
            제목 (선택)
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full rounded border border-zinc-300 px-2 py-1.5 text-sm"
              placeholder="예: 분기 말 TDS"
            />
          </label>
          <label className="block min-w-[10rem] flex-1 text-xs text-zinc-600">
            비고 (선택)
            <input
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="mt-1 block w-full rounded border border-zinc-300 px-2 py-1.5 text-sm"
            />
          </label>
          <button
            type="submit"
            className="rounded bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
          >
            등록
          </button>
        </form>
      </section>

      <section className="border border-zinc-200 bg-white">
        <div className="border-b border-zinc-100 px-5 py-3">
          <h2 className="text-sm font-medium text-zinc-900">등록된 일정</h2>
          <p className="mt-1 text-xs text-zinc-500">홈 화면 오른쪽 달력에 표시됩니다.</p>
        </div>
        {sorted.length === 0 ? (
          <p className="px-5 py-8 text-sm text-zinc-500">등록된 일정이 없습니다.</p>
        ) : (
          <ul className="divide-y divide-zinc-100">
            {sorted.map((row) => (
              <li key={row.id} className="px-5 py-4">
                {editingId === row.id ? (
                  <EditRow
                    row={row}
                    onCancel={() => setEditingId(null)}
                    onSave={(updates) => saveRow(row.id, updates)}
                  />
                ) : (
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-zinc-900">
                        {row.date}{" "}
                        <span className="font-normal text-msv-blue">{taxCalendarKindLabelFull(row.kind)}</span>
                      </p>
                      {row.title ? <p className="mt-1 text-sm text-zinc-700">{row.title}</p> : null}
                      {row.note ? <p className="mt-1 text-xs text-zinc-500">{row.note}</p> : null}
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setEditingId(row.id)}
                        className="text-xs font-medium text-msv-blue hover:underline"
                      >
                        수정
                      </button>
                      <button
                        type="button"
                        onClick={() => remove(row.id)}
                        className="text-xs font-medium text-red-600 hover:underline"
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function EditRow({
  row,
  onCancel,
  onSave,
}: {
  row: TaxCalendarEvent;
  onCancel: () => void;
  onSave: (p: Partial<TaxCalendarEvent>) => void | Promise<void>;
}) {
  const [date, setDate] = useState(row.date);
  const [kindSelect, setKindSelect] = useState(() => initialKindSelect(row.kind));
  const [customKind, setCustomKind] = useState(() =>
    isTaxCalendarPresetKind(row.kind) ? "" : row.kind,
  );
  const [title, setTitle] = useState(row.title ?? "");
  const [note, setNote] = useState(row.note ?? "");

  function resolvedKind(): string | null {
    if (kindSelect === TAX_CALENDAR_FORM_CUSTOM) {
      const t = customKind.trim();
      return t || null;
    }
    return kindSelect;
  }

  return (
    <form
      className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end"
      onSubmit={(e) => {
        e.preventDefault();
        const kind = resolvedKind();
        if (!kind) {
          return;
        }
        void onSave({ date, kind, title: title.trim() || undefined, note: note.trim() || undefined });
      }}
    >
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="rounded border border-zinc-300 px-2 py-1.5 text-sm"
      />
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
        <select
          value={kindSelect}
          onChange={(e) => {
            const v = e.target.value as TaxCalendarKind | typeof TAX_CALENDAR_FORM_CUSTOM;
            setKindSelect(v);
            if (v !== TAX_CALENDAR_FORM_CUSTOM) setCustomKind("");
          }}
          className="rounded border border-zinc-300 px-2 py-1.5 text-sm"
        >
          {TAX_CALENDAR_KINDS.map((k) => (
            <option key={k} value={k}>
              {TAX_CALENDAR_KIND_LABEL_FULL[k]}
            </option>
          ))}
          <option value={TAX_CALENDAR_FORM_CUSTOM}>직접 입력</option>
        </select>
        {kindSelect === TAX_CALENDAR_FORM_CUSTOM ? (
          <input
            value={customKind}
            onChange={(e) => setCustomKind(e.target.value)}
            className="min-w-[12rem] rounded border border-zinc-300 px-2 py-1.5 text-sm"
            placeholder="유형 입력"
            maxLength={60}
          />
        ) : null}
      </div>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="min-w-[10rem] flex-1 rounded border border-zinc-300 px-2 py-1.5 text-sm"
        placeholder="제목"
      />
      <input
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="min-w-[10rem] flex-1 rounded border border-zinc-300 px-2 py-1.5 text-sm"
        placeholder="비고"
      />
      <div className="flex gap-2">
        <button type="submit" className="rounded bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white">
          저장
        </button>
        <button type="button" onClick={onCancel} className="rounded border border-zinc-300 px-3 py-1.5 text-xs">
          취소
        </button>
      </div>
    </form>
  );
}
