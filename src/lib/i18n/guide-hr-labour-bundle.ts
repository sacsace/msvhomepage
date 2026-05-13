import type { ServiceGuideCopy } from "@/lib/i18n/service-guides-locale";

type GuideBundle = {
  readonly ko: ServiceGuideCopy;
  readonly en: ServiceGuideCopy;
  readonly zh: ServiceGuideCopy;
};

export const guideHrLabour: GuideBundle = {
  ko: {
    metaTitle: "HR·노무 가이드",
    metaDescription:
      "주별 노동법·근태·Leave·PF·ESI·PT·Shops & Establishment·F&F·분쟁 예방·FRRO·Expat · 인도 HR·노무를 운영 체계 관점으로 정리한 허브.",
    pageTitle: "HR·노무 가이드",
    pageDescription:
      "채용·계약·급여·복지·분쟁 예방을 주제별로 묶은 허브입니다. 단순 소개가 아니라 근로계약·Payroll·기록·출입국까지 연결되는 노무 운영 축을 중심으로 설명합니다.",
    disclaimer:
      "노동·휴일·최저임금·Shops & Establishment·Professional Tax·근로시간 규정은 주(State)·업종·직원 수에 따라 달라질 수 있습니다. 실제 운영 전 현지 법률 및 노무 기준 검토가 필요할 수 있으며, 본 페이지는 참고용 개요입니다.",
    introParagraphs: [
      "인도 HR·노무 운영은 단순 채용이나 급여 계산이 아니라, 근로계약·Payroll·PF·ESI·근태·퇴직·분쟁 예방·출입국(FRRO/비자)까지 함께 연결되는 운영 구조입니다.",
      "실제 실무에서는 주(State)별 노동 규정과 회사 정책이 동시에 적용되므로, 문서·기록·승인 체계를 함께 관리하는 경우가 많습니다.",
    ],
    roadmapCardsTitle: "핵심 체크리스트 · 주별 규정·문서·비자·노무 연계",
    roadmapCards: [
      {
        title: "주(State)별 규정 관리",
        bullets: [
          "최저임금·공휴일·근무시간·Leave 규정은 주(State)별 차이가 존재할 수 있습니다.",
          "Shops & Establishment 및 사업장 등록 상태를 함께 검토합니다.",
          "Multi-state 운영 시 지역별 Payroll·PT 정책 정리가 중요할 수 있습니다.",
          "[실무] 최저임금 미반영, 공휴일 정책 혼선",
          "[실무] PT state mismatch, Branch office 등록 누락",
        ],
      },
      {
        title: "문서 및 근태 데이터 관리",
        bullets: [
          "Offer Letter·Employment Agreement·Attendance·Leave·Payroll 데이터를 감사 가능 형태로 보관합니다.",
          "HR 문서와 Payroll 구조가 서로 일치하는지 검토합니다.",
          "직원 서명·KYC·승인 흐름 관리 기준을 운영할 수 있습니다.",
          "[실무] Attendance 누락, Offer와 실제 급여 구조 불일치",
          "[실무] Employee file 미정리, Payroll approval trail 부족",
        ],
      },
      {
        title: "비자·Expat·파견 인력",
        bullets: [
          "외국인 직원 및 파견 인력 운영 시 FRRO·비자·Payroll·세무 구조를 함께 검토합니다.",
          "HQ recharge 및 Expat payroll 구조가 연결되는 경우가 많습니다.",
          "Contractor·Consultant·Employee 구분 기준을 검토할 수 있습니다.",
          "[실무] Visa type mismatch, Expat payroll tax issue",
          "[실무] PE risk 가능성, Intercompany recharge mismatch",
        ],
      },
    ],
    processFlowTitle: "운영 블록 · 입사·근태·퇴사·컴플라이언스",
    processPhases: [
      {
        title: "채용 및 입사 운영",
        bullets: [
          "JD 작성, Salary benchmarking, Offer release",
          "Background verification, PAN/Aadhaar/Bank detail 수집",
          "NDA 및 IP agreement 검토",
          "[실무] Offer release delay, Compensation mismatch",
          "[실무] Missing employee KYC, Joining date 변경",
        ],
      },
      {
        title: "Attendance·Leave·근무시간 관리",
        bullets: [
          "Attendance·Shift·Leave·Overtime 데이터를 Payroll과 연결합니다.",
          "Weekly off·Holiday·Night shift 기준을 검토할 수 있습니다.",
          "Remote work 및 Hybrid policy 검토 가능",
          "[실무] Overtime calculation 오류, Leave carry forward mismatch",
          "[실무] Attendance manipulation risk, Shift allowance issue",
        ],
      },
      {
        title: "퇴사 및 분쟁 예방",
        bullets: [
          "Final settlement(F&F), Notice period, Exit document",
          "Asset return, Gratuity 및 Leave encashment 검토",
          "[실무] F&F delay, Notice recovery dispute",
          "[실무] Employee claim issue, Data retention 문제",
        ],
      },
      {
        title: "노무 컴플라이언스 운영",
        bullets: [
          "PF·ESI·Professional Tax·LWF 운영",
          "Employee register 관리, Shops & Establishment 대응",
          "Labour inspection 대응 가능",
          "[실무] PF applicability confusion, ESI threshold issue",
          "[실무] PT state mismatch, Labour register 미비",
        ],
      },
    ],
    practicalIssuesTitle: "실무상 자주 발생하는 이슈",
    practicalIssues: [
      "Offer와 Payroll 불일치",
      "Attendance 누락·지각 데이터 정합 실패",
      "PF/PT 적용 오류",
      "Final settlement 지연",
      "Leave balance mismatch",
      "Expat visa·체류 조건과 급여 불일치",
      "Employee classification dispute(Contractor vs Employee)",
      "Payroll cutoff delay",
    ],
    industryTableTitle: "외국계 기업 주요 HR·노무 검토",
    industryCol1: "축",
    industryCol2: "검토·실무 포인트",
    industryRows: [
      { industry: "HQ policy localization", issues: "휴가·징계·급여·복지 문구와 현지 노동법·관행 정합" },
      { industry: "Expat payroll", issues: "비자·FRRO·TDS·세제·본사 정책 연계" },
      { industry: "Intercompany recharge", issues: "관리비·근거 문서·TP·세무" },
      { industry: "Korean HQ reporting", issues: "헤드카운트·비용·MIS·승인 SLA" },
      { industry: "Salary confidentiality", issues: "접근권한·파일·감사·내부 통제" },
      { industry: "Contractor vs Employee", issues: "고용·보험·세무·책임·분쟁 리스크" },
      { industry: "HQ approval bottleneck", issues: "입퇴사·변동급·현지 법정 마감 충돌" },
      { industry: "Salary structure mismatch", issues: "본사 템플릿 vs 인도 Payroll·TDS" },
      { industry: "Tax equalization", issues: "본사 정책·현지 원천·정산" },
      { industry: "Payroll reporting delay", issues: "본사 리포트·감사 요청 대응" },
    ],
    msvScopeTitle: "MSV 지원 범위",
    msvScopeItems: [
      "Offer·Employment Agreement 검토",
      "Payroll 운영 및 신고 연계",
      "PF·ESI·PT 대응",
      "Attendance·Leave 운영",
      "Shops & Establishment 관리",
      "Expat 및 FRRO 연계",
      "HR 문서·승인 체계 구축",
      "본사 HR 보고 지원",
    ],
    relatedIntro: "같은 운영 스택에서 자주 이어집니다.",
    relatedTitle: "연결 페이지",
    relatedLinks: [
      { href: "/services/hr-payroll", label: "HR·Payroll 서비스" },
      { href: "/services/frro", label: "FRRO 서비스" },
      { href: "/services/guide-india-tax", label: "인도 세무 가이드" },
      { href: "/services/personal-income-tax-calculator", label: "급여 TDS 계산기" },
      { href: "/services/compliance-calendar", label: "신고준수 달력" },
      { href: "/services/contracts-legal", label: "계약·법률 문서" },
    ],
    closingNote:
      "인도 HR·노무 운영은 단순 채용보다 계약·Payroll·세무·출입국·근태 데이터가 함께 연결되는 운영 영역이며, 초기 정책 및 문서 구조 설계에 따라 이후 리스크와 운영 효율이 크게 달라질 수 있습니다.",
  },
  en: {
    metaTitle: "HR & labour guide (India)",
    metaDescription:
      "State labour rules, attendance, leave, PF/ESI/PT, Shops & Establishment, exits, disputes, FRRO and expats · India HR/labour as an operating system.",
    pageTitle: "HR & labour guide",
    pageDescription:
      "A topic hub for hiring, contracts, pay, benefits and dispute prevention · framed as the operating system that links contracts, payroll records and immigration · not a brochure alone.",
    disclaimer:
      "Holidays, minimum wages, Shops & Establishment, professional tax and working-time rules vary by state, industry and headcount. Validate against current law and local practice before you operate · this page is orientation only.",
    introParagraphs: [
      "India HR/labour is rarely “recruitment only”: employment contracts, payroll, PF/ESI, attendance, exits, dispute prevention and FRRO/visa threads interlock.",
      "State labour law and company policy often apply together · so documents, evidence and approvals need one operating spine.",
    ],
    roadmapCardsTitle: "Core checklist · state law, evidence and visa/labour linkage",
    roadmapCards: [
      {
        title: "State-by-state rule management",
        bullets: [
          "Minimum wages, public holidays, hours and leave entitlements can diverge by state.",
          "Review Shops & Establishment registrations and branch footprints together.",
          "Multi-state footprints usually need a PT/payroll policy map per location.",
          "[Field] Missed minimum-wage updates; confused holiday calendars",
          "[Field] PT nexus mismatches; missing branch registrations",
        ],
      },
      {
        title: "Documents & attendance evidence",
        bullets: [
          "Keep offers, employment contracts, attendance, leave and payroll data audit-ready.",
          "Reconcile HR paperwork with what payroll actually pays.",
          "Standardise signatures, KYC packs and approval trails.",
          "[Field] Missing attendance feeds; offer vs pay-structure drift",
          "[Field] Weak employee files; thin payroll approval trails",
        ],
      },
      {
        title: "Visas, expats and seconded staff",
        bullets: [
          "Blend FRRO/visa posture with payroll and tax treatment for foreign and seconded workers.",
          "HQ recharge and expat payroll stories often land in the same review.",
          "Stress-test contractor vs consultant vs employee classification.",
          "[Field] Visa category vs role mismatch; expat payroll/tax surprises",
          "[Field] PE risk signals; intercompany recharge mismatches",
        ],
      },
    ],
    processFlowTitle: "Operating blocks · hire, time, exit, compliance",
    processPhases: [
      {
        title: "Hiring & onboarding",
        bullets: [
          "JD drafting, salary benchmarking, offers and background checks",
          "PAN/Aadhaar/bank KYC packs; NDA and IP agreements",
          "[Field] Offer delays; compensation mismatches vs policy",
          "[Field] Missing KYC; shifting joining dates",
        ],
      },
      {
        title: "Attendance, leave & working time",
        bullets: [
          "Connect shifts, leave, overtime and attendance feeds into payroll locks",
          "Review weekly offs, holidays and night-work rules",
          "Document remote and hybrid working against record-keeping duties",
          "[Field] Overtime calculation errors; carry-forward mismatches",
          "[Field] Attendance integrity risks; shift allowance disputes",
        ],
      },
      {
        title: "Exits & dispute prevention",
        bullets: [
          "Full & final settlement, notice periods and exit paperwork",
          "Asset returns; gratuity and leave encashment reviews",
          "[Field] F&F delays; notice recovery disputes",
          "[Field] Employee claims; data retention gaps",
        ],
      },
      {
        title: "Labour compliance operations",
        bullets: [
          "PF, ESI, professional tax and LWF operating rhythm",
          "Employee registers and Shops & Establishment coordination",
          "Labour inspection readiness",
          "[Field] PF applicability confusion; ESI threshold debates",
          "[Field] PT nexus issues; incomplete labour registers",
        ],
      },
    ],
    practicalIssuesTitle: "Common operating issues",
    practicalIssues: [
      "Offers that do not match payroll structures",
      "Missing or late attendance data before payroll lock",
      "PF/PT misapplications",
      "Delayed full & final settlements",
      "Leave balance mismatches vs payroll",
      "Expat visa conditions misaligned with pay cycles",
      "Contractor vs employee classification disputes",
      "Late payroll cut-offs breaking approvals",
    ],
    industryTableTitle: "Foreign-owned groups · headline HR/labour reviews",
    industryCol1: "Theme",
    industryCol2: "What to pressure-test",
    industryRows: [
      { industry: "HQ policy localisation", issues: "Leave, discipline and pay language vs India labour practice" },
      { industry: "Expat payroll", issues: "Visas, FRRO, TDS and group policy alignment" },
      { industry: "Intercompany recharge", issues: "Management charges, evidence and tax/TP touchpoints" },
      { industry: "Korean HQ reporting", issues: "Headcount, cost MIS and approval SLAs" },
      { industry: "Pay confidentiality", issues: "Access controls, files and audit defensibility" },
      { industry: "Contractor vs employee", issues: "Insurance, tax, liability and dispute risk" },
      { industry: "HQ approval bottlenecks", issues: "Hires/exits and variable pay vs statutory deadlines" },
      { industry: "Salary structure mismatch", issues: "Group templates vs India payroll and withholding" },
      { industry: "Tax equalisation", issues: "Policy design, local withholding and true-ups" },
      { industry: "Payroll reporting delays", issues: "Group reporting and audit requests" },
    ],
    msvScopeTitle: "How MSV can help",
    msvScopeItems: [
      "Offer and employment agreement reviews",
      "Payroll operations linked to filings",
      "PF, ESI and PT coordination",
      "Attendance and leave operations",
      "Shops & Establishment administration",
      "Expat and FRRO coordination",
      "HR document and approval spine design",
      "HQ HR reporting support",
    ],
    relatedIntro: "Often read in the same operating stack.",
    relatedTitle: "Linked pages",
    relatedLinks: [
      { href: "/services/hr-payroll", label: "HR & payroll services" },
      { href: "/services/frro", label: "FRRO services" },
      { href: "/services/guide-india-tax", label: "India tax guide" },
      { href: "/services/personal-income-tax-calculator", label: "Salary TDS calculator" },
      { href: "/services/compliance-calendar", label: "Compliance calendar" },
      { href: "/services/contracts-legal", label: "Contracts & legal" },
    ],
    closingNote:
      "India HR/labour is an operating domain where contracts, payroll, tax, immigration and attendance data interlock · early policy and document design materially changes downstream risk and efficiency.",
  },
  zh: {
    metaTitle: "人力资源与劳动指南",
    metaDescription:
      "各邦劳动规则、考勤与假期、PF/ESI/PT、商铺与机构登记、离职与争议预防、FRRO 与外籍员工，从运营体系视角梳理印度 HR/劳动合规。",
    pageTitle: "人力资源与劳动指南",
    pageDescription:
      "招聘、合同、薪酬、福利与争议预防等主题汇总；并强调与劳动合同、薪酬记录及出入境管理的联动，而非单一主题罗列。",
    disclaimer:
      "劳动、假期、最低工资、商铺与机构法、职业税与工时等因邦、行业与人数而异；实际运营前请以最新法律与当地实践为准。本页为概览参考。",
    introParagraphs: [
      "印度 HR/劳动合规很少止于“招聘”：劳动合同、薪酬、PF/ESI、考勤、离职、争议预防与 FRRO/签证通常连成一体。",
      "地方法与集团政策往往同时适用，因此需要将文件、证据与审批纳入同一运营主轴。",
    ],
    roadmapCardsTitle: "核心清单 · 地方法规、证据链与签证/劳动衔接",
    roadmapCards: [
      {
        title: "各邦规则管理",
        bullets: [
          "最低工资、公共假期、工时与假期权利可能因邦而异。",
          "同步审视商铺与机构登记及分支机构布局。",
          "跨邦运营通常需要按地点梳理 PT/薪酬政策。",
          "[实务] 最低工资更新遗漏、假期口径混乱",
          "[实务] PT 纳税地错误、分支机构登记缺失",
        ],
      },
      {
        title: "文件与考勤证据",
        bullets: [
          "以可审计方式保存录用函、劳动合同、考勤、假期与薪酬数据。",
          "核对人事文本与实际发薪结构是否一致。",
          "规范签字、KYC 材料与审批痕迹。",
          "[实务] 考勤数据缺失、录用条件与薪酬结构不一致",
          "[实务] 员工档案薄弱、薪酬审批链不足",
        ],
      },
      {
        title: "签证、外籍与派遣",
        bullets: [
          "将 FRRO/签证安排与薪酬、预扣税处理一并审视。",
          "总部费用分摊与外籍薪酬路径常需并联评估。",
          "检验承揽、顾问与雇员分类。",
          "[实务] 签证类别与岗位不匹配、外籍薪酬税务意外",
          "[实务] 常设机构信号、公司间费用分摊不一致",
        ],
      },
    ],
    processFlowTitle: "运营模块 · 入职、工时、离职与合规",
    processPhases: [
      {
        title: "招聘与入职",
        bullets: [
          "职位说明、市场对标、录用与背调",
          "PAN/Aadhaar/银行等材料包；保密与知识产权协议",
          "[实务] 录用拖延、薪酬与政策不一致",
          "[实务] KYC 不全、入职日期频繁变更",
        ],
      },
      {
        title: "考勤、假期与工时",
        bullets: [
          "将排班、假期、加班与考勤结果在关账前接入薪酬",
          "审视休息日、公共假期与夜班规则",
          "将远程/混合办公与留痕义务对齐",
          "[实务] 加班费计算错误、假期结转不一致",
          "[实务] 考勤真实性风险、夜班津贴争议",
        ],
      },
      {
        title: "离职与争议预防",
        bullets: [
          "离职结算、通知期与离职文件",
          "资产归还；离职金与假期折现复核",
          "[实务] 结算拖延、通知期与补偿争议",
          "[实务] 员工主张、数据留存缺口",
        ],
      },
      {
        title: "劳动合规运营",
        bullets: [
          "PF、ESI、职业税与 LWF 的运营节奏",
          "员工登记与商铺及机构法协同",
          "劳动监察应对准备",
          "[实务] PF 适用争议、ESI 门槛争议",
          "[实务] PT 纳税地、劳动登记不全",
        ],
      },
    ],
    practicalIssuesTitle: "常见实务问题",
    practicalIssues: [
      "录用条件与实际薪酬结构不一致",
      "关账前考勤缺失或迟到数据未闭合",
      "PF/PT 适用错误",
      "离职结算拖延",
      "假期余额与薪酬不一致",
      "外籍签证条件与发薪节奏不匹配",
      "承揽与雇员分类争议",
      "薪酬截止日拖延导致审批断裂",
    ],
    industryTableTitle: "外资企业主要 HR/劳动核对",
    industryCol1: "主题",
    industryCol2: "重点核对",
    industryRows: [
      { industry: "总部政策本地化", issues: "假期、纪律、薪酬福利表述与当地劳动法" },
      { industry: "外籍薪酬", issues: "签证、FRRO、预扣税与集团政策" },
      { industry: "公司间费用分摊", issues: "管理费、证据链与税务/转让定价" },
      { industry: "韩国总部报表", issues: "人数、成本 MIS 与审批时效" },
      { industry: "薪酬保密", issues: "权限、档案与审计可辩护性" },
      { industry: "承揽与雇员", issues: "保险、税务、责任与争议风险" },
      { industry: "总部审批瓶颈", issues: "入离职与浮动薪酬 vs 法定期限" },
      { industry: "薪酬结构不一致", issues: "集团模板与印度薪酬预扣" },
      { industry: "税务平衡", issues: "政策、当地预扣与清算" },
      { industry: "薪酬报告延迟", issues: "集团报表与审计需求" },
    ],
    msvScopeTitle: "MSV 可支持范围",
    msvScopeItems: [
      "录用与劳动合同审阅",
      "与申报衔接的薪酬运营",
      "PF、ESI、PT 协同",
      "考勤与假期运营",
      "商铺与机构法管理",
      "外籍与 FRRO 衔接",
      "人事文件与审批体系搭建",
      "总部 HR 报告支持",
    ],
    relatedIntro: "常与同一运营栈一并阅读。",
    relatedTitle: "关联页面",
    relatedLinks: [
      { href: "/services/hr-payroll", label: "HR·薪酬服务" },
      { href: "/services/frro", label: "FRRO 服务" },
      { href: "/services/guide-india-tax", label: "印度税务指南" },
      { href: "/services/personal-income-tax-calculator", label: "工资 TDS 计算器" },
      { href: "/services/compliance-calendar", label: "合规日历" },
      { href: "/services/contracts-legal", label: "合同与法律文件" },
    ],
    closingNote:
      "印度 HR/劳动合规不只是招聘：合同、薪酬、税务、出入境与考勤数据相互勾连；初期的政策与文件结构设计会显著影响后续风险与效率。",
  },
};
