import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionTitle } from "@/components/SectionTitle";
import { msvIntro } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "MSV 소개",
  description: "Minsub Ventures(MSV) 요약 소개",
};

export default function MsvIntroPage() {
  const { links } = msvIntro;

  return (
    <>
      <PageHeader title="MSV 소개" description={msvIntro.heroLead} />
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
        <div className="space-y-12 sm:space-y-14">
          {msvIntro.sections.map((s) => (
            <section key={s.title}>
              <SectionTitle eyebrow={s.eyebrow} title={s.title} spacing="tight" density="compact" />
              <p className="mt-3 max-w-3xl text-base leading-[1.75] text-slate-600">{s.body}</p>
            </section>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-3 border-t border-slate-200 pt-10 sm:mt-14 sm:pt-12">
          <Link
            href={links.about}
            className="inline-flex rounded-md border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-msv-navy shadow-sm transition hover:border-msv-blue/30 hover:text-msv-blue"
          >
            회사 소개 →
          </Link>
          <Link
            href={links.services}
            className="inline-flex rounded-md border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-msv-navy shadow-sm transition hover:border-msv-blue/30 hover:text-msv-blue"
          >
            서비스 →
          </Link>
          <Link
            href={links.contact}
            className="inline-flex rounded-md bg-msv-navy px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-msv-navy/90"
          >
            문의하기
          </Link>
        </div>
      </div>
    </>
  );
}
