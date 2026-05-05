"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

const BrowserPathnameContext = createContext<string>("/");

type Props = {
  /** 서버에서 `x-msv-browser-path` 헤더로 전달된 실제 URL 경로 */
  serverPathname: string;
  children: ReactNode;
};

/**
 * 미들웨어 rewrite(`/en/...` → 내부 경로) 때문에 `usePathname()`만으로는 주소창 경로와 같지 않을 수 있음.
 * 클라이언트에서는 매 커밋 후 `window.location.pathname`으로 동기화합니다(언어 전환 시 내부 경로가 그대로여도 반영).
 * (`useLayoutEffect` 는 일부 Turbopack·관리자 RSC 경계에서 모듈 팩토리 오류를 유발할 수 있어 `useEffect` 사용)
 */
export function BrowserPathnameProvider({ serverPathname, children }: Props) {
  const [pathname, setPathname] = useState(serverPathname);

  useEffect(() => {
    setPathname(serverPathname);
  }, [serverPathname]);

  // eslint-disable-next-line react-hooks/exhaustive-deps -- rewrite 때문에 usePathname 만으로는 URL 변화를 알 수 없음
  useEffect(() => {
    if (typeof window === "undefined") return;
    const w = window.location.pathname || "/";
    setPathname((prev) => (prev !== w ? w : prev));
  });

  return (
    <BrowserPathnameContext.Provider value={pathname}>{children}</BrowserPathnameContext.Provider>
  );
}

export function useBrowserPathname(): string {
  return useContext(BrowserPathnameContext);
}
