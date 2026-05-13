import type { ServiceGuideCopy } from "@/lib/i18n/service-guides-locale";

type GuideBundle = {
  readonly ko: ServiceGuideCopy;
  readonly en: ServiceGuideCopy;
  readonly zh: ServiceGuideCopy;
};

export const complianceCalendar: GuideBundle = {
  ko: {
    metaTitle: "신고준수 달력 | 인도 컴플라이언스 캘린더",
    metaDescription:
      "인도 법인 신고·준수 허브 · 월간 운영 달력, FDI/FEMA 거래형 일정, 세무·외환 운영 팁.",
    pageEyebrow: "컴플라이언스 캘린더",
    pageTitle: "신고준수 달력",
    pageDescription:
      "‘언제 무엇을 제출하는지’가 고객 신뢰와 운영 효율에 직결됩니다. 본 페이지는 홈과 동일한 운영 달력과 FDI/FEMA 이벤트 축·운영 팁을 한곳에 묶었습니다.",
    calendarWidgetKicker: "Live",
    calendarWidgetTitle: "운영 일정 달력",
    calendarWidgetLead: "관리자 등록 마감(TDS·GST·ECB 등)은 홈과 동일 데이터이며 월간으로 확인하고 아래 법정 일정 표와 병행하면 됩니다.",
    disclaimer:
      "연도·법 개정·연장 공고·업종·등록 유형·매출 규모·주(邦)법에 따라 마감이 달라질 수 있습니다. 최종 일정은 공식 공지·거주 세무사(CPA) 등 전문 자문으로 확정하세요.",
    introParagraphs: [
      "홈 화면의 주간·월간 달력은 운영팀이 등록한 일정을 보여 주며, 본 페이지에서 같은 데이터를 월간으로 확인할 수 있습니다.",
      "QRMP·분기 신고자·다수 지점 법인 등에는 실제 마감이 달라질 수 있으니 공지·자문으로 확정하세요.",
    ],
    scheduleSectionTitle: "인도 법인 기간별 법정 신고·컴플라이언스 일정",
    scheduleTables: [
      {
        title: "월별",
        colItem: "항목",
        colSummary: "일정·요건(요약)",
        rows: [
          { item: "TDS", summary: "납부·신고 · 매월 7일경(규정·연장 공고 확인)" },
          { item: "GSTR-1(매출 등)", summary: "월 신고자 · 매월 11일경(월별 filer 기준)" },
          { item: "GSTR-3B(매입·ITC)", summary: "월 신고자 · 매월 20일경(월별 filer 기준)" },
          { item: "PF·ESI", summary: "납부·신고 · 매월 15일경" },
          { item: "Professional Tax", summary: "매월 20일경(주·邦별 상이)" },
          { item: "ECB", summary: "차입 잔액 시 RBI FIRMS 월별 보고(예: ECB-2) · 익월 초·통상 7일 이내 등, 지침 확인" },
          { item: "급여·원천징수", summary: "회사 내부 SLA와 TDS 일정 정렬" },
        ],
      },
      {
        title: "분기별",
        colItem: "항목",
        colSummary: "일정·요건(요약)",
        rows: [
          { item: "Advance tax", summary: "6/15(약 15%)·9/15(약 45%)·12/15(약 75%)·3/15(약 100%) · 과세 구조에 따라 상이" },
          { item: "TDS 분기별 신고", summary: "Q1(4–6월) → 7/31경, Q2 → 10/31경, Q3 → 익년 1/31경, Q4 → 5/31경(연도·양식 확인)" },
          { item: "이사회", summary: "설립 후 30일 이내 첫 회의, 연간 최소 4회·회의 간 최대 120일 간격 등 Companies Act(정관·결의로 확정)" },
          { item: "GSTR-1(분기·QRMP)", summary: "분기 종료 다음 달 13일경(매출 한도 등 요건 확인)" },
          { item: "GSTR-3B(분기·QRMP)", summary: "분기 종료 다음 달 22~24일경(주·filer 유형에 따라 상이)" },
        ],
      },
      {
        title: "연도별",
        colItem: "항목",
        colSummary: "일정·요건(요약)",
        rows: [
          { item: "DIR-3 KYC", summary: "9월 30일경 · 미이행 시 DIN 비활성 등 리스크" },
          { item: "Professional Tax(연간)", summary: "4월 1일~30일경(주·邦별 상이)" },
          { item: "SFT", summary: "5월 1일~30일경(해당 시)" },
          { item: "FLA", summary: "7월 1일~20일경 · 대외 채권·채무(FDI·ECB 등과 연계)" },
          {
            item: "세무감사인/감사 준비",
            summary: "통상 8월 말 전후 감사인 확정·자료 준비 진행(법인·감사 범위별 상이)",
          },
          { item: "재무제표 감사", summary: "제출·주총 전 준비 · 통상 9월 전후 밀집(법인별 상이)" },
          { item: "법인세 ITR", summary: "9월 전후 등 일반론(연장·세무 상태별 상이)" },
          { item: "ROC AOC-4 / MGT-7(MGT-7A)", summary: "10월 전후 등 일반 제출 시즌(연장·면제 공고 확인)" },
          { item: "TP(국제거래) 감사보고", summary: "11월 30일경(해당·임계 시)" },
          { item: "GSTR-9", summary: "매출 규모 등에 따라 의무·면제(공지 기준 확인)" },
          { item: "GSTR-9C", summary: "제도·통지에 따름(면제·의무 변동 시 확인)" },
        ],
      },
    ],
    governanceTitle: "거래·이벤트 기반 (FDI / FEMA)",
    governanceScheduleTable: {
      title: "",
      colItem: "항목",
      colSummary: "일정·요건(요약)",
      rows: [
        {
          item: "FC-GPR · 지분 유입",
          summary: [
            "외국인 투자금 입금·주식 배정 완료 후 RBI FC-GPR 제한 기한 내 신고(지침·연도별 Master Direction 확인)",
            "AD bank·FIRC·KYC·Valuation·이사회 자료를 세무 마감과 같은 타임라인에 두면 지연 리스크가 줄어듭니다.",
            "증자 라운드가 여러 번이면 라운드별 마감·증빙 폴더를 분리해 관리합니다.",
          ].join("\n"),
        },
        {
          item: "FC-TRS · 지분 이전",
          summary: [
            "주주 간 주식 양도 등 RBI FC-TRS 해당 시, 거래 완료 후 법정 제한 기한 내 신고(지침 확인)",
            "거래 가격·FMV·주주 간 계약과 은행 질의 대응을 한 묶음으로 준비합니다.",
          ].join("\n"),
        },
        {
          item: "월간·연간 FEMA 라인 (참고)",
          summary: [
            "ECB 잔액이 있으면 ECB-2 월별 보고를 세무 7일·GST 일정과 같은 운영 보드에 올립니다.",
            "FLA(7/1~7/20)는 외채·대외지분 스냅샷 성격이므로 회계·FEMA·세무 숫자 정합을 미리 맞춥니다.",
            "LUT·기타 FEMA 신고는 [FEMA·외환 가이드](/services/guide-fema-fx)와 함께, 지분 심화는 [FDI·FEMA 안내](/services/fdi-fema-guide)를 병행하면 좋습니다.",
          ].join("\n"),
        },
      ],
    },
    nestedChecklistTitle: "운영 팁 · 세무·외환·본사",
    nestedChecklistScheduleTable: {
      title: "",
      colItem: "항목",
      colSummary: "일정·요건(요약)",
      rows: [
        {
          item: "한 타임라인에서 관리",
          summary: [
            "은행·외환(RBI/FEMA) 신고를 세무 캘린더와 같은 보드(팀·승인자)에서 관리합니다.",
            "본사 보고일(MIS·그룹 결산)과 인도 법정일·은행 컷오프를 한 줄 타임라인에 겹쳐 표시합니다.",
            "AD bank query·Valuation 보완·이사회 일정이 송금·신고 마감을 밀지 않도록 역산 일정을 둡니다.",
            "홈 월간 달력의 TDS·GST·ECB 등 칩은 ‘대표 예시’이며, 실제 마감은 공지·자문으로 확정합니다.",
          ].join("\n"),
        },
      ],
    },
    relatedIntro: "세무·GST·FEMA·FDI 도구와 함께 두면 내부 교육과 고객 안내에 유리합니다.",
    relatedTitle: "관련 페이지",
    relatedLinks: [
      { href: "/services", label: "회계·세무 서비스" },
      { href: "/services/guide-india-tax", label: "인도 세무 가이드" },
      { href: "/services/personal-income-tax-calculator", label: "급여 TDS 계산기" },
      { href: "/services/gst-practice-guide", label: "GST 실무" },
      { href: "/services/guide-fema-fx", label: "FEMA·외환 가이드" },
      { href: "/services/fdi-fema-guide", label: "FDI·FEMA 안내" },
    ],
    closingNote:
      "인도 준수는 단일 마감표가 아니라 세무·노무·회사법·RBI·주법이 동시에 얽힙니다. 본 페이지는 내부 워크보드의 골격으로 쓰고, 세부 일정·비율·면제는 공식·거주 CPA·법무 자문으로 확정하는 것이 안전합니다.",
  },
  en: {
    metaTitle: "Filing & compliance calendar (India)",
    metaDescription:
      "India compliance hub · monthly operating calendar, FDI/FEMA event lanes, and tax/FX operating tips.",
    pageEyebrow: "Compliance calendar",
    pageTitle: "Filing & compliance checklist",
    pageDescription:
      "Knowing what is due when drives trust and efficiency. This page combines the same operating calendar as home with FDI/FEMA event lanes and practical operating tips.",
    calendarWidgetKicker: "Live",
    calendarWidgetTitle: "Operating calendar",
    calendarWidgetLead: "Admin-posted deadlines (TDS, GST, ECB, etc.) use the same data as home · view by month and pair with the statutory tables below.",
    disclaimer:
      "Deadlines shift with law changes, extensions, industry, registration type, turnover thresholds and state law · confirm each period with official notices and your India CPA.",
    introParagraphs: [
      "The home week/month widgets show events your team publishes; this page shows the same dataset in an inline month view.",
      "QRMP, quarterly GST filers and multi-state footprints change actual due dates · confirm against official notices.",
    ],
    scheduleSectionTitle: "Statutory reporting & compliance rhythm (India entities)",
    scheduleTables: [
      {
        title: "Monthly",
        colItem: "Item",
        colSummary: "Schedule (summary)",
        rows: [
          { item: "TDS", summary: "Payment/return · around the 7th (check notifications/extensions)." },
          { item: "GSTR-1 (outward/supplies)", summary: "Monthly filers · around the 11th." },
          { item: "GSTR-3B (ITC/payment)", summary: "Monthly filers · around the 20th." },
          { item: "PF & ESI", summary: "Payment/return · around the 15th." },
          { item: "Professional tax", summary: "Around the 20th (state-specific)." },
          { item: "ECB", summary: "RBI FIRMS monthly reporting when a loan is outstanding (e.g. ECB-2) · early next month, often ~7 days; follow master directions." },
          { item: "Payroll / withholding", summary: "Align internal SLAs with the TDS cadence." },
        ],
      },
      {
        title: "Quarterly",
        colItem: "Item",
        colSummary: "Schedule (summary)",
        rows: [
          { item: "Advance tax", summary: "15 Jun (~15%), 15 Sep (~45%), 15 Dec (~75%), 15 Mar (~100%); percentages depend on facts." },
          { item: "TDS quarterly returns", summary: "Q1 by ~31 Jul, Q2 by ~31 Oct, Q3 by ~31 Jan (next FY), Q4 by ~31 May · verify forms/notices." },
          { item: "Board meetings", summary: "First within 30 days of incorporation; then ≥4 per year and max 120-day gap (Companies Act · operationalise via resolutions)." },
          { item: "GSTR-1 (QRMP)", summary: "~13th of the month after the quarter (turnover/registration conditions)." },
          { item: "GSTR-3B (QRMP)", summary: "~22nd–24th of the month after the quarter (state/filer dependent)." },
        ],
      },
      {
        title: "Annual",
        colItem: "Item",
        colSummary: "Schedule (summary)",
        rows: [
          { item: "DIR-3 KYC", summary: "~30 September (DIN deactivation risk if missed)." },
          { item: "Professional tax (annual)", summary: "Often 1–30 April (state-specific)." },
          { item: "SFT", summary: "May window where applicable." },
          { item: "FLA", summary: "~1–20 July · foreign assets/liabilities snapshot (FDI/ECB linkages)." },
          {
            item: "Tax auditor / audit readiness",
            summary:
              "Typically late August · confirm/appoint the statutory auditor and advance data packs (varies by entity and audit scope).",
          },
          { item: "Audit of financials", summary: "Ahead of ROC/ITR season (entity-specific)." },
          { item: "Corporate ITR", summary: "Commonly cited September window · verify extensions and facts." },
          { item: "ROC AOC-4 / MGT-7 or MGT-7A", summary: "~October season · check ROC notifications/extensions." },
          { item: "TP audit report", summary: "~30 November where international transactions exceed thresholds." },
          { item: "GSTR-9", summary: "Mandatory above notified turnover bands · verify current law." },
          { item: "GSTR-9C", summary: "Follow government notifications on applicability." },
        ],
      },
    ],
    governanceTitle: "Event-based lanes (FDI / FEMA)",
    governanceScheduleTable: {
      title: "",
      colItem: "Item",
      colSummary: "Schedule (summary)",
      rows: [
        {
          item: "FC-GPR · equity inflows",
          summary: [
            "After inward remittance and allotment, file FC-GPR within RBI timelines (follow the current master direction).",
            "Chain AD bank evidence, FIRC, KYC, valuation memos and board packs on the same timeline as tax closes.",
            "Separate evidence folders per funding round to avoid cross-round mismatches.",
          ].join("\n"),
        },
        {
          item: "FC-TRS · share transfers",
          summary: [
            "For eligible transfers, complete FC-TRS within RBI timelines once the deal is done (confirm the form/guidance).",
            "Bundle pricing/FMV, shareholder agreements and bank queries as one workstream.",
          ].join("\n"),
        },
        {
          item: "Recurring FEMA lines (reference)",
          summary: [
            "When ECB is live, park ECB-2 monthly reporting beside TDS/GST on the same operating board.",
            "FLA (1–20 July) is a foreign assets/liabilities snapshot · reconcile accounting, FEMA and tax numbers early.",
            "For LUT and other FEMA filings, use the [FEMA & FX guide](/services/guide-fema-fx) alongside the [FDI & FEMA guide](/services/fdi-fema-guide) for equity depth.",
          ].join("\n"),
        },
      ],
    },
    nestedChecklistTitle: "Operating tips · tax, FX, HQ",
    nestedChecklistScheduleTable: {
      title: "",
      colItem: "Item",
      colSummary: "Schedule (summary)",
      rows: [
        {
          item: "Single operating board",
          summary: [
            "Keep RBI/FEMA filings on the same board and owners as the tax calendar.",
            "Overlay HQ MIS/group closing with India statutory dates and bank cut-offs on one timeline.",
            "Back-schedule AD queries, valuation updates and board dates so they do not push remittance/reporting deadlines.",
            "Home month chips (TDS, GST, ECB, etc.) are illustrative · confirm actual due dates with notices and advisors.",
          ].join("\n"),
        },
      ],
    },
    relatedIntro: "Use together with tax, GST, FEMA and FDI hubs for training and client comms.",
    relatedTitle: "Related pages",
    relatedLinks: [
      { href: "/services", label: "Accounting & tax" },
      { href: "/services/guide-india-tax", label: "India tax guide" },
      { href: "/services/personal-income-tax-calculator", label: "Salary TDS calculator" },
      { href: "/services/gst-practice-guide", label: "GST guide" },
      { href: "/services/guide-fema-fx", label: "FEMA & FX guide" },
      { href: "/services/fdi-fema-guide", label: "FDI & FEMA guide" },
    ],
    closingNote:
      "India compliance is a mesh of tax, labour, company law, RBI and state rules · use this page as an internal backbone and confirm ratios, exemptions and final dates with official sources and your India CPA.",
  },
  zh: {
    metaTitle: "申报与合规日历（印度）",
    metaDescription: "印度合规中心：月度运营日历、FDI/FEMA 事件型节点与税务·外汇运营建议。",
    pageEyebrow: "合规日历",
    pageTitle: "申报与合规日程",
    pageDescription:
      "把关键截止日放在同一视图最有价值。本页汇总与首页一致的运营月历，以及 FDI/FEMA 事件型说明与运营建议。",
    calendarWidgetKicker: "实时",
    calendarWidgetTitle: "运营日程日历",
    calendarWidgetLead: "管理员发布的 TDS、GST、ECB 等与首页同源，按月查看并与下方法定日程表对照即可。",
    disclaimer: "截止日可能因法律修订、延期公告、行业、登记类型、营业额门槛与地方法规而变化，请以官方与当地顾问为准。",
    introParagraphs: [
      "首页周/月视图与管理员维护的日程一致；本页以月历形式展示同一数据源。",
      "QRMP、季度申报与多邦经营等会改变实际截止日，请以官方与顾问为准。",
    ],
    scheduleSectionTitle: "印度法人：按期间的法定申报与合规节奏",
    scheduleTables: [
      {
        title: "月度",
        colItem: "事项",
        colSummary: "日程·要点（概要）",
        rows: [
          { item: "TDS", summary: "缴纳与申报 · 多在每月 7 日前后（以公告为准）。" },
          { item: "GSTR-1（销项等）", summary: "月报纳税人 · 多在每月 11 日前后。" },
          { item: "GSTR-3B（进项·ITC）", summary: "月报纳税人 · 多在每月 20 日前后。" },
          { item: "PF、ESI", summary: "缴纳与申报 · 多在每月 15 日前后。" },
          { item: "Professional Tax", summary: "多在每月 20 日前后（因邦而异）。" },
          { item: "ECB", summary: "有未偿外债时 RBI FIRMS 月度报送（如 ECB-2） ·  次月初，常见约 7 日内，以主指令为准。" },
          { item: "薪酬与预扣", summary: "内部 SLA 与 TDS 节奏对齐。" },
        ],
      },
      {
        title: "季度",
        colItem: "事项",
        colSummary: "日程·要点（概要）",
        rows: [
          { item: "预缴税款", summary: "6/15、9/15、12/15、3/15 等分期（比例依事实而定）。" },
          { item: "TDS 季报", summary: "Q1 约 7/31、Q2 约 10/31、Q3 约次年 1/31、Q4 约 5/31（以当年表格为准）。" },
          { item: "董事会", summary: "设立后 30 日内首次会议；之后每年至少四次、间隔不超过 120 天等（以章程与决议落实）。" },
          { item: "GSTR-1（QRMP）", summary: "季度结束后次月约 13 日（满足营业额等条件）。" },
          { item: "GSTR-3B（QRMP）", summary: "季度结束后次月约 22–24 日（因邦/纳税人类型而异）。" },
        ],
      },
      {
        title: "年度",
        colItem: "事项",
        colSummary: "日程·要点（概要）",
        rows: [
          { item: "DIR-3 KYC", summary: "约 9 月 30 日（逾期可能影响 DIN）。" },
          { item: "Professional Tax（年报）", summary: "常见 4 月窗口（因邦而异）。" },
          { item: "SFT", summary: "5 月窗口（如适用）。" },
          { item: "FLA", summary: "约 7 月 1–20 日；对外资产负债快照（与 FDI/ECB 等衔接）。" },
          {
            item: "税务审计师/审计准备",
            summary: "通常在 8 月底前后确定审计师并推进资料准备（因公司与审计范围而异）。",
          },
          { item: "财务报表审计", summary: "随 ROC/所得税季节前置（因主体而异）。" },
          { item: "企业所得税申报", summary: "常见 9 月窗口等（以延期与事实为准）。" },
          { item: "ROC AOC-4 / MGT-7 或 MGT-7A", summary: "常见 10 月前后季节（以 ROC 公告为准）。" },
          { item: "转让定价审计报告", summary: "国际交易达门槛时约 11 月 30 日前后。" },
          { item: "GSTR-9", summary: "营业额等达门槛时强制；以政府通知为准。" },
          { item: "GSTR-9C", summary: "以当年制度与通知为准。" },
        ],
      },
    ],
    governanceTitle: "事件型（FDI / FEMA）",
    governanceScheduleTable: {
      title: "",
      colItem: "事项",
      colSummary: "日程·要点（概要）",
      rows: [
        {
          item: "FC-GPR · 股本流入",
          summary: [
            "境外汇入与配股完成后，在 RBI 规定的 FC-GPR 时限内报送（以现行主指令为准）。",
            "将授权交易商材料、FIRC、KYC、估值备忘录与董事会材料与税务截止放在同一时间轴。",
            "多轮融资分文件夹管理，避免混档。",
          ].join("\n"),
        },
        {
          item: "FC-TRS · 股权转让",
          summary: [
            "符合条件的居民/非居民转让，在交易完成后按 RBI 时限办理 FC-TRS（以主指令为准）。",
            "定价/公允价值、股东协议与银行问询一并准备。",
          ].join("\n"),
        },
        {
          item: "经常性 FEMA 线条（参考）",
          summary: [
            "有 ECB 时把 ECB-2 月报与 TDS/GST 同一运营面板管理。",
            "FLA（7/1~7/20）属对外资产负债快照，提前对齐会计、FEMA 与税务数字。",
            "LUT 及其他 FEMA 申报请结合 [FEMA 与外汇指南](/services/guide-fema-fx)；股权深化见 [FDI·FEMA 指南](/services/fdi-fema-guide)。",
          ].join("\n"),
        },
      ],
    },
    nestedChecklistTitle: "运营建议 · 税务、外汇、总部",
    nestedChecklistScheduleTable: {
      title: "",
      colItem: "事项",
      colSummary: "日程·要点（概要）",
      rows: [
        {
          item: "统一运营看板",
          summary: [
            "将 RBI/FEMA 与税务截止放在同一看板与责任人体系。",
            "将总部合并日与印度法定日、银行截点叠加为一条时间线。",
            "为银行问询、估值补充与董事会排期预留逆向时间，避免挤压汇款/申报截止。",
            "首页月历上的 TDS、GST、ECB 等标签为示例，实际截止以官方与顾问为准。",
          ].join("\n"),
        },
      ],
    },
    relatedIntro: "与税务、GST、FEMA、FDI 页面一并使用，便于培训与客户沟通。",
    relatedTitle: "相关页面",
    relatedLinks: [
      { href: "/services", label: "会计与税务服务" },
      { href: "/services/guide-india-tax", label: "印度税务指南" },
      { href: "/services/personal-income-tax-calculator", label: "工资 TDS 计算器" },
      { href: "/services/gst-practice-guide", label: "GST 指南" },
      { href: "/services/guide-fema-fx", label: "FEMA 与外汇指南" },
      { href: "/services/fdi-fema-guide", label: "FDI·FEMA 指南" },
    ],
    closingNote:
      "印度合规是税务、劳动、公司法、RBI 与地方法规的交织；请把本文当作内部骨架，比例、豁免与最终日期以官方与当地顾问为准。",
  },
};
