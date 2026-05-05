import { CompanyHistoryManager } from "@/components/admin/CompanyHistoryManager";
import { readCompanyHistoryAdminInitial } from "@/lib/company-history-store";

export default async function AdminCompanyHistoryPage() {
  const initialItems = await readCompanyHistoryAdminInitial();

  return (
    <div>
      <h1 className="text-xl font-semibold text-zinc-900">회사 연혁</h1>
      <p className="mt-1 text-sm text-zinc-600">회사 소개 페이지의 「연혁」 블록에 표시됩니다.</p>
      <div className="mt-8">
        <CompanyHistoryManager initialItems={initialItems} />
      </div>
    </div>
  );
}
