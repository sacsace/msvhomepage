import type { Metadata } from "next";
import { Fragment } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { StandardPageBody } from "@/components/layout/StandardPageBody";
import { getRequestLocale } from "@/lib/get-request-locale";
import type { RecruitmentProcessStep } from "@/lib/i18n/recruitment-support-service-locale";
import { recruitmentSupportServiceCopy } from "@/lib/i18n/recruitment-support-service-locale";
import { staticPageSeoLocalized } from "@/lib/seo-metadata";
import { withLocalePrefix } from "@/lib/site-locale";

const body = "text-sm leading-relaxed text-slate-700 break-keep";
const sectionShell = "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8";
const footSectionShell =
  "rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm sm:px-8 sm:py-6";
/** 데스크톱: flex row `items-stretch`로 행 내 카드 높이 동일 + 내용만큼 늘어나 스크롤 없음 */
const stepCard =
  "flex w-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.03),0_8px_24px_rgba(15,23,42,0.04)] transition-colors duration-200 hover:border-slate-300/90 sm:p-6 lg:flex-1 lg:basis-0 lg:self-stretch";
const stepBullets =
  "mt-3 flex-1 space-y-1.5 text-[13px] leading-snug text-slate-700 sm:text-sm sm:leading-snug";
const scopeCard =
  "rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm font-medium leading-snug text-slate-800 transition-[transform,border-color,box-shadow,background-color] duration-300 ease-out will-change-transform sm:px-5 sm:py-4 hover:-translate-y-px hover:border-msv-navy/20 hover:bg-slate-50/90 hover:shadow-sm";

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 12h12m0 0l-5-5m5 5l-5 5" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowDownIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 5v12m0 0l-5-5m5 5l5-5" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ProcessConnector({ variant }: { variant: "vertical" | "horizontal" }) {
  if (variant === "vertical") {
    return (
      <div className="flex shrink-0 flex-col items-center py-2 lg:hidden" aria-hidden>
        <div className="h-12 w-px bg-gradient-to-b from-slate-300 via-slate-300 to-slate-200" />
        <div className="mt-1 flex w-full max-w-[5rem] items-center justify-center gap-1">
          <div className="h-px flex-1 bg-slate-300" />
          <ArrowDownIcon className="shrink-0 text-slate-500" />
        </div>
      </div>
    );
  }
  return (
    <div
      className="hidden w-[clamp(2.25rem,4vw,3.5rem)] shrink-0 items-center self-stretch lg:flex"
      aria-hidden
    >
      <div className="flex w-full items-center">
        <div className="h-px flex-1 bg-slate-300" />
        <ArrowRightIcon className="shrink-0 text-slate-500" />
      </div>
    </div>
  );
}

function ProcessStepCard({ step }: { step: RecruitmentProcessStep }) {
  return (
    <article className={stepCard}>
      <div className="shrink-0">
        <div className="flex flex-wrap items-end gap-x-3 gap-y-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-msv-navy/40">{step.labelPrefix}</p>
          <p className="text-4xl font-semibold leading-none tracking-[-0.04em] text-msv-navy/[0.2] sm:text-[2.75rem]">
            {step.labelNumber}
          </p>
        </div>
        <h3 className="mt-3 whitespace-pre-line text-[15px] font-bold leading-snug text-msv-navy sm:text-base">
          {step.title}
        </h3>
      </div>
      <ul className={`${stepBullets} border-t border-slate-100 pt-3`}>
        {step.bullets.map((item) => (
          <li
            key={item}
            className="relative whitespace-pre-line pl-3.5 before:absolute before:left-0 before:top-[0.5em] before:h-1 before:w-1 before:rounded-full before:bg-msv-navy/30"
          >
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const copy = recruitmentSupportServiceCopy(locale);
  return staticPageSeoLocalized(
    "/services/recruitment-support",
    { title: copy.metaTitle, description: copy.metaDescription },
    locale,
  );
}

export default async function RecruitmentSupportServicePage() {
  const locale = await getRequestLocale();
  const L = (path: string) => withLocalePrefix(path, locale);
  const copy = recruitmentSupportServiceCopy(locale);
  const steps = copy.processSteps;

  return (
    <>
      <PageHeader
        eyebrow={copy.heroEyebrow}
        title={copy.pageTitle}
        belowDescription={
          <p className="max-w-[760px] whitespace-pre-line text-[15px] font-normal leading-[1.7] tracking-[-0.01em] text-white/88 break-keep sm:text-[17px]">
            {copy.pageDescription}
          </p>
        }
      />
      <StandardPageBody className="space-y-8">
        <section className={sectionShell}>
          <h2 className="text-lg font-bold text-msv-navy">{copy.processTitle}</h2>
          <p className={`mt-3 ${body}`}>{copy.processBlurb}</p>

          <div className="mt-8">
            <div className="flex flex-col lg:flex-row lg:items-stretch lg:justify-center">
              {steps.map((step, i) => (
                <Fragment key={`${step.labelPrefix}-${step.labelNumber}`}>
                  <ProcessStepCard step={step} />
                  {i < steps.length - 1 ? (
                    <>
                      <ProcessConnector variant="vertical" />
                      <ProcessConnector variant="horizontal" />
                    </>
                  ) : null}
                </Fragment>
              ))}
            </div>
          </div>

          <p className="mt-8 text-sm font-semibold leading-relaxed text-msv-navy">{copy.processClosing}</p>
        </section>

        <section className={sectionShell}>
          <h2 className="text-lg font-bold text-msv-navy">{copy.scopeTitle}</h2>
          <p className={`mt-3 ${body}`}>{copy.scopeBlurb}</p>
          <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            {copy.scopeItems.map((item) => (
              <li key={item} className={scopeCard}>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className={footSectionShell}>
          <p className="whitespace-pre-line text-sm leading-relaxed text-slate-600">{copy.footNote}</p>
          <div className="mt-5 flex flex-wrap gap-4">
            <Link
              href={L("/services")}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-msv-navy transition hover:border-msv-blue/35 hover:text-msv-blue"
            >
              {copy.backToServices}
            </Link>
            <Link
              href={L("/contact")}
              className="rounded-lg bg-msv-navy px-4 py-2 text-sm font-semibold text-white transition hover:bg-msv-navy/90"
            >
              {copy.contactCta}
            </Link>
          </div>
        </section>
      </StandardPageBody>
    </>
  );
}
