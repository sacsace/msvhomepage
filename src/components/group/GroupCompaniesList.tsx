import Link from "next/link";
import { groupCompanies } from "@/lib/site-content";

export function GroupCompaniesList() {
  return (
    <ul className="grid list-none gap-5 p-0 sm:grid-cols-2">
      {groupCompanies.map((g) => (
        <li
          key={g.slug}
          className="msv-card flex flex-col rounded-xl p-6 shadow-sm transition-shadow hover:shadow-md sm:p-7"
        >
          <Link
            href={`/group/${g.slug}`}
            className="group block underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-msv-blue focus-visible:ring-offset-2"
          >
            <span className="block text-lg font-bold tracking-tight text-msv-navy group-hover:text-msv-blue group-hover:underline">
              {g.menuLabel}
            </span>
            {g.legalName !== g.menuLabel ? (
              <span className="mt-1 block text-sm font-normal text-slate-600">{g.legalName}</span>
            ) : null}
          </Link>
          <p className="mt-3 text-sm font-medium text-msv-blue">{g.role}</p>
          <ul className="mt-4 list-inside list-disc space-y-1.5 text-sm leading-relaxed text-slate-600">
            {g.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
