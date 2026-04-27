export type CaseItem = {
  name: string;
  note: string;
  due: string;
};

const accents = ["border-msv-navy", "border-msv-teal", "border-msv-mocha"] as const;

type Props = {
  items: readonly CaseItem[];
};

/** 서비스 페이지 — 프로젝트 예시 인포그래피 */
export function ServiceCasesInfographic({ items }: Props) {
  return (
    <section className="mt-14 rounded-2xl border border-slate-200/80 bg-white px-5 py-10 shadow-sm sm:px-8 sm:py-12">
      <p className="msv-eyebrow">Cases</p>
      <h2 className="mt-2 text-xl font-bold tracking-tight text-msv-navy sm:text-2xl">프로필 프로젝트 예시</h2>
      <p className="mt-2 text-sm text-slate-600">회사 프로필에 수록된 사례입니다.</p>
      <ul className="mt-8 grid gap-4 md:grid-cols-3">
        {items.map((p, i) => (
          <li
            key={p.name}
            className={`flex flex-col rounded-xl border border-slate-200 bg-slate-50/80 p-5 sm:p-6 border-t-4 ${accents[i % accents.length]}`}
          >
            <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-msv-blue/80">
              Case {String(i + 1).padStart(2, "0")}
            </span>
            <p className="mt-2 text-sm font-bold leading-snug text-msv-navy">{p.name}</p>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{p.note}</p>
            <p className="mt-4 border-t border-slate-200/80 pt-3 text-xs tabular-nums text-slate-500">{p.due}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
