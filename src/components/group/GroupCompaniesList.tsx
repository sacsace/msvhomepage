import Image from "next/image";
import Link from "next/link";
import { homeTypo } from "@/lib/home-typography";
import { groupCompanyContentCopy, isGroupCompanySlug } from "@/lib/i18n/group-pages-locale";
import type { SiteLocale } from "@/lib/site-locale";
import { withLocalePrefix } from "@/lib/site-locale";
import { groupCompanies } from "@/lib/site-content";

const LOGO_SLOT = "relative h-12 w-56 max-w-full shrink-0";

type Props = {
  locale: SiteLocale;
};

function viewLabel(locale: SiteLocale) {
  if (locale === "en") return "View profile →";
  if (locale === "zh") return "查看详情 →";
  return "소개 보기 →";
}

export function GroupCompaniesList({ locale }: Props) {
  const L = (path: string) => withLocalePrefix(path, locale);

  return (
    <ul className="mt-10 grid list-none grid-cols-1 gap-0 border-t border-msv-ink/15 p-0 lg:grid-cols-2">
      {groupCompanies.map((g, i) => {
        const card = isGroupCompanySlug(g.slug) ? groupCompanyContentCopy(g.slug, locale) : null;
        const role = card?.role ?? g.role;
        const highlights = card?.highlights ?? g.highlights;
        const logoAlt = card?.logoAlt ?? `${g.menuLabel} 로고`;
        const n = String(i + 1).padStart(2, "0");
        const href = L(`/group/${g.slug}`);

        return (
          <li
            key={g.slug}
            className={`min-h-0 border-b border-msv-ink/10 ${
              i % 2 === 0 ? "lg:border-r lg:border-msv-ink/10" : ""
            }`}
          >
            <Link
              href={href}
              className="group flex h-full flex-col px-0 py-10 transition hover:bg-[#f7f7f7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-msv-ink focus-visible:ring-offset-2 lg:px-8"
            >
              <span className="font-sans text-4xl font-bold tabular-nums leading-none tracking-[-0.06em] text-msv-ink/15">
                {n}
              </span>

              {g.logoSrc ? (
                <div className={`${LOGO_SLOT} mt-6`}>
                  <Image
                    src={g.logoSrc}
                    alt={logoAlt}
                    fill
                    className="object-contain object-left"
                    sizes="224px"
                  />
                </div>
              ) : null}

              <h3 className={`mt-5 ${homeTypo.itemTitle}`}>{g.menuLabel}</h3>
              {g.legalName !== g.menuLabel ? (
                <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{g.legalName}</p>
              ) : null}

              <p className="mt-4 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-msv-mint">
                {role}
              </p>

              <ul className="mt-6 flex-1 list-none border-t border-msv-ink/10 p-0">
                {highlights.slice(0, 3).map((h) => (
                  <li
                    key={h}
                    className="border-b border-msv-ink/10 py-3 text-sm leading-relaxed text-slate-600 last:border-b-0"
                  >
                    {h}
                  </li>
                ))}
              </ul>

              <span className={`mt-6 inline-flex ${homeTypo.linkCta}`}>{viewLabel(locale)}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
