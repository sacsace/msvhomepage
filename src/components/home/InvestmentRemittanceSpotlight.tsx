import { ClientsSection } from "@/components/home/ClientsSection";
import { HomeSpotlightPanel } from "@/components/home/HomeSpotlightPanel";
import { homeTypo } from "@/lib/home-typography";
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
  const { eyebrow, title, paragraphs, highlights } = block;
  const ctas = spotlightCtas(locale);

  return (
    <section
      className="overflow-x-hidden bg-[#f7f8fa] pb-16 sm:pb-20"
      aria-labelledby="investment-remittance-heading"
    >
      <div className={`mx-auto max-w-6xl space-y-6 sm:space-y-8 ${homeTypo.pageInset}`}>
        <HomeSpotlightPanel
          headingId="investment-remittance-heading"
          eyebrow={eyebrow}
          title={title}
          paragraphs={paragraphs}
          highlights={highlights}
          ctaHref={withLocalePrefix("/services", locale)}
          ctaLabel={ctas.investment}
        />
        <ClientsSection variant="embedded" locale={locale} />
      </div>
    </section>
  );
}
