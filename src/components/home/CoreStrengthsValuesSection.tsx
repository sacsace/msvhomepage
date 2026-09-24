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

const itemGrid = "mt-8 grid list-none gap-4 p-0 sm:grid-cols-2 sm:gap-5";

export function CoreStrengthsValuesSection({ strengths, values, locale }: Props) {
  const t = coreStrengthsSectionTitles(locale);

  return (
    <section className="bg-[#f7f8fa] py-16 sm:py-20">
      <div className={`mx-auto max-w-6xl space-y-10 sm:space-y-12 ${homeTypo.pageInset}`}>
        <div>
          <SectionTitle
            id="home-strengths-heading"
            eyebrow={t.strengthsKicker}
            title={t.strengthsTitle}
            spacing="tight"
            density="compact"
            headingLevel={3}
            contentWidth="full"
            visualWeight="editorial"
          />
          <ul className={itemGrid}>
            {strengths.map((s, i) => (
              <NumberedHighlightCard key={s} index={String(i + 1).padStart(2, "0")}>
                {s}
              </NumberedHighlightCard>
            ))}
          </ul>
        </div>

        <div>
          <SectionTitle
            id="home-values-heading"
            eyebrow={t.valuesKicker}
            title={t.valuesTitle}
            spacing="tight"
            density="compact"
            headingLevel={3}
            contentWidth="full"
            visualWeight="editorial"
          />
          <ul className={itemGrid}>
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
