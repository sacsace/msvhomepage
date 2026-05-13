import type { SiteLocale } from "@/lib/site-locale";
import { pickLocale } from "@/lib/site-locale";
import { company } from "@/lib/site-content";

export type Form41GlossaryEntry = { term: string; desc: string };

export type Form41RegistrationServiceCopy = {
  metaTitle: string;
  metaDescription: string;
  pageTitle: string;
  pageDescription: string;
  sec1: { title: string; p1: string; p2: string };
  sec2: { title: string; intro: string; items: readonly string[] };
  sec3: { title: string; intro: string; items: readonly string[]; footNote: string };
  sec4: { title: string; intro: string; steps: readonly string[] };
  sec5: { title: string; items: readonly string[] };
  sec6: { title: string; items: readonly string[] };
  sec7: { title: string; body: string };
  sec8: { title: string; entries: readonly Form41GlossaryEntry[] };
  /** 페이지 최하단 법적 한 줄(세무 자문 비칭) */
  legalMicroCopy: string;
  backToServices: string;
  contactCta: string;
};

const ko: Form41RegistrationServiceCopy = {
  metaTitle: "Form 41 / Form 10F 관련 등록·신고 지원",
  metaDescription: `${company.shortName} · Form 41·Form 10F·비거주자 정보·전자등록, 적용 대상·구비서류·실무 절차·유의사항·DTAA·TDS·TRC·PAN·Form 15CA/CB 연계 안내`,
  pageTitle: "Form 41 / Form 10F 관련 등록·신고 지원",
  pageDescription:
    "인도 소득세 관련 비거주자 정보 제출 및 DTAA 적용 검토 절차(Form 10F·전자등록 체계 포함)를 정리하고, 관련 TDS·송금 신고 실무를 지원합니다.",
  sec1: {
    title: "1. Form 41 / Form 10F 개요",
    p1:
      "Form 41은 인도 비거주자(Non-resident)가 인도 내 소득에 대해 원천징수(TDS)와 관련하여 DTAA 적용 및 원천징수(TDS) 경감 검토를 위해 제출하는 비거주자 정보 신고 절차에 해당합니다.",
    p2:
      "Form 10F, 전자 등록 및 Form 41 관련 신고 요건은 사안·시기·포털 규정에 따라 병행·연계될 수 있으며, PAN·TRC(Tax Residency Certificate)·전자 등록 요건 등에 따라 제출 방식, 포털 절차 및 요구 서류가 달라질 수 있습니다.",
  },
  sec2: {
    title: "2. 주요 적용 대상",
    intro:
      "아래에 해당하는 경우 Form 41(및 관련 절차) 검토가 필요할 수 있습니다. 실제 제출 필요 여부 및 적용 범위는 지급 구조·거래 성격별로 달라질 수 있습니다.",
    items: [
      "한국 본사에 로열티·서비스 대가를 송금하는 인도 법인",
      "해외 법인에 기술료·자문료 등을 지급하는 인도 측 차주",
      "DTAA(이중과세방지협약)상 협약 세율 적용이 필요한 지급 구조",
      "PAN 없이 DTAA 조약세율 적용을 검토하는 해외 법인 또는 비거주 수취인",
      "비거주자를 상대로 한 이자·배당·라이선스·기타 인도 원천소득에 대한 지급",
    ],
  },
  sec3: {
    title: "3. 일반 구비서류",
    intro: "사안·포털 버전에 따라 추가 항목이 있을 수 있으나, 통상 아래를 준비합니다.",
    items: [
      "Tax Residency Certificate(TRC)",
      "여권 또는 해외 법인 등록 증빙 서류",
      "PAN(보유한 경우)",
      "주소 및 국가(거주지) 정보",
      "DTAA 적용 여부 및 적용 세율 검토를 위한 확인 자료",
      "송금·지급 관련 계약서, 인보이스 또는 지급 근거자료",
      "필요 시 Authorisation Letter(위임·대리 제출)",
    ],
    footNote: "첨부 파일 형식·용량 한도는 Income Tax e-Filing Portal 안내를 따릅니다.",
  },
  sec4: {
    title: "4. 일반 진행 절차",
    intro:
      "MSV는 아래 흐름에 맞춰 자료·일정·은행·세무 채널을 조율합니다. 최종 세무 판단 및 신고 책임은 고객의 인도 세무 자문인과 함께 검토·확정하는 것을 권장합니다.",
    steps: [
      "거래 구조 및 지급 성격(royalty, FTS, interest 등) 검토",
      "DTAA 적용 가능 여부 및 요건 정리",
      "TRC 및 비거주자 식별·등록 정보 확인",
      "비거주자 정보 등록(Form 10F·전자등록 체계) 검토 및 제출",
      "적용 세율 및 TDS 산출·반영 방식 검토",
      "송금·외환 신고와 연계된 Form 15CA/CB 필요 여부 검토",
    ],
  },
  sec5: {
    title: "5. 유의사항",
    items: [
      "PAN 보유 여부 등에 따라 적용 세율·절차가 달라질 수 있습니다.",
      "TRC 제출만으로 DTAA 조약세율이 자동 인정되는 것은 아니며, 거래 구조, 지급 성격 및 기재 완결성 등이 함께 검토될 수 있습니다.",
      "전자등록 요건 및 포털 메뉴는 CBDT·Income Tax Portal 개정에 따라 변경될 수 있습니다.",
      "요건 미충족 또는 제출 미비 시 DTAA 감면 적용이 제한되어 일반 세율 기준으로 원천징수(TDS)가 적용될 수 있습니다.",
      "거래 구조에 따라 Form 15CA/CB 및 AD Bank 측 검토가 병행될 수 있습니다.",
    ],
  },
  sec6: {
    title: "6. MSV 지원 범위",
    items: [
      "Form 41 / Form 10F 관련 전자등록·신고(e-filing) 절차 지원",
      "DTAA 적용 검토 및 기본 세율·요건 확인 자료 검토",
      "TRC·PAN·비거주자 정보 등 구비서류 검토",
      "Form 15CA/CB 연계·송금 전 점검 지원",
      "한국 본사·세무법인·회계 담당자와의 협업 및 일정 조율(한국어·영어)",
      "AD Bank 제출 관련 질의 대응 지원(필요 시, 은행별 요건 상이)",
    ],
  },
  sec7: {
    title: "7. 디스클레이머",
    body:
      "본 페이지는 일반적인 참고 정보로만 제공됩니다. 실제 적용 여부·세율·제출 의무는 지급 성격·상대방 구조·조세조약·PAN 보유 여부·세법·고시 개정 등에 따라 달라질 수 있습니다. 개별 거래 구조에 따라 Form 15CA/CB, TRC, FIRC 등 추가 검토가 필요할 수 있습니다. 실행 전 MSV와 상의하세요.",
  },
  sec8: {
    title: "8. 용어",
    entries: [
      {
        term: "Form 41",
        desc: "인도 소득세상 비거주자 정보 제출과 연계된 전자 절차의 하나로, 사안·시기에 따라 Form 10F 문서와 전자등록 요건이 함께 검토됩니다.",
      },
      {
        term: "Form 10F",
        desc: "비거주자 DTAA 적용 관련 정보 제출에 사용되는 양식(전자등록 체계와 함께 운영)",
      },
      { term: "DTAA", desc: "Double Taxation Avoidance Agreement(이중과세방지협약)" },
      { term: "TDS", desc: "Tax Deducted at Source(원천징수)" },
      { term: "TRC", desc: "Tax Residency Certificate(거주 증명)" },
      { term: "PAN", desc: "Permanent Account Number(인도 납세자 식별번호)" },
      { term: "Non-resident", desc: "인도 소득세법상 비거주자" },
      { term: "Form 15CA / 15CB", desc: "대외 송금 시 소득세 신고·검토와 연계되는 양식(사안별)" },
      { term: "FIRC", desc: "Foreign Inward Remittance Certificate(입금 증빙)" },
      { term: "AD Bank", desc: "Authorized Dealer Bank(지정 외국환은행)" },
      { term: "CBDT", desc: "Central Board of Direct Taxes(인도 직접세 중앙 위원회)" },
      { term: "e-Filing Portal", desc: "Income Tax Department 전자신고 포털" },
    ],
  },
  legalMicroCopy: "최종 세무 판단 및 신고 책임은 고객과 인도 현지 세무전문가에게 있습니다.",
  backToServices: "서비스로 돌아가기",
  contactCta: "문의하기",
};

const en: Form41RegistrationServiceCopy = {
  metaTitle: "Form 41 / Form 10F registration and reporting support",
  metaDescription: `${company.shortName} · Form 41 and Form 10F, non-resident information and e-registration, scope, documents, process, DTAA, TDS, TRC, PAN and Form 15CA/CB linkages.`,
  pageTitle: "Form 41 / Form 10F registration and reporting support",
  pageDescription:
    "We structure India income-tax non-resident information submissions and DTAA review steps (including Form 10F and e-registration pathways) and support related TDS and remittance reporting work.",
  sec1: {
    title: "1. Form 41 / Form 10F overview",
    p1:
      "Form 41 is the non-resident information filing used in India in connection with withholding tax (TDS) on India-source income, including to support review of DTAA benefits and reduced TDS where applicable.",
    p2:
      "Form 10F, electronic registration and Form 41-related e-filing requirements can coexist depending on facts, timing and portal rules. Required steps, workflows and documents can vary with PAN, TRC (tax residency certificate) and e-registration conditions.",
  },
  sec2: {
    title: "2. Who typically needs to review this?",
    intro:
      "You may need to review Form 41 (and related steps) in the situations below. Whether a filing is actually required depends on payment structure and the character of each transaction.",
    items: [
      "Indian companies remitting royalties or service fees to a Korean parent",
      "Indian payers remitting technical or advisory fees to overseas entities",
      "Payment structures that need treaty rates under a DTAA",
      "Overseas entities or non-resident payees exploring treaty rates without an Indian PAN",
      "Payments of interest, dividends, licence fees or other India-source income to non-residents",
    ],
  },
  sec3: {
    title: "3. Typical document pack",
    intro: "Additional items may apply by case and portal version, but the following are usually prepared.",
    items: [
      "Tax Residency Certificate (TRC)",
      "Passport or evidence of overseas corporate registration",
      "PAN (if available)",
      "Address and country (residence) information",
      "Supporting materials to review DTAA applicability and treaty rates",
      "Contracts, invoices or other payment support",
      "Authorisation letter where a representative will file",
    ],
    footNote: "Attachment formats and size limits follow the Income Tax e-Filing portal guidance.",
  },
  sec4: {
    title: "4. Typical workflow",
    intro:
      "MSV coordinates documents, timelines and banking/tax channels along the steps below. Final tax positions and filing responsibility should be confirmed with your India tax adviser.",
    steps: [
      "Review transaction structure and payment character (royalty, FTS, interest, etc.)",
      "Document DTAA eligibility and conditions",
      "Validate TRC and non-resident identification/registration details",
      "Review and submit non-resident registration (Form 10F requirements and e-registration pathways, as applicable)",
      "Review applicable rates and how TDS should be calculated and reflected",
      "Assess whether Form 15CA/CB and forex reporting steps are needed alongside remittance",
    ],
  },
  sec5: {
    title: "5. Important notes",
    items: [
      "Rates and procedures can differ depending on PAN availability and other factors.",
      "Submitting a TRC alone does not automatically guarantee a treaty rate; authorities may review transaction structure, payment character and completeness of disclosures.",
      "E-registration requirements and portal menus can change with CBDT and Income Tax Portal updates.",
      "If requirements are incomplete or submissions are deficient, DTAA relief may be limited and withholding (TDS) may apply at general statutory rates.",
      "Depending on the deal, Form 15CA/CB and AD Bank checks may run in parallel.",
    ],
  },
  sec6: {
    title: "6. How MSV can help",
    items: [
      "Support for Form 41 / Form 10F e-registration and e-filing steps",
      "High-level DTAA review and rate/condition checks against your materials",
      "Document review for TRC, PAN and non-resident particulars",
      "Pre-remittance checks linked to Form 15CA/CB",
      "Coordination with Korean HQ, tax firms and accounting teams (Korean/English)",
      "Support on AD Bank queries where needed (requirements vary by bank)",
    ],
  },
  sec7: {
    title: "7. Disclaimer",
    body:
      "This page is general reference information only. Whether relief applies, rates and filing obligations may vary depending on payment character, counterparty structure, treaty position, PAN status, statute and circular updates, and other factors. Some structures may need further review of Form 15CA/CB, TRC, FIRC and more. Discuss your facts with MSV before acting.",
  },
  sec8: {
    title: "8. Glossary",
    entries: [
      {
        term: "Form 41",
        desc: "Electronic steps under Indian income tax tied to non-resident information; Form 10F items and e-registration checks are often reviewed together, depending on the case.",
      },
      {
        term: "Form 10F",
        desc: "Form used for non-resident information supporting DTAA positions, commonly read alongside electronic registration requirements.",
      },
      { term: "DTAA", desc: "Double Taxation Avoidance Agreement" },
      { term: "TDS", desc: "Tax Deducted at Source (withholding)" },
      { term: "TRC", desc: "Tax Residency Certificate" },
      { term: "PAN", desc: "Permanent Account Number (India tax ID)" },
      { term: "Non-resident", desc: "Non-resident for Indian income-tax purposes" },
      { term: "Form 15CA / 15CB", desc: "Forms tied to income-tax review of certain outward remittances (case-specific)" },
      { term: "FIRC", desc: "Foreign Inward Remittance Certificate" },
      { term: "AD Bank", desc: "Authorised dealer bank" },
      { term: "CBDT", desc: "Central Board of Direct Taxes" },
      { term: "e-Filing Portal", desc: "Income Tax Department e-filing portal" },
    ],
  },
  legalMicroCopy:
    "Final tax judgments and filing responsibility rest with the client and their qualified India tax advisers.",
  backToServices: "Back to services",
  contactCta: "Contact us",
};

const zh: Form41RegistrationServiceCopy = {
  metaTitle: "Form 41 / Form 10F 相关登记与申报支持",
  metaDescription: `${company.shortName} · Form 41 与 Form 10F、非居民信息及电子登记，适用情形、资料、流程、注意事项及 DTAA、TDS、TRC、PAN、Form 15CA/CB 衔接。`,
  pageTitle: "Form 41 / Form 10F 相关登记与申报支持",
  pageDescription:
    "梳理印度所得税项下非居民信息提交及 DTAA 适用审阅流程（含 Form 10F 与电子登记路径），并协助相关 TDS 与汇款申报实务。",
  sec1: {
    title: "1. Form 41 / Form 10F 概述",
    p1:
      "Form 41 是印度非居民（Non-resident）就与印度来源所得相关的预扣税（TDS），为申请税收协定（DTAA）待遇及评估是否适用较低预扣税等而提交的非居民信息申报程序。",
    p2:
      "Form 10F、电子登记与 Form 41 相关申报要求可能并存，具体取决于事实、时点与门户规则；所需步骤、流程及材料可能因 PAN、TRC（税务居民证明）及电子登记条件等而异。",
  },
  sec2: {
    title: "2. 主要适用情形",
    intro:
      "下列情形可能需要评估 Form 41（及相关程序）。是否必须申报及适用范围因支付结构与交易性质而异。",
    items: [
      "向韩国总部支付特许权使用费或服务对价的印度法人",
      "向境外法人支付技术费、咨询费等费用的印度付款方",
      "需要按 DTAA（避免双重征税协定）适用协定税率的支付安排",
      "在无印度 PAN 情况下评估协定税率适用的境外法人或非居民收款方",
      "向非居民支付利息、股息、许可费及其他印度来源所得的款项",
    ],
  },
  sec3: {
    title: "3. 一般资料清单",
    intro: "视个案与门户版本可能需补充材料，通常准备如下文件。",
    items: [
      "税务居民证明（TRC, Tax Residency Certificate）",
      "护照或境外法人注册证明类材料",
      "PAN（如有）",
      "地址与国家（居住地）信息",
      "用于判断 DTAA 适用性及协定税率的佐证资料",
      "与汇款/支付相关的合同、发票或支付依据",
      "如需代办：授权书（Authorisation Letter）",
    ],
    footNote: "附件格式与大小限制以 Income Tax e-Filing Portal 说明为准。",
  },
  sec4: {
    title: "4. 一般办理流程",
    intro:
      "MSV 将按下述流程协调资料、日程及银行与税务渠道。最终税务判断与申报责任建议与客户印度税务顾问共同确认。",
    steps: [
      "审阅交易结构与支付性质（特许权使用费、技术服务费、利息等）",
      "梳理 DTAA 适用可能性及条件",
      "核对 TRC 及非居民身份/登记信息",
      "非居民信息登记（Form 10F 与电子登记路径，视个案）审阅与提交",
      "审阅适用税率及 TDS 计算与反映方式",
      "评估与汇款、外汇申报相关的 Form 15CA/CB 是否需要",
    ],
  },
  sec5: {
    title: "5. 注意事项",
    items: [
      "是否持有 PAN 等因素可能导致适用税率与程序不同。",
      "仅凭 TRC 提交并不自动获得协定税率；主管机关可能同时审查交易结构、支付性质及填报完整性。",
      "电子登记要求及门户菜单可能随 CBDT 与 Income Tax Portal 调整而变化。",
      "要件不齐或提交不完整时，协定减免可能受限，源泉扣缴（TDS）可能按一般法定税率适用。",
      "视交易结构，Form 15CA/CB 与 AD Bank 审核可能并行进行。",
    ],
  },
  sec6: {
    title: "6. MSV 可协助范围",
    items: [
      "Form 41 / Form 10F 相关电子登记及电子申报（e-filing）流程协助",
      "DTAA 适用性审阅及基础税率/条件资料核对",
      "TRC、PAN 及非居民信息等资料审阅",
      "与 Form 15CA/CB 衔接的汇款前核对协助",
      "与韩国总部、税务师事务所及会计负责人的协作与日程协调（韩语/英语）",
      "必要时协助应对 AD Bank 问询（各行要求不同）",
    ],
  },
  sec7: {
    title: "7. 免责声明",
    body:
      "本页仅供一般参考。是否适用优惠、税率及申报义务可能因支付性质、对手方结构、税收协定立场、是否持有 PAN、税法及通告修订等因素而不同。个别交易可能尚需审阅 Form 15CA/CB、TRC、FIRC 等。执行前请与 MSV 商议。",
  },
  sec8: {
    title: "8. 术语",
    entries: [
      {
        term: "Form 41",
        desc: "与印度所得税非居民信息提交相关的电子环节之一，视个案常与 Form 10F 材料及电子登记要求一并审阅。",
      },
      {
        term: "Form 10F",
        desc: "用于非居民与 DTAA 适用相关的信息申报表格（常与电子登记体系并行使用）",
      },
      { term: "DTAA", desc: "Double Taxation Avoidance Agreement（避免双重征税协定）" },
      { term: "TDS", desc: "Tax Deducted at Source（源泉扣缴）" },
      { term: "TRC", desc: "Tax Residency Certificate（税务居民证明）" },
      { term: "PAN", desc: "Permanent Account Number（印度纳税人识别号）" },
      { term: "Non-resident", desc: "印度所得税法意义上的非居民" },
      { term: "Form 15CA / 15CB", desc: "与对外汇款所得税申报/复核相关的表格（视个案而定）" },
      { term: "FIRC", desc: "Foreign Inward Remittance Certificate（汇入凭证）" },
      { term: "AD Bank", desc: "Authorized Dealer Bank（指定外汇银行）" },
      { term: "CBDT", desc: "Central Board of Direct Taxes（印度直接税中央委员会）" },
      { term: "e-Filing Portal", desc: "所得税部门电子申报门户" },
    ],
  },
  legalMicroCopy: "最终税务判断与申报责任由客户及其印度当地税务专业人士承担。",
  backToServices: "返回服务页",
  contactCta: "联系我们",
};

export function form41RegistrationServiceCopy(locale: SiteLocale): Form41RegistrationServiceCopy {
  return pickLocale(locale, { ko, en, zh });
}
