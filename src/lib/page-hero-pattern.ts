export type PageHeroPattern =
  | "ink"
  | "paper"
  | "split"
  | "slate"
  | "frame"
  | "band"
  | "folio";

/** locale prefix 제거 후 섹션별 히어로 패턴 */
export function resolvePageHeroPattern(browserPath: string): PageHeroPattern {
  const path = browserPath.replace(/^\/(en|zh)(?=\/|$)/, "") || "/";

  if (path.startsWith("/about") || path.startsWith("/team")) return "paper";
  if (path.startsWith("/services")) return "split";
  if (path.startsWith("/software")) return "folio";
  if (path.startsWith("/group")) return "slate";
  if (
    path.startsWith("/notice") ||
    path.startsWith("/articles") ||
    path.startsWith("/ongoing") ||
    path.startsWith("/qna")
  ) {
    return "frame";
  }
  if (path.startsWith("/contact")) return "band";
  return "paper";
}

export function pageHeroMeta(pattern: PageHeroPattern): {
  label: string;
  index: string;
} {
  switch (pattern) {
    case "paper":
      return { label: "About", index: "01" };
    case "split":
      return { label: "Services", index: "02" };
    case "folio":
      return { label: "Software", index: "03" };
    case "slate":
      return { label: "Group", index: "04" };
    case "frame":
      return { label: "Journal", index: "05" };
    case "band":
      return { label: "Contact", index: "06" };
    case "ink":
      return { label: "Page", index: "00" };
    default:
      return { label: "Page", index: "00" };
  }
}
