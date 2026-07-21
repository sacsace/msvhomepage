import { guideIndiaTax } from "@/lib/i18n/guide-india-tax-bundle";
import { hrPayroll } from "@/lib/i18n/hr-payroll-service-bundle";
import { guideHrLabour } from "@/lib/i18n/guide-hr-labour-bundle";
import { guideIndiaAccounting } from "@/lib/i18n/guide-india-accounting-bundle";
import { fdiFemaGuide } from "@/lib/i18n/fdi-fema-guide-bundle";
import { guideFemaFx } from "@/lib/i18n/guide-fema-fx-bundle";
import { complianceCalendar } from "@/lib/i18n/compliance-calendar-bundle";
import { contractsLegalHub } from "@/lib/i18n/contracts-legal-guide-bundle";
import { guideCompaniesActHub } from "@/lib/i18n/guide-companies-act-bundle";
import { pickLocale, type SiteLocale } from "@/lib/site-locale";

export const SERVICE_GUIDE_SLUGS = [
  "gst-practice-guide",
  "import-export-iec",
  "fdi-fema-guide",
  "hr-payroll",
  "contracts-legal",
  "india-entry-guide",
  "factory-licensing",
  "compliance-calendar",
  "guide-india-tax",
  "guide-india-accounting",
  "guide-fema-fx",
  "guide-hr-labour",
  "guide-companies-act",
] as const;

export type ServiceGuideSlug = (typeof SERVICE_GUIDE_SLUGS)[number];

export function isServiceGuideSlug(s: string): s is ServiceGuideSlug {
  return (SERVICE_GUIDE_SLUGS as readonly string[]).includes(s);
}

type GuideSection = {
  readonly title: string;
  readonly paragraphs?: readonly string[];
  readonly bullets?: readonly string[];
};

type ToolHubBlock = {
  readonly title: string;
  readonly items: readonly { readonly href: string; readonly label: string }[];
  readonly note?: string;
};

/** 카드형 상세 블록(진출 가이드 등) */
export type ServiceGuideDetailCard = {
  readonly title: string;
  readonly bullets: readonly string[];
};

export type ServiceGuideProcessPhase = {
  readonly title: string;
  readonly bullets: readonly string[];
};

export type ServiceGuideIndustryRow = {
  readonly industry: string;
  /** Optional emoji shown before the transaction label (e.g. FEMA hub table). */
  readonly icon?: string;
  /** Primary review column (FEMA/tax/procedure). */
  readonly issues: string;
  /** When set with `industryCol3` on the copy, renders a third “operating friction” column. */
  readonly practicalNotes?: string;
};

export type ServiceGuideTimelineRow = {
  readonly item: string;
  readonly duration: string;
};

/** 신고준수 달력 등: 항목 | 일정·요약 2열 표 */
export type ServiceGuideScheduleTableRow = {
  readonly item: string;
  readonly summary: string;
};

export type ServiceGuideScheduleTable = {
  readonly title: string;
  readonly colItem: string;
  readonly colSummary: string;
  readonly rows: readonly ServiceGuideScheduleTableRow[];
};

export type ServiceGuideCopy = {
  readonly metaTitle: string;
  readonly metaDescription: string;
  readonly pageTitle: string;
  /** 서비스 가이드 히어로에서 제목 위 소형 라벨(선택) */
  readonly pageEyebrow?: string;
  readonly pageDescription: string;
  readonly disclaimer: string;
  /** 헤더 직후 본문 상단에 노출할 추가 문단 */
  readonly introParagraphs?: readonly string[];
  /** 법정 일정 등 다중 2열 표(월·분기·연) */
  readonly scheduleSectionTitle?: string;
  readonly scheduleTables?: readonly ServiceGuideScheduleTable[];
  readonly sections?: readonly GuideSection[];
  readonly toolHubIntro?: string;
  readonly toolHubBlocks?: readonly ToolHubBlock[];
  readonly roadmapTitle?: string;
  readonly roadmapItems?: readonly string[];
  /** 카드형 초기 로드맵 등 */
  readonly roadmapCardsTitle?: string;
  readonly roadmapCards?: readonly ServiceGuideDetailCard[];
  readonly governanceTitle?: string;
  readonly governanceBlocks?: readonly ServiceGuideDetailCard[];
  /** `governanceBlocks` 대신 법정 일정과 동일한 2열 표만 사용(신고준수 달력 등) */
  readonly governanceScheduleTable?: ServiceGuideScheduleTable;
  /** governance 다음·practicalIssues 앞에 렌더(예: GST/회계 가이드 월별 체크) */
  readonly nestedChecklistTitle?: string;
  readonly nestedChecklistBlocks?: readonly ServiceGuideDetailCard[];
  readonly nestedChecklistScheduleTable?: ServiceGuideScheduleTable;
  readonly practicalIssuesTitle?: string;
  readonly practicalIssues?: readonly string[];
  readonly processFlowTitle?: string;
  readonly processPhases?: readonly ServiceGuideProcessPhase[];
  readonly industryTableTitle?: string;
  readonly industryCol1?: string;
  readonly industryCol2?: string;
  /** Third column header (e.g. common operating issues); enables 3-column industry table when set. */
  readonly industryCol3?: string;
  readonly industryRows?: readonly ServiceGuideIndustryRow[];
  readonly msvScopeTitle?: string;
  readonly msvScopeItems?: readonly string[];
  /** 수출 기업 GST 등 bullet 리스트 */
  readonly exportFlowTitle?: string;
  readonly exportFlowItems?: readonly string[];
  /** 예상 소요 기간 등 */
  readonly timelineTable?: {
    readonly title: string;
    readonly colItem: string;
    readonly colDuration: string;
    readonly rows: readonly ServiceGuideTimelineRow[];
    readonly footnote: string;
  };
  readonly closingNote?: string;
  readonly relatedIntro?: string;
  readonly relatedTitle?: string;
  readonly relatedLinks?: readonly { readonly href: string; readonly label: string }[];
  /** 신고준수 달력 등: 본문 상단 인터랙티브 달력 블록(관리자 등록 일정) */
  readonly calendarWidgetKicker?: string;
  readonly calendarWidgetTitle?: string;
  readonly calendarWidgetLead?: string;
};

type Bundle = { readonly ko: ServiceGuideCopy; readonly en: ServiceGuideCopy; readonly zh: ServiceGuideCopy };

const gstPracticeGuide: Bundle = {
  ko: {
    metaTitle: "GST 실무 안내",
    metaDescription:
      "GST 등록·LUT·환급·E-Invoice·e-Way·RCM·ITC·GSTR-2B·IRP·ICEGATE · 운영·ERP·물류·은행 정합성 관점의 인도 GST 실무 허브.",
    pageTitle: "GST 실무 안내",
    pageDescription:
      "GST는 인도에서 거의 모든 B2B·B2C 흐름과 맞닿습니다. 등록부터 ITC·전자세금계산서까지, 실무에서 반복 점검되는 축을 운영 시스템 관점으로 정리했습니다.",
    disclaimer:
      "GST 적용 여부·세율·Input Credit 가능 범위는 업종·거래 구조·계약 조건·수출입 여부에 따라 달라질 수 있습니다. 실제 신고 전에는 최신 GST 규정 및 거래 구조 검토가 필요할 수 있으며, 본 페이지는 참고용 개요입니다.",
    introParagraphs: [
      "GST는 단순 신고 업무가 아니라, 판매·구매·수출·물류·전자세금계산서·은행 흐름과 연결되는 운영 체계입니다.",
      "실제 실무에서는 ERP·Invoice·물류·회계 코드가 서로 맞물려야 하므로, 초기 설정과 월별 운영 관리가 중요합니다.",
    ],
    roadmapCardsTitle: "GST 운영 축 · Registration → LUT → Refund → E-Invoice → RCM → ITC",
    roadmapCards: [
      {
        title: "GST Registration",
        bullets: [
          "사업 형태(제조·서비스·수출·전자상거래 등)에 따라 등록 요건·유형이 달라질 수 있습니다.",
          "Multi-state 운영 시 주(State)별 GST 등록·정산 구조를 함께 검토합니다.",
          "PAN·사업장 주소·은행 계좌·Authorized signatory·DSC 등 KYC·서명 체계를 사전에 맞춥니다.",
          "등록 직후 Invoice format·HSN/SAC·세율 체계를 ERP·세무 설정과 동시에 고정하는 것이 유리합니다.",
          "[실무] GST 주소와 임대차·실제 사업장 주소 불일치",
          "[실무] Electricity bill·NOC 등 부동산 증빙 요구",
          "[실무] 추가 사업장(Additional place of business) 등록 필요 가능",
        ],
      },
      {
        title: "LUT (Letter of Undertaking)",
        bullets: [
          "수출 기업은 LUT를 통해 IGST 납부 없이 수출 체인을 운영하는 경우가 많습니다.",
          "일반적으로 회계연도(FY) 기준 갱신·만료 관리가 캘린더에 올라갑니다.",
          "Export invoice·Shipping bill·FIRC/BRC 등 자금·세무 흐름과 함께 운영됩니다.",
          "[실무] LUT 만료 누락 시 자금·신고 정합에 영향",
          "[실무] 수출 신고와 GST 신고 데이터 정합성",
          "[실무] SEZ·특수 구역 거래는 별도 검토가 필요할 수 있음",
        ],
      },
      {
        title: "GST Refund",
        bullets: [
          "Export refund·Inverted duty refund·Excess balance refund 등 유형별로 절차·증빙이 달라질 수 있습니다.",
          "신청 전 GSTR-1·3B·Shipping bill·EGM 등 데이터 정합을 먼저 보는 경우가 많습니다.",
          "ITC 누락·불일치를 정리한 뒤 환급 스택을 설계합니다.",
          "[실무] ICEGATE mismatch",
          "[실무] Invoice mismatch / BRC·FIRC 누락",
          "[실무] Refund hold notice 대응 가능성",
        ],
      },
      {
        title: "E-Invoice & e-Way",
        bullets: [
          "매출 데이터가 IRP·ERP·GSTR-1과 어떻게 연결되는지 운영 구조(배치/API)를 검토합니다.",
          "매출 규모 등 Threshold에 따라 E-Invoice 적용 여부가 달라질 수 있습니다.",
          "물류 이동 시 e-Way 생성·갱신·validity·distance 관리가 필요할 수 있습니다.",
          "[실무] IRN generation 오류, Vehicle update 누락",
          "[실무] Distance mismatch, Invoice date와 e-Way timing 불일치",
          "[운영] ERP 연계·API 방식·다지점(Multi-branch) 인보이스 관리",
        ],
      },
      {
        title: "RCM (Reverse charge)",
        bullets: [
          "특정 서비스·수입 서비스·비등록 거래 등에서 매입자가 GST 납부 의무를 질 수 있습니다.",
          "Import of services는 FEMA·TDS·GST 흐름을 한 묶음으로 보는 경우가 많습니다.",
          "Vendor coding·비용 분류(expense classification) 기준을 문서화해 두는 것이 중요합니다.",
          "[실무] Overseas invoice, Director remuneration, Legal service RCM",
          "[실무] GTA service, Self-invoice 요구 가능",
        ],
      },
      {
        title: "Input Tax Credit (ITC)",
        bullets: [
          "GSTR-2B 기준으로 ITC 가능 여부를 월별로 검토하는 팀이 많습니다.",
          "Blocked credit·개인성 비용·자본재(Capital goods) 구분, Vendor filing 상태와 인보이스 정합이 핵심입니다.",
          "[실무] Vendor 미신고, 180일 payment 조건, ITC reversal",
          "[실무] ISD 구조, 지점 비용 배분(branch allocation)",
          "[실무] 차량·식음료·직원 비용 등 blocked credit 여부, 자본화(Capitalization) 처리",
        ],
      },
    ],
    practicalIssuesTitle: "실무상 자주 발생하는 이슈",
    practicalIssues: [
      "GST 등록 지연으로 인보이스 발행·거래 스타트가 막히는 경우",
      "GSTR-1과 3B 간 금액·세액 mismatch",
      "Vendor 미신고로 ITC 누락·추후 역추적",
      "Export refund 지연으로 현금흐름 압박",
      "E-Invoice threshold 오해로 적용 시점 착오",
      "RCM 누락으로 신고·장부·협력사 청구 불일치",
      "GST 주소와 실제 사업장·임대차 불일치",
      "ERP 세율·코드·HSN 매핑 오류",
    ],
    nestedChecklistTitle: "월별 운영 체크포인트",
    nestedChecklistBlocks: [
      {
        title: "매출",
        bullets: ["E-Invoice / IRN 처리", "GSTR-1 준비·세액 검토(Tax liability review)", "수출·국내 매출 분리·정합"],
      },
      {
        title: "매입",
        bullets: ["GSTR-2B reconciliation", "Vendor follow-up(미반영·오류)", "ITC review·차단 항목 점검"],
      },
      {
        title: "납부",
        bullets: ["GST payment·현금흐름", "RCM review", "Interest exposure check"],
      },
      {
        title: "마감",
        bullets: ["GSTR-3B", "Books reconciliation", "ERP closing·증빙 마감"],
      },
    ],
    exportFlowTitle: "수출 기업 주요 검토",
    exportFlowItems: [
      "LUT",
      "Export invoice",
      "Shipping bill",
      "ICEGATE",
      "Refund",
      "Zero-rated supply",
      "SEZ transaction",
      "FIRC/BRC",
    ],
    msvScopeTitle: "MSV 지원 범위",
    msvScopeItems: [
      "GST Registration 및 주별 구조 설계",
      "월별 GST 신고 운영",
      "GSTR-1 / 3B / 9 등 정기·연간 라인",
      "ITC reconciliation·Vendor follow-up",
      "LUT 및 Refund",
      "E-Invoice setup·IRP/ERP 연계 검토",
      "ERP 세율·코드·HSN 구조 검토",
      "GST Notice 대응",
      "수출 기업 GST 운영 지원",
    ],
    relatedIntro: "같은 운영 스택에서 자주 이어집니다.",
    relatedTitle: "관련 페이지",
    relatedLinks: [
      { href: "/services/personal-income-tax-calculator", label: "급여 TDS 계산기" },
      { href: "/services", label: "회계·세무 서비스" },
      { href: "/services/import-export-iec", label: "수출입(IEC)·통관" },
      { href: "/services/compliance-calendar", label: "신고준수 달력" },
      { href: "/services/india-accounting-glossary", label: "지식 베이스" },
      { href: "/contact", label: "문의" },
    ],
    closingNote:
      "GST는 단순 신고보다 거래 구조·ERP·물류·은행 흐름이 함께 연결되는 운영 영역이며, 초기 설정 방식에 따라 이후 수정 비용과 리스크가 크게 달라질 수 있습니다.",
  },
  en: {
    metaTitle: "GST practice guide (India)",
    metaDescription:
      "GST registration, LUT, refunds, e-invoice, e-way, RCM, ITC, GSTR-2B, IRP and ICEGATE · operations, ERP, logistics and banking alignment for India GST.",
    pageTitle: "GST practice guide",
    pageDescription:
      "GST touches almost every B2B/B2C flow in India. From registration through ITC and e-invoicing, this page frames the topics as an operating system · not a tax brochure alone.",
    disclaimer:
      "Applicability, rates and ITC eligibility depend on industry, transaction design, contract terms and export/import posture. Validate against the latest law and your facts before filing · this page is orientation only.",
    introParagraphs: [
      "GST is not only periodic returns: it connects sales, purchases, exports, logistics, e-invoicing and banking data.",
      "In practice, ERP, invoices, logistics and GL coding must stay aligned · initial design and monthly operating discipline matter as much as compliance calendars.",
    ],
    roadmapCardsTitle: "GST operating stack · Registration → LUT → Refund → E-invoice → RCM → ITC",
    roadmapCards: [
      {
        title: "GST registration",
        bullets: [
          "Manufacturing, services, exports and e-commerce can change registration triggers and types.",
          "Multi-state footprints often need a state-wise registration and reporting map · not a single PAN story.",
          "Prepare PAN, principal place of business, banking, authorised signatories and DSC workflows up front.",
          "Right after registration, lock invoice templates, HSN/SAC and rate tables into ERP and tax settings together.",
          "[Field] GST address vs lease/actual site mismatches",
          "[Field] Electricity bills / landlord NOC style evidence requests",
          "[Field] Additional place of business registrations when operations split across sites",
        ],
      },
      {
        title: "LUT (Letter of undertaking)",
        bullets: [
          "Exporters commonly use LUT to move goods/services without charging IGST on eligible export chains.",
          "FY-based renewal/expiry should sit on the same calendar as treasury and GST filings.",
          "Runs alongside export invoices, shipping bills and FIRC/BRC evidence for forex.",
          "[Field] Missed LUT renewal impacting cash and filing consistency",
          "[Field] Reconciling export filings with GST returns",
          "[Field] SEZ and special-zone treatments need a separate pass",
        ],
      },
      {
        title: "GST refunds",
        bullets: [
          "Export refunds, inverted duty refunds and excess-cash balances follow different evidence and portal paths.",
          "Teams usually reconcile GSTR-1/3B, shipping bills and EGM data before pushing refund files.",
          "Clean ITC positions first · refund stories break when upstream credits are messy.",
          "[Field] ICEGATE mismatches vs GST data",
          "[Field] Invoice mismatches; missing BRC/FIRC packs",
          "[Field] Refund hold notices and clarifications",
        ],
      },
      {
        title: "E-invoice & e-way",
        bullets: [
          "Design how sales data flows IRP → ERP → GSTR-1 (batch vs API, validations, retries).",
          "Threshold tests decide when e-invoicing becomes mandatory · misreads cause retro fixes.",
          "Where goods move, manage e-way generation, extensions, validity and distance rules with logistics.",
          "[Field] IRN generation failures; missed vehicle updates",
          "[Field] Distance mismatches; invoice date vs e-way timing gaps",
          "[Ops] ERP integration, APIs and multi-branch invoicing models",
        ],
      },
      {
        title: "RCM (Reverse charge)",
        bullets: [
          "Listed supplies, import of services and dealings with unregistered vendors can shift liability to the recipient.",
          "Import-of-services paths often need FEMA, TDS and GST reviewed together · not in silos.",
          "Document vendor master coding and expense classification rules early.",
          "[Field] Overseas invoices; director remuneration; legal fees under RCM",
          "[Field] GTA services; self-invoice scenarios where required",
        ],
      },
      {
        title: "Input tax credit (ITC)",
        bullets: [
          "Many teams anchor monthly reviews on GSTR-2B availability and vendor filing health.",
          "Watch blocked credits, personal/disallowed spends and capital goods treatments.",
          "[Field] Vendors not filing; 180-day payment conditions; ITC reversals",
          "[Field] ISD structures; branch expense allocations",
          "[Field] Blocked credit on cars/F&B/employee spends; capitalisation choices",
        ],
      },
    ],
    practicalIssuesTitle: "Issues we see often in live GST operations",
    practicalIssues: [
      "Registration delays block invoicing and revenue recognition",
      "GSTR-1 vs 3B mismatches after period-end changes",
      "Vendor non-filing causing ITC gaps and rework",
      "Export refund delays pressuring working capital",
      "Misunderstanding e-invoice thresholds and go-live dates",
      "Missed RCM postings breaking AP, GL and returns",
      "GST address out of sync with plant/warehouse reality",
      "Wrong ERP tax codes or HSN mappings propagating through the stack",
    ],
    nestedChecklistTitle: "Monthly operating checkpoints",
    nestedChecklistBlocks: [
      {
        title: "Sales / outward",
        bullets: ["E-invoice / IRN processing", "GSTR-1 preparation and tax liability review", "Domestic vs export segregation"],
      },
      {
        title: "Purchases / inward",
        bullets: ["GSTR-2B reconciliation", "Vendor follow-up on missing or wrong filings", "ITC review and blocked-credit checks"],
      },
      {
        title: "Payments",
        bullets: ["GST cash payments vs credit utilisation", "RCM review", "Interest exposure checks"],
      },
      {
        title: "Close",
        bullets: ["GSTR-3B", "Books reconciliation", "ERP period close and evidence packs"],
      },
    ],
    exportFlowTitle: "Exporter-focused GST checks",
    exportFlowItems: [
      "LUT",
      "Export invoice discipline",
      "Shipping bill alignment",
      "ICEGATE data",
      "Refunds",
      "Zero-rated supplies",
      "SEZ transactions",
      "FIRC/BRC evidence",
    ],
    msvScopeTitle: "Typical MSV support scope",
    msvScopeItems: [
      "GST registration and operating model design",
      "Monthly GST compliance run",
      "GSTR-1 / 3B / annual returns (where applicable)",
      "ITC reconciliation and vendor follow-up",
      "LUT and refund programmes",
      "E-invoicing setup and IRP/ERP linkage reviews",
      "ERP rate/HSN structure reviews",
      "GST notice handling",
      "Exporter GST operating support",
    ],
    relatedIntro: "Pages that usually sit next to a GST operating model.",
    relatedTitle: "Related pages",
    relatedLinks: [
      { href: "/services/personal-income-tax-calculator", label: "Salary TDS calculator" },
      { href: "/services", label: "Accounting & tax services" },
      { href: "/services/import-export-iec", label: "IEC & customs" },
      { href: "/services/compliance-calendar", label: "Compliance calendar" },
      { href: "/services/india-accounting-glossary", label: "Knowledge base" },
      { href: "/contact", label: "Contact" },
    ],
    closingNote:
      "GST is less about isolated filings and more about how transactions, ERP, logistics and banking connect · early design choices materially change remediation cost and downstream risk.",
  },
  zh: {
    metaTitle: "印度 GST 实务指南",
    metaDescription: "登记、LUT、退税、电子发票、电子运单、RCM、ITC、GSTR-2B、IRP、ICEGATE · 从运营与系统视角梳理 GST。",
    pageTitle: "GST 实务指南",
    pageDescription:
      "GST 与大多数 B2B/B2C 流程相连。本文从登记到进项抵扣与电子发票，以“运营体系”而非单一税种介绍常见要点。",
    disclaimer:
      "是否适用、税率与进项抵扣范围因行业、交易结构、合同及进出口安排而异；申报前请以最新法规与事实核查为准，本文为概览。",
    introParagraphs: [
      "GST 不仅是定期申报，还与销售、采购、出口、物流、电子发票及银行流水相互咬合。",
      "实务中需让 ERP、发票、物流与会计科目保持一致，因此初期配置与月度运营同样关键。",
    ],
    roadmapCardsTitle: "GST 运营主轴 · 登记 → LUT → 退税 → 电子发票 → RCM → ITC",
    roadmapCards: [
      {
        title: "GST 登记",
        bullets: [
          "制造、服务、出口、电商等业态可能影响登记触发与类型。",
          "跨邦经营常需分邦登记与申报路径设计。",
          "准备 PAN、经营地址、银行账户、授权签字人与 DSC 等。",
          "登记后尽快固定发票模板、HSN/SAC 与税率表并与 ERP 对齐。",
          "[实务] 登记地址与租赁/实际地址不一致",
          "[实务] 电费单、业主同意函等证明要求",
          "[实务] 额外经营场所(Additional place of business)登记",
        ],
      },
      {
        title: "LUT（承诺书）",
        bullets: [
          "出口企业常用 LUT 在合规链条下避免对相关出口环节计征 IGST（视情形）。",
          "通常按财年管理续期与到期。",
          "与出口发票、装运单及 FIRC/BRC 等外汇证明一并运营。",
          "[实务] 续期遗漏影响资金与申报一致性",
          "[实务] 出口申报数据与 GST 申报对齐",
          "[实务] SEZ 等特殊区域需单独评估",
        ],
      },
      {
        title: "GST 退税",
        bullets: [
          "出口退税、倒挂退税、余额退税等路径与材料不同。",
          "提交前常先核对 GSTR-1/3B、装运单、EGM 等数据。",
          "先整理 ITC 与差异再推进退税。",
          "[实务] ICEGATE 与 GST 数据不一致",
          "[实务] 发票不一致或 BRC/FIRC 缺失",
          "[实务] 退税暂缓通知与澄清",
        ],
      },
      {
        title: "电子发票与电子运单",
        bullets: [
          "梳理销售数据在 IRP、ERP 与 GSTR-1 之间的链路与校验。",
          "阈值判断决定电子发票强制适用时点。",
          "货物流转需管理电子运单生成、续期、有效期与距离等。",
          "[实务] IRN 生成失败、车辆信息未更新",
          "[实务] 距离不匹配、发票日期与运单时间不一致",
          "[运营] ERP 对接、API 与多分支机构发票管理",
        ],
      },
      {
        title: "反向征税（RCM）",
        bullets: [
          "特定服务、进口服务或未注册供应商等情形可能由购买方纳税。",
          "进口服务常与 FEMA、代扣与 GST 一并审视。",
          "需固化供应商编码与费用分类规则。",
          "[实务] 境外发票、董事报酬、法律服务 RCM",
          "[实务] GTA 服务、可能需要的自开票(self-invoice)场景",
        ],
      },
      {
        title: "进项抵扣（ITC）",
        bullets: [
          "许多团队以 GSTR-2B 为月度核对锚点。",
          "关注 blocked credit、个人性支出与资本货物处理。",
          "[实务] 供应商未申报、180 日付款条件、进项转出",
          "[实务] ISD、分支机构费用分摊",
          "[实务] 车辆、餐饮、员工费用等 blocked credit；资本化判断",
        ],
      },
    ],
    practicalIssuesTitle: "实务中较常见的问题",
    practicalIssues: [
      "登记延迟导致无法开票、影响交易启动",
      "GSTR-1 与 3B 金额或税额不一致",
      "供应商未申报导致 ITC 缺口与追溯",
      "出口退税延迟带来现金流压力",
      "误解电子发票阈值与生效时点",
      "遗漏 RCM 导致应付、总账与申报不一致",
      "GST 地址与实际厂房/仓库不一致",
      "ERP 税率或 HSN 映射错误在链路中放大",
    ],
    nestedChecklistTitle: "月度运营检查点",
    nestedChecklistBlocks: [
      { title: "销售", bullets: ["电子发票/IRN", "GSTR-1 准备与税负复核", "国内与出口拆分核对"] },
      { title: "采购", bullets: ["GSTR-2B 对账", "供应商跟进（未入账/错误）", "ITC 复核与限制项检查"] },
      { title: "缴纳", bullets: ["GST 税款安排", "RCM 复核", "滞纳/利息风险检查"] },
      { title: "结账", bullets: ["GSTR-3B", "账簿对账", "ERP 关账与凭证收口"] },
    ],
    exportFlowTitle: "出口企业主要核对项",
    exportFlowItems: ["LUT", "出口发票", "装运单", "ICEGATE", "退税", "零税率供应", "SEZ 交易", "FIRC/BRC"],
    msvScopeTitle: "MSV 常见支持范围",
    msvScopeItems: [
      "GST 登记与运营模型设计",
      "月度 GST 申报运营",
      "GSTR-1 / 3B / 年报（如适用）",
      "ITC 对账与供应商跟进",
      "LUT 与退税",
      "电子发票落地与 IRP/ERP 衔接",
      "ERP 税率与 HSN 结构复核",
      "GST 通知应对",
      "出口企业 GST 运营支持",
    ],
    relatedIntro: "常与 GST 运营栈一起阅读的页面：",
    relatedTitle: "相关页面",
    relatedLinks: [
      { href: "/services/personal-income-tax-calculator", label: "工资 TDS 计算器" },
      { href: "/services", label: "会计与税务服务" },
      { href: "/services/import-export-iec", label: "IEC 与通关" },
      { href: "/services/compliance-calendar", label: "合规日历" },
      { href: "/services/india-accounting-glossary", label: "知识库" },
      { href: "/contact", label: "联系" },
    ],
    closingNote:
      "GST 的关键往往不只是申报本身，而是交易结构、ERP、物流与银行流水如何衔接；初期设计方式会显著影响后续整改成本与风险。",
  },
};

const importExportIec: Bundle = {
  ko: {
    metaTitle: "수출입(IEC)·통관 안내",
    metaDescription:
      "IEC, AD Code, ICEGATE, HS classification, Port registration, BRC/FIRC, Customs valuation, EPCG, DGFT reporting, SIMS/PIMS · 인도 수출입을 은행·세관·GST·물류·FEMA 관점에서 정리한 실무 허브.",
    pageTitle: "수출입(IEC)·통관 안내",
    pageDescription:
      "제조·유통·본사 조달을 인도와 연결할 때, IEC·은행 AD·세관(ICEGATE)·면세 스킴이 한꺼번에 등장합니다. 운영·자금·은행·세무가 맞물리는 축을 실무 흐름 순으로 정리했습니다.",
    disclaimer:
      "품목 분류(HS Code)·관세율·면세 스킴 적용 여부는 제품 사양·원산지·수입 목적·DGFT/세관 해석에 따라 달라질 수 있습니다. 실제 계약·선적 전 최신 규정 및 적용 가능 여부 검토가 필요할 수 있으며, 본 페이지는 참고용 개요입니다.",
    introParagraphs: [
      "인도 수출입 운영은 단순 IEC 등록이 아니라, 은행(AD Code)·세관(ICEGATE)·GST·물류·외환(FEMA)·면세 스킴(EPCG 등)이 함께 연결되는 구조입니다.",
      "실제 운영에서는 Invoice·HS Code·송금·통관 데이터가 서로 맞물리므로 초기 설정과 문서 정합성이 중요합니다.",
    ],
    roadmapCardsTitle: "수출입 운영 축 · IEC → AD Code → ICEGATE → EPCG → SIMS/PIMS",
    roadmapCards: [
      {
        title: "IEC (Importer Exporter Code)",
        bullets: [
          "DGFT에서 관리되는 수출입 식별 번호로, 일반적으로 법인 PAN 기반으로 발급됩니다.",
          "수입·수출·해외 송금·세관 신고·은행 거래와 연결되는 기본 코드 역할을 합니다.",
          "제조·무역·서비스 수출 여부에 따라 운영·문서 스택이 달라질 수 있습니다.",
          "[실무] GST·은행 계좌·Authorized Signatory 정보 정합성",
          "[실무] IEC 정보 변경 시 DGFT 업데이트 필요 가능",
          "[실무] Multi-location 운영 시 내부 관리 기준(SoR) 설정 권장",
          "[구조] Branch, Merchant export, Third-party export 가능 여부 검토",
        ],
      },
      {
        title: "AD Code / Banking linkage",
        bullets: [
          "은행 AD(Authorized Dealer) Code 등록을 통해 항만·공항 세관과 외환 흐름이 연결됩니다.",
          "일반적으로 항구(Port)별 AD Code 등록이 필요할 수 있습니다.",
          "Export proceeds·Import remittance·BRC/FIRC 흐름과 함께 관리되는 경우가 많습니다.",
          "[실무] AD Code mismatch, Port registration 누락",
          "[실무] Bank KYC 업데이트 지연, Export payment reconciliation 이슈",
          "[연계] 본사 차입금 회수 구조, ECB·Trade payment, FEMA reporting",
        ],
      },
      {
        title: "ICEGATE & Customs",
        bullets: [
          "세관 신고·검사·평가·통관 절차가 디지털 기반으로 운영됩니다.",
          "Invoice·Packing list·BL/AWB·BOE·Shipping bill 간 데이터 정합성이 중요합니다.",
          "HS Code·Valuation·Country of origin 기준 검토가 필요할 수 있습니다.",
          "[실무] HS classification dispute, Customs valuation issue, Query hold",
          "[실무] RMS 검사 여부, Documentation mismatch",
          "[운영] CHA(Customs broker) coordination, Port delay, Demurrage risk, Amendment filing",
        ],
      },
      {
        title: "EPCG / Export promotion schemes",
        bullets: [
          "특정 자본재(Capital goods) 수입 시 관세 혜택을 받을 수 있는 구조가 존재합니다.",
          "일반적으로 Export obligation(EO) 및 기간 관리가 중요합니다.",
          "EPCG 외에도 Advance Authorization·RoDTEP 등 다양한 스킴 검토가 가능합니다.",
          "[실무] Export obligation tracking, Utility·Installation certificate, DGFT reporting",
          "[실무] Bond/LUT 연계 가능, Customs audit 대응, EPCG closure",
          "[검토] Import utilization review",
        ],
      },
      {
        title: "SIMS / PIMS 및 품목별 규제",
        bullets: [
          "특정 철강·종이·전자·화학 품목은 사전 등록 또는 모니터링 제도가 적용될 수 있습니다.",
          "품목에 따라 BIS·WPC·CDSCO·Legal Metrology 등 추가 규제가 연결될 수 있습니다.",
          "제조업 프로젝트에서는 Factory Licence·Pollution NOC와 함께 검토되는 경우가 많습니다.",
          "[실무] Shipment hold risk, BIS certification delay",
          "[실무] Import restriction update, Labeling requirement issue",
        ],
      },
    ],
    practicalIssuesTitle: "실무상 자주 발생하는 이슈",
    practicalIssues: [
      "IEC와 GST 주소·본점 정보 불일치",
      "AD Code 등록·항만 매핑 누락",
      "HS Code 분류 차이로 세액·지연 리스크",
      "ICEGATE 연계·전송 오류",
      "BL/Invoice·수량·금액 mismatch",
      "원산지 증명·서류 체계 미비",
      "EPCG obligation·Utility 등 이행 추적 누락",
      "항만·지역별 추가 요구 서류 발생",
    ],
    processFlowTitle: "일반적인 운영 흐름",
    processPhases: [
      {
        title: "STEP 1. 구조 설정",
        bullets: ["IEC", "GST", "Bank account", "AD Code(Port별 등록 포함 검토)"],
      },
      {
        title: "STEP 2. 계약 및 품목 검토",
        bullets: ["HS Code·분류", "관세율·Valuation", "Import restriction", "Scheme applicability(EPCG/AA 등)"],
      },
      {
        title: "STEP 3. 선적 및 통관",
        bullets: ["Shipping documents(BL/AWB·패킹리스트 등)", "ICEGATE filing", "Customs clearance·검사 대응"],
      },
      {
        title: "STEP 4. 회계·외환 정리",
        bullets: ["GST(수출입·환급·정합)", "Remittance", "BRC/FIRC", "Import accounting·원가 반영"],
      },
    ],
    industryTableTitle: "제조업 프로젝트 연계",
    industryCol1: "축",
    industryCol2: "검토 포인트",
    industryRows: [
      { industry: "공장 인허가", issues: "용량·품목·환경 NOC와 수입 원자재·기계 스펙 정합" },
      { industry: "원자재 수입", issues: "HS·원산지·제한 품목·SIMS/PIMS 등 사전 조건" },
      { industry: "EPCG", issues: "EO·Utility·Bond/LUT·세관·DGFT 리포팅 한 타임라인" },
      { industry: "GST·환급", issues: "수출·자본재·면세 스킴과 신고·장부·ICEGATE 정합" },
      { industry: "Export incentive", issues: "스킴별 증빙·RoDTEP 등 적용 가능성(시점·품목)" },
      { industry: "HT power / machinery import", issues: "전력·설비 수입 시 라이선스·세관 분류·검사" },
      { industry: "DG set import", issues: "규제·소음·환경 조건 및 통관 서류" },
      { industry: "Customs valuation", issues: "Related party·Royalty·Assist 등 조정 가능성" },
    ],
    msvScopeTitle: "MSV 지원 범위",
    msvScopeItems: [
      "IEC 등록 및 변경·내부 마스터 관리",
      "AD Code 등록·항만 매핑",
      "DGFT 실무·스킴 검토 지원",
      "EPCG 및 수출입 스킴(AA·RoDTEP 등) 검토",
      "GST·ICEGATE·은행 데이터 정합 검토",
      "수출입 회계·세무 구조",
      "FEMA·송금·BRC/FIRC 흐름 지원",
      "제조업 프로젝트 수입·설비 구조 검토",
    ],
    relatedIntro: "같은 운영 스택에서 자주 이어집니다.",
    relatedTitle: "함께 보면 좋은 페이지",
    relatedLinks: [
      { href: "/services/gst-practice-guide", label: "GST 실무 안내" },
      { href: "/services/factory-licensing", label: "공장·산업 인허가" },
      { href: "/services/ecb", label: "ECB·FEMA 실무 안내" },
      { href: "/services/india-entry-guide", label: "인도 진출 가이드" },
      { href: "/services", label: "회계·세무 서비스" },
      { href: "/services/license-registration", label: "라이선스 등록" },
      { href: "/services/fdi-fema-guide", label: "FDI·FEMA 안내" },
      { href: "/contact", label: "문의" },
    ],
    closingNote:
      "실제 수출입 운영에서는 세관·은행·GST·물류·외환 데이터가 서로 연결되므로, 초기 문서 구조와 내부 운영 기준 설정이 이후 지연 및 비용 발생에 큰 영향을 줄 수 있습니다.",
  },
  en: {
    metaTitle: "IEC & customs operations (India)",
    metaDescription:
      "IEC, AD code, ICEGATE, HS classification, port registration, BRC/FIRC, customs valuation, EPCG, DGFT reporting, SIMS/PIMS · India import/export as a banking, customs, GST and FEMA operating stack.",
    pageTitle: "IEC & customs guide",
    pageDescription:
      "When manufacturing, distribution or HQ sourcing touches India, IEC, banking AD codes, ICEGATE and export-promotion schemes show up together. This page frames them as an operating, treasury and compliance system · not a customs-broker brochure alone.",
    disclaimer:
      "HS classification, duty rates and scheme eligibility depend on product specs, origin, import purpose and DGFT/customs interpretation. Validate the latest rules and your facts before contracting or shipping · this page is orientation only.",
    introParagraphs: [
      "India import/export is rarely “IEC only”: AD codes, ICEGATE, GST, logistics, FEMA and schemes such as EPCG connect in one stack.",
      "Invoices, HS codes, remittances and clearance data must reconcile · early master-data design and document discipline prevent expensive rework.",
    ],
    roadmapCardsTitle: "Import/export stack · IEC → AD code → ICEGATE → EPCG → SIMS/PIMS",
    roadmapCards: [
      {
        title: "IEC (Importer–exporter code)",
        bullets: [
          "DGFT-managed identifier, typically anchored to the entity PAN.",
          "Ties into imports, exports, overseas remittances, customs filings and bank KYC.",
          "Operating patterns differ for manufacturing, trading and service exports.",
          "[Ops] Align GST, bank accounts and authorised signatories with IEC master data.",
          "[Ops] Material changes may require DGFT updates · calendar them with filings.",
          "[Ops] Multi-site footprints need an internal single source of truth.",
          "[Structure] Branching, merchant exports and third-party export models need an upfront pass.",
        ],
      },
      {
        title: "AD code & banking linkage",
        bullets: [
          "AD (authorised dealer) registration links ports/airports of clearance with forex reporting.",
          "Port-wise AD mapping is often required as operations scale.",
          "Runs alongside export proceeds, import remittances and BRC/FIRC evidence.",
          "[Ops] AD mismatches and missed port registrations delay clearances.",
          "[Ops] Slow bank KYC updates and export receipt reconciliation gaps.",
          "[Treasury] HQ loan recovery, ECB vs trade payments and FEMA reporting hooks.",
        ],
      },
      {
        title: "ICEGATE & customs",
        bullets: [
          "Filings, inspection, valuation and release are largely digital.",
          "Triangulate invoices, packing lists, BL/AWB, bills of entry and shipping bills.",
          "Expect HS, valuation and country-of-origin scrutiny on higher-risk lanes.",
          "[Ops] HS disputes, valuation adjustments, query holds and RMS paths.",
          "[Ops] Documentation mismatches across parties and systems.",
          "[Field] CHA coordination, port delays, demurrage exposure and amendment filings.",
        ],
      },
      {
        title: "EPCG & export promotion schemes",
        bullets: [
          "Capital-goods routes can embed duty benefits subject to conditions.",
          "Export obligation (EO) calendars and utilisation evidence are usually the risk centre.",
          "Advance authorisation, RoDTEP and other DGFT levers sit beside EPCG.",
          "[Ops] EO tracking, utility/installation certificates and DGFT reporting packs.",
          "[Ops] Bonds/LUT linkages, customs audits and EPCG closure hygiene.",
          "[Review] Import utilisation vs books and bonds.",
        ],
      },
      {
        title: "SIMS / PIMS & product regulation",
        bullets: [
          "Steel, paper, electronics, chemicals and other lines may need pre-registration or monitoring.",
          "BIS, WPC, CDSCO and legal metrology can chain into the same shipment.",
          "Manufacturing projects often review this with factory licensing and pollution NOCs.",
          "[Ops] Shipment holds, BIS certification delays and restriction updates.",
          "[Ops] Labelling and packing mismatches with notified standards.",
        ],
      },
    ],
    practicalIssuesTitle: "Common field issues",
    practicalIssues: [
      "IEC vs GST address or HQ data drift",
      "Missing or wrong port AD registrations",
      "HS classification differences driving duty or delay risk",
      "ICEGATE integration or transmission errors",
      "BL vs invoice mismatches (qty/value/description)",
      "Weak origin/proof packs for buyers or authorities",
      "Lost track of EPCG EO / utility / utilisation milestones",
      "Port-specific add-on document demands",
    ],
    processFlowTitle: "Typical operating flow",
    processPhases: [
      {
        title: "Step 1 · Structure the stack",
        bullets: ["IEC", "GST", "Bank accounts", "AD codes (incl. port-wise mapping)"],
      },
      {
        title: "Step 2 · Contract & product review",
        bullets: ["HS classification", "Duty rates & valuation posture", "Import restrictions", "Scheme fit (EPCG/AA, etc.)"],
      },
      {
        title: "Step 3 · Shipment & clearance",
        bullets: ["Shipping documents (BL/AWB, packing lists)", "ICEGATE filings", "Customs clearance & inspection handling"],
      },
      {
        title: "Step 4 · Accounting & forex hygiene",
        bullets: ["GST (import/export alignment & refunds)", "Remittances", "BRC/FIRC packs", "Import costing in books"],
      },
    ],
    industryTableTitle: "Manufacturing project touchpoints",
    industryCol1: "Theme",
    industryCol2: "What to pressure-test",
    industryRows: [
      { industry: "Factory licensing", issues: "Capacity, product list and pollution NOC vs imported machinery/raw specs" },
      { industry: "Raw-material imports", issues: "HS, origin, restricted lines and SIMS/PIMS pre-conditions" },
      { industry: "EPCG", issues: "EO, utility/install proofs, bonds/LUT and customs/DGFT reporting on one timeline" },
      { industry: "GST & refunds", issues: "Exports, capital goods and schemes reconciled with returns, books and ICEGATE" },
      { industry: "Export incentives", issues: "Evidence windows and product coverage (e.g. RoDTEP-style levers)" },
      { industry: "HT power / machinery imports", issues: "Licences, customs classification and inspection paths" },
      { industry: "DG set imports", issues: "Regulatory, noise/environment conditions and clearance paperwork" },
      { industry: "Customs valuation", issues: "Related-party pricing, royalties and assists that may attract adjustments" },
    ],
    msvScopeTitle: "How MSV can help",
    msvScopeItems: [
      "IEC registration, changes and internal master-data hygiene",
      "AD code registration and port mapping",
      "DGFT operational support and scheme reviews",
      "EPCG and broader import/export scheme structuring",
      "GST, ICEGATE and banking data reconciliation",
      "Import/export accounting and tax alignment",
      "FEMA, remittances and BRC/FIRC workflows",
      "Manufacturing capex and import structuring",
    ],
    relatedIntro: "Often reviewed in the same operating stack.",
    relatedTitle: "Related pages",
    relatedLinks: [
      { href: "/services/gst-practice-guide", label: "GST practice guide" },
      { href: "/services/factory-licensing", label: "Factory & industrial permits" },
      { href: "/services/ecb", label: "ECB / FEMA guide" },
      { href: "/services/india-entry-guide", label: "India market entry guide" },
      { href: "/services", label: "Accounting & tax services" },
      { href: "/services/license-registration", label: "Licence registration" },
      { href: "/services/fdi-fema-guide", label: "FDI & FEMA guide" },
      { href: "/contact", label: "Contact" },
    ],
    closingNote:
      "In live trade, customs, banks, GST, logistics and forex data interlock · how you set documents and operating rules up front materially drives later delays and remediation cost.",
  },
  zh: {
    metaTitle: "印度 IEC 与通关实务",
    metaDescription:
      "IEC、AD code、ICEGATE、HS 归类、港口登记、BRC/FIRC、海关估价、EPCG、DGFT 报送、SIMS/PIMS · 从银行、海关、GST 与外汇视角梳理印度进出口实务。",
    pageTitle: "进出口(IEC)·通关指南",
    pageDescription:
      "制造、分销或总部采购与印度衔接时，IEC、银行 AD、ICEGATE 与优惠政策往往同时出现。本文从运营、资金与合规联动角度，按实务顺序整理关键节点。",
    disclaimer:
      "HS 编码、税率与优惠政策适用取决于产品规格、原产地、进口目的及 DGFT/海关解释。签约或发运前请核对最新规则与事实；本页仅为概览参考。",
    introParagraphs: [
      "印度进出口很少只是“IEC 登记”：AD code、ICEGATE、GST、物流、FEMA 以及 EPCG 等方案通常连成一体。",
      "发票、HS、付汇与通关数据需要相互印证，初期主数据与单证规范能显著降低返工与滞港成本。",
    ],
    roadmapCardsTitle: "进出口运营轴 · IEC → AD code → ICEGATE → EPCG → SIMS/PIMS",
    roadmapCards: [
      {
        title: "IEC（进出口编码）",
        bullets: [
          "由 DGFT 管理，通常与法人 PAN 关联。",
          "连接进出口、跨境付汇、海关申报与银行 KYC。",
          "制造、贸易与服务出口下的单证与流程重点可能不同。",
          "[实务] GST、银行账户与授权签字人与 IEC 主数据一致。",
          "[实务] 信息变更可能需同步更新 DGFT。",
          "[实务] 多地点运营建议建立内部唯一主数据。",
          "[结构] 分支机构、Merchant export、第三方出口等需前置评估。",
        ],
      },
      {
        title: "AD code 与银行联动",
        bullets: [
          "通过授权交易商（AD）登记，把港口/机场通关与外汇申报衔接起来。",
          "业务扩张时常需按港口维度维护 AD 映射。",
          "常与出口收汇、进口付汇及 BRC/FIRC 材料一并管理。",
          "[实务] AD 不一致或港口登记遗漏导致通关延误。",
          "[实务] 银行 KYC 更新滞后、出口收汇对账缺口。",
          "[资金] 总部借款回收、ECB 与贸易付款、FEMA 报送衔接。",
        ],
      },
      {
        title: "ICEGATE 与海关",
        bullets: [
          "申报、查验、估价与放行流程高度数字化。",
          "需核对发票、装箱单、提单/运单、进口申报单与装运单等数据一致性。",
          "高风险路径上 HS、估价与原产地证明会被重点审视。",
          "[实务] HS 争议、估价调整、问询滞留与 RMS 路径。",
          "[实务] 各方系统间单证不一致。",
          "[现场] 报关行协调、港口延误、滞期费风险及改单申报。",
        ],
      },
      {
        title: "EPCG 与出口促进方案",
        bullets: [
          "资本货物路径在满足条件时可嵌入关税优惠。",
          "出口义务（EO）与履行证明通常是风险中心。",
          "除 EPCG 外，还可评估提前许可、RoDTEP 等工具。",
          "[实务] EO 跟踪、用电/装机证明及 DGFT 报送材料包。",
          "[实务] 保证金/LUT 衔接、海关稽查与 EPCG 结案。",
          "[复核] 进口利用与账册、担保的一致性。",
        ],
      },
      {
        title: "SIMS / PIMS 与品目监管",
        bullets: [
          "钢铁、纸张、电子、化工等品目可能涉及预登记或监测制度。",
          "可能串联 BIS、WPC、CDSCO、Legal Metrology 等要求。",
          "制造项目常与工厂许可及环保 NOC 一并评估。",
          "[实务] 扣货风险、BIS 认证周期、限制清单更新。",
          "[实务] 标签与包装与通报标准不一致。",
        ],
      },
    ],
    practicalIssuesTitle: "常见实务问题",
    practicalIssues: [
      "IEC 与 GST 地址或总部信息不一致",
      "港口 AD 登记缺失或映射错误",
      "HS 归类差异带来的补税或延误风险",
      "ICEGATE 对接或传输错误",
      "提单与发票的数量/金额/品名不一致",
      "原产地与证明链条薄弱",
      "EPCG 义务/用电等履行节点跟踪缺失",
      "不同港口追加单证要求",
    ],
    processFlowTitle: "一般运营流程",
    processPhases: [
      {
        title: "第一步：搭建基础结构",
        bullets: ["IEC", "GST", "银行账户", "AD code（含按港登记）"],
      },
      {
        title: "第二步：合同与品目复核",
        bullets: ["HS 编码与归类", "税率与估价立场", "进口限制", "方案适用性（如 EPCG/提前许可）"],
      },
      {
        title: "第三步：发运与通关",
        bullets: ["运输单证（提单/运单、装箱单等）", "ICEGATE 申报", "海关放行与查验配合"],
      },
      {
        title: "第四步：会计与外汇收尾",
        bullets: ["GST（进出口衔接与退税）", "付汇/收汇", "BRC/FIRC", "进口成本入账"],
      },
    ],
    industryTableTitle: "制造项目常见衔接",
    industryCol1: "主题",
    industryCol2: "重点核对",
    industryRows: [
      { industry: "工厂许可", issues: "产能、品目与环保 NOC 同进口设备/原料规格对齐" },
      { industry: "原料进口", issues: "HS、原产地、限制品目及 SIMS/PIMS 前置条件" },
      { industry: "EPCG", issues: "EO、用电/装机证明、担保/LUT 与海关/DGFT 报送同时间线" },
      { industry: "GST 与退税", issues: "出口、资本货物与优惠方案同申报、账册及 ICEGATE 对齐" },
      { industry: "出口激励", issues: "证据窗口与品目覆盖（如 RoDTEP 类工具）" },
      { industry: "高压电/设备进口", issues: "许可、海关归类与查验路径" },
      { industry: "柴油发电机组进口", issues: "监管、噪声/环境条件与通关资料" },
      { industry: "海关估价", issues: "关联方定价、特许权使用费与协助费用等调整可能" },
    ],
    msvScopeTitle: "MSV 可支持范围",
    msvScopeItems: [
      "IEC 登记、变更与内部主数据维护",
      "AD code 登记与港口映射",
      "DGFT 实务与方案评估支持",
      "EPCG 及更广泛进出口方案",
      "GST、ICEGATE 与银行数据一致性复核",
      "进出口会计与税务结构",
      "FEMA、付汇与 BRC/FIRC 流程",
      "制造项目投资与进口结构",
    ],
    relatedIntro: "常与同一运营栈一并审阅。",
    relatedTitle: "相关页面",
    relatedLinks: [
      { href: "/services/gst-practice-guide", label: "GST 实务指南" },
      { href: "/services/factory-licensing", label: "工厂与工业许可" },
      { href: "/services/ecb", label: "ECB·FEMA 实务指南" },
      { href: "/services/india-entry-guide", label: "印度市场进入指南" },
      { href: "/services", label: "会计与税务服务" },
      { href: "/services/license-registration", label: "许可证登记" },
      { href: "/services/fdi-fema-guide", label: "FDI·FEMA 指南" },
      { href: "/contact", label: "联系" },
    ],
    closingNote:
      "实际运营中，海关、银行、GST、物流与外汇数据相互勾连；初期的单证结构与内部规则如何设定，会显著影响后续延误与整改成本。",
  },
};

const indiaEntryGuide: Bundle = {
  ko: {
    metaTitle: "인도 진출 가이드",
    metaDescription:
      "법인 설립을 넘어 세무·FEMA·은행·인허가·노무·비자·공장·본사 보고까지 병렬 설계하는 인도 진출 실무 허브. 로드맵·거버넌스·이슈·단계·산업별 체크포인트.",
    pageTitle: "인도 진출 가이드",
    pageDescription:
      "인도 진출은 단일 인허가가 아니라 세무·외환·은행·인허가·노무·비자·공장 운영이 동시에 연결되는 프로젝트입니다. 병렬 워크스트림으로 설계할수록 의사결정 지연이 줄어듭니다.",
    disclaimer:
      "산업·주(邦)·시점·거래 구조에 따라 우선순위와 필수 절차가 달라질 수 있습니다. 본 페이지는 참고용 개요이며, 실행 전 전문가 검토가 필요합니다.",
    introParagraphs: [
      "인도 진출은 단순 법인 설립이 아니라, 세무·외환·은행·인허가·노무·비자·공장 운영 등이 동시에 연결되는 프로젝트입니다.",
      "실제 실무에서는 각 절차의 선후관계와 승인 일정이 서로 영향을 주기 때문에, 초기 단계에서 전체 로드맵을 함께 설계하는 경우가 많습니다.",
    ],
    roadmapCardsTitle: "초기 로드맵 · 왜 필요한지, 무엇을 묶어 볼지",
    roadmapCards: [
      {
        title: "엔티티 형태·자본·지분 구조",
        bullets: [
          "Private Limited, LLP, Branch Office 등 법적 형태 검토",
          "외국인 투자(FDI) 가능 여부·경로(자동/승인) 및 섹터별 제한",
          "지분율·투자 방식·자본금 유치·증자 계획",
          "FEMA·RBI 신고 구조(FCGPR/FCTRS 등) 사전 정리",
          "JV·현지 파트너 구조 여부 및 계약 골격(SHA 등)",
        ],
      },
      {
        title: "GST / TDS / 법인세 가동",
        bullets: [
          "GST Registration 및 과세/면세 체인 설계",
          "TAN·TDS 운영 체계(지급·역할·보고)",
          "회계 정책·COA·본사 보고 매핑(Accounting policy)",
          "Invoice·크레딧 노트 구조, E-Invoice 적용 여부 검토",
          "Input Tax Credit 관리·대사(GSTR-2B 등) 루틴",
        ],
      },
      {
        title: "은행·송금·AD Code",
        bullets: [
          "법인 계좌 개설·은행 KYC 및 서명권자(DSC 등) 정리",
          "외화 송금·배당·증자 등 자본 이동 구조",
          "Capital remittance·대주주 차입 등 자금 조달 경로",
          "ECB 등 외채 가능성은 별도 한도·절차와 연계 검토",
          "IEC·AD Code 등록 및 ICEGATE·통관 흐름과의 연결",
        ],
      },
      {
        title: "비자·FRRO",
        bullets: [
          "Employment / Business visa 등 체류 목적별 적합성",
          "FRRO 등록·연장·주소 변경 등 체류 관리",
          "PAN·Aadhaar 등 식별·KYC 이슈와의 정합",
          "외국인 급여·TDS·소득세 처리와의 연계",
        ],
      },
      {
        title: "공장·환경·소방",
        bullets: [
          "Factory licence, Pollution NOC / consent",
          "Fire NOC, Building / layout approval",
          "Electricity connection·부하(sanction) 일정",
          "산업단지·토지 용도·접근성 검토",
        ],
      },
      {
        title: "급여·PF·ESI",
        bullets: [
          "Payroll setup·급여 주기·비용 배분",
          "PF/ESI registration 및 납부·보고 캘린더",
          "Professional Tax(해당 주) 반영",
          "Employment agreement·휴가·퇴직금(Gratuity) 등 정책 검토",
        ],
      },
    ],
    governanceTitle: "데이터·거버넌스 · 본사와 현장을 잇는 운영 설계",
    governanceBlocks: [
      {
        title: "본사 보고·승인·시스템",
        bullets: [
          "한국 본사 보고 일정과 인도 세무·법정 마감 정렬",
          "월별 Closing calendar·증빙 마감 규칙",
          "내부 승인 체계(지출·송금·계약) 설계",
          "송금 승인 프로세스와 근거 문서 번들",
          "ERP·Dropbox(또는 동등 저장소)·문서 권한 관리",
        ],
      },
      {
        title: "신고준수 달력·문서·감사 추적",
        bullets: [
          "GST/TDS/PF/ESI/ROC 등 Due date tracking",
          "세관·외환·노무 Notice 대응 이력 관리",
          "감사·세무조사 대응 자료 보관 체계",
          "계약서 버전 관리·DSC/DIN 관리",
          "Invoice approval tracking·Audit trail 확보",
          "Vendor KYC 주기 및 갱신",
        ],
      },
    ],
    practicalIssuesTitle: "실무상 자주 발생하는 이슈",
    practicalIssues: [
      "GST 등록 전 거래가 먼저 발생한 경우의 정합 처리",
      "은행 계좌 개설 지연으로 인한 자금·급여 스케줄 붕괴",
      "송금 목적 코드·근거 서류 불일치로 인한 반송",
      "FRRO 일정 지연으로 체류·근무 연속성 리스크",
      "공장 전기 연결·시운전 지연으로 가동일 미루어짐",
      "GST 등록 주소와 임대차 계약·실제 사업장 불일치",
      "직원 Offer letter 현지법·그룹 HR 정책과의 정합 문제",
      "본사 승인 지연으로 세무 신고·납부·송금이 밀리며 페널티 리스크",
    ],
    processFlowTitle: "일반적인 진행 흐름(참고)",
    processPhases: [
      {
        title: "STEP 1. 구조 검토",
        bullets: ["투자 구조·FDI 경로", "업종 제한·조건부 투자", "자본금·증자·배당 정책"],
      },
      {
        title: "STEP 2. 법인 설립",
        bullets: ["DSC/DIN", "INC 서류·이름 승인", "COI 발급·법인 성립일 기준 정리"],
      },
      {
        title: "STEP 3. 세무·은행",
        bullets: ["PAN/TAN", "GST", "Bank account·서명·뱅킹 토큰"],
      },
      {
        title: "STEP 4. 운영 준비",
        bullets: ["임대차·사업장", "직원 채용·계약", "Payroll·PF/ESI"],
      },
      {
        title: "STEP 5. 실제 운영",
        bullets: ["회계·세무 마감", "본사·현지 송금", "ROC·세무·노무 컴플라이언스 유지"],
      },
    ],
    industryTableTitle: "산업별로 달라지는 주요 이슈(요약)",
    industryCol1: "산업",
    industryCol2: "주요 이슈",
    industryRows: [
      { industry: "제조업", issues: "공장 허가·전기·환경(Pollution)·소방" },
      { industry: "무역", issues: "IEC·AD Code·ICEGATE·통관" },
      { industry: "IT/서비스", issues: "GST·수출·LUT·원천(TDS) 설계" },
      { industry: "건설", issues: "GST on advance·계약 단계별 과세·하도급" },
      { industry: "외식업", issues: "FSSAI·지방 허가·위생·소방" },
      { industry: "호텔", issues: "Trade licence·관광·주류·소방 등 복합 허가" },
    ],
    msvScopeTitle: "MSV가 실제로 함께 다루는 범위",
    msvScopeItems: [
      "법인 설립 및 투자·지분 구조 검토",
      "GST·TDS·회계 체계 구축과 운영 마감",
      "은행 계좌·송금·외환 신고 실무 지원",
      "FRRO·비자·체류 관련 지원",
      "공장·산업 인허가·라이선스 실무 지원",
      "Payroll·PF/ESI·노무 컴플라이언스 운영",
      "한국 본사 보고와 인도 법정 일정을 맞춘 거버넌스 설계",
    ],
    relatedIntro: "바로 이어서 읽으면 좋은 서비스·가이드입니다.",
    relatedTitle: "관련 서비스 및 가이드",
    relatedLinks: [
      { href: "/services/corporate-incorporation", label: "법인 설립" },
      { href: "/services/gst-practice-guide", label: "GST 실무 안내" },
      { href: "/services/fdi-fema-guide", label: "FDI·FEMA 안내" },
      { href: "/services/frro", label: "FRRO 서비스" },
      { href: "/services", label: "회계·세무 서비스" },
      { href: "/services/hr-payroll", label: "HR·Payroll" },
      { href: "/services/import-export-iec", label: "수출입(IEC)·통관" },
      { href: "/services/compliance-calendar", label: "신고준수 달력" },
      { href: "/services/personal-income-tax-calculator", label: "급여 TDS 계산기" },
    ],
    closingNote:
      "실제 인도 진출은 단일 인허가보다 ‘여러 절차의 연결’이 중요하며, 초기 구조 설계에 따라 이후 운영 효율과 세무 리스크가 크게 달라질 수 있습니다.",
  },
  en: {
    metaTitle: "India market entry guide",
    metaDescription:
      "Beyond incorporation: tax, FEMA, banking, permits, HR, visas and factories as parallel workstreams · roadmap, governance, issues, phases and sector notes.",
    pageTitle: "India entry guide",
    pageDescription:
      "India entry is not a single permit · it is a programme where tax, FX, banking, licences, labour, visas and plant operations connect at once. Designing parallel tracks early reduces decision lag.",
    disclaimer: "Priorities and mandatory steps vary by sector, state, timing and transaction structure. This page is an overview · not a substitute for tailored advice.",
    introParagraphs: [
      "Setting up in India is rarely “only” incorporation: GST, FEMA, banking, permits, employment, visas and factory operations tend to move together.",
      "In practice, sequencing and approval timelines interact · teams therefore often draft an end-to-end roadmap at the outset rather than treating each workstream in isolation.",
    ],
    roadmapCardsTitle: "Early roadmap · what to bundle and why it matters",
    roadmapCards: [
      {
        title: "Entity form, capital & equity",
        bullets: [
          "Compare Private Limited, LLP, branch and other structures",
          "FDI route (automatic vs approval), sector caps and conditions",
          "Shareholding, investment mechanics and capital plan",
          "FEMA/RBI reporting posture (e.g. FCGPR/FCTRS)",
          "JV/partner models and early SHA-style alignment",
        ],
      },
      {
        title: "GST, TDS & corporate tax go-live",
        bullets: [
          "GST registration and taxable/exempt chain design",
          "TAN/TDS operating model (withholding, roles, returns)",
          "Accounting policies, chart of accounts and HQ mapping",
          "Invoice/credit-note patterns; e-invoicing applicability",
          "ITC discipline and reconciliation cadence (e.g. GSTR-2B)",
        ],
      },
      {
        title: "Banking, remittances & AD codes",
        bullets: [
          "Corporate account opening, KYC and signing arrangements",
          "FX for equity, intercompany and dividend-style flows",
          "Capital remittances and shareholder loan patterns where relevant",
          "ECB-style debt is a separate track · plan limits and filings early",
          "IEC/AD code alignment with customs/ICEGATE flows",
        ],
      },
      {
        title: "Visas & FRRO",
        bullets: [
          "Employment vs business visa suitability",
          "FRRO registration, extensions and address updates",
          "PAN/Aadhaar-style ID interactions for payroll and banking",
          "Payroll, TDS and personal tax touchpoints for expatriates",
        ],
      },
      {
        title: "Factory, environment & fire",
        bullets: [
          "Factory licence and pollution consent/NOC",
          "Fire NOC and building/layout approvals",
          "Power sanction, load and energisation schedule",
          "Industrial estate/land use and access constraints",
        ],
      },
      {
        title: "Payroll, PF & ESI",
        bullets: [
          "Payroll cadence and cost allocation",
          "PF/ESI registration and contribution calendars",
          "Professional tax where the state applies it",
          "Employment contracts, leave rules and gratuity posture",
        ],
      },
    ],
    governanceTitle: "Data & governance · linking HQ and India operations",
    governanceBlocks: [
      {
        title: "HQ reporting, approvals & systems",
        bullets: [
          "Align Korea/HQ reporting cycles with India statutory deadlines",
          "Month-end closing calendar and evidence cut-offs",
          "Spend, remittance and contract approval workflows",
          "Remittance approval packs and audit-friendly documentation",
          "ERP, file storage and least-privilege access design",
        ],
      },
      {
        title: "Compliance calendar & document control",
        bullets: [
          "Track GST/TDS/PF/ESI/ROC due dates in one board",
          "Log customs, FX and labour notices and responses",
          "Archive packs for audit and tax enquiries",
          "Contract versioning; DSC/DIN hygiene",
          "Invoice approvals and immutable audit trails",
          "Vendor KYC refresh cycles",
        ],
      },
    ],
    practicalIssuesTitle: "Issues we see often in the field",
    practicalIssues: [
      "Transactions occur before GST registration is effective · reconciliation and disclosure risk",
      "Bank account opening slips, freezing payroll and vendor payments",
      "Purpose-of-remittance codes or evidence packs rejected by banks",
      "FRRO delays affecting continuity of stay and work permissions",
      "Factory power connection and commissioning slip production go-live",
      "GST principal place of business misaligned with lease/actual site",
      "Offer letters clash between group HR templates and India labour practice",
      "HQ approval latency pushes filings/payments into penalty territory",
    ],
    processFlowTitle: "A typical sequencing pattern",
    processPhases: [
      {
        title: "STEP 1 · Structure",
        bullets: ["Investment route and FDI constraints", "Sector caps and conditional approvals", "Capital and distribution policy"],
      },
      {
        title: "STEP 2 · Incorporation",
        bullets: ["DSC/DIN", "INC filings and name approval", "COI and “day-1” legal baseline"],
      },
      {
        title: "STEP 3 · Tax & banking",
        bullets: ["PAN/TAN", "GST", "Banking, signatories and tokens"],
      },
      {
        title: "STEP 4 · Operating readiness",
        bullets: ["Premises/lease", "Hiring and contracts", "Payroll, PF and ESI"],
      },
      {
        title: "STEP 5 · Steady-state",
        bullets: ["Bookkeeping and tax close", "Treasury and remittances", "ROC and ongoing compliance"],
      },
    ],
    industryTableTitle: "Sector flavour · headline issues",
    industryCol1: "Sector",
    industryCol2: "Typical focus",
    industryRows: [
      { industry: "Manufacturing", issues: "Factory licence, power, pollution, fire" },
      { industry: "Trading", issues: "IEC, AD code, ICEGATE and customs" },
      { industry: "IT / services", issues: "GST, exports, LUT and TDS design" },
      { industry: "Construction", issues: "GST on advances, contract staging, subcontractors" },
      { industry: "F&B", issues: "FSSAI, local licences, hygiene and fire" },
      { industry: "Hospitality", issues: "Trade licence stack with tourism/alcohol/fire variants" },
    ],
    msvScopeTitle: "Where MSV typically plugs in",
    msvScopeItems: [
      "Incorporation and equity/FDI structuring support",
      "GST/TDS and accounting operating model build-out",
      "Banking, remittance and FX filing execution support",
      "FRRO/visa administration support",
      "Factory, industrial permits and licensing coordination",
      "Payroll, PF/ESI and labour compliance operations",
      "Governance design aligning HQ reporting with India deadlines",
    ],
    relatedIntro: "Handy next reads on this site.",
    relatedTitle: "Related services & guides",
    relatedLinks: [
      { href: "/services/corporate-incorporation", label: "Incorporation" },
      { href: "/services/gst-practice-guide", label: "GST practice guide" },
      { href: "/services/fdi-fema-guide", label: "FDI & FEMA guide" },
      { href: "/services/frro", label: "FRRO services" },
      { href: "/services", label: "Accounting & tax" },
      { href: "/services/hr-payroll", label: "HR & payroll" },
      { href: "/services/import-export-iec", label: "IEC & customs" },
      { href: "/services/compliance-calendar", label: "Compliance calendar" },
      { href: "/services/personal-income-tax-calculator", label: "Salary TDS calculator" },
    ],
    closingNote:
      "In practice, India entry is less about any single licence and more about how procedures connect; early structural choices materially change operating efficiency and downstream tax risk.",
  },
  zh: {
    metaTitle: "印度市场进入指南",
    metaDescription: "除设立外，同步梳理税务、外汇、银行、许可、人力、签证与工厂等并行工作流、治理要点与行业差异。",
    pageTitle: "印度进入指南",
    pageDescription:
      "进入印度通常不是“办完设立就结束”，而是税务、外汇、银行、许可、用工、签证与工厂等环节同时咬合的项目。越早用并行路线图统筹，越能减少决策滞后。",
    disclaimer: "行业、所在邦与时间不同，优先事项与必备程序会有差异。本文为概览，执行前请咨询专业人士。",
    introParagraphs: [
      "印度进入往往不只是注册公司，而是税务、外汇、银行、许可、劳动、签证与工厂运营等同时联动的项目。",
      "实务中各步骤的先后与审批节奏会相互影响，因此常见做法是在早期就绘制端到端路线图，而不是孤立推进单项手续。",
    ],
    roadmapCardsTitle: "初期路线图 · 需要打包考虑的模块",
    roadmapCards: [
      {
        title: "主体形式·资本与股权",
        bullets: [
          "比较 Private Limited、LLP、分公司等形态",
          "FDI 路径（自动/审批）、行业上限与条件",
          "股权结构、出资方式与资本金计划",
          "FEMA/RBI 报送框架（如 FCGPR/FCTRS）",
          "是否采用 JV 及早期股东安排要点",
        ],
      },
      {
        title: "GST / TDS / 企业所得税落地",
        bullets: [
          "GST 登记与应税/免税链条设计",
          "TAN/TDS 扣缴与申报机制",
          "会计政策、科目表与总部报表映射",
          "发票/贷项通知模式；电子发票适用性",
          "进项抵扣管理与对账节奏（如 GSTR-2B）",
        ],
      },
      {
        title: "银行·汇款·AD code",
        bullets: [
          "法人账户开立、KYC 与签章安排",
          "资本金、关联方往来、股息等跨境路径",
          "资本项汇款与股东借款等结构（如适用）",
          "外债(ECB)等需单独评估额度与申报",
          "IEC/AD code 与 ICEGATE/通关衔接",
        ],
      },
      {
        title: "签证与 FRRO",
        bullets: ["就业/商务签证适配", "FRRO 登记、延期与地址变更", "与 PAN 等身份信息的衔接", "外籍员工薪酬与个税代扣"],
      },
      {
        title: "工厂·环保·消防",
        bullets: ["工厂许可与环保同意/NOC", "消防与建筑/平面审批", "电力批复、负荷与送电排期", "产业园/用地与交通条件"],
      },
      {
        title: "薪酬·PF·ESI",
        bullets: ["薪酬周期与费用分摊", "PF/ESI 登记与缴费申报日历", "Professional Tax（如适用）", "劳动合同、假期与离职金安排"],
      },
    ],
    governanceTitle: "数据与治理 · 连接总部与印度现场",
    governanceBlocks: [
      {
        title: "总部报告、审批与系统",
        bullets: [
          "对齐韩国总部报告节奏与印度法定截止日",
          "月度结账日历与凭证截止规则",
          "费用、汇款与合同审批流",
          "汇款审批资料包与可追溯性",
          "ERP、文件存储与最小权限",
        ],
      },
      {
        title: "合规日历与文档控制",
        bullets: [
          "在同一面板跟踪 GST/TDS/PF/ESI/ROC 等截止日",
          "海关、外汇与劳动类通知的应对留痕",
          "审计与税务问询资料归档",
          "合同版本与 DSC/DIN 管理",
          "发票审批与不可篡改审计轨迹",
          "供应商 KYC 更新周期",
        ],
      },
    ],
    practicalIssuesTitle: "实务中较常见的问题",
    practicalIssues: [
      "GST 登记生效前已发生交易的处理与合规风险",
      "银行账户开立拖延导致薪酬与供应商付款受阻",
      "汇款用途代码或佐证材料与银行要求不一致被退回",
      "FRRO 延误影响居留与工作连续性",
      "工厂送电与调试拖延影响投产节点",
      "GST 注册地址与租赁/实际经营地不一致",
      "Offer letter 与集团 HR 模板及当地劳动法冲突",
      "总部审批滞后导致申报/缴税/汇款逾期风险",
    ],
    processFlowTitle: "常见推进顺序",
    processPhases: [
      { title: "第一步：结构", bullets: ["投资路径与 FDI 限制", "行业条件与审批", "资本与分配政策"] },
      { title: "第二步：设立", bullets: ["DSC/DIN", "INC 材料与名称核准", "COI 与“首日”基线"] },
      { title: "第三步：税务与银行", bullets: ["PAN/TAN", "GST", "银行账户与签章"] },
      { title: "第四步：运营准备", bullets: ["场地/租赁", "招聘与合同", "薪酬与 PF/ESI"] },
      { title: "第五步：稳定运营", bullets: ["会计与税务结账", "资金与汇款", "ROC 与持续合规"] },
    ],
    industryTableTitle: "行业差异（要点）",
    industryCol1: "行业",
    industryCol2: "主要关注点",
    industryRows: [
      { industry: "制造业", issues: "工厂许可、电力、环保、消防" },
      { industry: "贸易", issues: "IEC、AD code、ICEGATE 与通关" },
      { industry: "IT/服务", issues: "GST、出口、LUT 与 TDS 设计" },
      { industry: "建筑", issues: "预收款 GST、合同分段与分包" },
      { industry: "餐饮", issues: "FSSAI、地方许可、卫生与消防" },
      { industry: "酒店", issues: "营业许可与旅游/酒类/消防等组合要求" },
    ],
    msvScopeTitle: "MSV 常见支持范围",
    msvScopeItems: [
      "公司设立及股权/FDI 结构协助",
      "GST·TDS 与会计体系搭建及结账运营",
      "银行账户、汇款与外汇报送执行协助",
      "FRRO/签证事务协助",
      "工厂与工业许可、证照统筹",
      "薪酬、PF/ESI 与劳动合规运营",
      "对齐总部报告与印度法定节奏的治理设计",
    ],
    relatedIntro: "建议继续阅读的站内页面：",
    relatedTitle: "相关服务与指南",
    relatedLinks: [
      { href: "/services/corporate-incorporation", label: "公司设立" },
      { href: "/services/gst-practice-guide", label: "GST 实务指南" },
      { href: "/services/fdi-fema-guide", label: "FDI 与 FEMA 指南" },
      { href: "/services/frro", label: "FRRO 服务" },
      { href: "/services", label: "会计与税务服务" },
      { href: "/services/hr-payroll", label: "HR·薪酬" },
      { href: "/services/import-export-iec", label: "IEC 与通关" },
      { href: "/services/compliance-calendar", label: "合规日历" },
      { href: "/services/personal-income-tax-calculator", label: "工资 TDS 计算器" },
    ],
    closingNote:
      "实务上，印度进入的关键往往不在于单一证照，而在于多环节如何衔接；初期的结构选择会显著影响后续运营效率与税务风险。",
  },
};

const factoryLicensing: Bundle = {
  ko: {
    metaTitle: "공장 설립·산업 인허가",
    metaDescription:
      "Factory licence, Pollution consent, Fire NOC, HT/LT 전력, Building approval, Layout, DG set, Inspector · 인도 제조·공장 PM 관점의 인허가·일정·업종별 체크포인트.",
    pageTitle: "공장·산업 인허가 안내",
    pageDescription:
      "공장은 단일 허가가 아니라 패키지입니다. 전력·환경·건축·세무·수출입 구조가 동시에 걸리므로, 현장 일정을 기준으로 로드맵을 짜는 PM 관점이 중요합니다.",
    disclaimer:
      "동일 업종이라도 주(State)·산업단지·관할 기관에 따라 요구 서류 및 승인 절차가 달라질 수 있습니다. 실제 적용 기준은 현장 위치·전력 사용량·배출 유형·건축 구조·산업 분류에 따라 달라질 수 있으며, 본 페이지는 참고용 개요입니다.",
    introParagraphs: [
      "인도 내 제조업·공장 운영은 단순 Factory Licence 취득만으로 완료되지 않으며, 토지 용도·건축 승인·전력·환경·소방·배출·노무·수출입 구조까지 동시에 검토되는 경우가 많습니다.",
      "실제 프로젝트에서는 인허가 간 선후관계와 현장 일정이 연결되므로, 초기 단계에서 전체 로드맵을 함께 검토하는 것이 중요합니다.",
    ],
    roadmapCardsTitle: "1. 핵심 허가 · 설명형 체크(실무 관점)",
    roadmapCards: [
      {
        title: "Factory Licence",
        bullets: [
          "제조업 운영을 위한 기본 공장 허가로, 직원 수·설비·전력 사용량 등 기준을 함께 검토하는 경우가 많습니다.",
          "Inspector 승인 및 현장 기준 확인이 필요할 수 있으며, 공장 배치(Layout)와 안전 기준 검토가 포함될 수 있습니다.",
          "[실무] 제조 공정 변경 시 수정·재신고가 필요할 수 있습니다.",
          "[실무] 임대 공장 사용 시 임대차·용도·회복 조항과 인허가 주소 정합을 함께 봅니다.",
        ],
      },
      {
        title: "Pollution NOC / Consent",
        bullets: [
          "환경 관련 승인·배출 동의 절차로, 업종별 Red / Orange / Green category 분류에 따라 요건이 달라질 수 있습니다.",
          "Air / Water consent, 폐수·배출·소음·폐기물 기준을 초기에 스코프링합니다.",
          "[실무] 일부 업종은 ETP/STP 요구가 붙을 수 있고, DG set(발전기) 포함 여부도 환경 조건과 연계됩니다.",
          "[실무] 생산 개시 전 Consent to Operate(CTO) 등 운영 단계 동의가 별도로 필요할 수 있습니다.",
        ],
      },
      {
        title: "Fire NOC",
        bullets: [
          "소방 안전 기준 승인으로, 건물 면적·층수·창고 구조 등에 따라 기준이 달라질 수 있습니다.",
          "화재 경보·스프링클러·비상구 등 설계·시공 요건이 패키지로 검토됩니다.",
          "[실무] 창고형 공장은 별도 기준이 적용될 수 있고, 정기 점검·갱신 요구가 이어질 수 있습니다.",
        ],
      },
      {
        title: "전력 접속·부하 승인 (HT/LT)",
        bullets: [
          "공장 전력 사용량에 따른 Load sanction·접속 방식(HT/LT)을 설비 도입 전에 고정하는 것이 유리합니다.",
          "Transformer·DG backup·Panel 구조 등이 생산 라인과 동시에 설계됩니다.",
          "[실무] 전력 증설·송전선로 공사에 수개월 이상이 걸릴 수 있어, 생산 장비 사양과 전력 계획을 한 타임라인에 올립니다.",
        ],
      },
      {
        title: "Building / Layout approval",
        bullets: [
          "건축 승인 및 공장 배치(Layout) 승인으로, 산업단지·지역 zoning·용도 규정과 연계됩니다.",
          "구조 변경·증축 시 재승인이 필요할 수 있으며, Fire / Factory / Pollution 승인과 상호 참조됩니다.",
          "[실무] 일부 지역은 Completion Certificate 등 준공·검수 체인이 길어질 수 있습니다.",
        ],
      },
    ],
    practicalIssuesTitle: "실무상 자주 발생하는 이슈",
    practicalIssues: [
      "임대 공장 주소와 GST 등록 주소(Principal place of business) 불일치",
      "건축 승인 도면과 실제 현장 구조·변경 공사의 차이",
      "전력 증설·송전 지연으로 시운전·가동 일정 전반이 밀림",
      "Pollution category 재분류로 조건·서류가 한꺼번에 바뀜",
      "DG set 도입 시 환경 기준·소음·배출 추가 요구",
      "소방 기준 보완(스프링클러·분할·피난 동선) 요청",
      "Factory Inspector 현장 지적에 따른 Layout·안전 조치 수정",
      "산업단지 내부 승인(개발사·운영사)과 정부 승인 일정의 미스매치",
    ],
    processFlowTitle: "프로젝트 일반 흐름(참고)",
    processPhases: [
      {
        title: "STEP 1. 부지·업종 검토",
        bullets: ["산업단지 여부·개발사 조건", "토지 용도·Zoning", "전력 가능 용량·접속 거리", "접근성·물류·인력 풀"],
      },
      {
        title: "STEP 2. 설계 및 Layout",
        bullets: ["공장 배치·동선", "장비 배치와 안전 거리", "소방·환경 전제 조건 반영", "향후 증설 시나리오"],
      },
      {
        title: "STEP 3. 인허가 접수",
        bullets: ["Pollution consent / NOC", "Factory licence", "Fire NOC", "Building / layout approval"],
      },
      {
        title: "STEP 4. 전력·유틸리티",
        bullets: ["HT/LT connection·패널", "DG setup(환경 조건 포함)", "Water·폐수 연계(ETP/STP 등)"],
      },
      {
        title: "STEP 5. 운영 개시",
        bullets: ["Consent to Operate 등 운영 단계 동의", "직원·노무 등록", "생산 개시·시운전·내부 컴플라이언스"],
      },
    ],
    industryTableTitle: "업종별 주요 검토 예시",
    industryCol1: "업종",
    industryCol2: "주요 검토",
    industryRows: [
      { industry: "자동차 부품", issues: "Press·Noise·HT power·진동" },
      { industry: "화학", issues: "Hazardous waste·Pollution·저장탱크" },
      { industry: "식품", issues: "FSSAI·위생·폐수·냉장 체인" },
      { industry: "전자", issues: "E-waste·ESD·청정도/동선" },
      { industry: "물류창고", issues: "Fire NOC·창고 기준·적재 높이" },
      { industry: "철강·가공", issues: "Furnace·배출·고압 전력·안전 거리" },
    ],
    msvScopeTitle: "MSV 연계 지원",
    msvScopeItems: [
      "법인 설립 및 투자·지분 구조 검토",
      "공장 임대차·부지·용도 검토",
      "GST·수출입(IEC/AD)·통관 구조와의 연계",
      "전력·환경·소방 대응 및 관할 기관 커뮤니케이션",
      "외국인 직원 비자·FRRO",
      "회계·Payroll·컴플라이언스 운영",
      "한국 본사 보고·승인 체계와 인도 현장 일정 정렬",
    ],
    timelineTable: {
      title: "일반적인 예상 일정",
      colItem: "항목",
      colDuration: "일반적인 기간",
      rows: [
        { item: "Factory Licence", duration: "약 1~3개월" },
        { item: "Pollution Consent", duration: "약 1~4개월" },
        { item: "Fire NOC", duration: "약 1~2개월" },
        { item: "HT 전력 연결", duration: "약 2~6개월" },
        { item: "전체 공장 가동 준비", duration: "약 3~12개월" },
      ],
      footnote:
        "실제 기간은 지역·업종·전력 용량·건축 상태 및 관할 기관 일정에 따라 크게 달라질 수 있습니다. 병렬 작업 가능 여부도 현장 조건에 따라 달라집니다.",
    },
    relatedIntro: "공장·인허가와 맞물리는 다른 페이지입니다.",
    relatedTitle: "관련 페이지",
    relatedLinks: [
      { href: "/services/corporate-incorporation", label: "법인 설립" },
      { href: "/services/import-export-iec", label: "수출입(IEC)" },
      { href: "/services/license-registration", label: "라이선스·인허가 등록" },
      { href: "/services", label: "회계·세무 서비스" },
      { href: "/services/india-entry-guide", label: "인도 진출 가이드" },
      { href: "/services/gst-practice-guide", label: "GST 실무 안내" },
      { href: "/contact", label: "문의" },
    ],
    closingNote:
      "제조업 프로젝트는 ‘허가 취득’보다 실제 운영 가능 상태까지 연결하는 일정 관리가 중요하며, 전력·환경·건축·세무·수출입 구조가 동시에 영향을 줄 수 있습니다.",
  },
  en: {
    metaTitle: "Factory setup & industrial permits",
    metaDescription:
      "Factory licence, pollution consent, fire NOC, HT/LT power, building/layout, DG sets and inspectors · India manufacturing permits from a PM-style roadmap.",
    pageTitle: "Factory & industrial permits",
    pageDescription:
      "A factory is a permit package · not a single licence. Power, environment, building, tax and trade interlock, so schedule-led PM thinking matters as much as checklist compliance.",
    disclaimer:
      "Even within the same industry, states, industrial estates and regulators can ask for different evidence and process paths. What finally applies depends on site location, power draw, emissions profile, building structure and sector classification · treat this page as orientation, not a binding rulebook.",
    introParagraphs: [
      "Manufacturing in India rarely ends at a factory licence alone: land use, building approvals, power, environment, fire, effluent, labour and import/export mechanics often move together.",
      "In live projects, sequencing and field dates interact · mapping the full roadmap early is what keeps commissioning and go-live credible.",
    ],
    roadmapCardsTitle: "1. Core permits · how the package actually behaves",
    roadmapCards: [
      {
        title: "Factory licence",
        bullets: [
          "Baseline manufacturing permission; staffing, plant and power assumptions are often reviewed together.",
          "Inspector visits, layout/safety expectations and shop-floor realities can drive iterations · not just paperwork.",
          "[Field] Process changes can trigger amendments or re-filings.",
          "[Field] Leased plants need lease, use and reinstatement clauses aligned with registrations (including GST address consistency).",
        ],
      },
      {
        title: "Pollution NOC / consent",
        bullets: [
          "Environmental consent tracks categories (e.g. red/orange/green) and may split air/water consent lines.",
          "Effluent, emissions, noise and hazardous waste parameters are scoped up front.",
          "[Field] ETP/STP expectations and DG-set inclusion can appear once loads and backup design are known.",
          "[Field] Consent to Operate (CTO) style steps may be required before you can legally ramp production.",
        ],
      },
      {
        title: "Fire NOC",
        bullets: [
          "Fire-life-safety approvals scale with built-up area, height, warehousing patterns and occupancy.",
          "Alarms, sprinklers, exits and compartmentation are reviewed as a design package.",
          "[Field] Warehouse-heavy layouts can hit different thresholds; renewals and periodic inspections follow.",
        ],
      },
      {
        title: "Power sanction & connection (HT/LT)",
        bullets: [
          "Load sanction and HT vs LT choices should be frozen alongside equipment planning · not after orders are placed.",
          "Transformers, DG backup and panel architecture are co-designed with the line.",
          "[Field] Grid upgrades routinely take months; keep energisation on the critical path with machine specs.",
        ],
      },
      {
        title: "Building / layout approval",
        bullets: [
          "Civil approvals and factory layout interact with estates, zoning and future expansion bays.",
          "Structural changes or additions often need re-approval and can ripple into fire and factory clearances.",
          "[Field] Completion certificates and municipal sign-offs can extend the tail of the programme.",
        ],
      },
    ],
    practicalIssuesTitle: "Issues we see often on manufacturing programmes",
    practicalIssues: [
      "GST principal place of business misaligned with the leased plant address",
      "As-built conditions diverge from approved drawings after tenant fit-out",
      "HT connection and substation work slip the commissioning window",
      "Pollution category reclassification changes consent conditions mid-flight",
      "DG sets trigger extra environmental/noise conditions",
      "Fire department asks for sprinkler splits, exits or storage reconfigurations",
      "Factory inspector site notes force layout or safety rework",
      "Estate developer approvals drift from government authority timelines",
    ],
    processFlowTitle: "A typical programme rhythm",
    processPhases: [
      {
        title: "STEP 1 · Site & sector screening",
        bullets: ["Industrial estate vs standalone land", "Zoning and permissible use", "Available power headroom", "Logistics, labour catchment and access"],
      },
      {
        title: "STEP 2 · Engineering & layout",
        bullets: ["Plant layout and material flows", "Equipment footprints and safety clearances", "Fire/environment constraints baked into design", "Expansion headroom"],
      },
      {
        title: "STEP 3 · Permit filings",
        bullets: ["Pollution consent / NOC", "Factory licence", "Fire NOC", "Building / layout approvals"],
      },
      {
        title: "STEP 4 · Power & utilities",
        bullets: ["HT/LT connection and panels", "DG with environmental conditions", "Water and effluent treatment hooks (ETP/STP, etc.)"],
      },
      {
        title: "STEP 5 · Go-live",
        bullets: ["Consent to operate style clearances", "Labour registrations and ramp plan", "Commissioning, internal controls and compliance cadence"],
      },
    ],
    industryTableTitle: "Sector notes · what changes the file stack",
    industryCol1: "Sector",
    industryCol2: "Typical focus",
    industryRows: [
      { industry: "Auto components", issues: "Press lines, noise, HT power and vibration" },
      { industry: "Chemicals", issues: "Hazardous waste streams, tanks and pollution intensity" },
      { industry: "Food", issues: "FSSAI, hygiene, effluent and cold chain" },
      { industry: "Electronics", issues: "E-waste, ESD and clean-room style flows" },
      { industry: "Warehousing", issues: "Fire NOC, storage height/racking rules" },
      { industry: "Steel / metalworking", issues: "Furnaces, emissions and heavy power demand" },
    ],
    msvScopeTitle: "How MSV typically supports the package",
    msvScopeItems: [
      "Incorporation and investment/equity structuring",
      "Lease, land and use-case reviews for plants",
      "GST and trade linkage (IEC/AD, customs touchpoints)",
      "Coordination on power, environment and fire tracks with authorities",
      "Expatriate visas and FRRO administration",
      "Accounting, payroll and compliance operations",
      "Aligning HQ reporting/approvals with India field schedules",
    ],
    timelineTable: {
      title: "Indicative timelines",
      colItem: "Item",
      colDuration: "Typical range",
      rows: [
        { item: "Factory licence", duration: "~1–3 months" },
        { item: "Pollution consent", duration: "~1–4 months" },
        { item: "Fire NOC", duration: "~1–2 months" },
        { item: "HT power connection", duration: "~2–6 months" },
        { item: "End-to-end plant readiness", duration: "~3–12 months" },
      ],
      footnote:
        "Actual durations vary sharply by location, sector, sanctioned load, building condition and regulator queues. Parallelism is not always possible on the ground.",
    },
    relatedIntro: "Pages that usually sit next to a plant programme.",
    relatedTitle: "Related pages",
    relatedLinks: [
      { href: "/services/corporate-incorporation", label: "Incorporation" },
      { href: "/services/import-export-iec", label: "IEC & customs" },
      { href: "/services/license-registration", label: "Licence registration" },
      { href: "/services", label: "Accounting & tax" },
      { href: "/services/india-entry-guide", label: "India entry guide" },
      { href: "/services/gst-practice-guide", label: "GST guide" },
      { href: "/contact", label: "Contact" },
    ],
    closingNote:
      "Manufacturing programmes succeed when permits connect to an operable plant: power, environment, building, tax and trade all push on the same master schedule · not just licence collection.",
  },
  zh: {
    metaTitle: "印度工厂与工业许可",
    metaDescription: "工厂许可、环保同意、消防、HT/LT 电力、建筑与平面审批、DG 与检查等制造项目组合式实务要点。",
    pageTitle: "工厂与工业许可",
    pageDescription:
      "工厂不是单一证照，而是一组相互咬合的许可与工程任务。电力、环境、建筑与税务、进出口结构会同时影响排期，需要以项目节奏统筹。",
    disclaimer:
      "即使行业相同，所在邦、产业园与主管机关也可能要求不同的材料与路径；最终以现场位置、用电规模、排放类型、建筑结构与产业分类为准，本文仅为概览。",
    introParagraphs: [
      "在印度开展制造与工厂运营，往往不能仅靠取得 Factory Licence 就算完成，还需要同步审视用地性质、建筑审批、电力、环保、消防、排放、用工与进出口等环节。",
      "实际项目中各许可的先后顺序与现场工期会相互影响，因此常见做法是在早期就绘制端到端路线图。",
    ],
    roadmapCardsTitle: "1. 核心许可 · 组合式推进（实务视角）",
    roadmapCards: [
      {
        title: "Factory licence（工厂许可）",
        bullets: [
          "作为制造业基础许可，常与用工规模、设备与用电量等一并评估。",
          "可能涉及检查员现场核查、布局与安全条件，并与平面布置相互影响。",
          "[实务] 工艺变更可能需要补充或重新申报。",
          "[实务] 租赁厂房需同步审视租约、用途与注册地址一致性（含 GST）。",
        ],
      },
      {
        title: "Pollution NOC / consent（环保同意）",
        bullets: [
          "按行业分类（如红/橙/绿）可能导致不同的许可路径与材料深度。",
          "空气/水体同意、废水、噪声与固废等需尽早界定范围。",
          "[实务] 部分行业可能要求 ETP/STP；引入柴油发电机（DG）也会牵动环保条件。",
          "[实务] 投产前可能另需 Consent to Operate（CTO）等运营阶段同意。",
        ],
      },
      {
        title: "Fire NOC（消防）",
        bullets: [
          "随建筑面积、层数、仓储形态而变化，常与喷淋、报警与疏散体系一并审查。",
          "[实务] 以仓储为主的厂房可能适用不同阈值，并存在定期检查/续期要求。",
        ],
      },
      {
        title: "电力接入与负荷（HT/LT）",
        bullets: [
          "应在设备定型前明确负荷批复与 HT/LT 方案，并与变压器、备用电源、配电结构协同设计。",
          "[实务] 电网改造与送电常耗时数月，需与产线设备规格绑定排期。",
        ],
      },
      {
        title: "建筑 / 平面审批",
        bullets: [
          "与产业园规划、用地性质及扩建预留相关，并与消防、环保、工厂许可相互引用。",
          "[实务] 结构改动或加建常需重新审批；部分地区竣工验收链条较长。",
        ],
      },
    ],
    practicalIssuesTitle: "实务中较常见的问题",
    practicalIssues: [
      "租赁厂房地址与 GST 注册地址不一致",
      "批准图纸与现场改造后的实际结构不一致",
      "电力增容/送电延误导致试生产整体后移",
      "污染分类调整导致许可条件突变",
      "引入 DG 后新增环保/噪声要求",
      "消防部门要求补强喷淋、分区或疏散",
      "工厂检查员现场意见触发平面或安全整改",
      "园区内部审批与政府审批节奏不一致",
    ],
    processFlowTitle: "项目一般推进顺序",
    processPhases: [
      { title: "第一步：用地与行业", bullets: ["是否位于产业园及开发方条件", "土地用途与规划分区", "可用电力容量与接入距离", "物流与用工可得性"] },
      { title: "第二步：设计与平面", bullets: ["厂房布局与物流动线", "设备占地与安全距离", "消防/环保前置条件", "预留扩建"] },
      { title: "第三步：许可申报", bullets: ["环保同意/NOC", "工厂许可", "消防", "建筑/平面审批"] },
      { title: "第四步：电力与公用工程", bullets: ["HT/LT 接入与配电", "DG（含环保条件）", "给水与废水处理衔接（ETP/STP 等）"] },
      { title: "第五步：投产", bullets: ["运营阶段同意（如 CTO）", "用工登记", "试生产与内控合规节奏"] },
    ],
    industryTableTitle: "行业关注示例",
    industryCol1: "行业",
    industryCol2: "主要关注点",
    industryRows: [
      { industry: "汽车零部件", issues: "冲压·噪声·高压用电·振动" },
      { industry: "化工", issues: "危废·污染强度·储罐" },
      { industry: "食品", issues: "FSSAI·卫生·废水·冷链" },
      { industry: "电子", issues: "电子废弃物·ESD·洁净/动线" },
      { industry: "物流仓", issues: "消防·仓储高度/货架规则" },
      { industry: "钢铁/加工", issues: "炉窑·排放·高压电力·安全距离" },
    ],
    msvScopeTitle: "MSV 协同支持范围",
    msvScopeItems: [
      "公司设立及投资/股权结构",
      "厂房租赁、用地与用途审查",
      "GST 与进出口（IEC/AD）及通关衔接",
      "电力、环保、消防及与主管部门沟通",
      "外籍员工签证与 FRRO",
      "会计、薪酬与合规运营",
      "对齐总部报告/审批与印度现场工期",
    ],
    timelineTable: {
      title: "常见周期",
      colItem: "事项",
      colDuration: "常见区间",
      rows: [
        { item: "Factory licence", duration: "约 1–3 个月" },
        { item: "Pollution consent", duration: "约 1–4 个月" },
        { item: "Fire NOC", duration: "约 1–2 个月" },
        { item: "HT 电力接入", duration: "约 2–6 个月" },
        { item: "整体具备投产条件", duration: "约 3–12 个月" },
      ],
      footnote: "实际周期因地区、行业、用电规模、建筑状况与主管机关排期差异很大，也未必能完全并行推进。",
    },
    relatedIntro: "与工厂/许可常一起阅读的页面：",
    relatedTitle: "相关页面",
    relatedLinks: [
      { href: "/services/corporate-incorporation", label: "公司设立" },
      { href: "/services/import-export-iec", label: "IEC 与通关" },
      { href: "/services/license-registration", label: "许可证登记" },
      { href: "/services", label: "会计与税务服务" },
      { href: "/services/india-entry-guide", label: "印度进入指南" },
      { href: "/services/gst-practice-guide", label: "GST 实务指南" },
      { href: "/contact", label: "联系" },
    ],
    closingNote:
      "制造业项目的关键往往不仅是‘拿证’，而是把许可链条推进到可运营状态；电力、环境、建筑、税务与进出口结构会同时牵动总体排期。",
  },
};

const GUIDES: Record<ServiceGuideSlug, Bundle> = {
  "gst-practice-guide": gstPracticeGuide,
  "import-export-iec": importExportIec,
  "fdi-fema-guide": fdiFemaGuide,
  "hr-payroll": hrPayroll,
  "contracts-legal": contractsLegalHub,
  "india-entry-guide": indiaEntryGuide,
  "factory-licensing": factoryLicensing,
  "compliance-calendar": complianceCalendar,
  "guide-india-tax": guideIndiaTax,
  "guide-india-accounting": guideIndiaAccounting,
  "guide-fema-fx": guideFemaFx,
  "guide-hr-labour": guideHrLabour,
  "guide-companies-act": guideCompaniesActHub,
};

export function serviceGuideCopy(slug: ServiceGuideSlug, locale: SiteLocale): ServiceGuideCopy {
  return pickLocale(locale, GUIDES[slug]);
}
