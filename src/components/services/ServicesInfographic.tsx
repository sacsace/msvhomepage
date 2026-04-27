const accents = ["border-msv-navy", "border-msv-teal", "border-msv-mocha"] as const;

export type ServiceLineItem = {
  title: string;
  description: string;
};

function ServiceCard({ index, title, description }: { index: number; title: string; description: string }) {
  const label = String(index).padStart(2, "0");
  const accent = accents[(index - 1) % accents.length];
  return (
    <article
      className={`flex flex-col rounded-xl border border-slate-200/90 bg-white p-5 shadow-sm sm:p-6 border-t-4 ${accent}`}
    >
      <div className="flex items-start gap-3 sm:gap-4">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-msv-blue-soft font-mono text-xs font-bold tracking-tight text-msv-blue sm:h-11 sm:w-11 sm:text-sm"
          aria-hidden
        >
          {label}
        </div>
        <h2 className="min-w-0 text-base font-bold leading-snug text-msv-navy sm:text-lg">{title}</h2>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:mt-4">{description}</p>
    </article>
  );
}

type Props = {
  items: readonly ServiceLineItem[];
};

/** 서비스 페이지 — 6개 서비스 라인 인포그래픽 그리드 */
export function ServicesInfographic({ items }: Props) {
  return (
    <section className="rounded-2xl border border-slate-200/80 bg-slate-50/95 px-5 py-10 sm:px-8 sm:py-12">
      <p className="msv-eyebrow">Service lines</p>
      <h2 className="mt-2 text-xl font-bold tracking-tight text-msv-navy sm:text-2xl">핵심 서비스</h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
        법인 컨설팅·회계 사업부에서 인도 현지에서 직접 실행하는 서비스입니다.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((s, i) => (
          <ServiceCard key={s.title} index={i + 1} title={s.title} description={s.description} />
        ))}
      </div>
    </section>
  );
}
