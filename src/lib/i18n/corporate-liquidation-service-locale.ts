import { company } from "@/lib/site-content";
import { pickLocale, type SiteLocale } from "@/lib/site-locale";

export type CorporateLiquidationComparisonRow = {
  method: string;
  pros: string;
  cons: string;
};

export type CorporateLiquidationServiceCopy = {
  metaTitle: string;
  metaDescription: string;
  pageTitle: string;
  pageDescription: string;
  sourceNote: string;
  overview: { title: string; body: string };
  strikeIntro: { title: string; paragraphs: readonly string[]; prerequisitesTitle: string; prerequisites: readonly string[] };
  strikeSteps: { title: string; lead: string; steps: readonly string[]; durationNote: string };
  windingSteps: { title: string; lead: string; steps: readonly string[]; durationNote: string; footnotes: readonly string[] };
  dormant: { title: string; intro: string; whenTitle: string; whenItems: readonly string[]; conditionsTitle: string; conditions: readonly string[] };
  /** 청산·말소 전 운영 점검(선택적 실무 체크) */
  preClosureChecklist: { title: string; intro?: string; items: readonly string[] };
  summary: { title: string; body: string; timelineNote: string };
  comparison: { title: string; colMethod: string; colPros: string; colCons: string; rows: readonly CorporateLiquidationComparisonRow[] };
  legalDisclaimer: string;
  related: { title: string; links: readonly { label: string; path: string }[] };
  navBackServices: string;
  navContact: string;
};

const ko: CorporateLiquidationServiceCopy = {
  metaTitle: "법인 청산 안내",
  metaDescription: `${company.shortName} · 인도 법인 Strike-off(Section 248 기반 말소 등), Winding-up(정식 청산), Dormant(휴면 회사) 개요·절차·장단점·청산 전 체크 참고 안내`,
  pageTitle: "법인 청산 안내",
  pageDescription:
    "인도 법인 정리 방식에는 일반적으로 Strike-off(Section 248 기반 말소), Winding-up(정식 청산), Dormant(휴면 회사) 등이 있으며, 실제 적용 절차는 회사 상태·부채·소송·컴플라이언스 이력 등에 따라 달라질 수 있습니다. Strike-off는 ‘폐업’과 항상 동일한 의미로 쓰이지 않으며, Dormant status는 법인 해산이 아니라 일정 조건 하의 휴면 상태 유지 개념입니다. Dormant는 청산을 대신하는 종결 수단이 아닙니다. ROC/NCLT·세무·FEMA 등 실무는 최신 Companies Act·IBC·규칙 및 개별 사안에 따릅니다.",
  sourceNote: "본 페이지 내용은 사내 문서 「법인 청산」(개정 2020-08-25)을 바탕으로 한 참고 안내이며, 법령·판례·당국 실무 변경에 따라 달라질 수 있습니다.",
  overview: {
    title: "1. 개요",
    body:
      "인도 법인 청산에는 크게 Strike-off(간이 말소/간이 청산)와 Winding-up(정식 청산) 두 가지가 있으며, 각 절차와 장단점이 다릅니다. 자산·부채 상황과 운영 실태에 따라 적합한 방식을 선택해야 합니다.",
  },
  strikeIntro: {
    title: "2. Strike-off (간이 말소/간이 청산)",
    paragraphs: [
      "간이 말소는 실질적인 사업 활동이 없고, 잔여 자산·부채가 정리 가능한 수준인 법인이 진행할 수 있는 경로입니다. 보류 중인 소송이나 법적 절차가 없어야 합니다. 이러한 조건에 해당하지 않고 자산·부채가 남아 있으면 정식 청산 등 다른 절차를 검토해야 합니다.",
    ],
    prerequisitesTitle: "신청 전제(요지)",
    prerequisites: [
      "실무상 신청 전 자산·부채 및 미해결 거래를 정리하는 방향으로 진행하는 경우가 많으며, 실제 요건은 ROC 심사 기준 및 회사 상태에 따라 달라질 수 있습니다.",
      "Companies Act상 일정 기간 실질적 사업 활동이 없거나 운영이 중단된 상태 등이 검토 요소가 될 수 있습니다. 구체 요건·표현은 시행 규칙·MCA 공지 및 등록관 실무에 따라 달라질 수 있습니다.",
    ],
  },
  strikeSteps: {
    title: "2.1. Strike-off 절차",
    lead: "아래 6단계를 완료하는 데 통상 약 3~5개월 이상이 소요될 수 있습니다.",
    steps: [
      "일반적으로 잔여 거래 정리 후 은행 계좌를 폐쇄합니다.",
      "이사회 결의를 통해 Strike-off 신청을 승인합니다.",
      "이사회 결의가 통과되면 모든 이사가 진술서(affidavit 등)를 작성합니다.",
      "MCA 포털을 통해 관련 e-form(STK 계열 등)을 제출합니다. Authorized Director의 DSC(디지털 서명)가 포함되어야 합니다.",
      "ROC 공고 및 이해관계인 이의 제기 절차가 진행될 수 있습니다(공고 기간·절차는 당시 규정·안내에 따름).",
      "ROC 공고 후 회사명 말소(Strike-off) 사실이 관보(Gazette)에 게시됩니다.",
    ],
    durationNote: "일정은 사안·행정 처리 속도에 따라 달라질 수 있습니다.",
  },
  windingSteps: {
    title: "3. Winding-up (정식 청산) 절차",
    lead: "대표적인 단계(문서 기준)는 아래와 같습니다. 단순 구조는 수개월 내 진행되는 사례도 있으나, 실제 일정은 NCLT·채권자·세무·ROC 처리 상황에 따라 크게 달라질 수 있습니다.",
    steps: [
      "이사회(1~2일): Companies Act 및 IBC(Insolvency and Bankruptcy Code) 체계에 따라 이사회·주주·채권자 결의 및 청산인(Liquidator) 절차가 요구될 수 있으며, 부채 상환 능력 등을 확인하는 결의가 필요합니다.",
      "주주총회(4~6일): 전체 주주의 3/4 이상이 회사 정리를 위한 특별결의에 동의하는 주총을 개최합니다.",
      "채권자 관련 절차: 채무·채권 구조에 따라 채권자 동의 또는 관련 절차가 요구될 수 있습니다.",
      "청산인(Liquidator) 선임: 청산 결의 후 청산인을 선임하고, 자산·부채·준비금·자본 등에 대한 보고를 진행합니다.",
      "관보(Gazette) 등 공시: 청산 결의 후 법령 및 규정이 정하는 바에 따라 관보 등 필요한 공시를 진행합니다.",
      "채무 정리·은행 등: 주총 결의 사본 제출 등 필요한 서류를 제출하고, 채무 정리 및 은행·회계 자료에 대한 검토·조정이 이루어질 수 있습니다.",
      "최종 주주총회(1~2일): 청산 완료 시 회계장부·서류 폐기 방법을 담은 특별결의를 합니다.",
      "NCLT/관할 기관: 필요 시 NCLT/법원 또는 관할 기관 절차가 진행될 수 있습니다.",
      "ROC 제출·해산 마무리: 청산 완료 후 관련 명령 및 서류를 ROC에 제출하여 회사 해산 절차를 마무리합니다.",
      "말소·해산 공지: 말소·해산 사실의 공지는 ROC 및 관보 절차에 따라 진행됩니다.",
    ],
    durationNote: "회사 규모·채무 관계에 따라 NCLT/법원의 명령·ROC 처리까지 더 오래 걸릴 수 있습니다.",
    footnotes: [
      "제출 서류는 각각 소정의 형식을 갖추어야 합니다.",
      "회사명 재사용 가능 여부는 MCA의 명칭 심사 기준 및 당시 등록 현황에 따라 달라질 수 있습니다.",
    ],
  },
  dormant: {
    title: "4. Dormant status (휴면 회사)",
    intro:
      "당장 사업 운영이 없지만 법인을 유지할 필요가 있는 경우, 일정 요건 하에 Dormant(휴면 회사) 상태를 검토할 수 있습니다. 예를 들어 향후 프로젝트를 위해 법인만 먼저 설립해 둔 경우, 또는 토지·건물 등 자산을 보유해 즉시 청산이 어려운 경우 등이 해당될 수 있습니다. Dormant status는 법인 해산이 아니라 일정 조건 하의 휴면 상태 유지 개념입니다. Dormant는 청산을 ‘대신’하는 종결 수단이 아닙니다.",
    whenTitle: "휴면 전환 검토 시 참고(문서에 기재된 조건 요지)",
    whenItems: [
      "실질적으로 어떠한 사업도 수행하지 않고 있을 것.",
      "직전 두 회계연도 동안 회계상 거래가 없을 것.",
      "MCA 기준상 휴면 신청·유지에 필요한 컴플라이언스 요건 충족 여부를 검토해야 하며, 연차 보고·재무제표 미제출 등 불이행 상태는 오히려 제약이 될 수 있습니다.",
    ],
    conditionsTitle: "정리",
    conditions: [
      "휴면은 청산을 대체하는 ‘종결’이 아니라, 요건과 보고 의무를 전제로 한 상태 전환에 가깝습니다. 구체 요건은 시행 규칙·MCA 공지를 확인해야 합니다.",
    ],
  },
  preClosureChecklist: {
    title: "청산 전 실무 체크리스트",
    intro: "말소·청산·휴면 전에 아래 항목을 정리해 두면 이후 ROC·은행·세무 대응이 수월해지는 경우가 많습니다(개별 사안에 따라 중요도 상이).",
    items: [
      "GST registration 해지(취소) 필요 여부",
      "IEC 폐쇄·DGFT 정리 필요 여부",
      "PF/ESI 미납·신고 누락 여부",
      "미제출 ROC filing·연차 보고 정리",
      "은행 계좌 폐쇄·잔액·담보 해지",
      "Intercompany balance·관계사 대차대 정리",
      "FEMA·FC-GPR 등 미보고·불일치 점검",
      "세무 조사·평가 진행 여부",
      "노동 분쟁·미지급 급여·퇴직금",
      "DSC/DIN 상태·Authorized Signatory",
    ],
  },
  summary: {
    title: "5. 정리 및 일정",
    body:
      "법인 말소(Strike-off), 정식 청산(Winding-up·Liquidation), 휴면 회사(Dormant status)는 각각 적용 요건·비용·소요 기간·유지 의무가 다르므로 회사의 자산·부채·세무·소송·운영 계획 등을 종합적으로 검토하여 선택해야 합니다.",
    timelineNote:
      "실제 처리 기간은 ROC·NCLT·세무 당국·채권자 대응 및 미이행 컴플라이언스 여부 등에 따라 크게 달라질 수 있으며, 행정 지연 또는 추가 보완 요청이 발생하는 사례도 있습니다. 일정은 충분한 여유를 두고 계획하는 것이 일반적입니다.",
  },
  comparison: {
    title: "방식별 장단점(요약)",
    colMethod: "구분",
    colPros: "장점",
    colCons: "단점",
    rows: [
      {
        method: "간이 말소 (Strike-off)",
        pros: "절차가 비교적 단순하고 진행 비용이 상대적으로 낮은 편입니다.",
        cons:
          "법인 명의가 정리된 뒤에도 일정 기간 이사·관계인의 책임 또는 조사 이슈가 남을 수 있습니다(벌금·이자·기타 비용 등). 기간·범위는 사안·법령에 따릅니다.",
      },
      {
        method: "정식 청산 (Winding-up)",
        pros: "정식 청산 절차를 통해 회사의 채무·의무 관계를 법적으로 정리하는 데 적합할 수 있습니다.",
        cons:
          "간이 말소보다 기간이 길고 비용이 큽니다. 복잡한 채무·세무·소송 구조에서는 장기간 소요될 수 있으며, NCLT·채권자·ROC 처리 상황에 따라 일정은 크게 달라질 수 있습니다.",
      },
      {
        method: "휴면 회사 (Dormant)",
        pros: "즉시 전면 청산을 하지 않고도 법인 존속·상호·자산 구조를 유지하면서 시간을 벌 수 있는 대안이 될 수 있습니다.",
        cons: "MCA 기준의 휴면 요건 충족과 이후 연차 보고·공시 등 컴플라이언스 관리가 필요하며, 청산과 동일한 의미의 ‘완전 종결’은 아닙니다.",
      },
    ],
  },
  legalDisclaimer:
    "본 페이지는 일반적인 실무 참고용 요약이며, 실제 절차·세무·채권자 관계·미이행 컴플라이언스·ROC/NCLT 실무에 따라 적용 방식이 달라질 수 있습니다. 실제 진행 전 Companies Act·IBC·세무·FEMA 관점의 개별 검토가 필요할 수 있습니다.",
  related: {
    title: "관련 페이지",
    links: [
      { label: "법인 설립 서비스", path: "/services/corporate-incorporation" },
      { label: "회계 서비스", path: "/services" },
    ],
  },
  navBackServices: "서비스 목록으로",
  navContact: "문의하기",
};

const en: CorporateLiquidationServiceCopy = {
  metaTitle: "India company closure guide",
  metaDescription: `${company.shortName} · Strike-off (Section 248–based removal, etc.), winding-up, dormant status: overview, steps, trade-offs, and pre-closure checklist (reference only).`,
  pageTitle: "India company closure guide",
  pageDescription:
    "Indian company exits are often discussed under Strike-off (Section 248–based removal), winding-up (formal liquidation), and dormant company status. The route that applies in practice depends on the company’s position, debt, litigation, and compliance history. Strike-off is not always synonymous with “business closure” in every sense. Dormant status is not dissolution of the company; it is maintenance of a dormant condition subject to eligibility rules. Dormant status is not a substitute for liquidation if you need a full legal exit. ROC/NCLT, tax, and FEMA practice follow the latest Companies Act, IBC, rules, and the facts of each case.",
  sourceNote:
    "Based on an internal memo last revised on 25 Aug 2020. Laws, forms, and authority practice may have changed since then.",
  overview: {
    title: "1. Overview",
    body:
      "Indian companies are commonly closed through Strike-off (simplified removal) or winding-up (formal liquidation). Each route has different eligibility, process, cost, and legal effect. The right choice depends on assets, liabilities, litigation risk, and ongoing operations.",
  },
  strikeIntro: {
    title: "2. Strike-off (simplified removal / strike-off)",
    paragraphs: [
      "Strike-off is typically considered where there is no substantive business activity and remaining assets and liabilities can be organised toward eligibility. Pending litigation or material disputes should generally be absent. If significant assets or liabilities remain, formal winding-up or another route should be considered.",
    ],
    prerequisitesTitle: "Key pre-conditions (summary)",
    prerequisites: [
      "In practice, many cases work toward cleaning up assets, liabilities, and open transactions before filing; actual tests depend on ROC scrutiny standards and the company’s facts.",
      "Under the Companies Act, factors such as no substantive business activity for a relevant period or cessation of operations may be relevant. Detailed tests and wording follow rules, MCA circulars, and Registrar practice, which can change.",
    ],
  },
  strikeSteps: {
    title: "2.1. Strike-off procedure (high level)",
    lead: "Completing the six steps below often takes on the order of three to five months or more, depending on processing times.",
    steps: [
      "After winding down residual transactions, bank accounts are typically closed (timing depends on banking practice).",
      "The board approves filing for strike-off.",
      "After the board resolution, directors typically execute affidavits/declarations as required.",
      "Submit the relevant e-forms (STK series, etc.) through the MCA portal, including the authorised director’s DSC.",
      "ROC publication and stakeholder objection procedures may follow (notice period and process depend on the rules and guidance in force at the time).",
      "After the notice period, strike-off is reflected through ROC processes and publication in the official Gazette.",
    ],
    durationNote: "Timelines vary by case load and data quality of filings.",
  },
  windingSteps: {
    title: "3. Winding-up (formal liquidation) · illustrative steps",
    lead: "Representative milestones are set out below. Simple structures sometimes complete within a few months, but actual timelines can vary widely depending on NCLT, creditors, tax authorities, and ROC processing.",
    steps: [
      "Board meeting (1–2 days): under the Companies Act and IBC framework, board, shareholder, creditor resolutions and liquidator steps may be required, depending on the route and facts; resolutions typically address solvency / ability-to-pay themes.",
      "Extraordinary general meeting (4–6 days): special resolution with the approval thresholds applicable to the company (illustrative memo threshold: three-fourths of shareholders).",
      "Creditor-related steps: depending on debt and creditor structure, creditor consent or additional creditor procedures may be required.",
      "Appoint a liquidator: after the winding-up resolution, appoint a liquidator and progress reporting on assets, liabilities, reserves, and capital.",
      "Gazette and notices: file prescribed particulars with the Gazette / public notices as required after the winding-up resolution.",
      "Debt settlement / banking: submit required copies of resolutions and progress debt settlement; bank accounts and accounting records may be reviewed as part of the process.",
      "Final general meeting (1–2 days): special resolution on disposal of books and records after liquidation completes, as applicable.",
      "NCLT / court: where required, NCLT, court, or other competent authority steps may follow.",
      "ROC filings and dissolution: after liquidation completes, file prescribed orders and documents with ROC to finalise dissolution steps.",
      "Publication: publication of striking-off / dissolution follows ROC and Gazette procedures as applicable.",
    ],
    durationNote: "Large debts, disputes, or tribunal/court congestion can extend winding-up materially.",
    footnotes: [
      "Each filing must follow prescribed formats.",
      "Whether a company name can be re-used later depends on MCA name-availability rules and the register at the time · do not treat any informal “waiting period” as a guarantee.",
    ],
  },
  dormant: {
    title: "4. Dormant company status",
    intro:
      "If you are not actively operating but still need to keep the company on the register, dormant status may be worth exploring · subject to MCA conditions. Examples include a shelf company waiting for a future project, or a company holding land/buildings where immediate strike-off is difficult. Dormant status is not dissolution; it is maintenance of a dormant condition under defined eligibility rules. Dormant status is not a substitute for liquidation if you need a full exit.",
    whenTitle: "Illustrative conditions mentioned in the memo",
    whenItems: [
      "No substantial business is being carried on.",
      "No accounting transactions in the last two financial years.",
      "Review MCA compliance requirements for applying for and maintaining dormant status; non-filing or default positions can block or complicate dormant treatment.",
    ],
    conditionsTitle: "Important distinction",
    conditions: [
      "Dormant status is not the same as a completed liquidation: eligibility, filings, and ongoing compliance still matter.",
    ],
  },
  preClosureChecklist: {
    title: "Pre-closure practical checklist",
    intro: "Working through the items below before strike-off, winding-up, or dormant filing often makes later ROC, banking, and tax coordination easier (priorities vary by case).",
    items: [
      "GST registration cancellation / surrender · whether required",
      "IEC closure / DGFT housekeeping · whether required",
      "PF / ESI arrears and filing gaps",
      "Outstanding ROC filings and annual compliance clean-up",
      "Bank account closure, balances, and release of security interests",
      "Intercompany balances and related-party loan positions",
      "FEMA / FC-GPR reporting gaps and mismatches",
      "Ongoing tax assessments or investigations",
      "Labour disputes and unpaid wages / terminal benefits",
      "DSC / DIN status and authorised signatories",
    ],
  },
  summary: {
    title: "5. Summary and scheduling",
    body:
      "Strike-off, formal winding-up / liquidation, and dormant status differ in eligibility, cost, indicative timelines, and ongoing obligations · choose after reviewing assets, liabilities, tax, litigation, and operating plans together.",
    timelineNote:
      "Actual processing time can vary widely with ROC and NCLT queues, tax authority workstreams, creditor responses, and compliance arrears; administrative delays or requests for additional information are common. It is usual to plan schedules with meaningful slack.",
  },
  comparison: {
    title: "Trade-offs at a glance",
    colMethod: "Route",
    colPros: "Pros",
    colCons: "Cons",
    rows: [
      {
        method: "Strike-off (simplified removal)",
        pros: "Relatively simple and usually lower cost than full winding-up.",
        cons: "Even after the name is struck off the register, director and related-party liability or investigation issues can remain for a material period (penalties, interest, and related costs may apply). Scope and duration depend on law and the facts.",
      },
      {
        method: "Winding-up (formal liquidation)",
        pros: "Where implemented appropriately, formal winding-up can help bring debt and obligations to an orderly legal closure.",
        cons: "Slower and more expensive than strike-off. Complex debt, tax, and litigation structures can take a long time; timelines vary widely with NCLT, creditors, and ROC processing.",
      },
      {
        method: "Dormant",
        pros: "Buys time while keeping the legal entity and, where relevant, immovable assets inside the company shell.",
        cons: "MCA eligibility and ongoing annual compliance still apply; it is not a substitute for a clean exit if you need full closure.",
      },
    ],
  },
  legalDisclaimer:
    "This page is a general practical summary only. Actual steps, tax treatment, creditor relationships, compliance arrears, and ROC/NCLT practice can change the appropriate approach. Case-specific review under the Companies Act, IBC, tax law, and FEMA may be needed before you proceed.",
  related: {
    title: "Related pages",
    links: [
      { label: "Corporate incorporation", path: "/services/corporate-incorporation" },
      { label: "Accounting services", path: "/services" },
    ],
  },
  navBackServices: "Back to services",
  navContact: "Contact us",
};

const zh: CorporateLiquidationServiceCopy = {
  metaTitle: "印度公司注销与休眠指引",
  metaDescription: `${company.shortName} · Strike-off（Section 248 等除名）、正式清算（Winding-up）、休眠公司：流程要点、利弊与结业前检查（参考说明）。`,
  pageTitle: "印度公司注销与休眠指引",
  pageDescription:
    "印度公司退出路径通常包括 Strike-off（基于 Section 248 等的除名）、Winding-up（正式清算）以及 Dormant（休眠公司）等；实际适用程序会因公司状况、债务、诉讼与合规历史而异。Strike-off 与日常语境中的“停业”并不总是同义。休眠状态并非公司解散，而是在符合条件前提下维持休眠状态的概念。休眠并非清算的替代“结案”方式；ROC/NCLT、税务与 FEMA 等实务以现行 Companies Act、IBC、规则及个案为准。",
  sourceNote: "内容来源于内部资料《法人清算》（2020-08-25 修订），仅供实务参考，法规与表格可能已更新。",
  overview: {
    title: "1. 概述",
    body:
      "印度公司结业常见方式包括 Strike-off（简易除名）与 Winding-up（正式清算），路径选择取决于资产负债、诉讼风险与持续经营情况。",
  },
  strikeIntro: {
    title: "2. Strike-off（简易除名/简易注销）",
    paragraphs: [
      "通常适用于无实质经营、资产负债可按除名条件进行整理的公司。若存在重大未决诉讼或难以处理的资产负债，应优先考虑正式清算等路径。",
    ],
    prerequisitesTitle: "主要前提（要点）",
    prerequisites: [
      "实务上多在申请前朝清理资产、负债及未结交易方向推进；具体要件以 ROC 审查标准及公司个案为准。",
      "Companies Act 下，一定期间无实质经营活动或经营中止等可能成为审查要素；具体标准与表述以施行规则、MCA 公告及登记官实务为准，并可能变化。",
    ],
  },
  strikeSteps: {
    title: "2.1. Strike-off 流程（要点）",
    lead: "完成下列六个环节通常需要约 3～5 个月或更长时间（视当局处理进度而定）。",
    steps: [
      "一般在结清往来后关闭银行账户（具体时点依银行实务）。",
      "董事会决议批准 Strike-off 申请。",
      "董事会决议通过后，全体董事按规定签署声明/宣誓类文件。",
      "通过 MCA 门户提交相关电子表格（STK 系列等），需包含授权董事的 DSC。",
      "可能进入 ROC 公示及利害关系人异议等程序（公示期限与流程以当时法规与指引为准）。",
      "公示期满后，经 ROC 程序并在政府公报（Gazette）刊登除名/注销相关信息。",
    ],
    durationNote: "时间表因个案与材料完整性而异。",
  },
  windingSteps: {
    title: "3. Winding-up（正式清算）流程（要点）",
    lead: "以下为资料性步骤示例。结构较简单的案件也可能在数月内推进，但实际耗时可能因 NCLT、债权人、税务机关与 ROC 处理情况而显著不同。",
    steps: [
      "董事会（1～2 日）：依 Companies Act 与 IBC 体系，视路径与个案可能需要董事会、股东、债权人决议及清算人程序；通常讨论偿债能力等主题。",
      "股东特别大会（4～6 日）：通过特别决议（资料示例：四分之三以上股东同意；以适用法律为准）。",
      "债权人相关程序：视债务与债权人结构，可能需要债权人同意或其他程序。",
      "任命清算人：清算决议通过后任命清算人（Liquidator），并推进资产负债、储备与资本等事项的报告。",
      "公报/公示：在法规要求的期限内办理政府公报等公示手续。",
      "债务清理与银行配合：提交决议副本等所需文件，推进债务清理；银行账户及会计资料可能接受核查。",
      "最终股东大会（1～2 日）：清算完成后就账册与文件处置等通过特别决议（如适用）。",
      "NCLT/法院：在需要时进入 NCLT、法院或其他主管机关程序。",
      "ROC 提交与解散收尾：清算完成后将相关命令及文件提交 ROC，以完成解散相关步骤。",
      "公告：除名/解散事实依 ROC 与政府公报程序公告。",
    ],
    durationNote: "公司规模与债务复杂度会显著影响 NCLT/法院及 ROC 阶段耗时。",
    footnotes: [
      "各类材料需符合规定格式。",
      "商号能否再次使用取决于当时 MCA 的名称审查规则与登记现状，不应将任何非正式的“等待期”理解为保证。",
    ],
  },
  dormant: {
    title: "4. 休眠公司（Dormant）状态",
    intro:
      "若暂无实质经营但仍需保留法人主体，可在符合 MCA 条件的前提下考虑休眠：例如为未来项目预先设立的公司，或持有土地、房屋等资产导致难以立即注销的情形。休眠状态并非公司解散，而是在一定条件下维持休眠状态的概念。若目标是彻底退出，休眠不能替代清算。",
    whenTitle: "资料中提到的条件要点（需与现行 MCA 规则核对）",
    whenItems: [
      "未实质开展业务。",
      "过去两个财政年度无会计交易。",
      "应审查 MCA 对休眠申请与维持的合规要求；年报/财务报表未提交等违约状态反而可能构成障碍。",
    ],
    conditionsTitle: "重要说明",
    conditions: ["休眠不等于完成清算：仍可能涉及持续合规与资格维护。"],
  },
  preClosureChecklist: {
    title: "结业前实务检查清单",
    intro: "在除名、清算或休眠申请前梳理下列事项，通常有助于后续与 ROC、银行及税务机关对接（重要性因个案而异）。",
    items: [
      "GST 注册注销/放弃 · 是否需要",
      "IEC 关闭及 DGFT 收尾 · 是否需要",
      "PF/ESI 欠费与申报缺口",
      "未提交的 ROC 申报与年报合规整理",
      "银行账户关闭、余额及担保解除",
      "关联方往来余额与集团内借贷整理",
      "FEMA/FC-GPR 等申报缺口与不一致核对",
      "税务评估/调查是否在途",
      "劳动争议与欠薪、离职补偿",
      "DSC/DIN 状态与授权签字人",
    ],
  },
  summary: {
    title: "5. 总结与排期",
    body:
      "除名（Strike-off）、正式清算（Winding-up·Liquidation）与休眠（Dormant status）在适用条件、费用、耗时与持续义务上各不相同，应结合资产、负债、税务、诉讼与经营计划等综合评估后选择。",
    timelineNote:
      "实际处理周期可能因 ROC、NCLT、税务机关、债权人配合及未履行合规等因素差异很大，亦可能出现行政延误或补充材料要求；排期上通常建议预留充足缓冲。",
  },
  comparison: {
    title: "方式对比（摘要）",
    colMethod: "方式",
    colPros: "优点",
    colCons: "缺点",
    rows: [
      {
        method: "简易除名（Strike-off）",
        pros: "流程相对简单，费用通常低于正式清算。",
        cons: "除名后，董事及相关方在一定期间内仍可能承担责任或面临调查类事项（罚款、利息等），范围与期间依法规与个案而定。",
      },
      {
        method: "正式清算（Winding-up）",
        pros: "在合规完成的前提下，更有利于以有序方式在法律上整理债务与义务关系。",
        cons: "相较简易除名更耗时、费用更高；在债务、税务与诉讼结构复杂时可能长期推进，日程亦会因 NCLT、债权人与 ROC 处理情况而显著不同。",
      },
      {
        method: "休眠（Dormant）",
        pros: "可暂缓全面清算，同时保留法人主体与（如适用）资产结构。",
        cons: "需满足 MCA 休眠条件并持续履行年报/披露等义务；若目标是彻底退出，休眠不能替代清算。",
      },
    ],
  },
  legalDisclaimer:
    "本页为一般性实务参考摘要；具体程序、税务、债权人关系、未履行合规及 ROC/NCLT 实务可能导致适用方式不同。正式推进前，可能需要结合 Companies Act、IBC、税务与 FEMA 等角度进行个案评估。",
  related: {
    title: "相关页面",
    links: [
      { label: "公司设立服务", path: "/services/corporate-incorporation" },
      { label: "会计服务", path: "/services" },
    ],
  },
  navBackServices: "返回服务列表",
  navContact: "联系我们",
};

export function corporateLiquidationServiceCopy(locale: SiteLocale): CorporateLiquidationServiceCopy {
  return pickLocale(locale, { ko, en, zh });
}
