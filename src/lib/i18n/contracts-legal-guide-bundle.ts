import type { ServiceGuideCopy } from "@/lib/i18n/service-guides-locale";

type GuideBundle = {
  readonly ko: ServiceGuideCopy;
  readonly en: ServiceGuideCopy;
  readonly zh: ServiceGuideCopy;
};

const related = [
  { href: "/services/corporate-merger", label: { ko: "법인 합병 안내", en: "Merger guide", zh: "公司合并指引" } },
  { href: "/services/hr-payroll", label: { ko: "HR·급여·노무", en: "HR & payroll", zh: "人力资源与薪酬" } },
  { href: "/services/guide-fema-fx", label: { ko: "FEMA·외환 가이드", en: "FEMA & FX guide", zh: "FEMA 与外汇指南" } },
  { href: "/services/guide-companies-act", label: { ko: "회사법 가이드", en: "Companies Act guide", zh: "公司法指南" } },
  { href: "/services/gst-practice-guide", label: { ko: "GST 실무", en: "GST practice", zh: "GST 实务" } },
  { href: "/contact", label: { ko: "문의", en: "Contact", zh: "联系" } },
] as const;

export const contractsLegalHub: GuideBundle = {
  ko: {
    metaTitle: "계약·법률 문서 허브 | 인도 상업계약",
    metaDescription:
      "NDA, 고용·IP, 리스, 벤더, JV, Change of control, 데이터, 분쟁해결, 세무·외환 연계까지 인도 계약 운영 개요.",
    pageEyebrow: "Contracts & governance",
    pageTitle: "계약·법률 문서",
    pageDescription:
      "인도 운영에서는 계약 구조가 세무·노무·외환·회사법과 동시에 연결됩니다. 단순 템플릿 사용보다 계약 당사자·지급 구조·세금·지식재산·분쟁 해결·준거법을 초기부터 정리하는 것이 중요합니다. 본 페이지는 인도 실무에서 자주 사용되는 계약 유형과 운영 체크포인트를 개요 중심으로 정리한 참고 페이지입니다.",
    disclaimer:
      "본 페이지는 일반 참고용 개요이며 법률·세무·노무 자문을 대체하지 않습니다. 중요 계약은 인도 자격 변호사·세무사와 검토·날인·증지(Stamp) 등을 확인하세요.",
    sections: [
      {
        title: "NDA / Confidentiality Agreement",
        bullets: [
          "〔주요 목적〕 기술·도면·가격·거래처 정보 보호; 제조·개발·JV 논의 전 정보 유출 방지; 직원·벤더·외부 컨설턴트 접근 제한",
          "〔일반 조항〕 Confidential Information 정의, 사용 목적 제한, 제3자 공유 제한, 반환·폐기 의무, 종료 후 비밀유지 기간, Injunction(가처분) 조항",
          "〔실무 체크〕 한국 본사 NDA와 인도 현지 NDA 충돌 여부, 이메일·클라우드·Dropbox 접근 범위, 소스코드·도면·ERP 데이터 접근 권한, Vendor NDA와 Employment NDA 분리 여부",
          "〔운영 리스크〕 퇴사자 자료 반출, 공급업체 경유 정보 유출, 공장 외주 생산 시 도면 유출, WhatsApp·개인 이메일 사용",
        ],
      },
      {
        title: "Employment Agreement & IP Assignment",
        bullets: [
          "〔주요 목적〕 근로 조건 명확화, 급여·보너스·퇴직 조건 관리, 회사 IP·소프트웨어·도면 귀속 정리",
          "〔일반 조항〕 Position / Reporting, Compensation 구조, Probation, Notice period, Confidentiality, Non-solicitation, IP ownership, Company property 반환",
          "〔실무 체크〕 인도 급여 구조(Basic/HRA/Allowance), PF·ESI·TDS 연동, 주(邦)별 Shops & Establishment 규정, Offer letter와 Payroll 구조 일치, Contractor vs Employee 구분",
          "〔운영 리스크〕 IP 귀속 불명확, 급여 구조와 실제 지급 불일치, 퇴사 시 자산 회수, 부당해고·퇴직금 분쟁",
        ],
      },
      {
        title: "Office / Warehouse Lease",
        bullets: [
          "〔주요 목적〕 사무실·공장·창고 사용 권리 확보, GST·ROC·은행 주소 증빙, 장기 운영 안정성",
          "〔일반 조항〕 Rent / Deposit, Lock-in, CAM·Maintenance, Utility 책임, Sublease 제한, Exit clause, Fit-out 공사 권한",
          "〔실무 체크〕 GST registration 가능 주소, Landlord PAN/GST, Electricity bill 명의, Fire NOC·Trade licence 가능 여부, 공장 zoning·industrial approval",
          "〔운영 리스크〕 개인 명의 임대, GST 주소 인증 실패, 전력 용량 부족, 종료 후 원상복구 분쟁",
        ],
      },
      {
        title: "Vendor & Services Agreements",
        bullets: [
          "〔주요 목적〕 공급·개발·운영 범위 정의, 대금 지급 구조 명확화, 지연·하자·세금 리스크 관리",
          "〔일반 조항〕 Scope of work, Deliverables, SLA / Timeline, Payment milestones, GST / TDS 처리, Penalty / LD, Termination",
          "〔실무 체크〕 GST 포함 여부, TDS 공제 주체, Reverse charge 가능 여부, Invoice·PO·GRN 연결, Vendor onboarding KYC",
          "〔운영 리스크〕 Scope creep, 세금 포함/별도 분쟁, 공급 지연, 품질·검수 기준 불명확",
        ],
      },
      {
        title: "JV / Shareholders’ Agreements",
        bullets: [
          "〔주요 목적〕 지분·의사결정 권한 정리, 투자금·기술·운영 책임 배분, Exit·Deadlock 설계",
          "〔일반 조항〕 Shareholding, Board composition, Reserved matters, Transfer restriction, Tag/Drag, Deadlock resolution, Non-compete, Exit mechanism",
          "〔실무 체크〕 FEMA·FDI 제한, FMV·valuation 구조, 기술 사용료·royalty, Director nomination, Related party transactions",
          "〔운영 리스크〕 지분 희석 분쟁, 경영권 충돌, Exit valuation 분쟁, 로열티·IP 귀속 충돌",
        ],
      },
      {
        title: "운영 체크포인트 · Change of Control / 양도 제한",
        bullets: [
          "〔주요 내용〕 지분 변동 시 계약 유지 여부, 본사 구조 변경 시 계약 영향, M&A·JV 이후 자동 종료 여부",
          "〔실무 포인트〕 “prior written consent” 조항 확인, 은행·라이선스 계약 영향, 고객사 Vendor registration 재승인 여부",
        ],
      },
      {
        title: "운영 체크포인트 · 개인정보·데이터 현지화",
        bullets: [
          "〔주요 내용〕 고객·직원 데이터 저장 위치, ERP·클라우드 접근 정책, 외부 공유 제한",
          "〔실무 포인트〕 서버 위치, 본사–인도 간 데이터 이전, Vendor 접근 로그, 직원 개인정보 보관 정책",
        ],
      },
      {
        title: "운영 체크포인트 · 분쟁 해결 조항",
        bullets: [
          "〔주요 내용〕 준거법(Governing law), 관할 법원(Jurisdiction), 중재(Arbitration), 언어(Language)",
          "〔실무 포인트〕 인도법 vs 한국법, SIAC·ICA·국내 중재 여부, 긴급 가처분 가능 여부, 계약 언어 우선순위",
        ],
      },
      {
        title: "계약 운영 관리",
        bullets: [
          "만료일 캘린더·Renewal tracking",
          "Stamp duty·증지 요건 확인",
          "Original signed copy 보관",
          "DSC / e-sign 사용 여부 및 내부 정책",
          "계약 버전 관리(변경 협상·부속합의)",
        ],
      },
      {
        title: "세무·외환 연결",
        bullets: [
          "GST 포함·별도 표시 및 인보이스 정합",
          "TDS 적용·역할(지급인/수취인)",
          "FEMA remittance documentation",
          "Form 15CA / 15CB 필요 여부",
          "Intercompany agreement의 TP·이전가격 영향 검토",
        ],
      },
    ],
    industryTableTitle: "실무 자주 발생하는 문제",
    industryCol1: "항목",
    industryCol2: "자주 발생하는 문제",
    industryRows: [
      { industry: "NDA", issues: "실제 운영팀 공유 범위 통제 실패" },
      { industry: "Employment", issues: "Payroll 구조와 계약 내용 불일치" },
      { industry: "Lease", issues: "GST 주소 인증 실패" },
      { industry: "Vendor Agreement", issues: "세금 포함 여부 분쟁" },
      { industry: "JV Agreement", issues: "Reserved matter 해석 충돌" },
      { industry: "Cross-border contract", issues: "FEMA·송금 문서 부족" },
    ],
    relatedIntro: "세무·노무·외환·회사법 페이지와 함께 보면 체계를 잡기 쉽습니다.",
    relatedTitle: "관련 페이지",
    relatedLinks: related.map((r) => ({ href: r.href, label: r.label.ko })),
    closingNote:
      "인도 계약 운영은 단순 서명보다 세무·노무·외환·회사법·데이터 운영까지 함께 연결됩니다. 초기 계약 구조와 승인 체계를 표준화하면 이후 감사·분쟁·투자·청산 단계에서 리스크를 크게 줄일 수 있습니다.",
  },
  en: {
    metaTitle: "Contracts & legal hub | India operations",
    metaDescription:
      "NDAs, employment & IP, leases, vendor agreements, JVs, change of control, data, dispute clauses, and tax/FEMA links · operations-oriented overview.",
    pageEyebrow: "Contracts & governance",
    pageTitle: "Contracts & legal documents",
    pageDescription:
      "In India, contract design sits alongside tax, labour, FEMA and company law. Rather than “templates only”, clarify counterparties, payment flows, taxes, IP, dispute resolution and governing law early, and wire approvals and storage. This page summarises common contract families and checkpoints for operating teams.",
    disclaimer:
      "General information · not legal, tax or employment advice. Engage India-qualified counsel and advisors for material documents, stamping/e-sign rules and filings.",
    sections: [
      {
        title: "NDA / confidentiality",
        bullets: [
          "〔Purpose〕 Protect tech, drawings, pricing and counterparty information; pre‑JV / manufacturing discussions; limit access for staff, vendors and consultants",
          "〔Typical terms〕 Definition of confidential information, purpose limitation, third‑party sharing, return/destruction, survival after termination, injunctive relief",
          "〔Practice checks〕 Conflicts between HQ and India NDAs; email/cloud/Dropbox scope; source code/drawings/ERP access; separate vendor vs employment NDAs",
          "〔Risks〕 Leavers taking materials; leakage via suppliers; drawings at job‑workers; WhatsApp/personal email channels",
        ],
      },
      {
        title: "Employment agreement & IP assignment",
        bullets: [
          "〔Purpose〕 Clear employment terms; salary/bonus/exit; IP/software/drawings ownership",
          "〔Typical terms〕 Role/reporting, compensation, probation, notice, confidentiality, non‑solicitation, IP ownership, return of assets",
          "〔Practice checks〕 India salary stack (Basic/HRA/allowances), PF/ESI/TDS alignment, Shops & Establishments, offer letter vs payroll, contractor vs employee",
          "〔Risks〕 Unclear IP ownership; pay structure vs actual payouts; asset recovery on exit; termination/gratuity disputes",
        ],
      },
      {
        title: "Office / warehouse lease",
        bullets: [
          "〔Purpose〕 Secure premises; support GST/ROC/bank address evidence; long‑run stability",
          "〔Typical terms〕 Rent/deposit, lock‑in, CAM/maintenance, utilities, sublease, exit, fit‑out rights",
          "〔Practice checks〕 GST‑eligible address, landlord PAN/GST, electricity billing name, fire/trade licences, zoning/industrial approvals for factories",
          "〔Risks〕 Individual landlords; GST address verification failure; power capacity; handback/refit disputes",
        ],
      },
      {
        title: "Vendor & services agreements",
        bullets: [
          "〔Purpose〕 Define scope of supply/dev/ops; payment milestones; delay/defect/tax risk",
          "〔Typical terms〕 SOW, deliverables, SLA/timeline, milestones, GST/TDS, LD/penalties, termination",
          "〔Practice checks〕 GST inclusive vs exclusive, who deducts TDS, reverse charge, invoice–PO–GRN chain, vendor KYC",
          "〔Risks〕 Scope creep; tax “plus or inclusive” fights; delays; vague QA/acceptance",
        ],
      },
      {
        title: "JV / shareholders’ agreements",
        bullets: [
          "〔Purpose〕 Equity and control; capital/tech/ops split; exit and deadlock",
          "〔Typical terms〕 Shareholding, board, reserved matters, transfers, tag/drag, deadlock, non‑compete, exits",
          "〔Practice checks〕 FEMA/FDI limits, FMV/valuation, royalties/tech fees, director nomination, related‑party angles",
          "〔Risks〕 Dilution fights; management deadlock; exit valuation; royalty/IP clashes",
        ],
      },
      {
        title: "Change of control & assignment",
        bullets: [
          "〔Focus〕 Whether contracts survive shareholding changes; HQ reorganisations; auto‑termination after M&A/JV",
          "〔Practice〕 “Prior written consent” triggers; bank/licence contracts; customer vendor re‑registration",
        ],
      },
      {
        title: "Privacy & data localisation",
        bullets: [
          "〔Focus〕 Where customer/employee data sits; ERP/cloud access; external sharing limits",
          "〔Practice〕 Server location; India–HQ transfers; vendor access logs; HR data retention",
        ],
      },
      {
        title: "Dispute resolution",
        bullets: [
          "〔Focus〕 Governing law, jurisdiction, arbitration, contract language",
          "〔Practice〕 India vs foreign law; SIAC/ICA/domestic arbitration; interim relief; precedence of languages",
        ],
      },
      {
        title: "Contract operations",
        bullets: [
          "Expiry calendar and renewals",
          "Stamp duty and stamping practice",
          "Original signed sets and custody",
          "DSC / e‑sign policy",
          "Version control for amendments and side letters",
        ],
      },
      {
        title: "Tax & FX linkage",
        bullets: [
          "GST presentation on invoices",
          "TDS roles and certificates",
          "FEMA remittance evidence",
          "Form 15CA/15CB where relevant",
          "Intercompany agreements and transfer‑pricing posture",
        ],
      },
    ],
    industryTableTitle: "Common operating failures",
    industryCol1: "Topic",
    industryCol2: "What often goes wrong",
    industryRows: [
      { industry: "NDA", issues: "Operations teams overshare beyond the permitted circle" },
      { industry: "Employment", issues: "Payroll structure diverges from the contract" },
      { industry: "Lease", issues: "GST address verification fails" },
      { industry: "Vendor agreement", issues: "Tax inclusive vs exclusive disputes" },
      { industry: "JV agreement", issues: "Reserved‑matter interpretation clashes" },
      { industry: "Cross‑border contract", issues: "Thin FEMA / remittance documentation" },
    ],
    relatedIntro: "Pair with tax, labour, FEMA and company‑law hubs when you structure templates.",
    relatedTitle: "Related pages",
    relatedLinks: related.map((r) => ({ href: r.href, label: r.label.en })),
    closingNote:
      "India contracting is more than signatures · it ties to tax, labour, FEMA, company law and data operations. Standardising structure and approvals early materially reduces audit, dispute, investment and exit friction.",
  },
  zh: {
    metaTitle: "合同与法律文件枢纽 | 印度运营",
    metaDescription:
      "保密协议、劳动与知识产权、租赁、供应商、合资、控制权变更、数据、争议解决及税务外汇衔接的操作概览。",
    pageEyebrow: "Contracts & governance",
    pageTitle: "合同与法律文件",
    pageDescription:
      "在印度运营中，合同结构与税务、劳动、外汇、公司法同时相连。相比单纯套用模板，更应在初期厘清当事方、支付路径、税负、知识产权、争议解决与适用法律，并与内部审批与归档衔接。本页概述常见合同类型与运营检查点。",
    disclaimer:
      "本页为一般性参考，不构成法律或税务意见。重要合同请咨询印度执业律师并完成印花、电子签署等合规要求。",
    sections: [
      {
        title: "NDA / 保密协议",
        bullets: [
          "〔目的〕 保护技术、图纸、价格与客户信息；制造/开发/JV 谈判前防泄密；限制员工、供应商与顾问接触范围",
          "〔常见条款〕 保密信息定义、用途限制、第三方披露、返还/销毁、终止后保密期、禁令救济",
          "〔实务核对〕 总部与印度 NDA 是否冲突；邮件/云/Dropbox 范围；源码/图纸/ERP 权限；供应商 NDA 与雇佣 NDA 是否分拆",
          "〔风险〕 离职资料外带；经供应商泄露；外协生产图纸外流；WhatsApp/个人邮箱传输",
        ],
      },
      {
        title: "劳动合同与知识产权转让",
        bullets: [
          "〔目的〕 明确劳动条件；薪酬/奖金/离职；公司 IP、软件与图纸归属",
          "〔常见条款〕 岗位与汇报、薪酬结构、试用期、通知期、保密、招揽限制、IP 归属、资产返还",
          "〔实务核对〕 印度薪酬结构(Basic/HRA/津贴)、PF/ESI/TDS、各邦 Shops & Establishment、录用信与薪酬一致、承揽与雇佣区分",
          "〔风险〕 IP 归属不清；合同薪酬与实际发放不一致；离职资产回收；不当解雇/离职金争议",
        ],
      },
      {
        title: "办公/仓库租赁",
        bullets: [
          "〔目的〕 取得使用权；支撑 GST/ROC/银行地址证明；长期稳定运营",
          "〔常见条款〕 租金/押金、锁定期、物业费/维护、公用事业、转租限制、退出、装修权",
          "〔实务核对〕 GST 注册地址可行性、房东 PAN/GST、电费账单抬头、消防/行业许可、厂区规划与工业许可",
          "〔风险〕 个人房东签约；GST 地址验证失败；电力容量不足；退租还原纠纷",
        ],
      },
      {
        title: "供应商与服务协议",
        bullets: [
          "〔目的〕 界定供应/开发/运营范围；付款节点；延误、缺陷与税务风险",
          "〔常见条款〕 工作范围、交付物、SLA/进度、付款里程碑、GST/TDS、违约金/延误赔偿、解除",
          "〔实务核对〕 是否含税、由谁扣缴 TDS、是否可能适用反向征收、发票–采购单–收货勾稽、供应商 KYC",
          "〔风险〕 范围蔓延；含税与否争议；交付延迟；验收标准不清",
        ],
      },
      {
        title: "合资/股东协议",
        bullets: [
          "〔目的〕 股权与决策权；资金/技术/运营分工；退出与僵局机制",
          "〔常见条款〕 股权、董事会构成、保留事项、转让限制、随售/拖售、僵局处理、竞业、退出",
          "〔实务核对〕 FEMA/FDI 限制、公允价值/估值、技术费/特许权使用费、董事提名、关联交易",
          "〔风险〕 稀释争议；经营权冲突；退出估值；特许权与 IP 冲突",
        ],
      },
      {
        title: "运营检查点 · 控制权变更/转让限制",
        bullets: [
          "〔要点〕 股权变动后合同是否继续；总部重组影响；并购/JV 后是否自动终止",
          "〔实务〕 “事先书面同意”触发；银行/许可合同；客户侧供应商重新注册",
        ],
      },
      {
        title: "运营检查点 · 个人信息与数据本地化",
        bullets: [
          "〔要点〕 客户/员工数据存放位置；ERP/云访问；对外共享边界",
          "〔实务〕 服务器位置；总部与印度数据传输；供应商访问日志；员工数据留存政策",
        ],
      },
      {
        title: "运营检查点 · 争议解决",
        bullets: [
          "〔要点〕 适用法律、法院管辖、仲裁、合同语言",
          "〔实务〕 印度法与外国法；仲裁机构选择；临时措施；语言优先顺序",
        ],
      },
      {
        title: "合同运营管理",
        bullets: ["到期日历与续签跟踪", "印花税负与贴花要求", "正本签署件保管", "DSC/电子签政策", "合同版本与补充协议管理"],
      },
      {
        title: "税务与外汇衔接",
        bullets: ["发票 GST 呈现方式", "TDS 角色与凭证", "FEMA 汇款证明", "Form 15CA/15CB 适用性", "关联交易定价与集团间协议"],
      },
    ],
    industryTableTitle: "实务常见问题",
    industryCol1: "事项",
    industryCol2: "常见问题",
    industryRows: [
      { industry: "NDA", issues: "运营团队共享范围失控" },
      { industry: "Employment", issues: "薪酬体系与合同不一致" },
      { industry: "Lease", issues: "GST 地址验证失败" },
      { industry: "Vendor Agreement", issues: "含税与否争议" },
      { industry: "JV Agreement", issues: "保留事项解释冲突" },
      { industry: "跨境合同", issues: "FEMA/汇款资料不足" },
    ],
    relatedIntro: "建议与税务、劳动、外汇、公司法页面一并阅读。",
    relatedTitle: "相关页面",
    relatedLinks: related.map((r) => ({ href: r.href, label: r.label.zh })),
    closingNote:
      "印度合同运营不止于签字，还与税务、劳动、外汇、公司法及数据管理相连。尽早标准化合同结构与审批链，可显著降低审计、争议、投融资与退出阶段的风险。",
  },
};
