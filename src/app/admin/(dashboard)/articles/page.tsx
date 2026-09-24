import { ArticlesManager } from "@/components/admin/ArticlesManager";
import { ADMIN_PAGE_LEAD_CLASS } from "@/lib/admin-page-layout";
import { readArticles } from "@/lib/articles-store";

export default async function AdminArticlesPage() {
  const initialItems = await readArticles();

  return (
    <div>
      <h1 className="text-xl font-semibold text-zinc-900">자료실</h1>
      <p className={ADMIN_PAGE_LEAD_CLASS}>슬러그는 저장 시 자동 생성 — 수정 시 URL이 바뀔 수 있습니다.</p>
      <div className="mt-8">
        <ArticlesManager initialItems={initialItems} />
      </div>
    </div>
  );
}
