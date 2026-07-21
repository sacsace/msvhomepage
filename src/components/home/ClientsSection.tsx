import Link from "next/link";
import { SectionTitle } from "@/components/SectionTitle";
import { readClientsForHome } from "@/lib/clients-store";
import { homeTypo } from "@/lib/home-typography";
import { clientsPageCopy } from "@/lib/i18n/clients-locale";
import { clientsShowcaseLeadEn, clientsShowcaseLeadZh } from "@/lib/i18n/public-home";
import { publicFileExists } from "@/lib/public-file";
import type { SiteLocale } from "@/lib/site-locale";
import { pickLocale, withLocalePrefix } from "@/lib/site-locale";
import { clientsShowcaseLead } from "@/lib/site-content";

type Props = {
  /** 해외 투자·송금 스포트라이트 섹션 안에 붙일 때(같은 배경) */
  variant?: "default" | "embedded";
  locale?: SiteLocale;
};

/** 법인 설립·고객사 페이지 등과 동일한 카드·본문 타이포 */
const cardSection = "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8";

const bodyText = "text-sm leading-relaxed text-slate-600 break-keep";

const logoTile =
  "group flex h-[5.75rem] w-full flex-col items-stretch justify-between gap-1 rounded-xl border border-slate-200 bg-white px-2 py-1.5 text-center shadow-sm transition duration-200 ease-out hover:-translate-y-0.5 hover:border-msv-navy/15 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-msv-blue sm:h-24 sm:px-2 sm:py-2";

export async function ClientsSection(props: Props = {}) {
  const variant = props.variant ?? "default";
  const locale = props.locale ?? "ko";
  const list = await readClientsForHome();
  if (list.length === 0) return null;

  const lead = pickLocale(locale, { ko: clientsShowcaseLead, en: clientsShowcaseLeadEn, zh: clientsShowcaseLeadZh });
  const title = pickLocale(locale, { ko: "고객사", en: "Clients", zh: "客户" });
  const eyebrow = pickLocale(locale, { ko: "Clients", en: "Clients", zh: "客户" });
  const more = pickLocale(locale, { ko: "더보기", en: "See more", zh: "查看更多" });
  const logoAlt = (name: string) =>
    pickLocale(locale, { ko: `${name} 로고`, en: `${name} logo`, zh: `${name} 标志` });
  const noLogoPlaceholder = clientsPageCopy(locale).noLogoPlaceholder;
  const L = (path: string) => withLocalePrefix(path, locale);

  const inner = (
    <div className={cardSection}>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-10">
        <div className="shrink-0 text-left">
          <p className="font-mono text-[2.25rem] font-semibold leading-none tracking-tight text-msv-navy sm:text-4xl">
            80+
          </p>
          <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
            {pickLocale(locale, { ko: "고객사", en: "CLIENTS", zh: "客户" })}
          </p>
        </div>
        <div className="min-w-0 flex-1">
          <SectionTitle
            id="home-clients-heading"
            eyebrow={eyebrow}
            title={title}
            subtitle={<p className={`m-0 max-w-none text-pretty ${bodyText}`}>{lead}</p>}
            spacing="tight"
            density="compact"
            contentWidth="full"
          />
        </div>
      </div>
      <ul className="mt-6 grid w-full list-none grid-cols-2 gap-2.5 p-0 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 lg:grid-cols-6 lg:gap-3.5">
        {list.map((c) => {
          const showLogo = Boolean(c.logoSrc && publicFileExists(c.logoSrc));
          return (
          <li key={c.id}>
            <Link href={L(`/about/clients#c-${c.id}`)} title={c.name} className={logoTile}>
              <div className="flex h-9 shrink-0 items-center justify-center rounded-lg bg-slate-50 px-0.5 sm:h-10">
                {showLogo && c.logoSrc ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={c.logoSrc}
                    alt={logoAlt(c.name)}
                    className="max-h-7 max-w-full object-contain opacity-95 transition-opacity duration-200 group-hover:opacity-100 sm:max-h-8"
                  />
                ) : (
                  <span className="text-[10px] font-medium leading-tight text-slate-400 sm:text-[11px]">
                    {noLogoPlaceholder}
                  </span>
                )}
              </div>
              <p className="line-clamp-2 min-h-0 w-full flex-1 text-[11px] font-medium leading-snug text-slate-800 sm:text-xs sm:leading-snug">
                {c.name}
              </p>
            </Link>
          </li>
          );
        })}
      </ul>
      <div className="mt-6">
        <Link
          href={L("/about/clients")}
          className="inline-flex rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-msv-navy transition hover:border-msv-blue/35 hover:text-msv-blue"
        >
          {more}
        </Link>
      </div>
    </div>
  );

  if (variant === "embedded") {
    return (
      <section className="pt-12 sm:pt-14" aria-labelledby="home-clients-heading">
        {inner}
      </section>
    );
  }

  return (
    <section className="bg-[#f5f6f8] py-16 sm:py-20" aria-labelledby="home-clients-heading">
      <div className={`mx-auto max-w-6xl ${homeTypo.pageInset}`}>{inner}</div>
    </section>
  );
}
