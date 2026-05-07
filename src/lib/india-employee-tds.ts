/**
 * 인도 거주 직원 급여 TDS 계산용 간이 계산 (스프레드시트 구조와 동일한 구간·공식).
 * 과세소득 E5 = 연간 총소득 − 표준공제(₹75,000 선택 시).
 *
 * 누진 구간(과세소득 기준):
 * - 4,00,001~8,00,000 @ 5% (구간당 최대 ₹20,000)
 * - 8,00,001~12,00,000 @ 10% (최대 ₹40,000)
 * - 12,00,001~16,00,000 @ 15%
 * - 16,00,001~20,00,000 @ 20% — =IF(E5>1600000, MIN(E5-1600000,400000)*20%, 0)
 * - 20,00,001~24,00,000 @ 25% — =IF(E5>2000000, MIN(E5-2000000,400000)*25%, 0)
 * - 24,00,001 초과 @ 30% — =IF(E5>2400000, (E5-2400000)*30%, 0)
 *
 * 서차지 — E5 = Net Taxable Income, E14 = Total Tax(누진 합):
 * =IF(E5>20000000, E14*25%, IF(E5>10000000, E14*15%, IF(E5>5000000, E14*10%, 0)))
 * (INR: 2천만 초과 25%, 1천만 초과 15%, 5백만 초과 10% — 각각 2크로어·1크로어·50라크)
 *
 * 교육세(cess) 4%: (소득세 누진 합계 + 서차지) × 4%
 */

export type SlabLine = { label: string; amount: number };

export type IndiaEmployeeTdsResult = {
  grossAnnual: number;
  standardDeduction: number;
  netTaxableIncome: number;
  slabLines: SlabLine[];
  /** (iv) 누진 소득세 합계 — 서차지·cess 제외 */
  slabTaxTotal: number;
  surcharge: number;
  /** 교육 cess 4% */
  educationCess: number;
  netTaxYearly: number;
  monthlyTds: number;
  /** 연 총소득 대비 유효 TDS율 (%) */
  effectiveTdsRatePct: number;
};

const L = 100_000;

function bandTax(E5: number, fromInr: number, toInr: number, rate: number): number {
  if (E5 <= fromInr) return 0;
  return (Math.min(E5, toInr) - fromInr) * rate;
}

/** 누진 구간별 세액(각 행 표시용) */
export function computeSlabBreakdown(netTaxable: number): { lines: SlabLine[]; total: number } {
  const E5 = Math.max(0, netTaxable);
  const lines: SlabLine[] = [
    { label: "Upto Rs. 4,00,000 @ 0%", amount: 0 },
    {
      label: "4,00,001 to 8,00,000 @ 5% (Max: 20,000)",
      amount: Math.round(bandTax(E5, 4 * L, 8 * L, 0.05)),
    },
    {
      label: "8,00,001 to 12,00,000 @ 10% (Max: 40,000)",
      amount: Math.round(bandTax(E5, 8 * L, 12 * L, 0.1)),
    },
    {
      label: "12,00,001 to 16,00,000 @ 15%",
      amount: Math.round(bandTax(E5, 12 * L, 16 * L, 0.15)),
    },
    {
      label: "16,00,001 to 20,00,000 @ 20%",
      amount: Math.round(E5 > 16 * L ? Math.min(E5 - 16 * L, 4 * L) * 0.2 : 0),
    },
    {
      label: "20,00,001 to 24,00,000 @ 25%",
      amount: Math.round(E5 > 20 * L ? Math.min(E5 - 20 * L, 4 * L) * 0.25 : 0),
    },
    {
      label: "Above Rs. 24,00,000 @ 30%",
      amount: Math.round(E5 > 24 * L ? (E5 - 24 * L) * 0.3 : 0),
    },
  ];
  const total = lines.reduce((s, r) => s + r.amount, 0);
  return { lines, total: total };
}

/** 서차지: Excel 중첩 IF와 동일. E5 = Net Taxable Income, E14 = Total Tax. */
const SURCHARGE_TWO_CRORE = 20_000_000;
const SURCHARGE_ONE_CRORE = 10_000_000;
const SURCHARGE_FIFTY_LAKH = 5_000_000;

export function computeSurcharge(netTaxableE5: number, slabTaxE14: number): number {
  const E5 = netTaxableE5;
  const E14 = slabTaxE14;
  if (E5 > SURCHARGE_TWO_CRORE) return Math.round(E14 * 0.25);
  if (E5 > SURCHARGE_ONE_CRORE) return Math.round(E14 * 0.15);
  if (E5 > SURCHARGE_FIFTY_LAKH) return Math.round(E14 * 0.1);
  return 0;
}

export function computeIndiaEmployeeTds(
  grossAnnualInr: number,
  applyStandardDeduction: boolean,
): IndiaEmployeeTdsResult {
  const gross = Math.max(0, grossAnnualInr);
  const standardDeduction = applyStandardDeduction ? 75_000 : 0;
  const netTaxableIncome = Math.max(0, gross - standardDeduction);

  const { lines: slabLines, total: slabTaxTotal } = computeSlabBreakdown(netTaxableIncome);
  const surcharge = computeSurcharge(netTaxableIncome, slabTaxTotal);
  const educationCess = Math.round((slabTaxTotal + surcharge) * 0.04);
  const netTaxYearly = slabTaxTotal + surcharge + educationCess;
  const monthlyTds = Math.round(netTaxYearly / 12);
  const effectiveTdsRatePct = gross > 0 ? (netTaxYearly / gross) * 100 : 0;

  return {
    grossAnnual: gross,
    standardDeduction,
    netTaxableIncome,
    slabLines,
    slabTaxTotal,
    surcharge,
    educationCess,
    netTaxYearly,
    monthlyTds,
    effectiveTdsRatePct,
  };
}
