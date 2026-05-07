import type { SiteLocale } from "@/lib/site-locale";
import { pickLocale } from "@/lib/site-locale";
import { company } from "@/lib/site-content";

export type CorporateTaxCalculatorCopy = {
  metaTitle: string;
  metaDescription: string;
  pageHeaderTitle: string;
  pageHeaderDescription: string;
  sectionRefCalc: string;
  disclaimer: string;
  linkServices: string;
  linkContact: string;
  linkPersonalTax: string;
  section1Title: string;
  section1LeadBeforeRows: string;
  section1LeadRowsStrong: string;
  section1LeadAfterRows: string;
  section1LeadActStrong: string;
  section1LeadTail: string;
  section1LiIStrong: string;
  section1LiIRest: string;
  section1LiJStrong: string;
  section1LiJNote: string;
  section1LiK: string;
  section1LiLBeforeRate: string;
  section1LiLRate: (effectivePct: string) => string;
  section1LiLNote: string;
  section2Title: string;
  section2P1Before: string;
  section2P1Strong: string;
  section2P1After: string;
  section2P1Msv: string;
  section2P1End: string;
  section2Ul1Strong: string;
  section2Ul1Rest: string;
  section2Ul2Strong: string;
  section2Ul2Rest: string;
  section2Ul3: string;
  section2Ul4: string;
  section2Foot1: string;
  section2Foot2: string;
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
  workingLeadBeforeL: string;
  workingLeadLStrong: string;
  workingLeadAfterL: string;
  workingLeadGrossStrong: string;
  workingLeadEnd: string;
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
};

const KO: CorporateTaxCalculatorCopy = {
  metaTitle: "법인세 계산기",
  metaDescription: `${company.shortName} — §115BAA 기준 법인세·일반 국내법인 ₹400 Crore 기준 25%/30%·surcharge·cess 안내, 매출·매입·비용·TDS·선납세 참고 계산`,
  pageHeaderTitle: "법인세 계산기",
  pageHeaderDescription:
    "매출·매입·비용 및 TDS·선납세를 입력하면 과세소득과 §115BAA 기준 법인세(22%+surcharge(서차지)+cess, 실효세율 약 25.168%)를 계산합니다. 일반 국내법인의 직전 연도 매출 ₹400 Crore 기준 기본세율(25%/30%)과 surcharge·cess 적용에 따른 실효세율도 함께 안내합니다. MAT/AMT, §115BAB 적용 여부 및 세법 개정 사항은 별도 검토가 필요합니다.",
  sectionRefCalc: "참고 계산",
  disclaimer:
    "본 도구는 참고용이며 법적·세무 자문을 대체하지 않습니다. 실제 과세소득·세율·surcharge·이자·가산세는 법인별 상황에 따라 달라질 수 있으므로 확정 신고·납부는 MSV와 상담해 주세요.",
  linkServices: "회계 서비스로 돌아가기",
  linkContact: "문의하기",
  linkPersonalTax: "개인 소득세 계산기",
  section1Title: "1. 본 계산기에 적용한 세율 (§115BAA 기준 예시 계산)",
  section1LeadBeforeRows: "아래 표의 ",
  section1LeadRowsStrong: "(i)~(l)",
  section1LeadAfterRows: "은 소득세법 ",
  section1LeadActStrong: "제115BAA조",
  section1LeadTail:
    "의 선택 과세(기본세율 22%) 구조를 단순화하여 계산한 예시입니다. 일부 공제 제한, 이월결손금 처리 등 실제 적용 조건은 관련 세법 및 해석에 따릅니다.",
  section1LiIStrong: "(i) 법인세",
  section1LiIRest: " = 과세소득(음수는 0) × 22%",
  section1LiJStrong: "(j) surcharge(서차지)",
  section1LiJNote:
    " (실제 신고 시에는 과세소득 구간에 따라 surcharge 비율이 달라질 수 있으나, 본 계산에서는 예시 목적으로 10%를 고정 적용하였습니다.)",
  section1LiK: "(k) 교육·건강 cess = ((i) + (j)) × 4%",
  section1LiLBeforeRate:
    "(l) 총 세액 = (i) + (j) + (k). 과세소득 한 단위(₹1)당 부담은 ",
  section1LiLRate: (rate) => `22% × 1.10 × 1.04 ≈ ${rate}%`,
  section1LiLNote: " (즉 22%에 surcharge 10%를 곱한 뒤, 해당 합계에 추가로 cess 4%가 적용되는 구조입니다.)",
  section2Title: "2. 일반 국내법인 기본세율 — 직전 연도 매출 ₹400 Crore 기준",
  section2P1Before: "",
  section2P1Strong: "§115BAA를 선택하지 않은",
  section2P1After: " 일반 과세 체계에서, 직전 연도의 총매출액(turnover 또는 gross receipts)이 기준입니다. 관련 세법 개정 및 해석에 따라 달라질 수 있으므로 확정 세율은 ",
  section2P1Msv: "MSV",
  section2P1End: "와 상담하여 확인하세요.",
  section2Ul1Strong: "매출(직전 연) ≤ ₹400 Crore",
  section2Ul1Rest: "인 경우, 통상 기본 법인세 25%가 일반적으로 적용됩니다.",
  section2Ul2Strong: "매출(직전 연)이 ₹400 Crore를 초과",
  section2Ul2Rest: "하는 경우, 통상 기본 법인세 30%가 일반적으로 적용됩니다.",
  section2Ul3:
    "위 25% 또는 30% 법인세에 더해, 총소득(total income) 규모에 따라 법인세액에 surcharge가 가산됩니다(예: 과세소득이 ₹1 Crore 초과~₹10 Crore 이하인 경우 7%, 과세소득이 ₹10 Crore 초과 시 12% 등이 적용됩니다 — 연도·법령별로 확인).",
  section2Ul4:
    "그다음 (법인세 + surcharge) 합계에 교육·건강 cess 4%가 붙습니다. 따라서 25%·30% 기본세만으로 끝나지 않고, surcharge·cess까지 포함하면 실효세율은 보통 약 27%~35% 전후대까지 올라갈 수 있습니다(소득 구간·적용 세율에 따라 상이).",
  section2Foot1:
    "신규 제조업 법인에 대한 §115BAB(15%) 적용, MAT/AMT, 분할·합병, 국제거래 등의 사항은 본 계산에 포함되어 있지 않습니다.",
  section2Foot2:
    "본 계산 결과는 참고용 예시이며, 실제 신고 세액은 회사의 공제·감면·이월결손금·최저한세(MAT/AMT)·surcharge 적용 여부 등에 따라 달라질 수 있습니다.",
  inputsHeading: "입력 (INR)",
  fieldA: "(a) Revenue (Sales) / 매출",
  fieldC: "(c) Purchases / 매입",
  fieldD: "(d) Direct Expenses / 직접비",
  fieldF: "(f) Indirect Expenses / 간접비",
  fieldM: "(m) Less: TDS credit under Form 26AS / TDS 세액공제",
  fieldMHint: "TDS credit(원천징수 세액 공제)",
  fieldP: "(p) Less: Advance Tax already paid / 선납세 납부액",
  fieldPHint: "Advance tax already paid(기납부 선납세)",
  workingHeading: "산출 내역",
  workingLeadBeforeL: "",
  workingLeadLStrong: "(l) 총 세액",
  workingLeadAfterL: "은 세액공제(TDS·선납세) 차감 전 ",
  workingLeadGrossStrong: "gross tax liability(총 법인세 부담)",
  workingLeadEnd: "에 해당합니다.",
  tableColItem: "항목 (EN / KO)",
  tableColAmount: "금액 (INR)",
  groupGrossCredits: "Gross tax liability & credits / 총 세액·세액공제",
  groupAdvanceFinal: "Advance tax & final payable / 선납세·최종 납부세액",
  formulaInput: "입력값",
  formulaLabel: "계산식",
  rowA: "Revenue (Sales) / 매출",
  rowB: "Total Income / 총수익",
  rowBSub: "본 계산 예시에서는 매출과 동일하게 둡니다.",
  rowC: "Purchases / 매입",
  rowD: "Direct Expenses / 직접비",
  rowE: "Total Direct Expenses / 총 직접비",
  rowF: "Indirect Expenses / 간접비",
  rowG: "Total Expenses / 총비용",
  rowGSub: "총 직접비 + 간접비",
  rowH: "Taxable income / 과세소득",
  rowI: "Tax @ 22% / 법인세",
  rowISub: "과세소득이 음수인 경우 세액은 0으로 계산합니다.",
  rowJ: "Add: Surcharge @ 10% / surcharge(서차지)",
  rowK: "Add: Cess @ 4% / 교육·건강 cess",
  rowL: "Gross Tax Liability / 총 세액",
  rowLSub: "세액공제(TDS·선납세) 차감 전 총 법인세",
  rowM: "Less: TDS credit under 26AS / TDS 세액공제",
  rowN: "Net Tax Payable (after TDS credit) / TDS 세액공제 후 순 납부세액",
  rowO: "Advance Tax Payable (reference) / 선납세(참고)",
  rowOSub: "TDS 공제 후 기준 선납세 계산값",
  rowP: "Less: Advance Tax already paid / 선납세 납부액(기납부)",
  rowQ: "Net Tax Payable (before ₹100 round-off) / 최종 납부세액(반올림 전)",
  rowR: "Round off to nearest ₹100 / 최종 납부세액 (₹100 단위 반올림)",
  finalRefund: "환급",
  finalPayable: "납부해야 할 최종 금액",
};

const EN: CorporateTaxCalculatorCopy = {
  metaTitle: "Corporate tax calculator",
  metaDescription: `${company.shortName} — §115BAA corporate tax, domestic company ₹400 Cr slab 25%/30%, surcharge & cess; illustrative calculation with sales, purchases, expenses, TDS & advance tax`,
  pageHeaderTitle: "Corporate tax calculator",
  pageHeaderDescription:
    "Enter sales, purchases, expenses, TDS and advance tax to compute taxable income and corporate tax under §115BAA (22% + surcharge + cess, effective rate about 25.168%). We also outline effective rates for domestic companies with prior-year turnover ₹400 Crore (25%/30% base rates plus surcharge and cess). MAT/AMT, §115BAB applicability and legislative changes need separate review.",
  sectionRefCalc: "Illustrative calculation",
  disclaimer:
    "This tool is for reference only and does not replace legal or tax advice. Actual taxable income, rates, surcharge, interest and penalties vary by taxpayer—please consult MSV for filings and payments.",
  linkServices: "Back to accounting services",
  linkContact: "Contact us",
  linkPersonalTax: "Personal income tax calculator",
  section1Title: "1. Rates used in this calculator (illustration under §115BAA)",
  section1LeadBeforeRows: "Rows ",
  section1LeadRowsStrong: "(i)–(l)",
  section1LeadAfterRows: " simplify the optional regime under the Income-tax Act ",
  section1LeadActStrong: "Section 115BAA",
  section1LeadTail:
    " (22% base rate). Real-world limits on deductions and brought-forward losses follow the statute and official guidance.",
  section1LiIStrong: "(i) Corporate tax",
  section1LiIRest: " = max(0, taxable income) × 22%",
  section1LiJStrong: "(j) Surcharge",
  section1LiJNote:
    " (In practice surcharge rates vary by taxable-income slabs; here we fix 10% for illustration.)",
  section1LiK: "(k) Health & education cess = ((i) + (j)) × 4%",
  section1LiLBeforeRate:
    "(l) Gross tax = (i) + (j) + (k). Per rupee of taxable income the combined burden is about ",
  section1LiLRate: (rate) => `22% × 1.10 × 1.04 ≈ ${rate}%`,
  section1LiLNote: " (i.e. 22% with 10% surcharge on tax, then 4% cess on tax plus surcharge).",
  section2Title: "2. Domestic company base rates — prior-year turnover ₹400 Crore threshold",
  section2P1Before: "Under the general regime where ",
  section2P1Strong: "§115BAA is not opted for",
  section2P1After:
    ", prior-year gross receipts or turnover is the key benchmark. Rates may change with amendments and interpretation—confirm with ",
  section2P1Msv: "MSV",
  section2P1End: ".",
  section2Ul1Strong: "Prior-year turnover ≤ ₹400 Crore",
  section2Ul1Rest: ": the 25% corporate tax rate commonly applies.",
  section2Ul2Strong: "Prior-year turnover > ₹400 Crore",
  section2Ul2Rest: ": the 30% rate commonly applies.",
  section2Ul3:
    "In addition to the 25% or 30% tax, surcharge applies to the tax amount depending on total income (e.g. roughly 7% if taxable income is between ₹1 Cr and ₹10 Cr, and 12% above ₹10 Cr—verify for the relevant year).",
  section2Ul4:
    "Health & education cess at 4% is levied on corporate tax plus surcharge, so all-in effective rates often fall roughly in the high twenties to mid-thirties depending on slabs.",
  section2Foot1:
    "§115BAB (15% for new manufacturing), MAT/AMT, mergers & acquisitions and cross-border issues are not modelled here.",
  section2Foot2:
    "Results are illustrative; reported tax can differ with reliefs, brought-forward losses, MAT/AMT and surcharge positions.",
  inputsHeading: "Inputs (INR)",
  fieldA: "(a) Revenue (sales)",
  fieldC: "(c) Purchases",
  fieldD: "(d) Direct expenses",
  fieldF: "(f) Indirect expenses",
  fieldM: "(m) Less: TDS credit (Form 26AS)",
  fieldMHint: "TDS credit already withheld",
  fieldP: "(p) Less: Advance tax already paid",
  fieldPHint: "Advance tax instalments already paid",
  workingHeading: "Computation",
  workingLeadBeforeL: "",
  workingLeadLStrong: "(l) Gross tax",
  workingLeadAfterL: " is your ",
  workingLeadGrossStrong: "gross tax liability",
  workingLeadEnd: " before netting TDS and advance-tax credits.",
  tableColItem: "Line item",
  tableColAmount: "Amount (INR)",
  groupGrossCredits: "Gross tax liability & credits",
  groupAdvanceFinal: "Advance tax & final payable",
  formulaInput: "Input",
  formulaLabel: "Calculation",
  rowA: "Revenue (sales)",
  rowB: "Total income",
  rowBSub: "In this example, same as revenue.",
  rowC: "Purchases",
  rowD: "Direct expenses",
  rowE: "Total direct expenses",
  rowF: "Indirect expenses",
  rowG: "Total expenses",
  rowGSub: "Direct + indirect expenses",
  rowH: "Taxable income",
  rowI: "Tax @ 22%",
  rowISub: "If taxable income is negative, tax is computed as zero.",
  rowJ: "Add: surcharge @ 10%",
  rowK: "Add: cess @ 4%",
  rowL: "Gross tax liability",
  rowLSub: "Corporate tax before TDS and advance-tax credits",
  rowM: "Less: TDS credit (26AS)",
  rowN: "Net tax payable (after TDS credit)",
  rowO: "Advance tax payable (reference)",
  rowOSub: "Instalment base after TDS—same as (n) in this sheet",
  rowP: "Less: advance tax already paid",
  rowQ: "Net tax payable (before ₹100 round-off)",
  rowR: "Round off to nearest ₹100 (final payable)",
  finalRefund: "Refund",
  finalPayable: "Total tax payable",
};

const ZH: CorporateTaxCalculatorCopy = {
  metaTitle: "企业所得税计算器",
  metaDescription: `${company.shortName} — §115BAA 企业所得税、印度本土公司 ₹400 亿卢比档 25%/30%、surcharge 与 cess；含销售、采购、费用、TDS 与预缴示例`,
  pageHeaderTitle: "企业所得税计算器",
  pageHeaderDescription:
    "输入销售、采购、费用、TDS 与预缴税款，可计算应税所得及 §115BAA 制度下的企业所得税（22%+surcharge+cess，有效税率约 25.168%）。亦说明一般本土公司上一营业年度营业额 ₹400 Crore 为界时的 25%/30% 基准税率及 surcharge、cess 下的有效税负。MAT/AMT、§115BAB 适用及税法修订需另行研判。",
  sectionRefCalc: "参考计算",
  disclaimer:
    "本工具仅供参考，不构成法律或税务意见。实际应税所得、税率、surcharge、利息与罚款因企业情况而异，正式申报与缴纳请咨询 MSV。",
  linkServices: "返回会计服务",
  linkContact: "联系我们",
  linkPersonalTax: "个人所得税计算器",
  section1Title: "1. 本计算器采用的税率（§115BAA 示例）",
  section1LeadBeforeRows: "下表中 ",
  section1LeadRowsStrong: "(i)~(l)",
  section1LeadAfterRows: " 行是对《所得税法》",
  section1LeadActStrong: "第 115BAA 条",
  section1LeadTail:
    " 可选税制（基准税率 22%）的简化演示。扣除限制、亏损结转等实际条件以相关法律及解释为准。",
  section1LiIStrong: "(i) 企业所得税",
  section1LiIRest: " = max(0, 应税所得) × 22%",
  section1LiJStrong: "(j) surcharge（附加费）",
  section1LiJNote: "（实务中 surcharge 随应税所得区间变化；此处示例固定为 10%。）",
  section1LiK: "(k) 教育与健康 cess = ((i) + (j)) × 4%",
  section1LiLBeforeRate:
    "(l) 应纳税总额 = (i) + (j) + (k)。每 ₹1 应税所得的大致综合税负约为 ",
  section1LiLRate: (rate) => `22% × 1.10 × 1.04 ≈ ${rate}%`,
  section1LiLNote: "（即对 22% 税额按 10% 计 surcharge，再对「税 + surcharge」按 4% 计 cess。）",
  section2Title: "2. 一般本土公司基准税率 — 上一营业年度营业额 ₹400 Crore 为界",
  section2P1Before: "在 ",
  section2P1Strong: "未选择 §115BAA",
  section2P1After:
    " 的一般税制下，以上一营业年度的总营业额（turnover / gross receipts）为判断依据。具体税率可能随修法与解释调整，请与 ",
  section2P1Msv: "MSV",
  section2P1End: " 确认。",
  section2Ul1Strong: "上一营业年度营业额 ≤ ₹400 Crore",
  section2Ul1Rest: " 时，通常适用 25% 企业所得税。",
  section2Ul2Strong: "上一营业年度营业额 > ₹400 Crore",
  section2Ul2Rest: " 时，通常适用 30% 企业所得税。",
  section2Ul3:
    "在上述 25% 或 30% 税额之外，还可能按总所得（total income）对税额加征 surcharge（例如应税所得约 ₹1–10 Crore 档约 7%，超过 ₹10 Crore 约 12% 等，以当年法规为准）。",
  section2Ul4:
    "随后对「企业所得税 + surcharge」合计按 4% 征收教育与健康 cess，因此仅看 25%/30% 名义税率不足以反映全部负担，含 surcharge、cess 后有效税率常见约 27%–35% 区间（视所得档而定）。",
  section2Foot1: "新设制造企业 §115BAB（15%）、MAT/AMT、并购及跨境安排等未纳入本计算。",
  section2Foot2:
    "本计算为示例，实际申报税额可能因减免、亏损结转、MAT/AMT、surcharge 适用等而不同。",
  inputsHeading: "输入（INR）",
  fieldA: "(a) 营业收入（销售额）",
  fieldC: "(c) 采购",
  fieldD: "(d) 直接费用",
  fieldF: "(f) 间接费用",
  fieldM: "(m) 减：TDS 抵免（26AS）",
  fieldMHint: "已源泉扣缴可抵免税额",
  fieldP: "(p) 减：已预缴企业所得税",
  fieldPHint: "已缴纳的预缴税款",
  workingHeading: "计算过程",
  workingLeadBeforeL: "",
  workingLeadLStrong: "(l) 应纳税总额",
  workingLeadAfterL: "指尚未扣减 TDS、预缴等抵免前的 ",
  workingLeadGrossStrong: "应纳税总额（gross tax liability）",
  workingLeadEnd: "。",
  tableColItem: "项目",
  tableColAmount: "金额（INR）",
  groupGrossCredits: "应纳税额与税款抵免",
  groupAdvanceFinal: "预缴与最终应（退）税额",
  formulaInput: "输入值",
  formulaLabel: "计算式",
  rowA: "营业收入（销售额）",
  rowB: "总收入",
  rowBSub: "本示例中与营业收入相同。",
  rowC: "采购",
  rowD: "直接费用",
  rowE: "直接费用合计",
  rowF: "间接费用",
  rowG: "费用合计",
  rowGSub: "直接 + 间接费用",
  rowH: "应税所得",
  rowI: "企业所得税 @22%",
  rowISub: "应税所得为负时，税额按 0 计算。",
  rowJ: "加：surcharge @10%",
  rowK: "加：教育与健康 cess @4%",
  rowL: "应纳税总额（gross tax liability）",
  rowLSub: "扣减 TDS、预缴等抵免前的企业所得税总额",
  rowM: "减：TDS 抵免（26AS）",
  rowN: "抵减 TDS 后应纳税净额",
  rowO: "预缴参考额",
  rowOSub: "扣减 TDS 后的预缴测算基数",
  rowP: "减：已预缴税款",
  rowQ: "最终应（退）税额（₹100 四舍五入前）",
  rowR: "按 ₹100 取整后的最终应（退）税额",
  finalRefund: "退税",
  finalPayable: "应缴税款总额",
};

export function corporateTaxCalculatorCopy(locale: SiteLocale): CorporateTaxCalculatorCopy {
  return pickLocale(locale, { ko: KO, en: EN, zh: ZH });
}
