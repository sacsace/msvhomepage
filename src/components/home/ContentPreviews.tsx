import Link from "next/link";
import { ComplianceCalendarWidget } from "@/components/home/ComplianceCalendarWidget";
import type { Announcement } from "@/types/announcement";
import type { TaxCalendarEvent } from "@/types/tax-calendar-event";

type Props = {
  announcements: Announcement[];
  calendarEvents: TaxCalendarEvent[];
};

function formatNoticeDate(iso: string) {
  const d = new Date(iso);
  const day = d.getDate();
  const ym = `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}`;
  return { day, ym };
}

export function ContentPreviews({ announcements, calendarEvents }: Props) {
  return (
    <div className="border-y border-msv-navy/10">
      <div className="mx-auto grid max-w-6xl lg:grid-cols-2">
        {/* SAMPLE형 NOTICE — 밝은 면 */}
        <section className="border-b border-slate-200 bg-white px-5 py-10 sm:px-8 sm:py-12 lg:border-b-0 lg:border-r lg:border-slate-200">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-msv-blue">Notice</p>
              <h2 className="mt-1 text-lg font-bold text-msv-navy sm:text-xl">공지사항</h2>
            </div>
            <Link
              href="/notice"
              className="shrink-0 text-xs font-semibold text-msv-blue underline-offset-2 hover:underline"
            >
              전체 →
            </Link>
          </div>
          {announcements.length === 0 ? (
            <p className="mt-8 text-sm text-slate-500">등록된 공지가 없습니다.</p>
          ) : (
            <ul className="mt-8 divide-y divide-slate-100">
              {announcements.map((a) => {
                const { day, ym } = formatNoticeDate(a.createdAt);
                return (
                  <li key={a.id}>
                    <Link
                      href={`/notice/${a.id}`}
                      className="group flex gap-4 py-5 transition first:pt-0 hover:bg-slate-50/80 sm:gap-5 sm:px-1"
                    >
                      <div className="flex w-14 shrink-0 flex-col items-center border-r border-slate-100 pr-4 text-center sm:w-16">
                        <span className="text-2xl font-bold tabular-nums leading-none text-msv-navy sm:text-3xl">
                          {day}
                        </span>
                        <span className="mt-1 text-[10px] font-medium tabular-nums text-slate-400">{ym}</span>
                      </div>
                      <div className="min-w-0 flex-1 pt-0.5">
                        {a.pinned ? (
                          <span className="mb-1 inline-block rounded border border-msv-blue/25 bg-msv-blue-soft/60 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-msv-blue">
                            고정
                          </span>
                        ) : null}
                        <p className="text-sm font-semibold leading-snug text-slate-900 group-hover:text-msv-blue sm:text-[15px]">
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

        {/* 신고·준수 달력 — 히어로·투자 블록과 동일한 네이비 톤 */}
        <section className="relative isolate overflow-hidden bg-msv-navy px-5 py-10 text-white sm:px-8 sm:py-12">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_100%_55%_at_100%_-5%,rgba(45,91,255,0.2),transparent)]"
            aria-hidden
          />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,rgba(15,39,68,0.35)_0%,transparent_45%)]" aria-hidden />
          <div className="relative">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-msv-blue-soft/90">Compliance</p>
            <h2 className="mt-1 text-lg font-bold sm:text-xl">신고·준수 달력</h2>
            <p className="mt-1 max-w-md text-xs text-white/60">
              TDS·GST·PT·ESI·ECB·Advance Tax·주주회의 등 주요 일정을 한눈에 확인합니다.
            </p>
          </div>
          <div className="relative">
            <ComplianceCalendarWidget events={calendarEvents} />
          </div>
        </section>
      </div>
    </div>
  );
}
