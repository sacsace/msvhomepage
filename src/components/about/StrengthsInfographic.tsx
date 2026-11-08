import { SectionTitle } from "@/components/SectionTitle";

type Props = {
  items: readonly string[];
  /** 기본: 강점 요약 */
  sectionTitle?: string;
};

function StrengthCard({ index, text }: { index: number; text: string }) {
  const label = String(index).padStart(2, "0");
  return (
    <article className="flex gap-5 border-t border-msv-ink/10 py-6 sm:gap-6">
      <span
        className="w-10 shrink-0 font-sans text-2xl font-bold tabular-nums leading-none tracking-[-0.05em] text-msv-ink/15"
        aria-hidden
      >
        {label}
      </span>
      <p className="min-w-0 flex-1 pt-1 text-sm font-normal leading-[1.75] text-slate-600">{text}</p>
    </article>
  );
}

/** 회사 소개 — 강점 요약 (magazine open rows) */
export function StrengthsInfographic({ items, sectionTitle = "강점 요약" }: Props) {
  const left = items.slice(0, 3);
  const right = items.slice(3, 5);

  return (
    <div>
      <SectionTitle
        eyebrow="Strengths"
        title={sectionTitle}
        spacing="tight"
        density="compact"
        contentWidth="full"
        visualWeight="editorial"
      />
      <div className="mt-6 grid gap-x-12 md:grid-cols-2 md:items-start">
        <div>
          {left.map((text, i) => (
            <StrengthCard key={text} index={i + 1} text={text} />
          ))}
        </div>
        <div>
          {right.map((text, i) => (
            <StrengthCard key={text} index={i + 4} text={text} />
          ))}
        </div>
      </div>
    </div>
  );
}
