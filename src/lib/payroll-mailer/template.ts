import type { PayrollEmployee } from "@/types/payroll-mailer";

export type TemplateVariables = {
  employeeName: string;
  employeeId: string;
  department: string;
  designation: string;
  month: string;
  payrollMonth: string;
};

export const variablePattern =
  /\{\{\s*(employeeName|employeeId|department|designation|month|payrollMonth)\s*\}\}/g;

export const getTemplateVariables = (employee: PayrollEmployee): TemplateVariables => ({
  employeeName: employee.employeeName,
  employeeId: employee.employeeId,
  department: employee.department,
  designation: employee.designation,
  month: employee.month,
  payrollMonth: employee.payrollMonth ?? "",
});

export const renderTemplate = (template: string, employee: PayrollEmployee): string => {
  const vars = getTemplateVariables(employee);
  return template.replace(variablePattern, (_, key: keyof TemplateVariables) => vars[key] ?? "");
};
