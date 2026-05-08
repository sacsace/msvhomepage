"use client";

import Link from "next/link";
import { useBrowserPathname } from "@/components/layout/BrowserPathnameProvider";
import { desktopNavTopSegmentClass } from "@/components/nav/desktop-nav-top-class";
import type { SiteLocale } from "@/lib/site-locale";
import { localeFromPathname, pickLocale, stripLocalePrefix, withLocalePrefix } from "@/lib/site-locale";

const subKo = [
  { href: "/software/mvs", label: "그룹웨어 (MVS)" },
  { href: "/software/herenow", label: "출퇴근 기록 시스템 (HereNow)" },
] as const;

const subEn = [
  { href: "/software/mvs", label: "Groupware (MVS)" },
  { href: "/software/herenow", label: "Attendance (HereNow)" },
] as const;

const subZh = [
  { href: "/software/mvs", label: "集团办公（MVS）" },
  { href: "/software/herenow", label: "考勤系统（HereNow）" },
] as const;

function linkClass(active: boolean) {
  return `rounded-md px-2.5 py-1.5 text-[13px] transition ${desktopNavTopSegmentClass(active)}`;
}

export function SoftwareNavDesktop() {
  const pathname = useBrowserPathname();
  const locale = localeFromPathname(pathname) as SiteLocale;
  const sub = locale === "en" ? subEn : locale === "zh" ? subZh : subKo;
  const bare = stripLocalePrefix(pathname.split("#")[0] || pathname);
  const active = bare === "/software" || bare.startsWith("/software/");
  const topLabel = pickLocale(locale, { ko: "소프트웨어", en: "Software", zh: "软件" });
  const ariaSub = pickLocale(locale, {
    ko: "소프트웨어 하위 메뉴",
    en: "Software submenu",
    zh: "软件子菜单",
  });

  return (
    <div className="group relative flex items-center">
      <Link
        href={withLocalePrefix("/software", locale)}
        className={`${linkClass(active)} block select-none`}
        aria-current={bare === "/software" ? "page" : undefined}
      >
        {topLabel}
      </Link>
      <div
        className="pointer-events-none invisible absolute left-0 top-full z-50 w-[min(20rem,calc(100vw-2rem))] pt-1.5 opacity-0 transition duration-150 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100"
        role="navigation"
        aria-label={ariaSub}
      >
        <div className="rounded-lg border border-slate-100 bg-white py-1 shadow-lg shadow-slate-900/5">
          {sub.map((item) => {
            const subActive = bare === item.href || bare.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={withLocalePrefix(item.href, locale)}
                className={`block px-3 py-2 text-[13px] transition hover:bg-slate-50 ${
                  subActive ? "bg-msv-blue-soft/70 font-semibold text-msv-navy" : "font-medium text-slate-600 hover:text-msv-navy"
                }`}
                aria-current={subActive ? "page" : undefined}
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
