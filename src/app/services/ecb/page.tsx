import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { StandardPageBody } from "@/components/layout/StandardPageBody";
import { getRequestLocale } from "@/lib/get-request-locale";
import { ecbServiceCopy } from "@/lib/i18n/ecb-service-locale";
import { staticPageSeoLocalized } from "@/lib/seo-metadata";
import { withLocalePrefix } from "@/lib/site-locale";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const copy = ecbServiceCopy(locale);
  return staticPageSeoLocalized("/services/ecb", { title: copy.metaTitle, description: copy.metaDescription }, locale);
}

export default async function EcbGuidePage() {
  const locale = await getRequestLocale();
  const L = (path: string) => withLocalePrefix(path, locale);
  const c = ecbServiceCopy(locale);

  return (
    <>
      <PageHeader title={c.pageTitle} description={c.pageDescription} descriptionWide />
      <StandardPageBody>
        <div className="space-y-8">
          <section className="rounded-2xl border border-msv-blue/30 bg-msv-blue-soft/40 p-6 shadow-sm sm:p-8">
            <h2 className="text-base font-bold text-msv-navy">{c.bankChannel.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-800">{c.bankChannel.body}</p>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-lg font-bold text-msv-navy">{c.whatEcb.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">{c.whatEcb.body}</p>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-lg font-bold text-msv-navy">{c.types.title}</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700">
              {c.types.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-lg font-bold text-msv-navy">{c.autoRoute.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">{c.autoRoute.intro}</p>
            <h3 className="mt-6 text-sm font-semibold text-msv-navy">{c.autoRoute.limitsTitle}</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700">
              {c.autoRoute.limitsItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <h3 className="mt-6 text-sm font-semibold text-msv-navy">{c.autoRoute.useTitle}</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">{c.autoRoute.useBody}</p>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-lg font-bold text-msv-navy">{c.procedure.title}</h2>
            <ol className="mt-4 list-decimal space-y-2.5 pl-5 text-sm leading-relaxed text-slate-700">
              {c.procedure.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <p className="mt-4 text-xs leading-relaxed text-slate-500">{c.procedure.note}</p>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-lg font-bold text-msv-navy">{c.qa.title}</h2>
            <p className="mt-2 text-xs leading-relaxed text-slate-500">{c.qa.intro}</p>

            <div className="mt-6 space-y-6 border-t border-slate-100 pt-6">
              {c.qa.blocks.map((block) => (
                <div key={block.title}>
                  <h3 className="text-sm font-semibold text-msv-navy">{block.title}</h3>
                  <p className="mt-2 text-sm font-medium text-slate-800">{block.question}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">{block.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-lg font-bold text-msv-navy">{c.documents.title}</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700">
              {c.documents.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-lg font-bold text-msv-navy">{c.penalties.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">{c.penalties.intro}</p>
            <div className="mt-4 overflow-x-auto rounded-lg border border-slate-200">
              <table className="w-full min-w-[16rem] border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-slate-50 text-xs font-semibold text-msv-navy">
                    <th className="border border-slate-200 px-3 py-2">{c.penalties.colDelay}</th>
                    <th className="border border-slate-200 px-3 py-2">{c.penalties.colFine}</th>
                  </tr>
                </thead>
                <tbody className="text-slate-700">
                  {c.penalties.rows.map((row) => (
                    <tr key={row.delay}>
                      <td className="border border-slate-200 px-3 py-2">{row.delay}</td>
                      <td className="border border-slate-200 px-3 py-2">{row.fine}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-lg font-bold text-msv-navy">{c.firc.title}</h2>
            {c.firc.paragraphs.map((p) => (
              <p key={p} className="mt-3 text-sm leading-relaxed text-slate-700">
                {p}
              </p>
            ))}
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-lg font-bold text-msv-navy">{c.prosCons.title}</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700">
              {c.prosCons.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-lg font-bold text-msv-navy">{c.glossary.title}</h2>
            <dl className="mt-4 grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
              {c.glossary.entries.map((entry) => (
                <div key={entry.term}>
                  <dt className="font-semibold text-msv-navy">{entry.term}</dt>
                  <dd className="text-slate-600">{entry.desc}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-lg font-bold text-msv-navy">{c.references.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">
              {c.references.firmsLead}{" "}
              <Link
                href="https://firms.rbi.org.in"
                className="font-semibold text-msv-blue underline-offset-2 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://firms.rbi.org.in
              </Link>
            </p>
            <p className="mt-6 text-xs leading-relaxed text-slate-500">{c.references.disclaimer}</p>
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
