import Link from "next/link";
import { MsvWordmark } from "@/components/brand/MsvWordmark";
import { NavLink } from "@/components/layout/NavLink";
import { AboutNavDesktop } from "@/components/nav/AboutNavDesktop";
import { GroupNavDesktop } from "@/components/nav/GroupNavDesktop";
import { NewsNavDesktop } from "@/components/nav/NewsNavDesktop";
import { ServicesNavDesktop } from "@/components/nav/ServicesNavDesktop";
import { SoftwareNavDesktop } from "@/components/nav/SoftwareNavDesktop";
import { HeaderLanguageSelect } from "@/components/layout/HeaderLanguageSelect";
import { SiteMegaMenu } from "@/components/nav/SiteMegaMenu";
import { shellStrings } from "@/lib/i18n/shell";
import type { SiteLocale } from "@/lib/site-locale";
import { withLocalePrefix } from "@/lib/site-locale";

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
          className="flex min-w-0 shrink-0 items-center rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-msv-blue"
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
          <SiteMegaMenu locale={locale} />
        </div>
      </div>
    </header>
  );
}
