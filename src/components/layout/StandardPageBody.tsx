import type { ReactNode } from "react";
import {
  publicPageBodyPadDefault,
  publicPageBodyPadSpacious,
  publicPageBodyShell,
} from "@/lib/public-page-styles";

type Props = {
  children: ReactNode;
  className?: string;
  /** 기본 `6xl` — 공지·자료 글 본문 등은 `3xl`, 계산기 등 풀폭은 `full` */
  width?: "6xl" | "3xl" | "full";
  /** 서비스 랜딩 등 세로 여백을 한 단계 더 줄 때 */
  padding?: "default" | "spacious";
};

const padClass = {
  default: publicPageBodyPadDefault,
  spacious: publicPageBodyPadSpacious,
} as const;

/** 모든 공개 내부 페이지 공통 본문 래퍼(PageHeader `homeHero` 아래) */
export function StandardPageBody({ children, className = "", width = "6xl", padding = "default" }: Props) {
  const max = width === "3xl" ? "max-w-3xl" : width === "full" ? "max-w-none" : "max-w-6xl";
  return (
    <div className={`mx-auto ${max} ${publicPageBodyShell} ${padClass[padding]} ${className}`.trim()}>
      {children}
    </div>
  );
}
