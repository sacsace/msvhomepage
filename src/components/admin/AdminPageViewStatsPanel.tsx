import type { AdminUiLocale } from "@/lib/admin-ui-locale-constants";
import { adminPageViewStatsCopy } from "@/lib/admin-ui-strings";
import {
  formatPageViewReferrerDisplay,
  type AdminPageViewStats,
} from "@/lib/page-view-store";

type PageViewStatsCopy = ReturnType<typeof adminPageViewStatsCopy>;

type Props = {
  copy: PageViewStatsCopy;
  stats: AdminPageViewStats;
  uiLocale: AdminUiLocale;
};

function sourceLabel(sourceKey: string, directLabel: string): string {
  if (!sourceKey) return directLabel;
  return sourceKey;
}

/** 테이블 래퍼 + 헤더/바디 공통 스타일(관리자 통계 가독성) */
function statsTableShell(children: React.ReactNode) {
  return (
    <div className="mt-3 overflow-x-auto rounded-xl border border-zinc-300 bg-white shadow-sm">
      {children}
    </div>
  );
}

export function AdminPageViewStatsPanel({ copy, stats, uiLocale }: Props) {
  const nf = Intl.NumberFormat(uiLocale === "en" ? "en-IN" : "ko-KR");
  const dfShort = new Intl.DateTimeFormat(uiLocale === "en" ? "en-IN" : "ko-KR", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
  const dfUtcFull = new Intl.DateTimeFormat(uiLocale === "en" ? "en-IN" : "ko-KR", {
    dateStyle: "short",
    timeStyle: "medium",
    timeZone: "UTC",
  });

  const theadRow =
    "border-b border-zinc-300 bg-zinc-100 text-left text-[11px] font-semibold uppercase tracking-wider text-zinc-700";

  return (
    <section className="rounded-2xl border border-zinc-300 bg-white p-6 shadow-md ring-1 ring-zinc-900/5 sm:p-8">
      <h2 className="text-[11px] font-bold uppercase tracking-[0.14em] text-zinc-600">{copy.sectionTitle}</h2>
      <p className="mt-2 text-[13px] leading-relaxed text-zinc-700">{copy.sectionHint}</p>

      {stats.unavailable ? (
        <p className="mt-5 text-sm font-medium text-amber-900">{copy.unavailable}</p>
      ) : (
        <div className="mt-8 space-y-10">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-zinc-200 bg-zinc-50/90 px-4 py-4">
              <p className="text-xs font-semibold text-zinc-700">{copy.totalLabel}</p>
              <p className="mt-1 text-3xl font-bold tabular-nums tracking-tight text-zinc-950">
                {nf.format(stats.total)}
              </p>
              <p className="mt-2 text-[13px] leading-snug text-zinc-600">{copy.totalHint}</p>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-zinc-50/90 px-4 py-4">
              <p className="text-xs font-semibold text-zinc-700">{copy.last30Label}</p>
              <p className="mt-1 text-3xl font-bold tabular-nums tracking-tight text-zinc-950">
                {nf.format(stats.viewsLast30Days)}
              </p>
              <p className="mt-2 text-[13px] leading-snug text-zinc-600">{copy.last30Hint}</p>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-zinc-700">{copy.last7Title}</p>
            <p className="mt-1 text-[13px] leading-relaxed text-zinc-600">{copy.last7Hint}</p>
            <ul className="mt-4 flex flex-wrap gap-2.5">
              {stats.last7Days.map((row) => (
                <li
                  key={row.date}
                  className="flex min-w-[6.75rem] flex-1 flex-col rounded-xl border border-zinc-300 bg-white px-3.5 py-3 shadow-sm"
                >
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-600">
                    {dfShort.format(new Date(`${row.date}T12:00:00.000Z`))}
                  </span>
                  <span className="mt-1 text-xl font-bold tabular-nums text-zinc-950">{nf.format(row.count)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
            <div>
              <p className="text-xs font-semibold text-zinc-700">{copy.topPathsTitle}</p>
              <p className="mt-1 text-[13px] leading-relaxed text-zinc-600">{copy.topPathsHint}</p>
              {stats.topPaths.length === 0 ? (
                <p className="mt-3 text-sm font-medium text-zinc-600">—</p>
              ) : (
                statsTableShell(
                  <table className="w-full min-w-[18rem] text-left text-sm">
                    <thead>
                      <tr className={theadRow}>
                        <th className="px-3 py-2.5 sm:px-4">{copy.pathColumn}</th>
                        <th className="px-3 py-2.5 text-right sm:px-4">{copy.countColumn}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.topPaths.map((r) => (
                        <tr
                          key={r.path}
                          className="border-b border-zinc-200 last:border-0 hover:bg-zinc-50/80"
                        >
                          <td className="max-w-[min(28rem,55vw)] truncate px-3 py-2.5 font-mono text-[13px] font-medium text-zinc-900 sm:px-4">
                            {r.path}
                          </td>
                          <td className="px-3 py-2.5 text-right text-sm font-semibold tabular-nums text-zinc-900 sm:px-4">
                            {nf.format(r.count)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>,
                )
              )}
            </div>

            <div>
              <p className="text-xs font-semibold text-zinc-700">{copy.topSourcesTitle}</p>
              <p className="mt-1 text-[13px] leading-relaxed text-zinc-600">{copy.topSourcesHint}</p>
              {stats.topReferrerSources.length === 0 ? (
                <p className="mt-3 text-sm font-medium text-zinc-600">—</p>
              ) : (
                statsTableShell(
                  <table className="w-full min-w-[18rem] text-left text-sm">
                    <thead>
                      <tr className={theadRow}>
                        <th className="px-3 py-2.5 sm:px-4">{copy.sourceColumn}</th>
                        <th className="px-3 py-2.5 text-right sm:px-4">{copy.countColumn}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.topReferrerSources.map((r) => (
                        <tr
                          key={r.sourceKey || "__direct__"}
                          className="border-b border-zinc-200 last:border-0 hover:bg-zinc-50/80"
                        >
                          <td className="max-w-[min(28rem,55vw)] break-all px-3 py-2.5 font-mono text-[13px] font-medium text-zinc-900 sm:px-4">
                            {sourceLabel(r.sourceKey, copy.directReferrerLabel)}
                          </td>
                          <td className="px-3 py-2.5 text-right text-sm font-semibold tabular-nums text-zinc-900 sm:px-4">
                            {nf.format(r.count)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>,
                )
              )}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-zinc-700">{copy.recentTitle}</p>
            <p className="mt-1 text-[13px] leading-relaxed text-zinc-600">{copy.recentHint}</p>
            {stats.recentPageViews.length === 0 ? (
              <p className="mt-3 text-sm font-medium text-zinc-600">—</p>
            ) : (
              statsTableShell(
                <table className="w-full min-w-[min(56rem,100%)] text-left text-sm">
                  <thead>
                    <tr className={theadRow}>
                      <th className="whitespace-nowrap px-3 py-2.5 sm:px-4">{copy.timeColumn}</th>
                      <th className="px-3 py-2.5 sm:px-4">{copy.pathColumn}</th>
                      <th className="min-w-[12rem] px-3 py-2.5 sm:px-4">{copy.referrerColumn}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.recentPageViews.map((r) => (
                      <tr key={r.id} className="border-b border-zinc-200 last:border-0 hover:bg-zinc-50/80">
                        <td className="whitespace-nowrap px-3 py-2.5 text-[13px] font-medium tabular-nums text-zinc-800 sm:px-4">
                          {dfUtcFull.format(r.createdAt)}
                        </td>
                        <td className="max-w-[14rem] truncate px-3 py-2.5 font-mono text-[13px] font-medium text-zinc-900 sm:px-4">
                          {r.path}
                        </td>
                        <td className="max-w-[min(28rem,45vw)] break-all px-3 py-2.5 font-mono text-[12px] font-medium text-zinc-800 sm:px-4">
                          {formatPageViewReferrerDisplay(r.referrer, copy.directReferrerLabel)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>,
              )
            )}
          </div>
        </div>
      )}
    </section>
  );
}
