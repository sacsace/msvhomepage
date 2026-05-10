import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { StandardPageBody } from "@/components/layout/StandardPageBody";
import { SectionTitle } from "@/components/SectionTitle";
import { LeadershipGrid } from "@/components/team/LeadershipGrid";
import { getRequestLocale } from "@/lib/get-request-locale";
import { getCachedLeadershipForPublic } from "@/lib/public-page-data-cache";
import { staticPageSeo } from "@/lib/seo-metadata";
import type { SiteLocale } from "@/lib/site-locale";
import { withLocalePrefix } from "@/lib/site-locale";
import { clientSectors, company } from "@/lib/site-content";

export const metadata: Metadata = staticPageSeo("/team", {
  title: "리더십",
  description: `${company.shortName} 리더십·조직 소개`,
});

export const revalidate = 60;

const cardSection = "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8";

const bodyText = "text-sm leading-relaxed text-slate-600 break-keep";

function footerNavCopy(locale: SiteLocale) {
  if (locale === "ko") {
    return {
      lead: "팀원 소개·회사 소개·문의 페이지로 이동할 수 있습니다.",
      team: "팀원 소개",
      about: "회사 소개",
      contact: "문의하기",
    };
  }
  if (locale === "zh") {
    return {
      lead: "可前往团队成员介绍、公司简介或联系页面。",
      team: "团队成员",
      about: "公司简介",
      contact: "联系",
    };
  }
  return {
    lead: "Continue to the team page, company information, or contact.",
    team: "Team",
    about: "About",
    contact: "Contact",
  };
}

export default async function TeamPage() {
  const locale = await getRequestLocale();
  const L = (path: string) => withLocalePrefix(path, locale);
  const footerNav = footerNavCopy(locale);
  const leadership = await getCachedLeadershipForPublic();

  return (
    <>
      <PageHeader
        title="리더십"
        description="각 분야 전문가가 한 팀으로 외주 없이 직접 실행합니다."
        descriptionWide
      />
      <StandardPageBody className="space-y-12 sm:space-y-14">
        <section className={cardSection}>
          <LeadershipGrid members={leadership} locale={locale} />
        </section>

        <section className={cardSection}>
          <SectionTitle
            eyebrow="Sectors"
            title="고객 산업"
            spacing="tight"
            density="compact"
            contentWidth="full"
          />
          <p className={`mt-4 ${bodyText}`}>프로필 기준 분야입니다.</p>
          <ul className="mt-4 list-inside list-disc space-y-2 text-sm leading-relaxed text-slate-600">
            {clientSectors.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
          <p className="mt-4 text-xs leading-relaxed text-slate-500">
            전체는{" "}
            <Link
              href={company.brochurePath}
              className="font-medium text-msv-navy underline-offset-2 transition hover:text-msv-blue hover:underline"
            >
              회사 프로필 PDF
            </Link>
            를 참고해 주세요.
          </p>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-msv-blue-soft/15 p-6 sm:p-8">
          <p className={bodyText}>{footerNav.lead}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={L("/about/team")}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-msv-navy transition hover:border-msv-blue/35 hover:text-msv-blue"
            >
              {footerNav.team}
            </Link>
            <Link
              href={L("/about")}
              className="rounded-lg border border-msv-navy/40 bg-white px-4 py-2 text-sm font-semibold text-msv-navy transition hover:bg-msv-navy/5"
            >
              {footerNav.about}
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
