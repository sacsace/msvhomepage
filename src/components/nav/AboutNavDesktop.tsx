"use client";

import Link from "next/link";
import { useBrowserPathname } from "@/components/layout/BrowserPathnameProvider";
import { desktopNavTopSegmentClass } from "@/components/nav/desktop-nav-top-class";
import { shellStrings } from "@/lib/i18n/shell";
import type { SiteLocale } from "@/lib/site-locale";
import { isNavActive, localeFromPathname, pickLocale, stripLocalePrefix, withLocalePrefix } from "@/lib/site-locale";

const subKo = [
  { href: "/about", label: "회사 소개" },
  { href: "/about/ci", label: "CI 소개" },
  { href: "/about/team", label: "팀원 소개" },
  { href: "/about/clients", label: "고객사" },
] as const;

const subEn = [
  { href: "/about", label: "Company" },
  { href: "/about/ci", label: "Brand & CI" },
  { href: "/about/team", label: "Team" },
  { href: "/about/clients", label: "Clients" },
] as const;

const subZh = [
  { href: "/about", label: "公司简介" },
  { href: "/about/ci", label: "CI 介绍" },
  { href: "/about/team", label: "团队介绍" },
  { href: "/about/clients", label: "客户" },
] as const;

function isAboutSubActive(href: string, bare: string): boolean {
  if (href === "/about") return bare === "/about";
  return bare === href || bare.startsWith(`${href}/`);
}

function linkClass(active: boolean) {
  return `rounded-md px-2.5 py-1.5 text-[13px] transition ${desktopNavTopSegmentClass(active)}`;
}

export function AboutNavDesktop() {
  const pathname = useBrowserPathname();
  const locale = localeFromPathname(pathname) as SiteLocale;
  const shell = shellStrings(locale);
  const sub = locale === "en" ? subEn : locale === "zh" ? subZh : subKo;
  const active = isNavActive(pathname, "/about");
  const bare = stripLocalePrefix(pathname.split("#")[0] || pathname);
  const subMenuAria = pickLocale(locale, {
    ko: "About 하위 메뉴",
    en: "About submenu",
    zh: "关于子菜单",
  });

  return (
    <div className="group relative flex items-center">
      <Link
        href={withLocalePrefix("/about", locale)}
        className={`${linkClass(active)} block select-none`}
        aria-current={active ? "page" : undefined}
      >
        {shell.about}
      </Link>
      <div
        className="pointer-events-none invisible absolute left-0 top-full z-50 w-[min(20rem,calc(100vw-2rem))] pt-1.5 opacity-0 transition duration-150 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100"
        role="navigation"
        aria-label={subMenuAria}
      >
        <div className="rounded-lg border border-slate-100 bg-white py-1 shadow-lg shadow-slate-900/5">
          {sub.map((item) => {
            const isSubActive = isAboutSubActive(item.href, bare);
            return (
              <Link
                key={item.href}
                href={withLocalePrefix(item.href, locale)}
                className={`block px-3 py-2 text-[13px] transition hover:bg-slate-50 ${
                  isSubActive ? "bg-msv-blue-soft/70 font-semibold text-msv-navy" : "font-medium text-slate-600 hover:text-msv-navy"
                }`}
                aria-current={isSubActive ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
