"use client";

import { useBrowserPathname } from "@/components/layout/BrowserPathnameProvider";
import { useEffect, useRef } from "react";

const DEDupe_MS = 450;

/**
 * 공개 사이트에서 주소 경로가 바뀔 때마다 서버에 페이지뷰를 기록합니다(관리자·API 제외는 서버에서 검증).
 */
export function PageViewTracker() {
  const pathname = useBrowserPathname();
  const lastSent = useRef<{ path: string; at: number } | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const path = pathname || "/";
    if (path.startsWith("/admin") || path.startsWith("/api")) return;

    const now = Date.now();
    const prev = lastSent.current;
    if (prev && prev.path === path && now - prev.at < DEDupe_MS) return;
    lastSent.current = { path, at: now };

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
