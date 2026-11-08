"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { HomeHeroSlide } from "@/lib/i18n/public-home";
import { heroSliderUi } from "@/lib/i18n/public-home";
import type { SiteLocale } from "@/lib/site-locale";
import { homeTypo } from "@/lib/home-typography";

const AUTOPLAY_MS = 6500;

type Props = {
  slides: readonly HomeHeroSlide[];
  locale: SiteLocale;
  /** light paper hero (reference magazine) vs ink */
  theme?: "light" | "dark";
  /** 외부 콜라주 사용 시 슬라이드 인물 숨김 */
  hidePortraits?: boolean;
  onActiveSlideChange?: (slideId: string) => void;
};

function PortraitBlock({
  slide,
  light,
  priority,
}: {
  slide: HomeHeroSlide;
  light: boolean;
  priority: boolean;
}) {
  if (!slide.imageSrc) return null;

  return (
    <div className="pointer-events-none absolute bottom-[-8.5rem] right-0 z-[1] hidden w-[min(35.8vw,20.5rem)] flex-col items-stretch sm:flex lg:bottom-[-9.5rem] lg:w-[min(37vw,23rem)]">
      <div className="relative flex h-[min(23rem,37vh)] w-full items-end justify-end">
        <Image
          src={slide.imageSrc}
          alt=""
          width={slide.imageWidth ?? 686}
          height={slide.imageHeight ?? 1013}
          unoptimized
          className={`h-full w-auto max-w-full object-contain object-bottom object-right ${
            light ? "" : "drop-shadow-[0_18px_40px_rgba(0,0,0,0.4)]"
          }`}
          sizes="20.5rem"
          priority={priority}
        />
      </div>
      {slide.imageCaption ? (
        <p
          className={`mt-2 w-full text-center font-sans text-[11px] font-medium leading-snug tracking-[-0.01em] sm:text-xs ${
            light ? "text-msv-ink/70" : "text-white/80"
          }`}
        >
          {slide.imageCaption}
        </p>
      ) : null}
    </div>
  );
}

export function HeroSlider({
  slides,
  locale,
  theme = "dark",
  hidePortraits = false,
  onActiveSlideChange,
}: Props) {
  const light = theme === "light";
  const ui = heroSliderUi(locale);
  const [activeIndex, setActiveIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [skipTransition, setSkipTransition] = useState(false);
  const pausedRef = useRef(false);
  const activeIndexRef = useRef(0);
  const onActiveRef = useRef(onActiveSlideChange);
  const total = slides.length;

  useEffect(() => {
    onActiveRef.current = onActiveSlideChange;
  }, [onActiveSlideChange]);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
    const id = slides[activeIndex]?.id;
    if (id) onActiveRef.current?.(id);
  }, [activeIndex, slides]);

  const goTo = useCallback(
    (index: number) => {
      if (total === 0) return;
      const next = ((index % total) + total) % total;
      const current = activeIndexRef.current;
      const wrapping =
        total > 1 &&
        ((current === total - 1 && next === 0) || (current === 0 && next === total - 1));

      if (wrapping && !reduceMotion) {
        setSkipTransition(true);
        setActiveIndex(next);
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => setSkipTransition(false));
        });
        return;
      }

      setActiveIndex(next);
    },
    [total, reduceMotion],
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
        goTo(activeIndexRef.current + 1);
      }
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion, total, goTo]);

  if (total === 0) return null;

  const animateSlide = !reduceMotion && !skipTransition;

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
      <div className="relative overflow-x-clip overflow-y-visible">
        <div
          className={`flex ${animateSlide ? "transition-transform duration-500 ease-out" : ""}`}
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <article
              key={slide.id}
              className="w-full shrink-0 overflow-hidden"
              aria-hidden={index !== activeIndex}
              inert={index !== activeIndex ? true : undefined}
            >
              <div className="relative min-h-[9.5rem] overflow-hidden sm:min-h-[10.5rem]">
                {!hidePortraits && slide.imageSrc && index === activeIndex ? (
                  <PortraitBlock
                    slide={slide}
                    light={light}
                    priority={index === 0 || slide.id === "operations"}
                  />
                ) : null}
                <div className="relative z-10 max-w-[36rem]">
                  <p
                    className={`font-sans text-[11px] font-semibold uppercase leading-none tracking-[0.28em] ${
                      light ? "text-slate-500" : "text-white/55"
                    }`}
                  >
                    {slide.eyebrow}
                  </p>
                  <h1
                    className={`mt-4 max-w-3xl text-pretty break-keep font-sans text-[1.55rem] font-semibold leading-[1.18] tracking-[-0.03em] sm:text-[1.9rem] lg:text-[2.2rem] ${
                      light ? "text-msv-ink" : "text-white"
                    }`}
                  >
                    {slide.headline}
                  </h1>
                  <p
                    className={`mt-5 max-w-[34rem] text-pretty break-keep ${
                      light ? homeTypo.body : homeTypo.bodyOnDark
                    }`}
                  >
                    {slide.lead}
                  </p>
                </div>
                {slide.imageSrc && slide.imageAlt ? (
                  <span className="sr-only">{slide.imageAlt}</span>
                ) : null}
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
                  className={`h-px transition-all duration-300 ${
                    selected
                      ? light
                        ? "w-10 bg-msv-ink"
                        : "w-10 bg-white"
                      : light
                        ? "w-5 bg-msv-ink/25 hover:bg-msv-ink/50"
                        : "w-5 bg-white/35 hover:bg-white/60"
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
