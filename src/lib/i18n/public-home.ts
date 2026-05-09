import { company } from "@/lib/site-content";
import type { SiteLocale } from "@/lib/site-locale";

/** 홈 — 로케일별 메타 */
export function homeMetadata(locale: SiteLocale) {
  if (locale === "en") {
    return {
      title: "Home",
      absoluteTitle: `${company.shortName} | India accounting, tax & on-the-ground execution`,
      description:
        "India entity accounting, tax and compliance—from bookkeeping through statutory filings—with a resident CPA-led team in Bangalore.",
    };
  }
  if (locale === "zh") {
    return {
      title: "首页",
      absoluteTitle: `${company.shortName} | 印度会计、税务与现场执行`,
      description:
        "印度实体会计、税务与合规——从记账到法定申报，由班加罗尔常驻注册会计师团队一体化负责。",
    };
  }
  return {
    title: "홈",
    absoluteTitle: `${company.shortName} | 인도 회계·세무·현장 실행`,
    description: company.taglineKo,
  };
}

export const homeAccountingHeroEn = {
  headline:
    "India entity accounting and tax: from bookkeeping through statutory filings, one team owns your deadlines.",
  lead:
    "Built around a resident CPA practice, we run GST, TDS, corporate tax, FDI and FEMA filings as one operating rhythm.\nWe integrate capital remittances, equity events, ECB, DTAA, securities and Demat accounts, and day-to-day India entity operations in a single accountable team.",
  badge: "CPA-led · Bangalore",
} as const;

export const accountingOperationsSpotlightEn = {
  eyebrow: "India entity · accounting & tax core",
  title: "Stable accounting operations",
  paragraphs: [
    "Books and filings are structured for Indian rules (IFRS / Ind AS, GST, TDS and more) and supervised by a resident CPA-led team, with checklists that align India statutory dates with group reporting cadence.",
    "Scope flexes with transaction volume and industry; monthly, quarterly and annual bookkeeping, tax and advisory services are delivered as an integrated package. Below is a representative list of workstreams.",
  ] as const,
  highlights: [
    "Bookkeeping · monthly close",
    "Tax filings",
    "Corporate tax · payment",
    "Withholding (TDS)",
    "GST",
    "Transfer pricing",
    "ECB periodic reporting",
    "ESIC",
    "EPF",
    "Professional tax",
    "Payroll & registers",
    "SFT",
    "FLA",
    "Consolidated financials",
  ] as const,
} as const;

export const investmentRemittanceSpotlightEn = {
  eyebrow: "Capital & remittance",
  title: "Foreign investment / remittance and reporting",
  body: `Setting up and running an India subsidiary often means aligning FDI rules, equity inflows, shareholder changes and non-resident remittances with tax and FX reporting at the same time. MSV keeps company consulting, accounting and tax in one organization and executes paperwork, banks and revenue authorities from Bangalore with a single accountable team.`,
  highlights: [
    "Form 41 (ex Form 10F), DTAA, income-tax filings",
    "Securities account opening",
    "Demat account opening",
    "Equity remittance & increases",
    "External commercial borrowing (ECB)",
    "Inter-shareholder stake changes",
  ] as const,
} as const;

export const servicesListEn = [
  {
    title: "Accounting, tax & compliance",
    description:
      "Bookkeeping, audit and tax filings (including GST and TDS) on IFRS and India rules, with corporate-structure advice under a resident CPA-led model.",
  },
  {
    title: "Incorporation & licensing",
    description:
      "End-to-end India setup for manufacturing clients—from incorporation through PAN, GST, IEC and office leasing to operating licences handled locally.",
  },
  {
    title: "Import/export, trade & sourcing",
    description:
      "Import/export operations, buyer and vendor matching, exhibition support, factory-visit interpreting and integrated trade execution.",
  },
  {
    title: "HR, expatriates & FRRO",
    description:
      "Recruitment support, expatriate visas and FRRO, contract review and broader HR/admin handled directly by the in-house team.",
  },
  {
    title: "Hospitality, real estate & feasibility",
    description:
      "Hotel entry support including site visits, investment memos, feasibility studies, brokerage and coordinated legal counsel.",
  },
  {
    title: "Non-stop operations support",
    description:
      "Post-incorporation run-the-company support—entity administration, ledgers, HQ reporting and ERP rollout/training—in one continuous engagement.",
  },
] as const;

export const strengthsEn = [
  "Resident CPA-led India bookkeeping and monthly / quarterly / annual filings in one system",
  "Direct delivery of accounting, tax and compliance without outsourcing the core work",
  "One calendar for HQ reporting and India statutory deadlines",
  "Practical bridge on legal and cultural gaps between Korea and India",
  "Multilingual communication",
  "Fast decisions and accountable follow-through",
] as const;

/** 홈 고객사 리드 — `clientsShowcaseLead`(한국어)와 톤 맞춤 */
export const clientsShowcaseLeadEn =
  "We support 80+ companies from India market entry through operations, accounting, tax and compliance as an integrated practice, with service churn at 7% or below—reflecting stable, long-term partnerships.";

export const clientsShowcaseLeadZh =
  "我们以运营、会计、税务与合规的一体化实务支持 80 余家客户进入印度市场，服务流失率控制在 7% 及以下，体现稳定、长期的合作关系。";

export const valuesEn = [
  "Execution-led tailored consulting",
  "Transparent, verifiable accounting and tax operations",
  "Practical communication support between Korea and India",
  "Industry-grounded problem solving from field experience",
  "Direct integrated delivery from incorporation through operations",
  "India regulatory and licensing expertise",
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
  body: `设立并运营印度子公司往往需要在同一节奏下协调 FDI 规则、股本流入、股东变更与非居民汇出，以及税务与外汇申报。MSV 在同一组织内统筹公司咨询、会计与税务，并由班加罗尔单一负责团队对接文书、银行与税务机关。`,
  highlights: [
    "Form 41（原 Form 10F）、DTAA、所得税申报",
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
    title: "Execution-led services built on accounting",
    lead: "On top of accounting, audit and tax, we connect incorporation, HR, import/export and other expansion work with the same team or trusted partner organizations.",
    cta: "View accounting & tax lineup",
  };
}

export function homeBrochureStrip(locale: SiteLocale) {
  if (locale === "zh") {
    return {
      lineBefore: "更多详情请参阅",
      linePdf: "公司简介 PDF",
      lineAfter: "。",
    };
  }
  if (locale !== "en") {
    return {
      lineBefore: "상세 소개는",
      linePdf: "회사 프로필 PDF",
      lineAfter: "를 참고해 주세요.",
    };
  }
  return {
    lineBefore: "For more detail, see the",
    linePdf: "company profile PDF",
    lineAfter: ".",
  };
}

export function simpleHeroCtas(locale: SiteLocale) {
  if (locale === "zh") {
    return {
      services: "会计与税务服务线",
      pdf: "公司简介（PDF）",
      contact: "联系我们",
      about: "公司简介",
      software: "软件",
      foot: `客户满意度 ${company.satisfaction} · 班加罗尔 · 韩语 · 英语 · 中文`,
    };
  }
  if (locale !== "en") {
    return {
      services: "회계·세무 라인업",
      pdf: "회사 프로필 PDF",
      contact: "문의하기",
      about: "회사 소개",
      software: "소프트웨어",
      foot: `고객 만족 ${company.satisfaction} · Bangalore · 한국어 · English`,
    };
  }
  return {
    services: "Accounting & tax lineup",
    pdf: "Company profile (PDF)",
    contact: "Contact us",
    about: "About the company",
    software: "Software",
    foot: `${company.satisfaction} client satisfaction · Bangalore · Korean · English`,
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
      calendarTitle: "신고·준수 달력",
      calendarLead:
        "원천징수세·부가가치세·전문세·종업원 보험·대외상업차입·선급세·주주회의·공휴일 등 주요 신고·준수 일정을 한눈에 확인합니다.",
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
      "TDS, GST, professional taxes, employee benefits, ECB, advance tax, shareholder meetings and public holidays—see key compliance milestones at a glance.",
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
    strengthsKicker: "Accounting depth",
    strengthsTitle: "Core strengths",
    valuesKicker: "VALUES",
    valuesTitle: "Principles we operate by",
  };
}

export function spotlightCtas(locale: SiteLocale) {
  if (locale === "zh") {
    return { accounting: "会计与税务服务", investment: "了解服务详情" };
  }
  if (locale !== "en") {
    return { accounting: "회계·세무 서비스 안내", investment: "서비스 상세 보기" };
  }
  return { accounting: "Accounting & tax services", investment: "Explore services" };
}

export function complianceCalendarUi(locale: SiteLocale) {
  if (locale === "zh") {
    return {
      weekKicker: "本周",
      weekSub: "本周主要日期（周一至周日）",
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
    monthButton: en ? "Month view" : "한 달 일정 보기",
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
