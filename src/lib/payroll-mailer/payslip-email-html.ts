import type { PayrollEmployee } from "@/types/payroll-mailer";
import type { SiteLocale } from "@/lib/site-locale";
import { formatCurrency } from "@/lib/payroll-mailer/payroll";
import { payslipEmailLabels } from "@/lib/i18n/payroll-mailer-locale";
import { buildModernPayslipEmailWrapperHtml } from "@/lib/payroll-mailer/payslip-modern-html";
import { rupeesInWords } from "@/lib/payroll-mailer/payslip-statement";

const money = (amount: number) => `INR ${formatCurrency(amount)}`;

/** Payslip block for email (modern card layout; labels always English). */
export const renderPayslipEmailTable = (employee: PayrollEmployee, locale: SiteLocale): string =>
  buildModernPayslipEmailWrapperHtml(employee, locale);

export const renderPayslipPlainText = (employee: PayrollEmployee, locale: SiteLocale): string => {
  const L = payslipEmailLabels(locale);
  const z = (n: number) => (n === 0 ? L.dash : money(n));
  const lines = [
    `── ${L.salaryStatement} ──`,
    `${L.monthsWorkedSinceJoin}: ${employee.month}`,
    ...(employee.monthDays && employee.paidDays
      ? [
          `${L.monthDays}: ${employee.monthDays}  ${L.paidDays}: ${employee.paidDays}`,
          ...(employee.lwpDays && employee.lwpDays > 0 ? [`${L.lwpDays}: ${employee.lwpDays}`] : []),
        ]
      : []),
    `${L.employeeName}: ${employee.employeeName}  ${L.code}: ${employee.employeeId}`,
    `${L.department}: ${employee.department}`,
    "",
    `[${L.earnings}]`,
    `  ${L.basicSalary}: ${z(employee.basicSalary)}`,
    `  ${L.hra}: ${z(employee.hra)}`,
    `  ${L.otPay}: ${z(employee.otPay)}`,
    ...(employee.dayShiftAllowance > 0 || employee.nightShiftAllowance > 0
      ? [
          ...(employee.dayShiftAllowance > 0
            ? [`  ${L.dayShiftAllowance}: ${money(employee.dayShiftAllowance)}`]
            : []),
          ...(employee.nightShiftAllowance > 0
            ? [`  ${L.nightShiftAllowance}: ${money(employee.nightShiftAllowance)}`]
            : []),
        ]
      : [`  ${L.nightDayShiftAllowance}: ${z(employee.nightDayShiftAllowance)}`]),
    ...(employee.otherAllowance > 0 ? [`  ${L.otherAllowance}: ${z(employee.otherAllowance)}`] : []),
    `  ${L.grossSalary}: ${money(employee.grossSalary)}`,
    "",
    `[${L.deductions}]`,
    `  ${L.pf}: ${z(employee.pf)}`,
    `  ${L.esi}: ${z(employee.esi)}`,
    `  ${L.professionalTax}: ${z(employee.pt)}`,
    `  ${L.tds}: ${z(employee.tds)}`,
    `  ${L.otherDeduction}: ${z(employee.otherDeduction)}`,
    `  ${L.totalDeduction}: ${money(employee.totalDeduction)}`,
    "",
    `${L.netPay}: ${money(employee.netSalary)}`,
    `${L.inWords}: ${rupeesInWords(employee.netSalary)}`,
  ];
  return lines.join("\n");
};
