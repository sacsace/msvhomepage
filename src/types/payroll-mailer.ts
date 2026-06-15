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
  /** MSV: 월 총 일수(N), 유급 일수(M) — unpaid leave 반영 시 */
  monthDays?: number;
  paidDays?: number;
  lwpDays?: number;
  basicSalary: number;
  hra: number;
  /** MSV: OT/ Hour × OT/ Rate (또는 OT Pay 열 표시값) */
  otPay: number;
  /** MSV: Day Shift 횟수×100 + Night Shift 횟수×150 (또는 구형 합산 열) */
  dayShiftAllowance: number;
  nightShiftAllowance: number;
  /** day+night 합계; 구형 시트는 Night/Day Shift Allowance 열 값만 */
  nightDayShiftAllowance: number;
  /** Legacy lump or MSV extras not in OT / shift allowances */
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

export type PayrollComposeSettings = {
  defaultCc: string;
};

export const EMPTY_COMPOSE_SETTINGS: PayrollComposeSettings = {
  defaultCc: "",
};

/** 제목/본문·기본 참조(CC) — sessionStorage */
export const COMPOSE_STORAGE_KEY = "payroll-mailer-compose-settings";
