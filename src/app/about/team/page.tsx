import type { Metadata } from "next";
import Link from "next/link";
import { LeadershipGreetingCard } from "@/components/about/LeadershipGreetingCard";
import { PageHeader } from "@/components/layout/PageHeader";
import { StandardPageBody } from "@/components/layout/StandardPageBody";
import { SectionTitle } from "@/components/SectionTitle";
import { StaffProfileGrid } from "@/components/team/StaffProfileGrid";
import { getRequestLocale } from "@/lib/get-request-locale";
import { compareGreetingExtra, memberByEmail, resolveGreetingBody } from "@/lib/about-greeting-utils";
import { getCachedLeadershipForPublic, getCachedStaffProfiles } from "@/lib/public-page-data-cache";
import { staticPageSeo } from "@/lib/seo-metadata";
import type { SiteLocale } from "@/lib/site-locale";
import { withLocalePrefix } from "@/lib/site-locale";
import {
  caKashulStatementFull,
  ceoStatementFull,
  company,
  teamGreetingLead,
  teamIntro,
  vpHaStatementFull,
} from "@/lib/site-content";

export const metadata: Metadata = staticPageSeo("/about/team", {
  title: "팀원 소개",
  description: `${company.legalName}(${company.shortName}) 리더십 인사말·팀 구성원 소개`,
});

export const revalidate = 60;

/** 법인 설립 서비스 등 표준 서비스 페이지와 동일한 카드·본문 타이포 */
const cardSection = "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8";

const bodyText = "text-sm leading-relaxed text-slate-600 break-keep";

function footerNavCopy(locale: SiteLocale) {
  if (locale === "ko") {
    return {
      lead: "회사 소개·리더십·문의 페이지로 이동할 수 있습니다.",
      about: "회사 소개",
      leadership: "리더십",
      contact: "문의하기",
    };
  }
  if (locale === "zh") {
    return {
      lead: "可前往公司简介、领导层或联系页面。",
      about: "公司简介",
      leadership: "领导层",
      contact: "联系",
    };
  }
  return {
    lead: "Continue to company information, leadership, or contact.",
    about: "About",
    leadership: "Leadership",
    contact: "Contact",
  };
}

export default async function AboutTeamPage() {
  const locale = await getRequestLocale();
  const L = (path: string) => withLocalePrefix(path, locale);
  const footerNav = footerNavCopy(locale);

  const [leadership, staffProfiles] = await Promise.all([
    getCachedLeadershipForPublic(),
    getCachedStaffProfiles(),
  ]);
  const leadershipEmails = new Set(leadership.map((m) => m.email.toLowerCase()));
  const staffForIntro = staffProfiles
    .filter((p) => !p.email?.trim() || !leadershipEmails.has(p.email.trim().toLowerCase()))
    .sort((a, b) => a.name.localeCompare(b.name, "ko"));
  const ceo = memberByEmail(leadership, "lee@msventures.in");
  const vpHa = memberByEmail(leadership, "heon@msventures.in");
  const caIn = memberByEmail(leadership, "ca@msventures.in");
  const greetingExtras = leadership.filter((m) => m.source === "extra").sort(compareGreetingExtra);

  return (
    <>
      <PageHeader
        title="팀원 소개"
        description={`${company.shortName} 리더십의 인사말과, 현장에서 함께하는 구성원을 소개합니다.`}
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
          <span className="font-medium text-slate-700">팀원 소개</span>
        </p>

        <section className={cardSection}>
          <SectionTitle
            eyebrow="Messages"
            title="인사말"
            spacing="tight"
            density="compact"
            subtitle={<p className={`m-0 ${bodyText}`}>{teamGreetingLead}</p>}
            contentWidth="full"
          />
          <div className="mt-6 space-y-6 sm:space-y-8">
            {ceo ? (
              <LeadershipGreetingCard
                member={ceo}
                eyebrow="CEO Statement"
                title={`대표이사 · ${ceo.name}`}
                body={resolveGreetingBody(ceo, ceoStatementFull)}
              />
            ) : null}
            {vpHa ? (
              <LeadershipGreetingCard
                member={vpHa}
                eyebrow="Vice President"
                title="하헌범 부대표"
                titleSubline="소개"
                body={resolveGreetingBody(vpHa, vpHaStatementFull)}
              />
            ) : null}
            {caIn ? (
              <LeadershipGreetingCard
                member={caIn}
                eyebrow="India CA"
                title="카슐 샤르마"
                titleSubline="소개"
                body={resolveGreetingBody(caIn, caKashulStatementFull)}
              />
            ) : null}
            {greetingExtras.map((m) => (
              <LeadershipGreetingCard
                key={m.email}
                member={m}
                eyebrow="Leadership"
                title={m.name}
                titleSubline="소개"
                body={resolveGreetingBody(m, "")}
              />
            ))}
          </div>
        </section>

        <section className={cardSection}>
          <SectionTitle
            eyebrow="Team"
            title="팀원 소개"
            spacing="tight"
            density="compact"
            subtitle={<p className={`m-0 ${bodyText}`}>{teamIntro.body}</p>}
            contentWidth="full"
          />
          {staffForIntro.length > 0 ? (
            <div className="mt-6">
              <StaffProfileGrid profiles={staffForIntro} />
            </div>
          ) : (
            <p className="mt-6 text-sm leading-relaxed text-slate-500">
              등록된 일반 직원 프로필이 없습니다. 준비되는 대로 이 영역에 업데이트됩니다.
            </p>
          )}
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
              href={L("/team")}
              className="rounded-lg border border-msv-navy/40 bg-white px-4 py-2 text-sm font-semibold text-msv-navy transition hover:bg-msv-navy/5"
            >
              {footerNav.leadership}
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
