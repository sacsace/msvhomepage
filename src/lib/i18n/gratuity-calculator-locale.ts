import type { SiteLocale } from "@/lib/site-locale";
import { pickLocale } from "@/lib/site-locale";
import { company } from "@/lib/site-content";

export type GratuityCalculatorCopy = {
  metaTitle: string;
  metaDescription: string;
  pageHeaderTitle: string;
  pageHeaderDescription: string;
  sectionRefCalc: string;
  disclaimer: string;
  linkServices: string;
  linkContact: string;
  linkHrPayroll: string;
  sectionComponents: string;
  sectionComponentsHint: string;
  colItem: string;
  colAmount: string;
  colInclude: string;
  includeYes: string;
  includeNo: string;
  addRow: string;
  removeRow: string;
  labelBasic: string;
  labelHra: string;
  labelOther: string;
  sectionService: string;
  fieldYears: string;
  yearsHint: string;
  sectionRules: string;
  fieldStatutoryDays: string;
  fieldDaysPerYear: string;
  fieldCeiling: string;
  fieldExcludedCap: string;
  excludedCapHint: string;
  asideSummaryHeading: string;
  labelMonthlyTotal: string;
  labelEligible: string;
  labelExcluded: string;
  labelAdditional: string;
  labelBase: string;
  labelCalculated: string;
  labelPayable: string;
  formulaNote: string;
  ceilingApplied: string;
  emptyHint: string;
};

const ko: GratuityCalculatorCopy = {
  metaTitle: `퇴직금(Gratuity) 계산기 | ${company.shortName}`,
  metaDescription:
    "인도 Payment of Gratuity Act 기준으로 산정 대상 월급여·근속연수를 입력해 퇴직금(Gratuity)을 계산합니다. 산정월급여÷26×15×근속연수.",
  pageHeaderTitle: "퇴직금(Gratuity) 계산기",
  pageHeaderDescription:
    "급여 항목과 근속연수로 인도 법인 퇴직금(Gratuity)을 산정합니다. 기준 월급여 ÷ 26 × 15 × 근속연수.",
  sectionRefCalc: "계산기",
  disclaimer:
    "Payment of Gratuity Act·MSV 샘플 시트 기준 참고용입니다. 5년 근속 요건·계약·법 개정에 따라 실지급액이 달라질 수 있으니 최종은 세무·노무 자문으로 확정하세요.",
  linkServices: "서비스 목록",
  linkContact: "문의하기",
  linkHrPayroll: "HR·Payroll 서비스",
  sectionComponents: "급여 항목",
  sectionComponentsHint: "산정에 넣을 항목만 ‘포함’으로 두세요. HRA 등은 보통 미포함입니다.",
  colItem: "항목",
  colAmount: "월 금액 (₹)",
  colInclude: "포함",
  includeYes: "포함",
  includeNo: "미포함",
  addRow: "항목 추가",
  removeRow: "삭제",
  labelBasic: "Basic",
  labelHra: "HRA",
  labelOther: "Other",
  sectionService: "근속연수",
  fieldYears: "적용 근속연수",
  yearsHint: "1년 = 1 · 6개월 초과분은 실무에서 1년으로 올리는 경우가 많습니다.",
  sectionRules: "산정 기준",
  fieldStatutoryDays: "환산일수",
  fieldDaysPerYear: "연당 지급일수",
  fieldCeiling: "법정 상한 (₹)",
  fieldExcludedCap: "미포함 수당 가산 비율 (%)",
  excludedCapHint: "미포함 수당이 월 합계의 이 비율을 넘으면 초과분을 기준 월급여에 가산합니다.",
  asideSummaryHeading: "결과",
  labelMonthlyTotal: "월 보수 합계",
  labelEligible: "산정 대상",
  labelExcluded: "미포함 수당",
  labelAdditional: "추가 반영",
  labelBase: "기준 월급여",
  labelCalculated: "계산액",
  labelPayable: "지급 참고액",
  formulaNote: "기준 월급여 ÷ 환산일수 × 연당 지급일수 × 근속연수",
  ceilingApplied: "법정 상한 적용",
  emptyHint: "급여와 근속연수를 입력하세요.",
};

const en: GratuityCalculatorCopy = {
  metaTitle: `Gratuity calculator | ${company.shortName}`,
  metaDescription:
    "Estimate India gratuity from includable monthly wages and years of service: wages ÷ 26 × 15 × years, with a statutory ceiling and excluded-allowance add-back.",
  pageHeaderTitle: "Gratuity calculator",
  pageHeaderDescription:
    "Estimate India gratuity from salary components and years of service. Formula: wages ÷ 26 × 15 × years.",
  sectionRefCalc: "Calculator",
  disclaimer:
    "Illustrative only (Payment of Gratuity Act / MSV sample). Eligibility, contracts and law changes may alter the payable amount — confirm with your adviser.",
  linkServices: "All services",
  linkContact: "Contact",
  linkHrPayroll: "HR & payroll",
  sectionComponents: "Salary components",
  sectionComponentsHint: "Mark only includable items. HRA is usually excluded.",
  colItem: "Component",
  colAmount: "Monthly (₹)",
  colInclude: "Include",
  includeYes: "Yes",
  includeNo: "No",
  addRow: "Add row",
  removeRow: "Remove",
  labelBasic: "Basic",
  labelHra: "HRA",
  labelOther: "Other",
  sectionService: "Years of service",
  fieldYears: "Years of service",
  yearsHint: "One year = 1. Periods over six months are often rounded up.",
  sectionRules: "Assumptions",
  fieldStatutoryDays: "Divisor days",
  fieldDaysPerYear: "Days per year",
  fieldCeiling: "Ceiling (₹)",
  fieldExcludedCap: "Excluded add-back (%)",
  excludedCapHint: "If excluded allowances exceed this share of monthly total, the excess is added back.",
  asideSummaryHeading: "Result",
  labelMonthlyTotal: "Monthly total",
  labelEligible: "Includable",
  labelExcluded: "Excluded",
  labelAdditional: "Add-back",
  labelBase: "Gratuity wages",
  labelCalculated: "Calculated",
  labelPayable: "Payable",
  formulaNote: "Wages ÷ divisor × days per year × years",
  ceilingApplied: "Ceiling applied",
  emptyHint: "Enter salary and years of service.",
};

const zh: GratuityCalculatorCopy = {
  metaTitle: `退休金（Gratuity）计算器 | ${company.shortName}`,
  metaDescription:
    "按印度 Payment of Gratuity Act 思路，用可计入月薪与服务年限估算退休金：月薪÷26×15×年数，并考虑法定上限与未计入津贴加回。",
  pageHeaderTitle: "退休金（Gratuity）计算器",
  pageHeaderDescription: "按工资项目与服务年限估算印度法人退休金。公式：算定月薪 ÷ 26 × 15 × 服务年限。",
  sectionRefCalc: "计算器",
  disclaimer:
    "仅供参考（Payment of Gratuity Act / MSV 样表）。资格、合同与修法可能改变实付金额，请以专业意见为准。",
  linkServices: "服务列表",
  linkContact: "联系我们",
  linkHrPayroll: "HR·薪酬服务",
  sectionComponents: "工资项目",
  sectionComponentsHint: "仅勾选可计入项目。HRA 通常不计入。",
  colItem: "项目",
  colAmount: "月金额 (₹)",
  colInclude: "计入",
  includeYes: "计入",
  includeNo: "不计入",
  addRow: "添加项目",
  removeRow: "删除",
  labelBasic: "Basic",
  labelHra: "HRA",
  labelOther: "Other",
  sectionService: "服务年限",
  fieldYears: "适用服务年限",
  yearsHint: "一年填 1。超过六个月实务中常进位为一年。",
  sectionRules: "算定假设",
  fieldStatutoryDays: "换算日数",
  fieldDaysPerYear: "每年日数",
  fieldCeiling: "法定上限 (₹)",
  fieldExcludedCap: "未计入加回比例 (%)",
  excludedCapHint: "未计入津贴超过月薪合计该比例时，超额部分加回算定月薪。",
  asideSummaryHeading: "结果",
  labelMonthlyTotal: "月薪合计",
  labelEligible: "可计入",
  labelExcluded: "未计入",
  labelAdditional: "加回",
  labelBase: "算定月薪",
  labelCalculated: "计算额",
  labelPayable: "参考支付额",
  formulaNote: "算定月薪 ÷ 换算日数 × 每年日数 × 服务年限",
  ceilingApplied: "已适用上限",
  emptyHint: "请输入工资与服务年限。",
};

export function gratuityCalculatorCopy(locale: SiteLocale): GratuityCalculatorCopy {
  return pickLocale(locale, { ko, en, zh });
}

export function defaultComponentLabel(
  locale: SiteLocale,
  id: string,
): string {
  const t = gratuityCalculatorCopy(locale);
  if (id === "basic") return t.labelBasic;
  if (id === "hra") return t.labelHra;
  if (id === "other") return t.labelOther;
  return id;
}
