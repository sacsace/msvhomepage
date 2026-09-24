import Link from "next/link";
import { HeroSlider } from "@/components/home/HeroSlider";
import { homeTypo } from "@/lib/home-typography";
import { homeHeroSlides, simpleHeroCtas } from "@/lib/i18n/public-home";
import type { SiteLocale } from "@/lib/site-locale";
import { withLocalePrefix } from "@/lib/site-locale";
import { company } from "@/lib/site-content";

type Props = {
  locale: SiteLocale;
};

const btnPrimary =
  "inline-flex min-h-[2.5rem] shrink-0 items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-semibold tracking-tight text-msv-navy transition duration-200 hover:bg-slate-100 sm:px-5";
const btnSecondary =
  "inline-flex min-h-[2.5rem] shrink-0 items-center justify-center rounded-md border border-white/35 px-4 py-2 text-sm font-semibold tracking-tight text-white transition duration-200 hover:border-white/60 hover:bg-white/[0.08] sm:px-5";
const btnQuiet =
  "inline-flex shrink-0 items-center text-sm font-medium text-white/70 underline-offset-4 transition duration-200 hover:text-white hover:underline";
const ctaSep = "text-white/25";

export function SimpleHero({ locale }: Props) {
  const slides = homeHeroSlides(locale);
  const ctas = simpleHeroCtas(locale);
  const L = (p: string) => withLocalePrefix(p, locale);

  return (
    <section className="relative isolate overflow-hidden border-b border-msv-navy/20 bg-gradient-to-br from-msv-navy via-[#122338] to-slate-950">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.28] bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[100%_24px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_12%_-10%,rgba(45,91,255,0.28),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_92%_110%,rgba(10,125,115,0.18),transparent_50%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent_42%,rgba(255,255,255,0.045)_50%,transparent_58%)]"
        aria-hidden
      />

      <div
        className={`relative mx-auto flex min-h-[min(51.84vh,24.48rem)] max-w-6xl flex-col justify-center py-9 sm:min-h-[min(48.96vh,25.92rem)] sm:py-[2.88rem] ${homeTypo.pageInset}`}
      >
        <div className="msv-hero-reveal msv-hero-reveal-1">
          <p className="text-[10px] font-medium uppercase leading-none tracking-[0.2em] text-white/55 sm:text-[11px]">
            {company.tagline}
          </p>
          <p className="mt-px text-[clamp(1.4rem,3.6vw,2.2rem)] font-semibold leading-tight tracking-[-0.04em] text-white sm:mt-0.5">
            {company.legalName}
          </p>
        </div>

        <div className="msv-hero-reveal msv-hero-reveal-2">
          <HeroSlider slides={slides} locale={locale} />
        </div>

        <div className="msv-hero-reveal msv-hero-reveal-3 mt-[1.8rem] flex flex-wrap items-center gap-x-2.5 gap-y-2 sm:mt-8 sm:gap-x-3">
          <Link href={L("/services")} className={btnPrimary}>
            {ctas.services}
          </Link>
          <Link href={L("/contact")} className={btnSecondary}>
            {ctas.contact}
          </Link>
          <span className={ctaSep} aria-hidden>·</span>
          <Link href={company.brochurePath} className={btnQuiet}>
            {ctas.pdf}
          </Link>
          <span className={ctaSep} aria-hidden>·</span>
          <Link href={L("/about")} className={btnQuiet}>
            {ctas.about}
          </Link>
          <span className={ctaSep} aria-hidden>·</span>
          <Link href={L("/software")} className={btnQuiet}>
            {ctas.software}
          </Link>
        </div>

        <p className={`msv-hero-reveal msv-hero-reveal-3 mt-3 ${homeTypo.heroFoot}`}>{ctas.foot}</p>
      </div>
    </section>
  );
}
