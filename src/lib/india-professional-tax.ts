/** 인도 주(State)별 직원 Professional Tax — 참고용 단순 구간. 법령·고시 변경 시 달라질 수 있습니다. */

export type ProfessionalTaxStateCode = "KA" | "MH" | "AP" | "TN";

/** 마하라슈트라 등 성별 구간 차이 반영용(그 외 주는 계산식에서 무시). */
export type PtGender = "male" | "female";

export type ProfessionalTaxStateMeta = {
  code: ProfessionalTaxStateCode;
  labelKo: string;
  labelEn: string;
  /** 계산에 포함된 가정 */
  assumptionKo: string;
};

export const professionalTaxStates: readonly ProfessionalTaxStateMeta[] = [
  {
    code: "KA",
    labelKo: "카르나타카(Karnataka)",
    labelEn: "Karnataka",
    assumptionKo:
      "급여소득자(직원) 월별 납부 구간 — Karnataka Tax on Professions, Trades and Callings Act 기준의 일반적인 3단계 요약입니다.",
  },
  {
    code: "MH",
    labelKo: "마하라슈트라(Maharashtra)",
    labelEn: "Maharashtra",
    assumptionKo:
      "급여소득자 월별 납부 구간 — Maharashtra State Tax on Professions, Trades, Callings and Employments Act 기준의 일반적인 구간입니다. 성별에 따라 슬래브가 다르므로 계산기에서 Male/Female을 선택하세요.",
  },
  {
    code: "AP",
    labelKo: "안드라프라데시(Andhra Pradesh)",
    labelEn: "Andhra Pradesh",
    assumptionKo:
      "급여소득자(직원) 월별 납부 구간 — Andhra Pradesh Tax on Profession, Trades, Callings and Employments Act 등에 따른 일반적인 3단계 요약입니다.",
  },
  {
    code: "TN",
    labelKo: "타밀나두(Tamil Nadu)",
    labelEn: "Tamil Nadu",
    assumptionKo:
      "급여소득자(직원) 월 급여 기준 구간 — Tamil Nadu Tax on Professions, Trades, Callings and Employments Act에 따른 일반적인 누진 요율입니다. 실제 납부는 반기(8월·1월 등) 방식인 경우가 많아 월액과 시기가 다를 수 있습니다.",
  },
];

/** 마하라슈트라만 월(2월 요율)이 월 세액에 영향을 줍니다. */
export function professionalTaxMonthAffectsMonthlyAmount(state: ProfessionalTaxStateCode): boolean {
  return state === "MH";
}

/** 마하라슈트라만 성별에 따라 슬래브가 달라집니다. */
export function professionalTaxGenderAffectsSlabs(state: ProfessionalTaxStateCode): boolean {
  return state === "MH";
}

/** 납부 리듬 안내용(참고). TN은 반기 납부 관행이 흔함. */
export function professionalTaxPaymentBasis(state: ProfessionalTaxStateCode): "monthly" | "half_yearly_common" {
  return state === "TN" ? "half_yearly_common" : "monthly";
}

/**
 * 현재 급여가 구간 표에서 몇 번째 행에 해당하는지(0 기반). NaN/음수면 -1.
 * UI의「적용 slab」표시와 계산 로직을 동일 출처로 맞춤.
 */
export function professionalTaxSlabRowIndex(
  state: ProfessionalTaxStateCode,
  monthlySalary: number,
  gender: PtGender,
): number {
  if (!Number.isFinite(monthlySalary) || monthlySalary < 0) return -1;

  if (state === "KA") {
    if (monthlySalary <= 15_000) return 0;
    if (monthlySalary <= 25_000) return 1;
    return 2;
  }

  if (state === "AP") {
    if (monthlySalary <= 15_000) return 0;
    if (monthlySalary <= 20_000) return 1;
    return 2;
  }

  if (state === "TN") {
    if (monthlySalary <= 21_000) return 0;
    if (monthlySalary <= 30_000) return 1;
    if (monthlySalary <= 45_000) return 2;
    if (monthlySalary <= 60_000) return 3;
    if (monthlySalary <= 75_000) return 4;
    return 5;
  }

  if (state === "MH") {
    if (gender === "female") {
      if (monthlySalary <= 25_000) return 0;
      return 1;
    }
    if (monthlySalary <= 7_500) return 0;
    if (monthlySalary <= 10_000) return 1;
    return 2;
  }

  return -1;
}

/** `month` — 1(1월) ~ 12(12월). 마하라슈트라 일부 구간은 2월에만 월 300 INR이 적용되는 경우가 많습니다. */
export function computeProfessionalTaxMonthly(
  state: ProfessionalTaxStateCode,
  monthlySalary: number,
  month: number,
  gender: PtGender = "male",
): number {
  if (!Number.isFinite(monthlySalary) || monthlySalary < 0) return 0;
  const m = month >= 1 && month <= 12 ? month : 1;

  if (state === "KA") {
    if (monthlySalary <= 15_000) return 0;
    if (monthlySalary <= 25_000) return 150;
    return 200;
  }

  if (state === "AP") {
    if (monthlySalary <= 15_000) return 0;
    if (monthlySalary <= 20_000) return 150;
    return 200;
  }

  if (state === "TN") {
    if (monthlySalary <= 21_000) return 0;
    if (monthlySalary <= 30_000) return 135;
    if (monthlySalary <= 45_000) return 315;
    if (monthlySalary <= 60_000) return 690;
    if (monthlySalary <= 75_000) return 1_025;
    return 1_250;
  }

  /* MH — male vs female slabs (일반적으로 인용되는 구간; 고시 변경 시 조정) */
  if (gender === "female") {
    if (monthlySalary <= 25_000) return 0;
    if (m === 2) return 300;
    return 200;
  }

  if (monthlySalary <= 7_500) return 0;
  if (monthlySalary <= 10_000) return 175;
  if (m === 2) return 300;
  return 200;
}

export function sumProfessionalTaxYearSameSalary(
  state: ProfessionalTaxStateCode,
  monthlySalary: number,
  gender: PtGender = "male",
): number {
  let sum = 0;
  for (let month = 1; month <= 12; month += 1) {
    sum += computeProfessionalTaxMonthly(state, monthlySalary, month, gender);
  }
  return sum;
}
