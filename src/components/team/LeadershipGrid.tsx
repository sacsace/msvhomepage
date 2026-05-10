import Image from "next/image";
import { leadershipBioDisplayForLocale } from "@/lib/i18n/team-locale";
import { publicFileExists } from "@/lib/public-file";
import type { SiteLocale } from "@/lib/site-locale";
import type { LeadershipMember } from "@/types/leadership";

function initials(name: string): string {
  return name.replace(/\s+/g, "").slice(0, 2);
}

type Props = {
  members: readonly LeadershipMember[];
  /** about 등에서 요약만 짧게 */
  compactSummary?: boolean;
  locale: SiteLocale;
};

export function LeadershipGrid({ members, compactSummary, locale }: Props) {
  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:items-start">
      {members.map((m) => {
        const showPhoto = Boolean(m.photoSrc && publicFileExists(m.photoSrc));
        const bio = leadershipBioDisplayForLocale(m, locale);
        const summaryText = compactSummary && bio.length > 120 ? `${bio.slice(0, 118)}…` : bio;

        return (
          <li
            key={m.email}
            className="grid w-full grid-cols-1 content-start gap-4 rounded-xl border border-slate-200 bg-slate-50/40 p-5 shadow-sm sm:grid-cols-[7rem_minmax(0,1fr)] sm:items-start sm:gap-x-5 sm:gap-y-4 sm:p-6"
          >
            <div className="relative mx-auto h-28 w-28 shrink-0 overflow-hidden rounded-full border border-slate-200 bg-white ring-1 ring-slate-100 sm:mx-0 sm:mt-0 sm:justify-self-start">
              {showPhoto && m.photoSrc ? (
                <Image
                  src={m.photoSrc}
                  alt={`${m.name} 프로필 사진`}
                  fill
                  className="object-contain object-top"
                  sizes="112px"
                  unoptimized
                />
              ) : (
                <span className="flex h-full w-full items-center justify-center text-base font-bold tracking-tight text-msv-navy">
                  {initials(m.name)}
                </span>
              )}
            </div>
            <div className="min-w-0 text-center sm:text-left sm:justify-self-stretch">
              <p className="text-xs font-semibold uppercase tracking-wide text-msv-blue">{m.role}</p>
              <h3 className="mt-1 text-base font-bold text-msv-navy">{m.name}</h3>
              <a
                href={`mailto:${m.email}`}
                className="mt-1 inline-block break-all text-sm font-medium text-slate-600 underline-offset-2 hover:text-msv-blue hover:underline"
              >
                {m.email}
              </a>
            </div>
            <p className="text-sm leading-relaxed text-slate-600 sm:col-span-2">{summaryText}</p>
          </li>
        );
      })}
    </ul>
  );
}
