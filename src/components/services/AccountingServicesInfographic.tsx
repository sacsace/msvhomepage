import type { AccountingServiceBlock } from "@/lib/site-content";

const accents = ["border-msv-navy", "border-msv-teal", "border-msv-mocha"] as const;

type Props = {
  blocks: readonly AccountingServiceBlock[];
  sectionEyebrow: string;
  sectionTitle: string;
  sectionIntro: string;
};

function BlockCard({ block, accentIndex }: { block: AccountingServiceBlock; accentIndex: number }) {
  const accent = accents[accentIndex % accents.length];
  return (
    <div
      className={`flex flex-col rounded-xl border border-slate-200/90 bg-white p-5 shadow-sm sm:p-6 border-t-4 ${accent}`}
    >
      <p className="msv-eyebrow">{block.eyebrow}</p>
      <h2 className="mt-2 text-lg font-bold text-msv-navy">{block.title}</h2>
      {block.subtitle ? (
        <p className="mt-2 text-xs leading-relaxed text-slate-500 sm:text-sm">{block.subtitle}</p>
      ) : null}
      <ul className="mt-5 space-y-1.5 border-t border-slate-100 pt-5 text-sm leading-snug text-slate-600">
        {block.items.map((line) => (
          <li key={line} className="flex gap-2.5">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-msv-blue" aria-hidden />
            <span>{line}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** 서비스 페이지 — 회계·세무 라인업(금액 비표시) */
export function AccountingServicesInfographic({ blocks, sectionEyebrow, sectionTitle, sectionIntro }: Props) {
  return (
    <section className="mt-14 rounded-2xl border border-slate-200/80 bg-slate-50/95 px-5 py-10 sm:px-8 sm:py-12">
      <p className="msv-eyebrow">{sectionEyebrow}</p>
      <h2 className="mt-2 text-xl font-bold tracking-tight text-msv-navy sm:text-2xl">{sectionTitle}</h2>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">{sectionIntro}</p>
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {blocks.map((b, i) => (
          <BlockCard key={b.title} block={b} accentIndex={i} />
        ))}
      </div>
    </section>
  );
}
