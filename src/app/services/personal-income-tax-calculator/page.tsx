import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { StandardPageBody } from "@/components/layout/StandardPageBody";
import { PersonalIncomeTaxCalculator } from "@/components/services/PersonalIncomeTaxCalculator";
import { staticPageSeo } from "@/lib/seo-metadata";
import { company } from "@/lib/site-content";

export const metadata: Metadata = staticPageSeo("/services/personal-income-tax-calculator", {
  title: "개인 소득세 계산기",
  description: `${company.shortName} — 인도 급여자 TDS 계산(누진·서차지·교육 cess) 참고 계산`,
});

export default function PersonalIncomeTaxCalculatorPage() {
  return (
    <>
      <PageHeader
        title="개인 소득세 계산기"
        description="세전 월급에 12개월을 곱한 연간 총소득으로 표준공제(₹75,000)를 반영해, 급여 TDS 계산 표와 같은 구조로 누진 소득세·서차지·교육 cess를 계산합니다. 법 개정·공제·87A 등으로 실제 부담과 다를 수 있습니다."
        descriptionWide
      />
      <StandardPageBody>
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-lg font-bold text-msv-navy">참고 계산</h2>
          <div className="mt-4">
            <PersonalIncomeTaxCalculator />
          </div>
          <p className="mt-8 border-t border-slate-100 pt-6 text-sm leading-relaxed text-slate-600">
            본 도구는 참고용이며 법적·세무 자문을 대체하지 않습니다. 신규 과세체계(Section 115BAC)와 차이가 있을 수
            있으니, 정확한 금액은 MSV와 상담 바랍니다.
          </p>
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
