import { shellStrings } from "@/lib/i18n/shell";
import { servicesNavGroups } from "@/lib/services-nav-groups";
import { groupCompanies } from "@/lib/site-content";
import type { SiteLocale } from "@/lib/site-locale";
import { pickLocale, withLocalePrefix } from "@/lib/site-locale";

export type MegaMenuLink = { href: string; label: string };

export type MegaMenuGroup = { heading: string; items: MegaMenuLink[] };

export type MegaMenuSection = {
  title: string;
  titleHref?: string;
  items: MegaMenuLink[];
};

export type MegaMenuColumn = {
  title: string;
  titleHref?: string;
  items?: MegaMenuLink[];
  groups?: MegaMenuGroup[];
  /** 서비스: 제목 1개 + 2열 그룹을 행 단위로 정렬 */
  layout?: "default" | "services-split" | "group-with-news";
  /** 그룹사 열 하단에 소식 등 추가 섹션 */
  stackedBelow?: MegaMenuSection;
};

export function buildSiteMegaMenuColumns(locale: SiteLocale): MegaMenuColumn[] {
  const shell = shellStrings(locale);

  const aboutItems: MegaMenuLink[] = [
    {
      href: withLocalePrefix("/about", locale),
      label: pickLocale(locale, { ko: "회사 소개", en: "Company", zh: "公司简介" }),
    },
    {
      href: withLocalePrefix("/about/ci", locale),
      label: pickLocale(locale, { ko: "CI 소개", en: "Brand & CI", zh: "CI 介绍" }),
    },
    {
      href: withLocalePrefix("/about/team", locale),
      label: pickLocale(locale, { ko: "팀원 소개", en: "Team", zh: "团队介绍" }),
    },
    {
      href: withLocalePrefix("/about/clients", locale),
      label: pickLocale(locale, { ko: "고객사", en: "Clients", zh: "客户" }),
    },
  ];

  const serviceGroups = servicesNavGroups(locale).map((g) => ({
    heading: g.heading,
    items: g.items.map((i) => ({
      href: withLocalePrefix(i.href, locale),
      label: i.label,
    })),
  }));

  const servicesColumn: MegaMenuColumn = {
    title: shell.services,
    titleHref: withLocalePrefix("/services", locale),
    groups: serviceGroups,
    layout: "services-split",
  };

  const softwareItems: MegaMenuLink[] = [
    {
      href: withLocalePrefix("/software", locale),
      label: pickLocale(locale, { ko: "소프트웨어 개요", en: "Software overview", zh: "软件总览" }),
    },
    {
      href: withLocalePrefix("/software/mvs", locale),
      label: pickLocale(locale, { ko: "그룹웨어 (MVS)", en: "Groupware (MVS)", zh: "集团办公（MVS）" }),
    },
    {
      href: withLocalePrefix("/software/herenow", locale),
      label: pickLocale(locale, { ko: "출퇴근 기록 (HereNow)", en: "Attendance (HereNow)", zh: "考勤系统（HereNow）" }),
    },
    {
      href: withLocalePrefix("/software/payroll-mailer", locale),
      label: pickLocale(locale, {
        ko: "급여 명세서 이메일",
        en: "Payroll payslip email",
        zh: "工资单邮件",
      }),
    },
  ];

  const groupItems: MegaMenuLink[] = [
    {
      href: withLocalePrefix("/group", locale),
      label: pickLocale(locale, { ko: "브랜드 · 법인", en: "Brands & companies", zh: "品牌与法人" }),
    },
    ...groupCompanies.map((g) => ({
      href: withLocalePrefix(`/group/${g.slug}`, locale),
      label: g.menuLabel,
    })),
  ];

  const newsItems: MegaMenuLink[] = [
    {
      href: withLocalePrefix("/notice", locale),
      label: pickLocale(locale, { ko: "공지사항", en: "Announcements", zh: "公告" }),
    },
    {
      href: withLocalePrefix("/ongoing", locale),
      label: pickLocale(locale, { ko: "프로젝트 현황", en: "Project status", zh: "项目动态" }),
    },
    {
      href: withLocalePrefix("/articles", locale),
      label: pickLocale(locale, { ko: "자료실", en: "Resources", zh: "资料库" }),
    },
  ];

  const groupColumn: MegaMenuColumn = {
    title: shell.group,
    titleHref: withLocalePrefix("/group", locale),
    items: groupItems,
    layout: "group-with-news",
    stackedBelow: {
      title: shell.news,
      titleHref: withLocalePrefix("/notice", locale),
      items: newsItems,
    },
  };

  return [
    { title: shell.about, titleHref: withLocalePrefix("/about", locale), items: aboutItems },
    servicesColumn,
    { title: shell.software, titleHref: withLocalePrefix("/software", locale), items: softwareItems },
    groupColumn,
  ];
}

export function megaMenuUiStrings(locale: SiteLocale) {
  return {
    openMenu: pickLocale(locale, { ko: "전체 메뉴 열기", en: "Open site menu", zh: "打开全站菜单" }),
    closeMenu: pickLocale(locale, { ko: "메뉴 닫기", en: "Close menu", zh: "关闭菜单" }),
    menuTitle: pickLocale(locale, { ko: "사이트 메뉴", en: "Site menu", zh: "网站菜单" }),
    home: shellStrings(locale).home,
    contact: shellStrings(locale).contact,
  };
}
