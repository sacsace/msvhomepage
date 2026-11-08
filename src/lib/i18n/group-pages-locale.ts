import type { SiteLocale } from "@/lib/site-locale";
import { pickLocale } from "@/lib/site-locale";
import { company } from "@/lib/site-content";

/** `groupCompanies` 슬러그와 동일 순서로 유지 */
export const GROUP_COMPANY_SLUGS = [
  "neocle-international",
  "seda-engineering-india",
  "lotus-korean-hotel",
] as const;

export type GroupCompanySlug = (typeof GROUP_COMPANY_SLUGS)[number];

export function isGroupCompanySlug(s: string): s is GroupCompanySlug {
  return (GROUP_COMPANY_SLUGS as readonly string[]).includes(s);
}

/** `/group` 목록 페이지 */
export type GroupIndexPageCopy = {
  metaTitle: string;
  metaDescription: string;
  pageTitle: string;
  pageDescription: string;
  sectionPartnersEyebrow: string;
  sectionPartnersTitle: string;
  sectionPartnersSubtitle: string;
  sectionCompanyEyebrow: string;
  sectionCompanyTitle: string;
  aboutLeadBefore: string;
  aboutLinkLabel: string;
  aboutLeadAfter: string;
};

const groupIndexKo: GroupIndexPageCopy = {
  metaTitle: "그룹사",
  metaDescription: `${company.shortName} 인도 현지 그룹사 법인·브랜드`,
  pageTitle: "그룹사",
  pageDescription: `${company.shortName}가 인도 현지에서 역량을 보완하는 그룹사 법인·브랜드입니다.`,
  sectionPartnersEyebrow: "Partners",
  sectionPartnersTitle: "브랜드 · 법인",
  sectionPartnersSubtitle: "각 법인을 선택하면 상세 소개·웹사이트·소개 자료를 확인할 수 있습니다.",
  sectionCompanyEyebrow: "Company",
  sectionCompanyTitle: "MSV 소개",
  aboutLeadBefore: "",
  aboutLinkLabel: "회사 소개 전체 보기",
  aboutLeadAfter: "에서 비전·연혁·사업부를 함께 확인하실 수 있습니다.",
};

const groupIndexEn: GroupIndexPageCopy = {
  metaTitle: "Group companies",
  metaDescription: `${company.shortName} — India-based group companies and brands.`,
  pageTitle: "Group companies",
  pageDescription: `${company.shortName} works with India-based group companies and brands that complement our capabilities.`,
  sectionPartnersEyebrow: "Partners",
  sectionPartnersTitle: "Brands & entities",
  sectionPartnersSubtitle: "Open each profile for details, websites and downloadable materials where available.",
  sectionCompanyEyebrow: "Company",
  sectionCompanyTitle: "About MSV",
  aboutLeadBefore: "Visit ",
  aboutLinkLabel: "About us",
  aboutLeadAfter: " for our vision, milestones and business lines.",
};

const groupIndexZh: GroupIndexPageCopy = {
  metaTitle: "集团公司",
  metaDescription: `${company.shortName} — 印度本土集团公司与品牌。`,
  pageTitle: "集团公司",
  pageDescription: `${company.shortName} 在印度本土与集团公司、品牌协同，补足执行能力。`,
  sectionPartnersEyebrow: "Partners",
  sectionPartnersTitle: "品牌 · 法人",
  sectionPartnersSubtitle: "点击各法人可查看简介、网站及资料下载（如有）。",
  sectionCompanyEyebrow: "Company",
  sectionCompanyTitle: "MSV 简介",
  aboutLeadBefore: "在",
  aboutLinkLabel: "公司简介",
  aboutLeadAfter: "中可一并了解愿景、沿革与业务部门。",
};

export function groupIndexPageCopy(locale: SiteLocale): GroupIndexPageCopy {
  return pickLocale(locale, { ko: groupIndexKo, en: groupIndexEn, zh: groupIndexZh });
}

/** `/group/[slug]` 공통 UI 라벨 */
export type GroupCompanyPageChrome = {
  absoluteTitleSuffix: string;
  aboutEyebrow: string;
  aboutTitle: string;
  highlightsEyebrow: string;
  highlightsTitle: string;
  quickEyebrow: string;
  websiteLabel: string;
  pdfLabel: string;
  galleryEyebrow: string;
  galleryTitle: string;
  majorCustomersEyebrow: string;
  majorCustomersTitle: string;
  locationEyebrow: string;
  locationTitle: string;
  openInGoogleMaps: string;
  footerLead: string;
  linkGroupList: string;
  linkAbout: string;
};

const chromeKo: GroupCompanyPageChrome = {
  absoluteTitleSuffix: "그룹사",
  aboutEyebrow: "About",
  aboutTitle: "소개",
  highlightsEyebrow: "Highlights",
  highlightsTitle: "주요 내용",
  quickEyebrow: "바로가기",
  websiteLabel: "웹사이트",
  pdfLabel: "비즈니스 소개 PDF",
  galleryEyebrow: "Gallery",
  galleryTitle: "사진",
  majorCustomersEyebrow: "Major customers",
  majorCustomersTitle: "주요 고객사",
  locationEyebrow: "Location",
  locationTitle: "위치",
  openInGoogleMaps: "Google 지도에서 크게 보기 →",
  footerLead: "그룹사 목록으로 돌아가거나 회사 소개를 이어서 보실 수 있습니다.",
  linkGroupList: "그룹사 목록",
  linkAbout: "회사 소개",
};

const chromeEn: GroupCompanyPageChrome = {
  absoluteTitleSuffix: "Group companies",
  aboutEyebrow: "About",
  aboutTitle: "Introduction",
  highlightsEyebrow: "Highlights",
  highlightsTitle: "Key points",
  quickEyebrow: "Quick links",
  websiteLabel: "Website",
  pdfLabel: "Business profile (PDF)",
  galleryEyebrow: "Gallery",
  galleryTitle: "Photos",
  majorCustomersEyebrow: "Major customers",
  majorCustomersTitle: "Key customers",
  locationEyebrow: "Location",
  locationTitle: "Office location",
  openInGoogleMaps: "Open in Google Maps →",
  footerLead: "Return to the group companies list or continue to the company profile.",
  linkGroupList: "Group companies",
  linkAbout: "About us",
};

const chromeZh: GroupCompanyPageChrome = {
  absoluteTitleSuffix: "集团公司",
  aboutEyebrow: "About",
  aboutTitle: "简介",
  highlightsEyebrow: "Highlights",
  highlightsTitle: "要点",
  quickEyebrow: "快速链接",
  websiteLabel: "网站",
  pdfLabel: "业务介绍 PDF",
  galleryEyebrow: "Gallery",
  galleryTitle: "图片",
  majorCustomersEyebrow: "Major customers",
  majorCustomersTitle: "主要客户",
  locationEyebrow: "Location",
  locationTitle: "位置",
  openInGoogleMaps: "在 Google 地图中放大查看 →",
  footerLead: "返回集团公司列表，或继续查看公司简介。",
  linkGroupList: "集团公司",
  linkAbout: "公司介绍",
};

export function groupCompanyPageChrome(locale: SiteLocale): GroupCompanyPageChrome {
  return pickLocale(locale, { ko: chromeKo, en: chromeEn, zh: chromeZh });
}

/** 그룹사별 본문·메타(카드·상세 공통) */
export type GroupCompanyContentCopy = {
  metaDescription: string;
  role: string;
  intro: string;
  highlights: readonly string[];
  logoAlt: string;
  /** 문자열 목록만(로고 없음) — `majorCustomerRows`가 있으면 우선 */
  majorCustomers?: readonly string[];
  /** 이름 + 선택적 로고 URL */
  majorCustomerRows?: readonly { name: string; logoSrc?: string }[];
};

const bodies: Record<GroupCompanySlug, { ko: GroupCompanyContentCopy; en: GroupCompanyContentCopy; zh: GroupCompanyContentCopy }> = {
  "neocle-international": {
    ko: {
      metaDescription:
        "Neocle International Private Limited — PA66 에어백 원단·스크랩 수출, 석영·자단 상담, 인도 수출입 대행. www.neocle.in",
      role: "원자재 공급·수출입 대행",
      intro: `Neocle International Private Limited는 인도 타밀나두주 파파람바캄에 약 836㎡ 규모 창고를, 카르나타카주 벵갈루루에 사무실을 두고 원자재 공급과 수출입 대행을 수행하는 법인입니다.

코팅·비코팅 PA66 에어백 원단을 색상·규격별로 선별해 톤백으로 포장한 뒤 태국과 한국으로 수출하며, 스크랩은 한국으로 공급합니다. 석영과 자단(Red Sandalwood)은 구매를 희망하는 기업과 공급 조건을 협의하며, 자단은 관련 허가와 필수 서류가 확인된 물량에 한해 거래를 진행합니다.

상업송장·포장명세서·선하증권·원산지증명서 등 무역 서류 준비, 신용장·거래 조건 검토, 해상·항공·내륙 운송 조율까지 문의부터 화물 인도·정산까지 이어지는 수출입 실무를 지원합니다. MSV의 법인 설립·운영 고객과도 연계해 견적·선적·문서·현지 창고 실행력을 보강합니다.

공식 웹사이트(www.neocle.in)에서 품목·거래 안내와 문의 양식을 확인할 수 있습니다.`,
      highlights: [
        "PA66 에어백 원단(코팅·비코팅) 선별·톤백 포장 후 태국·한국 수출",
        "스크랩(scrap) 한국 수출",
        "석영·자단(Red Sandalwood) 구매·공급 상담(허가·서류 확인 후 거래)",
        "인도 수입·해외 수출 대행 및 무역 서류·인코텀즈·운송 조율",
        "타밀나두 파파람바캄 창고(약 836㎡) 보관·선별·출고, 벵갈루루 사무실",
      ],
      logoAlt: "Neocle International 로고",
      majorCustomers: [
        "태국·한국 PA66 에어백 원단 바이어",
        "한국 스크랩·이차 원료 구매처",
        "석영·자단 등 원자재 구매 희망 기업",
        "Minsub Ventures 법인 고객(물류·수출입·창고 연계)",
        "한국계 및 인도 현지 제조·유통사(수입·수출 대행)",
      ],
    },
    en: {
      metaDescription:
        "Neocle International Private Limited — PA66 airbag fabric & scrap exports, quartz & red sandalwood inquiry, India trade agency. www.neocle.in",
      role: "Raw materials & trade agency",
      intro: `Neocle International Private Limited supplies raw materials and provides import/export agency services from India, with an ~836㎡ warehouse in Papparambakkam, Tamil Nadu, and an office in Bengaluru, Karnataka.

Coated and uncoated PA66 airbag fabrics are sorted by colour and specification, packed in ton bags, and exported to Thailand and Korea. Scrap is supplied to Korea. Quartz and red sandalwood are offered to interested buyers; red sandalwood trades proceed only after permits and required documents are confirmed.

Support covers trade documentation (commercial invoice, packing list, B/L, certificate of origin), LC and Incoterms review, and sea/air/inland logistics—from inquiry through delivery and settlement. The company also backs MSV clients with quotation, shipment, paperwork and warehouse execution.

Visit www.neocle.in for product details and the inquiry form.`,
      highlights: [
        "PA66 airbag fabric (coated/uncoated): sort, ton-bag pack, export to Thailand & Korea",
        "Scrap exports to Korea",
        "Quartz & red sandalwood supply inquiries (permits/docs required for sandalwood)",
        "India import & overseas export agency; trade docs, Incoterms & freight coordination",
        "~836㎡ Tamil Nadu warehouse (storage, sorting, dispatch) and Bengaluru office",
      ],
      logoAlt: "Neocle International logo",
      majorCustomers: [
        "PA66 airbag fabric buyers in Thailand and Korea",
        "Scrap and secondary-material buyers in Korea",
        "Companies seeking quartz or red sandalwood supply",
        "Minsub Ventures incorporated clients (logistics, trade & warehousing)",
        "Korean and India-based manufacturers and distributors (trade agency)",
      ],
    },
    zh: {
      metaDescription:
        "Neocle International Private Limited — PA66 安全气囊面料与废料出口、石英与紫檀咨询、印度进出口代理。www.neocle.in",
      role: "原材料供应与进出口代理",
      intro: `Neocle International Private Limited 在印度泰米尔纳德邦帕帕兰巴卡姆运营约 836㎡ 仓库，并在卡纳塔克邦班加罗尔设有办公室，从事原材料供应与进出口代理。

将涂层/非涂层 PA66 安全气囊面料按颜色与规格分选后以吨袋包装，出口至泰国与韩国；废料供应韩国。石英与紫檀（Red Sandalwood）面向有采购意向的企业协商供应条件，紫檀仅在相关许可与必要单证齐备后进行交易。

支持商业发票、装箱单、提单、原产地证等贸易单证准备，信用证与贸易条款审核，以及海运、空运、内陆运输协调——从询价到交货与结算。亦与 MSV 法人设立及运营客户衔接，强化报价、出运、单证与当地仓库执行。

详情与询盘表单见官网 www.neocle.in。`,
      highlights: [
        "PA66 安全气囊面料（涂层/非涂层）分选、吨袋包装后出口泰国与韩国",
        "废料（scrap）出口韩国",
        "石英与紫檀采购/供应咨询（紫檀需许可与单证确认）",
        "印度进口与海外出口代理，贸易单证、Incoterms 与运输协调",
        "泰米尔纳德仓库（约 836㎡）仓储分选出库，班加罗尔办公室",
      ],
      logoAlt: "Neocle International 标志",
      majorCustomers: [
        "泰国与韩国 PA66 安全气囊面料买方",
        "韩国废料与次生原料买方",
        "寻求石英或紫檀供应的企业",
        "Minsub Ventures 法人客户（物流、进出口与仓储衔接）",
        "韩国及印度本土制造与流通企业（进出口代理）",
      ],
    },
  },
  "seda-engineering-india": {
    ko: {
      metaDescription:
        "Seda Engineering India Private Limited — 산업용 장비·압축기 엔지니어링, 플랜트·공장 설비 도입 및 유지보수.",
      role: "엔지니어링 회사",
      intro: `Seda Engineering India Private Limited는 산업용 장비·압축기 등 엔지니어링 분야에서 제조·플랜트 현장의 설비 도입·유지보수와 관련된 기술·공급 체계를 바탕으로, 인도 내 공장·설비 프로젝트에 실질적인 엔지니어링 파트너로 기여합니다.`,
      highlights: ["산업용 장비·압축기 엔지니어링", "플랜트·공장 설비 도입 및 유지보수"],
      logoAlt: "Seda Engineering India 로고",
      majorCustomers: [
        "인도 내 공장·플랜트 설비 도입·유지보수 프로젝트",
        "산업용 장비·압축기 OEM·공급사와 협력하는 제조 현장",
        "제조·에너지·화학 등 설비 투자·증설 수요 기업",
      ],
    },
    en: {
      metaDescription:
        "Seda Engineering India Private Limited — industrial equipment and compressor engineering; plant and factory installation and maintenance.",
      role: "Engineering",
      intro: `Seda Engineering India Private Limited contributes as an engineering partner to factory and plant projects in India, drawing on technical and supply capabilities for industrial equipment and compressors—including installation and maintenance at manufacturing and plant sites.`,
      highlights: ["Industrial equipment & compressor engineering", "Plant/factory installation and maintenance"],
      logoAlt: "Seda Engineering India logo",
      majorCustomers: [
        "Plant and factory equipment installation & maintenance projects across India",
        "Manufacturing sites with industrial equipment and compressor OEM/supplier partners",
        "Manufacturing, energy and process industries investing in capacity and upgrades",
      ],
    },
    zh: {
      metaDescription:
        "Seda Engineering India Private Limited — 工业设备与压缩机工程，工厂与产线设备安装及维护。",
      role: "工程公司",
      intro: `Seda Engineering India Private Limited 依托工业设备、压缩机等工程领域的技术与供应体系，在印度工厂与设施项目中承担设备导入与维护相关工作，作为工程侧合作伙伴提供支持。`,
      highlights: ["工业设备与压缩机工程", "工厂与产线设备安装及维护"],
      logoAlt: "Seda Engineering India 标志",
      majorCustomers: [
        "印度境内工厂与产线设备安装及维护项目",
        "与工业设备、压缩机 OEM/供应商协同的制造现场",
        "制造、能源及流程工业等具备设备投资与扩产需求的企业",
      ],
    },
  },
  "lotus-korean-hotel": {
    ko: {
      metaDescription:
        "Lotus Korean Hotel — 방갈로르 한국형 호텔·숙박, 비즈니스·장기 체류. hotellotus.in",
      role: "한국형 호텔 · 숙박",
      intro: `Lotus Korean Hotel은 방갈로르에서 비즈니스·장기 체류에 맞춘 한국형 호텔·숙박 서비스를 제공합니다.

MSV 고객사와 방문 인력의 거점 숙박, 프로젝트 기간 체류 등을 함께 지원하며, 현지 업무와 연계된 숙박 옵션을 제공합니다.`,
      highlights: ["비즈니스·장기 숙박", "온라인: hotellotus.in"],
      logoAlt: "Lotus Korean Hotel 로고",
      majorCustomers: [
        "Minsub Ventures 고객사 및 협력사 방문·체류 인력",
        "인도 장기 출장·프로젝트 기간 체류 팀",
        "한국계·국제 기업 비즈니스·장기 숙박 고객",
      ],
    },
    en: {
      metaDescription:
        "Lotus Korean Hotel — Korean-style hotel and accommodation in Bangalore for business and extended stays. hotellotus.in",
      role: "Korean-style hotel & lodging",
      intro: `Lotus Korean Hotel offers Korean-style hotel and accommodation in Bangalore tailored to business and longer stays.

Together with MSV we support base lodging for client teams and visitors, project-duration stays and options linked to local operations.`,
      highlights: ["Business & extended stays", "Online: hotellotus.in"],
      logoAlt: "Lotus Korean Hotel logo",
      majorCustomers: [
        "Minsub Ventures clients, partners and visiting teams",
        "Long-assignment and project-duration stays in India",
        "Korean and international corporate guests on business and extended stays",
      ],
    },
    zh: {
      metaDescription:
        "Lotus Korean Hotel — 班加罗尔韩式酒店与住宿，商务与长住。hotellotus.in",
      role: "韩式酒店 · 住宿",
      intro: `Lotus Korean Hotel 在班加罗尔提供面向商务与长住的韩式酒店与住宿服务。

与 MSV 协同支持客户与来访人员的驻地住宿、项目期停留及与当地业务衔接的住宿方案。`,
      highlights: ["商务与长住", "线上：hotellotus.in"],
      logoAlt: "Lotus Korean Hotel 标志",
      majorCustomers: [
        "Minsub Ventures 客户、合作伙伴及来访与驻留人员",
        "印度长期外派与项目周期住宿团队",
        "韩国及国际企业商务与长住宾客",
      ],
    },
  },
};

export function groupCompanyContentCopy(slug: GroupCompanySlug, locale: SiteLocale): GroupCompanyContentCopy {
  return pickLocale(locale, bodies[slug]);
}
