import Link from "next/link";
import { SectionTitle } from "@/components/SectionTitle";
import { readClientsForHome } from "@/lib/clients-store";
import { homeTypo } from "@/lib/home-typography";
import type { SiteLocale } from "@/lib/site-locale";
import { pickLocale, withLocalePrefix } from "@/lib/site-locale";
import { clientsShowcaseLead } from "@/lib/site-content";

type Props = {
  /** 해외 투자·송금 스포트라이트 섹션 안에 붙일 때(같은 배경) */
  variant?: "default" | "embedded";
  locale?: SiteLocale;
};

const clientsLeadEn =
  "We support 80+ companies with India market entry through operations, accounting, tax and compliance, with a service churn rate of 7% or below—reflecting stable, long-term partnerships.";

const clientsLeadZh =
  "我们通过运营、会计、税务与合规支持 80 余家客户进入印度市场，服务流失率控制在 7% 及以下，体现稳定、长期的合作关系。";

/** 법인 설립·고객사 페이지 등과 동일한 카드·본문 타이포 */
const cardSection = "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8";

const bodyText = "text-sm leading-relaxed text-slate-600 break-keep";

const logoTile =
  "flex h-[6.5rem] w-full flex-col items-stretch justify-between gap-1.5 rounded-xl border border-slate-200 bg-white px-2 py-2 text-center shadow-sm transition hover:border-msv-blue/30 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-msv-blue sm:h-28 sm:px-2.5 sm:py-2.5";

export async function ClientsSection(props: Props = {}) {
  const variant = props.variant ?? "default";
  const locale = props.locale ?? "ko";
  const list = await readClientsForHome();
  if (list.length === 0) return null;

  const lead = pickLocale(locale, { ko: clientsShowcaseLead, en: clientsLeadEn, zh: clientsLeadZh });
  const title = pickLocale(locale, { ko: "고객사", en: "Clients", zh: "客户" });
  const eyebrow = pickLocale(locale, { ko: "Clients", en: "Clients", zh: "客户" });
  const more = pickLocale(locale, { ko: "더보기", en: "See more", zh: "查看更多" });
  const logoAlt = (name: string) =>
    pickLocale(locale, { ko: `${name} 로고`, en: `${name} logo`, zh: `${name} 标志` });
  const L = (path: string) => withLocalePrefix(path, locale);

  const inner = (
    <div className={cardSection}>
      <SectionTitle
        id="home-clients-heading"
        eyebrow={eyebrow}
        title={title}
        subtitle={<p className={`m-0 max-w-none text-pretty ${bodyText}`}>{lead}</p>}
        spacing="tight"
        density="compact"
        contentWidth="full"
      />
      <ul className="mt-6 grid w-full list-none grid-cols-2 gap-3 p-0 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-6 lg:gap-5">
        {list.map((c) => (
          <li key={c.id}>
            <Link href={L(`/about/clients#c-${c.id}`)} title={c.name} className={logoTile}>
              <div className="flex h-10 shrink-0 items-center justify-center rounded-lg bg-slate-50 sm:h-11">
                {c.logoSrc ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={c.logoSrc}
                    alt={logoAlt(c.name)}
                    className="max-h-8 max-w-full object-contain sm:max-h-9"
                  />
                ) : (
                  <span className="text-[10px] font-medium text-slate-300" aria-hidden>
                    ·
                  </span>
                )}
              </div>
              <p className="line-clamp-2 min-h-0 w-full flex-1 text-xs font-medium leading-snug text-slate-800 sm:text-sm sm:leading-snug">
                {c.name}
              </p>
            </Link>
          </li>
        ))}
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
