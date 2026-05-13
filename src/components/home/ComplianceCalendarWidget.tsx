"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { homeTypo } from "@/lib/home-typography";
import {
  complianceCalendarUi,
  formatMonthTitle,
  formatYmdLong,
  weekdayShortLabels,
} from "@/lib/i18n/public-home";
import type { SiteLocale } from "@/lib/site-locale";
import {
  TAX_CALENDAR_KINDS,
  taxCalendarKindLabelCompact,
  type TaxCalendarEvent,
} from "@/types/tax-calendar-event";

/** 네이비 배경(주간) 위 이벤트 칩 — 빨간색 강조 */
const EVENT_CHIP_DARK =
  "border-red-400/55 bg-red-600/40 text-red-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]";

/** 밝은 배경(월간·상세) 이벤트 칩 */
const EVENT_CHIP_LIGHT = "border-red-300 bg-red-50 text-red-900";

/** 휴일 전용 — 신고·준수(빨강)과 구분 */
const EVENT_CHIP_HOLIDAY_DARK =
  "border-emerald-400/55 bg-emerald-800/45 text-emerald-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]";
const EVENT_CHIP_HOLIDAY_LIGHT = "border-emerald-400 bg-emerald-50 text-emerald-900";

function isHolidayEventKind(kind: string): boolean {
  const k = kind.trim();
  return k === "HOLIDAY" || k === "휴일";
}

function eventChipClass(kind: string, variant: "dark" | "light"): string {
  if (isHolidayEventKind(kind)) {
    return variant === "dark" ? EVENT_CHIP_HOLIDAY_DARK : EVENT_CHIP_HOLIDAY_LIGHT;
  }
  return variant === "dark" ? EVENT_CHIP_DARK : EVENT_CHIP_LIGHT;
}

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

export type ComplianceCalendarVariant = "week" | "month";

type Props = {
  events: TaxCalendarEvent[];
  locale?: SiteLocale;
  /** `month`: 인라인 월 그리드(신고준수 달력 페이지). 기본 `week`는 홈과 동일. */
  variant?: ComplianceCalendarVariant;
  /** `variant="month"`일 때 본문 흰 카드 안에 넣을 때 true — 라이트 그리드·슬레이트 테두리 */
  embedMonthOnLight?: boolean;
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

export function ComplianceCalendarWidget({
  events,
  locale = "ko",
  variant = "week",
  embedMonthOnLight = false,
}: Props) {
  const ui = useMemo(() => complianceCalendarUi(locale), [locale]);
  const weekLabels = useMemo(() => weekdayShortLabels(locale), [locale]);
  const kindLocale: "ko" | "en" | "zh" = locale === "en" ? "en" : locale === "zh" ? "zh" : "ko";

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
    if (variant !== "week" || !monthOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMonth();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [variant, monthOpen, closeMonth]);

  useEffect(() => {
    if (variant !== "month" || !selectedDetailYmd) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedDetailYmd(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [variant, selectedDetailYmd]);

  const todayYmd = toYmd(new Date());

  const selectedDayEvents = selectedDetailYmd ? (byDate.get(selectedDetailYmd) ?? []) : [];

  if (variant === "month") {
    const em = embedMonthOnLight;
    const chipV: "dark" | "light" = em ? "light" : "dark";
    const kickerCls = em
      ? "text-[10px] font-semibold uppercase tracking-[0.2em] text-msv-blue sm:text-[11px]"
      : homeTypo.kickerWeek;
    const subCls = em ? "mt-1 text-sm leading-relaxed text-slate-600 sm:text-[15px]" : `mt-1 ${homeTypo.bodyWhiteMuted}`;
    const navBtn = em
      ? "shrink-0 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
      : "shrink-0 rounded-lg border border-white/20 bg-white/10 px-2.5 py-1.5 text-sm text-white transition hover:bg-white/15";
    const monthTitleCls = em
      ? "min-w-0 flex-1 text-center text-base font-bold tabular-nums text-msv-navy sm:text-lg"
      : "min-w-0 flex-1 text-center text-sm font-semibold tabular-nums text-white sm:text-base";
    const dowCls = em ? "text-slate-500" : "text-white/50";
    const gridGap = em ? "gap-1 sm:gap-1.5" : "gap-0.5 sm:gap-1";
    const blankCls = em ? "min-h-[4rem] rounded-lg bg-slate-100/80 sm:min-h-[4.5rem]" : "min-h-[3.25rem] rounded-md bg-white/[0.02] sm:min-h-[3.75rem]";
    const cellBase = em
      ? "flex min-h-[4rem] w-full flex-col rounded-lg border p-1 text-left transition sm:min-h-[4.5rem] sm:p-1.5"
      : "flex min-h-[3.25rem] w-full flex-col rounded-md border p-0.5 text-left transition sm:min-h-[3.75rem] sm:p-1";
    const cellSelected = em
      ? "border-msv-blue ring-2 ring-msv-blue/25 ring-offset-2 ring-offset-slate-50"
      : "border-msv-blue-soft ring-2 ring-msv-blue-soft/45 ring-offset-1 ring-offset-[#0f1f35]";
    const cellToday = em ? "border-msv-blue/45 bg-msv-blue-soft/45" : "border-msv-blue-soft/70 bg-white/10";
    const cellDefault = em
      ? "border-slate-200/90 bg-white hover:border-msv-blue/30 hover:bg-slate-50/90"
      : "border-white/10 bg-white/[0.04] hover:border-white/25 hover:bg-white/[0.07]";
    const dayNum = em ? "text-msv-navy" : "text-white";
    const dayNumToday = em ? "text-msv-blue" : "text-msv-blue-soft";
    const moreCls = em ? "text-center text-[8px] font-medium text-slate-400 sm:text-[9px]" : "text-center text-[8px] font-medium text-white/45 sm:text-[9px]";
    const detailWrap = em
      ? "mt-4 rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4"
      : "mt-4 rounded-xl border border-white/15 bg-white/[0.06] p-3 sm:p-4";
    const detailDateCls = em ? "text-sm font-bold text-msv-navy" : "text-sm font-bold text-white";
    const emptyCls = em ? "mt-2 text-sm text-slate-500" : "mt-2 text-sm text-white/55";
    const legendWrap = em
      ? "mt-4 flex flex-wrap gap-1.5 border-t border-slate-200 pt-3 text-[9px] text-slate-600 sm:gap-2 sm:text-[10px]"
      : "mt-4 flex flex-wrap gap-1.5 border-t border-white/10 pt-3 text-[9px] text-white/65 sm:gap-2 sm:text-[10px]";
    const legendDash = em
      ? "rounded border border-dashed border-slate-300 bg-slate-50 px-1.5 py-0.5 font-medium text-slate-500"
      : `rounded border border-dashed border-white/30 px-1.5 py-0.5 font-medium text-white/55 ${EVENT_CHIP_DARK}`;
    const calendarFrame = em
      ? "rounded-xl border border-slate-300 bg-slate-100/50 p-2 shadow-sm sm:p-2.5"
      : "rounded-xl border border-white/25 bg-white/[0.03] p-2 sm:p-2.5";
    const maxChips = em ? 3 : 2;

    return (
      <div className="relative z-10 mt-0 w-full min-w-0">
        <p className={kickerCls}>{ui.monthKicker}</p>
        <p className={subCls}>{ui.monthSub}</p>

        <div className="mt-4 flex items-center justify-between gap-2 sm:mt-5">
          <button
            type="button"
            className={navBtn}
            aria-label={ui.prevMonth}
            onClick={() => {
              setMonthCursor(new Date(monthYear, monthIndex - 1, 1));
              setSelectedDetailYmd(null);
            }}
          >
            ‹
          </button>
          <p className={monthTitleCls}>{formatMonthTitle(monthYear, monthIndex, locale)}</p>
          <button
            type="button"
            className={navBtn}
            aria-label={ui.nextMonth}
            onClick={() => {
              setMonthCursor(new Date(monthYear, monthIndex + 1, 1));
              setSelectedDetailYmd(null);
            }}
          >
            ›
          </button>
        </div>

        <div className={`mt-3 sm:mt-4 ${calendarFrame}`}>
          <div className={`grid grid-cols-7 ${gridGap} text-center text-[10px] font-semibold sm:text-[11px] ${dowCls}`}>
            {weekLabels.map((d) => (
              <div key={d} className="py-1 sm:py-1.5">
                {d}
              </div>
            ))}
          </div>

          <div className={`mt-1.5 grid grid-cols-7 ${gridGap}`}>
            {monthCells.map((cell, idx) => {
              if (cell.type === "blank") {
                return (
                  <div key={`mb-${monthYear}-${monthIndex}-${idx}`} className={blankCls} />
                );
              }
              const ymd = `${monthYear}-${String(monthIndex + 1).padStart(2, "0")}-${String(cell.day).padStart(2, "0")}`;
              const list = byDate.get(ymd) ?? [];
              const isToday = todayYmd === ymd;
              const isSelected = selectedDetailYmd === ymd;
              const dayAria =
                locale === "en"
                  ? `${cell.day}, ${list.length} ${list.length === 1 ? "entry" : "entries"}`
                  : locale === "zh"
                    ? `${cell.day} 日，${list.length} 条事项`
                    : `${cell.day}일, 일정 ${list.length}건`;
              return (
                <button
                  key={ymd}
                  type="button"
                  aria-pressed={isSelected}
                  aria-label={dayAria}
                  onClick={() => setSelectedDetailYmd(ymd)}
                  className={`${cellBase} ${
                    isSelected ? cellSelected : isToday ? cellToday : cellDefault
                  }`}
                >
                  <span
                    className={`text-center text-xs font-semibold tabular-nums sm:text-sm ${isToday ? dayNumToday : dayNum}`}
                  >
                    {cell.day}
                  </span>
                  <div className="mt-0.5 flex flex-col gap-0.5">
                    {list.slice(0, maxChips).map((ev) => (
                      <span
                        key={ev.id}
                        title={[taxCalendarKindLabelCompact(ev.kind, 18, kindLocale), ev.title, ev.note]
                          .filter(Boolean)
                          .join(" — ")}
                        className={`truncate rounded border px-0.5 py-px text-[8px] font-semibold leading-tight sm:text-[9px] ${eventChipClass(ev.kind, chipV)}`}
                      >
                        {taxCalendarKindLabelCompact(ev.kind, 18, kindLocale)}
                      </span>
                    ))}
                    {list.length > maxChips ? (
                      <span className={moreCls}>+{list.length - maxChips}</span>
                    ) : null}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {selectedDetailYmd ? (
          <div className={detailWrap}>
            <p className={detailDateCls}>{formatYmdLong(selectedDetailYmd, locale)}</p>
            {selectedDayEvents.length === 0 ? (
              <p className={emptyCls}>{ui.noEntries}</p>
            ) : (
              <ul className="mt-3 space-y-2.5">
                {selectedDayEvents.map((ev) => (
                  <li
                    key={ev.id}
                    className="rounded-lg border border-slate-200 bg-slate-50/90 p-3 text-sm text-msv-navy shadow-sm"
                  >
                    <span
                      className={`inline-block rounded border px-2 py-0.5 text-xs font-semibold ${eventChipClass(ev.kind, "light")}`}
                    >
                      {taxCalendarKindLabelCompact(ev.kind, 18, kindLocale)}
                    </span>
                    {ev.title ? <p className="mt-2 font-semibold leading-snug">{ev.title}</p> : null}
                    {ev.note ? <p className="mt-1.5 text-xs leading-relaxed text-slate-600">{ev.note}</p> : null}
                    {!ev.title && !ev.note ? <p className="mt-1 text-xs text-slate-500">{ui.emptyEvent}</p> : null}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : null}

        <div className={legendWrap}>
          {TAX_CALENDAR_KINDS.map((k) => (
            <span key={k} className={`rounded border px-1.5 py-0.5 font-semibold ${eventChipClass(k, chipV)}`}>
              {taxCalendarKindLabelCompact(k, 18, kindLocale)}
            </span>
          ))}
          <span className={legendDash}>{ui.legendCustom}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative z-10 mt-6">
      <p className={homeTypo.kickerWeek}>{ui.weekKicker}</p>
      <p className={`mt-1 ${homeTypo.bodyWhiteMuted}`}>{ui.weekSub}</p>
      <div className="mt-4 rounded-xl border border-white/25 bg-white/[0.03] p-2 sm:p-2.5">
        <div className="grid grid-cols-7 gap-1.5 text-center sm:gap-2">
        {weekDays.map(({ date, ymd }, i) => {
          const list = byDate.get(ymd) ?? [];
          const isTodayCell = todayYmd === ymd;
          return (
            <div
              key={ymd}
              className={`flex min-h-[5.5rem] flex-col rounded-lg border px-1 py-2 sm:min-h-[6.5rem] sm:px-1.5 ${
                isTodayCell ? "border-msv-blue-soft/70 bg-white/10" : "border-white/10 bg-white/[0.04]"
              }`}
            >
              <span className="text-[10px] font-semibold text-white/50">{weekLabels[i]}</span>
              <span
                className={`text-sm font-semibold tabular-nums ${isTodayCell ? "text-msv-blue-soft" : "text-white"}`}
              >
                {date.getDate()}
              </span>
              <div className="mt-1 flex flex-1 flex-col gap-0.5">
                {list.map((ev) => (
                  <span
                    key={ev.id}
                    title={[taxCalendarKindLabelCompact(ev.kind, 18, kindLocale), ev.title, ev.note]
                      .filter(Boolean)
                      .join(" — ")}
                    className={`truncate rounded border px-0.5 py-px text-[9px] font-semibold leading-tight sm:text-[10px] ${eventChipClass(ev.kind, "dark")}`}
                  >
                    {taxCalendarKindLabelCompact(ev.kind, 18, kindLocale)}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      </div>

      <button
        type="button"
        onClick={() => {
          setMonthCursor(new Date(today.getFullYear(), today.getMonth(), 1));
          setSelectedDetailYmd(null);
          setMonthOpen(true);
        }}
        className="relative z-20 mt-5 w-full touch-manipulation rounded-lg border border-white/25 bg-white/10 py-2.5 text-sm font-semibold text-white transition hover:bg-white/15"
      >
        {ui.monthButton}
      </button>

      {monthOpen
        ? createPortal(
            <div
              className="fixed inset-0 z-[100] flex items-end justify-center p-3 sm:items-center sm:p-6"
              role="dialog"
              aria-modal="true"
              aria-labelledby="month-calendar-title"
            >
              <div
                className="absolute inset-0 cursor-default bg-black/50"
                aria-hidden
                onClick={closeMonth}
              />
              <div className="relative z-10 max-h-[min(92vh,48rem)] w-full max-w-3xl overflow-auto rounded-xl border border-slate-200 bg-white p-5 shadow-xl sm:max-h-[min(92vh,52rem)] sm:p-7">
                <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <button
                    type="button"
                    className="rounded border border-slate-200 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
                    onClick={() => {
                      setMonthCursor(new Date(monthYear, monthIndex - 1, 1));
                      setSelectedDetailYmd(null);
                    }}
                    aria-label={ui.prevMonth}
                  >
                    ‹
                  </button>
                  <h3 id="month-calendar-title" className="text-lg font-semibold text-msv-navy sm:text-xl">
                    {formatMonthTitle(monthYear, monthIndex, locale)}
                  </h3>
                  <button
                    type="button"
                    className="rounded border border-slate-200 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
                    onClick={() => {
                      setMonthCursor(new Date(monthYear, monthIndex + 1, 1));
                      setSelectedDetailYmd(null);
                    }}
                    aria-label={ui.nextMonth}
                  >
                    ›
                  </button>
                </div>
                <div className="mt-4 rounded-xl border border-slate-300 bg-slate-100/50 p-2 shadow-sm sm:mt-5 sm:p-2.5">
                  <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-slate-500 sm:gap-1.5 sm:text-[13px]">
                    {weekLabels.map((d) => (
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
                      const isTodayCell = todayYmd === ymd;
                      const isSelected = selectedDetailYmd === ymd;
                      const dayAria =
                        locale === "en"
                          ? `${cell.day}, ${list.length} ${list.length === 1 ? "entry" : "entries"}`
                          : locale === "zh"
                            ? `${cell.day} 日，${list.length} 条事项`
                            : `${cell.day}일, 일정 ${list.length}건`;
                      return (
                        <button
                          key={ymd}
                          type="button"
                          aria-pressed={isSelected}
                          aria-label={dayAria}
                          onClick={() => setSelectedDetailYmd(ymd)}
                          className={`flex min-h-[4.25rem] w-full flex-col rounded-md border p-1 text-left transition hover:border-msv-blue/35 hover:bg-slate-50/90 sm:min-h-[5.25rem] sm:p-1.5 ${
                            isSelected
                              ? "border-msv-blue ring-2 ring-msv-blue/30 ring-offset-1"
                              : isTodayCell
                                ? "border-msv-blue/50 bg-msv-blue-soft/60"
                                : "border-slate-200 bg-white"
                          }`}
                        >
                          <span
                            className={`text-sm font-semibold tabular-nums sm:text-base ${isTodayCell ? "text-msv-blue" : "text-msv-navy"}`}
                          >
                            {cell.day}
                          </span>
                          <div className="mt-1 flex flex-col gap-0.5">
                            {list.slice(0, 3).map((ev) => (
                              <span
                                key={ev.id}
                                className={`truncate rounded border px-0.5 py-px text-[9px] font-semibold leading-tight sm:text-[10px] ${eventChipClass(ev.kind, "light")}`}
                              >
                                {taxCalendarKindLabelCompact(ev.kind, 18, kindLocale)}
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
                </div>

                {selectedDetailYmd ? (
                  <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-4 sm:p-5">
                    <p className="text-sm font-bold text-msv-navy">{formatYmdLong(selectedDetailYmd, locale)}</p>
                    {selectedDayEvents.length === 0 ? (
                      <p className="mt-2 text-sm text-slate-500">{ui.noEntries}</p>
                    ) : (
                      <ul className="mt-3 space-y-3">
                        {selectedDayEvents.map((ev) => (
                          <li
                            key={ev.id}
                            className="rounded-md border border-slate-200 bg-white p-3 text-sm shadow-sm"
                          >
                            <span
                              className={`inline-block rounded border px-2 py-0.5 text-xs font-semibold ${eventChipClass(ev.kind, "light")}`}
                            >
                              {taxCalendarKindLabelCompact(ev.kind, 18, kindLocale)}
                            </span>
                            {ev.title ? (
                              <p className="mt-2 font-semibold leading-snug text-msv-navy">{ev.title}</p>
                            ) : null}
                            {ev.note ? <p className="mt-1.5 text-xs leading-relaxed text-slate-600">{ev.note}</p> : null}
                            {!ev.title && !ev.note ? (
                              <p className="mt-1 text-xs text-slate-500">{ui.emptyEvent}</p>
                            ) : null}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : null}

                <div className="mt-5 flex flex-wrap gap-2 border-t border-slate-100 pt-4 text-[10px] text-slate-600 sm:mt-6">
                  {TAX_CALENDAR_KINDS.map((k) => (
                    <span key={k} className={`rounded border px-1.5 py-0.5 font-semibold ${eventChipClass(k, "light")}`}>
                      {taxCalendarKindLabelCompact(k, 18, kindLocale)}
                    </span>
                  ))}
                  <span
                    className={`rounded border border-dashed px-1.5 py-0.5 font-medium text-slate-500 ${EVENT_CHIP_LIGHT}`}
                  >
                    {ui.legendCustom}
                  </span>
                </div>
                <button
                  type="button"
                  className="mt-5 w-full rounded-lg bg-msv-navy py-3 text-sm font-semibold text-white hover:bg-msv-navy/90 sm:py-3.5"
                  onClick={closeMonth}
                >
                  {ui.close}
                </button>
              </div>
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}
