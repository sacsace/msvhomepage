import type { ServiceGuideCopy } from "@/lib/i18n/service-guides-locale";

type GuideBundle = {
  readonly ko: ServiceGuideCopy;
  readonly en: ServiceGuideCopy;
  readonly zh: ServiceGuideCopy;
};

export const guideFemaFx: GuideBundle = {
  ko: {
    metaTitle: "FEMA·외환 가이드",
    metaDescription:
      "FEMA·RBI·AD bank, KYC, UBO, remittance, Form 15CA/CB, 배당, 증자, FC-TRS, ECB, ODI, inward/outward, intercompany · 인도 외환(FEMA) 운영 구조 허브.",
    pageTitle: "FEMA·외환 가이드",
    pageDescription:
      "송금·배당·증자·주식거래·외채(ECB)·ODI 등 외환 실무를 FEMA 관점에서 묶었습니다. FDI·지분 신고 세부는 FDI 전용 페이지와 병행하세요.",
    disclaimer:
      "FEMA·RBI·AD Bank 운영 기준 및 은행 내부 심사 절차는 거래 유형·국가·업종·금액·Ultimate beneficial owner 구조에 따라 달라질 수 있습니다. 실제 거래 전 전문 검토가 필요할 수 있으며, 본 페이지는 참고용 개요입니다.",
    introParagraphs: [
      "인도 외환(FEMA) 운영은 단순 송금 업무가 아니라, 투자(FDI)·배당·주식 거래·ECB·ODI·수출입·은행 KYC·RBI 보고가 함께 연결되는 운영 구조입니다.",
      "실제 실무에서는 FEMA·세무·은행 심사·회계·본사 자금 정책이 동시에 검토되므로, 거래 유형별 문서 및 보고 체계 정리가 중요할 수 있습니다.",
    ],
    roadmapCardsTitle: "핵심 체크리스트 · KYC·RBI·본사 자금·거래별 SOP",
    roadmapCards: [
      {
        title: "은행 KYC 및 RBI 보고 관리",
        bullets: [
          "AD Bank KYC·UBO·Board resolution·송금 문서를 거래 유형별로 관리합니다.",
          "FEMA 신고 일정과 은행 제출 일정을 같은 운영 캘린더에 두는 경우가 많습니다.",
          "RBI reporting delay 및 은행 query 대응 구조를 운영할 수 있습니다.",
          "[실무] KYC mismatch, UBO clarification 요청",
          "[실무] Bank compliance delay, RBI reporting 누락",
        ],
      },
      {
        title: "본사 자금 구조 및 인도 법인 한도 검토",
        bullets: [
          "본사 Funding policy와 인도 법인의 FEMA 한도 구조를 연결합니다.",
          "Equity·Loan·Advance·Royalty·Service fee 구조를 함께 검토합니다.",
          "Intercompany transaction과 TP·세무 이슈가 연결될 수 있습니다.",
          "[실무] Intercompany funding mismatch, FEMA vs tax treatment 차이",
          "[실무] End-use restriction issue, Transfer pricing 연계 가능성",
        ],
      },
      {
        title: "거래 유형별 FEMA 체크리스트 운영",
        bullets: [
          "송금·배당·주식 양도·ECB·ODI·수입 대금 지급 등 거래 유형별 체크리스트를 운영합니다.",
          "계약·Invoice·Valuation·Board document·Tax certificate 흐름을 연결합니다.",
          "반복 거래는 표준 운영 프로세스(SOP)로 관리할 수 있습니다.",
          "[실무] Missing supporting document, Valuation discrepancy",
          "[실무] Remittance rejection, Delayed compliance filing",
        ],
      },
    ],
    governanceTitle: "주요 외환 거래 유형",
    governanceBlocks: [
      {
        title: "Inward remittance (자금 유입)",
        bullets: [
          "FDI investment, Share application money",
          "Intercompany funding, Advance receipt",
          "[실무] FIRC tracking, Allotment timeline",
          "[실무] FEMA reporting linkage",
        ],
      },
      {
        title: "Outward remittance (해외 송금)",
        bullets: [
          "Service fee, Royalty, Import payment",
          "Dividend, Technical service payment",
          "[실무] Form 15CA/CB, Withholding tax",
          "[실무] FEMA documentation, AD bank query",
        ],
      },
      {
        title: "Intercompany transaction",
        bullets: [
          "Management fee, Cost recharge",
          "Loan repayment, Interest remittance",
          "[실무] TP documentation, FEMA pricing guideline",
          "[실무] Supporting agreement",
        ],
      },
    ],
    nestedChecklistTitle: "배당·자본 거래 · ECB · ODI",
    nestedChecklistBlocks: [
      {
        title: "Dividend & capital transactions",
        bullets: [
          "Dividend declaration, Share transfer",
          "Capital reduction, Rights issue, Bonus issue",
          "[실무] Valuation requirement, FEMA pricing guideline",
          "[실무] Withholding tax, FC-TRS linkage",
        ],
      },
      {
        title: "ECB & foreign borrowing",
        bullets: [
          "ECB eligibility, Drawdown, Interest payment",
          "Repayment schedule, Monthly/annual reporting",
          "[실무] End-use restriction, Hedging requirement",
          "[실무] Late ECB reporting, Interest remittance issue",
          "※ 절차·한도는 `/services/ecb` 안내와 병행하세요.",
        ],
      },
      {
        title: "ODI & overseas structure",
        bullets: [
          "해외 자회사 설립, 제3국 투자 구조",
          "해외 Holding company, Downstream investment",
          "[실무] ODI eligibility, Layered structure review",
          "[실무] FEMA reporting, Tax treaty structure",
        ],
      },
    ],
    practicalIssuesTitle: "실무상 자주 발생하는 이슈",
    practicalIssues: [
      "은행 KYC 장기화",
      "FEMA 신고 지연",
      "Remittance rejection",
      "UBO clarification 요청",
      "FEMA와 세무 처리 차이",
      "AD bank query 반복",
      "Form 15CA/CB mismatch",
      "Share allotment delay",
    ],
    industryTableTitle: "외국계 기업 주요 FEMA 검토",
    industryCol1: "거래 유형",
    industryCol2: "주요 검토 포인트",
    industryCol3: "실무상 자주 발생하는 이슈",
    industryRows: [
      {
        industry: "Intercompany funding",
        issues: "FEMA route·Equity vs Loan·Valuation·Related party·Board approval",
        practicalNotes: "자금 성격 혼선·증빙·한도 정합",
      },
      {
        industry: "Royalty",
        issues:
          "Royalty agreement·TP·Withholding tax·DTAA·AD Bank 서류·Automatic route·상표/기술 사용 범위",
        practicalNotes: "송금 지연·은행 질의",
      },
      {
        industry: "Technical service fee",
        issues: "FTS·Form 15CA/CB·GST import of services·PE risk·Deliverable 증빙",
        practicalNotes: "계약 범위 불명확",
      },
      {
        industry: "Import settlement",
        issues: "IEC·AD Code·Bill of Entry·Import remittance timeline·은행 UCP 검토",
        practicalNotes: "은행 지급 보류·서류 mismatch",
      },
      {
        industry: "Expat remittance",
        issues: "Employment visa·Payroll tax·Form 16·은행 KYC·해외 송금 증빙",
        practicalNotes: "증빙 누락·지연·세무 정합",
      },
      {
        industry: "Dividend repatriation",
        issues: "Distributable profits·Board/Shareholder approval·원천세·FEMA outward",
        practicalNotes: "Board approval 누락·송금 전 은행 증빙 요청",
      },
      {
        industry: "ODI structure",
        issues: "ODI eligibility·Step-down subsidiary·APR reporting·Financial commitment limits",
        practicalNotes: "구조 제한·보고 누락",
      },
      {
        industry: "ECB compliance",
        issues: "End-use·ECB-2·All-in-cost ceiling·Average maturity·이자·Hedging requirement",
        practicalNotes: "보고 지연·은행 정합",
      },
      {
        industry: "FEMA vs Companies Act",
        issues: "Board/Shareholder approval·ROC filing·FEMA reporting consistency",
        practicalNotes: "결의·공시·송금 조건 불일치",
      },
      {
        industry: "Banking timeline delay",
        issues: "AD Bank review timeline·KYC refresh·Cashflow planning",
        practicalNotes: "마감 리스크·현금흐름 압박",
      },
      {
        industry: "RBI reporting exposure",
        issues: "FC-GPR·FC-TRS·FLA 등 노출",
        practicalNotes: "LSF·Compounding risk·향후 송금 제한",
      },
    ],
    msvScopeTitle: "MSV 지원 범위",
    msvScopeItems: [
      "FEMA 구조 검토",
      "AD Bank coordination",
      "송금·배당·증자 지원",
      "FC-GPR / FC-TRS 대응",
      "ECB reporting 지원",
      "ODI 구조 검토",
      "RBI 및 은행 query 대응",
      "외국계 기업 자금 운영 지원",
    ],
    relatedIntro: "같은 자금·세무·보고 스택에서 자주 이어집니다.",
    relatedTitle: "연결 페이지",
    relatedLinks: [
      { href: "/services/fdi-fema-guide", label: "FDI·FEMA 안내" },
      { href: "/services/ecb", label: "ECB·FEMA 실무 안내" },
      { href: "/services/guide-india-tax", label: "인도 세무 가이드" },
      { href: "/services/guide-india-accounting", label: "인도 회계 가이드" },
      { href: "/services/import-export-iec", label: "수출입(IEC)·통관 안내" },
      { href: "/services/contracts-legal", label: "계약·법률 문서" },
      { href: "/services/compliance-calendar", label: "신고준수 달력" },
    ],
    closingNote:
      "인도 외환(FEMA) 운영은 단순 송금 업무보다 투자·은행·세무·계약·RBI 보고가 함께 연결되는 운영 영역이며, 초기 거래 구조와 문서 체계 설계에 따라 이후 리스크와 자금 운영 효율이 크게 달라질 수 있습니다.",
  },
  en: {
    metaTitle: "FEMA & FX guide (India)",
    metaDescription:
      "FEMA, RBI, AD banks, KYC, UBO, remittances, Form 15CA/CB, dividends, equity, FC-TRS, ECB, ODI · inward/outward and intercompany treasury operating stack.",
    pageTitle: "FEMA & FX guide",
    pageDescription:
      "Remittances, dividends, capital calls, share transfers, ECB and ODI · India FX workstreams grouped under FEMA. Pair with the FDI hub for equity filing depth.",
    disclaimer:
      "FEMA/RBI/AD bank standards and internal credit & compliance reviews vary by instrument, corridor, sector, amount and UBO facts. Validate each deal with specialists · orientation only.",
    introParagraphs: [
      "India FEMA operations are rarely “wire only”: FDI, dividends, equity deals, ECB, ODI, trade flows, bank KYC and RBI reporting interlock in one stack.",
      "Treasury, tax, bank diligence, accounting and HQ funding policy are usually reviewed together · document packs and reporting cadence drive downstream risk.",
    ],
    roadmapCardsTitle: "Core checklist · KYC/RBI cadence, HQ limits, instrument SOPs",
    roadmapCards: [
      {
        title: "Bank KYC & RBI reporting hygiene",
        bullets: [
          "Run AD bank KYC, UBO evidence, board packs and remittance papers per instrument family.",
          "Many teams place FEMA filing dates and bank submission SLAs on one operating calendar.",
          "Operate playbooks for RBI reporting delays and prolonged AD queries.",
          "[Field] KYC mismatches; UBO clarification loops",
          "[Field] Compliance queueing; missed RBI lines",
        ],
      },
      {
        title: "HQ funding policy vs India entity limits",
        bullets: [
          "Map HQ treasury policy to India FEMA headroom for equity, loans, advances, royalties and fees.",
          "Intercompany flows often chain transfer-pricing and withholding positions with banking evidence.",
          "[Field] Intercompany funding drift vs filings",
          "[Field] FEMA vs tax treatment gaps; end-use friction",
          "[Field] TP documentation depth vs bank questions",
        ],
      },
      {
        title: "Instrument-level FEMA checklists",
        bullets: [
          "Maintain checklists for dividends, share transfers, ECB, ODI and import settlements.",
          "Chain contracts, invoices, valuations, board evidence and tax certificates into one evidence trail.",
          "Standardise repeat trades into SOPs with named owners and cut-offs.",
          "[Field] Missing support; valuation vs bank pushback",
          "[Field] Remittance rejections; late compliance filings",
        ],
      },
    ],
    governanceTitle: "Major FX transaction families",
    governanceBlocks: [
      {
        title: "Inward remittance",
        bullets: [
          "FDI inflows, share application money",
          "Intercompany funding, advance receipts",
          "[Field] FIRC discipline; allotment timing vs cash-in",
          "[Field] Link cash to FEMA reporting lines",
        ],
      },
      {
        title: "Outward remittance",
        bullets: [
          "Service fees, royalties, import payments",
          "Dividends, technical service payments",
          "[Field] Form 15CA/CB; withholding evidence",
          "[Field] FEMA documentation packs; AD queries",
        ],
      },
      {
        title: "Intercompany transactions",
        bullets: [
          "Management fees, cost recharges",
          "Loan principal/interest remittances",
          "[Field] TP files vs pricing guidelines",
          "[Field] Intercompany agreements as banking anchors",
        ],
      },
    ],
    nestedChecklistTitle: "Dividends & capital · ECB · ODI",
    nestedChecklistBlocks: [
      {
        title: "Dividend & capital transactions",
        bullets: [
          "Dividends, share transfers, capital reductions",
          "Rights and bonus issues where relevant",
          "[Field] Valuation and pricing guideline stress",
          "[Field] Withholding; FC-TRS linkages for transfers",
        ],
      },
      {
        title: "ECB & foreign borrowing",
        bullets: [
          "Eligibility, drawdowns, interest and principal",
          "Monthly/annual reporting where applicable",
          "[Field] End-use and hedging covenants",
          "[Field] Late ECB reporting; interest remittance friction",
          "Use `/services/ecb` for limit-led procedural depth.",
        ],
      },
      {
        title: "ODI & overseas structures",
        bullets: [
          "Subsidiary formation, third-country chains, holdcos",
          "Downstream investment angles when facts trigger them",
          "[Field] ODI eligibility; layered ownership reviews",
          "[Field] FEMA reporting plus treaty positioning",
        ],
      },
    ],
    practicalIssuesTitle: "Common operating issues",
    practicalIssues: [
      "Long-running bank KYC cycles",
      "Delayed FEMA/RBI filings",
      "Remittance rejections",
      "Repeated UBO clarification requests",
      "FEMA positions diverging from tax treatment",
      "Looping AD bank queries",
      "Form 15CA/CB mismatches vs bank systems",
      "Share allotment timing slips vs cash received",
    ],
    industryTableTitle: "Foreign groups · headline FEMA reviews",
    industryCol1: "Transaction type",
    industryCol2: "Key review points",
    industryCol3: "Common operating friction",
    industryRows: [
      {
        industry: "Intercompany funding",
        issues: "FEMA route·Equity vs loan·Valuation·Related party·Board approval",
        practicalNotes: "Debt/equity role confusion; evidence and limit alignment",
      },
      {
        industry: "Royalties",
        issues:
          "Royalty agreement·TP·withholding·DTAA·AD bank documentation·automatic route·IP/technology use scope",
        practicalNotes: "Remittance delays; AD queries",
      },
      {
        industry: "Technical service fees",
        issues: "FTS·Form 15CA/CB·GST import of services·PE risk·deliverable evidence",
        practicalNotes: "Unclear contract scope",
      },
      {
        industry: "Import settlements",
        issues: "IEC·AD Code·Bill of Entry·import remittance timeline·UCP-style bank checks",
        practicalNotes: "Payment holds; document mismatches",
      },
      {
        industry: "Expatriate remittances",
        issues: "Employment visa·payroll tax·Form 16·bank KYC·overseas remittance evidence",
        practicalNotes: "Missing evidence; timing slips; tax alignment",
      },
      {
        industry: "Dividend repatriation",
        issues: "Distributable profits·board/shareholder approvals·withholding·FEMA outward",
        practicalNotes: "Missing board packs; pre-wire bank evidence requests",
      },
      {
        industry: "ODI structures",
        issues: "ODI eligibility·step-down subsidiary·APR reporting·financial commitment limits",
        practicalNotes: "Structural caps; reporting gaps",
      },
      {
        industry: "ECB compliance",
        issues: "End-use·ECB-2·all-in-cost ceiling·average maturity·interest·hedging requirements",
        practicalNotes: "Reporting delays; covenant and bank alignment",
      },
      {
        industry: "FEMA vs Companies Act",
        issues: "Board/shareholder approvals·ROC filing·FEMA reporting consistency",
        practicalNotes: "Resolution, disclosure and remittance-condition mismatches",
      },
      {
        industry: "Banking timeline drag",
        issues: "AD bank review SLAs·KYC refresh·cashflow planning",
        practicalNotes: "Closing risk; liquidity pressure",
      },
      {
        industry: "RBI reporting exposure",
        issues: "FC-GPR·FC-TRS·FLA and related lines",
        practicalNotes: "LSF·compounding risk; future remittance restrictions",
      },
    ],
    msvScopeTitle: "How MSV can help",
    msvScopeItems: [
      "FEMA structuring reviews",
      "AD bank coordination",
      "Remittance, dividend and capital-event support",
      "FCGPR / FC-TRS execution",
      "ECB reporting support",
      "ODI structuring reviews",
      "RBI and bank query responses",
      "Foreign-owned treasury operating support",
    ],
    relatedIntro: "Usually read with tax, trade and calendar workstreams.",
    relatedTitle: "Linked pages",
    relatedLinks: [
      { href: "/services/fdi-fema-guide", label: "FDI & FEMA guide" },
      { href: "/services/ecb", label: "ECB / FEMA guide" },
      { href: "/services/guide-india-tax", label: "India tax guide" },
      { href: "/services/guide-india-accounting", label: "India accounting guide" },
      { href: "/services/import-export-iec", label: "IEC & customs" },
      { href: "/services/contracts-legal", label: "Contracts & legal" },
      { href: "/services/compliance-calendar", label: "Compliance calendar" },
    ],
    closingNote:
      "India FEMA is an operating domain where investments, banks, tax, contracts and RBI reporting interlock · early deal structuring and documentation design materially changes downstream risk and treasury efficiency.",
  },
  zh: {
    metaTitle: "FEMA 与外汇指南",
    metaDescription:
      "FEMA、RBI、授权交易商、KYC、UBO、汇款、15CA/CB、股息、增资、FC-TRS、ECB、ODI，境外汇入/汇出与集团往来的运营结构。",
    pageTitle: "FEMA·外汇指南",
    pageDescription:
      "从 FEMA/外汇视角汇总汇款、股息、增资、股权交易、外债与 ODI 等实务。股权类深度报送可与 FDI 专页一并阅读。",
    disclaimer:
      "FEMA/RBI/授权交易商标准及银行内部合规审查因工具、路径、行业、金额与最终受益所有人等而异；交易前请以专业意见为准。",
    introParagraphs: [
      "印度 FEMA 运营很少只是“汇款”：FDI、股息、股权交易、外债、ODI、贸易流、银行 KYC 与 RBI 报送通常连成一体。",
      "资金、税务、银行尽调、会计与总部政策常被并联审视，文档包与报送节奏决定后续风险。",
    ],
    roadmapCardsTitle: "核心清单 · KYC/RBI、总部额度、按工具 SOP",
    roadmapCards: [
      {
        title: "银行 KYC 与 RBI 报送管理",
        bullets: [
          "按交易族管理授权交易商 KYC、UBO、董事会材料与汇款单据。",
          "许多团队将 FEMA 报送日与银行提交 SLA 放在同一运营日历。",
          "为 RBI 报送延误与长期银行问询准备应对流程。",
          "[实务] KYC 不符、UBO 澄清循环",
          "[实务] 合规排队、遗漏报送线条",
        ],
      },
      {
        title: "总部资金政策与印度主体额度",
        bullets: [
          "将总部资金政策映射到股权、借款、预收、特许权与服务费等 FEMA 空间。",
          "集团往来常与转让定价、预扣税及银行证据链相连。",
          "[实务] 集团资金与申报口径漂移",
          "[实务] FEMA 与税务处理差异、用途限制",
          "[实务] TP 材料深度与银行追问",
        ],
      },
      {
        title: "按交易类型的 FEMA 清单",
        bullets: [
          "为股息、股权转让、外债、ODI、进口付汇等维护清单。",
          "将合同、发票、估值、董事会材料与税务证明串成证据链。",
          "对重复交易固化 SOP、责任人与截止点。",
          "[实务] 佐证缺失、估值与银行口径不一致",
          "[实务] 汇款退回、合规报送延误",
        ],
      },
    ],
    governanceTitle: "主要外汇交易类型",
    governanceBlocks: [
      {
        title: "境外汇入",
        bullets: [
          "FDI 入账、认股款",
          "集团资金、预收款",
          "[实务] FIRC、配售与入账时点",
          "[实务] 与 FEMA 报送线条衔接",
        ],
      },
      {
        title: "境外汇出",
        bullets: [
          "服务费、特许权使用费、进口付汇",
          "股息、技术服务费",
          "[实务] Form 15CA/CB、预扣税",
          "[实务] FEMA 材料包、银行问询",
        ],
      },
      {
        title: "集团往来交易",
        bullets: [
          "管理费、费用分摊",
          "还本付息",
          "[实务] TP 文档与定价指引",
          "[实务] 集团协议作为银行锚点",
        ],
      },
    ],
    nestedChecklistTitle: "股息与资本 · 外债 · ODI",
    nestedChecklistBlocks: [
      {
        title: "股息与资本交易",
        bullets: [
          "股息、股权转让、减资",
          "配股、送股等（如适用）",
          "[实务] 估值与定价指引压力",
          "[实务] 预扣税；转让与 FC-TRS 衔接",
        ],
      },
      {
        title: "ECB 与外债",
        bullets: [
          "资格、提款、利息与本息偿还",
          "月度/年度报送（如适用）",
          "[实务] 资金用途与对冲承诺",
          "[实务] ECB 迟报、利息汇出摩擦",
          "额度与程序深度详见 `/services/ecb`。",
        ],
      },
      {
        title: "ODI 与海外结构",
        bullets: [
          "境外子公司、第三国链条、控股架构",
          "触发事实时的下游投资角度",
          "[实务] ODI 资格、层级持股审阅",
          "[实务] FEMA 报送与税收协定布局",
        ],
      },
    ],
    practicalIssuesTitle: "常见实务问题",
    practicalIssues: [
      "银行 KYC 周期过长",
      "FEMA/RBI 报送延误",
      "汇款被拒",
      "反复 UBO 澄清",
      "FEMA 立场与税务处理不一致",
      "授权交易商问询循环",
      "Form 15CA/CB 与银行系统不一致",
      "配售时点与入账脱节",
    ],
    industryTableTitle: "外资企业主要 FEMA 核对",
    industryCol1: "交易类型",
    industryCol2: "主要核对要点",
    industryCol3: "常见实务问题",
    industryRows: [
      {
        industry: "集团资金 / 关联融资",
        issues: "FEMA 路径·股权 vs 借款·估值·关联方·董事会批准",
        practicalNotes: "资金性质混淆·证据与额度一致性",
      },
      {
        industry: "特许权使用费",
        issues: "Royalty 协议·TP·预扣税·DTAA·授权交易商材料·自动路径·商标/技术使用范围",
        practicalNotes: "汇付延迟·银行问询",
      },
      {
        industry: "技术服务费",
        issues: "FTS·Form 15CA/CB·GST 服务进口·常设机构风险·交付成果证据",
        practicalNotes: "合同范围不清",
      },
      {
        industry: "进口结算",
        issues: "IEC·AD Code·报关单(Bill of Entry)·进口付汇时间线·银行 UCP 类审单",
        practicalNotes: "付款暂缓·单证不一致",
      },
      {
        industry: "外籍薪酬/汇款",
        issues: "工作签证·薪酬个税·Form 16·银行 KYC·对外汇款证明",
        practicalNotes: "证明缺失·延误·税务口径",
      },
      {
        industry: "股息汇回",
        issues: "可分配利润·董事会/股东批准·预扣税·FEMA 对外汇款",
        practicalNotes: "决议材料缺失·汇出前银行补件",
      },
      {
        industry: "ODI 结构",
        issues: "ODI 资格·多层子公司·APR 报送·财务承诺额度",
        practicalNotes: "结构限制·报送遗漏",
      },
      {
        industry: "ECB 合规",
        issues: "资金用途·ECB-2·综合成本上限·平均期限·利息·对冲要求",
        practicalNotes: "报送延误·银行与契约口径",
      },
      {
        industry: "FEMA 与公司法",
        issues: "董事会/股东批准·ROC 申报·FEMA 报送一致性",
        practicalNotes: "决议、披露与汇款条件不一致",
      },
      {
        industry: "银行时间线拖延",
        issues: "授权交易商审查周期·KYC 更新·现金流规划",
        practicalNotes: "交割风险·流动性压力",
      },
      {
        industry: "RBI 报送敞口",
        issues: "FC-GPR·FC-TRS·FLA 等相关线条",
        practicalNotes: "迟报费用(LSF)·和解(compounding)风险·后续汇款限制",
      },
    ],
    msvScopeTitle: "MSV 可支持范围",
    msvScopeItems: [
      "FEMA 结构审阅",
      "授权交易商协调",
      "汇款、股息与资本事项支持",
      "FCGPR / FC-TRS 执行",
      "ECB 报送支持",
      "ODI 结构审阅",
      "RBI 与银行问询应对",
      "外资资金运营支持",
    ],
    relatedIntro: "常与税务、贸易与合规日历一并阅读。",
    relatedTitle: "关联页面",
    relatedLinks: [
      { href: "/services/fdi-fema-guide", label: "FDI·FEMA 指南" },
      { href: "/services/ecb", label: "ECB·FEMA 实务指南" },
      { href: "/services/guide-india-tax", label: "印度税务指南" },
      { href: "/services/guide-india-accounting", label: "印度会计指南" },
      { href: "/services/import-export-iec", label: "IEC 与通关" },
      { href: "/services/contracts-legal", label: "合同与法律文件" },
      { href: "/services/compliance-calendar", label: "合规日历" },
    ],
    closingNote:
      "印度 FEMA 不只是汇款：投资、银行、税务、合同与 RBI 报送相互勾连；初期的交易结构与文档体系会显著影响后续风险与资金效率。",
  },
};
