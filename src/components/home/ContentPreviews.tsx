import Link from "next/link";
import { ComplianceCalendarWidget } from "@/components/home/ComplianceCalendarWidget";
import { MagazineSectionFrame } from "@/components/home/MagazineSectionFrame";
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
    <MagazineSectionFrame
      index="01"
      verticalLabel="Digest"
      className="border-t border-msv-ink/10 bg-[#f3f3f3]"
    >
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-0 lg:items-stretch">
        {/* 공지 — 잡지 좌측 칼럼 */}
        <section className="msv-fade-rise lg:col-span-5 lg:border-r lg:border-msv-ink/15 lg:pr-12">
          <p className={homeTypo.kickerBlue}>{c.noticeKicker}</p>
          <div className="mt-4 flex items-end justify-between gap-4">
            <h2 className={homeTypo.sectionHeading}>{c.noticeTitle}</h2>
            <Link href={L("/notice")} className={`shrink-0 pb-1 ${homeTypo.linkCta}`}>
              {c.noticeAll}
            </Link>
          </div>
          <div className="msv-magazine-rule mt-6 max-w-[6rem]" aria-hidden />

          {announcements.length === 0 ? (
            <p className={`mt-10 ${homeTypo.bodySm}`}>{c.noticeEmpty}</p>
          ) : (
            <ul className="mt-2 flex flex-col">
              {announcements.map((a) => {
                const { day, ym } = formatNoticeDate(a.createdAt);
                return (
                  <li key={a.id} className="border-b border-msv-ink/10">
                    <Link
                      href={L(`/notice/${a.id}`)}
                      className="group grid grid-cols-[4.25rem_minmax(0,1fr)] gap-5 py-7 sm:grid-cols-[5rem_minmax(0,1fr)] sm:gap-8"
                    >
                      <div>
                        <span className="block font-sans text-[2.35rem] font-bold tabular-nums leading-none tracking-[-0.06em] text-msv-ink">
                          {day}
                        </span>
                        <span className="mt-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                          {ym}
                        </span>
                      </div>
                      <div className="min-w-0 pt-1">
                        {a.pinned ? (
                          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-msv-mint">
                            {c.pinned}
                          </p>
                        ) : null}
                        <p className="font-sans text-[1.05rem] font-semibold leading-snug tracking-[-0.02em] text-msv-ink transition group-hover:underline group-hover:decoration-msv-ink/40 group-hover:underline-offset-4">
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

        {/* 신고준수 — 잡지 우측 스프레드 (카드 박스 제거) */}
        <section className="msv-fade-rise relative lg:col-span-7 lg:pl-12">
          <p className={homeTypo.kickerBlue}>{c.calendarKicker}</p>
          <h2 className={`mt-4 ${homeTypo.sectionHeading}`}>{c.calendarTitle}</h2>
          <div className="msv-magazine-rule mt-6 max-w-[6rem]" aria-hidden />
          <p className={`mt-6 max-w-xl text-pretty break-keep ${homeTypo.body}`}>{c.calendarLead}</p>
          <div className="mt-2">
            <ComplianceCalendarWidget events={calendarEvents} locale={locale} tone="paper" />
            <Link
              href={L("/services/compliance-calendar")}
              className={`mt-8 inline-flex ${homeTypo.linkCta}`}
            >
              {c.calendarGuideCta}
            </Link>
          </div>
        </section>
      </div>
    </MagazineSectionFrame>
  );
}
