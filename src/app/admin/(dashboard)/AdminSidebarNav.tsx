"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { AdminNavSection } from "@/lib/admin-ui-strings";

function isAdminNavActive(href: string, pathname: string): boolean {
  const p = (pathname || "").split("?")[0] || "";
  if (href === "/admin") return p === "/admin" || p === "/admin/";
  return p === href || p.startsWith(`${href}/`);
}

type Props = {
  readonly sections: readonly AdminNavSection[];
};

export function AdminSidebarNav({ sections }: Props) {
  const pathname = usePathname() || "";

  return (
    <nav className="flex flex-col">
      {sections.map((section, si) => (
        <div key={si} className={si > 0 ? "mt-5 border-t border-white/12 pt-5" : ""}>
          {section.heading ? (
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
              {section.heading}
            </p>
          ) : null}
          <div className="flex flex-col gap-0.5">
            {section.links.map((n) => {
              const active = isAdminNavActive(n.href, pathname);
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  aria-current={active ? "page" : undefined}
                  className={[
                    "border-l-[3px] px-2.5 py-2 text-[13px] leading-snug transition-colors",
                    active
                      ? "border-l-msv-blue bg-white/12 font-semibold text-white"
                      : "border-l-transparent font-medium text-slate-300 hover:border-l-slate-500 hover:bg-white/8 hover:text-white",
                  ].join(" ")}
                >
                  {n.label}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}
