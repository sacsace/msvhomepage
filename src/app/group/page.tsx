import type { Metadata } from "next";
import Link from "next/link";
import { GroupCompaniesList } from "@/components/group/GroupCompaniesList";
import { PageHeader } from "@/components/layout/PageHeader";
import { company } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "함께하는 회사",
};

export default function GroupPage() {
  return (
    <div>
      <PageHeader
        title="함께하는 회사"
        description={`${company.shortName}와 함께 인도 현지에서 역량을 보완하는 계열·관련 법인 및 브랜드입니다.`}
      />
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-14">
        <GroupCompaniesList />
        <p className="mt-10 text-center text-sm text-slate-600 sm:text-left">
          <Link href="/about" className="font-semibold text-msv-blue underline-offset-2 hover:underline">
            회사 소개 전체 보기
          </Link>
        </p>
      </div>
    </div>
  );
}
