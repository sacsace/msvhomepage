import Link from "next/link";
import { getAdminUiLocale } from "@/lib/admin-ui-locale";
import { adminDashboardData } from "@/lib/admin-ui-strings";
import { ADMIN_PAGE_LEAD_CLASS } from "@/lib/admin-page-layout";

export default async function AdminHomePage() {
  const uiLocale = await getAdminUiLocale();
  const data = adminDashboardData(uiLocale);

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900">{data.title}</h1>
      <p className={ADMIN_PAGE_LEAD_CLASS}>{data.lead}</p>

      <div className="mt-10 space-y-10">
        {data.sections.map((section) => (
          <section key={section.id} aria-labelledby={`admin-dash-${section.id}`}>
            <h2
              id={`admin-dash-${section.id}`}
              className="border-b border-slate-300 pb-2 text-xs font-bold uppercase tracking-[0.12em] text-slate-600"
            >
              {section.heading}
            </h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {section.cards.map((c) => (
                <li key={c.href}>
                  <Link
                    href={c.href}
                    className="block h-full min-h-[5.5rem] border border-slate-300 bg-white p-4 text-sm transition hover:border-msv-navy/40 hover:bg-slate-50"
                  >
                    <span className="font-semibold text-slate-900">{c.title}</span>
                    <span className="mt-1.5 block text-[13px] text-slate-600 break-keep">{c.desc}</span>
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
