/**
 * 법인세 계산(매출·매입·비용 기반) — 제115BAA조 참고용.
 * 세무조정 전 단순 과세소득 × (22% + 추가세 10% + 보건·교육세 4%) → 적용 세율 25.168%.
 * 제115BAA조는 소득 규모와 관계없이 추가세 10%, MAT 적용 제외.
 */

export const CORPORATE_BASE_RATE = 0.22;
export const CORPORATE_SURCHARGE_ON_TAX = 0.1;
export const CORPORATE_CESS_ON_TAX_PLUS_SURCHARGE = 0.04;

/** 22% × 1.10 × 1.04 = 0.25168 */
export const CORPORATE_EFFECTIVE_RATE_UP_TO_400CR =
  CORPORATE_BASE_RATE * (1 + CORPORATE_SURCHARGE_ON_TAX) * (1 + CORPORATE_CESS_ON_TAX_PLUS_SURCHARGE);

export type CorporateIncomeExpenseInput = {
  readonly revenue: number;
  readonly purchases: number;
  readonly directExpenses: number;
  readonly indirectExpenses: number;
  readonly tdsCredit26As: number;
  readonly advanceTaxAlreadyPaid: number;
};

export type CorporateIncomeExpenseResult = {
  readonly totalDirectExpenses: number;
  readonly totalExpenses: number;
  readonly totalIncome: number;
  readonly taxableIncome: number;
  readonly taxAt22: number;
  readonly surchargeAt10: number;
  readonly cessAt4: number;
  readonly totalTaxLiability: number;
  readonly netTaxPayable: number;
  readonly balanceBeforeRound: number;
  readonly finalRoundedNearest100: number;
};

export function roundToNearestHundred(n: number): number {
  if (!Number.isFinite(n)) return 0;
  return Math.round(n / 100) * 100;
}

export function computeCorporateIncomeExpenseTax(i: CorporateIncomeExpenseInput): CorporateIncomeExpenseResult {
  const totalDirectExpenses = i.purchases + i.directExpenses;
  const totalExpenses = totalDirectExpenses + i.indirectExpenses;
  const totalIncome = i.revenue;
  const taxableIncome = totalIncome - totalExpenses;

  const base = Math.max(0, taxableIncome);
  const taxAt22 = Math.round(base * CORPORATE_BASE_RATE);
  const surchargeAt10 = Math.round(taxAt22 * CORPORATE_SURCHARGE_ON_TAX);
  const cessAt4 = Math.round((taxAt22 + surchargeAt10) * CORPORATE_CESS_ON_TAX_PLUS_SURCHARGE);
  const totalTaxLiability = taxAt22 + surchargeAt10 + cessAt4;

  const netTaxPayable = totalTaxLiability - i.tdsCredit26As;
  const balanceBeforeRound = netTaxPayable - i.advanceTaxAlreadyPaid;
  const finalRoundedNearest100 = roundToNearestHundred(balanceBeforeRound);

  return {
    totalDirectExpenses,
    totalExpenses,
    totalIncome,
    taxableIncome,
    taxAt22,
    surchargeAt10,
    cessAt4,
    totalTaxLiability,
    netTaxPayable,
    balanceBeforeRound,
    finalRoundedNearest100,
  };
}
