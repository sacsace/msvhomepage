"use client";

import Link from "next/link";
import { useBrowserPathname } from "@/components/layout/BrowserPathnameProvider";
import { DesktopHoverDropdown } from "@/components/nav/DesktopHoverDropdown";
import { desktopNavMegaMenuItemClass, desktopNavTopSegmentClass } from "@/components/nav/desktop-nav-top-class";
import { isResourcesBarePath, resourcesNavGroups } from "@/lib/resources-nav-groups";
import type { SiteLocale } from "@/lib/site-locale";
import { localeFromPathname, pickLocale, stripLocalePrefix, withLocalePrefix } from "@/lib/site-locale";

function linkClass(active: boolean) {
  return `px-3 py-1.5 text-[13px] tracking-tight transition duration-200 ease-out ${desktopNavTopSegmentClass(active)}`;
}

export function ResourcesNavDesktop() {
  const pathname = useBrowserPathname();
  const locale = localeFromPathname(pathname) as SiteLocale;
  const groups = resourcesNavGroups(locale);
  const bare = stripLocalePrefix(pathname.split("#")[0] || pathname);
  const active = isResourcesBarePath(bare);
  const topLabel = pickLocale(locale, { ko: "자료실", en: "Resources", zh: "资料库" });
  const ariaSub = pickLocale(locale, {
    ko: "자료실 하위 메뉴",
    en: "Resources submenu",
    zh: "资料库子菜单",
  });

  return (
    <DesktopHoverDropdown
      ariaLabel={ariaSub}
      panelWidthClass="w-[min(40rem,calc(100vw-2rem))]"
      align="center"
      trigger={
        <Link
          href={withLocalePrefix("/articles", locale)}
          className={`${linkClass(active)} block select-none`}
          aria-haspopup="true"
        >
          {topLabel}
        </Link>
      }
    >
      <div className="max-h-[min(70vh,32rem)] overflow-y-auto py-1">
        <div className="grid grid-cols-1 gap-x-6 gap-y-0 px-2 sm:grid-cols-2">
          {groups.map((g) => (
            <div key={g.heading} className="min-w-0 pb-2 pt-1">
              <p className="px-2 pb-1.5 pt-1 text-[10px] font-bold uppercase tracking-[0.12em] text-red-600">
                {g.heading}
              </p>
              <div className="space-y-0.5">
                {g.items.map((item) => {
                  const href = item.external ? item.href : withLocalePrefix(item.href, locale);
                  const subActive =
                    !item.external &&
                    (bare === item.href ||
                      (item.href !== "/articles" && bare.startsWith(`${item.href}/`)) ||
                      (item.href === "/articles" && (bare === "/articles" || bare.startsWith("/articles/"))));
                  if (item.external) {
                    return (
                      <a
                        key={item.href}
                        href={href}
                        className={`block rounded-md px-2 py-1.5 text-[13px] transition ${desktopNavMegaMenuItemClass(false)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.label}
                      </a>
                    );
                  }
                  return (
                    <Link
                      key={item.href}
                      href={href}
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
    </DesktopHoverDropdown>
  );
}
