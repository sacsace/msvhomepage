import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { StandardPageBody } from "@/components/layout/StandardPageBody";
import { SectionTitle } from "@/components/SectionTitle";
import { staticPageSeo } from "@/lib/seo-metadata";
import { splitIntroParagraphs } from "@/lib/split-intro-paragraphs";
import { company, mvsIntro } from "@/lib/site-content";

export const metadata: Metadata = staticPageSeo("/software/mvs", {
  title: "그룹웨어 (MVS)",
  description: mvsIntro.headerSummary,
  absoluteTitle: `그룹웨어 (MVS) | ${company.shortName}`,
});

/** 법인 설립 서비스 페이지와 동일한 본문 타이포 */
const bodyText = "text-sm leading-relaxed text-slate-600";

const cardSection = "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8";

export default function SoftwareMvsPage() {
  const { links, screenshots, screenshotsLead } = mvsIntro;
  const overviewParagraphs = splitIntroParagraphs(mvsIntro.heroLead);

  return (
    <>
      <PageHeader title="그룹웨어 (MVS)" description={mvsIntro.headerSummary} descriptionWide />
      <StandardPageBody className="space-y-12 sm:space-y-14">
        <section className={cardSection}>
          <SectionTitle
            eyebrow="Overview"
            title="개요"
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

        {mvsIntro.sections.map((s) => {
          const paras = splitIntroParagraphs(s.body);
          return (
            <section key={s.title} className={cardSection}>
              <SectionTitle
                eyebrow={s.eyebrow}
                title={s.title}
                spacing="tight"
                density="compact"
                contentWidth="full"
              />
              <div className="mt-4 space-y-3">
                {paras.map((para, i) => (
                  <p key={`${s.title}-${i}`} className={bodyText}>
                    {para}
                  </p>
                ))}
              </div>
            </section>
          );
        })}

        <section className={cardSection}>
          <SectionTitle
            eyebrow="Screens"
            title="화면 예시"
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
          <p className={bodyText}>
            소프트웨어·서비스 소개로 이동하시거나, 도입·연동 문의를 남겨 주세요.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/software"
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-msv-navy transition hover:border-msv-blue/35 hover:text-msv-blue"
            >
              소프트웨어
            </Link>
            <Link
              href={links.about}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-msv-navy transition hover:border-msv-blue/35 hover:text-msv-blue"
            >
              회사 소개
            </Link>
            <Link
              href={links.services}
              className="rounded-lg border border-msv-navy/40 bg-white px-4 py-2 text-sm font-semibold text-msv-navy transition hover:bg-msv-navy/5"
            >
              서비스
            </Link>
            <Link
              href={links.contact}
              className="rounded-lg bg-msv-navy px-4 py-2 text-sm font-semibold text-white transition hover:bg-msv-navy/90"
            >
              문의하기
            </Link>
          </div>
        </section>
      </StandardPageBody>
    </>
  );
}
