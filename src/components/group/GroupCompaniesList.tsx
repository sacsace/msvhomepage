import Link from "next/link";
import type { SiteLocale } from "@/lib/site-locale";
import { withLocalePrefix } from "@/lib/site-locale";
import { groupCompanies } from "@/lib/site-content";

const tileClass =
  "flex flex-col rounded-xl border border-slate-200 bg-slate-50/40 p-5 shadow-sm transition hover:border-msv-blue/30 hover:shadow-md sm:p-6";

type Props = {
  locale: SiteLocale;
};

export function GroupCompaniesList({ locale }: Props) {
  const L = (path: string) => withLocalePrefix(path, locale);

  return (
    <ul className="grid list-none gap-4 p-0 sm:grid-cols-2 sm:gap-5">
      {groupCompanies.map((g) => (
        <li key={g.slug} className={tileClass}>
          <Link
            href={L(`/group/${g.slug}`)}
            className="group block underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-msv-blue focus-visible:ring-offset-2"
          >
            <span className="block text-base font-semibold text-msv-navy group-hover:text-msv-blue group-hover:underline sm:text-lg">
              {g.menuLabel}
            </span>
            {g.legalName !== g.menuLabel ? (
              <span className="mt-1 block text-sm leading-relaxed text-slate-600">{g.legalName}</span>
            ) : null}
          </Link>
          <p className="mt-3 text-sm font-semibold text-msv-navy">{g.role}</p>
          <ul className="mt-3 list-inside list-disc space-y-1.5 text-sm leading-relaxed text-slate-600">
            {g.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
