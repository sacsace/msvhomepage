import type { Metadata } from "next";
import Image from "next/image";
import { MsvMark } from "@/components/brand/MsvMark";
import { PageHeader } from "@/components/layout/PageHeader";
import { StandardPageBody } from "@/components/layout/StandardPageBody";
import { SectionTitle } from "@/components/SectionTitle";
import { aboutCiPageCopy } from "@/lib/i18n/about-ci-locale";
import { company } from "@/lib/site-content";
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
const ciInlineLinkClass = "font-medium text-msv-blue underline-offset-4 hover:underline";
/** 가로 로고·워드마크 미리보기: 동일 픽셀 박스 안에 contain(다운로드 원본은 변경 없음) */
const ciLogoPreviewBox =
  "mt-6 flex justify-start rounded-xl border border-slate-200 bg-white px-4 py-3 sm:px-6 sm:py-4";
/**
 * 락업 PNG 세로 픽셀(79~112)이 달라도 동일 배율로 보이도록, 가장 높은 원본(112px) 기준 가로세로비로
 * 프레임 너비를 정함. 고정 높이만 쓰면 짧은 PNG가 더 크게 확대됨.
 */
const ciLogoPreviewFrame =
  "relative h-[2.94rem] min-w-0 w-auto max-w-full aspect-[1024/112] sm:h-[3.36rem] md:h-[3.5rem]"; /* `fill` 이미지 부모 */
const ciLogoFillClass = "object-contain object-left";
const ciLogoFillSizes = "(max-width: 768px) 100vw, min(100%, 52rem)";

function CiLockupPreviewImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className={ciLogoPreviewBox}>
      <div className={ciLogoPreviewFrame}>
        <Image fill src={src} alt={alt} unoptimized className={ciLogoFillClass} sizes={ciLogoFillSizes} />
      </div>
    </div>
  );
}

/** 회사 소개(about/page) 카드 본문과 동일: space-y·양끝 정렬·leading-relaxed */
const logoGuideNarrativeShell =
  "mt-4 max-w-none space-y-3 text-slate-600 [text-align:justify] [text-align-last:start] [text-justify:inter-character]";
const logoGuideNarrativeP = "m-0 text-sm leading-relaxed break-keep";

function CiLogoNarrative({ paragraphs }: { paragraphs: readonly string[] }) {
  return (
    <div className={logoGuideNarrativeShell}>
      {paragraphs.map((text, index) => (
        <p key={index} className={logoGuideNarrativeP}>
          {text}
        </p>
      ))}
    </div>
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
            <div className="mt-6 flex w-full flex-wrap items-center justify-start gap-4">
              <div className="flex shrink-0 items-center justify-start gap-3 rounded-xl border border-slate-200 bg-slate-50 px-5 py-4">
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
            <CiLockupPreviewImage src="/msv-wordmark.png" alt={wordmarkAlt} />
            <div className="mt-4 flex flex-wrap gap-3">
              <a href="/msv-wordmark.png" download="msv-wordmark.png" className={assetDownloadClass}>
                {copy.downloadWordmarkPng}
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
            <CiLockupPreviewImage src="/msv-lockup-bottomlink-navy.png" alt={copy.lockupBottomImageAlt} />
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
              eyebrow={copy.lockupDotsEyebrow}
              title={copy.lockupDotsTitle}
              spacing="tight"
              density="compact"
              headingLevel={2}
            />
            <CiLogoNarrative paragraphs={copy.lockupDotsNarrative} />
            <CiLockupPreviewImage src="/msv-lockup-sixdot-navy.png" alt={copy.lockupDotsImageAlt} />
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
              eyebrow={copy.lockupEyebrow}
              title={copy.lockupTitle}
              spacing="tight"
              density="compact"
              headingLevel={2}
            />
            <CiLogoNarrative paragraphs={copy.lockupNarrative} />
            <CiLockupPreviewImage src="/msv-lockup-navy.png" alt={copy.lockupImageAlt} />
            <div className="mt-4 flex flex-wrap gap-3">
              <a href="/msv-lockup-navy.png" download="msv-lockup-navy.png" className={assetDownloadClass}>
                {copy.downloadLockupPng}
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

          <section className={card}>
            <SectionTitle
              eyebrow={copy.supplementEyebrow}
              title={copy.supplementTitle}
              spacing="tight"
              density="compact"
              headingLevel={2}
            />
            <div className="mt-6 space-y-8">
              <div>
                <h3 className="text-sm font-semibold tracking-tight text-slate-900">{copy.contactHeading}</h3>
                <p className={`mt-2 ${body}`}>
                  {copy.contactBeforeEmail}
                  <a href={`mailto:${company.infoEmail}`} className={ciInlineLinkClass}>
                    {company.infoEmail}
                  </a>
                  {copy.contactAfterEmail}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold tracking-tight text-slate-900">{copy.legalHeading}</h3>
                <p className={`mt-2 ${body}`}>{copy.legalBody}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold tracking-tight text-slate-900">{copy.typographyHeading}</h3>
                <p className={`mt-2 ${body}`}>{copy.typographyBody}</p>
              </div>
            </div>
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
