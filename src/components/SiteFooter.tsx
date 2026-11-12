import Link from "next/link";
import { getRequestLocale } from "@/lib/get-request-locale";
import { shellStrings } from "@/lib/i18n/shell";
import { pickLocale, withLocalePrefix } from "@/lib/site-locale";
import { company } from "@/lib/site-content";

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
        <div className="flex flex-col gap-6 border-b border-msv-ink/10 pb-10 lg:flex-row lg:items-end lg:justify-between">
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
          <Link
            href={L("/contact")}
            className="inline-flex w-fit items-center rounded-full bg-msv-ink px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-msv-navy"
          >
            {shell.contact}
          </Link>
        </div>

        <div className="mt-10 grid gap-0 border-t border-msv-ink/10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="border-b border-msv-ink/10 py-8 sm:border-r sm:pr-6 lg:border-b-0">
            <p className={colLabel}>{shell.aboutIntro}</p>
            <ul className="mt-5 space-y-3">
              <li>
                <Link href={L("/about")} className={linkMain}>
                  {pickLocale(locale, { ko: "MSV 소개", en: "About MSV", zh: "MSV 介绍" })}
                </Link>
              </li>
              <li>
                <Link href={L("/about/team")} className={linkSub}>
                  {pickLocale(locale, { ko: "구성원", en: "Team", zh: "团队" })}
                </Link>
              </li>
              <li>
                <Link href={L("/about/clients")} className={linkSub}>
                  {pickLocale(locale, { ko: "고객사", en: "Clients", zh: "客户" })}
                </Link>
              </li>
              <li>
                <Link href={L("/group")} className={linkSub}>
                  {shell.group}
                </Link>
              </li>
            </ul>
          </div>

          <div className="border-b border-msv-ink/10 py-8 sm:border-b sm:pl-6 lg:border-b-0 lg:border-r lg:pr-6">
            <p className={colLabel}>{shell.services}</p>
            <ul className="mt-5 space-y-3">
              <li>
                <Link href={L("/services")} className={linkMain}>
                  {pickLocale(locale, { ko: "서비스 개요", en: "Services overview", zh: "服务总览" })}
                </Link>
              </li>
              <li>
                <Link href={L("/services/corporate-incorporation")} className={linkSub}>
                  {pickLocale(locale, { ko: "법인 설립", en: "Incorporation", zh: "公司设立" })}
                </Link>
              </li>
              <li>
                <Link href={L("/services/hr-payroll")} className={linkSub}>
                  {pickLocale(locale, { ko: "인사·급여", en: "HR & payroll", zh: "人事与薪酬" })}
                </Link>
              </li>
              <li>
                <Link href={L("/software")} className={linkSub}>
                  {shell.software}
                </Link>
              </li>
            </ul>
          </div>

          <div className="border-b border-msv-ink/10 py-8 sm:border-r sm:pr-6 lg:border-b-0 lg:pl-6 lg:pr-6">
            <p className={colLabel}>{shell.resources}</p>
            <ul className="mt-5 space-y-3">
              <li>
                <Link href={L("/articles")} className={linkMain}>
                  {pickLocale(locale, { ko: "안내 자료", en: "Guides & articles", zh: "说明资料" })}
                </Link>
              </li>
              <li>
                <Link href={L("/services/compliance-calendar")} className={linkSub}>
                  {pickLocale(locale, { ko: "신고 일정", en: "Compliance calendar", zh: "申报日程" })}
                </Link>
              </li>
              <li>
                <Link href={L("/services/personal-income-tax-calculator")} className={linkSub}>
                  {pickLocale(locale, { ko: "세금·급여 계산기", en: "Tax calculators", zh: "税务计算器" })}
                </Link>
              </li>
              <li>
                <Link href={company.brochurePath} className={linkSub}>
                  {shell.companyProfilePdf}
                </Link>
              </li>
            </ul>
          </div>

          <div className="py-8 sm:pl-6 lg:pl-6">
            <p className={colLabel}>{shell.footerInquiry}</p>
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
                <Link href={L("/privacy")} className={linkSub}>
                  {shell.privacy}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-msv-ink/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-sans text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">
            © {year} {company.legalName}
            {shell.copyright ? ` · ${shell.copyright}` : ""}
          </p>
          <Link
            href={L("/privacy")}
            className="font-sans text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400 transition hover:text-msv-ink"
          >
            {shell.privacy}
          </Link>
        </div>
      </div>
    </footer>
  );
}
