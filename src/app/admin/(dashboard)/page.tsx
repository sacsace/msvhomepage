import Link from "next/link";
import { getAdminUiLocale } from "@/lib/admin-ui-locale";
import { adminDashboardData, adminPageViewStatsCopy } from "@/lib/admin-ui-strings";
import { getAdminPageViewStats } from "@/lib/page-view-store";

export default async function AdminHomePage() {
  const uiLocale = await getAdminUiLocale();
  const data = adminDashboardData(uiLocale);
  const pvCopy = adminPageViewStatsCopy(uiLocale);
  const stats = await getAdminPageViewStats();
  const nf = Intl.NumberFormat(uiLocale === "en" ? "en-IN" : "ko-KR");
  const dfShort = new Intl.DateTimeFormat(uiLocale === "en" ? "en-IN" : "ko-KR", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">{data.title}</h1>
      <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-zinc-600">{data.lead}</p>

      <section className="mt-10 rounded-2xl border border-zinc-200/90 bg-white p-6 shadow-sm ring-1 ring-zinc-900/[0.02]">
        <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-400">{pvCopy.sectionTitle}</h2>
        <p className="mt-2 text-[13px] leading-relaxed text-zinc-500">{pvCopy.sectionHint}</p>

        {stats.unavailable ? (
          <p className="mt-5 text-sm text-amber-800/90">{pvCopy.unavailable}</p>
        ) : (
          <div className="mt-6 space-y-8">
            <div>
              <p className="text-xs font-medium text-zinc-500">{pvCopy.totalLabel}</p>
              <p className="mt-1 text-3xl font-semibold tabular-nums tracking-tight text-zinc-900">
                {nf.format(stats.total)}
              </p>
              <p className="mt-1 text-[13px] text-zinc-500">{pvCopy.totalHint}</p>
            </div>

            <div>
              <p className="text-xs font-medium text-zinc-500">{pvCopy.last7Title}</p>
              <p className="mt-1 text-[12px] text-zinc-400">{pvCopy.last7Hint}</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {stats.last7Days.map((row) => (
                  <li
                    key={row.date}
                    className="flex min-w-[6.5rem] flex-1 flex-col rounded-xl border border-zinc-100 bg-zinc-50/80 px-3 py-2.5"
                  >
                    <span className="text-[11px] font-medium uppercase tracking-wider text-zinc-400">
                      {dfShort.format(new Date(`${row.date}T12:00:00.000Z`))}
                    </span>
                    <span className="mt-0.5 text-lg font-semibold tabular-nums text-zinc-900">
                      {nf.format(row.count)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-medium text-zinc-500">{pvCopy.topPathsTitle}</p>
              <p className="mt-1 text-[12px] text-zinc-400">{pvCopy.topPathsHint}</p>
              {stats.topPaths.length === 0 ? (
                <p className="mt-3 text-sm text-zinc-500">—</p>
              ) : (
                <div className="mt-3 overflow-x-auto rounded-xl border border-zinc-100">
                  <table className="w-full min-w-[20rem] text-left text-sm">
                    <thead>
                      <tr className="border-b border-zinc-100 bg-zinc-50/90 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                        <th className="px-3 py-2 font-medium">{pvCopy.pathColumn}</th>
                        <th className="px-3 py-2 font-medium text-right">{pvCopy.countColumn}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.topPaths.map((r) => (
                        <tr key={r.path} className="border-b border-zinc-50 last:border-0">
                          <td className="max-w-[min(28rem,55vw)] truncate px-3 py-2 font-mono text-[13px] text-zinc-800">
                            {r.path}
                          </td>
                          <td className="px-3 py-2 text-right tabular-nums text-zinc-700">
                            {nf.format(r.count)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </section>

      <div className="mt-10 space-y-10">
        {data.sections.map((section) => (
          <section key={section.id} aria-labelledby={`admin-dash-${section.id}`}>
            <h2
              id={`admin-dash-${section.id}`}
              className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-400"
            >
              {section.heading}
            </h2>
            <ul className="mt-4 grid gap-4 sm:grid-cols-2">
              {section.cards.map((c) => (
                <li key={c.href}>
                  <Link
                    href={c.href}
                    className="block h-full min-h-[5.75rem] rounded-2xl border border-zinc-200/90 bg-white p-5 text-sm shadow-sm ring-1 ring-zinc-900/[0.02] transition duration-200 ease-out hover:-translate-y-px hover:border-zinc-300/90 hover:shadow-md"
                  >
                    <span className="font-semibold tracking-tight text-zinc-900">{c.title}</span>
                    <span className="mt-1.5 block text-[13px] leading-snug text-zinc-500">{c.desc}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
