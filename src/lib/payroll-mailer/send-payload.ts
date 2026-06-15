import type { z } from "zod";
import type { PayrollEmployee, SmtpSettings } from "@/types/payroll-mailer";

const finiteNumber = (value: unknown, fallback = 0): number => {
  const n = typeof value === "number" ? value : Number(value);
  return Number.isFinite(n) ? n : fallback;
};

export const normalizeSmtpForSendApi = (smtp: SmtpSettings): SmtpSettings => ({
  host: smtp.host.trim(),
  port: Math.trunc(finiteNumber(smtp.port, 587)) || 587,
  secure: Boolean(smtp.secure),
  user: smtp.user.trim(),
  pass: smtp.pass,
  from: smtp.from.trim(),
});

export const normalizeEmployeeForSendApi = (employee: PayrollEmployee): PayrollEmployee => ({
  ...employee,
  employeeName: employee.employeeName.trim(),
  employeeId: employee.employeeId.trim(),
  email: employee.email.trim(),
  designation: employee.designation.trim(),
  department: employee.department.trim(),
  month: employee.month.trim(),
  basicSalary: finiteNumber(employee.basicSalary),
  hra: finiteNumber(employee.hra),
  otPay: finiteNumber(employee.otPay),
  dayShiftAllowance: finiteNumber(employee.dayShiftAllowance),
  nightShiftAllowance: finiteNumber(employee.nightShiftAllowance),
  nightDayShiftAllowance: finiteNumber(employee.nightDayShiftAllowance),
  otherAllowance: finiteNumber(employee.otherAllowance),
  grossSalary: finiteNumber(employee.grossSalary),
  pf: finiteNumber(employee.pf),
  esi: finiteNumber(employee.esi),
  pt: finiteNumber(employee.pt),
  tds: finiteNumber(employee.tds),
  otherDeduction: finiteNumber(employee.otherDeduction),
  totalDeduction: finiteNumber(employee.totalDeduction),
  netSalary: finiteNumber(employee.netSalary),
});

const FIELD_LABELS_KO: Record<string, string> = {
  host: "SMTP Host",
  port: "SMTP Port",
  user: "SMTP User",
  pass: "SMTP Password",
  from: "발신자(From)",
  email: "이메일",
  employees: "직원 목록",
  smtp: "SMTP 설정",
  subjectTemplate: "메일 제목",
  bodyTemplate: "메일 본문",
  defaultCc: "기본 참조(CC)",
};

export function describeSendValidationError(error: z.ZodError): string {
  const issue = error.issues[0];
  if (!issue) return "요청 데이터가 올바르지 않습니다.";

  const path = issue.path;
  if (path[0] === "employees" && typeof path[1] === "number") {
    const index = path[1];
    const field = typeof path[2] === "string" ? path[2] : "";
    const label = FIELD_LABELS_KO[field] ?? field;
    return `발송 요청 검증 실패: ${index + 1}번째 직원${label ? ` · ${label}` : ""} — ${issue.message}`;
  }

  const field = typeof path[path.length - 1] === "string" ? String(path[path.length - 1]) : "";
  const label = FIELD_LABELS_KO[field] ?? field;
  if (field === "port") {
    return "SMTP Port는 숫자여야 합니다. 메일 환경 설정에서 포트를 확인한 뒤 다시 저장·발송하세요.";
  }
  if (label) return `발송 요청 검증 실패: ${label} — ${issue.message}`;
  return `발송 요청 검증 실패: ${issue.message}`;
}
