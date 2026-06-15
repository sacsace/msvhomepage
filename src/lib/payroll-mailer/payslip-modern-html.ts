import type { PayrollEmployee } from "@/types/payroll-mailer";
import type { SiteLocale } from "@/lib/site-locale";
import { payslipEmailLabels } from "@/lib/i18n/payroll-mailer-locale";
import { formatCurrency } from "@/lib/payroll-mailer/payroll";
import { escapeHtml } from "@/lib/payroll-mailer/html-escape";
import { rupeesInWords } from "@/lib/payroll-mailer/payslip-statement";

const font =
  'Inter,ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans KR","Noto Sans SC",sans-serif';

type PayslipDensity = "email" | "pdf";

type DensityStyles = {
  headerPad: string;
  heroTitle: string;
  heroSub: string;
  heroMonth: string;
  summaryPad: string;
  summaryLabel: string;
  summaryGross: string;
  summaryNet: string;
  sectionPad: string;
  sectionTitle: string;
  rowLabelPad: string;
  rowLabel: string;
  rowValue: string;
  compPad: string;
  tableHeadPad: string;
  tableHead: string;
  linePad: string;
  lineFont: string;
  netBoxPad: string;
  netAmount: string;
  netWords: string;
  footerNote: string;
  cardRadius: string;
};

const DENSITY: Record<PayslipDensity, DensityStyles> = {
  email: {
    headerPad: "22px 24px",
    heroTitle: "22px",
    heroSub: "12px",
    heroMonth: "15px",
    summaryPad: "16px 20px 8px",
    summaryLabel: "11px",
    summaryGross: "15px",
    summaryNet: "16px",
    sectionPad: "18px 22px 8px",
    sectionTitle: "12px",
    rowLabelPad: "6px 8px 6px 0",
    rowLabel: "12px",
    rowValue: "13px",
    compPad: "8px 22px 20px",
    tableHeadPad: "10px 12px",
    tableHead: "11px",
    linePad: "8px 12px",
    lineFont: "13px",
    netBoxPad: "16px 18px",
    netAmount: "24px",
    netWords: "12px",
    footerNote: "11px",
    cardRadius: "16px",
  },
  pdf: {
    headerPad: "10px 14px",
    heroTitle: "16px",
    heroSub: "9px",
    heroMonth: "12px",
    summaryPad: "8px 12px 4px",
    summaryLabel: "8px",
    summaryGross: "11px",
    summaryNet: "12px",
    sectionPad: "8px 12px 2px",
    sectionTitle: "9px",
    rowLabelPad: "3px 6px 3px 0",
    rowLabel: "9px",
    rowValue: "10px",
    compPad: "4px 12px 8px",
    tableHeadPad: "5px 8px",
    tableHead: "8px",
    linePad: "4px 8px",
    lineFont: "10px",
    netBoxPad: "8px 10px",
    netAmount: "16px",
    netWords: "9px",
    footerNote: "8px",
    cardRadius: "10px",
  },
};

const money = (n: number) => `INR ${formatCurrency(n)}`;

const cellAmt = (n: number, dash: string) => (n === 0 ? dash : formatCurrency(Math.round(n)));

const statementDate = () =>
  new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

const buildRowKV = (sty: DensityStyles, a: string, av: string, b: string, bv: string) => `
<tr>
  <td style="padding:${sty.rowLabelPad};font-size:${sty.rowLabel};color:#64748b;width:22%;">${a}</td>
  <td style="padding:${sty.rowLabelPad};font-size:${sty.rowValue};color:#0f172a;width:28%;">${av}</td>
  <td style="padding:${sty.rowLabelPad};font-size:${sty.rowLabel};color:#64748b;width:22%;">${b}</td>
  <td style="padding:${sty.rowLabelPad};font-size:${sty.rowValue};color:#0f172a;">${bv}</td>
</tr>`;

const buildShiftEarningLines = (
  employee: PayrollEmployee,
  lineItem: (label: string, amount: string) => string,
  z: (text: string) => string,
  dash: string,
) => {
  const L = payslipEmailLabels("en");
  const usesSplit =
    employee.dayShiftAllowance > 0 || employee.nightShiftAllowance > 0;
  if (usesSplit) {
    let html = "";
    if (employee.dayShiftAllowance > 0) {
      html += lineItem(z(L.dayShiftAllowance), cellAmt(employee.dayShiftAllowance, dash));
    }
    if (employee.nightShiftAllowance > 0) {
      html += lineItem(z(L.nightShiftAllowance), cellAmt(employee.nightShiftAllowance, dash));
    }
    return html;
  }
  return lineItem(z(L.nightDayShiftAllowance), cellAmt(employee.nightDayShiftAllowance, dash));
};

const buildLineItem = (sty: DensityStyles, label: string, amount: string) => `
<tr>
  <td style="padding:${sty.linePad};font-size:${sty.lineFont};color:#334155;border-bottom:1px solid #f1f5f9;">${label}</td>
  <td style="padding:${sty.linePad};font-size:${sty.lineFont};color:#0f172a;font-weight:600;text-align:right;border-bottom:1px solid #f1f5f9;">${amount}</td>
</tr>`;

/** Card layout payslip (labels always English). Use density "pdf" for single-page print. */
export function buildModernPayslipInnerHtml(
  employee: PayrollEmployee,
  density: PayslipDensity = "email",
): string {
  const d = DENSITY[density];
  const L = payslipEmailLabels("en");
  const z = (text: string) => escapeHtml(text);
  const dash = L.dash;
  const join = employee.joiningDate ? z(employee.joiningDate) : dash;
  const bank = employee.bankName ? z(employee.bankName) : dash;
  const ac = employee.bankAccount ? z(employee.bankAccount) : dash;
  const ifsc = employee.ifsc ? z(employee.ifsc) : dash;
  const des = employee.designation ? z(employee.designation) : dash;
  const words = escapeHtml(rupeesInWords(employee.netSalary));
  const rowKV = (a: string, av: string, b: string, bv: string) => buildRowKV(d, a, av, b, bv);
  const lineItem = (label: string, amount: string) => buildLineItem(d, label, amount);
  const rootId = density === "pdf" ? ' id="payslip-pdf-root"' : "";

  return `
<table role="presentation" cellpadding="0" cellspacing="0" width="100%"${rootId} style="max-width:100%;width:100%;margin:0 auto;border-collapse:collapse;font-family:${font};page-break-inside:avoid;break-inside:avoid-page;">
  <tr>
    <td style="padding:0;border-radius:${d.cardRadius};overflow:hidden;border:1px solid #e2e8f0;background:#ffffff;${density === "email" ? "box-shadow:0 4px 24px rgba(15,23,42,0.06);" : ""}">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
        <tr>
          <td style="padding:${d.headerPad};background:linear-gradient(135deg,#0f766e 0%,#0d9488 45%,#115e59 100%);color:#ffffff;">
            <p style="margin:0;font-size:${d.heroSub};letter-spacing:0.12em;text-transform:uppercase;opacity:0.9;">${z(L.heroKicker)}</p>
            <p style="margin:${density === "pdf" ? "4px" : "8px"} 0 0;font-size:${d.heroTitle};font-weight:700;line-height:1.15;">${z(L.salaryStatement)}</p>
            <p style="margin:${density === "pdf" ? "4px" : "10px"} 0 0;font-size:${d.heroSub};opacity:0.88;">${z(L.heroMonthsWorkedCaption)}</p>
            <p style="margin:2px 0 0;font-size:${d.heroMonth};font-weight:600;opacity:0.98;">${z(employee.month)}</p>
          </td>
        </tr>
        <tr>
          <td style="padding:${d.summaryPad};background:#f8fafc;border-bottom:1px solid #e2e8f0;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
              <tr>
                <td width="33.33%" style="padding:6px 4px;text-align:center;border-radius:8px;background:#ffffff;border:1px solid #e2e8f0;">
                  <p style="margin:0;font-size:${d.summaryLabel};color:#64748b;text-transform:uppercase;letter-spacing:0.05em;">${z(L.summaryGross)}</p>
                  <p style="margin:4px 0 0;font-size:${d.summaryGross};font-weight:700;color:#0f172a;">${money(employee.grossSalary)}</p>
                </td>
                <td width="33.33%" style="padding:6px 4px;text-align:center;">
                  <p style="margin:0;font-size:${d.summaryLabel};color:#64748b;text-transform:uppercase;letter-spacing:0.05em;">${z(L.summaryDeductions)}</p>
                  <p style="margin:4px 0 0;font-size:${d.summaryGross};font-weight:700;color:#b45309;">${money(employee.totalDeduction)}</p>
                </td>
                <td width="33.33%" style="padding:6px 4px;text-align:center;border-radius:8px;background:#ecfdf5;border:1px solid #a7f3d0;">
                  <p style="margin:0;font-size:${d.summaryLabel};color:#047857;text-transform:uppercase;letter-spacing:0.05em;">${z(L.summaryNet)}</p>
                  <p style="margin:4px 0 0;font-size:${d.summaryNet};font-weight:800;color:#065f46;">${money(employee.netSalary)}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:${d.sectionPad};">
            <p style="margin:0 0 ${density === "pdf" ? "4px" : "10px"};font-size:${d.sectionTitle};font-weight:700;color:#0f766e;text-transform:uppercase;letter-spacing:0.06em;">${z(L.sectionEmployee)}</p>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
              ${rowKV(z(L.monthsWorkedSinceJoin), z(employee.month), z(L.statementDate), z(statementDate()))}
              ${
                employee.monthDays && employee.paidDays
                  ? rowKV(
                      z(L.monthDays),
                      String(employee.monthDays),
                      z(L.paidDays),
                      String(employee.paidDays),
                    ) +
                    (employee.lwpDays && employee.lwpDays > 0
                      ? rowKV(z(L.lwpDays), String(employee.lwpDays), z(L.dash), dash)
                      : "")
                  : ""
              }
              ${rowKV(z(L.employeeName), z(employee.employeeName), z(L.code), z(employee.employeeId))}
              ${rowKV(z(L.email), z(employee.email), z(L.designation), des)}
              ${rowKV(z(L.department), z(employee.department), z(L.dateOfJoin), join)}
              ${rowKV(z(L.bank), bank, z(L.accountNumber), ac)}
              ${
                employee.ifsc
                  ? `<tr>
  <td style="padding:${d.rowLabelPad};font-size:${d.rowLabel};color:#64748b;width:22%;">${z(L.ifsc)}</td>
  <td colspan="3" style="padding:${d.rowLabelPad};font-size:${d.rowValue};color:#0f172a;">${ifsc}</td>
</tr>`
                  : ""
              }
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:${d.compPad};">
            <p style="margin:0 0 ${density === "pdf" ? "4px" : "10px"};font-size:${d.sectionTitle};font-weight:700;color:#0f766e;text-transform:uppercase;letter-spacing:0.06em;">${z(L.sectionCompensation)}</p>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-radius:8px;overflow:hidden;border:1px solid #e2e8f0;">
              <tr>
                <td width="50%" style="vertical-align:top;background:#f8fafc;border-right:1px solid #e2e8f0;">
                  <p style="margin:0;padding:${d.tableHeadPad};font-size:${d.tableHead};font-weight:700;color:#475569;text-transform:uppercase;letter-spacing:0.05em;border-bottom:1px solid #e2e8f0;">${z(L.earnings)}</p>
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                    ${lineItem(z(L.basicSalary), cellAmt(employee.basicSalary, dash))}
                    ${lineItem(z(L.hra), cellAmt(employee.hra, dash))}
                    ${lineItem(z(L.otPay), cellAmt(employee.otPay, dash))}
                    ${buildShiftEarningLines(employee, lineItem, z, dash)}
                    ${
                      employee.otherAllowance > 0
                        ? lineItem(z(L.otherAllowance), cellAmt(employee.otherAllowance, dash))
                        : ""
                    }
                    ${lineItem(z(L.grossSalary), `<span style="color:#0f766e;">${cellAmt(employee.grossSalary, dash)}</span>`)}
                  </table>
                </td>
                <td width="50%" style="vertical-align:top;background:#ffffff;">
                  <p style="margin:0;padding:${d.tableHeadPad};font-size:${d.tableHead};font-weight:700;color:#475569;text-transform:uppercase;letter-spacing:0.05em;border-bottom:1px solid #e2e8f0;">${z(L.deductions)}</p>
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                    ${lineItem(z(L.pf), cellAmt(employee.pf, dash))}
                    ${lineItem(z(L.esi), cellAmt(employee.esi, dash))}
                    ${lineItem(z(L.professionalTax), cellAmt(employee.pt, dash))}
                    ${lineItem(z(L.tds), cellAmt(employee.tds, dash))}
                    ${lineItem(z(L.otherDeduction), cellAmt(employee.otherDeduction, dash))}
                    ${lineItem(z(L.totalDeduction), `<span style="color:#b45309;">${cellAmt(employee.totalDeduction, dash)}</span>`)}
                  </table>
                </td>
              </tr>
            </table>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:${density === "pdf" ? "6px" : "14px"};border-collapse:collapse;border-radius:8px;background:linear-gradient(135deg,#ecfdf5,#f0fdf4);border:1px solid #6ee7b7;">
              <tr>
                <td style="padding:${d.netBoxPad};">
                  <p style="margin:0 0 2px;font-size:${d.netWords};font-weight:600;color:#047857;">${z(L.netPay)}</p>
                  <p style="margin:0;font-size:${d.netAmount};font-weight:800;color:#065f46;letter-spacing:-0.02em;line-height:1.1;">${money(employee.netSalary)}</p>
                  <p style="margin:${density === "pdf" ? "4px" : "10px"} 0 0;font-size:${d.netWords};color:#166534;line-height:1.35;"><span style="font-weight:600;">${z(L.inWords)}:</span> ${words}</p>
                </td>
              </tr>
            </table>
            <p style="margin:${density === "pdf" ? "6px" : "14px"} 0 0;font-size:${d.footerNote};color:#94a3b8;text-align:center;line-height:1.3;">${z(L.generatedNote)}</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`.trim();
}

/** Outer wrapper for email (spacing from greeting) */
export function buildModernPayslipEmailWrapperHtml(employee: PayrollEmployee, _locale: SiteLocale): string {
  const inner = buildModernPayslipInnerHtml(employee, "email");
  return `
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;">
  <tr>
    <td style="padding:8px 0 0;">${inner}</td>
  </tr>
</table>`.trim();
}

/** Full PDF document — compact layout, single A4 page */
export function buildModernPayslipPdfDocumentHtml(employee: PayrollEmployee, _locale: SiteLocale): string {
  const inner = buildModernPayslipInnerHtml(employee, "pdf");
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <style>
    @page { size: A4 portrait; margin: 0; }
    * { box-sizing: border-box; }
    html, body {
      margin: 0;
      padding: 0;
      width: 210mm;
      height: 297mm;
      overflow: hidden;
      background: #ffffff;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    body {
      display: flex;
      align-items: flex-start;
      justify-content: center;
      padding: 8mm 10mm 10mm;
    }
    #payslip-pdf-root {
      width: 100%;
      max-width: 190mm;
      page-break-inside: avoid;
      break-inside: avoid-page;
    }
  </style>
</head>
<body>
  ${inner}
</body>
</html>`;
}
