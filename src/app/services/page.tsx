import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { AccountingServicesInfographic } from "@/components/services/AccountingServicesInfographic";
import { ServiceCasesInfographic } from "@/components/services/ServiceCasesInfographic";
import { ServicesInfographic } from "@/components/services/ServicesInfographic";
import { accountingServiceBlocks, sampleProjects, services } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "서비스",
};

export default function ServicesPage() {
  return (
    <div>
      <PageHeader
        title="종합 비즈니스 서비스"
        description="법인 컨설팅·회계 사업부에서 제공하는 인도 현지 직접 실행형 서비스입니다."
      />
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <ServicesInfographic items={services} />
        <AccountingServicesInfographic blocks={accountingServiceBlocks} />
        <ServiceCasesInfographic items={sampleProjects} />
      </div>
    </div>
  );
}
