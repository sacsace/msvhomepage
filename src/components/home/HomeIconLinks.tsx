import Link from "next/link";
import type { ComponentType, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { className?: string };

function IconBuilding({ className, ...props }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      {...props}
    >
      <path
        d="M10 42V18L24 8l14 10v24H10z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M18 42V28h12v14" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function IconUsers({ className, ...props }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      {...props}
    >
      <circle cx="18" cy="16" r="5" stroke="currentColor" strokeWidth="2" />
      <path
        d="M8 38c0-5 4.5-9 10-9s10 4 10 9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="32" cy="18" r="4" stroke="currentColor" strokeWidth="2" />
      <path d="M28 38c0-3.5 2.5-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconInfo({ className, ...props }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden
      {...props}
    >
      <circle cx="12" cy="12" r="10" strokeLinejoin="round" />
      <path d="M12 16v-4M12 8h.01" strokeLinecap="round" />
    </svg>
  );
}

function IconBriefcase({ className, ...props }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      {...props}
    >
      <rect x="10" y="16" width="28" height="22" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M16 16V12a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v4" stroke="currentColor" strokeWidth="2" />
      <path d="M10 26h28" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function IconMail({ className, ...props }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      {...props}
    >
      <rect x="8" y="14" width="32" height="22" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M8 16l16 12L40 16" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

function IconMegaphone({ className, ...props }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden
      {...props}
    >
      <path d="M4 11v5a1 1 0 001 1h2v-7H5a1 1 0 00-1 1z" strokeLinejoin="round" />
      <path d="M6 16V8l10-3v14L6 16z" strokeLinejoin="round" />
      <path d="M16 6v12" strokeLinecap="round" />
    </svg>
  );
}

function IconArticle({ className, ...props }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden
      {...props}
    >
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" strokeLinejoin="round" />
      <path d="M14 2v6h6M8 13h8M8 17h8M8 9h3" strokeLinecap="round" />
    </svg>
  );
}

function IconProgress({ className, ...props }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden
      {...props}
    >
      <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="9" />
    </svg>
  );
}

function IconChevronRight({ className, ...props }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M10 7l5 5-5 5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const primary = [
  {
    href: "/services",
    label: "회계·세무",
    desc: "기장·GST·TDS·감사·TP",
    Icon: IconBriefcase,
  },
  {
    href: "/about",
    label: "회사 소개",
    desc: "비전·CPA·리더십",
    Icon: IconBuilding,
  },
  {
    href: "/mvs-intro",
    label: "MV System 소개",
    desc: "Minsub Ventus System",
    Icon: IconInfo,
  },
  {
    href: "/group",
    label: "함께하는 회사",
    desc: "Neocle·Seda·LKH·Wilmat",
    Icon: IconUsers,
  },
  {
    href: "/contact",
    label: "문의",
    desc: "견적·자료 요청",
    Icon: IconMail,
  },
] as const;

const secondary: readonly {
  href: string;
  label: string;
  Icon: ComponentType<IconProps>;
}[] = [
  { href: "/ongoing", label: "진행중인 업무", Icon: IconProgress },
  { href: "/notice", label: "공지", Icon: IconMegaphone },
  { href: "/articles", label: "관련 글", Icon: IconArticle },
];

export function HomeIconLinks() {
  return (
    <nav
      className="relative border-b border-slate-200/70 bg-gradient-to-b from-white via-slate-50/35 to-white py-12 sm:py-16"
      aria-label="주요 페이지로 이동"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-8 max-w-2xl">
          <p className="text-[11px] font-semibold tracking-[0.14em] text-msv-blue">메인 안내</p>
          <h2 className="mt-2 text-xl font-bold tracking-tight text-msv-navy sm:text-2xl">바로가기</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            회계·세무 라인업을 먼저 확인하고, 회사 소개·그룹사·문의로 이어질 수 있습니다.
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {primary.map(({ href, label, desc, Icon }, i) => (
            <li key={href} className="min-h-[12rem] sm:min-h-0">
              <Link
                href={href}
                className="group relative flex h-full min-h-[inherit] flex-col rounded-2xl border border-slate-200/70 bg-white p-6 shadow-[0_2px_12px_-2px_rgba(15,23,42,0.06)] transition duration-200 hover:-translate-y-0.5 hover:border-msv-blue/30 hover:shadow-[0_16px_40px_-12px_rgba(45,91,255,0.2)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-msv-blue"
              >
                <span
                  className="absolute inset-x-0 top-0 h-1.5 rounded-t-2xl bg-gradient-to-r from-msv-blue/40 via-msv-blue to-msv-blue/40 transition duration-200 group-hover:from-msv-blue group-hover:via-msv-navy group-hover:to-msv-blue"
                  aria-hidden
                />
                <span
                  className="absolute right-5 top-5 inline-flex h-7 w-7 items-center justify-center rounded-full border border-slate-200/90 bg-slate-50/90 text-[11px] font-bold text-msv-blue shadow-sm transition group-hover:border-msv-blue/25 group-hover:bg-white"
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="mt-1 flex h-[3.25rem] w-[3.25rem] items-center justify-center rounded-xl border border-msv-blue/15 bg-gradient-to-br from-msv-blue-soft/80 to-msv-blue-soft/30 text-msv-navy transition duration-200 group-hover:border-msv-blue/35 group-hover:from-white group-hover:to-msv-blue-soft/50 group-hover:text-msv-blue">
                  <Icon className="h-7 w-7" />
                </span>
                <span className="mt-5 text-base font-bold tracking-tight text-msv-navy sm:text-[1.05rem]">
                  {label}
                </span>
                <span className="mt-1.5 flex-1 text-xs leading-relaxed text-slate-500 sm:text-[0.8125rem]">
                  {desc}
                </span>
                <span className="mt-5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-msv-blue/20 bg-msv-blue-soft/30 text-msv-blue transition duration-200 group-hover:border-msv-blue group-hover:bg-msv-blue group-hover:text-white">
                  <IconChevronRight className="h-5 w-5" />
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mx-auto mt-12 max-w-xl border-t border-slate-200/80 pt-10">
          <p className="mb-4 text-center text-[11px] font-semibold tracking-[0.12em] text-slate-400">
            새 소식 · 자료
          </p>
          <ul className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-3">
            {secondary.map(({ href, label, Icon }) => (
              <li key={href} className="sm:flex-1 sm:min-w-[7.5rem] sm:max-w-[11rem]">
                <Link
                  href={href}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200/80 bg-white/90 px-4 py-3 text-center text-xs font-semibold text-slate-700 shadow-[0_1px_4px_rgba(15,23,42,0.04)] transition hover:border-msv-blue/35 hover:bg-msv-blue-soft/25 hover:text-msv-navy sm:py-2.5"
                >
                  <Icon className="h-4 w-4 shrink-0 text-msv-blue opacity-90" />
                  <span>{label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
