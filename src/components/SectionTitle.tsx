import type { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: ReactNode;
  /** 기본 2. 페이지 최상단 제목은 1, 하위 섹션은 2~3 */
  headingLevel?: 1 | 2 | 3;
  /** 섹션 `aria-labelledby` 등에 연결할 때 제목 요소에 부여 */
  id?: string;
  /** `tight`: 제목 블록 아래 여백을 줄임(본문과의 간격 축소) */
  spacing?: "default" | "tight";
  /** `compact`: 눈썹·제목·부제 사이 세로 간격을 촘촘하게 */
  density?: "default" | "compact";
  /**
   * `narrow`(기본): max-w-3xl — 회사 소개 등 본문 폭.
   * `full`: 상위 `max-w-6xl` 컨테이너와 같은 너비(파트너 상세 등).
   */
  contentWidth?: "narrow" | "full";
  /** `editorial`: h2를 slate·semibold로(회사 소개 등 미니멀 섹션). */
  visualWeight?: "default" | "editorial";
};

export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  headingLevel = 2,
  id,
  spacing = "default",
  density = "default",
  contentWidth = "narrow",
  visualWeight = "default",
}: Props) {
  const Tag = headingLevel === 1 ? "h1" : headingLevel === 3 ? "h3" : "h2";
  const size =
    headingLevel === 1
      ? "text-3xl font-bold tracking-tight text-msv-navy sm:text-4xl"
      : headingLevel === 3
        ? "text-lg font-semibold text-msv-navy"
        : visualWeight === "editorial"
          ? "text-2xl font-semibold tracking-[-0.02em] text-slate-900 sm:text-[1.75rem] sm:leading-tight"
          : "text-xl font-bold tracking-tight text-msv-navy sm:text-2xl";

  const mb = spacing === "tight" ? "mb-4" : "mb-8";
  const titleMt = density === "compact" ? "mt-1.5" : "mt-2";
  const subMt = density === "compact" ? "mt-2" : "mt-3";
  const subLeading = density === "compact" ? "leading-snug" : "leading-relaxed";

  const widthClass = contentWidth === "full" ? "max-w-none" : "max-w-3xl";

  return (
    <div className={`${mb} ${widthClass}`}>
      {eyebrow ? (
        <p
          className={
            visualWeight === "editorial"
              ? "text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500"
              : "msv-eyebrow"
          }
        >
          {eyebrow}
        </p>
      ) : null}
      <Tag id={id} className={`${titleMt} ${size}`}>
        {title}
      </Tag>
      {subtitle != null && subtitle !== "" ? (
        <div
          className={`${subMt} space-y-3 text-sm ${subLeading} ${visualWeight === "editorial" ? "text-slate-600 sm:text-[15px] sm:leading-relaxed" : "text-slate-600"}`}
        >
          {typeof subtitle === "string" ? <p className="m-0">{subtitle}</p> : subtitle}
        </div>
      ) : null}
    </div>
  );
}
