import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { StandardPageBody } from "@/components/layout/StandardPageBody";
import { LicenseCardsWithModal } from "@/components/services/LicenseCardsWithModal";
import { getRequestLocale } from "@/lib/get-request-locale";
import {
  licenseCardDomId,
  licenseRegistrationServiceCopy,
} from "@/lib/i18n/license-registration-service-locale";
import { staticPageSeoLocalized } from "@/lib/seo-metadata";
import { withLocalePrefix } from "@/lib/site-locale";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const copy = licenseRegistrationServiceCopy(locale);
  return staticPageSeoLocalized(
    "/services/license-registration",
    { title: copy.metaTitle, description: copy.metaDescription },
    locale,
  );
}

export default async function LicenseRegistrationServicePage() {
  const locale = await getRequestLocale();
  const L = (path: string) => withLocalePrefix(path, locale);
  const copy = licenseRegistrationServiceCopy(locale);

  return (
    <>
      <PageHeader title={copy.pageTitle} description={copy.pageDescription} descriptionWide />
      <StandardPageBody>
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-lg font-bold text-msv-navy">{copy.scopeTitle}</h2>
          <ul className="mt-4 space-y-2 text-sm leading-relaxed text-slate-600">
            {copy.scopeItems.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={L("/services")}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-msv-navy transition hover:border-msv-blue/35 hover:text-msv-blue"
            >
              {copy.backToServices}
            </Link>
            <Link
              href={L("/contact")}
              className="rounded-lg bg-msv-navy px-4 py-2 text-sm font-semibold text-white transition hover:bg-msv-navy/90"
            >
              {copy.contactCta}
            </Link>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="msv-eyebrow">{copy.taxonomyEyebrow}</p>
          <h2 className="mt-2 text-xl font-bold tracking-tight text-msv-navy sm:text-2xl">{copy.taxonomyTitle}</h2>
          <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-slate-600">{copy.taxonomyIntro}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {copy.taxonomyGroups.map((group) => (
              <div
                key={group.heading}
                className="flex min-h-[240px] flex-col rounded-xl border border-slate-200/90 bg-slate-50/50 px-4 py-4 sm:px-5 sm:py-5"
              >
                <h3 className="rounded-lg border border-msv-blue/20 bg-msv-blue-soft/40 px-3 py-2 text-sm font-bold tracking-tight text-msv-navy">
                  {group.heading}
                </h3>
                <ul className="mt-3 flex-1 space-y-1.5 text-sm text-slate-700">
                  {group.items.map((name) => (
                    <li key={name}>
                      <a
                        href={`#${licenseCardDomId(name)}`}
                        className="font-medium text-slate-900 no-underline underline-offset-2 transition-colors hover:text-msv-blue hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-msv-blue"
                      >
                        {name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="msv-eyebrow">{copy.industryExamplesEyebrow}</p>
          <h2 className="mt-2 text-xl font-bold tracking-tight text-msv-navy sm:text-2xl">{copy.industryExamplesTitle}</h2>
          <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-slate-600">{copy.industryExamplesIntro}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {copy.industryExamples.map((block) => (
              <div
                key={block.industry}
                className="flex min-h-[240px] flex-col rounded-xl border border-msv-blue/20 bg-msv-blue-soft/15 px-4 py-5 sm:px-5"
              >
                <h3 className="rounded-lg border border-msv-blue/20 bg-msv-blue-soft/40 px-3 py-2 text-sm font-bold tracking-tight text-msv-navy">
                  {block.industry}
                </h3>
                <ul className="mt-3 flex-1 space-y-1.5 text-sm text-slate-700">
                  {block.items.map((name) => (
                    <li key={name}>
                      <a
                        href={`#${licenseCardDomId(name)}`}
                        className="font-medium text-slate-900 no-underline underline-offset-2 transition-colors hover:text-msv-blue hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-msv-blue"
                      >
                        {name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-200/80 bg-slate-50/95 px-5 py-10 shadow-sm sm:px-8 sm:py-12">
          <p className="msv-eyebrow">{copy.cardsEyebrow}</p>
          <h2 className="mt-2 text-xl font-bold tracking-tight text-msv-navy sm:text-2xl">{copy.cardsTitle}</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">{copy.cardsIntro}</p>

          <LicenseCardsWithModal items={copy.licenseCards} modal={copy.modal} />
        </section>
      </StandardPageBody>
    </>
  );
}
