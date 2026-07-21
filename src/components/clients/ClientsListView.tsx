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

export async function ClientsListView({ list, labels }: Props) {
  if (list.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center text-sm leading-relaxed text-slate-600">
        {labels.emptyListMessage}
      </p>
    );
  }

  const withLogo = await Promise.all(
    list.map(async (c) => ({
      c,
      showLogo: Boolean(c.logoSrc && (await publicFileExists(c.logoSrc))),
    })),
  );

  return (
    <ul className="mt-4 grid list-none grid-cols-2 gap-3 p-0 sm:grid-cols-5 sm:gap-3 md:gap-4">
      {withLogo.map(({ c, showLogo }) => {
        const anchor = `c-${c.id}`;

        return (
          <li
            key={c.id}
            id={anchor}
            className="scroll-mt-28 flex min-w-0 flex-col gap-2 rounded-xl border border-slate-200 bg-slate-50/40 p-2 sm:gap-2.5 sm:p-3"
          >
            {showLogo && c.logoSrc ? (
              <div className="relative mx-auto aspect-[4/3] w-full max-w-[5.75rem] shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-white sm:max-w-[6.5rem]">
                <Image
                  src={c.logoSrc}
                  alt={`${c.name} ${labels.logoAltSuffix}`}
                  fill
                  className="object-contain p-1"
                  sizes="(max-width: 768px) 40vw, 18vw"
                  unoptimized
                />
              </div>
            ) : (
              <div className="mx-auto flex aspect-[4/3] w-full max-w-[5.75rem] shrink-0 items-center justify-center rounded-lg border border-dashed border-slate-200 bg-white px-1 text-[10px] leading-tight text-slate-400 sm:max-w-[6.5rem] sm:text-[11px]">
                {labels.noLogoPlaceholder}
              </div>
            )}
            <div className="min-w-0 flex-1 text-center">
              <h3 className="text-[11px] font-semibold leading-snug text-msv-navy sm:text-xs md:text-[13px]">{c.name}</h3>
              {c.sector ? (
                <p className="mt-1 line-clamp-2 text-[10px] leading-relaxed text-slate-600 break-keep sm:text-[11px]">
                  {c.sector}
                </p>
              ) : null}
              {c.website ? (
                <a
                  href={c.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1.5 inline-flex max-w-full rounded-md border border-slate-200 bg-white px-2 py-1 text-[10px] font-semibold text-msv-navy transition hover:border-msv-blue/35 hover:text-msv-blue sm:text-xs"
                >
                  {labels.websiteLinkLabel}
                </a>
              ) : null}
              {c.note ? (
                <p className="mt-1.5 line-clamp-3 text-[10px] leading-relaxed text-slate-600 break-keep sm:text-[11px]">
                  {c.note}
                </p>
              ) : null}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
