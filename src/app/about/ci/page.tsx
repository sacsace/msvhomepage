import type { Metadata } from "next";
import Image from "next/image";
import { MsvMark } from "@/components/brand/MsvMark";
import { PageHeader } from "@/components/layout/PageHeader";
import { StandardPageBody } from "@/components/layout/StandardPageBody";
import { SectionTitle } from "@/components/SectionTitle";
import { aboutCiPageCopy } from "@/lib/i18n/about-ci-locale";
import { getRequestLocale } from "@/lib/get-request-locale";
import { staticPageSeoLocalized } from "@/lib/seo-metadata";
import { withLocalePrefix } from "@/lib/site-locale";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const copy = aboutCiPageCopy(locale);
  return staticPageSeoLocalized("/about/ci", { title: copy.metaTitle, description: copy.metaDescription }, locale);
}

export const revalidate = 60;

const card = "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8";
const body = "text-sm leading-relaxed text-slate-600 break-keep";
/** 심볼 설명 — 본문보다 줄간격 좁게 */
const bodySymbolIntro = "text-sm leading-snug text-slate-600 break-keep";
const assetDownloadClass =
  "inline-flex items-center rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-msv-blue shadow-sm hover:bg-slate-50 sm:text-sm";
/** 가로 로고·워드마크 미리보기: 동일 픽셀 박스 안에 contain(다운로드 원본은 변경 없음) */
const ciLogoPreviewBox =
  "mt-6 rounded-xl border border-slate-200 bg-white px-4 py-3 sm:px-6 sm:py-4";
/** 네 로고 공통 표시 영역 — 높이·최대 너비 고정으로 바운딩 박스 동일 */
const ciLogoPreviewFrame =
  "relative mx-auto h-[4.2rem] w-full max-w-[min(100%,52rem)] sm:h-[4.8rem] md:h-[5rem]";
const ciLogoFillClass = "object-contain object-center";
const ciLogoFillSizes = "(max-width: 768px) 100vw, min(100%, 52rem)";

function CiLogoNarrative({ paragraphs }: { paragraphs: readonly string[] }) {
  return (
    <>
      {paragraphs.map((text, i) => (
        <p key={i} className={i === 0 ? `mt-4 ${body}` : `mt-3 ${body}`}>
          {text}
        </p>
      ))}
    </>
  );
}

export default async function AboutCiPage() {
  const locale = await getRequestLocale();
  const copy = aboutCiPageCopy(locale);
  const L = (p: string) => withLocalePrefix(p, locale);
  const wordmarkAlt =
    locale === "en"
      ? "Minsub Ventures wordmark"
      : locale === "zh"
        ? "Minsub Ventures 横排标识"
        : "Minsub Ventures 워드마크";

  return (
    <>
      <PageHeader surface="homeHero" title={copy.pageTitle} description={copy.pageLead} />
      <StandardPageBody width="6xl">
        <div className="space-y-10">
          <section className={card}>
            <SectionTitle
              eyebrow={copy.symbolEyebrow}
              title={copy.symbolTitle}
              spacing="tight"
              density="compact"
              headingLevel={2}
            />
            <p className={`mt-4 ${bodySymbolIntro}`}>{copy.symbolIntro}</p>
            <p className={`mt-3 ${bodySymbolIntro}`}>{copy.symbolIntroSecondary}</p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-5 py-4">
                <MsvMark className="h-14 w-14 sm:h-16 sm:w-16" />
              </div>
              <a href="/msv-mark.svg" download="msv-mark.svg" className={assetDownloadClass}>
                {copy.downloadMarkSvg}
              </a>
            </div>
          </section>

          <section className={card}>
            <SectionTitle
              eyebrow={copy.wordmarkEyebrow}
              title={copy.wordmarkTitle}
              spacing="tight"
              density="compact"
              headingLevel={2}
            />
            <CiLogoNarrative paragraphs={copy.wordmarkNarrative} />
            <div className={ciLogoPreviewBox}>
              <div className={ciLogoPreviewFrame}>
                <Image
                  fill
                  src="/msv-wordmark.png"
                  alt={wordmarkAlt}
                  unoptimized
                  className={ciLogoFillClass}
                  sizes={ciLogoFillSizes}
                />
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <a href="/msv-wordmark.png" download="msv-wordmark.png" className={assetDownloadClass}>
                {copy.downloadWordmarkPng}
              </a>
            </div>
          </section>

          <section className={card}>
            <SectionTitle
              eyebrow={copy.lockupEyebrow}
              title={copy.lockupTitle}
              spacing="tight"
              density="compact"
              headingLevel={2}
            />
            <CiLogoNarrative paragraphs={copy.lockupNarrative} />
            <div className={ciLogoPreviewBox}>
              <div className={ciLogoPreviewFrame}>
                <Image
                  fill
                  src="/msv-lockup-navy.png"
                  alt={copy.lockupImageAlt}
                  unoptimized
                  className={ciLogoFillClass}
                  sizes={ciLogoFillSizes}
                />
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <a href="/msv-lockup-navy.png" download="msv-lockup-navy.png" className={assetDownloadClass}>
                {copy.downloadLockupPng}
              </a>
            </div>
          </section>

          <section className={card}>
            <SectionTitle
              eyebrow={copy.lockupDotsEyebrow}
              title={copy.lockupDotsTitle}
              spacing="tight"
              density="compact"
              headingLevel={2}
            />
            <CiLogoNarrative paragraphs={copy.lockupDotsNarrative} />
            <div className={ciLogoPreviewBox}>
              <div className={ciLogoPreviewFrame}>
                <Image
                  fill
                  src="/msv-lockup-sixdot-navy.png"
                  alt={copy.lockupDotsImageAlt}
                  unoptimized
                  className={ciLogoFillClass}
                  sizes={ciLogoFillSizes}
                />
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href="/msv-lockup-sixdot-navy.png"
                download="msv-lockup-sixdot-navy.png"
                className={assetDownloadClass}
              >
                {copy.downloadLockupDotsPng}
              </a>
            </div>
          </section>

          <section className={card}>
            <SectionTitle
              eyebrow={copy.lockupBottomEyebrow}
              title={copy.lockupBottomTitle}
              spacing="tight"
              density="compact"
              headingLevel={2}
            />
            <CiLogoNarrative paragraphs={copy.lockupBottomNarrative} />
            <div className={ciLogoPreviewBox}>
              <div className={ciLogoPreviewFrame}>
                <Image
                  fill
                  src="/msv-lockup-bottomlink-navy.png"
                  alt={copy.lockupBottomImageAlt}
                  unoptimized
                  className={ciLogoFillClass}
                  sizes={ciLogoFillSizes}
                />
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href="/msv-lockup-bottomlink-navy.png"
                download="msv-lockup-bottomlink-navy.png"
                className={assetDownloadClass}
              >
                {copy.downloadLockupBottomPng}
              </a>
            </div>
          </section>

          <section className={card}>
            <SectionTitle
              eyebrow={copy.colorEyebrow}
              title={copy.colorTitle}
              spacing="tight"
              density="compact"
              headingLevel={2}
            />
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="overflow-hidden rounded-xl border border-slate-200">
                <div className="h-24" style={{ backgroundColor: copy.navyHex }} />
                <div className="p-4">
                  <p className="font-semibold text-slate-900">{copy.navyLabel}</p>
                  <p className="mt-1 font-mono text-xs text-slate-600">{copy.navyHex}</p>
                  <p className={`mt-2 ${body}`}>{copy.navyUsage}</p>
                </div>
              </div>
              <div className="overflow-hidden rounded-xl border border-slate-200">
                <div className="h-24" style={{ backgroundColor: copy.blueHex }} />
                <div className="p-4">
                  <p className="font-semibold text-slate-900">{copy.blueLabel}</p>
                  <p className="mt-1 font-mono text-xs text-slate-600">{copy.blueHex}</p>
                  <p className={`mt-2 ${body}`}>{copy.blueUsage}</p>
                </div>
              </div>
            </div>
          </section>

          <section className={card}>
            <SectionTitle
              eyebrow={copy.usageEyebrow}
              title={copy.usageTitle}
              spacing="tight"
              density="compact"
              headingLevel={2}
            />
            <ul className={`mt-4 list-disc space-y-2 pl-5 ${body} marker:text-msv-blue`}>
              {copy.usageBullets.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </section>

          <p className={`text-center text-sm text-slate-500`}>
            <a href={L("/about")} className="font-medium text-msv-blue underline-offset-4 hover:underline">
              {locale === "ko" ? "← 회사 소개" : locale === "zh" ? "← 公司简介" : "← About the company"}
            </a>
          </p>
        </div>
      </StandardPageBody>
    </>
  );
}
