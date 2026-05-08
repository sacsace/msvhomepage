import type { Metadata } from "next";
import { MsvMark } from "@/components/brand/MsvMark";
import { MsvWordmark } from "@/components/brand/MsvWordmark";
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
            <p className={`mt-4 ${body}`}>{copy.symbolIntro}</p>
            <div className="mt-6 flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-5 py-4">
                <MsvMark className="h-14 w-14 sm:h-16 sm:w-16" />
                <span className="text-xs text-slate-500">PNG / SVG — 소형 출력</span>
              </div>
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
            <p className={`mt-4 ${body}`}>{copy.wordmarkBody}</p>
            <div className="mt-6 rounded-xl border border-slate-200 bg-white px-4 py-5 sm:px-6">
              <MsvWordmark alt={wordmarkAlt} heightClass="h-10 sm:h-11" className="max-w-full" />
            </div>
            <p className="mt-3 text-xs text-slate-500">
              {locale === "ko"
                ? "원본 파일: public/msv-wordmark.png"
                : locale === "zh"
                  ? "源文件：public/msv-wordmark.png"
                  : "Source asset: public/msv-wordmark.png"}
            </p>
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
