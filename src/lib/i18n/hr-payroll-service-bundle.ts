import type { ServiceGuideCopy } from "@/lib/i18n/service-guides-locale";

type GuideBundle = {
  readonly ko: ServiceGuideCopy;
  readonly en: ServiceGuideCopy;
  readonly zh: ServiceGuideCopy;
};

export const hrPayroll: GuideBundle = {
  ko: {
    metaTitle: "HR·Payroll 서비스",
    metaDescription:
      "Offer·Employment Agreement·Payroll·PF·ESI·PT(주별)·TDS·Shops & Establishments·Gratuity·Attendance·Final settlement·Expat payroll·FRRO · 인도 HR을 운영 시스템 관점으로 정리한 MSV 서비스 허브.",
    pageTitle: "HR·Payroll 서비스",
    pageDescription:
      "인도 현지 채용·급여·법정효과는 주(邦) 법과 연방 규칙이 섞입니다. 채용부터 퇴직 정산까지 문서·등록·납부·근태·승인을 하나의 운영 흐름으로 연결하여 관리할 수 있도록 정리합니다.",
    disclaimer:
      "노동·휴가·Shops & Establishments 등록·컴플라이언스·Professional Tax(주별 적용·일부 주 면제·과표 slab 등 상이)·최저임금 등은 주(State)별 기준 차이가 존재할 수 있습니다. 실제 적용은 업종·직원 수·근무 형태·사업장 위치·본사 HR 정책에 따라 달라질 수 있으며, 본 페이지는 참고용 개요입니다.",
    introParagraphs: [
      "인도 HR 운영은 단순 급여 계산이 아니라, 채용·Offer·Payroll·PF·ESI·Professional Tax(주별 적용)·퇴직금·근태·승인 프로세스를 하나의 운영 흐름으로 연결하여 관리하는 구조입니다.",
      "Professional Tax는 주(State)별로 부과 여부·과표 구조가 다를 수 있습니다. 실제 실무에서는 주별 규정과 회사 정책이 동시에 적용되므로, 문서·승인·급여·컴플라이언스를 통합 관리하는 경우가 많습니다.",
    ],
    roadmapCardsTitle: "핵심 운영 축 · Offer → Payroll → Shops & Establishments → Gratuity",
    roadmapCards: [
      {
        title: "Offer & Contracts",
        bullets: [
          "Offer Letter·Employment Agreement·NDA·HR Policy를 회사 운영 구조에 맞춰 정리합니다.",
          "급여 구조(Basic·HRA·Allowance·Variable pay) 및 PF·Professional Tax(주별 적용)·TDS 영향을 함께 검토합니다.",
          "Probation·Notice period·Leave·Confidentiality·IP 조항 등을 운영 정책과 연결합니다.",
          "[실무] 급여 구조와 Payroll 불일치, Non-compete enforceability 및 범위 검토",
          "[실무] Variable pay 기준 불명확, 본사 계약서와 인도 현지법 충돌 가능성",
          "[구조] Consultant vs Employee, Remote employee, Expat employment structure",
        ],
      },
      {
        title: "Payroll & Compliance",
        bullets: [
          "Payroll 운영 시 TDS·PF·ESI·Professional Tax(주별 적용·State PT)·LWF·Bonus Act 적용 여부 등을 함께 검토·관리합니다.",
          "Attendance·Leave·Overtime·Reimbursement 데이터와 Payroll을 연결합니다.",
          "월별 급여 처리와 세무·법정 신고 일정이 함께 운영되는 경우가 많습니다.",
          "[실무] TDS mismatch, PF wage definition·basic wage interpretation(판례·해석 이슈), ESI applicability confusion",
          "[실무] PT state mismatch, Payroll cutoff delay, Equal remuneration·POSH와의 운영 연계",
          "[운영] Salary structure standardization, Final settlement(F&F), Director payroll, Labour Welfare Fund(LWF)",
        ],
      },
      {
        title: "Shops & Establishments (등록·컴플라이언스)",
        bullets: [
          "사무실·서비스업·소매업 사업장은 Shops & Establishments registration 및 compliance 기준 검토가 필요할 수 있습니다.",
          "영업시간·휴일·근태 기록·Employee register 관리 기준이 주(State)별로 달라질 수 있습니다.",
          "Work from home 정책과 연결 검토가 필요한 경우도 있습니다.",
          "[실무] Attendance register 미비, Leave record 누락",
          "[실무] 여성 근로자 야간 근무 요건(안전·교통·승인 등), Weekly off 기준 차이",
          "[운영] Branch office registration, Remote workforce, Multi-state office",
        ],
      },
      {
        title: "Gratuity & Leave",
        bullets: [
          "장기 근속 직원에 대한 Gratuity 기준 및 Leave policy를 Payroll 구조와 함께 운영합니다.",
          "Earned Leave·Sick Leave·Casual Leave 정책을 회사 운영 방식에 맞춰 설정합니다.",
          "Leave encashment 및 Final settlement 흐름을 검토합니다.",
          "[실무] 5년 연속 근속 요건 검토, Gratuity provisioning, Gratuity 비과세 한도 등",
          "[실무] Notice pay recovery, Leave encashment taxation, Leave carry forward",
          "[실무] Exit employee settlement delay",
          "[정책] Maternity benefit, Bonus eligibility, Holiday calendar",
        ],
      },
    ],
    processFlowTitle: "일반적인 채용 운영 흐름",
    processPhases: [
      {
        title: "채용",
        bullets: ["JD 작성", "Interview coordination", "Salary benchmarking"],
      },
      {
        title: "입사",
        bullets: ["Offer release", "Document collection", "PAN / Aadhaar / Bank details / UAN verification"],
      },
      {
        title: "급여",
        bullets: ["Payroll setup", "PF / ESI / PT mapping", "Attendance integration"],
      },
      {
        title: "운영",
        bullets: ["Leave management", "Reimbursement", "HR documentation"],
      },
      {
        title: "퇴사",
        bullets: ["Final settlement", "Exit document", "Gratuity review"],
      },
    ],
    practicalIssuesTitle: "실무상 자주 발생하는 이슈",
    practicalIssues: [
      "Offer와 실제 Payroll 구조 불일치",
      "PF/PT 주(State) 적용 오류",
      "Attendance 데이터 누락",
      "Final settlement 지연",
      "Leave balance mismatch",
      "TDS calculation 오류",
      "직원 PAN 미등록·KYC 미비",
      "Payroll cutoff 지연",
    ],
    industryTableTitle: "외국계 기업 주요 HR 검토",
    industryCol1: "축",
    industryCol2: "검토·실무 포인트",
    industryRows: [
      { industry: "한국 본사 정책 현지화", issues: "급여·복지·휴가·징계 문구와 인도 노무·세무 정합" },
      { industry: "Expat payroll", issues: "급여·TDS·세제·비자·FRRO와 연계 · PE risk coordination, Shadow payroll, Tax residency review" },
      { industry: "Intercompany recharge", issues: "관리비 배분·문서·Transfer pricing·세무" },
      { industry: "Payroll confidentiality", issues: "접근권한·파일·감사 대응" },
      { industry: "Local vs HQ reporting", issues: "헤드카운트·비용·MIS 템플릿 정합" },
      { industry: "Contractor classification", issues: "고용·세무·보험·책임 리스크" },
      { industry: "HQ salary split vs India payroll mismatch", issues: "본사·인도 급여 분할·원천·은행 송금·보고 정합" },
      { industry: "Tax equalization", issues: "본사 정책·현지 원천·정산 프로세스" },
      { industry: "Visa-linked payroll", issues: "체류 조건·급여 지급·보고" },
      { industry: "HQ approval delay", issues: "입퇴사·변동급·승인 병목" },
    ],
    sections: [
      {
        title: "HR 데이터 및 운영 관리",
        bullets: [
          "Attendance·Leave·Payroll·TDS 데이터를 연결하여 운영합니다.",
          "ERP·Approval workflow·Document retention 체계와 연계 검토가 가능합니다.",
          "HR document retention 및 employee file 관리 기준을 운영할 수 있습니다.",
          "[실무] Employee master mismatch, Duplicate employee code",
          "[실무] Missing KYC, Payroll approval trail 부족",
        ],
      },
    ],
    msvScopeTitle: "MSV 지원 범위",
    msvScopeItems: [
      "Offer·Employment Agreement 작성 지원",
      "Payroll 운영",
      "PF·ESI·PT·TDS 신고",
      "Shops & Establishments registration·compliance 대응",
      "Leave·Attendance 운영",
      "Final settlement 지원",
      "Expat payroll 및 FRRO 연계",
      "본사 HR 보고 체계 지원",
    ],
    relatedIntro: "같은 운영 스택에서 자주 이어집니다.",
    relatedTitle: "연결 페이지",
    relatedLinks: [
      { href: "/services/frro", label: "FRRO 서비스" },
      { href: "/services/guide-india-accounting", label: "인도 회계 가이드" },
      { href: "/services/guide-india-tax", label: "인도 세무 가이드" },
      { href: "/services/personal-income-tax-calculator", label: "급여 TDS 계산기" },
      { href: "/services/compliance-calendar", label: "신고준수 달력" },
      { href: "/services/guide-hr-labour", label: "HR·노무 가이드" },
      { href: "/services/recruitment-support", label: "채용지원" },
      { href: "/services/contracts-legal", label: "계약·법률 문서" },
    ],
    closingNote:
      "인도 HR 운영은 단순 급여 계산보다 채용·노무·세무·출입국·본사 정책이 함께 연결되는 운영 영역이며, 초기 계약 구조와 Payroll 체계에 따라 이후 리스크와 운영 효율이 크게 달라질 수 있습니다.",
  },
  en: {
    metaTitle: "HR & payroll services (India)",
    metaDescription:
      "Offers, contracts, payroll, PF/ESI, state professional tax (PT)/TDS, Shops & Establishments registration and compliance, gratuity, attendance, final settlement, expat payroll and FRRO · India HR as an operating system.",
    pageTitle: "HR & payroll services",
    pageDescription:
      "India HR blends state and Union rules. Hiring through exit — documents, registrations, contributions, attendance and approvals — can be managed as one connected operating flow, not only pay slips.",
    disclaimer:
      "Labour rules, leave, Shops & Establishments registration and compliance, professional tax (state-wise; not levied in every state; slabs may vary) and minimum wages can differ materially by state. What finally applies depends on industry, headcount, work pattern, site location and group HR policy · treat this page as orientation, not a rulebook.",
    introParagraphs: [
      "India HR is rarely “payroll only”: hiring, offers, payroll, PF/ESI, professional tax (state PT), gratuity, attendance and approvals are usually managed as one connected operating flow.",
      "Professional tax is state-specific (some states have none; slabs differ). State law and company policy often apply together · teams therefore integrate documents, approvals, payroll and compliance in one operating spine.",
    ],
    roadmapCardsTitle: "Core lanes · offers → payroll → Shops & Establishments → gratuity",
    roadmapCards: [
      {
        title: "Offers & contracts",
        bullets: [
          "Align offer letters, employment agreements, NDAs and HR policies with your operating model.",
          "Model basic pay, HRA, allowances and variable pay with PF, state professional tax (where applicable) and TDS impacts.",
          "Wire probation, notice, leave, confidentiality and IP clauses into live policy.",
          "[Field] Pay structure drift vs payroll engines; non-compete enforceability and scope review (Contract Act s.27 context)",
          "[Field] Variable pay rules; HQ templates vs India labour/tax reality",
          "[Structure] Consultant vs employee; remote hires; expat employment patterns",
        ],
      },
      {
        title: "Payroll & compliance",
        bullets: [
          "Each pay cycle may need TDS, PF, ESI, state professional tax (where applicable), LWF and Bonus Act applicability reviewed together.",
          "Connect attendance, leave, overtime and reimbursements before payroll lock.",
          "Run salary processing alongside tax and statutory filing rhythms.",
          "[Field] TDS mismatches; PF wage definition / basic wage interpretation (including judgment-led debates); ESI applicability confusion",
          "[Field] PT state nexus issues; late payroll cut-offs; equal remuneration / POSH operational touchpoints",
          "[Ops] Salary standardisation, full & final settlement, director payroll, LWF administration",
        ],
      },
      {
        title: "Shops & establishments (registration / compliance)",
        bullets: [
          "Offices, services and retail footprints may need Shops & Establishments registration and ongoing compliance.",
          "Hours, weekly offs, registers and employee records vary by state.",
          "Hybrid/WFH policies may need explicit linkage to record-keeping rules.",
          "[Field] Thin attendance registers; missing leave evidence",
          "[Field] Night-work conditions for women workers (safety, transport, approvals); different weekly-off standards",
          "[Ops] Branch registrations; remote workforces; multi-state offices",
        ],
      },
      {
        title: "Gratuity & leave",
        bullets: [
          "Run gratuity eligibility and leave policies through payroll · not only policy PDFs.",
          "Configure earned, sick and casual leave patterns to match how you actually operate.",
          "Plan leave encashment and exit settlement flows before resignations spike.",
          "[Field] Five-year continuous service tests; gratuity provisioning; gratuity-related tax exemption limits (fact-specific)",
          "[Field] Notice pay recovery; leave encashment taxation; carry-forward rules",
          "[Field] Delayed full & final settlements",
          "[Policy] Maternity benefits; bonus eligibility; holiday calendars",
        ],
      },
    ],
    processFlowTitle: "Typical hiring-to-exit operating flow",
    processPhases: [
      { title: "Hire", bullets: ["JD drafting", "Interview coordination", "Salary benchmarking"] },
      { title: "Onboard", bullets: ["Offer release", "Document collection", "PAN / Aadhaar / bank details / UAN verification"] },
      { title: "Payroll go-live", bullets: ["Payroll setup", "PF / ESI / PT mapping", "Attendance integration"] },
      { title: "Operate", bullets: ["Leave management", "Reimbursements", "HR documentation"] },
      { title: "Offboarding", bullets: ["Full & final settlement", "Exit paperwork", "Gratuity review"] },
    ],
    practicalIssuesTitle: "Common operating issues",
    practicalIssues: [
      "Offers that do not match live payroll structures",
      "Wrong PF/PT state or nexus assumptions",
      "Missing attendance feeds before payroll lock",
      "Delayed full & final settlements",
      "Leave balance mismatches vs payroll",
      "TDS calculation errors on variable components",
      "Missing PAN or weak employee KYC packs",
      "Late payroll cut-offs breaking approvals",
    ],
    industryTableTitle: "Foreign-owned groups · headline HR reviews",
    industryCol1: "Theme",
    industryCol2: "What to pressure-test",
    industryRows: [
      { industry: "HQ policy localisation", issues: "Pay, benefits, discipline language vs India labour/tax" },
      { industry: "Expat payroll", issues: "Payroll, TDS, treaties, visas and FRRO · PE risk coordination, shadow payroll, tax residency review" },
      { industry: "Intercompany recharge", issues: "Management charges, documentation and TP/tax" },
      { industry: "Payroll confidentiality", issues: "Access controls, files and audit readiness" },
      { industry: "Local vs HQ reporting", issues: "Headcount, cost and MIS template alignment" },
      { industry: "Contractor classification", issues: "Employment, tax, insurance and liability risk" },
      { industry: "HQ salary split vs India payroll mismatch", issues: "India vs HQ splits, withholding, bank rails and reporting alignment" },
      { industry: "Tax equalisation", issues: "Policy design, local withholding and true-ups" },
      { industry: "Visa-linked payroll", issues: "Stay conditions vs pay cycles and filings" },
      { industry: "HQ approval latency", issues: "On/off-cycle changes and variable pay bottlenecks" },
    ],
    sections: [
      {
        title: "HR data & operating controls",
        bullets: [
          "Connect attendance, leave, payroll and TDS data as one operating spine.",
          "Review ERP, approval workflows and document-retention design for evidence trails and segregation of duties.",
          "Run document retention and employee-file standards you can defend in audits.",
          "[Field] Employee master mismatches; duplicate employee codes",
          "[Field] Missing KYC; weak payroll approval trails",
        ],
      },
    ],
    msvScopeTitle: "How MSV can help",
    msvScopeItems: [
      "Offer and employment agreement drafting support",
      "Payroll operations",
      "PF, ESI, PT and TDS filings",
      "Shops & Establishments registration and compliance coordination",
      "Leave and attendance operations",
      "Full & final settlement support",
      "Expat payroll with FRRO coordination",
      "HQ HR reporting packs and calendars",
    ],
    relatedIntro: "Often read in the same operating stack.",
    relatedTitle: "Linked pages",
    relatedLinks: [
      { href: "/services/frro", label: "FRRO services" },
      { href: "/services/guide-india-accounting", label: "India accounting guide" },
      { href: "/services/guide-india-tax", label: "India tax guide" },
      { href: "/services/personal-income-tax-calculator", label: "Salary TDS calculator" },
      { href: "/services/compliance-calendar", label: "Compliance calendar" },
      { href: "/services/guide-hr-labour", label: "HR & labour guide" },
      { href: "/services/recruitment-support", label: "Recruitment support" },
      { href: "/services/contracts-legal", label: "Contracts & legal" },
    ],
    closingNote:
      "India HR is an operating domain where hiring, labour, tax, immigration and HQ policy interlock · early contract and payroll design materially changes downstream risk and operating efficiency.",
  },
  zh: {
    metaTitle: "印度人力资源与薪酬服务",
    metaDescription:
      "录用函、薪酬、PF/ESI、邦级职业税(PT)/TDS、商铺与机构（Establishments）登记与合规、离职金、考勤、离职结算、外籍薪酬与 FRRO，从运营体系视角梳理印度 HR。",
    pageTitle: "HR·薪酬服务",
    pageDescription:
      "印度用工同时涉及地方法与联邦规则。建议将招聘、合同、薪酬、缴费、考勤与审批等环节串联为一条可管理的运营流程，而非仅关注工资条。",
    disclaimer:
      "劳动、假期、商铺与机构（Shops & Establishments）登记与合规、Professional Tax（邦级适用；部分邦不征；税档结构可能不同）与最低工资等因邦而异；实际适用还取决于行业、人数、用工形态、办公地点及集团 HR 政策。本页为概览参考。",
    introParagraphs: [
      "印度 HR 很少只是“算薪”：招聘、录用、薪酬、PF/ESI、职业税（邦级 PT）、离职金、考勤与审批流程通常作为一条运营流程连接管理。",
      "职业税因邦而异（部分邦无；税档不同）。地方法与集团政策往往同时适用，因此常见做法是将文件、审批、薪酬与合规纳入同一运营主轴。",
    ],
    roadmapCardsTitle: "核心运营轴 · 录用 → 薪酬 → Shops & Establishments → 离职金",
    roadmapCards: [
      {
        title: "录用与合同",
        bullets: [
          "将录用函、劳动合同、保密协议与 HR 制度与公司实际运作模式对齐。",
          "在基本工资、住房补贴、津贴与浮动薪酬设计中同步考虑 PF、邦级职业税（如适用）与 TDS 影响。",
          "将试用期、通知期、假期、保密与知识产权条款落到可执行政策。",
          "[实务] 薪酬结构与薪酬引擎不一致；竞业限制可执行性与范围检视（合同法第 27 条脉络）",
          "[实务] 浮动薪酬规则不明；总部模板与当地劳动/税务冲突",
          "[结构] 顾问与雇员区分、远程用工、外籍用工结构",
        ],
      },
      {
        title: "薪酬与合规",
        bullets: [
          "在发薪周期内统筹 TDS、PF、ESI、邦级职业税（适用时）、LWF 及奖金法适用性等。",
          "发薪锁账前串联考勤、假期、加班与报销数据。",
          "将月薪处理与税务及法定申报节奏对齐。",
          "[实务] TDS 不符、PF 工资口径/基本工资解释（判例与解释争议）、ESI 适用困惑",
          "[实务] PT 纳税地错误、薪酬截止日延误、同工同酬/POSH 运营衔接",
          "[运营] 薪酬结构标准化、离职结算、董事薪酬、劳工福利基金(LWF)",
        ],
      },
      {
        title: "Shops & Establishments（登记·合规）",
        bullets: [
          "办公室、服务与零售场所可能需要 Shops & Establishments 登记及持续合规。",
          "营业时间、休息日、登记与员工记录保存标准因邦而异。",
          "混合/远程办公政策需与留痕义务衔接评估。",
          "[实务] 考勤登记薄弱、假期记录缺失",
          "[实务] 女性夜间工作要件（安全、交通、审批等）、休息日标准差异",
          "[运营] 分支机构登记、远程用工、跨邦办公",
        ],
      },
      {
        title: "离职金与假期",
        bullets: [
          "将离职金资格与假期政策贯穿薪酬，而非仅停留在制度 PDF。",
          "按实际运营设置年假、病假与事假规则。",
          "在离职高峰前规划假期折现与离职结算流程。",
          "[实务] 五年连续服务要件检视、离职金预提、离职金相关免税额度（视个案）",
          "[实务] 通知期工资追偿、假期折现计税、结转规则",
          "[实务] 离职结算拖延",
          "[政策] 产假福利、奖金资格、节假日历",
        ],
      },
    ],
    processFlowTitle: "一般招聘到离职的运营流程",
    processPhases: [
      { title: "招聘", bullets: ["职位说明", "面试协调", "薪酬市场对标"] },
      { title: "入职", bullets: ["发放录用", "资料收集", "PAN/Aadhaar/银行信息/UAN 核验"] },
      { title: "薪酬上线", bullets: ["薪酬体系搭建", "PF/ESI/PT 映射", "考勤对接"] },
      { title: "日常运营", bullets: ["假期管理", "报销", "人事档案"] },
      { title: "离职", bullets: ["离职结算", "离职文件", "离职金复核"] },
    ],
    practicalIssuesTitle: "常见实务问题",
    practicalIssues: [
      "录用条件与实际薪酬结构不一致",
      "PF/PT 适用邦错误",
      "发薪前考勤数据缺失",
      "离职结算延迟",
      "假期余额与薪酬不一致",
      "TDS 计算错误（尤其浮动项）",
      "员工 PAN 未登记或 KYC 不全",
      "薪酬截止日拖延导致审批链断裂",
    ],
    industryTableTitle: "外资企业主要 HR 核对",
    industryCol1: "主题",
    industryCol2: "重点核对",
    industryRows: [
      { industry: "总部政策本地化", issues: "薪酬福利假期纪律条款与印度劳动/税务" },
      { industry: "外籍薪酬", issues: "薪酬、预扣、协定、签证与 FRRO · PE 风险协调、影子薪酬、税务居民身份检视" },
      { industry: "公司间费用分摊", issues: "管理费、单据与转让定价/税务" },
      { industry: "薪酬保密", issues: "权限、档案与审计准备" },
      { industry: "本地与总部报表", issues: "人数、成本与 MIS 模板对齐" },
      { industry: "承揽/雇员定性", issues: "用工、税务、保险与责任风险" },
      { industry: "总部薪酬拆分 vs 印度发薪不一致", issues: "总部/印度拆分、预扣、银行路径与申报对齐" },
      { industry: "税务平衡", issues: "政策设计、当地预扣与清算" },
      { industry: "签证关联薪酬", issues: "居留条件与发薪、申报" },
      { industry: "总部审批滞后", issues: "入离职与浮动薪酬瓶颈" },
    ],
    sections: [
      {
        title: "HR 数据与运营管控",
        bullets: [
          "串联考勤、假期、薪酬与 TDS 数据形成运营主轴。",
          "评估 ERP、审批工作流与档案留存体系在证据链与职责分离上的衔接。",
          "建立可在审计中自证的人事档案留存与员工档案标准。",
          "[实务] 员工主数据不一致、重复工号",
          "[实务] KYC 缺失、薪酬审批痕迹不足",
        ],
      },
    ],
    msvScopeTitle: "MSV 可支持范围",
    msvScopeItems: [
      "录用函与劳动合同起草支持",
      "薪酬运营",
      "PF、ESI、PT、TDS 申报",
      "Shops & Establishments 登记与合规协同",
      "假期与考勤运营",
      "离职结算支持",
      "外籍薪酬与 FRRO 衔接",
      "总部 HR 报告体系与日历",
    ],
    relatedIntro: "常与同一运营栈一并阅读。",
    relatedTitle: "关联页面",
    relatedLinks: [
      { href: "/services/frro", label: "FRRO 服务" },
      { href: "/services/guide-india-accounting", label: "印度会计指南" },
      { href: "/services/guide-india-tax", label: "印度税务指南" },
      { href: "/services/personal-income-tax-calculator", label: "工资 TDS 计算器" },
      { href: "/services/compliance-calendar", label: "合规日历" },
      { href: "/services/guide-hr-labour", label: "人力资源与劳动指南" },
      { href: "/services/recruitment-support", label: "招聘支持" },
      { href: "/services/contracts-legal", label: "合同与法律文件" },
    ],
    closingNote:
      "印度 HR 不只是算薪：招聘、劳动、税务、出入境与总部政策相互勾连；初期的合同与薪酬体系设计会显著影响后续风险与运营效率。",
  },
};
