import { NumberedHighlightCard } from "@/components/home/NumberedHighlightCard";

type Props = {
  strengths: readonly string[];
  values: readonly string[];
};

export function CoreStrengthsValuesSection({ strengths, values }: Props) {
  return (
    <section className="border-t border-slate-200/80 bg-white py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="rounded-2xl border border-slate-200/95 bg-white p-6 shadow-[0_1px_3px_rgba(15,23,42,0.05)] sm:p-9 lg:p-10">
          <p className="text-xs font-semibold tracking-[0.14em] text-msv-blue">회계 실무 역량</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-[1.7rem]">핵심 강점</h2>
          <ul className="mt-6 grid list-none gap-2 p-0 sm:grid-cols-2">
            {strengths.map((s, i) => (
              <NumberedHighlightCard key={s} index={String(i + 1).padStart(2, "0")}>
                {s}
              </NumberedHighlightCard>
            ))}
          </ul>

          <div className="mt-12 border-t border-slate-100 pt-10 sm:mt-14 sm:pt-12">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-msv-blue">VALUES</p>
            <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-[1.7rem]">가치 · 운영 원칙</h3>
            <ul className="mt-6 grid list-none gap-2 p-0 sm:grid-cols-2">
              {values.map((v, i) => (
                <NumberedHighlightCard key={v} index={String(strengths.length + i + 1).padStart(2, "0")}>
                  {v}
                </NumberedHighlightCard>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
