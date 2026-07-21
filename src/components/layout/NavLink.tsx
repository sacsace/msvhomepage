"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useBrowserPathname } from "@/components/layout/BrowserPathnameProvider";
import { desktopNavTopSegmentClass } from "@/components/nav/desktop-nav-top-class";
import { isNavActive, localeFromPathname, withLocalePrefix } from "@/lib/site-locale";

type Props = {
  href: string;
  children: ReactNode;
  className?: string;
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
      className={`inline-flex items-center px-3 py-1.5 text-[13px] tracking-tight transition duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-msv-blue ${desktopNavTopSegmentClass(active)} ${className}`}
      aria-current={active ? "page" : undefined}
    >
      {children}
    </Link>
  );
}
