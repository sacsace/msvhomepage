import Link from "next/link";
import { groupCompanies } from "@/lib/site-content";

export function GroupCompaniesList() {
  return (
    <ul className="mt-2 space-y-5">
      {groupCompanies.map((g) => (
        <li key={g.slug} className="msv-card p-6 sm:p-7">
          <Link
            href={`/group/${g.slug}`}
            className="font-bold text-msv-navy underline-offset-2 hover:text-msv-blue hover:underline"
          >
            {g.legalName}
          </Link>
          <p className="mt-1 text-sm font-medium text-msv-blue">{g.role}</p>
          <ul className="mt-4 list-inside list-disc space-y-1.5 text-sm text-slate-600">
            {g.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
