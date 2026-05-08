export type Article = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  createdAt: string;
  updatedAt: string;
};

/** 자료실 목록용(본문 미포함) — `unstable_cache` 직렬화 크기 제한 대응 */
export type ArticleListItem = {
  id: string;
  title: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  excerpt: string;
  /** 목록에 표시할 한 줄 미리보기 */
  listPreview: string;
};
