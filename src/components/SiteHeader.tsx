import Link from "next/link";
import { MsvWordmark } from "@/components/brand/MsvWordmark";
import { MobileNavLink, NavLink } from "@/components/layout/NavLink";
import { AboutNavDesktop } from "@/components/nav/AboutNavDesktop";
import { GroupNavDesktop } from "@/components/nav/GroupNavDesktop";
import { NewsNavDesktop } from "@/components/nav/NewsNavDesktop";
import { ServicesNavDesktop } from "@/components/nav/ServicesNavDesktop";
import { SoftwareNavDesktop } from "@/components/nav/SoftwareNavDesktop";
import { HeaderLanguageSelect } from "@/components/layout/HeaderLanguageSelect";
import { shellStrings } from "@/lib/i18n/shell";
import { servicesNavGroups } from "@/lib/services-nav-groups";
import type { SiteLocale } from "@/lib/site-locale";
import { pickLocale, withLocalePrefix } from "@/lib/site-locale";
import { groupCompanies } from "@/lib/site-content";

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
    <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/65 backdrop-blur-xl backdrop-saturate-150 supports-[backdrop-filter]:bg-white/55">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-2.5 sm:gap-3 sm:px-6 sm:py-3">
        <Link
          href={homeHref}
          className="flex shrink-0 items-center rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-msv-blue"
        >
          <MsvWordmark
            alt={shell.brandWordmarkAlt}
            priority
            heightClass="h-8 sm:h-9"
            className="origin-left scale-90"
            imageSrc="/msv-wordmark-header.png"
            imageWidth={1024}
            imageHeight={100}
          />
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
            <div className="absolute right-0 z-50 mt-1.5 max-h-[min(70vh,32rem)] w-[min(20rem,calc(100vw-1.5rem))] overflow-y-auto rounded-lg border border-slate-100 bg-white py-1 shadow-lg shadow-slate-900/5">
              {links.map((item) =>
                item.href === "/group" ? (
                  <div key="group" className="py-1">
                    <div className="px-3 pb-1 pt-2 text-[11px] font-medium uppercase tracking-wider text-slate-400">
                      {shell.groupSection}
                    </div>
                    <MobileNavLink href="/group" match="prefix">
                      {pickLocale(locale, {
                        ko: "브랜드 · 법인",
                        en: "Brands & companies",
                        zh: "品牌与法人",
                      })}
                    </MobileNavLink>
                    {groupCompanies.map((g) => (
                      <MobileNavLink key={g.slug} href={`/group/${g.slug}`} className="pl-4" match="exact">
                        {g.menuLabel}
                      </MobileNavLink>
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
                    <MobileNavLink href="/services" match="exact" className="font-semibold text-msv-navy">
                      {pickLocale(locale, {
                        ko: "인도 진출·운영 통합 서비스",
                        en: "Integrated India entry & operations",
                        zh: "印度市场进入与运营整合服务",
                      })}
                    </MobileNavLink>
                    {servicesNavGroups(locale).map((g) => (
                      <div key={g.heading}>
                        <div className="px-3 pb-0.5 pt-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          {g.heading}
                        </div>
                        {g.items.map((it) => (
                          <MobileNavLink key={it.href} href={it.href} className="pl-4">
                            {it.label}
                          </MobileNavLink>
                        ))}
                      </div>
                    ))}
                  </div>
                ) : item.href === ABOUT_MENU ? (
                  <div key="about" className="py-1">
                    <div className="px-3 pb-1 pt-2 text-[11px] font-semibold tracking-wide text-slate-500">
                      {shell.aboutSection}
                    </div>
                    <MobileNavLink href="/about" match="exact">
                      {pickLocale(locale, { ko: "회사 소개", en: "Company", zh: "公司简介" })}
                    </MobileNavLink>
                    <MobileNavLink href="/about/ci" match="exact">
                      {pickLocale(locale, { ko: "CI 소개", en: "Brand & CI", zh: "CI 介绍" })}
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
