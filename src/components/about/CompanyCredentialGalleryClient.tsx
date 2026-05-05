"use client";

import Image from "next/image";

export type CredentialPreviewItem = {
  id: string;
  label: string;
  imageSrc: string;
};

type Props = { items: readonly CredentialPreviewItem[] };

/** 우클릭·드래그 저장을 막기 위한 래퍼(완벽한 차단은 불가) */
export function CompanyCredentialGalleryClient({ items }: Props) {
  return (
    <div
      className="select-none"
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
    >
      <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {items.map((item) => (
          <li key={item.id} className="list-none">
            <figure className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="relative aspect-[4/5] w-full bg-slate-50/60">
                <Image
                  src={item.imageSrc}
                  alt=""
                  role="presentation"
                  fill
                  className="object-contain object-center p-3 sm:p-4"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  draggable={false}
                  unoptimized
                />
              </div>
              <figcaption className="border-t border-slate-200 px-4 py-3 text-center text-sm leading-relaxed text-slate-600">
                {item.label}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </div>
  );
}
