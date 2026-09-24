import { NumberedHighlightCard } from "@/components/home/NumberedHighlightCard";

type Props = {
  items: readonly string[];
};

/** 스포트라이트 카드 내부 — 2열 번호 그리드 */
export function SpotlightHighlightGrid({ items }: Props) {
  return (
    <ul className="mt-6 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2 sm:gap-4">
      {items.map((item, i) => (
        <NumberedHighlightCard key={item} index={String(i + 1).padStart(2, "0")} variant="spotlight">
          {item}
        </NumberedHighlightCard>
      ))}
    </ul>
  );
}
