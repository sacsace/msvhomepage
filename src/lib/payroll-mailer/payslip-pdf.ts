import type { PayrollEmployee } from "@/types/payroll-mailer";
import type { SiteLocale } from "@/lib/site-locale";
import { buildModernPayslipPdfDocumentHtml } from "@/lib/payroll-mailer/payslip-modern-html";

/** Puppeteer PDF (modern payslip, same structure as email, localized). */
export const renderPayslipHtml = (employee: PayrollEmployee, locale: SiteLocale = "ko"): string =>
  buildModernPayslipPdfDocumentHtml(employee, locale);
