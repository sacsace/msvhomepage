import { TaxCalendarManager } from "@/components/admin/TaxCalendarManager";
import { ADMIN_PAGE_LEAD_CLASS } from "@/lib/admin-page-layout";
import { readTaxCalendarTemplates, sortTaxCalendarByDate } from "@/lib/tax-calendar-store";

export default async function AdminTaxCalendarPage() {
  const initialItems = sortTaxCalendarByDate(await readTaxCalendarTemplates());

  return (
    <div>
      <h1 className="text-xl font-semibold text-zinc-900">신고·준수 달력</h1>
      <p className={ADMIN_PAGE_LEAD_CLASS}>
        TDS·GST·PT·ESI 등 일정 등록 → 홈 달력 표시. 새 일정 기본 「매년」 반복, 연·월 필터 조회.
      </p>
      <div className="mt-8">
        <TaxCalendarManager initialItems={initialItems} />
      </div>
    </div>
  );
}
