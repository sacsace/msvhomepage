import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { StandardPageBody } from "@/components/layout/StandardPageBody";
import { SectionTitle } from "@/components/SectionTitle";
import { findGroupCompanyBySlug } from "@/lib/group-companies";
import { getRequestLocale } from "@/lib/get-request-locale";
import {
  groupCompanyContentCopy,
  groupCompanyPageChrome,
  isGroupCompanySlug,
} from "@/lib/i18n/group-pages-locale";
import { staticPageSeoLocalized } from "@/lib/seo-metadata";
import { splitIntroParagraphs } from "@/lib/split-intro-paragraphs";
import { withLocalePrefix } from "@/lib/site-locale";
import { groupCompanies } from "@/lib/site-content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return groupCompanies.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const g = findGroupCompanyBySlug(slug);
  const locale = await getRequestLocale();
  const chrome = groupCompanyPageChrome(locale);
  if (!g) return { title: chrome.absoluteTitleSuffix };
  if (!isGroupCompanySlug(g.slug)) return { title: chrome.absoluteTitleSuffix };

  const content = groupCompanyContentCopy(g.slug, locale);
  return staticPageSeoLocalized(
    `/group/${g.slug}`,
    {
      title: g.legalName,
      description: content.metaDescription,
      absoluteTitle: `${g.legalName} | ${chrome.absoluteTitleSuffix}`,
    },
    locale,
  );
}

const cardSection = "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8";

const bodyText = "text-sm leading-relaxed text-slate-600 break-keep";

/** 카드 내부는 왼쪽 기준(가운데 `mx-auto` 없음). 읽기 폭만 `max-w-3xl`로 제한 */
const introColumn = "w-full max-w-3xl text-pretty text-left";

/** 소개 카드: 카드 패딩 안쪽까지 전폭(빨간선까지 영역) */
const introColumnFullWidth = "w-full max-w-none text-pretty text-left";

export default async function GroupCompanyPage({ params }: Props) {
  const { slug } = await params;
  const g = findGroupCompanyBySlug(slug);
  if (!g) notFound();
  if (!isGroupCompanySlug(g.slug)) notFound();

  const locale = await getRequestLocale();
  const L = (path: string) => withLocalePrefix(path, locale);
  const chrome = groupCompanyPageChrome(locale);
  const content = groupCompanyContentCopy(g.slug, locale);

  const pageHeaderDescription =
    g.menuLabel === g.legalName ? content.role : `${g.menuLabel} — ${content.role}`;

  const aboutParagraphs = splitIntroParagraphs(content.intro);
  const highlightItems = content.highlights;
  const majorCustomerRows = content.majorCustomerRows;
  const majorCustomersList = content.majorCustomers ?? g.majorCustomers ?? [];

  /** 히어로 하단: 네이비 위 흰 세로 캡슐(공통) — 로고는 본문 「소개」에 배치 */
  const groupHeroBelow = (
    <div className="mt-2 flex max-w-full flex-wrap items-center gap-3 sm:gap-4">
      <span
        className="h-16 w-1.5 shrink-0 rounded-full bg-white shadow-[0_0_0_1px_rgba(255,255,255,0.12)] sm:h-[5.25rem] sm:w-2"
        aria-hidden
      />
    </div>
  );

  return (
    <>
      <PageHeader
        title={g.legalName}
        description={pageHeaderDescription}
        descriptionWide
        belowDescription={groupHeroBelow}
      />
      <StandardPageBody className="space-y-12 sm:space-y-14">
        {g.website || g.profilePdf ? (
          <section className={cardSection}>
            <p className="msv-eyebrow">{chrome.quickEyebrow}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {g.website ? (
                <a
                  href={g.website}
                  className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-msv-navy transition hover:border-msv-blue/35 hover:text-msv-blue"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {chrome.websiteLabel}
                </a>
              ) : null}
              {g.profilePdf ? (
                <a
                  href={g.profilePdf}
                  className="rounded-lg border border-msv-navy/40 bg-white px-4 py-2 text-sm font-semibold text-msv-navy transition hover:bg-msv-navy/5"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {chrome.pdfLabel}
                </a>
              ) : null}
            </div>
          </section>
        ) : null}

        <section className={cardSection}>
          <div className={introColumnFullWidth}>
            <SectionTitle
              eyebrow={chrome.aboutEyebrow}
              title={chrome.aboutTitle}
              spacing="tight"
              density="compact"
              contentWidth="full"
            />
            <div className="mt-4 space-y-3 text-justify [text-align-last:start]">
              {aboutParagraphs.map((para, i) => (
                <p key={`${g.slug}-about-${i}`} className={`m-0 ${bodyText}`}>
                  {para}
                </p>
              ))}
            </div>
            {g.logoSrc ? (
              <div className="mt-8">
                <div className="relative mx-auto h-20 w-60 max-w-full rounded-xl bg-white p-3 sm:mx-0 sm:h-[5.5rem] sm:w-[15rem]">
                  <Image
                    src={g.logoSrc}
                    alt={content.logoAlt}
                    fill
                    className="object-contain object-left"
                    sizes="240px"
                  />
                </div>
              </div>
            ) : null}
          </div>
        </section>

        {g.gallery && g.gallery.length > 0 ? (
          <section className={cardSection}>
            <SectionTitle
              eyebrow={chrome.galleryEyebrow}
              title={chrome.galleryTitle}
              spacing="tight"
              density="compact"
              headingLevel={3}
              contentWidth="full"
            />
            <ul className="mt-6 grid list-none gap-4 sm:grid-cols-2 sm:gap-5">
              {g.gallery.map((img) => (
                <li
                  key={img.src}
                  className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
                >
                  <div className="relative aspect-[4/3] w-full bg-slate-100">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1152px) 50vw, 560px"
                    />
                  </div>
                  {img.caption ? (
                    <p className="border-t border-slate-200 px-4 py-3 text-sm leading-relaxed text-slate-600 sm:px-5">
                      {img.caption}
                    </p>
                  ) : null}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section className={cardSection}>
          <div className={introColumn}>
            <SectionTitle
              eyebrow={chrome.highlightsEyebrow}
              title={chrome.highlightsTitle}
              spacing="tight"
              density="compact"
              headingLevel={3}
              contentWidth="full"
            />
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-600 marker:text-msv-blue">
              {highlightItems.map((h) => (
                <li key={h} className="pl-1">
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {majorCustomerRows && majorCustomerRows.length > 0 ? (
          <section className={cardSection}>
            <div className={introColumn}>
              <SectionTitle
                eyebrow={chrome.majorCustomersEyebrow}
                title={chrome.majorCustomersTitle}
                spacing="tight"
                density="compact"
                headingLevel={3}
                contentWidth="full"
              />
              <ul className="mt-4 grid list-none gap-2.5 sm:grid-cols-2 sm:gap-3">
                {majorCustomerRows.map((row) => (
                  <li
                    key={row.name}
                    className="flex min-h-[3rem] items-center gap-3 rounded-lg border border-slate-200 bg-slate-50/60 px-3 py-2.5 sm:px-3.5"
                  >
                    {row.logoSrc ? (
                      <Image
                        src={row.logoSrc}
                        alt=""
                        width={32}
                        height={32}
                        unoptimized
                        className="size-8 shrink-0 rounded object-contain"
                        aria-hidden
                      />
                    ) : (
                      <span
                        className="flex size-8 shrink-0 items-center justify-center rounded border border-dashed border-slate-300 bg-white text-[10px] font-medium text-slate-400"
                        aria-hidden
                      >
                        —
                      </span>
                    )}
                    <span className="min-w-0 text-sm font-medium leading-snug text-slate-800">{row.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : majorCustomersList.length > 0 ? (
          <section className={cardSection}>
            <div className={introColumn}>
              <SectionTitle
                eyebrow={chrome.majorCustomersEyebrow}
                title={chrome.majorCustomersTitle}
                spacing="tight"
                density="compact"
                headingLevel={3}
                contentWidth="full"
              />
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-600 marker:text-msv-blue">
                {majorCustomersList.map((name) => (
                  <li key={name} className="pl-1">
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}

        <section className="rounded-2xl border border-slate-200 bg-msv-blue-soft/15 p-6 sm:p-8">
          <p className={`${introColumn} ${bodyText}`}>{chrome.footerLead}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={L("/group")}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-msv-navy transition hover:border-msv-blue/35 hover:text-msv-blue"
            >
              {chrome.linkGroupList}
            </Link>
            <Link
              href={L("/about")}
              className="rounded-lg border border-msv-navy/40 bg-white px-4 py-2 text-sm font-semibold text-msv-navy transition hover:bg-msv-navy/5"
            >
              {chrome.linkAbout}
            </Link>
          </div>
        </section>
      </StandardPageBody>
    </>
  );
}
