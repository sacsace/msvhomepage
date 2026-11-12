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
  fieldStateHint: string;
  fieldSalary: string;
  salaryPlaceholder: string;
  salaryHint: string;
  fieldBaseMonth: string;
  hintMonthFebDiff: string;
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
  slabs: Record<ProfessionalTaxStateCode, readonly PtSlabRow[]>;
};

const SLABS_MH_FEMALE_KO: readonly PtSlabRow[] = [
  { range: "월 급여 ₹25,000 이하", amount: "면제 (₹0)" },
  {
    range: "월 급여 ₹25,001 초과",
    amount: "월 ₹200 · 2월 ₹300",
  },
];

const SLABS_MH_FEMALE_EN: readonly PtSlabRow[] = [
  { range: "Monthly salary ≤ ₹25,000", amount: "Exempt (₹0)" },
  {
    range: "Monthly salary > ₹25,000",
    amount: "₹200 / month · ₹300 in February",
  },
];

const SLABS_MH_FEMALE_ZH: readonly PtSlabRow[] = [
  { range: "月工资 ≤ ₹25,000", amount: "免税 (₹0)" },
  {
    range: "月工资 > ₹25,000",
    amount: "月 ₹200 · 2月 ₹300",
  },
];

const MONTHS_KO = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"] as const;
const MONTHS_EN = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] as const;
const MONTHS_ZH = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"] as const;

const SLABS_KO: Record<ProfessionalTaxStateCode, readonly PtSlabRow[]> = {
  KA: [
    { range: "월 급여 ₹25,000 미만", amount: "면제" },
    { range: "월 급여 ₹25,000 이상", amount: "월 ₹200 · 2월 ₹300" },
  ],
  MH: [
    { range: "월 급여 ₹7,500 이하", amount: "면제 (₹0)" },
    { range: "월 급여 ₹7,501 ~ ₹10,000", amount: "₹175 / 월" },
    {
      range: "월 급여 ₹10,001 초과",
      amount: "월 ₹200 · 2월 ₹300",
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
    { range: "Monthly salary < ₹25,000", amount: "Exempt" },
    { range: "Monthly salary ≥ ₹25,000", amount: "₹200 / month · ₹300 in February" },
  ],
  MH: [
    { range: "Monthly salary ≤ ₹7,500", amount: "Exempt (₹0)" },
    { range: "Monthly salary ₹7,501–₹10,000", amount: "₹175 / month" },
    {
      range: "Monthly salary > ₹10,000",
      amount: "₹200 / month · ₹300 in February",
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
    { range: "月工资 < ₹25,000", amount: "免税" },
    { range: "月工资 ≥ ₹25,000", amount: "月 ₹200 · 2月 ₹300" },
  ],
  MH: [
    { range: "月工资 ≤ ₹7,500", amount: "免税 (₹0)" },
    { range: "月工资 ₹7,501–₹10,000", amount: "₹175 / 月" },
    {
      range: "月工资 > ₹10,000",
      amount: "月 ₹200 · 2月 ₹300",
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
  metaDescription: `${company.shortName} · 인도 근무지 주별 Professional Tax 예상 세액(카르나타카·마하라슈트라·안드라프라데시·타밀나두)`,
  pageHeaderTitle: "Professional Tax (PT) 계산기",
  pageHeaderDescription:
    "근무 지역과 월 급여를 기준으로 Professional Tax(PT) 예상 세액을 계산합니다. 카르나타카, 마하라슈트라, 안드라프라데시, 타밀나두의 급여소득자를 대상으로 월별 세액과 연간 예상액을 안내합니다.\n\n과세 기준과 면제 요건은 지역에 따라 다르며, 개인사업자 등의 등록·납부 세액은 본 계산에 포함되지 않습니다. 계산 결과는 참고용이며, 정확한 적용 기준은 MSV에 문의해 주세요.",
  sectionRefCalc: "Professional Tax 예상 세액 계산",
  disclaimer:
    "본 계산 결과는 참고용입니다. 실제 세액은 근무지, 과세 대상 급여, 면제 요건 및 적용 시점의 규정에 따라 달라질 수 있습니다. 정확한 원천징수·납부 금액은 MSV에 문의해 주세요.",
  linkServices: "회계 서비스로 돌아가기",
  linkContact: "문의하기",
  fieldState: "근무지 주(State) 선택",
  fieldStateHint: "선택한 근무지의 급여소득자 Professional Tax 기준을 적용합니다.",
  fieldSalary: "월 세전 급여 (INR)",
  salaryPlaceholder: "예: 85000",
  salaryHint: "공제 전 월 급여를 입력하세요. 과세 대상 급여의 범위와 면제 요건은 주별로 다를 수 있습니다.",
  fieldBaseMonth: "급여 귀속월",
  hintMonthFebDiff:
    "카르나타카와 마하라슈트라는 과세 대상자의 2월 세액이 다른 달과 다르므로, 해당 월을 선택해 주세요.",
  hintMonthOther: "이 주에서는 급여 귀속월이 월 세액에 영향을 주지 않습니다. 표시용으로만 사용됩니다.",
  fieldGender: "성별",
  genderMale: "남성",
  genderFemale: "여성",
  genderHintMh: "마하라슈트라는 성별에 따라 면제 한도와 급여 구간이 다릅니다.",
  slabsMhFemale: SLABS_MH_FEMALE_KO,
  stateGuidesHeading: "주(State)별 안내",
  stateGuideTagline: {
    KA: "면제 한도 이상 월 정액 · 2월 세액 별도",
    MH: "급여 구간별 과세 · 2월 세액 별도 적용",
    AP: "급여 구간별 월 정액 과세",
    TN: "반기별 과세",
  },
  stateGuideBody: {
    KA: "일반 급여소득자 기준 ₹25,000 미만은 면제, 이상이면 월 ₹200(2월 ₹300)입니다.\n별도 면제 대상은 이 계산에 포함하지 않습니다.",
    MH: "급여 구간별 월액에 더해, 과세 대상자는 2월 세액이 달라질 수 있습니다.\n성별에 따라 면제 한도와 구간이 다릅니다.",
    AP: "일반적인 3단계 월 정액 구조를 예시로 보여 줍니다.",
    TN: "지자체(예: Chennai Corporation 등)별로 반기 납부가 흔합니다(예: 4–9월, 10–3월).\n화면의 월액은 동일 급여를 가정한 월 환산 참고액입니다.",
  },
  asideSummaryHeading: "계산 결과",
  asideLabelState: "적용 주",
  asideLabelPaymentBasis: "과세 기준",
  asideLabelSlab: "적용 급여 구간",
  asideValueSlabEmpty: "월 급여를 입력해 주세요",
  paymentBasisMonthly: "월 기준",
  paymentBasisHalfYearly: "반기 납부 관행(월액은 참고)",
  asideMonthlyTitle: "해당 월 예상 세액",
  asideMonthlyEmpty: "월 급여를 입력해 주세요",
  asideAnnualTitle: "연간 예상 세액",
  asideAnnualNote:
    "동일한 월 급여로 12개월 근무한다고 가정한 예상액입니다. 월별 세액 차이를 반영하며, 급여 변동이나 입·퇴사 등에 따라 실제 세액은 달라질 수 있습니다.",
  tableTitlePrefix: "Professional Tax 구간 요약",
  tableTitleGenderMale: " · 남성",
  tableTitleGenderFemale: " · 여성",
  tableColRange: "월 급여",
  tableColTax: "적용 세액",
  months: MONTHS_KO,
  stateOptions: {
    KA: "카르나타카(Karnataka)",
    MH: "마하라슈트라(Maharashtra)",
    AP: "안드라프라데시(Andhra Pradesh)",
    TN: "타밀나두(Tamil Nadu)",
  },
  slabs: SLABS_KO,
};

const EN: ProfessionalTaxCalculatorCopy = {
  metaTitle: "Professional Tax (PT) calculator",
  metaDescription: `${company.shortName} · Estimated employee Professional Tax by Indian work state (Karnataka, Maharashtra, Andhra Pradesh, Tamil Nadu)`,
  pageHeaderTitle: "Professional Tax (PT) calculator",
  pageHeaderDescription:
    "Estimate Professional Tax (PT) from your work state and monthly salary. For salaried employees in Karnataka, Maharashtra, Andhra Pradesh and Tamil Nadu, we show monthly tax and an annual estimate.\n\nTaxable rules and exemptions differ by state. Registration and remittance amounts for sole proprietors and similar cases are not included. Results are for reference only — confirm the correct basis with MSV.",
  sectionRefCalc: "Estimated Professional Tax",
  disclaimer:
    "Results are for reference only. Actual tax depends on work state, taxable salary, exemptions and the rules in force. For exact withholding and remittance amounts, contact MSV.",
  linkServices: "Back to accounting services",
  linkContact: "Contact us",
  fieldState: "Work state",
  fieldStateHint: "Applies the salaried Professional Tax rules for the selected work state.",
  fieldSalary: "Monthly pre-tax salary (INR)",
  salaryPlaceholder: "e.g. 85000",
  salaryHint: "Enter monthly salary before deductions. Taxable pay and exemptions can differ by state.",
  fieldBaseMonth: "Salary month",
  hintMonthFebDiff:
    "In Karnataka and Maharashtra, February tax for taxable employees differs from other months — select the relevant month.",
  hintMonthOther: "For this state, salary month does not change the monthly amount; selection is for display only.",
  fieldGender: "Gender",
  genderMale: "Male",
  genderFemale: "Female",
  genderHintMh: "Maharashtra uses different exemption thresholds and salary bands by gender.",
  slabsMhFemale: SLABS_MH_FEMALE_EN,
  stateGuidesHeading: "State notes",
  stateGuideTagline: {
    KA: "Fixed monthly amount above threshold · February separate",
    MH: "Salary-band tax · February amount separate",
    AP: "Fixed monthly amount by salary band",
    TN: "Half-yearly assessment",
  },
  stateGuideBody: {
    KA: "For general salaried employees: under ₹25,000 exempt; ₹25,000+ is ₹200/month (₹300 in February).\nSpecial exemption categories are not included here.",
    MH: "Monthly bands plus a different February amount for taxable employees.\nExemption thresholds and bands differ by gender.",
    AP: "Illustrative three-step monthly fixed amounts.",
    TN: "Half-yearly remittance is common (e.g. Apr–Sep / Oct–Mar).\nThe monthly figure here is a same-salary reference only.",
  },
  asideSummaryHeading: "Result",
  asideLabelState: "Applied state",
  asideLabelPaymentBasis: "Assessment basis",
  asideLabelSlab: "Applied salary band",
  asideValueSlabEmpty: "Enter monthly salary",
  paymentBasisMonthly: "Monthly",
  paymentBasisHalfYearly: "Half-yearly common (monthly is illustrative)",
  asideMonthlyTitle: "Estimated tax for selected month",
  asideMonthlyEmpty: "Enter monthly salary",
  asideAnnualTitle: "Estimated annual tax",
  asideAnnualNote:
    "Assumes the same monthly salary for 12 months and reflects month-to-month differences. Actual tax may differ with pay changes or join/leave dates.",
  tableTitlePrefix: "Professional Tax band summary",
  tableTitleGenderMale: " · Male",
  tableTitleGenderFemale: " · Female",
  tableColRange: "Monthly salary",
  tableColTax: "Tax amount",
  months: MONTHS_EN,
  stateOptions: {
    KA: "Karnataka",
    MH: "Maharashtra",
    AP: "Andhra Pradesh",
    TN: "Tamil Nadu",
  },
  slabs: SLABS_EN,
};

const ZH: ProfessionalTaxCalculatorCopy = {
  metaTitle: "Professional Tax（PT，职业税）计算器",
  metaDescription: `${company.shortName} · 按印度工作地邦估算员工 Professional Tax（卡纳塔克、马哈拉施特拉、安得拉邦、泰米尔纳德）`,
  pageHeaderTitle: "Professional Tax（PT）计算器",
  pageHeaderDescription:
    "根据工作地区与月工资估算 Professional Tax（PT）。面向卡纳塔克、马哈拉施特拉、安得拉邦、泰米尔纳德的受薪员工，提供月度税额与全年预估。\n\n征税口径与减免条件因地区而异；个体经营者等的登记与缴纳金额不在本计算范围内。结果仅供参考，准确适用标准请咨询 MSV。",
  sectionRefCalc: "Professional Tax 预计税额",
  disclaimer:
    "计算结果仅供参考。实际税额取决于工作地、应税工资、减免条件及当时有效规定。准确的预扣与缴纳金额请咨询 MSV。",
  linkServices: "返回会计服务",
  linkContact: "联系我们",
  fieldState: "工作地邦（State）",
  fieldStateHint: "按所选工作地适用受薪员工 Professional Tax 规则。",
  fieldSalary: "月税前工资（INR）",
  salaryPlaceholder: "例：85000",
  salaryHint: "请输入扣款前的月工资。应税工资范围与减免条件可能因邦而异。",
  fieldBaseMonth: "工资所属月",
  hintMonthFebDiff: "卡纳塔克与马哈拉施特拉对纳税人的 2 月税额与其他月份不同，请选择对应月份。",
  hintMonthOther: "该邦的工资所属月不影响月税额，仅作界面展示。",
  fieldGender: "性别",
  genderMale: "男",
  genderFemale: "女",
  genderHintMh: "马哈拉施特拉按性别适用不同的免征额与工资分档。",
  slabsMhFemale: SLABS_MH_FEMALE_ZH,
  stateGuidesHeading: "各邦要点",
  stateGuideTagline: {
    KA: "超免征额按月定额 · 2 月单独",
    MH: "按工资分档征税 · 2 月税额单独适用",
    AP: "按工资分档月定额征税",
    TN: "半年度征税",
  },
  stateGuideBody: {
    KA: "一般受薪员工：月工资低于 ₹25,000 免税；达到及以上为每月 ₹200（2 月 ₹300）。\n特殊减免对象未纳入本计算。",
    MH: "按工资分档计月税额，纳税人 2 月税额可不同。\n男女免征额与分档不同。",
    AP: "以常见三档月定额结构作示例。",
    TN: "多见半年度缴纳（如 4–9 月、10–3 月）。\n本页月税额为相同月薪下的参考值。",
  },
  asideSummaryHeading: "计算结果",
  asideLabelState: "适用邦",
  asideLabelPaymentBasis: "征税口径",
  asideLabelSlab: "适用工资区间",
  asideValueSlabEmpty: "请输入月工资",
  paymentBasisMonthly: "按月",
  paymentBasisHalfYearly: "多见半年度缴纳（月额为参考）",
  asideMonthlyTitle: "当月预计税额",
  asideMonthlyEmpty: "请输入月工资",
  asideAnnualTitle: "全年预计税额",
  asideAnnualNote:
    "假设以相同月工资工作 12 个月，并反映月份间税额差异。工资变动或入离职等会使实际税额不同。",
  tableTitlePrefix: "Professional Tax 区间摘要",
  tableTitleGenderMale: " · 男",
  tableTitleGenderFemale: " · 女",
  tableColRange: "月工资",
  tableColTax: "适用税额",
  months: MONTHS_ZH,
  stateOptions: {
    KA: "卡纳塔克邦 (Karnataka)",
    MH: "马哈拉施特拉邦 (Maharashtra)",
    AP: "安得拉邦 (Andhra Pradesh)",
    TN: "泰米尔纳德邦 (Tamil Nadu)",
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
