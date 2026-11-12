import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { CompanyCredentialSection } from "@/components/about/CompanyCredentialSection";
import { CompanyHistory } from "@/components/about/CompanyHistory";
import { MilestoneRail } from "@/components/about/MilestoneRail";
import { StrengthsInfographic } from "@/components/about/StrengthsInfographic";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionTitle } from "@/components/SectionTitle";
import { getRequestLocale } from "@/lib/get-request-locale";
import { publicPageBodyShell } from "@/lib/public-page-styles";
import {
  aboutOverviewDotsCopy,
  aboutOverviewDotsImageAlt,
  aboutPageCopy,
  milestonesEn,
  milestonesZh,
  overviewEn,
  overviewZh,
  visionEn,
  visionZh,
} from "@/lib/i18n/about-locale";
import { strengthsEn, strengthsZh } from "@/lib/i18n/public-home";
import { readCompanyHistoryPublic } from "@/lib/company-history-store";
import { staticPageSeoLocalized } from "@/lib/seo-metadata";
import type { SiteLocale } from "@/lib/site-locale";
import { pickLocale, withLocalePrefix } from "@/lib/site-locale";
import { businessUnits, company, overview, strengths, vision } from "@/lib/site-content";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const copy = aboutPageCopy(locale);
  const title =
    copy?.metaTitle ??
    pickLocale(locale, { ko: "회사 소개", en: "About", zh: "关于我们" });
  const description =
    copy?.metaDescription ??
    pickLocale(locale, {
      ko: `${company.shortName} — 법인 설립·회계·세무·운영까지 인도 현지 실무를 직접 지원하는 파트너, 비전·사업 소개`,
      en: `${company.legalName} (${company.shortName}) — India incorporation, accounting, tax, operations and vision.`,
      zh: `${company.legalName}（${company.shortName}）— 印度公司设立、会计、税务与运营一站式伙伴。`,
    });
  return staticPageSeoLocalized("/about", { title, description }, locale);
}

export const revalidate = 60;

const bodyText = "text-sm font-normal leading-[1.8] text-slate-600 break-keep sm:text-[15px]";

function MagazineSection({
  index,
  label,
  children,
  tone = "white",
}: {
  index: string;
  label: string;
  children: ReactNode;
  tone?: "white" | "paper";
}) {
  return (
    <section
      className={`relative border-t border-msv-ink/10 ${tone === "paper" ? "bg-[#f5f5f5]" : "bg-white"}`}
    >
      <div className="pointer-events-none absolute left-0 top-8 hidden select-none font-sans text-[5.5rem] font-bold leading-none tracking-[-0.08em] text-msv-ink/[0.05] lg:block">
        {index}
      </div>
      <div className="relative py-14 sm:py-16 lg:pl-24">
        <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
          {index} — {label}
        </p>
        <div className="mt-6">{children}</div>
      </div>
    </section>
  );
}

function localizeBusinessUnits(locale: SiteLocale) {
  if (locale === "ko") return [...businessUnits];
  if (locale === "zh") {
    return businessUnits.map((u) =>
      u.abbr === "MSV"
        ? {
            ...u,
            title: "企业咨询与会计",
            subtitle: "商业咨询、会计与税务、公司设立、人力与许可",
          }
        : u,
    );
  }
  return businessUnits.map((u) =>
    u.abbr === "MSV"
      ? {
          ...u,
          title: "Corporate consulting & accounting",
          subtitle: "Business consulting, accounting & tax, incorporation, HR & licensing",
        }
      : u,
  );
}

export default async function AboutPage() {
  const locale = await getRequestLocale();
  const companyHistoryEntries = await readCompanyHistoryPublic();
  const copy = aboutPageCopy(locale);
  const L = (path: string) => withLocalePrefix(path, locale);

  const overviewBlock = locale === "ko" ? overview : locale === "en" ? overviewEn : overviewZh;
  const visionBlock = locale === "ko" ? vision : locale === "en" ? visionEn : visionZh;
  const strengthItems = locale === "ko" ? strengths : locale === "en" ? strengthsEn : strengthsZh;
  const milestoneItems = locale === "ko" ? undefined : locale === "en" ? milestonesEn : milestonesZh;
  const units = localizeBusinessUnits(locale);
  const dotsCopy = aboutOverviewDotsCopy(locale);

  const footerNav =
    locale === "ko"
      ? {
          lead: "팀 소개·서비스·문의 페이지로 이동할 수 있습니다.",
          team: "팀 소개",
          services: "서비스",
          contact: "문의하기",
        }
      : locale === "zh"
        ? {
            lead: "可前往团队介绍、服务或联系页面。",
            team: "团队介绍",
            services: "服务",
            contact: "联系",
          }
        : {
            lead: "Continue to the team page, services, or contact us.",
            team: "Team",
            services: "Services",
            contact: "Contact",
          };

  return (
    <>
      <PageHeader
        title={copy?.pageTitle ?? "회사 소개"}
        description={
          copy?.pageDescription ??
          "법인 설립·회계·세무·운영까지,\n현장에서 직접 실행하는 원스톱 비즈니스 파트너입니다."
        }
        descriptionWide
        pattern="paper"
      />

      <div className="bg-[#fafafa]">
        <div className={`mx-auto min-w-0 max-w-6xl space-y-0 ${publicPageBodyShell}`}>
          <MagazineSection index="01" label="About">
            <SectionTitle
              eyebrow="About"
              title={overviewBlock.title}
              spacing="tight"
              density="compact"
              contentWidth="full"
              visualWeight="editorial"
            />
            <div className={`mt-6 max-w-3xl space-y-5 ${bodyText}`}>
              {overviewBlock.paragraphs.map((para, i) => (
                <p key={i} className="m-0">
                  {para}
                </p>
              ))}
            </div>

            <div className="mt-12 grid gap-10 border-t border-msv-ink/10 pt-10 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-3">
                <Image
                  src="/about/msv-dots-mark.png"
                  alt={aboutOverviewDotsImageAlt(locale)}
                  width={128}
                  height={77}
                  className="w-28 max-w-full object-contain object-left"
                  style={{ height: "auto" }}
                  sizes="112px"
                />
              </div>
              <div className="max-w-none space-y-4 lg:col-span-9">
                <h3 className="whitespace-pre-line font-sans text-xl font-semibold tracking-[-0.025em] text-msv-ink sm:text-2xl">
                  {dotsCopy.title}
                </h3>
                <p className={`m-0 ${bodyText}`}>{dotsCopy.intro}</p>
                <ul className={`m-0 space-y-3 border-l border-msv-ink/15 pl-5 ${bodyText}`}>
                  {dotsCopy.values.map((item) => (
                    <li key={item} className="relative list-none pl-0">
                      <span className="absolute -left-[1.4rem] top-2 h-1.5 w-1.5 rounded-full bg-msv-mint" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className={`m-0 ${bodyText}`}>{dotsCopy.narrative}</p>
              </div>
            </div>
          </MagazineSection>

          <MagazineSection index="02" label="Vision" tone="paper">
            <SectionTitle
              eyebrow="Vision"
              title={locale === "en" ? "Vision" : locale === "zh" ? "愿景" : "비전"}
              subtitle={visionBlock.headline}
              spacing="tight"
              density="compact"
              contentWidth="full"
              visualWeight="editorial"
            />
            <p className={`mt-6 max-w-3xl ${bodyText}`}>{visionBlock.statement}</p>
            <ul className="mt-10 grid list-none grid-cols-1 gap-0 border-t border-msv-ink/15 p-0 sm:grid-cols-3">
              {visionBlock.pillars.map((p, i) => (
                <li
                  key={p.title}
                  className={`border-b border-msv-ink/15 py-8 sm:px-6 ${i < 2 ? "sm:border-r" : ""}`}
                >
                  <p className="font-sans text-4xl font-bold tabular-nums leading-none tracking-[-0.06em] text-msv-ink/10">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-5 font-sans text-base font-semibold tracking-[-0.02em] text-msv-ink">
                    {p.title}
                  </h3>
                  <p className={`mt-3 ${bodyText}`}>{p.text}</p>
                </li>
              ))}
            </ul>
          </MagazineSection>

          <MagazineSection index="03" label="History">
            <SectionTitle
              eyebrow={copy?.historyEyebrow ?? "History"}
              title={copy?.historyTitle ?? "연혁"}
              subtitle={
                copy?.historySubtitle ?? "MSV의 주요 설립 및 성장 이력입니다."
              }
              spacing="tight"
              density="compact"
              contentWidth="full"
              visualWeight="editorial"
            />
            <div className="mt-8 border-t border-msv-ink/10 pt-6">
              <CompanyHistory entries={companyHistoryEntries} emptyMessage={copy?.historyEmpty} />
            </div>
          </MagazineSection>

          <MagazineSection index="04" label="Milestones" tone="paper">
            <SectionTitle
              eyebrow={copy?.milestonesEyebrow ?? "Milestones"}
              title={copy?.milestonesTitle ?? "마일스톤"}
              subtitle={
                copy?.milestonesSubtitle ??
                "전문 조직과 서비스 영역을 확대하며 고객의 인도 사업을 지원해 왔습니다."
              }
              spacing="tight"
              density="compact"
              contentWidth="full"
              visualWeight="editorial"
            />
            <div className="mt-8">
              <MilestoneRail items={milestoneItems} />
            </div>
          </MagazineSection>

          <MagazineSection index="05" label="Divisions">
            <SectionTitle
              eyebrow={copy?.divisionsEyebrow ?? "Divisions"}
              title={copy?.divisionsTitle ?? "사업부"}
              subtitle={copy?.divisionsSubtitle ?? `${company.shortName}가 직접 운영하는 주요 사업 영역입니다.`}
              spacing="tight"
              density="compact"
              contentWidth="full"
              visualWeight="editorial"
            />
            <ul className="mt-10 grid list-none grid-cols-1 gap-0 border-t border-msv-ink/15 p-0 sm:grid-cols-3">
              {units.map((u, i) => (
                <li
                  key={u.abbr}
                  className={`flex flex-col border-b border-msv-ink/15 py-8 sm:px-6 ${i < 2 ? "sm:border-r" : ""}`}
                >
                  <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                    {u.abbr}
                  </p>
                  <h3 className="mt-4 font-sans text-lg font-semibold tracking-[-0.02em] text-msv-ink">
                    {u.title}
                  </h3>
                  <p className={`mt-3 flex-1 ${bodyText}`}>{u.subtitle}</p>
                  {u.href.startsWith("http") ? (
                    <a
                      href={u.href}
                      className="mt-6 inline-flex text-xs font-semibold tracking-[0.08em] text-msv-ink underline decoration-msv-mint underline-offset-8"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {copy?.websiteCta ?? "웹사이트 →"}
                    </a>
                  ) : (
                    <Link
                      href={L(u.href)}
                      className="mt-6 inline-flex text-xs font-semibold tracking-[0.08em] text-msv-ink underline decoration-msv-mint underline-offset-8"
                    >
                      {copy?.servicesCta ?? "서비스 상세 →"}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </MagazineSection>

          <MagazineSection index="06" label="Strengths" tone="paper">
            <StrengthsInfographic items={strengthItems} sectionTitle={copy?.strengthsTitle} />
          </MagazineSection>

          <MagazineSection index="07" label="Credentials">
            <CompanyCredentialSection title={copy?.credentialTitle} subtitle={copy?.credentialSubtitle} />
          </MagazineSection>

          <section className="border-t border-msv-ink/10 bg-white py-14 sm:py-16">
            <div className="h-px w-14 bg-msv-mint" aria-hidden />
            <p className={`mt-6 max-w-2xl ${bodyText}`}>{footerNav.lead}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={L("/about/team")}
                className="inline-flex min-h-[2.75rem] items-center border border-msv-ink bg-msv-ink px-5 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-transparent hover:text-msv-ink"
              >
                {footerNav.team}
              </Link>
              <Link
                href={L("/about/ci")}
                className="inline-flex min-h-[2.75rem] items-center border border-msv-ink/30 px-5 text-xs font-semibold uppercase tracking-[0.16em] text-msv-ink transition hover:border-msv-ink"
              >
                {pickLocale(locale, { ko: "CI 소개", en: "Brand & CI", zh: "CI 介绍" })}
              </Link>
              <Link
                href={L("/services")}
                className="inline-flex min-h-[2.75rem] items-center border border-msv-ink/30 px-5 text-xs font-semibold uppercase tracking-[0.16em] text-msv-ink transition hover:border-msv-ink"
              >
                {footerNav.services}
              </Link>
              <Link
                href={L("/contact")}
                className="inline-flex min-h-[2.75rem] items-center border border-msv-ink/30 px-5 text-xs font-semibold uppercase tracking-[0.16em] text-msv-ink transition hover:border-msv-ink"
              >
                {footerNav.contact}
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
