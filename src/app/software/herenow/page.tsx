import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { StandardPageBody } from "@/components/layout/StandardPageBody";
import { SectionTitle } from "@/components/SectionTitle";
import { herenowSoftwarePageCopy } from "@/lib/i18n/herenow-software-page-locale";
import { getRequestLocale } from "@/lib/get-request-locale";
import { staticPageSeoLocalized } from "@/lib/seo-metadata";
import { company } from "@/lib/site-content";
import { splitIntroParagraphs } from "@/lib/split-intro-paragraphs";
import { withLocalePrefix } from "@/lib/site-locale";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const c = herenowSoftwarePageCopy(locale);
  return staticPageSeoLocalized(
    "/software/herenow",
    {
      title: c.metaTitle,
      description: c.metaDescription,
      absoluteTitle: `${c.pageTitle} | ${company.shortName}`,
    },
    locale,
  );
}

/** 법인 설립·그룹웨어(MVS) 페이지와 동일한 본문 타이포·카드 */
const bodyText = "text-sm leading-relaxed text-slate-600 break-keep";

const cardSection = "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8";

export default async function SoftwareHeresNowPage() {
  const locale = await getRequestLocale();
  const c = herenowSoftwarePageCopy(locale);
  const L = (path: string) => withLocalePrefix(path, locale);
  const overviewParagraphs = splitIntroParagraphs(c.heroLead);

  return (
    <>
      <PageHeader title={c.pageTitle} description={c.pageHeaderDescription} descriptionWide />
      <StandardPageBody className="space-y-12 sm:space-y-14">
        <section className={cardSection}>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{c.externalLinkLabel}</p>
          <div className="mt-3">
            <a
              href={c.externalLinkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-msv-navy transition hover:border-msv-blue/40 hover:text-msv-blue"
            >
              {c.externalLinkButton}
              <span aria-hidden className="text-xs text-slate-400">↗</span>
            </a>
          </div>
        </section>

        <section className={cardSection}>
          <SectionTitle
            eyebrow={c.overviewEyebrow}
            title={c.overviewTitle}
            spacing="tight"
            density="compact"
            contentWidth="full"
          />
          <div className="mt-4 space-y-3">
            {overviewParagraphs.map((para, i) => (
              <p key={`hn-overview-${i}`} className={bodyText}>
                {para}
              </p>
            ))}
          </div>
        </section>

        {c.sections.map((s, si) => {
          const paras = splitIntroParagraphs(s.body);
          return (
            <section key={`hn-section-${si}`} className={cardSection}>
              <SectionTitle
                eyebrow={s.eyebrow}
                title={s.title}
                spacing="tight"
                density="compact"
                contentWidth="full"
              />
              <div className="mt-4 space-y-3">
                {paras.map((para, i) => (
                  <p key={`hn-section-${si}-p-${i}`} className={bodyText}>
                    {para}
                  </p>
                ))}
                {s.subsections?.map((sub, subi) => (
                  <div key={`hn-section-${si}-sub-${subi}`} className={subi === 0 && paras.length === 0 ? "" : "mt-6"}>
                    <h4 className="text-sm font-bold text-msv-navy sm:text-[15px]">{sub.title}</h4>
                    {sub.intro ? <p className={`mt-2 ${bodyText}`}>{sub.intro}</p> : null}
                    {sub.bullets?.length ? (
                      <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-slate-600 sm:text-[15px]">
                        {sub.bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                ))}
                {s.bulletsTitle && s.bullets?.length ? (
                  <div className="mt-6">
                    <h4 className="text-sm font-bold text-msv-navy sm:text-[15px]">{s.bulletsTitle}</h4>
                    <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-slate-600 sm:text-[15px]">
                      {s.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ) : s.bullets?.length ? (
                  <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-slate-600 sm:text-[15px]">
                    {s.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                ) : null}
                {s.closing ? <p className={`mt-4 ${bodyText}`}>{s.closing}</p> : null}
              </div>
            </section>
          );
        })}

        <section className="rounded-2xl border border-slate-200 bg-msv-blue-soft/15 p-6 sm:p-8">
          <p className={bodyText}>{c.ctaLead}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={L("/software")}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-msv-navy transition hover:border-msv-blue/35 hover:text-msv-blue"
            >
              {c.linkSoftware}
            </Link>
            <Link
              href={L("/about")}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-msv-navy transition hover:border-msv-blue/35 hover:text-msv-blue"
            >
              {c.linkAbout}
            </Link>
            <Link
              href={L("/services")}
              className="rounded-lg border border-msv-navy/40 bg-white px-4 py-2 text-sm font-semibold text-msv-navy transition hover:bg-msv-navy/5"
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
