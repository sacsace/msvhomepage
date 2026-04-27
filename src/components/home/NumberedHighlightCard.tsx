import type { ReactNode } from "react";

type Props = {
  index: string;
  children: ReactNode;
};

/** 핵심 강점 / 가치 카드 — 흰 배경, 연한 파란 테두리, 우상단 탭 장식 */
export function NumberedHighlightCard({ index, children }: Props) {
  return (
    <li className="relative overflow-hidden rounded-xl border border-sky-100/90 bg-white p-3.5 shadow-[0_1px_3px_rgba(15,23,42,0.04)] transition duration-200 hover:border-msv-blue/20 hover:shadow-[0_8px_24px_-8px_rgba(45,91,255,0.12)] sm:p-4">
      <span
        className="pointer-events-none absolute right-0 top-0 h-[3.25rem] w-[3.25rem] rounded-bl-2xl bg-msv-blue-soft/85 ring-1 ring-inset ring-msv-blue/10"
        aria-hidden
      />
      <div className="relative flex items-start gap-3">
        <span
          className="inline-flex h-8 min-w-[2rem] shrink-0 items-center justify-center rounded-md border border-sky-200/80 bg-white px-1.5 text-xs font-bold tabular-nums text-msv-blue"
          aria-hidden
        >
          {index}
        </span>
        <p className="min-w-0 flex-1 pt-px text-sm font-medium leading-snug text-slate-800">{children}</p>
      </div>
    </li>
  );
}
