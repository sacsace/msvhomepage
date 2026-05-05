import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { StandardPageBody } from "@/components/layout/StandardPageBody";
import { PersonalIncomeTaxCalculator } from "@/components/services/PersonalIncomeTaxCalculator";
import { staticPageSeo } from "@/lib/seo-metadata";
import { company } from "@/lib/site-content";

export const metadata: Metadata = staticPageSeo("/services/personal-income-tax-calculator", {
  title: "개인 소득세 계산기",
  description: `${company.shortName} — 인도 급여자 TDS 워킹(누진·서차지·교육 cess) 참고 계산`,
});

export default function PersonalIncomeTaxCalculatorPage() {
  return (
    <div>
      <PageHeader
        title="개인 소득세 계산기"
        description="세전 월급에 12개월을 곱한 연간 총소득으로 표준공제(₹75,000)를 반영해, 급여 TDS 워킹 표와 같은 구조로 누진 소득세·서차지·교육 cess를 계산합니다. 법 개정·공제·87A 등으로 실제 부담과 다를 수 있습니다."
        descriptionWide
      />
      <StandardPageBody>
        <p className="mb-8 text-sm text-slate-600">
          <Link href="/services" className="font-semibold text-msv-blue underline-offset-2 hover:underline">
            회계 서비스
          </Link>
          로 돌아가기
        </p>
        <PersonalIncomeTaxCalculator />
        <p className="mx-auto mt-8 max-w-5xl text-xs leading-relaxed text-slate-500">
          본 도구는 참고용이며, 법적·세무 자문을 대체하지 않습니다.
          <br />
          <span className="mt-1.5 inline-block">
            신규 과세체계(Section 115BAC)와 차이가 있을 수 있으니, 정확한 금액은 MSV와 상담 바랍니다.
          </span>
        </p>
      </StandardPageBody>
    </div>
  );
}
