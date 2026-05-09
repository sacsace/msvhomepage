import Link from "next/link";
import { homeTypo } from "@/lib/home-typography";
import { homeAccountingHeroEn, homeAccountingHeroZh, simpleHeroCtas } from "@/lib/i18n/public-home";
import type { SiteLocale } from "@/lib/site-locale";
import { withLocalePrefix } from "@/lib/site-locale";
import { company, homeAccountingHero } from "@/lib/site-content";

type Props = {
  locale: SiteLocale;
};

export function SimpleHero({ locale }: Props) {
  const hero =
    locale === "en" ? homeAccountingHeroEn : locale === "zh" ? homeAccountingHeroZh : homeAccountingHero;
  const { headline, lead, badge } = hero;
  const ctas = simpleHeroCtas(locale);
  const L = (p: string) => withLocalePrefix(p, locale);

  return (
    <section className="border-b border-slate-200/35">
      <div
        className={`relative isolate flex min-h-[320px] flex-col justify-end overflow-hidden bg-gradient-to-br from-msv-navy via-[#122338] to-slate-950 pb-12 pt-16 sm:min-h-[400px] sm:pb-16 sm:pt-20 ${homeTypo.pageInset}`}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35] bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[100%_22px]"
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(45,91,255,0.22),transparent)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,transparent_40%,rgba(255,255,255,0.04)_50%,transparent_60%)]" />
        <div className="relative mx-auto w-full max-w-6xl">
          <div className="flex flex-wrap items-center gap-3">
            <p className={homeTypo.heroMeta}>{company.tagline}</p>
            <span className="rounded-full border border-white/20 bg-white/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-msv-blue-soft">
              {badge}
            </span>
          </div>
          <h1 className="mt-4 max-w-4xl text-pretty break-keep text-3xl font-semibold leading-[1.1] tracking-[-0.035em] text-white sm:text-4xl sm:leading-[1.1] lg:text-[2.65rem] lg:leading-[1.1]">
            {headline}
          </h1>
          <p
            className={`mt-6 max-w-[760px] whitespace-pre-line text-pretty break-keep leading-[1.7] ${homeTypo.bodyOnDark}`}
          >
            {lead}
          </p>
          <div className="mt-10 flex flex-wrap gap-3 sm:gap-4">
            <Link
              href={L("/services")}
              className="inline-flex rounded-full bg-msv-blue px-7 py-2.5 text-sm font-semibold text-white shadow-[0_4px_20px_rgba(0,113,227,0.35)] transition duration-300 hover:bg-blue-600 hover:shadow-[0_6px_24px_rgba(0,113,227,0.4)]"
            >
              {ctas.services}
            </Link>
            <Link
              href={company.brochurePath}
              className="inline-flex rounded-full border border-white/35 bg-white/12 px-7 py-2.5 text-sm font-semibold text-white backdrop-blur-md transition duration-300 hover:border-white/55 hover:bg-white/18"
            >
              {ctas.pdf}
            </Link>
            <Link
              href={L("/contact")}
              className="inline-flex rounded-full border border-white/22 bg-transparent px-7 py-2.5 text-sm font-semibold text-white/92 transition duration-300 hover:border-white/45 hover:bg-white/10"
            >
              {ctas.contact}
            </Link>
            <Link
              href={L("/about")}
              className="inline-flex items-center px-2 py-2.5 text-sm font-medium text-white/85 underline-offset-4 hover:text-white hover:underline"
            >
              {ctas.about}
            </Link>
            <Link
              href={L("/software")}
              className="inline-flex items-center px-2 py-2.5 text-sm font-medium text-white/85 underline-offset-4 hover:text-white hover:underline"
            >
              {ctas.software}
            </Link>
          </div>
          <p className={`mt-10 ${homeTypo.heroFoot}`}>{ctas.foot}</p>
        </div>
      </div>
    </section>
  );
}
