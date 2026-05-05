import Link from "next/link";
import { SpotlightHighlightGrid } from "@/components/home/SpotlightHighlightGrid";
import { homeSpotlightLeadRow, homeTypo } from "@/lib/home-typography";
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
  const servicesHref = "/services";
  const ctas = spotlightCtas(locale);

  return (
    <section
      className="bg-gradient-to-b from-msv-blue-soft/35 via-white to-background pt-4 pb-6 sm:pt-5 sm:pb-8"
      aria-labelledby="accounting-operations-heading"
    >
      <div className={`mx-auto max-w-6xl ${homeTypo.pageInset}`}>
        <div className="msv-card p-6 sm:p-8">
          <p className={homeSpotlightLeadRow}>
            <span className="w-px shrink-0 rounded-full bg-msv-blue/45" aria-hidden />
            <span className={homeTypo.leadInNavy}>{eyebrow}</span>
          </p>
          <h2 id="accounting-operations-heading" className={`mt-5 ${homeTypo.sectionHeadingNavy}`}>
            {title}
          </h2>
          <div className={`mt-6 space-y-4 ${homeTypo.body}`}>
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <SpotlightHighlightGrid items={highlights} />
          <Link href={withLocalePrefix(servicesHref, locale)} className={`mt-8 inline-flex ${homeTypo.linkCta}`}>
            {ctas.accounting}
          </Link>
        </div>
      </div>
    </section>
  );
}
