import Image from "next/image";
import { publicFileExists } from "@/lib/public-file";
import type { StaffProfile } from "@/types/staff-profile";

function initials(name: string): string {
  return name.replace(/\s+/g, "").slice(0, 2);
}

type Props = {
  profiles: readonly StaffProfile[];
};

/** 회사 소개 등 — 좁은 세로 카드: 사진 → 이름 → 부서명(`role`, 라벨 없음) */
export function StaffProfileGrid({ profiles }: Props) {
  return (
    <ul className="mx-auto flex max-w-[1100px] flex-wrap justify-center gap-4 sm:gap-5 md:gap-6">
      {profiles.map((p) => {
        const dept = p.role.trim() || "—";
        const showPhoto = Boolean(p.photoSrc && publicFileExists(p.photoSrc));

        return (
          <li
            key={p.id}
            className="flex w-40 shrink-0 flex-col items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-5 text-center shadow-sm sm:gap-3.5 sm:px-4 sm:py-5"
          >
            <div className="relative size-[5.25rem] shrink-0 overflow-hidden rounded-full bg-gradient-to-b from-slate-50 to-slate-100/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] ring-1 ring-slate-900/[0.06] sm:size-[6.25rem]">
              {showPhoto && p.photoSrc ? (
                <Image
                  src={p.photoSrc}
                  alt={`${p.name} 프로필 사진`}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 640px) 80px, 96px"
                  unoptimized
                />
              ) : (
                <span className="flex h-full w-full items-center justify-center text-lg font-semibold tracking-[-0.03em] text-slate-400 sm:text-xl">
                  {initials(p.name)}
                </span>
              )}
            </div>
            <p className="w-full truncate text-sm font-semibold tracking-[-0.02em] text-slate-900 sm:text-[15px]" title={p.name}>
              {p.name}
            </p>
            <p className="line-clamp-2 w-full text-xs leading-relaxed text-slate-600 sm:text-sm sm:leading-relaxed" title={dept}>
              {dept}
            </p>
          </li>
        );
      })}
    </ul>
  );
}
