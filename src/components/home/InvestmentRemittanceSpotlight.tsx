import Link from "next/link";
import { SpotlightHighlightGrid } from "@/components/home/SpotlightHighlightGrid";
import { investmentRemittanceSpotlight } from "@/lib/site-content";

export function InvestmentRemittanceSpotlight() {
  const { eyebrow, title, body, highlights, servicesHref } = investmentRemittanceSpotlight;

  return (
    <section
      className="border-y border-msv-navy/8 bg-gradient-to-b from-msv-blue-soft/35 via-white to-background py-14 sm:py-16"
      aria-labelledby="investment-remittance-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="msv-card p-6 sm:p-8">
          <p className="flex items-stretch gap-3 text-[13px] font-medium tracking-wide text-msv-navy/70 sm:text-sm">
            <span className="w-px shrink-0 rounded-full bg-msv-blue/45" aria-hidden />
            <span>{eyebrow}</span>
          </p>
          <h2
            id="investment-remittance-heading"
            className="mt-5 text-2xl font-bold tracking-tight text-msv-navy sm:text-[1.75rem] lg:text-[1.875rem]"
          >
            {title}
          </h2>
          <p className="mt-6 text-sm leading-relaxed text-slate-600 sm:text-[15px]">{body}</p>
          <SpotlightHighlightGrid items={highlights} />
          <Link
            href={servicesHref}
            className="mt-8 inline-flex text-sm font-semibold text-msv-blue underline-offset-4 hover:underline"
          >
            서비스 상세 보기
          </Link>
        </div>
      </div>
    </section>
  );
}
