import type { Metadata } from "next";
import Link from "next/link";
import { ClientsListView } from "@/components/clients/ClientsListView";
import { PageHeader } from "@/components/layout/PageHeader";
import { StandardPageBody } from "@/components/layout/StandardPageBody";
import { SectionTitle } from "@/components/SectionTitle";
import { getRequestLocale } from "@/lib/get-request-locale";
import { clientsPageCopy } from "@/lib/i18n/clients-locale";
import { sortClientsPublic } from "@/lib/clients-store";
import { getCachedClients } from "@/lib/public-page-data-cache";
import { staticPageSeoLocalized } from "@/lib/seo-metadata";
import type { SiteLocale } from "@/lib/site-locale";
import { withLocalePrefix } from "@/lib/site-locale";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const copy = clientsPageCopy(locale);
  return staticPageSeoLocalized(
    "/about/clients",
    { title: copy.metaTitle, description: copy.metaDescription },
    locale,
  );
}

export const revalidate = 60;

const cardSection = "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8";

const bodyText = "text-sm leading-relaxed text-slate-600 break-keep";

function footerNavCopy(locale: SiteLocale) {
  if (locale === "ko") {
    return {
      lead: "회사 소개·팀 소개·서비스·문의 페이지로 이동할 수 있습니다.",
      about: "회사 소개",
      team: "팀 소개",
      services: "서비스",
      contact: "문의하기",
    };
  }
  if (locale === "zh") {
    return {
      lead: "可前往公司简介、团队介绍、服务或联系页面。",
      about: "公司简介",
      team: "团队介绍",
      services: "服务",
      contact: "联系",
    };
  }
  return {
    lead: "Continue to company information, the team page, services, or contact.",
    about: "About",
    team: "Team",
    services: "Services",
    contact: "Contact",
  };
}

export default async function AboutClientsPage() {
  const locale = await getRequestLocale();
  const L = (path: string) => withLocalePrefix(path, locale);
  const footerNav = footerNavCopy(locale);
  const copy = clientsPageCopy(locale);
  const list = sortClientsPublic(await getCachedClients());

  const listLabels = {
    emptyListMessage: copy.emptyListMessage,
    logoAltSuffix: copy.clientLogoAltSuffix,
    noLogoPlaceholder: copy.noLogoPlaceholder,
    websiteLinkLabel: copy.websiteLinkLabel,
  };

  return (
    <>
      <PageHeader title={copy.pageTitle} description={copy.pageDescription} descriptionWide />

      <StandardPageBody className="space-y-12 sm:space-y-14">
        <p className="text-sm text-slate-600">
          <Link
            href={L("/about")}
            className="font-semibold text-msv-navy underline-offset-2 transition hover:text-msv-blue hover:underline"
          >
            {copy.breadcrumbAbout}
          </Link>
          <span aria-hidden className="mx-1.5 text-slate-300">
            ·
          </span>
          <span className="font-medium text-slate-700">{copy.breadcrumbCurrent}</span>
        </p>

        <section className={cardSection}>
          <SectionTitle
            eyebrow={copy.directoryEyebrow}
            title={copy.directoryTitle}
            spacing="tight"
            density="compact"
            subtitle={<p className={`m-0 ${bodyText}`}>{copy.directorySubtitle}</p>}
            contentWidth="full"
          />
          <ClientsListView list={list} labels={listLabels} />
        </section>

        <section className="rounded-2xl border border-slate-200 bg-msv-blue-soft/15 p-6 sm:p-8">
          <p className={bodyText}>{footerNav.lead}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={L("/about")}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-msv-navy transition hover:border-msv-blue/35 hover:text-msv-blue"
            >
              {footerNav.about}
            </Link>
            <Link
              href={L("/about/team")}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-msv-navy transition hover:border-msv-blue/35 hover:text-msv-blue"
            >
              {footerNav.team}
            </Link>
            <Link
              href={L("/services")}
              className="rounded-lg border border-msv-navy/40 bg-white px-4 py-2 text-sm font-semibold text-msv-navy transition hover:bg-msv-navy/5"
            >
              {footerNav.services}
            </Link>
            <Link
              href={L("/contact")}
              className="rounded-lg bg-msv-navy px-4 py-2 text-sm font-semibold text-white transition hover:bg-msv-navy/90"
            >
              {footerNav.contact}
            </Link>
          </div>
        </section>
      </StandardPageBody>
    </>
  );
}
