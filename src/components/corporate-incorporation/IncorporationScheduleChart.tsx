import {
  INCORPORATION_SCHEDULE_MILESTONE_DAY,
  INCORPORATION_SCHEDULE_TOTAL_DAYS,
  incorporationSchedulePhases,
  type CorporateIncorporationServiceCopy,
} from "@/lib/i18n/corporate-incorporation-service-locale";

function barStyle(start: number, end: number): { leftPct: number; widthPct: number } {
  const leftPct = ((start - 1) / INCORPORATION_SCHEDULE_TOTAL_DAYS) * 100;
  const widthPct = ((end - start + 1) / INCORPORATION_SCHEDULE_TOTAL_DAYS) * 100;
  return { leftPct, widthPct };
}

const milestoneLeftPct = ((INCORPORATION_SCHEDULE_MILESTONE_DAY - 1) / INCORPORATION_SCHEDULE_TOTAL_DAYS) * 100;

const rowCell = "flex min-h-[2.625rem] items-center";

type Props = {
  chart: CorporateIncorporationServiceCopy["scheduleChart"];
};

export function IncorporationScheduleChart({ chart }: Props) {
  return (
    <div className="mt-8">
      <h3 className="text-sm font-semibold tracking-tight text-msv-navy sm:text-base">{chart.title}</h3>
      <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200 bg-slate-50/80 p-3 sm:p-4">
        <div className="flex min-w-[36rem] gap-2 sm:min-w-[44rem] sm:gap-2.5">
          <div className="flex w-[10.5rem] shrink-0 flex-col gap-1.5 sm:w-[12.5rem]">
            <div className={`${rowCell} h-6 min-h-6 text-[10px] font-semibold text-slate-500 sm:text-[11px]`}>
              {chart.colItem}
            </div>
            {incorporationSchedulePhases.map((row) => {
              const label = chart.phaseLabel[row.id];
              return (
                <div key={row.id} className={`${rowCell} min-w-0`}>
                  <p
                    className="w-full text-left text-[10px] leading-tight text-slate-700 line-clamp-2 break-words sm:text-[11px]"
                    title={label}
                  >
                    {label}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="relative min-h-0 min-w-0 flex-1">
            <div
              className="pointer-events-none absolute bottom-0 top-0 z-20 w-px bg-red-500"
              style={{ left: `${milestoneLeftPct}%` }}
              aria-hidden
            />
            <div
              className={`relative z-10 flex h-6 min-h-6 shrink-0 items-end border-b border-slate-200/90 pb-0.5 text-[9px] sm:text-[10px]`}
            >
              <span className="absolute bottom-0.5 left-0 tabular-nums text-slate-500">{chart.firstDayLabel}</span>
              <span
                className="absolute bottom-0.5 -translate-x-1/2 font-semibold tabular-nums text-red-600"
                style={{ left: `${milestoneLeftPct}%` }}
              >
                {chart.milestoneDay(INCORPORATION_SCHEDULE_MILESTONE_DAY)}
              </span>
              <span className="absolute bottom-0.5 right-0 tabular-nums text-slate-500">
                {chart.lastDayLabel(INCORPORATION_SCHEDULE_TOTAL_DAYS)}
              </span>
            </div>
            <div className="mt-1.5 flex flex-col gap-1.5">
              {incorporationSchedulePhases.map((row) => {
                const { leftPct, widthPct } = barStyle(row.start, row.end);
                const label = chart.phaseLabel[row.id];
                return (
                  <div key={`bar-${row.id}`} className={`${rowCell} min-w-0`}>
                    <div
                      className="relative h-7 w-full shrink-0 rounded-md bg-white ring-1 ring-slate-200/80"
                      role="img"
                      aria-label={chart.ariaBarRange(label, row.start, row.end)}
                    >
                      <div
                        className="absolute inset-y-0.5 z-[5] rounded-sm bg-msv-blue/90 shadow-sm"
                        style={{
                          left: `${leftPct}%`,
                          width: `${Math.max(widthPct, 0.55)}%`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex w-[3.25rem] shrink-0 flex-col gap-1.5 sm:w-16">
            <div
              className={`${rowCell} h-6 min-h-6 justify-end text-[10px] font-semibold text-slate-500 sm:text-[11px]`}
            >
              {chart.colSpan}
              <span className="sr-only"> </span>
            </div>
            {incorporationSchedulePhases.map((row) => (
              <div
                key={`${row.id}-range`}
                className={`${rowCell} justify-end text-right text-[9px] tabular-nums text-slate-500 sm:text-[10px]`}
              >
                {row.start === row.end ? `${row.start}` : `${row.start}–${row.end}`}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-start gap-2 border-t border-slate-200 pt-3 text-[11px] leading-snug text-slate-600 sm:text-xs">
          <span className="mt-0.5 inline-flex h-3.5 w-px shrink-0 bg-red-500" aria-hidden />
          <p>
            <strong className="font-semibold text-msv-navy">{chart.legendLead}</strong>
            {chart.legendDetail}
          </p>
        </div>
      </div>
      <p className="mt-2 text-[11px] leading-relaxed text-slate-500 sm:text-xs">{chart.footerNote}</p>
    </div>
  );
}
