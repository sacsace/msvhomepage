import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { StandardPageBody } from "@/components/layout/StandardPageBody";
import { getRequestLocale } from "@/lib/get-request-locale";
import { recruitmentSupportServiceCopy } from "@/lib/i18n/recruitment-support-service-locale";
import { staticPageSeoLocalized } from "@/lib/seo-metadata";
import { withLocalePrefix } from "@/lib/site-locale";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const copy = recruitmentSupportServiceCopy(locale);
  return staticPageSeoLocalized(
    "/services/recruitment-support",
    { title: copy.metaTitle, description: copy.metaDescription },
    locale,
  );
}

export default async function RecruitmentSupportServicePage() {
  const locale = await getRequestLocale();
  const L = (path: string) => withLocalePrefix(path, locale);
  const copy = recruitmentSupportServiceCopy(locale);

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
      </StandardPageBody>
    </>
  );
}
