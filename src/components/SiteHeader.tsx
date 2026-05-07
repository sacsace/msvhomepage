import Link from "next/link";
import { MsvMark } from "@/components/brand/MsvMark";
import { MobileNavLink, NavLink } from "@/components/layout/NavLink";
import { AboutNavDesktop } from "@/components/nav/AboutNavDesktop";
import { GroupNavDesktop } from "@/components/nav/GroupNavDesktop";
import { NewsNavDesktop } from "@/components/nav/NewsNavDesktop";
import { ServicesNavDesktop } from "@/components/nav/ServicesNavDesktop";
import { SoftwareNavDesktop } from "@/components/nav/SoftwareNavDesktop";
import { HeaderLanguageSelect } from "@/components/layout/HeaderLanguageSelect";
import { shellStrings } from "@/lib/i18n/shell";
import type { SiteLocale } from "@/lib/site-locale";
import { pickLocale, withLocalePrefix } from "@/lib/site-locale";
import { company, groupCompanies } from "@/lib/site-content";

/** 헤더 전용: 실제 경로가 아닌 드롭다운 슬롯 식별자 */
const ABOUT_MENU = "__msv_about__" as const;
const NEWS_MENU = "__msv_news__" as const;

type Props = {
  locale: SiteLocale;
};

export function SiteHeader({ locale }: Props) {
  const shell = shellStrings(locale);
  const homeHref = withLocalePrefix("/", locale);

  const links = [
    { href: "/", label: shell.home },
    { href: ABOUT_MENU, label: shell.about },
    { href: "/services", label: shell.services },
    { href: "/software", label: shell.software },
    { href: "/group", label: shell.group },
    { href: NEWS_MENU, label: shell.news },
    { href: "/contact", label: shell.contact },
  ] as const;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-2.5 sm:gap-3 sm:px-6 sm:py-3">
        <Link
          href={homeHref}
          className="flex min-w-0 shrink-0 items-center gap-2 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-msv-blue sm:gap-2.5"
        >
          <MsvMark className="h-8 w-8 shrink-0 sm:h-9 sm:w-9" />
          <span className="truncate text-sm font-semibold leading-tight text-msv-navy sm:text-[15px]">
            {company.shortName}
          </span>
        </Link>

        <div className="flex min-w-0 flex-1 items-center justify-end gap-2 sm:gap-3">
          <nav
            className="hidden min-w-0 flex-wrap items-center justify-end gap-x-0.5 gap-y-1 lg:flex"
            aria-label={shell.navAria}
          >
            {links.map((item) =>
              item.href === "/group" ? (
                <GroupNavDesktop key="group" />
              ) : item.href === ABOUT_MENU ? (
                <AboutNavDesktop key="about" />
              ) : item.href === "/services" ? (
                <ServicesNavDesktop key="services" />
              ) : item.href === "/software" ? (
                <SoftwareNavDesktop key="software" />
              ) : item.href === NEWS_MENU ? (
                <NewsNavDesktop key="news" />
              ) : (
                <NavLink key={item.href} href={item.href}>
                  {item.label}
                </NavLink>
              ),
            )}
          </nav>

          <HeaderLanguageSelect activeLocale={locale} />

          <details className="relative shrink-0 lg:hidden">
            <summary className="cursor-pointer list-none rounded-md px-3 py-1.5 text-sm font-medium text-slate-600 marker:hidden hover:bg-slate-50 hover:text-msv-navy [&::-webkit-details-marker]:hidden">
              {shell.menu}
            </summary>
            <div className="absolute right-0 z-50 mt-1.5 max-h-[min(70vh,28rem)] w-52 overflow-y-auto rounded-lg border border-slate-100 bg-white py-1 shadow-lg shadow-slate-900/5">
              {links.map((item) =>
                item.href === "/group" ? (
                  <div key="group" className="py-1">
                    <div className="px-3 pb-1 pt-2 text-[11px] font-medium uppercase tracking-wider text-slate-400">
                      {shell.groupSection}
                    </div>
                    {groupCompanies.map((g) => (
                      <Link
                        key={g.slug}
                        href={withLocalePrefix(`/group/${g.slug}`, locale)}
                        className="block px-3 py-2 pl-4 text-sm text-slate-600 hover:bg-slate-50 hover:text-msv-navy"
                      >
                        {g.menuLabel}
                      </Link>
                    ))}
                  </div>
                ) : item.href === "/software" ? (
                  <div key="software" className="py-1">
                    <MobileNavLink href="/software">{shell.software}</MobileNavLink>
                    <MobileNavLink href="/software/mvs">
                      {pickLocale(locale, {
                        ko: "그룹웨어 (MVS)",
                        en: "Groupware (MVS)",
                        zh: "集团办公（MVS）",
                      })}
                    </MobileNavLink>
                    <MobileNavLink href="/software/herenow">
                      {pickLocale(locale, {
                        ko: "출퇴근 기록 시스템 (HereNow)",
                        en: "Attendance (HereNow)",
                        zh: "考勤系统（HereNow）",
                      })}
                    </MobileNavLink>
                  </div>
                ) : item.href === "/services" ? (
                  <div key="services" className="py-1">
                    <div className="px-3 pb-1 pt-2 text-[11px] font-semibold tracking-wide text-slate-500">
                      {shell.servicesSection}
                    </div>
                    <MobileNavLink href="/services/corporate-incorporation">
                      {pickLocale(locale, {
                        ko: "법인 설립 서비스",
                        en: "Corporate incorporation",
                        zh: "公司设立服务",
                      })}
                    </MobileNavLink>
                    <MobileNavLink href="/services">
                      {pickLocale(locale, {
                        ko: "회계 서비스",
                        en: "Accounting services",
                        zh: "会计与税务服务",
                      })}
                    </MobileNavLink>
                    <MobileNavLink href="/services/india-accounting-glossary">
                      {pickLocale(locale, {
                        ko: "인도 회계 용어집",
                        en: "India accounting glossary",
                        zh: "印度会计术语表",
                      })}
                    </MobileNavLink>
                    <MobileNavLink href="/services/license-registration">
                      {pickLocale(locale, {
                        ko: "라이센스 등록 서비스",
                        en: "License registration",
                        zh: "许可证注册",
                      })}
                    </MobileNavLink>
                    <MobileNavLink href="/services/recruitment-support">
                      {pickLocale(locale, {
                        ko: "채용지원 서비스",
                        en: "Recruitment support",
                        zh: "招聘支持",
                      })}
                    </MobileNavLink>
                    <MobileNavLink href="/services/frro">
                      {pickLocale(locale, { ko: "FRRO 서비스", en: "FRRO services", zh: "FRRO 服务" })}
                    </MobileNavLink>
                    <MobileNavLink href="/services/ecb">
                      {pickLocale(locale, { ko: "ECB 안내", en: "ECB guide", zh: "ECB 说明" })}
                    </MobileNavLink>
                    <MobileNavLink href="/services/form-41-registration">
                      {pickLocale(locale, {
                        ko: "Form 41(구 Form 10F) 등록 서비스",
                        en: "Form 41 registration (formerly Form 10F)",
                        zh: "Form 41 注册（原 Form 10F）",
                      })}
                    </MobileNavLink>
                    <MobileNavLink href="/services/personal-income-tax-calculator">
                      {pickLocale(locale, {
                        ko: "개인 소득세 계산기",
                        en: "Personal income tax calculator",
                        zh: "个人所得税计算器",
                      })}
                    </MobileNavLink>
                    <MobileNavLink href="/services/corporate-tax-calculator">
                      {pickLocale(locale, {
                        ko: "법인세 계산기",
                        en: "Corporate tax calculator",
                        zh: "企业所得税计算器",
                      })}
                    </MobileNavLink>
                    <MobileNavLink href="/services/professional-tax-calculator">
                      {pickLocale(locale, {
                        ko: "Professional Tax 계산기",
                        en: "Professional tax calculator",
                        zh: "职业税计算器",
                      })}
                    </MobileNavLink>
                  </div>
                ) : item.href === ABOUT_MENU ? (
                  <div key="about" className="py-1">
                    <div className="px-3 pb-1 pt-2 text-[11px] font-semibold tracking-wide text-slate-500">
                      {shell.aboutSection}
                    </div>
                    <MobileNavLink href="/about" match="exact">
                      {pickLocale(locale, { ko: "회사 소개", en: "Company", zh: "公司简介" })}
                    </MobileNavLink>
                    <MobileNavLink href="/about/team" match="exact">
                      {pickLocale(locale, { ko: "팀원 소개", en: "Team", zh: "团队介绍" })}
                    </MobileNavLink>
                    <MobileNavLink href="/about/clients" match="exact">
                      {pickLocale(locale, { ko: "고객사", en: "Clients", zh: "客户" })}
                    </MobileNavLink>
                  </div>
                ) : item.href === NEWS_MENU ? (
                  <div key="news" className="py-1">
                    <div className="px-3 pb-1 pt-2 text-[11px] font-semibold tracking-wide text-slate-500">
                      {shell.newsSection}
                    </div>
                    <MobileNavLink href="/notice">
                      {pickLocale(locale, { ko: "공지사항", en: "Announcements", zh: "公告" })}
                    </MobileNavLink>
                    <MobileNavLink href="/ongoing">
                      {pickLocale(locale, { ko: "프로젝트 현황", en: "Project status", zh: "项目动态" })}
                    </MobileNavLink>
                    <MobileNavLink href="/articles">
                      {pickLocale(locale, { ko: "자료실", en: "Resources", zh: "资料库" })}
                    </MobileNavLink>
                  </div>
                ) : (
                  <MobileNavLink key={item.href} href={item.href}>
                    {item.label}
                  </MobileNavLink>
                ),
              )}
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
