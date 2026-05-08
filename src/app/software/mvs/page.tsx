import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { StandardPageBody } from "@/components/layout/StandardPageBody";
import { SectionTitle } from "@/components/SectionTitle";
import { mvsSoftwarePageCopy } from "@/lib/i18n/mvs-software-page-locale";
import { getRequestLocale } from "@/lib/get-request-locale";
import { staticPageSeoLocalized } from "@/lib/seo-metadata";
import { company } from "@/lib/site-content";
import { splitIntroParagraphs } from "@/lib/split-intro-paragraphs";
import { withLocalePrefix } from "@/lib/site-locale";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const c = mvsSoftwarePageCopy(locale);
  return staticPageSeoLocalized(
    "/software/mvs",
    {
      title: c.metaTitle,
      description: c.metaDescription,
      absoluteTitle: `${c.pageTitle} | ${company.shortName}`,
    },
    locale,
  );
}

/** 법인 설립 서비스 페이지와 동일한 본문 타이포 */
const bodyText = "text-sm leading-relaxed text-slate-600 break-keep";

const cardSection = "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8";

export default async function SoftwareMvsPage() {
  const locale = await getRequestLocale();
  const c = mvsSoftwarePageCopy(locale);
  const L = (path: string) => withLocalePrefix(path, locale);
  const overviewParagraphs = splitIntroParagraphs(c.heroLead);
  const { screenshots, screenshotsLead } = c;

  return (
    <>
      <PageHeader title={c.pageTitle} description={c.pageHeaderDescription} descriptionWide />
      <StandardPageBody className="space-y-12 sm:space-y-14">
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
              <p key={`mvs-overview-${i}`} className={bodyText}>
                {para}
              </p>
            ))}
          </div>
        </section>

        {c.sections.map((s, si) => {
          const paras = splitIntroParagraphs(s.body);
          return (
            <section key={`mvs-section-${si}`} className={cardSection}>
              <SectionTitle
                eyebrow={s.eyebrow}
                title={s.title}
                spacing="tight"
                density="compact"
                contentWidth="full"
              />
              <div className="mt-4 space-y-3">
                {paras.map((para, i) => (
                  <p key={`mvs-section-${si}-p-${i}`} className={bodyText}>
                    {para}
                  </p>
                ))}
              </div>
            </section>
          );
        })}

        <section className={cardSection}>
          <SectionTitle
            eyebrow={c.screensEyebrow}
            title={c.screensTitle}
            spacing="tight"
            density="compact"
            contentWidth="full"
          />
          <p className={`mt-4 ${bodyText}`}>{screenshotsLead}</p>
          <div className="mt-6 space-y-8 sm:space-y-10">
            {screenshots.map((shot) => (
              <figure
                key={shot.src}
                className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50/80"
              >
                <div className="relative w-full">
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    width={1440}
                    height={900}
                    className="h-auto w-full object-contain object-top"
                    sizes="(min-width: 1024px) 896px, 100vw"
                  />
                </div>
                <figcaption className={`border-t border-slate-200 px-4 py-3 sm:px-5 sm:py-3.5 ${bodyText}`}>
                  {shot.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

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
