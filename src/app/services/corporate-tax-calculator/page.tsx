import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { StandardPageBody } from "@/components/layout/StandardPageBody";
import { staticPageSeo } from "@/lib/seo-metadata";
import { company } from "@/lib/site-content";

export const metadata: Metadata = staticPageSeo("/services/corporate-tax-calculator", {
  title: "법인세 계산기",
  description: `${company.shortName} — 인도 법인소득세(법인세) 참고·산출 도구`,
});

export default function CorporateTaxCalculatorPage() {
  return (
    <div>
      <PageHeader
        title="법인세 계산기"
        description="인도 국내 법인의 과세소득·세율(22%·15% 신규 제조 등)·MMTR·서차지·cess 구조는 회계연도·법 개정·특례에 따라 달라집니다. 대화형 계산 UI는 준비 중이며, 실제 신고·납부·TP·국제조세 이슈는 상담을 통해 맞춤 검토가 필요합니다."
        descriptionWide
      />
      <StandardPageBody>
        <p className="mb-8 text-sm text-slate-600">
          <Link href="/services" className="font-semibold text-msv-blue underline-offset-2 hover:underline">
            회계 서비스
          </Link>
          로 돌아가기
        </p>
        <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-6 sm:p-8">
          <p className="text-sm leading-relaxed text-slate-700 sm:text-[15px] sm:leading-relaxed">
            법인세 산출 로직·입력 폼은 곧 이 페이지에 연결할 예정입니다. 지금은 급여 TDS 등{" "}
            <Link href="/services/personal-income-tax-calculator" className="font-semibold text-msv-blue underline-offset-2 hover:underline">
              개인 소득세 계산기
            </Link>
            를 참고하시거나,{" "}
            <Link href="/contact" className="font-semibold text-msv-blue underline-offset-2 hover:underline">
              문의
            </Link>
            로 연락 주시면 담당자가 안내합니다.
          </p>
        </div>
        <p className="mx-auto mt-8 max-w-5xl text-xs leading-relaxed text-slate-500">
          본 페이지 및 향후 도구는 참고용이며, 법적·세무 자문을 대체하지 않습니다.
        </p>
      </StandardPageBody>
    </div>
  );
}
