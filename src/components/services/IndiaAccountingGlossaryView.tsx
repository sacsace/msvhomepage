"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  flattenGlossaryRows,
  glossaryRowHaystack,
  indiaGlossarySections,
  indiaGlossaryTotalCount,
  type GlossarySection,
} from "@/lib/india-accounting-glossary-data";
import {
  glossaryPhraseHeaders,
  glossaryPhraseIntro,
  glossarySectionTitle,
  indiaAccountingGlossaryCopy,
  type IndiaGlossaryTableLabels,
} from "@/lib/i18n/india-accounting-glossary-locale";
import type { SiteLocale } from "@/lib/site-locale";
import { withLocalePrefix } from "@/lib/site-locale";

function SectionTable({
  section,
  locale,
  table,
}: {
  section: GlossarySection;
  locale: SiteLocale;
  table: IndiaGlossaryTableLabels;
}) {
  if (section.variant === "notes") {
    return (
      <div className="rounded-lg border border-slate-200 bg-slate-50/40 px-4 py-4 text-sm text-slate-700 sm:px-5 sm:py-5">
        {section.noteIntro ? <p className="leading-relaxed text-slate-800">{section.noteIntro}</p> : null}
        {(section.noteBullets?.length ?? 0) > 0 ? (
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-slate-700">
            {(section.noteBullets ?? []).map((line) => (
              <li key={line} className="leading-relaxed">
                {line}
              </li>
            ))}
          </ul>
        ) : null}
        {section.noteFooter ? (
          <p className="mt-4 border-t border-slate-200 pt-4 text-sm leading-relaxed text-slate-600">
            {section.noteFooter}
          </p>
        ) : null}
      </div>
    );
  }

  if (section.variant === "phrase") {
    const [c1, c2] = glossaryPhraseHeaders(section, locale);
    const intro = glossaryPhraseIntro(section, locale);
    return (
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm ring-1 ring-slate-900/[0.04]">
        {intro ? (
          <p className="border-b border-slate-100 bg-gradient-to-br from-slate-50 via-white to-msv-blue-soft/30 px-4 py-3.5 text-sm leading-relaxed text-slate-700 sm:px-5 sm:py-4">
            {intro}
          </p>
        ) : null}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[22rem] table-fixed border-collapse text-left text-sm sm:min-w-[28rem]">
            <colgroup>
              <col className="w-[34%] sm:w-[32%]" />
              <col />
            </colgroup>
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/95">
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-semibold tracking-tight text-msv-navy sm:px-5"
                >
                  {c1}
                </th>
                <th
                  scope="col"
                  className="border-l border-slate-200/80 px-4 py-3 text-left text-xs font-semibold tracking-tight text-msv-navy sm:px-5"
                >
                  {c2}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {section.rows.map((row) => (
                <tr
                  key={`${section.id}-${row.en}`}
                  className="transition-colors odd:bg-white even:bg-slate-50/40 hover:bg-msv-blue-soft/25"
                >
                  <td className="px-4 py-3 align-top font-semibold text-msv-navy sm:px-5">{row.en}</td>
                  <td className="border-l border-slate-100 px-4 py-3 align-top leading-relaxed text-slate-600 sm:px-5">
                    {row.ko}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (section.variant === "four") {
    return (
      <div className="overflow-x-auto rounded-lg border border-slate-200">
        <table className="w-full min-w-[42rem] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold text-msv-navy">
              <th className="px-3 py-2 sm:w-[10%]">{table.abbr}</th>
              <th className="px-3 py-2 sm:w-[22%]">{table.english}</th>
              <th className="px-3 py-2 sm:w-[18%]">{table.korean}</th>
              <th className="px-3 py-2">{table.description}</th>
            </tr>
          </thead>
          <tbody className="text-slate-700">
            {section.rows.map((row) => (
              <tr
                key={`${section.id}-${row.abbr ?? ""}-${row.en}`}
                className="border-b border-slate-100 last:border-0"
              >
                <td className="px-3 py-2 align-top font-semibold text-msv-blue">{row.abbr}</td>
                <td className="px-3 py-2 align-top font-medium text-msv-navy">{row.en}</td>
                <td className="px-3 py-2 align-top text-slate-800">{row.ko}</td>
                <td className="px-3 py-2 align-top leading-relaxed text-slate-600">{row.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  const isForms = section.variant === "forms";
  const [h1, h2, h3] = isForms
    ? ([table.form, table.purpose, table.practiceNote] as const)
    : ([table.english, table.korean, table.practiceNote] as const);

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200">
      <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold text-msv-navy">
            <th className="px-3 py-2 sm:w-[22%]">{h1}</th>
            <th className="px-3 py-2 sm:w-[18%]">{h2}</th>
            <th className="px-3 py-2">{h3}</th>
          </tr>
        </thead>
        <tbody className="text-slate-700">
          {section.rows.map((row) => (
            <tr key={`${section.id}-${row.en}`} className="border-b border-slate-100 last:border-0">
              <td className="px-3 py-2 align-top font-medium text-msv-navy">{row.en}</td>
              <td className="px-3 py-2 align-top text-slate-800">{row.ko}</td>
              <td className="px-3 py-2 align-top leading-relaxed text-slate-600">{row.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

type Props = { locale: SiteLocale };

export function IndiaAccountingGlossaryView({ locale }: Props) {
  const copy = useMemo(() => indiaAccountingGlossaryCopy(locale), [locale]);
  const L = (path: string) => withLocalePrefix(path, locale);
  const [query, setQuery] = useState("");
  const flat = useMemo(() => flattenGlossaryRows(), []);

  const filtered = useMemo(() => {
    const raw = query.trim().toLowerCase();
    if (!raw) return null;
    const spaced = raw.replace(/\s+/g, " ");
    const compact = raw.replace(/\s/g, "");
    return flat.filter(({ section, row }) => {
      const h = glossaryRowHaystack(section, row);
      return h.includes(spaced) || (compact.length >= 2 && h.includes(compact));
    });
  }, [query, flat]);

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-lg font-bold text-msv-navy">{copy.introCardTitle}</h2>
            <p className="mt-1 text-sm text-slate-600">{copy.introCardSubtitle}</p>
            {copy.contentNote ? (
              <p className="mt-2 text-xs leading-relaxed text-slate-500">{copy.contentNote}</p>
            ) : null}
          </div>
          <div className="w-full lg:max-w-md">
            <label htmlFor="glossary-search" className="sr-only">
              {copy.searchLabel}
            </label>
            <input
              id="glossary-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={copy.searchPlaceholder}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-msv-blue/30 placeholder:text-slate-400 focus:border-msv-blue/40 focus:ring-2"
              autoComplete="off"
            />
            <p className="mt-1.5 text-xs text-slate-500">
              {filtered
                ? copy.fmtSearchResults(filtered.length, indiaGlossaryTotalCount)
                : copy.fmtSearchHintFull(indiaGlossaryTotalCount)}
            </p>
          </div>
        </div>
      </section>

      {filtered && filtered.length === 0 ? (
        <section className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-sm text-slate-600">
          {copy.noResults}
        </section>
      ) : filtered ? (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h3 className="text-base font-bold text-msv-navy">{copy.searchResultsHeading}</h3>
          <ul className="mt-4 divide-y divide-slate-100">
            {filtered.map(({ section, row, key }) => (
              <li key={key} className="py-4 first:pt-0">
                <p className="text-xs font-medium text-msv-blue">{glossarySectionTitle(section, locale)}</p>
                {row.abbr ? (
                  <p className="mt-1 text-sm font-semibold text-msv-blue">
                    {row.abbr}
                    <span className="font-normal text-slate-500"> · </span>
                    <span className="font-medium text-msv-navy">{row.en}</span>
                  </p>
                ) : (
                  <p
                    className={
                      section.variant === "notes"
                        ? "mt-1 text-sm leading-relaxed text-slate-800"
                        : "mt-1 font-semibold text-msv-navy"
                    }
                  >
                    {section.variant === "notes" && (section.noteBullets ?? []).includes(row.en) ? (
                      <span className="font-medium text-msv-navy">· </span>
                    ) : null}
                    {row.en}
                  </p>
                )}
                {row.ko ? <p className="text-sm text-slate-800">{row.ko}</p> : null}
                {row.desc ? (
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">{row.desc}</p>
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      ) : (
        indiaGlossarySections.map((section) => (
          <section
            key={section.id}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
          >
            <h3 className="text-base font-bold text-msv-navy">{glossarySectionTitle(section, locale)}</h3>
            <div className="mt-4">
              <SectionTable section={section} locale={locale} table={copy.table} />
            </div>
          </section>
        ))
      )}

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-xs leading-relaxed text-slate-500">{copy.disclaimer}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={L("/services")}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-msv-navy transition hover:border-msv-blue/35 hover:text-msv-blue"
          >
            {copy.backToServices}
          </Link>
          <Link
            href={L("/contact")}
            className="rounded-lg bg-msv-navy px-4 py-2 text-sm font-semibold text-white transition hover:bg-msv-navy/90"
          >
            {copy.contact}
          </Link>
        </div>
      </section>
    </div>
  );
}
