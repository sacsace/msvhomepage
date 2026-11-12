/**
 * 인도 거주 직원 급여 TDS — 신세제(New Tax Regime) 참고 계산.
 * 적용 기준: FY 2025-26 · AY 2026-27
 *
 * 누진 구간(과세소득 기준):
 * - ₹4,00,001~8,00,000 @ 5%
 * - ₹8,00,001~12,00,000 @ 10%
 * - ₹12,00,001~16,00,000 @ 15%
 * - ₹16,00,001~20,00,000 @ 20%
 * - ₹20,00,001~24,00,000 @ 25%
 * - ₹24,00,000 초과 @ 30%
 *
 * Section 87A (거주자 개인, 신세제):
 * - 과세소득 ≤ ₹12 lakh → 세액감면 최대 ₹60,000
 * - 과세소득이 ₹12 lakh를 약간 넘는 경우 한계감면(marginal relief) 적용
 *
 * 추가세(Surcharge): 과세소득 50 lakh / 1 cr / 2 cr 초과 시 세액의 10% / 15% / 25%
 * 보건·교육세 4%: (감면 후 소득세 + 추가세) × 4%
 */

export type SlabLine = { label: string; amount: number };

export type IndiaEmployeeTdsResult = {
  grossAnnual: number;
  standardDeduction: number;
  netTaxableIncome: number;
  slabLines: SlabLine[];
  /** 누진 소득세 합계 — 87A·추가세·cess 제외 */
  slabTaxTotal: number;
  /** Section 87A 세액감면(한계감면 반영 후 차감액) */
  rebate87A: number;
  /** 87A·한계감면 반영 후 소득세 */
  taxAfterRebate: number;
  surcharge: number;
  educationCess: number;
  netTaxYearly: number;
  monthlyTds: number;
  effectiveTdsRatePct: number;
};

export const NEW_REGIME_STANDARD_DEDUCTION = 75_000;
export const SECTION_87A_INCOME_LIMIT = 12_00_000;
export const SECTION_87A_MAX_REBATE = 60_000;

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
  return { lines, total };
}

const SURCHARGE_TWO_CRORE = 20_000_000;
const SURCHARGE_ONE_CRORE = 10_000_000;
const SURCHARGE_FIFTY_LAKH = 5_000_000;

export function computeSurcharge(netTaxableE5: number, taxAfterRebate: number): number {
  const E5 = netTaxableE5;
  const tax = taxAfterRebate;
  if (E5 > SURCHARGE_TWO_CRORE) return Math.round(tax * 0.25);
  if (E5 > SURCHARGE_ONE_CRORE) return Math.round(tax * 0.15);
  if (E5 > SURCHARGE_FIFTY_LAKH) return Math.round(tax * 0.1);
  return 0;
}

/**
 * Section 87A + 한계감면.
 * 거주자·신세제: TI ≤ 12L → 최대 6만 감면; TI > 12L → 세액이 (TI−12L)을 넘지 않도록 한계감면.
 */
export function applySection87ARebate(
  netTaxable: number,
  slabTax: number,
  isResidentIndividual: boolean,
): { rebate: number; taxAfterRebate: number } {
  if (!isResidentIndividual || slabTax <= 0) {
    return { rebate: 0, taxAfterRebate: Math.max(0, slabTax) };
  }

  const TI = Math.max(0, netTaxable);
  let taxAfter = slabTax;

  if (TI <= SECTION_87A_INCOME_LIMIT) {
    const rebate = Math.min(slabTax, SECTION_87A_MAX_REBATE);
    taxAfter = Math.max(0, slabTax - rebate);
    return { rebate, taxAfterRebate: taxAfter };
  }

  const marginalCeiling = TI - SECTION_87A_INCOME_LIMIT;
  if (slabTax > marginalCeiling) {
    taxAfter = Math.max(0, marginalCeiling);
    return { rebate: slabTax - taxAfter, taxAfterRebate: taxAfter };
  }

  return { rebate: 0, taxAfterRebate: slabTax };
}

export function computeIndiaEmployeeTds(
  grossAnnualInr: number,
  applyStandardDeduction: boolean,
  isResidentIndividual = true,
): IndiaEmployeeTdsResult {
  const gross = Math.max(0, grossAnnualInr);
  const standardDeduction = applyStandardDeduction
    ? Math.min(NEW_REGIME_STANDARD_DEDUCTION, gross)
    : 0;
  const netTaxableIncome = Math.max(0, gross - standardDeduction);

  const { lines: slabLines, total: slabTaxTotal } = computeSlabBreakdown(netTaxableIncome);
  const { rebate: rebate87A, taxAfterRebate } = applySection87ARebate(
    netTaxableIncome,
    slabTaxTotal,
    isResidentIndividual,
  );
  const surcharge = computeSurcharge(netTaxableIncome, taxAfterRebate);
  const educationCess = Math.round((taxAfterRebate + surcharge) * 0.04);
  const netTaxYearly = taxAfterRebate + surcharge + educationCess;
  const monthlyTds = Math.round(netTaxYearly / 12);
  const effectiveTdsRatePct = gross > 0 ? (netTaxYearly / gross) * 100 : 0;

  return {
    grossAnnual: gross,
    standardDeduction,
    netTaxableIncome,
    slabLines,
    slabTaxTotal,
    rebate87A,
    taxAfterRebate,
    surcharge,
    educationCess,
    netTaxYearly,
    monthlyTds,
    effectiveTdsRatePct,
  };
}
