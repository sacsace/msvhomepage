import Link from "next/link";
import { ComplianceCalendarWidget } from "@/components/home/ComplianceCalendarWidget";
import { homeTypo } from "@/lib/home-typography";
import { contentPreviewsCopy } from "@/lib/i18n/public-home";
import type { SiteLocale } from "@/lib/site-locale";
import { withLocalePrefix } from "@/lib/site-locale";
import type { Announcement } from "@/types/announcement";
import type { TaxCalendarEvent } from "@/types/tax-calendar-event";

type Props = {
  announcements: Announcement[];
  calendarEvents: TaxCalendarEvent[];
  locale: SiteLocale;
};

function formatNoticeDate(iso: string) {
  const d = new Date(iso);
  const day = d.getDate();
  const ym = `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}`;
  return { day, ym };
}

export function ContentPreviews({ announcements, calendarEvents, locale }: Props) {
  const c = contentPreviewsCopy(locale);
  const L = (path: string) => withLocalePrefix(path, locale);

  return (
    <div className="border-t border-slate-200/40 bg-[#f5f6f8] py-6 sm:py-8">
      <div
        className={`mx-auto grid max-w-6xl gap-4 sm:gap-5 lg:grid-cols-2 lg:items-start ${homeTypo.pageInset}`}
      >
        <section className="min-w-0 rounded-2xl bg-white px-5 py-10 shadow-[0_2px_16px_rgba(15,23,42,0.045)] sm:px-8 sm:py-12">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className={homeTypo.kickerBlue}>{c.noticeKicker}</p>
              <h2 className={`mt-1 ${homeTypo.cardHeading}`}>{c.noticeTitle}</h2>
            </div>
            <Link
              href={L("/notice")}
              className="shrink-0 text-xs font-semibold text-msv-blue underline-offset-2 hover:underline sm:text-sm"
            >
              {c.noticeAll}
            </Link>
          </div>
          {announcements.length === 0 ? (
            <p className={`mt-8 ${homeTypo.bodySm} text-slate-500`}>{c.noticeEmpty}</p>
          ) : (
            <ul className="mt-8 divide-y divide-slate-100/90">
              {announcements.map((a) => {
                const { day, ym } = formatNoticeDate(a.createdAt);
                return (
                  <li key={a.id}>
                    <Link
                      href={L(`/notice/${a.id}`)}
                      className="group flex gap-4 py-5 transition first:pt-0 hover:bg-slate-50/60 sm:gap-5 sm:rounded-lg sm:px-1"
                    >
                      <div className="flex w-14 shrink-0 flex-col items-center pr-3 text-center sm:w-16 sm:pr-4">
                        <span className="text-2xl font-semibold tabular-nums leading-none text-slate-900 sm:text-3xl">
                          {day}
                        </span>
                        <span className="mt-1 text-[10px] font-medium tabular-nums text-slate-400">{ym}</span>
                      </div>
                      <div className="min-w-0 flex-1 pt-0.5">
                        {a.pinned ? (
                          <span className="mb-1 inline-block rounded border border-msv-blue/25 bg-msv-blue-soft/60 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-msv-blue">
                            {c.pinned}
                          </span>
                        ) : null}
                        <p className={`${homeTypo.itemTitle} leading-snug group-hover:text-msv-blue`}>{a.title}</p>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        <section className="relative isolate min-w-0 overflow-hidden rounded-2xl bg-msv-navy px-5 py-10 text-white shadow-[0_8px_32px_rgba(15,23,42,0.12)] sm:px-8 sm:py-12">
          <div
            className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_100%_55%_at_100%_-5%,rgba(45,91,255,0.2),transparent)]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(160deg,rgba(15,39,68,0.35)_0%,transparent_45%)]"
            aria-hidden
          />
          <div className="relative z-10">
            <p className={homeTypo.kickerOnNavy}>{c.calendarKicker}</p>
            <h2 className={`mt-1 ${homeTypo.cardHeadingWhite}`}>{c.calendarTitle}</h2>
            <p className={`mt-1 max-w-2xl text-pretty break-keep ${homeTypo.bodyWhiteMuted}`}>{c.calendarLead}</p>
          </div>
          <div className="relative z-10">
            <ComplianceCalendarWidget events={calendarEvents} locale={locale} />
          </div>
        </section>
      </div>
    </div>
  );
}
