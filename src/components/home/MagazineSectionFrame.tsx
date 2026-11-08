import type { ReactNode } from "react";

type Props = {
  index: string;
  verticalLabel: string;
  children: ReactNode;
  className?: string;
  /** dark ink surface */
  tone?: "light" | "ink";
};

/** Reference magazine spread frame: oversized index + vertical label */
export function MagazineSectionFrame({
  index,
  verticalLabel,
  children,
  className = "",
  tone = "light",
}: Props) {
  const ink = tone === "ink";
  return (
    <section
      className={`relative overflow-hidden ${ink ? "bg-msv-ink text-white" : "bg-white text-msv-ink"} ${className}`}
    >
      <div
        className={`pointer-events-none absolute left-3 top-10 hidden select-none sm:left-5 lg:left-8 lg:block ${
          ink ? "text-white/10" : "text-black/[0.06]"
        }`}
        aria-hidden
      >
        <span className="msv-section-index block">{index}</span>
      </div>
      <div
        className={`pointer-events-none absolute bottom-16 left-3 hidden lg:block ${
          ink ? "text-white/35" : ""
        }`}
        aria-hidden
      >
        <span className={`msv-vertical-label ${ink ? "text-white/40" : ""}`}>{verticalLabel}</span>
      </div>
      <div className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:pl-24">
        {children}
      </div>
    </section>
  );
}
