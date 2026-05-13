import Link from "next/link";
import type { ReactNode } from "react";
import type { ServiceGuideCopy, ServiceGuideScheduleTable } from "@/lib/i18n/service-guides-locale";

type Props = {
  readonly copy: ServiceGuideCopy;
  readonly L: (path: string) => string;
};

/** Highlights practice/field tags at the start of a bullet (KO/EN/ZH copy). */
const PRACTICE_BULLET_PREFIX_RE = /^(\s*)(〔실무[^〕]*〕|\[(?:실무|Field|实务)\])\s*(.*)$/;

function GuideBulletLine({ text }: { readonly text: string }) {
  const m = text.match(PRACTICE_BULLET_PREFIX_RE);
  if (m) {
    const [, lead, tag, rest] = m;
    return (
      <>
        {lead}
        <span className="font-semibold text-msv-blue">{tag}</span>
        {rest ? <> {rest}</> : null}
      </>
    );
  }
  return <>{text}</>;
}

/** `[표시 텍스트](/경로)` → locale-aware Link (신고준수 달력 등 표 셀용) */
function ScheduleSummaryCell({ text, L }: { readonly text: string; readonly L: (path: string) => string }) {
  const re = /\[([^\]]+)\]\((\/[^)]+)\)/g;
  const out: ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  let key = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));
    out.push(
      <Link
        key={`sched-md-${key++}`}
        href={L(m[2])}
        className="font-semibold text-msv-blue underline-offset-2 hover:underline"
      >
        {m[1]}
      </Link>,
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return <>{out.length ? out : text}</>;
}

function ScheduleStyleTable({ table, L }: { readonly table: ServiceGuideScheduleTable; readonly L: (path: string) => string }) {
  const showSubTitle = Boolean(table.title.trim());
  return (
    <div>
      {showSubTitle ? (
        <h3 className="text-base font-bold text-slate-900 sm:text-[17px]">{table.title}</h3>
      ) : null}
      <div className={`min-w-0 overflow-x-auto rounded-lg border border-slate-200 shadow-sm ${showSubTitle ? "mt-3" : ""}`}>
        <table className="table-fixed w-full min-w-0 border-collapse text-left text-sm">
          <colgroup>
            <col className="w-[32%] sm:w-[30%]" />
            <col />
          </colgroup>
          <thead>
            <tr className="border-b border-slate-300 bg-slate-100">
              <th className="px-3 py-3 text-xs font-bold text-slate-700 sm:px-4">{table.colItem}</th>
              <th className="px-3 py-3 text-xs font-bold text-slate-700 sm:px-4">{table.colSummary}</th>
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row) => (
              <tr
                key={`${table.title}-${row.item}`}
                className="border-b border-slate-100 last:border-0 hover:bg-slate-50/90"
              >
                <td className="break-words px-3 py-3 align-top font-semibold text-msv-navy sm:px-4 sm:py-3.5">
                  {row.item}
                </td>
                <td className="whitespace-pre-line break-words px-3 py-3 align-top leading-relaxed text-slate-800 sm:px-4 sm:py-3.5">
                  <ScheduleSummaryCell text={row.summary} L={L} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function DetailCardGrid({
  sectionTitle,
  cards,
}: {
  readonly sectionTitle: string;
  readonly cards: NonNullable<ServiceGuideCopy["roadmapCards"]>;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="text-lg font-bold text-msv-navy">{sectionTitle}</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {cards.map((card) => (
          <div
            key={card.title}
            className="rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-4 shadow-sm sm:px-5 sm:py-5"
          >
            <h3 className="text-sm font-bold leading-snug text-msv-navy sm:text-[15px]">{card.title}</h3>
            <ul className="mt-3 list-disc space-y-1.5 pl-4 text-[13px] leading-relaxed text-slate-800 sm:text-sm">
              {card.bullets.map((b) => (
                <li key={b}>
                  <GuideBulletLine text={b} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ServiceGuidePageBody({ copy, L }: Props) {
  return (
    <div className="space-y-8">
      <p className="rounded-xl border border-amber-200/80 bg-amber-50/70 px-4 py-3 text-xs leading-relaxed text-amber-950/90 sm:text-[13px]">
        {copy.disclaimer}
      </p>

      {copy.introParagraphs?.length ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="space-y-4 text-sm leading-relaxed text-slate-800 sm:text-[15px]">
            {copy.introParagraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      ) : null}

      {copy.scheduleTables?.length ? (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          {copy.scheduleSectionTitle ? (
            <h2 className="text-lg font-bold text-msv-navy sm:text-[1.125rem]">{copy.scheduleSectionTitle}</h2>
          ) : null}
          <div className={copy.scheduleSectionTitle ? "mt-8 space-y-10 sm:space-y-12" : "space-y-10 sm:space-y-12"}>
            {copy.scheduleTables.map((tbl) => (
              <ScheduleStyleTable key={tbl.title} table={tbl} L={L} />
            ))}
          </div>
        </section>
      ) : null}

      {copy.toolHubBlocks?.length ? (
        <section className="rounded-2xl border border-msv-blue/25 bg-msv-blue-soft/15 p-6 shadow-sm sm:p-8">
          {copy.toolHubIntro ? (
            <p className="text-sm leading-relaxed text-slate-800 sm:text-[15px]">{copy.toolHubIntro}</p>
          ) : null}
          <div className="mt-5 space-y-6">
            {copy.toolHubBlocks.map((block) => (
              <div key={block.title}>
                <h2 className="text-base font-bold text-msv-navy">{block.title}</h2>
                {block.items.length > 0 ? (
                  <ul className="mt-3 space-y-2">
                    {block.items.map((it) => (
                      <li key={it.href}>
                        <Link
                          href={L(it.href)}
                          className="text-sm font-semibold text-msv-blue underline-offset-2 hover:underline"
                        >
                          {it.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
                {block.note ? <p className="mt-3 text-sm leading-relaxed text-slate-700">{block.note}</p> : null}
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {copy.roadmapTitle && copy.roadmapItems?.length ? (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-lg font-bold text-msv-navy">{copy.roadmapTitle}</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700">
            {copy.roadmapItems.map((item) => (
              <li key={item}>
                <GuideBulletLine text={item} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {copy.roadmapCardsTitle && copy.roadmapCards?.length ? (
        <DetailCardGrid sectionTitle={copy.roadmapCardsTitle} cards={copy.roadmapCards} />
      ) : null}

      {copy.governanceTitle && (copy.governanceScheduleTable || copy.governanceBlocks?.length) ? (
        <section
          className={
            copy.governanceScheduleTable
              ? "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
              : "rounded-2xl border border-msv-blue/20 bg-msv-blue-soft/10 p-6 shadow-sm sm:p-8"
          }
        >
          <h2 className="text-lg font-bold text-msv-navy">{copy.governanceTitle}</h2>
          {copy.governanceScheduleTable ? (
            <div className="mt-5">
              <ScheduleStyleTable table={copy.governanceScheduleTable} L={L} />
            </div>
          ) : (
            <div className="mt-5 grid min-w-0 gap-4 md:grid-cols-2 md:[&>*]:min-w-0">
              {(copy.governanceBlocks ?? []).map((block) => (
                <div
                  key={block.title}
                  className="min-w-0 rounded-xl border border-msv-blue/15 bg-white/95 px-4 py-4 shadow-sm sm:px-5 sm:py-5"
                >
                  <h3 className="text-sm font-bold text-msv-navy sm:text-[15px]">{block.title}</h3>
                  <ul className="mt-3 list-disc space-y-1.5 pl-4 text-[13px] leading-relaxed text-slate-800 sm:text-sm">
                    {block.bullets.map((b) => (
                      <li key={b}>
                        <GuideBulletLine text={b} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </section>
      ) : null}

      {copy.nestedChecklistTitle && (copy.nestedChecklistScheduleTable || copy.nestedChecklistBlocks?.length) ? (
        <section
          className={
            copy.nestedChecklistScheduleTable
              ? "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
              : "rounded-2xl border border-msv-blue/20 bg-msv-blue-soft/10 p-6 shadow-sm sm:p-8"
          }
        >
          <h2 className="text-lg font-bold text-msv-navy">{copy.nestedChecklistTitle}</h2>
          {copy.nestedChecklistScheduleTable ? (
            <div className="mt-5">
              <ScheduleStyleTable table={copy.nestedChecklistScheduleTable} L={L} />
            </div>
          ) : (
            <div className="mt-5 grid min-w-0 gap-4 md:grid-cols-2 md:[&>*]:min-w-0">
              {(copy.nestedChecklistBlocks ?? []).map((block) => (
                <div
                  key={block.title}
                  className="min-w-0 rounded-xl border border-msv-blue/15 bg-white/95 px-4 py-4 shadow-sm sm:px-5 sm:py-5"
                >
                  <h3 className="text-sm font-bold text-msv-navy sm:text-[15px]">{block.title}</h3>
                  <ul className="mt-3 list-disc space-y-1.5 pl-4 text-[13px] leading-relaxed text-slate-800 sm:text-sm">
                    {block.bullets.map((b) => (
                      <li key={b}>
                        <GuideBulletLine text={b} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </section>
      ) : null}

      {copy.practicalIssuesTitle && copy.practicalIssues?.length ? (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-lg font-bold text-msv-navy">{copy.practicalIssuesTitle}</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-800 sm:text-[15px]">
            {copy.practicalIssues.map((item) => (
              <li key={item}>
                <GuideBulletLine text={item} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {copy.exportFlowTitle && copy.exportFlowItems?.length ? (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-lg font-bold text-msv-navy">{copy.exportFlowTitle}</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-800 sm:text-[15px]">
            {copy.exportFlowItems.map((item) => (
              <li key={item}>
                <GuideBulletLine text={item} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {copy.processFlowTitle && copy.processPhases?.length ? (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-lg font-bold text-msv-navy">{copy.processFlowTitle}</h2>
          <ol className="mt-5 space-y-5">
            {copy.processPhases.map((phase, idx) => (
              <li key={phase.title} className="flex gap-3 sm:gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-msv-blue bg-white text-xs font-bold text-msv-navy shadow-sm sm:h-9 sm:w-9 sm:text-sm">
                  {idx + 1}
                </span>
                <div className="min-w-0 flex-1 border-b border-slate-100 pb-5 last:border-0 last:pb-0">
                  <h3 className="text-sm font-bold text-msv-navy sm:text-[15px]">{phase.title}</h3>
                  <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-slate-700">
                    {phase.bullets.map((b) => (
                      <li key={b}>
                        <GuideBulletLine text={b} />
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      {copy.industryTableTitle && copy.industryRows?.length ? (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-lg font-bold text-msv-navy">{copy.industryTableTitle}</h2>
          <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
            <table
              className={`border-collapse text-left text-sm ${
                copy.industryCol3 ? "w-max min-w-full" : "w-full min-w-[min(100%,16rem)]"
              }`}
            >
              <thead>
                <tr className="border-b border-slate-300 bg-slate-100">
                  <th
                    className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider sm:px-5 ${
                      copy.industryCol3 ? "text-msv-navy" : "text-slate-700"
                    } ${copy.industryCol3 ? "whitespace-nowrap" : ""}`}
                  >
                    {copy.industryCol1 ?? ""}
                  </th>
                  <th
                    className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-700 sm:px-5 ${
                      copy.industryCol3 ? "whitespace-nowrap" : ""
                    }`}
                  >
                    {copy.industryCol2 ?? ""}
                  </th>
                  {copy.industryCol3 ? (
                    <th className="whitespace-nowrap border-l border-slate-200/80 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-msv-blue sm:px-5">
                      {copy.industryCol3}
                    </th>
                  ) : null}
                </tr>
              </thead>
              <tbody>
                {copy.industryRows.map((row) => (
                  <tr key={row.industry} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/90">
                    <td
                      className={`px-4 py-2.5 align-middle font-medium text-msv-navy sm:px-5 ${
                        copy.industryCol3 ? "whitespace-nowrap" : ""
                      }`}
                    >
                      {row.icon ? (
                        <span className="inline-flex items-center gap-2">
                          <span className="select-none text-[1.05rem] leading-none sm:text-base" aria-hidden>
                            {row.icon}
                          </span>
                          <span>{row.industry}</span>
                        </span>
                      ) : copy.industryCol3 ? (
                        row.industry
                      ) : (
                        <span className="min-w-0 break-words">{row.industry}</span>
                      )}
                    </td>
                    <td
                      className={`px-4 py-2.5 align-middle leading-relaxed text-slate-800 sm:px-5 ${
                        copy.industryCol3 ? "whitespace-nowrap" : ""
                      }`}
                    >
                      {row.issues}
                    </td>
                    {copy.industryCol3 ? (
                      <td className="whitespace-nowrap border-l border-slate-100 px-4 py-2.5 align-middle leading-relaxed text-msv-blue sm:px-5">
                        {row.practicalNotes ?? "-"}
                      </td>
                    ) : null}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}

      {copy.msvScopeTitle && copy.msvScopeItems?.length ? (
        <section className="rounded-2xl border border-msv-navy/15 bg-msv-navy/[0.03] p-6 shadow-sm sm:p-8">
          <h2 className="text-lg font-bold text-msv-navy">{copy.msvScopeTitle}</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-800 sm:text-[15px]">
            {copy.msvScopeItems.map((item) => (
              <li key={item}>
                <GuideBulletLine text={item} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {copy.timelineTable?.rows.length ? (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-lg font-bold text-msv-navy">{copy.timelineTable.title}</h2>
          <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
            <table className="w-full min-w-[min(100%,16rem)] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-slate-300 bg-slate-100">
                  <th className="px-3 py-3 text-xs font-bold uppercase tracking-wider text-slate-700 sm:px-4">
                    {copy.timelineTable.colItem}
                  </th>
                  <th className="px-3 py-3 text-xs font-bold uppercase tracking-wider text-slate-700 sm:px-4">
                    {copy.timelineTable.colDuration}
                  </th>
                </tr>
              </thead>
              <tbody>
                {copy.timelineTable.rows.map((row) => (
                  <tr key={row.item} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/90">
                    <td className="px-3 py-3 font-medium text-msv-navy sm:px-4">{row.item}</td>
                    <td className="px-3 py-3 tabular-nums leading-relaxed text-slate-800 sm:px-4">{row.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs leading-relaxed text-slate-700 sm:text-[13px]">
            {copy.timelineTable.footnote}
          </p>
        </section>
      ) : null}

      {copy.sections?.map((sec) => (
        <section key={sec.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-lg font-bold text-msv-navy">{sec.title}</h2>
          {sec.paragraphs?.length ? (
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-slate-800 sm:text-[15px]">
              {sec.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          ) : null}
          {sec.bullets?.length ? (
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700 sm:text-[15px]">
              {sec.bullets.map((b) => (
                <li key={b}>
                  <GuideBulletLine text={b} />
                </li>
              ))}
            </ul>
          ) : null}
        </section>
      ))}

      {copy.relatedTitle && copy.relatedLinks?.length ? (
        <section className="rounded-2xl border border-slate-200 bg-slate-50/80 p-6 sm:p-8">
          <h2 className="text-base font-bold text-msv-navy">{copy.relatedTitle}</h2>
          {copy.relatedIntro ? (
            <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-[15px]">{copy.relatedIntro}</p>
          ) : null}
          <ul className="mt-4 flex flex-wrap gap-2">
            {copy.relatedLinks.map((r) => (
              <li key={`${r.href}-${r.label}`}>
                <Link
                  href={L(r.href)}
                  className="inline-flex rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-msv-navy transition hover:border-msv-blue/35 hover:text-msv-blue"
                >
                  {r.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {copy.closingNote ? (
        <p className="border-l-4 border-msv-navy/80 pl-4 text-sm font-medium leading-relaxed text-slate-800 sm:text-[15px]">
          {copy.closingNote}
        </p>
      ) : null}
    </div>
  );
}
