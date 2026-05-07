"use client";

import { useMemo, useState } from "react";
import {
  computeCorporateIncomeExpenseTax,
  CORPORATE_EFFECTIVE_RATE_UP_TO_400CR,
} from "@/lib/india-corporate-tax-workings";
import { corporateTaxCalculatorCopy } from "@/lib/i18n/corporate-tax-calculator-locale";
import type { SiteLocale } from "@/lib/site-locale";

function parseInr(s: string): number {
  const n = Number(String(s).replace(/[, ]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

function formatInr(n: number): string {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Math.round(n));
}

/** (q)(r) 등 최종 납부세액: 음수면 환급, 양수면 납부(둘 다 빨간색). */
function FinalPayableInrCell({
  amount,
  refundLabel,
  payableLabel,
}: {
  amount: number;
  refundLabel: string;
  payableLabel: string;
}) {
  const v = Math.round(amount);
  const red = "font-bold tabular-nums text-red-600";
  if (v < 0) {
    return (
      <span className={red}>
        {refundLabel} · {formatInr(Math.abs(v))}
      </span>
    );
  }
  if (v > 0) {
    return (
      <span className={red}>
        {payableLabel} {formatInr(v)}
      </span>
    );
  }
  return <span className="tabular-nums text-slate-600">{formatInr(0)}</span>;
}

const effectivePct = (CORPORATE_EFFECTIVE_RATE_UP_TO_400CR * 100).toLocaleString("en-IN", {
  minimumFractionDigits: 3,
  maximumFractionDigits: 3,
});

const inputClass =
  "mt-1 block w-full min-w-0 rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-sm tabular-nums text-slate-900 outline-none focus:border-msv-blue focus:ring-2 focus:ring-msv-blue/20 sm:max-w-[14rem]";

function Field({
  id,
  label,
  hint,
  value,
  onChange,
}: {
  id: string;
  label: string;
  hint?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="min-w-0">
      <label htmlFor={id} className="block text-sm font-medium text-msv-navy">
        {label}
      </label>
      {hint ? <p className="mt-0.5 text-xs leading-snug text-slate-500">{hint}</p> : null}
      <input
        id={id}
        type="text"
        inputMode="decimal"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="0"
        className={inputClass}
      />
    </div>
  );
}

const cell = "border border-slate-200 px-3 py-2.5 text-sm text-slate-800 sm:px-3.5";
const cellRight = `${cell} text-right tabular-nums`;
const th = `${cell} bg-slate-50 text-left text-xs font-semibold text-msv-navy`;
const rowHighlight = "bg-msv-navy/[0.06] font-semibold text-msv-navy";
const groupHeaderCell = `${cell} bg-slate-100/95 py-2 text-xs font-semibold tracking-wide text-msv-navy`;

function ItemCell({
  code,
  title,
  sub,
  formula,
  formulaLabel,
}: {
  code: string;
  title: string;
  sub?: string;
  formula?: string;
  formulaLabel: string;
}) {
  return (
    <td className={`${cell} align-middle`}>
      <p className="min-w-0 text-sm leading-snug sm:whitespace-nowrap sm:overflow-x-auto">
        <span className="font-mono text-xs font-bold text-msv-blue">({code})</span>{" "}
        <span className="font-medium">{title}</span>
        {formula ? (
          <>
            <span className="text-slate-500"> · </span>
            <span className="font-mono text-xs text-slate-700">
              {formulaLabel}: ({formula})
            </span>
          </>
        ) : null}
        {sub ? (
          <>
            <span className="text-slate-500"> · </span>
            <span className="text-xs text-slate-500">{sub}</span>
          </>
        ) : null}
      </p>
    </td>
  );
}

export function CorporateTaxCalculator({ locale }: { locale: SiteLocale }) {
  const t = corporateTaxCalculatorCopy(locale);
  const [revenue, setRevenue] = useState("");
  const [purchases, setPurchases] = useState("");
  const [directExp, setDirectExp] = useState("");
  const [indirectExp, setIndirectExp] = useState("");
  const [tds, setTds] = useState("");
  const [advancePaid, setAdvancePaid] = useState("");

  const result = useMemo(() => {
    return computeCorporateIncomeExpenseTax({
      revenue: parseInr(revenue),
      purchases: parseInr(purchases),
      directExpenses: parseInr(directExp),
      indirectExpenses: parseInr(indirectExp),
      tdsCredit26As: parseInr(tds),
      advanceTaxAlreadyPaid: parseInr(advancePaid),
    });
  }, [revenue, purchases, directExp, indirectExp, tds, advancePaid]);

  return (
    <div className="w-full space-y-6">
      <div className="space-y-4">
        <div className="rounded-xl border border-msv-blue/25 bg-msv-blue-soft/50 px-4 py-3 sm:px-5 sm:py-4">
          <p className="text-sm font-semibold text-msv-navy">{t.section1Title}</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">
            {t.section1LeadBeforeRows}
            <strong className="text-msv-navy">{t.section1LeadRowsStrong}</strong>
            {t.section1LeadAfterRows}
            <strong className="text-msv-navy">{t.section1LeadActStrong}</strong>
            {t.section1LeadTail}
          </p>
          <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm leading-relaxed text-slate-700">
            <li className="leading-snug">
              <strong className="text-msv-navy">{t.section1LiIStrong}</strong>
              {t.section1LiIRest}
            </li>
            <li className="leading-snug">
              <strong className="text-msv-navy">{t.section1LiJStrong}</strong> = (i) × <strong className="tabular-nums">10%</strong>
              <span className="text-slate-600">{t.section1LiJNote}</span>
            </li>
            <li className="leading-snug">
              <strong className="text-msv-navy">(k)</strong> {t.section1LiK.replace(/^\(k\)\s*/, "")}
            </li>
            <li className="leading-snug">
              {t.section1LiLBeforeRate}
              <strong className="tabular-nums text-msv-navy">{t.section1LiLRate(effectivePct)}</strong>
              <span className="text-slate-600">{t.section1LiLNote}</span>
            </li>
          </ol>
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50/90 px-4 py-3 sm:px-5 sm:py-4">
          <p className="text-sm font-semibold text-msv-navy">{t.section2Title}</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">
            {t.section2P1Before}
            <strong className="text-msv-navy">{t.section2P1Strong}</strong>
            {t.section2P1After}
            <strong className="text-msv-navy">{t.section2P1Msv}</strong>
            {t.section2P1End}
          </p>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-slate-700">
            <li className="leading-snug">
              <strong className="text-msv-navy">{t.section2Ul1Strong}</strong>
              {t.section2Ul1Rest}
            </li>
            <li className="leading-snug">
              <strong className="text-msv-navy">{t.section2Ul2Strong}</strong>
              {t.section2Ul2Rest}
            </li>
            <li className="leading-snug">{t.section2Ul3}</li>
            <li className="leading-snug">{t.section2Ul4}</li>
          </ul>
          <p className="mt-3 text-xs leading-relaxed text-slate-600">{t.section2Foot1}</p>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">{t.section2Foot2}</p>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-msv-navy">{t.inputsHeading}</h3>
        <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Field id="ct-rev" label={t.fieldA} value={revenue} onChange={setRevenue} />
          <Field id="ct-purch" label={t.fieldC} value={purchases} onChange={setPurchases} />
          <Field id="ct-de" label={t.fieldD} value={directExp} onChange={setDirectExp} />
          <Field id="ct-ie" label={t.fieldF} value={indirectExp} onChange={setIndirectExp} />
          <Field id="ct-tds" label={t.fieldM} hint={t.fieldMHint} value={tds} onChange={setTds} />
          <Field id="ct-adv" label={t.fieldP} hint={t.fieldPHint} value={advancePaid} onChange={setAdvancePaid} />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-msv-navy">{t.workingHeading}</h3>
        <p className="mt-2 text-sm leading-relaxed text-red-700">
          {t.workingLeadBeforeL}
          <strong className="font-semibold">{t.workingLeadLStrong}</strong>
          {t.workingLeadAfterL}
          <strong className="font-semibold">{t.workingLeadGrossStrong}</strong>
          {t.workingLeadEnd}
        </p>
        <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-[32rem] border-collapse text-left text-sm">
            <thead>
              <tr>
                <th scope="col" className={th}>
                  {t.tableColItem}
                </th>
                <th scope="col" className={`${th} w-[28%] text-right`}>
                  {t.tableColAmount}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <ItemCell formulaLabel={t.formulaLabel} code="a" title={t.rowA} formula={t.formulaInput} />
                <td className={cellRight}>{formatInr(parseInr(revenue))}</td>
              </tr>
              <tr>
                <ItemCell
                  formulaLabel={t.formulaLabel}
                  code="b"
                  title={t.rowB}
                  sub={t.rowBSub}
                  formula="b = (a)"
                />
                <td className={cellRight}>{formatInr(result.totalIncome)}</td>
              </tr>
              <tr>
                <ItemCell formulaLabel={t.formulaLabel} code="c" title={t.rowC} formula={t.formulaInput} />
                <td className={cellRight}>{formatInr(parseInr(purchases))}</td>
              </tr>
              <tr>
                <ItemCell formulaLabel={t.formulaLabel} code="d" title={t.rowD} formula={t.formulaInput} />
                <td className={cellRight}>{formatInr(parseInr(directExp))}</td>
              </tr>
              <tr>
                <ItemCell
                  formulaLabel={t.formulaLabel}
                  code="e"
                  title={t.rowE}
                  formula="e = (c + d)"
                />
                <td className={cellRight}>{formatInr(result.totalDirectExpenses)}</td>
              </tr>
              <tr>
                <ItemCell formulaLabel={t.formulaLabel} code="f" title={t.rowF} formula={t.formulaInput} />
                <td className={cellRight}>{formatInr(parseInr(indirectExp))}</td>
              </tr>
              <tr>
                <ItemCell
                  formulaLabel={t.formulaLabel}
                  code="g"
                  title={t.rowG}
                  sub={t.rowGSub}
                  formula="g = (e + f)"
                />
                <td className={cellRight}>{formatInr(result.totalExpenses)}</td>
              </tr>
              <tr className={rowHighlight}>
                <ItemCell
                  formulaLabel={t.formulaLabel}
                  code="h"
                  title={t.rowH}
                  formula="h = (b − g)"
                />
                <td className={cellRight}>{formatInr(result.taxableIncome)}</td>
              </tr>
              <tr>
                <ItemCell
                  formulaLabel={t.formulaLabel}
                  code="i"
                  title={t.rowI}
                  sub={t.rowISub}
                  formula="i = (max(0, h) × 22%)"
                />
                <td className={cellRight}>{formatInr(result.taxAt22)}</td>
              </tr>
              <tr>
                <ItemCell
                  formulaLabel={t.formulaLabel}
                  code="j"
                  title={t.rowJ}
                  formula="j = (i × 10%)"
                />
                <td className={cellRight}>{formatInr(result.surchargeAt10)}</td>
              </tr>
              <tr>
                <ItemCell
                  formulaLabel={t.formulaLabel}
                  code="k"
                  title={t.rowK}
                  formula="k = ((i + j) × 4%)"
                />
                <td className={cellRight}>{formatInr(result.cessAt4)}</td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td colSpan={2} className={groupHeaderCell}>
                  {t.groupGrossCredits}
                </td>
              </tr>
              <tr className="bg-red-50/90">
                <ItemCell
                  formulaLabel={t.formulaLabel}
                  code="l"
                  title={t.rowL}
                  sub={t.rowLSub}
                  formula="l = (i + j + k)"
                />
                <td className={`${cellRight} font-bold text-red-600`}>{formatInr(result.totalTaxLiability)}</td>
              </tr>
              <tr>
                <ItemCell formulaLabel={t.formulaLabel} code="m" title={t.rowM} formula={t.formulaInput} />
                <td className={cellRight}>{formatInr(parseInr(tds))}</td>
              </tr>
              <tr>
                <ItemCell
                  formulaLabel={t.formulaLabel}
                  code="n"
                  title={t.rowN}
                  formula="n = (l − m)"
                />
                <td className={cellRight}>{formatInr(result.netTaxPayable)}</td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td colSpan={2} className={groupHeaderCell}>
                  {t.groupAdvanceFinal}
                </td>
              </tr>
              <tr>
                <ItemCell
                  formulaLabel={t.formulaLabel}
                  code="o"
                  title={t.rowO}
                  sub={t.rowOSub}
                  formula="o = (n)"
                />
                <td className={cellRight}>{formatInr(result.netTaxPayable)}</td>
              </tr>
              <tr>
                <ItemCell formulaLabel={t.formulaLabel} code="p" title={t.rowP} formula={t.formulaInput} />
                <td className={cellRight}>{formatInr(parseInr(advancePaid))}</td>
              </tr>
              <tr>
                <ItemCell
                  formulaLabel={t.formulaLabel}
                  code="q"
                  title={t.rowQ}
                  formula="q = (n − p)"
                />
                <td className={cellRight}>
                  <FinalPayableInrCell
                    amount={result.balanceBeforeRound}
                    refundLabel={t.finalRefund}
                    payableLabel={t.finalPayable}
                  />
                </td>
              </tr>
              <tr className={rowHighlight}>
                <ItemCell
                  formulaLabel={t.formulaLabel}
                  code="r"
                  title={t.rowR}
                  formula="r = (round₹100(q))"
                />
                <td className={cellRight}>
                  <FinalPayableInrCell
                    amount={result.finalRoundedNearest100}
                    refundLabel={t.finalRefund}
                    payableLabel={t.finalPayable}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
