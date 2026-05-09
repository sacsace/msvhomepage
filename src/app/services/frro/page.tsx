import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { StandardPageBody } from "@/components/layout/StandardPageBody";
import { getRequestLocale } from "@/lib/get-request-locale";
import { frroServiceCopy } from "@/lib/i18n/frro-service-locale";
import { staticPageSeoLocalized } from "@/lib/seo-metadata";
import { withLocalePrefix } from "@/lib/site-locale";

const body = "text-sm leading-relaxed text-slate-700 break-keep";
const listDisc = "mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700 break-keep";
const h3 = "text-base font-bold text-msv-navy";
const h4 = "mt-4 text-sm font-semibold text-slate-900";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const copy = frroServiceCopy(locale);
  return staticPageSeoLocalized("/services/frro", { title: copy.metaTitle, description: copy.metaDescription }, locale);
}

export default async function FrroServicePage() {
  const locale = await getRequestLocale();
  const L = (path: string) => withLocalePrefix(path, locale);
  const copy = frroServiceCopy(locale);

  return (
    <>
      <PageHeader
        title={copy.pageTitle}
        description={copy.pageIntroA}
        descriptionWide
        belowDescription={
          <p className="mt-3 max-w-3xl whitespace-pre-line text-[15px] font-normal leading-relaxed tracking-[-0.01em] text-slate-600 break-keep sm:text-base">
            {copy.pageIntroB}
          </p>
        }
      />
      <StandardPageBody className="space-y-8">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className={`${body} space-y-0`}>
            {copy.contextParas.map((p, i) => (
              <p key={i} className="m-0">
                {p}
              </p>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-lg font-bold text-msv-navy">{copy.mainWorkTitle}</h2>
          <div className="mt-6 space-y-10">
            {copy.workBlocks.map((block) => (
              <div key={block.title}>
                <h3 className={h3}>{block.title}</h3>
                {block.intro ? <p className={`mt-3 ${body}`}>{block.intro}</p> : null}
                {block.exampleHeading && (block.exampleItems?.length ?? 0) > 0 ? (
                  <>
                    <p className={h4}>{block.exampleHeading}</p>
                    <ul className={listDisc}>
                      {(block.exampleItems ?? []).map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </>
                ) : null}
                <p className={h4}>{block.supportHeading}</p>
                <ul className={listDisc}>
                  {block.supportItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-lg font-bold text-msv-navy">{copy.documentsTitle}</h2>
          <div className="mt-6 space-y-10">
            <div>
              <h3 className={h3}>{copy.cForm.title}</h3>
              <p className={`mt-3 ${body}`}>{copy.cForm.body}</p>
              {copy.cForm.listLead && (copy.cForm.listItems?.length ?? 0) > 0 ? (
                <>
                  <p className={h4}>{copy.cForm.listLead}</p>
                  <ul className={listDisc}>
                    {(copy.cForm.listItems ?? []).map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </>
              ) : null}
            </div>
            <div>
              <h3 className={h3}>{copy.sForm.title}</h3>
              <p className={`mt-3 ${body}`}>{copy.sForm.body}</p>
              {copy.sForm.listLead && (copy.sForm.listItems?.length ?? 0) > 0 ? (
                <>
                  <p className={h4}>{copy.sForm.listLead}</p>
                  <ul className={listDisc}>
                    {(copy.sForm.listItems ?? []).map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </>
              ) : null}
            </div>
            <div>
              <h3 className={h3}>{copy.exitPermit.title}</h3>
              <p className={`mt-3 ${body}`}>{copy.exitPermit.intro}</p>
              <p className={h4}>{copy.exitPermit.supportHeading}</p>
              <ul className={listDisc}>
                {copy.exitPermit.supportItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="whitespace-pre-line text-xs leading-relaxed text-slate-500">{copy.footNote}</p>
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
