import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { staticPageSeo } from "@/lib/seo-metadata";
import { maskOngoingTaskTitle } from "@/lib/mask-public-title";
import { readOngoingTasks, sortOngoingTasks } from "@/lib/ongoing-tasks-store";
import { company } from "@/lib/site-content";
import { textExcerpt } from "@/lib/richtext";

export const metadata: Metadata = staticPageSeo("/ongoing", {
  title: "진행중인 업무",
  description: `${company.shortName}에서 현재 진행 중인 업무를 안내합니다.`,
});

export const dynamic = "force-dynamic";

const listGrid =
  "md:grid md:grid-cols-[3.75rem_7.5rem_minmax(0,1fr)] md:items-start md:gap-x-5" as const;

export default async function OngoingPage() {
  const ongoing = sortOngoingTasks(await readOngoingTasks());

  return (
    <>
      <PageHeader
        title="현재 진행중인 업무"
        description="진행 중인 주요 업무를 정리해 두었습니다. 자세한 협의는 문의를 통해 연락 주시기 바랍니다."
      />
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
        {ongoing.length === 0 ? (
          <p className="text-sm text-slate-500">등록된 진행 업무가 없습니다.</p>
        ) : (
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div
              className={`hidden border-b border-slate-200 bg-slate-50 px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-slate-500 ${listGrid}`}
            >
              <span className="text-center">번호</span>
              <span>업데이트</span>
              <span>제목 · 요약</span>
            </div>
            <ul role="list">
              {ongoing.map((item, i) => (
                <li
                  key={item.id}
                  className={`border-b border-slate-200 px-4 py-4 last:border-b-0 transition-colors hover:bg-slate-50/90 sm:px-5 sm:py-4 ${listGrid}`}
                >
                  <div className="mb-3 flex items-center justify-between gap-3 md:mb-0 md:contents">
                    <span
                      className="inline-flex min-w-[2rem] items-center justify-center rounded-md border border-msv-blue/25 bg-msv-blue-soft px-2 py-1 text-xs font-bold tabular-nums text-msv-blue md:justify-self-center md:px-2"
                      aria-hidden
                    >
                      {String(ongoing.length - i).padStart(2, "0")}
                    </span>
                    <time
                      dateTime={item.updatedAt}
                      className="shrink-0 text-xs tabular-nums text-slate-500 md:pt-0.5 md:text-left"
                    >
                      {new Date(item.updatedAt).toLocaleDateString("ko-KR")}
                    </time>
                  </div>
                  <div className="min-w-0 space-y-1.5 md:min-h-0">
                    <h2 className="text-base font-bold leading-snug text-msv-navy">
                      {maskOngoingTaskTitle(item.title)}
                    </h2>
                    <p className="text-sm leading-relaxed text-slate-600 line-clamp-3 md:line-clamp-2">
                      {textExcerpt(item.body, 160)}
                    </p>
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
