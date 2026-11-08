import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { MagazineSpreadSection } from "@/components/magazine/MagazineSpreadSection";
import { homeTypo } from "@/lib/home-typography";
import { getRequestLocale } from "@/lib/get-request-locale";
import { softwareLandingCopy } from "@/lib/i18n/software-landing-locale";
import { publicPageBodyShell } from "@/lib/public-page-styles";
import { staticPageSeoLocalized } from "@/lib/seo-metadata";
import { withLocalePrefix } from "@/lib/site-locale";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const c = softwareLandingCopy(locale);
  return staticPageSeoLocalized("/software", { title: c.metaTitle, description: c.metaDescription }, locale);
}

export default async function SoftwarePage() {
  const locale = await getRequestLocale();
  const c = softwareLandingCopy(locale);
  const L = (path: string) => withLocalePrefix(path, locale);

  return (
    <>
      <PageHeader title={c.pageTitle} description={c.pageDescription} descriptionWide pattern="folio" />
      <div className={`${publicPageBodyShell} !pt-0`}>
        <div className="mx-auto max-w-6xl">
          <MagazineSpreadSection index="01" label={c.productsEyebrow} tone="white">
            <h2 className={homeTypo.sectionHeading}>{c.productsTitle}</h2>
            <div className="msv-magazine-rule mt-6 max-w-[6rem]" aria-hidden />
            <p className={`mt-6 max-w-2xl ${homeTypo.body}`}>{c.productsLead}</p>

            <ul className="mt-10 grid list-none grid-cols-1 gap-0 border-t border-msv-ink/15 p-0 sm:grid-cols-2">
              {c.cards.map((card, i) => {
                const external = card.href.startsWith("http://") || card.href.startsWith("https://");
                const href = external ? card.href : L(card.href);
                const cta = external ? c.openSite : c.viewDetail;
                const cellClass = `flex h-full flex-col border-b border-msv-ink/10 py-10 transition hover:bg-[#f7f7f7] sm:px-8 ${
                  i % 2 === 0 ? "sm:border-r sm:border-msv-ink/10" : ""
                }`;
                const cell = (
                  <>
                    <span className="font-sans text-4xl font-bold tabular-nums leading-none tracking-[-0.06em] text-msv-ink/15">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className={`mt-6 ${homeTypo.itemTitle}`}>{card.title}</h3>
                    <p className={`mt-3 flex-1 ${homeTypo.bodySm}`}>{card.desc}</p>
                    <span className={`mt-6 inline-flex ${homeTypo.linkCta}`}>{cta}</span>
                  </>
                );

                return (
                  <li key={card.href} className="min-h-0">
                    {external ? (
                      <a href={href} target="_blank" rel="noopener noreferrer" className={cellClass}>
                        {cell}
                      </a>
                    ) : (
                      <Link href={href} className={cellClass}>
                        {cell}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </MagazineSpreadSection>

          <MagazineSpreadSection id="si" index="02" label={c.siEyebrow} tone="paper">
            <h2 className={homeTypo.sectionHeading}>{c.siTitle}</h2>
            <div className="msv-magazine-rule mt-6 max-w-[6rem]" aria-hidden />
            <p className={`mt-6 max-w-2xl ${homeTypo.body}`}>{c.siLead}</p>

            <ul className="mt-10 grid list-none grid-cols-1 gap-0 border-t border-msv-ink/15 p-0 lg:grid-cols-3">
              {c.siPillars.map((p, i) => (
                <li
                  key={p.title}
                  className={`border-b border-msv-ink/10 py-8 lg:border-b-0 lg:px-6 lg:py-10 ${
                    i < c.siPillars.length - 1 ? "lg:border-r lg:border-msv-ink/10" : ""
                  } ${i === 0 ? "lg:pl-0" : ""}`}
                >
                  <span className="font-sans text-3xl font-bold tabular-nums leading-none tracking-[-0.06em] text-msv-ink/15">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className={`mt-5 ${homeTypo.itemTitle}`}>{p.title}</h3>
                  <p className={`mt-3 ${homeTypo.bodySm}`}>{p.body}</p>
                </li>
              ))}
            </ul>

            <Link href={L("/contact")} className={`mt-10 inline-flex ${homeTypo.linkCta}`}>
              {c.contactCta}
            </Link>
          </MagazineSpreadSection>

          <MagazineSpreadSection id="web" index="03" label={c.webEyebrow} tone="white">
            <h2 className={homeTypo.sectionHeading}>{c.webTitle}</h2>
            <div className="msv-magazine-rule mt-6 max-w-[6rem]" aria-hidden />
            <p className={`mt-6 max-w-2xl ${homeTypo.body}`}>{c.webLead}</p>

            <ul className="mt-10 list-none border-t border-msv-ink/15 p-0">
              {c.webSites.map((site, i) => (
                <li key={site.href} className="border-b border-msv-ink/10">
                  <a
                    href={site.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group grid grid-cols-[3rem_minmax(0,1fr)_auto] items-baseline gap-4 py-5 transition hover:bg-[#f7f7f7] sm:grid-cols-[4rem_minmax(0,1fr)_auto] sm:gap-6"
                  >
                    <span className="font-sans text-sm font-bold tabular-nums tracking-[-0.03em] text-msv-ink/25">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0">
                      <span className="block font-sans text-[1.05rem] font-semibold tracking-[-0.02em] text-msv-ink group-hover:underline group-hover:underline-offset-4">
                        {site.label}
                      </span>
                      <span className="mt-1 block text-sm text-slate-500">{site.note}</span>
                    </span>
                    <span className="shrink-0 text-xs font-semibold tracking-[0.08em] text-msv-ink/50">↗</span>
                  </a>
                </li>
              ))}
            </ul>

            <Link href={L("/contact")} className={`mt-10 inline-flex ${homeTypo.linkCta}`}>
              {c.contactCta}
            </Link>
          </MagazineSpreadSection>
        </div>
      </div>
    </>
  );
}
