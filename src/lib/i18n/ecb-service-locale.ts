import type { SiteLocale } from "@/lib/site-locale";
import { pickLocale } from "@/lib/site-locale";
import { company } from "@/lib/site-content";

export type EcbQaBlock = { title: string; question: string; answer: string };

export type EcbGuideCopy = {
  metaTitle: string;
  metaDescription: string;
  pageTitle: string;
  pageDescription: string;
  bankChannel: { title: string; body: string };
  whatEcb: { title: string; body: string };
  types: { title: string; items: readonly string[] };
  autoRoute: {
    title: string;
    intro: string;
    limitsTitle: string;
    limitsItems: readonly string[];
    useTitle: string;
    useBody: string;
  };
  procedure: { title: string; steps: readonly string[]; note: string };
  qa: { title: string; intro: string; blocks: readonly EcbQaBlock[] };
  documents: { title: string; items: readonly string[] };
  penalties: {
    title: string;
    intro: string;
    /** 표 상단에 강조 표시(예시임을 명확히) */
    exampleLabel: string;
    colDelay: string;
    colFine: string;
    rows: readonly { delay: string; fine: string }[];
    /** 표 하단: 실제 금액은 규정에 따름 */
    footnote: string;
  };
  firc: { title: string; paragraphs: readonly string[] };
  prosCons: { title: string; items: readonly string[] };
  glossary: { title: string; entries: readonly { term: string; desc: string }[] };
  references: { title: string; firmsLead: string; disclaimer: string };
  /** 내부 링크(관련 실무) */
  relatedPractice: { title: string; links: readonly { label: string; path: string }[] };
  backToServices: string;
  contactCta: string;
};

const ko: EcbGuideCopy = {
  metaTitle: "ECB(FEMA 외화차입) 실무 안내",
  metaDescription: `${company.shortName} — 인도 ECB(대외상업차입·FEMA) 개념·자동승인·RBI 신고·Form 83·LRN·ECB-2·FIRMS·협력 은행 안내`,
  pageTitle: "ECB(FEMA 외화차입) 실무 안내",
  pageDescription:
    "대외상업차입(ECB)은 RBI·FEMA 규정에 따라 차입 가능 주체(Borrower), 대주(Lender), 자금 용도(End-use), 만기(MAMP), 통화 및 보고 체계가 관리되는 대표적인 외화 조달 방식입니다. 아래는 실무 절차와 컴플라이언스 포인트를 정리한 참고 안내이며, 실행·신고는 최신 Master Direction·고시 및 개별 사안을 따릅니다.",
  bankChannel: {
    title: "은행 채널 및 전국 서비스",
    body:
      "MSV는 기업 뱅킹·ECB·FEMA 연계 업무를 주로 KEB Hana Bank, ICICI Bank, Kotak Mahindra Bank 등과 협력하며 실무 협의 및 신고 절차 조율을 지원합니다. 인도 전역의 AD Bank(Authorized Dealer Bank, 지정 외국환은행) 네트워크를 통한 자금 수취·환전·신고 연계 지원도 가능합니다(은행별 취급 조건·KYC 상이).",
  },
  whatEcb: {
    title: "1. ECB란",
    body:
      "ECB(External Commercial Borrowing)는 인도 거주자(법인 등)가 비거주자로부터 조달하는 상업적 외화 차입입니다. 대출, 비전환사채(NCD) 등 전통적 차입 외에도 일부 전환형 금융상품 및 외화차입 구조는 관련 규정에 따라 ECB 범위 검토 대상이 될 수 있습니다. FEMA (Borrowing and Lending in Foreign Exchange) Regulations 및 RBI Master Direction — External Commercial Borrowings, Trade Credit… 등에 따라 승인, 한도 및 보고 의무 등이 관리됩니다.",
  },
  types: {
    title: "2. ECB의 주요 유형·대주",
    items: [
      "해외 금융기관 대출, 해외 모회사·주주(Foreign Equity Holder) 대여금 등",
      "전환사채(FCCB), 교환사채(FCEB), 기타 유가증권 또는 금융리스 형태의 거래는 관련 시기 및 규정에 따라 ECB로 분류·요건이 달라질 수 있습니다.",
      "대주 예: 국제은행, 수출신용기관, 다자개발은행(IFC, ADB 등), 외국 주주·장기투자자, 설비 공급자 등(자격·한도별로 허용 범위 상이).",
    ],
  },
  autoRoute: {
    title: "3. 자동승인(Automatic route) 개요",
    intro:
      "차입은 자동승인 루트와 사전승인(Approval) 루트로 나뉩니다. 자격요건, 차입한도, 최소 평균만기(MAMP), 통화(FCY/INR), 레버리지, 금리 상한(All-in-cost), 자금 사용 목적 등을 우선 검토해야 하며, 조건 미충족 시 사전 승인(Approval Route) 검토 또는 구조 조정이 필요할 수 있습니다.",
    limitsTitle: "3.1. 한도·만기·통화(요지)",
    limitsItems: [
      "FCY ECB / INR ECB: 허용 통화 및 업종별 제한 요건이 상이합니다(제조·소프트웨어·해운·항공 등이 FCY에서 흔한 예시).",
      "대출 한도·레버리지: 최근 결산연도 기준 한도·자기자본 대비 배수 등 규정이 있습니다(해외 모회사·주주 대여금은 별도 배수·소액 예외 등).",
      "MAMP(최소평균만기): 차입 유형·금액에 따라 3년·5년·10년 등 요구가 달라집니다. 분할상환 구조에 따라 \"평균만기(MAMP)\" 산정 방식이 달라질 수 있어 대출 구조 설계가 중요합니다.",
      "금리(All-in-cost): 벤치마크+스프레드 상한, 연체료·중도상환 수수료 등 부대비용 한도 등이 규정됩니다(시기별 RBI 벤치마크 금리 기준 변경에 유의해야 합니다).",
    ],
    useTitle: "3.2. 자금용도(요지)",
    useBody:
      "기본적으로 시설자금(Capex) 성격이 중심입니다. 건물·기계 취득 등은 일반적으로 허용되는 반면, 부동산 투기 목적 부지·자본시장 투자 등은 제한되는 경우가 많습니다. 운전자금 등 일부 용도는 차입 구조·차입 주체·만기(MAMP) 조건에 따라 제한되거나 별도 조건이 적용될 수 있습니다(해외 모회사·주주 대여금 등 별도 루트는 만기·한도 규정이 상이).",
  },
  procedure: {
    title: "4. ECB 실행 및 RBI 신고 절차 (AD Bank 기준)",
    steps: [
      "AD Bank 지정 후 차주(Borrower)·대주(Lender) 간 Loan Agreement 체결",
      "법률·회계 검토를 거쳐 Form 83 등 신청서류를 작성하고, 은행 심사(평균만기 산출 포함)를 진행합니다.",
      "AD Bank가 RBI에 서류 제출 후 ECB 등록번호(LRN, Loan Registration Number) 발급 및 RBI 등록 절차를 진행합니다.",
      "LRN 발급 후 인출(Drawdown) 가능. 이후 사후보고(ECB-2 등)를 FIRMS 등 전자 채널로 제출합니다. 제출 기한 및 보고 항목은 RBI 고시 및 등록 조건에 따라 달라질 수 있습니다.",
    ],
    note:
      "내부 매뉴얼 기준 Form 83는 계약일 기준 7일 이내 제출을 전제로 하는 사례가 많고, LRN 부여 후 익월 초·10일 전후 등 ECB-2 제출이 운영되는 사례도 있습니다. 실제 제출 기한은 RBI 고시·은행 안내를 확인해야 합니다.",
  },
  qa: {
    title: "5. ECB 진행 Q&A",
    intro:
      "아래는 실무 진행 시 자주 확인하는 항목을 Q&A 형식으로 정리한 것입니다. 금액·금리·세율 등은 RBI 규정, 이중과세방지협약(DTAA), 대출 구조 등에 따라 달라질 수 있으므로 참고용으로만 활용하시기 바랍니다.",
    blocks: [
      {
        title: "5.1. 준비 사항 및 소요 기간",
        question: "대여금을 받기 위해 어떤 준비가 필요하며, 인도 현지법인이 투자(인출)금을 사용하기까지 대략 얼마나 걸리나요?",
        answer:
          "ECB로 진행할 경우 RBI 측 승인·등록(LRN 등)이 통상 약 2주 내외에 이뤄지는 사례가 많고, 이후 투자금 송금 및 현지 은행 입금 처리에는 약 3~4영업일 정도가 소요될 수 있습니다. 구비서류가 완비되어 있다면 전체적으로 약 1개월 전후를 일정 산정의 참고치로 보는 경우가 많습니다(개별 사안·은행·검토량에 따라 상이).",
      },
      {
        title: "5.2. 차입(회수) 가능 한도",
        question: "ECB로 조달 가능한 규모는 어느 정도인가요?",
        answer:
          "차입 가능 규모는 차입 주체·업종·자동승인(Automatic route) 적용 여부·인프라 등 트랙 구분 및 당시 RBI Master Direction·고시에 따라 달라집니다. 관련 배수·한도·예외 규정은 수시로 개정되므로, 접수 전 최신 규정과 개별 재무·거래 구조를 함께 검토하는 것이 안전합니다.\n※ 참고: 과거 일부 ECB Track 기준으로 Automatic Route 연간 한도 및 순자산 연계 규정이 운영된 사례가 있으나, 실제 적용은 당시 RBI 공지·차입 구조 기준에 따라 달라질 수 있습니다.",
      },
      {
        title: "5.3. 이자율(상환 시 부담)",
        question: "상환해야 할 이자(수익금)에 적용될 금리는 어느 범위까지 가능한가요?",
        answer:
          "ECB 금리는 RBI가 허용하는 All-in-cost 범위 내에서 시장 금리·벤치마크·스프레드 구조에 따라 결정됩니다. (참고·예시: 일부 자료에서 벤치마크 대비 약 4.5%p 수준의 상한을 들어 설명한 바 있으나, 시기·통화·상품에 따라 달라지며 현행 고시를 반드시 확인해야 합니다.) 이자는 원금 상환 흐름과 맞추어 원금과 함께 송금·결제되는 구조가 일반적입니다.",
      },
      {
        title: "5.4. 상환 금액·상환 기간",
        question: "매월 또는 매년 상환할 수 있는 원금과 이자(수익금)의 상한은 어떻게 되나요?",
        answer:
          "상환 스케줄·액은 대출 계약서와 상환 방식(일시·분할)에 따라 달라지며, 일률적인 월별·연별 상환액 구조가 모든 사안에 동일하게 적용되는 것은 아닙니다. 실무에서는 상환기간을 약 1년~10년 수준으로 설계하는 사례가 많습니다(MAMP 등 규제와 정합 필요).",
      },
      {
        title: "5.5. 본사 송금 시 조세(TDS)",
        question: "본사(해외)로 원금·이자를 상환·송금할 때 소득세율은 어떻게 되나요?",
        answer:
          "일반적으로 원금 상환 자체에는 별도의 소득세가 부과되지 않습니다. 이자 송금의 경우 인도에서 TDS(원천징수)가 약 5~10% 부담되는 사례가 논의될 수 있으나, 이중과세방지협약(DTAA)·대주 국적·차입 구조·이자 성격에 따라 달라지므로 구체적인 대출 구조에 따른 사전 검토가 필요할 수 있습니다(Form 15CA/CB 등).",
      },
    ],
  },
  documents: {
    title: "6. 구비서류 예시 (Automatic Route 기준)",
    items: [
      "회사 요청서(Request letter)",
      "Form 83 (RBI 신고 양식, 통상 2부 제출) 및 평균만기 산출 자료",
      "Loan Agreement — 대주·차주, 금액(FCY), 기간, 인출·상환, 금리, 이자 지급, 자금 사용 목적, 투자 지출 사유 및 사용 계획(재무자료 포함) 등",
      "차입자 정관(Memorandum of Association)",
      "차입자 최근 3개년 재무제표",
      "대주가 기존 외국인 투자자인 경우 FC-GPR 등 기존 FDI 신고자료",
      "ECB 실행 관련 이사회 결의(Board Resolution)",
    ],
  },
  penalties: {
    title: "7. 지연 제재(보고·예시)",
    intro:
      "보고 지연에 따른 과태료·복합(Compounding) 등 구조는 RBI 규정에 따라 변경될 수 있습니다. 아래 표는 과거 자료에서 인용한 참고용 예시일 뿐이며, 실제 적용 금액·절차는 당시 RBI 규정 및 지연 유형에 따라 달라질 수 있습니다.",
    exampleLabel: "예시 기준(참고용)",
    colDelay: "지연 기간(예시)",
    colFine: "금액(예시)",
    rows: [
      { delay: "30일 이하", fine: "INR 5,000" },
      { delay: "3년 이하", fine: "INR 50,000" },
      { delay: "3년 초과", fine: "INR 100,000" },
    ],
    footnote:
      "상기 금액·구간은 교육용 예시이며 법적 구속력이 없습니다. 실제 부과·복합 여부는 접수 시점의 RBI 고시, 은행 안내 및 개별 사안을 반드시 확인하시기 바랍니다.",
  },
  firc: {
    title: "8. FIRC·전자신고(FIRMS)",
    paragraphs: [
      "FIRC(Foreign Inward Remittance Certificate)는 AD Bank가 발행하는 송금 증빙으로, 자본금 납입, ECB 인출 등 외화 유입 사실을 확인하는 데 사용됩니다. ECB·FDI 관련 외화 유입 및 보고 절차는 FIRMS 포털과 연계되는 경우가 많습니다.",
      "전자 신고가 보편화되면서 FIRMS 등 포털 업로드·UIN 발급 절차가 사용됩니다. 양식 작성, 첨부서류 스캔 및 등록 업무는 일반적으로 전문가 검토를 거쳐 진행됩니다.",
    ],
  },
  prosCons: {
    title: "9. 장·단점 및 기타",
    items: [
      "장점: USD/EUR 등 외화 기반 역외 조달로 상대적으로 낮은 금리 활용 가능",
      "단점: 이자·원금 상환 시 환율 리스크; 자금 사용 목적이 시설자금(Capex) 중심으로 제한되는 경우가 많음(해외 모회사·주주 대여금 등 예외는 별도 만기·조건)",
      "인출금 운용: 단기 금융상품 예치 등의 운용은 규정 범위 내 허용 사항이 있을 수 있음",
      "대환(Refinancing), 증액, 금리 변경, 만기 연장 등은 RBI 규정 범위 내에서 허용될 수 있음",
      "대주 국가(예: 한국)의 외환·대외거래 규정에 따른 사전 신고·승인 필요 여부는 별도 확인이 필요합니다(지정 외국환거래은행·한국은행 등).",
    ],
  },
  glossary: {
    title: "10. 용어",
    entries: [
      { term: "ECB", desc: "External Commercial Borrowings" },
      { term: "AD Bank", desc: "Authorized Dealer Bank(지정 외국환은행)" },
      { term: "LRN", desc: "Loan Registration Number" },
      { term: "FIRC", desc: "Foreign Inward Remittance Certificate" },
      { term: "MAMP", desc: "Minimum average maturity period" },
      { term: "FIRMS", desc: "RBI 외국인 투자·차입 보고 포털" },
    ],
  },
  references: {
    title: "참고 링크",
    firmsLead: "RBI FIRMS:",
    disclaimer:
      "본 페이지는 MSV 내부 자료(자금조달·ECB 개요, 2020) 및 업계 안내(ECB 주요 안내사항 등)를 바탕으로 재편집한 참고용 요약입니다. RBI Master Direction·고시·환율·세법은 수시로 개정되므로 실행·신고·원천징수(예: Form 15CA/CB) 일정은 MSV와 상담 후 확정하시기 바랍니다.",
  },
  relatedPractice: {
    title: "관련 실무",
    links: [
      { label: "FC-GPR", path: "/services/corporate-incorporation" },
      { label: "Form 15CA / Form 15CB", path: "/services/form-41-registration" },
      { label: "DTAA", path: "/services/form-41-registration" },
      { label: "TRC", path: "/services/form-41-registration" },
      { label: "ODI", path: "/services/india-accounting-glossary" },
    ],
  },
  backToServices: "회계 서비스로 돌아가기",
  contactCta: "문의하기",
};

const en: EcbGuideCopy = {
  metaTitle: "ECB (FEMA external borrowing) — practical guide",
  metaDescription: `${company.shortName} — India ECB / FEMA external commercial borrowing: concepts, automatic route, RBI filings, Form 83, LRN, ECB-2, FIRMS and banking partners.`,
  pageTitle: "ECB (External Commercial Borrowing) — practical guide",
  pageDescription:
    "External commercial borrowing (ECB) is a regulated foreign-currency funding path under RBI and FEMA where borrower category, lender eligibility, end-use, maturity (MAMP), currency and reporting are managed together. This page summarises practical steps and compliance points for reference only; execution and filings must follow the latest Master Directions, circulars and your facts.",
  bankChannel: {
    title: "Banking channels and nationwide coverage",
    body:
      "For corporate banking, ECB and FEMA-linked work MSV typically coordinates with institutions such as KEB Hana Bank, ICICI Bank and Kotak Mahindra Bank on day-to-day discussions and reporting timelines. We can also support receipt, conversion and reporting through the nationwide AD Bank (authorised dealer) network, subject to each bank’s policies and KYC.",
  },
  whatEcb: {
    title: "1. What is ECB?",
    body:
      "ECB (External Commercial Borrowing) is commercial foreign-currency borrowing by Indian residents (e.g. companies) from non-residents. Besides traditional loans and non-convertible debentures (NCDs), certain convertible-style instruments and foreign-currency structures may fall within ECB review depending on the rules in force. Approvals, caps and reporting are governed by the FEMA (Borrowing and Lending in Foreign Exchange) Regulations and RBI Master Direction — External Commercial Borrowings, Trade Credit, etc.",
  },
  types: {
    title: "2. Main ECB types and lenders",
    items: [
      "Loans from overseas financial institutions; loans from foreign parent or equity holders, etc.",
      "FCCBs, FCEBs and other securities or finance-lease structures may be classified as ECB with different requirements depending on timing and rules.",
      "Typical lenders: international banks, export credit agencies, multilateral lenders (IFC, ADB, etc.), foreign shareholders/long-term investors, equipment suppliers (eligibility and caps vary).",
    ],
  },
  autoRoute: {
    title: "3. Automatic route — overview",
    intro:
      "Borrowings are split between the automatic route and the prior-approval route. You should first assess eligibility, borrowing caps, minimum average maturity (MAMP), currency (FCY/INR), leverage, all-in-cost ceilings and permitted end-uses. If conditions are not fully met, you may need the approval route or a structural rethink rather than assuming automatic-route access.",
    limitsTitle: "3.1. Caps, maturity and currency (headlines)",
    limitsItems: [
      "FCY ECB vs INR ECB: permitted currencies and sector-specific conditions differ (manufacturing, software, shipping and aviation are common FCY examples).",
      "Borrowing caps and leverage: limits and multiples of net worth based on recent audited financials apply (foreign parent/equity-holder loans have separate multiples and small-ticket exceptions).",
      "MAMP: minimum average maturity requirements vary by instrument and amount (e.g. 3, 5 or 10 years). Amortisation design affects how “average maturity” is calculated.",
      "All-in-cost: benchmark plus spread caps, caps on penal interest and prepayment fees, etc. (watch RBI benchmark updates over time).",
    ],
    useTitle: "3.2. End-use (headlines)",
    useBody:
      "End-use is generally capex-led. Plant and machinery acquisition is typically permitted, while speculative land and capital-market uses are often restricted. Certain working-capital purposes may be limited or subject to extra conditions depending on borrower category, structure, maturity (MAMP) and the track you rely on (foreign parent/equity-holder facilities can carry different maturity and cap rules).",
  },
  procedure: {
    title: "4. Execution and RBI reporting (AD Bank perspective)",
    steps: [
      "Appoint an AD Bank and execute a loan agreement between borrower and lender.",
      "After legal and accounting review, prepare Form 83 and supporting papers and complete the bank’s credit process (including MAMP calculations).",
      "The AD Bank files with RBI to obtain an ECB loan registration number (LRN) and complete the RBI registration steps (an LRN is not the same thing as a standalone “regulatory approval” in every sense).",
      "After the LRN, drawdowns are permitted. Post-filing reports (e.g. ECB-2) are submitted electronically via FIRMS or other channels; deadlines and fields follow RBI circulars and registration conditions.",
    ],
    note:
      "Many internal playbooks target Form 83 within about seven days of signing; ECB-2 cycles often run around the start of the following month or ~10 days after LRN issuance. Always confirm the latest RBI circulars and your bank’s instructions.",
  },
  qa: {
    title: "5. ECB Q&A",
    intro:
      "Common practical questions are summarised below. Amounts, rates and tax outcomes depend on RBI rules, DTAA, lender residence and deal structure — treat this as orientation only.",
    blocks: [
      {
        title: "5.1. Preparation and timing",
        question:
          "What preparation is needed to receive funds, and roughly how long until an Indian subsidiary can use drawdowns?",
        answer:
          "RBI registration (LRN, etc.) often completes in about two weeks; inbound remittance and local bank crediting may take roughly three to four business days thereafter. With complete documentation, many teams use about one month end-to-end as a planning benchmark (varies by bank, queue and facts).",
      },
      {
        title: "5.2. Borrowing capacity",
        question: "How large can an ECB be?",
        answer:
          "Borrowing headroom depends on the borrower’s sector, category, whether you rely on the automatic or approval route, infrastructure track and the RBI Master Direction in force at the time. Multiples, caps and carve-outs change with circulars—validate the latest rules against your audited financials and deal structure before filing.\n※ Note: Some historical ECB tracks operated automatic-route annual limits and net-worth-linked rules, but what actually applies will follow the RBI notices in force and your borrowing structure.",
      },
      {
        title: "5.3. Interest pricing",
        question: "What interest range typically applies on interest/profit remittances?",
        answer:
          "ECB pricing is negotiated within RBI’s permitted all-in-cost framework, driven by market levels, benchmark selection and spread structure. (Illustrative only: some training decks once illustrated all-in-cost caps using spreads in the ~4.5%p over benchmark range—always confirm the benchmark and circular in force.) Interest is usually remitted together with principal according to the repayment schedule.",
      },
      {
        title: "5.4. Repayment amounts and tenor",
        question: "Is there a fixed monthly or annual cap on principal and interest repayments?",
        answer:
          "Repayment amounts follow the facility agreement and amortisation design; there is no single universal monthly/annual cap. In practice tenors are often structured around one to ten years, subject to MAMP and other rules.",
      },
      {
        title: "5.5. Withholding on remittances to HQ",
        question: "What income-tax withholding applies when remitting principal and interest overseas?",
        answer:
          "Principal repayment generally does not attract Indian income tax as such. Interest remittances may attract Indian TDS often discussed in the ~5–10% range, but DTAA, lender residence and instrument character can change outcomes — obtain deal-specific advice (including Form 15CA/CB where relevant).",
      },
    ],
  },
  documents: {
    title: "6. Illustrative document pack (automatic route)",
    items: [
      "Borrower request letter",
      "Form 83 (RBI format, commonly two copies) and MAMP working papers",
      "Loan agreement — parties, FCY amount, tenor, drawdown/repayment, interest, use of funds, capex rationale and plan (including financials)",
      "Borrower’s memorandum of association",
      "Borrower’s audited financial statements for the last three years",
      "Where the lender is an existing foreign investor: prior FDI filings such as FC-GPR",
      "Board resolution authorising the ECB",
    ],
  },
  penalties: {
    title: "7. Late-filing penalties (illustrative)",
    intro:
      "Compounding, late submission fees and similar mechanics can change with RBI regulations. The grid below is a non-binding illustration drawn from older reference materials; actual amounts depend on the rules in force and the nature of the delay.",
    exampleLabel: "Illustrative only — not legal advice",
    colDelay: "Delay (illustrative)",
    colFine: "Amount (illustrative)",
    rows: [
      { delay: "Up to 30 days", fine: "INR 5,000" },
      { delay: "Up to 3 years", fine: "INR 50,000" },
      { delay: "Beyond 3 years", fine: "INR 100,000" },
    ],
    footnote:
      "These figures and bands are training examples only. Confirm compounding, LSF or other charges with RBI circulars, FIRMS guidance and your AD Bank for the filing date in question.",
  },
  firc: {
    title: "8. FIRC and e-filing (FIRMS)",
    paragraphs: [
      "A FIRC (Foreign Inward Remittance Certificate) is the AD Bank’s inward-remittance evidence and supports proof of foreign-currency inflows such as capital subscriptions and ECB drawdowns. ECB- and FDI-related inflows and filings are commonly coordinated through the FIRMS portal ecosystem.",
      "E-filing via FIRMS and similar portals (uploads, UIN issuance) is now common; forms and scans are usually prepared with professional review.",
    ],
  },
  prosCons: {
    title: "9. Pros, cons and other points",
    items: [
      "Pros: access to offshore USD/EUR funding at relatively competitive pricing.",
      "Cons: FX risk on interest and principal; end-use is often capex-centric (foreign parent/equity-holder loans have separate maturity/end-use rules).",
      "Use of drawdowns: short-term placements may be permitted within regulatory limits.",
      "Refinancing, upsizing, repricing and tenor extensions may be permitted within RBI rules.",
      "Check separately whether the lender’s home country (e.g. Korea) requires FX or cross-border approvals (authorised forex banks, Bank of Korea, etc.).",
    ],
  },
  glossary: {
    title: "10. Glossary",
    entries: [
      { term: "ECB", desc: "External Commercial Borrowings" },
      { term: "AD Bank", desc: "Authorised dealer bank" },
      { term: "LRN", desc: "Loan Registration Number" },
      { term: "FIRC", desc: "Foreign Inward Remittance Certificate" },
      { term: "MAMP", desc: "Minimum average maturity period" },
      { term: "FIRMS", desc: "RBI portal for foreign investment and borrowing reporting" },
    ],
  },
  references: {
    title: "Reference links",
    firmsLead: "RBI FIRMS:",
    disclaimer:
      "This page is a reference summary reorganised from MSV internal materials (funding/ECB overview, 2020) and industry ECB notes. RBI Master Directions, circulars, FX and tax law change frequently — confirm execution, reporting and withholding (e.g. Form 15CA/CB) timelines with MSV before relying on this content.",
  },
  relatedPractice: {
    title: "Related practice areas",
    links: [
      { label: "FC-GPR", path: "/services/corporate-incorporation" },
      { label: "Form 15CA / Form 15CB", path: "/services/form-41-registration" },
      { label: "DTAA", path: "/services/form-41-registration" },
      { label: "TRC", path: "/services/form-41-registration" },
      { label: "ODI", path: "/services/india-accounting-glossary" },
    ],
  },
  backToServices: "Back to services",
  contactCta: "Contact us",
};

const zh: EcbGuideCopy = {
  metaTitle: "ECB·FEMA 对外借款实务指南",
  metaDescription: `${company.shortName} — 印度 ECB / FEMA 对外商业借款：概念、自动路径、RBI 申报、Form 83、LRN、ECB-2、FIRMS 及合作银行说明。`,
  pageTitle: "ECB·FEMA 对外借款实务指南",
  pageDescription:
    "对外商业借款（ECB）在 RBI 与 FEMA 规则下，对可借款主体、贷款人资格、资金用途（End-use）、期限（MAMP）、币种及报告体系一并管理，是常见的外币筹资路径。本文为实务与合规要点的参考摘要；实际执行与申报须遵循最新 Master Direction、通告及个案情况。",
  bankChannel: {
    title: "银行渠道与全国服务",
    body:
      "MSV 在企业银行、ECB 及 FEMA 相关事务上，主要与 KEB Hana Bank、ICICI Bank、Kotak Mahindra Bank 等机构开展实务沟通并协调申报节奏。也可通过印度全境 AD Bank（指定外汇银行）网络协助收款、换汇与申报衔接（具体以各行政策及 KYC 为准）。",
  },
  whatEcb: {
    title: "1. 何为 ECB",
    body:
      "ECB（External Commercial Borrowing）指印度居民（如公司）向非居民筹措的商业性外币借款。除传统贷款与不可转换债券（NCD）外，部分可转换类金融工具及外币融资结构亦可能纳入 ECB 适用范围，视当时规则而定。审批、额度与报告义务受 FEMA（Borrowing and Lending in Foreign Exchange）及 RBI《Master Direction — External Commercial Borrowings, Trade Credit…》等约束。",
  },
  types: {
    title: "2. 主要 ECB 类型与贷款人",
    items: [
      "海外金融机构贷款；海外母公司或股东（Foreign Equity Holder）借款等。",
      "可转债（FCCB）、交换债（FCEB）及其他证券或融资租赁安排，在不同时期与规则下可能纳入 ECB 并适用不同要件。",
      "贷款人示例：国际银行、出口信用机构、多边机构（IFC、ADB 等）、外国股东/长期投资者、设备供应商等（资格与额度因类型而异）。",
    ],
  },
  autoRoute: {
    title: "3. 自动路径（Automatic route）概览",
    intro:
      "借款分为自动路径与事先批准路径。需先评估资格条件、借款上限、最低平均期限（MAMP）、币种（FCY/INR）、杠杆、全成本利率上限及资金用途等；若条件未充分满足，可能需要转入事先批准路径或调整交易结构，而非当然适用自动路径。",
    limitsTitle: "3.1. 额度、期限与币种（要点）",
    limitsItems: [
      "FCY ECB 与 INR ECB：可接受币种及行业限制不同（制造业、软件、航运、航空等常见于 FCY）。",
      "借款额度与杠杆：通常以最近审计年度财务为基准设定额度与净资产倍数（海外母公司/股东借款另有倍数及小额例外等）。",
      "MAMP：因工具与金额不同，常见 3 年、5 年、10 年等要求；分期偿还结构会影响“平均期限”的计算方式，贷款结构设计很重要。",
      "全成本（All-in-cost）：基准利率加利差上限、罚息与提前还款费用上限等（须注意 RBI 基准利率随时间调整）。",
    ],
    useTitle: "3.2. 资金用途（要点）",
    useBody:
      "原则上以资本性支出（Capex）为主，购置厂房设备等通常允许；投机性购地、资本市场投资等往往受限。营运资金等部分用途可能因借款结构、主体类别及 MAMP 等条件而受到限制或附加要求（海外母公司/股东借款路径另有期限与额度规则）。",
  },
  procedure: {
    title: "4. ECB 执行与 RBI 申报流程（以 AD Bank 为主）",
    steps: [
      "指定 AD Bank，并由借款人与贷款人签署 Loan Agreement。",
      "经法律与会计审阅后编制 Form 83 等申请材料并完成银行审核（含平均期限测算）。",
      "AD Bank 向 RBI 报送材料并取得 ECB 借款登记号（LRN），并完成 RBI 侧登记流程（LRN 并不等同于所有语境下的“监管批复”本身）。",
      "取得 LRN 后可提款（Drawdown）；其后须通过 FIRMS 等电子渠道提交事后报告（如 ECB-2 等）。提交期限与字段以 RBI 通告及登记条件为准。",
    ],
    note:
      "内部手册常见做法为签约后约 7 日内提交 Form 83；取得 LRN 后 ECB-2 等可能在次月初或约 10 日前后运行。务必以最新 RBI 通告及银行指引为准。",
  },
  qa: {
    title: "5. ECB 实务问答",
    intro:
      "以下为实务中常见问题的问答整理。金额、利率及税负视 RBI 规则、税收协定（DTAA）、贷款人居民身份及交易结构而定，仅供方向性参考。",
    blocks: [
      {
        title: "5.1. 准备与时间",
        question: "取得贷款资金需做哪些准备？印度子公司大致多久可使用提款？",
        answer:
          "以 ECB 办理时，RBI 侧登记（LRN 等）常见约两周内完成；其后资金汇划及当地银行入账可能再需约 3–4 个工作日。资料齐备时，整体约一个月可作为排期参考（因银行、排队及个案而异）。",
      },
      {
        title: "5.2. 可借规模",
        question: "ECB 可筹措的规模大约多少？",
        answer:
          "可借规模取决于借款主体行业、类别、是否适用自动路径、基础设施类通道及当时有效的 RBI Master Direction。倍数、上限与例外会随通告调整，建议在申报前以最新规则结合经审计财报与交易结构核对。\n※ 参考：历史上部分 ECB Track 曾按自动路径（Automatic Route）设置年度上限及与净资产挂钩的规则，但实际适用仍取决于当时的 RBI 公告及具体借款结构。",
      },
      {
        title: "5.3. 利率负担",
        question: "偿还利息（收益）适用的利率大致可在什么范围？",
        answer:
          "ECB 利率通常在 RBI 允许的 All-in-cost 框架内，由市场利率、基准及利差结构共同决定。（参考示例：部分培训材料曾以基准+约 4.5 个百分点等说明利差上限，惟须以当时通告与基准为准。）利息一般随本金偿还节奏一并汇付结算。",
      },
      {
        title: "5.4. 偿还金额与期限",
        question: "每月或每年可偿还的本金与利息是否有固定上限？",
        answer:
          "偿还金额取决于贷款合同与分期方式，并非所有案件适用统一的月/年上限。实务中常见将偿还期设计为约 1–10 年（须与 MAMP 等规则一致）。",
      },
      {
        title: "5.5. 向总部汇款时的预扣税（TDS）",
        question: "向海外总部偿还本金与利息时，所得税预扣如何适用？",
        answer:
          "本金偿还本身通常不单独课征印度所得税。利息汇出可能涉及约 5–10% 的 TDS 讨论区间，但视 DTAA、贷款人居民身份、借款结构及利息性质等而定，需就具体交易事先评估（含 Form 15CA/CB 等）。",
      },
    ],
  },
  documents: {
    title: "6. 资料示例（自动路径）",
    items: [
      "公司申请函（Request letter）",
      "Form 83（RBI 申报格式，通常一式两份）及平均期限测算资料",
      "Loan Agreement——借贷双方、FCY 金额、期限、提款/偿还、利率、付息、资金用途、资本支出理由与计划（含财务资料）等",
      "借款人公司章程（Memorandum of Association）",
      "借款人最近三个财政年度经审计财务报表",
      "若贷款人为既有外国投资者：FC-GPR 等既有 FDI 申报资料",
      "授权 ECB 的董事会决议（Board Resolution）",
    ],
  },
  penalties: {
    title: "7. 迟延申报处罚（示例）",
    intro:
      "迟延申报、复合（Compounding）等机制可能随 RBI 规则调整。下表摘自历史参考材料，仅供示意，不构成法律意见；实际金额与程序取决于当时规则及迟延性质。",
    exampleLabel: "示例基准（仅供参考）",
    colDelay: "迟延期间（示例）",
    colFine: "金额（示例）",
    rows: [
      { delay: "30 日以内", fine: "INR 5,000" },
      { delay: "3 年以内", fine: "INR 50,000" },
      { delay: "超过 3 年", fine: "INR 100,000" },
    ],
    footnote:
      "上表金额与区间仅为培训用示例，不具有约束力。是否复合、LSF 或其他收费，请以申报时点的 RBI 通告、FIRMS 说明及 AD Bank 指引为准。",
  },
  firc: {
    title: "8. FIRC 与电子申报（FIRMS）",
    paragraphs: [
      "FIRC（Foreign Inward Remittance Certificate）由 AD Bank 出具，用于证明资本金汇入、ECB 提款等外币流入事实。ECB 与 FDI 相关的外币流入及报送，多与 FIRMS 门户体系联动办理。",
      "电子化申报普及后，多通过 FIRMS 等门户上传资料及取得 UIN；表格与扫描件通常经专业人士复核后提交。",
    ],
  },
  prosCons: {
    title: "9. 利弊及其他",
    items: [
      "优点：可依托美元/欧元等境外资金，相对利率较有空间。",
      "缺点：偿还利息与本金存在汇率风险；资金用途常以资本性支出为主（母公司/股东借款等另有期限与用途规则）。",
      "提款运用：在法规允许范围内，短期金融产品存放等可能被允许。",
      "再融资、增额、利率调整、展期等，在 RBI 规则范围内可能被允许。",
      "贷款人所在国（如韩国）是否需外汇或跨境事先申报/批准，须另行确认（指定外汇银行、韩国银行等）。",
    ],
  },
  glossary: {
    title: "10. 术语",
    entries: [
      { term: "ECB", desc: "External Commercial Borrowings" },
      { term: "AD Bank", desc: "Authorized Dealer Bank（指定外汇银行）" },
      { term: "LRN", desc: "Loan Registration Number" },
      { term: "FIRC", desc: "Foreign Inward Remittance Certificate" },
      { term: "MAMP", desc: "Minimum average maturity period" },
      { term: "FIRMS", desc: "RBI 外商投资与借款电子申报门户" },
    ],
  },
  references: {
    title: "参考链接",
    firmsLead: "RBI FIRMS：",
    disclaimer:
      "本页基于 MSV 内部资料（资金筹措·ECB 概述，2020）及行业 ECB 说明整理，仅供参考。RBI Master Direction、通告、汇率及税法随时可能修订；执行、申报及预扣税（如 Form 15CA/CB）时间安排请与 MSV 确认后再定。",
  },
  relatedPractice: {
    title: "相关实务",
    links: [
      { label: "FC-GPR", path: "/services/corporate-incorporation" },
      { label: "Form 15CA / Form 15CB", path: "/services/form-41-registration" },
      { label: "DTAA", path: "/services/form-41-registration" },
      { label: "TRC", path: "/services/form-41-registration" },
      { label: "ODI", path: "/services/india-accounting-glossary" },
    ],
  },
  backToServices: "返回服务页",
  contactCta: "联系我们",
};

export function ecbServiceCopy(locale: SiteLocale): EcbGuideCopy {
  return pickLocale(locale, { ko, en, zh });
}
