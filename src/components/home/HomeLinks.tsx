import Link from "next/link";

const items = [
  { href: "/msv-intro", label: "MSV 소개" },
  { href: "/about", label: "회사 소개" },
  { href: "/group", label: "함께하는 회사" },
  { href: "/services", label: "서비스" },
  { href: "/notice", label: "공지" },
  { href: "/articles", label: "관련 글" },
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
