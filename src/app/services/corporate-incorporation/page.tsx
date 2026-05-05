import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { StandardPageBody } from "@/components/layout/StandardPageBody";
import { SectionTitle } from "@/components/SectionTitle";
import { staticPageSeo } from "@/lib/seo-metadata";
import { company } from "@/lib/site-content";

export const metadata: Metadata = staticPageSeo("/services/corporate-incorporation", {
  title: "법인 설립 서비스",
  description: `${company.shortName} 인도 법인 설립 준비·MCA 등기·GST·IEC·공장 후속 절차 및 소요 기간 안내`,
});

const supportItems = [
  "법인 형태·지분 구조·사업 목적 범위 검토 및 설립 로드맵 수립",
  "이름 승인·디지털 서명·MOA/AOA·등기 신청 등 설립 서류 준비·제출 지원",
  "PAN·GST·은행 계좌 등 설립 직후 필수 등록 일정 정리 및 실행 지원",
  "설립 후 정관·이사회·주주 결의 등 거버넌스 기본 점검(회계·세무 팀과 연계)",
] as const;

const incorporationSteps = [
  "전자서명(Digital Signature) 준비",
  "이사 고유번호(DIN) 발급",
  "이사 PAN(소득세 번호) 발급",
  "법인명 신청 및 승인",
  "회사 정관(MOA & AOA) 및 법인 서류 작성",
  "기업관리국(MCA)에 서류 제출",
  "법인설립증(COI) 발급",
  "법인 PAN 및 TAN 발급",
  "법인 계좌 개설",
  "자본금 송금 및 인도중앙은행(RBI) 심사",
  "영업권 확보",
  "주식 등록 및 Demat 승인",
  "GST 등록",
  "수출입코드(IEC) 등록",
  "Professional Tax(PT) 등록",
] as const;

const factoryFollowUp = [
  "산업 규모 등록(중소, 중견 등)",
  "환경/소방 허가",
  "공장 건물 도면 승인 및 인허가",
  "공장 허가증 발급",
  "퇴직연금(EPF) 및 고용보험(ESIC) 등록",
] as const;

const timelineItems = [
  { label: "법인명 승인", value: "7~15 근무일" },
  { label: "법인설립증(COI) 발급", value: "7~10 근무일" },
  {
    label: "GST, IEC 등 코드 발급",
    value: "계좌 개설 및 체크북 수령 후 15~20 근무일",
  },
  {
    label: "자본금 송금 및 RBI 심사",
    value: "COI 발급일로부터 60일 이내 송금, 심사 10~15 근무일",
  },
  { label: "공장 설립(후속)", value: "법인 설립 완료 후 30~45 근무일" },
] as const;

/** 원화는 안내용 예시(대략 1 INR ≈ 16 KRW 가정). 실제 환율·관청 산정과 다를 수 있습니다. */
const capitalFeeRows: readonly { inr: number; krw: number; feeInr: number }[] = [
  { inr: 1_000_000, krw: 16_000_000, feeInr: 1_175 },
  { inr: 2_000_000, krw: 32_000_000, feeInr: 68_075 },
  { inr: 3_000_000, krw: 48_000_000, feeInr: 98_175 },
  { inr: 4_000_000, krw: 64_000_000, feeInr: 128_175 },
  { inr: 5_000_000, krw: 80_000_000, feeInr: 158_175 },
  { inr: 6_000_000, krw: 96_000_000, feeInr: 168_175 },
  { inr: 7_000_000, krw: 112_000_000, feeInr: 178_175 },
  { inr: 8_000_000, krw: 128_000_000, feeInr: 188_175 },
  { inr: 9_000_000, krw: 144_000_000, feeInr: 198_175 },
  { inr: 10_000_000, krw: 160_000_000, feeInr: 208_100 },
  { inr: 15_000_000, krw: 240_000_000, feeInr: 245_610 },
  { inr: 20_000_000, krw: 320_000_000, feeInr: 283_110 },
  { inr: 30_000_000, krw: 480_000_000, feeInr: 358_110 },
] as const;

function formatInr(n: number): string {
  return `${n.toLocaleString("en-IN")} INR`;
}

function formatKrw(n: number): string {
  return `${n.toLocaleString("ko-KR")} KRW`;
}

export default function CorporateIncorporationServicePage() {
  return (
    <>
      <PageHeader
        title="법인 설립 서비스"
        description="인도 Private Limited 등 법인 설립을 준비할 때 필요한 이름·업종 정리부터 MCA 등기, 은행·RBI, GST·IEC, 공장 후속 절차까지 단계별로 안내합니다."
        descriptionWide
      />
      <StandardPageBody className="space-y-12 sm:space-y-14">
        <div className="flex flex-wrap justify-end gap-3">
          <Link
            href="/services/corporate-incorporation/apply"
            className="inline-flex items-center justify-center rounded-xl bg-msv-navy px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-msv-navy/90"
          >
            법인 설립 신청하기
          </Link>
        </div>
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <SectionTitle
            eyebrow="Support"
            title="지원 범위 요약"
            spacing="tight"
            density="compact"
            contentWidth="full"
          />
          <ul className="mt-4 space-y-2 text-sm leading-relaxed text-slate-600">
            {supportItems.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <SectionTitle
            id="corp-prep-name"
            eyebrow="Step 1"
            title="법인명 준비 및 업종 선택"
            spacing="tight"
            density="compact"
            contentWidth="full"
          />
          <ul className="mt-4 list-none space-y-3 text-sm leading-relaxed text-slate-600">
            <li>
              <span className="font-semibold text-msv-navy">법인명:</span> 최소 2개 이상의 후보명을 준비해 주시기
              바랍니다. (검토 및 승인까지 약 7~10일 소요)
            </li>
            <li>
              <span className="font-semibold text-msv-navy">업종/업태:</span> 설립 목적 및 사업 내용에 대한 간단한
              요약이 필요합니다.
            </li>
          </ul>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <SectionTitle
            eyebrow="Step 2"
            title="법인 설립 절차 요약"
            spacing="tight"
            density="compact"
            contentWidth="full"
          />
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-slate-600 marker:text-msv-blue">
            {incorporationSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <SectionTitle
            eyebrow="Step 3"
            title="공장 설립 관련 후속 절차"
            spacing="tight"
            density="compact"
            contentWidth="full"
          />
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-slate-600 marker:text-msv-blue">
            {factoryFollowUp.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <SectionTitle
            eyebrow="Step 4"
            title="소요 기간 (평균 기준)"
            spacing="tight"
            density="compact"
            contentWidth="full"
          />
          <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-slate-600">
            {timelineItems.map((row) => (
              <li key={row.label} className="flex flex-col gap-0.5 border-b border-slate-100 py-2 last:border-0 sm:flex-row sm:items-baseline sm:justify-between">
                <span className="font-medium text-msv-navy">{row.label}</span>
                <span className="text-slate-600 sm:text-right">{row.value}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs leading-relaxed text-slate-500">
            근무일 기준이며, 관청·은행·서류 보완 상황에 따라 달라질 수 있습니다.
          </p>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <SectionTitle
            eyebrow="Step 5"
            title="법인 설립 기본 요건"
            spacing="tight"
            density="compact"
            contentWidth="full"
          />
          <ul className="mt-4 list-none space-y-3 text-sm leading-relaxed text-slate-600">
            <li>- 최소 2인의 등기이사 및 주주 필요 (개인/법인 가능)</li>
            <li>- 최소 1인은 상주이사(연간 182일 이상 인도 체류자)여야 합니다.</li>
          </ul>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <SectionTitle
            eyebrow="Step 6"
            title="자본금 및 정부 수수료 예시"
            spacing="tight"
            density="compact"
            contentWidth="full"
          />
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            아래 원화는 <strong className="font-semibold text-msv-navy">1 INR ≈ 16 KRW</strong>로 단순 환산한
            참고치입니다.
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
            <table className="min-w-[28rem] w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th scope="col" className="px-3 py-2.5 font-semibold text-msv-navy sm:px-4">
                    자본금 (INR)
                  </th>
                  <th scope="col" className="px-3 py-2.5 font-semibold text-msv-navy sm:px-4">
                    자본금 한화 (KRW)
                  </th>
                  <th scope="col" className="px-3 py-2.5 font-semibold text-msv-navy sm:px-4">
                    정부 수수료 (INR)
                  </th>
                </tr>
              </thead>
              <tbody>
                {capitalFeeRows.map((row) => (
                  <tr key={row.inr} className="border-b border-slate-100 last:border-0">
                    <td className="px-3 py-2 tabular-nums text-slate-700 sm:px-4">{formatInr(row.inr)}</td>
                    <td className="px-3 py-2 tabular-nums text-slate-700 sm:px-4">{formatKrw(row.krw)}</td>
                    <td className="px-3 py-2 tabular-nums text-slate-700 sm:px-4">
                      {row.feeInr.toLocaleString("en-IN")} INR
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-slate-500">
            등록되는 <strong className="font-medium text-slate-700">주(邦)</strong>마다 변동이 있으며,{" "}
            <strong className="font-medium text-slate-700">주식 수</strong>에 따라 수수료가 달라질 수 있습니다.
            확정 금액은 담당 RoC/주 정부 기준으로 산정됩니다.
          </p>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <SectionTitle
            eyebrow="Step 7"
            title="법인 주소 요건"
            spacing="tight"
            density="compact"
            contentWidth="full"
          />
          <ul className="mt-4 list-none space-y-3 text-sm leading-relaxed text-slate-600">
            <li>- 법인명 승인 후 <strong className="font-semibold text-msv-navy">2주 이내</strong> 확정 필요</li>
            <li>- 현지 주소 임차 또는 제공 가능해야 합니다.</li>
          </ul>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-msv-blue-soft/15 p-6 sm:p-8">
          <p className="text-sm leading-relaxed text-slate-600">
            본 페이지는 일반적인 설립·후속 절차를 요약한 것입니다. 고객사별 체크리스트·내부 가이드에 추가 조항이
            있는 경우, 계약 범위에 맞춰 별도로 정리해 드립니다.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/services"
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-msv-navy transition hover:border-msv-blue/35 hover:text-msv-blue"
            >
              서비스로 돌아가기
            </Link>
            <Link
              href="/services/corporate-incorporation/apply"
              className="rounded-lg border border-msv-navy/40 bg-white px-4 py-2 text-sm font-semibold text-msv-navy transition hover:bg-msv-navy/5"
            >
              법인 설립 신청하기
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
