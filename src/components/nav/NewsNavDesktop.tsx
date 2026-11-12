"use client";

import Link from "next/link";
import { useBrowserPathname } from "@/components/layout/BrowserPathnameProvider";
import { DesktopHoverDropdown } from "@/components/nav/DesktopHoverDropdown";
import { desktopNavMegaMenuItemClass, desktopNavTopSegmentClass } from "@/components/nav/desktop-nav-top-class";
import type { SiteLocale } from "@/lib/site-locale";
import { localeFromPathname, pickLocale, stripLocalePrefix, withLocalePrefix } from "@/lib/site-locale";

const subKo = [
  { href: "/notice", label: "공지사항" },
  { href: "/ongoing", label: "프로젝트 현황" },
] as const;

const subEn = [
  { href: "/notice", label: "Announcements" },
  { href: "/ongoing", label: "Project status" },
] as const;

const subZh = [
  { href: "/notice", label: "公告" },
  { href: "/ongoing", label: "项目动态" },
] as const;

function linkClass(active: boolean) {
  return `px-3 py-1.5 text-[13px] tracking-tight transition duration-200 ease-out ${desktopNavTopSegmentClass(active)}`;
}

function isNewsSection(bare: string): boolean {
  if (bare === "/notice" || bare.startsWith("/notice/")) return true;
  if (bare === "/ongoing" || bare.startsWith("/ongoing/")) return true;
  return false;
}

export function NewsNavDesktop() {
  const pathname = useBrowserPathname();
  const locale = localeFromPathname(pathname) as SiteLocale;
  const sub = locale === "en" ? subEn : locale === "zh" ? subZh : subKo;
  const bare = stripLocalePrefix(pathname.split("#")[0] || pathname);
  const active = isNewsSection(bare);
  const topLabel = pickLocale(locale, { ko: "소식", en: "News", zh: "资讯" });
  const ariaSub = pickLocale(locale, {
    ko: "소식 하위 메뉴",
    en: "News submenu",
    zh: "资讯子菜单",
  });

  return (
    <DesktopHoverDropdown
      ariaLabel={ariaSub}
      panelWidthClass="w-[min(20rem,calc(100vw-2rem))]"
      trigger={
        <Link
          href={withLocalePrefix("/notice", locale)}
          className={`${linkClass(active)} block select-none`}
          aria-haspopup="true"
        >
          {topLabel}
        </Link>
      }
    >
      {sub.map((item) => {
        const subActive =
          bare === item.href ||
          (item.href === "/notice" && bare.startsWith("/notice/")) ||
          (item.href === "/ongoing" && bare.startsWith("/ongoing/"));
        return (
          <Link
            key={item.href}
            href={withLocalePrefix(item.href, locale)}
            className={`block rounded-md px-3 py-2 text-[13px] transition ${desktopNavMegaMenuItemClass(subActive)}`}
            aria-current={subActive ? "page" : undefined}
          >
            {item.label}
          </Link>
        );
      })}
    </DesktopHoverDropdown>
  );
}
