"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { TaxCalendarEvent, TaxCalendarKind } from "@/types/tax-calendar-event";

const KIND_LABEL: Record<TaxCalendarKind, string> = {
  TDS: "TDS",
  GST: "GST",
  PT: "PT",
  ESI: "ESI",
  ECB: "ECB",
  ADVANCE_TAX: "Adv.Tax",
  SHAREHOLDER_MEETING: "주주회의",
};

/** 네이비 배경(주간) 위 이벤트 칩 — 빨간색 강조 */
const EVENT_CHIP_DARK =
  "border-red-400/55 bg-red-600/40 text-red-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]";

/** 밝은 배경(월간·상세) 이벤트 칩 */
const EVENT_CHIP_LIGHT = "border-red-300 bg-red-50 text-red-900";

const KINDS: TaxCalendarKind[] = [
  "TDS",
  "GST",
  "PT",
  "ESI",
  "ECB",
  "ADVANCE_TAX",
  "SHAREHOLDER_MEETING",
];

function toYmd(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function startOfWeekMonday(ref: Date): Date {
  const d = new Date(ref.getFullYear(), ref.getMonth(), ref.getDate());
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  return d;
}

function addDays(d: Date, n: number): Date {
  const x = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  x.setDate(x.getDate() + n);
  return x;
}

function daysInMonth(year: number, monthIndex: number): number {
  return new Date(year, monthIndex + 1, 0).getDate();
}

function formatYmdKo(ymd: string): string {
  const [y, m, d] = ymd.split("-").map(Number);
  if (!y || !m || !d) return ymd;
  return `${y}년 ${m}월 ${d}일`;
}

const WEEKDAY_KO = ["월", "화", "수", "목", "금", "토", "일"] as const;

type Props = {
  events: TaxCalendarEvent[];
};

type MonthCell = { type: "blank" } | { type: "day"; day: number };

function buildMonthCells(year: number, monthIndex: number): MonthCell[] {
  const firstDow = new Date(year, monthIndex, 1).getDay();
  const mondayBased = firstDow === 0 ? 6 : firstDow - 1;
  const dim = daysInMonth(year, monthIndex);
  const cells: MonthCell[] = [];
  for (let i = 0; i < mondayBased; i += 1) cells.push({ type: "blank" });
  for (let day = 1; day <= dim; day += 1) cells.push({ type: "day", day });
  while (cells.length % 7 !== 0) cells.push({ type: "blank" });
  while (cells.length < 42) cells.push({ type: "blank" });
  return cells;
}

export function ComplianceCalendarWidget({ events }: Props) {
  const [monthOpen, setMonthOpen] = useState(false);
  const [monthCursor, setMonthCursor] = useState(() => new Date());
  const [selectedDetailYmd, setSelectedDetailYmd] = useState<string | null>(null);

  const byDate = useMemo(() => {
    const m = new Map<string, TaxCalendarEvent[]>();
    for (const e of events) {
      const list = m.get(e.date) ?? [];
      list.push(e);
      m.set(e.date, list);
    }
    for (const [, list] of m) {
      list.sort((a, b) => a.kind.localeCompare(b.kind));
    }
    return m;
  }, [events]);

  const today = useMemo(() => new Date(), []);
  const weekStart = useMemo(() => startOfWeekMonday(today), [today]);
  const weekDays = useMemo(() => {
    const out: { date: Date; ymd: string }[] = [];
    for (let i = 0; i < 7; i += 1) {
      const date = addDays(weekStart, i);
      out.push({ date, ymd: toYmd(date) });
    }
    return out;
  }, [weekStart]);

  const monthYear = monthCursor.getFullYear();
  const monthIndex = monthCursor.getMonth();
  const monthCells = useMemo(() => buildMonthCells(monthYear, monthIndex), [monthYear, monthIndex]);

  const closeMonth = useCallback(() => {
    setMonthOpen(false);
    setSelectedDetailYmd(null);
  }, []);

  useEffect(() => {
    if (!monthOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMonth();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [monthOpen, closeMonth]);

  useEffect(() => {
    setSelectedDetailYmd(null);
  }, [monthYear, monthIndex]);

  const todayYmd = toYmd(new Date());

  const selectedDayEvents = selectedDetailYmd ? (byDate.get(selectedDetailYmd) ?? []) : [];

  return (
    <div className="relative mt-6">
      <p className="text-[11px] font-medium uppercase tracking-wider text-white/55">Week</p>
      <p className="mt-1 text-xs text-white/75">이번 주 주요 일정 (월~일)</p>
      <div className="mt-4 grid grid-cols-7 gap-1.5 text-center sm:gap-2">
        {weekDays.map(({ date, ymd }, i) => {
          const list = byDate.get(ymd) ?? [];
          const isToday = todayYmd === ymd;
          return (
            <div
              key={ymd}
              className={`flex min-h-[5.5rem] flex-col rounded-lg border px-1 py-2 sm:min-h-[6.5rem] sm:px-1.5 ${
                isToday
                  ? "border-msv-blue-soft/70 bg-white/10"
                  : "border-white/10 bg-white/[0.04]"
              }`}
            >
              <span className="text-[10px] font-semibold text-white/50">{WEEKDAY_KO[i]}</span>
              <span className={`text-sm font-bold tabular-nums ${isToday ? "text-msv-blue-soft" : "text-white"}`}>
                {date.getDate()}
              </span>
              <div className="mt-1 flex flex-1 flex-col gap-0.5">
                {list.map((ev) => (
                  <span
                    key={ev.id}
                    title={[KIND_LABEL[ev.kind], ev.title, ev.note].filter(Boolean).join(" — ")}
                    className={`truncate rounded border px-0.5 py-px text-[9px] font-semibold leading-tight sm:text-[10px] ${EVENT_CHIP_DARK}`}
                  >
                    {KIND_LABEL[ev.kind]}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => {
          setMonthCursor(new Date(today.getFullYear(), today.getMonth(), 1));
          setSelectedDetailYmd(null);
          setMonthOpen(true);
        }}
        className="mt-5 w-full rounded-lg border border-white/25 bg-white/10 py-2.5 text-sm font-semibold text-white transition hover:bg-white/15"
      >
        한 달 일정 보기
      </button>

      {monthOpen ? (
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center bg-black/50 p-3 sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="month-calendar-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeMonth();
          }}
        >
          <div
            className="max-h-[min(92vh,48rem)] w-full max-w-3xl overflow-auto rounded-xl border border-slate-200 bg-white p-5 shadow-xl sm:max-h-[min(92vh,52rem)] sm:p-7"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <button
                type="button"
                className="rounded border border-slate-200 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
                onClick={() => setMonthCursor(new Date(monthYear, monthIndex - 1, 1))}
                aria-label="이전 달"
              >
                ‹
              </button>
              <h3 id="month-calendar-title" className="text-lg font-bold text-msv-navy sm:text-xl">
                {monthYear}년 {monthIndex + 1}월
              </h3>
              <button
                type="button"
                className="rounded border border-slate-200 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
                onClick={() => setMonthCursor(new Date(monthYear, monthIndex + 1, 1))}
                aria-label="다음 달"
              >
                ›
              </button>
            </div>
            <div className="mt-4 grid grid-cols-7 gap-1 text-center text-xs font-semibold text-slate-500 sm:gap-1.5 sm:text-[13px]">
              {WEEKDAY_KO.map((d) => (
                <div key={d} className="py-1.5 sm:py-2">
                  {d}
                </div>
              ))}
            </div>
            <div className="mt-2 grid grid-cols-7 gap-1 sm:gap-1.5">
              {monthCells.map((cell, idx) => {
                if (cell.type === "blank") {
                  return (
                    <div
                      key={`b-${idx}`}
                      className="min-h-[4.25rem] rounded-md bg-slate-50/60 sm:min-h-[5.25rem]"
                    />
                  );
                }
                const ymd = `${monthYear}-${String(monthIndex + 1).padStart(2, "0")}-${String(cell.day).padStart(2, "0")}`;
                const list = byDate.get(ymd) ?? [];
                const isToday = todayYmd === ymd;
                const isSelected = selectedDetailYmd === ymd;
                return (
                  <button
                    key={ymd}
                    type="button"
                    aria-pressed={isSelected}
                    aria-label={`${cell.day}일, 일정 ${list.length}건`}
                    onClick={() => setSelectedDetailYmd(ymd)}
                    className={`flex min-h-[4.25rem] w-full flex-col rounded-md border p-1 text-left transition hover:border-msv-blue/35 hover:bg-slate-50/90 sm:min-h-[5.25rem] sm:p-1.5 ${
                      isSelected
                        ? "border-msv-blue ring-2 ring-msv-blue/30 ring-offset-1"
                        : isToday
                          ? "border-msv-blue/50 bg-msv-blue-soft/60"
                          : "border-slate-200 bg-white"
                    }`}
                  >
                    <span
                      className={`text-sm font-bold tabular-nums sm:text-base ${isToday ? "text-msv-blue" : "text-msv-navy"}`}
                    >
                      {cell.day}
                    </span>
                    <div className="mt-1 flex flex-col gap-0.5">
                      {list.slice(0, 3).map((ev) => (
                        <span
                          key={ev.id}
                          className={`truncate rounded border px-0.5 py-px text-[9px] font-semibold leading-tight sm:text-[10px] ${EVENT_CHIP_LIGHT}`}
                        >
                          {KIND_LABEL[ev.kind]}
                        </span>
                      ))}
                      {list.length > 3 ? (
                        <span className="text-[9px] text-slate-500 sm:text-[10px]">+{list.length - 3}</span>
                      ) : null}
                    </div>
                  </button>
                );
              })}
            </div>

            {selectedDetailYmd ? (
              <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-4 sm:p-5">
                <p className="text-sm font-bold text-msv-navy">{formatYmdKo(selectedDetailYmd)}</p>
                {selectedDayEvents.length === 0 ? (
                  <p className="mt-2 text-sm text-slate-500">등록된 일정이 없습니다.</p>
                ) : (
                  <ul className="mt-3 space-y-3">
                    {selectedDayEvents.map((ev) => (
                      <li
                        key={ev.id}
                        className="rounded-md border border-slate-200 bg-white p-3 text-sm shadow-sm"
                      >
                        <span
                          className={`inline-block rounded border px-2 py-0.5 text-xs font-semibold ${EVENT_CHIP_LIGHT}`}
                        >
                          {KIND_LABEL[ev.kind]}
                        </span>
                        {ev.title ? (
                          <p className="mt-2 font-semibold leading-snug text-msv-navy">{ev.title}</p>
                        ) : null}
                        {ev.note ? <p className="mt-1.5 text-xs leading-relaxed text-slate-600">{ev.note}</p> : null}
                        {!ev.title && !ev.note ? (
                          <p className="mt-1 text-xs text-slate-500">제목·비고 없이 유형만 등록되었습니다.</p>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ) : null}

            <div className="mt-5 flex flex-wrap gap-2 border-t border-slate-100 pt-4 text-[10px] text-slate-600 sm:mt-6">
              {KINDS.map((k) => (
                <span key={k} className={`rounded border px-1.5 py-0.5 font-semibold ${EVENT_CHIP_LIGHT}`}>
                  {KIND_LABEL[k]}
                </span>
              ))}
            </div>
            <button
              type="button"
              className="mt-5 w-full rounded-lg bg-msv-navy py-3 text-sm font-semibold text-white hover:bg-msv-navy/90 sm:py-3.5"
              onClick={closeMonth}
            >
              닫기
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
