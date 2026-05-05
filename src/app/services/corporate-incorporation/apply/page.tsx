import type { Metadata } from "next";
import Link from "next/link";
import { CorporateIncorporationApplyForm } from "@/components/corporate-incorporation/CorporateIncorporationApplyForm";
import { PageHeader } from "@/components/layout/PageHeader";
import { StandardPageBody } from "@/components/layout/StandardPageBody";
import { staticPageSeo } from "@/lib/seo-metadata";
import { company } from "@/lib/site-content";

export const metadata: Metadata = staticPageSeo("/services/corporate-incorporation/apply", {
  title: "법인 설립 신청",
  description: `${company.shortName} 인도 법인 설립 신청서 제출 — 법인명·주소·자본금·이사·주주 정보`,
});

export default function CorporateIncorporationApplyPage() {
  return (
    <>
      <PageHeader
        title="법인 설립 신청"
        description="아래 양식을 작성해 제출해 주시면, 등록된 수신 메일로 신청 내용이 전달됩니다. 첨부 파일이 많을 경우 나누어 보내거나 문의로 안내를 요청해 주세요."
        descriptionWide
      />
      <StandardPageBody>
        <p className="text-sm text-slate-600">
          <Link
            href="/services/corporate-incorporation"
            className="font-semibold text-msv-blue underline-offset-2 hover:underline"
          >
            법인 설립 서비스 안내
          </Link>
          <span aria-hidden className="mx-1.5 text-slate-300">
            ·
          </span>
          <Link href="/services" className="font-medium text-slate-500 underline-offset-2 hover:text-msv-navy hover:underline">
            서비스 목록
          </Link>
        </p>
        <div className="mt-8">
          <CorporateIncorporationApplyForm />
        </div>
      </StandardPageBody>
    </>
  );
}
