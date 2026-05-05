import { TaxCalendarManager } from "@/components/admin/TaxCalendarManager";
import { readTaxCalendar, sortTaxCalendarByDate } from "@/lib/tax-calendar-store";

export default async function AdminTaxCalendarPage() {
  const initialItems = sortTaxCalendarByDate(await readTaxCalendar());

  return (
    <div>
      <h1 className="text-xl font-semibold text-zinc-900">신고·준수 달력</h1>
      <p className="mt-1 text-sm text-zinc-600">
        TDS, GST, PT, ESI, ECB, Advance Tax, 주주회의, 휴일 등 일정을 등록하면 홈 화면 달력에 표시됩니다.
      </p>
      <div className="mt-8">
        <TaxCalendarManager initialItems={initialItems} />
      </div>
    </div>
  );
}
