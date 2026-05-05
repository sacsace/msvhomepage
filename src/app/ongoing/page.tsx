import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { StandardPageBody } from "@/components/layout/StandardPageBody";
import { staticPageSeo } from "@/lib/seo-metadata";
import { maskOngoingTaskTitle } from "@/lib/mask-public-title";
import { getCachedOngoingTasks } from "@/lib/public-page-data-cache";
import { sortOngoingTasks } from "@/lib/ongoing-tasks-store";
import { company } from "@/lib/site-content";
import { textExcerpt } from "@/lib/richtext";

export const metadata: Metadata = staticPageSeo("/ongoing", {
  title: "프로젝트 현황",
  description: `${company.shortName}에서 현재 진행 중인 프로젝트·업무 현황을 안내합니다.`,
});

export const revalidate = 60;

const listGrid =
  "md:grid md:grid-cols-[3.75rem_7.5rem_minmax(0,1fr)] md:items-center md:gap-x-5" as const;

export default async function OngoingPage() {
  const ongoing = sortOngoingTasks(await getCachedOngoingTasks());

  return (
    <>
      <PageHeader
        title="프로젝트 현황"
        description="진행 중인 주요 프로젝트·업무를 정리해 두었습니다. 자세한 협의는 문의를 통해 연락 주시기 바랍니다."
        descriptionWide
      />
      <StandardPageBody>
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
                  <div className="flex min-w-0 items-baseline gap-2 text-base leading-snug sm:gap-4 md:min-h-0">
                    <span className="min-w-0 flex-1 truncate font-bold text-msv-navy">
                      {maskOngoingTaskTitle(item.title)}
                    </span>
                    <span className="max-w-[42%] shrink-0 truncate text-right text-sm font-normal text-slate-600 sm:max-w-[48%] md:max-w-[50%]">
                      {textExcerpt(item.body, 160)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </StandardPageBody>
    </>
  );
}
