import type { Metadata } from "next";
import Link from "next/link";
import { IncorporationScheduleChart } from "@/components/corporate-incorporation/IncorporationScheduleChart";
import { PageHeader } from "@/components/layout/PageHeader";
import { StandardPageBody } from "@/components/layout/StandardPageBody";
import { SectionTitle } from "@/components/SectionTitle";
import { corporateIncorporationServiceCopy } from "@/lib/i18n/corporate-incorporation-service-locale";
import { getRequestLocale } from "@/lib/get-request-locale";
import { staticPageSeoLocalized } from "@/lib/seo-metadata";
import { withLocalePrefix } from "@/lib/site-locale";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const copy = corporateIncorporationServiceCopy(locale);
  return staticPageSeoLocalized(
    "/services/corporate-incorporation",
    { title: copy.metaTitle, description: copy.metaDescription },
    locale,
  );
}

const capitalFeeRows: readonly { inr: number; krw: number; feeInr: number }[] = [
  { inr: 1_000_000, krw: 16_000_000, feeInr: 1_175 },
  { inr: 2_000_000, krw: 32_000_000, feeInr: 68_075 },
  { inr: 3_000_000, krw: 48_000_000, feeInr: 98_175 },
  { inr: 4_000_000, krw: 64_000_000, feeInr: 128_175 },
  { inr: 5_000_000, krw: 80_000_000, feeInr: 158_175 },
  { inr: 6_000_000, krw: 96_000_000, feeInr: 168_175 },
  { inr: 7_000_000, krw: 112_000_000, feeInr: 178_175 },
  { inr: 8_000_000, krw: 128_000_000, feeInr: 188_175 },
  { inr: 9_000_000, krw: 144_000_000, feeInr: 198_175 },
  { inr: 10_000_000, krw: 160_000_000, feeInr: 208_100 },
  { inr: 15_000_000, krw: 240_000_000, feeInr: 245_610 },
  { inr: 20_000_000, krw: 320_000_000, feeInr: 283_110 },
  { inr: 30_000_000, krw: 480_000_000, feeInr: 358_110 },
] as const;

function formatInr(n: number): string {
  return `${n.toLocaleString("en-IN")} INR`;
}

function formatKrw(n: number, locale: Awaited<ReturnType<typeof getRequestLocale>>): string {
  const loc = locale === "zh" ? "zh-CN" : locale === "en" ? "en-US" : "ko-KR";
  return `${n.toLocaleString(loc)} KRW`;
}

export default async function CorporateIncorporationServicePage() {
  const locale = await getRequestLocale();
  const L = (path: string) => withLocalePrefix(path, locale);
  const copy = corporateIncorporationServiceCopy(locale);

  return (
    <>
      <PageHeader title={copy.pageTitle} description={copy.pageDescription} descriptionWide />
      <StandardPageBody className="space-y-12 sm:space-y-14">
        <div className="flex flex-wrap justify-end gap-3">
          <Link
            href={L("/services/corporate-incorporation/apply")}
            className="inline-flex items-center justify-center rounded-xl bg-msv-navy px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-msv-navy/90"
          >
            {copy.ctaApply}
          </Link>
        </div>
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <SectionTitle
            eyebrow={copy.supportEyebrow}
            title={copy.supportTitle}
            spacing="tight"
            density="compact"
            contentWidth="full"
          />
          <ul className="mt-4 space-y-2 text-sm leading-relaxed text-slate-600">
            {copy.supportItems.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <SectionTitle
            id="corp-prep-name"
            eyebrow={copy.step1Eyebrow}
            title={copy.step1Title}
            spacing="tight"
            density="compact"
            contentWidth="full"
          />
          <ul className="mt-4 list-none space-y-3 text-sm leading-relaxed text-slate-600">
            <li>
              <span className="font-semibold text-msv-navy">{copy.step1CorpNameLead}</span> {copy.step1CorpNameBody}
            </li>
            <li>
              <span className="font-semibold text-msv-navy">{copy.step1SectorLead}</span> {copy.step1SectorBody}
            </li>
          </ul>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <SectionTitle
            eyebrow={copy.step2Eyebrow}
            title={copy.step2Title}
            spacing="tight"
            density="compact"
            contentWidth="full"
          />
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-slate-600 marker:text-msv-blue">
            {copy.incorporationSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <IncorporationScheduleChart chart={copy.scheduleChart} />
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <SectionTitle
            eyebrow={copy.step3Eyebrow}
            title={copy.step3Title}
            spacing="tight"
            density="compact"
            contentWidth="full"
          />
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-slate-600 marker:text-msv-blue">
            {copy.factoryFollowUp.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <SectionTitle
            eyebrow={copy.step4Eyebrow}
            title={copy.step4Title}
            spacing="tight"
            density="compact"
            contentWidth="full"
          />
          <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-slate-600">
            {copy.timelineItems.map((row) => (
              <li
                key={row.label}
                className="flex flex-col gap-0.5 border-b border-slate-100 py-2 last:border-0 sm:flex-row sm:items-baseline sm:justify-between"
              >
                <span className="font-medium text-msv-navy">{row.label}</span>
                <span className="text-slate-600 sm:text-right">{row.value}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs leading-relaxed text-slate-500">{copy.timelineFootnote}</p>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <SectionTitle
            eyebrow={copy.step5Eyebrow}
            title={copy.step5Title}
            spacing="tight"
            density="compact"
            contentWidth="full"
          />
          <ul className="mt-4 list-none space-y-3 text-sm leading-relaxed text-slate-600">
            {copy.step5Items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <SectionTitle
            eyebrow={copy.step6Eyebrow}
            title={copy.step6Title}
            spacing="tight"
            density="compact"
            contentWidth="full"
          />
          <p className="mt-3 text-sm leading-relaxed text-slate-600">{copy.step6Intro}</p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
            <table className="min-w-[28rem] w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th scope="col" className="px-3 py-2.5 font-semibold text-msv-navy sm:px-4">
                    {copy.tableCapitalInr}
                  </th>
                  <th scope="col" className="px-3 py-2.5 font-semibold text-msv-navy sm:px-4">
                    {copy.tableCapitalKrw}
                  </th>
                  <th scope="col" className="px-3 py-2.5 font-semibold text-msv-navy sm:px-4">
                    {copy.tableGovFeeInr}
                  </th>
                </tr>
              </thead>
              <tbody>
                {capitalFeeRows.map((row) => (
                  <tr key={row.inr} className="border-b border-slate-100 last:border-0">
                    <td className="px-3 py-2 tabular-nums text-slate-700 sm:px-4">{formatInr(row.inr)}</td>
                    <td className="px-3 py-2 tabular-nums text-slate-700 sm:px-4">{formatKrw(row.krw, locale)}</td>
                    <td className="px-3 py-2 tabular-nums text-slate-700 sm:px-4">
                      {row.feeInr.toLocaleString("en-IN")} INR
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-slate-500">{copy.step6Footnote}</p>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <SectionTitle
            eyebrow={copy.step7Eyebrow}
            title={copy.step7Title}
            spacing="tight"
            density="compact"
            contentWidth="full"
          />
          <ul className="mt-4 list-none space-y-3 text-sm leading-relaxed text-slate-600">
            {copy.step7Items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-msv-blue-soft/15 p-6 sm:p-8">
          <p className="text-sm leading-relaxed text-slate-600">{copy.closingNote}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={L("/services")}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-msv-navy transition hover:border-msv-blue/35 hover:text-msv-blue"
            >
              {copy.navBackServices}
            </Link>
            <Link
              href={L("/services/corporate-incorporation/apply")}
              className="rounded-lg border border-msv-navy/40 bg-white px-4 py-2 text-sm font-semibold text-msv-navy transition hover:bg-msv-navy/5"
            >
              {copy.navApply}
            </Link>
            <Link
              href={L("/contact")}
              className="rounded-lg bg-msv-navy px-4 py-2 text-sm font-semibold text-white transition hover:bg-msv-navy/90"
            >
              {copy.navContact}
            </Link>
          </div>
        </section>
      </StandardPageBody>
    </>
  );
}
