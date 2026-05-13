import type { Metadata } from "next";
import { ComplianceCalendarInteractiveSection } from "@/components/services/ComplianceCalendarInteractiveSection";
import { PageHeader } from "@/components/layout/PageHeader";
import { StandardPageBody } from "@/components/layout/StandardPageBody";
import { ServiceGuidePageBody } from "@/components/services/ServiceGuidePageBody";
import { getRequestLocale } from "@/lib/get-request-locale";
import { serviceGuideCopy } from "@/lib/i18n/service-guides-locale";
import { getCachedTaxCalendar } from "@/lib/public-page-data-cache";
import { staticPageSeoLocalized } from "@/lib/seo-metadata";
import { sortTaxCalendarByDate } from "@/lib/tax-calendar-store";
import { withLocalePrefix } from "@/lib/site-locale";

const PATH = "/services/compliance-calendar";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const copy = serviceGuideCopy("compliance-calendar", locale);
  return staticPageSeoLocalized(PATH, { title: copy.metaTitle, description: copy.metaDescription }, locale);
}

export default async function ComplianceCalendarServicePage() {
  const locale = await getRequestLocale();
  const copy = serviceGuideCopy("compliance-calendar", locale);
  const L = (path: string) => withLocalePrefix(path, locale);
  const rawCal = await getCachedTaxCalendar();
  const calendarEvents = sortTaxCalendarByDate(rawCal);

  const kicker = copy.calendarWidgetKicker ?? "";
  const widgetTitle = copy.calendarWidgetTitle ?? "";
  const widgetLead = copy.calendarWidgetLead ?? "";
  const showWidget = Boolean(kicker && widgetTitle);

  return (
    <>
      <PageHeader
        title={copy.pageTitle}
        eyebrow={copy.pageEyebrow}
        description={copy.pageDescription}
        descriptionWide
      />
      <StandardPageBody>
        <div className="min-w-0 space-y-8">
          {showWidget ? (
            <ComplianceCalendarInteractiveSection
              kicker={kicker}
              title={widgetTitle}
              lead={widgetLead}
              events={calendarEvents}
              locale={locale}
            />
          ) : null}
          <ServiceGuidePageBody copy={copy} L={L} />
        </div>
      </StandardPageBody>
    </>
  );
}
