import { HomeSpotlightPanel } from "@/components/home/HomeSpotlightPanel";
import { MagazineSectionFrame } from "@/components/home/MagazineSectionFrame";
import {
  accountingOperationsSpotlightEn,
  accountingOperationsSpotlightZh,
  spotlightCtas,
} from "@/lib/i18n/public-home";
import type { SiteLocale } from "@/lib/site-locale";
import { withLocalePrefix } from "@/lib/site-locale";
import { accountingOperationsSpotlight } from "@/lib/site-content";

type Props = {
  locale: SiteLocale;
};

export function AccountingOperationsSpotlight({ locale }: Props) {
  const block =
    locale === "en"
      ? accountingOperationsSpotlightEn
      : locale === "zh"
        ? accountingOperationsSpotlightZh
        : accountingOperationsSpotlight;
  const { eyebrow, title, paragraphs, highlights } = block;
  const ctas = spotlightCtas(locale);

  return (
    <MagazineSectionFrame
      index="04"
      verticalLabel="Accounting"
      className="border-t border-msv-ink/10 bg-[#f7f7f7]"
    >
      <HomeSpotlightPanel
        headingId="accounting-operations-heading"
        eyebrow={eyebrow}
        title={title}
        paragraphs={paragraphs}
        highlights={highlights}
        ctaHref={withLocalePrefix("/services", locale)}
        ctaLabel={ctas.accounting}
      />
    </MagazineSectionFrame>
  );
}
