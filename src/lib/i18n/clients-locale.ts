import { company } from "@/lib/site-content";
import { pickLocale, type SiteLocale } from "@/lib/site-locale";

export type ClientsPageCopy = {
  metaTitle: string;
  metaDescription: string;
  pageTitle: string;
  /** PageHeader description — 줄바꿈 포함 가능 */
  pageDescription: string;
  breadcrumbAbout: string;
  breadcrumbCurrent: string;
  directoryEyebrow: string;
  directoryTitle: string;
  directorySubtitle: string;
  emptyListMessage: string;
  clientLogoAltSuffix: string;
  noLogoPlaceholder: string;
  websiteLinkLabel: string;
};

export function clientsPageCopy(locale: SiteLocale): ClientsPageCopy {
  return pickLocale(locale, {
    ko: {
      metaTitle: "고객사",
      metaDescription: `${company.shortName} 고객사 — 함께 성장해 온 주요 고객과 인도 진출·운영·회계·세무·컴플라이언스 협력 관계를 소개합니다.`,
      pageTitle: "고객사",
      pageDescription: `${company.shortName}와 함께 성장해 온 주요 고객사를 소개합니다. 인도 진출부터 운영, 회계·세무, 컴플라이언스까지 다양한 분야에서 신뢰를 바탕으로 협력하고 있습니다.`,
      breadcrumbAbout: "회사 소개",
      breadcrumbCurrent: "고객사",
      directoryEyebrow: "Directory",
      directoryTitle: "등록 고객사",
      directorySubtitle:
        "MS Ventures와 함께하고 있는 고객사 목록입니다. 인도 법인 설립, 회계·세무, 컴플라이언스, 운영 지원 등 다양한 분야의 프로젝트를 수행한 기업들을 확인할 수 있습니다.",
      emptyListMessage: "등록된 고객사가 없습니다.",
      clientLogoAltSuffix: "로고",
      noLogoPlaceholder: "로고 없음",
      websiteLinkLabel: "웹사이트",
    },
    en: {
      metaTitle: "Clients",
      metaDescription: `${company.shortName} clients — key relationships across India entry, operations, accounting, tax and compliance.`,
      pageTitle: "Clients",
      pageDescription: `Meet selected companies that have grown with ${company.shortName}. We collaborate across India market entry, day-to-day operations, accounting, tax and compliance—built on long-term trust.`,
      breadcrumbAbout: "About",
      breadcrumbCurrent: "Clients",
      directoryEyebrow: "Directory",
      directoryTitle: "Registered clients",
      directorySubtitle:
        "Companies currently working with MS Ventures. Browse organisations we have supported across India incorporation, accounting, tax, compliance, operations and related projects.",
      emptyListMessage: "No client records are published yet.",
      clientLogoAltSuffix: "logo",
      noLogoPlaceholder: "No logo",
      websiteLinkLabel: "Website",
    },
    zh: {
      metaTitle: "客户",
      metaDescription: `${company.shortName} 客户 — 介绍印度进入、运营、会计、税务与合规等领域的主要合作关系。`,
      pageTitle: "客户",
      pageDescription: `介绍与 ${company.shortName} 共同成长的主要客户。从印度进入到日常运营、会计、税务与合规，我们在多个领域以信任为基础开展合作。`,
      breadcrumbAbout: "公司简介",
      breadcrumbCurrent: "客户",
      directoryEyebrow: "Directory",
      directoryTitle: "已登记客户",
      directorySubtitle:
        "与 MS Ventures 合作的客户一览。可查看我们在印度公司设立、会计与税务、合规及运营支持等领域服务过的企业。",
      emptyListMessage: "暂无已发布的客户记录。",
      clientLogoAltSuffix: "标志",
      noLogoPlaceholder: "无标志",
      websiteLinkLabel: "网站",
    },
  });
}
