import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { PageHeader } from "@/components/layout/PageHeader";
import { StandardPageBody } from "@/components/layout/StandardPageBody";
import { SectionTitle } from "@/components/SectionTitle";
import { contactFormStrings } from "@/lib/i18n/contact-locale";
import { getRequestLocale } from "@/lib/get-request-locale";
import { staticPageSeoLocalized } from "@/lib/seo-metadata";
import { company } from "@/lib/site-content";

const mapEmbedSrc = `https://maps.google.com/maps?q=${encodeURIComponent(company.address)}&z=14&output=embed`;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const c = contactFormStrings(locale);
  return staticPageSeoLocalized("/contact", { title: c.metaTitle, description: c.metaDescription }, locale);
}

export default async function ContactPage() {
  const locale = await getRequestLocale();
  const c = contactFormStrings(locale);

  return (
    <>
      <PageHeader title={c.pageTitle} description={c.pageDescription} descriptionWide />
      <StandardPageBody>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5 lg:items-stretch lg:gap-8">
          <div className="flex min-h-0 min-w-0 flex-col lg:col-span-3">
            <ContactForm copy={c} />
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
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{company.address}</p>
                <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                  <iframe
                    title={c.mapIframeTitle}
                    src={mapEmbedSrc}
                    className="h-52 w-full border-0 sm:h-56 lg:h-[15.5rem]"
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

              <section aria-labelledby="contact-email-heading" className="min-w-0">
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
                    className="break-all text-sm font-semibold text-msv-blue underline-offset-2 hover:underline sm:text-base"
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
