import type { Metadata } from "next";
import Link from "next/link";
import { ContentPreviews } from "@/components/home/ContentPreviews";
import { AccountingOperationsSpotlight } from "@/components/home/AccountingOperationsSpotlight";
import { CoreStrengthsValuesSection } from "@/components/home/CoreStrengthsValuesSection";
import { InvestmentRemittanceSpotlight } from "@/components/home/InvestmentRemittanceSpotlight";
import { SimpleHero } from "@/components/home/SimpleHero";
import { sortAnnouncementsPublic } from "@/lib/announcements-store";
import { getRequestLocale } from "@/lib/get-request-locale";
import { homeTypo } from "@/lib/home-typography";
import {
  homeBrochureStrip,
  homeMetadata,
  homeMidServicesSection,
  servicesListEn,
  servicesListZh,
  strengthsEn,
  strengthsZh,
  valuesEn,
  valuesZh,
} from "@/lib/i18n/public-home";
import {
  getCachedAnnouncementsList,
  getCachedTaxCalendar,
} from "@/lib/public-page-data-cache";
import { staticPageSeoLocalized } from "@/lib/seo-metadata";
import { company, services, strengths, values } from "@/lib/site-content";
import type { SiteLocale } from "@/lib/site-locale";
import { withLocalePrefix } from "@/lib/site-locale";
import { sortTaxCalendarByDate } from "@/lib/tax-calendar-store";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const meta = homeMetadata(locale);
  return staticPageSeoLocalized(
    "/",
    {
      title: meta.title,
      absoluteTitle: meta.absoluteTitle,
      description: meta.description,
    },
    locale,
  );
}

/** Next 빌드는 가져온 상수가 아닌 리터럴만 인식 — `public-page-data-cache`의 TTL과 맞출 것 */
export const revalidate = 15;

/** 홈 공지·달력 2열에서 달력 카드 높이에 맞추기 위한 미리보기 개수(고정·최신 순) */
const HOME_ANNOUNCEMENT_PREVIEW_COUNT = 6;

export default async function HomePage() {
  const locale = await getRequestLocale();
  const [rawAnn, rawCal] = await Promise.all([
    getCachedAnnouncementsList(),
    getCachedTaxCalendar(),
  ]);
  const ann = sortAnnouncementsPublic(rawAnn).slice(0, HOME_ANNOUNCEMENT_PREVIEW_COUNT);
  const calendarEvents = sortTaxCalendarByDate(rawCal);

  const svcList =
    locale === "en" ? [...servicesListEn] : locale === "zh" ? [...servicesListZh] : [...services];
  const strList =
    locale === "en" ? [...strengthsEn] : locale === "zh" ? [...strengthsZh] : [...strengths];
  const valList = locale === "en" ? [...valuesEn] : locale === "zh" ? [...valuesZh] : [...values];
  const mid = homeMidServicesSection(locale);
  const pdf = homeBrochureStrip(locale);
  const L = (path: string) => withLocalePrefix(path, locale as SiteLocale);

  return (
    <>
      <SimpleHero locale={locale} />
      <ContentPreviews announcements={ann} calendarEvents={calendarEvents} locale={locale} />

      <section className="bg-[#f5f6f8] py-16 sm:py-20">
        <div
          className={`mx-auto grid max-w-6xl gap-5 sm:gap-6 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-8 ${homeTypo.pageInset}`}
        >
          <div className="rounded-2xl bg-gradient-to-br from-msv-navy via-[#132d4a] to-msv-navy p-6 text-white shadow-[0_12px_40px_-8px_rgba(15,23,42,0.2)] sm:p-7">
            <p className={homeTypo.kickerOnDarkPanel}>{mid.kicker}</p>
            <h2 className={`mt-3 ${homeTypo.sectionHeading} text-white`}>{mid.title}</h2>
            <p className={`mt-4 ${homeTypo.bodyOnDark} text-white/80`}>{mid.lead}</p>
            <Link
              href={L("/services")}
              className="mt-7 inline-flex items-center rounded-full border border-white/30 bg-white/10 px-5 py-2 text-sm font-semibold text-white backdrop-blur-sm transition duration-300 hover:bg-white hover:text-msv-navy"
            >
              {mid.cta}
            </Link>
          </div>

          <ul className="grid gap-4 md:grid-cols-2 md:gap-5">
            {svcList.map((s, i) => (
              <li
                key={s.title}
                className="group rounded-2xl bg-white p-5 shadow-[0_2px_14px_rgba(15,23,42,0.05)] transition duration-300 hover:shadow-[0_8px_28px_rgba(15,23,42,0.08)] sm:p-5"
              >
                <div className="flex items-start gap-3.5">
                  <span className="font-mono text-base font-semibold tabular-nums text-msv-blue/50" aria-hidden>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 flex-1 pl-0.5">
                    <h3 className={homeTypo.itemTitle}>{s.title}</h3>
                    <p className={`mt-2 ${homeTypo.bodySm}`}>{s.description}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CoreStrengthsValuesSection strengths={strList} values={valList} locale={locale} />

      <AccountingOperationsSpotlight locale={locale} />
      <InvestmentRemittanceSpotlight locale={locale} />

      <section className="bg-msv-navy py-12 sm:py-14">
        <div
          className={`mx-auto max-w-6xl text-center text-[15px] font-normal leading-relaxed tracking-[-0.01em] text-slate-300 sm:text-left sm:text-base sm:leading-relaxed ${homeTypo.pageInset}`}
        >
          {pdf.lineBefore}{" "}
          <Link href={company.brochurePath} className="font-semibold text-white underline-offset-2 hover:underline">
            {pdf.linePdf}
          </Link>
          {pdf.lineAfter}
        </div>
      </section>
    </>
  );
}
