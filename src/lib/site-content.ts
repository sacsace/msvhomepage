/** Minsub Ventures — 요약 콘텐츠(회사 프로필 PDF 기반) */

import type { GroupCompany } from "@/types/group-company";
import type { LeadershipMember } from "@/types/leadership";

export const company = {
  legalName: "Minsub Ventures Private Limited",
  shortName: "MSV",
  /** 대표 문의 메일 (연락처 페이지 등) */
  infoEmail: "info@msventures.in",
  tagline: "ACCOUNTING · TAX · INDIA",
  /** 메타 설명·히어로 보조 문구 등에 사용 */
  taglineKo: "인도 법인 회계·세무와 현장 실행을 한 팀에서 지원합니다.",
  address: "Ferns City Road, Bangalore, Karnataka, India",
  websites: [] as readonly { label: string; href: string }[],
  brochurePath: "/company-profile-ms-ventures.pdf",
  satisfaction: "97%",
};

/** 공개 사이트 절대 URL — sitemap·OG·JSON-LD·metadataBase와 동일하게 유지 */
export const siteUrl = "https://www.msventures.in" as const;

/** 홈 히어로 — 회계·세무 특화 메시지 */
export const homeAccountingHero = {
  headline: "인도 법인 회계·세무, 기장부터 법정 신고까지 한 팀이 마감을 책임집니다.",
  lead:
    "상근 공인회계사(CPA) 체계를 기반으로 GST·TDS·법인세·FDI·FEMA 보고를 일관되게 운영하며, 자본 송금·증자·ECB 등 자본거래를 세무와 연계하여 관리합니다. 또한 Form 41(구 Form 10F), 이중과세 방지 협약(DTAA) 반영·소득세 신고, 주식 및 Demat 계좌 개설, 자본금 송금·증자, 대외상업차입(ECB), 주주 간 지분율 변경까지 전 과정을 동일한 전문팀이 통합적으로 조율합니다. 더불어 법인 설립, HR, 수출입 등 실행 중심의 컨설팅도 하나의 조직에서 연속적으로 지원합니다.",
  badge: "CPA-led · Bangalore",
} as const;

/** 홈 — 해외 투자·송금(회계 운영 스포트라이트와 동일한 밝은 레이아웃) */
export const investmentRemittanceSpotlight = {
  eyebrow: "자본·송금 관련 서비스",
  title: "해외 투자 / 송금과 신고",
  body: `인도 법인 설립·운영 과정에서는 외국인 투자(FDI) 규정, 자본금 유치·증자, 주주 구조 변경, 비거주자 송금 시 세무·환율 신고를 동시에 맞춰야 합니다. MSV는 법인 컨설팅·회계·세무를 한 조직에서 다루며, 방갈로르 현장에서 서류·은행·세무 실행까지 일관되게 지원합니다.`,
  highlights: [
    "Form 41(구 Form 10F)·DTAA(이중과세 방지)·소득세 신고",
    "주식 계좌 개설",
    "Demat 계좌 개설",
    "자본금 송금·증자",
    "대외상업차입(ECB)",
    "주주 간 지분율 변경",
  ] as const,
  servicesHref: "/services",
} as const;

/** 홈 — 회계·관리 지원(밝은 배경, 왼쪽 정렬 + 파이프 키워드) */
export const accountingOperationsSpotlight = {
  eyebrow: "인도 법인 · 회계·세무 핵심",
  title: "안정적인 회계 운영",
  paragraphs: [
    "인도 현지 규정(IFRS·Ind AS·GST·TDS 등)에 맞춘 장부 관리 및 신고 체계를 상근 공인회계사(CPA) 기반으로 안정적으로 운영합니다. 또한 본사 보고 일정과 인도 법정 마감 일정을 동시에 충족할 수 있도록 표준화된 프로세스와 체크리스트를 적용하고 있습니다.",
    "거래 규모와 산업 특성에 따라 업무 범위를 유연하게 조정하며, 월·분기·연간 단위의 기장, 세무, 자문 서비스를 통합 제공하고 있습니다. 아래는 주요 수행 업무 항목입니다.",
  ] as const,
  highlights: [
    "기장·월 회계",
    "세무 신고",
    "법인세·납부",
    "원천세(TDS)",
    "부가세(GST)",
    "이전가격(TP)",
    "대외상업차입(ECB) 정기 신고",
    "직원 의료보험(ESIC)",
    "직원 연금(EPF)",
    "전문세(PT)",
    "급여·대장 제공",
    "SFT",
    "FLA",
    "연결재무제표",
  ] as const,
  servicesHref: "/services",
} as const;

/**
 * Minsub Ventures 사업부 — 본사가 직접 운영하는 주요 영역
 * (홈 히어로 스트립·회사 소개 등에서 사용)
 */
export const businessUnits = [
  {
    abbr: "MSV",
    title: "법인 컨설팅 · 회계",
    subtitle: "비즈니스 컨설팅 · 회계·세무 · 설립 · HR · 인허가",
    href: "/services",
    variant: "navy" as const,
  },
  {
    abbr: "WM",
    title: "Wilmat",
    subtitle: "입구 매트 · 매트팅",
    href: "https://www.wilmat.in",
    variant: "teal" as const,
  },
  {
    abbr: "LKH",
    title: "Lotus Korean Hotel",
    subtitle: "호텔 · 숙박",
    href: "https://www.hotellotus.in",
    variant: "slate" as const,
  },
] as const;

/** Minsub Ventures와 함께하는 회사(계열·관련 법인) — `/group`, `/group/[slug]` */
export const groupCompanies = [
  {
    slug: "neocle-international",
    menuLabel: "Neocle International",
    legalName: "Neocle International Private Limited",
    role: "수출입 전문회사",
    highlights: ["스크랩(scrap) 수출", "수출입 대행", "창고 운영"],
    intro: `Neocle International Private Limited는 인도 현지에서 수출입을 전문으로 하는 법인으로, 스크랩(scrap) 수출·수입 대행·창고 운영 등을 통해 물류·통관 실행력을 제공합니다.

MSV의 법인 설립·운영 고객과 연계해, 견적·선적·문서·현지 창고까지 실무 단에서 이어지는 수출입 지원을 강화하는 역할을 합니다.`,
  },
  {
    slug: "seda-engineering-india",
    menuLabel: "Seda Engineering India",
    legalName: "Seda Engineering India Private Limited",
    role: "엔지니어링 회사",
    highlights: ["아틀라스콥코(Atlas Copco) 대리점"],
    intro: `Seda Engineering India Private Limited는 산업용 장비·압축기 등 엔지니어링 분야에서 아틀라스콥코(Atlas Copco) 대리점 역할을 수행합니다.

제조·플랜트 현장의 설비 도입·유지보수와 관련된 기술·공급 체계를 바탕으로, 인도 내 공장·설비 프로젝트에 실질적인 엔지니어링 파트너로 기여합니다.`,
  },
  {
    slug: "lotus-korean-hotel",
    menuLabel: "Lotus Korean Hotel",
    legalName: "Lotus Korean Hotel",
    role: "한국형 호텔 · 숙박",
    highlights: ["비즈니스·장기 숙박", "온라인: hotellotus.in"],
    website: "https://www.hotellotus.in",
    intro: `Lotus Korean Hotel은 방갈로르에서 비즈니스·장기 체류에 맞춘 한국형 호텔·숙박 서비스를 제공합니다.

MSV 고객사와 방문 인력의 거점 숙박, 프로젝트 기간 체류 등을 함께 지원하며, 현지 업무와 연계된 숙박 옵션을 제공합니다.`,
  },
  {
    slug: "wilmat",
    menuLabel: "Wilmat",
    legalName: "Wilmat",
    role: "프리미엄 입구 매트·매트팅 시스템",
    highlights: [
      "ANAB·IAF·TRA 및 KS Q ISO 9001:2015 품질경영",
      "매립(Recessed)·노출(Surface)형 등 맞춤 입구 솔루션",
      "먼지 유입 차단, 미끄럼·넘어짐 방지, 외관·청소 비용 절감",
      "알루미늄 베이스·나일론 카펫·EPDM 등 내구·내후성",
      "카세트형으로 부분 교체·롤업 청소 용이",
      "인도 현지 공급 및 A/S",
    ],
    website: "https://www.wilmat.in",
    intro: `Wilmat은 건물 입구용 프리미엄 매트팅(Entrance Matting) 시스템입니다. 한국 Ecosys의 연구·개발을 바탕으로 하며, 신발에 붙은 먼지를 걸러 실내를 깨끗이 유지하고 미끄럼·넘어짐 위험을 줄입니다. 대리석·타일 등 마감과 조화를 이루는 색·패턴을 선택할 수 있습니다.

국제 인증(예: ANAB, ANSI National Accreditation Board)과 IAF·TRA, KS Q ISO 9001:2015에 맞는 품질경영을 갖추었습니다. 친환경 소재와 긴 수명으로 건물 운영의 지속가능성에도 도움이 됩니다.

알루미늄 프로파일과 나일론 카펫·EPDM 등으로 내구·내후성을 확보했고, 재활용 가능한 구성 요소를 사용합니다. 카세트형이라 손상된 부분만 교체할 수 있으며, 매트를 말아 올리면 프레임 아래에 모인 먼지를 비우기 쉽습니다. 내·외부와 중간 출입 구간에 맞게 배치할 수 있고, 젖은 신발에도 물이 빠지도록 설계되어 외관과 사용감을 오래 유지합니다.

쇼핑몰·호텔·병원·학교·조립 공장 등 통행량이 많은 출입구에 적합합니다. 인도에서 제품을 공급하며 A/S를 지원합니다.

페이지 상단의 PDF 링크는 2022년 12월 기준 영문 제품 카탈로그입니다. 모델 사양·성능 검증·시공 절차·타사 비교·설치 사례가 수록되어 있습니다. 최신 사양은 wilmat.in 또는 담당자에게 문의해 주세요.`,
    profilePdf: "/wilmat-catalog-20221219.pdf",
  },
  {
    slug: "jw-industrial-tech-service",
    menuLabel: "JW Industrial Tech Service",
    legalName: "JW Industrial Tech Service Private Limited",
    role: "도장·공장 설비 설치 및 엔지니어링",
    highlights: [
      "자동차 생산 설비 기계·전기 설치·이전·개조·수리",
      "도장·조립·프레스·바디 샵 라인",
      "FCS·CPC 컨베이어 및 전극 도장·오븐·덕트 등 주요 설비",
      "지그·고정구 설계·제작, 팔레트·트롤리·안전 가드·SS 탱크 등",
      "차량 생산 설비 관련 한국산 산업 소모품 공급",
      "현장 공정 개발·양산 대응, 엔지니어링 AMC",
    ],
    intro: `JWITS(JW Industrial Tech Service Private Limited)는 인도에서 자동차 생산 설비를 중심으로 한 기계·전기 설비의 설치, 이전, 개조, 수리를 수행합니다. 도장·조립·프레스·바디 샵과 FCS·CPC 컨베이어, 전극 도장 라인·워크스테이션·오븐·덕트 배관 등 주요 설비를 다룹니다.

지그·고정구 설계·제작, 팔레트·트롤리·안전 가드·도어·그레이팅·스테인리스 탱크 제작, 차량 생산 설비용 한국산 산업 소모품 공급, 현장 공정 개발·양산 대응, 엔지니어링 AMC까지 제공합니다.

페이지 상단의 PDF는 2025년 8월 기준 영문 비즈니스 소개 자료입니다. 실적·조직·거점·주요 고객사 등이 수록되어 있으니, 대외 공유 시에는 최신본과 맞춰 주세요.`,
    profilePdf: "/jwits-business-intro-20250815.pdf",
  },
] satisfies readonly GroupCompany[];

/** 비전 — 회사 소개 페이지용 (수정 시 PDF·대외 메시지와 맞출 것) */
export const vision = {
  headline: "인도에서 가장 믿을 수 있는 실행 파트너",
  statement:
    "복잡한 제도와 문화 속에서도 고객의 법인 설립부터 운영·확장까지 끊김 없이 함께하며, 한국과 인도를 잇는 신뢰의 허브가 되는 것을 지향합니다.",
  pillars: [
    {
      title: "실행력",
      text: "문서와 조언에 그치지 않고, 현장에서 직접 처리·책임지는 원스톱 실무를 제공합니다.",
    },
    {
      title: "투명성",
      text: "회계·세무·규제 대응을 정확하고 열린 소통으로 안내합니다.",
    },
    {
      title: "동반 성장",
      text: "고객의 정착과 지속 가능한 성장이 곧 MSV의 성과라 믿고 장기 관계를 중시합니다.",
    },
  ],
} as const;

/** 마일스톤 — 시기 표기는 대외 자료에 맞춰 `site-content.ts`에서 조정 가능 */
export const milestones = [
  {
    phase: "기반",
    title: "원스톱 운영 체계 수립",
    description:
      "법인 회계·수출입·HR·주재원 비자·인허가 등을 내부 팀이 직접 수행하는 실무 중심 조직을 갖추고, 외주에 의존하지 않는 대응 체계를 완성했습니다.",
  },
  {
    phase: "성장",
    title: "산업별 레퍼런스 확대",
    description:
      "제조·건설·호텔·유통·바이오 등 다양한 분야의 한국·글로벌 기업 프로젝트를 누적하며 현장 노하우를 넓혀 왔습니다.",
  },
  {
    phase: "연계",
    title: "그룹·협력 네트워크 강화",
    description:
      "Wilmat(프리미엄 입구 매트) 인도 현지 공급·A/S, Lotus Korean Hotel, 수출입·엔지니어링(Neocle·Seda) 등 그룹·브랜드와 연계해, 컨설팅부터 물류·숙박까지 고객 요구에 맞춘 실행력을 보강했습니다.",
  },
  {
    phase: "지금",
    title: "전국 단위 컨설팅·운영 지원",
    description:
      "방갈로르·첸나이·델리 등 인도 전역에서 법인 설립, 논스톱 운영, 투자 검토까지 통합 지원을 이어가고 있습니다.",
  },
] as const;

export const overview = {
  title: "회사 개요",
  /** 문단은 `\\n\\n`으로 구분. 수정 시 PDF·대외 문구와 맞출 것. */
  body: `${company.shortName}는 인도 법인의 회계·세무·컴플라이언스를 축으로 하는 실행형 파트너입니다. 월·분기·연간 기장과 GST·TDS·법인세·FDI 신고, 감사·TP 대응까지 상근 CPA 체계로 방갈로르에서 직접 처리합니다.

법인 설립·인허가·HR·수출입·주재원 지원과 Wilmat(입구 매트) 현지 공급·A/S, Lotus Korean Hotel 등 확장 서비스는 그룹 브랜드·협력 조직과 연계해 제공하며, 회계 데이터와 운영 실무가 끊기지 않도록 설계합니다.

본사는 ${company.address}에 있으며, 인도 내 법인 설립·회계·세무·인허가·HR 등 핵심 경영 지원을 한 조직에서 통합적으로 돕습니다.

회계·세무는 한국 공인회계사(CPA) 출신 하헌범 부대표와 인도 공인회계사(CA) 카슐 샤르마가 상근으로 직접 수행하며, IFRS와 인도 현지 규제(GST·TDS 등)를 동시에 맞출 수 있도록 전문적으로 지원합니다.`,
} as const;

/** MV System(Minsub Ventus System) 소개 (`/mvs-intro`) — 법인·서비스 상세는 회사 소개·서비스 페이지와 맞출 것 */
export const mvsIntro = {
  /** PageHeader 한 줄 요약 */
  headerSummary: `Minsub Ventus System을 사이트에서는 MV System으로 표기합니다. 의미·적용 범위·다음 단계를 아래에서 안내합니다.`,
  /** 본문 상단 개요(`\\n\\n`으로 문단 구분) */
  heroLead: `인도 현장에서 회계·세무·컴플라이언스 실행을 한 흐름으로 묶는 체계와 표준을 이 페이지에서 설명합니다.

법인 ${company.shortName}(${company.legalName})의 조직·비전·연혁은 회사 소개 페이지에서 확인하실 수 있습니다.`,
  sections: [
    {
      eyebrow: "Name",
      title: "Minsub Ventus System",
      body: "Ventus(라틴어 ‘바람’)에 담긴 실행·순환의 이미지를 바탕으로 합니다. 인도 법정 마감과 본사 보고 주기를 동시에 맞추기 위한 운영 원칙·체크리스트·역할 분담을 한데 정리한 시스템 브랜드입니다.",
    },
    {
      eyebrow: "Scope",
      title: "다루는 범위",
      body: "기장·GST·TDS·법인세·FDI·감사·이전가격 등 회계·세무 실행과, 자본 송금·증자·ECB 등 자본거래 신고가 맞물리는 구간을 중심으로 안내합니다.\n\n설립·HR·수출입 등 확장 실행은 그룹 브랜드와 연계됩니다.",
    },
    {
      eyebrow: "Next steps",
      title: "더 알아보기",
      body: "비전·인사말·마일스톤은 회사 소개에서 확인하실 수 있습니다.\n\n서비스 라인과 사례는 서비스 페이지에서 확인하실 수 있습니다.",
    },
  ] as const,
  links: {
    about: "/about",
    services: "/services",
    contact: "/contact",
  } as const,
};

export const values = [
  "전문성 기반 맞춤 컨설팅 제공",
  "정확하고 투명한 회계·세무 서비스",
  "한국어·영어·힌디어 대응 가능",
  "업계별 특화된 실무 노하우",
  "법인 설립부터 운영까지 직접 지원",
  "현지 규제 대응 및 인허가 컨설팅 전문",
];

/** 인포그래픽(좌 3·우 2) 순서와 동일하게 유지 */
export const strengths = [
  "상근 CPA·인도 기장·월·분기·연간 신고 일괄 체계",
  "외주 없는 회계·세무·컴플라이언스 직접 대응",
  "한국 본사 보고와 인도 법정 마감 동시 맞춤",
  "한국-인도 간 법·문화 차이에 대한 이해와 조율",
  "다국어 커뮤니케이션",
  "빠른 의사결정과 책임감 있는 대응",
];

export const services = [
  {
    title: "회계·세무·컴플라이언스",
    description:
      "IFRS와 인도 규정을 기반으로 회계·감사·세무 신고(GST·TDS 등)를 수행하며, 법인 구조 자문까지 상근 공인회계사 체계로 지원합니다.",
  },
  {
    title: "법인 설립 및 인허가",
    description:
      "제조업 진출을 위한 현지 법인 설립부터 PAN·GST·수출입 코드 등록, 사무실 임대 및 각종 인허가까지 전 과정을 현지에서 직접 수행합니다.",
  },
  {
    title: "수출입·무역·구매",
    description:
      "수출입 관리, 현지 업체 및 바이어 매칭, 전시회 기획·운영, 공장 방문 통역 등 무역 전 과정을 통합 지원합니다.",
  },
  {
    title: "HR·주재원·FRRO",
    description:
      "채용 지원, 주재원 비자 및 FRRO 업무, 계약서 검토 등 인사·행정 전반을 내부 팀이 직접 처리합니다.",
  },
  {
    title: "호텔·부동산·사업 검토",
    description:
      "호텔 사업 진출을 위한 매물 실사, 투자 보고서, 사업성 분석, 부동산 중개 및 법률 자문 연계를 제공합니다.",
  },
  {
    title: "논스톱 운영 지원",
    description:
      "법인 관리, 회계 장부, 본사 보고, ERP 구축·교육 등 설립 이후 운영 단계까지 원스톱으로 지원합니다.",
  },
];

/** 회계·세무 라인업 상세 (서비스 페이지). 금액은 표시하지 않습니다. */
export type AccountingServiceBlock = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  items: readonly string[];
};

export const accountingServiceBlocks: readonly AccountingServiceBlock[] = [
  {
    eyebrow: "Recurring",
    title: "정기 회계 및 세무 서비스",
    subtitle: "월 단위 회계·세무 실행 및 인도 현지 필수 신고·납부를 포함합니다.",
    items: [
      "월 회계 서비스",
      "장부 관리",
      "GST 매입·매출 신고 및 관리",
      "원천징수(TDS) 월별 및 분기별 신고",
      "Advance Tax 신고",
      "SFT(금융거래 명세 보고)",
      "FLA(해외 부채 및 자산 보고)",
      "DPT-3(예금 및 유사 금융거래 보고)",
      "FDI·FEMA 관련 신고",
      "자본금 관리",
      "PF(연금), ESI(건강보험) 정산 및 납부",
      "Professional Tax 등록 및 납부",
    ],
  },
  {
    eyebrow: "Annual",
    title: "연간 감사 및 신고 서비스",
    subtitle: "연도·매출·거래 규모에 따라 범위와 일정을 협의합니다.",
    items: [
      "세무·회계 감사 서비스(연 1회, 매입·매출 검토 후 범위 확정)",
      "GST 감사(GST Audit, 연 매출 기준 해당 시)",
      "TP Report(Transfer Pricing Audit Report, 필요 시)",
    ],
  },
  {
    eyebrow: "Ad hoc",
    title: "기타 서비스",
    subtitle: "건·인원 단위로 진행되는 행정·세무 지원입니다.",
    items: [
      "이사 등록·삭제(1인 단위)",
      "Form 15CA/CB(비거주자 송금 관련 세무 인증, 건별)",
      "ECB(대외상업차입), 해외 송금 Form 41(구 Form 10F)·DTAA(이중과세 방지) 관련 지원(해당 시)",
      "DIR-3 KYC(이사 식별번호 연간 갱신, 1인 단위)",
      "공인회계사 서명 필요 문서(서류 건별)",
    ],
  },
];

export const leadership: LeadershipMember[] = [
  {
    role: "대표이사",
    name: "이민섭",
    email: "lee@msventures.in",
    summary:
      "인도 시장의 복잡한 제도와 행정 환경 속에서 실행까지 책임지는 실무형 파트너로서, 법인 설립부터 회계·세무·수출입·비자·호텔·HR까지 외주 없이 직접 실행하는 통합 솔루션을 이끕니다.",
    /** `web/public/team/lee-minsub-2026.png` — 파일명 변경 시 브라우저·이미지 캐시 무효화에 유리합니다. */
    photoSrc: "/team/lee-minsub-2026.png",
  },
  {
    role: "부대표 · 공인회계사",
    name: "하헌범",
    email: "heon@msventures.in",
    summary:
      "공인회계사(CPA) 자격을 보유한 재무·경영 전문인으로, MSV의 한·인도 간 전략적 협력 및 고객 커뮤니케이션을 총괄합니다. 대기업·회계법인·전략 컨설팅·투자사 실무와 국제 금융기관 공동투자 경험을 바탕으로 인도 시장 진출·운영을 체계적으로 지원합니다.",
    photoSrc: "/team/ha-heonbeom.png",
  },
  {
    role: "공인회계사 (인도)",
    name: "카슐 샤르마",
    email: "ca@msventures.in",
    summary:
      "인도 회계·세무·기업 규제 전반과 IFRS에 대한 전문성으로 외국계 기업의 인도 재무·세무를 총괄합니다. 한국 기업의 회계 기준과 인도 정부 요구 간 조율, GST·TDS·컴플라이언스까지 원스톱으로 지원합니다.",
    photoSrc: "/team/ca-kashul-sharma.png",
  },
];

/** 회사 소개 페이지 대표이사 인사말 전문. 대외 PDF와 문구를 맞출 때는 이 상수만 수정하면 됩니다. */
export const ceoStatementFull = `MSV는 인도 시장에서 활동하는 외국계 기업들에게 단순한 컨설팅을 넘어, 현장에서 실행까지 책임지는 실무형 파트너가 되기 위해 설립되었습니다. 인도는 세계에서 가장 빠르게 성장하는 시장이지만, 복잡한 제도와 언어, 문화, 행정 시스템으로 인해 외국 기업에게는 진입 장벽이 높은 곳입니다.

호텔, 제조업, 부동산, 유통 등 다양한 산업의 수십여 개 한국 기업들과 함께하며 설립 → 정착 → 운영 → 확장까지 전 과정의 경험을 축적해왔습니다.

저희는 법인 설립부터 회계·세무·수출입·주재원 비자·HR·호텔·부동산·인허가까지 외주 없이 내부 팀이 직접 실행하는 통합 구조를 갖추었습니다. 한국 본사와 인도 현장 사이의 간극을 줄이고, 의사결정이 지연되지 않도록 현장에서 책임지는 것을 원칙으로 합니다.

IFRS와 인도 규제를 아우르는 상근 공인회계사 체계로 투명한 재무 보고와 컴플라이언스를 지원하며, 초기 진입부터 논스톱 운영까지 고객의 성장 단계에 맞춰 동행합니다.

앞으로도 인도에서 비즈니스를 준비하시는 모든 분께 검증된 현장 경험과 실행력을 바탕으로 든든한 파트너가 되겠습니다. 감사합니다.`;

/** 회사 소개 페이지 부대표(하헌범) 소개 본문. 대외 자료와 문구를 맞출 때는 이 상수만 수정하면 됩니다. */
export const vpHaStatementFull = `하헌범 부대표는 공인회계사(CPA) 자격을 보유한 재무 및 경영 전문인으로, 현재 MSV의 한·인도 간 전략적 협력 및 고객 커뮤니케이션을 총괄하고 있습니다.

그는 한국과 인도 양국의 회계 및 세무 제도, 투자 구조, 기업 환경 전반에 대한 깊은 이해를 바탕으로, 복잡한 인도 시장 진출과 운영을 보다 체계적이고 효율적으로 끌어가는 데 강점을 지니고 있습니다. 하헌범 부대표는 국내 대기업, 회계법인, 전략 컨설팅 펌, 투자회사 등에서 다양한 실무 경험을 쌓았으며, 국내외 기업의 투자, 실사, M&A 자문 프로젝트를 다수 수행해 온 경험이 있습니다. 유통, 금융, 발전, 에너지 등 다양한 산업군에 대한 이해와 전문성을 바탕으로, 중국, 인도, 동남아시아 등지의 해외 기업에 대한 ADB, DEG, DFJ, Mitsui 등 국제 금융기관 및 전략적 투자자들과의 공동투자 경험도 보유하고 있습니다.

현재는 MSV의 공동 리더로서, 한국 고객사와의 원활한 소통과 문화적 이해를 바탕으로 인도 내 안정적 사업 운영을 지원하고 있으며, 장기적인 관점에서 고객사의 성장과 지속 가능한 성과 창출을 돕는 신뢰할 수 있는 파트너 역할을 수행하고 있습니다.`;

/** 부대표 소개 하단 경력·학력 목록 */
export const vpHaCareerBullets = [
  "GS그룹 신사업 투자 및 개별 투자건 자문",
  "수출입은행 중장기 투자전략 및 중장기 비전 수립",
  "대우캐피탈 매각 자문",
  "파인우드 캐피탈, Managing Partner",
  "㈜ GS, 사업지원팀, 부장",
  "Asia Clean Energy Limited, Chief Investment Manager",
  "Arthur D. Little, Senior Consultant",
  "딜로이트 안진회계법인 FAS 본부, Assistant Manager",
  "Columbia Business School, MBA",
  "연세대학교 경영학과 석사, 한양대학교 무역학과 학사",
] as const;

/** 회사 소개 페이지 인도 CA(카슐 샤르마) 소개 본문. 대외 자료와 문구를 맞출 때는 이 상수만 수정하면 됩니다. */
export const caKashulStatementFull = `카슐 샤르마 공인회계사는 인도의 회계, 세무, 기업 규제 시스템 전반에 걸쳐 깊은 전문성과 실무 경험을 갖춘 전문가로서, 외국계 기업의 인도 진출 및 운영을 위한 핵심적인 재무 파트너입니다.

그는 다년간에 걸친 실무 경험을 통해 다양한 산업군의 고객에게 회계 감사, 세무 신고, 법인 설립 구조 자문, 규제 준수(Compliance), GST 처리, TDS 및 소득세 관련 업무 등 폭넓은 서비스를 제공해 왔습니다.

특히 인도 현지 법규와 국제 회계기준(IFRS)을 모두 이해하고 있는 복합적 역량은, 다국적 기업이나 합작 법인과 같이 복잡한 회계 환경에 있는 기업들에게 큰 신뢰를 받고 있습니다. 한국 기업의 회계 기준과 인도 정부의 요구사항 간의 차이를 이해하고 조율할 수 있는 능력 또한 그의 큰 강점입니다.

카슐 샤르마는 Minsub Ventures Private Limited에서 인도 현지 재무 및 세무 부문을 총괄하며, 고객의 초기 투자 구조 설계부터 실사, 회계 시스템 구축, 장기적 세무 전략 수립에 이르기까지 기업의 전 생애 주기에 걸쳐 전략적 재무 파트너 역할을 수행하고 있습니다. 고객의 니즈를 정확히 파악하고, 복잡한 인도 회계 시스템을 효율적이고 실용적으로 적용하는 그의 노하우는 MSV가 제공하는 원스톱 비즈니스 솔루션의 핵심 경쟁력입니다.`;

export const sampleProjects = [
  {
    name: "법인 설립 및 인허가 프로젝트",
    note: "인도 전역 · 제조 법인 및 인허가",
    due: "2024년 6월 완료 사례(프로필 기준)",
  },
  {
    name: "부동산 조사 및 호텔 인수 검토",
    note: "현장 실사·인허가·사업성 분석",
    due: "프로필 내 프로젝트 예시",
  },
  {
    name: "협력업체 개발 및 부품사 투어",
    note: "전시·통역·매칭·차량 지원",
    due: "2024년 2월 완료 사례(프로필 기준)",
  },
];

export const clientSectors = [
  "제조·플랜트",
  "건설·E&C",
  "바이오·의료기기",
  "유통·F&B",
  "IT·플랫폼",
  "부동산·호텔",
  "에너지·기계",
  "공공·기관 협력",
];

/** 메인 비주얼 슬라이드 (인도 회계·컨설팅 사이트형 히어로) */
export const heroSlides = [
  {
    kicker: "MSV",
    title: "인도 진출, 설립부터 운영까지 한 번에",
    description:
      "법인 설립·인허가·회계·세무·수출입·HR까지 외주 없이 직접 실행하는 원스톱 파트너입니다.",
    tone: "slate" as const,
  },
  {
    kicker: "Consulting & Compliance",
    title: "상근 공인회계사 · 다국어 실무팀",
    description:
      "GST, TDS, IFRS와 인도 규제를 함께 다루며, 한국어·영어·힌디어로 신속하게 소통합니다.",
    tone: "amber" as const,
  },
  {
    kicker: "YOUR BUSINESS PARTNER",
    title: "호텔·제조·건설·유통, 다양한 산업 경험",
    description:
      "현장 실사·투자 검토·협력사 매칭까지 프로필 기준 다수 프로젝트와 레퍼런스를 보유하고 있습니다.",
    tone: "emerald" as const,
  },
];

/** 상단 롤링 비즈니스 키워드 (에이디엘식 BUSINESS 롤링 배너 대응) */
export const marqueeKeywords = [
  "법인 설립",
  "PAN · GST",
  "수출입 코드",
  "회계 · 감사",
  "세무 신고",
  "인허가",
  "주재원 비자",
  "FRRO",
  "HR · 채용",
  "부동산 실사",
  "호텔 인수 검토",
  "ERP 셋업",
  "본사 보고",
  "논스톱 운영",
];
