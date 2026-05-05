import { Fragment } from "react";
import { milestones } from "@/lib/site-content";

export type MilestoneRailItem = { phase: string; title: string; description: string };

type Props = {
  items?: readonly MilestoneRailItem[];
};

export function MilestoneRail({ items = milestones }: Props) {
  return (
    <>
      <div className="hidden lg:block">
        <div className="flex items-stretch gap-2">
          {items.map((m, i) => (
            <Fragment key={m.title}>
              <div className="flex min-w-0 flex-1 flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">{m.phase}</p>
                <h3 className="mt-3 text-sm font-semibold text-msv-navy sm:text-base">{m.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">{m.description}</p>
              </div>
              {i < items.length - 1 ? (
                <div
                  className="flex w-8 shrink-0 items-center justify-center self-center text-lg font-light text-slate-300"
                  aria-hidden
                >
                  →
                </div>
              ) : null}
            </Fragment>
          ))}
        </div>
      </div>

      <ol className="space-y-5 lg:hidden">
        {items.map((m, index) => (
          <li
            key={m.title}
            className="flex gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:gap-5 sm:p-6"
          >
            <span
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-xs font-medium tabular-nums text-slate-600"
              aria-hidden
            >
              {index + 1}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">{m.phase}</p>
              <h3 className="mt-2 text-sm font-semibold text-msv-navy sm:text-base">{m.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{m.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </>
  );
}
