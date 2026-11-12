import type { SiteLocale } from "@/lib/site-locale";
import { pickLocale } from "@/lib/site-locale";
import { company } from "@/lib/site-content";

export type CorporateTaxCalculatorCopy = {
  metaTitle: string;
  metaDescription: string;
  pageHeaderTitle: string;
  pageHeaderDescription: string;
  pageAsideTitle: string;
  sectionRefCalc: string;
  assessmentPeriodLabel: string;
  assessmentPeriodValue: string;
  disclaimer: string;
  linkServices: string;
  linkContact: string;
  linkPersonalTax: string;
  section1Title: string;
  section1LiI: string;
  section1LiJ: string;
  section1LiJNote: string;
  section1LiK: string;
  section1LiL: (effectivePct: string) => string;
  section2Title: string;
  section2Lead: string;
  section2Example: string;
  section2Ul1Strong: string;
  section2Ul1Rest: string;
  section2Ul2Strong: string;
  section2Ul2Rest: string;
  section2Ul3: string;
  section2Ul4: string;
  section2Foot: string;
  inputsHeading: string;
  fieldA: string;
  fieldC: string;
  fieldD: string;
  fieldF: string;
  fieldM: string;
  fieldMHint: string;
  fieldP: string;
  fieldPHint: string;
  workingHeading: string;
  workingLeadNote: string;
  tableColItem: string;
  tableColAmount: string;
  groupGrossCredits: string;
  groupAdvanceFinal: string;
  formulaInput: string;
  formulaLabel: string;
  rowA: string;
  rowB: string;
  rowBSub: string;
  rowC: string;
  rowD: string;
  rowE: string;
  rowF: string;
  rowG: string;
  rowGSub: string;
  rowH: string;
  rowI: string;
  rowISub: string;
  rowJ: string;
  rowK: string;
  rowL: string;
  rowLSub: string;
  rowM: string;
  rowN: string;
  rowO: string;
  rowOSub: string;
  rowP: string;
  rowQ: string;
  rowR: string;
  finalRefund: string;
  finalPayable: string;
  /** 산출표 (h) 행 보조 설명 */
  rowHHint: string;
};

const KO: CorporateTaxCalculatorCopy = {
  metaTitle: "법인세 계산기",
  metaDescription: `${company.shortName} · 제115BAA조 기준 인도 국내법인 예상 법인세 계산(적용 세율 25.168%, TDS·선납세 반영)`,
  pageHeaderTitle: "법인세 계산기",
  pageHeaderDescription:
    "매출과 비용을 입력하면 예상 법인세를 계산하고, TDS와 기납부 선납세를 반영하여 추가 납부 예상액을 확인할 수 있습니다.\n\n본 계산기는 제115BAA조의 선택 과세 요건을 충족한 인도 국내법인을 기준으로 합니다. 적용 세율은 추가세와 보건·교육세를 포함하여 25.168%이며, 실제 신고 세액은 세무조정 등에 따라 달라질 수 있습니다.",
  pageAsideTitle: "Corporate Tax Calculator",
  sectionRefCalc: "예상 법인세 계산",
  assessmentPeriodLabel: "적용 기준",
  assessmentPeriodValue: "FY 2025-26 · AY 2026-27",
  disclaimer:
    "본 계산 결과는 참고용입니다. 실제 신고 세액은 적용 과세제도, 세무조정, 공제 및 이월결손금 등에 따라 달라질 수 있습니다. 정확한 계산은 MSV에 문의해 주세요.",
  linkServices: "회계 서비스로 돌아가기",
  linkContact: "문의하기",
  linkPersonalTax: "인도 급여 TDS 계산기",
  section1Title: "적용 세율 — 제115BAA조 기준",
  section1LiI: "기본 법인세: 과세소득 × 22%",
  section1LiJ: "추가세(Surcharge): 기본 법인세 × 10%",
  section1LiJNote: "제115BAA조 적용 시 소득 규모와 관계없이 추가세 10%를 적용합니다.",
  section1LiK: "보건·교육세(Health and Education Cess): 기본 법인세와 추가세 합계 × 4%",
  section1LiL: (rate) => `총 산출세액: 과세소득 × ${rate}%`,
  section2Title: "일반 과세와 비교",
  section2Lead:
    "제115BAA조를 선택하지 않은 일반 국내법인의 기본세율은, 해당 과세연도에 법에서 정한 기준 회계연도의 매출액에 따라 달라집니다.",
  section2Example:
    "예: FY 2025-26 / AY 2026-27의 25%·30% 판단은 FY 2023-24 매출액 기준입니다.",
  section2Ul1Strong: "기준 회계연도 매출 ≤ ₹400 Crore",
  section2Ul1Rest: " → 통상 기본 법인세 25%",
  section2Ul2Strong: "기준 회계연도 매출 > ₹400 Crore",
  section2Ul2Rest: " → 통상 기본 법인세 30%",
  section2Ul3:
    "소득 구간에 따라 추가세(예: 7% 또는 12%)가 가산되고, 보건·교육세 4%가 붙습니다.",
  section2Ul4: "이 경우 실효세율은 대략 27%~35% 수준이 될 수 있습니다.",
  section2Foot:
    "제115BAA조 적용 법인은 MAT 적용 대상에서 제외됩니다. 제115BAB조(신규 제조)는 본 계산에 포함되지 않습니다.",
  inputsHeading: "입력 (INR)",
  fieldA: "(a) 매출",
  fieldC: "(c) 매입",
  fieldD: "(d) 직접비",
  fieldF: "(f) 간접비",
  fieldM: "(m) 기원천징수세액(TDS)",
  fieldMHint: "Form 26AS 기준 기공제액",
  fieldP: "(p) 기납부 선납세(Advance Tax)",
  fieldPHint: "이미 납부한 선납세",
  workingHeading: "산출 내역",
  workingLeadNote: "총 산출세액은 TDS와 기납부 선납세를 차감하기 전 금액입니다.",
  tableColItem: "항목",
  tableColAmount: "금액 (INR)",
  groupGrossCredits: "총 산출세액 · 세액공제",
  groupAdvanceFinal: "선납세 · 최종 납부세액",
  formulaInput: "입력값",
  formulaLabel: "계산식",
  rowA: "매출",
  rowB: "총수익",
  rowBSub: "본 계산에서는 매출과 동일하게 둡니다.",
  rowC: "매입",
  rowD: "직접비",
  rowE: "총 직접비",
  rowF: "간접비",
  rowG: "총비용",
  rowGSub: "총 직접비 + 간접비",
  rowH: "예상 과세소득(세무조정 전 단순 계산)",
  rowHHint: "매출에서 매입·비용을 뺀 금액입니다. 재고·감가상각·손금불산입 등 세무조정은 반영하지 않습니다.",
  rowI: "기본 법인세 (22%)",
  rowISub: "과세소득이 음수이면 세액은 0으로 계산합니다.",
  rowJ: "추가세 (10%)",
  rowK: "보건·교육세 (4%)",
  rowL: "총 산출세액",
  rowLSub: "기납부세액 차감 전 총 산출세액",
  rowM: "기원천징수세액(TDS)",
  rowN: "TDS 차감 후 납부세액",
  rowO: "선납세(참고)",
  rowOSub: "TDS 차감 후 기준 선납세 계산값",
  rowP: "기납부 선납세(Advance Tax)",
  rowQ: "추가 납부·환급 예상액(반올림 전)",
  rowR: "추가 납부·환급 예상액 (₹10 단위 반올림)",
  finalRefund: "예상 환급액",
  finalPayable: "추가 납부 예상액",
};

const EN: CorporateTaxCalculatorCopy = {
  metaTitle: "Corporate tax calculator",
  metaDescription: `${company.shortName} · Estimated Indian domestic company tax under Section 115BAA (25.168% all-in, with TDS and advance tax)`,
  pageHeaderTitle: "Corporate tax calculator",
  pageHeaderDescription:
    "Enter sales and expenses to estimate corporate tax, then apply TDS and advance tax already paid to see any further amount due.\n\nThis calculator assumes an Indian domestic company that qualifies for the Section 115BAA optional regime. The all-in rate including surcharge and health & education cess is 25.168%. Actual return tax may differ after tax adjustments.",
  pageAsideTitle: "Corporate Tax Calculator",
  sectionRefCalc: "Estimated corporate tax",
  assessmentPeriodLabel: "Period covered",
  assessmentPeriodValue: "FY 2025-26 · AY 2026-27",
  disclaimer:
    "Results are for reference only. Actual return tax depends on the regime opted, tax adjustments, deductions and brought-forward losses. For an accurate computation, contact MSV.",
  linkServices: "Back to accounting services",
  linkContact: "Contact us",
  linkPersonalTax: "India salary TDS calculator",
  section1Title: "Applied rate — Section 115BAA",
  section1LiI: "Base tax: taxable income × 22%",
  section1LiJ: "Surcharge: base tax × 10%",
  section1LiJNote: "Under Section 115BAA, surcharge is a flat 10% regardless of income size.",
  section1LiK: "Health and Education Cess: (base tax + surcharge) × 4%",
  section1LiL: (rate) => `Total tax computed: taxable income × ${rate}%`,
  section2Title: "Compared with the general regime",
  section2Lead:
    "For domestic companies that do not opt for Section 115BAA, the 25%/30% base rate depends on turnover/gross receipts of the base financial year prescribed for that assessment year.",
  section2Example:
    "Example: for FY 2025-26 / AY 2026-27, the 25%/30% test uses FY 2023-24 turnover.",
  section2Ul1Strong: "Base FY turnover ≤ ₹400 Crore",
  section2Ul1Rest: " → typically 25% base tax",
  section2Ul2Strong: "Base FY turnover > ₹400 Crore",
  section2Ul2Rest: " → typically 30% base tax",
  section2Ul3: "Surcharge (e.g. 7% or 12% by income band) and 4% health & education cess also apply.",
  section2Ul4: "All-in effective rates can land roughly in the 27%–35% range.",
  section2Foot:
    "Companies under Section 115BAA are outside MAT. Section 115BAB (new manufacturing) is not modelled here.",
  inputsHeading: "Inputs (INR)",
  fieldA: "(a) Sales / revenue",
  fieldC: "(c) Purchases",
  fieldD: "(d) Direct expenses",
  fieldF: "(f) Indirect expenses",
  fieldM: "(m) TDS already withheld",
  fieldMHint: "Credit as per Form 26AS",
  fieldP: "(p) Advance tax already paid",
  fieldPHint: "Instalments already paid",
  workingHeading: "Computation",
  workingLeadNote: "Total tax computed is before deducting TDS and advance tax already paid.",
  tableColItem: "Line item",
  tableColAmount: "Amount (INR)",
  groupGrossCredits: "Total tax computed & credits",
  groupAdvanceFinal: "Advance tax & final payable",
  formulaInput: "Input",
  formulaLabel: "Calculation",
  rowA: "Sales / revenue",
  rowB: "Total income",
  rowBSub: "In this sheet, same as sales.",
  rowC: "Purchases",
  rowD: "Direct expenses",
  rowE: "Total direct expenses",
  rowF: "Indirect expenses",
  rowG: "Total expenses",
  rowGSub: "Direct + indirect",
  rowH: "Estimated taxable income (before tax adjustments)",
  rowHHint: "Sales minus purchases and expenses. Inventory, depreciation and other tax adjustments are not applied.",
  rowI: "Base tax @ 22%",
  rowISub: "If taxable income is negative, tax is zero.",
  rowJ: "Surcharge @ 10%",
  rowK: "Health & education cess @ 4%",
  rowL: "Total tax computed",
  rowLSub: "Before TDS and advance-tax credits",
  rowM: "TDS already withheld",
  rowN: "Tax after TDS",
  rowO: "Advance tax (reference)",
  rowOSub: "Same as tax after TDS in this sheet",
  rowP: "Advance tax already paid",
  rowQ: "Further tax / refund estimate (before ₹10 round-off)",
  rowR: "Further tax / refund estimate (nearest ₹10)",
  finalRefund: "Estimated refund",
  finalPayable: "Further tax payable",
};

const ZH: CorporateTaxCalculatorCopy = {
  metaTitle: "企业所得税计算器",
  metaDescription: `${company.shortName} · 按第115BAA条估算印度本土公司企业所得税（含附加与教育健康税合计 25.168%，并反映 TDS、预缴）`,
  pageHeaderTitle: "企业所得税计算器",
  pageHeaderDescription:
    "输入销售额与费用可估算企业所得税，并反映已扣缴 TDS 与已缴预缴税后的补缴预估。\n\n本计算器以符合第115BAA条可选税制的印度本土公司为基准。含附加税与卫生教育税后的适用税率为 25.168%；实际申报税额可能因税务调整等而不同。",
  pageAsideTitle: "Corporate Tax Calculator",
  sectionRefCalc: "预计企业所得税",
  assessmentPeriodLabel: "适用期间",
  assessmentPeriodValue: "FY 2025-26 · AY 2026-27",
  disclaimer:
    "计算结果仅供参考。实际申报税额取决于适用税制、税务调整、扣除及亏损结转等。准确计算请咨询 MSV。",
  linkServices: "返回会计服务",
  linkContact: "联系我们",
  linkPersonalTax: "印度工资 TDS 计算器",
  section1Title: "适用税率 — 第115BAA条",
  section1LiI: "基本税：应税所得 × 22%",
  section1LiJ: "附加税（Surcharge）：基本税 × 10%",
  section1LiJNote: "适用第115BAA条时，不论所得规模一律按 10% 附加税。",
  section1LiK: "卫生与教育税（Health and Education Cess）：（基本税 + 附加税）× 4%",
  section1LiL: (rate) => `总计算税额：应税所得 × ${rate}%`,
  section2Title: "与一般征税比较",
  section2Lead:
    "未选择第115BAA条的一般本土公司，25%/30% 基准税率取决于该评估年度法定基准会计年度的营业额。",
  section2Example: "例：FY 2025-26 / AY 2026-27 的 25%/30% 判定以 FY 2023-24 营业额为准。",
  section2Ul1Strong: "基准会计年度营业额 ≤ ₹400 Crore",
  section2Ul1Rest: " → 通常基本税 25%",
  section2Ul2Strong: "基准会计年度营业额 > ₹400 Crore",
  section2Ul2Rest: " → 通常基本税 30%",
  section2Ul3: "再按所得档加征附加税（如 7% 或 12%），并加征 4% 卫生与教育税。",
  section2Ul4: "综合有效税率大约可落在 27%–35% 区间。",
  section2Foot: "适用第115BAA条的公司不适用 MAT。第115BAB条（新设制造）未纳入本计算。",
  inputsHeading: "输入（INR）",
  fieldA: "(a) 销售额",
  fieldC: "(c) 采购",
  fieldD: "(d) 直接费用",
  fieldF: "(f) 间接费用",
  fieldM: "(m) 已源泉扣缴税额（TDS）",
  fieldMHint: "以 Form 26AS 为准",
  fieldP: "(p) 已缴预缴税（Advance Tax）",
  fieldPHint: "已缴纳的预缴税款",
  workingHeading: "计算明细",
  workingLeadNote: "总计算税额为扣减 TDS 与已缴预缴税之前的金额。",
  tableColItem: "项目",
  tableColAmount: "金额（INR）",
  groupGrossCredits: "总计算税额 · 税款抵免",
  groupAdvanceFinal: "预缴 · 最终应（退）税额",
  formulaInput: "输入值",
  formulaLabel: "计算式",
  rowA: "销售额",
  rowB: "总收入",
  rowBSub: "本计算中与销售额相同。",
  rowC: "采购",
  rowD: "直接费用",
  rowE: "直接费用合计",
  rowF: "间接费用",
  rowG: "费用合计",
  rowGSub: "直接 + 间接",
  rowH: "预计应税所得（税务调整前简化计算）",
  rowHHint: "销售额减去采购与费用。不反映存货、折旧及其他税务调整。",
  rowI: "基本税（22%）",
  rowISub: "应税所得为负时税额按 0 计算。",
  rowJ: "附加税（10%）",
  rowK: "卫生与教育税（4%）",
  rowL: "总计算税额",
  rowLSub: "扣减已缴税款前的总计算税额",
  rowM: "已源泉扣缴税额（TDS）",
  rowN: "扣减 TDS 后应纳税额",
  rowO: "预缴参考额",
  rowOSub: "扣减 TDS 后的预缴测算基数",
  rowP: "已缴预缴税（Advance Tax）",
  rowQ: "补缴/退税预估（₹10 四舍五入前）",
  rowR: "补缴/退税预估（按 ₹10 取整）",
  finalRefund: "预计退税",
  finalPayable: "补缴预估",
};

export function corporateTaxCalculatorCopy(locale: SiteLocale): CorporateTaxCalculatorCopy {
  return pickLocale(locale, { ko: KO, en: EN, zh: ZH });
}
