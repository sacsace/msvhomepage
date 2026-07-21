import Image from "next/image";
import { publicFileExists } from "@/lib/public-file";
import type { LeadershipMember } from "@/types/leadership";

function initials(name: string): string {
  return name.replace(/\s+/g, "").slice(0, 2);
}

type Props = {
  member: LeadershipMember;
  eyebrow: string;
  title: string;
  /** 제목 바로 아래 (예: 하헌범 부대표 → 소개) */
  titleSubline?: string;
  /** 인사말 전문 또는 소개 문단(여러 줄 가능) */
  body: string;
  /** 본문 아래 경력·학력 등 목록 */
  bullets?: readonly string[];
  /** 프로필 이미지 대체 텍스트(미지정 시 한국어 기본) */
  photoAlt?: string;
};

export async function LeadershipGreetingCard({ member, eyebrow, title, titleSubline, body, bullets, photoAlt }: Props) {
  const showPhoto = Boolean(member.photoSrc && (await publicFileExists(member.photoSrc)));
  const imageAlt = photoAlt ?? `${member.name} 프로필 사진`;

  return (
    <article className="rounded-xl border border-slate-200 bg-slate-50/40 p-5 shadow-sm sm:p-6">
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:gap-8">
        <div className="relative h-36 w-36 shrink-0 overflow-hidden rounded-full border border-slate-200 bg-white ring-1 ring-slate-100 sm:h-40 sm:w-40">
          {showPhoto && member.photoSrc ? (
            <Image
              src={member.photoSrc}
              alt={imageAlt}
              fill
              className="object-contain object-top"
              sizes="160px"
              unoptimized
            />
          ) : (
            <span className="flex h-full w-full items-center justify-center text-lg font-bold tracking-tight text-msv-navy">
              {initials(member.name)}
            </span>
          )}
        </div>
        <div className="min-w-0 flex-1 text-center sm:text-left">
          <p className="msv-eyebrow">{eyebrow}</p>
          <h3 className="mt-2 text-base font-bold text-msv-navy sm:text-lg">{title}</h3>
          {titleSubline ? (
            <p className="mt-1.5 text-sm font-semibold text-msv-navy">{titleSubline}</p>
          ) : null}
          <p className={`text-sm text-slate-500 ${titleSubline ? "mt-3" : "mt-1"}`}>
            <span className="font-medium text-slate-600">{member.role}</span>
            <span className="mx-2 text-slate-300" aria-hidden>
              ·
            </span>
            <a
              href={`mailto:${member.email}`}
              className="font-medium text-msv-blue underline-offset-2 hover:underline"
            >
              {member.email}
            </a>
          </p>
          <div className="mt-6 space-y-4 whitespace-pre-line text-sm leading-relaxed text-slate-600">{body}</div>
          {bullets?.length ? (
            <ul className="mt-6 list-none space-y-1 border-t border-slate-200 pt-6 text-sm leading-snug text-slate-600">
              {bullets.map((line) => (
                <li key={line} className="flex gap-2 sm:gap-2.5">
                  <span className="mt-px shrink-0 font-bold text-msv-blue" aria-hidden>
                    ·
                  </span>
                  <span className="min-w-0">{line}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </article>
  );
}
