import { company } from "@/lib/site-content";
import { pickLocale, type SiteLocale } from "@/lib/site-locale";

export type IncorporationSchedulePhaseId =
  | "nameApproval"
  | "notaryPrep"
  | "notaryKorea"
  | "mcaFiling"
  | "bankAccount"
  | "capitalRemit"
  | "rbiFdi"
  | "gstApp"
  | "iecApp"
  | "epfEsic"
  | "expatVisa"
  | "msme"
  | "ptReg"
  | "iceGate";

export const INCORPORATION_SCHEDULE_TOTAL_DAYS = 89;
export const INCORPORATION_SCHEDULE_MILESTONE_DAY = 43;

export const incorporationSchedulePhases: readonly {
  id: IncorporationSchedulePhaseId;
  start: number;
  end: number;
}[] = [
  { id: "nameApproval", start: 1, end: 12 },
  { id: "notaryPrep", start: 13, end: 14 },
  { id: "notaryKorea", start: 15, end: 24 },
  { id: "mcaFiling", start: 26, end: 42 },
  { id: "bankAccount", start: 43, end: 49 },
  { id: "capitalRemit", start: 50, end: 58 },
  { id: "rbiFdi", start: 59, end: 74 },
  { id: "gstApp", start: 50, end: 78 },
  { id: "iecApp", start: 79, end: 79 },
  { id: "epfEsic", start: 51, end: 58 },
  { id: "expatVisa", start: 44, end: 48 },
  { id: "msme", start: 79, end: 81 },
  { id: "ptReg", start: 79, end: 83 },
  { id: "iceGate", start: 79, end: 89 },
] as const;

export type CorporateIncorporationServiceCopy = {
  metaTitle: string;
  metaDescription: string;
  pageTitle: string;
  pageDescription: string;
  ctaApply: string;
  supportEyebrow: string;
  supportTitle: string;
  supportItems: readonly string[];
  step1Eyebrow: string;
  step1Title: string;
  step1CorpNameLead: string;
  step1CorpNameBody: string;
  step1SectorLead: string;
  step1SectorBody: string;
  step2Eyebrow: string;
  step2Title: string;
  incorporationSteps: readonly string[];
  step3Eyebrow: string;
  step3Title: string;
  factoryFollowUp: readonly string[];
  step4Eyebrow: string;
  step4Title: string;
  timelineItems: readonly { label: string; value: string }[];
  timelineFootnote: string;
  step5Eyebrow: string;
  step5Title: string;
  step5Items: readonly string[];
  step6Eyebrow: string;
  step6Title: string;
  step6Intro: string;
  tableCapitalInr: string;
  tableCapitalKrw: string;
  tableGovFeeInr: string;
  step6Footnote: string;
  step7Eyebrow: string;
  step7Title: string;
  step7Items: readonly string[];
  closingNote: string;
  navBackServices: string;
  navApply: string;
  navContact: string;
  scheduleChart: {
    title: string;
    colItem: string;
    colSpan: string;
    firstDayLabel: string;
    lastDayLabel: (totalDays: number) => string;
    milestoneDay: (n: number) => string;
    phaseLabel: Record<IncorporationSchedulePhaseId, string>;
    legendLead: string;
    legendDetail: string;
    footerNote: string;
    ariaBarRange: (label: string, start: number, end: number) => string;
  };
};

export function corporateIncorporationServiceCopy(locale: SiteLocale): CorporateIncorporationServiceCopy {
  return pickLocale(locale, {
    ko: {
      metaTitle: "법인 설립 서비스",
      metaDescription: `${company.shortName} 인도 법인 설립 준비·MCA 등기·GST·IEC·공장 후속 절차 및 소요 기간 안내`,
      pageTitle: "법인 설립 서비스",
      pageDescription:
        "인도 Private Limited 등 법인 설립을 준비할 때 필요한 이름·업종 정리부터 MCA 등기, 은행·RBI, GST·IEC, 공장 후속 절차까지 단계별로 안내합니다.",
      ctaApply: "법인 설립 신청하기",
      supportEyebrow: "Support",
      supportTitle: "지원 범위 요약",
      supportItems: [
        "법인 형태·지분 구조·사업 목적 범위 검토 및 설립 로드맵 수립",
        "이름 승인·디지털 서명·MOA/AOA·등기 신청 등 설립 서류 준비·제출 지원",
        "PAN·GST·은행 계좌 등 설립 직후 필수 등록 일정 정리 및 실행 지원",
        "설립 후 정관·이사회·주주 결의 등 거버넌스 기본 점검(회계·세무 팀과 연계)",
      ],
      step1Eyebrow: "Step 1",
      step1Title: "법인명 준비 및 업종 선택",
      step1CorpNameLead: "법인명:",
      step1CorpNameBody: "최소 2개 이상의 후보명을 준비해 주시기 바랍니다. (검토 및 승인까지 약 7~10일 소요)",
      step1SectorLead: "업종/업태:",
      step1SectorBody: "설립 목적 및 사업 내용에 대한 간단한 요약이 필요합니다.",
      step2Eyebrow: "Step 2",
      step2Title: "법인 설립 절차 요약",
      incorporationSteps: [
        "전자서명(Digital Signature) 준비",
        "이사 고유번호(DIN) 발급",
        "이사 PAN(소득세 번호) 발급",
        "법인명 신청 및 승인",
        "회사 정관(MOA & AOA) 및 법인 서류 작성",
        "기업관리국(MCA)에 서류 제출",
        "법인설립증(COI) 발급",
        "법인 PAN 및 TAN 발급",
        "법인 계좌 개설",
        "자본금 송금 및 인도중앙은행(RBI) 심사",
        "영업권 확보",
        "주식 등록 및 Demat 승인",
        "GST 등록",
        "수출입코드(IEC) 등록",
        "Professional Tax(PT) 등록",
      ],
      step3Eyebrow: "Step 3",
      step3Title: "공장 설립 관련 후속 절차",
      factoryFollowUp: [
        "산업 규모 등록(중소, 중견 등)",
        "환경/소방 허가",
        "공장 건물 도면 승인 및 인허가",
        "공장 허가증 발급",
        "퇴직연금(EPF) 및 고용보험(ESIC) 등록",
      ],
      step4Eyebrow: "Step 4",
      step4Title: "소요 기간 (평균 기준)",
      timelineItems: [
        { label: "법인명 승인", value: "7~15 근무일" },
        { label: "법인설립증(COI) 발급", value: "7~10 근무일" },
        {
          label: "GST, IEC 등 코드 발급",
          value: "계좌 개설 및 체크북 수령 후 15~20 근무일",
        },
        {
          label: "자본금 송금 및 RBI 심사",
          value: "COI 발급일로부터 60일 이내 송금, 심사 10~15 근무일",
        },
        { label: "공장 설립(후속)", value: "법인 설립 완료 후 30~45 근무일" },
      ],
      timelineFootnote: "근무일 기준이며, 관청·은행·서류 보완 상황에 따라 달라질 수 있습니다.",
      step5Eyebrow: "Step 5",
      step5Title: "법인 설립 기본 요건",
      step5Items: [
        "- 최소 2인의 등기이사 및 주주 필요 (개인/법인 가능)",
        "- 최소 1인은 상주이사(연간 182일 이상 인도 체류자)여야 합니다.",
      ],
      step6Eyebrow: "Step 6",
      step6Title: "자본금 및 정부 수수료 예시",
      step6Intro: `아래 원화는 1 INR ≈ 16 KRW로 단순 환산한 참고치입니다.`,
      tableCapitalInr: "자본금 (INR)",
      tableCapitalKrw: "자본금 한화 (KRW)",
      tableGovFeeInr: "정부 수수료 (INR)",
      step6Footnote:
        "등록되는 주(邦)마다 변동이 있으며, 주식 수에 따라 수수료가 달라질 수 있습니다. 확정 금액은 담당 RoC/주 정부 기준으로 산정됩니다.",
      step7Eyebrow: "Step 7",
      step7Title: "법인 주소 요건",
      step7Items: [
        "- 법인명 승인 후 2주 이내 확정 필요",
        "- 현지 주소 임차 또는 제공 가능해야 합니다.",
      ],
      closingNote:
        "본 페이지는 일반적인 설립·후속 절차를 요약한 것입니다. 고객사별 체크리스트·내부 가이드에 추가 조항이 있는 경우, 계약 범위에 맞춰 별도로 정리해 드립니다.",
      navBackServices: "서비스로 돌아가기",
      navApply: "법인 설립 신청하기",
      navContact: "문의하기",
      scheduleChart: {
        title: "설립 진행 일정표 (일 단위 예시)",
        colItem: "항목",
        colSpan: "기간",
        firstDayLabel: "1일차",
        lastDayLabel: (totalDays) => `${totalDays}일차`,
        milestoneDay: (n) => `${n}일차`,
        phaseLabel: {
          nameApproval: "법인명 사용 허가",
          notaryPrep: "공증/아포스티유 서류 준비",
          notaryKorea: "공증/아포스티유 작성 (한국)",
          mcaFiling: "기업관리국 법인 설립 서류 제출 및 심사",
          bankAccount: "법인 계좌 등록",
          capitalRemit: "자본금 납부 및 인도 법인 계좌 입금 확인",
          rbiFdi: "해외투자금 신고 (인도 중앙은행 심사)",
          gstApp: "GST 신청",
          iecApp: "수출입 코드 신청",
          epfEsic: "연금보험/건강보험",
          expatVisa: "주재원 비자 서류 준비 (사업주 및 취업비자)",
          msme: "MSME (중소기업청 인증) 등록",
          ptReg: "PT (전문세/갑급세) 등록",
          iceGate: "ICEGate (관세청) 등록",
        },
        legendLead: "빨간 세로선",
        legendDetail: `: ${INCORPORATION_SCHEDULE_MILESTONE_DAY}일차 — 사업자 등록증 발급 예상일(예시)`,
        footerNote:
          "병행 업무(GST·비자 등)가 겹치는 구간은 막대가 동시에 표시됩니다. 실제 소요는 주(邦)·은행·서류 보완에 따라 달라질 수 있습니다.",
        ariaBarRange: (label, start, end) => `${label}: ${start}일차부터 ${end}일차까지`,
      },
    },
    en: {
      metaTitle: "Corporate incorporation",
      metaDescription: `${company.shortName} — India Private Limited setup: MCA filing, GST, IEC, factory follow-ups and indicative timelines.`,
      pageTitle: "Corporate incorporation",
      pageDescription:
        "Step-by-step guidance for India Private Limited formation—from name and activity scoping through MCA registration, banking and RBI, GST and IEC, to factory-related follow-ups.",
      ctaApply: "Start incorporation application",
      supportEyebrow: "Support",
      supportTitle: "What we help with",
      supportItems: [
        "Entity design, shareholding and objects review with a practical incorporation roadmap",
        "Name approval, digital signatures, MOA/AOA and MCA filing preparation and submission",
        "Post-incorporation essentials: PAN, GST, bank account sequencing and execution support",
        "Basic governance checks (articles, board and shareholder resolutions) aligned with accounting and tax teams",
      ],
      step1Eyebrow: "Step 1",
      step1Title: "Name options and business description",
      step1CorpNameLead: "Proposed names:",
      step1CorpNameBody: "Please prepare at least two candidates (review and approval typically take about 7–10 days).",
      step1SectorLead: "Activity / sector:",
      step1SectorBody: "A concise summary of the purpose of incorporation and the intended business is required.",
      step2Eyebrow: "Step 2",
      step2Title: "Incorporation workflow (summary)",
      incorporationSteps: [
        "Digital Signature Certificate (DSC) preparation",
        "Director Identification Number (DIN)",
        "Director PAN (income tax number)",
        "Name application and approval",
        "Memorandum & Articles (MOA & AOA) and incorporation documents",
        "Filing with the Ministry of Corporate Affairs (MCA)",
        "Certificate of Incorporation (COI)",
        "Company PAN and TAN",
        "Bank account opening",
        "Capital remittance and Reserve Bank of India (RBI) review",
        "Business commencement steps",
        "Share registration and Demat approval",
        "GST registration",
        "Importer–Exporter Code (IEC)",
        "Professional Tax (PT) registration",
      ],
      step3Eyebrow: "Step 3",
      step3Title: "Factory-related follow-ups (when applicable)",
      factoryFollowUp: [
        "Industrial enterprise classification (MSME / mid-cap, etc.)",
        "Environmental and fire approvals",
        "Factory building plan approval and related permits",
        "Factory licence issuance",
        "EPF and ESIC registration",
      ],
      step4Eyebrow: "Step 4",
      step4Title: "Indicative timelines (working days)",
      timelineItems: [
        { label: "Name approval", value: "7–15 working days" },
        { label: "Certificate of Incorporation (COI)", value: "7–10 working days" },
        {
          label: "GST, IEC and related IDs",
          value: "About 15–20 working days after bank account and cheque book",
        },
        {
          label: "Capital remittance and RBI review",
          value: "Remit within 60 days of COI; RBI review about 10–15 working days",
        },
        { label: "Factory setup (follow-on)", value: "About 30–45 working days after incorporation" },
      ],
      timelineFootnote: "Working-day estimates; actual dates vary by authority, bank and document completeness.",
      step5Eyebrow: "Step 5",
      step5Title: "Basic requirements",
      step5Items: [
        "- At least two directors on the board and two shareholders (individuals or corporates are allowed).",
        "- At least one resident director (ordinarily 182+ days in India per year) is required.",
      ],
      step6Eyebrow: "Step 6",
      step6Title: "Illustrative capital and government fees",
      step6Intro: "KRW amounts below use a simple illustrative rate of 1 INR ≈ 16 KRW.",
      tableCapitalInr: "Share capital (INR)",
      tableCapitalKrw: "Share capital (KRW, indicative)",
      tableGovFeeInr: "Government fees (INR)",
      step6Footnote:
        "Fees vary by state of registration and share count. Final amounts follow the relevant RoC / state rules.",
      step7Eyebrow: "Step 7",
      step7Title: "Registered office address",
      step7Items: [
        "- Must be confirmed within about two weeks of name approval.",
        "- A local lease or usable address must be available.",
      ],
      closingNote:
        "This page summarises typical incorporation and follow-on steps. Client-specific checklists may be prepared separately under the agreed scope.",
      navBackServices: "Back to services",
      navApply: "Start incorporation application",
      navContact: "Contact us",
      scheduleChart: {
        title: "Illustrative day-by-day schedule",
        colItem: "Item",
        colSpan: "Span",
        firstDayLabel: "Day 1",
        lastDayLabel: (totalDays) => `Day ${totalDays}`,
        milestoneDay: (n) => `Day ${n}`,
        phaseLabel: {
          nameApproval: "Name availability / approval",
          notaryPrep: "Notary / apostille document prep",
          notaryKorea: "Notary / apostille (Korea)",
          mcaFiling: "MCA incorporation filing and review",
          bankAccount: "Company bank account setup",
          capitalRemit: "Capital remittance and credit to India account",
          rbiFdi: "Foreign investment reporting (RBI)",
          gstApp: "GST application",
          iecApp: "Importer–Exporter Code (IEC)",
          epfEsic: "EPF / ESIC registration",
          expatVisa: "Expatriate visa paperwork (employer & employment)",
          msme: "MSME (Udyam) registration",
          ptReg: "Professional Tax (PT) registration",
          iceGate: "ICEGate (customs) registration",
        },
        legendLead: "Red vertical line",
        legendDetail: `: Day ${INCORPORATION_SCHEDULE_MILESTONE_DAY} — illustrative date of incorporation certificate issuance`,
        footerNote:
          "Overlapping bars (e.g. GST and visa) show parallel workstreams. Actual duration depends on state, bank and document cycles.",
        ariaBarRange: (label, start, end) => `${label}: day ${start} through day ${end}`,
      },
    },
    zh: {
      metaTitle: "公司设立服务",
      metaDescription: `${company.shortName} — 印度 Private Limited 设立：MCA 登记、GST、IEC、工厂后续环节与周期参考。`,
      pageTitle: "公司设立服务",
      pageDescription:
        "从名称与业务范围整理，到 MCA 登记、银行与 RBI、GST 与 IEC，再到工厂相关后续步骤，提供分阶段说明。",
      ctaApply: "提交设立申请",
      supportEyebrow: "Support",
      supportTitle: "支持范围概览",
      supportItems: [
        "法人形态、股权结构与经营范围梳理，并形成可执行的设立路线图",
        "名称核准、数字签名、MOA/AOA 及向 MCA 提交设立申请等文书准备与递交",
        "设立后 PAN、GST、银行账户等关键登记的时序整理与落地协助",
        "章程、董事会与股东决议等治理要点（与会计·税务团队协同）",
      ],
      step1Eyebrow: "Step 1",
      step1Title: "名称准备与行业选择",
      step1CorpNameLead: "拟定名称：",
      step1CorpNameBody: "请至少准备两个候选名称（审核与核准约需 7–10 日）。",
      step1SectorLead: "行业/业态：",
      step1SectorBody: "请提供设立目的与业务内容的简要说明。",
      step2Eyebrow: "Step 2",
      step2Title: "设立流程（摘要）",
      incorporationSteps: [
        "数字签名（DSC）准备",
        "董事识别号（DIN）",
        "董事 PAN（所得税号）",
        "名称申请与核准",
        "公司章程（MOA & AOA）及设立文件",
        "向企业事务部（MCA）递交",
        "公司注册证书（COI）",
        "公司 PAN 与 TAN",
        "开立银行账户",
        "资本金汇入及印度储备银行（RBI）审核",
        "开展营业相关步骤",
        "股份登记与 Demat 核准",
        "GST 登记",
        "进出口代码（IEC）",
        "专业税（PT）登记",
      ],
      step3Eyebrow: "Step 3",
      step3Title: "工厂相关后续（如适用）",
      factoryFollowUp: [
        "产业规模登记（中小、中型等）",
        "环保/消防许可",
        "厂房图纸审批及相关许可",
        "工厂许可证核发",
        "EPF 与 ESIC 登记",
      ],
      step4Eyebrow: "Step 4",
      step4Title: "所需时间（工作日，参考）",
      timelineItems: [
        { label: "名称核准", value: "7–15 个工作日" },
        { label: "公司注册证书（COI）", value: "7–10 个工作日" },
        { label: "GST、IEC 等编码", value: "开户并取得支票簿后约 15–20 个工作日" },
        { label: "资本金汇入及 RBI 审核", value: "自 COI 起 60 日内汇入；审核约 10–15 个工作日" },
        { label: "工厂设立（后续）", value: "设立完成后约 30–45 个工作日" },
      ],
      timelineFootnote: "以上为工作日参考，实际因主管机关、银行与补件情况而异。",
      step5Eyebrow: "Step 5",
      step5Title: "设立基本要求",
      step5Items: ["- 至少两名登记董事及股东（可为个人或法人）。", "- 至少一名须为常住董事（通常每年在印度居住 182 日以上）。"],
      step6Eyebrow: "Step 6",
      step6Title: "资本金与政府费用示例",
      step6Intro: "下列韩元金额为按 1 INR ≈ 16 KRW 的示意换算，仅供参考。",
      tableCapitalInr: "资本金（INR）",
      tableCapitalKrw: "资本金（KRW，示意）",
      tableGovFeeInr: "政府费用（INR）",
      step6Footnote: "费用因注册所在邦及股份数量而异，最终以主管 RoC/邦政府核定为准。",
      step7Eyebrow: "Step 7",
      step7Title: "注册地址要求",
      step7Items: ["- 名称核准后约两周内需确定。", "- 须具备当地可使用的租赁或地址。"],
      closingNote:
        "本页为一般设立与后续流程摘要。若客户清单或内部指引另有条款，可在合同约定范围内另行整理。",
      navBackServices: "返回服务列表",
      navApply: "提交设立申请",
      navContact: "联系我们",
      scheduleChart: {
        title: "设立进度表示例（按日）",
        colItem: "项目",
        colSpan: "区间",
        firstDayLabel: "第1日",
        lastDayLabel: (totalDays) => `第${totalDays}日`,
        milestoneDay: (n) => `第${n}日`,
        phaseLabel: {
          nameApproval: "名称核准/可用性",
          notaryPrep: "公证/海牙认证材料准备",
          notaryKorea: "公证/海牙认证（韩国）",
          mcaFiling: "MCA 设立申请递交与审查",
          bankAccount: "公司银行账户开立",
          capitalRemit: "资本金缴纳及入账确认",
          rbiFdi: "外商投资申报（RBI）",
          gstApp: "GST 申请",
          iecApp: "进出口代码（IEC）",
          epfEsic: "公积金/雇员保险登记",
          expatVisa: "派驻人员签证材料（雇主及就业）",
          msme: "MSME（Udyam）登记",
          ptReg: "专业税（PT）登记",
          iceGate: "ICEGate（海关）登记",
        },
        legendLead: "红色竖线",
        legendDetail: `：第 ${INCORPORATION_SCHEDULE_MILESTONE_DAY} 日 — 公司注册证书预计签发日（示例）`,
        footerNote: "并行事项（如 GST 与签证）以重叠条表示；实际周期因邦、银行与补件而异。",
        ariaBarRange: (label, start, end) => `${label}：第 ${start} 日至第 ${end} 日`,
      },
    },
  });
}

export type CorporateIncorporationApplyShellCopy = {
  metaTitle: string;
  metaDescription: string;
  pageTitle: string;
  pageDescription: string;
  breadcrumbService: string;
  breadcrumbServicesList: string;
};

export function corporateIncorporationApplyShellCopy(locale: SiteLocale): CorporateIncorporationApplyShellCopy {
  return pickLocale(locale, {
    ko: {
      metaTitle: "법인 설립 신청",
      metaDescription: `${company.shortName} 인도 법인 설립 신청서 제출 — 법인명·주소·자본금·이사·주주 정보`,
      pageTitle: "법인 설립 신청",
      pageDescription:
        "아래 양식을 작성해 제출해 주시면, 등록된 수신 메일로 신청 내용이 전달됩니다. 첨부 파일이 많을 경우 나누어 보내거나 문의로 안내를 요청해 주세요.",
      breadcrumbService: "법인 설립 서비스 안내",
      breadcrumbServicesList: "서비스 목록",
    },
    en: {
      metaTitle: "Incorporation application",
      metaDescription: `${company.shortName} — submit your India incorporation application (names, address, capital, directors and shareholders).`,
      pageTitle: "Incorporation application",
      pageDescription:
        "Submit the form below and we will forward the payload to our registered inbox. If attachments are large, split them across messages or ask us for guidance.",
      breadcrumbService: "Corporate incorporation overview",
      breadcrumbServicesList: "All services",
    },
    zh: {
      metaTitle: "公司设立申请",
      metaDescription: `${company.shortName} — 提交印度公司设立申请（名称、地址、资本、董事与股东等）。`,
      pageTitle: "公司设立申请",
      pageDescription:
        "请填写并提交下列表单，内容将发送至我们登记的收件邮箱。若附件较大，可分次发送或通过咨询索取指引。",
      breadcrumbService: "公司设立服务说明",
      breadcrumbServicesList: "服务列表",
    },
  });
}
