import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import {
  readAnnouncements,
  sortAnnouncementsPublic,
} from "@/lib/announcements-store";
import { company } from "@/lib/site-content";
import { textExcerpt } from "@/lib/richtext";

export const metadata: Metadata = {
  title: "공지사항",
  description: `${company.shortName} 공지사항`,
};

export const dynamic = "force-dynamic";

const listGrid =
  "md:grid md:grid-cols-[3.5rem_7.5rem_3.25rem_minmax(0,1fr)] md:items-start md:gap-x-4" as const;

export default async function NoticeListPage() {
  const list = sortAnnouncementsPublic(await readAnnouncements());

  return (
    <>
      <PageHeader
        title="공지사항"
        description="회사 소식과 안내를 올립니다."
      />
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
        {list.length === 0 ? (
          <p className="text-sm text-slate-500">등록된 공지가 없습니다.</p>
        ) : (
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div
              className={`hidden border-b border-slate-200 bg-slate-50 px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-slate-500 ${listGrid}`}
            >
              <span className="text-center">번호</span>
              <span>등록일</span>
              <span className="text-center">고정</span>
              <span>제목 · 요약</span>
            </div>
            <ul role="list">
              {list.map((a, i) => (
                <li
                  key={a.id}
                  className={`border-b border-slate-200 px-4 py-4 last:border-b-0 transition-colors hover:bg-slate-50/90 sm:px-5 sm:py-4 ${listGrid}`}
                >
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2 md:mb-0 md:contents">
                    <span
                      className="inline-flex min-w-[2rem] items-center justify-center rounded-md border border-msv-blue/25 bg-msv-blue-soft px-2 py-1 text-xs font-bold tabular-nums text-msv-blue md:justify-self-center"
                      aria-hidden
                    >
                      {String(list.length - i).padStart(2, "0")}
                    </span>
                    <time
                      dateTime={a.createdAt}
                      className="text-xs tabular-nums text-slate-500 md:pt-0.5 md:text-left"
                    >
                      {new Date(a.createdAt).toLocaleDateString("ko-KR")}
                    </time>
                    <span className="md:justify-self-center md:pt-0.5">
                      {a.pinned ? (
                        <span className="rounded border border-msv-blue/20 bg-msv-blue-soft/70 px-1.5 py-0.5 text-[10px] font-semibold text-msv-blue">
                          고정
                        </span>
                      ) : (
                        <span className="text-xs text-slate-300 md:inline">—</span>
                      )}
                    </span>
                  </div>
                  <div className="min-w-0 md:min-h-0">
                    <Link
                      href={`/notice/${a.id}`}
                      className="group block rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-msv-blue"
                    >
                      <h2 className="text-base font-bold leading-snug text-msv-navy group-hover:text-msv-blue group-hover:underline">
                        {a.title}
                      </h2>
                      <p className="mt-1.5 text-sm leading-relaxed text-slate-600 line-clamp-3 md:line-clamp-2">
                        {textExcerpt(a.body, 160)}
                      </p>
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
