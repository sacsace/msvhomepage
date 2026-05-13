"use client";

import { useBrowserPathname } from "@/components/layout/BrowserPathnameProvider";
import { useEffect, useRef } from "react";

const DEDupe_MS = 450;
/** 같은 탭·세션에서 마지막으로 서버에 기록한 경로 — 리프레시 중복만 막기 위해 사용 */
const SESSION_LAST_RECORDED_PATH_KEY = "msv_pv_last_recorded_path";

/**
 * 공개 사이트에서 주소 경로가 바뀔 때마다 서버에 페이지뷰를 기록합니다(관리자·API 제외는 서버에서 검증).
 * 같은 탭에서 동일 URL을 브라우저 리프레시한 경우에는 집계하지 않습니다.
 */
export function PageViewTracker() {
  const pathname = useBrowserPathname();
  const lastSent = useRef<{ path: string; at: number } | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const path = pathname || "/";
    if (path.startsWith("/admin") || path.startsWith("/api")) return;

    const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    let lastRecorded: string | null = null;
    try {
      lastRecorded = sessionStorage.getItem(SESSION_LAST_RECORDED_PATH_KEY);
    } catch {
      /* 비활성·프라이빗 모드 등 */
    }
    if (nav?.type === "reload" && lastRecorded === path) {
      return;
    }

    const now = Date.now();
    const prev = lastSent.current;
    if (prev && prev.path === path && now - prev.at < DEDupe_MS) return;
    lastSent.current = { path, at: now };

    try {
      sessionStorage.setItem(SESSION_LAST_RECORDED_PATH_KEY, path);
    } catch {
      /* 기록 생략 — 리프레시 스킵은 못 할 수 있음 */
    }

    const referrer = document.referrer ? document.referrer.slice(0, 512) : "";
    const body = JSON.stringify({ path, referrer: referrer || undefined });

    if (navigator.sendBeacon) {
      const blob = new Blob([body], { type: "application/json" });
      navigator.sendBeacon("/api/public/page-view", blob);
      return;
    }

    void fetch("/api/public/page-view", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {});
  }, [pathname]);

  return null;
}
