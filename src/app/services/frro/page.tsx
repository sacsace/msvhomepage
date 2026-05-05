import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { StandardPageBody } from "@/components/layout/StandardPageBody";
import { staticPageSeo } from "@/lib/seo-metadata";
import { company } from "@/lib/site-content";

export const metadata: Metadata = staticPageSeo("/services/frro", {
  title: "FRRO 서비스",
  description: `${company.shortName} 인도 FRRO(지역 외국인 등록) 관련 등록·연장·변경 신고 실무 지원`,
});

const items = [
  "초기 등록(C Registration) 및 연장(E Registration) 절차 안내·서류 정리",
  "체류지·여권·비자 정보 변경 시 FRRO 온라인/방문 신고 지원",
  "출국 의무(Exit permit) 등 요건이 붙는 경우 사전 점검 및 일정 조율",
  "고용주·주재원 담당자와의 커뮤니케이션(한국어·영어) 및 방문 동행(필요 시 협의)",
] as const;

export default function FrroServicePage() {
  return (
    <>
      <PageHeader
        title="FRRO 서비스"
        description="인도 체류 외국인의 지역 외국인 등록(FRRO) 관련 절차를 현지 규정에 맞춰 정리하고, 신고·연장·변경 업무를 실무 중심으로 지원합니다."
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
          <p className="mt-6 text-xs leading-relaxed text-slate-500">
            FRRO는 주(邦)·지역별로 운영 방식과 온라인 포털이 다를 수 있으며, 비자 종류·체류 목적에 따라 요구 서류가 달라집니다. 최종 판단은 담당 FRRO 및 이민 당국 기준이 우선합니다.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/services"
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-msv-navy transition hover:border-msv-blue/35 hover:text-msv-blue"
            >
              서비스로 돌아가기
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
