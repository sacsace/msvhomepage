import type { SiteLocale } from "@/lib/site-locale";
import { pickLocale } from "@/lib/site-locale";
import { company } from "@/lib/site-content";

/** 슬라브 표시 순서는 `computeSlabBreakdown` 반환 순서와 동일(7행) */
export type PersonalIncomeTaxCalculatorCopy = {
  metaTitle: string;
  metaDescription: string;
  pageTitle: string;
  pageDescription: string;
  pageAsideTitle: string;
  assessmentPeriodLabel: string;
  assessmentPeriodValue: string;
  sectionRefCalc: string;
  disclaimer: string;
  backToServices: string;
  contactCta: string;
  labelMonthlySalary: string;
  placeholderMonthly: string;
  hintMonthlySalary: string;
  labelStdDeduction: string;
  hintStdDeduction: string;
  labelResident: string;
  hintResident: string;
  asideMonthlyTdsTitle: string;
  asideMonthlyTdsExplain: string;
  asideMonthlyTdsEmpty: string;
  asideNetTitle: string;
  asideNetExplain: string;
  asideNetEmpty: string;
  emptyDash: string;
  emptyTableLead: string;
  thSno: string;
  thDescription: string;
  thAmount: string;
  rowGrossTitle: string;
  rowStdTitle: string;
  rowNetTaxableTitle: string;
  rowIncomeTaxTitle: string;
  totalTaxLabel: string;
  rebate87ATitle: string;
  rebate87AHint: string;
  taxAfterRebateTitle: string;
  surchargeTitle: string;
  surchargeHint: string;
  cessTitle: string;
  cessHint: string;
  rowNetYearlyTitle: string;
  rowMonthlyTdsTitle: string;
  rowNetMonthlyTitle: string;
  effectiveTdsTitle: string;
  slabRowLabels: readonly string[];
};

const slabKo = [
  "₹4,00,000 이하 @ 0%",
  "₹4,00,001~8,00,000 @ 5% (구간 최대 ₹20,000)",
  "₹8,00,001~12,00,000 @ 10% (구간 최대 ₹40,000)",
  "₹12,00,001~16,00,000 @ 15%",
  "₹16,00,001~20,00,000 @ 20%",
  "₹20,00,001~24,00,000 @ 25%",
  "₹24,00,000 초과 @ 30%",
] as const;

const slabEn = [
  "Up to ₹4,00,000 @ 0%",
  "₹4,00,001–8,00,000 @ 5% (max ₹20,000 for band)",
  "₹8,00,001–12,00,000 @ 10% (max ₹40,000 for band)",
  "₹12,00,001–16,00,000 @ 15%",
  "₹16,00,001–20,00,000 @ 20%",
  "₹20,00,001–24,00,000 @ 25%",
  "Above ₹24,00,000 @ 30%",
] as const;

const slabZh = [
  "不超过 ₹4,00,000 @ 0%",
  "₹4,00,001–8,00,000 @ 5%（本档最高 ₹20,000）",
  "₹8,00,001–12,00,000 @ 10%（本档最高 ₹40,000）",
  "₹12,00,001–16,00,000 @ 15%",
  "₹16,00,001–20,00,000 @ 20%",
  "₹20,00,001–24,00,000 @ 25%",
  "超过 ₹24,00,000 @ 30%",
] as const;

const ko: PersonalIncomeTaxCalculatorCopy = {
  metaTitle: "인도 급여 TDS 계산기",
  metaDescription: `${company.shortName} · 신세제 기준 급여 예상 TDS·Section 87A 반영(FY 2025-26 / AY 2026-27)`,
  pageTitle: "인도 급여 TDS 계산기",
  pageDescription:
    "세전 월급을 입력하면 연간 급여를 기준으로 예상 소득세와 월평균 원천징수세액(TDS)을 계산합니다. 신세제(New Tax Regime)를 기준으로 하며, 실제 원천징수액은 보너스, 기타 소득, 공제 및 기원천징수액 등에 따라 달라질 수 있습니다.",
  pageAsideTitle: "Salary TDS Calculator",
  assessmentPeriodLabel: "적용 기준",
  assessmentPeriodValue: "FY 2025-26 · AY 2026-27",
  sectionRefCalc: "예상 급여 TDS 계산",
  disclaimer:
    "본 계산 결과는 참고용입니다. 실제 원천징수액은 급여 구성, 거주자 여부, 공제·감면 및 적용 시점의 규정에 따라 달라질 수 있습니다. 정확한 계산은 MSV에 문의해 주세요.",
  backToServices: "회계 서비스로 돌아가기",
  contactCta: "문의하기",
  labelMonthlySalary: "세전 월 급여 (INR)",
  placeholderMonthly: "예: 137500",
  hintMonthlySalary: "공제 전 월 급여를 입력하세요. 동일한 급여로 12개월 근무한다고 가정하여 계산합니다.",
  labelStdDeduction: "연간 표준공제 ₹75,000 적용",
  hintStdDeduction: "체크를 해제하면 표준공제를 적용하지 않습니다. 구세제(Old Tax Regime)로 전환되는 것은 아닙니다.",
  labelResident: "거주자(Resident) — Section 87A 세액감면 적용",
  hintResident:
    "AY 2026-27 신세제에서 요건을 충족한 거주자 개인은 과세소득 ₹12 lakh 이하일 때 최대 ₹60,000 감면이 적용됩니다. 비거주자는 감면이 적용되지 않습니다.",
  asideMonthlyTdsTitle: "월평균 예상 TDS",
  asideMonthlyTdsExplain:
    "연간 예상 세액을 12개월로 나눈 금액입니다. 실제 월별 원천징수액은 급여 변동과 기원천징수액 등에 따라 달라질 수 있습니다.",
  asideMonthlyTdsEmpty: "세전 월 급여를 입력해 주세요",
  asideNetTitle: "TDS 차감 후 월 급여",
  asideNetExplain:
    "세전 월 급여에서 예상 TDS만 차감한 금액입니다. PF·ESI·PT 등 다른 급여 공제는 반영하지 않습니다.",
  asideNetEmpty: "세전 월 급여를 입력해 주세요",
  emptyDash: "—",
  emptyTableLead: "세전 월 급여를 입력하면 아래에 계산 내역이 표시됩니다.",
  thSno: "구분",
  thDescription: "계산 항목",
  thAmount: "금액 (INR)",
  rowGrossTitle: "연간 총급여",
  rowStdTitle: "표준공제",
  rowNetTaxableTitle: "과세소득",
  rowIncomeTaxTitle: "산출 소득세",
  totalTaxLabel: "소득세 합계",
  rebate87ATitle: "Section 87A 세액감면",
  rebate87AHint: "거주자·과세소득 ₹12 lakh 이하(또는 한계감면) 적용분",
  taxAfterRebateTitle: "감면 후 소득세",
  surchargeTitle: "추가세 (Surcharge)",
  surchargeHint: "과세소득이 ₹50 lakh / ₹1 crore / ₹2 crore 초과 시 각각 10%·15%·25%",
  cessTitle: "보건·교육세 4%",
  cessHint: "감면 후 소득세와 추가세 합계의 4%",
  rowNetYearlyTitle: "연간 예상 세액",
  rowMonthlyTdsTitle: "월평균 예상 TDS",
  rowNetMonthlyTitle: "TDS 차감 후 월 급여",
  effectiveTdsTitle: "실효 TDS율",
  slabRowLabels: slabKo,
};

const en: PersonalIncomeTaxCalculatorCopy = {
  metaTitle: "India salary TDS calculator",
  metaDescription: `${company.shortName} · Estimated salary TDS under the New Tax Regime with Section 87A (FY 2025-26 / AY 2026-27)`,
  pageTitle: "India salary TDS calculator",
  pageDescription:
    "Enter pre-tax monthly salary to estimate annual income tax and average monthly TDS. This uses the New Tax Regime. Actual withholding can differ with bonuses, other income, deductions and tax already deducted.",
  pageAsideTitle: "Salary TDS Calculator",
  assessmentPeriodLabel: "Period covered",
  assessmentPeriodValue: "FY 2025-26 · AY 2026-27",
  sectionRefCalc: "Estimated salary TDS",
  disclaimer:
    "Results are for reference only. Actual TDS depends on pay structure, residential status, deductions/rebates and the rules in force. For an accurate figure, contact MSV.",
  backToServices: "Back to services",
  contactCta: "Contact us",
  labelMonthlySalary: "Pre-tax monthly salary (INR)",
  placeholderMonthly: "e.g. 137500",
  hintMonthlySalary: "Enter monthly salary before deductions. We assume the same pay for 12 months.",
  labelStdDeduction: "Apply annual standard deduction ₹75,000",
  hintStdDeduction:
    "Uncheck to exclude the standard deduction. This does not switch you to the Old Tax Regime.",
  labelResident: "Resident individual — apply Section 87A rebate",
  hintResident:
    "Under the New Tax Regime for AY 2026-27, eligible resident individuals with taxable income up to ₹12 lakh get a rebate of up to ₹60,000. Non-residents do not get this rebate.",
  asideMonthlyTdsTitle: "Average monthly TDS",
  asideMonthlyTdsExplain:
    "Annual estimated tax ÷ 12. Actual monthly TDS can differ with pay changes and tax already deducted.",
  asideMonthlyTdsEmpty: "Enter pre-tax monthly salary",
  asideNetTitle: "Monthly pay after TDS",
  asideNetExplain:
    "Pre-tax monthly salary minus estimated TDS only. PF, ESI, PT and other payroll deductions are not included.",
  asideNetEmpty: "Enter pre-tax monthly salary",
  emptyDash: "—",
  emptyTableLead: "Enter pre-tax monthly salary to see the computation below.",
  thSno: "Ref.",
  thDescription: "Item",
  thAmount: "Amount (INR)",
  rowGrossTitle: "Annual gross salary",
  rowStdTitle: "Standard deduction",
  rowNetTaxableTitle: "Taxable income",
  rowIncomeTaxTitle: "Income tax computed",
  totalTaxLabel: "Income tax total",
  rebate87ATitle: "Section 87A rebate",
  rebate87AHint: "Resident · taxable income ≤ ₹12 lakh (or marginal relief)",
  taxAfterRebateTitle: "Tax after rebate",
  surchargeTitle: "Surcharge",
  surchargeHint: "10% / 15% / 25% when taxable income exceeds ₹50 lakh / ₹1 crore / ₹2 crore",
  cessTitle: "Health & education cess @ 4%",
  cessHint: "4% of tax after rebate plus surcharge",
  rowNetYearlyTitle: "Estimated annual tax",
  rowMonthlyTdsTitle: "Average monthly TDS",
  rowNetMonthlyTitle: "Monthly pay after TDS",
  effectiveTdsTitle: "Effective TDS rate",
  slabRowLabels: slabEn,
};

const zh: PersonalIncomeTaxCalculatorCopy = {
  metaTitle: "印度工资 TDS 计算器",
  metaDescription: `${company.shortName} · 新税制下工资预计 TDS，含第87A条减免（FY 2025-26 / AY 2026-27）`,
  pageTitle: "印度工资 TDS 计算器",
  pageDescription:
    "输入税前月薪后，按年薪估算预计所得税与月均预扣税（TDS）。以新税制（New Tax Regime）为准；实际预扣可能因奖金、其他所得、扣除及已预扣税额等而不同。",
  pageAsideTitle: "Salary TDS Calculator",
  assessmentPeriodLabel: "适用期间",
  assessmentPeriodValue: "FY 2025-26 · AY 2026-27",
  sectionRefCalc: "预计工资 TDS",
  disclaimer:
    "计算结果仅供参考。实际预扣取决于薪酬结构、居民身份、扣除/减免及当时有效规定。准确计算请咨询 MSV。",
  backToServices: "返回服务页",
  contactCta: "联系我们",
  labelMonthlySalary: "税前月工资 (INR)",
  placeholderMonthly: "例：137500",
  hintMonthlySalary: "请输入扣款前的月工资。按相同工资工作 12 个月进行估算。",
  labelStdDeduction: "适用年度标准扣除 ₹75,000",
  hintStdDeduction: "取消勾选则不扣标准扣除，并不会切换到旧税制（Old Tax Regime）。",
  labelResident: "居民个人 — 适用第87A条税额减免",
  hintResident:
    "AY 2026-27 新税制下，符合条件的居民个人在应税所得不超过 ₹12 lakh 时可获最高 ₹60,000 减免；非居民不适用。",
  asideMonthlyTdsTitle: "月均预计 TDS",
  asideMonthlyTdsExplain: "全年预计税额 ÷ 12。实际月度预扣可能因工资变动及已预扣税额等而不同。",
  asideMonthlyTdsEmpty: "请输入税前月工资",
  asideNetTitle: "扣 TDS 后月工资",
  asideNetExplain: "仅从税前月工资中减去预计 TDS。不含 PF、ESI、PT 等其他工资扣款。",
  asideNetEmpty: "请输入税前月工资",
  emptyDash: "—",
  emptyTableLead: "输入税前月工资后，下方将显示计算明细。",
  thSno: "序号",
  thDescription: "计算项目",
  thAmount: "金额 (INR)",
  rowGrossTitle: "年度总工资",
  rowStdTitle: "标准扣除",
  rowNetTaxableTitle: "应税所得",
  rowIncomeTaxTitle: "计算所得税",
  totalTaxLabel: "所得税合计",
  rebate87ATitle: "第87A条税额减免",
  rebate87AHint: "居民 · 应税所得 ≤ ₹12 lakh（或边际减免）",
  taxAfterRebateTitle: "减免后所得税",
  surchargeTitle: "附加税（Surcharge）",
  surchargeHint: "应税所得超过 ₹50 lakh / ₹1 crore / ₹2 crore 时分别 10% / 15% / 25%",
  cessTitle: "卫生与教育税 4%",
  cessHint: "减免后所得税与附加税合计的 4%",
  rowNetYearlyTitle: "全年预计税额",
  rowMonthlyTdsTitle: "月均预计 TDS",
  rowNetMonthlyTitle: "扣 TDS 后月工资",
  effectiveTdsTitle: "有效 TDS 税率",
  slabRowLabels: slabZh,
};

export function personalIncomeTaxCalculatorCopy(locale: SiteLocale): PersonalIncomeTaxCalculatorCopy {
  return pickLocale(locale, { ko, en, zh });
}
