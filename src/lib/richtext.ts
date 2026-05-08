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
  "h2",
  "h3",
  "code",
  "pre",
] as const;

const allowedAttributes: sanitizeHtml.IOptions["allowedAttributes"] = {
  a: ["href", "target", "rel"],
  img: ["src", "alt", "style"],
  p: ["style"],
  div: ["style"],
  span: ["style"],
  h2: ["style"],
  h3: ["style"],
  code: ["style"],
  pre: ["style"],
};

const allowedStyles: sanitizeHtml.IOptions["allowedStyles"] = {
  "*": {
    "text-align": [/^left$/, /^center$/, /^right$/],
  },
  img: {
    width: [/^\d+(px|%)$/, /^auto$/],
    "max-width": [/^\d+(px|%)$/],
    height: [/^auto$/, /^\d+px$/],
    display: [/^block$/],
    "margin-left": [/^0$/, /^auto$/],
    "margin-right": [/^0$/, /^auto$/],
  },
};

/** 자료실 업로드 API가 저장하는 경로만 허용 (경로 조작 방지) */
const uploadsArticlesPath = /^\/uploads\/articles\/[a-f0-9-]+\.[a-z0-9]{2,12}$/i;
/** 절대 URL(같은 사이트/외부 CDN)로 저장된 경우도 경로가 동일하면 허용 */
const uploadsArticlesAbsolutePath = /^https?:\/\/[^/]+\/uploads\/articles\/[a-f0-9-]+\.[a-z0-9]{2,12}$/i;
/** 구형 관리자 에디터가 저장한 data URL 이미지(레거시 본문 호환) */
const legacyDataImage = /^data:image\/(?:png|jpe?g|webp|gif);base64,[a-z0-9+/=\s]+$/i;

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
      img: (tagName, attribs) => {
        const src = String(attribs.src || "").trim();
        if (!uploadsArticlesPath.test(src) && !uploadsArticlesAbsolutePath.test(src) && !legacyDataImage.test(src)) {
          return { tagName: "span", text: "", attribs: {} };
        }
        const next: Record<string, string> = { src, alt: String(attribs.alt || "") };
        if (attribs.style) next.style = String(attribs.style);
        return { tagName: "img", attribs: next };
      },
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
  const text = stripHtml(input)
    .replace(/[\u200b\u200c\u200d\ufeff]/g, "")
    .replace(/\s+/g, "")
    .trim();
  return text.length > 0 || /<img\b/i.test(input);
}

export function textExcerpt(input: string, max = 160): string {
  const plain = stripHtml(input).trim();
  return plain.length <= max ? plain : `${plain.slice(0, max - 1)}…`;
}
