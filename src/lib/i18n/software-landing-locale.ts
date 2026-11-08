import { company } from "@/lib/site-content";
import type { SiteLocale } from "@/lib/site-locale";
import { pickLocale } from "@/lib/site-locale";

export type SoftwareLandingCard = {
  href: string;
  title: string;
  desc: string;
};

export type SoftwareSiPillar = {
  title: string;
  body: string;
};

export type SoftwareWebSite = {
  href: string;
  label: string;
  note: string;
};

export type SoftwareLandingCopy = {
  metaTitle: string;
  metaDescription: string;
  pageTitle: string;
  pageDescription: string;
  productsEyebrow: string;
  productsTitle: string;
  productsLead: string;
  cards: readonly SoftwareLandingCard[];
  openSite: string;
  viewDetail: string;
  siEyebrow: string;
  siTitle: string;
  siLead: string;
  siPillars: readonly SoftwareSiPillar[];
  webEyebrow: string;
  webTitle: string;
  webLead: string;
  webSites: readonly SoftwareWebSite[];
  contactCta: string;
};

const webSitesKo: readonly SoftwareWebSite[] = [
  { href: "https://www.ickoa.org", label: "www.ickoa.org", note: "협회·기관 사이트" },
  { href: "https://www.winajes.com", label: "www.winajes.com", note: "기업·브랜드 사이트" },
  { href: "https://www.hksc.in", label: "www.hksc.in", note: "인도 현지 기업 사이트" },
  { href: "https://www.neocle.in", label: "www.neocle.in", note: "그룹사 · Neocle" },
  { href: "https://www.hotellotus.in", label: "www.hotellotus.in", note: "그룹사 · Hotel Lotus" },
];

const webSitesEn: readonly SoftwareWebSite[] = [
  { href: "https://www.ickoa.org", label: "www.ickoa.org", note: "Association / institution" },
  { href: "https://www.winajes.com", label: "www.winajes.com", note: "Corporate / brand" },
  { href: "https://www.hksc.in", label: "www.hksc.in", note: "India local business" },
  { href: "https://www.neocle.in", label: "www.neocle.in", note: "Group · Neocle" },
  { href: "https://www.hotellotus.in", label: "www.hotellotus.in", note: "Group · Hotel Lotus" },
];

const webSitesZh: readonly SoftwareWebSite[] = [
  { href: "https://www.ickoa.org", label: "www.ickoa.org", note: "协会 / 机构站点" },
  { href: "https://www.winajes.com", label: "www.winajes.com", note: "企业 / 品牌站点" },
  { href: "https://www.hksc.in", label: "www.hksc.in", note: "印度本地企业站点" },
  { href: "https://www.neocle.in", label: "www.neocle.in", note: "集团 · Neocle" },
  { href: "https://www.hotellotus.in", label: "www.hotellotus.in", note: "集团 · Hotel Lotus" },
];

const ko: SoftwareLandingCopy = {
  metaTitle: "소프트웨어",
  metaDescription: `${company.shortName} 소프트웨어 — MVS·HeresNow·급여 메일·WISC, SI(솔루션·SaaS·CRM), 웹사이트 개발`,
  pageTitle: "소프트웨어",
  pageDescription:
    "회계·세무·현장 실행을 뒷받침하는 업무 관리 시스템과 실무 지원 도구, SI·웹사이트 개발을 소개합니다. 업무 통합 시스템(MVS), 출퇴근 기록(HeresNow), 급여 명세서 이메일, WISC, 맞춤 SI(솔루션·SaaS·CRM), 웹사이트 구축 사례를 확인하세요.",
  productsEyebrow: "Products",
  productsTitle: "운영 소프트웨어",
  productsLead: "법인 운영·근태·급여·보안 점검을 위한 제품·도구입니다.",
  cards: [
    {
      href: "/software/mvs",
      title: "업무 통합 시스템 (MVS)",
      desc: `${company.shortName}가 운영하는 웹 업무 통합 시스템입니다. 인사·근태·급여·전자결재·업무·재고·파트너 등 법인 운영을 하나의 계정으로 통합 관리할 수 있으며, 필요 시 회계·세무 서비스와 연계할 수 있습니다.`,
    },
    {
      href: "/software/herenow",
      title: "출퇴근 기록 시스템 (HeresNow)",
      desc: "회사별로 데이터를 분리하여 관리하는 GPS 기반 출퇴근·근태 관리 웹앱입니다.",
    },
    {
      href: "/software/payroll-mailer",
      title: "급여 명세서 이메일 발송 시스템",
      desc: "엑셀 급여표를 업로드해 직원별 HTML 메일과 PDF 명세를 발송합니다. 발송 처리 과정에서 사이트 DB에는 급여 원본을 저장하지 않습니다.",
    },
    {
      href: "/software/wisc",
      title: "Website Information & Security Checker",
      desc: "웹사이트 도메인의 보안·인증·성능을 점검합니다. SSL·헤더·인증 응답 분석, 사이트 간 성능 비교와 분석 결과 내보내기(JSON)를 지원합니다.",
    },
  ],
  openSite: "사이트 열기 ↗",
  viewDetail: "자세히 보기 →",
  siEyebrow: "SI",
  siTitle: "솔루션 · SaaS · CRM",
  siLead:
    "현장 요구에 맞춘 SI(시스템 통합)로 솔루션 구축, SaaS 운영, CRM 도입·연동을 지원합니다. 요구사항 정리부터 설계·개발·배포·운영까지 한 흐름으로 이어갑니다.",
  siPillars: [
    {
      title: "솔루션 (Solution)",
      body: "업무 프로세스·데이터·권한 구조를 분석해 맞춤형 웹·업무 시스템을 설계·구축합니다. 기존 도구와의 연계와 단계적 도입을 함께 설계합니다.",
    },
    {
      title: "SaaS",
      body: "구독형 서비스 형태로 제품화·운영을 지원합니다. 회사별 데이터 분리, 권한, 빌링·알림 등 운영에 필요한 기반을 정리합니다.",
    },
    {
      title: "CRM",
      body: "고객·리드·계약·후속 관리 흐름을 CRM으로 정리하고, 회계·영업·현장 데이터와 연결할 수 있도록 도입·커스터마이징·연동을 지원합니다.",
    },
  ],
  webEyebrow: "Web",
  webTitle: "웹사이트 개발",
  webLead:
    "기업·협회·호텔·그룹사 등 브랜드에 맞는 공식 웹사이트를 기획·디자인·개발합니다. 반응형 레이아웃, 다국어, 문의·소개 구조를 중심으로 구축·운영을 지원합니다.",
  webSites: webSitesKo,
  contactCta: "도입·구축 문의 →",
};

const en: SoftwareLandingCopy = {
  metaTitle: "Software",
  metaDescription: `${company.shortName} software — MVS, HeresNow, payroll mailer, WISC, SI (solution / SaaS / CRM), and website development.`,
  pageTitle: "Software",
  pageDescription:
    "Software lines and SI / website work that support accounting, tax and on-the-ground execution — MVS, HeresNow, payroll mailer, WISC, custom SI (solution, SaaS, CRM), and selected websites.",
  productsEyebrow: "Products",
  productsTitle: "Operations software",
  productsLead: "Products and tools for entity operations, attendance, payroll and site security checks.",
  cards: [
    {
      href: "/software/mvs",
      title: "Integrated Business System (MVS)",
      desc: `A web integrated business system operated by ${company.shortName}. HR, attendance, payroll, e-approval, work, inventory and partners share one login, with optional links to accounting and tax services.`,
    },
    {
      href: "/software/herenow",
      title: "Attendance system (HeresNow)",
      desc: "A GPS-based attendance web app isolated by company (tenant).",
    },
    {
      href: "/software/payroll-mailer",
      title: "Payroll payslip email",
      desc: "Upload an Excel payroll sheet to send HTML email and PDF payslips per employee. Processed in browser/request memory only — not stored in the site database.",
    },
    {
      href: "/software/wisc",
      title: "Website Information & Security Checker",
      desc: "Checks domain security, certificates and performance — SSL, headers, auth response analysis and cross-site timing comparisons.",
    },
  ],
  openSite: "Open site ↗",
  viewDetail: "Learn more →",
  siEyebrow: "SI",
  siTitle: "Solution · SaaS · CRM",
  siLead:
    "We deliver SI (system integration) for custom solutions, SaaS operations and CRM adoption. From requirements through design, build, release and run.",
  siPillars: [
    {
      title: "Solution",
      body: "We analyse process, data and access models to design and build tailored web / business systems, including phased rollout and links to existing tools.",
    },
    {
      title: "SaaS",
      body: "We support productisation and operations in multi-tenant subscription form — tenant isolation, roles, billing and notification foundations.",
    },
    {
      title: "CRM",
      body: "We help adopt and customise CRM for leads, customers and contracts, and connect it with accounting, sales and field data where needed.",
    },
  ],
  webEyebrow: "Web",
  webTitle: "Website development",
  webLead:
    "We plan, design and build official sites for companies, associations, hotels and group brands — responsive layouts, multilingual pages and inquiry structures.",
  webSites: webSitesEn,
  contactCta: "Ask about delivery →",
};

const zh: SoftwareLandingCopy = {
  metaTitle: "软件",
  metaDescription: `${company.shortName} 软件 — MVS、HeresNow、工资单邮件、WISC、SI（解决方案 / SaaS / CRM）与网站建设。`,
  pageTitle: "软件",
  pageDescription:
    "介绍支撑会计、税务与现场执行的软件线及 SI、网站建设 — MVS、HeresNow、工资单邮件、WISC、定制 SI（解决方案、SaaS、CRM）与精选网站案例。",
  productsEyebrow: "Products",
  productsTitle: "运营软件",
  productsLead: "面向法人运营、考勤、薪酬与站点安全检测的产品与工具。",
  cards: [
    {
      href: "/software/mvs",
      title: "业务集成系统（MVS）",
      desc: `由 ${company.shortName} 运营的网页业务集成系统。人事、考勤、薪酬、电子审批、工作、库存与伙伴统一登录，并可与会计税务服务联动。`,
    },
    {
      href: "/software/herenow",
      title: "考勤记录系统（HeresNow）",
      desc: "按公司（租户）隔离的基于 GPS 的考勤网页应用。",
    },
    {
      href: "/software/payroll-mailer",
      title: "工资单邮件发送",
      desc: "上传 Excel 工资表，按员工发送 HTML 邮件与 PDF 工资单。仅在浏览器/请求内存处理，不写入站点数据库。",
    },
    {
      href: "/software/wisc",
      title: "Website Information & Security Checker",
      desc: "检查域名安全、证书与性能 — SSL、响应头、认证分析与站点间耗时对比。",
    },
  ],
  openSite: "打开网站 ↗",
  viewDetail: "了解更多 →",
  siEyebrow: "SI",
  siTitle: "解决方案 · SaaS · CRM",
  siLead:
    "以 SI（系统集成）方式支持定制解决方案、SaaS 运营与 CRM 导入联动，从需求到设计、开发、上线与运营贯通。",
  siPillars: [
    {
      title: "解决方案 (Solution)",
      body: "分析流程、数据与权限结构，设计并构建定制网页/业务系统，并规划与现有工具的衔接与分步上线。",
    },
    {
      title: "SaaS",
      body: "支持多租户订阅形态的产品化与运营 — 租户隔离、权限、计费与通知等基础能力。",
    },
    {
      title: "CRM",
      body: "协助导入与定制 CRM，整理线索、客户与合同流程，并按需与会计、销售、现场数据联动。",
    },
  ],
  webEyebrow: "Web",
  webTitle: "网站建设",
  webLead:
    "为企业、协会、酒店与集团品牌策划、设计并开发官方网站，覆盖响应式布局、多语言与咨询结构。",
  webSites: webSitesZh,
  contactCta: "咨询交付 →",
};

export function softwareLandingCopy(locale: SiteLocale): SoftwareLandingCopy {
  return pickLocale(locale, { ko, en, zh });
}
