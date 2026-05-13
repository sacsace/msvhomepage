import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE, verifyAdminToken } from "@/lib/admin-auth";
import { getAdminUiLocale } from "@/lib/admin-ui-locale";
import { adminLayoutCopy, adminNavSections } from "@/lib/admin-ui-strings";
import { AdminLanguageToggle } from "./AdminLanguageToggle";
import { AdminSidebarNav } from "./AdminSidebarNav";
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
  const navSections = adminNavSections(uiLocale);
  const copy = adminLayoutCopy(uiLocale);

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col md:flex-row md:bg-zinc-200">
      <aside className="border-b border-zinc-300 bg-zinc-50 px-4 py-7 shadow-[6px_0_20px_-14px_rgba(15,23,42,0.35)] md:w-60 md:border-b-0 md:border-r md:border-zinc-300 md:px-5 md:py-10">
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-zinc-600">Admin</p>
        <div className="mt-4">
          <AdminSidebarNav sections={navSections} />
          <div className="mt-6 border-t border-zinc-300 pt-5">
            <Link
              href="/"
              className="text-sm font-medium text-zinc-800 underline-offset-2 hover:text-zinc-950 hover:underline"
            >
              {copy.viewSite}
            </Link>
            <div className="mt-3">
              <LogoutButton label={copy.logout} />
            </div>
            <div className="mt-4">
              <AdminLanguageToggle locale={uiLocale} />
            </div>
          </div>
        </div>
      </aside>
      <main className="flex-1 bg-zinc-100 px-4 py-8 md:px-10 md:py-12">{children}</main>
    </div>
  );
}
