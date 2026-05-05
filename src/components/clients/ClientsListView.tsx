import Image from "next/image";
import type { Client } from "@/types/client";
import { publicFileExists } from "@/lib/public-file";

export function ClientsListView({ list }: { list: Client[] }) {
  if (list.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center text-sm leading-relaxed text-slate-600">
        등록된 고객사가 없습니다.
      </p>
    );
  }

  return (
    <ul className="mt-4 list-none divide-y divide-slate-200 p-0">
      {list.map((c) => {
        const anchor = `c-${c.id}`;
        const showLogo = Boolean(c.logoSrc && publicFileExists(c.logoSrc));

        return (
          <li
            key={c.id}
            id={anchor}
            className="scroll-mt-28 flex flex-col gap-4 py-5 sm:flex-row sm:items-start sm:gap-6 sm:py-6"
          >
            {showLogo && c.logoSrc ? (
              <div className="relative mx-auto h-20 w-32 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-white sm:mx-0">
                <Image
                  src={c.logoSrc}
                  alt={`${c.name} 로고`}
                  fill
                  className="object-contain p-1.5"
                  sizes="128px"
                  unoptimized
                />
              </div>
            ) : (
              <div className="mx-auto flex h-20 w-32 shrink-0 items-center justify-center rounded-lg border border-dashed border-slate-200 bg-slate-50 text-xs text-slate-400 sm:mx-0">
                로고 없음
              </div>
            )}
            <div className="min-w-0 flex-1 text-center sm:text-left">
              <h3 className="text-xs font-semibold text-msv-navy sm:text-sm">{c.name}</h3>
              {c.sector ? (
                <p className="mt-1 text-[11px] leading-relaxed text-slate-600 break-keep sm:text-xs sm:leading-relaxed">
                  {c.sector}
                </p>
              ) : null}
              {c.website ? (
                <a
                  href={c.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-msv-navy transition hover:border-msv-blue/35 hover:text-msv-blue"
                >
                  웹사이트
                </a>
              ) : null}
              {c.note ? (
                <p className="mt-3 text-sm leading-relaxed text-slate-600 break-keep">{c.note}</p>
              ) : null}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
