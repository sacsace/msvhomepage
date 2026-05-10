"use client";

import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

const BrowserPathnameContext = createContext<string>("/");

type Props = {
  /** 서버에서 `x-msv-browser-path` 헤더로 전달된 실제 URL 경로 */
  serverPathname: string;
  children: ReactNode;
};

/**
 * 미들웨어 rewrite(`/en/...` → 내부 경로) 때문에 `usePathname()`만으로는 주소창 경로와 같지 않을 수 있음.
 * 클라이언트 내비게이션 시 루트 레이아웃의 `serverPathname`이 갱신되지 않을 수 있어, `usePathname()` 변화마다
 * 주소창 기준 `window.location.pathname`으로 다시 맞춥니다(rewrite 대비).
 * (`useLayoutEffect` 는 일부 Turbopack·관리자 RSC 경계에서 모듈 팩토리 오류를 유발할 수 있어 `useEffect` 사용)
 */
export function BrowserPathnameProvider({ serverPathname, children }: Props) {
  const nextPath = usePathname();
  const [pathname, setPathname] = useState(serverPathname);

  useEffect(() => {
    queueMicrotask(() => {
      setPathname(serverPathname);
    });
  }, [serverPathname]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const w = window.location.pathname || "/";
    queueMicrotask(() => {
      setPathname((prev) => (prev !== w ? w : prev));
    });
  }, [nextPath]);

  return (
    <BrowserPathnameContext.Provider value={pathname}>{children}</BrowserPathnameContext.Provider>
  );
}

export function useBrowserPathname(): string {
  return useContext(BrowserPathnameContext);
}
