import type { Metadata } from "next";
import Link from "next/link";
import { SectionTitle } from "@/components/SectionTitle";
import { LeadershipGrid } from "@/components/team/LeadershipGrid";
import { getLeadershipForPublic } from "@/lib/leadership-resolve";
import { clientSectors, company } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "리더십",
};

export const dynamic = "force-dynamic";

export default async function TeamPage() {
  const leadership = await getLeadershipForPublic();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <SectionTitle
        headingLevel={1}
        eyebrow="Leadership"
        title="리더십"
        subtitle="각 분야 전문가가 한 팀으로 외주 없이 직접 실행합니다."
      />
      <div className="mt-6">
        <LeadershipGrid members={leadership} />
      </div>

      <div className="mt-12 border border-slate-200 p-6">
        <h2 className="text-sm font-medium text-slate-900">고객 산업 (예시)</h2>
        <p className="mt-2 text-sm text-slate-600">
          프로필 기준 분야 예시입니다.
        </p>
        <ul className="mt-4 list-inside list-disc text-sm text-slate-600">
          {clientSectors.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-slate-500">
          전체는{" "}
          <Link href={company.brochurePath} className="text-slate-900 underline-offset-2 hover:underline">
            회사 프로필 PDF
          </Link>
          를 참고해 주세요.
        </p>
      </div>
    </div>
  );
}
