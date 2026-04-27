type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
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
   * `full`: 상위 `max-w-6xl` 컨테이너와 같은 너비(함께하는 회사 상세 등).
   */
  contentWidth?: "narrow" | "full";
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
}: Props) {
  const Tag = headingLevel === 1 ? "h1" : headingLevel === 3 ? "h3" : "h2";
  const size =
    headingLevel === 1
      ? "text-3xl font-bold tracking-tight text-msv-navy sm:text-4xl"
      : headingLevel === 3
        ? "text-lg font-semibold text-msv-navy"
        : "text-xl font-bold tracking-tight text-msv-navy sm:text-2xl";

  const mb = spacing === "tight" ? "mb-4" : "mb-8";
  const titleMt = density === "compact" ? "mt-1.5" : "mt-2";
  const subMt = density === "compact" ? "mt-2" : "mt-3";
  const subLeading = density === "compact" ? "leading-snug" : "leading-relaxed";

  const widthClass = contentWidth === "full" ? "max-w-none" : "max-w-3xl";

  return (
    <div className={`${mb} ${widthClass}`}>
      {eyebrow ? <p className="msv-eyebrow">{eyebrow}</p> : null}
      <Tag id={id} className={`${titleMt} ${size}`}>
        {title}
      </Tag>
      {subtitle ? (
        <p className={`${subMt} text-sm ${subLeading} text-slate-600`}>{subtitle}</p>
      ) : null}
    </div>
  );
}
