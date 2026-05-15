/** 급여 명세서 이메일 발송 도구 — Prisma/DB와 무관 */

export type PayrollEmployee = {
  rowNumber: number;
  employeeName: string;
  employeeId: string;
  email: string;
  designation: string;
  department: string;
  month: string;
  /** Pay period label (e.g. "March 2025"). MSV: optional "Payroll Month" / "Pay Month" column; legacy: same as Month. */
  payrollMonth?: string;
  basicSalary: number;
  hra: number;
  otherAllowance: number;
  grossSalary: number;
  pf: number;
  esi: number;
  pt: number;
  tds: number;
  otherDeduction: number;
  totalDeduction: number;
  netSalary: number;
  bankAccount?: string;
  ifsc?: string;
  bankName?: string;
  joiningDate?: string;
};

export type ExcludedEmployee = {
  rowNumber: number;
  employeeName: string;
  employeeId: string;
  reason: string;
};

export type PayrollIssue = {
  rowNumber: number;
  severity: "warning" | "error";
  message: string;
};

export type ParsePayrollResult = {
  sheetName: string;
  template: "msv" | "legacy";
  employees: PayrollEmployee[];
  excludedEmployees: ExcludedEmployee[];
  issues: PayrollIssue[];
  month: string;
};

export type SendResult = {
  employeeId: string;
  employeeName: string;
  email: string;
  success: boolean;
  message: string;
};

export type SmtpSettings = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  from: string;
};

export const EMPTY_SMTP_SETTINGS: SmtpSettings = {
  host: "",
  port: 587,
  secure: false,
  user: "",
  pass: "",
  from: "",
};

/** Tescom payroll-mailer와 동일 키 */
export const SMTP_STORAGE_KEY = "payroll-mailer-smtp-settings";
