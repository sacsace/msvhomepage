import type { SiteLocale } from "@/lib/site-locale";
import { pickLocale } from "@/lib/site-locale";
import { company } from "@/lib/site-content";

/** 슬라브 표시 순서는 `computeSlabBreakdown` 반환 순서와 동일(7행) */
export type PersonalIncomeTaxCalculatorCopy = {
  metaTitle: string;
  metaDescription: string;
  pageTitle: string;
  pageDescription: string;
  sectionRefCalc: string;
  disclaimer: string;
  backToServices: string;
  contactCta: string;
  labelMonthlySalary: string;
  placeholderMonthly: string;
  hintMonthlySalary: string;
  labelStdDeduction: string;
  hintStdDeduction: string;
  asideMonthlyTdsTitle: string;
  asideMonthlyTdsExplain: string;
  /** `\n` 기준으로 줄바꿈(모바일은 한 줄, sm 이상에서만 `<br className="hidden sm:inline" />`) */
  asideMonthlyTdsEmpty: string;
  asideNetTitle: string;
  asideNetExplainBefore: string;
  asideNetExplainBetween: string;
  asideNetExplainAfter: string;
  asideNetEmpty: string;
  emptyTableLead: string;
  thSno: string;
  thDescription: string;
  thAmount: string;
  rowGrossTitle: string;
  rowGrossHint: string;
  rowStdTitle: string;
  rowStdHint: string;
  rowNetTaxableTitle: string;
  rowNetTaxableHint: string;
  rowIncomeTaxTitle: string;
  rowIncomeTaxHint: string;
  totalTaxLabel: string;
  surchargeTitle: string;
  surchargeHint: string;
  cessTitle: string;
  cessHint: string;
  rowNetYearlyTitle: string;
  rowNetYearlyHint: string;
  rowMonthlyTdsTitle: string;
  rowMonthlyTdsHint: string;
  rowNetMonthlyTitle: string;
  rowNetMonthlyHint: string;
  effectiveTdsTitle: string;
  effectiveTdsHint: string;
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
  metaDescription: `${company.shortName} — 인도 급여 TDS 참고 계산(누진·서차지·교육 cess)`,
  pageTitle: "인도 급여 TDS 계산기",
  pageDescription:
    "월 기준 세전 급여를 연환산해, 체크 시 New Tax Regime 표준공제 ₹75,000을 (ii)에 반영한 급여 TDS 워킹 형태로 예상 원천징수(TDS)를 계산합니다. Section 115BAC 전체 산식·슬랩과 동일하지 않을 수 있으며, 실제 세액은 공제·HRA·보너스·Section 87A·기타 소득 여부에 따라 달라질 수 있습니다.",
  sectionRefCalc: "참고 계산",
  disclaimer:
    "본 도구는 참고용이며 법적·세무 자문을 대체하지 않습니다. 본 계산기는 참고용 추정치이며 실제 Payroll TDS는 회사 정책·보너스·투자공제·이전 고용 소득 및 세법 변경에 따라 달라질 수 있습니다. 신규 과세체계(Section 115BAC)와 차이가 있을 수 있으니, 정확한 금액은 MSV와 상담 바랍니다.",
  backToServices: "회계 서비스로 돌아가기",
  contactCta: "문의하기",
  labelMonthlySalary: "세전 월급 (INR)",
  placeholderMonthly: "예: 137500",
  hintMonthlySalary: "한 달 기준 세전 급여를 숫자로 넣습니다. 표의 (i) 행은 이 금액에 12개월을 곱한 연간 총급여입니다.",
  labelStdDeduction: "New Tax Regime 표준공제 ₹75,000 적용 (항목 (ii))",
  hintStdDeduction:
    "체크 시 New Tax Regime에 해당하는 표준공제 ₹75,000을 (ii)행에 반영합니다. 해제 시 (ii)는 0으로 계산됩니다.",
  asideMonthlyTdsTitle: "월 납부 TDS",
  asideMonthlyTdsExplain:
    "표 하단 (vi) Monthly TDS와 같은 값입니다. 연간 세액(v)을 12로 나눈 월 원천징수(TDS) 추정액입니다.",
  asideMonthlyTdsEmpty: "세전 월급을 숫자로 입력하면\n월 납부 금액이 표시됩니다.",
  asideNetTitle: "실수령 (월 추정)",
  asideNetExplainBefore: "세전 월급(₹ ",
  asideNetExplainBetween: ") − 월 TDS(₹ ",
  asideNetExplainAfter:
    "). 본 계산기는 TDS 기준 참고용이며 PF·ESI·PT·HRA Exemption·Bonus·기타 공제 항목은 포함하지 않았습니다.",
  asideNetEmpty: "TDS 계산 후\n실수령 추정액이 표시됩니다.",
  emptyTableLead:
    "세전 월급을 숫자로 입력하면 아래에 급여자 TDS 계산 표가 채워집니다. (스프레드시트 형식의 참고용 계산입니다.)",
  thSno: "S.No.",
  thDescription: "Employee Name TDS working",
  thAmount: "Amount (INR)",
  rowGrossTitle: "Gross Income/Salary (12 months)",
  rowGrossHint: "입력한 월급 × 12개월. 연간 총급여(세전)입니다.",
  rowStdTitle: "Standard Deduction",
  rowStdHint: "New Tax Regime 표준공제 연 ₹75,000. 체크 해제 시 0입니다.",
  rowNetTaxableTitle: "Net Taxable Income ( (i) − (ii) )",
  rowNetTaxableHint: "순과세소득",
  rowIncomeTaxTitle: "Income tax",
  rowIncomeTaxHint: "아래 각 줄은 소득 구간별로 계산된 누진 소득세입니다.",
  totalTaxLabel: "Total Tax",
  surchargeTitle: "Surcharge @ 10~25% (과세소득세)",
  surchargeHint:
    "과세소득이 50 lakh / 1 cr / 2 cr 초과에 따라 Total Tax의 10%·15%·25%가 붙습니다.",
  cessTitle: "Add: Education cess @ 4% (교육세+추가세)",
  cessHint: "교육세·추가세(cess)는 누진 소득세와 서차지 합계에 4%를 적용한 금액입니다.",
  rowNetYearlyTitle: "Net Tax (Yearly)",
  rowNetYearlyHint: "연간으로 납부할 세액",
  rowMonthlyTdsTitle: "Monthly TDS",
  rowMonthlyTdsHint: "(v)를 12로 나눈 월 원천징수 추정액입니다.",
  rowNetMonthlyTitle: "실수령 금액 (월 추정)",
  rowNetMonthlyHint:
    "세전 월급 − (vi) Monthly TDS. 본 계산기는 TDS 기준 참고용이며 PF·ESI·PT·HRA Exemption·Bonus·기타 공제 항목은 포함하지 않았습니다.",
  effectiveTdsTitle: "Effective TDS Rate",
  effectiveTdsHint: "연간 총급여(i) 대비 실효 원천징수율(%)입니다.",
  slabRowLabels: slabKo,
};

const en: PersonalIncomeTaxCalculatorCopy = {
  metaTitle: "India salary TDS calculator",
  metaDescription: `${company.shortName} — India payroll TDS reference (slabs, surcharge, education cess).`,
  pageTitle: "India salary TDS calculator",
  pageDescription:
    "We annualise pre-tax monthly pay and estimate withholding (TDS) in a salary TDS working layout. When selected, row (ii) includes the ₹75,000 standard deduction labelled for the New Tax Regime context. The full Section 115BAC regime computation may still differ; actual tax depends on deductions, HRA, bonuses, section 87A, other income and law changes.",
  sectionRefCalc: "Reference calculation",
  disclaimer:
    "This tool is for illustration only and is not legal or tax advice. Outputs are indicative estimates—actual payroll TDS can differ with employer policies, bonuses, investment-related deductions, income from prior employment, tax law changes and more. Results may also differ from the new tax regime (Section 115BAC); confirm figures with MSV.",
  backToServices: "Back to services",
  contactCta: "Contact us",
  labelMonthlySalary: "Pre-tax monthly salary (INR)",
  placeholderMonthly: "e.g. 137500",
  hintMonthlySalary:
    "Enter one month’s pre-tax pay. Row (i) is that amount × 12 (annual gross salary).",
  labelStdDeduction: "Apply New Tax Regime standard deduction ₹75,000 (row (ii))",
  hintStdDeduction:
    "When checked, applies the ₹75,000 standard deduction associated with the New Tax Regime treatment to row (ii). Uncheck to set row (ii) to zero.",
  asideMonthlyTdsTitle: "Monthly TDS",
  asideMonthlyTdsExplain:
    "Same as row (vi) Monthly TDS below — estimated monthly withholding from annual tax (v) ÷ 12.",
  asideMonthlyTdsEmpty: "Enter a numeric pre-tax salary to\nsee the monthly withholding amount.",
  asideNetTitle: "Estimated net pay (monthly)",
  asideNetExplainBefore: "Gross monthly (₹ ",
  asideNetExplainBetween: ") − monthly TDS (₹ ",
  asideNetExplainAfter:
    "). TDS-only reference: PF, ESI, PT, HRA exemption, bonus and other payroll deductions are not included.",
  asideNetEmpty: "Estimated net pay appears\nafter the TDS calculation.",
  emptyTableLead:
    "Enter a numeric pre-tax salary to populate the salary TDS working table below (spreadsheet-style reference only).",
  thSno: "S.No.",
  thDescription: "Employee / TDS working",
  thAmount: "Amount (INR)",
  rowGrossTitle: "Gross income / salary (12 months)",
  rowGrossHint: "Monthly input × 12 — annual gross (pre-tax).",
  rowStdTitle: "Standard deduction",
  rowStdHint: "New Tax Regime standard deduction ₹75,000 per year. Zero if unchecked.",
  rowNetTaxableTitle: "Net taxable income ((i) − (ii))",
  rowNetTaxableHint: "Taxable income after standard deduction.",
  rowIncomeTaxTitle: "Income tax",
  rowIncomeTaxHint: "Progressive tax by slab; detail in each line below.",
  totalTaxLabel: "Total tax",
  surchargeTitle: "Surcharge @ 10–25% (on income tax)",
  surchargeHint:
    "10%, 15% or 25% of total tax when taxable income exceeds ₹50 lakh / ₹1 crore / ₹2 crore respectively.",
  cessTitle: "Add: Education cess @ 4%",
  cessHint: "4% of income tax plus surcharge (education + secondary higher education cess).",
  rowNetYearlyTitle: "Net tax (yearly)",
  rowNetYearlyHint: "Annual tax payable (before monthly split).",
  rowMonthlyTdsTitle: "Monthly TDS",
  rowMonthlyTdsHint: "Row (v) divided by 12 — estimated monthly withholding.",
  rowNetMonthlyTitle: "Net take-home (monthly, est.)",
  rowNetMonthlyHint:
    "Pre-tax monthly salary − row (vi). TDS-only reference: PF, ESI, PT, HRA exemption, bonus and other deductions are not included.",
  effectiveTdsTitle: "Effective TDS rate",
  effectiveTdsHint: "Effective withholding as % of annual gross (i).",
  slabRowLabels: slabEn,
};

const zh: PersonalIncomeTaxCalculatorCopy = {
  metaTitle: "印度工资 TDS 计算器",
  metaDescription: `${company.shortName} — 印度工资 TDS 参考计算（累进税率、附加费、教育附加费）。`,
  pageTitle: "印度工资 TDS 计算器",
  pageDescription:
    "将税前月薪年化后，勾选时在第 (ii) 行纳入 New Tax Regime 标准扣除 ₹75,000，并以工资 TDS 工作表形式估算预扣税（TDS）。与 Section 115BAC 全套公式及税率档未必一致；实际税负仍取决于各项扣除、HRA、奖金、87A、其他所得及法规修订等。",
  sectionRefCalc: "参考计算",
  disclaimer:
    "本工具仅供示意，不构成法律或税务意见。本计算器为参考性估算，实际 Payroll TDS 可能因公司政策、奖金、投资相关扣除、以往雇佣所得及税法修订等而不同；亦可能与 Section 115BAC（新税制）口径存在差异，具体金额请与 MSV 确认。",
  backToServices: "返回服务页",
  contactCta: "联系我们",
  labelMonthlySalary: "税前月薪 (INR)",
  placeholderMonthly: "例：137500",
  hintMonthlySalary: "请输入单月的税前工资数字。表中第 (i) 行为该金额 × 12 的年度总工资。",
  labelStdDeduction: "适用 New Tax Regime 标准扣除 ₹75,000（第 (ii) 项）",
  hintStdDeduction:
    "勾选时，将 New Tax Regime 对应的标准扣除 ₹75,000 计入第 (ii) 行；取消勾选则第 (ii) 项按 0 计算。",
  asideMonthlyTdsTitle: "月度 TDS",
  asideMonthlyTdsExplain: "与下方第 (vi) 行 Monthly TDS 相同，为年度税额 (v) ÷ 12 的月度预扣估算。",
  asideMonthlyTdsEmpty: "请输入数字形式的税前月薪以\n显示月度扣缴额。",
  asideNetTitle: "实发（月，估算）",
  asideNetExplainBefore: "税前月薪（₹ ",
  asideNetExplainBetween: "）− 月度 TDS（₹ ",
  asideNetExplainAfter:
    "）。本计算器以 TDS 为参考口径，不含 PF、ESI、PT、HRA 免税、奖金及其他扣除项。",
  asideNetEmpty: "完成 TDS 计算后将\n显示实发估算。",
  emptyTableLead: "输入数字形式的税前月薪后，下方将填充工资 TDS 计算表（类电子表格，仅供参考）。",
  thSno: "序号",
  thDescription: "员工 / TDS 计算",
  thAmount: "金额 (INR)",
  rowGrossTitle: "总收入 / 工资（12 个月）",
  rowGrossHint: "月薪输入 × 12，为年度税前总工资。",
  rowStdTitle: "标准扣除",
  rowStdHint: "New Tax Regime 标准扣除每年 ₹75,000。取消勾选则为 0。",
  rowNetTaxableTitle: "净应税所得 ((i) − (ii))",
  rowNetTaxableHint: "扣除标准扣除后的应税所得。",
  rowIncomeTaxTitle: "所得税",
  rowIncomeTaxHint: "按税率级距计算的累进税，详见下列各行。",
  totalTaxLabel: "所得税合计",
  surchargeTitle: "附加费 @ 10–25%（以所得税为基数）",
  surchargeHint: "应税所得超过 50 lakh / 1 cr / 2 cr 时，对所得税分别加征 10%、15% 或 25%。",
  cessTitle: "加：教育附加费 @ 4%",
  cessHint: "对所得税与附加费之和按 4% 计征（教育及附加教育附加费）。",
  rowNetYearlyTitle: "净税额（年度）",
  rowNetYearlyHint: "年度应缴税额（拆分月度前）。",
  rowMonthlyTdsTitle: "月度 TDS",
  rowMonthlyTdsHint: "第 (v) 项 ÷ 12，为月度预扣估算。",
  rowNetMonthlyTitle: "实发金额（月，估算）",
  rowNetMonthlyHint:
    "税前月薪 − 第 (vi) 项。本计算器以 TDS 为参考口径，不含 PF、ESI、PT、HRA 免税、奖金及其他扣除项。",
  effectiveTdsTitle: "有效 TDS 税率",
  effectiveTdsHint: "相对年度总工资 (i) 的有效预扣比例（%）。",
  slabRowLabels: slabZh,
};

export function personalIncomeTaxCalculatorCopy(locale: SiteLocale): PersonalIncomeTaxCalculatorCopy {
  return pickLocale(locale, { ko, en, zh });
}
