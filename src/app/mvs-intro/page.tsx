import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionTitle } from "@/components/SectionTitle";
import { staticPageSeo } from "@/lib/seo-metadata";
import { splitIntroParagraphs } from "@/lib/split-intro-paragraphs";
import { mvsIntro } from "@/lib/site-content";

export const metadata: Metadata = staticPageSeo("/mvs-intro", {
  title: "MV System 소개",
  description: mvsIntro.headerSummary,
});

const paraClass =
  "max-w-none text-base leading-relaxed text-pretty text-slate-600 break-keep sm:text-[17px] sm:leading-[1.75]";

export default function MvsIntroPage() {
  const { links } = mvsIntro;
  const overviewParagraphs = splitIntroParagraphs(mvsIntro.heroLead);

  return (
    <>
      <PageHeader title="MV System 소개" description={mvsIntro.headerSummary} />
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
        <section>
          <SectionTitle
            eyebrow="Overview"
            title="개요"
            spacing="tight"
            density="compact"
            contentWidth="full"
          />
          <div className="mt-4 space-y-4 sm:space-y-5">
            {overviewParagraphs.map((para, i) => (
              <p key={`mvs-overview-${i}`} className={paraClass}>
                {para}
              </p>
            ))}
          </div>
        </section>

        <div className="mt-14 space-y-14 sm:mt-16 sm:space-y-16">
          {mvsIntro.sections.map((s) => {
            const paras = splitIntroParagraphs(s.body);
            return (
              <section key={s.title}>
                <SectionTitle
                  eyebrow={s.eyebrow}
                  title={s.title}
                  spacing="tight"
                  density="compact"
                  contentWidth="full"
                />
                <div className="mt-4 space-y-4 sm:space-y-5">
                  {paras.map((para, i) => (
                    <p key={`${s.title}-${i}`} className={paraClass}>
                      {para}
                    </p>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        <section className="mt-14 border-t border-slate-200 pt-12 sm:mt-16 sm:pt-14">
          <p className="msv-eyebrow">바로가기</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href={links.about}
              className="inline-flex rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-msv-navy shadow-sm transition hover:border-msv-blue/30 hover:text-msv-blue"
            >
              회사 소개 →
            </Link>
            <Link
              href={links.services}
              className="inline-flex rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-msv-navy shadow-sm transition hover:border-msv-blue/30 hover:text-msv-blue"
            >
              서비스 →
            </Link>
            <Link
              href={links.contact}
              className="inline-flex rounded-xl bg-msv-navy px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-msv-navy/90"
            >
              문의하기
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
