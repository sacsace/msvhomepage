import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { StandardPageBody } from "@/components/layout/StandardPageBody";
import { GratuityCalculator } from "@/components/services/GratuityCalculator";
import { gratuityCalculatorCopy } from "@/lib/i18n/gratuity-calculator-locale";
import { getRequestLocale } from "@/lib/get-request-locale";
import { staticPageSeoLocalized } from "@/lib/seo-metadata";
import { withLocalePrefix } from "@/lib/site-locale";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const c = gratuityCalculatorCopy(locale);
  return staticPageSeoLocalized(
    "/services/gratuity-calculator",
    { title: c.metaTitle, description: c.metaDescription },
    locale,
  );
}

export default async function GratuityCalculatorPage() {
  const locale = await getRequestLocale();
  const c = gratuityCalculatorCopy(locale);
  const L = (path: string) => withLocalePrefix(path, locale);

  return (
    <>
      <PageHeader title={c.pageHeaderTitle} description={c.pageHeaderDescription} descriptionWide />
      <StandardPageBody>
        <div className="space-y-8">
          <GratuityCalculator locale={locale} />

          <footer className="border-t border-slate-200 pt-6">
            <p className="max-w-3xl text-sm leading-relaxed text-slate-500">{c.disclaimer}</p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              <Link
                href={L("/services/hr-payroll")}
                className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-msv-navy transition hover:border-msv-blue/35 hover:text-msv-blue"
              >
                {c.linkHrPayroll}
              </Link>
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
          </footer>
        </div>
      </StandardPageBody>
    </>
  );
}
