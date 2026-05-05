import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { StandardPageBody } from "@/components/layout/StandardPageBody";
import { SectionTitle } from "@/components/SectionTitle";
import { staticPageSeo } from "@/lib/seo-metadata";
import { splitIntroParagraphs } from "@/lib/split-intro-paragraphs";
import { company, hereNowIntro } from "@/lib/site-content";

export const metadata: Metadata = staticPageSeo("/software/herenow", {
  title: "출퇴근 기록 시스템 (HereNow)",
  description: hereNowIntro.headerSummary,
  absoluteTitle: `출퇴근 기록 시스템 (HereNow) | ${company.shortName}`,
});

/** 법인 설립·그룹웨어(MVS) 페이지와 동일한 본문 타이포·카드 */
const bodyText = "text-sm leading-relaxed text-slate-600 break-keep";

const cardSection = "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8";

export default function SoftwareHereNowPage() {
  const { links } = hereNowIntro;
  const overviewParagraphs = splitIntroParagraphs(hereNowIntro.heroLead);

  return (
    <>
      <PageHeader
        title="출퇴근 기록 시스템 (HereNow)"
        description={hereNowIntro.headerSummary}
        descriptionWide
      />
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
              <p key={`hn-overview-${i}`} className={bodyText}>
                {para}
              </p>
            ))}
          </div>
        </section>

        {hereNowIntro.sections.map((s) => {
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

        <section className="rounded-2xl border border-slate-200 bg-msv-blue-soft/15 p-6 sm:p-8">
          <p className={bodyText}>
            소프트웨어·서비스 소개로 이동하시거나, 도입·연동 문의를 남겨 주세요.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={links.software}
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
