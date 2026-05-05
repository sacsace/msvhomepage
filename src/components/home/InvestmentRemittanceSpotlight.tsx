import Link from "next/link";
import { ClientsSection } from "@/components/home/ClientsSection";
import { SpotlightHighlightGrid } from "@/components/home/SpotlightHighlightGrid";
import { homeSpotlightLeadRow, homeTypo } from "@/lib/home-typography";
import {
  investmentRemittanceSpotlightEn,
  investmentRemittanceSpotlightZh,
  spotlightCtas,
} from "@/lib/i18n/public-home";
import type { SiteLocale } from "@/lib/site-locale";
import { withLocalePrefix } from "@/lib/site-locale";
import { investmentRemittanceSpotlight } from "@/lib/site-content";

type Props = {
  locale: SiteLocale;
};

export async function InvestmentRemittanceSpotlight({ locale }: Props) {
  const block =
    locale === "en"
      ? investmentRemittanceSpotlightEn
      : locale === "zh"
        ? investmentRemittanceSpotlightZh
        : investmentRemittanceSpotlight;
  const { eyebrow, title, body, highlights } = block;
  const servicesHref = "/services";
  const ctas = spotlightCtas(locale);

  return (
    <section
      className="overflow-x-hidden bg-gradient-to-b from-msv-blue-soft/35 via-white to-background pt-4 pb-14 sm:pt-5 sm:pb-16"
      aria-labelledby="investment-remittance-heading"
    >
      <div className={`mx-auto max-w-6xl ${homeTypo.pageInset}`}>
        <div className="msv-card p-6 sm:p-8">
          <p className={homeSpotlightLeadRow}>
            <span className="w-px shrink-0 rounded-full bg-msv-blue/45" aria-hidden />
            <span className={homeTypo.leadInNavy}>{eyebrow}</span>
          </p>
          <h2 id="investment-remittance-heading" className={`mt-5 ${homeTypo.sectionHeadingNavy}`}>
            {title}
          </h2>
          <p className={`mt-6 ${homeTypo.body}`}>{body}</p>
          <SpotlightHighlightGrid items={highlights} />
          <Link href={withLocalePrefix(servicesHref, locale)} className={`mt-8 inline-flex ${homeTypo.linkCta}`}>
            {ctas.investment}
          </Link>
        </div>
      </div>
      <div className={`mx-auto max-w-6xl ${homeTypo.pageInset}`}>
        <ClientsSection variant="embedded" locale={locale} />
      </div>
    </section>
  );
}
