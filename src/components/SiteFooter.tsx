import Link from "next/link";
import { company, groupCompanies } from "@/lib/site-content";

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-msv-navy text-sm text-slate-300">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <p className="font-semibold text-white">{company.legalName}</p>
          <p className="mt-2 leading-relaxed text-slate-400">{company.address}</p>
          <p className="mt-4 text-xs font-medium uppercase tracking-wider text-msv-blue">
            {company.tagline}
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">문의</p>
          <ul className="mt-3 space-y-2">
            <li>
              <a
                href={`mailto:${company.infoEmail}`}
                className="text-slate-200 transition hover:text-white hover:underline"
              >
                {company.infoEmail}
              </a>
            </li>
          </ul>
        </div>

        <div className="sm:col-span-2 lg:col-span-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">링크</p>
          <ul className="mt-3 flex flex-col gap-2">
            {company.websites.map((w) => (
              <li key={w.href}>
                <a
                  href={w.href}
                  className="text-slate-300 transition hover:text-white hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {w.label}
                </a>
              </li>
            ))}
            <li>
              <Link
                href={company.brochurePath}
                className="text-slate-300 transition hover:text-white hover:underline"
              >
                회사 프로필 PDF
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-slate-300 transition hover:text-white hover:underline">
                회사 소개
              </Link>
            </li>
            <li>
              <Link href="/mvs-intro" className="text-slate-300 transition hover:text-white hover:underline">
                MV System 소개
              </Link>
            </li>
            <li>
              <Link href="/group" className="text-slate-300 transition hover:text-white hover:underline">
                함께하는 회사
              </Link>
              <ul className="mt-2 space-y-1.5 border-l border-white/15 pl-3">
                {groupCompanies.map((g) => (
                  <li key={g.slug}>
                    <Link
                      href={`/group/${g.slug}`}
                      className="text-xs text-slate-400 transition hover:text-white hover:underline"
                    >
                      {g.menuLabel}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <Link href="/notice" className="text-slate-300 transition hover:text-white hover:underline">
                공지사항
              </Link>
            </li>
            <li>
              <Link href="/articles" className="text-slate-300 transition hover:text-white hover:underline">
                관련 글
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-slate-300 transition hover:text-white hover:underline">
                문의
              </Link>
            </li>
            <li>
              <Link
                href="/admin/login"
                className="text-slate-500 transition hover:text-slate-300 hover:underline"
              >
                관리자
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} {company.legalName}
      </div>
    </footer>
  );
}
