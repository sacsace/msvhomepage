import type { SiteLocale } from "@/lib/site-locale";
import { pickLocale } from "@/lib/site-locale";
import { company } from "@/lib/site-content";
import type { ProfessionalTaxStateCode } from "@/lib/india-professional-tax";

export type PtSlabRow = { range: string; amount: string };

export type ProfessionalTaxCalculatorCopy = {
  metaTitle: string;
  metaDescription: string;
  pageHeaderTitle: string;
  pageHeaderDescription: string;
  sectionRefCalc: string;
  disclaimer: string;
  linkServices: string;
  linkContact: string;
  fieldState: string;
  fieldSalary: string;
  salaryPlaceholder: string;
  salaryHint: string;
  fieldBaseMonth: string;
  hintMonthMH: string;
  hintMonthOther: string;
  asideMonthlyTitle: string;
  asideMonthlyEmpty: string;
  asideAnnualTitle: string;
  asideAnnualNote: string;
  tableTitlePrefix: string;
  tableColRange: string;
  tableColTax: string;
  months: readonly string[];
  stateOptions: Record<ProfessionalTaxStateCode, string>;
  assumptions: Record<ProfessionalTaxStateCode, string>;
  slabs: Record<ProfessionalTaxStateCode, readonly PtSlabRow[]>;
};

const MONTHS_KO = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"] as const;
const MONTHS_EN = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] as const;
const MONTHS_ZH = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"] as const;

const SLABS_KO: Record<ProfessionalTaxStateCode, readonly PtSlabRow[]> = {
  KA: [
    { range: "월 급여 ₹15,000 이하", amount: "면제 (₹0)" },
    { range: "월 급여 ₹15,001 ~ ₹25,000", amount: "₹150 / 월" },
    { range: "월 급여 ₹25,001 초과", amount: "₹200 / 월" },
  ],
  MH: [
    { range: "월 급여 ₹7,500 이하", amount: "면제 (₹0)" },
    { range: "월 급여 ₹7,501 ~ ₹10,000", amount: "₹175 / 월" },
    { range: "월 급여 ₹10,001 초과", amount: "₹200 / 월 (2월만 ₹300)" },
  ],
  AP: [
    { range: "월 급여 ₹15,000 이하", amount: "면제 (₹0)" },
    { range: "월 급여 ₹15,001 ~ ₹20,000", amount: "₹150 / 월" },
    { range: "월 급여 ₹20,001 초과", amount: "₹200 / 월" },
  ],
  TN: [
    { range: "월 급여 ₹21,000 이하", amount: "면제 (₹0)" },
    { range: "월 급여 ₹21,001 ~ ₹30,000", amount: "₹135 / 월" },
    { range: "월 급여 ₹30,001 ~ ₹45,000", amount: "₹315 / 월" },
    { range: "월 급여 ₹45,001 ~ ₹60,000", amount: "₹690 / 월" },
    { range: "월 급여 ₹60,001 ~ ₹75,000", amount: "₹1,025 / 월" },
    { range: "월 급여 ₹75,001 초과", amount: "₹1,250 / 월" },
  ],
};

const SLABS_EN: Record<ProfessionalTaxStateCode, readonly PtSlabRow[]> = {
  KA: [
    { range: "Monthly salary ≤ ₹15,000", amount: "Exempt (₹0)" },
    { range: "Monthly salary ₹15,001–₹25,000", amount: "₹150 / month" },
    { range: "Monthly salary > ₹25,000", amount: "₹200 / month" },
  ],
  MH: [
    { range: "Monthly salary ≤ ₹7,500", amount: "Exempt (₹0)" },
    { range: "Monthly salary ₹7,501–₹10,000", amount: "₹175 / month" },
    { range: "Monthly salary > ₹10,001", amount: "₹200 / month (₹300 in February only)" },
  ],
  AP: [
    { range: "Monthly salary ≤ ₹15,000", amount: "Exempt (₹0)" },
    { range: "Monthly salary ₹15,001–₹20,000", amount: "₹150 / month" },
    { range: "Monthly salary > ₹20,000", amount: "₹200 / month" },
  ],
  TN: [
    { range: "Monthly salary ≤ ₹21,000", amount: "Exempt (₹0)" },
    { range: "Monthly salary ₹21,001–₹30,000", amount: "₹135 / month" },
    { range: "Monthly salary ₹30,001–₹45,000", amount: "₹315 / month" },
    { range: "Monthly salary ₹45,001–₹60,000", amount: "₹690 / month" },
    { range: "Monthly salary ₹60,001–₹75,000", amount: "₹1,025 / month" },
    { range: "Monthly salary > ₹75,000", amount: "₹1,250 / month" },
  ],
};

const SLABS_ZH: Record<ProfessionalTaxStateCode, readonly PtSlabRow[]> = {
  KA: [
    { range: "月工资 ≤ ₹15,000", amount: "免税 (₹0)" },
    { range: "月工资 ₹15,001–₹25,000", amount: "₹150 / 月" },
    { range: "月工资 > ₹25,000", amount: "₹200 / 月" },
  ],
  MH: [
    { range: "月工资 ≤ ₹7,500", amount: "免税 (₹0)" },
    { range: "月工资 ₹7,501–₹10,000", amount: "₹175 / 月" },
    { range: "月工资 > ₹10,001", amount: "₹200 / 月（仅 2 月为 ₹300）" },
  ],
  AP: [
    { range: "月工资 ≤ ₹15,000", amount: "免税 (₹0)" },
    { range: "月工资 ₹15,001–₹20,000", amount: "₹150 / 月" },
    { range: "月工资 > ₹20,000", amount: "₹200 / 月" },
  ],
  TN: [
    { range: "月工资 ≤ ₹21,000", amount: "免税 (₹0)" },
    { range: "月工资 ₹21,001–₹30,000", amount: "₹135 / 月" },
    { range: "月工资 ₹30,001–₹45,000", amount: "₹315 / 月" },
    { range: "月工资 ₹45,001–₹60,000", amount: "₹690 / 月" },
    { range: "月工资 ₹60,001–₹75,000", amount: "₹1,025 / 月" },
    { range: "月工资 > ₹75,000", amount: "₹1,250 / 月" },
  ],
};

const KO: ProfessionalTaxCalculatorCopy = {
  metaTitle: "Professional Tax(프로페셔널 택스) 계산기",
  metaDescription: `${company.shortName} — 인도 주(State)별 직원 Professional Tax 월 납부액·연간 환산(12개월 기준) 참고(카르나타카·마하라슈트라·안드라프라데시·타밀나두)`,
  pageHeaderTitle: "Professional Tax 계산기",
  pageHeaderDescription:
    "인도에서는 주(State)마다 직원·사업자에게 부과되는 Professional Tax(직업세)의 요율 및 과세 기준이 다릅니다. 본 도구는 카르나타카, 마하라슈트라(일반 남성 급여자 기준), 안드라프라데시, 타밀나두의 일반적인 월 급여 구간을 기준으로 월 납부액 및 연간 환산 금액(12개월 기준)을 안내합니다. 타밀나두는 행정상 반기 납부인 경우가 많아 실제 납부 시기·방식은 별도 확인이 필요합니다.",
  sectionRefCalc: "참고 계산",
  disclaimer:
    "본 도구는 참고용이며 법적·세무 자문을 대체하지 않습니다. 여성·장애인·특정 업종 면제, 반기 납부 체계, 사업자·법인 등록 유형별 별도 규정 등은 반영되지 않을 수 있으므로, 확정 납부는 MSV와 상담해 주세요.",
  linkServices: "회계 서비스로 돌아가기",
  linkContact: "문의하기",
  fieldState: "주(State) 선택",
  fieldSalary: "월 급여·보수 총액 (INR, 세전 기준)",
  salaryPlaceholder: "예: 85000",
  salaryHint:
    "주(State)별로 과세 대상 급여의 범위와 기준이 다를 수 있습니다. 실제 원천징수 및 납부 기준은 각 주 정부의 규정 및 고시에 따라 달라질 수 있습니다.",
  fieldBaseMonth: "기준 월 (마하라슈트라 일부 구간의 2월 차등 요율 반영용)",
  hintMonthMH: "마하라슈트라 일부 구간(₹10,001 초과)은 2월에만 월 ₹300이 적용되는 경우가 많습니다.",
  hintMonthOther: "일부 주(State)는 기준 월과 무관하며, 해당 선택값은 표시 목적에만 사용됩니다.",
  asideMonthlyTitle: "해당 월 Professional Tax",
  asideMonthlyEmpty: "월 급여를 숫자로 입력하면 표시됩니다.",
  asideAnnualTitle: "연간 환산 금액(12개월 기준)",
  asideAnnualNote: "매월 급여가 같다고 가정한 단순 합계입니다. 승진·휴직 등으로 달라지면 실제와 다릅니다.",
  tableTitlePrefix: "Professional Tax 구간 요약",
  tableColRange: "월 급여 구간",
  tableColTax: "세액(요약)",
  months: MONTHS_KO,
  stateOptions: {
    KA: "카르나타카(Karnataka)",
    MH: "마하라슈트라(Maharashtra)",
    AP: "안드라프라데시(Andhra Pradesh)",
    TN: "타밀나두(Tamil Nadu)",
  },
  assumptions: {
    KA: "급여소득자(직원) 월별 납부 구간 — Karnataka Tax on Professions, Trades and Callings Act 기준의 일반적인 3단계 요약입니다.",
    MH: "급여소득자(남성) 월별 납부 구간 — Maharashtra State Tax on Professions, Trades, Callings and Employments Act 기준의 일반적인 구간입니다. 여성·기타 면제 특례는 별도 규정이 있을 수 있습니다.",
    AP: "급여소득자(직원) 월별 납부 구간 — Andhra Pradesh Tax on Profession, Trades, Callings and Employments Act 등에 따른 일반적인 3단계 요약입니다.",
    TN: "급여소득자(직원) 월 급여 기준 구간 — Tamil Nadu Tax on Professions, Trades, Callings and Employments Act에 따른 일반적인 누진 요율입니다. 실제 납부는 반기(8월·1월 등) 방식인 경우가 많아 월액과 시기가 다를 수 있습니다.",
  },
  slabs: SLABS_KO,
};

const EN: ProfessionalTaxCalculatorCopy = {
  metaTitle: "Professional Tax calculator",
  metaDescription: `${company.shortName} — India state-wise employee Professional Tax: monthly liability and annualised 12-month estimate (Karnataka, Maharashtra, Andhra Pradesh, Tamil Nadu)`,
  pageHeaderTitle: "Professional Tax calculator",
  pageHeaderDescription:
    "In India, Professional Tax rates and taxable-pay rules differ by state for employees and businesses. This tool illustrates monthly liability and an annualised amount (12 months at the same salary) using common monthly salary slabs for Karnataka, Maharashtra (general male salaried employee), Andhra Pradesh and Tamil Nadu. Tamil Nadu often collects PT half-yearly in practice—confirm timing and mode separately.",
  sectionRefCalc: "Illustrative calculation",
  disclaimer:
    "This tool is for reference only and does not replace legal or tax advice. Exemptions (e.g. women, persons with disabilities, certain sectors), half-yearly filing patterns and rules for registered businesses or companies may not be modelled—please consult MSV before final payment.",
  linkServices: "Back to accounting services",
  linkContact: "Contact us",
  fieldState: "State",
  fieldSalary: "Monthly salary & remuneration (INR, pre-tax)",
  salaryPlaceholder: "e.g. 85000",
  salaryHint:
    "The salary band that is subject to PT can vary by state. Actual withholding and payment follow each state’s statutes and official notifications.",
  fieldBaseMonth: "Reference month (for Maharashtra February differential on some slabs)",
  hintMonthMH: "For Maharashtra, some slabs above ₹10,001 often charge ₹300 in February only.",
  hintMonthOther:
    "For some states the month choice does not change the monthly amount; the selection is for display only.",
  asideMonthlyTitle: "Professional Tax (selected month)",
  asideMonthlyEmpty: "Enter a monthly salary figure to see the amount.",
  asideAnnualTitle: "Annualised amount (12 months)",
  asideAnnualNote:
    "Simple sum assuming the same salary every month. Promotions, leave without pay, etc. will differ from real life.",
  tableTitlePrefix: "Professional Tax slab summary",
  tableColRange: "Monthly salary band",
  tableColTax: "Tax (summary)",
  months: MONTHS_EN,
  stateOptions: {
    KA: "Karnataka",
    MH: "Maharashtra",
    AP: "Andhra Pradesh",
    TN: "Tamil Nadu",
  },
  assumptions: {
    KA: "Salaried employee monthly slabs — a common three-step summary under the Karnataka Tax on Professions, Trades and Callings Act.",
    MH: "Salaried employee (male) monthly slabs — a common summary under the Maharashtra State Tax on Professions, Trades, Callings and Employments Act. Women and other exemptions may apply separately.",
    AP: "Salaried employee monthly slabs — a common three-step summary under the Andhra Pradesh Tax on Profession, Trades, Callings and Employments Act, etc.",
    TN: "Salaried employee monthly salary bands — a common graduated table under the Tamil Nadu Tax on Professions, Trades, Callings and Employments Act. Many employers remit half-yearly (e.g. Aug / Jan), so timing may differ from a monthly figure.",
  },
  slabs: SLABS_EN,
};

const ZH: ProfessionalTaxCalculatorCopy = {
  metaTitle: "职业税（Professional Tax）计算器",
  metaDescription: `${company.shortName} — 印度各邦员工 Professional Tax：月度税额与按相同月薪推算的年度金额（卡纳塔克、马哈拉施特拉、安得拉邦、泰米尔纳德）`,
  pageHeaderTitle: "Professional Tax（职业税）计算器",
  pageHeaderDescription:
    "在印度，各邦（State）对员工与经营者征收的 Professional Tax（职业税）税率及计税口径不同。本工具以卡纳塔克、马哈拉施特拉（一般男性受薪雇员）、安得拉邦、泰米尔纳德常见的月工资区间为例，展示月度应缴税额及按相同月薪推算的年度金额（12 个月）。泰米尔纳德实务上多为半年度缴纳，实际缴纳时点与方式请另行核实。",
  sectionRefCalc: "参考计算",
  disclaimer:
    "本工具仅供参考，不构成法律或税务意见。女性、残障人士、特定行业减免、半年度申报体系以及注册商户/公司等情形可能未予体现，最终缴纳请咨询 MSV。",
  linkServices: "返回会计服务",
  linkContact: "联系我们",
  fieldState: "邦 / 州（State）",
  fieldSalary: "月工资及报酬总额（INR，税前）",
  salaryPlaceholder: "例：85000",
  salaryHint:
    "各邦对应税工资的范围与口径可能不同。实际预扣与缴纳以各邦法规及政府公告为准。",
  fieldBaseMonth: "基准月份（用于马哈拉施特拉部分区间 2 月差额税率）",
  hintMonthMH: "马哈拉施特拉部分区间（月工资超过 ₹10,001）通常在仅 2 月按每月 ₹300 计缴。",
  hintMonthOther: "部分邦的月度税额与基准月份无关，此项仅作界面展示。",
  asideMonthlyTitle: "当月 Professional Tax",
  asideMonthlyEmpty: "请输入月工资数字后显示。",
  asideAnnualTitle: "年度折算金额（12 个月）",
  asideAnnualNote: "假设每月工资相同的简单加总；晋升、停薪留职等会导致与实际情况不同。",
  tableTitlePrefix: "Professional Tax 区间摘要",
  tableColRange: "月工资区间",
  tableColTax: "税额（摘要）",
  months: MONTHS_ZH,
  stateOptions: {
    KA: "卡纳塔克邦 (Karnataka)",
    MH: "马哈拉施特拉邦 (Maharashtra)",
    AP: "安得拉邦 (Andhra Pradesh)",
    TN: "泰米尔纳德邦 (Tamil Nadu)",
  },
  assumptions: {
    KA: "受薪雇员按月缴纳区间——依据《卡纳塔克职业、行业与执业税法》的常见三档摘要。",
    MH: "受薪雇员（男性）按月缴纳区间——依据《马哈拉施特拉邦职业、行业、执业与雇佣税法》的常见区间；女性等减免情形另有规定。",
    AP: "受薪雇员按月缴纳区间——依据《安得拉邦职业、行业、执业与雇佣税法》等的常见三档摘要。",
    TN: "受薪雇员按月工资分档——依据《泰米尔纳德职业、行业与执业税法》的常见累进税率；实务中多为半年度（如 8 月、1 月）缴纳，与按月展示金额可能不一致。",
  },
  slabs: SLABS_ZH,
};

export function professionalTaxCalculatorCopy(locale: SiteLocale): ProfessionalTaxCalculatorCopy {
  return pickLocale(locale, { ko: KO, en: EN, zh: ZH });
}

/** 표 제목 괄호 앞 짧은 지역명 */
export function professionalTaxTableStateShort(locale: SiteLocale, state: ProfessionalTaxStateCode): string {
  const label = professionalTaxCalculatorCopy(locale).stateOptions[state];
  const iAscii = label.indexOf("(");
  const iFull = label.indexOf("（");
  const i = [iAscii, iFull].filter((n) => n >= 0).sort((a, b) => a - b)[0] ?? -1;
  return i > 0 ? label.slice(0, i).trim() : label;
}
