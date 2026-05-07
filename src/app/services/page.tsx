import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { StandardPageBody } from "@/components/layout/StandardPageBody";
import { getRequestLocale } from "@/lib/get-request-locale";
import { staticPageSeo } from "@/lib/seo-metadata";
import { withLocalePrefix } from "@/lib/site-locale";
import { AccountingServicesInfographic } from "@/components/services/AccountingServicesInfographic";
import { IndiaComplianceScheduleSection } from "@/components/services/IndiaComplianceScheduleSection";
import { ServiceCasesInfographic } from "@/components/services/ServiceCasesInfographic";
import { ServicesInfographic } from "@/components/services/ServicesInfographic";
import { accountingServiceBlocks, sampleProjects, services } from "@/lib/site-content";

export const metadata: Metadata = staticPageSeo("/services", {
  title: "서비스",
  description: "법인 컨설팅·회계·세무·컴플라이언스 등 인도 현지 직접 실행형 서비스 라인과 사례",
});

const accountingProcessSteps = [
  "고객사 계정과목 요청 및 계정과목 체계 확정",
  "확정된 계정과목 기준으로 거래 분류 후 기장 시작",
  "지출결의서 작성 및 증빙 검토",
  "내부 승인권자 승인 완료",
  "승인 완료 건을 회계 프로그램에 입력하고 증빙 매칭",
  "월/분기 마감 후 세금 신고(GST·TDS·Advance Tax 등) 진행",
] as const;

const accountingHighlights = [
  {
    title: "계정과목 체계 설계",
    description: "고객사 보고 포맷과 내부 정책을 반영해 계정과목 체계를 먼저 확정합니다.",
  },
  {
    title: "증빙·승인 기반 기장",
    description: "지출결의서와 승인 흐름을 기준으로 증빙을 정리하고 회계 프로그램에 정확히 반영합니다.",
  },
  {
    title: "신고·보고 통합 운영",
    description: "월/분기 마감 후 GST·TDS·Advance Tax와 RBI 보고 항목까지 연동해 관리합니다.",
  },
] as const;

export default async function ServicesPage() {
  const locale = await getRequestLocale();
  const L = (path: string) => withLocalePrefix(path, locale);
  return (
    <div>
      <PageHeader
        title="회계 서비스"
        description="법인 컨설팅·회계 사업부에서 제공하는 인도 현지 직접 실행형 서비스입니다."
        descriptionWide
      />
      <StandardPageBody padding="spacious">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7">
          <h2 className="text-xl font-bold text-msv-navy">서비스 메뉴</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            필요한 서비스 유형을 선택해 상세 페이지에서 지원 범위를 확인하세요.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <Link
              href="/services/corporate-incorporation"
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-msv-navy transition hover:border-msv-blue/35 hover:text-msv-blue"
            >
              법인 설립 서비스
            </Link>
            <Link
              href="/services"
              className="rounded-xl border border-msv-blue/35 bg-msv-blue-soft/35 px-4 py-3 text-sm font-semibold text-msv-navy transition hover:border-msv-blue hover:bg-msv-blue-soft/55"
            >
              회계 서비스
            </Link>
            <Link
              href={L("/services/india-accounting-glossary")}
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-msv-navy transition hover:border-msv-blue/35 hover:text-msv-blue"
            >
              인도 회계 용어집
            </Link>
            <Link
              href="/services/license-registration"
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-msv-navy transition hover:border-msv-blue/35 hover:text-msv-blue"
            >
              라이센스 등록 서비스
            </Link>
            <Link
              href="/services/recruitment-support"
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-msv-navy transition hover:border-msv-blue/35 hover:text-msv-blue"
            >
              채용지원 서비스
            </Link>
            <Link
              href="/services/frro"
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-msv-navy transition hover:border-msv-blue/35 hover:text-msv-blue"
            >
              FRRO 서비스
            </Link>
            <Link
              href="/services/ecb"
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-msv-navy transition hover:border-msv-blue/35 hover:text-msv-blue"
            >
              ECB 안내
            </Link>
            <Link
              href="/services/form-41-registration"
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-msv-navy transition hover:border-msv-blue/35 hover:text-msv-blue"
            >
              Form 41(구 Form 10F) 등록 서비스
            </Link>
            <Link
              href="/services/personal-income-tax-calculator"
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-msv-navy transition hover:border-msv-blue/35 hover:text-msv-blue"
            >
              개인 소득세 계산기
            </Link>
            <Link
              href="/services/corporate-tax-calculator"
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-msv-navy transition hover:border-msv-blue/35 hover:text-msv-blue"
            >
              법인세 계산기
            </Link>
            <Link
              href="/services/professional-tax-calculator"
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-msv-navy transition hover:border-msv-blue/35 hover:text-msv-blue"
            >
              Professional Tax 계산기
            </Link>
          </div>
        </section>
        <ServicesInfographic items={services} />

        <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 sm:p-7">
          <h2 className="text-xl font-bold text-msv-navy">회계 서비스 상세 안내</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            정기 회계·세무 라인업에 실제 운영 프로세스와 주요 신고 항목을 함께 반영해 안내합니다.
          </p>

          <article className="mt-5 rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
            <div className="flex flex-wrap items-end justify-between gap-2">
              <h3 className="text-sm font-semibold text-msv-navy">회계 운영 프로세스 (고객사 협업형)</h3>
              <p className="text-xs text-slate-500">Account Mapping → Booking → Approval → Filing</p>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {accountingProcessSteps.map((step, index) => (
                <article key={step} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-msv-blue-soft px-2 text-[11px] font-bold text-msv-blue">
                    {index + 1}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">{step}</p>
                </article>
              ))}
            </div>
          </article>

          <div className="mt-4 grid gap-3 lg:grid-cols-3">
            {accountingHighlights.map((item) => (
              <article key={item.title} className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
                <h3 className="text-sm font-semibold text-msv-navy">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <IndiaComplianceScheduleSection />

        <AccountingServicesInfographic blocks={accountingServiceBlocks} />
        <ServiceCasesInfographic items={sampleProjects} />
      </StandardPageBody>
    </div>
  );
}
