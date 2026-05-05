"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useBrowserPathname } from "@/components/layout/BrowserPathnameProvider";
import { isNavActive, localeFromPathname, stripLocalePrefix, withLocalePrefix } from "@/lib/site-locale";

type Props = {
  href: string;
  children: ReactNode;
  className?: string;
  /** `exact`: 경로만 일치할 때 활성(예: `/about` vs `/about/team`) */
  match?: "prefix" | "exact";
};

export function isNavItemActive(pathname: string, href: string): boolean {
  return isNavActive(pathname, href);
}

/** 데스크톱 상단 메뉴 — 텍스트 중심, 활성은 색·굵기만 강조 */
export function NavLink({ href, children, className = "" }: Props) {
  const pathname = useBrowserPathname();
  const locale = localeFromPathname(pathname);
  const resolvedHref = withLocalePrefix(href, locale);
  const active = isNavItemActive(pathname, href);
  return (
    <Link
      href={resolvedHref}
      className={`inline-flex items-center rounded-md px-2.5 py-1.5 text-[13px] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-msv-blue ${
        active
          ? "font-semibold text-msv-navy"
          : "font-medium text-slate-500 hover:text-msv-navy"
      } ${className}`}
      aria-current={active ? "page" : undefined}
    >
      {children}
    </Link>
  );
}

/** 모바일 메뉴(드로어) 항목 */
export function MobileNavLink({ href, children, className = "", match = "prefix" }: Props) {
  const pathname = useBrowserPathname();
  const locale = localeFromPathname(pathname);
  const resolvedHref = withLocalePrefix(href, locale);
  const pathHref = href.split("#")[0] || href;
  const barePath = stripLocalePrefix(pathname.split("#")[0] || pathname);
  const active =
    match === "exact" ? barePath === pathHref : isNavItemActive(pathname, pathHref);
  return (
    <Link
      href={resolvedHref}
      className={`mx-1 block rounded-md px-3 py-2 text-sm transition ${
        active
          ? "bg-slate-50 font-semibold text-msv-navy"
          : "font-medium text-slate-600 hover:bg-slate-50 hover:text-msv-navy"
      } ${className}`}
      aria-current={active ? "page" : undefined}
    >
      {children}
    </Link>
  );
}
