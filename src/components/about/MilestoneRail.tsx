import { Fragment } from "react";
import { milestones } from "@/lib/site-content";

export function MilestoneRail() {
  return (
    <>
      <div className="hidden lg:block">
        <div className="flex items-stretch">
          {milestones.map((m, i) => (
            <Fragment key={m.title}>
              <div className="msv-card flex min-w-0 flex-1 flex-col p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-msv-blue">{m.phase}</p>
                <h3 className="mt-2 text-sm font-bold text-msv-navy">{m.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">{m.description}</p>
              </div>
              {i < milestones.length - 1 ? (
                <div
                  className="flex w-9 shrink-0 items-center justify-center self-center text-xl font-light text-msv-blue"
                  aria-hidden
                >
                  →
                </div>
              ) : null}
            </Fragment>
          ))}
        </div>
      </div>

      <ol className="space-y-6 lg:hidden">
        {milestones.map((m, index) => (
          <li key={m.title} className="msv-card flex gap-4 p-5 sm:gap-5">
            <span
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-msv-blue-soft text-xs font-bold text-msv-blue"
              aria-hidden
            >
              {index + 1}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-msv-blue">{m.phase}</p>
              <h3 className="mt-1 text-sm font-bold text-msv-navy">{m.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{m.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </>
  );
}
