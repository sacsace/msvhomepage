import type { Metadata } from "next";
import Link from "next/link";
import { LeadershipGreetingCard } from "@/components/about/LeadershipGreetingCard";
import { PageHeader } from "@/components/layout/PageHeader";
import { StandardPageBody } from "@/components/layout/StandardPageBody";
import { SectionTitle } from "@/components/SectionTitle";
import { StaffProfileGrid } from "@/components/team/StaffProfileGrid";
import { compareGreetingExtra, memberByEmail } from "@/lib/about-greeting-utils";
import { getRequestLocale } from "@/lib/get-request-locale";
import {
  aboutTeamPageCopy,
  leadershipGreetingBodyForLocale,
  staffNameSortLocale,
} from "@/lib/i18n/team-locale";
import { getCachedLeadershipForPublic, getCachedStaffProfiles } from "@/lib/public-page-data-cache";
import { staticPageSeoLocalized } from "@/lib/seo-metadata";
import type { SiteLocale } from "@/lib/site-locale";
import { withLocalePrefix } from "@/lib/site-locale";
import {
  caKashulStatementFull,
  ceoStatementFull,
  vpHaStatementFull,
} from "@/lib/site-content";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const copy = aboutTeamPageCopy(locale);
  return staticPageSeoLocalized("/about/team", { title: copy.metaTitle, description: copy.metaDescription }, locale);
}

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
  const copy = aboutTeamPageCopy(locale);
  const sortLoc = staffNameSortLocale(locale);

  const [leadership, staffProfiles] = await Promise.all([
    getCachedLeadershipForPublic(),
    getCachedStaffProfiles(),
  ]);
  const leadershipEmails = new Set(leadership.map((m) => m.email.toLowerCase()));
  const staffForIntro = staffProfiles
    .filter((p) => !p.email?.trim() || !leadershipEmails.has(p.email.trim().toLowerCase()))
    .sort((a, b) => {
      const da = a.role.trim();
      const db = b.role.trim();
      if (!da && !db) return a.name.localeCompare(b.name, sortLoc);
      if (!da) return 1;
      if (!db) return -1;
      const deptCmp = da.localeCompare(db, sortLoc, { sensitivity: "base" });
      if (deptCmp !== 0) return deptCmp;
      return a.name.localeCompare(b.name, sortLoc);
    });
  const ceo = memberByEmail(leadership, "lee@msventures.in");
  const vpHa = memberByEmail(leadership, "heon@msventures.in");
  const caIn = memberByEmail(leadership, "ca@msventures.in");
  const greetingExtras = leadership.filter((m) => m.source === "extra").sort(compareGreetingExtra);

  const photoAlt = (name: string) => `${name} ${copy.profilePhotoAltSuffix}`;

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
            eyebrow={copy.messagesEyebrow}
            title={copy.messagesTitle}
            spacing="tight"
            density="compact"
            subtitle={<p className={`m-0 ${bodyText}`}>{copy.teamGreetingLead}</p>}
            contentWidth="full"
          />
          <div className="mt-6 space-y-6 sm:space-y-8">
            {ceo ? (
              <LeadershipGreetingCard
                member={ceo}
                eyebrow={copy.ceoEyebrow}
                title={copy.ceoTitle(ceo.name)}
                body={leadershipGreetingBodyForLocale(ceo, ceoStatementFull, locale)}
                photoAlt={photoAlt(ceo.name)}
              />
            ) : null}
            {vpHa ? (
              <LeadershipGreetingCard
                member={vpHa}
                eyebrow={copy.vpEyebrow}
                title={copy.vpTitle(vpHa.name)}
                titleSubline={copy.titleSublineIntro}
                body={leadershipGreetingBodyForLocale(vpHa, vpHaStatementFull, locale)}
                photoAlt={photoAlt(vpHa.name)}
              />
            ) : null}
            {caIn ? (
              <LeadershipGreetingCard
                member={caIn}
                eyebrow={copy.caEyebrow}
                title={copy.caTitle(caIn.name)}
                titleSubline={copy.titleSublineIntro}
                body={leadershipGreetingBodyForLocale(caIn, caKashulStatementFull, locale)}
                photoAlt={photoAlt(caIn.name)}
              />
            ) : null}
            {greetingExtras.map((m) => (
              <LeadershipGreetingCard
                key={m.email}
                member={m}
                eyebrow={copy.leadershipExtraEyebrow}
                title={m.name}
                titleSubline={copy.titleSublineIntro}
                body={leadershipGreetingBodyForLocale(m, "", locale)}
                photoAlt={photoAlt(m.name)}
              />
            ))}
          </div>
        </section>

        <section className={cardSection}>
          <SectionTitle
            eyebrow={copy.teamSectionEyebrow}
            title={copy.teamSectionTitle}
            spacing="tight"
            density="compact"
            subtitle={<p className={`m-0 ${bodyText}`}>{copy.teamIntroBody}</p>}
            contentWidth="full"
          />
          {staffForIntro.length > 0 ? (
            <div className="mt-6">
              <StaffProfileGrid profiles={staffForIntro} profilePhotoAltSuffix={copy.profilePhotoAltSuffix} />
            </div>
          ) : (
            <p className="mt-6 text-sm leading-relaxed text-slate-500">{copy.emptyStaffMessage}</p>
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
