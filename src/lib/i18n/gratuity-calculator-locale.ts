import type { SiteLocale } from "@/lib/site-locale";
import { pickLocale } from "@/lib/site-locale";
import { company } from "@/lib/site-content";

export type GratuityCalculatorCopy = {
  metaTitle: string;
  metaDescription: string;
  pageHeaderTitle: string;
  pageHeaderDescription: string;
  pageAsideTitle: string;
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
    "급여 구성과 근속기간을 기준으로 인도 직원의 퇴직금(Gratuity)을 계산합니다. 기준 월급여÷26×15×근속연수.",
  pageHeaderTitle: "퇴직금(Gratuity) 계산기",
  pageHeaderDescription:
    "급여 구성과 근속기간을 기준으로 인도 직원의 퇴직금(Gratuity)을 계산합니다. 기준 월급여 ÷ 26 × 15 × 근속연수.",
  pageAsideTitle: "Gratuity Calculator",
  sectionRefCalc: "계산기",
  disclaimer:
    "본 계산기는 Code on Social Security, 2020에 따른 월급제 직원의 퇴직금 계산을 돕기 위한 참고용입니다. 계산 결과가 지급 자격을 의미하지는 않으며, 실제 지급 여부와 금액은 고용 형태, 근속기간, 수당의 성격 및 계약 조건에 따라 달라질 수 있습니다. 확인이 필요한 경우 MSV로 문의해 주세요.",
  linkServices: "서비스 목록",
  linkContact: "문의하기",
  linkHrPayroll: "인사·급여 관리 서비스",
  sectionComponents: "급여 항목",
  sectionComponentsHint:
    "각 급여 항목의 산정 포함 여부를 선택하세요.\n포함 여부는 수당의 지급 성격과 법정 기준에 따라 판단합니다.",
  colItem: "항목",
  colAmount: "월 지급액 (₹)",
  colInclude: "포함",
  includeYes: "포함",
  includeNo: "제외",
  addRow: "항목 추가",
  removeRow: "삭제",
  labelBasic: "Basic",
  labelHra: "HRA",
  labelOther: "Other",
  sectionService: "근속연수",
  fieldYears: "적용 근속연수",
  yearsHint:
    "일반 직원은 완성된 근속연수에 잔여기간이 6개월을 초과하면 1년을 더합니다.\n기간제 직원(FTE) 등 비례 계산 대상은 실제 근속기간에 해당하는 연수를 입력하세요.",
  sectionRules: "산정 기준",
  fieldStatutoryDays: "환산일수",
  fieldDaysPerYear: "근속 1년당 지급일수",
  fieldCeiling: "법정 상한 (₹)",
  fieldExcludedCap: "제외 한도 비율 (%)",
  excludedCapHint:
    "법정 제외 항목의 합계가 전체 월 보수의 50%를 초과하면, 초과액을 산정 임금에 다시 더합니다.",
  asideSummaryHeading: "결과",
  labelMonthlyTotal: "월 보수 합계",
  labelEligible: "산정 대상 급여",
  labelExcluded: "산정 제외 수당",
  labelAdditional: "추가 반영액",
  labelBase: "퇴직금 산정 기준 월급여",
  labelCalculated: "계산액",
  labelPayable: "예상 퇴직금",
  formulaNote: "퇴직금 산정 기준 월급여 ÷ 환산일수 × 근속 1년당 지급일수 × 근속연수",
  ceilingApplied: "법정 상한 적용",
  emptyHint: "급여와 근속연수를 입력하세요.",
};

const en: GratuityCalculatorCopy = {
  metaTitle: `Gratuity calculator | ${company.shortName}`,
  metaDescription:
    "Estimate India employee gratuity from pay components and length of service: wages ÷ 26 × 15 × years.",
  pageHeaderTitle: "Gratuity calculator",
  pageHeaderDescription:
    "Estimate an India employee’s gratuity from pay structure and length of service. Formula: wages ÷ 26 × 15 × years.",
  pageAsideTitle: "Gratuity Calculator",
  sectionRefCalc: "Calculator",
  disclaimer:
    "This calculator is a reference aid for monthly-paid employees under the Code on Social Security, 2020. Results do not confirm eligibility. Actual entitlement and amount depend on employment type, service period, the nature of allowances and contract terms. Contact MSV if you need confirmation.",
  linkServices: "All services",
  linkContact: "Contact",
  linkHrPayroll: "HR & payroll services",
  sectionComponents: "Pay components",
  sectionComponentsHint:
    "Choose whether each component is included.\nInclusion follows the nature of the allowance and statutory rules.",
  colItem: "Component",
  colAmount: "Monthly pay (₹)",
  colInclude: "Include",
  includeYes: "Include",
  includeNo: "Exclude",
  addRow: "Add row",
  removeRow: "Remove",
  labelBasic: "Basic",
  labelHra: "HRA",
  labelOther: "Other",
  sectionService: "Years of service",
  fieldYears: "Years of service applied",
  yearsHint:
    "For regular employees, add one year when the remaining period after completed years exceeds six months.\nFor fixed-term employees (FTE) and other pro-rata cases, enter the years corresponding to actual service.",
  sectionRules: "Assumptions",
  fieldStatutoryDays: "Divisor days",
  fieldDaysPerYear: "Days per year of service",
  fieldCeiling: "Statutory ceiling (₹)",
  fieldExcludedCap: "Exclusion cap (%)",
  excludedCapHint:
    "If the total of statutory exclusions exceeds 50% of monthly emoluments, the excess is added back to wages for calculation.",
  asideSummaryHeading: "Result",
  labelMonthlyTotal: "Monthly total",
  labelEligible: "Wages included",
  labelExcluded: "Wages excluded",
  labelAdditional: "Add-back amount",
  labelBase: "Monthly wages for gratuity",
  labelCalculated: "Calculated amount",
  labelPayable: "Estimated gratuity",
  formulaNote: "Monthly wages for gratuity ÷ divisor × days per year × years of service",
  ceilingApplied: "Statutory ceiling applied",
  emptyHint: "Enter pay and years of service.",
};

const zh: GratuityCalculatorCopy = {
  metaTitle: `退休金（Gratuity）计算器 | ${company.shortName}`,
  metaDescription: "按薪酬构成与服务年限估算印度员工退休金：算定月薪÷26×15×年数。",
  pageHeaderTitle: "退休金（Gratuity）计算器",
  pageHeaderDescription:
    "按薪酬构成与服务年限计算印度员工的退休金（Gratuity）。公式：算定月薪 ÷ 26 × 15 × 服务年限。",
  pageAsideTitle: "Gratuity Calculator",
  sectionRefCalc: "计算器",
  disclaimer:
    "本计算器为协助按 Code on Social Security, 2020 估算月薪制员工退休金的参考工具。计算结果不代表具备领取资格；实际是否发放及金额取决于雇佣形式、服务年限、津贴性质与合同条件。如需确认，请联系 MSV。",
  linkServices: "服务列表",
  linkContact: "联系我们",
  linkHrPayroll: "人事·薪酬管理服务",
  sectionComponents: "薪酬项目",
  sectionComponentsHint: "请选择各薪酬项目是否计入。\n是否计入应根据津贴性质与法定标准判断。",
  colItem: "项目",
  colAmount: "月支付额 (₹)",
  colInclude: "计入",
  includeYes: "计入",
  includeNo: "排除",
  addRow: "添加项目",
  removeRow: "删除",
  labelBasic: "Basic",
  labelHra: "HRA",
  labelOther: "Other",
  sectionService: "服务年限",
  fieldYears: "适用服务年限",
  yearsHint:
    "一般员工在已完成的服务年限之外，剩余期间超过六个月时再加一年。\n固定期限员工（FTE）等按比例计算的对象，请输入与实际服务期间对应的年数。",
  sectionRules: "算定基准",
  fieldStatutoryDays: "换算日数",
  fieldDaysPerYear: "每服务年支付日数",
  fieldCeiling: "法定上限 (₹)",
  fieldExcludedCap: "排除上限比例 (%)",
  excludedCapHint: "法定排除项目合计超过月薪酬总额的 50% 时，超额部分重新计入算定工资。",
  asideSummaryHeading: "结果",
  labelMonthlyTotal: "月薪酬合计",
  labelEligible: "算定对象工资",
  labelExcluded: "算定排除津贴",
  labelAdditional: "追加反映额",
  labelBase: "退休金算定基准月薪",
  labelCalculated: "计算额",
  labelPayable: "预计退休金",
  formulaNote: "退休金算定基准月薪 ÷ 换算日数 × 每服务年支付日数 × 服务年限",
  ceilingApplied: "已适用法定上限",
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
