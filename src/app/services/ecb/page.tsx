import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { StandardPageBody } from "@/components/layout/StandardPageBody";
import { staticPageSeo } from "@/lib/seo-metadata";
import { company } from "@/lib/site-content";

export const metadata: Metadata = staticPageSeo("/services/ecb", {
  title: "ECB 안내",
  description: `${company.shortName} — 인도 ECB(대외상업차입) 개념·자동승인·RBI 신고·Form 83·LRN·ECB-2·FIRMS·협력 은행 안내`,
});

export default function EcbGuidePage() {
  return (
    <>
      <PageHeader
        title="ECB 안내"
        description="대외상업차입(ECB)은 RBI·FEMA 하에서 한도·만기·용도·통화·신고가 관리되는 대표적인 외화 조달 수단입니다. 아래는 실무 절차와 컴플라이언스 포인트를 정리한 참고 안내이며, 실행·신고는 최신 Master Direction·고시 및 개별 사안을 따릅니다."
        descriptionWide
      />
      <StandardPageBody>
        <div className="space-y-8">
          <section className="rounded-2xl border border-msv-blue/30 bg-msv-blue-soft/40 p-6 shadow-sm sm:p-8">
            <h2 className="text-base font-bold text-msv-navy">은행 채널 및 전국 서비스</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-800">
              MSV는 기업 뱅킹·ECB·FEMA 연계 업무를 주로{" "}
              <strong className="text-msv-navy">KEB Hana Bank</strong>,{" "}
              <strong className="text-msv-navy">ICICI Bank</strong>,{" "}
              <strong className="text-msv-navy">Kotak Mahindra Bank</strong> 등과 협력하며 안내·조율을
              지원합니다. 인도 <strong className="text-msv-navy">전역</strong>의{" "}
              <strong className="text-msv-navy">
                AD Bank(Authorized Dealer Bank, 지정 외국환은행)
              </strong>{" "}
              네트워크를 통한 자금 수취·환전·신고 연계 지원도 가능합니다(은행별 취급 조건·KYC 상이).
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-lg font-bold text-msv-navy">1. ECB란</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">
              <strong>ECB(External Commercial Borrowing)</strong>는 인도 거주자(법인 등)가{" "}
              <strong>비거주자</strong>로부터 조달하는 <strong>상업적 외화 차입</strong>입니다. 대출,
              비전환사채(NCD), 선택적 전환 우선주(OCCPS) 등 발행 증권이 규정 범위에 포함될 수 있으며,{" "}
              <strong>FEMA (Borrowing and Lending in Foreign Exchange) Regulations</strong> 및 RBI{" "}
              <strong>Master Direction — External Commercial Borrowings, Trade Credit…</strong> 등에 따라
              승인, 한도 및 보고 의무 등이 관리됩니다.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-lg font-bold text-msv-navy">2. ECB의 주요 유형·대주</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700">
              <li>해외 금융기관 대출, 해외 모회사·주주(Foreign Equity Holder) 대여금 등</li>
              <li>
                전환사채(FCCB), 교환사채(FCEB), 기타 유가증권 또는 금융리스 형태의 거래는 관련 시기 및
                규정에 따라 ECB로 분류·요건이 달라질 수 있습니다.
              </li>
              <li>
                대주 예: 국제은행, 수출신용기관, 다자개발은행(IFC, ADB 등), 외국 주주·장기투자자, 설비
                공급자 등(자격·한도별로 허용 범위 상이).
              </li>
            </ul>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-lg font-bold text-msv-navy">3. 자동승인(Automatic route) 개요</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">
              차입은 <strong>자동승인 루트</strong>와 <strong>사전승인(Approval) 루트</strong>로 나뉩니다.
              자격요건, 차입한도, 최소 평균만기(MAMP), 통화(FCY/INR), 레버리지, 금리 상한(All-in-cost),
              자금 사용 목적 등을 우선 검토해야 하며, 조건을 충족하지 못하면 용도가 적합해도 차입이
              불가하거나 RBI 사전 승인이 필요할 수 있습니다.
            </p>
            <h3 className="mt-6 text-sm font-semibold text-msv-navy">3.1. 한도·만기·통화(요지)</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700">
              <li>
                <strong>FCY ECB / INR ECB</strong>: 허용 통화 및 업종별 제한 요건이 상이합니다(제조·소프트웨어·
                해운·항공 등이 FCY에서 흔한 예시).
              </li>
              <li>
                <strong>대출 한도·레버리지</strong>: 최근 결산연도 기준 한도·자기자본 대비 배수 등 규정이
                있습니다(해외 모회사·주주 대여금은 별도 배수·소액 예외 등).
              </li>
              <li>
                <strong>MAMP(최소평균만기)</strong>: 차입 유형·금액에 따라 3년·5년·10년 등 요구가 달라집니다.
                분할상환 구조에 따라 &quot;평균만기(MAMP)&quot; 산정 방식이 달라질 수 있어 대출 구조 설계가
                중요합니다.
              </li>
              <li>
                <strong>금리(All-in-cost)</strong>: 벤치마크+스프레드 상한, 연체료·중도상환 수수료 등 부대비용
                한도 등이 규정됩니다(시기별 RBI 벤치마크 금리 기준 변경에 유의해야 합니다).
              </li>
            </ul>
            <h3 className="mt-6 text-sm font-semibold text-msv-navy">3.2. 자금용도(요지)</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">
              기본적으로 <strong>시설자금(Capex)</strong> 성격이 중심입니다. 건물·기계 취득 등은 일반적으로
              허용되는 반면, <strong>부동산 투기 목적 부지</strong>, <strong>자본시장 투자</strong>, 일부{" "}
              <strong>운전자금</strong> 용도는 차입 경로(Route) 및 차주 유형에 따라 제한될 수 있습니다(해외
              모회사·주주 대여금으로 운전자금은 별도 만기 요건 등).
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-lg font-bold text-msv-navy">4. ECB 실행 및 RBI 신고 절차 (AD Bank 기준)</h2>
            <ol className="mt-4 list-decimal space-y-2.5 pl-5 text-sm leading-relaxed text-slate-700">
              <li>
                <strong>AD Bank 지정</strong> 후 차주(Borrower)·대주(Lender) 간{" "}
                <strong>Loan Agreement</strong> 체결
              </li>
              <li>
                법률·회계 검토를 거쳐 <strong>Form 83</strong> 등 신청서류를 작성하고, 은행 심사(평균만기
                산출 포함)를 진행합니다.
              </li>
              <li>
                AD Bank가 RBI에 서류 제출 후 <strong>LRN(Loan Registration Number)</strong> 발급 — 실질적인
                승인 및 등록 절차에 해당합니다.
              </li>
              <li>
                LRN 발급 후 인출(Drawdown) 가능. 이후 <strong>사후보고(ECB-2 등)</strong>를 FIRMS 등 전자
                채널로 제출합니다. 제출 기한 및 보고 항목은 RBI 고시 및 등록 조건에 따라 달라질 수 있습니다.
              </li>
            </ol>
            <p className="mt-4 text-xs leading-relaxed text-slate-500">
              내부 매뉴얼 기준 Form 83는 계약일 기준 <strong>7일 이내</strong> 제출을 전제로 하는 사례가
              많고, LRN 부여 후 <strong>익월 초·10일 전후</strong> 등 ECB-2 제출이 운영되는 사례도 있습니다.
              실제 제출 기한은 RBI 고시·은행 안내를 확인해야 합니다.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-lg font-bold text-msv-navy">5. ECB 진행 Q&amp;A</h2>
            <p className="mt-2 text-xs leading-relaxed text-slate-500">
              아래는 실무 진행 시 자주 확인하는 항목을 Q&amp;A 형식으로 정리한 것입니다. 금액·금리·세율 등은
              RBI 규정, 이중과세방지협약(DTAA), 대출 구조 등에 따라 달라질 수 있으므로 참고용으로만 활용하시기
              바랍니다.
            </p>

            <div className="mt-6 space-y-6 border-t border-slate-100 pt-6">
              <div>
                <h3 className="text-sm font-semibold text-msv-navy">5.1. 준비 사항 및 소요 기간</h3>
                <p className="mt-2 text-sm font-medium text-slate-800">
                  대여금을 받기 위해 어떤 준비가 필요하며, 인도 현지법인이 투자(인출)금을 사용하기까지
                  대략 얼마나 걸리나요?
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  ECB로 진행할 경우 <strong>RBI 측 승인·등록(LRN 등)</strong>이 통상{" "}
                  <strong>약 2주 내외</strong>에 이뤄지는 사례가 많고, 이후 투자금 송금 및 현지 은행 입금
                  처리에는 <strong>약 3~4영업일</strong> 정도가 소요될 수 있습니다. 구비서류가 완비되어 있다면{" "}
                  <strong>전체적으로 약 1개월 전후</strong>를 일정 산정의 참고치로 보는 경우가 많습니다(개별
                  사안·은행·검토량에 따라 상이).
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-msv-navy">5.2. 차입(회수) 가능 한도</h3>
                <p className="mt-2 text-sm font-medium text-slate-800">ECB로 조달 가능한 규모는 어느 정도인가요?</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  자동승인 루트 등에서 논의되던 예시로, 연간 한도 상한이{" "}
                  <strong>USD 7억 5천만(USD 750,000,000)</strong> 수준으로 안내된 바 있습니다. 또한 인도
                  인도 법인이 투자사와 <strong>특수관계</strong>에 해당하는 등의 경우에는 자기자본 대비{" "}
                  <strong>최대 7배 수준까지 차입</strong>이 허용되는 사례도 있습니다(모회사·주주 대여 등, 소액
                  예외·업종·통화별로 상이 — 최신 Master Direction 확인).
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-msv-navy">5.3. 이자율(상환 시 부담)</h3>
                <p className="mt-2 text-sm font-medium text-slate-800">
                  상환해야 할 이자(수익금)에 적용될 금리는 어느 범위까지 가능한가요?
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  일반적으로 시장금리 수준을 기준으로 하되, RBI가 정하는{" "}
                  <strong>All-in-cost 상한(예: 벤치마크 + 일정 %p)</strong> 범위 내에서 약정하는 구조가
                  일반적입니다(자료 예시에서 상한을 <strong>약 4.5%p</strong> 등으로 설명한 바 있음). 이자는
                  원금 상환 흐름과 맞추어 <strong>원금과 함께 송금·결제</strong>되는 구조가 일반적입니다.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-msv-navy">5.4. 상환 금액·상환 기간</h3>
                <p className="mt-2 text-sm font-medium text-slate-800">
                  매월 또는 매년 상환할 수 있는 원금과 이자(수익금)의 상한은 어떻게 되나요?
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  상환 스케줄·액은 <strong>대출 계약서</strong>와 상환 방식(일시·분할)에 따라 달라지며,
                  일률적인 월별·연별 상환액 구조가 모든 사안에 동일하게 적용되는 것은 아닙니다. 실무에서는{" "}
                  <strong>상환기간을 약 1년~10년 수준으로 설계</strong>하는 사례가 많습니다(MAMP 등 규제와
                  정합 필요).
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-msv-navy">5.5. 본사 송금 시 조세(TDS)</h3>
                <p className="mt-2 text-sm font-medium text-slate-800">
                  본사(해외)로 원금·이자를 상환·송금할 때 소득세율은 어떻게 되나요?
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  일반적으로 원금 상환 자체에는 별도의 소득세가 부과되지 않습니다.{" "}
                  <strong>이자 송금</strong>의 경우 인도에서 <strong>TDS(원천징수)</strong>가{" "}
                  <strong>약 5~10%</strong> 부담되는 사례가 논의될 수 있으나, 이중과세방지협약(DTAA)·대주
                  국적·차입 구조·이자 성격에 따라 달라지므로{" "}
                  <strong>구체적인 대출 구조에 따른 사전 검토가 필요할 수 있습니다</strong>(Form 15CA/CB 등).
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-lg font-bold text-msv-navy">6. 구비서류 예시 (Automatic Route 기준)</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700">
              <li>회사 요청서(Request letter)</li>
              <li>
                <strong>Form 83</strong> (RBI 신고 양식, 통상 2부 제출) 및 평균만기 산출 자료
              </li>
              <li>
                <strong>Loan Agreement</strong> — 대주·차주, 금액(FCY), 기간, 인출·상환, 금리, 이자 지급,
                자금 사용 목적, 투자 지출 사유 및 사용 계획(재무자료 포함) 등
              </li>
              <li>차입자 정관(Memorandum of Association)</li>
              <li>차입자 최근 3개년 재무제표</li>
              <li>대주가 기존 외국인 투자자인 경우 FC-GPR 등 기존 FDI 신고자료</li>
              <li>ECB 실행 관련 이사회 결의(Board Resolution)</li>
            </ul>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-lg font-bold text-msv-navy">7. 지연 제재(보고·예시)</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">
              보고 지연에 따른 과태료 규정이 있을 수 있습니다. 참고 자료 기준 <strong>예시</strong>는 아래와
              같으며, 실제 벌금 금액 및 적용 여부는 당시 RBI 고시 및 은행 지침을 확인해야 합니다.
            </p>
            <div className="mt-4 overflow-x-auto rounded-lg border border-slate-200">
              <table className="w-full min-w-[16rem] border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-slate-50 text-xs font-semibold text-msv-navy">
                    <th className="border border-slate-200 px-3 py-2">지연 기간(예시)</th>
                    <th className="border border-slate-200 px-3 py-2">벌금(예시)</th>
                  </tr>
                </thead>
                <tbody className="text-slate-700">
                  <tr>
                    <td className="border border-slate-200 px-3 py-2">30일 이하</td>
                    <td className="border border-slate-200 px-3 py-2">INR 5,000</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 px-3 py-2">3년 이하</td>
                    <td className="border border-slate-200 px-3 py-2">INR 50,000</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 px-3 py-2">3년 초과</td>
                    <td className="border border-slate-200 px-3 py-2">INR 100,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-lg font-bold text-msv-navy">8. FIRC·전자신고(FIRMS)</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">
              <strong>FIRC(Foreign Inward Remittance Certificate)</strong>는 AD Bank가 발행하는 송금
              증빙으로, 자본금 납입, ECB 인출 등 외화 유입 사실을 확인하는 데 사용됩니다. FDI·ECB 등의 외화
              착금 이후 RBI 보고(예: Advance Reporting 등)와 연계되는 경우가 많습니다.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">
              전자 신고가 보편화되면서 <strong>FIRMS</strong> 등 포털 업로드·UIN 발급 절차가 사용됩니다.
              양식 작성, 첨부서류 스캔 및 등록 업무는 일반적으로 전문가 검토를 거쳐 진행됩니다.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-lg font-bold text-msv-navy">9. 장·단점 및 기타</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700">
              <li>
                <strong>장점</strong>: USD/EUR 등 외화 기반 역외 조달로 상대적으로 낮은 금리 활용 가능
              </li>
              <li>
                <strong>단점</strong>: 이자·원금 상환 시 환율 리스크; 자금 사용 목적이 시설자금(Capex)
                중심으로 제한되는 경우가 많음(해외 모회사·주주 대여금 등 예외는 별도 만기·조건)
              </li>
              <li>인출금 운용: 단기 금융상품 예치 등의 운용은 규정 범위 내 허용 사항이 있을 수 있음</li>
              <li>
                대환(Refinancing), 증액, 금리 변경, 만기 연장 등은 RBI 규정 범위 내에서 허용될 수 있음
              </li>
              <li>
                <strong>대주 국가(예: 한국)의 외환·대외거래 규정에 따른 사전 신고·승인</strong> 필요 여부는
                별도 확인이 필요합니다(지정 외국환거래은행·한국은행 등).
              </li>
            </ul>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-lg font-bold text-msv-navy">10. 용어</h2>
            <dl className="mt-4 grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
              <div>
                <dt className="font-semibold text-msv-navy">ECB</dt>
                <dd className="text-slate-600">External Commercial Borrowings</dd>
              </div>
              <div>
                <dt className="font-semibold text-msv-navy">AD Bank</dt>
                <dd className="text-slate-600">Authorized Dealer Bank(지정 외국환은행)</dd>
              </div>
              <div>
                <dt className="font-semibold text-msv-navy">LRN</dt>
                <dd className="text-slate-600">Loan Registration Number</dd>
              </div>
              <div>
                <dt className="font-semibold text-msv-navy">FIRC</dt>
                <dd className="text-slate-600">Foreign Inward Remittance Certificate</dd>
              </div>
              <div>
                <dt className="font-semibold text-msv-navy">MAMP</dt>
                <dd className="text-slate-600">Minimum average maturity period</dd>
              </div>
              <div>
                <dt className="font-semibold text-msv-navy">FIRMS</dt>
                <dd className="text-slate-600">RBI 외국인 투자·차입 보고 포털</dd>
              </div>
            </dl>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-lg font-bold text-msv-navy">참고 링크</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">
              RBI FIRMS:{" "}
              <Link
                href="https://firms.rbi.org.in"
                className="font-semibold text-msv-blue underline-offset-2 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://firms.rbi.org.in
              </Link>
            </p>
            <p className="mt-6 text-xs leading-relaxed text-slate-500">
              본 페이지는 MSV 내부 자료(자금조달·ECB 개요, 2020) 및 업계 안내(ECB 주요 안내사항 등)를
              바탕으로 재편집한 참고용 요약입니다. RBI Master Direction·고시·환율·세법은 수시로 개정되므로
              실행·신고·원천징수(예: Form 15CA/CB) 일정은{" "}
              <strong className="text-slate-700">MSV와 상담 후 확정</strong>하시기 바랍니다.
            </p>
          </section>

          <div className="flex flex-wrap gap-3">
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
        </div>
      </StandardPageBody>
    </>
  );
}
