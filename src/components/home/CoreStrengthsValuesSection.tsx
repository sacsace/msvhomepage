import { NumberedHighlightCard } from "@/components/home/NumberedHighlightCard";
import { SectionTitle } from "@/components/SectionTitle";
import { homeTypo } from "@/lib/home-typography";
import { coreStrengthsSectionTitles } from "@/lib/i18n/public-home";
import type { SiteLocale } from "@/lib/site-locale";

type Props = {
  strengths: readonly string[];
  values: readonly string[];
  locale: SiteLocale;
};

const cardSection = "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8";

export function CoreStrengthsValuesSection({ strengths, values, locale }: Props) {
  const t = coreStrengthsSectionTitles(locale);

  return (
    <section className="bg-white pt-16 pb-6 sm:pt-20 sm:pb-8">
      <div className={`mx-auto max-w-6xl space-y-12 sm:space-y-14 ${homeTypo.pageInset}`}>
        <div className={cardSection}>
          <SectionTitle
            id="home-strengths-heading"
            eyebrow={t.strengthsKicker}
            title={t.strengthsTitle}
            spacing="tight"
            density="compact"
            contentWidth="full"
          />
          <ul className="mt-6 grid list-none gap-3 p-0 sm:grid-cols-2 sm:gap-4">
            {strengths.map((s, i) => (
              <NumberedHighlightCard key={s} index={String(i + 1).padStart(2, "0")}>
                {s}
              </NumberedHighlightCard>
            ))}
          </ul>
        </div>

        <div className={cardSection}>
          <SectionTitle
            id="home-values-heading"
            eyebrow={t.valuesKicker}
            title={t.valuesTitle}
            spacing="tight"
            density="compact"
            headingLevel={3}
            contentWidth="full"
          />
          <ul className="mt-6 grid list-none gap-3 p-0 sm:grid-cols-2 sm:gap-4">
            {values.map((v, i) => (
              <NumberedHighlightCard key={v} index={String(strengths.length + i + 1).padStart(2, "0")}>
                {v}
              </NumberedHighlightCard>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
