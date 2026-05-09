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
  fieldGender: string;
  genderMale: string;
  genderFemale: string;
  genderHintMh: string;
  slabsMhFemale: readonly PtSlabRow[];
  stateGuidesHeading: string;
  stateGuideTagline: Record<ProfessionalTaxStateCode, string>;
  stateGuideBody: Record<ProfessionalTaxStateCode, string>;
  asideSummaryHeading: string;
  asideLabelState: string;
  asideLabelPaymentBasis: string;
  asideLabelSlab: string;
  asideValueSlabEmpty: string;
  paymentBasisMonthly: string;
  paymentBasisHalfYearly: string;
  asideMonthlyTitle: string;
  asideMonthlyEmpty: string;
  asideAnnualTitle: string;
  asideAnnualNote: string;
  tableTitlePrefix: string;
  tableTitleGenderMale: string;
  tableTitleGenderFemale: string;
  tableColRange: string;
  tableColTax: string;
  months: readonly string[];
  stateOptions: Record<ProfessionalTaxStateCode, string>;
  assumptions: Record<ProfessionalTaxStateCode, string>;
  slabs: Record<ProfessionalTaxStateCode, readonly PtSlabRow[]>;
};

const SLABS_MH_FEMALE_KO: readonly PtSlabRow[] = [
  { range: "월 급여 ₹25,000 이하", amount: "면제 (₹0)" },
  {
    range: "예시 slab 기준 — 월 급여 ₹25,001 초과",
    amount: "₹200 / 월 (일부 구간은 2월 ₹300 적용 사례)",
  },
];

const SLABS_MH_FEMALE_EN: readonly PtSlabRow[] = [
  { range: "Monthly salary ≤ ₹25,000", amount: "Exempt (₹0)" },
  {
    range: "Illustrative slab — monthly salary > ₹25,000",
    amount: "₹200 / month (some bands may see ₹300 in February)",
  },
];

const SLABS_MH_FEMALE_ZH: readonly PtSlabRow[] = [
  { range: "月工资 ≤ ₹25,000", amount: "免税 (₹0)" },
  {
    range: "示例分档 — 月工资 > ₹25,000",
    amount: "₹200 / 月（部分情形 2 月适用 ₹300）",
  },
];

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
    {
      range: "예시 slab 기준 — 월 급여 ₹10,001 초과",
      amount: "₹200 / 월 (일부 구간은 2월 ₹300 적용 사례)",
    },
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
    {
      range: "Illustrative slab — monthly salary > ₹10,001",
      amount: "₹200 / month (some bands may see ₹300 in February)",
    },
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
    {
      range: "示例分档 — 月工资 > ₹10,001",
      amount: "₹200 / 月（部分情形 2 月适用 ₹300）",
    },
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
  metaTitle: "Professional Tax (PT) 계산기",
  metaDescription: `${company.shortName} — 인도 주(State)별 직원 PT(Professional Tax) 월 납부액·연간 환산(12개월 기준) 참고(카르나타카·마하라슈트라·안드라프라데시·타밀나두)`,
  pageHeaderTitle: "Professional Tax (PT) 계산기",
  pageHeaderDescription:
    "본 계산기는 일반적인 급여 기준 Professional Tax(PT) 구조를 참고용으로 단순화한 예시입니다. 인도에서는 주(State)마다 직원·사업자에게 부과되는 PT의 요율 및 과세 기준이 다릅니다. 카르나타카, 마하라슈트라, 안드라프라데시, 타밀나두에서 흔히 인용되는 월 급여 구간 예시를 바탕으로 월 납부액 및 연간 환산 금액(12개월 기준)을 안내합니다. 여성·시니어 시티즌·주별 면제·반기 납부 등 예외가 많아, 마하라슈트라 등은 성별·연령에 따라 구간이 달라질 수 있으며, 타밀나두는 행정상 반기 납부인 경우가 많습니다. 실제 납부 기준 및 적용 여부는 주(State)별 최신 규정과 회사 정책에 따라 달라질 수 있으므로, MSV와 별도 검토하시기 바랍니다.",
  sectionRefCalc: "참고 계산",
  disclaimer:
    "Professional Tax 규정은 주(State)별 개정·고시·급여 구조·성별·사업장 등록 유형 등에 따라 달라질 수 있습니다. 본 도구는 참고용이며 법적·세무 자문을 대체하지 않습니다. 면제·반기 납부·등록 유형별 규정 등은 모두 반영되지 않을 수 있으므로, 확정 납부는 MSV와 상담해 주세요.",
  linkServices: "회계 서비스로 돌아가기",
  linkContact: "문의하기",
  fieldState: "주(State) 선택",
  fieldSalary: "월 급여·보수 총액 (INR, 세전 기준)",
  salaryPlaceholder: "예: 85000",
  salaryHint:
    "주(State)별로 과세 대상 급여의 범위와 기준이 다를 수 있습니다. 실제 원천징수 및 납부 기준은 각 주 정부의 규정 및 고시에 따라 달라질 수 있습니다.",
  fieldBaseMonth: "기준 월 (마하라슈트라 일부 구간의 2월 차등 요율 반영용)",
  hintMonthMH:
    "실제 Maharashtra PT는 성별·슬래브·2월 차등·고용 형태 등이 얽혀 복잡할 수 있습니다. 본 계산은 예시이며, 일부 구간에서는 2월에만 월 ₹300이 적용되는 사례가 있습니다.",
  hintMonthOther: "일부 주(State)는 기준 월과 무관하며, 해당 선택값은 표시 목적에만 사용됩니다.",
  fieldGender: "성별 (Gender)",
  genderMale: "Male",
  genderFemale: "Female",
  genderHintMh: "마하라슈트라는 성별에 따라 면제 한도·슬라브가 다릅니다. 위에서 Male/Female을 선택하세요.",
  slabsMhFemale: SLABS_MH_FEMALE_KO,
  stateGuidesHeading: "주(State)별 안내",
  stateGuideTagline: {
    KA: "월 정액형 PT 구조",
    MH: "슬라브 + 2월 차등",
    AP: "월 정액형 슬라브",
    TN: "반기(Half-year) 체계",
  },
  stateGuideBody: {
    KA: "고정 월 납부·3단계 급여 구간이 흔히 인용됩니다. 카르나타카는 일반 급여 기준으로 성별에 따른 별도 슬래브 없이 이해하는 경우가 많습니다.",
    MH: "급여 구간별 월액에 더해 2월에만 요율이 달라지는(예: 일부 구간 ₹300) 사례가 많습니다. 성별에 따라 면제 한도·구간이 다릅니다.",
    AP: "일반적인 3단계 월 납부 구조를 예시로 보여줍니다.",
    TN: "예: Tamil Nadu는 반기(Half-year) 기준 PT 체계를 사용하는 사례가 많습니다. 예를 들어 4월–9월·10월–3월 등으로 나누어 납부하고, 본 화면의 월액은 동일 급여를 가정한 참고용 월 환산입니다.",
  },
  asideSummaryHeading: "적용 요약",
  asideLabelState: "적용 State",
  asideLabelPaymentBasis: "납부 기준",
  asideLabelSlab: "적용 slab",
  asideValueSlabEmpty: "월 급여 입력 후 표시",
  paymentBasisMonthly: "월 기준(표시 월액)",
  paymentBasisHalfYearly: "반기 납부 관행 흔함(월액은 참고 환산)",
  asideMonthlyTitle: "해당 월 Professional Tax",
  asideMonthlyEmpty: "월 급여를 숫자로 입력하면 표시됩니다.",
  asideAnnualTitle: "연간 환산 금액(12개월 기준)",
  asideAnnualNote: "매월 급여가 같다고 가정한 단순 합계입니다. 승진·휴직 등으로 달라지면 실제와 다릅니다.",
  tableTitlePrefix: "Professional Tax 구간 요약",
  tableTitleGenderMale: " · Male",
  tableTitleGenderFemale: " · Female",
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
    KA: "급여소득자(직원) 월별 납부 구간 — Karnataka Tax on Professions, Trades and Callings Act 기준의 일반 급여 예시 3단계 요약입니다.",
    MH: "급여소득자 월별 납부 구간 Maharashtra State Tax on Professions, Trades, Callings and Employments Act 기준의\n일반적으로 인용되는 예시입니다. 성별에 따라 슬래브가 다르므로 Male/Female을 선택하세요.",
    AP: "급여소득자(직원) 월별 납부 구간 — Andhra Pradesh Tax on Profession, Trades, Callings and Employments Act 등에 따른 일반적인 3단계 요약입니다.",
    TN: "급여소득자(직원) 월 급여 기준 구간 — Tamil Nadu Tax on Professions, Trades, Callings and Employments Act에 따른 일반적인 누진 요율입니다. 예: Tamil Nadu는 반기(Half-year) 기준 PT 체계를 사용하는 사례가 많아, 실제 납부 시기·금액은 월액 표시와 다를 수 있습니다.",
  },
  slabs: SLABS_KO,
};

const EN: ProfessionalTaxCalculatorCopy = {
  metaTitle: "Professional Tax (PT) calculator",
  metaDescription: `${company.shortName} — India state-wise employee PT (Professional Tax): monthly liability and annualised 12-month estimate (Karnataka, Maharashtra, Andhra Pradesh, Tamil Nadu)`,
  pageHeaderTitle: "Professional Tax (PT) calculator",
  pageHeaderDescription:
    "This calculator is a simplified, illustrative view of typical salaried Professional Tax (PT) structures for reference only. In India, PT rates and taxable-pay rules differ by state for employees and businesses. The examples use commonly cited monthly salary bands for Karnataka, Maharashtra, Andhra Pradesh and Tamil Nadu. Many exceptions apply—e.g. women, senior citizens, state-specific exemptions and half-yearly collection—so slabs (especially in Maharashtra) can vary by gender and age, and Tamil Nadu is often remitted half-yearly in practice. Confirm timing, mode and your actual liability with MSV or your adviser.",
  sectionRefCalc: "Illustrative calculation",
  disclaimer:
    "Professional Tax rules can differ by state, statutory amendments and notifications, payroll structure, gender, establishment registration type, and more. This tool is for reference only and does not replace legal or tax advice. Exemptions, half-yearly patterns and entity-specific rules may not be fully modelled—please consult MSV before final payment.",
  linkServices: "Back to accounting services",
  linkContact: "Contact us",
  fieldState: "State",
  fieldSalary: "Monthly salary & remuneration (INR, pre-tax)",
  salaryPlaceholder: "e.g. 85000",
  salaryHint:
    "The salary band that is subject to PT can vary by state. Actual withholding and payment follow each state’s statutes and official notifications.",
  fieldBaseMonth: "Reference month (for Maharashtra February differential on some slabs)",
  hintMonthMH:
    "Maharashtra PT in practice depends on gender, slab, February rules and employee type. This page is illustrative; some bands often see ₹300 in February only.",
  hintMonthOther:
    "For some states the month choice does not change the monthly amount; the selection is for display only.",
  fieldGender: "Gender",
  genderMale: "Male",
  genderFemale: "Female",
  genderHintMh: "Maharashtra uses different slabs by gender—select Male or Female above.",
  slabsMhFemale: SLABS_MH_FEMALE_EN,
  stateGuidesHeading: "State highlights",
  stateGuideTagline: {
    KA: "Fixed monthly PT structure",
    MH: "Slabs + February variation",
    AP: "Fixed monthly slabs",
    TN: "Half-year system",
  },
  stateGuideBody: {
    KA: "Common three-step monthly bands. Karnataka is often illustrated without a gender split for general salaried employees.",
    MH: "Monthly bands plus a February top-up on some slabs (e.g. ₹300 in February). Exemption thresholds and bands differ by gender.",
    AP: "Illustrative three-step monthly withholding pattern.",
    TN: "For example, Tamil Nadu often operates on a half-year PT cycle (e.g. Apr–Sep / Oct–Mar). The monthly figure here is a same-salary reference conversion, not your remittance schedule.",
  },
  asideSummaryHeading: "Applied context",
  asideLabelState: "State",
  asideLabelPaymentBasis: "Payment basis",
  asideLabelSlab: "Applied slab",
  asideValueSlabEmpty: "Shown after you enter salary",
  paymentBasisMonthly: "Monthly (amount shown)",
  paymentBasisHalfYearly: "Half-yearly common (monthly is illustrative)",
  asideMonthlyTitle: "Professional Tax (selected month)",
  asideMonthlyEmpty: "Enter a monthly salary figure to see the amount.",
  asideAnnualTitle: "Annualised amount (12 months)",
  asideAnnualNote:
    "Simple sum assuming the same salary every month. Promotions, leave without pay, etc. will differ from real life.",
  tableTitlePrefix: "Professional Tax slab summary",
  tableTitleGenderMale: " · Male",
  tableTitleGenderFemale: " · Female",
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
    KA: "Salaried employee monthly slabs — a common three-step summary under the Karnataka Tax on Professions, Trades and Callings Act (general salaried illustration).",
    MH: "Salaried employee monthly slabs under the Maharashtra State Tax on Professions, Trades, Callings and Employments Act — commonly cited amounts. Slabs differ by gender; pick Male or Female.",
    AP: "Salaried employee monthly slabs — a common three-step summary under the Andhra Pradesh Tax on Profession, Trades, Callings and Employments Act, etc.",
    TN: "Salaried employee monthly salary bands — a common graduated table under the Tamil Nadu Tax on Professions, Trades, Callings and Employments Act. For example, Tamil Nadu often uses a half-year PT cycle, so remittance timing may differ from the monthly figure shown.",
  },
  slabs: SLABS_EN,
};

const ZH: ProfessionalTaxCalculatorCopy = {
  metaTitle: "Professional Tax（PT，职业税）计算器",
  metaDescription: `${company.shortName} — 印度各邦员工 PT（Professional Tax）：月度税额与按相同月薪推算的年度金额（卡纳塔克、马哈拉施特拉、安得拉邦、泰米尔纳德）`,
  pageHeaderTitle: "Professional Tax（PT）计算器",
  pageHeaderDescription:
    "本计算器是对常见受薪场景下 Professional Tax（PT）结构的参考性、简化示例。在印度，各邦对员工与经营者征收的 PT 税率及计税口径不同。以下以卡纳塔克、马哈拉施特拉、安得拉邦、泰米尔纳德中较常引用的月工资分档为例，展示月度应缴税额及按相同月薪推算的年度金额（12 个月）。女性、老年人、各邦减免、半年度缴纳等例外较多；马哈拉施特拉等邦的档位可能因性别、年龄而异，泰米尔纳德实务上多为半年度缴纳。实际时点与金额请咨询 MSV 等专业人士核实。",
  sectionRefCalc: "参考计算",
  disclaimer:
    "Professional Tax 规则会因各邦修法、政府公告、薪酬结构、性别、经营场所登记类型等而不同。本工具仅供参考，不构成法律或税务意见。减免、半年度缴纳及主体类型等情形可能未完全体现，最终缴纳请咨询 MSV。",
  linkServices: "返回会计服务",
  linkContact: "联系我们",
  fieldState: "邦 / 州（State）",
  fieldSalary: "月工资及报酬总额（INR，税前）",
  salaryPlaceholder: "例：85000",
  salaryHint:
    "各邦对应税工资的范围与口径可能不同。实际预扣与缴纳以各邦法规及政府公告为准。",
  fieldBaseMonth: "基准月份（用于马哈拉施特拉部分区间 2 月差额税率）",
  hintMonthMH:
    "马哈拉施特拉 PT 实务中受性别、分档、2 月规则及雇员类型等影响，结构较复杂。本页为示例；部分分档常见仅在 2 月按每月 ₹300 计缴。",
  hintMonthOther: "部分邦的月度税额与基准月份无关，此项仅作界面展示。",
  fieldGender: "性别 (Gender)",
  genderMale: "Male",
  genderFemale: "Female",
  genderHintMh: "马哈拉施特拉按性别适用不同区间，请在上方选择男性或女性。",
  slabsMhFemale: SLABS_MH_FEMALE_ZH,
  stateGuidesHeading: "各邦要点",
  stateGuideTagline: {
    KA: "按月定额型 PT",
    MH: "分档 + 2 月差额",
    AP: "按月分档",
    TN: "半年度体系",
  },
  stateGuideBody: {
    KA: "常见三档月工资结构。卡纳塔克在一般受薪场景下常不按性别拆分示例。",
    MH: "除分档月额外，部分区间仅在 2 月按更高月额（如 ₹300）计缴；男女适用不同的免征额与分档。",
    AP: "以常见三档月缴结构作示例。",
    TN: "例如，泰米尔纳德实务上多采用半年度（Half-year）PT 安排（如 4–9 月、10–次年 3 月等）。本页月税额为相同月薪下的参考换算，不等于实际汇缴时点与金额。",
  },
  asideSummaryHeading: "适用摘要",
  asideLabelState: "适用 State",
  asideLabelPaymentBasis: "缴纳口径",
  asideLabelSlab: "适用分档",
  asideValueSlabEmpty: "输入月工资后显示",
  paymentBasisMonthly: "按月（所示月税额）",
  paymentBasisHalfYearly: "多见半年度缴纳（月额为参考换算）",
  asideMonthlyTitle: "当月 Professional Tax",
  asideMonthlyEmpty: "请输入月工资数字后显示。",
  asideAnnualTitle: "年度折算金额（12 个月）",
  asideAnnualNote: "假设每月工资相同的简单加总；晋升、停薪留职等会导致与实际情况不同。",
  tableTitlePrefix: "Professional Tax 区间摘要",
  tableTitleGenderMale: " · Male",
  tableTitleGenderFemale: " · Female",
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
    KA: "受薪雇员按月缴纳区间——依据《卡纳塔克职业、行业与执业税法》的常见三档摘要（一般受薪示例）。",
    MH: "受薪雇员按月缴纳区间——依据《马哈拉施特拉邦职业、行业、执业与雇佣税法》的常见引用示例；男女分档不同，请选择男性或女性。",
    AP: "受薪雇员按月缴纳区间——依据《安得拉邦职业、行业、执业与雇佣税法》等的常见三档摘要。",
    TN: "受薪雇员按月工资分档——依据《泰米尔纳德职业、行业与执业税法》的常见累进税率。例如泰米尔纳德多见半年度（Half-year）PT 体系，实际汇缴时点可能与按月展示金额不一致。",
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
