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
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col bg-slate-200 md:flex-row">
      <aside className="border-b border-slate-800 bg-msv-navy px-4 py-6 text-slate-200 md:w-56 md:border-b-0 md:border-r md:px-4 md:py-8">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">Admin</p>
        <div className="mt-4">
          <AdminSidebarNav sections={navSections} />
          <div className="mt-6 border-t border-white/15 pt-5">
            <Link
              href="/"
              className="text-sm font-medium text-slate-300 underline-offset-2 hover:text-white hover:underline"
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
      <main className="flex-1 bg-slate-100 px-4 py-8 md:px-8 md:py-10">{children}</main>
    </div>
  );
}
