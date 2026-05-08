import type { SiteLocale } from "@/lib/site-locale";
import { pickLocale } from "@/lib/site-locale";
import { company } from "@/lib/site-content";
import type { AccountingServiceBlock } from "@/lib/site-content";
import {
  accountingServiceBlocks,
  indiaComplianceAnnualRows,
  indiaComplianceMonthlyRows,
  indiaCompliancePortalRows,
  indiaComplianceQuarterlyRows,
  indiaComplianceScheduleIntro,
  sampleProjects,
  services,
} from "@/lib/site-content";

export type ServiceLineItem = { title: string; description: string };
export type CaseItem = { name: string; note: string; due: string };
export type ComplianceRow = { item: string; schedule: string };
export type PortalRow = { label: string; href: string; note: string };

export type ServicesMenuLink = {
  path: string;
  label: string;
  /** 현재 `/services` 페이지 카드 강조 */
  current?: boolean;
};

export type AccountingServicesPageCopy = {
  metaTitle: string;
  metaDescription: string;
  pageTitle: string;
  pageDescription: string;
  menuTitle: string;
  menuIntro: string;
  menuLinks: readonly ServicesMenuLink[];
  coreEyebrow: string;
  coreTitle: string;
  coreIntro: string;
  coreServices: readonly ServiceLineItem[];
  detailTitle: string;
  detailIntro: string;
  processTitle: string;
  processByline: string;
  processSteps: readonly string[];
  highlights: readonly { title: string; description: string }[];
  lineupEyebrow: string;
  lineupTitle: string;
  lineupIntro: string;
  accountingBlocks: readonly AccountingServiceBlock[];
  complianceTitle: string;
  complianceIntro: string;
  complianceMonthlyHeading: string;
  complianceQuarterlyHeading: string;
  complianceAnnualHeading: string;
  complianceMonthlyCaption: string;
  complianceQuarterlyCaption: string;
  complianceAnnualCaption: string;
  compliancePortalTitle: string;
  compliancePortalNote: string;
  complianceThItem: string;
  complianceThSchedule: string;
  complianceThCategory: string;
  complianceThLink: string;
  complianceThNote: string;
  complianceMonthlyRows: readonly ComplianceRow[];
  complianceQuarterlyRows: readonly ComplianceRow[];
  complianceAnnualRows: readonly ComplianceRow[];
  compliancePortalRows: readonly PortalRow[];
  casesEyebrow: string;
  casesTitle: string;
  casesIntro: string;
  sampleCases: readonly CaseItem[];
};

const koMenuLinks: readonly ServicesMenuLink[] = [
  { path: "/services/corporate-incorporation", label: "법인 설립 서비스" },
  { path: "/services", label: "회계 서비스", current: true },
  { path: "/services/india-accounting-glossary", label: "인도 회계 용어집" },
  { path: "/services/license-registration", label: "라이센스 등록 서비스" },
  { path: "/services/recruitment-support", label: "채용지원 서비스" },
  { path: "/services/frro", label: "FRRO 서비스" },
  { path: "/services/ecb", label: "ECB 안내" },
  { path: "/services/form-41-registration", label: "Form 41(구 Form 10F) 등록 서비스" },
  { path: "/services/personal-income-tax-calculator", label: "개인 소득세 계산기" },
  { path: "/services/corporate-tax-calculator", label: "법인세 계산기" },
  { path: "/services/professional-tax-calculator", label: "Professional Tax 계산기" },
];

const koProcessSteps = [
  "고객사 계정과목 요청 및 계정과목 체계 확정",
  "확정된 계정과목 기준으로 거래 분류 후 기장 시작",
  "지출결의서 작성 및 증빙 검토",
  "내부 승인권자 승인 완료",
  "승인 완료 건을 회계 프로그램에 입력하고 증빙 매칭",
  "월/분기 마감 후 세금 신고(GST·TDS·Advance Tax 등) 진행",
] as const;

const koHighlights = [
  {
    title: "계정과목 체계 설계",
    description: "고객사 보고 포맷과 내부 정책을 반영해 계정과목 체계를 먼저 확정합니다.",
  },
  {
    title: "증빙·승인 기반 기장",
    description: "지출결의서와 승인 흐름을 기준으로 증빙을 정리하고 회계 프로그램에 정확히 반영합니다.",
  },
  {
    title: "신고·보고 통합 운영",
    description: "월/분기 마감 후 GST·TDS·Advance Tax와 RBI 보고 항목까지 연동해 관리합니다.",
  },
] as const;

const ko: AccountingServicesPageCopy = {
  metaTitle: "서비스",
  metaDescription: "법인 컨설팅·회계·세무·컴플라이언스 등 인도 현지 직접 실행형 서비스 라인과 사례",
  pageTitle: "회계 서비스",
  pageDescription: "법인 컨설팅·회계 사업부에서 제공하는 인도 현지 직접 실행형 서비스입니다.",
  menuTitle: "서비스 메뉴",
  menuIntro: "필요한 서비스 유형을 선택해 상세 페이지에서 지원 범위를 확인하세요.",
  menuLinks: koMenuLinks,
  coreEyebrow: "Service lines",
  coreTitle: "핵심 서비스",
  coreIntro: "법인 컨설팅·회계 사업부에서 인도 현지에서 직접 실행하는 서비스입니다.",
  coreServices: services,
  detailTitle: "회계 서비스 상세 안내",
  detailIntro: "정기 회계·세무 라인업에 실제 운영 프로세스와 주요 신고 항목을 함께 반영해 안내합니다.",
  processTitle: "회계 운영 프로세스 (고객사 협업형)",
  processByline: "Account Mapping → Booking → Approval → Filing",
  processSteps: koProcessSteps,
  highlights: koHighlights,
  lineupEyebrow: "Accounting & Tax",
  lineupTitle: "회계·세무 서비스 라인업",
  lineupIntro:
    "상근 공인회계사 체계로 정기·연간·건단위 업무를 지원합니다. 구체 범위·견적은 사업 규모와 자료 검토 후 안내드립니다.",
  accountingBlocks: accountingServiceBlocks,
  complianceTitle: "인도 법인 기간별 법정 신고·컴플라이언스 일정",
  complianceIntro: indiaComplianceScheduleIntro,
  complianceMonthlyHeading: "월별",
  complianceQuarterlyHeading: "분기별",
  complianceAnnualHeading: "연도별",
  complianceMonthlyCaption: "월별 신고·납부",
  complianceQuarterlyCaption: "분기별 신고·납부",
  complianceAnnualCaption: "연도별 신고·납부",
  compliancePortalTitle: "주요 정부·포털(참고)",
  compliancePortalNote: "실제 로그인·메뉴명은 포털 개편에 따라 달라질 수 있습니다.",
  complianceThItem: "항목",
  complianceThSchedule: "일정·요건(요약)",
  complianceThCategory: "구분",
  complianceThLink: "링크",
  complianceThNote: "비고",
  complianceMonthlyRows: indiaComplianceMonthlyRows,
  complianceQuarterlyRows: indiaComplianceQuarterlyRows,
  complianceAnnualRows: indiaComplianceAnnualRows,
  compliancePortalRows: indiaCompliancePortalRows,
  casesEyebrow: "Cases",
  casesTitle: "프로필 프로젝트 예시",
  casesIntro: "회사 프로필에 수록된 사례입니다.",
  sampleCases: sampleProjects,
};

const enMenuLinks: readonly ServicesMenuLink[] = [
  { path: "/services/corporate-incorporation", label: "Corporate incorporation" },
  { path: "/services", label: "Accounting services", current: true },
  { path: "/services/india-accounting-glossary", label: "India accounting glossary" },
  { path: "/services/license-registration", label: "Licence registration" },
  { path: "/services/recruitment-support", label: "Recruitment support" },
  { path: "/services/frro", label: "FRRO services" },
  { path: "/services/ecb", label: "ECB guide" },
  { path: "/services/form-41-registration", label: "Form 41 (ex Form 10F) registration" },
  { path: "/services/personal-income-tax-calculator", label: "Personal income tax calculator" },
  { path: "/services/corporate-tax-calculator", label: "Corporate tax calculator" },
  { path: "/services/professional-tax-calculator", label: "Professional tax calculator" },
];

const enProcessSteps = [
  "Request and finalise the chart of accounts with the client",
  "Classify transactions and begin bookkeeping against the agreed chart",
  "Prepare expense reports and review supporting documents",
  "Complete internal approver sign-off",
  "Post approved entries in the accounting system and match evidence",
  "Close the month/quarter and run tax filings (GST, TDS, advance tax, etc.)",
] as const;

const enHighlights = [
  {
    title: "Chart of accounts design",
    description: "We align the chart with your group reporting format and internal policies before go-live.",
  },
  {
    title: "Evidence- and approval-driven bookkeeping",
    description: "Expense workflows and approvals drive how documents are organised and posted.",
  },
  {
    title: "Integrated filings and reporting",
    description: "After month- and quarter-end close we coordinate GST, TDS, advance tax and RBI reporting.",
  },
] as const;

const enCoreServices: readonly ServiceLineItem[] = [
  {
    title: "Accounting, tax & compliance",
    description:
      "Bookkeeping, audit and tax filings (GST, TDS, etc.) on IFRS and Indian rules, with in-house CPA support for entity structuring.",
  },
  {
    title: "Incorporation & licensing",
    description:
      "End-to-end local execution from manufacturing setups through PAN, GST, import/export codes, office leases and related permits.",
  },
  {
    title: "Import/export & sourcing",
    description:
      "Trade administration, buyer and vendor matching, exhibition support, factory visit interpretation and more under one team.",
  },
  {
    title: "HR, expatriates & FRRO",
    description:
      "Recruitment support, expatriate visas and FRRO filings, contract review and other HR and admin work handled in-house.",
  },
  {
    title: "Hotels, real estate & feasibility",
    description:
      "Site visits, investment memos, feasibility studies, brokerage introductions and legal coordination for hotel and property projects.",
  },
  {
    title: "Non-stop operations support",
    description:
      "Corporate administration, ledgers, group reporting and ERP rollout/training from incorporation through steady-state operations.",
  },
];

const enAccountingBlocks: readonly AccountingServiceBlock[] = [
  {
    eyebrow: "Recurring",
    title: "Recurring accounting & tax",
    subtitle:
      "Monthly accounting and tax execution, payroll/statutory contributions, and integrated Indian filings including RBI reporting.",
    items: [
      "Chart-of-accounts request and sign-off (aligned with HQ reporting)",
      "Transaction classification and bookkeeping start",
      "Expense report preparation, review and approval workflow",
      "Posting approved entries with document matching",
      "Month-end close and ledger maintenance (bank, AP, AR, expense accounts)",
      "GST purchases/sales returns and ITC management",
      "TDS monthly/quarterly returns and reconciliations",
      "Advance tax computation, filing and payment schedule",
      "SFT (specified financial transaction) support",
      "FLA (foreign assets/liabilities) preparation and filing",
      "DPT-3 (deposits and similar) compliance",
      "FDI reporting (RBI FIRMS: FC-GPR/FC-TRS/FLA) and related FEMA filings",
      "Compliance around capital changes and shareholder movements",
      "PF and ESI computation and remittance",
      "Professional tax registration, state-specific cycles and payments",
    ],
  },
  {
    eyebrow: "Annual",
    title: "Annual audit & filings",
    subtitle: "Audit scope and submission timelines are agreed up front based on year, revenue and transaction volume.",
    items: [
      "Tax and financial statement audit (annual; scope after AP/AR review)",
      "GST audit (where annual turnover thresholds apply)",
      "Transfer pricing audit report (when required)",
    ],
  },
  {
    eyebrow: "Ad hoc",
    title: "Other services",
    subtitle: "One-off issues, per-person filings and ad hoc regulatory or tax requests handled quickly.",
    items: [
      "Director addition/removal (per person)",
      "Form 15CA/CB certification for non-resident remittances (per transaction)",
      "ECB, Form 41 (ex Form 10F) and DTAA support (where applicable)",
      "DIR-3 KYC (annual director ID refresh, per person)",
      "CPA sign-off on documents (per engagement)",
    ],
  },
];

const enComplianceIntro =
  "The tables below summarise typical Indian company obligations. Actual due dates depend on industry, registration type, turnover, state law and legislative changes—please confirm calendars with your engagement CPA before relying on them.";

const enComplianceMonthly: readonly ComplianceRow[] = [
  { item: "TDS", schedule: "Return and payment by the 7th of the following month (where applicable)" },
  { item: "GSTR-1", schedule: "Due by the 11th for monthly filers (sales data)" },
  { item: "GSTR-3B", schedule: "Due by the 20th for monthly filers (ITC and net tax)" },
  { item: "PF (provident fund)", schedule: "Due by the 15th (where applicable)" },
  { item: "ESI", schedule: "Due by the 15th (where applicable)" },
  { item: "Professional tax", schedule: "Due by the 20th (rules vary by state)" },
  {
    item: "ECB (external commercial borrowing)",
    schedule: "ECB-2 and related RBI FIRMS filings by the 7th of the next month when a balance is outstanding",
  },
];

const enComplianceQuarterly: readonly ComplianceRow[] = [
  {
    item: "Advance tax",
    schedule: "15 Jun 15% · 15 Sep 45% · 15 Dec 75% · 15 Mar 100% (illustrative corporate instalments)",
  },
  {
    item: "TDS return",
    schedule: "Q1 (Apr–Jun) 31 Jul · Q2 (Jul–Sep) 31 Oct · Q3 (Oct–Dec) 31 Jan · Q4 (Jan–Mar) 31 May",
  },
  {
    item: "Board meetings",
    schedule:
      "First board within 30 days of incorporation, at least four meetings per year, maximum 120 days between meetings (Companies Act)",
  },
  {
    item: "GSTR-1 (quarterly)",
    schedule: "13th of the month after the quarter for QRMP/quarterly filers under prescribed turnover limits",
  },
  {
    item: "GSTR-3B (quarterly)",
    schedule: "22nd–24th of the month after the quarter for QRMP/quarterly filers under prescribed turnover limits",
  },
];

const enComplianceAnnual: readonly ComplianceRow[] = [
  { item: "DIR-3 KYC", schedule: "By 30 September (non-compliance may deactivate DIN)" },
  { item: "Professional tax annual return", schedule: "1–30 April (state dependent)" },
  { item: "SFT", schedule: "1–31 May (where applicable)" },
  { item: "FLA", schedule: "1–20 July (where applicable)" },
  { item: "Statutory audit of financial statements", schedule: "Before 30 September (as agreed)" },
  { item: "Corporate income tax return (ITR)", schedule: "Before 30 September (general deadline; extensions may apply)" },
  { item: "ROC AOC-4 / MGT-7 (or MGT-7A)", schedule: "Before 30 October (general deadline)" },
  { item: "TP audit report", schedule: "Before 30 November (where international transactions apply)" },
  {
    item: "GSTR-9 (annual GST)",
    schedule: "Mandatory above INR 2 Cr turnover; optional below—subject to annual notifications",
  },
  {
    item: "GSTR-9C (GST reconciliation/audit)",
    schedule: "Currently generally optional—watch government circulars for changes",
  },
];

const enPortalRows: readonly PortalRow[] = [
  { label: "GST", href: "https://www.gst.gov.in", note: "GST portal" },
  {
    label: "e-Filing (income tax)",
    href: "https://portal.incometaxindiaefiling.gov.in",
    note: "Corporate and personal income tax",
  },
  { label: "Traces (TDS)", href: "https://www.tdscpc.gov.in", note: "TDS certificates and forms" },
  { label: "FRRO", href: "https://indianfrro.gov.in", note: "Visa and stay formalities" },
  { label: "FIRMS (RBI)", href: "https://firms.rbi.org.in", note: "FDI, ECB and forex reporting" },
  { label: "E-way bill", href: "https://ewaybillgst.gov.in", note: "Goods movement" },
  { label: "Ice Gate", href: "https://www.icegate.gov.in", note: "Customs duty payment" },
  { label: "MCA", href: "https://www.mca.gov.in", note: "Ministry of corporate affairs / ROC" },
];

const enSampleCases: readonly CaseItem[] = [
  {
    name: "Incorporation & licensing project",
    note: "Pan-India · manufacturing entity and permits",
    due: "Completed June 2024 (per company profile)",
  },
  {
    name: "Real estate diligence & hotel acquisition review",
    note: "Site visits, licensing path and feasibility",
    due: "Representative profile project",
  },
  {
    name: "Partner development & supplier plant tour",
    note: "Exhibitions, interpretation, matching and transport",
    due: "Completed February 2024 (per company profile)",
  },
];

const en: AccountingServicesPageCopy = {
  metaTitle: "Services",
  metaDescription: `${company.shortName} — on-the-ground accounting, tax, compliance and consulting lines in India, with representative case studies.`,
  pageTitle: "Accounting services",
  pageDescription:
    "End-to-end accounting and tax execution delivered by our India consulting & accounting practice without outsourcing core work.",
  menuTitle: "Service menu",
  menuIntro: "Choose a line to open its detail page and review scope and support.",
  menuLinks: enMenuLinks,
  coreEyebrow: "Service lines",
  coreTitle: "Core service lines",
  coreIntro: "What our consulting & accounting teams execute locally in India.",
  coreServices: enCoreServices,
  detailTitle: "Accounting services in depth",
  detailIntro: "We combine recurring accounting and tax coverage with the operating cadence and headline filing items you should plan for.",
  processTitle: "Operating cadence (client collaboration)",
  processByline: "Account mapping → Booking → Approval → Filing",
  processSteps: enProcessSteps,
  highlights: enHighlights,
  lineupEyebrow: "Accounting & tax",
  lineupTitle: "Accounting & tax lineup",
  lineupIntro:
    "Delivered by in-house CPAs across recurring, annual and ad hoc mandates. Commercial scope and fees are confirmed after scoping and document review.",
  accountingBlocks: enAccountingBlocks,
  complianceTitle: "Illustrative Indian corporate compliance calendar",
  complianceIntro: enComplianceIntro,
  complianceMonthlyHeading: "Monthly",
  complianceQuarterlyHeading: "Quarterly",
  complianceAnnualHeading: "Annual",
  complianceMonthlyCaption: "Monthly filings and payments",
  complianceQuarterlyCaption: "Quarterly filings and payments",
  complianceAnnualCaption: "Annual filings and payments",
  compliancePortalTitle: "Key government portals (reference)",
  compliancePortalNote: "Actual login paths and menu labels may change when portals are updated.",
  complianceThItem: "Item",
  complianceThSchedule: "Timing / requirement (summary)",
  complianceThCategory: "Category",
  complianceThLink: "Link",
  complianceThNote: "Notes",
  complianceMonthlyRows: enComplianceMonthly,
  complianceQuarterlyRows: enComplianceQuarterly,
  complianceAnnualRows: enComplianceAnnual,
  compliancePortalRows: enPortalRows,
  casesEyebrow: "Cases",
  casesTitle: "Sample profile projects",
  casesIntro: "Examples published on our company profile.",
  sampleCases: enSampleCases,
};

const zhMenuLinks: readonly ServicesMenuLink[] = [
  { path: "/services/corporate-incorporation", label: "公司设立服务" },
  { path: "/services", label: "会计服务", current: true },
  { path: "/services/india-accounting-glossary", label: "印度会计术语表" },
  { path: "/services/license-registration", label: "许可证登记服务" },
  { path: "/services/recruitment-support", label: "招聘支持服务" },
  { path: "/services/frro", label: "FRRO 服务" },
  { path: "/services/ecb", label: "ECB 指南" },
  { path: "/services/form-41-registration", label: "Form 41（原 Form 10F）登记服务" },
  { path: "/services/personal-income-tax-calculator", label: "个人所得税计算器" },
  { path: "/services/corporate-tax-calculator", label: "企业所得税计算器" },
  { path: "/services/professional-tax-calculator", label: "Professional Tax 计算器" },
];

const zhProcessSteps = [
  "收集客户科目表需求并确定科目体系",
  "按既定科目对交易分类并开始记账",
  "编制费用报销单并审阅凭证",
  "完成内部审批人签核",
  "将已批准分录录入会计系统并完成凭证匹配",
  "月结/季结后办理 GST、TDS、预缴所得税等申报",
] as const;

const zhHighlights = [
  {
    title: "科目体系设计",
    description: "结合集团报表格式与内部政策，优先确定科目结构与映射规则。",
  },
  {
    title: "以凭证与审批为基础的记账",
    description: "以费用报销与审批流为主线整理单据，并准确入账。",
  },
  {
    title: "申报与报告一体化",
    description: "月结、季结后统筹 GST、TDS、预缴所得税及 RBI 相关报送。",
  },
] as const;

const zhCoreServices: readonly ServiceLineItem[] = [
  {
    title: "会计·税务·合规",
    description:
      "在 IFRS 与印度法规框架下开展记账、审计及 GST、TDS 等税务申报，并由常驻注册会计师团队提供法人结构咨询。",
  },
  {
    title: "公司设立与许可",
    description:
      "从制造业落地所需的本地法人设立，到 PAN、GST、进出口代码登记、办公室租赁及各类许可，全程在印现场办理。",
  },
  {
    title: "进出口·贸易·采购",
    description:
      "进出口管理、当地合作方与买家对接、展会策划执行、工厂参观口译等贸易全链条一体化支持。",
  },
  {
    title: "人力资源·外派·FRRO",
    description:
      "招聘支持、外派人员签证与 FRRO 手续、合同审阅等人事与行政事务由内部团队直接处理。",
  },
  {
    title: "酒店·不动产·可行性",
    description:
      "为酒店等投资项目提供标的尽调、投资备忘录、可行性分析，以及不动产中介与法律顾问衔接。",
  },
  {
    title: "持续运营支持",
    description:
      "法人管理、账簿、总部报告、ERP 搭建与培训等，从设立到稳定运营阶段的一站式支持。",
  },
];

const zhAccountingBlocks: readonly AccountingServiceBlock[] = [
  {
    eyebrow: "经常性",
    title: "定期会计与税务服务",
    subtitle: "以月为单位的会计与税务执行、薪酬/法定缴费，以及含 RBI 报送在内的印度本地必备申报与缴纳统筹。",
    items: [
      "客户科目体系征询与确定（反映总部报表口径）",
      "按科目体系进行业务分类并开始记账",
      "费用报销单编制、审阅与审批流程运营",
      "已批准业务在会计系统中入账并完成凭证匹配",
      "月度结账及账簿管理（银行、进项、销项、费用等科目整理）",
      "GST 进销项申报及进项税抵免（ITC）管理",
      "代扣代缴（TDS）月度/季度申报与对账",
      "预缴所得税（Advance Tax）计算、申报与缴纳计划",
      "SFT（特定金融交易申报）对应",
      "FLA（境外资产负债申报）编制与提交",
      "DPT-3（存款及类似安排申报）对应",
      "外商投资申报（RBI FIRMS：FC-GPR/FC-TRS/FLA）及 FEMA 相关报送",
      "资本金变动、股东结构变化相关合规管理",
      "PF（公积金）、ESI（雇员保险）结算与缴纳",
      "Professional Tax 登记、各邦申报周期管理与缴纳",
    ],
  },
  {
    eyebrow: "年度",
    title: "年度审计与申报服务",
    subtitle: "根据会计年度、收入规模与交易体量，事先协商确定审计范围与提交时间表。",
    items: [
      "税务·会计审计服务（每年一次，先审阅进销项后确定范围）",
      "GST 审计（GST Audit，达到年销售额门槛时）",
      "转让定价审计报告（TP Report，在需要时）",
    ],
  },
  {
    eyebrow: "专项",
    title: "其他服务",
    subtitle: "个案问题、按人头申报及非定期行政·税务需求将尽快处理。",
    items: [
      "董事登记/撤销（按人头）",
      "Form 15CA/CB（非居民汇款相关税务证明，按笔）",
      "ECB（对外商业借款）、海外汇款 Form 41（原 Form 10F）·DTAA（双重征税协定）相关支持（如适用）",
      "DIR-3 KYC（董事识别号年度更新，按人头）",
      "需注册会计师签字的文件（按件）",
    ],
  },
];

const zhComplianceIntro =
  "下表为一般印度法人/经营者常见义务的概要示例。具体义务与截止日因行业、登记类型、年销售额、各邦规定及法律修订而异，实际操作前请务必与承办注册会计师最终确认日程。";

const zhComplianceMonthly: readonly ComplianceRow[] = [
  { item: "TDS", schedule: "次月 7 日前申报并缴纳（如适用）" },
  { item: "GSTR-1", schedule: "每月 11 日前（按月申报者，销项）" },
  { item: "GSTR-3B", schedule: "每月 20 日前（按月申报者，进项与 ITC 等）" },
  { item: "PF（公积金）", schedule: "每月 15 日前（如适用）" },
  { item: "ESI", schedule: "每月 15 日前（如适用）" },
  { item: "Professional Tax", schedule: "每月 20 日前（各邦税法不同）" },
  {
    item: "ECB（对外商业借款）",
    schedule: "有余额时通常须于次月 7 日前在 RBI FIRMS 等渠道报送 ECB-2 等",
  },
];

const zhComplianceQuarterly: readonly ComplianceRow[] = [
  {
    item: "预缴所得税（Advance Tax）",
    schedule: "6 月 15 日 15% · 9 月 15 日 45% · 12 月 15 日 75% · 3 月 15 日 100%（示例性安排）",
  },
  {
    item: "TDS 申报",
    schedule: "Q1（4–6 月）7 月 31 日 · Q2（7–9 月）10 月 31 日 · Q3（10–12 月）次年 1 月 31 日 · Q4（1–3 月）5 月 31 日",
  },
  {
    item: "董事会",
    schedule: "设立后首次董事会 30 日内；每年至少 4 次；两次董事会间隔不得超过 120 日（公司法原则）",
  },
  {
    item: "GSTR-1（季度）",
    schedule: "季度结束后次月 13 日（年营业额 5 千万卢比以下等选择 QRMP/季度申报时）",
  },
  {
    item: "GSTR-3B（季度）",
    schedule: "季度结束后次月 22–24 日（年营业额 5 千万卢比以下等选择 QRMP/季度申报时）",
  },
];

const zhComplianceAnnual: readonly ComplianceRow[] = [
  { item: "DIR-3 KYC", schedule: "9 月 30 日前（未履行可能导致 DIN 停用）" },
  { item: "Professional Tax 年度申报", schedule: "4 月 1–30 日（各邦不同）" },
  { item: "SFT", schedule: "5 月 1–31 日（如适用）" },
  { item: "FLA", schedule: "7 月 1–20 日（如适用）" },
  { item: "财务报表法定审计", schedule: "9 月 30 日前（以约定为准）" },
  { item: "企业所得税申报（ITR）", schedule: "9 月 30 日前（一般期限，个案可延期或调整）" },
  { item: "ROC AOC-4 / MGT-7（或 MGT-7A）", schedule: "10 月 30 日前（一般期限）" },
  { item: "转让定价审计报告", schedule: "11 月 30 日前（存在跨境交易等适用情形时）" },
  {
    item: "GSTR-9（年度 GST）",
    schedule: "年营业额超过 2 千万卢比时强制；以下可选择（以年度公告为准）",
  },
  {
    item: "GSTR-9C（GST 调节/审计）",
    schedule: "目前一般为可选；请以政府最新公告为准",
  },
];

const zhPortalRows: readonly PortalRow[] = [
  { label: "GST", href: "https://www.gst.gov.in", note: "GST 门户" },
  {
    label: "e-Filing（所得税）",
    href: "https://portal.incometaxindiaefiling.gov.in",
    note: "法人及个人所得税等",
  },
  { label: "Traces（TDS）", href: "https://www.tdscpc.gov.in", note: "TDS 与表格" },
  { label: "FRRO", href: "https://indianfrro.gov.in", note: "签证与居留等" },
  { label: "FIRMS（RBI）", href: "https://firms.rbi.org.in", note: "FDI、ECB 等外汇报送" },
  { label: "E-Way Bill", href: "https://ewaybillgst.gov.in", note: "货物运输" },
  { label: "Ice Gate", href: "https://www.icegate.gov.in", note: "关税与税费缴纳" },
  { label: "MCA", href: "https://www.mca.gov.in", note: "企业事务部·ROC 等" },
];

const zhSampleCases: readonly CaseItem[] = [
  {
    name: "公司设立及许可项目",
    note: "全印度范围 · 制造业法人及许可",
    due: "2024 年 6 月完成案例（以简介为准）",
  },
  {
    name: "不动产尽调及酒店收购可行性",
    note: "现场考察、许可路径与可行性分析",
    due: "简介中的示例项目",
  },
  {
    name: "协作伙伴开发及零部件厂考察",
    note: "展会、口译、对接与车辆安排",
    due: "2024 年 2 月完成案例（以简介为准）",
  },
];

const zh: AccountingServicesPageCopy = {
  metaTitle: "服务",
  metaDescription: `${company.shortName} — 在印度现场执行的会计、税务、合规与咨询业务线及案例参考。`,
  pageTitle: "会计服务",
  pageDescription: "由法人咨询·会计部门提供的印度本地直接执行型服务。",
  menuTitle: "服务菜单",
  menuIntro: "请选择所需服务类型，在详情页确认支持范围。",
  menuLinks: zhMenuLinks,
  coreEyebrow: "Service lines",
  coreTitle: "核心服务",
  coreIntro: "法人咨询·会计部门在印度当地直接执行的服务。",
  coreServices: zhCoreServices,
  detailTitle: "会计服务详细说明",
  detailIntro: "在定期会计与税务阵容中，结合实际运营流程与主要申报事项进行说明。",
  processTitle: "会计运营流程（与客户协同）",
  processByline: "Account Mapping → Booking → Approval → Filing",
  processSteps: zhProcessSteps,
  highlights: zhHighlights,
  lineupEyebrow: "Accounting & Tax",
  lineupTitle: "会计·税务服务阵容",
  lineupIntro:
    "在常驻注册会计师体系下支持定期、年度及单项业务。具体范围与报价将在了解业务规模并审阅资料后说明。",
  accountingBlocks: zhAccountingBlocks,
  complianceTitle: "印度法人分期间法定申报与合规日程",
  complianceIntro: zhComplianceIntro,
  complianceMonthlyHeading: "按月",
  complianceQuarterlyHeading: "按季度",
  complianceAnnualHeading: "按年度",
  complianceMonthlyCaption: "月度申报与缴纳",
  complianceQuarterlyCaption: "季度申报与缴纳",
  complianceAnnualCaption: "年度申报与缴纳",
  compliancePortalTitle: "主要政府与门户（参考）",
  compliancePortalNote: "实际登录路径与菜单名称可能随门户改版而变化。",
  complianceThItem: "项目",
  complianceThSchedule: "日程与要求（摘要）",
  complianceThCategory: "类别",
  complianceThLink: "链接",
  complianceThNote: "备注",
  complianceMonthlyRows: zhComplianceMonthly,
  complianceQuarterlyRows: zhComplianceQuarterly,
  complianceAnnualRows: zhComplianceAnnual,
  compliancePortalRows: zhPortalRows,
  casesEyebrow: "Cases",
  casesTitle: "简介项目示例",
  casesIntro: "为公司简介所载案例。",
  sampleCases: zhSampleCases,
};

export function accountingServicesPageCopy(locale: SiteLocale): AccountingServicesPageCopy {
  return pickLocale(locale, { ko, en, zh });
}
