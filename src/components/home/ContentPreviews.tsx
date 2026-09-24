import Link from "next/link";
import { ComplianceCalendarWidget } from "@/components/home/ComplianceCalendarWidget";
import { homeTypo } from "@/lib/home-typography";
import { contentPreviewsCopy } from "@/lib/i18n/public-home";
import type { SiteLocale } from "@/lib/site-locale";
import { withLocalePrefix } from "@/lib/site-locale";
import type { AnnouncementListItem } from "@/types/announcement";
import type { TaxCalendarEvent } from "@/types/tax-calendar-event";

type Props = {
  announcements: AnnouncementListItem[];
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
    <div className="border-t border-slate-200/50 bg-[#f4f5f7] py-10 sm:py-12">
      <div
        className={`mx-auto grid max-w-6xl gap-5 sm:gap-6 lg:grid-cols-2 lg:items-stretch ${homeTypo.pageInset}`}
      >
        <section className="flex h-full min-h-0 min-w-0 flex-col rounded-2xl border border-slate-200/80 bg-white px-5 py-10 shadow-sm sm:px-8 sm:py-12">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className={homeTypo.kickerBlue}>{c.noticeKicker}</p>
              <h2 className={`mt-1.5 ${homeTypo.cardHeading}`}>{c.noticeTitle}</h2>
            </div>
            <Link
              href={L("/notice")}
              className="shrink-0 text-xs font-semibold text-msv-blue underline-offset-2 hover:underline sm:text-sm"
            >
              {c.noticeAll}
            </Link>
          </div>
          {announcements.length === 0 ? (
            <p className={`mt-8 flex-1 ${homeTypo.bodySm} text-slate-500`}>{c.noticeEmpty}</p>
          ) : (
            <ul className="mt-6 flex min-h-0 flex-1 flex-col divide-y divide-slate-100 sm:mt-8">
              {announcements.map((a) => {
                const { day, ym } = formatNoticeDate(a.createdAt);
                return (
                  <li key={a.id} className="min-h-0">
                    <Link
                      href={L(`/notice/${a.id}`)}
                      className="group flex items-center gap-4 rounded-xl py-3.5 transition first:pt-0 hover:bg-slate-50/70 sm:gap-5 sm:px-2 sm:py-4"
                    >
                      <div className="flex w-[3.5rem] shrink-0 flex-col items-center justify-center self-center pr-2 text-center sm:w-[3.75rem] sm:pr-3">
                        <span className="text-lg font-semibold tabular-nums leading-none text-msv-navy sm:text-xl">
                          {day}
                        </span>
                        <span className="mt-1 text-[10px] font-medium tabular-nums tracking-wide text-slate-400 sm:text-[11px]">
                          {ym}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="mb-0.5 flex min-h-[1rem] items-center">
                          {a.pinned ? (
                            <span className="rounded-md border border-msv-blue/25 bg-msv-blue-soft/60 px-1.5 py-px text-[9px] font-bold uppercase tracking-wide text-msv-blue sm:text-[10px]">
                              {c.pinned}
                            </span>
                          ) : null}
                        </div>
                        <p className="text-sm font-semibold leading-snug tracking-tight text-slate-900 sm:text-[15px] sm:leading-snug group-hover:text-msv-blue">
                          {a.title}
                        </p>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        <section className="relative isolate flex h-full min-h-0 min-w-0 flex-col overflow-hidden rounded-2xl border border-msv-navy/20 bg-gradient-to-br from-msv-navy via-[#122338] to-slate-950 px-5 py-10 text-white shadow-md sm:px-8 sm:py-12">
          <div
            className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_100%_55%_at_100%_-5%,rgba(45,91,255,0.2),transparent)]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(160deg,rgba(15,39,68,0.35)_0%,transparent_45%)]"
            aria-hidden
          />
          <div className="relative z-10 shrink-0">
            <p className={homeTypo.kickerOnNavy}>{c.calendarKicker}</p>
            <h2 className={`mt-1.5 ${homeTypo.cardHeadingWhite}`}>{c.calendarTitle}</h2>
            <p className={`mt-2 max-w-2xl text-pretty break-keep ${homeTypo.bodyWhiteMuted}`}>{c.calendarLead}</p>
          </div>
          <div className="relative z-10 mt-6 flex min-h-0 flex-1 flex-col sm:mt-8">
            <ComplianceCalendarWidget events={calendarEvents} locale={locale} />
            <Link
              href={L("/services/compliance-calendar")}
              className="relative z-20 mt-5 inline-flex w-fit text-xs font-semibold text-msv-blue-soft underline-offset-2 hover:text-white hover:underline sm:text-sm"
            >
              {c.calendarGuideCta}
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
