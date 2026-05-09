import Link from "next/link";
import type { AccountingServicesPageCopy } from "@/lib/i18n/accounting-services-page-locale";

/** 항목 열과 일정·요건 열 사이 시각적 스파인(참고 디자인과 동일) */
const columnSpine = "border-l-[3px] border-l-msv-blue";

const theadRow = "border-b border-slate-200 bg-slate-100";
/** 월별·분기별·연도별 표 공통 — 첫 열 비율 고정으로 파란 스파인 세로 정렬 */
const thItemCol = "w-[38%] min-w-0 sm:w-[34%]";
const thScheduleCol = "w-[62%] min-w-0 sm:w-[66%]";
/** 포털 표 2·3열 — 합계가 thScheduleCol 과 동일(100% − 첫 열), 링크·비고 동일 너비 */
const portalThLinkCol = "w-[31%] min-w-0 sm:w-[33%]";
const portalThNoteCol = "w-[31%] min-w-0 sm:w-[33%]";
const thBase =
  "px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-600 sm:px-4";
const tdItem =
  "min-w-0 border-b border-slate-200 px-3 py-2.5 align-top text-sm font-medium text-slate-900 break-words sm:px-4";
const tdSchedule =
  `min-w-0 border-b border-slate-200 px-3 py-2.5 align-top text-sm leading-relaxed text-slate-700 break-words sm:px-4 ${columnSpine}`;

function ComplianceTable({
  caption,
  rows,
  thItem,
  thSchedule,
}: {
  caption: string;
  rows: readonly { item: string; schedule: string }[];
  thItem: string;
  thSchedule: string;
}) {
  return (
    <div className="mt-3 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <table className="table-fixed min-w-[20rem] w-full border-collapse text-left">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className={theadRow}>
            <th scope="col" className={`${thBase} ${thItemCol}`}>
              {thItem}
            </th>
            <th scope="col" className={`${thBase} ${thScheduleCol} ${columnSpine}`}>
              {thSchedule}
            </th>
          </tr>
        </thead>
        <tbody className="[&>tr:last-child>td]:border-b-0">
          {rows.map((row) => (
            <tr key={row.item} className="bg-white">
              <td className={tdItem}>{row.item}</td>
              <td className={tdSchedule}>{row.schedule}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const portalThBase =
  "px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-600 sm:px-4";
const portalTdCat =
  "min-w-0 border-b border-slate-200 px-3 py-2.5 align-top text-sm font-medium text-slate-900 break-words sm:px-4";
const portalTdLink = `min-w-0 border-b border-slate-200 px-3 py-2.5 align-top text-sm break-words sm:px-4 ${columnSpine}`;
const portalTdNote =
  "min-w-0 border-b border-slate-200 border-l border-slate-200 px-3 py-2.5 align-top text-sm break-words text-slate-700 sm:px-4";

function CompliancePortalTable({
  thCategory,
  thLink,
  thNote,
  rows,
}: {
  thCategory: string;
  thLink: string;
  thNote: string;
  rows: readonly { label: string; href: string; note: string }[];
}) {
  return (
    <div className="mt-3 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <table className="table-fixed min-w-[22rem] w-full border-collapse text-left">
        <thead>
          <tr className={theadRow}>
            <th scope="col" className={`${portalThBase} ${thItemCol}`}>
              {thCategory}
            </th>
            <th scope="col" className={`${portalThBase} ${portalThLinkCol} ${columnSpine}`}>
              {thLink}
            </th>
            <th scope="col" className={`${portalThBase} ${portalThNoteCol} border-l border-slate-200`}>
              {thNote}
            </th>
          </tr>
        </thead>
        <tbody className="[&>tr:last-child>td]:border-b-0">
          {rows.map((row) => (
            <tr key={row.href} className="bg-white">
              <td className={portalTdCat}>{row.label}</td>
              <td className={portalTdLink}>
                <Link
                  href={row.href}
                  className="break-all text-msv-blue underline decoration-msv-blue/30 underline-offset-2 hover:decoration-msv-blue"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {row.href}
                </Link>
              </td>
              <td className={portalTdNote}>{row.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

type Props = {
  pageCopy: AccountingServicesPageCopy;
};

/** 서비스 페이지 — 인도 법인 컴플라이언스 일정 참고표 (월별·분기별·연도별 동일 격자) */
export function IndiaComplianceScheduleSection({ pageCopy: c }: Props) {
  return (
    <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 sm:p-7">
      <h2 className="text-xl font-bold text-msv-navy">{c.complianceTitle}</h2>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{c.complianceIntro}</p>

      <div className="mt-8 space-y-10">
        <div>
          <h3 className="text-base font-bold tracking-tight text-msv-navy">{c.complianceMonthlyHeading}</h3>
          <ComplianceTable
            caption={c.complianceMonthlyCaption}
            rows={c.complianceMonthlyRows}
            thItem={c.complianceThItem}
            thSchedule={c.complianceThSchedule}
          />
        </div>
        <div>
          <h3 className="text-base font-bold tracking-tight text-msv-navy">{c.complianceQuarterlyHeading}</h3>
          <ComplianceTable
            caption={c.complianceQuarterlyCaption}
            rows={c.complianceQuarterlyRows}
            thItem={c.complianceThItem}
            thSchedule={c.complianceThSchedule}
          />
        </div>
        <div>
          <h3 className="text-base font-bold tracking-tight text-msv-navy">{c.complianceAnnualHeading}</h3>
          <ComplianceTable
            caption={c.complianceAnnualCaption}
            rows={c.complianceAnnualRows}
            thItem={c.complianceThItem}
            thSchedule={c.complianceThSchedule}
          />
        </div>
      </div>

      <div className="mt-10 border-t border-slate-200 pt-8">
        <h3 className="text-base font-bold tracking-tight text-msv-navy">{c.compliancePortalTitle}</h3>
        <p className="mt-1 text-xs leading-relaxed text-slate-500">{c.compliancePortalNote}</p>
        <CompliancePortalTable
          thCategory={c.complianceThCategory}
          thLink={c.complianceThLink}
          thNote={c.complianceThNote}
          rows={c.compliancePortalRows}
        />
      </div>
    </section>
  );
}
