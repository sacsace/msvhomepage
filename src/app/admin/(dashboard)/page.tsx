import Link from "next/link";
import { getAdminUiLocale } from "@/lib/admin-ui-locale";
import { adminDashboardCopy } from "@/lib/admin-ui-strings";

export default async function AdminHomePage() {
  const uiLocale = await getAdminUiLocale();
  const copy = adminDashboardCopy(uiLocale);

  return (
    <div>
      <h1 className="text-xl font-semibold text-zinc-900">{copy.title}</h1>
      <p className="mt-2 max-w-lg text-sm text-zinc-600">{copy.lead}</p>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {copy.cards.map((c) => (
          <li key={c.href}>
            <Link
              href={c.href}
              className="block border border-zinc-200 bg-white p-5 text-sm transition hover:border-zinc-300"
            >
              <span className="font-medium text-zinc-900">{c.title}</span>
              <span className="mt-1 block text-zinc-500">{c.desc}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
