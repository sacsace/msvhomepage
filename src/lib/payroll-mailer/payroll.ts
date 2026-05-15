import * as XLSX from "xlsx";
import type { ParsePayrollResult, PayrollEmployee, PayrollIssue } from "@/types/payroll-mailer";

/**
 * Payroll sheet: header row number (1-based).
 * Rows 1-2 meta; row 3 headers; data from row 4.
 */
export const PAYROLL_HEADER_ROW_1_BASED = 3;

/** Legacy template (Month column). */
const LEGACY_REQUIRED_COLUMNS = [
  "Employee Name",
  "Employee ID",
  "Email",
  "Designation",
  "Department",
  "Month",
  "Basic Salary",
  "HRA",
  "Other Allowance",
  "Gross Salary",
  "PF",
  "ESI",
  "PT",
  "TDS",
  "Other Deduction",
  "Total Deduction",
  "Net Salary",
] as const;

/** MSV template (NAME ... Net Salary Payable). */
const MSV_REQUIRED_COLUMNS = [
  "NAME",
  "Emp ID",
  "Email",
  "Department",
  /** Months worked since hire (not always same as pay month). */
  "Working Month",
  "Basic Salary",
  "HRA",
  "PF Employee Contribution",
  "ESIC Employee Contribution",
  "TDS",
  "PT",
  "Advance payment amount",
  "Net Salary Payable",
] as const;

const numberFormatter = new Intl.NumberFormat("en-IN", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const toSafeString = (value: unknown) => String(value ?? "").trim();

const toNumber = (value: unknown) => {
  if (typeof value === "number") return value;
  const parsed = Number(toSafeString(value).replace(/,/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
};

const nearlyEqual = (a: number, b: number, tolerance = 0.01) => Math.abs(a - b) <= tolerance;

const createIssue = (rowNumber: number, severity: PayrollIssue["severity"], message: string): PayrollIssue => ({
  rowNumber,
  severity,
  message,
});

/** Normalize Excel header keys: newlines to spaces, collapse spaces, trim */
const normalizeHeaderKey = (key: string) =>
  key
    .replace(/\r\n/g, " ")
    .replace(/\r/g, " ")
    .replace(/\n/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const normalizeRowKeys = (row: Record<string, unknown>): Record<string, unknown> => {
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(row)) {
    out[normalizeHeaderKey(key)] = value;
  }
  return out;
};

/** Map common header typos to canonical column names (values unchanged). */
const HEADER_KEY_ALIASES: Record<string, string> = {
  HRD: "HRA",
};

const applyColumnAliases = (row: Record<string, unknown>): Record<string, unknown> => {
  const out = { ...row };
  for (const [alias, canonical] of Object.entries(HEADER_KEY_ALIASES)) {
    if (!(canonical in out) && alias in out) {
      out[canonical] = out[alias];
      delete out[alias];
    }
  }
  return out;
};

const detectTemplate = (headers: string[]): "msv" | "legacy" | null => {
  const has = (c: string) => headers.includes(c);
  if (MSV_REQUIRED_COLUMNS.every((c) => has(c))) return "msv";
  if (LEGACY_REQUIRED_COLUMNS.every((c) => has(c))) return "legacy";
  return null;
};

const formatMissingError = (headers: string[]) => {
  const has = (c: string) => headers.includes(c);
  const msvMissing = MSV_REQUIRED_COLUMNS.filter((c) => !has(c));
  const legacyMissing = LEGACY_REQUIRED_COLUMNS.filter((c) => !has(c));
  return [
    "Missing required column names. Compare row 3 headers with the lists below.",
    "",
    `[MSV] missing: ${msvMissing.length ? msvMissing.join(", ") : "(none)"}`,
    `[Legacy] missing: ${legacyMissing.length ? legacyMissing.join(", ") : "(none)"}`,
    "",
    `Headers read from row ${PAYROLL_HEADER_ROW_1_BASED}: ${headers.slice(0, 12).join(", ")}${headers.length > 12 ? ", ..." : ""}`,
  ].join("\n");
};

export const getRequiredColumns = () => [...MSV_REQUIRED_COLUMNS];

export const readPayrollWorkbook = (buffer: ArrayBuffer, password?: string): XLSX.WorkBook => {
  try {
    return XLSX.read(buffer, {
      type: "array",
      ...(password ? { password } : {}),
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    if (/password-protected|password protected|Unsupported password|ECMA-376 Extensible|\/encryption/i.test(msg)) {
      throw new Error(
        "Workbook is password-protected. Remove the open password in Excel, save as .xlsx, and upload again.",
      );
    }
    throw new Error(msg || "Failed to read file.");
  }
};

export const getWorkbookSheetNames = (workbook: XLSX.WorkBook): string[] =>
  (workbook.SheetNames ?? []).filter((name) => typeof name === "string" && name.length > 0);

const mapLegacyRow = (row: Record<string, unknown>, rowNumber: number): PayrollEmployee => {
  const payMonth = toSafeString(row["Month"]);
  return {
    rowNumber,
    employeeName: toSafeString(row["Employee Name"]),
    employeeId: toSafeString(row["Employee ID"]),
    email: toSafeString(row["Email"]),
    designation: toSafeString(row["Designation"]),
    department: toSafeString(row["Department"]),
    month: payMonth,
    payrollMonth: payMonth || undefined,
    basicSalary: toNumber(row["Basic Salary"]),
    hra: toNumber(row["HRA"]),
    otherAllowance: toNumber(row["Other Allowance"]),
    grossSalary: toNumber(row["Gross Salary"]),
    pf: toNumber(row["PF"]),
    esi: toNumber(row["ESI"]),
    pt: toNumber(row["PT"]),
    tds: toNumber(row["TDS"]),
    otherDeduction: toNumber(row["Other Deduction"]),
    totalDeduction: toNumber(row["Total Deduction"]),
    netSalary: toNumber(row["Net Salary"]),
  };
};

const mapMsvRow = (row: Record<string, unknown>, rowNumber: number): PayrollEmployee => {
  const otHours = toNumber(row["OT/ Hour"]);
  const otRate = toNumber(row["OT/ Rate"]);
  const nightShift = toNumber(row["Night Shift Allowance"]);
  const otPay = otHours * otRate;
  const otherAllowance = otPay + nightShift;

  const basicSalary = toNumber(row["Basic Salary"]);
  const hra = toNumber(row["HRA"]);
  const computedGross = basicSalary + hra + otherAllowance;
  /** When present, Excel "Sum Total" wins over Basic+HRA+OT (rounding differences). */
  const sumTotal = toNumber(row["Sum Total"]);
  const grossSalary = sumTotal > 0 ? sumTotal : computedGross;

  const pf = toNumber(row["PF Employee Contribution"]);
  const esi = toNumber(row["ESIC Employee Contribution"]);
  const pt = toNumber(row["PT"]);
  const tds = toNumber(row["TDS"]);
  const advance = toNumber(row["Advance payment amount"]);
  const contribution = toNumber(row["Contribution"]);
  const employeeContribution = toNumber(row["Employee Contribution"]);
  const otherDeduction = advance + contribution + employeeContribution;
  const totalDeduction = pf + esi + pt + tds + otherDeduction;
  const netSalary = toNumber(row["Net Salary Payable"]);

  const bankAccount = toSafeString(row["A/C"]);
  const ifsc = toSafeString(row["IFSC"]);
  const bankName = toSafeString(row["Bank"]);
  const joiningDate = toSafeString(row["Joining Date"]);
  const payrollMonth =
    toSafeString(row["Payroll Month"] || row["Payroll month"] || row["Pay Month"] || row["Pay month"]) || undefined;

  return {
    rowNumber,
    employeeName: toSafeString(row["NAME"]),
    employeeId: toSafeString(row["Emp ID"]),
    email: toSafeString(row["Email"]),
    designation: "",
    department: toSafeString(row["Department"]),
    month: toSafeString(row["Working Month"]),
    ...(payrollMonth ? { payrollMonth } : {}),
    basicSalary,
    hra,
    otherAllowance,
    grossSalary,
    pf,
    esi,
    pt,
    tds,
    otherDeduction,
    totalDeduction,
    netSalary,
    ...(bankAccount ? { bankAccount } : {}),
    ...(ifsc ? { ifsc } : {}),
    ...(bankName ? { bankName } : {}),
    ...(joiningDate ? { joiningDate } : {}),
  };
};

const runValidations = (employee: PayrollEmployee, template: "msv" | "legacy") => {
  const issues: PayrollIssue[] = [];
  const fmt = (n: number) => numberFormatter.format(n);

  const grossFromParts = employee.basicSalary + employee.hra + employee.otherAllowance;
  const grossTol = template === "msv" ? 5 : 0.01;
  if (!nearlyEqual(grossFromParts, employee.grossSalary, grossTol)) {
    issues.push(
      createIssue(
        employee.rowNumber,
        "warning",
        template === "msv"
          ? `Gross mismatch: Basic + HRA + (OT pay + night shift) = ${fmt(grossFromParts)}, sheet Gross / Sum Total = ${fmt(employee.grossSalary)}`
          : `Gross Salary mismatch (sum of parts ${fmt(grossFromParts)} / sheet ${fmt(employee.grossSalary)})`,
      ),
    );
  }

  const deductionFromParts = employee.pf + employee.esi + employee.pt + employee.tds + employee.otherDeduction;
  if (!nearlyEqual(deductionFromParts, employee.totalDeduction)) {
    issues.push(
      createIssue(
        employee.rowNumber,
        "warning",
        template === "msv"
          ? `Total deduction mismatch: PF + ESIC + PT + TDS + other deductions = ${fmt(deductionFromParts)}, sheet Total = ${fmt(employee.totalDeduction)}`
          : `Total Deduction mismatch (sum ${fmt(deductionFromParts)} / sheet ${fmt(employee.totalDeduction)})`,
      ),
    );
  }

  const netFromFormula = employee.grossSalary - employee.totalDeduction;
  if (!nearlyEqual(netFromFormula, employee.netSalary)) {
    issues.push(
      createIssue(
        employee.rowNumber,
        "error",
        template === "msv"
          ? `Net Salary Payable mismatch: Gross (${fmt(employee.grossSalary)}) - Total deductions (${fmt(employee.totalDeduction)}) = ${fmt(netFromFormula)}, sheet Net Salary Payable = ${fmt(employee.netSalary)}`
          : `Net Salary mismatch: Gross - Total deductions = ${fmt(netFromFormula)}, sheet Net Salary = ${fmt(employee.netSalary)}`,
      ),
    );
  }

  return issues;
};

export const parsePayrollWorkbook = (workbook: XLSX.WorkBook, sheetName: string): ParsePayrollResult => {
  const sheet = workbook.Sheets[sheetName];
  if (!sheet) {
    throw new Error(`Sheet not found: ${sheetName}`);
  }

  const headerRow0Based = PAYROLL_HEADER_ROW_1_BASED - 1;

  const rawRows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, {
    defval: "",
    raw: false,
    range: headerRow0Based,
  });

  const rows = rawRows.map((r) => applyColumnAliases(normalizeRowKeys(r)));

  if (!rows.length) {
    throw new Error(`No data rows in sheet "${sheetName}".`);
  }

  const headers = Object.keys(rows[0]);
  const template = detectTemplate(headers);
  if (!template) {
    throw new Error(formatMissingError(headers));
  }

  const employees: PayrollEmployee[] = [];
  const excludedEmployees: ParsePayrollResult["excludedEmployees"] = [];
  const issues: PayrollIssue[] = [];
  let month = "";

  rows.forEach((row, index) => {
    const rowNumber = PAYROLL_HEADER_ROW_1_BASED + 1 + index;
    const employee =
      template === "msv" ? mapMsvRow(row, rowNumber) : mapLegacyRow(row, rowNumber);

    if (!employee.employeeName && !employee.employeeId) {
      return;
    }

    if (!month && employee.month) {
      month = employee.month;
    }

    if (!employee.email) {
      excludedEmployees.push({
        rowNumber,
        employeeName: employee.employeeName || "(no name)",
        employeeId: employee.employeeId || "(no id)",
        reason: "No email",
      });
      issues.push(createIssue(rowNumber, "warning", "No email address; excluded from send list."));
      return;
    }

    issues.push(...runValidations(employee, template));
    employees.push(employee);
  });

  return {
    sheetName,
    template,
    employees,
    excludedEmployees,
    issues,
    month,
  };
};

export const parsePayrollFromBuffer = (
  buffer: ArrayBuffer,
  sheetName: string,
  password?: string,
): ParsePayrollResult => {
  const workbook = readPayrollWorkbook(buffer, password);
  return parsePayrollWorkbook(workbook, sheetName);
};

export const formatCurrency = (value: number) => numberFormatter.format(value);
