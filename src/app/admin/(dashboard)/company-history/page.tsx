import { CompanyHistoryManager } from "@/components/admin/CompanyHistoryManager";
import { ADMIN_PAGE_LEAD_CLASS } from "@/lib/admin-page-layout";
import { readCompanyHistoryAdminInitial } from "@/lib/company-history-store";

export default async function AdminCompanyHistoryPage() {
  const initialItems = await readCompanyHistoryAdminInitial();

  return (
    <div>
      <h1 className="text-xl font-semibold text-zinc-900">회사 연혁</h1>
      <p className={ADMIN_PAGE_LEAD_CLASS}>회사 소개 페이지 「연혁」 블록에 표시됩니다.</p>
      <div className="mt-8">
        <CompanyHistoryManager initialItems={initialItems} />
      </div>
    </div>
  );
}
