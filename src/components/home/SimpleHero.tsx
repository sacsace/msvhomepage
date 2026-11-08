"use client";

import { useState } from "react";
import Link from "next/link";
import { HeroSlider } from "@/components/home/HeroSlider";
import { HeroTeamCollage } from "@/components/home/HeroTeamCollage";
import { homeTypo } from "@/lib/home-typography";
import { homeHeroSlides, simpleHeroCtas } from "@/lib/i18n/public-home";
import type { SiteLocale } from "@/lib/site-locale";
import { withLocalePrefix } from "@/lib/site-locale";
import { company } from "@/lib/site-content";

type Props = {
  locale: SiteLocale;
};

const btnPrimary =
  "inline-flex min-h-[2.75rem] shrink-0 items-center justify-center border border-msv-ink bg-msv-ink px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-white transition duration-200 hover:bg-transparent hover:text-msv-ink";
const btnSecondary =
  "inline-flex min-h-[2.75rem] shrink-0 items-center justify-center border border-msv-ink/30 bg-transparent px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-msv-ink transition duration-200 hover:border-msv-ink";

export function SimpleHero({ locale }: Props) {
  const slides = homeHeroSlides(locale);
  const ctas = simpleHeroCtas(locale);
  const L = (p: string) => withLocalePrefix(p, locale);
  const [focusSlideId, setFocusSlideId] = useState(slides[0]?.id ?? "");

  return (
    <section className="relative isolate min-h-[min(92vh,46rem)] overflow-x-clip overflow-y-visible border-b border-msv-ink/10 bg-[#f3f3f3]">
      {/* 회색 면 + 잡지형 인물 콜라주 — max-w-6xl 우측에 고정 */}
      <div
        className={`pointer-events-none absolute inset-y-0 left-1/2 z-[5] hidden h-full w-full max-w-6xl -translate-x-1/2 lg:block ${homeTypo.pageInset}`}
        aria-hidden
      >
        <div className="absolute inset-y-0 right-0 w-[min(42vw,28rem)] bg-msv-slate-wash/40">
          <HeroTeamCollage locale={locale} focusId={focusSlideId} />
        </div>
      </div>
      {/* 와이드 화면에서 콘텐츠 박스 밖까지 이어지는 회색 배경 */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 -z-[1] hidden w-[42%] bg-msv-slate-wash/40 lg:block"
        aria-hidden
      />

      <div
        className="pointer-events-none absolute bottom-10 left-6 z-10 hidden lg:block"
        aria-hidden
      >
        <span className="msv-vertical-label">Portfolio</span>
      </div>

      <div
        className={`relative z-10 mx-auto flex min-h-[min(92vh,46rem)] max-w-6xl flex-col justify-center py-16 sm:py-20 ${homeTypo.pageInset}`}
      >
        <div className="msv-hero-reveal msv-hero-reveal-1 relative z-10 max-w-3xl">
          <p className={homeTypo.heroMeta}>{company.tagline}</p>
          <p className="font-sans mt-4 text-[clamp(1.85rem,4.4vw,3rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-msv-ink">
            {company.legalName}
          </p>
          <div className="msv-ink-sweep mt-6 h-px w-16 bg-msv-mint" aria-hidden />
        </div>

        <div className="msv-hero-reveal msv-hero-reveal-2 relative z-10 mt-10 max-w-[36rem] overflow-x-clip sm:mt-12">
          <HeroSlider
            slides={slides}
            locale={locale}
            theme="light"
            hidePortraits
            onActiveSlideChange={setFocusSlideId}
          />
        </div>

        <div className="msv-hero-reveal msv-hero-reveal-3 relative z-20 mt-12 flex flex-wrap items-center gap-3">
          <Link href={L("/services")} className={btnPrimary}>
            {ctas.services}
          </Link>
          <Link href={L("/contact")} className={btnSecondary}>
            {ctas.contact}
          </Link>
        </div>

        <p className={`msv-hero-reveal msv-hero-reveal-3 relative z-20 mt-6 ${homeTypo.heroFoot}`}>
          <Link href={company.brochurePath} className="underline-offset-4 hover:underline">
            {ctas.pdf}
          </Link>
          <span className="mx-3 text-msv-ink/20" aria-hidden>
            /
          </span>
          <Link href={L("/about")} className="underline-offset-4 hover:underline">
            {ctas.about}
          </Link>
          <span className="mx-3 text-msv-ink/20" aria-hidden>
            /
          </span>
          <Link href={L("/software")} className="underline-offset-4 hover:underline">
            {ctas.software}
          </Link>
          <span className="mx-3 text-msv-ink/20" aria-hidden>
            /
          </span>
          {ctas.foot}
        </p>
      </div>
    </section>
  );
}
