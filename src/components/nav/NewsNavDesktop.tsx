"use client";

import Link from "next/link";
import { useBrowserPathname } from "@/components/layout/BrowserPathnameProvider";
import type { SiteLocale } from "@/lib/site-locale";
import { localeFromPathname, pickLocale, stripLocalePrefix, withLocalePrefix } from "@/lib/site-locale";

const subKo = [
  { href: "/notice", label: "공지사항" },
  { href: "/ongoing", label: "프로젝트 현황" },
  { href: "/articles", label: "자료실" },
] as const;

const subEn = [
  { href: "/notice", label: "Announcements" },
  { href: "/ongoing", label: "Project status" },
  { href: "/articles", label: "Resources" },
] as const;

const subZh = [
  { href: "/notice", label: "公告" },
  { href: "/ongoing", label: "项目动态" },
  { href: "/articles", label: "资料库" },
] as const;

function linkClass(active: boolean) {
  return `rounded-md px-2.5 py-1.5 text-[13px] transition ${
    active
      ? "cursor-default font-semibold text-msv-navy"
      : "cursor-default font-medium text-slate-500 hover:text-msv-navy"
  }`;
}

function isNewsSection(bare: string): boolean {
  if (bare === "/notice" || bare.startsWith("/notice/")) return true;
  if (bare === "/ongoing" || bare.startsWith("/ongoing/")) return true;
  if (bare === "/articles" || bare.startsWith("/articles/")) return true;
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
    <div className="group relative flex items-center">
      <Link href={withLocalePrefix("/notice", locale)} className={`${linkClass(active)} block select-none`}>
        {topLabel}
      </Link>
      <div
        className="pointer-events-none invisible absolute left-0 top-full z-50 w-[min(20rem,calc(100vw-2rem))] pt-1.5 opacity-0 transition duration-150 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100"
        role="navigation"
        aria-label={ariaSub}
      >
        <div className="rounded-lg border border-slate-100 bg-white py-1 shadow-lg shadow-slate-900/5">
          {sub.map((item) => {
            const subActive =
              bare === item.href ||
              (item.href === "/notice" && bare.startsWith("/notice/")) ||
              (item.href === "/ongoing" && bare.startsWith("/ongoing/")) ||
              (item.href === "/articles" && bare.startsWith("/articles/"));
            return (
              <Link
                key={item.href}
                href={withLocalePrefix(item.href, locale)}
                className={`block px-3 py-2 text-[13px] transition hover:bg-slate-50 ${
                  subActive ? "bg-slate-50 font-semibold text-msv-navy" : "font-medium text-slate-600"
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
