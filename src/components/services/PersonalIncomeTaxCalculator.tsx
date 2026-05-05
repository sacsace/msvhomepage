"use client";

import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { computeIndiaEmployeeTds } from "@/lib/india-employee-tds";

/** 표·입력란 부연 (한글) */
function KoHint({ children }: { children: ReactNode }) {
  return <p className="mt-1 text-xs font-normal leading-snug text-slate-500">{children}</p>;
}

function formatInr(n: number): string {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(n);
}

function formatRatePct(n: number): string {
  return n.toLocaleString("en-IN", { minimumFractionDigits: 3, maximumFractionDigits: 3 });
}

/** 표 셀 — 서비스/회계 페이지와 동일한 slate 테두리 톤 */
const cellBase = "border border-slate-200 px-3 py-2.5 text-sm align-top sm:px-3.5";
const cell = `${cellBase} text-slate-800`;
const cellRight = `${cellBase} text-right tabular-nums text-slate-900`;
const cellRightRed = `${cellBase} text-right tabular-nums font-bold text-red-600`;
const th = `${cellBase} bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-msv-navy sm:text-sm`;

export function PersonalIncomeTaxCalculator() {
  const [monthlyIncomeStr, setMonthlyIncomeStr] = useState("");
  const [applyStd, setApplyStd] = useState(true);

  /** 세전 월급(INR) */
  const monthlySalary = useMemo(() => {
    const n = Number(String(monthlyIncomeStr).replace(/[, ]/g, ""));
    return Number.isFinite(n) && n >= 0 ? n : NaN;
  }, [monthlyIncomeStr]);

  /** 표 (i) Gross Income/Salary — 월급 × 12개월 */
  const grossAnnual = useMemo(() => {
    if (!Number.isFinite(monthlySalary)) return NaN;
    return Math.round(monthlySalary * 12);
  }, [monthlySalary]);

  const result = useMemo(() => {
    if (!Number.isFinite(grossAnnual)) return null;
    return computeIndiaEmployeeTds(grossAnnual, applyStd);
  }, [grossAnnual, applyStd]);

  /** 세전 월급 − 월 TDS (추정 실수령, 다른 공제 없음 가정) */
  const netMonthlyInr = useMemo(() => {
    if (!result || !Number.isFinite(monthlySalary)) return NaN;
    return Math.max(0, Math.round(monthlySalary - result.monthlyTds));
  }, [result, monthlySalary]);

  return (
    <div className="mx-auto max-w-5xl">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgb(15_23_42/0.04)] sm:p-7">
        <div className="border-b border-slate-100 pb-5 sm:pb-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-stretch sm:justify-between sm:gap-8">
            <div className="min-w-0 flex-1">
              <label className="block text-sm font-semibold text-msv-navy">
                세전 월급 (INR)
                <input
                  type="text"
                  inputMode="decimal"
                  value={monthlyIncomeStr}
                  onChange={(e) => setMonthlyIncomeStr(e.target.value)}
                  placeholder="예: 137500"
                  className="mt-2 block w-full max-w-md rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm tabular-nums text-slate-900 outline-none transition focus:border-msv-blue focus:ring-2 focus:ring-msv-blue/20"
                />
                <KoHint>한 달 기준 세전 급여를 숫자로 넣습니다. 표의 (i) 행은 이 금액에 12개월을 곱한 연간 총급여입니다.</KoHint>
              </label>
              <label className="mt-4 flex cursor-pointer items-start gap-2.5 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={applyStd}
                  onChange={(e) => setApplyStd(e.target.checked)}
                  className="mt-0.5 size-4 shrink-0 rounded border-slate-300 text-msv-blue focus:ring-msv-blue"
                />
                <span>
                  표준공제 ₹75,000 적용 (항목 (ii))
                  <KoHint>
                    급여·연금 등에 쓰이는 법정 표준공제입니다. 체크 해제 시 (ii)는 0으로 계산됩니다.
                  </KoHint>
                </span>
              </label>
            </div>
            <aside className="flex shrink-0 flex-col justify-center gap-5 rounded-xl border border-msv-blue/25 bg-msv-blue-soft/50 px-5 py-4 sm:min-w-[16rem] sm:flex-row sm:items-stretch sm:gap-0 sm:divide-x sm:divide-msv-blue/20 sm:self-center">
              <div className="flex-1 sm:pr-5 sm:text-right">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-msv-blue sm:text-xs">
                  월 납부 TDS
                </p>
                {result ? (
                  <>
                    <p className="mt-1 text-2xl font-bold tabular-nums text-msv-navy sm:text-3xl">
                      ₹ {formatInr(result.monthlyTds)}
                    </p>
                    <p className="mt-2 text-xs leading-snug text-slate-600 sm:ml-auto sm:max-w-[14rem]">
                      표 하단 (vi) Monthly TDS와 같은 값입니다. 연간 세액(v)을 12로 나눈 월 원천징수(TDS) 추정액입니다.
                    </p>
                  </>
                ) : (
                  <p className="mt-2 text-left text-sm leading-relaxed text-slate-500 sm:text-right">
                    세전 월급을 숫자로 입력하면
                    <br className="hidden sm:inline" /> 월 납부 금액이 표시됩니다.
                  </p>
                )}
              </div>
              <div className="flex-1 border-t border-msv-blue/20 pt-4 sm:border-t-0 sm:pl-5 sm:pt-0 sm:text-right">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-800 sm:text-xs">
                  실수령 (월 추정)
                </p>
                {result && Number.isFinite(netMonthlyInr) ? (
                  <>
                    <p className="mt-1 text-2xl font-bold tabular-nums text-emerald-800 sm:text-3xl">
                      ₹ {formatInr(netMonthlyInr)}
                    </p>
                    <p className="mt-2 text-xs leading-snug text-slate-600 sm:ml-auto sm:max-w-[14rem]">
                      세전 월급(₹ {formatInr(Math.round(monthlySalary))}) − 월 TDS(₹{" "}
                      {formatInr(result.monthlyTds)}). PF·기타 공제는 포함하지 않은 참고치입니다.
                    </p>
                  </>
                ) : (
                  <p className="mt-2 text-left text-sm leading-relaxed text-slate-500 sm:text-right">
                    TDS 계산 후
                    <br className="hidden sm:inline" /> 실수령 추정액이 표시됩니다.
                  </p>
                )}
              </div>
            </aside>
          </div>
        </div>

        {result === null ? (
          <p className="pt-5 text-sm leading-relaxed text-slate-600 sm:pt-6">
            세전 월급을 숫자로 입력하면 아래에 급여자 TDS 워킹 표가 채워집니다. (스프레드시트 형식의 참고용 계산입니다.)
          </p>
        ) : (
          <div className="overflow-x-auto pt-5 sm:pt-6">
            <table className="w-full min-w-[640px] border-collapse rounded-xl border border-slate-200">
              <thead>
                <tr>
                  <th className={`${th} w-[10%]`}>S.No.</th>
                  <th className={`${th} w-[55%]`}>Employee Name TDS working</th>
                  <th className={`${th} w-[35%] text-right`}>Amount (INR)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={cell}>(i)</td>
                  <td className={cell}>
                    <span className="font-medium">Gross Income/Salary (12 months)</span>
                    <KoHint>입력한 월급 × 12개월. 연간 총급여(세전)입니다.</KoHint>
                  </td>
                  <td className={cellRight}>{formatInr(result.grossAnnual)}</td>
                </tr>
                <tr>
                  <td className={cell}>(ii)</td>
                  <td className={cell}>
                    <span className="font-medium">Standard Deduction</span>
                    <KoHint>연 ₹75,000 공제. 체크 해제 시 0입니다.</KoHint>
                  </td>
                  <td className={cellRight}>{formatInr(result.standardDeduction)}</td>
                </tr>
                <tr className="bg-msv-blue-soft/90">
                  <td className={cell}>(iii)</td>
                  <td className={`${cell} font-medium text-msv-navy`}>
                    <span>Net Taxable Income ( (i) − (ii) )</span>
                    <KoHint>순과세소득</KoHint>
                  </td>
                  <td className={cellRightRed}>{formatInr(result.netTaxableIncome)}</td>
                </tr>
                <tr>
                  <td className={cell}>(iv)</td>
                  <td className={`${cell} font-medium text-msv-navy`}>
                    <span>Income tax</span>
                    <KoHint>아래 각 줄은 소득 구간별로 계산된 누진 소득세입니다.</KoHint>
                  </td>
                  <td className={cellRight} />
                </tr>
                {result.slabLines.map((row) => (
                  <tr key={row.label}>
                    <td className={cell} />
                    <td className={`${cell} pl-5 text-slate-700 sm:pl-6`}>{row.label}</td>
                    <td className={cellRight}>{formatInr(row.amount)}</td>
                  </tr>
                ))}
                <tr className="bg-orange-50/90">
                  <td className={cell} />
                  <td className={`${cell} font-semibold text-msv-navy`}>Total Tax</td>
                  <td className={`${cellRight} font-semibold`}>{formatInr(result.slabTaxTotal)}</td>
                </tr>
                <tr className="bg-orange-50/90">
                  <td className={cell} />
                  <td className={cell}>
                    <span className="font-medium">Surcharge @ 10~25% (과세소득세)</span>
                    <KoHint>
                      과세소득이 50 lakh / 1 cr / 2 cr 초과에 따라 Total Tax의 10%·15%·25%가 붙습니다.
                    </KoHint>
                  </td>
                  <td className={cellRight}>{formatInr(result.surcharge)}</td>
                </tr>
                <tr className="bg-orange-50/90">
                  <td className={cell} />
                  <td className={cell}>
                    <span className="font-medium">Add: Education cess @ 4% (교육세+추가세)</span>
                    <KoHint>교육세·추가세(cess)는 누진 소득세와 서차지 합계에 4%를 적용한 금액입니다.</KoHint>
                  </td>
                  <td className={cellRight}>{formatInr(result.educationCess)}</td>
                </tr>
                <tr>
                  <td className={cell}>(v)</td>
                  <td className={`${cell} font-medium text-msv-navy`}>
                    <span>Net Tax (Yearly)</span>
                    <KoHint>연간으로 납부할 세액</KoHint>
                  </td>
                  <td className={`${cellRight} font-semibold text-msv-navy`}>
                    {formatInr(result.netTaxYearly)}
                  </td>
                </tr>
                <tr>
                  <td className={cell}>(vi)</td>
                  <td className={cell}>
                    <span className="font-medium">Monthly TDS</span>
                    <KoHint>(v)를 12로 나눈 월 원천징수 추정액입니다.</KoHint>
                  </td>
                  <td className={cellRight}>{formatInr(result.monthlyTds)}</td>
                </tr>
                <tr className="bg-emerald-50/90">
                  <td className={cell}>(vii)</td>
                  <td className={`${cell} font-medium text-emerald-900`}>
                    <span>실수령 금액 (월 추정)</span>
                    <KoHint>세전 월급 − (vi) Monthly TDS. PF·HRA 등 다른 공제는 반영하지 않았습니다.</KoHint>
                  </td>
                  <td className={`${cellRight} font-bold text-emerald-900`}>
                    {formatInr(netMonthlyInr)}
                  </td>
                </tr>
                <tr className="bg-slate-50/90">
                  <td className={cell} />
                  <td className={cell}>
                    <span className="font-bold text-msv-navy">Effective TDS Rate</span>
                    <KoHint>연간 총급여(i) 대비 실효 원천징수율(%)입니다.</KoHint>
                  </td>
                  <td className={cellRightRed}>{formatRatePct(result.effectiveTdsRatePct)}%</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
