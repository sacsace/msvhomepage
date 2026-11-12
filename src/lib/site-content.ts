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
  taglineKo: "인도 법인 회계·세무와 인도 현지 실무를 한 팀에서 지원합니다.",
  address: "Ferns City Road, Bangalore, Karnataka, India",
  websites: [] as readonly { label: string; href: string }[],
  brochurePath: "/company-profile-ms-ventures.pdf",
};

/** 공개 사이트 절대 URL — sitemap·OG·JSON-LD·metadataBase와 동일하게 유지 */
export const siteUrl = "https://www.msventures.in" as const;

/** 홈 히어로 — 회계·세무 특화 메시지 */
export const homeAccountingHero = {
  headline: "인도 법인 회계·세무, 기장부터 법정 신고까지 한 팀이 마감을 책임집니다.",
  lead:
    "한국 공인회계사(CPA)와 인도 공인회계사(CA)가 함께 GST·TDS·법인세·FDI·FEMA 신고를 지원합니다.\n자본 송금·증자·ECB·DTAA·주식 전자등록 계좌(Demat) 등 인도 법인 운영에 필요한 실무를 통합 지원합니다.",
  badge: "인도 법인 회계·세무 · Bangalore",
} as const;

/** 홈 — 해외 투자·송금(회계 운영 스포트라이트와 동일한 밝은 레이아웃) */
export const investmentRemittanceSpotlight = {
  eyebrow: "자본·송금 관련 서비스",
  title: "외국인 투자·해외 송금 지원",
  paragraphs: [
    "인도 법인 설립·운영 과정에서는 외국인 투자(FDI) 규정, 자본금 유치·증자, 주주 구조 변경, 비거주자 송금 시 세무·외환 관련 신고를 동시에 맞춰야 합니다.",
    "MSV는 법인 컨설팅·회계·세무를 한 조직에서 다루며, 방갈로르 현장에서 서류·은행·세무 실행까지 일관되게 지원합니다. 아래는 주요 수행 업무 항목입니다.",
  ] as const,
  highlights: [
    "Form 41 / Form 10F·DTAA(이중과세 방지)·소득세 신고",
    "주식 전자등록 계좌(Demat) 개설 지원",
    "자본금 송금·증자",
    "대외상업차입(ECB)",
    "주주 간 지분율 변경",
  ] as const,
  servicesHref: "/services",
} as const;

/** 홈 — 회계·관리 지원(밝은 배경, 왼쪽 정렬 + 파이프 키워드) */
export const accountingOperationsSpotlight = {
  eyebrow: "인도 법인 회계·세무 서비스",
  title: "안정적인 회계 운영",
  paragraphs: [
    "인도 회계기준(Ind AS)·세법(GST·TDS 등)과 본사 보고 자료 요건에 맞춘 장부 관리 및 신고 체계를 한국 공인회계사(CPA)와 인도 공인회계사(CA)가 함께 운영합니다. 본사 보고 일정과 인도 법정 마감 일정을 동시에 맞출 수 있도록 표준화된 프로세스와 체크리스트를 적용하고 있습니다.",
    "거래 규모와 산업 특성에 따라 업무 범위를 유연하게 조정하며, 월·분기·연간 단위의 기장, 세무, 자문 서비스를 통합 제공하고 있습니다. 아래는 주요 수행 업무 항목입니다.",
  ] as const,
  highlights: [
    "장부 기장·월별 결산",
    "세무 신고",
    "법인세 신고·납부",
    "원천세(TDS)",
    "부가세(GST)",
    "이전가격(TP)",
    "대외상업차입(ECB) 정기 신고",
    "직원 의료보험(ESIC)",
    "직원 연금(EPF)",
    "전문세(PT)",
    "급여 계산·급여대장 작성",
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
    abbr: "LKH",
    title: "Lotus Korean Hotel",
    subtitle: "호텔 · 숙박",
    href: "https://www.hotellotus.in",
    variant: "slate" as const,
  },
] as const;

/** 그룹사 로고 PNG를 교체했는데도 예전 이미지가 보이면 숫자만 올려 캐시를 끊습니다. */
const GROUP_LOGO_VER = "?v=4";

/** 인도 현지 파트너(계열·관련 법인) — `/group`, `/group/[slug]` */
export const groupCompanies = [
  /** 그룹사 카드·상세 문구는 `@/lib/i18n/group-pages-locale`과 동기화할 것 */
  {
    slug: "neocle-international",
    menuLabel: "Neocle International",
    legalName: "Neocle International Private Limited",
    role: "원자재 공급·수출입 대행",
    logoSrc: `/group/neocle-international/neocle-logo.png${GROUP_LOGO_VER}`,
    highlights: [
      "PA66 에어백 원단(코팅·비코팅) 선별·톤백 포장 후 태국·한국 수출",
      "스크랩(scrap) 한국 수출",
      "석영·자단(Red Sandalwood) 구매·공급 상담(허가·서류 확인 후 거래)",
      "인도 수입·해외 수출 대행 및 무역 서류·인코텀즈·운송 조율",
      "타밀나두 파파람바캄 창고(약 836㎡) 보관·선별·출고, 벵갈루루 사무실",
    ],
    intro: `Neocle International Private Limited는 인도 타밀나두주 파파람바캄에 약 836㎡ 규모 창고를, 카르나타카주 벵갈루루에 사무실을 두고 원자재 공급과 수출입 대행을 수행하는 법인입니다.

코팅·비코팅 PA66 에어백 원단을 색상·규격별로 선별해 톤백으로 포장한 뒤 태국과 한국으로 수출하며, 스크랩은 한국으로 공급합니다. 석영과 자단(Red Sandalwood)은 구매를 희망하는 기업과 공급 조건을 협의하며, 자단은 관련 허가와 필수 서류가 확인된 물량에 한해 거래를 진행합니다.

상업송장·포장명세서·선하증권·원산지증명서 등 무역 서류 준비, 신용장·거래 조건 검토, 해상·항공·내륙 운송 조율까지 문의부터 화물 인도·정산까지 이어지는 수출입 실무를 지원합니다. MSV의 법인 설립·운영 고객과도 연계해 견적·선적·문서·현지 창고 실행력을 보강합니다.

공식 웹사이트(www.neocle.in)에서 품목·거래 안내와 문의 양식을 확인할 수 있습니다.`,
    website: "https://www.neocle.in",
    location: {
      /** Google Maps 단축 링크가 가리키는 좌표(13.0498988, 79.9621672) 기준 embed — 창고(타밀나두) */
      embedSrc: "https://www.google.com/maps?q=13.0498988%2C79.9621672&z=16&output=embed",
      mapUrl: "https://maps.app.goo.gl/2Mei8zZ8QUSZmGwF7",
      addressLine:
        "Warehouse: Papparambakkam, Thiruvallur, Tamil Nadu 602123 · Office: 24/1, Ferns City Road, Doddanekundi, Bengaluru 560037",
    },
  },
  {
    slug: "seda-engineering-india",
    menuLabel: "Seda Engineering India",
    legalName: "Seda Engineering India Private Limited",
    role: "엔지니어링 회사",
    logoSrc: `/group/seda-engineering-india/deers-seda-logo.png${GROUP_LOGO_VER}`,
    highlights: ["산업용 장비·압축기 엔지니어링", "플랜트·공장 설비 도입 및 유지보수"],
    intro: `Seda Engineering India Private Limited는 산업용 장비·압축기 등 엔지니어링 분야에서 제조·플랜트 현장의 설비 도입·유지보수와 관련된 기술·공급 체계를 바탕으로, 인도 내 공장·설비 프로젝트에 실질적인 엔지니어링 파트너로 기여합니다.`,
    location: {
      /** Google Maps 단축 링크가 가리키는 좌표(13.9534786, 77.6610694) 기준 embed */
      embedSrc: "https://www.google.com/maps?q=13.9534786%2C77.6610694&z=16&output=embed",
      mapUrl: "https://maps.app.goo.gl/3M3sdACigqNEKqbZ6",
    },
  },
  {
    slug: "lotus-korean-hotel",
    menuLabel: "Lotus Korean Hotel",
    legalName: "Lotus Korean Hotel",
    role: "한국형 호텔 · 숙박",
    logoSrc: `/group/lotus-korean-hotel/lotus-korean-hotel-logo.png${GROUP_LOGO_VER}`,
    highlights: ["비즈니스·장기 숙박", "온라인: hotellotus.in"],
    website: "https://www.hotellotus.in",
    intro: `Lotus Korean Hotel은 방갈로르에서 비즈니스·장기 체류에 맞춘 한국형 호텔·숙박 서비스를 제공합니다.

기업 출장자와 장기 체류 고객을 위한 숙박 서비스를 제공하며, MSV 고객사와 협력해 프로젝트 기간 체류 등도 함께 지원합니다.`,
    location: {
      /** Google Maps 단축 링크가 가리키는 좌표(12.9785591, 77.6974959) 기준 embed */
      embedSrc: "https://www.google.com/maps?q=12.9785591%2C77.6974959&z=16&output=embed",
      mapUrl: "https://maps.app.goo.gl/JueFi9TdfD7cHec2A",
    },
  },
] satisfies readonly GroupCompany[];

/** 비전 — 회사 소개 페이지용 (수정 시 PDF·대외 메시지와 맞출 것) */
export const vision = {
  headline: "인도 현지 실무를 직접 지원하는 신뢰의 파트너",
  statement:
    "복잡한 제도와 문화 속에서도 고객의 법인 설립부터 운영·확장까지 끊김 없이 함께하며, 한국과 인도를 잇는 신뢰의 허브가 되는 것을 지향합니다.",
  pillars: [
    {
      title: "실행력",
      text: "문서와 조언에 그치지 않고, 회계·세무·운영을 인하우스로 책임지고 전문·승인 업무는 CPA·CA와 협업하는 원스톱 실무를 제공합니다.",
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
      "법인 회계·수출입·HR·주재원 비자·인허가 등 핵심 운영을 내부 팀이 인하우스로 수행하는 실무 중심 조직을 갖추고, 전문·승인 업무는 CPA·CA와 협업하는 대응 체계를 완성했습니다.",
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
      "Lotus Korean Hotel, 수출입·엔지니어링(Neocle·Seda) 등 그룹·브랜드와 연계해, 컨설팅부터 물류·숙박까지 고객 요구에 맞춘 실행력을 보강했습니다.",
  },
  {
    phase: "지금",
    title: "전국 단위 컨설팅·운영 지원",
    description:
      "방갈로르·첸나이·델리 등 인도 전역에서 법인 설립, 법인 운영 통합 지원, 투자 검토까지 이어가고 있습니다.",
  },
] as const;

/** 연혁 기본값 — DB에 `CompanyHistoryEntry` 행이 없을 때 공개·관리자 초안에 사용 */
export const companyHistory = [
  { when: "2018년", what: "Buza Food Private Limited, Co-Founder" },
  { when: "2018년", what: "Daily Sushi 오픈" },
  { when: "2018년", what: "Lotus Korean Hotel 오픈" },
  { when: "2018년 9월", what: "법인 회계 서비스" },
  { when: "2019년", what: "법인 컨설팅" },
  { when: "2020년 2월", what: "Minsub Ventures Private Limited 설립" },
  { when: "2024년", what: "대구경북기계협동조합 오프라인 행사" },
  { when: "2025년", what: "Neocle International Private Limited 설립, 나일론 스크랩 수출" },
  { when: "2026년", what: "SEDA Engineering Private Limited 법인 인수" },
] as const;

/**
 * 회사 증빙 서류 미리보기 — `public/company-credentials/{id}.png`
 * PDF에서 이미지 재생성: `npm run credentials:export` (로컬 Dropbox 경로는 스크립트 내 수정)
 */
export const companyCredentialPreviews = [
  { id: "coi", label: "COI (Certificate of Incorporation)", imageSrc: "/company-credentials/coi.png" },
  { id: "pan", label: "PAN", imageSrc: "/company-credentials/pan.png" },
  { id: "gst", label: "GST Certificate", imageSrc: "/company-credentials/gst.png" },
  { id: "iec", label: "IEC (Import Export Code)", imageSrc: "/company-credentials/iec.png" },
  { id: "trading-license", label: "Trading Licence", imageSrc: "/company-credentials/trading-license.png" },
  { id: "fssai", label: "FSSAI", imageSrc: "/company-credentials/fssai.png" },
  { id: "labour-shop", label: "Shop & Establishment", imageSrc: "/company-credentials/labour-shop.png" },
  { id: "epf", label: "EPF (PF Certificate)", imageSrc: "/company-credentials/epf.png" },
  { id: "msme", label: "MSME (Udyam)", imageSrc: "/company-credentials/msme.png" },
] as const;

export const overview = {
  title: "회사 개요",
  /** 3문단 — MSV 소개 / 운영·CPA / 그룹·지원 범위. 수정 시 PDF·대외 문구와 맞출 것. */
  paragraphs: [
    `${company.shortName}는 인도 법인의 회계·세무·컴플라이언스를 축으로, 인도 현지 실무를 직접 지원하는 파트너입니다.`,
    `월·분기·연간 기장과 GST·TDS·법인세·FDI 신고, 감사·TP 대응은 방갈로르 실무팀이 인하우스로 운영합니다. 공인 서명·감사·TP 등 전문 영역은 한국 공인회계사(CPA) 출신 하헌범 부대표와 인도 공인회계사(CA) 카슐 샤르마가 함께 검토·승인 체계로 지원하며, Ind AS·인도 세법과 본사 보고 자료 요건을 동시에 맞출 수 있도록 돕습니다.`,
    `법인 설립·인허가·HR·수출입·주재원 지원과 Lotus Korean Hotel 등 확장 서비스는 그룹 브랜드·협력 조직과 연계해 제공하며, 회계 데이터와 운영 실무가 끊기지 않도록 설계합니다. 본사는 ${company.address}에 있으며, 인도 내 법인 설립·회계·세무·인허가·HR 등 핵심 경영 지원을 한 조직에서 통합적으로 돕습니다.`,
  ] as const,
} as const;

/** 홈 「고객사」·통계 리드 — 한 문단(한 줄 표시는 뷰포트·CSS에 맡김). 대외 문구와 맞출 것. */
export const clientsShowcaseLead =
  "2026년 기준 80개 이상의 기업에 인도 진출부터 운영·회계·세무·컴플라이언스까지 실무를 통합 지원하고 있으며, 고객사와 장기적인 협력 관계를 이어가고 있습니다.";

/** 팀원 소개 보조 문구 — `/about/team` 제목 블록 (대외 문구·PDF와 맞출 것) */
export const teamIntro = {
  body: `현장에서 회계·세무·법인 지원을 함께하는 구성원을 소개합니다. ${clientsShowcaseLead}`,
} as const;

/** `/about/team` 인사말 섹션 상단 리드 — 한 문단으로 표시(줄바꿈은 뷰포트에 맡김) */
export const teamGreetingLead =
  "고객과 함께 성장하는 파트너로서, 정확한 회계와 투명한 경영을 기반으로 신뢰를 만들어가고 있습니다. 한국과 인도를 잇는 실무 중심의 전문성을 바탕으로, 기업 운영 전반에 실질적인 가치를 제공하겠습니다.";

/** MVS 페이지 본문·메타는 `mvsSoftwarePageCopy` (`@/lib/i18n/mvs-software-page-locale`)에서 로케일별로 관리합니다. */

/** Website Information & Security Checker (WISC) */
export const WISC_PRODUCT_SITE_URL = "https://wisc.mvsystem.in" as const;

/** Software 상위 페이지 (`/software`) */
/** @deprecated 본문·메타는 `softwareLandingCopy` (`@/lib/i18n/software-landing-locale`) 사용 */
export const softwareLanding = {
  headerSummary:
    "회계·세무·현장 실행을 뒷받침하는 업무 관리 시스템과 실무 지원 도구, SI·웹사이트 개발을 소개합니다. 업무 통합 시스템(MVS), 출퇴근 기록(HeresNow), 급여 명세서 이메일, WISC, 맞춤 SI(솔루션·SaaS·CRM), 웹사이트 구축 사례를 확인하세요.",
  cards: [
    {
      href: "/software/mvs",
      title: "업무 통합 시스템 (MVS)",
      desc: `${company.shortName}가 운영하는 웹 업무 통합 시스템입니다. 인사·근태·급여·전자결재·업무·재고·파트너 등 법인 운영을 하나의 계정으로 통합 관리할 수 있으며, 필요 시 회계·세무 서비스와 연계할 수 있습니다.`,
    },
    {
      href: "/software/herenow",
      title: "출퇴근 기록 시스템 (HeresNow)",
      desc: "회사별로 데이터를 분리하여 관리하는 출퇴근·근태 관리 웹앱입니다.",
    },
    {
      href: "/software/payroll-mailer",
      title: "급여 명세서 이메일 발송 시스템",
      desc: "엑셀 급여표를 업로드해 직원별 HTML 메일과 PDF 명세를 발송합니다. 발송 처리 과정에서 사이트 DB에는 급여 원본을 저장하지 않습니다.",
    },
    {
      href: "/software/wisc",
      title: "Website Information & Security Checker",
      desc: "웹사이트 도메인의 보안·인증·성능을 점검합니다. SSL·헤더·인증 응답(Cookie/Token) 분석, 사이트 간 성능 비교(TTFB·응답 시간)와 분석 결과 내보내기(JSON)를 지원합니다.",
    },
  ] as const,
};

/** HeresNow 페이지 본문·메타는 `herenowSoftwarePageCopy` (`@/lib/i18n/herenow-software-page-locale`)에서 로케일별로 관리합니다. */

export const values = [
  "인도 현지 실무에 맞춘 맞춤형 컨설팅 제공",
  "투명하고 검증 가능한 회계·세무 운영",
  "한국·인도 간 실무 커뮤니케이션 지원",
  "산업별 실전 경험 기반 문제 해결",
  "설립부터 운영까지 직접 수행 체계",
  "인도 규제·인허가 대응 전문성",
];

/** 인포그래픽(좌 3·우 2) 순서와 동일하게 유지 */
export const strengths = [
  "한·인 CPA·CA 협업 기반의 기장·월·분기·연간 신고 일괄 체계",
  "회계·세무·컴플라이언스 핵심 업무를 내부 팀이 직접 지원",
  "한국 본사 보고 일정과 인도 법정 신고 기한을 함께 관리합니다.",
  "한국-인도 간 법·문화 차이에 대한 이해와 조율",
  "다국어 커뮤니케이션",
  "빠른 의사결정과 책임감 있는 대응",
];

export const services = [
  {
    title: "회계·세무·컴플라이언스",
    description:
      "Ind AS·인도 세법을 기반으로 회계·감사·세무 신고(GST·TDS 등)를 수행하며, 본사 보고 자료와 법인 구조 자문까지 한·인 회계 전문가가 지원합니다.",
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
    title: "법인 운영 통합 지원",
    description:
      "법인 관리, 회계 장부, 본사 보고, ERP 구축·교육 등 설립 이후 운영 단계까지 원스톱으로 지원합니다.",
  },
];

/** 회계·세무 서비스 상세 (서비스 페이지). 금액은 표시하지 않습니다. */
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
    subtitle:
      "월 단위 회계·세무 실행, 급여/노무성 납부, RBI 보고를 포함한 인도 현지 필수 신고·납부를 통합 지원합니다.",
    items: [
      "고객사 계정과목 체계 요청·확정(본사 리포팅 포맷 반영)",
      "계정과목 기준 거래 분류 후 기장 시작",
      "지출결의서 작성·검토·승인 프로세스 운영",
      "승인 완료 건 회계 프로그램 입력 및 증빙 매칭",
      "월 회계 마감 및 장부 관리(은행·매입·매출·비용 계정 정리)",
      "GST 매입·매출 신고 및 ITC 관리",
      "원천징수(TDS) 월별·분기별 신고 및 정산",
      "Advance Tax 계산·신고·납부 스케줄 관리",
      "SFT(금융거래 명세 보고) 대응",
      "FLA(해외 부채 및 자산 보고) 준비·제출(FLAIR 포털)",
      "DPT-3(예금 및 유사 금융거래 보고) 대응",
      "FDI Reporting (RBI-FIRMS: FC-GPR/FC-TRS) 및 FEMA 연계 신고",
      "자본금 변동·주주 구조 변경 관련 컴플라이언스 관리",
      "PF(연금), ESI(건강보험) 정산·납부",
      "Professional Tax 등록, 주별 신고 주기 관리 및 납부",
    ],
  },
  {
    eyebrow: "Annual",
    title: "연간 감사 및 신고 서비스",
    subtitle: "연도·매출·거래 규모에 따라 감사 범위와 제출 일정을 사전 협의해 운영합니다.",
    items: [
      "세무·회계 감사 서비스(연 1회, 매입·매출 검토 후 범위 확정)",
      "GST 감사(GST Audit, 연 매출 기준 해당 시)",
      "TP Report(Transfer Pricing Audit Report, 필요 시)",
    ],
  },
  {
    eyebrow: "Ad hoc",
    title: "기타 서비스",
    subtitle: "건별 이슈, 인원 단위 신고, 비정기 행정·세무 요청을 신속하게 처리합니다.",
    items: [
      "이사 선임·사임 및 변경 신고(1인 단위)",
      "Form 15CA/CB(비거주자 송금 관련 세무 인증, 건별)",
      "ECB(대외상업차입), 해외 송금 Form 41 / Form 10F·DTAA(이중과세 방지) 관련 지원(해당 시)",
      "DIR-3 KYC(2026년부터 3년 주기 이사 DIN 갱신, 1인 단위)",
      "공인회계사 서명 필요 문서(서류 건별)",
    ],
  },
];

/** 인도 법인 기간별 법정 신고·컴플라이언스 일정(참고) — 서비스 페이지 표용. 법령·고시 변경 시 달라질 수 있습니다. */
export type IndiaComplianceScheduleRow = {
  readonly item: string;
  readonly schedule: string;
};

export const indiaComplianceScheduleIntro =
  "아래는 일반적인 인도 법인·사업자 기준의 대표 일정입니다. 업종, 등록 유형, 연매출, 주(邦)별 요건, 법 개정에 따라 의무·마감일이 달라질 수 있으므로 실제 운영 전 상근 CPA와 일정을 확정하시기 바랍니다.";

export const indiaComplianceMonthlyRows: readonly IndiaComplianceScheduleRow[] = [
  { item: "TDS", schedule: "매월 7일 전 신고·납부(해당 시)" },
  { item: "GSTR-1", schedule: "매월 11일 전 신고·납부(매출, 월 신고자 기준)" },
  { item: "GSTR-3B", schedule: "매월 20일 전 신고·납부(매입·ITC 등, 월 신고자 기준)" },
  { item: "PF(연금)", schedule: "매월 15일 전 신고·납부(해당 시)" },
  { item: "ESI", schedule: "매월 15일 전 신고·납부(해당 시)" },
  { item: "Professional Tax", schedule: "매월 20일 전 신고·납부(주별 세법 상이)" },
  {
    item: "ECB(대외상업차입)",
    schedule: "차입 잔액이 있는 경우 익월 7일 이내 ECB-2 등 보고(지정 AD Category-I 은행 경유)",
  },
];

export const indiaComplianceQuarterlyRows: readonly IndiaComplianceScheduleRow[] = [
  {
    item: "Advance Tax(선납세)",
    schedule: "6월 15일 15% · 9월 15일 45% · 12월 15일 75% · 3월 15일 100%(대표 일정)",
  },
  {
    item: "TDS Return",
    schedule:
      "Q1(4~6월) 7월 31일 · Q2(7~9월) 10월 31일 · Q3(10~12월) 익년 1월 31일 · Q4(1~3월) 5월 31일",
  },
  {
    item: "이사회(Board Meeting)",
    schedule:
      "설립 후 첫 이사회 30일 이내, 연간 최소 4회, 이사회 간격 최대 120일 초과 불가(Companies Act 기준)",
  },
  {
    item: "GSTR-1(분기)",
    schedule: "분기 종료 다음달 13일(연매출 5 Cr 이하 등 QRMP·분기 신고 선택 시)",
  },
  {
    item: "GSTR-3B(분기)",
    schedule: "분기 종료 다음달 22~24일(연매출 5 Cr 이하 등 QRMP·분기 신고 선택 시)",
  },
];

export const indiaComplianceAnnualRows: readonly IndiaComplianceScheduleRow[] = [
  {
    item: "DIR-3 KYC",
    schedule: "2026년부터 3년 주기 · 해당 연도 9월 30일까지(미이행 시 DIN 비활성화 가능)",
  },
  { item: "Professional Tax 연간 신고", schedule: "4월 1일~4월 30일(주별 상이)" },
  { item: "SFT", schedule: "5월 31일까지(해당 시)" },
  { item: "FLA", schedule: "원칙적으로 매년 7월 15일까지 제출(FLAIR 포털, 해당 시)" },
  { item: "재무제표 감사", schedule: "해당 회계연도·감사 계약에 따른 일정(법인별 상이)" },
  {
    item: "ITR(법인소득세 신고) · 일반",
    schedule:
      "일반 법인 기본기한은 통상 10월 31일. 해당 연도 연장 공지(예: AY 2026-27 일부 감사 대상 11월 21일 등)는 별도 확인",
  },
  {
    item: "ITR(법인소득세 신고) · 이전가격 보고 대상",
    schedule: "이전가격 보고가 필요한 경우 통상 11월 30일(연도·공지 확인)",
  },
  {
    item: "ROC AOC-4(재무제표)",
    schedule: "원칙적으로 AGM 종료 후 30일 이내(연장·면제 공고 확인)",
  },
  {
    item: "ROC MGT-7 / MGT-7A(연간 법인 신고)",
    schedule: "원칙적으로 AGM 종료 후 60일 이내(연장·면제 공고 확인)",
  },
  {
    item: "TP Audit Report",
    schedule: "국제거래·적용 법인 등 해당 시, 통상 11월 30일 ITR 일정과 연동(연도별 확인)",
  },
  {
    item: "GSTR-9(연간 GST)",
    schedule: "연매출 2 Cr 초과 시 의무, 이하 시 선택(연도·고시에 따름)",
  },
  {
    item: "GSTR-9C(GST 조정명세서)",
    schedule:
      "적용 제외 대상을 제외하고, 회계연도 총매출이 ₹5 crore를 초과하는 등록사업자는 자체 인증 조정명세서 제출 대상(고시·면제 요건 확인)",
  },
];

export type IndiaCompliancePortalRow = {
  readonly label: string;
  readonly href: string;
  readonly note: string;
};

export const indiaCompliancePortalRows: readonly IndiaCompliancePortalRow[] = [
  { label: "GST", href: "https://www.gst.gov.in", note: "GST 포털" },
  {
    label: "e-Filing(소득세)",
    href: "https://portal.incometaxindiaefiling.gov.in",
    note: "법인·개인 소득세 등",
  },
  { label: "Traces(TDS)", href: "https://www.tdscpc.gov.in", note: "TDS·Form 등" },
  { label: "FRRO", href: "https://indianfrro.gov.in", note: "비자·체류 등" },
  { label: "FIRMS(RBI)", href: "https://firms.rbi.org.in", note: "FDI 등 외국인투자 보고" },
  { label: "FLAIR(RBI)", href: "https://flair.rbi.org.in", note: "FLA(해외 부채·자산) 보고" },
  { label: "E-Way Bill", href: "https://ewaybillgst.gov.in", note: "물류 이동" },
  { label: "Ice Gate", href: "https://www.icegate.gov.in", note: "관세·세금 납부" },
  { label: "MCA", href: "https://www.mca.gov.in", note: "기업부·ROC 등" },
];

export const leadership: LeadershipMember[] = [
  {
    role: "대표이사",
    name: "이민섭",
    email: "lee@msventures.in",
    summary:
      "인도 시장의 복잡한 제도와 행정 환경에서 인도 현지 실무를 직접 지원하는 파트너로서, 법인 설립부터 회계·세무·수출입·비자·호텔·HR까지 운영을 인하우스로 관리하고 전문·승인 업무는 CPA·CA와 협업하는 통합 솔루션을 이끕니다.",
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
    photoSrc: "/team/ca-kashul-sharma.png?v=20261108c",
  },
];

/** 회사 소개 페이지 대표이사 인사말 전문. 대외 PDF와 문구를 맞출 때는 이 상수만 수정하면 됩니다. */
export const ceoStatementFull = `MSV는 인도 시장에서 활동하는 외국계 기업에게 단순한 컨설팅을 넘어, 인도 현지 실무를 직접 지원하는 파트너가 되기 위해 설립되었습니다. 복잡한 제도와 언어·문화·행정 환경 속에서도 의사결정이 지연되지 않도록, 현장에서 직접 수행하는 것을 원칙으로 합니다.

호텔·제조·부동산·유통 등 다양한 산업의 수십 개 한국 기업과 함께 설립부터 정착·운영·확장까지 경험을 쌓아 왔습니다. MSV의 실무팀이 주요 업무를 직접 수행하며, 전문 자격과 별도 검토가 필요한 업무는 해당 분야 전문가와 협업하여 지원합니다. Ind AS·인도 세법과 본사 보고 요건을 함께 맞추는 한·인 회계 전문가 협업으로 투명한 재무 보고와 컴플라이언스를 뒷받침합니다.

앞으로도 인도에서 비즈니스를 준비하시는 분들께 검증된 현장 경험과 실행력을 바탕으로 든든한 파트너가 되겠습니다. 감사합니다.`;

/** 회사 소개 페이지 부대표(하헌범) 소개 본문. 대외 자료와 문구를 맞출 때는 이 상수만 수정하면 됩니다. */
export const vpHaStatementFull = `하헌범 부대표는 공인회계사(CPA) 자격을 보유한 재무 및 경영 전문인으로, 현재 MSV의 한·인도 간 전략적 협력 및 고객 커뮤니케이션을 총괄하고 있습니다.

그는 한국과 인도 양국의 회계 및 세무 제도, 투자 구조, 기업 환경 전반에 대한 깊은 이해를 바탕으로, 복잡한 인도 시장 진출과 운영을 보다 체계적이고 효율적으로 끌어가는 데 강점을 지니고 있습니다. 하헌범 부대표는 국내 대기업, 회계법인, 전략 컨설팅 펌, 투자회사 등에서 다양한 실무 경험을 쌓았으며, 국내외 기업의 투자, 실사, M&A 자문 프로젝트를 다수 수행해 온 경험이 있습니다. 유통, 금융, 발전, 에너지 등 다양한 산업군에 대한 이해와 전문성을 바탕으로, 중국, 인도, 동남아시아 등지의 해외 기업에 대한 ADB, DEG, DFJ, Mitsui 등 국제 금융기관 및 전략적 투자자들과의 공동투자 경험도 보유하고 있습니다.

현재는 MSV의 공동 리더로서, 한국 고객사와의 원활한 소통과 문화적 이해를 바탕으로 인도 내 안정적 사업 운영을 지원하고 있으며, 장기적인 관점에서 고객사의 성장과 지속 가능한 성과 창출을 돕는 신뢰할 수 있는 파트너 역할을 수행하고 있습니다.`;

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
