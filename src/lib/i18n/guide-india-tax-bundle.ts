import type { ServiceGuideCopy } from "@/lib/i18n/service-guides-locale";

type GuideBundle = {
  readonly ko: ServiceGuideCopy;
  readonly en: ServiceGuideCopy;
  readonly zh: ServiceGuideCopy;
};

export const guideIndiaTax: GuideBundle = {
  ko: {
    metaTitle: "인도 세무 가이드",
    metaDescription:
      "GST·TDS·법인세·Advance tax·TP·DTAA·E-Invoice·GSTR-2B·환급·Notice · 인도 세무를 신고 나열이 아닌 운영 시스템 관점으로 정리한 허브.",
    pageTitle: "인도 세무 가이드",
    pageDescription:
      "GST·TDS·법인세·원천·환급 등 세무 축을 주제별로 나누면 검색과 내부 교육에 유리합니다. 단순 신고 목록이 아니라 ERP·자금·본사 정책과 맞물리는 운영 구조로 설명합니다.",
    disclaimer:
      "본 페이지는 일반적인 세무 운영 개요이며, 실제 세율·공제·원천세·환급·이전가격 적용 여부는 거래 구조·업종·계약 조건·국가 간 조세조약(DTAA) 등에 따라 달라질 수 있습니다. 지식 베이스·개별 서비스와 함께 참고하세요.",
    introParagraphs: [
      "인도 세무 운영은 단순 신고 업무가 아니라, GST·TDS·법인세·외환(FEMA)·수출입·Payroll·본사 보고와 연결되는 운영 구조입니다.",
      "실제 실무에서는 ERP·전자세금계산서·은행·회계 장부 데이터가 서로 맞물리므로, 초기 세무 구조와 월별 점검·대사 체계가 중요합니다.",
    ],
    roadmapCardsTitle: "핵심 체크리스트 · 일정·TP·전자세금계산서·대사",
    roadmapCards: [
      {
        title: "신고 일정 및 현금 흐름 관리",
        bullets: [
          "GST·TDS·Advance Tax·PF/ESI 등 신고 일정과 납부 자금을 함께 관리하는 경우가 많습니다.",
          "월별 현금 흐름과 세금 납부 일정이 연결되도록 운영 캘린더를 구성합니다.",
          "Late fee·Interest·Mismatch notice 가능성을 사전에 점검합니다.",
          "[실무] GST 납부 자금 부족, Advance tax 누락",
          "[실무] TDS short payment, 신고 지연 이자",
        ],
      },
      {
        title: "본사 정책 및 TP(Transfer Pricing) 연결",
        bullets: [
          "본사 Intercompany policy와 인도 세무 구조를 연결하여 운영하는 경우가 많습니다.",
          "Royalty·Service fee·Management fee·Import pricing 구조를 검토할 수 있습니다.",
          "TP documentation 및 Related party transaction 관리가 중요할 수 있습니다.",
          "[실무] Intercompany invoice timing, Cost allocation",
          "[실무] Benchmarking mismatch, FEMA·TP 동시 검토 필요 가능",
        ],
      },
      {
        title: "전자세금계산서 및 대사(Reconciliation)",
        bullets: [
          "E-Invoice·GSTR-1·GSTR-2B·ERP 데이터 간 정합성을 월별 점검합니다.",
          "Vendor filing 상태 및 ITC 반영 여부를 검토합니다.",
          "Invoice·Payment·GST 신고 간 mismatch를 줄이는 운영 기준을 설정합니다.",
          "[실무] Vendor 미신고, IRN generation 오류",
          "[실무] GST mismatch, Duplicate invoice booking",
        ],
      },
    ],
    nestedChecklistTitle: "세무 운영 주요 영역",
    nestedChecklistBlocks: [
      {
        title: "GST 운영",
        bullets: [
          "GSTR-1 / 3B, ITC reconciliation, E-Invoice, RCM review, Export refund",
          "[실무] 2B mismatch, Blocked credit, Vendor follow-up",
        ],
      },
      {
        title: "TDS 운영",
        bullets: [
          "Vendor TDS, Salary TDS, Lower deduction certificate, Form 16 / 16A",
          "[실무] Short deduction, Wrong section, PAN mismatch, Interest exposure",
        ],
      },
      {
        title: "법인세(Corporate Tax)",
        bullets: [
          "Advance tax, Deferred tax, MAT 검토 가능, Tax audit 연계",
          "[실무] Provision mismatch, Forex impact, Disallowance risk",
        ],
      },
      {
        title: "외국계 기업 세무",
        bullets: [
          "DTAA 적용 가능성, Withholding tax, Intercompany transaction, Royalty / FTS 검토",
          "[실무] PE risk, Form 10F, TRC, Equalisation levy 가능성",
        ],
      },
    ],
    processFlowTitle: "일반적인 월별 세무 운영 흐름",
    processPhases: [
      {
        title: "매출",
        bullets: ["GST liability review", "E-Invoice review", "Export invoice·LUT·환급 연계 검토"],
      },
      {
        title: "매입",
        bullets: ["GSTR-2B reconciliation", "Vendor compliance review", "ITC eligibility review"],
      },
      {
        title: "자금",
        bullets: ["Tax payment planning", "Advance tax estimate", "Refund tracking"],
      },
      {
        title: "신고",
        bullets: ["GST filing", "TDS filing", "PF/ESI/PT review(연계 시)"],
      },
      {
        title: "마감·본사 보고",
        bullets: ["Tax provision", "Reconciliation·working file", "본사 MIS·세무 캘린더 정합"],
      },
    ],
    practicalIssuesTitle: "실무상 자주 발생하는 이슈",
    practicalIssues: [
      "GST와 장부·신고 불일치",
      "Vendor 미신고로 ITC 누락",
      "TDS section·코드 오류",
      "Export refund 지연",
      "Advance tax 부족 납부·추정 미비",
      "Intercompany invoice·금액 mismatch",
      "GST와 ICEGATE·수출 데이터 불일치",
      "DTAA·Form 10F·TRC 등 서류 누락",
    ],
    industryTableTitle: "외국계 기업 주요 세무 검토",
    industryCol1: "축",
    industryCol2: "검토·실무 포인트",
    industryRows: [
      { industry: "Management fee", issues: "Withholding·TP·FEMA·본사 배분 기준" },
      { industry: "Royalty / FTS", issues: "FTS classification·원천·DTAA·Equalisation levy 가능성" },
      { industry: "Technical service fee", issues: "장소별 과세·PE·원천 공제" },
      { industry: "Import transaction", issues: "Customs valuation·GST·Transfer pricing" },
      { industry: "Share allotment", issues: "FMV·세무·RBI(FEMA) 연계" },
      { industry: "ECB interest", issues: "원천·FEMA·이자 비용 인정" },
      { industry: "TP documentation", issues: "Benchmarking·Local file·Master file" },
      { industry: "FEMA reporting", issues: "RBI 보고·송금·Intercompany 정합" },
    ],
    msvScopeTitle: "MSV 지원 범위",
    msvScopeItems: [
      "GST·TDS 신고 및 대사",
      "법인세 및 Advance Tax 검토",
      "ITC reconciliation·Vendor follow-up",
      "Export refund 지원",
      "TP 및 Intercompany 검토",
      "외국계 기업 세무 운영 지원",
      "Notice·조사 대응 지원",
      "본사 보고 및 세무 캘린더 운영",
    ],
    sections: [
      {
        title: "Notice 및 세무 조사 대응",
        bullets: [
          "GST notice, TDS mismatch notice, Income tax scrutiny, Refund query",
          "Vendor reconciliation request 등 유형별 대응 루틴",
          "[실무] Response timeline, Supporting document 번들",
          "[실무] ERP trail 확보, Reconciliation working 관리",
        ],
      },
    ],
    relatedIntro: "같은 운영 스택에서 자주 이어집니다.",
    relatedTitle: "연결 페이지",
    relatedLinks: [
      { href: "/services/gst-practice-guide", label: "GST 실무 안내" },
      { href: "/services/guide-india-accounting", label: "인도 회계 가이드" },
      { href: "/services/guide-fema-fx", label: "FEMA·외환 가이드" },
      { href: "/services/import-export-iec", label: "수출입(IEC)·통관 안내" },
      { href: "/services/hr-payroll", label: "HR·Payroll 서비스" },
      { href: "/services/personal-income-tax-calculator", label: "급여 TDS 계산기" },
      { href: "/services/india-accounting-glossary", label: "지식 베이스" },
      { href: "/services/compliance-calendar", label: "신고준수 달력" },
    ],
    closingNote:
      "인도 세무 운영은 단순 신고보다 GST·회계·은행·수출입·본사 정책이 함께 연결되는 운영 영역이며, 초기 거래 구조와 내부 대사 체계에 따라 이후 리스크 수준과 운영 효율이 크게 달라질 수 있습니다.",
  },
  en: {
    metaTitle: "India tax guide",
    metaDescription:
      "GST, TDS, corporate tax, advance tax, TP, DTAA, e-invoicing, GSTR-2B, refunds and notices · India tax as an operating system, not a filing list.",
    pageTitle: "India tax guide",
    pageDescription:
      "Topic hubs for GST, TDS, corporate tax, withholding and refunds help SEO and internal training · but this page frames them as an operating system tied to ERP, cash and HQ policy.",
    disclaimer:
      "General operating orientation only. Rates, deductions, withholding, refunds and transfer pricing outcomes depend on transaction design, industry, contracts and treaty (DTAA) positions · validate with specialists and current law.",
    introParagraphs: [
      "India tax operations rarely stop at periodic returns: GST, TDS, corporate tax, FEMA, trade, payroll and HQ reporting interlock in one stack.",
      "E-invoices, ledgers, banks and returns must reconcile · initial tax architecture and a monthly reconciliation spine drive risk and speed as much as due dates.",
    ],
    roadmapCardsTitle: "Core checklist · calendars, TP and reconciliations",
    roadmapCards: [
      {
        title: "Filing calendars & cash planning",
        bullets: [
          "Run GST, TDS, advance tax and payroll-related filings on one treasury-aware calendar.",
          "Tie monthly cash forecasts to payment dates · not just return due dates.",
          "Stress-test late fees, interest and mismatch notices before period end.",
          "[Field] GST cash shortfalls and missed advance-tax instalments",
          "[Field] TDS short payments and interest on delayed filings",
        ],
      },
      {
        title: "HQ policy & transfer pricing linkage",
        bullets: [
          "Map group intercompany policies to India tax positions early.",
          "Review royalties, services, management fees and import pricing patterns.",
          "Maintain TP documentation and related-party evidence as operating artefacts · not year-end only.",
          "[Field] Intercompany invoice timing and cost allocations",
          "[Field] Benchmarking gaps; joint FEMA + TP reviews where structures cross borders",
        ],
      },
      {
        title: "E-invoicing & reconciliations",
        bullets: [
          "Monthly alignment across e-invoices, GSTR-1, GSTR-2B and ERP sub-ledgers.",
          "Track vendor filing health and ITC eligibility before close.",
          "Standardise rules that reduce invoice vs payment vs return mismatches.",
          "[Field] Vendor non-filing; IRN generation errors",
          "[Field] GST mismatches and duplicate invoice postings",
        ],
      },
    ],
    nestedChecklistTitle: "Major tax operating lanes",
    nestedChecklistBlocks: [
      {
        title: "GST operations",
        bullets: [
          "GSTR-1/3B, ITC reconciliation, e-invoicing, RCM reviews and export refunds",
          "[Field] GSTR-2B mismatches, blocked credits, vendor follow-up",
        ],
      },
      {
        title: "TDS operations",
        bullets: [
          "Vendor vs salary TDS, lower-deduction certificates, Forms 16/16A",
          "[Field] Wrong sections, PAN mismatches, short deductions and interest",
        ],
      },
      {
        title: "Corporate income tax",
        bullets: [
          "Advance tax, deferred tax, MAT-style considerations and tax-audit hooks",
          "[Field] Provision mismatches, FX on taxable income, disallowance risk",
        ],
      },
      {
        title: "Foreign-owned groups",
        bullets: [
          "DTAA positions, withholding, intercompany charges and royalty/FTS characterisation",
          "[Field] PE risk, Form 10F/TRC packs, equalisation levy touchpoints",
        ],
      },
    ],
    processFlowTitle: "Monthly tax operating rhythm",
    processPhases: [
      {
        title: "Revenue / outward",
        bullets: ["GST liability review", "E-invoice discipline", "Export invoices, LUT and refund linkages"],
      },
      {
        title: "Purchases / inward",
        bullets: ["GSTR-2B reconciliation", "Vendor compliance posture", "ITC eligibility and blocked credits"],
      },
      {
        title: "Treasury",
        bullets: ["Tax payment plan", "Advance tax estimates", "Refund tracking"],
      },
      {
        title: "Filings",
        bullets: ["GST returns", "TDS returns", "Linked PF/ESI/PT reviews where applicable"],
      },
      {
        title: "Close & HQ packs",
        bullets: ["Tax provisions", "Reconciliation working papers", "HQ MIS and tax calendar alignment"],
      },
    ],
    practicalIssuesTitle: "Common operating issues",
    practicalIssues: [
      "GST misaligned with books or returns",
      "ITC gaps when vendors do not file",
      "Wrong TDS sections or rates",
      "Export refund delays",
      "Underpaid advance tax or weak estimates",
      "Intercompany invoice vs GL mismatches",
      "GST data diverging from customs / ICEGATE exports",
      "Missing DTAA / Form 10F / TRC evidence",
    ],
    industryTableTitle: "Foreign-owned groups · headline tax reviews",
    industryCol1: "Theme",
    industryCol2: "What to pressure-test",
    industryRows: [
      { industry: "Management fees", issues: "Withholding, TP, FEMA and HQ allocation rules" },
      { industry: "Royalties / FTS", issues: "Characterisation, DTAA, withholding and EL exposure" },
      { industry: "Technical services", issues: "Place of supply, PE and withholding interplay" },
      { industry: "Imports", issues: "Customs valuation vs TP and GST credits" },
      { industry: "Share allotments", issues: "FMV evidence and FEMA/tax alignment" },
      { industry: "ECB interest", issues: "Withholding, FEMA and deductibility" },
      { industry: "TP documentation", issues: "Benchmarking, local and master files" },
      { industry: "FEMA reporting", issues: "RBI returns vs intercompany cash evidence" },
    ],
    msvScopeTitle: "How MSV can help",
    msvScopeItems: [
      "GST and TDS compliance with reconciliations",
      "Corporate tax and advance tax reviews",
      "ITC reconciliation and vendor follow-up",
      "Export refund programmes",
      "TP and intercompany structuring support",
      "Foreign-owned group tax operating support",
      "Notice and scrutiny response support",
      "HQ reporting packs and tax calendar operations",
    ],
    sections: [
      {
        title: "Notices & tax scrutiny",
        bullets: [
          "GST notices, TDS mismatch letters, income-tax scrutiny and refund queries",
          "Vendor reconciliation requests and evidence timelines",
          "[Field] Response SLAs, structured evidence bundles",
          "[Field] ERP audit trails and controlled reconciliation workbooks",
        ],
      },
    ],
    relatedIntro: "Often read in the same operating stack.",
    relatedTitle: "Linked pages",
    relatedLinks: [
      { href: "/services/gst-practice-guide", label: "GST practice guide" },
      { href: "/services/guide-india-accounting", label: "India accounting guide" },
      { href: "/services/guide-fema-fx", label: "FEMA & FX guide" },
      { href: "/services/import-export-iec", label: "IEC & customs" },
      { href: "/services/hr-payroll", label: "HR & payroll" },
      { href: "/services/personal-income-tax-calculator", label: "Salary TDS calculator" },
      { href: "/services/india-accounting-glossary", label: "Knowledge base" },
      { href: "/services/compliance-calendar", label: "Compliance calendar" },
    ],
    closingNote:
      "India tax is an operating domain where GST, accounting, banking, trade and HQ policy interlock · early transaction design and reconciliation discipline materially change downstream risk and operating efficiency.",
  },
  zh: {
    metaTitle: "印度税务指南",
    metaDescription:
      "GST、TDS、企业所得税、预缴、转让定价、税收协定、电子发票、GSTR-2B、退税与税务通知，从运营体系视角梳理印度税务。",
    pageTitle: "印度税务指南",
    pageDescription:
      "将 GST、TDS、企业所得税、预扣与退税等分主题呈现，利于搜索与内部培训；本文同时强调其与 ERP、资金流及总部政策的联动。",
    disclaimer:
      "本页为一般税务运营概览。实际税率、扣除、预扣、退税及转让定价结果取决于交易结构、行业、合同与税收协定（DTAA）等，请以最新法规与专业意见为准。",
    introParagraphs: [
      "印度税务运营往往不止于按期申报：GST、TDS、企业所得税、FEMA、进出口、薪酬与总部报告通常连成一体。",
      "电子发票、账簿、银行与申报数据需要持续对账，初期的税务架构与月度对账机制，对风险与效率的影响不亚于截止日本身。",
    ],
    roadmapCardsTitle: "核心清单 · 日程、转让定价与对账",
    roadmapCards: [
      {
        title: "申报日程与资金安排",
        bullets: [
          "将 GST、TDS、预缴所得税及与薪酬相关的申报纳入同一资金视角的日历。",
          "把月度现金流预测与税款缴纳节点绑定，而非仅看申报截止日。",
          "在关账前预演滞纳金、利息与不符类通知风险。",
          "[实务] GST 税款缺口、预缴分期遗漏",
          "[实务] TDS 短扣与延迟申报利息",
        ],
      },
      {
        title: "总部政策与转让定价衔接",
        bullets: [
          "尽早将集团关联交易政策映射到印度税务立场。",
          "审视特许权使用费、服务费、管理费及进口定价路径。",
          "将转让定价文档与关联方资料作为日常运营资产，而非仅年末补件。",
          "[实务] 公司间开票时点、费用分摊",
          "[实务] 可比性缺口；跨境结构需 FEMA+TP 并联审视",
        ],
      },
      {
        title: "电子发票与对账",
        bullets: [
          "按月核对电子发票、GSTR-1、GSTR-2B 与 ERP 子账。",
          "关账前跟踪供应商申报与 ITC 可得性。",
          "用规则减少发票、付款与申报之间的不一致。",
          "[实务] 供应商未申报、IRN 生成错误",
          "[实务] GST 不符、重复发票入账",
        ],
      },
    ],
    nestedChecklistTitle: "税务运营主要领域",
    nestedChecklistBlocks: [
      {
        title: "GST 运营",
        bullets: [
          "GSTR-1/3B、进项对账、电子发票、RCM 复核与出口退税",
          "[实务] 2B 不符、被阻断进项、供应商跟进",
        ],
      },
      {
        title: "TDS 运营",
        bullets: [
          "供应商与工资 TDS、低扣证明、16/16A 表单",
          "[实务] 税码错误、PAN 不一致、短扣与利息",
        ],
      },
      {
        title: "企业所得税",
        bullets: [
          "预缴、递延、最低替代税（如适用）及税务稽查衔接",
          "[实务] 预提差异、汇兑影响、不得扣除风险",
        ],
      },
      {
        title: "外资集团税务",
        bullets: [
          "税收协定立场、预扣、公司间费用与特许权/技术服务定性",
          "[实务] 常设机构风险、10F、TRC、均衡税等触点",
        ],
      },
    ],
    processFlowTitle: "一般月度税务运营节奏",
    processPhases: [
      { title: "销售/销项", bullets: ["GST 税负复核", "电子发票", "出口发票、LUT 与退税衔接"] },
      { title: "采购/进项", bullets: ["GSTR-2B 对账", "供应商合规", "ITC 可得性与限制项"] },
      { title: "资金", bullets: ["税款支付计划", "预缴评估", "退税跟踪"] },
      { title: "申报", bullets: ["GST 申报", "TDS 申报", "PF/ESI/PT（如适用）"] },
      { title: "结账与总部", bullets: ["税款预提", "对账底稿", "总部 MIS 与税务日历对齐"] },
    ],
    practicalIssuesTitle: "常见实务问题",
    practicalIssues: [
      "GST 与账册/申报不一致",
      "供应商未申报导致进项缺口",
      "TDS 税码或条款错误",
      "出口退税延迟",
      "预缴不足或估计薄弱",
      "公司间发票与总账不一致",
      "GST 与海关/出口数据不一致",
      "税收协定、10F、TRC 等材料缺失",
    ],
    industryTableTitle: "外资企业主要税务核对",
    industryCol1: "主题",
    industryCol2: "重点核对",
    industryRows: [
      { industry: "管理费", issues: "预扣、转让定价、FEMA 与集团分摊" },
      { industry: "特许权/技术服务", issues: "定性、协定、预扣与均衡税" },
      { industry: "技术服务费", issues: "供应地、常设机构与预扣" },
      { industry: "进口交易", issues: "海关估价与 GST、转让定价" },
      { industry: "股权配售", issues: "公允价值证据与 FEMA/税务衔接" },
      { industry: "ECB 利息", issues: "预扣、FEMA 与扣除" },
      { industry: "转让定价文档", issues: "可比性、本地与主体文档" },
      { industry: "FEMA 报送", issues: "RBI 报送与公司间资金流证据" },
    ],
    msvScopeTitle: "MSV 可支持范围",
    msvScopeItems: [
      "GST、TDS 申报与对账",
      "企业所得税与预缴复核",
      "进项对账与供应商跟进",
      "出口退税支持",
      "转让定价与公司间安排",
      "外资集团税务运营支持",
      "通知与稽查应对",
      "总部报告包与税务日历运营",
    ],
    sections: [
      {
        title: "通知与税务稽查应对",
        bullets: [
          "GST 通知、TDS 不符函、所得税查核与退税问询",
          "供应商对账要求与证据时间线",
          "[实务] 回复时限、结构化证据包",
          "[实务] ERP 痕迹与对账底稿管理",
        ],
      },
    ],
    relatedIntro: "常与同一运营栈一并阅读。",
    relatedTitle: "关联页面",
    relatedLinks: [
      { href: "/services/gst-practice-guide", label: "GST 实务指南" },
      { href: "/services/guide-india-accounting", label: "印度会计指南" },
      { href: "/services/guide-fema-fx", label: "FEMA 与外汇指南" },
      { href: "/services/import-export-iec", label: "IEC 与通关" },
      { href: "/services/hr-payroll", label: "HR·薪酬服务" },
      { href: "/services/personal-income-tax-calculator", label: "工资 TDS 计算器" },
      { href: "/services/india-accounting-glossary", label: "知识库" },
      { href: "/services/compliance-calendar", label: "合规日历" },
    ],
    closingNote:
      "印度税务不只是申报：GST、会计、银行、进出口与总部政策相互勾连；初期的交易结构与内部对账机制，会显著影响后续风险与运营效率。",
  },
};
