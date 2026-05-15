import type { PayrollEmployee } from "@/types/payroll-mailer";
import type { SiteLocale } from "@/lib/site-locale";
import { payslipEmailLabels } from "@/lib/i18n/payroll-mailer-locale";
import { formatCurrency } from "@/lib/payroll-mailer/payroll";
import { escapeHtml } from "@/lib/payroll-mailer/html-escape";
import { rupeesInWords } from "@/lib/payroll-mailer/payslip-statement";

const font =
  'Inter,ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans KR","Noto Sans SC",sans-serif';

const money = (n: number) => `INR ${formatCurrency(n)}`;

const cellAmt = (n: number, dash: string) => (n === 0 ? dash : formatCurrency(Math.round(n)));

const rowKV = (a: string, av: string, b: string, bv: string) => `
<tr>
  <td style="padding:6px 8px 6px 0;font-size:12px;color:#64748b;width:22%;">${a}</td>
  <td style="padding:6px 12px 6px 0;font-size:13px;color:#0f172a;width:28%;">${av}</td>
  <td style="padding:6px 8px 6px 0;font-size:12px;color:#64748b;width:22%;">${b}</td>
  <td style="padding:6px 0;font-size:13px;color:#0f172a;">${bv}</td>
</tr>`;

const lineItem = (label: string, amount: string) => `
<tr>
  <td style="padding:8px 12px;font-size:13px;color:#334155;border-bottom:1px solid #f1f5f9;">${label}</td>
  <td style="padding:8px 12px;font-size:13px;color:#0f172a;font-weight:600;text-align:right;border-bottom:1px solid #f1f5f9;">${amount}</td>
</tr>`;

const statementDate = () =>
  new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

/** Compact payslip for email: card layout, soft borders, teal accent (labels always English). */
export function buildModernPayslipInnerHtml(employee: PayrollEmployee): string {
  const L = payslipEmailLabels("en");
  const z = (s: string) => escapeHtml(s);
  const dash = L.dash;
  const join = employee.joiningDate ? z(employee.joiningDate) : dash;
  const bank = employee.bankName ? z(employee.bankName) : dash;
  const ac = employee.bankAccount ? z(employee.bankAccount) : dash;
  const ifsc = employee.ifsc ? z(employee.ifsc) : dash;
  const des = employee.designation ? z(employee.designation) : dash;
  const words = escapeHtml(rupeesInWords(employee.netSalary));

  return `
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:100%;width:100%;margin:0 auto;border-collapse:collapse;font-family:${font};">
  <tr>
    <td style="padding:0;border-radius:16px;overflow:hidden;border:1px solid #e2e8f0;background:#ffffff;box-shadow:0 4px 24px rgba(15,23,42,0.06);">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
        <tr>
          <td style="padding:22px 24px;background:linear-gradient(135deg,#0f766e 0%,#0d9488 45%,#115e59 100%);color:#ffffff;">
            <p style="margin:0;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;opacity:0.9;">${z(L.heroKicker)}</p>
            <p style="margin:8px 0 0;font-size:22px;font-weight:700;line-height:1.2;">${z(L.salaryStatement)}</p>
            <p style="margin:10px 0 0;font-size:12px;opacity:0.88;">${z(L.heroMonthsWorkedCaption)}</p>
            <p style="margin:4px 0 0;font-size:15px;font-weight:600;opacity:0.98;">${z(employee.month)}</p>
          </td>
        </tr>
        <tr>
          <td style="padding:16px 20px 8px;background:#f8fafc;border-bottom:1px solid #e2e8f0;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
              <tr>
                <td width="33.33%" style="padding:10px 8px;text-align:center;border-radius:10px;background:#ffffff;border:1px solid #e2e8f0;">
                  <p style="margin:0;font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:0.06em;">${z(L.summaryGross)}</p>
                  <p style="margin:6px 0 0;font-size:15px;font-weight:700;color:#0f172a;">${money(employee.grossSalary)}</p>
                </td>
                <td width="33.33%" style="padding:10px 8px;text-align:center;">
                  <p style="margin:0;font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:0.06em;">${z(L.summaryDeductions)}</p>
                  <p style="margin:6px 0 0;font-size:15px;font-weight:700;color:#b45309;">${money(employee.totalDeduction)}</p>
                </td>
                <td width="33.33%" style="padding:10px 8px;text-align:center;border-radius:10px;background:#ecfdf5;border:1px solid #a7f3d0;">
                  <p style="margin:0;font-size:11px;color:#047857;text-transform:uppercase;letter-spacing:0.06em;">${z(L.summaryNet)}</p>
                  <p style="margin:6px 0 0;font-size:16px;font-weight:800;color:#065f46;">${money(employee.netSalary)}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:18px 22px 8px;">
            <p style="margin:0 0 10px;font-size:12px;font-weight:700;color:#0f766e;text-transform:uppercase;letter-spacing:0.08em;">${z(L.sectionEmployee)}</p>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
              ${rowKV(z(L.monthsWorkedSinceJoin), z(employee.month), z(L.statementDate), z(statementDate()))}
              ${rowKV(z(L.employeeName), z(employee.employeeName), z(L.code), z(employee.employeeId))}
              ${rowKV(z(L.email), z(employee.email), z(L.designation), des)}
              ${rowKV(z(L.department), z(employee.department), z(L.dateOfJoin), join)}
              ${rowKV(z(L.bank), bank, z(L.accountNumber), ac)}
              ${
                employee.ifsc
                  ? `<tr>
  <td style="padding:6px 8px 6px 0;font-size:12px;color:#64748b;width:22%;">${z(L.ifsc)}</td>
  <td colspan="3" style="padding:6px 0;font-size:13px;color:#0f172a;">${ifsc}</td>
</tr>`
                  : ""
              }
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:8px 22px 20px;">
            <p style="margin:0 0 10px;font-size:12px;font-weight:700;color:#0f766e;text-transform:uppercase;letter-spacing:0.08em;">${z(L.sectionCompensation)}</p>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;">
              <tr>
                <td width="50%" style="vertical-align:top;background:#f8fafc;border-right:1px solid #e2e8f0;">
                  <p style="margin:0;padding:10px 12px;font-size:11px;font-weight:700;color:#475569;text-transform:uppercase;letter-spacing:0.06em;border-bottom:1px solid #e2e8f0;">${z(L.earnings)}</p>
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                    ${lineItem(z(L.basicSalary), cellAmt(employee.basicSalary, dash))}
                    ${lineItem(z(L.hra), cellAmt(employee.hra, dash))}
                    ${lineItem(z(L.otherAllowance), cellAmt(employee.otherAllowance, dash))}
                    ${lineItem(z(L.grossSalary), `<span style="color:#0f766e;">${cellAmt(employee.grossSalary, dash)}</span>`)}
                  </table>
                </td>
                <td width="50%" style="vertical-align:top;background:#ffffff;">
                  <p style="margin:0;padding:10px 12px;font-size:11px;font-weight:700;color:#475569;text-transform:uppercase;letter-spacing:0.06em;border-bottom:1px solid #e2e8f0;">${z(L.deductions)}</p>
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
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:14px;border-collapse:collapse;border-radius:12px;background:linear-gradient(135deg,#ecfdf5,#f0fdf4);border:1px solid #6ee7b7;">
              <tr>
                <td style="padding:16px 18px;">
                  <p style="margin:0 0 4px;font-size:12px;font-weight:600;color:#047857;">${z(L.netPay)}</p>
                  <p style="margin:0;font-size:24px;font-weight:800;color:#065f46;letter-spacing:-0.02em;">${money(employee.netSalary)}</p>
                  <p style="margin:10px 0 0;font-size:12px;color:#166534;line-height:1.5;"><span style="font-weight:600;">${z(L.inWords)}:</span> ${words}</p>
                </td>
              </tr>
            </table>
            <p style="margin:14px 0 0;font-size:11px;color:#94a3b8;text-align:center;line-height:1.5;">${z(L.generatedNote)}</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`.trim();
}

/** Outer wrapper for email (spacing from greeting) */
export function buildModernPayslipEmailWrapperHtml(employee: PayrollEmployee, _locale: SiteLocale): string {
  const inner = buildModernPayslipInnerHtml(employee);
  return `
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;">
  <tr>
    <td style="padding:8px 0 0;">${inner}</td>
  </tr>
</table>`.trim();
}

/** Full PDF document */
export function buildModernPayslipPdfDocumentHtml(employee: PayrollEmployee, _locale: SiteLocale): string {
  const inner = buildModernPayslipInnerHtml(employee);
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <style>
    @page { margin: 14mm 12mm; }
    * { box-sizing: border-box; }
    body { margin: 0; padding: 12px; background: #f8fafc; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  </style>
</head>
<body>
  ${inner}
</body>
</html>`;
}
