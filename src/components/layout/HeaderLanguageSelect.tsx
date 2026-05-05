"use client";

import { useRouter } from "next/navigation";
import type { SiteLocale } from "@/lib/site-locale";
import { stripLocalePrefix, withLocalePrefix } from "@/lib/site-locale";
import { shellStrings } from "@/lib/i18n/shell";

/** macOS 보조 레이블 톤에 가까운 쉐브론 */
const HEADER_LANG_CHEVRON =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath fill='none' stroke='%2386868b' stroke-width='1.1' stroke-linecap='round' stroke-linejoin='round' d='M1 1.25L5 4.75l4-3.5'/%3E%3C/svg%3E";

type Props = {
  /** 레이아웃 `getRequestLocale()`와 동일 — 실제 렌더 언어(주소창 `/en` 등과 콤보 표시 일치) */
  activeLocale: SiteLocale;
};

/** 헤더 언어 콤보박스 — 현재 페이지 경로를 유지한 채 `/en`·`/zh` 접두만 전환 */
export function HeaderLanguageSelect({ activeLocale }: Props) {
  const router = useRouter();
  const shell = shellStrings(activeLocale);

  return (
    <div className="relative shrink-0">
      <label htmlFor="header-site-lang" className="sr-only">
        {shell.langLabel}
      </label>
      <select
        id="header-site-lang"
        name="site-lang"
        value={activeLocale}
        aria-label={shell.langLabel}
        onChange={(e) => {
          const next = e.target.value as SiteLocale;
          if (next === activeLocale) return;
          const raw = typeof window !== "undefined" ? window.location.pathname : "/";
          const bare = stripLocalePrefix(raw.split("#")[0] || raw);
          if (next === "ko") router.push(bare);
          else router.push(withLocalePrefix(bare, next));
          // RSC 레이아웃의 locale·serverPath 갱신 + 클라이언트 상태 정합
          router.refresh();
        }}
        className="h-8 min-w-[7rem] cursor-pointer appearance-none rounded-[10px] border border-slate-200/90 bg-white/95 py-1.5 pl-3 pr-8 text-left text-[12px] font-normal leading-tight tracking-[-0.01em] text-slate-900 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-[border-color,background-color,box-shadow] duration-200 ease-out bg-[length:10px_6px] bg-[position:right_0.55rem_center] bg-no-repeat hover:border-slate-300/95 hover:bg-slate-50/95 hover:shadow-[0_2px_8px_rgba(15,23,42,0.06)] focus:outline-none focus-visible:border-slate-300 focus-visible:bg-white focus-visible:shadow-[0_2px_8px_rgba(15,23,42,0.06)] focus-visible:ring-2 focus-visible:ring-slate-900/[0.06] focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:h-9 sm:min-w-[7.5rem] sm:py-2 sm:pl-3.5 sm:pr-9 sm:text-[13px]"
        style={{ backgroundImage: `url("${HEADER_LANG_CHEVRON}")` }}
      >
        <option value="ko">한국어</option>
        <option value="en">English</option>
        <option value="zh">中文</option>
      </select>
    </div>
  );
}
