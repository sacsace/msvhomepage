"use client";

import Link from "next/link";
import { useBrowserPathname } from "@/components/layout/BrowserPathnameProvider";
import { desktopNavTopSegmentClass } from "@/components/nav/desktop-nav-top-class";
import { groupCompanies } from "@/lib/site-content";
import type { SiteLocale } from "@/lib/site-locale";
import { localeFromPathname, pickLocale, stripLocalePrefix, withLocalePrefix } from "@/lib/site-locale";

function linkClass(active: boolean) {
  return `rounded-md px-2.5 py-1.5 text-[13px] transition ${desktopNavTopSegmentClass(active)}`;
}

export function GroupNavDesktop() {
  const pathname = useBrowserPathname();
  const locale = localeFromPathname(pathname) as SiteLocale;
  const bare = stripLocalePrefix(pathname.split("#")[0] || pathname);
  const active = bare === "/group" || bare.startsWith("/group/");
  const label = pickLocale(locale, { ko: "그룹사", en: "Group", zh: "集团" });
  const ariaSub = pickLocale(locale, {
    ko: "그룹사 하위 메뉴",
    en: "Group companies submenu",
    zh: "集团公司子菜单",
  });

  return (
    <div className="group relative flex items-center">
      <Link
        href={withLocalePrefix("/group", locale)}
        className={`${linkClass(active)} block select-none`}
        aria-current={active ? "page" : undefined}
      >
        {label}
      </Link>
      <div
        className="pointer-events-none invisible absolute left-0 top-full z-50 w-[min(17rem,calc(100vw-2rem))] pt-1.5 opacity-0 transition duration-150 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100"
        role="navigation"
        aria-label={ariaSub}
      >
        <div className="rounded-lg border border-slate-100 bg-white py-1 shadow-lg shadow-slate-900/5">
          {groupCompanies.map((g) => {
            const subActive = bare === `/group/${g.slug}`;
            return (
              <Link
                key={g.slug}
                href={withLocalePrefix(`/group/${g.slug}`, locale)}
                className={`block px-3 py-2 text-[13px] transition hover:bg-slate-50 ${
                  subActive ? "bg-msv-blue-soft/70 font-semibold text-msv-navy" : "font-medium text-slate-600 hover:text-msv-navy"
                }`}
                aria-current={subActive ? "page" : undefined}
              >
                {g.menuLabel}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
