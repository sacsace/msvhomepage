import type { Metadata } from "next";
import { ContentPreviews } from "@/components/home/ContentPreviews";
import { AccountingOperationsSpotlight } from "@/components/home/AccountingOperationsSpotlight";
import { CoreStrengthsValuesSection } from "@/components/home/CoreStrengthsValuesSection";
import { HomeServicesSection } from "@/components/home/HomeServicesSection";
import { InvestmentRemittanceSpotlight } from "@/components/home/InvestmentRemittanceSpotlight";
import { SimpleHero } from "@/components/home/SimpleHero";
import { sortAnnouncementsPublic } from "@/lib/announcements-store";
import { getRequestLocale } from "@/lib/get-request-locale";
import {
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
import { services, strengths, values } from "@/lib/site-content";
import type { SiteLocale } from "@/lib/site-locale";
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

  return (
    <>
      <SimpleHero locale={locale} />
      <ContentPreviews announcements={ann} calendarEvents={calendarEvents} locale={locale} />

      <HomeServicesSection locale={locale as SiteLocale} services={svcList} mid={mid} />

      <CoreStrengthsValuesSection strengths={strList} values={valList} locale={locale} />

      <AccountingOperationsSpotlight locale={locale} />
      <InvestmentRemittanceSpotlight locale={locale} />
    </>
  );
}
