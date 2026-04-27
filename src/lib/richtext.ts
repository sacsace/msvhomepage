import sanitizeHtml from "sanitize-html";

const allowedTags = [
  "p",
  "br",
  "div",
  "span",
  "strong",
  "b",
  "em",
  "i",
  "u",
  "s",
  "a",
  "ul",
  "ol",
  "li",
  "blockquote",
  "img",
] as const;

const allowedAttributes: sanitizeHtml.IOptions["allowedAttributes"] = {
  a: ["href", "target", "rel"],
  img: ["src", "alt", "style"],
  p: ["style"],
  div: ["style"],
  span: ["style"],
};

const allowedStyles: sanitizeHtml.IOptions["allowedStyles"] = {
  "*": {
    "text-align": [/^left$/, /^center$/, /^right$/],
  },
  img: {
    width: [/^\d+(px|%)$/],
    "max-width": [/^\d+%$/],
    height: [/^auto$/, /^\d+px$/],
    display: [/^block$/],
    "margin-left": [/^0$/, /^auto$/],
    "margin-right": [/^0$/, /^auto$/],
  },
};

export function sanitizeRichHtml(input: string): string {
  return sanitizeHtml(input, {
    allowedTags: [...allowedTags],
    allowedAttributes,
    allowedStyles,
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", {
        rel: "noopener noreferrer",
        target: "_blank",
      }),
    },
  });
}

export function hasHtmlTag(input: string): boolean {
  return /<\/?[a-z][\s\S]*>/i.test(input);
}

export function stripHtml(input: string): string {
  return sanitizeHtml(input, { allowedTags: [], allowedAttributes: {} }).replace(/\u00a0/g, " ");
}

export function isRichTextMeaningful(input: string): boolean {
  const text = stripHtml(input).replace(/\s+/g, "").trim();
  return text.length > 0 || /<img\b/i.test(input);
}

export function textExcerpt(input: string, max = 160): string {
  const plain = stripHtml(input).trim();
  return plain.length <= max ? plain : `${plain.slice(0, max - 1)}…`;
}
