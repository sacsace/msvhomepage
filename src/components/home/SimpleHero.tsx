import Link from "next/link";
import { company, homeAccountingHero } from "@/lib/site-content";

export function SimpleHero() {
  const { headline, lead, badge } = homeAccountingHero;

  return (
    <section className="border-b border-msv-navy/20">
      <div className="relative isolate flex min-h-[320px] flex-col justify-end overflow-hidden bg-gradient-to-br from-msv-navy via-[#122338] to-slate-950 px-4 pb-12 pt-16 sm:min-h-[400px] sm:px-8 sm:pb-16 sm:pt-20">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35] bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[100%_22px]"
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(45,91,255,0.22),transparent)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,transparent_40%,rgba(255,255,255,0.04)_50%,transparent_60%)]" />
        <div className="relative mx-auto w-full max-w-6xl">
          <div className="flex flex-wrap items-center gap-3">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.26em] text-white/70">
              {company.tagline}
            </p>
            <span className="rounded-full border border-white/20 bg-white/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-msv-blue-soft">
              {badge}
            </span>
          </div>
          <h1 className="mt-4 max-w-4xl text-3xl font-bold leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-[2.65rem] lg:leading-tight">
            {headline}
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/88 sm:text-base">{lead}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/services"
              className="inline-flex bg-msv-blue px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-900/35 transition hover:bg-blue-600"
            >
              회계·세무 라인업
            </Link>
            <Link
              href={company.brochurePath}
              className="inline-flex border-2 border-white/45 bg-white/10 px-6 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-white/70 hover:bg-white/15"
            >
              회사 프로필 PDF
            </Link>
            <Link
              href="/contact"
              className="inline-flex border-2 border-white/25 bg-transparent px-6 py-2.5 text-sm font-semibold text-white/95 transition hover:border-white/50 hover:bg-white/10"
            >
              문의하기
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center px-2 py-2.5 text-sm font-medium text-white/85 underline-offset-4 hover:text-white hover:underline"
            >
              회사 소개
            </Link>
            <Link
              href="/mvs-intro"
              className="inline-flex items-center px-2 py-2.5 text-sm font-medium text-white/85 underline-offset-4 hover:text-white hover:underline"
            >
              MV System 소개
            </Link>
          </div>
          <p className="mt-10 text-xs font-medium tracking-wide text-white/45">
            고객 만족 {company.satisfaction} · Bangalore · 한국어 · English
          </p>
        </div>
      </div>
    </section>
  );
}
