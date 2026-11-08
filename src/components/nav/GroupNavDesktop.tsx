"use client";

import Link from "next/link";
import { useBrowserPathname } from "@/components/layout/BrowserPathnameProvider";
import { DesktopHoverDropdown } from "@/components/nav/DesktopHoverDropdown";
import { desktopNavMegaMenuItemClass, desktopNavTopSegmentClass } from "@/components/nav/desktop-nav-top-class";
import { groupCompanies } from "@/lib/site-content";
import type { SiteLocale } from "@/lib/site-locale";
import { localeFromPathname, pickLocale, stripLocalePrefix, withLocalePrefix } from "@/lib/site-locale";

function linkClass(active: boolean) {
  return `px-3 py-1.5 text-[13px] tracking-tight transition duration-200 ease-out ${desktopNavTopSegmentClass(active)}`;
}

export function GroupNavDesktop() {
  const pathname = useBrowserPathname();
  const locale = localeFromPathname(pathname) as SiteLocale;
  const bare = stripLocalePrefix(pathname.split("#")[0] || pathname);
  const active = bare === "/group" || bare.startsWith("/group/");
  const label = pickLocale(locale, { ko: "그룹사", en: "Group Companies", zh: "集团" });
  const ariaSub = pickLocale(locale, {
    ko: "그룹사 하위 메뉴",
    en: "Group companies submenu",
    zh: "集团公司子菜单",
  });

  return (
    <DesktopHoverDropdown
      ariaLabel={ariaSub}
      panelWidthClass="w-[min(17rem,calc(100vw-2rem))]"
      trigger={
        <Link
          href={withLocalePrefix("/group", locale)}
          className={`${linkClass(active)} block select-none`}
          aria-current={active ? "page" : undefined}
          aria-haspopup="true"
        >
          {label}
        </Link>
      }
    >
      {groupCompanies.map((g) => {
        const subActive = bare === `/group/${g.slug}`;
        return (
          <Link
            key={g.slug}
            href={withLocalePrefix(`/group/${g.slug}`, locale)}
            className={`block rounded-md px-3 py-2 text-[13px] transition ${desktopNavMegaMenuItemClass(subActive)}`}
            aria-current={subActive ? "page" : undefined}
          >
            {g.menuLabel}
          </Link>
        );
      })}
    </DesktopHoverDropdown>
  );
}
