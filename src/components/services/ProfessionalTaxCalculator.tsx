"use client";

import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import {
  computeProfessionalTaxMonthly,
  professionalTaxGenderAffectsSlabs,
  professionalTaxMonthAffectsMonthlyAmount,
  professionalTaxPaymentBasis,
  professionalTaxSlabRowIndex,
  professionalTaxStates,
  sumProfessionalTaxYearSameSalary,
  type ProfessionalTaxStateCode,
  type PtGender,
} from "@/lib/india-professional-tax";
import {
  professionalTaxCalculatorCopy,
  professionalTaxTableStateShort,
} from "@/lib/i18n/professional-tax-calculator-locale";
import type { SiteLocale } from "@/lib/site-locale";

function FieldHint({ children }: { children: ReactNode }) {
  return (
    <p className="mt-1 whitespace-pre-line text-xs font-normal leading-snug text-slate-500">{children}</p>
  );
}

function formatInr(n: number): string {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(n);
}

const cellBase = "border border-slate-200 px-3 py-2.5 text-sm align-top sm:px-3.5";
const cell = `${cellBase} text-slate-800`;
const cellRight = `${cellBase} text-right tabular-nums text-slate-900`;
const th = `${cellBase} bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-msv-navy sm:text-sm`;

const radioClass =
  "size-4 border-slate-300 text-msv-blue focus:ring-msv-blue/30 focus:ring-offset-0 cursor-pointer";

export function ProfessionalTaxCalculator({ locale }: { locale: SiteLocale }) {
  const t = professionalTaxCalculatorCopy(locale);
  const [state, setState] = useState<ProfessionalTaxStateCode>("KA");
  const [gender, setGender] = useState<PtGender>("male");
  const [monthlyStr, setMonthlyStr] = useState("");
  const [month, setMonth] = useState(() => new Date().getMonth() + 1);

  const monthlySalary = useMemo(() => {
    const n = Number(String(monthlyStr).replace(/[, ]/g, ""));
    return Number.isFinite(n) && n >= 0 ? n : NaN;
  }, [monthlyStr]);

  const genderForCalc: PtGender = professionalTaxGenderAffectsSlabs(state) ? gender : "male";

  const monthlyPt = useMemo(() => {
    if (!Number.isFinite(monthlySalary)) return null;
    return computeProfessionalTaxMonthly(state, monthlySalary, month, genderForCalc);
  }, [state, monthlySalary, month, genderForCalc]);

  const annualSame = useMemo(() => {
    if (!Number.isFinite(monthlySalary)) return null;
    return sumProfessionalTaxYearSameSalary(state, monthlySalary, genderForCalc);
  }, [state, monthlySalary, genderForCalc]);

  const slabRows = state === "MH" && genderForCalc === "female" ? t.slabsMhFemale : t.slabs[state];
  const stateShort = professionalTaxTableStateShort(locale, state);

  const slabIdx = useMemo(() => {
    if (!Number.isFinite(monthlySalary)) return -1;
    return professionalTaxSlabRowIndex(state, monthlySalary, genderForCalc);
  }, [state, monthlySalary, genderForCalc]);

  const appliedSlabText =
    slabIdx >= 0 && slabIdx < slabRows.length
      ? `${slabRows[slabIdx]!.range} → ${slabRows[slabIdx]!.amount}`
      : null;

  const paymentBasisText =
    professionalTaxPaymentBasis(state) === "half_yearly_common"
      ? t.paymentBasisHalfYearly
      : t.paymentBasisMonthly;

  const tableHeadingSuffix =
    state === "MH" ? (genderForCalc === "female" ? t.tableTitleGenderFemale : t.tableTitleGenderMale) : "";

  return (
    <div className="w-full space-y-8">
      <div className="grid gap-6 lg:grid-cols-[1fr_minmax(0,18rem)] lg:items-start">
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

          {professionalTaxGenderAffectsSlabs(state) ? (
            <fieldset className="block max-w-md rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-3 sm:px-4">
              <legend className="px-1 text-sm font-semibold text-msv-navy">{t.fieldGender}</legend>
              <div className="mt-2 flex flex-wrap gap-4">
                <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-800">
                  <input
                    type="radio"
                    name="pt-gender"
                    checked={gender === "male"}
                    onChange={() => setGender("male")}
                    className={radioClass}
                  />
                  {t.genderMale}
                </label>
                <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-800">
                  <input
                    type="radio"
                    name="pt-gender"
                    checked={gender === "female"}
                    onChange={() => setGender("female")}
                    className={radioClass}
                  />
                  {t.genderFemale}
                </label>
              </div>
              <FieldHint>{t.genderHintMh}</FieldHint>
            </fieldset>
          ) : null}

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

        <aside className="flex flex-col gap-0 rounded-xl border border-msv-blue/25 bg-msv-blue-soft/50 px-4 py-4 sm:px-5">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-msv-blue sm:text-xs">
            {t.asideSummaryHeading}
          </p>
          <dl className="mt-3 space-y-2.5 border-b border-msv-blue/20 pb-4 text-xs leading-snug text-slate-700 sm:text-sm">
            <div>
              <dt className="font-medium text-slate-500">{t.asideLabelState}</dt>
              <dd className="mt-0.5 font-semibold text-msv-navy">{t.stateOptions[state]}</dd>
            </div>
            <div>
              <dt className="font-medium text-slate-500">{t.asideLabelPaymentBasis}</dt>
              <dd className="mt-0.5 text-slate-800">{paymentBasisText}</dd>
            </div>
            <div>
              <dt className="font-medium text-slate-500">{t.asideLabelSlab}</dt>
              <dd className="mt-0.5 text-slate-800">
                {appliedSlabText ?? (
                  <span className="text-slate-500">{t.asideValueSlabEmpty}</span>
                )}
              </dd>
            </div>
          </dl>

          <div className="pt-4">
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

          <div className="mt-4 border-t border-msv-blue/20 pt-4">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-600 sm:text-xs">
              {t.asideAnnualTitle}
            </p>
            {annualSame !== null ? (
              <p className="mt-1 text-xl font-bold tabular-nums text-slate-800 sm:text-2xl">
                ₹ {formatInr(annualSame)}
              </p>
            ) : null}
            <p className="mt-2 text-xs leading-snug text-slate-600">{t.asideAnnualNote}</p>
          </div>
        </aside>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-msv-navy">{t.stateGuidesHeading}</h3>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {professionalTaxStates.map((s) => (
            <div
              key={s.code}
              className="rounded-xl border border-slate-200 bg-white px-4 py-3.5 shadow-sm sm:px-4 sm:py-4"
            >
              <p className="text-xs font-semibold text-msv-blue">{t.stateOptions[s.code]}</p>
              <p className="mt-1.5 text-sm font-semibold text-msv-navy">{t.stateGuideTagline[s.code]}</p>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">{t.stateGuideBody[s.code]}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-msv-navy">
          {t.tableTitlePrefix} ({stateShort}
          {tableHeadingSuffix})
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
