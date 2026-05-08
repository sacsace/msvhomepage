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
        className={`mx-auto grid max-w-6xl gap-4 sm:gap-5 lg:grid-cols-2 lg:items-stretch ${homeTypo.pageInset}`}
      >
        <section className="flex h-full min-h-0 min-w-0 flex-col rounded-2xl bg-white px-5 py-10 shadow-[0_2px_16px_rgba(15,23,42,0.045)] sm:px-8 sm:py-12">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className={`${homeTypo.kickerBlue} text-[9px] sm:text-[10px]`}>{c.noticeKicker}</p>
              <h2 className="mt-0.5 text-base font-semibold tracking-[-0.02em] text-slate-900 sm:text-lg sm:leading-snug">
                {c.noticeTitle}
              </h2>
            </div>
            <Link
              href={L("/notice")}
              className="shrink-0 text-[10px] font-semibold text-msv-blue underline-offset-2 hover:underline sm:text-[11px]"
            >
              {c.noticeAll}
            </Link>
          </div>
          {announcements.length === 0 ? (
            <p className={`mt-8 flex-1 ${homeTypo.bodySm} text-slate-500`}>{c.noticeEmpty}</p>
          ) : (
            <ul className="mt-6 flex min-h-0 flex-1 flex-col divide-y divide-slate-100/90 sm:mt-8">
              {announcements.map((a) => {
                const { day, ym } = formatNoticeDate(a.createdAt);
                return (
                  <li key={a.id} className="min-h-0">
                    <Link
                      href={L(`/notice/${a.id}`)}
                      className="group flex items-center gap-4 py-3.5 transition first:pt-0 hover:bg-slate-50/60 sm:gap-5 sm:rounded-lg sm:px-1 sm:py-4"
                    >
                      <div className="flex w-[3.25rem] shrink-0 flex-col items-center self-center pr-2 text-center sm:w-14 sm:pr-3">
                        <span className="text-base font-semibold tabular-nums leading-none text-slate-900 sm:text-lg">
                          {day}
                        </span>
                        <span className="mt-0.5 text-[8px] font-medium tabular-nums text-slate-400 sm:text-[9px]">
                          {ym}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="mb-0.5 flex min-h-[1rem] items-center">
                          {a.pinned ? (
                            <span className="rounded border border-msv-blue/25 bg-msv-blue-soft/60 px-1 py-px text-[8px] font-bold uppercase tracking-wide text-msv-blue sm:text-[9px]">
                              {c.pinned}
                            </span>
                          ) : null}
                        </div>
                        <p className="text-[11px] font-semibold leading-snug tracking-tight text-slate-900 sm:text-xs sm:leading-snug group-hover:text-msv-blue">
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

        <section className="relative isolate flex h-full min-h-0 min-w-0 flex-col overflow-hidden rounded-2xl bg-msv-navy px-5 py-10 text-white shadow-[0_8px_32px_rgba(15,23,42,0.12)] sm:px-8 sm:py-12">
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
