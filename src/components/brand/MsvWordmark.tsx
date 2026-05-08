/** CI 워드마크: `MsvMark` 와 동일한 6점 필드 + `minsub ventures` (PNG 없이 SVG) */
export type MsvWordmarkTone = "default" | "onDark";

type Props = {
  alt: string;
  className?: string;
  /** Tailwind 높이 클래스 예: `h-8 sm:h-9` */
  heightClass?: string;
  /** 어두운 배경용 팔레트 */
  tone?: MsvWordmarkTone;
  /** 이전 `next/image` 호환용 — SVG에서는 무시됩니다 */
  priority?: boolean;
};

const MARK_SCALE = 32 / 96;

export function MsvWordmark({
  alt,
  className = "",
  heightClass = "h-8 sm:h-9",
  tone = "default",
  priority: _priority = false,
}: Props) {
  const { field, dot, text } =
    tone === "onDark"
      ? { field: "#ffffff", dot: "#0f2744", text: "#ffffff" }
      : { field: "#0f2744", dot: "#ffffff", text: "#0f2744" };

  return (
    <svg
      className={`font-sans ${heightClass} w-auto max-w-[min(260px,72vw)] shrink-0 ${className}`.trim()}
      viewBox="0 0 268 32"
      role="img"
      aria-label={alt}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{alt}</title>
      <g transform={`scale(${MARK_SCALE})`}>
        <circle cx="48" cy="48" r="48" fill={field} />
        <circle cx="24" cy="32" r="10" fill={dot} />
        <circle cx="48" cy="32" r="10" fill={dot} />
        <circle cx="72" cy="32" r="10" fill={dot} />
        <circle cx="24" cy="64" r="10" fill={dot} />
        <circle cx="48" cy="64" r="10" fill={dot} />
        <circle cx="72" cy="64" r="10" fill={dot} />
      </g>
      <text
        x="40"
        y="22.5"
        fill={text}
        fontSize="15"
        fontWeight="600"
        letterSpacing="0.02em"
        fontFamily="ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
      >
        minsub ventures
      </text>
    </svg>
  );
}
