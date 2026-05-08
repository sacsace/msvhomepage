import type { SiteLocale } from "@/lib/site-locale";
import { pickLocale } from "@/lib/site-locale";
import { company } from "@/lib/site-content";
import { wilmatMajorCustomerDisplayRows, type WilmatMajorCustomerDisplayRow } from "@/lib/wilmat-major-customers";

/** `groupCompanies` 슬러그와 동일 순서로 유지 */
export const GROUP_COMPANY_SLUGS = [
  "neocle-international",
  "seda-engineering-india",
  "lotus-korean-hotel",
  "wilmat",
  "jw-industrial-tech-service",
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
  sectionPartnersSubtitle: "카드를 선택하면 상세 소개·웹사이트·소개 자료를 확인할 수 있습니다.",
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
  sectionPartnersSubtitle: "Select a card for profiles, websites and downloadable materials where available.",
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
  sectionPartnersSubtitle: "点击卡片可查看简介、网站及资料下载（如有）。",
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
  majorCustomersTitle: "주요 고객",
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
  /** Wilmat: 이름 + 선택적 파비콘 URL */
  majorCustomerRows?: readonly WilmatMajorCustomerDisplayRow[];
};

const bodies: Record<GroupCompanySlug, { ko: GroupCompanyContentCopy; en: GroupCompanyContentCopy; zh: GroupCompanyContentCopy }> = {
  "neocle-international": {
    ko: {
      metaDescription:
        "Neocle International Private Limited — 인도 현지 수출입 전문 법인. 스크랩 수출·수입 대행·창고 운영으로 물류·통관 실행력을 제공합니다.",
      role: "수출입 전문회사",
      intro: `Neocle International Private Limited는 인도 현지에서 수출입을 전문으로 하는 법인으로, 스크랩(scrap) 수출·수입 대행·창고 운영 등을 통해 물류·통관 실행력을 제공합니다.

MSV의 법인 설립·운영 고객과 연계해, 견적·선적·문서·현지 창고까지 실무 단에서 이어지는 수출입 지원을 강화하는 역할을 합니다.`,
      highlights: ["스크랩(scrap) 수출", "수출입 대행", "창고 운영"],
      logoAlt: "Neocle International 로고",
    },
    en: {
      metaDescription:
        "Neocle International Private Limited — India-based import/export company: scrap exports, trade agency, warehousing and customs-ready logistics.",
      role: "Import & export",
      intro: `Neocle International Private Limited is an India-based company focused on import and export, delivering logistics and customs execution through scrap exports, import/export agency work and warehouse operations.

It strengthens hands-on export/import support—quotations, shipments, documentation and local warehouses—for MSV clients in company formation and ongoing operations.`,
      highlights: ["Scrap exports", "Import/export agency", "Warehouse operations"],
      logoAlt: "Neocle International logo",
    },
    zh: {
      metaDescription:
        "Neocle International Private Limited — 印度本土进出口法人，提供废料出口、进出口代理、仓储及关务落地执行。",
      role: "进出口专业公司",
      intro: `Neocle International Private Limited 为注册于印度的进出口专业法人，通过废料（scrap）出口、进出口代理与仓储运营等，提供物流与关务执行能力。

与 MSV 法人设立及运营客户衔接，在报价、出运、单证及当地仓库等实务层面强化进出口支持。`,
      highlights: ["废料（scrap）出口", "进出口代理", "仓储运营"],
      logoAlt: "Neocle International 标志",
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
    },
    en: {
      metaDescription:
        "Seda Engineering India Private Limited — industrial equipment and compressor engineering; plant and factory installation and maintenance.",
      role: "Engineering",
      intro: `Seda Engineering India Private Limited contributes as an engineering partner to factory and plant projects in India, drawing on technical and supply capabilities for industrial equipment and compressors—including installation and maintenance at manufacturing and plant sites.`,
      highlights: ["Industrial equipment & compressor engineering", "Plant/factory installation and maintenance"],
      logoAlt: "Seda Engineering India logo",
    },
    zh: {
      metaDescription:
        "Seda Engineering India Private Limited — 工业设备与压缩机工程，工厂与产线设备安装及维护。",
      role: "工程公司",
      intro: `Seda Engineering India Private Limited 依托工业设备、压缩机等工程领域的技术与供应体系，在印度工厂与设施项目中承担设备导入与维护相关工作，作为工程侧合作伙伴提供支持。`,
      highlights: ["工业设备与压缩机工程", "工厂与产线设备安装及维护"],
      logoAlt: "Seda Engineering India 标志",
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
    },
    en: {
      metaDescription:
        "Lotus Korean Hotel — Korean-style hotel and accommodation in Bangalore for business and extended stays. hotellotus.in",
      role: "Korean-style hotel & lodging",
      intro: `Lotus Korean Hotel offers Korean-style hotel and accommodation in Bangalore tailored to business and longer stays.

Together with MSV we support base lodging for client teams and visitors, project-duration stays and options linked to local operations.`,
      highlights: ["Business & extended stays", "Online: hotellotus.in"],
      logoAlt: "Lotus Korean Hotel logo",
    },
    zh: {
      metaDescription:
        "Lotus Korean Hotel — 班加罗尔韩式酒店与住宿，商务与长住。hotellotus.in",
      role: "韩式酒店 · 住宿",
      intro: `Lotus Korean Hotel 在班加罗尔提供面向商务与长住的韩式酒店与住宿服务。

与 MSV 协同支持客户与来访人员的驻地住宿、项目期停留及与当地业务衔接的住宿方案。`,
      highlights: ["商务与长住", "线上：hotellotus.in"],
      logoAlt: "Lotus Korean Hotel 标志",
    },
  },
  wilmat: {
    ko: {
      metaDescription:
        "Wilmat — 건물 입구 프리미엄 매트팅, 인도 공급·A/S. ANAB·IAF·TRA·KS Q ISO 9001:2015 품질경영.",
      role: "프리미엄 입구 매트·매트팅 시스템",
      intro: `Wilmat은 건물 입구용 프리미엄 매트팅(Entrance Matting) 시스템입니다. 한국 Ecosys의 연구·개발을 바탕으로 하며, 신발에 붙은 먼지를 걸러 실내를 깨끗이 유지하고 미끄럼·넘어짐 위험을 줄입니다. 대리석·타일 등 마감과 조화를 이루는 색·패턴을 선택할 수 있습니다.

국제 인증(예: ANAB, ANSI National Accreditation Board)과 IAF·TRA, KS Q ISO 9001:2015에 맞는 품질경영을 갖추었습니다. 친환경 소재와 긴 수명으로 건물 운영의 지속가능성에도 도움이 됩니다.

알루미늄 프로파일과 나일론 카펫·EPDM 등으로 내구·내후성을 확보했고, 재활용 가능한 구성 요소를 사용합니다. 카세트형이라 손상된 부분만 교체할 수 있으며, 매트를 말아 올리면 프레임 아래에 모인 먼지를 비우기 쉽습니다. 내·외부와 중간 출입 구간에 맞게 배치할 수 있고, 젖은 신발에도 물이 빠지도록 설계되어 외관과 사용감을 오래 유지합니다.

쇼핑몰·호텔·병원·학교·조립 공장 등 통행량이 많은 출입구에 적합합니다. 인도에서 제품을 공급하며 A/S를 지원합니다.

페이지 상단의 PDF 링크는 2022년 12월 기준 영문 제품 카탈로그입니다. 모델 사양·성능 검증·시공 절차·타사 비교·설치 사례가 수록되어 있습니다. 최신 사양은 wilmat.in 또는 담당자에게 문의해 주세요.`,
      highlights: [
        "ANAB·IAF·TRA 및 KS Q ISO 9001:2015 품질경영",
        "매립(Recessed)·노출(Surface)형 등 맞춤 입구 솔루션",
        "먼지 유입 차단, 미끄럼·넘어짐 방지, 외관·청소 비용 절감",
        "알루미늄 베이스·나일론 카펫·EPDM 등 내구·내후성",
        "카세트형으로 부분 교체·롤업 청소 용이",
        "인도 현지 공급 및 A/S",
      ],
      logoAlt: "Wilmat 로고",
      majorCustomerRows: wilmatMajorCustomerDisplayRows(),
    },
    en: {
      metaDescription:
        "Wilmat — premium entrance matting for buildings; India supply & service. ANAB, IAF, TRA and KS Q ISO 9001:2015 aligned QMS.",
      role: "Premium entrance matting",
      intro: `Wilmat is a premium entrance matting system for building entrances, built on R&D from Ecosys in Korea. It traps dirt from footwear to keep interiors clean and reduce slip-and-trip risk, with colours and patterns that harmonise with marble, tile and other finishes.

International accreditation (e.g. ANAB, ANSI National Accreditation Board), IAF and TRA, and quality management aligned with KS Q ISO 9001:2015. Long-lasting, environmentally conscious materials support sustainable operations.

Aluminium profiles with nylon carpet, EPDM and similar materials provide durability and weather resistance, with recyclable components. The cassette format allows partial replacement; rolling up the mat makes it easy to empty dust under the frame. Suitable for indoor, outdoor and intermediate thresholds, with drainage for wet footwear.

Suited to high-traffic entries such as malls, hotels, hospitals, schools and assembly plants. Supplied in India with after-sales support.

The PDF at the top of the page is the English product catalogue as of December 2022 (models, validation, installation, comparisons and case studies). For the latest specifications, see wilmat.in or contact us.`,
      highlights: [
        "ANAB, IAF, TRA and KS Q ISO 9001:2015 quality management",
        "Recessed & surface-mounted tailored entrance solutions",
        "Dirt control, slip/trip reduction, appearance and cleaning cost benefits",
        "Aluminium base, nylon carpet, EPDM — durable and weather-resistant",
        "Cassette format for partial replacement and easy roll-up cleaning",
        "India supply and after-sales service",
      ],
      logoAlt: "Wilmat logo",
      majorCustomerRows: wilmatMajorCustomerDisplayRows(),
    },
    zh: {
      metaDescription:
        "Wilmat — 建筑入口高端地垫系统，印度供货与售后。符合 ANAB、IAF、TRA 及 KS Q ISO 9001:2015 等质量管理要求。",
      role: "高端入口地垫系统",
      intro: `Wilmat 是建筑入口用的高端地垫（Entrance Matting）系统，依托韩国 Ecosys 的研发，过滤鞋底尘土以保持室内清洁并降低滑倒风险，可选配色与纹理以配合大理石、瓷砖等饰面。

具备国际认可（如 ANAB、ANSI National Accreditation Board）、IAF、TRA 及符合 KS Q ISO 9001:2015 的质量管理；耐用、环保材料有助于可持续运营。

铝型材搭配尼龙毯面、EPDM 等，兼顾耐久与耐候，并采用可回收组件。卡式结构可局部更换；卷起地垫便于清理框架下积尘。适用于室内外及过渡区，湿鞋亦可排水，外观与使用体验更持久。

适合商场、酒店、医院、学校及装配厂等高流量出入口。在印度供货并提供售后。

页面顶部 PDF 为 2022 年 12 月版英文产品目录（型号、验证、安装、对比与案例）。最新规格请以 wilmat.in 或联系我方为准。`,
      highlights: [
        "ANAB、IAF、TRA 及 KS Q ISO 9001:2015 质量管理",
        "嵌入式（Recessed）与表面式（Surface）等定制入口方案",
        "控尘、防滑防摔、外观与清洁成本优化",
        "铝底座、尼龙毯面、EPDM 等耐久耐候",
        "卡式结构便于局部更换与卷起清洁",
        "印度本地供货与售后",
      ],
      logoAlt: "Wilmat 标志",
      majorCustomerRows: wilmatMajorCustomerDisplayRows(),
    },
  },
  "jw-industrial-tech-service": {
    ko: {
      metaDescription:
        "JW Industrial Tech Service Private Limited — 자동차 생산 설비 기계·전기 설치·개조·수리, 도장·조립 라인, 엔지니어링 AMC.",
      role: "도장·공장 설비 설치 및 엔지니어링",
      intro: `JWITS(JW Industrial Tech Service Private Limited)는 인도에서 자동차 생산 설비를 중심으로 한 기계·전기 설비의 설치, 이전, 개조, 수리를 수행합니다. 도장·조립·프레스·바디 샵과 FCS·CPC 컨베이어, 전극 도장 라인·워크스테이션·오븐·덕트 배관 등 주요 설비를 다룹니다.

지그·고정구 설계·제작, 팔레트·트롤리·안전 가드·도어·그레이팅·스테인리스 탱크 제작, 차량 생산 설비용 한국산 산업 소모품 공급, 현장 공정 개발·양산 대응, 엔지니어링 AMC까지 제공합니다.

페이지 상단의 PDF는 2025년 8월 기준 영문 비즈니스 소개 자료입니다. 실적·조직·거점·주요 고객사 등이 수록되어 있으니, 대외 공유 시에는 최신본과 맞춰 주세요.`,
      highlights: [
        "자동차 생산 설비 기계·전기 설치·이전·개조·수리",
        "도장·조립·프레스·바디 샵 라인",
        "FCS·CPC 컨베이어 및 전극 도장·오븐·덕트 등 주요 설비",
        "지그·고정구 설계·제작, 팔레트·트롤리·안전 가드·SS 탱크 등",
        "차량 생산 설비 관련 한국산 산업 소모품 공급",
        "현장 공정 개발·양산 대응, 엔지니어링 AMC",
      ],
      logoAlt: "JW Industrial Tech Service 로고",
    },
    en: {
      metaDescription:
        "JW Industrial Tech Service Private Limited — automotive plant mechanical & electrical installation, relocation, retrofit and repair; paint & assembly lines; engineering AMC.",
      role: "Paint line & plant installation engineering",
      intro: `JWITS (JW Industrial Tech Service Private Limited) performs mechanical and electrical installation, relocation, retrofit and repair for automotive production facilities in India—including paint, assembly, press and body shop lines, FCS/CPC conveyors, electrode coating lines, workstations, ovens and ducting.

We also design and build jigs and fixtures, pallets, trolleys, safety guards, doors, gratings and stainless tanks; supply Korean industrial consumables for vehicle plants; support process development for production ramp-up and engineering AMC.

The PDF at the top is the English business introduction as of August 2025 (track record, organisation, locations and key customers). Align with the latest version before external distribution.`,
      highlights: [
        "Mechanical & electrical install, relocation, retrofit & repair for automotive plants",
        "Paint, assembly, press and body shop lines",
        "FCS/CPC conveyors, electrode coating, ovens, ducting and major equipment",
        "Jigs & fixtures, pallets, trolleys, guards, doors, gratings, SS tanks",
        "Korean industrial consumables for vehicle production equipment",
        "On-site process development, ramp-up support, engineering AMC",
      ],
      logoAlt: "JW Industrial Tech Service logo",
    },
    zh: {
      metaDescription:
        "JW Industrial Tech Service Private Limited — 印度汽车产线机电安装、搬迁、改造与维修；涂装与总装；工程 AMC。",
      role: "涂装与工厂设备安装工程",
      intro: `JWITS（JW Industrial Tech Service Private Limited）在印度从事以汽车生产装备为核心的机电安装、搬迁、改造与维修，涵盖涂装、总装、冲压、车身以及 FCS/CPC 输送线、电极涂装线、工位、烘箱与风管等主设备。

同时提供治具与夹具设计制造、托盘与台车、安全护栏、门、格栅与不锈钢罐体制作，车辆产线用韩国工业耗材供应，以及现场工艺开发与量产爬坡、工程 AMC。

页面顶部 PDF 为 2025 年 8 月版英文业务介绍（业绩、组织、据点与主要客户等），对外分享前请与最新版本核对。`,
      highlights: [
        "汽车工厂机电安装、搬迁、改造与维修",
        "涂装、总装、冲压与车身产线",
        "FCS/CPC 输送、电极涂装、烘箱与风管等主设备",
        "治具夹具设计制造，托盘、台车、护栏、不锈钢罐等",
        "车辆产线用韩国工业耗材供应",
        "现场工艺开发与量产支持、工程 AMC",
      ],
      logoAlt: "JW Industrial Tech Service 标志",
    },
  },
};

export function groupCompanyContentCopy(slug: GroupCompanySlug, locale: SiteLocale): GroupCompanyContentCopy {
  return pickLocale(locale, bodies[slug]);
}
