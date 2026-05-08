import Image from "next/image";
import Link from "next/link";
import { groupCompanyContentCopy, isGroupCompanySlug } from "@/lib/i18n/group-pages-locale";
import type { SiteLocale } from "@/lib/site-locale";
import { withLocalePrefix } from "@/lib/site-locale";
import { groupCompanies } from "@/lib/site-content";

const tileClass =
  "flex flex-col rounded-xl border border-slate-200 bg-slate-50/40 p-5 shadow-sm transition hover:border-msv-blue/30 hover:shadow-md sm:p-6";

/** 모든 카드에서 로고(또는 자리 표시) 영역을 동일 픽셀 박스로 맞춤 — `object-contain`으로 비율 유지 */
const LOGO_SLOT = "relative mb-3 h-12 w-60 max-w-full shrink-0";

type Props = {
  locale: SiteLocale;
};

export function GroupCompaniesList({ locale }: Props) {
  const L = (path: string) => withLocalePrefix(path, locale);

  return (
    <ul className="grid list-none gap-4 p-0 sm:grid-cols-2 sm:gap-5">
      {groupCompanies.map((g) => {
        const card = isGroupCompanySlug(g.slug) ? groupCompanyContentCopy(g.slug, locale) : null;
        const role = card?.role ?? g.role;
        const highlights = card?.highlights ?? g.highlights;
        const logoAlt = card?.logoAlt ?? `${g.menuLabel} 로고`;
        return (
          <li key={g.slug} className={tileClass}>
            <Link
              href={L(`/group/${g.slug}`)}
              className="group block underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-msv-blue focus-visible:ring-offset-2"
            >
              {g.logoSrc ? (
                <div className={LOGO_SLOT}>
                  <Image
                    src={g.logoSrc}
                    alt={logoAlt}
                    fill
                    className="object-contain object-left"
                    sizes="240px"
                  />
                </div>
              ) : (
                <div className={`${LOGO_SLOT} flex items-center`} aria-hidden>
                  <span className="h-10 w-1.5 shrink-0 rounded-full bg-white shadow-sm ring-1 ring-slate-200/70" />
                </div>
              )}
              <span className="block text-base font-semibold text-msv-navy group-hover:text-msv-blue group-hover:underline sm:text-lg">
                {g.menuLabel}
              </span>
              {g.legalName !== g.menuLabel ? (
                <span className="mt-1 block text-sm leading-relaxed text-slate-600">{g.legalName}</span>
              ) : null}
            </Link>
            <p className="mt-3 text-sm font-semibold text-msv-navy">{role}</p>
            <ul className="mt-3 list-inside list-disc space-y-1.5 text-sm leading-relaxed text-slate-600">
              {highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </li>
        );
      })}
    </ul>
  );
}
