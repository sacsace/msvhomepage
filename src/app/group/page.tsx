import type { Metadata } from "next";
import Link from "next/link";
import { staticPageSeo } from "@/lib/seo-metadata";
import { GroupCompaniesList } from "@/components/group/GroupCompaniesList";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionTitle } from "@/components/SectionTitle";
import { company } from "@/lib/site-content";

export const metadata: Metadata = staticPageSeo("/group", {
  title: "함께하는 회사",
  description: `${company.shortName} 계열·관련 법인 및 브랜드`,
});

export default function GroupPage() {
  return (
    <div>
      <PageHeader
        title="함께하는 회사"
        description={`${company.shortName}와 함께 인도 현지에서 역량을 보완하는 계열·관련 법인 및 브랜드입니다.`}
      />
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
        <section>
          <SectionTitle
            eyebrow="Partners"
            title="브랜드 · 법인"
            subtitle="카드를 선택하면 상세 소개·웹사이트·소개 자료를 확인할 수 있습니다."
            spacing="tight"
            density="compact"
          />
          <div className="mt-8 sm:mt-10">
            <GroupCompaniesList />
          </div>
        </section>

        <section className="mt-14 border-t border-slate-200 pt-12 sm:mt-16 sm:pt-14">
          <SectionTitle
            eyebrow="Company"
            title="MSV 소개"
            spacing="tight"
            density="compact"
            headingLevel={3}
          />
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600">
            <Link href="/about" className="font-semibold text-msv-blue underline-offset-2 hover:underline">
              회사 소개 전체 보기
            </Link>
            에서 비전·연혁·사업부를 함께 확인하실 수 있습니다.
          </p>
        </section>
      </div>
    </div>
  );
}
