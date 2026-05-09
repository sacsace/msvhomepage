import type { ReactNode } from "react";
import Link from "next/link";

type Props = {
  title: string;
  /** 히어로 제목 위 소형 라벨(서비스 랜딩 등, 선택) */
  eyebrow?: string;
  description?: string;
  /** true면 설명을 줄바꿈 없이 한 줄로 표시하고, 넘치면 가로 스크롤합니다. */
  descriptionSingleLine?: boolean;
  /** true면 설명을 `max-w-6xl` 구간 전체 너비로(회사 소개 등). `descriptionSingleLine`과 함께 쓰지 않습니다. */
  descriptionWide?: boolean;
  /** 제목·설명 아래에 이어 붙일 본문(회사 소개 상단 통합 등) */
  belowDescription?: ReactNode;
  /**
   * `homeHero`: 홈 `SimpleHero`와 동일한 네이비 그라데이션 배경 + 밝은 텍스트(회사 소개 상단 등).
   * `tone=editorial`과 동시에 쓰이면 배경·타이포는 `homeHero`가 우선합니다.
   */
  surface?: "default" | "homeHero";
  /**
   * `editorial`: 밝은 배경·중앙 정렬 히어로·디스플레이 타이포(회사 소개 등, 애플 톤).
   * 기본값은 기존 사이트 헤더 스타일을 유지합니다.
   */
  tone?: "default" | "editorial";
};

export function PageHeader({
  title,
  eyebrow,
  description,
  descriptionSingleLine,
  descriptionWide,
  belowDescription,
  surface = "homeHero",
  tone = "default",
}: Props) {
  const homeHero = surface === "homeHero";
  const editorial = tone === "editorial" && !homeHero;
  const showEyebrow = Boolean(eyebrow) && !editorial;
  const titleTopMargin = showEyebrow ? "mt-2.5" : "mt-4";

  const descriptionClassName = (() => {
    if (descriptionSingleLine) {
      return homeHero
        ? "mt-3 max-w-full text-sm text-white/75 whitespace-nowrap overflow-x-auto pb-1 [scrollbar-gutter:stable]"
        : "mt-3 max-w-full text-sm text-slate-600 whitespace-nowrap overflow-x-auto pb-1 [scrollbar-gutter:stable]";
    }
    if (descriptionWide && editorial) {
      return "mx-auto mt-6 max-w-xl text-pretty text-[19px] font-normal leading-snug tracking-[-0.015em] text-slate-600 break-keep sm:mt-7 sm:max-w-2xl sm:text-[1.3125rem] sm:leading-[1.45]";
    }
    if (descriptionWide && homeHero) {
      return "mt-4 max-w-6xl whitespace-pre-line text-base font-normal leading-relaxed text-white/88 break-keep sm:text-[17px] sm:leading-[1.65]";
    }
    if (descriptionWide) {
      return "mt-3 max-w-none text-sm leading-snug text-pretty text-slate-600 break-keep sm:text-[15px] sm:leading-[1.55]";
    }
    if (editorial) {
      return "mx-auto mt-6 max-w-2xl text-center text-base font-normal leading-relaxed text-pretty text-slate-600 sm:text-lg";
    }
    if (homeHero) {
      return "mt-4 max-w-3xl text-[15px] font-normal leading-relaxed tracking-[-0.01em] text-white/85 sm:text-base";
    }
    return "mt-4 max-w-3xl text-[15px] font-normal leading-relaxed tracking-[-0.01em] text-slate-600 sm:text-base";
  })();

  const belowMargin =
    description || descriptionSingleLine
      ? editorial
        ? "mt-12 sm:mt-14"
        : "mt-4 sm:mt-5"
      : editorial
        ? "mt-10 sm:mt-12"
        : "mt-3 sm:mt-4";

  const heroOverlays = homeHero ? (
    <>
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35] bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[100%_22px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(45,91,255,0.22),transparent)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,transparent_40%,rgba(255,255,255,0.04)_50%,transparent_60%)]"
        aria-hidden
      />
    </>
  ) : null;

  const inner = (
    <div
      className={
        editorial
          ? "mx-auto max-w-5xl px-6 text-center sm:px-10 lg:max-w-4xl"
          : "relative mx-auto max-w-6xl px-5 py-10 text-left sm:px-8 sm:py-12"
      }
    >
      {editorial ? (
        <nav aria-label="이전 페이지" className="flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-full bg-slate-100/95 px-3.5 py-2 text-[13px] font-medium text-slate-600 transition-colors duration-200 hover:bg-slate-200/90 hover:text-slate-800"
          >
            <span className="text-[15px] font-normal leading-none text-slate-400" aria-hidden>
              ‹
            </span>
            홈
          </Link>
        </nav>
      ) : (
        <p className={homeHero ? "text-sm text-white/65" : "text-sm text-slate-500"}>
          <Link
            href="/"
            className={
              homeHero
                ? "font-medium text-msv-blue-soft hover:text-white hover:underline"
                : "font-medium text-msv-blue hover:underline"
            }
          >
            홈
          </Link>
        </p>
      )}
      {showEyebrow ? (
        <p
          className={
            homeHero
              ? "mt-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/50 sm:text-[11px]"
              : "mt-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-500 sm:text-[11px]"
          }
        >
          {eyebrow}
        </p>
      ) : null}
      <h1
        className={
          editorial
            ? "mx-auto mt-6 max-w-3xl text-[2.5rem] font-semibold leading-[1.06] tracking-[-0.045em] text-slate-900 sm:mt-7 sm:text-5xl sm:leading-[1.05] lg:text-[3.25rem] lg:leading-[1.02]"
            : homeHero
              ? `${titleTopMargin} text-[1.875rem] font-semibold leading-tight tracking-[-0.03em] text-white sm:text-[2.125rem]`
              : `${titleTopMargin} text-[1.875rem] font-semibold leading-tight tracking-[-0.03em] text-slate-900 sm:text-[2.125rem]`
        }
      >
        {title}
      </h1>
      {description ? <p className={descriptionClassName}>{description}</p> : null}
      {belowDescription ? (
        <div
          className={
            editorial ? `${belowMargin} mx-auto max-w-[38rem] text-left sm:max-w-[40rem]` : `${belowMargin}`
          }
        >
          {belowDescription}
        </div>
      ) : null}
    </div>
  );

  if (homeHero) {
    return (
      <header className="border-b border-slate-200/35">
        <div className="relative isolate overflow-hidden bg-gradient-to-br from-msv-navy via-[#122338] to-slate-950">
          {heroOverlays}
          {inner}
        </div>
      </header>
    );
  }

  return (
    <header
      className={
        editorial
          ? "relative bg-white pb-20 pt-12 sm:pb-24 sm:pt-16 lg:pb-28 lg:pt-20"
          : "border-b border-slate-200/55 bg-white"
      }
    >
      <div
        className={
          editorial
            ? "mx-auto max-w-5xl px-6 text-center sm:px-10 lg:max-w-4xl"
            : "mx-auto max-w-6xl px-5 py-10 text-left sm:px-8 sm:py-12"
        }
      >
        {editorial ? (
          <nav aria-label="이전 페이지" className="flex justify-center">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-full bg-slate-100/95 px-3.5 py-2 text-[13px] font-medium text-slate-600 transition-colors duration-200 hover:bg-slate-200/90 hover:text-slate-800"
            >
              <span className="text-[15px] font-normal leading-none text-slate-400" aria-hidden>
                ‹
              </span>
              홈
            </Link>
          </nav>
        ) : (
          <p className="text-sm text-slate-500">
            <Link href="/" className="font-medium text-msv-blue hover:underline">
              홈
            </Link>
          </p>
        )}
        {showEyebrow ? (
          <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-500 sm:text-[11px]">
            {eyebrow}
          </p>
        ) : null}
        <h1
          className={
            editorial
              ? "mx-auto mt-6 max-w-3xl text-[2.5rem] font-semibold leading-[1.06] tracking-[-0.045em] text-slate-900 sm:mt-7 sm:text-5xl sm:leading-[1.05] lg:text-[3.25rem] lg:leading-[1.02]"
              : `${titleTopMargin} text-[1.875rem] font-semibold leading-tight tracking-[-0.03em] text-slate-900 sm:text-[2.125rem]`
          }
        >
          {title}
        </h1>
        {description ? <p className={descriptionClassName}>{description}</p> : null}
        {belowDescription ? (
          <div
            className={
              editorial ? `${belowMargin} mx-auto max-w-[38rem] text-left sm:max-w-[40rem]` : `${belowMargin}`
            }
          >
            {belowDescription}
          </div>
        ) : null}
      </div>
    </header>
  );
}
