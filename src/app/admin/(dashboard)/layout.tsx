import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE, verifyAdminToken } from "@/lib/admin-auth";
import { getAdminUiLocale } from "@/lib/admin-ui-locale";
import { adminLayoutCopy, adminNavItems } from "@/lib/admin-ui-strings";
import { AdminLanguageToggle } from "./AdminLanguageToggle";
import { LogoutButton } from "./LogoutButton";

export const dynamic = "force-dynamic";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = (await cookies()).get(ADMIN_COOKIE)?.value;
  if (!(await verifyAdminToken(token))) {
    redirect("/admin/login");
  }

  const uiLocale = await getAdminUiLocale();
  const nav = adminNavItems(uiLocale);
  const copy = adminLayoutCopy(uiLocale);

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col md:flex-row">
      <aside className="border-b border-zinc-200 bg-white px-4 py-6 md:w-52 md:border-b-0 md:border-r md:px-5">
        <p className="text-xs font-medium uppercase tracking-wider text-zinc-400">Admin</p>
        <nav className="mt-4 flex flex-col gap-3">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="text-sm text-zinc-700 hover:text-zinc-900"
            >
              {n.label}
            </Link>
          ))}
          <Link href="/" className="text-sm text-zinc-500 hover:text-zinc-800">
            {copy.viewSite}
          </Link>
          <LogoutButton label={copy.logout} />
          <div className="pt-1">
            <AdminLanguageToggle locale={uiLocale} />
          </div>
        </nav>
      </aside>
      <main className="flex-1 bg-zinc-50/50 px-4 py-8 md:px-8 md:py-10">{children}</main>
    </div>
  );
}
