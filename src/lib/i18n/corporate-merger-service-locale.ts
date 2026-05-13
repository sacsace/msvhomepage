import { company } from "@/lib/site-content";
import { pickLocale, type SiteLocale } from "@/lib/site-locale";

/** 2장 · 합병·구조조정 유형별 상세 */
export type MergerStructureSection = {
  readonly subtitle: string;
  readonly bullets: readonly string[];
  readonly notesTitle?: string;
  readonly notes?: readonly string[];
};

/** 3장 · 실무 검토 블록 */
export type MergerReviewBlock = {
  readonly title: string;
  readonly items: readonly string[];
};

/** 4장 · 절차 STEP */
export type MergerProcessStep = {
  readonly title: string;
  readonly bullets: readonly string[];
};

export type MergerTimelineRow = { readonly structure: string; readonly duration: string };

export type CorporateMergerServiceCopy = {
  metaTitle: string;
  metaDescription: string;
  pageTitle: string;
  pageDescription: string;
  disclaimer: string;
  overview: { title: string; paragraphs: readonly string[] };
  structureTypes: { title: string; sections: readonly MergerStructureSection[] };
  keyReview: { title: string; blocks: readonly MergerReviewBlock[] };
  processFlow: { title: string; steps: readonly MergerProcessStep[]; note: string };
  timeline: {
    title: string;
    colStructure: string;
    colDuration: string;
    rows: readonly MergerTimelineRow[];
    footnote: string;
  };
  practicalIssues: { title: string; items: readonly string[] };
  related: { title: string; links: readonly { label: string; path: string }[] };
  navBackServices: string;
  navContact: string;
};

const ko: CorporateMergerServiceCopy = {
  metaTitle: "법인 합병 안내",
  metaDescription: `${company.shortName} · 인도 합병·구조조정 실무: 유형별 요건, 법·세무·FEMA·HR·IT 검토, ROC/NCLT 절차·기간·자주 발생 이슈(참고 안내)`,
  pageTitle: "법인 합병 안내",
  pageDescription:
    "인도에서 회사를 합치거나 사업·자산을 이전할 때는 Companies Act, NCLT, ROC 실무와 함께 세무·계약·FEMA·운영 이전 검토가 수반됩니다. 아래는 실무 중심으로 정리한 참고 안내이며, 사안별로 전문 자문이 필요합니다.",
  disclaimer:
    "본 페이지는 일반적인 실무 참고용이며, 실제 요건·서식·심사는 회사 규모, 미해결 세무·법률 이슈, 산업 규제, NCLT 일정 등에 따라 달라질 수 있습니다. 구체 진행 전 전문가 검토를 권장합니다.",
  overview: {
    title: "1. 개요",
    paragraphs: [
      "인도에서의 합병(Merger)과 구조조정은 법인 통합에 그치지 않고, 주주·채권자 보호, 계약 승계, 세무, 외환(FEMA), 산업별 라이선스, 노사 관계 등이 함께 다뤄지는 절차입니다. 구조와 규모에 따라 ROC 신고만으로 마무리되는 경우도 있으나, 일정 규모 이상이거나 특수 구조이면 NCLT 승인이 필요할 수 있습니다. 실무에서는 합병 외에도 사업양수도(Business Transfer), 그룹 내 재편, 자산 이전, JV 통합 등으로 진행하는 사례도 흔합니다.",
    ],
  },
  structureTypes: {
    title: "2. 대표적인 합병·구조조정 형태",
    sections: [
      {
        subtitle: "2.1 흡수합병 (Amalgamation / Merger by Absorption)",
        bullets: [
          "기존 존속 회사가 다른 회사를 흡수하는 구조입니다.",
          "소멸 회사의 자산·부채·계약·직원 등을 존속 회사가 승계합니다.",
          "그룹 구조 단순화 또는 운영 통합 목적에서 자주 사용됩니다.",
          "경우에 따라 PAN·GST·은행·수입 라이선스(IEC 등) 이전·재등록 여부를 검토해야 합니다.",
        ],
        notesTitle: "추가로 살펴볼 실무 포인트",
        notes: [
          "주요 고객 계약의 승계·통지·재체결 조항",
          "공급업체 동의·계약 갱신 필요 여부",
          "부동산·임대차(리스) 계약의 승계·재협상",
        ],
      },
      {
        subtitle: "2.2 신설합병",
        bullets: [
          "둘 이상의 회사가 통합되어 새로운 법인을 설립하는 구조입니다.",
          "기존 법인은 소멸될 수 있습니다.",
          "JV 구조 재편, 신규 투자 유치, 지주·플랫폼 설립 등에서 활용되는 경우가 있습니다.",
        ],
      },
      {
        subtitle: "2.3 사업양수도 (Business Transfer)",
        bullets: [
          "법인을 즉시 청산하지 않고, 특정 사업부·공장·고객 계약·재고·설비 등만 이전하는 방식입니다. 실무에서 매우 흔히 검토됩니다.",
          "Slump Sale·자산 매각 등 거래 형태에 따라 세무·회계 처리가 달라질 수 있어, 초기부터 형태를 정하는 것이 중요합니다.",
          "GST·Stamp Duty·Capital Gains·계약 승계 범위를 함께 검토합니다.",
        ],
      },
      {
        subtitle: "2.4 그룹 내 구조 재편",
        bullets: [
          "모회사·자회사 간 지분 정리, 투자 구조 단순화",
          "JV 분리, Cross-holding 정리",
          "운영·세무·자금 효율화를 목적으로 한 재편",
        ],
      },
    ],
  },
  keyReview: {
    title: "3. 실무상 주요 검토 항목",
    blocks: [
      {
        title: "3.1 법률 검토",
        items: [
          "Companies Act상 요건·절차 적합성",
          "NCLT 승인 필요 여부(스킴·규모·구조에 따라 상이)",
          "주주 특별결의·주주총회 절차",
          "채권자 보호·통지·이의 관련 절차",
          "계약의 Change of Control·승계 제한·통지 조항",
          "진행 중 소송·분쟁·규제 조사 존재 여부",
        ],
      },
      {
        title: "3.2 세무 검토",
        items: [
          "GST 영향(거래 유형·세금계산서·납세 장소)",
          "Input Tax Credit(ITC) 승계·조정 가능 여부",
          "Capital Gains, Stamp Duty",
          "Transfer Pricing·문서화",
          "이월결손(Carry Forward of Losses) 승계·제한",
          "MAT·이연법인세 등 후속 이슈",
        ],
      },
      {
        title: "3.3 FEMA·FDI 검토",
        items: [
          "비거주자 주주 구조·지분 비율",
          "주식 교환(Share Swap) 등 대가 구조의 신고·승인 요건",
          "RBI·FEMA 신고(형태별)",
          "FCGPR·FCTRS 등 적용 여부",
          "Press Note 3 등 투자 제한·조건부 업종 해당 여부",
        ],
      },
      {
        title: "3.4 HR·노무 검토",
        items: [
          "직원 승계·고용관계 이전(또는 종료·재채용)",
          "PF·ESI 등 사회보험 이전·연속성",
          "Gratuity·퇴직금 등 연속 근속 인정",
          "고용 계약·취업규칙 변경·협의",
          "노무 분쟁·집단적 이견 리스크",
        ],
      },
      {
        title: "3.5 IT·운영 전환",
        items: [
          "ERP·회계·재고 시스템 통합",
          "이메일·도메인·웹 자산 이전",
          "고객 DB·CRM 이전",
          "개인정보·데이터 현지화·동의",
          "브랜드·상표·마케팅 자산 통합",
        ],
      },
    ],
  },
  processFlow: {
    title: "4. 일반적인 절차 흐름",
    steps: [
      {
        title: "STEP 1. 구조 검토 및 목적 정의",
        bullets: [
          "합병·재편 목적·시너지 확인",
          "세무·회계상 효율 및 리스크 1차 검토",
          "그룹 지분·자산·부채 범위 정의",
        ],
      },
      {
        title: "STEP 2. DD 및 리스크 검토",
        bullets: [
          "법률 실사(계약·소송·라이선스·부동산)",
          "세무 실사(GST, 이전가격, 이월결손 등)",
          "회계·재무제표·내부통제 점검",
          "산업별 라이선스·규제 준수 상태",
          "소송·분쟁·환경·노무 리스크",
        ],
      },
      {
        title: "STEP 3. 합병안·거래 문서 초안",
        bullets: [
          "Swap Ratio, Valuation, 대가 구조",
          "자산·부채·사업 이전 범위",
          "계약 승계 범위·예외 목록",
          "직원 이전·보상·협의 계획",
        ],
      },
      {
        title: "STEP 4. 이사회·주주 승인",
        bullets: [
          "Board Resolution",
          "Shareholder approval(특별결의 등)",
          "필요 시 채권자 절차·동의·통지",
        ],
      },
      {
        title: "STEP 5. ROC·NCLT 절차",
        bullets: [
          "ROC filing, Scheme·관련 서류 준비",
          "공고·이해관계자 통지",
          "NCLT hearing·질의 대응(해당 시)",
          "승인 명령·등기 반영",
        ],
      },
      {
        title: "STEP 6. 통합 및 사후 정리",
        bullets: [
          "PAN·GST·기타 등록 변경",
          "은행·KYC·한도·담보 정리",
          "고객·공급사 계약 갱신·통지",
          "ERP·도메인·이메일·접근권한 통합",
          "회계 마감·연결·첫 보고 기준일 정리",
        ],
      },
    ],
    note: "실제 순서·병행 작업은 거래 구조와 내부 통제에 따라 조정됩니다.",
  },
  timeline: {
    title: "5. 예상 소요 기간(참고)",
    colStructure: "구조",
    colDuration: "일반적인 기간(참고)",
    rows: [
      { structure: "단순 그룹 내 재편", duration: "약 1~3개월" },
      { structure: "사업양수도(Business Transfer 등)", duration: "약 2~4개월" },
      { structure: "ROC 중심의 상대적으로 단순한 합병", duration: "약 3~6개월" },
      { structure: "NCLT 승인이 포함되는 합병·스킴", duration: "약 6~12개월 이상" },
    ],
    footnote:
      "실제 기간은 회사 규모, 미해결 세무·법률 이슈, 산업 규제 및 NCLT·당국 일정에 따라 크게 달라질 수 있습니다.",
  },
  practicalIssues: {
    title: "6. 자주 발생하는 실무 이슈",
    items: [
      "GST 등록 이전·신규 등록과 세금계산서 체계 전환",
      "ITC 이월·조정 누락으로 인한 세무 리스크",
      "고객사가 계약 재체결·KYC 재진행을 요구하는 경우",
      "은행 한도·담보·서명권자 변경에 따른 KYC 재진행",
      "수입 IEC·관세 환급·공장 등록 등 무역·제조 라이선스 이전",
      "직원 퇴직금·연속 근속·복지 이전 해석",
      "상호(회사명)·브랜드 유지·변경 방침",
      "진행 중 소송·중재·규제 조사의 승계·통지",
    ],
  },
  related: {
    title: "관련 페이지",
    links: [
      { label: "법인 설립 서비스", path: "/services/corporate-incorporation" },
      { label: "법인 청산 안내", path: "/services/corporate-liquidation" },
      { label: "회계 서비스", path: "/services" },
    ],
  },
  navBackServices: "서비스 목록으로",
  navContact: "문의하기",
};

const en: CorporateMergerServiceCopy = {
  metaTitle: "India corporate merger guide",
  metaDescription: `${company.shortName} · India mergers & reorganisations: structures, legal/tax/FEMA/HR/IT checks, ROC/NCLT steps, indicative timelines, and common operational issues (reference only).`,
  pageTitle: "India corporate merger guide",
  pageDescription:
    "Combining companies or moving a business in India usually involves Companies Act, ROC, and sometimes NCLT processes together with tax, contracts, FEMA, and operational migration work. This page is practice-oriented guidance · not a substitute for tailored advice.",
  disclaimer:
    "This page is general guidance only. Requirements, forms, and timelines vary with company size, open tax and legal issues, sector regulation, and tribunal/authority schedules. Engage qualified advisors before proceeding.",
  overview: {
    title: "1. Overview",
    paragraphs: [
      "Mergers and corporate reorganisations in India go beyond consolidating entities on paper: shareholder and creditor protections, contract succession, tax, FEMA, sector licences, and labour relations are usually reviewed together. Depending on scale and structure, ROC filings may be enough; larger or more complex schemes may need NCLT approval. In practice, teams often pursue business transfers, intra-group reshapes, asset moves, and JV integrations · not only statutory mergers.",
    ],
  },
  structureTypes: {
    title: "2. Common structures",
    sections: [
      {
        subtitle: "2.1 Absorption merger (merger by absorption)",
        bullets: [
          "An existing company absorbs another company.",
          "The surviving company succeeds to assets, liabilities, contracts, and employees of the transferor.",
          "Often used to simplify group structures or integrate operations.",
          "PAN, GST, banking, and import licences (e.g., IEC) may need review for continuity or re-registration.",
        ],
        notesTitle: "Additional practical checks",
        notes: [
          "Customer contracts: assignment, notice, or re-papering",
          "Supplier consent and renewal paths",
          "Real estate and lease succession or renegotiation",
        ],
      },
      {
        subtitle: "2.2 Merger into a new company",
        bullets: [
          "Two or more companies combine into a newly incorporated entity.",
          "Existing companies may cease on the effective date.",
          "Used in JV reshapes, new investment platforms, or holding structures.",
        ],
      },
      {
        subtitle: "2.3 Business transfer",
        bullets: [
          "Move a division, plant, customer contracts, inventory, or equipment without immediately liquidating the selling entity · very common in practice.",
          "Slump sales vs asset sales can change tax and accounting treatment; shape the transaction early.",
          "Review GST, stamp duty, capital gains, and the scope of contract succession.",
        ],
      },
      {
        subtitle: "2.4 Intra-group reorganisation",
        bullets: [
          "Tidy shareholdings between parent and subsidiaries; simplify investment chains.",
          "Separate JVs, remove cross-holdings, and improve operational or tax efficiency.",
        ],
      },
    ],
  },
  keyReview: {
    title: "3. Key workstreams (practice checklist)",
    blocks: [
      {
        title: "3.1 Legal",
        items: [
          "Companies Act fit and process design",
          "Whether NCLT approval is required",
          "Board and shareholder resolutions",
          "Creditor protection, notice, and objection routes",
          "Change-of-control and assignment restrictions in material contracts",
          "Litigation, disputes, and regulatory investigations",
        ],
      },
      {
        title: "3.2 Tax",
        items: [
          "GST impact (transaction character, invoicing, place of supply)",
          "ITC carry-forward and adjustments",
          "Capital gains and stamp duty",
          "Transfer pricing and documentation",
          "Loss carry-forwards and restrictions",
          "MAT / deferred tax follow-through",
        ],
      },
      {
        title: "3.3 FEMA / FDI",
        items: [
          "Non-resident shareholding patterns",
          "Share swaps and reporting/approval needs",
          "RBI / FEMA filings by instrument and route",
          "FCGPR / FCTRS touchpoints where relevant",
          "Sector caps and conditional routes (e.g., Press Note 3 themes)",
        ],
      },
      {
        title: "3.4 HR and employment",
        items: [
          "Employee transfers vs terminations and re-hires",
          "PF / ESI continuity",
          "Gratuity and continuity of service",
          "Contract and policy changes, consultation where needed",
          "Dispute and collective risk",
        ],
      },
      {
        title: "3.5 IT and operations",
        items: [
          "ERP and inventory/accounting integration",
          "Email, domains, and web assets",
          "Customer databases and CRM migration",
          "Privacy, data residency, and consents",
          "Brand and trademark alignment",
        ],
      },
    ],
  },
  processFlow: {
    title: "4. Illustrative end-to-end flow",
    steps: [
      {
        title: "STEP 1 · Objectives and structure",
        bullets: [
          "Confirm commercial goals and synergies",
          "Initial tax and accounting view of the shape",
          "Define the perimeter of assets, liabilities, and entities",
        ],
      },
      {
        title: "STEP 2 · Due diligence and risk",
        bullets: [
          "Legal DD: contracts, litigation, licences, property",
          "Tax DD: GST, transfer pricing, losses, stamp duty angles",
          "Financial statements and controls review",
          "Sector licence and compliance posture",
          "HR and environmental issues as relevant",
        ],
      },
      {
        title: "STEP 3 · Scheme / deal papers",
        bullets: [
          "Swap ratio, valuation, and consideration mechanics",
          "Scope of assets/liabilities and business transfer",
          "Contract succession list and exceptions",
          "Employee migration and compensation planning",
        ],
      },
      {
        title: "STEP 4 · Board and shareholders",
        bullets: ["Board resolutions", "Shareholder approvals (including special resolutions)", "Creditor steps where required"],
      },
      {
        title: "STEP 5 · ROC / NCLT",
        bullets: [
          "ROC filings and scheme preparation",
          "Public notices and stakeholder communications",
          "NCLT hearings and Q&A where applicable",
          "Orders and registration updates",
        ],
      },
      {
        title: "STEP 6 · Integration and clean-up",
        bullets: [
          "PAN / GST and other registrations",
          "Banking limits, KYC, and collateral refresh",
          "Customer and vendor contract renewals and notices",
          "ERP, domains, email, and access control",
          "Accounting close, consolidation, and first reporting cut-over",
        ],
      },
    ],
    note: "Workstreams often overlap; sequencing should match your governance and risk appetite.",
  },
  timeline: {
    title: "5. Indicative timelines",
    colStructure: "Structure",
    colDuration: "Typical range (illustrative)",
    rows: [
      { structure: "Simple intra-group reshape", duration: "About 1–3 months" },
      { structure: "Business transfer", duration: "About 2–4 months" },
      { structure: "Relatively straightforward ROC-led merger", duration: "About 3–6 months" },
      { structure: "Merger / scheme requiring NCLT", duration: "About 6–12+ months" },
    ],
    footnote:
      "Actual duration varies with scale, open tax and legal issues, sector regulation, and tribunal/authority scheduling.",
  },
  practicalIssues: {
    title: "6. Common operational issues",
    items: [
      "GST registration migration vs fresh registration and invoicing continuity",
      "ITC carry-forward adjustments missed in planning",
      "Customers requesting contract re-papering or fresh KYC",
      "Bank limits, security packages, and signatory updates triggering KYC",
      "IEC and customs / factory registrations in trading and manufacturing deals",
      "Gratuity and continuity-of-service interpretations",
      "Trade name vs brand retention or change",
      "Ongoing litigation or investigations · succession and notice",
    ],
  },
  related: {
    title: "Related pages",
    links: [
      { label: "Corporate incorporation", path: "/services/corporate-incorporation" },
      { label: "Company closure guide", path: "/services/corporate-liquidation" },
      { label: "Accounting services", path: "/services" },
    ],
  },
  navBackServices: "Back to services",
  navContact: "Contact us",
};

const zh: CorporateMergerServiceCopy = {
  metaTitle: "印度公司合并与重组指引",
  metaDescription: `${company.shortName} · 印度合并与重组：结构类型、法税FEMA与人事IT要点、ROC/NCLT流程、周期参考与常见实务问题（仅供参考）。`,
  pageTitle: "印度公司合并与重组指引",
  pageDescription:
    "在印度进行公司合并或业务/资产转移时，除 Companies Act、ROC 及可能的 NCLT 程序外，通常还需同步处理税务、合同、FEMA 以及运营与系统迁移。本页侧重实务梳理，不能替代个案专业意见。",
  disclaimer:
    "本页仅供一般性实务参考。具体要求与时点因公司规模、未决税务与法律问题、行业监管及审理排期而异；实施前请咨询专业人士。",
  overview: {
    title: "1. 概述",
    paragraphs: [
      "印度境内的合并与重组通常不仅是法人主体的合并，还需同时梳理股东与债权人保护、合同承继、税务、外汇(FEMA)、行业许可与劳动关系等。视规模与方案复杂度，可能以 ROC 申报为主完成，也可能需要 NCLT 批准。实务上除传统合并外，也常见以业务收购、集团内部重组、资产转移、合资公司整合等方式推进。",
    ],
  },
  structureTypes: {
    title: "2. 常见结构类型",
    sections: [
      {
        subtitle: "2.1 吸收合并（Merger by Absorption）",
        bullets: [
          "由存续公司吸收其他公司。",
          "存续公司承继被合并方的资产、负债、合同与员工等。",
          "常用于简化集团架构或整合运营。",
          "视情况需评估 PAN、GST、银行及进口许可(IEC 等)的延续或重新登记。",
        ],
        notesTitle: "额外实务关注点",
        notes: ["主要客户合同的承继/通知/重签", "供应商同意与续约", "不动产与租赁的承继或重新谈判"],
      },
      {
        subtitle: "2.2 新设合并",
        bullets: ["两个以上公司合并设立新公司。", "原公司可能注销。", "可用于 JV 重组、新投资平台或控股架构搭建。"],
      },
      {
        subtitle: "2.3 业务转让（Business Transfer）",
        bullets: [
          "在不立即注销主体的前提下，仅转移事业部、工厂、客户合同、存货或设备等，实务中非常普遍。",
          "整体出售与资产出售等形态会影响税务与会计处理，宜尽早明确交易形态。",
          "需同步评估 GST、印花税、资本利得及合同承继范围。",
        ],
      },
      {
        subtitle: "2.4 集团内部重组",
        bullets: ["母子公司股权整理、投资链条简化", "JV 分拆、交叉持股清理", "以运营或税务效率为目标的再配置"],
      },
    ],
  },
  keyReview: {
    title: "3. 实务重点审查事项",
    blocks: [
      {
        title: "3.1 法律",
        items: [
          "Companies Act 路径与合规",
          "是否需要 NCLT 批准",
          "董事会与股东(特别)决议",
          "债权人保护与通知/异议程序",
          "控制权变更与合同转让限制条款",
          "在诉案件、仲裁与监管调查",
        ],
      },
      {
        title: "3.2 税务",
        items: [
          "GST 影响(交易定性、开票与纳税地)",
          "进项税结转与调整",
          "资本利得与印花税",
          "转让定价与文档",
          "亏损结转及限制",
          "MAT/递延所得税等后续问题",
        ],
      },
      {
        title: "3.3 FEMA / FDI",
        items: ["非居民股东结构", "股份置换等安排的可行性与申报", "RBI/FEMA 申报路径", "FCGPR/FCTRS 等适用性", "行业限制与条件性投资(如 Press Note 3 相关主题)"],
      },
      {
        title: "3.4 人事与劳动",
        items: ["员工转移或解除后重聘", "PF/ESI 连续性", "离职金与服务年限连续认定", "劳动合同与规章制度变更", "劳动争议与集体沟通风险"],
      },
      {
        title: "3.5 IT 与运营",
        items: ["ERP 与库存/会计系统整合", "邮件、域名与网站资产", "客户数据库与 CRM 迁移", "个人信息与数据合规", "品牌与商标统一"],
      },
    ],
  },
  processFlow: {
    title: "4. 一般流程（示意）",
    steps: [
      {
        title: "STEP 1 · 目标与结构",
        bullets: ["明确商业目标与协同", "初步评估税务与会计路径", "界定资产、负债与主体范围"],
      },
      {
        title: "STEP 2 · 尽职调查与风险",
        bullets: ["法律 DD：合同、诉讼、许可、不动产", "税务 DD：GST、转让定价、亏损、印花税", "财务报表与内控", "行业许可与合规", "人事与环境事项(如适用)"],
      },
      {
        title: "STEP 3 · 方案与交易文件",
        bullets: ["换股比例、估值与对价机制", "资产负债与业务转让边界", "合同承继清单与例外", "员工转移与补偿安排"],
      },
      {
        title: "STEP 4 · 董事会与股东",
        bullets: ["董事会决议", "股东批准(含特别决议等)", "需要的债权人程序"],
      },
      {
        title: "STEP 5 · ROC / NCLT",
        bullets: ["ROC 申报与方案材料", "公告与利益相关方通知", "NCLT 听证与问询(如适用)", "命令与登记更新"],
      },
      {
        title: "STEP 6 · 整合与收尾",
        bullets: ["PAN/GST 等登记变更", "银行额度、担保与签章人导致的 KYC", "客户与供应商合同更新与通知", "ERP、域名、邮件与权限", "会计结账、合并与首个报告基准"],
      },
    ],
    note: "各工作流常并行推进，顺序应结合内部治理与风险偏好调整。",
  },
  timeline: {
    title: "5. 周期参考",
    colStructure: "结构",
    colDuration: "常见区间(参考)",
    rows: [
      { structure: "简单集团内部重组", duration: "约 1~3 个月" },
      { structure: "业务转让等", duration: "约 2~4 个月" },
      { structure: "以 ROC 为主的相对简明合并", duration: "约 3~6 个月" },
      { structure: "含 NCLT 批准的合并/方案", duration: "约 6~12 个月或更长" },
    ],
    footnote: "实际周期因公司规模、未决税务与法律问题、行业监管及审理排期等差异很大。",
  },
  practicalIssues: {
    title: "6. 常见实务问题",
    items: [
      "GST 登记迁移或新登记与开票衔接",
      "进项税结转调整遗漏",
      "客户要求重签合同或重新 KYC",
      "银行额度、担保与签章变化触发 KYC",
      "IEC、关税退税、工厂登记等贸易与制造许可",
      "离职金与服务年限连续认定",
      "商号与品牌保留或变更",
      "在诉案件或调查的承继与通知",
    ],
  },
  related: {
    title: "相关页面",
    links: [
      { label: "公司设立服务", path: "/services/corporate-incorporation" },
      { label: "公司注销与休眠指引", path: "/services/corporate-liquidation" },
      { label: "会计服务", path: "/services" },
    ],
  },
  navBackServices: "返回服务列表",
  navContact: "联系我们",
};

export function corporateMergerServiceCopy(locale: SiteLocale): CorporateMergerServiceCopy {
  return pickLocale(locale, { ko, en, zh });
}
