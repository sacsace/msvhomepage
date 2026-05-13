import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { StandardPageBody } from "@/components/layout/StandardPageBody";
import { SectionTitle } from "@/components/SectionTitle";
import { corporateMergerServiceCopy } from "@/lib/i18n/corporate-merger-service-locale";
import { getRequestLocale } from "@/lib/get-request-locale";
import { staticPageSeoLocalized } from "@/lib/seo-metadata";
import { withLocalePrefix } from "@/lib/site-locale";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const copy = corporateMergerServiceCopy(locale);
  return staticPageSeoLocalized(
    "/services/corporate-merger",
    { title: copy.metaTitle, description: copy.metaDescription },
    locale,
  );
}

export default async function CorporateMergerServicePage() {
  const locale = await getRequestLocale();
  const L = (path: string) => withLocalePrefix(path, locale);
  const c = corporateMergerServiceCopy(locale);
  const stepCount = c.processFlow.steps.length;

  return (
    <>
      <PageHeader title={c.pageTitle} description={c.pageDescription} descriptionWide />
      <StandardPageBody className="space-y-10 sm:space-y-12">
        <p className="rounded-xl border border-amber-200/80 bg-amber-50/70 px-4 py-3 text-xs leading-relaxed text-amber-950/90 sm:text-[13px]">
          {c.disclaimer}
        </p>

        <section className="rounded-2xl border border-slate-200 bg-white px-6 py-10 shadow-sm sm:px-8 sm:py-12">
          <SectionTitle title={c.overview.title} spacing="tight" density="compact" contentWidth="full" />
          <div className="mt-3 text-sm leading-relaxed text-slate-800 sm:text-[15px]">
            {c.overview.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white px-6 py-10 shadow-sm sm:px-8 sm:py-12">
          <SectionTitle title={c.structureTypes.title} spacing="tight" density="compact" contentWidth="full" />
          <div className="mt-6 space-y-8">
            {c.structureTypes.sections.map((sec) => (
              <div
                key={sec.subtitle}
                className="rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-5 shadow-sm sm:px-5 sm:py-6"
              >
                <h3 className="text-[15px] font-bold leading-snug text-msv-navy sm:text-base">{sec.subtitle}</h3>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-800 sm:text-[15px]">
                  {sec.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                {sec.notesTitle && sec.notes?.length ? (
                  <div className="mt-4 border-t border-slate-200/90 pt-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-600">{sec.notesTitle}</p>
                    <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-slate-700">
                      {sec.notes.map((n) => (
                        <li key={n}>{n}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-msv-blue/20 bg-msv-blue-soft/10 px-6 py-10 shadow-sm sm:px-8 sm:py-12">
          <SectionTitle title={c.keyReview.title} spacing="tight" density="compact" contentWidth="full" />
          <div className="mt-6 grid min-w-0 gap-4 md:grid-cols-2 md:[&>*]:min-w-0">
            {c.keyReview.blocks.map((block) => (
              <div
                key={block.title}
                className="min-w-0 rounded-xl border border-msv-blue/15 bg-white/90 px-4 py-4 shadow-sm sm:px-5 sm:py-5"
              >
                <h3 className="text-sm font-bold text-msv-navy sm:text-[15px]">{block.title}</h3>
                <ul className="mt-3 list-disc space-y-1.5 pl-4 text-[13px] leading-relaxed text-slate-800 sm:list-inside sm:pl-0 sm:text-sm">
                  {block.items.map((item) => (
                    <li key={item} className="sm:pl-1">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white px-6 py-10 shadow-sm sm:px-8 sm:py-12">
          <SectionTitle title={c.processFlow.title} spacing="tight" density="compact" contentWidth="full" />
          <ol className="mt-6 space-y-0">
            {c.processFlow.steps.map((step, idx) => (
              <li key={step.title} className="flex gap-3 sm:gap-4">
                <div className="flex w-9 shrink-0 flex-col items-center sm:w-10">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-msv-blue bg-white text-xs font-bold text-msv-navy shadow-sm sm:h-9 sm:w-9 sm:text-sm">
                    {idx + 1}
                  </span>
                  {idx < stepCount - 1 ? (
                    <span
                      className="mt-1 min-h-[2.25rem] w-0.5 flex-1 bg-gradient-to-b from-msv-blue/35 to-msv-blue/5 sm:min-h-[2.5rem]"
                      aria-hidden
                    />
                  ) : null}
                </div>
                <div
                  className={`min-w-0 flex-1 pt-0.5 ${idx < stepCount - 1 ? "pb-8 sm:pb-9" : "pb-1"}`}
                >
                  <h3 className="text-sm font-bold text-msv-navy sm:text-[15px]">{step.title}</h3>
                  <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-slate-800 sm:text-[15px]">
                    {step.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-xs leading-relaxed text-slate-600 sm:text-[13px]">{c.processFlow.note}</p>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white px-6 py-10 shadow-sm sm:px-8 sm:py-12">
          <SectionTitle title={c.timeline.title} spacing="tight" density="compact" contentWidth="full" />
          <div className="mt-4 min-w-0 overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
            <table className="w-full min-w-[min(100%,18rem)] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-slate-300 bg-slate-100">
                  <th className="px-3 py-3 text-xs font-bold uppercase tracking-wider text-slate-700 sm:px-4">
                    {c.timeline.colStructure}
                  </th>
                  <th className="px-3 py-3 text-xs font-bold uppercase tracking-wider text-slate-700 sm:px-4">
                    {c.timeline.colDuration}
                  </th>
                </tr>
              </thead>
              <tbody>
                {c.timeline.rows.map((row) => (
                  <tr key={row.structure} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/90">
                    <td className="px-3 py-3 font-medium text-msv-navy sm:px-4">{row.structure}</td>
                    <td className="px-3 py-3 tabular-nums text-slate-800 sm:px-4">{row.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs leading-relaxed text-slate-700 sm:text-[13px]">
            {c.timeline.footnote}
          </p>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white px-6 py-10 shadow-sm sm:px-8 sm:py-12">
          <SectionTitle title={c.practicalIssues.title} spacing="tight" density="compact" contentWidth="full" />
          <ul className="mt-4 divide-y divide-slate-100 rounded-xl border border-slate-200 bg-slate-50/50">
            {c.practicalIssues.items.map((item) => (
              <li
                key={item}
                className="px-4 py-3 text-sm leading-relaxed text-slate-800 first:rounded-t-xl last:rounded-b-xl sm:px-5 sm:text-[15px]"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>

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
