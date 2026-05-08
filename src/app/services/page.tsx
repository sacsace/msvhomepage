import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { StandardPageBody } from "@/components/layout/StandardPageBody";
import { AccountingServicesInfographic } from "@/components/services/AccountingServicesInfographic";
import { IndiaComplianceScheduleSection } from "@/components/services/IndiaComplianceScheduleSection";
import { ServiceCasesInfographic } from "@/components/services/ServiceCasesInfographic";
import { ServicesInfographic } from "@/components/services/ServicesInfographic";
import { getRequestLocale } from "@/lib/get-request-locale";
import { accountingServicesPageCopy } from "@/lib/i18n/accounting-services-page-locale";
import { staticPageSeoLocalized } from "@/lib/seo-metadata";
import { withLocalePrefix } from "@/lib/site-locale";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const copy = accountingServicesPageCopy(locale);
  return staticPageSeoLocalized("/services", { title: copy.metaTitle, description: copy.metaDescription }, locale);
}

export default async function ServicesPage() {
  const locale = await getRequestLocale();
  const L = (path: string) => withLocalePrefix(path, locale);
  const copy = accountingServicesPageCopy(locale);

  return (
    <div>
      <PageHeader title={copy.pageTitle} description={copy.pageDescription} descriptionWide />
      <StandardPageBody padding="spacious">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7">
          <h2 className="text-xl font-bold text-msv-navy">{copy.menuTitle}</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">{copy.menuIntro}</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {copy.menuLinks.map((item) => (
              <Link
                key={item.path}
                href={L(item.path)}
                className={
                  item.current
                    ? "rounded-xl border border-msv-blue/35 bg-msv-blue-soft/35 px-4 py-3 text-sm font-semibold text-msv-navy transition hover:border-msv-blue hover:bg-msv-blue-soft/55"
                    : "rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-msv-navy transition hover:border-msv-blue/35 hover:text-msv-blue"
                }
              >
                {item.label}
              </Link>
            ))}
          </div>
        </section>
        <ServicesInfographic
          items={copy.coreServices}
          sectionEyebrow={copy.coreEyebrow}
          sectionTitle={copy.coreTitle}
          sectionIntro={copy.coreIntro}
        />

        <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 sm:p-7">
          <h2 className="text-xl font-bold text-msv-navy">{copy.detailTitle}</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">{copy.detailIntro}</p>

          <article className="mt-5 rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
            <div className="flex flex-wrap items-end justify-between gap-2">
              <h3 className="text-sm font-semibold text-msv-navy">{copy.processTitle}</h3>
              <p className="text-xs text-slate-500">{copy.processByline}</p>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {copy.processSteps.map((step, index) => (
                <article key={step} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-msv-blue-soft px-2 text-[11px] font-bold text-msv-blue">
                    {index + 1}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">{step}</p>
                </article>
              ))}
            </div>
          </article>

          <div className="mt-4 grid gap-3 lg:grid-cols-3">
            {copy.highlights.map((item) => (
              <article key={item.title} className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
                <h3 className="text-sm font-semibold text-msv-navy">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <IndiaComplianceScheduleSection pageCopy={copy} />

        <AccountingServicesInfographic
          blocks={copy.accountingBlocks}
          sectionEyebrow={copy.lineupEyebrow}
          sectionTitle={copy.lineupTitle}
          sectionIntro={copy.lineupIntro}
        />
        <ServiceCasesInfographic
          items={copy.sampleCases}
          sectionEyebrow={copy.casesEyebrow}
          sectionTitle={copy.casesTitle}
          sectionIntro={copy.casesIntro}
        />
      </StandardPageBody>
    </div>
  );
}
