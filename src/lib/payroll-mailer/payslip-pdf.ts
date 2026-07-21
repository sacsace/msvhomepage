import type { PayrollEmployee } from "@/types/payroll-mailer";
import { buildModernPayslipPdfDocumentHtml } from "@/lib/payroll-mailer/payslip-modern-html";

/** Puppeteer PDF (modern payslip, same structure as email). Labels always English. */
export const renderPayslipHtml = (employee: PayrollEmployee): string => buildModernPayslipPdfDocumentHtml(employee);
