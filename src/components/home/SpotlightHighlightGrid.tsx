import { NumberedHighlightCard } from "@/components/home/NumberedHighlightCard";

type Props = {
  items: readonly string[];
};

/** 홈 핵심 강점 카드와 동일한 2열 번호 카드 그리드 */
export function SpotlightHighlightGrid({ items }: Props) {
  return (
    <ul className="mt-6 grid list-none gap-2 p-0 sm:grid-cols-2">
      {items.map((item, i) => (
        <NumberedHighlightCard key={item} index={String(i + 1).padStart(2, "0")}>
          {item}
        </NumberedHighlightCard>
      ))}
    </ul>
  );
}
