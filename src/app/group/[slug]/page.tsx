import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { MagazineSpreadSection } from "@/components/magazine/MagazineSpreadSection";
import { homeTypo } from "@/lib/home-typography";
import { findGroupCompanyBySlug } from "@/lib/group-companies";
import { getRequestLocale } from "@/lib/get-request-locale";
import {
  groupCompanyContentCopy,
  groupCompanyPageChrome,
  isGroupCompanySlug,
} from "@/lib/i18n/group-pages-locale";
import { publicPageBodyShell } from "@/lib/public-page-styles";
import { staticPageSeoLocalized, noIndexPageSeo } from "@/lib/seo-metadata";
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
  if (!g) return noIndexPageSeo({ title: chrome.absoluteTitleSuffix });
  if (!isGroupCompanySlug(g.slug)) return noIndexPageSeo({ title: chrome.absoluteTitleSuffix });

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

const btnPrimary =
  "inline-flex min-h-[2.75rem] items-center justify-center border border-msv-ink bg-msv-ink px-6 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-transparent hover:text-msv-ink";
const btnSecondary =
  "inline-flex min-h-[2.75rem] items-center justify-center border border-msv-ink/30 bg-transparent px-6 text-xs font-semibold uppercase tracking-[0.18em] text-msv-ink transition hover:border-msv-ink";

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

  let sectionIndex = 1;
  const nextIndex = () => String(sectionIndex++).padStart(2, "0");
  const toneFor = (index: string): "white" | "paper" =>
    Number(index) % 2 === 1 ? "white" : "paper";

  const aboutIndex = nextIndex();
  const galleryIndex = g.gallery && g.gallery.length > 0 ? nextIndex() : null;
  const highlightsIndex = nextIndex();
  const customersIndex =
    (majorCustomerRows && majorCustomerRows.length > 0) || majorCustomersList.length > 0
      ? nextIndex()
      : null;
  const locationIndex = g.location ? nextIndex() : null;
  const footerIndex = nextIndex();
  const hasQuickLinks = Boolean(g.website || g.profilePdf);

  return (
    <>
      <PageHeader title={g.legalName} description={pageHeaderDescription} descriptionWide />
      <div className={`${publicPageBodyShell} !pt-0`}>
        <div className="mx-auto max-w-6xl">
          <MagazineSpreadSection index={aboutIndex} label={chrome.aboutEyebrow} tone={toneFor(aboutIndex)}>
            <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-12">
              <div className="lg:col-span-7">
                <h2 className={homeTypo.sectionHeading}>{chrome.aboutTitle}</h2>
                <div className="msv-magazine-rule mt-6 max-w-[6rem]" aria-hidden />
                <div className="mt-7 space-y-4">
                  {aboutParagraphs.map((para, i) => (
                    <p key={`${g.slug}-about-${i}`} className={`m-0 ${homeTypo.body}`}>
                      {para}
                    </p>
                  ))}
                </div>
                {hasQuickLinks ? (
                  <div className="mt-10 flex flex-wrap gap-3">
                    {g.website ? (
                      <a
                        href={g.website}
                        className={btnPrimary}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {chrome.websiteLabel}
                      </a>
                    ) : null}
                    {g.profilePdf ? (
                      <a
                        href={g.profilePdf}
                        className={btnSecondary}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {chrome.pdfLabel}
                      </a>
                    ) : null}
                  </div>
                ) : null}
              </div>
              {g.logoSrc ? (
                <div className="lg:col-span-5 lg:pt-10">
                  <div className="relative h-28 w-full max-w-[18rem] border-b border-msv-ink/15 pb-8">
                    <Image
                      src={g.logoSrc}
                      alt={content.logoAlt}
                      fill
                      className="object-contain object-left"
                      sizes="288px"
                      priority
                    />
                  </div>
                  <p className="mt-5 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-msv-mint">
                    {content.role}
                  </p>
                </div>
              ) : null}
            </div>
          </MagazineSpreadSection>

          {galleryIndex && g.gallery && g.gallery.length > 0 ? (
            <MagazineSpreadSection index={galleryIndex} label={chrome.galleryEyebrow} tone={toneFor(galleryIndex)}>
              <h2 className={homeTypo.sectionHeading}>{chrome.galleryTitle}</h2>
              <div className="msv-magazine-rule mt-6 max-w-[6rem]" aria-hidden />
              <ul className="mt-10 grid list-none gap-8 p-0 sm:grid-cols-2">
                {g.gallery.map((img) => (
                  <li key={img.src} className="min-w-0">
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-msv-slate-wash/20">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1152px) 50vw, 560px"
                      />
                    </div>
                    {img.caption ? (
                      <p className={`mt-3 ${homeTypo.bodySm}`}>{img.caption}</p>
                    ) : null}
                  </li>
                ))}
              </ul>
            </MagazineSpreadSection>
          ) : null}

          <MagazineSpreadSection
            index={highlightsIndex}
            label={chrome.highlightsEyebrow}
            tone={toneFor(highlightsIndex)}
          >
            <h2 className={homeTypo.sectionHeading}>{chrome.highlightsTitle}</h2>
            <div className="msv-magazine-rule mt-6 max-w-[6rem]" aria-hidden />
            <ul className="mt-8 list-none border-t border-msv-ink/15 p-0">
              {highlightItems.map((h, i) => (
                <li
                  key={h}
                  className="grid grid-cols-[3rem_minmax(0,1fr)] gap-4 border-b border-msv-ink/10 py-5"
                >
                  <span className="font-sans text-sm font-bold tabular-nums tracking-[-0.03em] text-msv-ink/25">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm leading-relaxed text-slate-700 sm:text-[15px]">{h}</span>
                </li>
              ))}
            </ul>
          </MagazineSpreadSection>

          {customersIndex && majorCustomerRows && majorCustomerRows.length > 0 ? (
            <MagazineSpreadSection
              index={customersIndex}
              label={chrome.majorCustomersEyebrow}
              tone={toneFor(customersIndex)}
            >
              <h2 className={homeTypo.sectionHeading}>{chrome.majorCustomersTitle}</h2>
              <div className="msv-magazine-rule mt-6 max-w-[6rem]" aria-hidden />
              <ul className="mt-8 grid list-none grid-cols-1 gap-0 border-t border-msv-ink/15 p-0 sm:grid-cols-3">
                {majorCustomerRows.map((row, i) => (
                  <li
                    key={row.name}
                    className={`flex items-start gap-3 border-b border-msv-ink/10 py-5 sm:px-4 ${
                      i % 3 !== 2 ? "sm:border-r" : ""
                    }`}
                  >
                    {row.logoSrc ? (
                      <Image
                        src={row.logoSrc}
                        alt=""
                        width={28}
                        height={28}
                        unoptimized
                        className="mt-0.5 size-7 shrink-0 object-contain"
                        aria-hidden
                      />
                    ) : (
                      <span
                        className="mt-1 h-px w-4 shrink-0 bg-msv-ink/25"
                        aria-hidden
                      />
                    )}
                    <span className="min-w-0 text-sm font-medium leading-snug text-msv-ink">
                      {row.name}
                    </span>
                  </li>
                ))}
              </ul>
            </MagazineSpreadSection>
          ) : customersIndex && majorCustomersList.length > 0 ? (
            <MagazineSpreadSection
              index={customersIndex}
              label={chrome.majorCustomersEyebrow}
              tone={toneFor(customersIndex)}
            >
              <h2 className={homeTypo.sectionHeading}>{chrome.majorCustomersTitle}</h2>
              <div className="msv-magazine-rule mt-6 max-w-[6rem]" aria-hidden />
              <ul className="mt-8 list-none border-t border-msv-ink/15 p-0">
                {majorCustomersList.map((name, i) => (
                  <li
                    key={name}
                    className="grid grid-cols-[3rem_minmax(0,1fr)] gap-4 border-b border-msv-ink/10 py-4"
                  >
                    <span className="font-sans text-sm font-bold tabular-nums text-msv-ink/25">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm leading-relaxed text-slate-700">{name}</span>
                  </li>
                ))}
              </ul>
            </MagazineSpreadSection>
          ) : null}

          {locationIndex && g.location ? (
            <MagazineSpreadSection
              index={locationIndex}
              label={chrome.locationEyebrow}
              tone={toneFor(locationIndex)}
            >
              <h2 className={homeTypo.sectionHeading}>{chrome.locationTitle}</h2>
              <div className="msv-magazine-rule mt-6 max-w-[6rem]" aria-hidden />
              {g.location.addressLine ? (
                <p className={`mt-6 max-w-2xl ${homeTypo.body}`}>{g.location.addressLine}</p>
              ) : null}
              <div className="mt-8 overflow-hidden border border-msv-ink/15 bg-white">
                <iframe
                  title={`${g.legalName} (Google Maps)`}
                  src={g.location.embedSrc}
                  className="h-[220px] w-full border-0 sm:h-[260px] lg:h-[300px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
              <p className="mt-4">
                <a
                  href={g.location.mapUrl}
                  className={homeTypo.linkCta}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {chrome.openInGoogleMaps}
                </a>
              </p>
            </MagazineSpreadSection>
          ) : null}

          <MagazineSpreadSection
            index={footerIndex}
            label="Navigate"
            tone={toneFor(footerIndex)}
          >
            <p className={`max-w-2xl ${homeTypo.body}`}>{chrome.footerLead}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={L("/group")} className={btnSecondary}>
                {chrome.linkGroupList}
              </Link>
              <Link href={L("/about")} className={btnPrimary}>
                {chrome.linkAbout}
              </Link>
            </div>
          </MagazineSpreadSection>
        </div>
      </div>
    </>
  );
}
