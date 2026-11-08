import { MagazineSectionFrame } from "@/components/home/MagazineSectionFrame";
import { NumberedHighlightCard } from "@/components/home/NumberedHighlightCard";
import { SectionTitle } from "@/components/SectionTitle";
import { coreStrengthsSectionTitles } from "@/lib/i18n/public-home";
import type { SiteLocale } from "@/lib/site-locale";

type Props = {
  strengths: readonly string[];
  values: readonly string[];
  locale: SiteLocale;
};

const itemGrid = "mt-6 grid list-none gap-x-12 gap-y-0 border-b border-msv-ink/15 p-0 sm:grid-cols-2";

export function CoreStrengthsValuesSection({ strengths, values, locale }: Props) {
  const t = coreStrengthsSectionTitles(locale);

  return (
    <MagazineSectionFrame index="03" verticalLabel="Practice" className="border-t border-msv-ink/10">
      <div className="space-y-20">
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
    </MagazineSectionFrame>
  );
}
