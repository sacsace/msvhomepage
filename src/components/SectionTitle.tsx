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
  /** `editorial`: magazine display 타이포 */
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
      ? "font-sans text-3xl font-semibold tracking-[-0.035em] text-msv-ink sm:text-4xl"
      : headingLevel === 3
        ? visualWeight === "editorial"
          ? "font-sans text-[clamp(1.55rem,2.6vw,2rem)] font-semibold tracking-[-0.03em] text-msv-ink"
          : "font-sans text-xl font-semibold tracking-[-0.025em] text-msv-ink"
        : visualWeight === "editorial"
          ? "font-sans text-[clamp(1.7rem,3vw,2.25rem)] font-semibold tracking-[-0.035em] text-msv-ink sm:leading-tight"
          : "font-sans text-2xl font-semibold tracking-[-0.03em] text-msv-ink sm:text-[1.85rem]";

  const mb = spacing === "tight" ? "mb-4" : "mb-8";
  const titleMt = density === "compact" ? "mt-2" : "mt-3";
  const subMt = density === "compact" ? "mt-2.5" : "mt-3.5";
  const subLeading = density === "compact" ? "leading-snug" : "leading-relaxed";

  const widthClass = contentWidth === "full" ? "max-w-none" : "max-w-3xl";

  return (
    <div className={`${mb} ${widthClass}`}>
      {eyebrow ? (
        <p
          className={
            visualWeight === "editorial"
              ? "font-sans text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500"
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
