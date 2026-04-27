import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE, verifyAdminToken } from "@/lib/admin-auth";
import { LogoutButton } from "./LogoutButton";

const nav = [
  { href: "/admin", label: "대시보드" },
  { href: "/admin/ongoing-tasks", label: "진행중인 업무" },
  { href: "/admin/announcements", label: "공지사항" },
  { href: "/admin/articles", label: "관련 글" },
  { href: "/admin/tax-calendar", label: "신고·준수 달력" },
  { href: "/admin/staff-photos", label: "경영진 사진·소개" },
  { href: "/admin/staff", label: "직원 사진·소개" },
  { href: "/admin/clients", label: "고객사" },
  { href: "/admin/mail-settings", label: "메일 서버" },
  { href: "/admin/password", label: "비밀번호 변경" },
];

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = (await cookies()).get(ADMIN_COOKIE)?.value;
  if (!(await verifyAdminToken(token))) {
    redirect("/admin/login");
  }

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
            사이트 보기
          </Link>
          <LogoutButton />
        </nav>
      </aside>
      <main className="flex-1 bg-zinc-50/50 px-4 py-8 md:px-8 md:py-10">{children}</main>
    </div>
  );
}
