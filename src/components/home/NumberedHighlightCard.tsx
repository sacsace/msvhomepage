import type { ReactNode } from "react";

type Props = {
  index: string;
  children: ReactNode;
  variant?: "default" | "spotlight";
};

/** 홈 핵심 강점·가치 / 스포트라이트 항목 */
export function NumberedHighlightCard({ index, children, variant = "default" }: Props) {
  if (variant === "spotlight") {
    return (
      <li
        className="group flex min-h-[3.25rem] items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 transition duration-200 ease-out hover:border-msv-blue/45 hover:bg-msv-blue-soft sm:gap-4 sm:px-5 sm:py-3.5"
      >
        <span
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-slate-100 text-[11px] font-semibold tabular-nums text-slate-500 transition duration-200 group-hover:bg-msv-blue/15 group-hover:text-msv-blue"
          aria-hidden
        >
          {index}
        </span>
        <p
          className="min-w-0 flex-1 text-sm font-medium leading-snug text-slate-800 break-keep transition duration-200 group-hover:text-msv-navy sm:text-[15px]"
        >
          {children}
        </p>
      </li>
    );
  }

  return (
    <li className="group flex gap-4 rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm transition duration-200 ease-out hover:border-msv-blue/45 hover:bg-msv-blue-soft sm:gap-5 sm:p-6">
      <span
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-msv-blue-soft/70 text-xs font-semibold tabular-nums tracking-wide text-msv-navy/60 transition duration-200 group-hover:bg-msv-blue/15 group-hover:text-msv-blue"
        aria-hidden
      >
        {index}
      </span>
      <p className="min-w-0 flex-1 pt-0.5 text-[15px] leading-relaxed text-slate-600 break-keep transition duration-200 group-hover:text-msv-navy sm:text-base">
        {children}
      </p>
    </li>
  );
}
