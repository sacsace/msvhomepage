import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE, verifyAdminToken } from "@/lib/admin-auth";
import { getAdminUiLocale } from "@/lib/admin-ui-locale";
import { adminLayoutCopy, adminNavSections } from "@/lib/admin-ui-strings";
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
  const navSections = adminNavSections(uiLocale);
  const copy = adminLayoutCopy(uiLocale);

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col md:flex-row md:gap-px md:bg-zinc-200/80">
      <aside className="border-b border-zinc-200/80 bg-white/90 px-4 py-7 backdrop-blur-xl backdrop-saturate-150 md:w-56 md:border-b-0 md:border-r-0 md:px-6 md:py-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-400">Admin</p>
        <nav className="mt-4 flex flex-col">
          {navSections.map((section, si) => (
            <div
              key={si}
              className={si > 0 ? "mt-5 border-t border-zinc-100 pt-5" : ""}
            >
              {section.heading ? (
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                  {section.heading}
                </p>
              ) : null}
              <div className="flex flex-col gap-2.5">
                {section.links.map((n) => (
                  <Link
                    key={n.href}
                    href={n.href}
                    className="rounded-lg px-2 py-1.5 text-sm text-zinc-700 transition-colors duration-200 hover:bg-zinc-100 hover:text-zinc-900"
                  >
                    {n.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <div className="mt-6 border-t border-zinc-200 pt-5">
            <Link href="/" className="text-sm text-zinc-500 hover:text-zinc-800">
              {copy.viewSite}
            </Link>
            <div className="mt-3">
              <LogoutButton label={copy.logout} />
            </div>
            <div className="mt-4">
              <AdminLanguageToggle locale={uiLocale} />
            </div>
          </div>
        </nav>
      </aside>
      <main className="flex-1 bg-zinc-50/90 px-4 py-8 backdrop-blur-sm md:px-10 md:py-12">{children}</main>
    </div>
  );
}
