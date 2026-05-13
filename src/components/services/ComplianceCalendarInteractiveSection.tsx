import { ComplianceCalendarWidget } from "@/components/home/ComplianceCalendarWidget";
import type { SiteLocale } from "@/lib/site-locale";
import type { TaxCalendarEvent } from "@/types/tax-calendar-event";

type Props = {
  readonly kicker: string;
  readonly title: string;
  readonly lead: string;
  readonly events: readonly TaxCalendarEvent[];
  readonly locale: SiteLocale;
};

/** ServiceGuide 카드와 동일 톤 — 히어로(네이비) 아래 본문에 자연스럽게 이어짐 */
export function ComplianceCalendarInteractiveSection({ kicker, title, lead, events, locale }: Props) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <header className="border-b border-slate-100 pb-5 sm:pb-6">
        <span className="inline-flex items-center rounded-md border border-msv-blue/25 bg-msv-blue-soft/45 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-msv-blue sm:text-[11px]">
          {kicker}
        </span>
        <h2 className="mt-3 text-lg font-bold tracking-tight text-msv-navy sm:text-xl">{title}</h2>
        <p className="mt-2 max-w-3xl text-pretty text-sm leading-relaxed text-slate-600 sm:text-[15px]">{lead}</p>
      </header>
      <div className="mt-5 rounded-xl border border-slate-100 bg-slate-50/90 p-4 sm:mt-6 sm:p-5">
        <ComplianceCalendarWidget variant="month" embedMonthOnLight={true} events={[...events]} locale={locale} />
      </div>
    </section>
  );
}
