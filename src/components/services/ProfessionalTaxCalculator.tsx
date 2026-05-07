"use client";

import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import {
  computeProfessionalTaxMonthly,
  professionalTaxMonthAffectsMonthlyAmount,
  professionalTaxStates,
  sumProfessionalTaxYearSameSalary,
  type ProfessionalTaxStateCode,
} from "@/lib/india-professional-tax";
import {
  professionalTaxCalculatorCopy,
  professionalTaxTableStateShort,
} from "@/lib/i18n/professional-tax-calculator-locale";
import type { SiteLocale } from "@/lib/site-locale";

function FieldHint({ children }: { children: ReactNode }) {
  return <p className="mt-1 text-xs font-normal leading-snug text-slate-500">{children}</p>;
}

function formatInr(n: number): string {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(n);
}

const cellBase = "border border-slate-200 px-3 py-2.5 text-sm align-top sm:px-3.5";
const cell = `${cellBase} text-slate-800`;
const cellRight = `${cellBase} text-right tabular-nums text-slate-900`;
const th = `${cellBase} bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-msv-navy sm:text-sm`;

export function ProfessionalTaxCalculator({ locale }: { locale: SiteLocale }) {
  const t = professionalTaxCalculatorCopy(locale);
  const [state, setState] = useState<ProfessionalTaxStateCode>("KA");
  const [monthlyStr, setMonthlyStr] = useState("");
  const [month, setMonth] = useState(() => new Date().getMonth() + 1);

  const monthlySalary = useMemo(() => {
    const n = Number(String(monthlyStr).replace(/[, ]/g, ""));
    return Number.isFinite(n) && n >= 0 ? n : NaN;
  }, [monthlyStr]);

  const monthlyPt = useMemo(() => {
    if (!Number.isFinite(monthlySalary)) return null;
    return computeProfessionalTaxMonthly(state, monthlySalary, month);
  }, [state, monthlySalary, month]);

  const annualSame = useMemo(() => {
    if (!Number.isFinite(monthlySalary)) return null;
    return sumProfessionalTaxYearSameSalary(state, monthlySalary);
  }, [state, monthlySalary]);

  const slabRows = t.slabs[state];
  const stateShort = professionalTaxTableStateShort(locale, state);

  /** 카드 셸·그림자는 상위 페이지(`section`)에서 통일합니다. */
  return (
    <div className="w-full">
      <div className="border-b border-slate-100 pb-5 sm:pb-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_minmax(0,16rem)]">
          <div className="min-w-0 space-y-4">
            <label className="block text-sm font-semibold text-msv-navy">
              {t.fieldState}
              <select
                value={state}
                onChange={(e) => setState(e.target.value as ProfessionalTaxStateCode)}
                className="mt-2 block w-full max-w-md rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-msv-blue focus:ring-2 focus:ring-msv-blue/20"
              >
                {professionalTaxStates.map((s) => (
                  <option key={s.code} value={s.code}>
                    {t.stateOptions[s.code]}
                  </option>
                ))}
              </select>
              <FieldHint>{t.assumptions[state]}</FieldHint>
            </label>

            <label className="block text-sm font-semibold text-msv-navy">
              {t.fieldSalary}
              <input
                type="text"
                inputMode="decimal"
                value={monthlyStr}
                onChange={(e) => setMonthlyStr(e.target.value)}
                placeholder={t.salaryPlaceholder}
                className="mt-2 block w-full max-w-md rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm tabular-nums text-slate-900 outline-none transition focus:border-msv-blue focus:ring-2 focus:ring-msv-blue/20"
              />
              <FieldHint>{t.salaryHint}</FieldHint>
            </label>

            <label className="block text-sm font-semibold text-msv-navy">
              {t.fieldBaseMonth}
              <select
                value={month}
                onChange={(e) => setMonth(Number(e.target.value))}
                className="mt-2 block w-full max-w-md rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-msv-blue focus:ring-2 focus:ring-msv-blue/20"
              >
                {t.months.map((label, i) => (
                  <option key={label} value={i + 1}>
                    {label}
                  </option>
                ))}
              </select>
              <FieldHint>
                {professionalTaxMonthAffectsMonthlyAmount(state) ? t.hintMonthMH : t.hintMonthOther}
              </FieldHint>
            </label>
          </div>

          <aside className="flex flex-col justify-center gap-4 rounded-xl border border-msv-blue/25 bg-msv-blue-soft/50 px-5 py-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-msv-blue sm:text-xs">
                {t.asideMonthlyTitle}
              </p>
              {monthlyPt !== null ? (
                <p className="mt-1 text-2xl font-bold tabular-nums text-msv-navy sm:text-3xl">
                  ₹ {formatInr(monthlyPt)}
                </p>
              ) : (
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{t.asideMonthlyEmpty}</p>
              )}
            </div>
            <div className="border-t border-msv-blue/20 pt-4">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-600 sm:text-xs">
                {t.asideAnnualTitle}
              </p>
              {annualSame !== null ? (
                <p className="mt-1 text-xl font-bold tabular-nums text-slate-800 sm:text-2xl">₹ {formatInr(annualSame)}</p>
              ) : null}
              <p className="mt-2 text-xs leading-snug text-slate-600">{t.asideAnnualNote}</p>
            </div>
          </aside>
        </div>
      </div>

      <div className="pt-6">
        <h3 className="text-sm font-semibold text-msv-navy">
          {t.tableTitlePrefix} ({stateShort})
        </h3>
        <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-[20rem] border-collapse text-left text-sm">
            <thead>
              <tr>
                <th scope="col" className={th}>
                  {t.tableColRange}
                </th>
                <th scope="col" className={`${th} text-right`}>
                  {t.tableColTax}
                </th>
              </tr>
            </thead>
            <tbody>
              {slabRows.map((row) => (
                <tr key={row.range}>
                  <td className={cell}>{row.range}</td>
                  <td className={cellRight}>{row.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
