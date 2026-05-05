import type { CompanyHistoryDisplayRow } from "@/lib/company-history-store";

type Props = { entries: readonly CompanyHistoryDisplayRow[]; emptyMessage?: string };

export function CompanyHistory({ entries, emptyMessage = "등록된 연혁이 없습니다." }: Props) {
  if (entries.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center text-sm leading-relaxed text-slate-600">
        {emptyMessage}
      </p>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-5 shadow-sm sm:p-6">
      <div className="relative">
        <div
          className="absolute left-[11px] top-2 bottom-2 w-px bg-slate-200 sm:left-[13px]"
          aria-hidden
        />
        <ol className="divide-y divide-slate-200/70">
          {entries.map((row, i) => (
            <li
              key={`${row.when}-${i}`}
              className="relative flex items-start gap-3 py-3 pr-1 sm:gap-4 sm:py-3.5"
            >
              <div className="relative z-[1] flex w-6 shrink-0 justify-center pt-1.5 sm:w-7">
                <span
                  className="block h-2 w-2 rounded-full bg-slate-900 ring-4 ring-white sm:h-2.5 sm:w-2.5"
                  aria-hidden
                />
              </div>

              <div className="min-w-0 flex-1 py-0.5">
                <p className="m-0 flex min-w-0 flex-col gap-0.5 text-sm leading-snug text-slate-600 sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-x-2 sm:leading-relaxed">
                  <span className="shrink-0 font-medium tabular-nums text-msv-navy">{row.when}</span>
                  <span className="hidden font-normal text-slate-300 sm:inline" aria-hidden>
                    —
                  </span>
                  <span className="min-w-0 font-normal" title={row.what}>
                    {row.what}
                  </span>
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
