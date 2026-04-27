import type { Metadata } from "next";
import Link from "next/link";
import { staticPageSeo } from "@/lib/seo-metadata";
import { LeadershipGreetingCard } from "@/components/about/LeadershipGreetingCard";
import { MilestoneRail } from "@/components/about/MilestoneRail";
import { StrengthsInfographic } from "@/components/about/StrengthsInfographic";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionTitle } from "@/components/SectionTitle";
import { getLeadershipForPublic } from "@/lib/leadership-resolve";
import { splitIntroParagraphs } from "@/lib/split-intro-paragraphs";
import {
  businessUnits,
  caKashulStatementFull,
  ceoStatementFull,
  company,
  leadership as leadershipDefaults,
  overview,
  strengths,
  vision,
  vpHaStatementFull,
} from "@/lib/site-content";

export const metadata: Metadata = staticPageSeo("/about", {
  title: "회사 소개",
  description: `${company.legalName}(${company.shortName}) 인도 법인 설립·회계·세무·운영 지원 및 비전·리더십 소개`,
});

export const dynamic = "force-dynamic";

const pillarAccent = ["border-msv-navy", "border-msv-teal", "border-msv-mocha"] as const;

/** 회사 소개 상단(헤더 리드·개요) — 본문 섹션보다 한 단계 작은 크기·촘촘한 줄간격 */
const introProse =
  "max-w-none text-sm leading-snug text-pretty text-slate-600 break-keep sm:text-[15px] sm:leading-[1.55]";

function memberByEmail<T extends { email: string }>(list: readonly T[], email: string): T | undefined {
  const key = email.toLowerCase();
  return list.find((m) => m.email.toLowerCase() === key);
}

function resolveGreetingBody(
  member: { email: string; summary: string } | undefined,
  fallback: string,
): string {
  if (!member) return fallback;
  const base = memberByEmail(leadershipDefaults, member.email)?.summary ?? "";
  const hasCustom = member.summary.trim().length > 0 && member.summary !== base;
  return hasCustom ? member.summary : fallback;
}

export default async function AboutPage() {
  const leadership = await getLeadershipForPublic();
  const ceo = memberByEmail(leadership, "lee@msventures.in");
  const vpHa = memberByEmail(leadership, "heon@msventures.in");
  const caIn = memberByEmail(leadership, "ca@msventures.in");

  return (
    <div>
      <PageHeader
        title="회사 소개"
        description={`${company.legalName}(${company.shortName}) 인도 법인 설립·회계·세무·운영까지, 현장에서 직접 실행하는 원스톱 비즈니스 파트너입니다.`}
        descriptionWide
        belowDescription={
          <>
            <h2 className="sr-only">{overview.title}</h2>
            <div className="space-y-3 sm:space-y-3.5">
              {splitIntroParagraphs(overview.body).map((para, i) => (
                <p key={`overview-${i}`} className={introProse}>
                  {para}
                </p>
              ))}
            </div>
          </>
        }
      />

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
        <section className="mt-14 sm:mt-16">
          <SectionTitle
            eyebrow="Messages"
            title="인사말"
            subtitle="대표·부대표·인도 CA가 한 팀으로 회계·세무와 고객 커뮤니케이션을 맡습니다."
            contentWidth="full"
          />
          <div className="space-y-8">
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
          </div>
        </section>

        <section className="mt-14 sm:mt-16">
          <SectionTitle
            eyebrow="Vision"
            title="비전"
            subtitle={vision.headline}
            spacing="tight"
            density="compact"
            contentWidth="full"
          />
          <p className="mb-8 max-w-none text-sm leading-relaxed text-pretty text-slate-600 break-keep sm:text-base sm:leading-snug">
            {vision.statement}
          </p>
          <ul className="grid gap-5 sm:grid-cols-3">
            {vision.pillars.map((p, i) => (
              <li
                key={p.title}
                className={`msv-card rounded-xl border-t-4 ${pillarAccent[i % pillarAccent.length]} p-6 shadow-sm`}
              >
                <h3 className="text-sm font-bold text-msv-navy">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{p.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14 sm:mt-16">
          <SectionTitle
            eyebrow="Milestones"
            title="마일스톤"
            subtitle="주요 성장 단계입니다. 연·월 등 구체 일정은 대외 공식 자료에 맞춰 site-content에서 업데이트할 수 있습니다."
            contentWidth="full"
          />
          <MilestoneRail />
        </section>

        <section className="mt-14 sm:mt-16">
          <SectionTitle
            eyebrow="Divisions"
            title="사업부"
            subtitle={`${company.shortName}가 직접 운영하는 주요 사업 영역입니다.`}
            contentWidth="full"
          />
          <ul className="grid gap-5 sm:grid-cols-3">
            {businessUnits.map((u) => (
              <li key={u.abbr} className="msv-card rounded-xl p-6 shadow-sm transition-shadow hover:shadow-md">
                <p className="font-mono text-2xl font-bold text-msv-blue/40">{u.abbr}</p>
                <h3 className="mt-2 text-sm font-bold text-msv-navy">{u.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{u.subtitle}</p>
                {u.href.startsWith("http") ? (
                  <a
                    href={u.href}
                    className="mt-4 inline-block text-sm font-semibold text-msv-blue underline-offset-2 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    웹사이트 →
                  </a>
                ) : (
                  <Link
                    href={u.href}
                    className="mt-4 inline-block text-sm font-semibold text-msv-blue underline-offset-2 hover:underline"
                  >
                    서비스 상세 →
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </section>

        <StrengthsInfographic items={strengths} />
      </div>
    </div>
  );
}
