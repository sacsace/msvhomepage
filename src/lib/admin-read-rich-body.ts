/**
 * contentEditable 본문은 React state보다 DOM이 최신인 경우가 많아,
 * 관리자 폼 제출 시 에디터 내용을 여기서 읽습니다.
 */
export function readRichBodyFromForm(form: HTMLFormElement): string {
  const el = form.querySelector("[contenteditable=true]");
  return el instanceof HTMLElement ? (el.innerHTML ?? "").trim() : "";
}
