"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { LicenseCardItem, LicenseRegistrationModalLookups } from "@/lib/i18n/license-registration-service-locale";

export type { LicenseCardItem } from "@/lib/i18n/license-registration-service-locale";

type Props = {
  items: readonly LicenseCardItem[];
  modal: LicenseRegistrationModalLookups;
};

export function LicenseCardsWithModal({ items, modal }: Props) {
  const [selected, setSelected] = useState<LicenseCardItem | null>(null);

  useEffect(() => {
    if (!selected) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelected(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selected]);

  useEffect(() => {
    if (!selected) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [selected]);

  return (
    <>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          const monochromeStyle = item.monochrome
            ? "border-slate-300 bg-slate-100 text-slate-700 hover:border-slate-400"
            : "border-slate-200 bg-white hover:border-msv-blue/35";

          if (item.disableModal) {
            return (
              <article
                key={item.name}
                className={`rounded-xl p-5 text-left shadow-sm transition ${monochromeStyle}`}
              >
                <h3 className={`text-3xl font-medium tracking-tight ${item.monochrome ? "text-slate-900" : "text-msv-navy"}`}>
                  {item.name}
                </h3>
                {item.subtitle ? (
                  <p className={`mt-1 text-[11px] ${item.monochrome ? "text-slate-600" : "text-slate-500"}`}>
                    {item.subtitle}
                  </p>
                ) : null}
                <p className={`mt-5 text-sm leading-relaxed line-clamp-3 ${item.monochrome ? "text-slate-700" : "text-slate-600"}`}>
                  {item.description}
                </p>
              </article>
            );
          }

          return (
            <button
              key={item.name}
              type="button"
              onClick={() => setSelected(item)}
              className={`rounded-xl p-5 text-left shadow-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-msv-blue ${monochromeStyle}`}
            >
              <h3
                className={`text-3xl font-medium tracking-tight ${
                  item.monochrome ? "text-slate-700" : "text-msv-navy"
                }`}
              >
                {item.name}
              </h3>
              {item.subtitle ? (
                <p className={`mt-1 text-[11px] ${item.monochrome ? "text-slate-500" : "text-slate-500"}`}>
                  {item.subtitle}
                </p>
              ) : null}
              <p
                className={`mt-5 text-sm leading-relaxed line-clamp-3 ${
                  item.monochrome ? "text-slate-600" : "text-slate-600"
                }`}
              >
                {item.description}
              </p>
              {!item.monochrome ? (
                <p className="mt-3 text-xs font-semibold text-msv-blue">{modal.ui.clickToSeeMore}</p>
              ) : null}
            </button>
          );
        })}
      </div>

      {selected && typeof document !== "undefined"
        ? createPortal(
            <div
              className="fixed inset-0 z-[200] overflow-y-auto bg-slate-950/55 backdrop-blur-[2px]"
              role="dialog"
              aria-modal="true"
              aria-labelledby="license-modal-title"
            >
              <div
                className="flex min-h-[100dvh] justify-center px-4 pb-16 pt-12 sm:px-6 sm:pb-20 sm:pt-16"
                onClick={() => setSelected(null)}
              >
                <div
                  className="relative h-fit w-full max-w-2xl self-center rounded-3xl border border-slate-200/80 bg-white p-6 shadow-[0_25px_50px_-12px_rgba(15,23,42,0.25)] sm:p-8 sm:shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 pr-2">
                      <h3
                        id="license-modal-title"
                        className="text-2xl font-semibold tracking-[-0.02em] text-slate-900 sm:text-[1.65rem]"
                      >
                        {selected.name}
                      </h3>
                      {selected.subtitle ? (
                        <p className="mt-1.5 text-sm text-slate-500">{selected.subtitle}</p>
                      ) : null}
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelected(null)}
                      className="shrink-0 rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:bg-white hover:text-slate-900"
                      aria-label={modal.ui.closeAria}
                    >
                      {modal.ui.close}
                    </button>
                  </div>

                  {selected.comingSoon ? (
                    <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                      <p className="text-sm font-semibold text-slate-700">{modal.ui.comingSoon}</p>
                    </div>
                  ) : (
                    <>
                      <p className="mt-6 text-[15px] leading-[1.65] text-slate-600">{selected.description}</p>

                      <div className="mt-5 rounded-2xl border border-msv-blue/25 bg-msv-blue-soft/25 p-5">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-msv-blue">
                          {modal.ui.timelineHeading}
                        </p>
                        <p className="mt-2.5 text-sm leading-relaxed text-slate-700">
                          {modal.timelineByName[selected.name] ?? modal.timelineDefault}
                        </p>
                      </div>

                      <div className="mt-4 rounded-2xl border border-slate-200/90 bg-slate-50/40 p-5">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                          {modal.ui.registrationOwnerHeading}
                        </p>
                        <p className="mt-2.5 text-sm leading-relaxed text-slate-700">
                          {modal.ownerByName[selected.name] ?? modal.ownerDefault}
                        </p>
                      </div>

                      <div className="mt-4 rounded-2xl border border-slate-200/90 p-5">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                          {modal.ui.detailHeading}
                        </p>
                        <div className="mt-3 space-y-3 text-sm leading-relaxed text-slate-700">
                          {(modal.detailByName[selected.name] ?? modal.detailDefault).map((line, idx) => (
                            <p key={`${selected.name}-detail-${idx}`}>{line}</p>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4 rounded-2xl border border-amber-200/80 bg-amber-50/90 p-5">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-amber-800">
                          {modal.ui.disclaimerHeading}
                        </p>
                        <p className="mt-2.5 text-sm leading-relaxed text-amber-950/90">{modal.ui.disclaimerBody}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
