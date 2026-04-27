"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = { href: string; children: ReactNode; className?: string };

export function NavLink({ href, children, className = "" }: Props) {
  const pathname = usePathname();
  const active =
    pathname === href || (href !== "/" && pathname.startsWith(href + "/"));
  return (
    <Link
      href={href}
      className={`border-b-2 pb-0.5 text-sm font-medium transition ${
        active
          ? "border-msv-blue text-msv-blue"
          : "border-transparent text-slate-600 hover:text-msv-navy"
      } ${className}`}
      aria-current={active ? "page" : undefined}
    >
      {children}
    </Link>
  );
}
