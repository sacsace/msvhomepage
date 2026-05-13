import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { StandardPageBody } from "@/components/layout/StandardPageBody";
import { SectionTitle } from "@/components/SectionTitle";
import { corporateLiquidationServiceCopy } from "@/lib/i18n/corporate-liquidation-service-locale";
import { getRequestLocale } from "@/lib/get-request-locale";
import { staticPageSeoLocalized } from "@/lib/seo-metadata";
import { withLocalePrefix } from "@/lib/site-locale";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const copy = corporateLiquidationServiceCopy(locale);
  return staticPageSeoLocalized(
    "/services/corporate-liquidation",
    { title: copy.metaTitle, description: copy.metaDescription },
    locale,
  );
}

export default async function CorporateLiquidationServicePage() {
  const locale = await getRequestLocale();
  const L = (path: string) => withLocalePrefix(path, locale);
  const c = corporateLiquidationServiceCopy(locale);

  return (
    <>
      <PageHeader title={c.pageTitle} description={c.pageDescription} descriptionWide />
      <StandardPageBody className="space-y-10 sm:space-y-12">
        <p className="text-xs leading-relaxed text-slate-500">{c.sourceNote}</p>

        <section className="rounded-2xl border border-slate-200 bg-white px-6 py-10 shadow-sm sm:px-8 sm:py-12">
          <SectionTitle title={c.overview.title} spacing="tight" density="compact" contentWidth="full" />
          <p className="mt-4 text-sm leading-relaxed text-slate-700 sm:text-[15px]">{c.overview.body}</p>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white px-6 py-10 shadow-sm sm:px-8 sm:py-12">
          <SectionTitle title={c.strikeIntro.title} spacing="tight" density="compact" contentWidth="full" />
          {c.strikeIntro.paragraphs.map((p) => (
            <p key={p} className="mt-4 text-sm leading-relaxed text-slate-700 sm:text-[15px]">
              {p}
            </p>
          ))}
          <h3 className="mt-8 text-sm font-semibold text-msv-navy">{c.strikeIntro.prerequisitesTitle}</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700">
            {c.strikeIntro.prerequisites.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-msv-blue/20 bg-msv-blue-soft/10 px-6 py-10 shadow-sm sm:px-8 sm:py-12">
          <SectionTitle title={c.strikeSteps.title} spacing="tight" density="compact" contentWidth="full" />
          <p className="mt-4 text-sm leading-relaxed text-slate-800">{c.strikeSteps.lead}</p>
          <ol className="mt-4 list-decimal space-y-2.5 pl-5 text-sm leading-relaxed text-slate-800 marker:text-msv-blue">
            {c.strikeSteps.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <p className="mt-4 text-xs leading-relaxed text-slate-600">{c.strikeSteps.durationNote}</p>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white px-6 py-10 shadow-sm sm:px-8 sm:py-12">
          <SectionTitle title={c.windingSteps.title} spacing="tight" density="compact" contentWidth="full" />
          <p className="mt-4 text-sm leading-relaxed text-slate-700">{c.windingSteps.lead}</p>
          <ol className="mt-4 list-decimal space-y-2.5 pl-5 text-sm leading-relaxed text-slate-700 marker:text-msv-blue">
            {c.windingSteps.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <p className="mt-4 text-xs leading-relaxed text-slate-600">{c.windingSteps.durationNote}</p>
          <ul className="mt-6 space-y-2 border-t border-slate-100 pt-6 text-xs leading-relaxed text-slate-500">
            {c.windingSteps.footnotes.map((fn) => (
              <li key={fn}>{fn}</li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white px-6 py-10 shadow-sm sm:px-8 sm:py-12">
          <SectionTitle title={c.dormant.title} spacing="tight" density="compact" contentWidth="full" />
          <p className="mt-4 text-sm leading-relaxed text-slate-700">{c.dormant.intro}</p>
          <h3 className="mt-8 text-sm font-semibold text-msv-navy">{c.dormant.whenTitle}</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700">
            {c.dormant.whenItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h3 className="mt-8 text-sm font-semibold text-msv-navy">{c.dormant.conditionsTitle}</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700">
            {c.dormant.conditions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-msv-blue/20 bg-msv-blue-soft/10 px-6 py-10 shadow-sm sm:px-8 sm:py-12">
          <SectionTitle title={c.preClosureChecklist.title} spacing="tight" density="compact" contentWidth="full" />
          {c.preClosureChecklist.intro ? (
            <p className="mt-4 text-sm leading-relaxed text-slate-800 sm:text-[15px]">{c.preClosureChecklist.intro}</p>
          ) : null}
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-800 sm:text-[15px]">
            {c.preClosureChecklist.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white px-6 py-10 shadow-sm sm:px-8 sm:py-12">
          <SectionTitle title={c.summary.title} spacing="tight" density="compact" contentWidth="full" />
          <p className="mt-4 text-sm leading-relaxed text-slate-700">{c.summary.body}</p>
          <p className="mt-4 text-sm leading-relaxed text-slate-700">{c.summary.timelineNote}</p>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white px-6 py-10 shadow-sm sm:px-8 sm:py-12">
          <SectionTitle title={c.comparison.title} spacing="tight" density="compact" contentWidth="full" />
          <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200">
            <table className="min-w-[32rem] w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th scope="col" className="px-3 py-2.5 font-semibold text-msv-navy sm:px-4">
                    {c.comparison.colMethod}
                  </th>
                  <th scope="col" className="px-3 py-2.5 font-semibold text-msv-navy sm:px-4">
                    {c.comparison.colPros}
                  </th>
                  <th scope="col" className="px-3 py-2.5 font-semibold text-msv-navy sm:px-4">
                    {c.comparison.colCons}
                  </th>
                </tr>
              </thead>
              <tbody>
                {c.comparison.rows.map((row) => (
                  <tr key={row.method} className="border-b border-slate-100 align-top last:border-0">
                    <td className="px-3 py-3 font-medium text-msv-navy sm:px-4">{row.method}</td>
                    <td className="px-3 py-3 text-slate-700 sm:px-4">{row.pros}</td>
                    <td className="px-3 py-3 text-slate-700 sm:px-4">{row.cons}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <p className="rounded-xl border border-amber-200/80 bg-amber-50/60 px-4 py-3 text-xs leading-relaxed text-amber-950/90 sm:text-[13px]">
          {c.legalDisclaimer}
        </p>

        <section className="rounded-2xl border border-slate-200 bg-msv-blue-soft/15 px-6 py-10 sm:px-8 sm:py-12">
          <SectionTitle title={c.related.title} spacing="tight" density="compact" contentWidth="full" />
          <ul className="mt-4 flex flex-wrap gap-3">
            {c.related.links.map((item) => (
              <li key={item.path}>
                <Link
                  href={L(item.path)}
                  className="inline-flex rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-msv-navy transition hover:border-msv-blue/35 hover:text-msv-blue"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={L("/services")}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-msv-navy transition hover:border-msv-blue/35 hover:text-msv-blue"
            >
              {c.navBackServices}
            </Link>
            <Link
              href={L("/contact")}
              className="rounded-lg bg-msv-navy px-4 py-2 text-sm font-semibold text-white transition hover:bg-msv-navy/90"
            >
              {c.navContact}
            </Link>
          </div>
        </section>
      </StandardPageBody>
    </>
  );
}
