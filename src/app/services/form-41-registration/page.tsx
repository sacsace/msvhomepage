import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { StandardPageBody } from "@/components/layout/StandardPageBody";
import { getRequestLocale } from "@/lib/get-request-locale";
import { form41RegistrationServiceCopy } from "@/lib/i18n/form-41-registration-service-locale";
import { staticPageSeoLocalized } from "@/lib/seo-metadata";
import { withLocalePrefix } from "@/lib/site-locale";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const copy = form41RegistrationServiceCopy(locale);
  return staticPageSeoLocalized(
    "/services/form-41-registration",
    { title: copy.metaTitle, description: copy.metaDescription },
    locale,
  );
}

export default async function Form41RegistrationPage() {
  const locale = await getRequestLocale();
  const L = (path: string) => withLocalePrefix(path, locale);
  const c = form41RegistrationServiceCopy(locale);

  return (
    <>
      <PageHeader title={c.pageTitle} description={c.pageDescription} descriptionWide />
      <StandardPageBody>
        <div className="space-y-8">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-lg font-bold text-msv-navy">{c.sec1.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">{c.sec1.p1}</p>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">{c.sec1.p2}</p>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-lg font-bold text-msv-navy">{c.sec2.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">{c.sec2.intro}</p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700">
              {c.sec2.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-lg font-bold text-msv-navy">{c.sec3.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">{c.sec3.intro}</p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700">
              {c.sec3.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="mt-4 text-xs leading-relaxed text-slate-500">{c.sec3.footNote}</p>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-lg font-bold text-msv-navy">{c.sec4.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">{c.sec4.intro}</p>
            <ol className="mt-4 list-decimal space-y-2.5 pl-5 text-sm leading-relaxed text-slate-700">
              {c.sec4.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-lg font-bold text-msv-navy">{c.sec5.title}</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700">
              {c.sec5.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-lg font-bold text-msv-navy">{c.sec6.title}</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700">
              {c.sec6.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-lg font-bold text-msv-navy">{c.sec7.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">{c.sec7.body}</p>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-lg font-bold text-msv-navy">{c.sec8.title}</h2>
            <dl className="mt-4 grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
              {c.sec8.entries.map((entry) => (
                <div key={entry.term}>
                  <dt className="font-semibold text-msv-navy">{entry.term}</dt>
                  <dd className="text-slate-600">{entry.desc}</dd>
                </div>
              ))}
            </dl>
          </section>

          <div className="flex flex-wrap gap-3">
            <Link
              href={L("/services")}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-msv-navy transition hover:border-msv-blue/35 hover:text-msv-blue"
            >
              {c.backToServices}
            </Link>
            <Link
              href={L("/contact")}
              className="rounded-lg bg-msv-navy px-4 py-2 text-sm font-semibold text-white transition hover:bg-msv-navy/90"
            >
              {c.contactCta}
            </Link>
          </div>
        </div>
      </StandardPageBody>
    </>
  );
}
