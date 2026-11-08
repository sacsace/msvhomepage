import type { ReactNode } from "react";
import Link from "next/link";
import { getRequestBrowserPath } from "@/lib/get-request-browser-path";
import {
  pageHeroMeta,
  resolvePageHeroPattern,
  type PageHeroPattern,
} from "@/lib/page-hero-pattern";

type Props = {
  title: string;
  /** 히어로 제목 위 소형 라벨(서비스 랜딩 등, 선택) */
  eyebrow?: string;
  description?: string;
  /** true면 설명을 줄바꿈 없이 한 줄로 표시하고, 넘치면 가로 스크롤합니다. */
  descriptionSingleLine?: boolean;
  /** true면 설명을 `max-w-6xl` 구간 전체 너비로(회사 소개 등). */
  descriptionWide?: boolean;
  /** 제목·설명 아래에 이어 붙일 본문 */
  belowDescription?: ReactNode;
  /**
   * @deprecated 패턴 시스템이 surface를 대체합니다. 호환용으로 유지.
   */
  surface?: "default" | "homeHero";
  /**
   * @deprecated 패턴 시스템이 tone을 대체합니다. 호환용으로 유지.
   */
  tone?: "default" | "editorial";
  /** 명시 패턴(없으면 URL 섹션으로 자동 결정) */
  pattern?: PageHeroPattern;
};

function HomeCrumb({ onDark }: { onDark: boolean }) {
  return (
    <p className={`text-sm ${onDark ? "text-white/60" : "text-slate-500"}`}>
      <Link
        href="/"
        className={
          onDark
            ? "font-medium text-white/80 underline-offset-4 hover:text-white hover:underline"
            : "font-medium text-msv-ink underline-offset-4 hover:underline"
        }
      >
        홈
      </Link>
    </p>
  );
}

export async function PageHeader({
  title,
  eyebrow,
  description,
  descriptionSingleLine,
  descriptionWide,
  belowDescription,
  pattern: patternProp,
}: Props) {
  const browserPath = await getRequestBrowserPath();
  const pattern = patternProp ?? resolvePageHeroPattern(browserPath);
  const meta = pageHeroMeta(pattern);
  const onDark = pattern === "ink";
  const showEyebrow = Boolean(eyebrow);

  const descriptionClassName = (() => {
    const baseWide = descriptionWide ? "max-w-6xl" : "max-w-3xl";
    if (descriptionSingleLine) {
      return `mt-4 ${baseWide} max-w-full whitespace-nowrap overflow-x-auto pb-1 text-sm [scrollbar-gutter:stable] ${
        onDark ? "text-white/70" : "text-slate-600"
      }`;
    }
    return `mt-4 ${baseWide} whitespace-pre-line text-pretty break-keep text-[15px] font-normal leading-[1.75] sm:text-base ${
      onDark ? "text-white/80" : "text-slate-600"
    }`;
  })();

  const titleClass = `mt-3 font-sans text-[clamp(1.75rem,3.6vw,2.5rem)] font-semibold leading-[1.12] tracking-[-0.035em] ${
    onDark ? "text-white" : "text-msv-ink"
  }`;

  const content = (
    <>
      <HomeCrumb onDark={onDark} />
      {showEyebrow ? (
        <p
          className={`mt-5 text-[11px] font-semibold uppercase tracking-[0.22em] ${
            onDark ? "text-white/45" : "text-slate-500"
          }`}
        >
          {eyebrow}
        </p>
      ) : (
        <p
          className={`mt-5 text-[11px] font-semibold uppercase tracking-[0.22em] ${
            onDark ? "text-white/45" : "text-slate-500"
          }`}
        >
          {meta.label}
        </p>
      )}
      <h1 className={titleClass}>{title}</h1>
      {description ? <p className={descriptionClassName}>{description}</p> : null}
      {belowDescription ? <div className="mt-5 sm:mt-6">{belowDescription}</div> : null}
    </>
  );

  if (pattern === "ink") {
    return (
      <header className="relative isolate overflow-hidden border-b border-white/10 bg-msv-ink">
        <div
          className="pointer-events-none absolute -right-8 top-8 hidden select-none font-sans text-[8rem] font-bold leading-none tracking-[-0.08em] text-white/[0.06] sm:block lg:text-[10rem]"
          aria-hidden
        >
          {meta.index}
        </div>
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_90%_80%,rgba(61,107,90,0.12),transparent_55%)]"
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-16 lg:px-12">
          <div className="h-px w-14 bg-msv-mint" aria-hidden />
          <div className="mt-6">{content}</div>
        </div>
      </header>
    );
  }

  if (pattern === "paper") {
    return (
      <header className="relative isolate overflow-hidden border-b border-msv-ink/10 bg-[#f3f3f3]">
        <div
          className="pointer-events-none absolute bottom-8 left-4 hidden lg:block"
          aria-hidden
        >
          <span className="msv-vertical-label">{meta.label}</span>
        </div>
        <div
          className="pointer-events-none absolute right-6 top-4 select-none font-sans text-[7rem] font-bold leading-none tracking-[-0.08em] text-black/[0.05] sm:right-10 sm:text-[9rem]"
          aria-hidden
        >
          {meta.index}
        </div>
        <div className="relative mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:pl-20">
          <div className="msv-ink-sweep h-px w-16 bg-msv-mint" aria-hidden />
          <div className="mt-6 max-w-3xl">{content}</div>
        </div>
      </header>
    );
  }

  if (pattern === "split") {
    return (
      <header className="relative isolate overflow-hidden border-b border-msv-ink/10 bg-white">
        <div className="grid lg:grid-cols-12">
          <div className="relative mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 sm:py-16 lg:col-span-7 lg:mx-0 lg:max-w-none lg:px-12 lg:py-20">
            <p className="font-sans text-5xl font-bold tabular-nums tracking-[-0.06em] text-msv-ink/10">
              {meta.index}
            </p>
            <div className="mt-2">{content}</div>
          </div>
          <div
            className="relative hidden min-h-[14rem] bg-msv-ink lg:col-span-5 lg:block"
            aria-hidden
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_30%_40%,rgba(61,107,90,0.16),transparent_60%)]" />
            <div className="absolute bottom-10 left-10 right-10">
              <div className="h-px w-full bg-white/20" />
              <p className="mt-4 font-sans text-[11px] font-semibold uppercase tracking-[0.28em] text-white/50">
                {meta.label}
              </p>
              <p className="mt-3 font-sans text-3xl font-semibold tracking-[-0.035em] text-white">
                Practice
              </p>
            </div>
          </div>
        </div>
      </header>
    );
  }

  if (pattern === "slate") {
    const roster = ["Neocle", "Seda", "Lotus"] as const;
    return (
      <header className="relative isolate overflow-hidden border-b border-msv-ink/10 bg-[#f5f5f5]">
        <div
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-[40%] bg-[#ebebeb] lg:block"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute bottom-10 left-5 hidden lg:block"
          aria-hidden
        >
          <span className="msv-vertical-label">{meta.label}</span>
        </div>
        <div className="relative mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 sm:py-16 lg:grid-cols-12 lg:items-end lg:gap-8 lg:px-12 lg:pl-20 lg:py-20">
          <div className="lg:col-span-7">
            <p className="font-sans text-6xl font-bold tabular-nums leading-none tracking-[-0.07em] text-msv-ink/[0.07] sm:text-7xl">
              {meta.index}
            </p>
            <div className="msv-ink-sweep mt-4 h-px w-14 bg-msv-mint" aria-hidden />
            <div className="mt-5 max-w-2xl">{content}</div>
          </div>
          <div className="lg:col-span-5" aria-hidden>
            <ul className="list-none border border-msv-ink/10 p-0">
              {roster.map((name, i) => (
                <li
                  key={name}
                  className="grid grid-cols-[3rem_minmax(0,1fr)] items-center gap-3 border-b border-msv-ink/10 bg-[#f5f5f5] px-4 py-3.5 last:border-b-0"
                >
                  <span className="font-sans text-[11px] font-semibold tabular-nums tracking-[0.14em] text-slate-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-sans text-sm font-semibold tracking-[-0.02em] text-msv-ink">
                    {name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </header>
    );
  }

  if (pattern === "frame") {
    return (
      <header className="border-b border-msv-ink/10 bg-white">
        <div className="relative mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-16 lg:px-12">
          <div className="relative border border-msv-ink/15 px-6 py-10 sm:px-10 sm:py-12">
            <span className="absolute left-0 top-0 h-3 w-3 border-l border-t border-msv-ink" aria-hidden />
            <span className="absolute right-0 top-0 h-3 w-3 border-r border-t border-msv-ink" aria-hidden />
            <span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-msv-ink" aria-hidden />
            <span className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-msv-ink" aria-hidden />
            <span className="absolute right-5 top-5 h-2 w-2 rounded-full bg-msv-mint" aria-hidden />
            <p className="mb-1 font-sans text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400">
              {meta.index}
            </p>
            {content}
          </div>
        </div>
      </header>
    );
  }

  if (pattern === "folio") {
    const lineup = ["MVS", "HeresNow", "Payroll", "WISC"] as const;
    return (
      <header className="relative isolate overflow-hidden border-b border-msv-ink/10 bg-[#f5f5f5]">
        <div
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-[38%] bg-[#ebebeb] lg:block"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute bottom-10 left-5 hidden lg:block"
          aria-hidden
        >
          <span className="msv-vertical-label">{meta.label}</span>
        </div>
        <div className="relative mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 sm:py-16 lg:grid-cols-12 lg:items-end lg:gap-8 lg:px-12 lg:pl-20 lg:py-20">
          <div className="lg:col-span-7">
            <p className="font-sans text-6xl font-bold tabular-nums leading-none tracking-[-0.07em] text-msv-ink/[0.07] sm:text-7xl">
              {meta.index}
            </p>
            <div className="msv-ink-sweep mt-4 h-px w-14 bg-msv-mint" aria-hidden />
            <div className="mt-5 max-w-2xl">{content}</div>
          </div>
          <div className="lg:col-span-5" aria-hidden>
            <ul className="grid grid-cols-2 gap-px border border-msv-ink/10 bg-msv-ink/10 sm:grid-cols-2">
              {lineup.map((name, i) => (
                <li
                  key={name}
                  className="flex min-h-[5.5rem] flex-col justify-between bg-[#f5f5f5] p-4 sm:min-h-[6.5rem] sm:p-5"
                >
                  <span className="font-sans text-[11px] font-semibold tabular-nums tracking-[0.14em] text-slate-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-sans text-sm font-semibold tracking-[-0.02em] text-msv-ink sm:text-base">
                    {name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </header>
    );
  }

  /* band — contact */
  return (
    <header className="border-b border-msv-ink/10 bg-white">
      <div className="h-1 w-full bg-msv-ink" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-14 lg:px-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">{content}</div>
          <p
            className="hidden font-sans text-6xl font-bold tabular-nums tracking-[-0.07em] text-msv-ink/10 lg:block"
            aria-hidden
          >
            {meta.index}
          </p>
        </div>
      </div>
    </header>
  );
}
