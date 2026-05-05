import type { Metadata } from "next";
import Link from "next/link";
import { GroupCompaniesList } from "@/components/group/GroupCompaniesList";
import { PageHeader } from "@/components/layout/PageHeader";
import { StandardPageBody } from "@/components/layout/StandardPageBody";
import { SectionTitle } from "@/components/SectionTitle";
import { getRequestLocale } from "@/lib/get-request-locale";
import { staticPageSeo } from "@/lib/seo-metadata";
import { withLocalePrefix } from "@/lib/site-locale";
import { company } from "@/lib/site-content";

export const metadata: Metadata = staticPageSeo("/group", {
  title: "그룹사",
  description: `${company.shortName} 인도 현지 그룹사 법인·브랜드`,
});

const cardSection = "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8";

const bodyText = "text-sm leading-relaxed text-slate-600 break-keep";

export default async function GroupPage() {
  const locale = await getRequestLocale();
  const L = (path: string) => withLocalePrefix(path, locale);

  return (
    <>
      <PageHeader
        title="그룹사"
        description={`${company.shortName}가 인도 현지에서 역량을 보완하는 그룹사 법인·브랜드입니다.`}
        descriptionWide
      />
      <StandardPageBody className="space-y-12 sm:space-y-14">
        <section className={cardSection}>
          <SectionTitle
            eyebrow="Partners"
            title="브랜드 · 법인"
            subtitle="카드를 선택하면 상세 소개·웹사이트·소개 자료를 확인할 수 있습니다."
            spacing="tight"
            density="compact"
            contentWidth="full"
          />
          <div className="mt-6">
            <GroupCompaniesList locale={locale} />
          </div>
        </section>

        <section className={cardSection}>
          <SectionTitle
            eyebrow="Company"
            title="MSV 소개"
            spacing="tight"
            density="compact"
            headingLevel={3}
            contentWidth="full"
          />
          <p className={`mt-4 max-w-3xl ${bodyText}`}>
            <Link
              href={L("/about")}
              className="font-semibold text-msv-navy underline-offset-2 transition hover:text-msv-blue hover:underline"
            >
              회사 소개 전체 보기
            </Link>
            에서 비전·연혁·사업부를 함께 확인하실 수 있습니다.
          </p>
        </section>
      </StandardPageBody>
    </>
  );
}
