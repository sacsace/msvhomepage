import Link from "next/link";
import { getRequestLocale } from "@/lib/get-request-locale";
import { shellStrings } from "@/lib/i18n/shell";
import { pickLocale, withLocalePrefix } from "@/lib/site-locale";
import { company, groupCompanies } from "@/lib/site-content";

const linkMain =
  "font-sans text-sm font-medium tracking-[-0.01em] text-msv-ink transition hover:underline hover:decoration-msv-mint hover:underline-offset-4";
const linkSub =
  "font-sans text-xs font-normal text-slate-500 transition hover:text-msv-ink hover:underline hover:decoration-msv-mint hover:underline-offset-4";
const colLabel =
  "font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500";

export async function SiteFooter() {
  const locale = await getRequestLocale();
  const shell = shellStrings(locale);
  const L = (path: string) => withLocalePrefix(path, locale);
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-msv-ink/10 bg-[#f3f3f3] text-sm text-slate-600">
      <div className="relative mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="pointer-events-none absolute bottom-10 left-5 hidden lg:block" aria-hidden>
          <span className="msv-vertical-label">Colophon</span>
        </div>

        <div className="flex flex-col gap-6 border-b border-msv-ink/10 pb-10 lg:flex-row lg:items-end lg:justify-between lg:pl-12">
          <div className="max-w-xl">
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
              {company.tagline}
            </p>
            <p className="mt-3 font-sans text-[clamp(1.35rem,2.8vw,1.85rem)] font-semibold leading-[1.15] tracking-[-0.03em] text-msv-ink">
              {company.legalName}
            </p>
            <p className="mt-4 max-w-md text-sm font-normal leading-[1.75] text-slate-500">
              {company.address}
            </p>
          </div>
          <p
            className="hidden font-sans text-7xl font-bold tabular-nums leading-none tracking-[-0.08em] text-msv-ink/[0.06] lg:block"
            aria-hidden
          >
            MSV
          </p>
        </div>

        <div className="mt-10 grid gap-0 border-t border-msv-ink/10 sm:grid-cols-2 lg:grid-cols-4 lg:pl-12">
          <div className="border-b border-msv-ink/10 py-8 sm:border-r sm:pr-6 lg:border-b-0">
            <p className={colLabel}>01 — {shell.footerInquiry}</p>
            <ul className="mt-5 space-y-3">
              <li>
                <a href={`mailto:${company.infoEmail}`} className={linkMain}>
                  {company.infoEmail}
                </a>
              </li>
              <li>
                <Link href={L("/contact")} className={linkMain}>
                  {shell.contact}
                </Link>
              </li>
              <li>
                <Link href={company.brochurePath} className={linkSub}>
                  {shell.companyProfilePdf}
                </Link>
              </li>
              {company.websites.map((w) => (
                <li key={w.href}>
                  <a
                    href={w.href}
                    className={linkSub}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {w.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-b border-msv-ink/10 py-8 sm:border-b sm:pl-6 lg:border-b-0 lg:border-r lg:pr-6">
            <p className={colLabel}>02 — {shell.aboutIntro}</p>
            <ul className="mt-5 space-y-3">
              <li>
                <Link href={L("/about")} className={linkMain}>
                  {shell.aboutIntro}
                </Link>
              </li>
              <li>
                <Link href={L("/about/team")} className={linkSub}>
                  {pickLocale(locale, { ko: "팀 소개", en: "Team", zh: "团队" })}
                </Link>
              </li>
              <li>
                <Link href={L("/services")} className={linkSub}>
                  {shell.services}
                </Link>
              </li>
            </ul>
          </div>

          <div className="border-b border-msv-ink/10 py-8 sm:border-r sm:pr-6 lg:border-b-0 lg:pl-6 lg:pr-6">
            <p className={colLabel}>03 — {shell.software}</p>
            <ul className="mt-5 space-y-3">
              <li>
                <Link href={L("/software")} className={linkMain}>
                  {shell.software}
                </Link>
              </li>
              <li>
                <Link href={L("/software/mvs")} className={linkSub}>
                  {pickLocale(locale, {
                    ko: "업무 통합 시스템 (MVS)",
                    en: "Integrated Business System (MVS)",
                    zh: "业务集成系统（MVS）",
                  })}
                </Link>
              </li>
              <li>
                <Link href={L("/software/herenow")} className={linkSub}>
                  {pickLocale(locale, {
                    ko: "출퇴근 기록 시스템 (HeresNow)",
                    en: "Attendance (HeresNow)",
                    zh: "考勤系统（HeresNow）",
                  })}
                </Link>
              </li>
              <li>
                <Link href={L("/software/payroll-mailer")} className={linkSub}>
                  {pickLocale(locale, {
                    ko: "급여 명세서 이메일 발송",
                    en: "Payroll payslip email",
                    zh: "工资单邮件发送",
                  })}
                </Link>
              </li>
              <li>
                <Link href={L("/software/wisc")} className={linkSub}>
                  WISC
                </Link>
              </li>
            </ul>
          </div>

          <div className="py-8 sm:pl-6 lg:pl-6">
            <p className={colLabel}>04 — {shell.group} · {shell.news}</p>
            <ul className="mt-5 space-y-3">
              <li>
                <Link href={L("/group")} className={linkMain}>
                  {shell.group}
                </Link>
              </li>
              {groupCompanies.map((g) => (
                <li key={g.slug}>
                  <Link href={L(`/group/${g.slug}`)} className={linkSub}>
                    {g.menuLabel}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link href={L("/notice")} className={linkSub}>
                  {pickLocale(locale, { ko: "공지사항", en: "Announcements", zh: "公告" })}
                </Link>
              </li>
              <li>
                <Link href={L("/ongoing")} className={linkSub}>
                  {pickLocale(locale, { ko: "프로젝트 현황", en: "Project status", zh: "项目动态" })}
                </Link>
              </li>
              <li>
                <Link href={L("/articles")} className={linkSub}>
                  {pickLocale(locale, { ko: "자료실", en: "Resources", zh: "资料库" })}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-msv-ink/10 pt-6 sm:flex-row sm:items-center sm:justify-between lg:pl-12">
          <p className="font-sans text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">
            © {year} {company.legalName}
            {shell.copyright ? ` · ${shell.copyright}` : ""}
          </p>
          <Link
            href="/admin/login"
            className="font-sans text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400 transition hover:text-msv-ink"
          >
            {shell.admin}
          </Link>
        </div>
      </div>
    </footer>
  );
}
