/**
 * 진행 중인 업무 제목 공개용 마스킹 (그래프마 단위).
 * - 1번째: 그대로
 * - 2~5번째: `*`
 * - 6번째: 그대로 (문자가 있을 때만)
 * - 7번째 이후: `*`
 */
export function maskOngoingTaskTitle(text: string): string {
  const t = text.trim();
  if (t.length === 0) return "";
  const chars = Array.from(t);
  return chars
    .map((c, i) => {
      const pos = i + 1;
      if (pos === 1 || pos === 6) return c;
      if (pos >= 2 && pos <= 5) return "*";
      return "*";
    })
    .join("");
}
