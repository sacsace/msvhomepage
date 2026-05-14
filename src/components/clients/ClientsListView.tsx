import Image from "next/image";
import type { Client } from "@/types/client";
import { publicFileExists } from "@/lib/public-file";

export type ClientsListLabels = {
  emptyListMessage: string;
  /** `${name} ${logoAltSuffix}` — 예: "로고", "logo", "标志" */
  logoAltSuffix: string;
  noLogoPlaceholder: string;
  websiteLinkLabel: string;
};

type Props = {
  list: Client[];
  labels: ClientsListLabels;
};

export function ClientsListView({ list, labels }: Props) {
  if (list.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center text-sm leading-relaxed text-slate-600">
        {labels.emptyListMessage}
      </p>
    );
  }

  return (
    <ul className="mt-4 grid list-none grid-flow-col grid-rows-[auto_auto] auto-cols-[12.5rem] gap-x-4 gap-y-4 overflow-x-auto p-0 pb-2 sm:auto-cols-[13.5rem] sm:gap-x-5 sm:gap-y-5">
      {list.map((c) => {
        const anchor = `c-${c.id}`;
        const showLogo = Boolean(c.logoSrc && publicFileExists(c.logoSrc));

        return (
          <li
            key={c.id}
            id={anchor}
            className="scroll-mt-28 flex min-w-0 max-w-[12.5rem] flex-col gap-2.5 rounded-xl border border-slate-200 bg-slate-50/40 p-3 sm:max-w-[13.5rem] sm:p-4"
          >
            {showLogo && c.logoSrc ? (
              <div className="relative mx-auto h-16 w-28 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-white">
                <Image
                  src={c.logoSrc}
                  alt={`${c.name} ${labels.logoAltSuffix}`}
                  fill
                  className="object-contain p-1.5"
                  sizes="112px"
                  unoptimized
                />
              </div>
            ) : (
              <div className="mx-auto flex h-16 w-28 shrink-0 items-center justify-center rounded-lg border border-dashed border-slate-200 bg-white text-[11px] text-slate-400">
                {labels.noLogoPlaceholder}
              </div>
            )}
            <div className="min-w-0 flex-1 text-center">
              <h3 className="text-xs font-semibold text-msv-navy sm:text-sm">{c.name}</h3>
              {c.sector ? (
                <p className="mt-1 line-clamp-3 text-[11px] leading-relaxed text-slate-600 break-keep sm:text-xs">
                  {c.sector}
                </p>
              ) : null}
              {c.website ? (
                <a
                  href={c.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-msv-navy transition hover:border-msv-blue/35 hover:text-msv-blue sm:text-sm"
                >
                  {labels.websiteLinkLabel}
                </a>
              ) : null}
              {c.note ? (
                <p className="mt-2 line-clamp-4 text-xs leading-relaxed text-slate-600 break-keep">{c.note}</p>
              ) : null}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
