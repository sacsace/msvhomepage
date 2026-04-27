"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { groupCompanies } from "@/lib/site-content";

function linkClass(active: boolean) {
  return `border-b-2 pb-0.5 text-sm font-medium transition ${
    active
      ? "border-msv-blue text-msv-blue"
      : "border-transparent text-slate-600 hover:text-msv-navy"
  }`;
}

export function GroupNavDesktop() {
  const pathname = usePathname();
  const active = pathname === "/group" || pathname.startsWith("/group/");

  return (
    <div className="group relative flex items-center">
      <span
        className={`${linkClass(active)} block cursor-default select-none`}
        aria-label="함께하는 회사 — 하위 메뉴에서 회사를 선택하세요"
      >
        함께하는 회사
      </span>
      <div
        className="pointer-events-none invisible absolute left-0 top-full z-50 w-[min(18rem,calc(100vw-2rem))] pt-2 opacity-0 shadow-none transition duration-150 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100"
        role="navigation"
        aria-label="함께하는 회사 하위 메뉴"
      >
        <div className="rounded-lg border border-slate-200 bg-white py-2 shadow-lg">
          {groupCompanies.map((g) => {
            const subActive = pathname === `/group/${g.slug}`;
            return (
              <Link
                key={g.slug}
                href={`/group/${g.slug}`}
                className={`block px-4 py-2 text-sm hover:bg-slate-50 ${
                  subActive ? "bg-msv-blue-soft/50 font-medium text-msv-navy" : "text-slate-700"
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
