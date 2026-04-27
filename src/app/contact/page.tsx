import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionTitle } from "@/components/SectionTitle";
import { company } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "문의",
};

const mapEmbedSrc = `https://maps.google.com/maps?q=${encodeURIComponent(company.address)}&z=14&output=embed`;

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="문의"
        description="아래 양식을 작성해 보내주시면 접수 후 필요 시 담당자가 회신 드립니다."
      />
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
        <div className="max-w-3xl">
          <ContactForm />
        </div>

        <section className="mt-14 border-t border-slate-200 pt-12 sm:mt-16 sm:pt-14" aria-labelledby="contact-location-heading">
          <SectionTitle id="contact-location-heading" eyebrow="Location" title="본사 · 오시는 길" />
          <p className="font-medium text-slate-900">{company.legalName}</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">{company.address}</p>
          <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-sm">
            <iframe
              title="본사 위치 (Google Maps)"
              src={mapEmbedSrc}
              className="h-[min(22rem,50vh)] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <p className="mt-3 text-center text-xs text-slate-500 sm:text-left">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(company.address)}`}
              className="font-medium text-msv-blue underline-offset-2 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google 지도에서 크게 보기 →
            </a>
          </p>
        </section>

        <section className="mt-12 border-t border-slate-200 pt-12 sm:mt-14 sm:pt-14">
          <SectionTitle eyebrow="Contact" title="연락" />
          <p>
            <a
              href={`mailto:${company.infoEmail}`}
              className="text-base font-semibold text-msv-blue underline-offset-2 hover:underline"
            >
              {company.infoEmail}
            </a>
          </p>
        </section>
      </div>
    </>
  );
}
