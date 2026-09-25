import { HomeSpotlightPanel } from "@/components/home/HomeSpotlightPanel";
import { homeTypo } from "@/lib/home-typography";
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
    <section
      className="bg-[#f7f8fa] pb-8 sm:pb-10"
      aria-labelledby="accounting-operations-heading"
    >
      <div className={`mx-auto max-w-6xl ${homeTypo.pageInset}`}>
        <HomeSpotlightPanel
          headingId="accounting-operations-heading"
          eyebrow={eyebrow}
          title={title}
          paragraphs={paragraphs}
          highlights={highlights}
          ctaHref={withLocalePrefix("/services", locale)}
          ctaLabel={ctas.accounting}
        />
      </div>
    </section>
  );
}
