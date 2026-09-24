import Image from "next/image";
import Link from "next/link";
import { homeTypo } from "@/lib/home-typography";
import {
  accountingOperationsSpotlightEn,
  accountingOperationsSpotlightZh,
  spotlightCtas,
} from "@/lib/i18n/public-home";
import type { SiteLocale } from "@/lib/site-locale";
import { withLocalePrefix } from "@/lib/site-locale";
import { accountingOperationsSpotlight, leadership } from "@/lib/site-content";

type Props = {
  locale: SiteLocale;
};

const PORTRAIT = "/team/lee-minsub-hero.png";

export function AccountingOperationsSpotlight({ locale }: Props) {
  const block =
    locale === "en"
      ? accountingOperationsSpotlightEn
      : locale === "zh"
        ? accountingOperationsSpotlightZh
        : accountingOperationsSpotlight;
  const { eyebrow, title, paragraphs, highlights } = block;
  const ctas = spotlightCtas(locale);
  const lead = leadership[0];

  return (
    <section
      className="bg-[#f7f8fa] pb-8 sm:pb-10"
      aria-labelledby="accounting-operations-heading"
    >
      <div className={`mx-auto max-w-6xl ${homeTypo.pageInset}`}>
        <div className="relative isolate overflow-hidden rounded-2xl bg-gradient-to-br from-msv-navy via-[#122338] to-slate-950 shadow-lg ring-1 ring-msv-navy/20">
          {/* 샘플과 유사한 분위기 — 오피스 톤 오버레이 */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.35] bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[100%_22px]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_20%,rgba(45,91,255,0.22),transparent_55%)]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_10%_90%,rgba(10,125,115,0.14),transparent_50%)]"
            aria-hidden
          />

          <div className="relative grid items-stretch lg:grid-cols-[minmax(0,1fr)_minmax(15rem,22rem)]">
            <div className="flex min-w-0 flex-col px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
              <p className="text-[13px] font-semibold tracking-wide text-amber-200/90">{eyebrow}</p>

              <div className="mt-5 border-y border-white/25 py-4">
                <h2
                  id="accounting-operations-heading"
                  className="text-pretty break-keep text-xl font-semibold leading-snug tracking-[-0.02em] text-white sm:text-2xl sm:leading-snug"
                >
                  {title}
                </h2>
              </div>

              {/* 기존 `space-y-3` + `leading-relaxed` 본문 간격 유지 */}
              <div className={`mt-5 space-y-3 break-keep ${homeTypo.bodyOnDark}`}>
                {paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              {lead ? (
                <div className="mt-6">
                  <p className="text-base font-semibold text-white">{lead.name}</p>
                  <p className="mt-0.5 text-sm font-medium text-amber-200/85">{lead.role}</p>
                </div>
              ) : null}

              <ul className="mt-5 flex list-none flex-wrap gap-x-2 gap-y-1.5 p-0 text-[13px] leading-relaxed text-white/80 sm:text-sm">
                {highlights.map((item, i) => (
                  <li key={item} className="inline-flex items-center gap-2 break-keep">
                    {i > 0 ? <span className="text-white/35" aria-hidden>·</span> : null}
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Link
                  href={withLocalePrefix("/services", locale)}
                  className="inline-flex min-h-[2.75rem] items-center justify-center rounded-md bg-white px-5 py-2.5 text-sm font-semibold tracking-tight text-msv-navy transition duration-200 hover:bg-slate-100"
                >
                  {ctas.accounting}
                </Link>
              </div>
            </div>

            <div className="relative mt-2 flex min-h-[18rem] items-end justify-center sm:min-h-[22rem] lg:mt-0 lg:min-h-full">
              <div
                className="pointer-events-none absolute inset-x-[8%] bottom-0 top-[22%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(251,191,36,0.12),transparent_65%)] blur-md"
                aria-hidden
              />
              <Image
                src={PORTRAIT}
                alt=""
                width={684}
                height={1024}
                className="relative z-[1] h-auto w-[min(100%,20rem)] object-contain object-bottom drop-shadow-[0_20px_48px_rgba(0,0,0,0.5)] sm:w-[min(100%,24rem)] lg:w-full lg:max-w-[22rem]"
                sizes="(max-width: 1024px) 24rem, 22rem"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
