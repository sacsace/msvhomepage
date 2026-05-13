"use client";

import Link from "next/link";
import { useBrowserPathname } from "@/components/layout/BrowserPathnameProvider";
import { desktopNavMegaMenuItemClass, desktopNavTopSegmentClass } from "@/components/nav/desktop-nav-top-class";
import { servicesNavGroups } from "@/lib/services-nav-groups";
import type { SiteLocale } from "@/lib/site-locale";
import { isNavActive, localeFromPathname, pickLocale, stripLocalePrefix, withLocalePrefix } from "@/lib/site-locale";

function linkClass(active: boolean) {
  return `px-3 py-1.5 text-[13px] tracking-tight transition duration-200 ease-out ${desktopNavTopSegmentClass(active)}`;
}

export function ServicesNavDesktop() {
  const pathname = useBrowserPathname();
  const locale = localeFromPathname(pathname) as SiteLocale;
  const groups = servicesNavGroups(locale);
  const bare = stripLocalePrefix(pathname.split("#")[0] || pathname);
  const active = bare === "/services" || bare.startsWith("/services/");
  const topLabel = pickLocale(locale, { ko: "서비스", en: "Services", zh: "服务" });
  const ariaSub = pickLocale(locale, {
    ko: "서비스 하위 메뉴",
    en: "Services submenu",
    zh: "服务子菜单",
  });

  return (
    <div className="group relative inline-flex items-center">
      <Link
        href={withLocalePrefix("/services", locale)}
        className={`${linkClass(active)} block select-none`}
        aria-current={bare === "/services" ? "page" : undefined}
      >
        {topLabel}
      </Link>
      <div
        className="pointer-events-none invisible absolute left-1/2 right-auto top-full z-50 w-[min(44rem,calc(100vw-2rem))] origin-top -translate-x-1/2 pt-1.5 opacity-0 transition duration-150 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100"
        role="navigation"
        aria-label={ariaSub}
      >
        <div className="max-h-[min(70vh,32rem)] overflow-y-auto rounded-lg border border-slate-100 bg-white py-2 shadow-lg shadow-slate-900/5">
          <div className="grid grid-cols-1 gap-x-6 gap-y-0 px-2 sm:grid-cols-2">
            {groups.map((g) => (
              <div key={g.heading} className="min-w-0 pb-2 pt-1">
                <p className="px-2 pb-1.5 pt-1 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">{g.heading}</p>
                <div className="space-y-0.5">
                  {g.items.map((item) => {
                    const subActive = isNavActive(pathname, item.href);
                    return (
                      <Link
                        key={item.href}
                        href={withLocalePrefix(item.href, locale)}
                        className={`block rounded-md px-2 py-1.5 text-[13px] transition ${desktopNavMegaMenuItemClass(subActive)}`}
                        aria-current={subActive ? "page" : undefined}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
