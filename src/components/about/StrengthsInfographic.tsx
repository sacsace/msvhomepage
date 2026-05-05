import { SectionTitle } from "@/components/SectionTitle";

type Props = {
  items: readonly string[];
  /** 기본: 강점 요약 */
  sectionTitle?: string;
};

const cardSection = "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8";

function StrengthCard({ index, text }: { index: number; text: string }) {
  const label = String(index).padStart(2, "0");
  return (
    <article className="flex gap-4 rounded-xl border border-slate-200 bg-slate-50/40 p-5 shadow-sm sm:gap-5 sm:p-6">
      <div
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-xs font-medium tabular-nums text-slate-500 sm:h-10 sm:w-10"
        aria-hidden
      >
        {label}
      </div>
      <p className="min-w-0 flex-1 text-sm leading-relaxed text-slate-600">{text}</p>
    </article>
  );
}

/** 회사 소개 — 강점 요약 */
export function StrengthsInfographic({ items, sectionTitle = "강점 요약" }: Props) {
  const left = items.slice(0, 3);
  const right = items.slice(3, 5);

  return (
    <section className={cardSection}>
      <SectionTitle
        eyebrow="Strengths"
        title={sectionTitle}
        spacing="tight"
        density="compact"
        contentWidth="full"
      />
      <div className="mt-4 grid gap-4 md:grid-cols-2 md:items-start md:gap-5">
        <div className="flex flex-col gap-4">
          {left.map((text, i) => (
            <StrengthCard key={text} index={i + 1} text={text} />
          ))}
        </div>
        <div className="flex flex-col gap-4">
          {right.map((text, i) => (
            <StrengthCard key={text} index={i + 4} text={text} />
          ))}
        </div>
      </div>
    </section>
  );
}
