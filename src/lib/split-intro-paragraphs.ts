/** `site-content` 본문에서 `\n\n`(또는 그 이상)으로 문단을 나눕니다. */
export function splitIntroParagraphs(intro: string): string[] {
  return intro
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);
}
