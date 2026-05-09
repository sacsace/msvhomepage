import type { GlossarySection } from "@/lib/india-accounting-glossary-data";
import type { SiteLocale } from "@/lib/site-locale";
import { pickLocale } from "@/lib/site-locale";

/** 섹션 `id` 직후에 표시할 실무 Tip (검색 모드가 아닐 때만 렌더) */
export type IndiaGlossaryPracticeTip = {
  afterSectionId: string;
  paragraphs: readonly string[];
};

const PRACTICE_TIPS_KO: readonly IndiaGlossaryPracticeTip[] = [
  {
    afterSectionId: "gst-tds",
    paragraphs: [
      "GSTR-2B·매입장부 간 ITC 대사는 월별로 끊어서 확인하는 편이 안전합니다.",
      "mismatch가 누적되면 환급·추가 납부 조정 폭이 커질 수 있습니다.",
    ],
  },
  {
    afterSectionId: "ap-ar",
    paragraphs: [
      "인도에서는 Vendor reconciliation 업무 비중이 매우 큽니다.",
      "GST mismatch 및 미지급 잔액 이슈로 인해 월별 대사가 필수적으로 수행됩니다.",
    ],
  },
  {
    afterSectionId: "corporate",
    paragraphs: [
      "연간 법인 신고(MGT-7 등)·재무제표 제출(AOC-4) 등은 마감 전 증빙·전자서명·이사회 결의 확보 루트를 미리 잡아 두는 것이 MCA 대응에 유리합니다.",
    ],
  },
  {
    afterSectionId: "fema",
    paragraphs: [
      "FC-GPR·FC-TRS 제출 이후에도 RBI(FIRMS) 상태와 주주명부·지분 변동을 주기적으로 맞추어 두면, 이후 양도·증자 이력 추적이 쉬워집니다.",
    ],
  },
];

const PRACTICE_TIPS_EN: readonly IndiaGlossaryPracticeTip[] = [
  {
    afterSectionId: "gst-tds",
    paragraphs: [
      "Reconcile GSTR-2B against your purchase register every month—small ITC gaps compound into large refund or payable swings.",
      "Treat monthly GST books vs. portal mismatches as a control point, not a year-end clean-up.",
    ],
  },
  {
    afterSectionId: "ap-ar",
    paragraphs: [
      "In India, vendor reconciliation typically consumes a large share of finance bandwidth.",
      "GST mismatches and open payable balances mean month-end reconciliation is effectively mandatory, not optional.",
    ],
  },
  {
    afterSectionId: "corporate",
    paragraphs: [
      "For annual MCA filings (e.g. MGT-7, AOC-4), line up evidence, DSC signing and board resolutions before deadline week—ROC queues spike near due dates.",
    ],
  },
  {
    afterSectionId: "fema",
    paragraphs: [
      "After FC-GPR / FC-TRS, keep RBI (FIRMS) status aligned with shareholder registers as capital events stack—this saves time on the next transfer or round.",
    ],
  },
];

const PRACTICE_TIPS_ZH: readonly IndiaGlossaryPracticeTip[] = [
  {
    afterSectionId: "gst-tds",
    paragraphs: [
      "建议按月核对 GSTR-2B 与采购账 ITC，小额差异若累积，退款或补税调整会被放大。",
      "把月度 GST 账册与门户数据差异当作内控节点，而不是年末一次性清理。",
    ],
  },
  {
    afterSectionId: "ap-ar",
    paragraphs: [
      "在印度，供应商对账（vendor reconciliation）往往占用财务团队大量精力。",
      "因 GST 不符与应付未清余额等问题，月末对账在实践中几乎必不可少。",
    ],
  },
  {
    afterSectionId: "corporate",
    paragraphs: [
      "年度 MCA 申报（如 MGT-7、AOC-4）宜提前准备证据链、电子签名与董事会决议，截止前一周排队与补件压力会明显上升。",
    ],
  },
  {
    afterSectionId: "fema",
    paragraphs: [
      "完成 FC-GPR / FC-TRS 后，仍建议定期核对 RBI（FIRMS）状态与股东名册，后续股权转让或增资时追溯更省力。",
    ],
  },
];

const SECTION_TITLES: Record<
  string,
  { ko: string; en: string; zh: string }
> = {
  "basic-accounting": {
    ko: "1. 기본 회계 용어",
    en: "1. Basic accounting terms",
    zh: "1. 基础会计术语",
  },
  "gst-tds": {
    ko: "2. 인도 세무(GST/TDS) 용어",
    en: "2. India tax (GST/TDS) terms",
    zh: "2. 印度税务（GST/TDS）术语",
  },
  corporate: {
    ko: "3. 회사·법인 용어",
    en: "3. Company & corporate terms",
    zh: "3. 公司与法人术语",
  },
  fema: {
    ko: "4. FEMA·외환·송금 용어",
    en: "4. FEMA, foreign exchange & remittance",
    zh: "4. FEMA、外汇与汇款",
  },
  "india-unique-concepts": {
    ko: "5. 놓치기 쉬운 인도 고유 개념",
    en: "5. Easy-to-miss India-specific concepts",
    zh: "5. 易被忽略的印度特有概念",
  },
  payroll: {
    ko: "6. 급여·HR 용어",
    en: "6. Payroll & HR terms",
    zh: "6. 薪酬与人力资源术语",
  },
  audit: {
    ko: "7. 감사·컴플라이언스 용어",
    en: "7. Audit & compliance terms",
    zh: "7. 审计与合规术语",
  },
  phrases: {
    ko: "8. 실무에서 자주 쓰는 표현",
    en: "8. Common workplace phrases",
    zh: "8. 实务常用表达",
  },
  "ap-ar": {
    ko: "9. AP / AR 계열",
    en: "9. AP / AR",
    zh: "9. 应付/应收账款相关",
  },
  "accounts-abbr": {
    ko: "10. 회계(Accounts) 약어",
    en: "10. Accounting abbreviations",
    zh: "10. 会计缩写",
  },
  procurement: {
    ko: "11. 구매·물류·재고",
    en: "11. Procurement, logistics & inventory",
    zh: "11. 采购、物流与库存",
  },
  "gst-abbr": {
    ko: "12. 세무·GST",
    en: "12. Tax & GST abbreviations",
    zh: "12. 税务与 GST 缩写",
  },
  "payroll-abbr": {
    ko: "13. 급여·HR",
    en: "13. Payroll & HR abbreviations",
    zh: "13. 薪酬与 HR 缩写",
  },
  "fema-trade": {
    ko: "14. FEMA·송금·무역",
    en: "14. FEMA, remittance & trade",
    zh: "14. FEMA、汇款与贸易",
  },
  erp: {
    ko: "15. ERP·관리·보고",
    en: "15. ERP, management & reporting",
    zh: "15. ERP、管理与报告",
  },
  "team-expressions": {
    ko: "16. 인도 회계팀에서 정말 많이 쓰는 표현",
    en: "16. Phrases India accounting teams use often",
    zh: "16. 印度会计团队常用表达",
  },
  "forms-income-tax": {
    ko: "17. 소득세(TDS / 법인세) 관련 Form",
    en: "17. Income tax forms (TDS / corporate)",
    zh: "17. 所得税相关表格（TDS/法人税）",
  },
  "forms-gst": {
    ko: "18. GST 관련 Form",
    en: "18. GST-related forms",
    zh: "18. GST 相关表格",
  },
  "forms-fema-rbi": {
    ko: "19. FEMA / FDI / RBI 관련 Form",
    en: "19. FEMA / FDI / RBI forms",
    zh: "19. FEMA/FDI/RBI 相关表格",
  },
  "forms-mca": {
    ko: "20. 회사법(MCA/ROC) 관련 Form",
    en: "20. Companies Act (MCA/ROC) forms",
    zh: "20. 公司法（MCA/ROC）相关表格",
  },
  "forms-payroll": {
    ko: "21. 급여·노무 관련 Form",
    en: "21. Payroll & labour forms",
    zh: "21. 薪酬与劳工相关表格",
  },
  "forms-trade": {
    ko: "22. 수출입·무역 관련 Form",
    en: "22. Import/export & trade forms",
    zh: "22. 进出口与贸易相关表格",
  },
  "phrases-compliance-desk": {
    ko: "23. 실무에서 정말 자주 쓰는 표현 (신고·대응)",
    en: "23. Common filing & response phrases",
    zh: "23. 申报与应对常用表达",
  },
  "india-practice-focus": {
    ko: "24. 인도 회계 실무 특징",
    en: "24. Features of India accounting practice",
    zh: "24. 印度会计实务特点",
  },
};

export function glossarySectionTitle(section: Pick<GlossarySection, "id" | "titleKo">, locale: SiteLocale): string {
  const row = SECTION_TITLES[section.id];
  if (!row) return section.titleKo;
  return pickLocale(locale, row);
}

export function glossaryPhraseHeaders(
  section: GlossarySection,
  locale: SiteLocale,
): readonly [string, string] {
  const base = section.phraseColumns;
  if (!base) {
    return pickLocale(locale, {
      ko: ["영어 표현", "한국어 의미"],
      en: ["English phrase", "Korean meaning"],
      zh: ["英语用语", "韩语释义"],
    });
  }
  if (base[0] === "용어" && base[1] === "설명") {
    return pickLocale(locale, {
      ko: ["용어", "설명"],
      en: ["Term", "Description"],
      zh: ["术语", "说明"],
    });
  }
  if (base[0] === "표현" && base[1] === "의미") {
    return pickLocale(locale, {
      ko: ["표현", "의미"],
      en: ["Phrase", "Meaning"],
      zh: ["用语", "含义"],
    });
  }
  return [...base] as [string, string];
}

/** phrase + phraseIntro: 표 위 안내(섹션별 다국어 가능) */
export function glossaryPhraseIntro(section: GlossarySection, _locale: SiteLocale): string | undefined {
  if (section.variant !== "phrase" || !section.phraseIntro) return undefined;
  return section.phraseIntro;
}

export type IndiaGlossaryTableLabels = {
  abbr: string;
  english: string;
  korean: string;
  description: string;
  form: string;
  purpose: string;
  practiceNote: string;
};

function tableLabels(locale: SiteLocale): IndiaGlossaryTableLabels {
  return pickLocale(locale, {
    ko: {
      abbr: "약어",
      english: "영어",
      korean: "한국어",
      description: "설명",
      form: "Form",
      purpose: "용도",
      practiceNote: "실무 설명",
    },
    en: {
      abbr: "Abbr.",
      english: "English",
      korean: "Korean",
      description: "Notes",
      form: "Form",
      purpose: "Purpose",
      practiceNote: "Practice notes",
    },
    zh: {
      abbr: "缩写",
      english: "英语",
      korean: "韩语",
      description: "说明",
      form: "表格",
      purpose: "用途",
      practiceNote: "实务说明",
    },
  });
}

export function indiaAccountingGlossaryCopy(locale: SiteLocale) {
  const table = tableLabels(locale);
  return {
    metaTitle: pickLocale(locale, {
      ko: "인도 회계·세무 실무 지식 베이스",
      en: "India accounting & tax practice knowledge base",
      zh: "印度会计与税务实务知识库",
    }),
    metaDescription: pickLocale(locale, {
      ko: "인도 회계·세무 용어·약어·Form과 섹션별 실무 Tip. GSTR-9, Form 83, SPICe+, PF ECR 등 통합 검색",
      en: "India accounting & tax terms, abbreviations, forms and section-level practice tips—search in one place (GSTR-9, Form 83, SPICe+, PF ECR, etc.).",
      zh: "印度会计与税务术语、缩写、表格及分节实务提示，一站式检索（GSTR-9、Form 83、SPICe+、PF ECR 等）。",
    }),
    pageHeaderTitle: pickLocale(locale, {
      ko: "인도 회계·세무 실무 지식 베이스",
      en: "India accounting & tax practice knowledge base",
      zh: "印度会计与税务实务知识库",
    }),
    pageHeaderDescription: pickLocale(locale, {
      ko: "한국 기업 기준으로 인도 회계·GST·법인·FEMA 실무 용어를 정리했습니다.\n영어·한국어·실무 설명을 함께 제공하며,\n회계·세무·노무·송금·MCA·RBI 실무 표현까지 통합 검색할 수 있습니다.",
      en: "We index India accounting, GST, corporate and FEMA practice terms for Korean companies.\nEnglish, Korean and short practice notes sit together,\nand you can search across accounting, tax, payroll, remittances, MCA and RBI wording in one place.",
      zh: "面向韩国企业整理印度会计、GST、公司法与 FEMA 实务用语。\n英语、韩语与实务说明并列呈现，\n并支持对会计、税务、劳工、汇款、MCA、RBI 等表述的一体化检索。",
    }),
    introCardTitle: pickLocale(locale, {
      ko: "인도 회계·세무 실무 지식 베이스",
      en: "India accounting & tax practice knowledge base",
      zh: "印度会计与税务实务知识库",
    }),
    introCardSubtitle: pickLocale(locale, {
      ko: "단순 용어 사전이 아니라, 표와 함께 섹션 사이에 실무 Tip을 두었습니다.\n한국어 기준 정리 · 3열·4열·Form·표현 · 통합 검색",
      en: "More than a dictionary: tables plus practice tip callouts between sections.\nKorean-led · 3/4-column tables, forms, phrases · unified search",
      zh: "不仅是术语表：各节表格之间穿插实务提示。\n以韩语为主 · 三/四列表格、表格与用语 · 统一检索",
    }),
    practiceTipLabel: pickLocale(locale, {
      ko: "실무 Tip",
      en: "Practice tip",
      zh: "实务提示",
    }),
    practiceTips: pickLocale(locale, {
      ko: PRACTICE_TIPS_KO,
      en: PRACTICE_TIPS_EN,
      zh: PRACTICE_TIPS_ZH,
    }),
    contentNote: pickLocale(locale, {
      ko: "",
      en: "Table body text is mainly Korean practice wording; search matches English/Korean/notes fields.",
      zh: "表内正文多为韩语实务表述；检索支持英语、韩语及说明栏。",
    }),
    searchLabel: pickLocale(locale, {
      ko: "용어 검색",
      en: "Search glossary",
      zh: "搜索术语",
    }),
    searchPlaceholder: pickLocale(locale, {
      ko: "예: GSTR, Vendor reconciliation, FC-GPR, AP",
      en: "e.g. GSTR, Vendor reconciliation, FC-GPR, AP",
      zh: "例：GSTR、Vendor reconciliation、FC-GPR、AP",
    }),
    noResults: pickLocale(locale, {
      ko: "검색어와 일치하는 용어가 없습니다. 다른 키워드를 입력해 보세요.",
      en: "No matches. Try a different keyword.",
      zh: "没有匹配结果，请尝试其他关键词。",
    }),
    searchResultsHeading: pickLocale(locale, {
      ko: "검색 결과",
      en: "Search results",
      zh: "搜索结果",
    }),
    disclaimer: pickLocale(locale, {
      ko: "본 지식 베이스는 일반 참고용이며, 실무 적용·신고는 최신 법령·고시 및 담당 전문가 확인이 필요합니다.",
      en: "This knowledge base is for general reference only; filings and practice should follow current law and professional advice.",
      zh: "本知识库仅供一般参考；实务适用与申报请以最新法规及专业人士意见为准。",
    }),
    backToServices: pickLocale(locale, {
      ko: "서비스로 돌아가기",
      en: "Back to services",
      zh: "返回服务",
    }),
    contact: pickLocale(locale, {
      ko: "문의하기",
      en: "Contact us",
      zh: "联系我们",
    }),
    table,
    fmtSearchResults(filteredLen: number) {
      return pickLocale(locale, {
        ko: `검색 결과 ${filteredLen}건입니다.`,
        en: `${filteredLen} result${filteredLen === 1 ? "" : "s"}.`,
        zh: `找到 ${filteredLen} 条结果。`,
      });
    },
    fmtSearchHintFull() {
      return pickLocale(locale, {
        ko: "분야별 실무 용어를 계속 보완하고 있으며, 회계·GST·FEMA·노무·감사 등은 아래 표에서 섹션별로 확인할 수 있습니다. 일부 구간에는 실무 Tip 박스가 함께 표시됩니다.",
        en: "We keep adding and refining terms by topic—browse the section tables below for accounting, GST, FEMA, payroll, audit and more. Practice tip callouts appear after selected sections.",
        zh: "我们按主题持续补充实务用语；会计、GST、FEMA、薪酬、审计等请在下方的分节表中浏览，部分节后附有实务提示框。",
      });
    },
  };
}
