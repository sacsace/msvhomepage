import type { SiteLocale } from "@/lib/site-locale";
import { pickLocale } from "@/lib/site-locale";
import { company, ICS_PRODUCT_SITE_URL } from "@/lib/site-content";

export type IcsSoftwareSectionCopy = {
  eyebrow: string;
  title: string;
  body: string;
  bullets?: readonly string[];
  closing?: string;
};

export type IcsSoftwarePageCopy = {
  metaTitle: string;
  metaDescription: string;
  pageTitle: string;
  pageHeaderDescription: string;
  overviewEyebrow: string;
  overviewTitle: string;
  heroLead: string;
  sections: readonly IcsSoftwareSectionCopy[];
  externalLinkLabel: string;
  externalLinkButton: string;
  externalLinkUrl: string;
  ctaLead: string;
  linkSoftware: string;
  linkAbout: string;
  linkServices: string;
  linkContact: string;
};

const ko: IcsSoftwarePageCopy = {
  metaTitle: "India Company Search (ICS)",
  metaDescription:
    "인도 법인명·CIN으로 회사를 검색하고 요약 보고서·댓글·평가를 확인하는 India Company Search(ICS).",
  pageTitle: "India Company Search (ICS)",
  pageHeaderDescription:
    "인도 회사명 또는 CIN으로 법인을 검색하고, 매칭 목록과 요약 보고서·댓글·평가를 확인하는 검색 도구입니다.",
  overviewEyebrow: "Overview",
  overviewTitle: "개요",
  heroLead: `India Company Search(ICS)는 인도 법인 정보를 빠르게 찾아보는 웹 검색 도구입니다.

회사명(예: Minsub Ventures) 또는 CIN(예: U17226KA2020PTC133195)으로 검색하면 매칭된 회사 목록을 보여 줍니다. 전체 보기에서는 요약 보고서와 댓글·평가를 확인할 수 있습니다.

법인 실사·거래처 확인·인도 진출 준비 단계에서 회사 정보를 먼저 훑어볼 때 활용할 수 있습니다. ICS는 ${company.shortName} 소프트웨어 라인의 일부로 제공됩니다.`,
  sections: [
    {
      eyebrow: "Search",
      title: "회사명·CIN 검색",
      body: "인도 법인명 또는 Corporate Identification Number(CIN)로 대상 회사를 찾습니다.",
      bullets: [
        "회사명 키워드 검색",
        "CIN 직접 입력 검색",
        "매칭된 회사 목록 표시",
      ],
    },
    {
      eyebrow: "Report",
      title: "요약 보고서·평가",
      body: "전체 보기에서 회사 요약 정보와 댓글·평가를 함께 확인할 수 있습니다.",
      bullets: [
        "회사 요약 보고서",
        "댓글·평가 확인",
        "검색 결과에서 상세로 이동",
      ],
      closing: "공개·수집 가능한 정보를 바탕으로 한 참고용 도구이며, 공식 등기·세무 확인을 대체하지 않습니다.",
    },
    {
      eyebrow: "Fit",
      title: "활용 시나리오",
      body: `${company.shortName} 고객사·내부 실무에서 다음과 같이 활용할 수 있습니다.`,
      bullets: [
        "신규 거래처·파트너 법인 사전 검색",
        "CIN으로 법인 식별 확인",
        "인도 진출·실사 전 기본 정보 파악",
        "법인 설립·운영 상담 전 대상 회사 확인",
      ],
    },
  ],
  externalLinkLabel: "바로가기",
  externalLinkButton: "ICS 사이트 열기",
  externalLinkUrl: ICS_PRODUCT_SITE_URL,
  ctaLead: "다른 소프트웨어 소개를 보거나, 인도 법인 검색·실사 관련 문의를 남겨 주세요.",
  linkSoftware: "소프트웨어",
  linkAbout: "회사 소개",
  linkServices: "서비스",
  linkContact: "문의하기",
};

const en: IcsSoftwarePageCopy = {
  metaTitle: "India Company Search (ICS)",
  metaDescription:
    "Search Indian companies by name or CIN and review summary reports, comments and ratings with India Company Search (ICS).",
  pageTitle: "India Company Search (ICS)",
  pageHeaderDescription:
    "Search Indian companies by name or CIN, then open matching results with summary reports, comments and ratings.",
  overviewEyebrow: "Overview",
  overviewTitle: "Overview",
  heroLead: `India Company Search (ICS) is a web tool for quickly finding Indian company information.

Search by company name (e.g. Minsub Ventures) or CIN (e.g. U17226KA2020PTC133195) to see matching companies. The full view shows a summary report together with comments and ratings.

Use it for early counterparty checks, due diligence prep and India market-entry research. ICS is part of the ${company.shortName} software line.`,
  sections: [
    {
      eyebrow: "Search",
      title: "Name & CIN search",
      body: "Find companies using an Indian company name or Corporate Identification Number (CIN).",
      bullets: ["Keyword search by company name", "Direct CIN lookup", "Matching company list"],
    },
    {
      eyebrow: "Report",
      title: "Summary report & ratings",
      body: "Open the full view for a company summary plus comments and ratings.",
      bullets: ["Company summary report", "Comments and ratings", "Drill-down from search results"],
      closing: "ICS is a reference aid based on available public information and does not replace official registry or tax verification.",
    },
    {
      eyebrow: "Fit",
      title: "Typical uses",
      body: `Teams working with ${company.shortName} often use ICS for:`,
      bullets: [
        "Early checks on new counterparties or partners",
        "Confirming identity via CIN",
        "Baseline research before India entry or diligence",
        "Identifying a target company before incorporation or ops consulting",
      ],
    },
  ],
  externalLinkLabel: "Open product",
  externalLinkButton: "Open ICS",
  externalLinkUrl: ICS_PRODUCT_SITE_URL,
  ctaLead: "Browse other software, or contact us about India company search and diligence support.",
  linkSoftware: "Software",
  linkAbout: "About",
  linkServices: "Services",
  linkContact: "Contact",
};

const zh: IcsSoftwarePageCopy = {
  metaTitle: "India Company Search (ICS)",
  metaDescription: "通过公司名称或 CIN 检索印度法人，并查看摘要报告、评论与评价的 India Company Search（ICS）。",
  pageTitle: "India Company Search (ICS)",
  pageHeaderDescription: "用印度公司名称或 CIN 检索法人，并在结果中查看匹配列表、摘要报告、评论与评价。",
  overviewEyebrow: "Overview",
  overviewTitle: "概述",
  heroLead: `India Company Search（ICS）是用于快速查找印度公司信息的网页检索工具。

输入公司名称（如 Minsub Ventures）或 CIN（如 U17226KA2020PTC133195）即可查看匹配公司列表；在完整视图中可查看摘要报告以及评论与评价。

可用于交易对手初筛、尽职调查准备与进入印度前的基础调研。ICS 属于 ${company.shortName} 软件产品线的一部分。`,
  sections: [
    {
      eyebrow: "Search",
      title: "公司名与 CIN 检索",
      body: "通过印度公司名称或 Corporate Identification Number（CIN）查找目标公司。",
      bullets: ["公司名关键词检索", "直接输入 CIN 查询", "显示匹配公司列表"],
    },
    {
      eyebrow: "Report",
      title: "摘要报告与评价",
      body: "在完整视图中查看公司摘要信息以及评论与评价。",
      bullets: ["公司摘要报告", "评论与评价", "从检索结果进入详情"],
      closing: "ICS 为基于可得公开信息的参考工具，不能替代正式登记或税务核查。",
    },
    {
      eyebrow: "Fit",
      title: "适用场景",
      body: `与 ${company.shortName} 协作的团队常用于：`,
      bullets: [
        "新交易对手或合作方初筛",
        "通过 CIN 确认法人身份",
        "进入印度或尽调前的基础信息梳理",
        "设立或运营咨询前确认目标公司",
      ],
    },
  ],
  externalLinkLabel: "快捷入口",
  externalLinkButton: "打开 ICS",
  externalLinkUrl: ICS_PRODUCT_SITE_URL,
  ctaLead: "可继续浏览其他软件，或就印度公司检索与尽调支持留下咨询。",
  linkSoftware: "软件",
  linkAbout: "公司介绍",
  linkServices: "服务",
  linkContact: "咨询联系",
};

export function icsSoftwarePageCopy(locale: SiteLocale): IcsSoftwarePageCopy {
  return pickLocale(locale, { ko, en, zh });
}
