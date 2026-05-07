import type { GlossarySection } from "@/lib/india-accounting-glossary-data";
import type { SiteLocale } from "@/lib/site-locale";
import { pickLocale } from "@/lib/site-locale";

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
export function glossaryPhraseIntro(section: GlossarySection, locale: SiteLocale): string | undefined {
  if (section.variant !== "phrase" || !section.phraseIntro) return undefined;
  if (section.id === "india-unique-concepts") {
    return pickLocale(locale, {
      ko: section.phraseIntro,
      en: "India-focused topics that Korean teams often overlook in day-to-day work.",
      zh: "以下主题在印度非常典型，韩国团队在日常工作中却常常忽略。",
    });
  }
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
      ko: "인도 회계·세무 실무 용어집",
      en: "India accounting & tax glossary",
      zh: "印度会计与税务实务术语表",
    }),
    metaDescription: pickLocale(locale, {
      ko: "인도 회계·세무 용어·약어·Form(GSTR-9, Form 83, SPICe+, PF ECR 등) 통합 검색",
      en: "Search India accounting & tax terms, abbreviations and forms (GSTR-9, Form 83, SPICe+, PF ECR, etc.).",
      zh: "印度会计与税务术语、缩写及表格（GSTR-9、Form 83、SPICe+、PF ECR 等）整合检索。",
    }),
    pageHeaderTitle: pickLocale(locale, {
      ko: "인도 회계·세무 실무 용어집",
      en: "India accounting & tax practice glossary",
      zh: "印度会计与税务实务术语表",
    }),
    pageHeaderDescription: pickLocale(locale, {
      ko: "한국어 기준으로 영어·한국어·실무 설명을 묶었습니다. 기본 회계·GST·법인·FEMA·놓치기 쉬운 인도 고유 개념(5절)·급여·감사·약어(4열)에 더해, 소득세·GST·RBI·MCA·노무·무역 관련 Form 표(17~22절), 신고·대응 표현(23절), 인도 실무 운영·대사 중심 요약(24절)을 검색할 수 있습니다.",
      en: "Entries group English, Korean and practice notes (Korean-led). Sections cover core accounting, GST, corporate law, FEMA, India-only concepts (section 5), payroll, audit, four-column abbreviations, income tax/GST/RBI/MCA/labour/trade forms (sections 17–22), filing-desk phrases (section 23) and a reconciliation-focused practice overview (section 24).",
      zh: "以韩语为主整理英语、韩语与实务说明。涵盖基础会计、GST、公司法、FEMA、易被忽略的印度特有概念（第5节）、薪酬、审计、四列表缩写，以及所得税/GST/RBI/MCA/劳工/贸易相关表格（第17–22节）、申报应对用语（第23节）与以对账为中心的实务概要（第24节）。",
    }),
    introCardTitle: pickLocale(locale, {
      ko: "인도 회계·세무 실무 용어집",
      en: "India accounting & tax glossary",
      zh: "印度会计与税务实务术语表",
    }),
    introCardSubtitle: pickLocale(locale, {
      ko: "한국어 기준 정리 · 섹션별 표(3열·4열·Form/용도·표현/의미·요약) · 통합 검색",
      en: "Korean-led index · section tables (3/4 columns, forms, phrases, summaries) · unified search",
      zh: "以韩语为主 · 分节表格（三列/四列、表格用途、用语与摘要）· 统一检索",
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
      ko: "약어·영어·한국어·설명 검색 (예: AP, GSTR, Vendor reconciliation)",
      en: "Search abbr., English, Korean, notes (e.g. AP, GSTR, vendor reconciliation)",
      zh: "搜索缩写、英语、韩语、说明（如 AP、GSTR、供应商对账）",
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
      ko: "본 용어집은 일반 참고용이며, 실무 적용·신고는 최신 법령·고시 및 담당 전문가 확인이 필요합니다.",
      en: "This glossary is for general reference only; filings and practice should follow current law and professional advice.",
      zh: "本术语表仅供一般参考；实务适用与申报请以最新法规及专业人士意见为准。",
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
    fmtSearchResults(filteredLen: number, total: number) {
      return pickLocale(locale, {
        ko: `검색 결과 ${filteredLen}개 / 전체 ${total}개`,
        en: `${filteredLen} results / ${total} total`,
        zh: `找到 ${filteredLen} 条 / 共 ${total} 条`,
      });
    },
    fmtSearchHintFull(total: number) {
      return pickLocale(locale, {
        ko: `전체 ${total}개 · 아래 표에서 섹션별로 확인할 수 있습니다.`,
        en: `${total} entries · browse by section below.`,
        zh: `共 ${total} 条 · 可在下方按分节表格浏览。`,
      });
    },
  };
}
