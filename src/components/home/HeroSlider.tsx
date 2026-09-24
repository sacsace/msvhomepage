"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { HomeHeroSlide } from "@/lib/i18n/public-home";
import { heroSliderUi } from "@/lib/i18n/public-home";
import type { SiteLocale } from "@/lib/site-locale";
import { homeTypo } from "@/lib/home-typography";

const AUTOPLAY_MS = 6500;

type Props = {
  slides: readonly HomeHeroSlide[];
  locale: SiteLocale;
};

export function HeroSlider({ slides, locale }: Props) {
  const ui = heroSliderUi(locale);
  const [activeIndex, setActiveIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const pausedRef = useRef(false);
  const total = slides.length;

  const goTo = useCallback(
    (index: number) => {
      if (total === 0) return;
      const next = ((index % total) + total) % total;
      setActiveIndex(next);
    },
    [total],
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduceMotion || total <= 1) return;
    const id = window.setInterval(() => {
      if (!pausedRef.current) {
        setActiveIndex((i) => (i + 1) % total);
      }
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion, total]);

  if (total === 0) return null;

  return (
    <div
      className="relative mt-[1.4rem] sm:mt-[1.6rem]"
      role="region"
      aria-roledescription="carousel"
      aria-label={ui.autoplay}
      onMouseEnter={() => {
        pausedRef.current = true;
      }}
      onMouseLeave={() => {
        pausedRef.current = false;
      }}
      onFocus={() => {
        pausedRef.current = true;
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          pausedRef.current = false;
        }
      }}
    >
      <div className="relative overflow-hidden">
        <div
          className={`flex ${reduceMotion ? "" : "transition-transform duration-500 ease-out"}`}
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <article
              key={slide.id}
              className="w-full shrink-0"
              aria-hidden={index !== activeIndex}
              inert={index !== activeIndex ? true : undefined}
            >
              <div className="min-h-[9.5rem] sm:min-h-[10.5rem]">
                <p className="text-[10px] font-medium uppercase leading-none tracking-[0.2em] text-white/55 sm:text-[11px]">
                  {slide.eyebrow}
                </p>
                <h1 className="mt-2 max-w-3xl text-pretty break-keep text-[1.35rem] font-medium leading-snug tracking-[-0.02em] text-white/95 sm:text-[1.65rem] sm:leading-[1.35] lg:text-[1.85rem]">
                  {slide.headline}
                </h1>
                <p className={`mt-[0.8rem] max-w-[36rem] text-pretty break-keep ${homeTypo.bodyOnDark}`}>
                  {slide.lead}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      {total > 1 ? (
        <div className="mt-5 flex items-center justify-between gap-4">
          <p className="sr-only" aria-live="polite">
            {ui.slideOf(activeIndex + 1, total)}
          </p>
          <div className="flex flex-wrap gap-2">
            {slides.map((slide, index) => {
              const selected = index === activeIndex;
              return (
                <button
                  key={slide.id}
                  type="button"
                  className={`h-2 rounded-full transition-all duration-300 ${
                    selected ? "w-6 bg-white" : "w-2 bg-white/35 hover:bg-white/55"
                  }`}
                  onClick={() => goTo(index)}
                  aria-label={ui.slideOf(index + 1, total)}
                  aria-current={selected ? "true" : undefined}
                />
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
