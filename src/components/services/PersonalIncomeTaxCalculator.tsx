"use client";

import { useMemo, useState } from "react";
import { computeIndiaEmployeeTds } from "@/lib/india-employee-tds";
import { personalIncomeTaxCalculatorCopy } from "@/lib/i18n/personal-income-tax-calculator-locale";
import type { SiteLocale } from "@/lib/site-locale";

function Hint({ children }: { children: React.ReactNode }) {
  return <p className="mt-1 text-xs font-normal leading-snug text-slate-500">{children}</p>;
}

function formatInr(n: number): string {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(n);
}

function formatRatePct(n: number): string {
  return n.toLocaleString("en-IN", { minimumFractionDigits: 3, maximumFractionDigits: 3 });
}

const cellBase = "border border-slate-200 px-3 py-2.5 text-sm align-top sm:px-3.5";
const cell = `${cellBase} text-slate-800`;
const cellRight = `${cellBase} text-right tabular-nums text-slate-900`;
const cellRightRed = `${cellBase} text-right tabular-nums font-bold text-red-600`;
const th = `${cellBase} bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-msv-navy sm:text-sm`;

export function PersonalIncomeTaxCalculator({ locale }: { locale: SiteLocale }) {
  const c = personalIncomeTaxCalculatorCopy(locale);
  const [monthlyIncomeStr, setMonthlyIncomeStr] = useState("");
  const [applyStd, setApplyStd] = useState(true);
  const [isResident, setIsResident] = useState(true);

  const monthlySalary = useMemo(() => {
    const raw = String(monthlyIncomeStr).replace(/[, ]/g, "").trim();
    if (!raw) return NaN;
    const n = Number(raw);
    return Number.isFinite(n) && n >= 0 ? n : NaN;
  }, [monthlyIncomeStr]);

  const grossAnnual = useMemo(() => {
    if (!Number.isFinite(monthlySalary)) return NaN;
    return Math.round(monthlySalary * 12);
  }, [monthlySalary]);

  const result = useMemo(() => {
    if (!Number.isFinite(grossAnnual)) return null;
    return computeIndiaEmployeeTds(grossAnnual, applyStd, isResident);
  }, [grossAnnual, applyStd, isResident]);

  const netMonthlyInr = useMemo(() => {
    if (!result || !Number.isFinite(monthlySalary)) return NaN;
    return Math.max(0, Math.round(monthlySalary - result.monthlyTds));
  }, [result, monthlySalary]);

  return (
    <div className="w-full">
      <p className="mb-5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 sm:mb-6 sm:px-4">
        <span className="font-medium text-slate-500">{c.assessmentPeriodLabel}</span>
        <span className="mx-2 text-slate-300" aria-hidden>
          ·
        </span>
        <span className="font-semibold tabular-nums text-msv-navy">{c.assessmentPeriodValue}</span>
      </p>

      <div className="border-b border-slate-100 pb-5 sm:pb-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-stretch sm:justify-between sm:gap-8">
          <div className="min-w-0 flex-1 space-y-4">
            <label className="block text-sm font-semibold text-msv-navy">
              {c.labelMonthlySalary}
              <input
                type="text"
                inputMode="decimal"
                autoComplete="off"
                data-1p-ignore
                data-lpignore="true"
                data-form-type="other"
                suppressHydrationWarning
                value={monthlyIncomeStr}
                onChange={(e) => setMonthlyIncomeStr(e.target.value)}
                placeholder={c.placeholderMonthly}
                className="mt-2 block w-full max-w-md rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm tabular-nums text-slate-900 outline-none transition focus:border-msv-blue focus:ring-2 focus:ring-msv-blue/20"
              />
              <Hint>{c.hintMonthlySalary}</Hint>
            </label>
            <label className="flex cursor-pointer items-start gap-2.5 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={applyStd}
                onChange={(e) => setApplyStd(e.target.checked)}
                className="mt-0.5 size-4 shrink-0 rounded border-slate-300 text-msv-blue focus:ring-msv-blue"
                suppressHydrationWarning
              />
              <span>
                {c.labelStdDeduction}
                <Hint>{c.hintStdDeduction}</Hint>
              </span>
            </label>
            <label className="flex cursor-pointer items-start gap-2.5 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={isResident}
                onChange={(e) => setIsResident(e.target.checked)}
                className="mt-0.5 size-4 shrink-0 rounded border-slate-300 text-msv-blue focus:ring-msv-blue"
                suppressHydrationWarning
              />
              <span>
                {c.labelResident}
                <Hint>{c.hintResident}</Hint>
              </span>
            </label>
          </div>
          <aside className="flex shrink-0 flex-col justify-center gap-5 rounded-xl border border-msv-blue/25 bg-msv-blue-soft/50 px-5 py-4 sm:min-w-[16rem] sm:flex-row sm:items-stretch sm:gap-0 sm:divide-x sm:divide-msv-blue/20 sm:self-center">
            <div className="flex-1 sm:pr-5 sm:text-right">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-msv-blue sm:text-xs">
                {c.asideMonthlyTdsTitle}
              </p>
              {result ? (
                <>
                  <p className="mt-1 text-2xl font-bold tabular-nums text-msv-navy sm:text-3xl">
                    ₹ {formatInr(result.monthlyTds)}
                  </p>
                  <p className="mt-2 text-xs leading-snug text-slate-600 sm:ml-auto sm:max-w-[14rem]">
                    {c.asideMonthlyTdsExplain}
                  </p>
                </>
              ) : (
                <p className="mt-2 text-2xl font-bold tabular-nums text-slate-400 sm:text-3xl">{c.emptyDash}</p>
              )}
            </div>
            <div className="flex-1 border-t border-msv-blue/20 pt-4 sm:border-t-0 sm:pl-5 sm:pt-0 sm:text-right">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-800 sm:text-xs">
                {c.asideNetTitle}
              </p>
              {result && Number.isFinite(netMonthlyInr) ? (
                <>
                  <p className="mt-1 text-2xl font-bold tabular-nums text-emerald-800 sm:text-3xl">
                    ₹ {formatInr(netMonthlyInr)}
                  </p>
                  <p className="mt-2 text-xs leading-snug text-slate-600 sm:ml-auto sm:max-w-[14rem]">
                    {c.asideNetExplain}
                  </p>
                </>
              ) : (
                <p className="mt-2 text-2xl font-bold tabular-nums text-slate-400 sm:text-3xl">{c.emptyDash}</p>
              )}
            </div>
          </aside>
        </div>
      </div>

      {result === null ? (
        <p className="pt-5 text-sm leading-relaxed text-slate-600 sm:pt-6">{c.emptyTableLead}</p>
      ) : (
        <div className="overflow-x-auto pt-5 sm:pt-6">
          <table className="w-full min-w-[640px] border-collapse rounded-xl border border-slate-200">
            <thead>
              <tr>
                <th className={`${th} w-[10%]`}>{c.thSno}</th>
                <th className={`${th} w-[55%]`}>{c.thDescription}</th>
                <th className={`${th} w-[35%] text-right`}>{c.thAmount}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={cell}>(i)</td>
                <td className={cell}>
                  <span className="font-medium">{c.rowGrossTitle}</span>
                </td>
                <td className={cellRight}>{formatInr(result.grossAnnual)}</td>
              </tr>
              <tr>
                <td className={cell}>(ii)</td>
                <td className={cell}>
                  <span className="font-medium">{c.rowStdTitle}</span>
                </td>
                <td className={cellRight}>{formatInr(result.standardDeduction)}</td>
              </tr>
              <tr className="bg-msv-blue-soft/90">
                <td className={cell}>(iii)</td>
                <td className={`${cell} font-medium text-msv-navy`}>{c.rowNetTaxableTitle}</td>
                <td className={cellRightRed}>{formatInr(result.netTaxableIncome)}</td>
              </tr>
              <tr>
                <td className={cell}>(iv)</td>
                <td className={`${cell} font-medium text-msv-navy`}>{c.rowIncomeTaxTitle}</td>
                <td className={cellRight} />
              </tr>
              {result.slabLines.map((row, idx) => (
                <tr key={row.label}>
                  <td className={cell} />
                  <td className={`${cell} pl-5 text-slate-700 sm:pl-6`}>
                    {c.slabRowLabels[idx] ?? row.label}
                  </td>
                  <td className={cellRight}>{formatInr(row.amount)}</td>
                </tr>
              ))}
              <tr className="bg-orange-50/90">
                <td className={cell} />
                <td className={`${cell} font-semibold text-msv-navy`}>{c.totalTaxLabel}</td>
                <td className={`${cellRight} font-semibold`}>{formatInr(result.slabTaxTotal)}</td>
              </tr>
              <tr className="bg-orange-50/90">
                <td className={cell} />
                <td className={cell}>
                  <span className="font-medium">{c.rebate87ATitle}</span>
                  <Hint>{c.rebate87AHint}</Hint>
                </td>
                <td className={cellRight}>− {formatInr(result.rebate87A)}</td>
              </tr>
              <tr className="bg-orange-50/90">
                <td className={cell} />
                <td className={`${cell} font-medium`}>{c.taxAfterRebateTitle}</td>
                <td className={cellRight}>{formatInr(result.taxAfterRebate)}</td>
              </tr>
              <tr className="bg-orange-50/90">
                <td className={cell} />
                <td className={cell}>
                  <span className="font-medium">{c.surchargeTitle}</span>
                  <Hint>{c.surchargeHint}</Hint>
                </td>
                <td className={cellRight}>{formatInr(result.surcharge)}</td>
              </tr>
              <tr className="bg-orange-50/90">
                <td className={cell} />
                <td className={cell}>
                  <span className="font-medium">{c.cessTitle}</span>
                  <Hint>{c.cessHint}</Hint>
                </td>
                <td className={cellRight}>{formatInr(result.educationCess)}</td>
              </tr>
              <tr>
                <td className={cell}>(v)</td>
                <td className={`${cell} font-medium text-msv-navy`}>{c.rowNetYearlyTitle}</td>
                <td className={`${cellRight} font-semibold text-msv-navy`}>
                  {formatInr(result.netTaxYearly)}
                </td>
              </tr>
              <tr>
                <td className={cell}>(vi)</td>
                <td className={cell}>
                  <span className="font-medium">{c.rowMonthlyTdsTitle}</span>
                </td>
                <td className={cellRight}>{formatInr(result.monthlyTds)}</td>
              </tr>
              <tr className="bg-emerald-50/90">
                <td className={cell}>(vii)</td>
                <td className={`${cell} font-medium text-emerald-900`}>{c.rowNetMonthlyTitle}</td>
                <td className={`${cellRight} font-bold text-emerald-900`}>
                  {formatInr(netMonthlyInr)}
                </td>
              </tr>
              <tr className="bg-slate-50/90">
                <td className={cell} />
                <td className={`${cell} font-bold text-msv-navy`}>{c.effectiveTdsTitle}</td>
                <td className={cellRightRed}>{formatRatePct(result.effectiveTdsRatePct)}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
