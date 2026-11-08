import type { ReactNode } from "react";

type Props = {
  index: string;
  children: ReactNode;
  variant?: "default" | "spotlight";
};

export function NumberedHighlightCard({ index, children, variant = "default" }: Props) {
  if (variant === "spotlight") {
    return (
      <li className="group flex min-h-[3.25rem] items-baseline gap-4 border-b border-msv-ink/10 py-5 last:border-b-0">
        <span className="w-8 shrink-0 font-sans text-sm font-bold tabular-nums text-msv-ink/35" aria-hidden>
          {index}
        </span>
        <p className="min-w-0 flex-1 text-[15px] font-medium leading-snug text-slate-800 break-keep">
          {children}
        </p>
      </li>
    );
  }

  return (
    <li className="group flex gap-5 border-t border-msv-ink/10 py-7 sm:gap-6">
      <span
        className="w-12 shrink-0 font-sans text-3xl font-bold tabular-nums leading-none tracking-[-0.06em] text-msv-ink/15"
        aria-hidden
      >
        {index}
      </span>
      <p className="min-w-0 flex-1 pt-1 text-[15px] font-light leading-[1.8] text-slate-600 break-keep sm:text-base">
        {children}
      </p>
    </li>
  );
}
