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
        <div key={si} className={si > 0 ? "mt-5 border-t border-zinc-300 pt-5" : ""}>
          {section.heading ? (
            <p className="mb-2.5 text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-600">
              {section.heading}
            </p>
          ) : null}
          <div className="flex flex-col gap-1">
            {section.links.map((n) => {
              const active = isAdminNavActive(n.href, pathname);
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  aria-current={active ? "page" : undefined}
                  className={[
                    "rounded-lg border-l-[3px] px-2.5 py-2 text-[13px] leading-snug transition-colors duration-150",
                    active
                      ? "border-l-msv-blue bg-white font-semibold text-zinc-950 shadow-sm ring-1 ring-zinc-300/90"
                      : "border-l-transparent font-medium text-zinc-800 hover:border-l-zinc-300 hover:bg-zinc-200/70 hover:text-zinc-950",
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
