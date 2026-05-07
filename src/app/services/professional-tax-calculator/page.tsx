import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { StandardPageBody } from "@/components/layout/StandardPageBody";
import { ProfessionalTaxCalculator } from "@/components/services/ProfessionalTaxCalculator";
import { professionalTaxCalculatorCopy } from "@/lib/i18n/professional-tax-calculator-locale";
import { getRequestLocale } from "@/lib/get-request-locale";
import { staticPageSeoLocalized } from "@/lib/seo-metadata";
import { withLocalePrefix } from "@/lib/site-locale";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const c = professionalTaxCalculatorCopy(locale);
  return staticPageSeoLocalized(
    "/services/professional-tax-calculator",
    { title: c.metaTitle, description: c.metaDescription },
    locale,
  );
}

export default async function ProfessionalTaxCalculatorPage() {
  const locale = await getRequestLocale();
  const c = professionalTaxCalculatorCopy(locale);
  const L = (path: string) => withLocalePrefix(path, locale);

  return (
    <>
      <PageHeader title={c.pageHeaderTitle} description={c.pageHeaderDescription} descriptionWide />
      <StandardPageBody>
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-lg font-bold text-msv-navy">{c.sectionRefCalc}</h2>
          <div className="mt-4">
            <ProfessionalTaxCalculator locale={locale} />
          </div>
          <p className="mt-8 border-t border-slate-100 pt-6 text-sm leading-relaxed text-slate-600">{c.disclaimer}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={L("/services")}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-msv-navy transition hover:border-msv-blue/35 hover:text-msv-blue"
            >
              {c.linkServices}
            </Link>
            <Link
              href={L("/contact")}
              className="rounded-lg bg-msv-navy px-4 py-2 text-sm font-semibold text-white transition hover:bg-msv-navy/90"
            >
              {c.linkContact}
            </Link>
          </div>
        </section>
      </StandardPageBody>
    </>
  );
}
