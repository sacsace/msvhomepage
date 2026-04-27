import { SectionTitle } from "@/components/SectionTitle";

type Props = {
  items: readonly string[];
};

function StrengthCard({ index, text }: { index: number; text: string }) {
  const label = String(index).padStart(2, "0");
  return (
    <article className="flex gap-4 rounded-xl border border-slate-200/90 bg-white p-5 shadow-sm sm:gap-5 sm:p-6">
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-msv-blue-soft font-mono text-xs font-bold tracking-tight text-msv-blue sm:h-11 sm:w-11 sm:text-sm"
        aria-hidden
      >
        {label}
      </div>
      <p className="min-w-0 flex-1 text-sm font-semibold leading-snug text-msv-navy sm:text-[0.9375rem] sm:leading-relaxed">
        {text}
      </p>
    </article>
  );
}

/** 회사 소개 — 강점 요약: 2열(좌 3 · 우 2) 인포그래픽 레이아웃 */
export function StrengthsInfographic({ items }: Props) {
  const left = items.slice(0, 3);
  const right = items.slice(3, 5);

  return (
    <section className="mt-14 rounded-2xl border border-slate-200/80 bg-slate-50/95 px-5 py-10 sm:mt-16 sm:px-8 sm:py-12">
      <SectionTitle eyebrow="Strengths" title="강점 요약" />
      <div className="grid gap-4 md:grid-cols-2 md:items-start">
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
