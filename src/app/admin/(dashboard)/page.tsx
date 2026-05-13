import Link from "next/link";
import { getAdminUiLocale } from "@/lib/admin-ui-locale";
import { adminDashboardData } from "@/lib/admin-ui-strings";

export default async function AdminHomePage() {
  const uiLocale = await getAdminUiLocale();
  const data = adminDashboardData(uiLocale);

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">{data.title}</h1>
      <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-zinc-600">{data.lead}</p>

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
