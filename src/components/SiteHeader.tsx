import Link from "next/link";
import { MsvMark } from "@/components/brand/MsvMark";
import { NavLink } from "@/components/layout/NavLink";
import { GroupNavDesktop } from "@/components/nav/GroupNavDesktop";
import { company, groupCompanies } from "@/lib/site-content";

const links = [
  { href: "/", label: "Home" },
  { href: "/msv-intro", label: "MSV 소개" },
  { href: "/about", label: "회사 소개" },
  { href: "/group", label: "함께하는 회사" },
  { href: "/services", label: "서비스" },
  { href: "/ongoing", label: "진행중인 업무" },
  { href: "/notice", label: "공지" },
  { href: "/articles", label: "관련 글" },
  { href: "/contact", label: "문의" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/90 bg-white/95 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="flex min-w-0 shrink-0 items-center gap-2.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-msv-blue sm:gap-3"
        >
          <MsvMark className="h-9 w-9 shrink-0 sm:h-10 sm:w-10" />
          <span className="truncate text-sm font-bold leading-tight tracking-tight text-msv-navy sm:text-base">
            {company.shortName}
          </span>
        </Link>

        <nav
          className="hidden flex-wrap items-center justify-end gap-x-4 gap-y-1 lg:flex"
          aria-label="주요 메뉴"
        >
          {links.map((item) =>
            item.href === "/group" ? (
              <GroupNavDesktop key="group" />
            ) : (
              <NavLink key={item.href} href={item.href}>
                {item.label}
              </NavLink>
            ),
          )}
        </nav>

        <details className="relative lg:hidden">
          <summary className="cursor-pointer list-none rounded border border-slate-200 px-2.5 py-1.5 text-sm font-medium text-msv-navy marker:hidden [&::-webkit-details-marker]:hidden">
            메뉴
          </summary>
          <div className="absolute right-0 z-50 mt-1 max-h-[min(70vh,28rem)] w-56 overflow-y-auto rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
            {links.map((item) =>
              item.href === "/group" ? (
                <div key="group" className="border-b border-slate-100 py-1 last:border-0">
                  <div className="block px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    함께하는 회사
                  </div>
                  {groupCompanies.map((g) => (
                    <Link
                      key={g.slug}
                      href={`/group/${g.slug}`}
                      className="block px-3 py-2 pl-5 text-sm text-slate-600 hover:bg-msv-blue-soft/40 hover:text-msv-navy"
                    >
                      {g.menuLabel}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-2.5 text-sm text-slate-700 hover:bg-msv-blue-soft/60 hover:text-msv-navy"
                >
                  {item.label}
                </Link>
              ),
            )}
          </div>
        </details>
      </div>
    </header>
  );
}
