import { ClientsSection } from "@/components/home/ClientsSection";
import { HomeSpotlightPanel } from "@/components/home/HomeSpotlightPanel";
import { MagazineSectionFrame } from "@/components/home/MagazineSectionFrame";
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
    <MagazineSectionFrame index="05" verticalLabel="Capital" className="border-t border-msv-ink/10">
      <div className="space-y-12">
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
    </MagazineSectionFrame>
  );
}
