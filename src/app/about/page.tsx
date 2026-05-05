import type { Metadata } from "next";
import Link from "next/link";
import { CompanyCredentialSection } from "@/components/about/CompanyCredentialSection";
import { CompanyHistory } from "@/components/about/CompanyHistory";
import { MilestoneRail } from "@/components/about/MilestoneRail";
import { StrengthsInfographic } from "@/components/about/StrengthsInfographic";
import { PageHeader } from "@/components/layout/PageHeader";
import { StandardPageBody } from "@/components/layout/StandardPageBody";
import { SectionTitle } from "@/components/SectionTitle";
import { getRequestLocale } from "@/lib/get-request-locale";
import {
  aboutPageCopy,
  milestonesEn,
  milestonesZh,
  overviewEn,
  overviewZh,
  visionEn,
  visionZh,
} from "@/lib/i18n/about-locale";
import { strengthsEn, strengthsZh } from "@/lib/i18n/public-home";
import { getCachedCompanyHistoryPublic } from "@/lib/public-page-data-cache";
import { staticPageSeo, staticPageSeoLocalized } from "@/lib/seo-metadata";
import type { SiteLocale } from "@/lib/site-locale";
import { withLocalePrefix } from "@/lib/site-locale";
import { businessUnits, company, overview, strengths, vision } from "@/lib/site-content";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const copy = aboutPageCopy(locale);
  if (copy) {
    return staticPageSeoLocalized("/about", { title: copy.metaTitle, description: copy.metaDescription }, locale);
  }
  return staticPageSeo("/about", {
    title: "회사 소개",
    description: `${company.legalName}(${company.shortName}) 인도 법인 설립·회계·세무·운영 지원 및 비전·사업 소개`,
  });
}

export const revalidate = 60;

/** 법인 설립 서비스 등 표준 서비스 페이지와 동일한 카드·본문 타이포 */
const cardSection = "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8";

const bodyText = "text-sm leading-relaxed text-slate-600 break-keep";

const pillarShell = "rounded-xl border border-slate-200 bg-slate-50/50 p-5 sm:p-6";

const divisionShell = "flex h-full flex-col rounded-xl border border-slate-200 bg-slate-50/40 p-5 sm:p-6";

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
  const companyHistoryEntries = await getCachedCompanyHistoryPublic();
  const copy = aboutPageCopy(locale);
  const L = (path: string) => withLocalePrefix(path, locale);

  const overviewBlock = locale === "ko" ? overview : locale === "en" ? overviewEn : overviewZh;
  const visionBlock = locale === "ko" ? vision : locale === "en" ? visionEn : visionZh;
  const strengthItems = locale === "ko" ? strengths : locale === "en" ? strengthsEn : strengthsZh;
  const milestoneItems = locale === "ko" ? undefined : locale === "en" ? milestonesEn : milestonesZh;
  const units = localizeBusinessUnits(locale);

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
          `${company.legalName}(${company.shortName}) 인도 법인 설립·회계·세무·운영까지, 현장에서 직접 실행하는 원스톱 비즈니스 파트너입니다.`
        }
        descriptionWide
      />

      <StandardPageBody className="space-y-12 sm:space-y-14">
        <section className={cardSection}>
          <SectionTitle
            eyebrow="About"
            title={overviewBlock.title}
            spacing="tight"
            density="compact"
            contentWidth="full"
          />
          <p className={`mt-4 max-w-none ${bodyText}`}>{overviewBlock.body}</p>
        </section>

        <section className={cardSection}>
          <SectionTitle
            eyebrow="Vision"
            title={locale === "en" ? "Vision" : locale === "zh" ? "愿景" : "비전"}
            subtitle={visionBlock.headline}
            spacing="tight"
            density="compact"
            contentWidth="full"
          />
          <p className={`mt-4 max-w-none ${bodyText}`}>{visionBlock.statement}</p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-3 sm:gap-5">
            {visionBlock.pillars.map((p, i) => (
              <li key={p.title} className={pillarShell}>
                <p className="text-xs font-medium tabular-nums tracking-[0.12em] text-slate-500">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 text-sm font-semibold text-msv-navy sm:text-base">{p.title}</h3>
                <p className={`mt-3 ${bodyText}`}>{p.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className={cardSection}>
          <SectionTitle
            eyebrow={copy?.historyEyebrow ?? "History"}
            title={copy?.historyTitle ?? "연혁"}
            subtitle={
              copy?.historySubtitle ??
              "아래 일정은 관리자 「회사 연혁」에 저장된 내용을 그대로 보여 줍니다. 세부 표기는 대외 공식 자료에 맞춰 갱신할 수 있습니다."
            }
            spacing="tight"
            density="compact"
            contentWidth="full"
          />
          <div className="mt-4">
            <CompanyHistory entries={companyHistoryEntries} emptyMessage={copy?.historyEmpty} />
          </div>
        </section>

        <section className={cardSection}>
          <SectionTitle
            eyebrow={copy?.milestonesEyebrow ?? "Milestones"}
            title={copy?.milestonesTitle ?? "마일스톤"}
            subtitle={
              copy?.milestonesSubtitle ??
              "주요 성장 단계입니다. 연·월 등 구체 일정은 대외 공식 자료에 맞춰 site-content에서 업데이트할 수 있습니다."
            }
            spacing="tight"
            density="compact"
            contentWidth="full"
          />
          <div className="mt-4">
            <MilestoneRail items={milestoneItems} />
          </div>
        </section>

        <section className={cardSection}>
          <SectionTitle
            eyebrow={copy?.divisionsEyebrow ?? "Divisions"}
            title={copy?.divisionsTitle ?? "사업부"}
            subtitle={copy?.divisionsSubtitle ?? `${company.shortName}가 직접 운영하는 주요 사업 영역입니다.`}
            spacing="tight"
            density="compact"
            contentWidth="full"
          />
          <ul className="mt-6 grid gap-4 sm:grid-cols-3 sm:gap-5">
            {units.map((u) => (
              <li key={u.abbr} className={divisionShell}>
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-500">{u.abbr}</p>
                <h3 className="mt-3 text-sm font-semibold text-msv-navy sm:text-base">{u.title}</h3>
                <p className={`mt-3 flex-1 ${bodyText}`}>{u.subtitle}</p>
                {u.href.startsWith("http") ? (
                  <a
                    href={u.href}
                    className="mt-4 inline-flex text-sm font-semibold text-msv-navy underline-offset-4 transition hover:text-msv-blue hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {copy?.websiteCta ?? "웹사이트 →"}
                  </a>
                ) : (
                  <Link
                    href={L(u.href)}
                    className="mt-4 inline-flex text-sm font-semibold text-msv-navy underline-offset-4 transition hover:text-msv-blue hover:underline"
                  >
                    {copy?.servicesCta ?? "서비스 상세 →"}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </section>

        <StrengthsInfographic items={strengthItems} sectionTitle={copy?.strengthsTitle} />

        <CompanyCredentialSection title={copy?.credentialTitle} subtitle={copy?.credentialSubtitle} />

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
