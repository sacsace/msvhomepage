import type { ReactNode } from "react";
import Link from "next/link";

type Props = {
  title: string;
  description?: string;
  /** true면 설명을 줄바꿈 없이 한 줄로 표시하고, 넘치면 가로 스크롤합니다. */
  descriptionSingleLine?: boolean;
  /** true면 설명을 `max-w-6xl` 구간 전체 너비로(회사 소개 등). `descriptionSingleLine`과 함께 쓰지 않습니다. */
  descriptionWide?: boolean;
  /** 제목·설명 아래에 이어 붙일 본문(회사 소개 상단 통합 등) */
  belowDescription?: ReactNode;
};

export function PageHeader({
  title,
  description,
  descriptionSingleLine,
  descriptionWide,
  belowDescription,
}: Props) {
  return (
    <header className="border-b-2 border-msv-blue-soft bg-white">
      <div className="mx-auto max-w-6xl px-4 py-9 text-left sm:px-6 sm:py-11">
        <p className="text-sm text-slate-500">
          <Link href="/" className="font-medium text-msv-blue hover:underline">
            홈
          </Link>
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-msv-navy sm:text-4xl">{title}</h1>
        {description ? (
          <p
            className={
              descriptionSingleLine
                ? "mt-3 max-w-full text-sm text-slate-600 whitespace-nowrap overflow-x-auto pb-1 [scrollbar-gutter:stable]"
                : descriptionWide
                  ? "mt-3 max-w-none text-sm leading-snug text-pretty text-slate-600 break-keep sm:text-[15px] sm:leading-[1.55]"
                  : "mt-3 max-w-3xl text-sm leading-relaxed text-slate-600"
            }
          >
            {description}
          </p>
        ) : null}
        {belowDescription ? (
          <div className={description || descriptionSingleLine ? "mt-4 sm:mt-5" : "mt-3 sm:mt-4"}>
            {belowDescription}
          </div>
        ) : null}
      </div>
    </header>
  );
}
