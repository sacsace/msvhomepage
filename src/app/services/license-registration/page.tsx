import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { StandardPageBody } from "@/components/layout/StandardPageBody";
import { LicenseCardsWithModal } from "@/components/services/LicenseCardsWithModal";
import { staticPageSeo } from "@/lib/seo-metadata";

export const metadata: Metadata = staticPageSeo("/services/license-registration", {
  title: "라이센스 등록 서비스",
  description: "인도 현지 라이센스·인허가 등록 업무를 단계별로 지원합니다.",
});

const items = [
  "사업 유형별 필수 라이센스 식별 및 등록 로드맵 설계",
  "관할 기관 제출 서류 준비, 검토, 접수 대행",
  "갱신·변경·보완 요청 대응 및 일정 관리",
] as const;

const licenseCards = [
  {
    name: "BIS",
    subtitle: "Bureau of Indian Standards",
    description:
      "인도 표준 규격(BIS) 인증 대상 품목에 대해 적용 표준 확인, 신청 문서 준비, 인증 진행 대응을 지원합니다.",
    monochrome: true,
    comingSoon: true,
  },
  {
    name: "CDSCO",
    subtitle: "Central Drugs Standard Control Organisation",
    description:
      "의료기기·의약품 관련 CDSCO 등록/허가 요건 검토, 제출 문서 구성, 인허가 절차 대응을 지원합니다.",
    monochrome: true,
    comingSoon: true,
  },
  {
    name: "Capexile Certificate",
    description:
      "CAPEXIL 등록 인증 발급 절차를 진행해 해당 품목 수출 활동과 관련 신고를 지원합니다.",
  },
  {
    name: "CLRA",
    subtitle: "Contract Labour (Regulation and Abolition)",
    description:
      "계약직 근로자 고용 관련 등록·허가 절차를 지원하고, 관련 문서와 요건 충족을 점검합니다.",
  },
  {
    name: "Contractor License",
    subtitle: "Contract Labour Contractor License",
    description:
      "계약근로자 운영에 필요한 도급업체 라이센스 신청과 관련 컴플라이언스 요건 점검을 지원합니다.",
  },
  {
    name: "Digital Signature (DSC)",
    subtitle: "Digital Signature Certificate",
    description:
      "전자서명(DSC) 발급·갱신 절차와 포털 연동을 지원해 각종 온라인 신고/신청 업무를 준비합니다.",
  },
  {
    name: "EPCG",
    subtitle: "Export Promotion Capital Goods Scheme",
    description:
      "자본재 수입 관세 혜택을 위한 EPCG 신청, 의무 수출 조건 검토, 사후 관리 절차를 지원합니다.",
  },
  {
    name: "EPR Registration",
    subtitle: "Extended Producer Responsibility Registration",
    description:
      "품목별 EPR 등록 요건 검토부터 등록 신청, 이행 계획·보고 체계 준비까지 지원합니다.",
  },
  {
    name: "Factory License",
    subtitle: "Factories Act Registration",
    description:
      "제조 사업장 운영에 필요한 공장 등록·허가 절차를 지원하고 정기 갱신 요건을 안내합니다.",
  },
  {
    name: "Fire NOC",
    subtitle: "Fire No Objection Certificate",
    description:
      "소방 안전 기준 점검 후 사업장 Fire NOC 신청·보완·승인 절차를 지원합니다.",
  },
  {
    name: "FSSAI",
    subtitle: "Food Safety and Standards Authority of India",
    description:
      "인도 식품안전기준청으로, 식품의 안전과 품질을 보장하며 제조·유통·식품 사업 전반 규제, 면허 및 등록을 발급합니다.",
  },
  {
    name: "GST",
    subtitle: "Goods and Services Tax",
    description: "GSTIN 등록과 사업장·업종 정보 입력, 필수 제출 문서 정리를 지원합니다.",
  },
  {
    name: "ICEGATE",
    subtitle: "Indian Customs Electronic Gateway",
    description: "관세 시스템 연동용 ICEGATE 계정 등록과 기본 사용자 세팅을 지원합니다.",
  },
  {
    name: "IEC",
    subtitle: "Import Export Code",
    description: "수출입 코드(Import Export Code) 발급 절차를 준비해 DGFT 등록을 지원합니다.",
  },
  {
    name: "ISO",
    subtitle: "International Organization for Standardization",
    description:
      "기업 운영·제품 품질·안전 관련 표준 충족을 위한 인증 준비와 등록 절차를 지원합니다.",
  },
  {
    name: "ISMW",
    subtitle: "Inter-State Migrant Workmen",
    description:
      "주 간 이주 노동자 고용 시 필요한 등록·컴플라이언스 절차를 준비하고 신청을 지원합니다.",
  },
  {
    name: "Legal Metrology",
    subtitle: "Legal Metrology Registration",
    description:
      "계량·포장·라벨링 관련 법정 등록 및 신고 절차를 지원해 유통 컴플라이언스를 맞춥니다.",
  },
  {
    name: "LUT",
    subtitle: "Letter of Undertaking",
    description:
      "수출 거래 관련 LUT 신청·갱신을 지원하고, GST 환급·무세율 공급 운영에 필요한 문서 관리를 돕습니다.",
  },
  {
    name: "MOOWR",
    subtitle: "Manufacture and Other Operations in Warehouse Regulations",
    description:
      "보세창고 기반 제조·가공 운영을 위한 MOOWR 등록, 승인, 운영 컴플라이언스 체계를 지원합니다.",
  },
  {
    name: "MSME",
    subtitle: "Micro, Small, and Medium Enterprises",
    description:
      "기준 충족 기업의 MSME 등록·확인 절차를 진행해 금융·세제·지원 프로그램 연계를 돕습니다.",
  },
  {
    name: "PAN",
    subtitle: "Permanent Account Number",
    description: "법인 PAN 신청과 세무 계정 연계 단계까지 진행을 지원합니다.",
  },
  {
    name: "PIMS",
    subtitle: "Paper Import Monitoring System",
    description:
      "종이류 수입 사전 등록(PIMS) 신청, 품목·수량 정보 등록, 수입 일정 연계 절차를 지원합니다.",
  },
  {
    name: "Pollution NOC",
    subtitle: "Consent to Establish / Operate (CTE/CTO)",
    description:
      "환경 규제 대상 사업장의 CTE·CTO 신청과 관련 서류 준비, 갱신 절차를 지원합니다.",
  },
  {
    name: "RCMC",
    subtitle: "Registration-Cum-Membership Certificate",
    description: "수출진흥협의회 등록(RCMC) 신청, 업종별 기관 선택, 발급 절차를 지원합니다.",
  },
  {
    name: "RERA Registration",
    subtitle: "Real Estate Regulatory Authority Registration",
    description:
      "부동산 프로젝트/중개업 관련 RERA 등록 절차와 제출 문서 준비, 보완 대응을 지원합니다.",
  },
  {
    name: "S&E Registration",
    subtitle: "Registration Certificate of Establishment",
    description:
      "사업장 설립 등록 증명서 발급 절차를 지원해 법정 필수 등록 요건을 충족하도록 돕습니다.",
  },
  {
    name: "SIMS",
    subtitle: "Steel Import Monitoring System",
    description:
      "철강류 수입 사전 등록(SIMS) 신청, 품목 정보 검토, 선적·통관 일정 연계 절차를 지원합니다.",
  },
  {
    name: "Startup Certificate",
    description: "Startup India 등록 요건 검토부터 증빙 문서 제출까지 단계별로 지원합니다.",
  },
  {
    name: "Trademark",
    subtitle: "Brand and Intellectual Property Registration",
    description:
      "인도에서 상표를 등록해 브랜드 권리를 확보하고, 제3자의 무단 사용을 예방할 수 있도록 지원합니다.",
  },
  {
    name: "Trading License",
    subtitle: "Municipal Trade License",
    description: "지자체 기준에 맞는 사업장 영업 허가를 등록하고 갱신 일정을 관리합니다.",
  },
  {
    name: "Udyam",
    subtitle: "MSME Registration Portal",
    description:
      "중소기업 식별 등록을 통해 정부 지원 제도와 혜택을 활용할 수 있도록 신청을 지원합니다.",
  },
] as const;

export default function LicenseRegistrationServicePage() {
  return (
    <>
      <PageHeader
        title="라이센스 등록 서비스"
        description="사업 시작 전후 필요한 인허가 항목을 정리하고, 등록 절차를 끝까지 지원합니다."
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

        <section className="mt-8 rounded-2xl border border-slate-200/80 bg-slate-50/95 px-5 py-10 shadow-sm sm:px-8 sm:py-12">
          <p className="msv-eyebrow">License registration</p>
          <h2 className="mt-2 text-xl font-bold tracking-tight text-msv-navy sm:text-2xl">
            등록 가능 항목
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            주요 라이센스·등록 항목별로 준비 서류와 접수 절차를 실무 중심으로 지원합니다.
          </p>

          <LicenseCardsWithModal items={licenseCards} />
        </section>
      </StandardPageBody>
    </>
  );
}
