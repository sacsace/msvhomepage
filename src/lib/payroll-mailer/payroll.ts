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

/** raw:true 파싱 시 Joining Date 등 Excel 직렬 날짜 → M/D/YY */
const formatExcelDateValue = (value: unknown): string => {
  if (typeof value === "number" && value >= 25569 && value <= 60000) {
    const parts = XLSX.SSF.parse_date_code(value);
    if (parts) {
      const y = String(parts.y);
      const yy = y.length === 4 ? y.slice(-2) : y;
      return `${parts.m}/${parts.d}/${yy}`;
    }
  }
  return toSafeString(value);
};

const toNumber = (value: unknown) => {
  if (typeof value === "number") return value;
  const parsed = Number(toSafeString(value).replace(/,/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
};

const nearlyEqual = (a: number, b: number, tolerance = 0.01) => Math.abs(a - b) <= tolerance;

/** Excel ROUNDDOWN — 양수 급여는 floor와 동일 */
const roundDown0 = (n: number) => (n >= 0 ? Math.floor(n) : Math.ceil(n));

type PaidDayRatio = {
  paidDays: number;
  monthDays: number;
  ratio: number;
};

const MONTH_DAYS_KEYS = [
  "Total Day of Month",
  "Month Days",
  "Days in Month",
  "Max Payable Days",
  "Total Month Days",
  "Calendar Days",
] as const;

const PAID_DAYS_KEYS = [
  "Days Worked",
  "Net Paid Days",
  "Paid Days",
  "Present Days",
  "Total Paid Days",
  "Payable Days",
] as const;

const LWP_KEYS = ["LWP", "Unpaid Leave", "Leave Without Pay", "Unpaid Holidays"] as const;

const readFirstNumeric = (row: Record<string, unknown>, keys: readonly string[]): number => {
  for (const key of keys) {
    if (key in row) return toNumber(row[key]);
  }
  return 0;
};

/**
 * Tescom Sum Total (May/2026):
 * (Days Worked × Total Salary / Total Day of Month) + OT/Hour × OT/Rate + shift + Transport.
 * OT/Rate = Basic Salary / 26 / 8 × 2. Day Shift>0 → Day×100 + Night×150; else Night×50 only.
 */
const readPaidDayRatio = (row: Record<string, unknown>): PaidDayRatio => {
  const monthDays = readFirstNumeric(row, MONTH_DAYS_KEYS);
  let paidDays = readFirstNumeric(row, PAID_DAYS_KEYS);
  const lwp = readFirstNumeric(row, LWP_KEYS);
  if (paidDays <= 0 && monthDays > 0) {
    if (lwp > 0) paidDays = Math.max(0, monthDays - lwp);
    else if (monthDays > 0) paidDays = monthDays;
  }
  if (monthDays > 0 && paidDays > 0) {
    return { paidDays, monthDays, ratio: paidDays / monthDays };
  }
  return { paidDays: paidDays || 0, monthDays: monthDays || 0, ratio: 1 };
};

/** Tescom: P×M/N — ROUNDDOWN 없이 정확한 비율 곱 */
const prorateExact = (amount: number, { ratio, monthDays, paidDays }: PaidDayRatio): number => {
  if (amount === 0 || ratio === 1) return amount;
  if (monthDays > 0 && paidDays > 0) return (amount * paidDays) / monthDays;
  return amount * ratio;
};

/** Tescom 등: 「Total Salary」= Basic + HRA */
const readTotalSalary = (row: Record<string, unknown>): number => {
  const fromColumn = toNumber(row["Total Salary"]);
  if (fromColumn > 0) return fromColumn;
  return toNumber(row["Basic Salary"]) + toNumber(row["HRA"]);
};

/** 일할 총급여를 Basic/HRA 비율로 나눠 명세서에 표시 (합 = Total Salary×유급비율) */
const splitProratedTotalSalary = (
  proratedTotal: number,
  basicFull: number,
  hraFull: number,
  totalFull: number,
): { basicSalary: number; hra: number } => {
  if (proratedTotal <= 0 || totalFull <= 0) {
    return { basicSalary: basicFull, hra: hraFull };
  }
  const basicSalary = proratedTotal * (basicFull / totalFull);
  return { basicSalary, hra: proratedTotal - basicSalary };
};

const createIssue = (rowNumber: number, severity: PayrollIssue["severity"], message: string): PayrollIssue => ({
  rowNumber,
  severity,
  message,
});

/** Normalize Excel header keys: newlines, slash spacing (OT/Rate → OT / Rate), collapse spaces */
const normalizeHeaderKey = (key: string) =>
  key
    .replace(/\r\n/g, " ")
    .replace(/\r/g, " ")
    .replace(/\n/g, " ")
    .replace(/\s*\/\s*/g, " / ")
    .replace(/\s+/g, " ")
    .trim();

const normalizeRowKeys = (row: Record<string, unknown>): Record<string, unknown> => {
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(row)) {
    out[normalizeHeaderKey(key)] = value;
  }
  return out;
};

/** Map common header typos / alternate labels to canonical column names (values unchanged). */
const HEADER_KEY_ALIASES: Record<string, string> = {
  HRD: "HRA",
  "House Rent Allowance": "HRA",
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

const DAY_SHIFT_COUNT_KEYS = ["Day Shift", "Day shift"] as const;
const NIGHT_SHIFT_COUNT_KEYS = ["Night Shift", "Night shift"] as const;
const DAY_SHIFT_RATE = 100;
/** Day Shift>0 인 행: Night×150 / Day×100 */
const NIGHT_SHIFT_RATE_WITH_DAY = 150;
/** Day Shift=0 인 행 (May/2026 Tescom): Night×50 only */
const NIGHT_SHIFT_RATE_SOLO = 50;

const NIGHT_DAY_SHIFT_LUMP_COLUMN_KEYS = [
  "Night / Day Shift Allowance",
  "Night / Day shift allowance",
  "Night / Day Shift allowance",
  "Night / Day shift Allowance",
] as const;

type ShiftAllowances = {
  dayShiftAllowance: number;
  nightShiftAllowance: number;
  nightDayShiftAllowance: number;
};

/** 구형: Night/Day Shift Allowance 금액 열 합산 */
const readNightDayShiftLump = (row: Record<string, unknown>): number => {
  for (const key of NIGHT_DAY_SHIFT_LUMP_COLUMN_KEYS) {
    if (key in row) return toNumber(row[key]);
  }
  for (const [key, value] of Object.entries(row)) {
    const k = key.toLowerCase();
    if (k.includes("night") && k.includes("day") && k.includes("shift") && k.includes("allow")) {
      return toNumber(value);
    }
  }
  const nightOnly = toNumber(row["Night Shift Allowance"]);
  const dayOnly = toNumber(
    row["Day Shift Allowance"] ??
      row["Day shift allowance"] ??
      row["Day Shift allowance"] ??
      row["Day shift Allowance"],
  );
  return nightOnly + dayOnly;
};

/**
 * Tescom May/2026 Sum Total 수식:
 * - Day Shift>0: (T×150)+(S×100)
 * - Day Shift=0: (T×50) only
 */
const readShiftAllowances = (row: Record<string, unknown>): ShiftAllowances => {
  const hasCountCols =
    DAY_SHIFT_COUNT_KEYS.some((key) => key in row) || NIGHT_SHIFT_COUNT_KEYS.some((key) => key in row);
  if (hasCountCols) {
    const dayCount = readFirstNumeric(row, DAY_SHIFT_COUNT_KEYS);
    const nightCount = readFirstNumeric(row, NIGHT_SHIFT_COUNT_KEYS);
    if (dayCount > 0) {
      const dayShiftAllowance = dayCount * DAY_SHIFT_RATE;
      const nightShiftAllowance = nightCount * NIGHT_SHIFT_RATE_WITH_DAY;
      return {
        dayShiftAllowance,
        nightShiftAllowance,
        nightDayShiftAllowance: dayShiftAllowance + nightShiftAllowance,
      };
    }
    const nightShiftAllowance = nightCount * NIGHT_SHIFT_RATE_SOLO;
    return { dayShiftAllowance: 0, nightShiftAllowance, nightDayShiftAllowance: nightShiftAllowance };
  }
  const lump = readNightDayShiftLump(row);
  return { dayShiftAllowance: 0, nightShiftAllowance: 0, nightDayShiftAllowance: lump };
};

const OT_PAY_COLUMN_KEYS = ["OT Pay", "OT pay", "OT Amount"] as const;

const OT_HOUR_KEYS = ["OT/ Hour", "OT / Hour", "OT Hour", "OT/Hour"] as const;
const OT_RATE_KEYS = ["OT/ Rate", "OT / Rate", "OT Rate", "OT/Rate"] as const;

const OTHER_ALLOWANCE_KEYS = [
  "Other Allowance",
  "Transport / Travel Allowance",
  "Transport/ Travel Allowance",
  "Transport Allowance",
  "Travel Allowance",
] as const;

/** Excel OT/Rate = Basic Salary / 26 / 8 × 2 (셀 표시는 정수로 잘림) */
const readOtRate = (row: Record<string, unknown>): number => {
  const basic = toNumber(row["Basic Salary"]);
  if (basic > 0) return (basic / 26 / 8) * 2;
  return readFirstNumeric(row, OT_RATE_KEYS);
};

/** OT Pay 열이 있으면 표시값, 없으면 OT/Hour × OT/Rate */
const readOtPay = (row: Record<string, unknown>): number => {
  for (const key of OT_PAY_COLUMN_KEYS) {
    if (key in row) return toNumber(row[key]);
  }
  let hours = readFirstNumeric(row, OT_HOUR_KEYS);
  for (const [key, value] of Object.entries(row)) {
    const k = key.toLowerCase();
    if (hours <= 0 && k.includes("ot") && k.includes("hour")) hours = toNumber(value);
    if (k.includes("ot") && (k.includes("pay") || k.includes("amount"))) {
      const direct = toNumber(value);
      if (direct > 0) return direct;
    }
  }
  const rate = readOtRate(row);
  if (hours > 0 && rate > 0) return hours * rate;
  return 0;
};

/** Sum Total에 포함되는 기타 수당(Transport / Travel Allowance 등) */
const readOtherAllowance = (row: Record<string, unknown>): number => {
  const seen = new Set<string>();
  let sum = 0;
  const add = (key: string, value: unknown) => {
    const id = key.toLowerCase();
    if (seen.has(id)) return;
    seen.add(id);
    sum += toNumber(value);
  };
  for (const key of OTHER_ALLOWANCE_KEYS) {
    if (key in row) add(key, row[key]);
  }
  for (const [key, value] of Object.entries(row)) {
    const k = key.toLowerCase();
    if (
      k.includes("transport") ||
      k.includes("travel allowance") ||
      k.includes("travel allow") ||
      k === "ta"
    ) {
      add(key, value);
    }
  }
  return sum;
};

/** Tescom May/2026: (P×M/N) + Q×R + shift + Transport (ROUNDDOWN 없음) */
const computeMsvSumTotalFromRow = (row: Record<string, unknown>): number => {
  const dayRatio = readPaidDayRatio(row);
  const totalSalary = readTotalSalary(row);
  const salaryPart = prorateExact(totalSalary, dayRatio);
  const ot = readOtPay(row);
  const { nightDayShiftAllowance } = readShiftAllowances(row);
  const other = readOtherAllowance(row);
  return salaryPart + ot + nightDayShiftAllowance + other;
};

const msvSumTotalMatchesSheet = (
  row: Record<string, unknown>,
  sheetSumTotal: number,
  tolerance: number,
): boolean => {
  if (sheetSumTotal <= 0) return true;
  const computed = computeMsvSumTotalFromRow(row);
  return (
    nearlyEqual(computed, sheetSumTotal, tolerance) ||
    nearlyEqual(Math.round(computed), sheetSumTotal, tolerance)
  );
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
    otPay: 0,
    dayShiftAllowance: 0,
    nightShiftAllowance: 0,
    nightDayShiftAllowance: 0,
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
  const dayRatio = readPaidDayRatio(row);
  const lwpDays =
    readFirstNumeric(row, LWP_KEYS) ||
    (dayRatio.monthDays > 0 && dayRatio.paidDays > 0
      ? Math.max(0, dayRatio.monthDays - dayRatio.paidDays)
      : 0);

  const otPay = readOtPay(row);
  const { dayShiftAllowance, nightShiftAllowance, nightDayShiftAllowance } = readShiftAllowances(row);
  const otherAllowance = readOtherAllowance(row);

  const basicFull = toNumber(row["Basic Salary"]);
  const hraFull = toNumber(row["HRA"]);
  const totalSalaryFull = readTotalSalary(row);
  const proratedTotalSalary = prorateExact(totalSalaryFull, dayRatio);
  const { basicSalary, hra } =
    dayRatio.ratio !== 1 && totalSalaryFull > 0
      ? splitProratedTotalSalary(proratedTotalSalary, basicFull, hraFull, totalSalaryFull)
      : { basicSalary: basicFull, hra: hraFull };
  const computedGross = computeMsvSumTotalFromRow(row);
  /** When present, Excel "Sum Total" wins (authoritative). */
  const sumTotal = toNumber(row["Sum Total"]);
  const grossSalary = sumTotal > 0 ? sumTotal : computedGross;

  const pf = toNumber(row["PF Employee Contribution"]);
  const esi = toNumber(row["ESIC Employee Contribution"]);
  const pt = toNumber(row["PT"]);
  const tds = toNumber(row["TDS"]);
  const advance =
    toNumber(row["Advance payment amount"]) ||
    toNumber(row["Advance Payment Amount"]) ||
    toNumber(row["Advance"]);
  const contribution = toNumber(row["Contribution"]);
  const employeeContribution = toNumber(row["Employee Contribution"]);
  const otherDeduction = advance + contribution + employeeContribution;
  const netSalary = toNumber(row["Net Salary Payable"]);
  /** 명세 총공제: 시트 Net과 Sum Total이 있으면 그 차이가 가장 정확 (행마다 TDS 포함 여부가 다름). */
  const totalDeduction =
    grossSalary > 0 && netSalary >= 0
      ? grossSalary - netSalary
      : toNumber(row["Total Deduction"]) ||
        toNumber(row["Total Deductions"]) ||
        toNumber(row["Total deduction"]) ||
        pf + esi + pt + tds + otherDeduction;

  const bankAccount = toSafeString(row["A/C"]);
  const ifsc = toSafeString(row["IFSC"]);
  const bankName = toSafeString(row["Bank"]);
  const joiningDate = formatExcelDateValue(row["Joining Date"]);
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
    ...(dayRatio.monthDays > 0 ? { monthDays: dayRatio.monthDays } : {}),
    ...(dayRatio.paidDays > 0 ? { paidDays: dayRatio.paidDays } : {}),
    ...(lwpDays > 0 ? { lwpDays } : {}),
    basicSalary,
    hra,
    otPay,
    dayShiftAllowance,
    nightShiftAllowance,
    nightDayShiftAllowance,
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

/** Tescom: 일부 행은 Net에서 TDS 제외, 일부(고액)는 TDS 포함 — 둘 다 허용 */
const msvNetMatchesSheet = (employee: PayrollEmployee, tolerance: number) => {
  const exclTds =
    employee.pf + employee.esi + employee.pt + employee.otherDeduction;
  const inclTds = exclTds + employee.tds;
  const net = employee.netSalary;
  const gross = employee.grossSalary;
  return (
    nearlyEqual(gross - exclTds, net, tolerance) ||
    nearlyEqual(gross - inclTds, net, tolerance) ||
    nearlyEqual(gross - employee.totalDeduction, net, tolerance)
  );
};

const msvGrossMatchesSheet = (employee: PayrollEmployee, tolerance: number) => {
  const fromParts =
    employee.basicSalary +
    employee.hra +
    employee.otPay +
    employee.nightDayShiftAllowance +
    employee.otherAllowance;
  const innerRounded = roundDown0(fromParts);
  return (
    nearlyEqual(fromParts, employee.grossSalary, tolerance) ||
    nearlyEqual(innerRounded, employee.grossSalary, tolerance)
  );
};

const runValidations = (
  employee: PayrollEmployee,
  template: "msv" | "legacy",
  sourceRow?: Record<string, unknown>,
) => {
  const issues: PayrollIssue[] = [];
  const fmt = (n: number) => numberFormatter.format(n);

  /** Sum Total 셀은 소수 반올림 표시(예: 45,523) — 1루피 허용 */
  const grossTol = template === "msv" ? 1 : 0.01;
  if (template === "msv") {
    const rowMatches =
      sourceRow && msvSumTotalMatchesSheet(sourceRow, employee.grossSalary, grossTol);
    if (!rowMatches && !msvGrossMatchesSheet(employee, grossTol)) {
      const computed = sourceRow ? computeMsvSumTotalFromRow(sourceRow) : 0;
      const fromParts =
        employee.basicSalary +
        employee.hra +
        employee.otPay +
        employee.nightDayShiftAllowance +
        employee.otherAllowance;
      const formulaHint = sourceRow ? fmt(computed) : fmt(fromParts);
      issues.push(
        createIssue(
          employee.rowNumber,
          "warning",
          `Gross mismatch: computed ${formulaHint}, sheet Sum Total = ${fmt(employee.grossSalary)} (Days Worked×Total Salary/Month days·OT/Hour×Basic/26/8×2·Day×100/Night×50 or ×150·Transport 확인)`,
        ),
      );
    }
  } else {
    const grossFromParts =
      employee.basicSalary +
      employee.hra +
      employee.otPay +
      employee.nightDayShiftAllowance +
      employee.otherAllowance;
    if (!nearlyEqual(grossFromParts, employee.grossSalary, grossTol)) {
      issues.push(
        createIssue(
          employee.rowNumber,
          "warning",
          `Gross Salary mismatch (sum of parts ${fmt(grossFromParts)} / sheet ${fmt(employee.grossSalary)})`,
        ),
      );
    }
  }

  const exclTdsDeduction =
    employee.pf + employee.esi + employee.pt + employee.otherDeduction;
  const inclTdsDeduction = exclTdsDeduction + employee.tds;
  const deductionFromParts =
    template === "msv"
      ? exclTdsDeduction
      : employee.pf + employee.esi + employee.pt + employee.tds + employee.otherDeduction;
  const itemizedDeductionSum = exclTdsDeduction + (template === "msv" ? employee.tds : 0);
  const impliedSheetDeduction = employee.grossSalary - employee.netSalary;
  const msvDeductionTol = 5;
  /** Tescom: Net 수식에 TDS 미포함 → 항목 합(PF+…+TDS)과 Sum Total−Net 차이 = TDS만큼인 경우는 정상 */
  const msvOnlyTdsDisplayGap =
    template === "msv" &&
    employee.tds > 0 &&
    nearlyEqual(itemizedDeductionSum - impliedSheetDeduction, employee.tds, msvDeductionTol);
  if (
    template === "msv" &&
    impliedSheetDeduction > 0 &&
    !msvOnlyTdsDisplayGap &&
    !msvNetMatchesSheet(employee, msvDeductionTol) &&
    !nearlyEqual(itemizedDeductionSum, impliedSheetDeduction, msvDeductionTol) &&
    !nearlyEqual(exclTdsDeduction, impliedSheetDeduction, msvDeductionTol) &&
    !nearlyEqual(inclTdsDeduction, impliedSheetDeduction, msvDeductionTol)
  ) {
    issues.push(
      createIssue(
        employee.rowNumber,
        "warning",
        `Parsed deductions (PF+ESIC+PT+other+TDS ${fmt(itemizedDeductionSum)}) differ from Sum Total−Net (${fmt(impliedSheetDeduction)}); check PF·ESIC·PT·Advance columns`,
      ),
    );
  } else if (template !== "msv" && !nearlyEqual(deductionFromParts, employee.totalDeduction)) {
    issues.push(
      createIssue(
        employee.rowNumber,
        "warning",
        `Total Deduction mismatch (sum ${fmt(deductionFromParts)} / sheet ${fmt(employee.totalDeduction)})`,
      ),
    );
  }

  const netTol = template === "msv" ? 5 : 0.01;
  if (template === "msv") {
    if (!msvNetMatchesSheet(employee, netTol)) {
      const impliedDed = employee.grossSalary - employee.netSalary;
      issues.push(
        createIssue(
          employee.rowNumber,
          "warning",
          `Net Salary Payable mismatch: sheet implies deductions ${fmt(impliedDed)} (Sum Total−Net), parsed excl. TDS ${fmt(exclTdsDeduction)} / incl. TDS ${fmt(inclTdsDeduction)} — check PF·ESIC·PT·TDS·Advance columns`,
        ),
      );
    }
  } else {
    const netFromFormula = employee.grossSalary - deductionFromParts;
    if (!nearlyEqual(netFromFormula, employee.netSalary, netTol)) {
      issues.push(
        createIssue(
          employee.rowNumber,
          "error",
          `Net Salary mismatch: Gross - Total deductions = ${fmt(netFromFormula)}, sheet Net Salary = ${fmt(employee.netSalary)}`,
        ),
      );
    }
  }

  return issues;
};

export const parsePayrollWorkbook = (workbook: XLSX.WorkBook, sheetName: string): ParsePayrollResult => {
  const sheet = workbook.Sheets[sheetName];
  if (!sheet) {
    throw new Error(`Sheet not found: ${sheetName}`);
  }

  const headerRow0Based = PAYROLL_HEADER_ROW_1_BASED - 1;

  /** raw:true — OT/Hour 소수(3.65 등), Sum Total·OT/Rate 정밀값 유지 (표시 반올림값과 구분) */
  const rawRows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, {
    defval: "",
    raw: true,
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

    issues.push(...runValidations(employee, template, template === "msv" ? row : undefined));
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
