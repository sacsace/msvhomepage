"use client";

import Link from "next/link";
import { Fragment, useCallback, useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { HeaderLanguageSelect } from "@/components/layout/HeaderLanguageSelect";
import {
  buildSiteMegaMenuColumns,
  megaMenuUiStrings,
  type MegaMenuColumn,
  type MegaMenuGroup,
  type MegaMenuSection,
} from "@/lib/site-mega-menu";
import type { SiteLocale } from "@/lib/site-locale";
import { withLocalePrefix } from "@/lib/site-locale";

type Props = {
  locale: SiteLocale;
};

function MegaMenuGroupBlock({
  group,
  onNavigate,
}: {
  group: MegaMenuGroup | undefined;
  onNavigate: () => void;
}) {
  if (!group) return <div className="min-h-0" aria-hidden />;

  return (
    <div className="min-w-0 self-start">
      <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-red-600 sm:text-xs">{group.heading}</p>
      <ul className="mt-1.5 space-y-1">
        {group.items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onNavigate}
              className="block text-[13px] leading-snug text-slate-800 transition hover:text-msv-blue"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MegaMenuServicesBlock({ column, onNavigate }: { column: MegaMenuColumn; onNavigate: () => void }) {
  const groups = column.groups ?? [];
  const mid = Math.ceil(groups.length / 2);
  const left = groups.slice(0, mid);
  const right = groups.slice(mid);
  const rowCount = Math.max(left.length, right.length);

  return (
    <div className="col-span-2 min-w-0">
      {column.titleHref ? (
        <Link
          href={column.titleHref}
          onClick={onNavigate}
          className="block border-b border-slate-300 pb-1.5 text-xs font-bold uppercase tracking-wide text-slate-900 hover:text-msv-blue sm:text-sm"
        >
          {column.title}
        </Link>
      ) : (
        <p className="border-b border-slate-300 pb-1.5 text-xs font-bold uppercase tracking-wide text-slate-900 sm:text-sm">
          {column.title}
        </p>
      )}

      <div className="mt-2 grid grid-cols-2 gap-x-6 gap-y-4">
        {Array.from({ length: rowCount }, (_, i) => (
          <Fragment key={`services-row-${i}`}>
            <MegaMenuGroupBlock group={left[i]} onNavigate={onNavigate} />
            <MegaMenuGroupBlock group={right[i]} onNavigate={onNavigate} />
          </Fragment>
        ))}
      </div>
    </div>
  );
}

function MegaMenuSectionLinks({
  section,
  onNavigate,
  className,
}: {
  section: MegaMenuSection;
  onNavigate: () => void;
  className?: string;
}) {
  return (
    <div className={className}>
      {section.titleHref ? (
        <Link
          href={section.titleHref}
          onClick={onNavigate}
          className="block border-b border-slate-300 pb-1.5 text-xs font-bold uppercase tracking-wide text-slate-900 hover:text-msv-blue sm:text-sm"
        >
          {section.title}
        </Link>
      ) : (
        <p className="border-b border-slate-300 pb-1.5 text-xs font-bold uppercase tracking-wide text-slate-900 sm:text-sm">
          {section.title}
        </p>
      )}
      <ul className="mt-2 space-y-1">
        {section.items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onNavigate}
              className="block text-[13px] leading-snug text-slate-800 transition hover:text-msv-blue"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MegaMenuGroupNewsBlock({ column, onNavigate }: { column: MegaMenuColumn; onNavigate: () => void }) {
  const below = column.stackedBelow;
  if (!below) return <MegaMenuColumnBlock column={column} onNavigate={onNavigate} />;

  return (
    <div className="min-w-0">
      <MegaMenuColumnBlock column={{ ...column, stackedBelow: undefined, layout: "default" }} onNavigate={onNavigate} />
      <MegaMenuSectionLinks section={below} onNavigate={onNavigate} className="mt-8" />
    </div>
  );
}

function MegaMenuColumnBlock({ column, onNavigate }: { column: MegaMenuColumn; onNavigate: () => void }) {
  const showTitle = Boolean(column.title.trim());

  return (
    <div className="min-w-0">
      {showTitle ? (
        column.titleHref ? (
          <Link
            href={column.titleHref}
            onClick={onNavigate}
            className="block border-b border-slate-300 pb-1.5 text-xs font-bold uppercase tracking-wide text-slate-900 hover:text-msv-blue sm:text-sm"
          >
            {column.title}
          </Link>
        ) : (
          <p className="border-b border-slate-300 pb-1.5 text-xs font-bold uppercase tracking-wide text-slate-900 sm:text-sm">
            {column.title}
          </p>
        )
      ) : null}

      {column.items?.length ? (
        <ul className="mt-2 space-y-1">
          {column.items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onNavigate}
                className="block text-[13px] leading-snug text-slate-800 transition hover:text-msv-blue"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}

      {column.groups?.map((group) => (
        <div key={group.heading} className="mt-3 first:mt-2">
          <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-red-600 sm:text-xs">{group.heading}</p>
          <ul className="mt-1.5 space-y-1">
            {group.items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  className="block text-[13px] leading-snug text-slate-800 transition hover:text-msv-blue"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export function SiteMegaMenu({ locale }: Props) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const panelId = useId();
  const ui = megaMenuUiStrings(locale);
  const columns = buildSiteMegaMenuColumns(locale);
  const homeHref = withLocalePrefix("/", locale);
  const contactHref = withLocalePrefix("/contact", locale);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  const overlay =
    open && mounted ? (
      <>
        <button
          type="button"
          className="fixed inset-x-0 bottom-0 top-14 z-[199] cursor-default bg-slate-900/40 sm:top-[3.75rem]"
          aria-label={ui.closeMenu}
          onClick={close}
        />
        <div
          className="fixed inset-x-0 top-14 z-[200] flex max-h-[58dvh] min-h-[50dvh] flex-col overflow-hidden border-b border-slate-200/90 bg-white text-slate-900 shadow-[0_16px_48px_rgba(15,23,42,0.14)] sm:top-[3.75rem]"
        role="dialog"
        aria-modal="true"
        aria-label={ui.menuTitle}
        id={panelId}
      >
        <div className="flex shrink-0 items-center justify-between gap-4 border-b border-slate-200 bg-white px-4 py-2.5 sm:px-6 sm:py-3">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-900">
            <Link href={homeHref} className="text-slate-900 hover:text-msv-blue" onClick={close}>
              {ui.home}
            </Link>
            <Link href={contactHref} className="text-slate-900 hover:text-msv-blue" onClick={close}>
              {ui.contact}
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <HeaderLanguageSelect activeLocale={locale} />
            <button
              type="button"
              className="inline-flex h-8 w-8 items-center justify-center rounded-md text-xl font-light leading-none text-slate-800 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-msv-blue"
              aria-label={ui.closeMenu}
              onClick={close}
            >
              ×
            </button>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto bg-white px-4 py-4 pb-10 sm:px-6 sm:py-5 sm:pb-12 lg:px-8 lg:pb-14">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3 lg:grid-cols-5">
            {columns.map((col, i) =>
              col.layout === "services-split" ? (
                <MegaMenuServicesBlock key="services" column={col} onNavigate={close} />
              ) : col.layout === "group-with-news" ? (
                <MegaMenuGroupNewsBlock key="group" column={col} onNavigate={close} />
              ) : (
                <MegaMenuColumnBlock key={`${col.title}-${i}`} column={col} onNavigate={close} />
              ),
            )}
          </div>
        </div>
      </div>
      </>
    ) : null;

  const trigger = (
    <button
      type="button"
      className={`group relative inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-msv-navy via-[#1a2d45] to-slate-900 shadow-[0_2px_10px_rgba(15,23,42,0.22)] ring-1 ring-inset ring-white/15 transition-[box-shadow,ring-color,transform] duration-200 hover:shadow-[0_4px_16px_rgba(0,113,227,0.28)] hover:ring-msv-blue/35 active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-msv-blue sm:h-9 sm:w-9 ${
        open ? "ring-2 ring-msv-blue/45 shadow-[0_0_0_3px_rgba(0,113,227,0.12)]" : ""
      }`}
      aria-expanded={open}
      aria-controls={panelId}
      aria-label={ui.openMenu}
      onClick={() => setOpen((v) => !v)}
    >
      <span
        className="flex flex-col items-center justify-center gap-[5px] sm:gap-[5.5px]"
        aria-hidden
      >
        <span className="block h-[1.5px] w-3.5 rounded-full bg-white/92 transition-[width] duration-200 group-hover:w-4 sm:w-4" />
        <span className="block h-[1.5px] w-2.5 rounded-full bg-msv-blue-soft/95 sm:w-2.5" />
        <span className="block h-[1.5px] w-3.5 rounded-full bg-white/92 transition-[width] duration-200 group-hover:w-4 sm:w-4" />
      </span>
    </button>
  );

  return (
    <>
      {trigger}
      {mounted && overlay ? createPortal(overlay, document.body) : null}
    </>
  );
}
