import type { ReactNode } from "react";

type Props = {
  index: string;
  label: string;
  children: ReactNode;
  tone?: "white" | "paper";
  className?: string;
  id?: string;
};

/** 잡지형 섹션 — 큰 번호 + 헤어라인 + 오픈 레이아웃 */
export function MagazineSpreadSection({
  index,
  label,
  children,
  tone = "white",
  className = "",
  id,
}: Props) {
  return (
    <section
      id={id}
      className={`relative scroll-mt-28 border-t border-msv-ink/10 ${
        tone === "paper" ? "bg-[#f5f5f5]" : "bg-white"
      } ${className}`}
    >
      <div
        className="pointer-events-none absolute left-0 top-8 hidden select-none font-sans text-[5.5rem] font-bold leading-none tracking-[-0.08em] text-msv-ink/[0.05] lg:block"
        aria-hidden
      >
        {index}
      </div>
      <div className="relative py-14 sm:py-16 lg:pl-24">
        <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
          {index} — {label}
        </p>
        <div className="mt-6">{children}</div>
      </div>
    </section>
  );
}
