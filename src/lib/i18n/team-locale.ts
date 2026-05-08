import { memberByEmail } from "@/lib/about-greeting-utils";
import { leadership as leadershipDefaults, company } from "@/lib/site-content";
import { pickLocale, type SiteLocale } from "@/lib/site-locale";

export type AboutTeamPageCopy = {
  metaTitle: string;
  metaDescription: string;
  pageTitle: string;
  pageDescription: string;
  breadcrumbAbout: string;
  breadcrumbCurrent: string;
  messagesEyebrow: string;
  messagesTitle: string;
  teamGreetingLead: string;
  teamIntroBody: string;
  ceoEyebrow: string;
  ceoTitle: (name: string) => string;
  vpEyebrow: string;
  vpTitle: (name: string) => string;
  caEyebrow: string;
  caTitle: (name: string) => string;
  leadershipExtraEyebrow: string;
  titleSublineIntro: string;
  teamSectionEyebrow: string;
  teamSectionTitle: string;
  emptyStaffMessage: string;
  profilePhotoAltSuffix: string;
};

/** 정적 리더 3인 — 긴 인사말 대신 영·중에서는 요약 본문 사용 */
const leadershipShortBio: Record<string, { en: string; zh: string }> = {
  "lee@msventures.in": {
    en: "As an execution-led partner accountable from strategy through delivery in India’s complex regulatory environment, he leads an integrated model covering incorporation, accounting, tax, trade, visas, hospitality and HR—delivered in-house without outsourcing core work.",
    zh: "在印度复杂的制度与行政环境中，从战略到落地全程负责的执行型伙伴，主导涵盖设立、会计、税务、贸易、签证、酒店与人力等环节、由内部团队直接交付的一体化方案。",
  },
  "heon@msventures.in": {
    en: "A CPA and finance leader overseeing Korea–India strategic collaboration and client communications at MSV. He brings experience across large corporates, accounting firms, strategy consulting and investors, including co-investment mandates with international DFIs in India, Southeast Asia and China.",
    zh: "持有注册会计师（CPA）资格，负责 MSV 韩印战略合作与客户沟通。具备大企业、会计师事务所、战略咨询与投资机构实务经验，并参与过面向印度、东南亚及中国等市场的国际金融机构联合投资类项目。",
  },
  "ca@msventures.in": {
    en: "A Chartered Accountant with deep expertise across Indian accounting, tax and corporate regulation and IFRS. He leads on-the-ground finance and tax for foreign enterprises—bridging Korean reporting expectations with Indian compliance including GST and TDS in a one-stop model.",
    zh: "印度注册会计师，精通当地会计、税务、企业监管及 IFRS，为外资企业提供落地财务与税务统筹，在 GST、TDS 等合规要求与韩国企业报表口径之间进行衔接，并以一站式方式支持。",
  },
};

export function leadershipGreetingBodyForLocale(
  member: { email: string; summary: string },
  fallbackKo: string,
  locale: SiteLocale,
): string {
  if (!member) return fallbackKo;
  const base = memberByEmail(leadershipDefaults, member.email)?.summary ?? "";
  const hasCustom = member.summary.trim().length > 0 && member.summary !== base;
  if (hasCustom) return member.summary;
  if (locale === "ko") return fallbackKo;

  const key = member.email.trim().toLowerCase();
  const alt = leadershipShortBio[key];
  if (alt) return locale === "zh" ? alt.zh : alt.en;

  return fallbackKo;
}

export function aboutTeamPageCopy(locale: SiteLocale): AboutTeamPageCopy {
  return pickLocale(locale, {
    ko: {
      metaTitle: "팀원 소개",
      metaDescription: `${company.legalName}(${company.shortName}) 리더십 인사말·팀 구성원 소개`,
      pageTitle: "팀원 소개",
      pageDescription: `${company.shortName} 리더십의 인사말과, 현장에서 함께하는 구성원을 소개합니다.`,
      breadcrumbAbout: "회사 소개",
      breadcrumbCurrent: "팀원 소개",
      messagesEyebrow: "Messages",
      messagesTitle: "인사말",
      teamGreetingLead:
        "고객과 함께 성장하는 파트너로서, 정확한 회계와 투명한 경영을 기반으로 신뢰를 만들어가고 있습니다. 한국과 인도를 잇는 실무 중심의 전문성을 바탕으로, 기업 운영 전반에 실질적인 가치를 제공하겠습니다.",
      teamIntroBody: `현장에서 회계·세무·법인 지원을 함께하는 구성원을 소개합니다. 80여 개 이상의 기업에 인도 진출부터 운영·회계·세무·컴플라이언스까지 One-stop 서비스를 제공하고 있으며, 서비스 종료율 7% 이하로 안정적인 파트너십을 유지하고 있습니다.`,
      ceoEyebrow: "CEO Statement",
      ceoTitle: (name) => `대표이사 · ${name}`,
      vpEyebrow: "Vice President",
      vpTitle: (name) => `${name} 부대표`,
      caEyebrow: "India CA",
      caTitle: (name) => name,
      leadershipExtraEyebrow: "Leadership",
      titleSublineIntro: "소개",
      teamSectionEyebrow: "Team",
      teamSectionTitle: "팀원 소개",
      emptyStaffMessage: "등록된 일반 직원 프로필이 없습니다. 준비되는 대로 이 영역에 업데이트됩니다.",
      profilePhotoAltSuffix: "프로필 사진",
    },
    en: {
      metaTitle: "Team",
      metaDescription: `${company.legalName} (${company.shortName}) — leadership messages and team members.`,
      pageTitle: "Team",
      pageDescription: `Messages from ${company.shortName} leadership and the people who work with you on the ground.`,
      breadcrumbAbout: "About",
      breadcrumbCurrent: "Team",
      messagesEyebrow: "Messages",
      messagesTitle: "Leadership messages",
      teamGreetingLead:
        "As a partner that grows with our clients, we build trust on accurate accounting and transparent operations. Grounded in practical expertise bridging Korea and India, we aim to deliver real value across your business operations.",
      teamIntroBody: `Meet the people who support accounting, tax and corporate operations in the field. We serve 80+ companies with one-stop services from India entry through operations, accounting, tax and compliance, with a churn rate of about 7% or lower—reflecting stable, long-term partnerships.`,
      ceoEyebrow: "CEO Statement",
      ceoTitle: (name) => `CEO · ${name}`,
      vpEyebrow: "Vice President",
      vpTitle: (name) => `Vice President · ${name}`,
      caEyebrow: "India CA",
      caTitle: (name) => name,
      leadershipExtraEyebrow: "Leadership",
      titleSublineIntro: "Profile",
      teamSectionEyebrow: "Team",
      teamSectionTitle: "Team members",
      emptyStaffMessage: "No general staff profiles are published yet. This section will be updated as profiles become available.",
      profilePhotoAltSuffix: "profile photo",
    },
    zh: {
      metaTitle: "团队成员",
      metaDescription: `${company.legalName}（${company.shortName}）——领导致辞与团队成员。`,
      pageTitle: "团队成员",
      pageDescription: `${company.shortName} 领导致辞与现场与您协同的团队成员介绍。`,
      breadcrumbAbout: "公司简介",
      breadcrumbCurrent: "团队成员",
      messagesEyebrow: "Messages",
      messagesTitle: "领导致辞",
      teamGreetingLead:
        "作为与客户共同成长的伙伴，我们以准确、透明的经营与会计工作建立信任。依托连接韩国与印度的实务专长，我们致力于在企业运营各环节创造可衡量的价值。",
      teamIntroBody: `介绍在现场共同参与会计、税务与法人支持工作的同事。我们向 80 余家客户提供从印度进入到运营、会计、税务与合规的一站式服务，服务终止率约 7% 以下，保持稳定的长期合作关系。`,
      ceoEyebrow: "CEO Statement",
      ceoTitle: (name) => `首席执行官 · ${name}`,
      vpEyebrow: "Vice President",
      vpTitle: (name) => `副总裁 · ${name}`,
      caEyebrow: "India CA",
      caTitle: (name) => name,
      leadershipExtraEyebrow: "Leadership",
      titleSublineIntro: "简介",
      teamSectionEyebrow: "Team",
      teamSectionTitle: "团队成员",
      emptyStaffMessage: "暂无一般员工档案。资料就绪后将在此更新。",
      profilePhotoAltSuffix: "头像照片",
    },
  });
}

export function staffNameSortLocale(locale: SiteLocale): string {
  if (locale === "zh") return "zh-Hans-CN";
  if (locale === "en") return "en";
  return "ko";
}
