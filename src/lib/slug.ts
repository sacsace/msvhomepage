import { randomBytes } from "crypto";

/** URL용 슬러그 (한글 제목은 유지, 공백·특수문자만 정리 + 고유 접미사) */
export function makeArticleSlug(title: string): string {
  const base = title
    .trim()
    .slice(0, 48)
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9가-힣-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  const suffix = randomBytes(3).toString("hex");
  return (base || "article") + "-" + suffix;
}
