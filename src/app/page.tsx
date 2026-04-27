import type { Metadata } from "next";
import Link from "next/link";
import { staticPageSeo } from "@/lib/seo-metadata";
import { ClientsSection } from "@/components/home/ClientsSection";
import { ContentPreviews } from "@/components/home/ContentPreviews";
import { AccountingOperationsSpotlight } from "@/components/home/AccountingOperationsSpotlight";
import { CoreStrengthsValuesSection } from "@/components/home/CoreStrengthsValuesSection";
import { InvestmentRemittanceSpotlight } from "@/components/home/InvestmentRemittanceSpotlight";
import { SimpleHero } from "@/components/home/SimpleHero";
import {
  readAnnouncements,
  sortAnnouncementsPublic,
} from "@/lib/announcements-store";
import { readTaxCalendar, sortTaxCalendarByDate } from "@/lib/tax-calendar-store";
import { company, services, strengths, values } from "@/lib/site-content";

export const metadata: Metadata = staticPageSeo("/", {
  title: "홈",
  absoluteTitle: `${company.shortName} | 인도 회계·세무·현장 실행`,
  description: company.taglineKo,
});

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const ann = sortAnnouncementsPublic(await readAnnouncements()).slice(0, 3);
  const calendarEvents = sortTaxCalendarByDate(await readTaxCalendar());

  return (
    <>
      <SimpleHero />
      <ContentPreviews announcements={ann} calendarEvents={calendarEvents} />

      <section className="border-t border-slate-200/80 bg-white py-14 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-8">
          <div className="rounded-xl border border-msv-blue/25 bg-gradient-to-br from-msv-navy via-[#132d4a] to-msv-navy p-6 text-white shadow-[0_12px_40px_-12px_rgba(45,91,255,0.25)]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-msv-blue-soft/90">
              Services
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-[1.9rem]">회계를 중심으로 한 실행형 서비스</h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-200">
              회계·세무·감사를 기반으로, 설립·HR·수출입 등 확장 업무를 동일 팀 또는 협업 조직과 연계하여 제공합니다.
            </p>
            <Link
              href="/services"
              className="mt-6 inline-flex items-center rounded-md border border-white/35 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white hover:text-msv-navy"
            >
              회계·세무 라인업 보기
            </Link>
          </div>

          <ul className="grid gap-4 md:grid-cols-2">
            {services.map((s, i) => (
              <li
                key={s.title}
                className="group rounded-lg border border-slate-200 bg-slate-50/60 p-4 transition hover:border-msv-blue/30 hover:bg-white"
              >
                <div className="flex items-start gap-3">
                  <span className="font-mono text-lg font-bold text-msv-blue/45" aria-hidden>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 flex-1 border-l border-slate-200 pl-3">
                    <h3 className="text-sm font-bold leading-snug text-msv-navy">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.description}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CoreStrengthsValuesSection strengths={strengths} values={values} />

      <AccountingOperationsSpotlight />
      <InvestmentRemittanceSpotlight />

      <ClientsSection />

      <section className="border-t border-slate-200/80 bg-msv-navy py-10">
        <div className="mx-auto max-w-6xl px-4 text-center text-sm text-slate-300 sm:px-6 sm:text-left">
          상세 소개는{" "}
          <Link href={company.brochurePath} className="font-semibold text-white underline-offset-2 hover:underline">
            회사 프로필 PDF
          </Link>
          를 참고해 주세요.
        </div>
      </section>
    </>
  );
}
