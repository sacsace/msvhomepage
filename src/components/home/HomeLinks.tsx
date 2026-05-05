import Link from "next/link";

const items = [
  { href: "/", label: "Home" },
  { href: "/about", label: "회사 소개" },
  { href: "/services", label: "서비스" },
  { href: "/software", label: "소프트웨어" },
  { href: "/group", label: "그룹사" },
  { href: "/notice", label: "공지사항" },
  { href: "/ongoing", label: "프로젝트 현황" },
  { href: "/articles", label: "자료실" },
  { href: "/contact", label: "문의" },
];

export function HomeLinks() {
  return (
    <nav
      className="border-b border-slate-200/90 bg-msv-blue-soft/25"
      aria-label="주요 페이지로 이동"
    >
      <div className="mx-auto flex max-w-6xl flex-wrap gap-2 px-3 py-3 sm:px-5">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-md px-3 py-2 text-sm font-medium text-msv-navy transition hover:bg-white hover:shadow-sm"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
