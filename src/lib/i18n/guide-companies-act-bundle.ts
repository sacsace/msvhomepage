import type { ServiceGuideCopy } from "@/lib/i18n/service-guides-locale";

type GuideBundle = {
  readonly ko: ServiceGuideCopy;
  readonly en: ServiceGuideCopy;
  readonly zh: ServiceGuideCopy;
};

const related = [
  { href: "/services/corporate-merger", label: { ko: "합병 안내", en: "Merger guide", zh: "合并指引" } },
  { href: "/services/corporate-liquidation", label: { ko: "청산 안내", en: "Liquidation guide", zh: "清算指引" } },
  { href: "/services/contracts-legal", label: { ko: "계약·법률 문서", en: "Contracts & legal", zh: "合同与法律" } },
  { href: "/services/corporate-incorporation", label: { ko: "법인 설립", en: "Incorporation", zh: "公司设立" } },
  { href: "/services/compliance-calendar", label: { ko: "신고준수 달력", en: "Compliance calendar", zh: "合规日历" } },
] as const;

export const guideCompaniesActHub: GuideBundle = {
  ko: {
    metaTitle: "회사법 가이드 허브 | Companies Act, 2013",
    metaDescription:
      "이사회·주총·법정장부·ROC·감사·배당·합병·청산 등 Companies Act, 2013 기준 거버넌스 허브. MCA·ROC·정관·주주간 계약을 함께 봅니다.",
    pageEyebrow: "Companies Act, 2013",
    pageTitle: "회사법 가이드 허브",
    pageDescription:
      "인도 회사법 운영은 단순 ROC 신고가 아니라, 이사회·주주총회·의사록·법정장부·배당·감사·합병·청산 절차가 함께 연결되는 거버넌스 체계입니다. 실제 실무에서는 Companies Act, 2013, MCA 포털, ROC 제출 일정, 정관 및 주주간 계약을 함께 검토해야 합니다.",
    disclaimer:
      "본 페이지는 실무 참고용 개요이며 법률·세무 자문을 대체하지 않습니다. 조항·일정·양식은 개정·연장·면제가 잦으므로 인디아코드(Indiacode) 원문, MCA 공지, ROC 실무와 전문 자문으로 최종 확인하세요.",
    roadmapCardsTitle: "핵심 체크리스트",
    roadmapCards: [
      {
        title: "이사회·주주총회 운영",
        bullets: [
          "이사회 결의와 주주총회 결의가 필요한 사안을 구분합니다.",
          "Board Meeting, AGM, EGM, Circular Resolution의 사용 기준을 내부 매뉴얼로 정리합니다.",
          "의사록은 회의 종료 후 법이 요구하는 방식으로 작성·보관해야 하며, 증빙·분쟁 대응에서 핵심 자료가 됩니다. (Companies Act, 2013 Section 118 등 · 원문·MCA 안내를 대조하세요.)",
        ],
      },
      {
        title: "법정장부·회사 기록 관리",
        bullets: [
          "Register of Members, Register of Directors, Register of Charges 등 법정장부 유지·갱신 체계를 둡니다.",
          "주식 발행, 지분 이전, 담보 설정, 이사 변경 등은 장부 기록과 ROC 신고·결의 내용이 정합해야 합니다. (Section 88 등 · 원문 확인)",
        ],
      },
      {
        title: "재무제표·감사·Board Report",
        bullets: [
          "재무제표는 이사회 승인 후 감사보고서와 함께 주주총회 및 ROC 제출 흐름과 연결됩니다.",
          "Board Report에는 이사회 회의 수, Directors’ Responsibility Statement 등 법이 요구하는 항목이 포함될 수 있습니다. (Section 134 등 · 원문·양식 확인)",
        ],
      },
    ],
    sections: [
      {
        title: "1. 이사회 및 결의 관리",
        bullets: [
          "신규 은행 계좌 개설",
          "주식 발행",
          "이사 선임·사임",
          "계약 승인",
          "차입·담보 설정",
          "감사인 선임",
          "배당 추천 또는 중간배당 승인",
          "실무 · 결의서와 MCA 신고 내용 불일치, 이사회 날짜와 계약 체결일 불일치, Circular Resolution 사용 가능 여부 사전 검토, DSC 보유 이사 및 Authorized Signatory 관리.",
        ],
      },
      {
        title: "2. AGM·EGM·주주 승인",
        bullets: [
          "연차 주주총회(AGM)에서 재무제표 채택, 감사인 관련 안건, 배당, 이사 재선임 등을 처리합니다.",
          "정관 변경, 합병·분할·구조조정, 자본·지분 구조 변경 등은 EGM 및/또는 특별결의 요건이 붙을 수 있습니다. (Section 96 등 AGM 의무·시한 · 원문·정관·개정 공지 확인)",
          "실무 · AGM 일정 지연, 주주 통지·정족수·결의 요건 누락, 주주 결의와 ROC filing 불일치, 한국 본사 승인 일정과 인도 법정 일정 역산 미스.",
        ],
      },
      {
        title: "3. ROC 연차 신고",
        bullets: [
          "AOC-4: 재무제표 제출",
          "MGT-7 / MGT-7A: Annual Return",
          "ADT-1: 감사인 선임 신고",
          "DIR-3 KYC: 이사 DIN KYC",
          "DPT-3: 예금·차입 관련 해당 여부 검토",
          "실무 · AGM 후 AOC-4·MGT-7 계열 마감을 운영 보드에 고정하고, 연장·면제 공지를 분기별로 확인합니다. (일반적으로 AOC-4는 AGM 후 30일 이내, MGT-7은 60일 이내 구조로 설명되는 경우가 많으나 연도·법인 유형·공지에 따름)",
          "주의 · DIR-3 KYC는 MCA가 연간 방식에서 주기·절차를 조정·안내한 바가 있으므로, 적용 연도별 MCA 공지(예: 보도자료·Circular)로 최신 요건을 확인해야 합니다.",
        ],
      },
      {
        title: "4. 배당·자본 거래",
        bullets: [
          "배당은 이익·준비금·이사회 추천 및 주주 승인 구조를 검토합니다.",
          "중간배당은 이사회 권한으로 가능한 경우가 있으나 재무·회사법 요건을 사전에 검토합니다. (Section 123 등 배당 선언·지급 요건 · 원문 확인)",
          "실무 · 배당 가능 이익·세무, 외국 주주 배당 송금 시 FEMA·은행 서류, Form 15CA/CB·DTAA 적용 여부.",
        ],
      },
      {
        title: "5. 합병·구조조정",
        bullets: [
          "합병·분할·사업 이전은 Companies Act, NCLT, ROC, 세무, FEMA, 계약 승계를 함께 검토합니다.",
          "일반 합병·인수합병은 Section 230–232 등과 연계될 수 있으며, Fast Track Merger 등 별도 루트 가능성을 초기에 스크리닝합니다.",
          "실무 · 주주·채권자 승인, NCLT 절차 여부, 자산·부채·계약 승계, 직원 승계, GST·PAN·TAN·은행·라이선스 이전.",
        ],
      },
      {
        title: "6. 청산·Strike-off",
        bullets: [
          "사업 종료 또는 운영 불필요 법인은 Strike-off 또는 정식 청산(Winding-up)을 비교합니다.",
          "Strike-off는 Section 248 등 Registrar의 명칭 삭제·해산 구조와 연계됩니다 · 관보·절차·예외는 최신 규칙과 ROC 실무를 확인합니다.",
          "실무 · 자산·부채 정리, 은행 계좌 폐쇄, 미제출 ROC·ITR·GST, 이사·주주 진술서, 진행 중 소송·채무.",
        ],
      },
    ],
    scheduleSectionTitle: "회사법 주요 운영 영역 (요약 표)",
    scheduleTables: [
      {
        title: "",
        colItem: "영역",
        colSummary: "주요 관리 항목 / 실무 리스크",
        rows: [
          {
            item: "이사회",
            summary: "주요: 결의서, 의사록, 승인권한\n리스크: 결의 누락, 날짜 불일치",
          },
          {
            item: "주주총회",
            summary: "주요: AGM, EGM, 특별결의\n리스크: 통지·정족수·결의 요건 누락",
          },
          {
            item: "ROC 신고",
            summary: "주요: AOC-4, MGT-7, ADT-1, DIR-3 KYC\n리스크: 지연 수수료, DIN 비활성, non-compliance",
          },
          {
            item: "법정장부",
            summary: "주요: 회원명부, 이사명부, 담보(Charges) 등록\n리스크: 지분·담보 기록 불일치",
          },
          {
            item: "배당",
            summary: "주요: 이익 검토, Board recommendation, 주주 승인\n리스크: 배당 가능 이익·세무·FEMA",
          },
          {
            item: "합병·청산",
            summary: "주요: NCLT, ROC, 채권자·주주 절차\n리스크: 절차 지연, 계약·세무 승계",
          },
        ],
      },
    ],
    relatedIntro: "합병·청산·계약·설립·일정 허브와 함께 보면 실무 연결이 수월합니다.",
    relatedTitle: "연결 페이지",
    relatedLinks: related.map((r) => ({ href: r.href, label: r.label.ko })),
    closingNote:
      "인도 회사법 운영은 단순 ROC filing보다 이사회·주주총회·법정장부·세무·은행·계약 구조가 함께 연결되는 거버넌스 영역입니다. 초기부터 결의·의사록·신고·증빙 체계를 맞춰두면 이후 감사, 투자, 합병, 청산 과정에서 리스크를 줄일 수 있습니다.",
  },
  en: {
    metaTitle: "Companies Act hub | India corporate governance",
    metaDescription:
      "Boards, AGMs, statutory registers, ROC annual filings, audit, dividends, M&A and liquidation · Companies Act, 2013 practice anchors with MCA/ROC and articles.",
    pageEyebrow: "Companies Act, 2013",
    pageTitle: "Companies Act guide hub",
    pageDescription:
      "India company law operations are not “ROC filings only” · boards, general meetings, minutes, statutory books, dividends, audit, mergers and winding-up interlock as one governance system. In practice you align Companies Act, 2013, the MCA portal, ROC timelines, the articles of association and shareholder agreements.",
    disclaimer:
      "Overview for operations teams · not legal advice. Sections, forms and timelines change; confirm with Indiacode, MCA circulars/notices, ROC practice and your counsel.",
    roadmapCardsTitle: "Core checklist",
    roadmapCards: [
      {
        title: "Board & shareholder meetings",
        bullets: [
          "Separate matters that need board resolutions vs shareholder resolutions.",
          "Document when to use board meetings, AGM, EGM and circular resolutions.",
          "Minutes must be prepared and kept as the law requires · they are key evidence. (See Companies Act, 2013 Section 118 · read the statute and MCA guidance.)",
        ],
      },
      {
        title: "Statutory registers & records",
        bullets: [
          "Maintain registers of members, directors, charges, etc., with clear ownership.",
          "Issuance/transfers, charges and director changes should reconcile registers, resolutions and ROC filings. (Section 88 · verify the statute.)",
        ],
      },
      {
        title: "Financial statements, audit & board report",
        bullets: [
          "Financial statements connect board approval, the audit report, the AGM and ROC filings.",
          "The board report can include meeting counts, the directors’ responsibility statement and other prescribed items. (Section 134 · check forms and law.)",
        ],
      },
    ],
    sections: [
      {
        title: "1. Board meetings & resolutions",
        bullets: [
          "New bank account opening",
          "Share issuance",
          "Director appointment/resignation",
          "Contract approval",
          "Borrowings & creation of charge",
          "Auditor appointment",
          "Dividend recommendation or interim dividend approval",
          "Practice · mismatch between resolutions and MCA filings; board date vs agreement date; circular-resolution eligibility; DSC directors and authorised signatories.",
        ],
      },
      {
        title: "2. AGM, EGM & shareholder approvals",
        bullets: [
          "At the AGM: adopt financial statements, auditor-related business, dividends, director reappointments, etc.",
          "Articles amendment, mergers/demergers, capital and equity changes may need an EGM and/or special resolutions. (Section 96 and related AGM rules · verify law, articles and extensions.)",
          "Practice · delayed AGM; notice/quorum/resolution gaps; shareholder approvals vs ROC filings; HQ approval calendars vs India statutory dates.",
        ],
      },
      {
        title: "3. ROC annual compliance",
        bullets: [
          "AOC-4: financial statements filing",
          "MGT-7 / MGT-7A: annual return",
          "ADT-1: auditor appointment filing",
          "DIR-3 KYC: director DIN KYC",
          "DPT-3: check applicability for deposits/borrowings reporting",
          "Practice · lock AGM-driven AOC-4/MGT-7 deadlines on one board; watch MCA extensions. (AOC-4 often cited ~30 days after AGM and MGT-7 ~60 days · confirm for your year and entity type.)",
          "Note · DIR-3 KYC cadence and rules have been updated by MCA; read the circular/press note for the filing year.",
        ],
      },
      {
        title: "4. Dividends & capital transactions",
        bullets: [
          "Review profits, reserves, board recommendation and shareholder approval for dividends.",
          "Interim dividends may be board-driven in some cases · still check financial and company-law conditions. (Section 123 · verify statute.)",
          "Practice · distributable profits and taxes; FEMA/bank packs for foreign shareholders; Form 15CA/CB and DTAA.",
        ],
      },
      {
        title: "5. Mergers & restructuring",
        bullets: [
          "Mergers, demergers and business transfers usually involve Companies Act, NCLT, ROC, tax, FEMA and contract succession together.",
          "General combinations may map to Sections 230–232; consider whether a fast-track or other route exists.",
          "Practice · shareholder/creditor approvals; NCLT vs non-NCLT routes; asset/liability and contract succession; employees; GST, PAN, TAN, bank and licence transfers.",
        ],
      },
      {
        title: "6. Liquidation & strike-off",
        bullets: [
          "For ceased or dormant businesses, compare strike-off vs formal winding-up.",
          "Strike-off links to the Registrar’s powers under Section 248 · gazette and procedural details change; verify current rules and ROC practice.",
          "Practice · clean-up of assets/liabilities; bank account closure; outstanding ROC/ITR/GST; director/shareholder declarations; litigation and debt.",
        ],
      },
    ],
    scheduleSectionTitle: "Operating map (summary)",
    scheduleTables: [
      {
        title: "",
        colItem: "Area",
        colSummary: "Main controls / practice risks",
        rows: [
          { item: "Board", summary: "Controls: resolutions, minutes, authority\nRisks: missing resolutions, date mismatches" },
          { item: "Shareholders", summary: "Controls: AGM, EGM, special resolutions\nRisks: notice, quorum, resolution gaps" },
          { item: "ROC filings", summary: "Controls: AOC-4, MGT-7, ADT-1, DIR-3 KYC\nRisks: late fees, DIN deactivation, non-compliance" },
          { item: "Registers", summary: "Controls: members, directors, charges\nRisks: equity/charge record mismatches" },
          { item: "Dividends", summary: "Controls: profits, board recommendation, approvals\nRisks: distributable profits, tax, FEMA" },
          { item: "M&A / exit", summary: "Controls: NCLT, ROC, creditor/shareholder steps\nRisks: delays, contract and tax succession" },
        ],
      },
    ],
    relatedIntro: "Pair with merger, liquidation, contracts, incorporation and the compliance calendar.",
    relatedTitle: "Linked pages",
    relatedLinks: related.map((r) => ({ href: r.href, label: r.label.en })),
    closingNote:
      "India company law is a governance mesh · boards, AGMs, registers, tax, banking and contracts move together. Aligning resolutions, minutes, filings and evidence early reduces friction through audit, fundraising, M&A and exit.",
  },
  zh: {
    metaTitle: "公司法指南枢纽 | Companies Act, 2013",
    metaDescription:
      "董事会、股东会、法定登记簿、ROC 年报、审计、分红、并购与清算等 Companies Act, 2013 实务要点，与 MCA、ROC、章程衔接。",
    pageEyebrow: "Companies Act, 2013",
    pageTitle: "公司法指南枢纽",
    pageDescription:
      "印度公司法运营并非仅有 ROC 申报，而是董事会、股东大会、会议记录、法定账簿、分红、审计、并购与清算等环节联动的治理体系。实务中需同时对照 Companies Act, 2013、MCA 门户、ROC 提交节奏、公司章程及股东协议。",
    disclaimer:
      "本页为运营侧概览，不构成法律意见。条文、表格与期限常有修订或延期，请以 Indiacode 原文、MCA 通告及专业顾问确认为准。",
    roadmapCardsTitle: "核心检查清单",
    roadmapCards: [
      {
        title: "董事会与股东大会运作",
        bullets: [
          "区分需要董事会决议与股东大会决议的事项。",
          "梳理 Board Meeting、AGM、EGM、Circular Resolution 的适用情形并形成内部指引。",
          "会议记录须依法制作与保存，在举证与争议中至关重要。（Companies Act, 2013 第 118 条等，请对照原文与 MCA 指引。）",
        ],
      },
      {
        title: "法定登记簿与公司记录",
        bullets: [
          "维护成员名册、董事名册、押记登记簿等，并明确责任人。",
          "发行股份、股权转让、设定押记、董事变更等应与登记簿、决议及 ROC 申报保持一致。（第 88 条等，以原文为准。）",
        ],
      },
      {
        title: "财务报表、审计与董事会报告",
        bullets: [
          "财务报表经董事会批准后，与审计报告、股东大会及 ROC 提交流程衔接。",
          "董事会报告可包含会议次数、董事责任声明等法定要素。（第 134 条等，结合表格核对。）",
        ],
      },
    ],
    sections: [
      {
        title: "1. 董事会与决议管理",
        bullets: ["新开银行账户", "发行股份", "董事任免", "合同批准", "借款与设定担保", "委任审计师", "股息建议或中期股息批准", "实务 · 决议与 MCA 申报不一致；董事会日期与合同签署日不一致；事先评估 Circular Resolution；管理持有 DSC 的董事及授权签字人。"],
      },
      {
        title: "2. AGM·EGM 与股东批准",
        bullets: [
          "在 AGM 处理财务报表通过、审计相关事项、股息、董事连任等。",
          "章程修订、合并/分立/重组、资本与股权变动等可能需 EGM 及/或特别决议。（第 96 条等，以法律、章程及延期公告为准。）",
          "实务 · AGM 排期延误；通知、法定人数、决议要件遗漏；股东决议与 ROC 申报不一致；总部审批节奏与印度法定节点未对齐。",
        ],
      },
      {
        title: "3. ROC 年度申报",
        bullets: [
          "AOC-4：财务报表提交",
          "MGT-7 / MGT-7A：年度申报表",
          "ADT-1：审计师委任申报",
          "DIR-3 KYC：董事 DIN KYC",
          "DPT-3：存款/借款相关申报适用性评估",
          "实务 · 将 AGM 后的 AOC-4、MGT-7 等截止日固定在同一运营面板，并按季度查看延期或豁免通告。（常见表述为 AGM 后约 30/60 日内，但以年度与主体类型为准。）",
          "提示 · DIR-3 KYC 的要求与周期曾被 MCA 调整，请以当年 MCA 通告/新闻稿为准。",
        ],
      },
      {
        title: "4. 分红与资本交易",
        bullets: [
          "审查利润、储备、董事会建议及股东批准等分红结构。",
          "中期股息在部分情形可由董事会主导，但仍须审查财务与公司法条件。（第 123 条等，以原文为准。）",
          "实务 · 可分配利润与税务；对外国股东分红时的 FEMA/银行材料；Form 15CA/CB 与税收协定适用。",
        ],
      },
      {
        title: "5. 并购与重组",
        bullets: [
          "并购、分立、业务转移通常需同时审视 Companies Act、NCLT、ROC、税务、FEMA 与合同承继。",
          "一般合并可能对应第 230–232 条等路径；应尽早筛查是否存在快速合并等替代程序。",
          "实务 · 股东/债权人批准；是否进入 NCLT；资产负债与合同承继；员工；GST、PAN、TAN、银行与许可迁移。",
        ],
      },
      {
        title: "6. 清算与除名（Strike-off）",
        bullets: [
          "业务终止或暂不需要主体时，比较 Strike-off 与正式清算。",
          "Strike-off 与第 248 条等登记官除名权相关，公告与程序以最新规则及 ROC 实务为准。",
          "实务 · 资产负债清理；银行账户关闭；未完成的 ROC/所得税/GST；董事/股东声明；在诉与债务。",
        ],
      },
    ],
    scheduleSectionTitle: "主要运营领域（摘要表）",
    scheduleTables: [
      {
        title: "",
        colItem: "领域",
        colSummary: "主要管理事项 / 实务风险",
        rows: [
          { item: "董事会", summary: "主要：决议、会议记录、授权\n风险：决议缺失、日期不一致" },
          { item: "股东大会", summary: "主要：AGM、EGM、特别决议\n风险：通知、法定人数、决议要件遗漏" },
          { item: "ROC 申报", summary: "主要：AOC-4、MGT-7、ADT-1、DIR-3 KYC\n风险：滞纳金、DIN 失效、合规缺口" },
          { item: "法定登记簿", summary: "主要：成员、董事、押记名册\n风险：股权/押记记录不一致" },
          { item: "分红", summary: "主要：利润审查、董事会建议、股东批准\n风险：可分配利润、税务、FEMA" },
          { item: "并购/退出", summary: "主要：NCLT、ROC、债权人/股东程序\n风险：程序拖延、合同与税务承继" },
        ],
      },
    ],
    relatedIntro: "建议与合并、清算、合同、设立及合规日历页面一并阅读。",
    relatedTitle: "关联页面",
    relatedLinks: related.map((r) => ({ href: r.href, label: r.label.zh })),
    closingNote:
      "印度公司法运营不仅是 ROC 申报，更是董事会、股东大会、法定账簿、税务、银行与合同结构的联动治理。自早期把决议、会议记录、申报与证据链对齐，有助于在审计、融资、并购与退出阶段降低风险。",
  },
};
