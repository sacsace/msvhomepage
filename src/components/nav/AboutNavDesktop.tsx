"use client";

import Link from "next/link";
import { useBrowserPathname } from "@/components/layout/BrowserPathnameProvider";
import { DesktopHoverDropdown } from "@/components/nav/DesktopHoverDropdown";
import { desktopNavMegaMenuItemClass, desktopNavTopSegmentClass } from "@/components/nav/desktop-nav-top-class";
import { shellStrings } from "@/lib/i18n/shell";
import type { SiteLocale } from "@/lib/site-locale";
import { isNavActive, localeFromPathname, pickLocale, stripLocalePrefix, withLocalePrefix } from "@/lib/site-locale";

const subKo = [
  { href: "/about", label: "MSV 소개" },
  { href: "/about/team", label: "구성원" },
  { href: "/about/clients", label: "고객사" },
  { href: "/group", label: "그룹사" },
] as const;

const subEn = [
  { href: "/about", label: "About MSV" },
  { href: "/about/team", label: "Team" },
  { href: "/about/clients", label: "Clients" },
  { href: "/group", label: "Group companies" },
] as const;

const subZh = [
  { href: "/about", label: "MSV 介绍" },
  { href: "/about/team", label: "团队" },
  { href: "/about/clients", label: "客户" },
  { href: "/group", label: "集团公司" },
] as const;

function isAboutSubActive(href: string, bare: string): boolean {
  if (href === "/about") return bare === "/about";
  if (href === "/group") return bare === "/group" || bare.startsWith("/group/");
  return bare === href || bare.startsWith(`${href}/`);
}

function linkClass(active: boolean) {
  return `px-3 py-1.5 text-[13px] tracking-tight transition duration-200 ease-out ${desktopNavTopSegmentClass(active)}`;
}

export function AboutNavDesktop() {
  const pathname = useBrowserPathname();
  const locale = localeFromPathname(pathname) as SiteLocale;
  const shell = shellStrings(locale);
  const sub = locale === "en" ? subEn : locale === "zh" ? subZh : subKo;
  const bare = stripLocalePrefix(pathname.split("#")[0] || pathname);
  const active = isNavActive(pathname, "/about") || bare === "/group" || bare.startsWith("/group/");
  const subMenuAria = pickLocale(locale, {
    ko: "회사 소개 하위 메뉴",
    en: "About submenu",
    zh: "公司介绍子菜单",
  });

  return (
    <DesktopHoverDropdown
      ariaLabel={subMenuAria}
      panelWidthClass="w-[min(20rem,calc(100vw-2rem))]"
      trigger={
        <Link
          href={withLocalePrefix("/about", locale)}
          className={`${linkClass(active)} block select-none`}
          aria-current={bare === "/about" ? "page" : undefined}
          aria-haspopup="true"
        >
          {shell.about}
        </Link>
      }
    >
      {sub.map((item) => {
        const isSubActive = isAboutSubActive(item.href, bare);
        return (
          <Link
            key={item.href}
            href={withLocalePrefix(item.href, locale)}
            className={`block rounded-md px-3 py-2 text-[13px] transition ${desktopNavMegaMenuItemClass(isSubActive)}`}
            aria-current={isSubActive ? "page" : undefined}
          >
            {item.label}
          </Link>
        );
      })}
    </DesktopHoverDropdown>
  );
}
