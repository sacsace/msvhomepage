const MAX = 20000;

export type TextEditResult = { value: string; selStart: number; selEnd: number };

function clamp(value: string): string {
  return value.length <= MAX ? value : value.slice(0, MAX);
}

/** 선택 구간을 `before` + 선택 + `after` 로 감쌉니다. 선택이 없으면 플레이스홀더를 넣고 그 안을 선택합니다. */
export function wrapSelection(
  value: string,
  start: number,
  end: number,
  before: string,
  after: string,
  placeholder: string,
): TextEditResult {
  const sel = value.slice(start, end);
  if (sel.length === 0) {
    const ins = before + placeholder + after;
    let next = value.slice(0, start) + ins + value.slice(end);
    next = clamp(next);
    const s = start + before.length;
    const e = s + placeholder.length;
    return { value: next, selStart: s, selEnd: e };
  }
  let next = value.slice(0, start) + before + sel + after + value.slice(end);
  next = clamp(next);
  const s = start + before.length;
  const e = s + sel.length;
  return { value: next, selStart: s, selEnd: e };
}

/** 각 줄 앞에 접두어를 붙입니다(목록·인용). 선택이 비어 있으면 호출부에서 별도 처리하세요. */
export function prefixEachLine(
  value: string,
  start: number,
  end: number,
  prefix: string | ((lineIndex: number) => string),
): TextEditResult {
  const block = value.slice(start, end);
  if (block.length === 0) {
    return { value, selStart: start, selEnd: end };
  }
  const lines = block.split("\n");
  const nextLines = lines.map((line, i) => {
    const p = typeof prefix === "function" ? prefix(i) : prefix;
    if (line === "") return line;
    return p + line;
  });
  const inserted = nextLines.join("\n");
  let next = value.slice(0, start) + inserted + value.slice(end);
  next = clamp(next);
  const delta = inserted.length - block.length;
  return { value: next, selStart: start, selEnd: end + delta };
}

export function insertAtCursor(value: string, start: number, end: number, chunk: string): TextEditResult {
  let next = value.slice(0, start) + chunk + value.slice(end);
  next = clamp(next);
  const pos = start + chunk.length;
  return { value: next, selStart: pos, selEnd: pos };
}
