import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { StandardPageBody } from "@/components/layout/StandardPageBody";
import { staticPageSeo } from "@/lib/seo-metadata";

export const metadata: Metadata = staticPageSeo("/services/recruitment-support", {
  title: "채용지원 서비스",
  description: "현지 인력 채용부터 온보딩까지 채용 실무를 지원합니다.",
});

const items = [
  "직무 정의·채용 공고 작성 및 채널 운영",
  "이력서 선별, 인터뷰 일정 조율, 후보자 커뮤니케이션",
  "오퍼·입사 서류 및 초기 온보딩 프로세스 지원",
] as const;

export default function RecruitmentSupportServicePage() {
  return (
    <>
      <PageHeader
        title="채용지원 서비스"
        description="인도 현지 채용 프로세스를 실무 중심으로 지원해 채용 리드타임을 줄입니다."
        descriptionWide
      />
      <StandardPageBody>
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-lg font-bold text-msv-navy">지원 범위</h2>
          <ul className="mt-4 space-y-2 text-sm leading-relaxed text-slate-600">
            {items.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/services"
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-msv-navy transition hover:border-msv-blue/35 hover:text-msv-blue"
            >
              회계 서비스로 돌아가기
            </Link>
            <Link
              href="/contact"
              className="rounded-lg bg-msv-navy px-4 py-2 text-sm font-semibold text-white transition hover:bg-msv-navy/90"
            >
              문의하기
            </Link>
          </div>
        </section>
      </StandardPageBody>
    </>
  );
}
