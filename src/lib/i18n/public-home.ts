import { company, homeAccountingHero, accountingOperationsSpotlight, investmentRemittanceSpotlight } from "@/lib/site-content";
import {
  defaultSiteDescription,
  homePageTitle,
} from "@/lib/seo-site-copy";
import type { SiteLocale } from "@/lib/site-locale";

/** 홈 — 로케일별 메타 */
export function homeMetadata(locale: SiteLocale) {
  const description = defaultSiteDescription(locale);
  if (locale === "en") {
    return {
      title: "Home",
      absoluteTitle: homePageTitle("en"),
      description,
    };
  }
  if (locale === "zh") {
    return {
      title: "首页",
      absoluteTitle: homePageTitle("zh"),
      description,
    };
  }
  return {
    title: "홈",
    absoluteTitle: homePageTitle("ko"),
    description,
  };
}

export const homeAccountingHeroEn = {
  headline:
    "Accounting and tax services for businesses in India. From bookkeeping to statutory filings, one dedicated team manages your compliance.",
  lead:
    "Our in-house team provides integrated support for GST, TDS, corporate tax and regulatory filings related to foreign investment and FEMA compliance.\nWe also support capital remittances, equity events, ECB, DTAA, securities and Demat accounts, and day-to-day India entity operations.",
  badge: "ACCOUNTING · TAX · COMPLIANCE",
} as const;

export const accountingOperationsSpotlightEn = {
  eyebrow: "Accounting & Tax Services in India",
  title: "Reliable Accounting Support",
  paragraphs: [
    "Our in-house accounting team manages your bookkeeping and filings in line with applicable accounting standards and Indian regulatory requirements. We use standardized processes and checklists to coordinate statutory deadlines with your group reporting schedule.",
    "Our services are tailored to your industry and transaction volume, with integrated bookkeeping, tax and advisory support on a monthly, quarterly or annual basis. Our key services are listed below.",
  ] as const,
  highlights: [
    "Bookkeeping & Month-End Closing",
    "Tax Return Filing",
    "Corporate Tax & Payment Support",
    "TDS Compliance",
    "GST Compliance",
    "Transfer Pricing",
    "Periodic ECB Reporting",
    "ESIC Compliance",
    "EPF Compliance",
    "Professional Tax Compliance",
    "Payroll Processing & Record Maintenance",
    "SFT Filing",
    "FLA Return Filing",
    "Consolidated Financial Statements",
  ] as const,
} as const;

export const investmentRemittanceSpotlightEn = {
  eyebrow: "Capital & remittance",
  title: "Foreign investment / remittance and reporting",
  paragraphs: [
    "Setting up and running an India subsidiary often means aligning FDI rules, equity inflows, shareholder changes and non-resident remittances with tax and FX reporting at the same time.",
    "MSV keeps company consulting, accounting and tax in one organization and executes paperwork, banks and revenue authorities from Bangalore with a single accountable team. Below is a representative list of workstreams.",
  ] as const,
  highlights: [
    "Form 41 / Form 10F, DTAA, income-tax filings",
    "Securities account opening",
    "Demat account opening",
    "Equity remittance & increases",
    "External commercial borrowing (ECB)",
    "Inter-shareholder stake changes",
  ] as const,
} as const;

export const servicesListEn = [
  {
    title: "Accounting, Tax & Compliance",
    description:
      "Bookkeeping, audit and tax filing services, including GST and TDS, with advice on corporate structure and support for compliance with applicable accounting standards and Indian regulations.",
  },
  {
    title: "Incorporation & Licensing",
    description:
      "Comprehensive support for manufacturing businesses setting up in India, covering company incorporation, PAN, GST and IEC registration, office leasing and local operating licences.",
  },
  {
    title: "Import, Export & Sourcing",
    description:
      "Support for import and export operations, buyer and supplier matching, trade exhibitions and interpreting during factory visits.",
  },
  {
    title: "HR & Expatriate Support",
    description:
      "Our in-house team handles recruitment support, expatriate visa and FRRO services, contract review, and day-to-day HR and administrative matters.",
  },
  {
    title: "Hospitality, Real Estate & Feasibility Studies",
    description:
      "Support for hotel development and investment, including site visits, investment reports, feasibility studies, property brokerage and coordination with legal advisers.",
  },
  {
    title: "Ongoing Business Support",
    description:
      "Support for day-to-day operations after incorporation, including company administration, bookkeeping, head office reporting, ERP implementation and training.",
  },
] as const;

export const strengthsEn = [
  "An in-house accounting team managing bookkeeping and monthly, quarterly and annual filings in India.",
  "Core accounting, tax and compliance services delivered directly by our team.",
  "Coordinated schedules for head office reporting and statutory filings in India.",
  "Practical support in navigating legal and cultural differences between Korea and India.",
  "Multilingual communication.",
  "Prompt decisions and clear accountability.",
] as const;

/** 홈 고객사 리드 — `clientsShowcaseLead`(한국어)와 톤 맞춤 */
export const clientsShowcaseLeadEn =
  "We support 80+ companies from India market entry through operations, accounting, tax and compliance as an integrated practice, with service churn at 7% or below—reflecting stable, long-term partnerships.";

export const clientsShowcaseLeadZh =
  "我们以运营、会计、税务与合规的一体化实务支持 80 余家客户进入印度市场，服务流失率控制在 7% 及以下，体现稳定、长期的合作关系。";

export const valuesEn = [
  "Tailored consulting with practical implementation support.",
  "Transparent accounting and tax processes backed by clear documentation.",
  "Clear communication between Korean and Indian teams.",
  "Practical solutions based on industry knowledge and experience.",
  "Integrated support from incorporation to ongoing operations.",
  "Expertise in Indian regulatory requirements and licensing.",
] as const;

export const homeAccountingHeroZh = {
  headline:
    "印度实体会计与税务：从记账到法定申报，由同一团队把控您的截止期限。",
  lead:
    "围绕常驻注册会计师实践，我们将 GST、TDS、法人税、FDI 与 FEMA 申报纳入同一运营节奏。\n资本汇回、增资、ECB、DTAA、证券与 Demat 账户及印度法人日常运营所需实务，由同一团队整合支持。",
  badge: "CPA 主导 · 班加罗尔",
} as const;

export const accountingOperationsSpotlightZh = {
  eyebrow: "印度实体 · 会计与税务核心",
  title: "稳健的会计运营",
  paragraphs: [
    "账簿与申报按印度规则（IFRS / Ind AS、GST、TDS 等）结构化，由常驻注册会计师团队监督，并以清单将印度法定日期与集团报告节奏对齐。",
    "范围随交易规模与行业灵活调整，以月度、季度、年度为单位提供整合的记账、税务与顾问服务。以下为具有代表性的工作项。",
  ] as const,
  highlights: [
    "记账 · 月结",
    "税务申报",
    "法人税 · 缴纳",
    "预扣税（TDS）",
    "GST",
    "转让定价",
    "ECB 定期报告",
    "ESIC",
    "EPF",
    "专业税（PT）",
    "工资与登记册",
    "SFT",
    "FLA",
    "合并财务报表",
  ] as const,
} as const;

export const investmentRemittanceSpotlightZh = {
  eyebrow: "资本与汇出",
  title: "外商投资 / 汇出与申报",
  paragraphs: [
    "设立并运营印度子公司往往需要在同一节奏下协调 FDI 规则、股本流入、股东变更与非居民汇出，以及税务与外汇申报。",
    "MSV 在同一组织内统筹公司咨询、会计与税务，并由班加罗尔单一负责团队对接文书、银行与税务机关。以下为代表性工作项。",
  ] as const,
  highlights: [
    "Form 41 / Form 10F、DTAA、所得税申报",
    "证券账户开立",
    "Demat 账户开立",
    "股本汇回与增资",
    "对外商业借款（ECB）",
    "股东间持股比例变更",
  ] as const,
} as const;

export const servicesListZh = [
  {
    title: "会计、税务与合规",
    description:
      "在 IFRS 与印度规则下进行记账、审计与税务申报（含 GST、TDS），并在常驻注册会计师模式下提供公司结构建议。",
  },
  {
    title: "公司设立与许可",
    description:
      "面向制造业客户的印度端到端落地——从设立到 PAN、GST、IEC 与办公室租赁，以及各类经营许可证的现场办理。",
  },
  {
    title: "进出口、贸易与采购",
    description:
      "进出口运营、买卖双方匹配、展会支持、工厂参观口译与一体化贸易执行。",
  },
  {
    title: "人力、外籍与 FRRO",
    description:
      "招聘支持、外籍签证与 FRRO、合同审阅及更广泛的人力/行政，由内部团队直接处理。",
  },
  {
    title: "酒店、地产与可行性",
    description:
      "酒店进入支持，含现场考察、投资备忘录、可行性研究、经纪服务与法律顾问协同。",
  },
  {
    title: "持续运营支持",
    description:
      "设立后的公司运营支持——主体管理、总账、总部报告与 ERP 上线/培训——以连续项目方式一体化交付。",
  },
] as const;

export const strengthsZh = [
  "由常驻注册会计师主导的印度记账与月/季/年申报一体化体系",
  "会计、税务与合规核心工作不外判、直接交付",
  "总部报告与印度法定截止日期的统一日历",
  "在韩国与印度之间就法律与文化差异提供务实桥梁",
  "多语种沟通",
  "快速决策与可问责的跟进",
] as const;

export const valuesZh = [
  "以执行为导向的定制化咨询",
  "透明且可验证的会计与税务运营",
  "支持韩国与印度之间的实务沟通",
  "基于行业实战经验的问题解决",
  "从设立到运营的整合直接执行",
  "印度监管与许可应对专业能力",
] as const;

export function homeMidServicesSection(locale: SiteLocale) {
  if (locale === "zh") {
    return {
      kicker: "服务",
      title: "以会计为核心的执行型服务",
      lead: "在会计、审计与税务之上，将公司设立、人力、进出口等扩展事项与同一团队或可信赖的合作机构衔接。",
      cta: "查看会计与税务服务线",
    };
  }
  if (locale !== "en") {
    return {
      kicker: "Services",
      title: "회계를 중심으로 한 실행형 서비스",
      lead: "회계·세무·감사를 기반으로, 법인설립·HR·수출입 등 확장 업무를 동일 팀 또는 협업 조직과 연계하여 제공합니다.",
      cta: "회계·세무 라인업 보기",
    };
  }
  return {
    kicker: "Services",
    title: "Integrated Business Services with Accounting at the Core",
    lead: "We provide accounting, audit and tax services, alongside support for incorporation, HR, import and export operations, and business expansion. Services are delivered by our in-house team or in coordination with trusted partners.",
    cta: "View Accounting & Tax Services",
  };
}

export type HomeHeroSlide = {
  id: string;
  eyebrow: string;
  headline: string;
  lead: string;
  /** 히어로 우측 인물 등 — 있으면 텍스트 줄간격은 유지한 채 절대 배치 */
  imageSrc?: string;
  imageAlt?: string;
  /** 인물 사진 왼쪽 캡션 */
  imageCaption?: string;
  imageWidth?: number;
  imageHeight?: number;
};

function firstLeadLine(lead: string) {
  return lead.split("\n").map((s) => s.trim()).find(Boolean) ?? lead;
}

const homeHeroSoftwareSlideKo: HomeHeroSlide = {
  id: "software",
  eyebrow: "MSV 고객 전용 프로그램",
  headline: "업무 통합 시스템과 GPS 기반 출퇴근 기록을 제공합니다.",
  lead: "고객사에 업무 통합 시스템(MVS)·GPS 기반 출퇴근 기록 시스템(HeresNow)을 제공해, 회계·세무 서비스와 현장 운영 데이터를 한 흐름으로 연결합니다.",
};

const homeHeroSoftwareSlideEn: HomeHeroSlide = {
  id: "software",
  eyebrow: "MSV client programs",
  headline: "Integrated business system and GPS attendance for clients.",
  lead: "We provide clients with the MVS integrated business system and HeresNow GPS attendance, so accounting and tax work stay connected to on-the-ground operations.",
};

const homeHeroSoftwareSlideZh: HomeHeroSlide = {
  id: "software",
  eyebrow: "MSV 客户专用程序",
  headline: "提供业务集成系统与基于 GPS 的考勤记录。",
  lead: "为客户提供业务集成系统（MVS）与基于 GPS 的考勤系统（HeresNow），使会计税务服务与现场运营数据贯通。",
};

const homeHeroSlidesKo: readonly HomeHeroSlide[] = [
  {
    id: "accounting",
    eyebrow: homeAccountingHero.badge,
    headline: homeAccountingHero.headline,
    lead: firstLeadLine(homeAccountingHero.lead),
    imageSrc: "/team/ca-kashul-sharma.png?v=20260925",
    imageAlt: "카슐 샤르마 / 공인회계사",
    imageCaption: "카슐 샤르마 / 공인회계사",
    imageWidth: 759,
    imageHeight: 826,
  },
  {
    id: "operations",
    eyebrow: accountingOperationsSpotlight.eyebrow,
    headline: accountingOperationsSpotlight.title,
    lead: accountingOperationsSpotlight.paragraphs[0],
    imageSrc: "/team/ha-heonbeom-hero.png?v=20260925b",
    imageAlt: "하헌범 부대표 / 공인회계사",
    imageCaption: "하헌범 부대표 / 공인회계사",
    imageWidth: 686,
    imageHeight: 1013,
  },
  {
    id: "investment",
    eyebrow: investmentRemittanceSpotlight.eyebrow,
    headline: investmentRemittanceSpotlight.title,
    lead: investmentRemittanceSpotlight.paragraphs[0],
  },
  homeHeroSoftwareSlideKo,
];

const homeHeroSlidesEn: readonly HomeHeroSlide[] = [
  {
    id: "accounting",
    eyebrow: homeAccountingHeroEn.badge,
    headline: homeAccountingHeroEn.headline,
    lead: firstLeadLine(homeAccountingHeroEn.lead),
    imageSrc: "/team/ca-kashul-sharma.png?v=20260925",
    imageAlt: "Kashul Sharma / Chartered Accountant",
    imageCaption: "Kashul Sharma / Chartered Accountant",
    imageWidth: 759,
    imageHeight: 826,
  },
  {
    id: "operations",
    eyebrow: accountingOperationsSpotlightEn.eyebrow,
    headline: accountingOperationsSpotlightEn.title,
    lead: accountingOperationsSpotlightEn.paragraphs[0],
    imageSrc: "/team/ha-heonbeom-hero.png?v=20260925b",
    imageAlt: "Ha Heon-beom, Vice President / Certified Public Accountant",
    imageCaption: "Ha Heon-beom, Vice President / Certified Public Accountant",
    imageWidth: 686,
    imageHeight: 1013,
  },
  {
    id: "investment",
    eyebrow: investmentRemittanceSpotlightEn.eyebrow,
    headline: investmentRemittanceSpotlightEn.title,
    lead: investmentRemittanceSpotlightEn.paragraphs[0],
  },
  homeHeroSoftwareSlideEn,
];

const homeHeroSlidesZh: readonly HomeHeroSlide[] = [
  {
    id: "accounting",
    eyebrow: homeAccountingHeroZh.badge,
    headline: homeAccountingHeroZh.headline,
    lead: firstLeadLine(homeAccountingHeroZh.lead),
    imageSrc: "/team/ca-kashul-sharma.png?v=20260925",
    imageAlt: "Kashul Sharma / 特许会计师",
    imageCaption: "Kashul Sharma / 特许会计师",
    imageWidth: 759,
    imageHeight: 826,
  },
  {
    id: "operations",
    eyebrow: accountingOperationsSpotlightZh.eyebrow,
    headline: accountingOperationsSpotlightZh.title,
    lead: accountingOperationsSpotlightZh.paragraphs[0],
    imageSrc: "/team/ha-heonbeom-hero.png?v=20260925b",
    imageAlt: "河宪范 副社长 / 注册会计师",
    imageCaption: "河宪范 副社长 / 注册会计师",
    imageWidth: 686,
    imageHeight: 1013,
  },
  {
    id: "investment",
    eyebrow: investmentRemittanceSpotlightZh.eyebrow,
    headline: investmentRemittanceSpotlightZh.title,
    lead: investmentRemittanceSpotlightZh.paragraphs[0],
  },
  homeHeroSoftwareSlideZh,
];

export function homeHeroSlides(locale: SiteLocale): readonly HomeHeroSlide[] {
  if (locale === "en") return homeHeroSlidesEn;
  if (locale === "zh") return homeHeroSlidesZh;
  return homeHeroSlidesKo;
}

export function heroSliderUi(locale: SiteLocale) {
  if (locale === "zh") {
    return {
      prev: "上一张",
      next: "下一张",
      slideOf: (current: number, total: number) => `第 ${current} 张，共 ${total} 张`,
      autoplay: "自动播放轮播",
    };
  }
  if (locale === "en") {
    return {
      prev: "Previous slide",
      next: "Next slide",
      slideOf: (current: number, total: number) => `Slide ${current} of ${total}`,
      autoplay: "Hero carousel",
    };
  }
  return {
    prev: "이전 슬라이드",
    next: "다음 슬라이드",
    slideOf: (current: number, total: number) => `${total}개 중 ${current}번째 슬라이드`,
    autoplay: "히어로 슬라이드",
  };
}

export function simpleHeroCtas(locale: SiteLocale) {
  if (locale === "zh") {
    return {
      services: "会计与税务服务线",
      pdf: "公司简介（PDF）",
      contact: "联系我们",
      about: "公司简介",
      software: "客户专用程序",
      foot: "班加罗尔 · 韩语 · 英语 · 中文",
    };
  }
  if (locale !== "en") {
    return {
      services: "회계·세무 라인업",
      pdf: "회사 프로필 PDF",
      contact: "문의하기",
      about: "회사 소개",
      software: "고객 전용 프로그램",
      foot: "Bangalore · 한국어 · English",
    };
  }
  return {
    services: "Accounting & Tax Services",
    pdf: "Company profile (PDF)",
    contact: "Contact us",
    about: "About the company",
    software: "Client programs",
    foot: "Bangalore · Korean · English",
  };
}

export function contentPreviewsCopy(locale: SiteLocale) {
  if (locale === "zh") {
    return {
      noticeKicker: "公告",
      noticeTitle: "通知公告",
      noticeAll: "查看全部 →",
      noticeEmpty: "暂无公告。",
      pinned: "置顶",
      calendarKicker: "合规",
      calendarTitle: "申报与合规日历",
      calendarLead:
        "TDS、GST、专业税、员工福利、ECB、预缴税款、股东会与公共假期等关键合规节点一目了然。",
      calendarGuideCta: "查看月·季·年核对清单 →",
    };
  }
  if (locale !== "en") {
    return {
      noticeKicker: "Notice",
      noticeTitle: "공지사항",
      noticeAll: "전체 →",
      noticeEmpty: "등록된 공지가 없습니다.",
      pinned: "고정",
      calendarKicker: "Compliance",
      calendarTitle: "신고준수 달력",
      calendarLead:
        "원천징수세·부가가치세·전문세·종업원 보험·대외상업차입·선급세·주주회의·공휴일 등 주요 신고·준수 일정을 한눈에 확인합니다.",
      calendarGuideCta: "월·분기·연 체크리스트 가이드 →",
    };
  }
  return {
    noticeKicker: "Notice",
    noticeTitle: "Announcements",
    noticeAll: "View all →",
    noticeEmpty: "No announcements yet.",
    pinned: "Pinned",
    calendarKicker: "Compliance",
    calendarTitle: "Filing & compliance calendar",
    calendarLead:
      "Stay on top of key dates for TDS, GST, professional tax, employee benefits, ECB reporting, advance tax and shareholder meetings, along with public holidays.",
    calendarGuideCta: "Monthly / quarterly / annual checklist →",
  };
}

export function coreStrengthsSectionTitles(locale: SiteLocale) {
  if (locale === "zh") {
    return {
      strengthsKicker: "会计实务深度",
      strengthsTitle: "核心优势",
      valuesKicker: "VALUES",
      valuesTitle: "价值观与运营原则",
    };
  }
  if (locale !== "en") {
    return {
      strengthsKicker: "회계 실무 역량",
      strengthsTitle: "핵심 강점",
      valuesKicker: "VALUES",
      valuesTitle: "가치 · 운영 원칙",
    };
  }
  return {
    strengthsKicker: "Accounting Expertise",
    strengthsTitle: "Core Strengths",
    valuesKicker: "Our Values",
    valuesTitle: "Our Operating Principles",
  };
}

export function spotlightCtas(locale: SiteLocale) {
  if (locale === "zh") {
    return { accounting: "会计与税务服务", investment: "了解服务详情" };
  }
  if (locale !== "en") {
    return { accounting: "회계·세무 서비스 안내", investment: "서비스 상세 보기" };
  }
  return { accounting: "Accounting & Tax Services", investment: "Explore services" };
}

export function complianceCalendarUi(locale: SiteLocale) {
  if (locale === "zh") {
    return {
      weekKicker: "本周",
      weekSub: "本周主要日期（周一至周日）",
      monthKicker: "本月",
      monthSub: "本月主要申报与合规节点（按公历月）",
      monthButton: "月视图",
      prevMonth: "上一月",
      nextMonth: "下一月",
      noEntries: "当日暂无事项。",
      emptyEvent: "仅保存了类别，无标题或备注。",
      legendCustom: "自定义类别将按输入原样显示",
      close: "关闭",
    };
  }
  const en = locale === "en";
  return {
    weekKicker: "Week",
    weekSub: en ? "Key dates this week (Mon–Sun)" : "이번 주 주요 일정 (월~일)",
    monthKicker: en ? "Month" : "월간",
    monthSub: en ? "Key dates this calendar month" : "이번 달 주요 일정 (월~일 달력)",
    monthButton: en ? "View Full Calendar" : "한 달 일정 보기",
    prevMonth: en ? "Previous month" : "이전 달",
    nextMonth: en ? "Next month" : "다음 달",
    noEntries: en ? "No entries for this day." : "등록된 일정이 없습니다.",
    emptyEvent: en ? "Only a category was saved—no title or notes." : "제목·비고 없이 유형만 등록되었습니다.",
    legendCustom: en ? "Custom categories show exactly as entered." : "직접 입력 유형은 입력한 이름으로 표시",
    close: en ? "Close" : "닫기",
  };
}

export function weekdayShortLabels(locale: SiteLocale): readonly string[] {
  if (locale === "en") return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  if (locale === "zh") return ["一", "二", "三", "四", "五", "六", "日"];
  return ["월", "화", "수", "목", "금", "토", "일"];
}

export function formatMonthTitle(year: number, monthIndex: number, locale: SiteLocale): string {
  if (locale === "en") {
    return new Intl.DateTimeFormat("en-IN", { month: "long", year: "numeric" }).format(new Date(year, monthIndex, 1));
  }
  if (locale === "zh") {
    return new Intl.DateTimeFormat("zh-CN", { month: "long", year: "numeric" }).format(new Date(year, monthIndex, 1));
  }
  return `${year}년 ${monthIndex + 1}월`;
}

export function formatYmdLong(ymd: string, locale: SiteLocale): string {
  const [y, m, d] = ymd.split("-").map(Number);
  if (!y || !m || !d) return ymd;
  if (locale === "en") {
    return new Intl.DateTimeFormat("en-IN", { year: "numeric", month: "long", day: "numeric" }).format(
      new Date(y, m - 1, d),
    );
  }
  if (locale === "zh") {
    return new Intl.DateTimeFormat("zh-CN", { year: "numeric", month: "long", day: "numeric" }).format(
      new Date(y, m - 1, d),
    );
  }
  return `${y}년 ${m}월 ${d}일`;
}
