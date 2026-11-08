"use client";

import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";

type Props = {
  trigger: ReactNode;
  children: ReactNode;
  /** 패널 최대 너비 클래스 (예: w-[min(20rem,calc(100vw-2rem))]) */
  panelWidthClass: string;
  ariaLabel: string;
  /** 넓은 서비스 메뉴 등 */
  align?: "center" | "start" | "end";
};

type PanelPos = { top: number; left: number };

const CLOSE_DELAY_MS = 120;

function portalReady() {
  return typeof document !== "undefined";
}

/**
 * 데스크톱 헤더 하위 메뉴 — 마우스 올리면 드롭다운.
 * header backdrop-filter / overflow 영향 없이 body 포털로 표시합니다.
 */
export function DesktopHoverDropdown({
  trigger,
  children,
  panelWidthClass,
  ariaLabel,
  align = "center",
}: Props) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<PanelPos | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const panelId = useId();
  const mounted = useSyncExternalStore(() => () => {}, portalReady, () => false);

  const clearCloseTimer = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setOpen(false), CLOSE_DELAY_MS);
  }, [clearCloseTimer]);

  const openMenu = useCallback(() => {
    clearCloseTimer();
    setOpen(true);
  }, [clearCloseTimer]);

  const updatePosition = useCallback(() => {
    const el = rootRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const vw = window.innerWidth;
    const panelW = panelRef.current?.offsetWidth ?? Math.min(320, vw - 16);
    let left = r.left + r.width / 2;
    if (align === "start") left = r.left;
    if (align === "end") left = r.right;

    const half = panelW / 2;
    if (align === "center") {
      left = Math.min(Math.max(left, half + 8), vw - half - 8);
    } else if (align === "start") {
      left = Math.min(Math.max(left, 8), vw - panelW - 8);
    } else {
      left = Math.min(Math.max(left, panelW + 8), vw - 8);
    }

    setPos({ top: r.bottom + 6, left });
  }, [align]);

  useLayoutEffect(() => {
    if (!open) return;
    updatePosition();
    const id = window.requestAnimationFrame(() => updatePosition());
    return () => window.cancelAnimationFrame(id);
  }, [open, updatePosition]);

  useEffect(() => {
    if (!open) return;
    const onScrollOrResize = () => updatePosition();
    window.addEventListener("resize", onScrollOrResize);
    window.addEventListener("scroll", onScrollOrResize, true);
    return () => {
      window.removeEventListener("resize", onScrollOrResize);
      window.removeEventListener("scroll", onScrollOrResize, true);
    };
  }, [open, updatePosition]);

  useEffect(() => () => clearCloseTimer(), [clearCloseTimer]);

  const transform =
    align === "center" ? "translateX(-50%)" : align === "end" ? "translateX(-100%)" : "none";

  const panel =
    open && mounted && pos ? (
      <div
        ref={panelRef}
        id={panelId}
        role="navigation"
        aria-label={ariaLabel}
        className={`fixed z-[300] ${panelWidthClass}`}
        style={{ top: pos.top, left: pos.left, transform }}
        onMouseEnter={openMenu}
        onMouseLeave={scheduleClose}
      >
        <div className="rounded-lg border border-slate-100 bg-white py-1 shadow-lg shadow-slate-900/10">
          {children}
        </div>
      </div>
    ) : null;

  return (
    <div
      ref={rootRef}
      className="relative inline-flex items-center"
      onMouseEnter={openMenu}
      onMouseLeave={scheduleClose}
    >
      <div
        className="inline-flex"
        onFocus={openMenu}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) scheduleClose();
        }}
      >
        {trigger}
      </div>
      {mounted && panel ? createPortal(panel, document.body) : null}
    </div>
  );
}
