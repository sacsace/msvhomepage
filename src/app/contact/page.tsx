import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactForm } from "@/components/contact/ContactForm";
import { PageHeader } from "@/components/layout/PageHeader";
import { StandardPageBody } from "@/components/layout/StandardPageBody";
import { SectionTitle } from "@/components/SectionTitle";
import { parseInquiryTypeParam } from "@/lib/contact-inquiry";
import { contactFormStrings } from "@/lib/i18n/contact-locale";
import { getRequestLocale } from "@/lib/get-request-locale";
import { staticPageSeoLocalized } from "@/lib/seo-metadata";
import { company } from "@/lib/site-content";

const mapEmbedSrc = `https://maps.google.com/maps?q=${encodeURIComponent(company.address)}&z=14&output=embed`;

type Props = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const c = contactFormStrings(locale);
  return staticPageSeoLocalized("/contact", { title: c.metaTitle, description: c.metaDescription }, locale);
}

export default async function ContactPage({ searchParams }: Props) {
  const locale = await getRequestLocale();
  const c = contactFormStrings(locale);
  const sp = searchParams ? await searchParams : {};
  const rawType = typeof sp.type === "string" ? sp.type : Array.isArray(sp.type) ? sp.type[0] : "";
  const initialInquiryType = parseInquiryTypeParam(rawType);

  return (
    <>
      <PageHeader title={c.pageTitle} description={c.pageDescription} descriptionWide />
      <StandardPageBody>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5 lg:items-stretch lg:gap-8">
          <div className="flex min-h-0 min-w-0 flex-col lg:col-span-3">
            <Suspense
              fallback={
                <div className="flex min-h-[28rem] items-center justify-center rounded-2xl border border-slate-200 bg-white text-sm text-slate-400">
                  …
                </div>
              }
            >
              <ContactForm copy={c} initialInquiryType={initialInquiryType} />
            </Suspense>
          </div>

          <aside className="flex min-h-0 min-w-0 flex-col lg:col-span-2">
            <div className="flex min-h-0 flex-1 flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_1px_2px_rgb(15_23_42/0.04)] sm:p-8">
              <section aria-labelledby="contact-location-heading" className="min-w-0">
                <SectionTitle
                  id="contact-location-heading"
                  eyebrow={c.locationEyebrow}
                  title={c.locationTitle}
                  spacing="tight"
                  density="compact"
                  contentWidth="full"
                />
                <p className="mt-2 text-sm font-semibold text-msv-navy">{company.legalName}</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-500 sm:text-[13px]">{c.cardTagline}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{company.address}</p>
                <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                  <iframe
                    title={c.mapIframeTitle}
                    src={mapEmbedSrc}
                    className="h-[200px] w-full border-0 sm:h-[240px] lg:h-[260px]"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
                <p className="mt-2.5">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(company.address)}`}
                    className="text-xs font-medium text-msv-blue underline-offset-2 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {c.googleMaps}
                  </a>
                </p>
              </section>

              <div className="my-6 shrink-0 border-t border-slate-200 sm:my-7" aria-hidden />

              <section aria-labelledby="contact-email-heading" className="min-h-0 min-w-0">
                <SectionTitle
                  id="contact-email-heading"
                  eyebrow={c.contactEyebrow}
                  title={c.contactTitle}
                  spacing="tight"
                  density="compact"
                  contentWidth="full"
                />
                <p className="mt-2">
                  <a
                    href={`mailto:${company.infoEmail}`}
                    className="break-all text-sm font-semibold text-msv-blue underline-offset-2 decoration-msv-blue/60 transition-colors duration-200 hover:text-msv-navy hover:underline sm:text-base"
                  >
                    {company.infoEmail}
                  </a>
                </p>
              </section>
            </div>
          </aside>
        </div>
      </StandardPageBody>
    </>
  );
}
