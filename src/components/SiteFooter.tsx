import Link from "next/link";
import { getRequestLocale } from "@/lib/get-request-locale";
import { shellStrings } from "@/lib/i18n/shell";
import { pickLocale, withLocalePrefix } from "@/lib/site-locale";
import { company, groupCompanies } from "@/lib/site-content";

export async function SiteFooter() {
  const locale = await getRequestLocale();
  const shell = shellStrings(locale);
  const L = (path: string) => withLocalePrefix(path, locale);

  return (
    <footer className="mt-auto bg-msv-navy text-sm text-slate-300">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
        <div>
          <p className="font-semibold text-white">{company.legalName}</p>
          <p className="mt-2 leading-relaxed text-slate-400">{company.address}</p>
          <p className="mt-4 text-xs font-medium uppercase tracking-wider text-msv-blue">{company.tagline}</p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{shell.footerInquiry}</p>
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
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{shell.footerLinks}</p>
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
              <Link href={company.brochurePath} className="text-slate-300 transition hover:text-white hover:underline">
                {shell.companyProfilePdf}
              </Link>
            </li>
            <li>
              <Link href={L("/about")} className="text-slate-300 transition hover:text-white hover:underline">
                {shell.aboutIntro}
              </Link>
            </li>
            <li>
              <Link href={L("/software")} className="text-slate-300 transition hover:text-white hover:underline">
                {shell.software}
              </Link>
              <ul className="mt-2 space-y-2.5 border-l border-white/15 pl-3 leading-[1.9]">
                <li>
                  <Link
                    href={L("/software/mvs")}
                    className="text-xs text-slate-400 transition hover:text-white hover:underline"
                  >
                    {pickLocale(locale, {
                      ko: "그룹웨어 (MVS)",
                      en: "Groupware (MVS)",
                      zh: "集团办公（MVS）",
                    })}
                  </Link>
                </li>
                <li>
                  <Link
                    href={L("/software/herenow")}
                    className="text-xs text-slate-400 transition hover:text-white hover:underline"
                  >
                    {pickLocale(locale, {
                      ko: "출퇴근 기록 시스템 (HeresNow)",
                      en: "Attendance (HeresNow)",
                      zh: "考勤系统（HeresNow）",
                    })}
                  </Link>
                </li>
                <li>
                  <Link
                    href={L("/software/payroll-mailer")}
                    className="text-xs text-slate-400 transition hover:text-white hover:underline"
                  >
                    {pickLocale(locale, {
                      ko: "급여 명세서 이메일 발송 시스템",
                      en: "Payroll payslip email",
                      zh: "工资单邮件发送",
                    })}
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link href={L("/group")} className="text-slate-300 transition hover:text-white hover:underline">
                {shell.group}
              </Link>
              <ul className="mt-2 space-y-2.5 border-l border-white/15 pl-3 leading-[1.9]">
                {groupCompanies.map((g) => (
                  <li key={g.slug}>
                    <Link
                      href={L(`/group/${g.slug}`)}
                      className="text-xs text-slate-400 transition hover:text-white hover:underline"
                    >
                      {g.menuLabel}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <span className="text-slate-300">{shell.news}</span>
              <ul className="mt-2 space-y-2.5 border-l border-white/15 pl-3 leading-[1.9]">
                <li>
                  <Link href={L("/notice")} className="text-xs text-slate-400 transition hover:text-white hover:underline">
                    {pickLocale(locale, { ko: "공지사항", en: "Announcements", zh: "公告" })}
                  </Link>
                </li>
                <li>
                  <Link href={L("/ongoing")} className="text-xs text-slate-400 transition hover:text-white hover:underline">
                    {pickLocale(locale, { ko: "프로젝트 현황", en: "Project status", zh: "项目动态" })}
                  </Link>
                </li>
                <li>
                  <Link href={L("/articles")} className="text-xs text-slate-400 transition hover:text-white hover:underline">
                    {pickLocale(locale, { ko: "자료실", en: "Resources", zh: "资料库" })}
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link href={L("/contact")} className="text-slate-300 transition hover:text-white hover:underline">
                {shell.contact}
              </Link>
            </li>
            <li>
              <Link
                href="/admin/login"
                className="text-slate-500 transition hover:text-slate-300 hover:underline"
              >
                {shell.admin}
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
