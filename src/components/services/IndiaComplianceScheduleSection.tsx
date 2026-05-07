import Link from "next/link";
import {
  indiaComplianceAnnualRows,
  indiaComplianceMonthlyRows,
  indiaCompliancePortalRows,
  indiaComplianceQuarterlyRows,
  indiaComplianceScheduleIntro,
} from "@/lib/site-content";

function ComplianceTable({
  caption,
  rows,
}: {
  caption: string;
  rows: readonly { item: string; schedule: string }[];
}) {
  return (
    <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
      <table className="min-w-[20rem] w-full border-collapse text-left text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50">
            <th scope="col" className="px-3 py-2.5 font-semibold text-msv-navy sm:px-4">
              항목
            </th>
            <th scope="col" className="px-3 py-2.5 font-semibold text-msv-navy sm:px-4">
              일정·요건(요약)
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.item} className="border-b border-slate-100 last:border-0">
              <td className="whitespace-nowrap px-3 py-2.5 font-medium text-slate-800 sm:px-4">{row.item}</td>
              <td className="px-3 py-2.5 leading-relaxed text-slate-700 sm:px-4">{row.schedule}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** 서비스 페이지 — 인도 법인 컴플라이언스 일정 참고표 */
export function IndiaComplianceScheduleSection() {
  return (
    <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 sm:p-7">
      <h2 className="text-xl font-bold text-msv-navy">인도 법인 기간별 법정 신고·컴플라이언스 일정</h2>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{indiaComplianceScheduleIntro}</p>

      <div className="mt-8 space-y-8">
        <div>
          <h3 className="text-sm font-semibold text-msv-navy">월별</h3>
          <ComplianceTable caption="월별 신고·납부" rows={indiaComplianceMonthlyRows} />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-msv-navy">분기별</h3>
          <ComplianceTable caption="분기별 신고·납부" rows={indiaComplianceQuarterlyRows} />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-msv-navy">연도별</h3>
          <ComplianceTable caption="연도별 신고·납부" rows={indiaComplianceAnnualRows} />
        </div>
      </div>

      <div className="mt-8 border-t border-slate-200 pt-6">
        <h3 className="text-sm font-semibold text-msv-navy">주요 정부·포털(참고)</h3>
        <p className="mt-1 text-xs leading-relaxed text-slate-500">
          실제 로그인·메뉴명은 포털 개편에 따라 달라질 수 있습니다.
        </p>
        <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200">
          <table className="min-w-[22rem] w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th scope="col" className="px-3 py-2.5 font-semibold text-msv-navy sm:px-4">
                  구분
                </th>
                <th scope="col" className="px-3 py-2.5 font-semibold text-msv-navy sm:px-4">
                  링크
                </th>
                <th scope="col" className="px-3 py-2.5 font-semibold text-msv-navy sm:px-4">
                  비고
                </th>
              </tr>
            </thead>
            <tbody>
              {indiaCompliancePortalRows.map((row) => (
                <tr key={row.href} className="border-b border-slate-100 last:border-0">
                  <td className="whitespace-nowrap px-3 py-2 font-medium text-slate-800 sm:px-4">{row.label}</td>
                  <td className="px-3 py-2 sm:px-4">
                    <Link
                      href={row.href}
                      className="break-all text-msv-blue underline decoration-msv-blue/30 underline-offset-2 hover:decoration-msv-blue"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {row.href}
                    </Link>
                  </td>
                  <td className="px-3 py-2 text-slate-600 sm:px-4">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
