"use client";

import { useCallback, useMemo, useState } from "react";
import {
  formatTaxCalendarTemplateDateLabel,
  taxCalendarTemplateMatchesPeriod,
} from "@/lib/tax-calendar-expand";
import {
  TAX_CALENDAR_FORM_CUSTOM,
  TAX_CALENDAR_KINDS,
  TAX_CALENDAR_KIND_LABEL_FULL,
  TAX_CALENDAR_RECURRENCE_LABELS,
  TAX_CALENDAR_RECURRENCES,
  isTaxCalendarPresetKind,
  normalizeTaxCalendarRecurrence,
  taxCalendarKindLabelFull,
  type TaxCalendarEvent,
  type TaxCalendarKind,
  type TaxCalendarRecurrence,
} from "@/types/tax-calendar-event";
import {
  adminBoardCard,
  adminBoardRow,
  adminBoardTd,
  adminBoardTh,
  adminDangerBtn,
  adminDetailsShell,
  adminDetailsSummary,
  adminGhostBtn,
} from "@/components/admin/admin-board-styles";

type Props = { initialItems: TaxCalendarEvent[] };

const ALL_MONTHS_VALUE = "0";

function initialKindSelect(kind: string): TaxCalendarKind | typeof TAX_CALENDAR_FORM_CUSTOM {
  return isTaxCalendarPresetKind(kind) ? kind : TAX_CALENDAR_FORM_CUSTOM;
}

function sortTemplates(list: TaxCalendarEvent[]): TaxCalendarEvent[] {
  return [...list].sort((a, b) => {
    const ra = normalizeTaxCalendarRecurrence(a.recurrence);
    const rb = normalizeTaxCalendarRecurrence(b.recurrence);
    if (ra !== rb) {
      const order: Record<TaxCalendarRecurrence, number> = { MONTHLY: 0, YEARLY: 1, FIXED: 2 };
      if (order[ra] !== order[rb]) return order[ra] - order[rb];
    }
    return a.date.localeCompare(b.date) || a.kind.localeCompare(b.kind);
  });
}

function deriveYearOptions(items: TaxCalendarEvent[], currentYear: number): number[] {
  const years = new Set<number>();
  years.add(currentYear);
  years.add(currentYear - 1);
  years.add(currentYear + 1);
  for (const e of items) {
    const y = Number(e.date.slice(0, 4));
    if (Number.isFinite(y)) years.add(y);
  }
  return [...years].sort((a, b) => a - b);
}

const fieldInputClass =
  "mt-1 block w-full rounded border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-500";

export function TaxCalendarManager({ initialItems }: Props) {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  const [items, setItems] = useState(initialItems);
  const [error, setError] = useState<string | null>(null);
  const [filterYear, setFilterYear] = useState(String(currentYear));
  const [filterMonth, setFilterMonth] = useState(String(currentMonth));
  const [date, setDate] = useState("");
  const [recurrence, setRecurrence] = useState<TaxCalendarRecurrence>("YEARLY");
  const [kindSelect, setKindSelect] = useState<TaxCalendarKind | typeof TAX_CALENDAR_FORM_CUSTOM>("GST");
  const [customKind, setCustomKind] = useState("");
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const yearOptions = useMemo(() => deriveYearOptions(items, currentYear), [items, currentYear]);

  const filtered = useMemo(() => {
    const year = Number(filterYear);
    if (!Number.isFinite(year)) return sortTemplates(items);
    const month = filterMonth === ALL_MONTHS_VALUE ? null : Number(filterMonth);
    if (month !== null && (month < 1 || month > 12)) {
      return sortTemplates(items);
    }
    return sortTemplates(items.filter((e) => taxCalendarTemplateMatchesPeriod(e, year, month)));
  }, [items, filterYear, filterMonth]);

  const reload = useCallback(async () => {
    setError(null);
    try {
      const res = await fetch("/api/admin/tax-calendar", { credentials: "same-origin" });
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
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date,
        kind,
        recurrence,
        title: title || undefined,
        note: note || undefined,
      }),
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
    setRecurrence("YEARLY");
    await reload();
  }

  async function remove(id: string) {
    if (!confirm("삭제할까요?")) return;
    const res = await fetch(`/api/admin/tax-calendar/${id}`, {
      method: "DELETE",
      credentials: "same-origin",
    });
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
      credentials: "same-origin",
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

  const createForm = (
    <form
      onSubmit={create}
      className="space-y-4 border-t border-slate-200 px-4 py-4 sm:flex sm:flex-wrap sm:items-end sm:gap-3 sm:px-5 sm:py-5"
    >
      <label className="block text-xs font-medium text-slate-600 sm:w-40">
        기준 날짜
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className={fieldInputClass}
          required
        />
      </label>
      <label className="block text-xs font-medium text-slate-600 sm:w-28">
        반복
        <select
          value={recurrence}
          onChange={(e) => setRecurrence(e.target.value as TaxCalendarRecurrence)}
          className={fieldInputClass}
        >
          {TAX_CALENDAR_RECURRENCES.map((r) => (
            <option key={r} value={r}>
              {TAX_CALENDAR_RECURRENCE_LABELS[r]}
            </option>
          ))}
        </select>
      </label>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <label className="block text-xs font-medium text-slate-600 sm:w-52">
          유형
          <select
            value={kindSelect}
            onChange={(e) => {
              const v = e.target.value as TaxCalendarKind | typeof TAX_CALENDAR_FORM_CUSTOM;
              setKindSelect(v);
              if (v !== TAX_CALENDAR_FORM_CUSTOM) setCustomKind("");
            }}
            className={fieldInputClass}
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
          <label className="block min-w-[10rem] text-xs font-medium text-slate-600 sm:min-w-[12rem]">
            유형 직접 입력
            <input
              value={customKind}
              onChange={(e) => setCustomKind(e.target.value)}
              className={fieldInputClass}
              placeholder="예: RBI 보고, FEMA"
              maxLength={60}
              aria-required
            />
          </label>
        ) : null}
      </div>
      <label className="block min-w-[8rem] flex-1 text-xs font-medium text-slate-600">
        제목 (선택)
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={fieldInputClass}
          placeholder="예: 분기 말 TDS"
        />
      </label>
      <label className="block min-w-[10rem] flex-1 text-xs font-medium text-slate-600">
        비고 (선택)
        <input value={note} onChange={(e) => setNote(e.target.value)} className={fieldInputClass} />
      </label>
      <button
        type="submit"
        className="w-full border border-msv-navy bg-msv-navy px-4 py-2 text-sm font-semibold text-white transition hover:bg-msv-navy/90 sm:mt-6 sm:w-auto sm:self-end"
      >
        등록
      </button>
    </form>
  );

  return (
    <div className="space-y-6">
      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <details className={adminDetailsShell}>
        <summary className={adminDetailsSummary}>일정 추가</summary>
        {createForm}
      </details>

      <section>
        <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
          <h2 className="text-base font-semibold tracking-tight text-slate-900">게시판</h2>
          <div className="flex flex-wrap items-end gap-2">
            <label className="text-xs font-medium text-slate-600">
              연도
              <select
                value={filterYear}
                onChange={(e) => setFilterYear(e.target.value)}
                className="ml-1 rounded border border-slate-300 bg-white px-2 py-1.5 text-sm"
              >
                {yearOptions.map((y) => (
                  <option key={y} value={String(y)}>{y}</option>
                ))}
              </select>
            </label>
            <label className="text-xs font-medium text-slate-600">
              월
              <select
                value={filterMonth}
                onChange={(e) => setFilterMonth(e.target.value)}
                className="ml-1 rounded border border-slate-300 bg-white px-2 py-1.5 text-sm"
              >
                <option value={ALL_MONTHS_VALUE}>전체</option>
                {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                  <option key={m} value={String(m)}>{m}월</option>
                ))}
              </select>
            </label>
          </div>
        </div>
        <p className="mb-3 text-xs tabular-nums text-slate-500">
          총 {items.length}건 · 표시 {filtered.length}건
        </p>

        <div className={adminBoardCard}>
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[800px] border-collapse text-left">
              <thead>
                <tr>
                  <th className={`${adminBoardTh} w-10 text-center`}>No</th>
                  <th className={`${adminBoardTh} w-36 whitespace-nowrap`}>일정</th>
                  <th className={`${adminBoardTh} w-20`}>반복</th>
                  <th className={adminBoardTh}>유형</th>
                  <th className={adminBoardTh}>제목</th>
                  <th className={`${adminBoardTh} max-w-[12rem]`}>비고</th>
                  <th className={`${adminBoardTh} w-28 text-right`}>관리</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className={`${adminBoardTd} py-10 text-center text-sm text-slate-500`}>
                      해당 연·월에 일정이 없습니다.
                    </td>
                  </tr>
                ) : null}
                {filtered.map((row, i) => {
                  const no = String(i + 1).padStart(2, "0");
                  const rec = normalizeTaxCalendarRecurrence(row.recurrence);
                  if (editingId === row.id) {
                    return (
                      <tr key={row.id} className="bg-slate-50">
                        <td colSpan={7} className="border-b border-slate-200 px-4 py-4 sm:px-5">
                          <EditRow
                            row={row}
                            onCancel={() => setEditingId(null)}
                            onSave={(updates) => saveRow(row.id, updates)}
                            onValidationError={(msg) => setError(msg)}
                          />
                        </td>
                      </tr>
                    );
                  }
                  return (
                    <tr key={row.id} className={adminBoardRow}>
                      <td className={`${adminBoardTd} w-10 text-center text-xs tabular-nums text-slate-400`}>{no}</td>
                      <td className={`${adminBoardTd} whitespace-nowrap text-sm text-slate-800`}>
                        {formatTaxCalendarTemplateDateLabel(row)}
                      </td>
                      <td className={`${adminBoardTd} text-xs text-slate-600`}>
                        {TAX_CALENDAR_RECURRENCE_LABELS[rec]}
                      </td>
                      <td className={`${adminBoardTd} text-sm text-msv-blue`}>{taxCalendarKindLabelFull(row.kind)}</td>
                      <td className={`${adminBoardTd} text-slate-900`}>
                        <span className="line-clamp-2 text-sm">{(row.title || "").trim() || "—"}</span>
                      </td>
                      <td className={`${adminBoardTd} max-w-[12rem] text-slate-600`}>
                        <span className="line-clamp-2 text-xs">{(row.note || "").trim() || "—"}</span>
                      </td>
                      <td className={`${adminBoardTd} text-right`}>
                        <div className="flex justify-end gap-1">
                          <button
                            type="button"
                            onClick={() => {
                              setError(null);
                              setEditingId(row.id);
                            }}
                            className={adminGhostBtn}
                          >
                            수정
                          </button>
                          <button type="button" onClick={() => void remove(row.id)} className={adminDangerBtn}>
                            삭제
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <ul className="divide-y divide-slate-200 md:hidden" role="list">
            {filtered.length === 0 ? (
              <li className="px-4 py-10 text-center text-sm text-slate-500">해당 연·월에 일정이 없습니다.</li>
            ) : null}
            {filtered.map((row, i) => {
              const no = String(i + 1).padStart(2, "0");
              const rec = normalizeTaxCalendarRecurrence(row.recurrence);
              if (editingId === row.id) {
                return (
                  <li key={row.id} className="bg-slate-50 p-4">
                    <EditRow
                      row={row}
                      onCancel={() => setEditingId(null)}
                      onSave={(updates) => saveRow(row.id, updates)}
                      onValidationError={(msg) => setError(msg)}
                    />
                  </li>
                );
              }
              return (
                <li key={row.id} className="px-4 py-3.5">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[11px] font-medium tabular-nums text-slate-400">{no}</span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-slate-800">{formatTaxCalendarTemplateDateLabel(row)}</p>
                      <p className="mt-0.5 text-xs text-slate-500">{TAX_CALENDAR_RECURRENCE_LABELS[rec]}</p>
                      <p className="mt-0.5 text-sm font-medium text-msv-blue">{taxCalendarKindLabelFull(row.kind)}</p>
                      {row.title ? <p className="mt-1 text-sm text-slate-900">{row.title}</p> : null}
                      {row.note ? <p className="mt-1 line-clamp-2 text-xs text-slate-500">{row.note}</p> : null}
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-1">
                      <button
                        type="button"
                        onClick={() => {
                          setError(null);
                          setEditingId(row.id);
                        }}
                        className={adminGhostBtn}
                      >
                        수정
                      </button>
                      <button type="button" onClick={() => void remove(row.id)} className={adminDangerBtn}>
                        삭제
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </div>
  );
}

function EditRow({
  row,
  onCancel,
  onSave,
  onValidationError,
}: {
  row: TaxCalendarEvent;
  onCancel: () => void;
  onSave: (p: Partial<TaxCalendarEvent>) => void | Promise<void>;
  onValidationError: (message: string) => void;
}) {
  const [date, setDate] = useState(row.date);
  const [recurrence, setRecurrence] = useState<TaxCalendarRecurrence>(
    () => normalizeTaxCalendarRecurrence(row.recurrence),
  );
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
      className="flex flex-col flex-wrap gap-3 sm:flex-row sm:items-end"
      onSubmit={(e) => {
        e.preventDefault();
        const kind = resolvedKind();
        if (!kind) {
          onValidationError("유형을 직접 입력해 주세요.");
          return;
        }
        void onSave({
          date,
          kind,
          recurrence,
          title: title.trim() || undefined,
          note: note.trim() || undefined,
        });
      }}
    >
      <label className="block text-xs font-medium text-slate-600 sm:w-36">
        기준 날짜
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className={fieldInputClass}
        />
      </label>
      <label className="block text-xs font-medium text-slate-600 sm:w-28">
        반복
        <select
          value={recurrence}
          onChange={(e) => setRecurrence(e.target.value as TaxCalendarRecurrence)}
          className={fieldInputClass}
        >
          {TAX_CALENDAR_RECURRENCES.map((r) => (
            <option key={r} value={r}>
              {TAX_CALENDAR_RECURRENCE_LABELS[r]}
            </option>
          ))}
        </select>
      </label>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
        <label className="block text-xs font-medium text-slate-600 sm:w-48">
          유형
          <select
            value={kindSelect}
            onChange={(e) => {
              const v = e.target.value as TaxCalendarKind | typeof TAX_CALENDAR_FORM_CUSTOM;
              setKindSelect(v);
              if (v !== TAX_CALENDAR_FORM_CUSTOM) setCustomKind("");
            }}
            className={fieldInputClass}
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
          <input
            value={customKind}
            onChange={(e) => setCustomKind(e.target.value)}
            className="min-w-[12rem] rounded border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
            placeholder="유형 입력"
            maxLength={60}
          />
        ) : null}
      </div>
      <label className="block min-w-[10rem] flex-1 text-xs font-medium text-slate-600">
        제목
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={fieldInputClass}
          placeholder="제목"
        />
      </label>
      <label className="block min-w-[10rem] flex-1 text-xs font-medium text-slate-600">
        비고
        <input
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className={fieldInputClass}
          placeholder="비고"
        />
      </label>
      <div className="flex flex-wrap gap-2 sm:ml-auto sm:self-end">
        <button
          type="submit"
          className="border border-msv-navy bg-msv-navy px-3 py-1.5 text-sm font-semibold text-white"
        >
          저장
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="border border-slate-300 bg-white px-3 py-1.5 text-sm"
        >
          취소
        </button>
      </div>
    </form>
  );
}
