/** 인도 Payment of Gratuity Act 기준 산정 — MSV 샘플 시트(20250821_Gratuity Sample)와 동일 수식 */

export type GratuitySalaryComponent = {
  id: string;
  /** 기본 라벨 키 또는 사용자 입력명 */
  label: string;
  amount: number;
  /** 1=산정 포함, 0=미포함 */
  included: boolean;
};

export type GratuityCalcInput = {
  components: readonly GratuitySalaryComponent[];
  /** Section 2(s) 계열: 미포함 수당이 월급여의 이 비율을 넘으면 초과분을 가산 (샘플 기본 0.5) */
  excludedCapRatio: number;
  /** 법정 환산일수 (통상 26) */
  statutoryDays: number;
  /** 근속 1년당 지급일수 (통상 15) */
  daysPerYear: number;
  /** 적용 근속연수 */
  yearsOfService: number;
  /** 법정 상한 INR (통상 20,00,000) */
  statutoryCeiling: number;
};

export type GratuityCalcResult = {
  monthlyTotal: number;
  eligibleSalary: number;
  excludedAllowances: number;
  additionalAmount: number;
  gratuityMonthlyBase: number;
  /** 산정액 = 기준월급여 ÷ 환산일수 × 지급일수 × 근속연수 */
  calculated: number;
  /** min(산정액, 법정 상한) */
  payable: number;
  cappedByCeiling: boolean;
};

export const DEFAULT_GRATUITY_STATUTORY_DAYS = 26;
export const DEFAULT_GRATUITY_DAYS_PER_YEAR = 15;
export const DEFAULT_GRATUITY_EXCLUDED_CAP_RATIO = 0.5;
export const DEFAULT_GRATUITY_CEILING_INR = 2_000_000;

export function createDefaultGratuityComponents(): GratuitySalaryComponent[] {
  return [
    { id: "basic", label: "Basic", amount: 10000, included: true },
    { id: "hra", label: "HRA", amount: 3000, included: false },
    { id: "other", label: "Other", amount: 2000, included: true },
  ];
}

function num(n: number): number {
  return Number.isFinite(n) && n > 0 ? n : 0;
}

/** 샘플 시트와 동일: SUMPRODUCT·MAX·÷26×15×연수 */
export function computeGratuity(input: GratuityCalcInput): GratuityCalcResult {
  const monthlyTotal = input.components.reduce((s, c) => s + Math.max(0, num(c.amount)), 0);
  const eligibleSalary = input.components.reduce(
    (s, c) => s + (c.included ? Math.max(0, num(c.amount)) : 0),
    0,
  );
  const excludedAllowances = Math.max(0, monthlyTotal - eligibleSalary);
  const ratio =
    Number.isFinite(input.excludedCapRatio) && input.excludedCapRatio >= 0
      ? input.excludedCapRatio
      : DEFAULT_GRATUITY_EXCLUDED_CAP_RATIO;
  const additionalAmount = Math.max(0, excludedAllowances - monthlyTotal * ratio);
  const gratuityMonthlyBase = eligibleSalary + additionalAmount;

  const statutoryDays = Math.max(1, num(input.statutoryDays) || DEFAULT_GRATUITY_STATUTORY_DAYS);
  const daysPerYear = Math.max(0, num(input.daysPerYear) || DEFAULT_GRATUITY_DAYS_PER_YEAR);
  const years = Math.max(0, num(input.yearsOfService));
  const ceiling = Math.max(0, num(input.statutoryCeiling) || DEFAULT_GRATUITY_CEILING_INR);

  const calculated =
    gratuityMonthlyBase > 0 && years > 0
      ? (gratuityMonthlyBase / statutoryDays) * daysPerYear * years
      : 0;
  const payable = Math.min(calculated, ceiling);

  return {
    monthlyTotal,
    eligibleSalary,
    excludedAllowances,
    additionalAmount,
    gratuityMonthlyBase,
    calculated,
    payable,
    cappedByCeiling: calculated > ceiling && ceiling > 0,
  };
}

/** 표시용 정수 루피 (샘플은 소수 가능하나 UI는 원 단위 반올림) */
export function roundGratuityInr(n: number): number {
  if (!Number.isFinite(n) || n <= 0) return 0;
  return Math.round(n);
}
