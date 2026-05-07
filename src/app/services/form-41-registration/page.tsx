import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { StandardPageBody } from "@/components/layout/StandardPageBody";
import { staticPageSeo } from "@/lib/seo-metadata";
import { company } from "@/lib/site-content";

export const metadata: Metadata = staticPageSeo("/services/form-41-registration", {
  title: "Form 41(구 Form 10F) 등록 서비스",
  description: `${company.shortName} — Form 41 정의·적용 대상·구비서류·실무 절차·유의사항·DTAA·TDS·TRC·PAN·Form 15CA/CB 연계 안내`,
});

const audienceItems = [
  "한국 본사에 로열티·서비스 대가를 송금하는 인도 법인",
  "해외 법인에 기술료·자문료 등을 지급하는 인도 측 차주",
  "DTAA(이중과세방지협약)상 협약 세율 적용이 필요한 지급 구조",
  "PAN 없이 DTAA 조약세율 적용을 검토하는 해외 법인 또는 비거주 수취인",
  "비거주자를 상대로 한 이자·배당·라이선스·기타 인도 원천소득에 대한 지급",
] as const;

const documentItems = [
  "Tax Residency Certificate(TRC)",
  "여권 또는 해외 법인 등록·존재 관련 서류",
  "PAN(보유한 경우)",
  "주소 및 국가(거주지) 정보",
  "DTAA 적용 여부 및 적용 세율 검토를 위한 확인 자료",
  "송금·지급 관련 계약서, 인보이스 또는 지급 근거자료",
  "필요 시 Authorisation Letter(위임·대리 제출)",
] as const;

const procedureSteps = [
  "거래 구조 및 지급 성격(royalty, FTS, interest 등) 검토",
  "DTAA 적용 가능 여부 및 요건 정리",
  "TRC 및 비거주자 식별·등록 정보 확인",
  "Form 41(구 Form 10F) 작성 및 인도 소득세 전자 포털 등록·제출",
  "적용 세율 및 TDS 산출·반영 방식 검토",
  "송금·외환 신고와 연계된 Form 15CA/CB 필요 여부 검토",
] as const;

const cautionItems = [
  "PAN 보유 여부 등에 따라 적용 세율·절차가 달라질 수 있습니다.",
  "TRC 제출만으로 DTAA 조약세율이 자동 인정되는 것은 아니며, 거래 구조, 지급 성격 및 기재 완결성 등이 함께 검토될 수 있습니다.",
  "전자등록 요건 및 포털 메뉴는 CBDT·Income Tax Portal 개정에 따라 변경될 수 있습니다.",
  "요건 미충족·미제출 시 일반 세율로 TDS가 적용될 가능성이 있습니다.",
  "거래 구조에 따라 Form 15CA/CB 및 AD Bank 측 검토가 병행될 수 있습니다.",
] as const;

const supportItems = [
  "Form 41(구 Form 10F) 등록 및 전자신고(e-filing) 절차 지원",
  "DTAA 적용 검토 및 기본 세율·요건 확인 자료 검토",
  "TRC·PAN·비거주자 정보 등 구비서류 검토",
  "Form 15CA/CB 연계·송금 전 점검 지원",
  "한국 본사·세무법인·회계 담당자와의 협업 및 일정 조율(한국어·영어)",
  "AD Bank 제출 관련 질의 대응 지원(필요 시, 은행별 요건 상이)",
] as const;

export default function Form41RegistrationPage() {
  return (
    <>
      <PageHeader
        title="Form 41(구 Form 10F) 등록 서비스"
        description="인도 소득세 관련 비거주자 정보 제출 절차(Form 41 기반 전자신고 실무 포함)를 정리하고, DTAA·TDS·송금 신고와 연계된 실무를 지원합니다."
        descriptionWide
      />
      <StandardPageBody>
        <div className="space-y-8">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-lg font-bold text-msv-navy">1. Form 41(구 Form 10F)이란?</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">
              <strong>Form 41</strong>은 인도 <strong>비거주자(Non-resident)</strong>가 인도 내 소득에
              대해 <strong>원천징수(TDS)</strong>와 관련하여{" "}
              <strong>DTAA 적용 및 원천징수(TDS) 경감 검토</strong>를 위해 제출하는{" "}
              <strong>비거주자 정보 신고</strong> 절차에 해당합니다.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">
              기존 <strong>Form 10F</strong> 중심 실무가 개정되면서{" "}
              <strong>전자 등록·신고 체계(Form 41)</strong>로 운영되는 사례가 늘고 있으며,{" "}
              <strong>PAN</strong>·<strong>TRC(Tax Residency Certificate)</strong>·전자 등록 요건 등에 따라{" "}
              <strong>제출 방식, 포털 절차 및 요구 서류</strong>가 달라질 수 있습니다.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-lg font-bold text-msv-navy">2. 주요 적용 대상</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">
              아래에 해당하는 경우 Form 41(및 관련 절차) 검토가 필요할 수 있습니다. 실제 제출 필요 여부 및
              적용 범위는 지급 구조·거래 성격별로 달라질 수 있습니다.
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700">
              {audienceItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-lg font-bold text-msv-navy">3. 일반 구비서류</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">
              사안·포털 버전에 따라 추가 항목이 있을 수 있으나, 통상 아래를 준비합니다.
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700">
              {documentItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="mt-4 text-xs leading-relaxed text-slate-500">
              첨부 파일 형식·용량 한도는 Income Tax e-Filing Portal 안내를 따릅니다.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-lg font-bold text-msv-navy">4. 일반 진행 절차</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">
              MSV는 아래 흐름에 맞춰 자료·일정·은행·세무 채널을 조율합니다. 최종 세무 판단 및 신고 책임은
              고객의 인도 세무 자문인과 함께 검토·확정하는 것을 권장합니다.
            </p>
            <ol className="mt-4 list-decimal space-y-2.5 pl-5 text-sm leading-relaxed text-slate-700">
              {procedureSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-lg font-bold text-msv-navy">5. 유의사항</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700">
              {cautionItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-lg font-bold text-msv-navy">6. MSV 지원 범위</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700">
              {supportItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-lg font-bold text-msv-navy">7. 디스클레이머</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">
              본 페이지는 <strong>일반적인 참고 정보</strong>로만 제공됩니다. 실제 적용 여부·세율·제출
              의무는 <strong>지급 성격·상대방 국가·조세조약·PAN 보유 여부·세법·고시 개정</strong> 등에 따라
              달라질 수 있습니다. 개별 거래 구조에 따라 Form 15CA/CB, TRC, FIRC 등 추가 검토가 필요할 수
              있습니다. 실행 전 <strong>MSV와 상의하세요</strong>.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-lg font-bold text-msv-navy">8. 용어</h2>
            <dl className="mt-4 grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
              <div>
                <dt className="font-semibold text-msv-navy">Form 41</dt>
                <dd className="text-slate-600">
                  인도 소득세상 비거주자 정보 제출용 전자 양식(구 Form 10F 실무가 전환되는 체계)
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-msv-navy">Form 10F</dt>
                <dd className="text-slate-600">과거 비거주자 정보 제출에 쓰이던 양식(현재는 Form 41 중심)</dd>
              </div>
              <div>
                <dt className="font-semibold text-msv-navy">DTAA</dt>
                <dd className="text-slate-600">Double Taxation Avoidance Agreement(이중과세방지협약)</dd>
              </div>
              <div>
                <dt className="font-semibold text-msv-navy">TDS</dt>
                <dd className="text-slate-600">Tax Deducted at Source(원천징수)</dd>
              </div>
              <div>
                <dt className="font-semibold text-msv-navy">TRC</dt>
                <dd className="text-slate-600">Tax Residency Certificate(거주 증명)</dd>
              </div>
              <div>
                <dt className="font-semibold text-msv-navy">PAN</dt>
                <dd className="text-slate-600">Permanent Account Number(인도 납세자 식별번호)</dd>
              </div>
              <div>
                <dt className="font-semibold text-msv-navy">Non-resident</dt>
                <dd className="text-slate-600">인도 소득세법상 비거주자</dd>
              </div>
              <div>
                <dt className="font-semibold text-msv-navy">Form 15CA / 15CB</dt>
                <dd className="text-slate-600">대외 송금 시 소득세 신고·검토와 연계되는 양식(사안별)</dd>
              </div>
              <div>
                <dt className="font-semibold text-msv-navy">FIRC</dt>
                <dd className="text-slate-600">Foreign Inward Remittance Certificate(입금 증빙)</dd>
              </div>
              <div>
                <dt className="font-semibold text-msv-navy">AD Bank</dt>
                <dd className="text-slate-600">Authorized Dealer Bank(지정 외국환은행)</dd>
              </div>
              <div>
                <dt className="font-semibold text-msv-navy">CBDT</dt>
                <dd className="text-slate-600">Central Board of Direct Taxes(인도 직접세 중앙 위원회)</dd>
              </div>
              <div>
                <dt className="font-semibold text-msv-navy">e-Filing Portal</dt>
                <dd className="text-slate-600">Income Tax Department 전자신고 포털</dd>
              </div>
            </dl>
          </section>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/services"
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-msv-navy transition hover:border-msv-blue/35 hover:text-msv-blue"
            >
              서비스로 돌아가기
            </Link>
            <Link
              href="/contact"
              className="rounded-lg bg-msv-navy px-4 py-2 text-sm font-semibold text-white transition hover:bg-msv-navy/90"
            >
              문의하기
            </Link>
          </div>
        </div>
      </StandardPageBody>
    </>
  );
}
