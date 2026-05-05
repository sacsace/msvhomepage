import type { Metadata } from "next";
import Link from "next/link";
import { ClientsListView } from "@/components/clients/ClientsListView";
import { PageHeader } from "@/components/layout/PageHeader";
import { StandardPageBody } from "@/components/layout/StandardPageBody";
import { SectionTitle } from "@/components/SectionTitle";
import { getRequestLocale } from "@/lib/get-request-locale";
import { sortClientsPublic } from "@/lib/clients-store";
import { getCachedClients } from "@/lib/public-page-data-cache";
import { staticPageSeo } from "@/lib/seo-metadata";
import type { SiteLocale } from "@/lib/site-locale";
import { withLocalePrefix } from "@/lib/site-locale";
import { company } from "@/lib/site-content";

const clientsPageDescription =
  "MSV와 함께 성장해온 주요 고객사를 소개합니다. 인도 진출부터 운영, 회계·세무, 컴플라이언스까지 신뢰를 바탕으로 협력하는 파트너십을 안내합니다.";

export const metadata: Metadata = staticPageSeo("/about/clients", {
  title: "고객사",
  description: `${company.shortName} 고객사 — ${clientsPageDescription}`,
});

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
  const list = sortClientsPublic(await getCachedClients());

  return (
    <>
      <PageHeader
        title="고객사"
        description={`MSV와 함께 성장해온 주요 고객사를 소개합니다.
인도 진출부터 운영, 회계·세무, 컴플라이언스까지 다양한 분야에서 신뢰를 바탕으로 협력하고 있습니다.`}
        descriptionWide
      />
      <StandardPageBody className="space-y-12 sm:space-y-14">
        <p className="text-sm text-slate-600">
          <Link
            href={L("/about")}
            className="font-semibold text-msv-navy underline-offset-2 transition hover:text-msv-blue hover:underline"
          >
            회사 소개
          </Link>
          <span aria-hidden className="mx-1.5 text-slate-300">
            ·
          </span>
          <span className="font-medium text-slate-700">고객사</span>
        </p>

        <section className={cardSection}>
          <SectionTitle
            eyebrow="Directory"
            title="등록 고객사"
            spacing="tight"
            density="compact"
            subtitle={
              <p className={`m-0 ${bodyText}`}>
                메인 화면에는 최대 12곳만 노출되며, 여기서는 등록된 항목을 모두 확인할 수 있습니다.
              </p>
            }
            contentWidth="full"
          />
          <ClientsListView list={list} />
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
