import type { ReactNode } from "react";

type Props = {
  index: string;
  children: ReactNode;
};

/** 홈 핵심 강점·가치 / 스포트라이트 번호 카드 — 표준 서비스 페이지 타일 톤 */
export function NumberedHighlightCard({ index, children }: Props) {
  return (
    <li className="flex gap-3 rounded-xl border border-[rgba(15,23,42,0.06)] bg-slate-50/40 p-4 shadow-sm transition duration-200 ease-out hover:-translate-y-px hover:border-msv-blue/25 sm:gap-4 sm:p-5">
      <span
        className="inline-flex h-8 min-w-[2rem] shrink-0 items-center justify-center rounded-lg border border-[rgba(15,23,42,0.06)] bg-white px-1.5 text-xs font-semibold tabular-nums text-slate-700"
        aria-hidden
      >
        {index}
      </span>
      <p className="min-w-0 flex-1 pt-px text-sm leading-relaxed text-slate-600 break-keep">{children}</p>
    </li>
  );
}
