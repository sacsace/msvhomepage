"use client";

import { useMemo, useState } from "react";
import {
  computeGratuity,
  createDefaultGratuityComponents,
  DEFAULT_GRATUITY_CEILING_INR,
  DEFAULT_GRATUITY_DAYS_PER_YEAR,
  DEFAULT_GRATUITY_EXCLUDED_CAP_RATIO,
  DEFAULT_GRATUITY_STATUTORY_DAYS,
  roundGratuityInr,
  yearsOfServiceFromIsoDates,
  type GratuitySalaryComponent,
} from "@/lib/india-gratuity";
import {
  defaultComponentLabel,
  gratuityCalculatorCopy,
} from "@/lib/i18n/gratuity-calculator-locale";
import type { SiteLocale } from "@/lib/site-locale";

function formatInr(n: number): string {
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(roundGratuityInr(n));
}

function parseAmount(raw: string): number {
  const n = Number(String(raw).replace(/[, ]/g, ""));
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

const fieldInput =
  "mt-1.5 block w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-msv-blue focus:ring-2 focus:ring-msv-blue/20";
const compactInput =
  "w-full rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-sm text-slate-900 outline-none transition focus:border-msv-blue focus:ring-2 focus:ring-msv-blue/20";

/** 비밀번호 관리자 등이 주입하는 data-* 속성으로 인한 hydration 경고 완화 */
const antiExtensionInputProps = {
  autoComplete: "off" as const,
  "data-1p-ignore": true,
  "data-lpignore": "true",
  "data-form-type": "other",
  suppressHydrationWarning: true,
};

export function GratuityCalculator({ locale }: { locale: SiteLocale }) {
  const t = gratuityCalculatorCopy(locale);
  const [components, setComponents] = useState<GratuitySalaryComponent[]>(() => {
    const defaults = createDefaultGratuityComponents();
    return defaults.map((c) => ({
      ...c,
      label: defaultComponentLabel(locale, c.id),
    }));
  });
  const [joinDate, setJoinDate] = useState("");
  const [exitDate, setExitDate] = useState("");
  const [manualYears, setManualYears] = useState(false);
  const [yearsStr, setYearsStr] = useState("");
  const [statutoryDaysStr, setStatutoryDaysStr] = useState(String(DEFAULT_GRATUITY_STATUTORY_DAYS));
  const [daysPerYearStr, setDaysPerYearStr] = useState(String(DEFAULT_GRATUITY_DAYS_PER_YEAR));
  const [ceilingStr, setCeilingStr] = useState(String(DEFAULT_GRATUITY_CEILING_INR));
  const [excludedCapPctStr, setExcludedCapPctStr] = useState(
    String(DEFAULT_GRATUITY_EXCLUDED_CAP_RATIO * 100),
  );

  const yearsFromDates = useMemo(
    () => yearsOfServiceFromIsoDates(joinDate, exitDate),
    [joinDate, exitDate],
  );

  const years = useMemo(() => {
    if (!manualYears) {
      return yearsFromDates != null ? yearsFromDates : NaN;
    }
    const n = Number(String(yearsStr).replace(/[, ]/g, ""));
    return Number.isFinite(n) && n >= 0 ? n : NaN;
  }, [manualYears, yearsFromDates, yearsStr]);

  const result = useMemo(() => {
    if (!Number.isFinite(years)) return null;
    const capPct = Number(String(excludedCapPctStr).replace(/[, ]/g, ""));
    const ratio = Number.isFinite(capPct) ? Math.max(0, capPct) / 100 : DEFAULT_GRATUITY_EXCLUDED_CAP_RATIO;
    return computeGratuity({
      components,
      excludedCapRatio: ratio,
      statutoryDays: parseAmount(statutoryDaysStr) || DEFAULT_GRATUITY_STATUTORY_DAYS,
      daysPerYear: parseAmount(daysPerYearStr) || DEFAULT_GRATUITY_DAYS_PER_YEAR,
      yearsOfService: years,
      statutoryCeiling: parseAmount(ceilingStr) || DEFAULT_GRATUITY_CEILING_INR,
    });
  }, [components, years, statutoryDaysStr, daysPerYearStr, ceilingStr, excludedCapPctStr]);

  const updateComponent = (id: string, patch: Partial<GratuitySalaryComponent>) => {
    setComponents((rows) => rows.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  };

  const addRow = () => {
    const id = `custom-${Date.now()}`;
    setComponents((rows) => [...rows, { id, label: "", amount: 0, included: false }]);
  };

  const removeRow = (id: string) => {
    setComponents((rows) => (rows.length <= 1 ? rows : rows.filter((r) => r.id !== id)));
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(16rem,20rem)] lg:items-start lg:gap-10">
      <div className="min-w-0 space-y-8">
        <section>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-base font-bold tracking-tight text-msv-navy">{t.sectionComponents}</h3>
            <button
              type="button"
              onClick={addRow}
              className="shrink-0 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-msv-navy transition hover:border-msv-blue/40 hover:text-msv-blue"
            >
              {t.addRow}
            </button>
          </div>
          <p className="mt-1 whitespace-pre-line text-sm leading-relaxed text-slate-500">
            {t.sectionComponentsHint}
          </p>

          <ul className="mt-4 divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <li className="hidden grid-cols-[minmax(0,1.2fr)_7.5rem_5.5rem_2.75rem] gap-2 bg-slate-50 px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500 sm:grid sm:px-4">
              <span>{t.colItem}</span>
              <span className="text-right">{t.colAmount}</span>
              <span className="text-center">{t.colInclude}</span>
              <span />
            </li>
            {components.map((row) => (
              <li
                key={row.id}
                className="grid grid-cols-1 gap-2 px-3 py-3 sm:grid-cols-[minmax(0,1.2fr)_7.5rem_5.5rem_2.75rem] sm:items-center sm:gap-2 sm:px-4"
              >
                <label className="block sm:contents">
                  <span className="mb-1 block text-xs font-medium text-slate-500 sm:hidden">{t.colItem}</span>
                  <input
                    type="text"
                    value={row.label}
                    onChange={(e) => updateComponent(row.id, { label: e.target.value })}
                    className={compactInput}
                    aria-label={t.colItem}
                    {...antiExtensionInputProps}
                  />
                </label>
                <label className="block sm:contents">
                  <span className="mb-1 block text-xs font-medium text-slate-500 sm:hidden">{t.colAmount}</span>
                  <input
                    type="text"
                    inputMode="decimal"
                    value={row.amount ? String(row.amount) : ""}
                    onChange={(e) => updateComponent(row.id, { amount: parseAmount(e.target.value) })}
                    className={`${compactInput} text-right tabular-nums`}
                    aria-label={t.colAmount}
                    {...antiExtensionInputProps}
                  />
                </label>
                <label className="block sm:contents">
                  <span className="mb-1 block text-xs font-medium text-slate-500 sm:hidden">{t.colInclude}</span>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={row.included}
                    aria-label={t.colInclude}
                    onClick={() => updateComponent(row.id, { included: !row.included })}
                    className={`w-full rounded-lg px-2 py-2 text-center text-xs font-semibold transition sm:text-[13px] ${
                      row.included
                        ? "bg-msv-navy text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200/80"
                    }`}
                  >
                    {row.included ? t.includeYes : t.includeNo}
                  </button>
                </label>
                <div className="flex justify-end sm:justify-center">
                  <button
                    type="button"
                    onClick={() => removeRow(row.id)}
                    className="rounded-md px-2 py-1.5 text-xs font-medium text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                    aria-label={t.removeRow}
                  >
                    {t.removeRow}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4 sm:p-5">
          <h3 className="text-base font-bold tracking-tight text-msv-navy">{t.sectionService}</h3>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-slate-700">{t.fieldJoinDate}</span>
              <input
                type="date"
                value={joinDate}
                onChange={(e) => setJoinDate(e.target.value)}
                className={fieldInput}
                {...antiExtensionInputProps}
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">{t.fieldExitDate}</span>
              <input
                type="date"
                value={exitDate}
                min={joinDate || undefined}
                onChange={(e) => setExitDate(e.target.value)}
                className={fieldInput}
                {...antiExtensionInputProps}
              />
            </label>
          </div>

          <div className="mt-4 flex flex-wrap items-end gap-4">
            <label className="block min-w-[10rem] max-w-[14rem]">
              <span className="text-sm font-medium text-slate-700">{t.fieldYears}</span>
              <input
                type="text"
                inputMode="decimal"
                value={manualYears ? yearsStr : yearsFromDates != null ? String(yearsFromDates) : ""}
                onChange={(e) => {
                  if (!manualYears) return;
                  setYearsStr(e.target.value);
                }}
                readOnly={!manualYears}
                className={`${fieldInput} tabular-nums ${manualYears ? "" : "bg-slate-100 text-slate-700"}`}
                {...antiExtensionInputProps}
              />
              {!manualYears && yearsFromDates != null ? (
                <span className="mt-1 block text-[11px] text-slate-500">{t.yearsFromDatesLabel}</span>
              ) : null}
            </label>
            <label className="inline-flex cursor-pointer items-center gap-2 pb-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={manualYears}
                onChange={(e) => {
                  const on = e.target.checked;
                  setManualYears(on);
                  if (on && yearsFromDates != null) setYearsStr(String(yearsFromDates));
                }}
                className="h-4 w-4 rounded border-slate-300 text-msv-navy focus:ring-msv-blue/30"
              />
              {t.manualYearsToggle}
            </label>
          </div>

          <p className="mt-2 whitespace-pre-line text-xs leading-relaxed text-slate-500">{t.yearsHint}</p>
        </section>

        <section>
          <h3 className="text-sm font-semibold text-slate-700">{t.sectionRules}</h3>
          <p className="mt-1 text-xs leading-relaxed text-slate-500">{t.excludedCapHint}</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <label className="block">
              <span className="text-xs font-medium text-slate-600">{t.fieldStatutoryDays}</span>
              <input
                type="text"
                inputMode="numeric"
                value={statutoryDaysStr}
                onChange={(e) => setStatutoryDaysStr(e.target.value)}
                className={`${compactInput} mt-1.5 tabular-nums`}
                {...antiExtensionInputProps}
              />
            </label>
            <label className="block">
              <span className="text-xs font-medium text-slate-600">{t.fieldDaysPerYear}</span>
              <input
                type="text"
                inputMode="numeric"
                value={daysPerYearStr}
                onChange={(e) => setDaysPerYearStr(e.target.value)}
                className={`${compactInput} mt-1.5 tabular-nums`}
                {...antiExtensionInputProps}
              />
            </label>
            <label className="block">
              <span className="text-xs font-medium text-slate-600">{t.fieldExcludedCap}</span>
              <input
                type="text"
                inputMode="decimal"
                value={excludedCapPctStr}
                onChange={(e) => setExcludedCapPctStr(e.target.value)}
                className={`${compactInput} mt-1.5 tabular-nums`}
                {...antiExtensionInputProps}
              />
            </label>
            <label className="block">
              <span className="text-xs font-medium text-slate-600">{t.fieldCeiling}</span>
              <input
                type="text"
                inputMode="numeric"
                value={ceilingStr}
                onChange={(e) => setCeilingStr(e.target.value)}
                className={`${compactInput} mt-1.5 tabular-nums`}
                {...antiExtensionInputProps}
              />
            </label>
          </div>
        </section>
      </div>

      <aside className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:sticky lg:top-24">
        <div className="border-b border-slate-100 bg-slate-50 px-5 py-3">
          <h3 className="text-sm font-bold text-msv-navy">{t.asideSummaryHeading}</h3>
        </div>
        {result ? (
          <div className="p-5">
            <div className="rounded-xl bg-msv-navy px-4 py-4 text-white">
              <p className="text-xs font-medium text-white/70">{t.labelPayable}</p>
              <p className="mt-1 text-2xl font-bold tracking-tight tabular-nums">
                ₹{formatInr(result.payable)}
              </p>
              {result.cappedByCeiling ? (
                <p className="mt-2 text-xs text-white/75">{t.ceilingApplied}</p>
              ) : null}
            </div>

            <dl className="mt-5 space-y-2.5 text-sm">
              {(
                [
                  [t.labelMonthlyTotal, result.monthlyTotal],
                  [t.labelEligible, result.eligibleSalary],
                  [t.labelExcluded, result.excludedAllowances],
                  [t.labelAdditional, result.additionalAmount],
                ] as const
              ).map(([label, value]) => (
                <div key={label} className="flex items-baseline justify-between gap-3">
                  <dt className="text-slate-500">{label}</dt>
                  <dd className="tabular-nums text-slate-800">₹{formatInr(value)}</dd>
                </div>
              ))}
              <div className="flex items-baseline justify-between gap-3 border-t border-slate-100 pt-3">
                <dt className="font-semibold text-msv-navy">{t.labelBase}</dt>
                <dd className="tabular-nums font-semibold text-msv-navy">
                  ₹{formatInr(result.gratuityMonthlyBase)}
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-3">
                <dt className="text-slate-500">{t.labelCalculated}</dt>
                <dd className="tabular-nums text-slate-800">₹{formatInr(result.calculated)}</dd>
              </div>
            </dl>
            <p className="mt-5 text-xs leading-relaxed text-slate-400">{t.formulaNote}</p>
          </div>
        ) : (
          <p className="px-5 py-8 text-sm text-slate-500">{t.emptyHint}</p>
        )}
      </aside>
    </div>
  );
}
