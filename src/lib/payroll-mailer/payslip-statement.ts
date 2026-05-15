import type { PayrollEmployee } from "@/types/payroll-mailer";
import { formatCurrency } from "@/lib/payroll-mailer/payroll";
import { escapeHtml } from "@/lib/payroll-mailer/html-escape";

const border = "1px solid #000000";
const sans = 'Segoe UI,Roboto,"Noto Sans KR",Helvetica,Arial,sans-serif';

/** Whole rupees with Indian grouping (no decimals when .00) */
const formatRs = (amount: number) => {
  const rounded = Math.round(amount);
  const s = formatCurrency(rounded);
  return s.endsWith(".00") ? s.slice(0, -3) : s;
};

const cell = (n: number) => (n === 0 ? "—" : formatRs(n));

const ones = [
  "",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
  "Eleven",
  "Twelve",
  "Thirteen",
  "Fourteen",
  "Fifteen",
  "Sixteen",
  "Seventeen",
  "Eighteen",
  "Nineteen",
];
const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

const belowHundred = (n: number): string => {
  if (n < 20) return ones[n];
  const t = Math.floor(n / 10);
  const o = n % 10;
  return tens[t] + (o ? ` ${ones[o]}` : "");
};

const belowThousand = (n: number): string => {
  if (n < 100) return belowHundred(n);
  const h = Math.floor(n / 100);
  const rest = n % 100;
  return `${ones[h]} Hundred${rest ? ` ${belowHundred(rest)}` : ""}`;
};

/** English amount in words (Indian grouping), for payslip footer */
export const rupeesInWords = (amount: number): string => {
  let n = Math.round(Math.abs(amount));
  if (n === 0) return "Zero Rupees Only";

  const parts: string[] = [];
  const crores = Math.floor(n / 10000000);
  n %= 10000000;
  const lakhs = Math.floor(n / 100000);
  n %= 100000;
  const thousands = Math.floor(n / 1000);
  n %= 1000;

  if (crores) parts.push(`${belowHundred(crores)} Crore`.trim());
  if (lakhs) parts.push(`${belowHundred(lakhs)} Lakh`.trim());
  if (thousands) parts.push(`${belowThousand(thousands)} Thousand`.trim());
  if (n) parts.push(belowThousand(n));

  const body = `${parts.join(" ").replace(/\s+/g, " ").trim()}`;
  const rounded = Math.round(Math.abs(amount));
  const suffix = rounded === 1 ? "Rupee Only" : "Rupees Only";
  return `${body} ${suffix}`;
};

const payslipDate = () =>
  new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

const pairRow = (l1: string, v1: string, l2: string, v2: string) => `
<tr>
  <td style="border:${border};padding:6px 10px;font-weight:700;width:22%;font-family:${sans};font-size:12px;background:#fff;">${l1}</td>
  <td style="border:${border};padding:6px 10px;width:28%;font-family:${sans};font-size:12px;background:#fff;">${v1}</td>
  <td style="border:${border};padding:6px 10px;font-weight:700;width:22%;font-family:${sans};font-size:12px;background:#fff;">${l2}</td>
  <td style="border:${border};padding:6px 10px;width:28%;font-family:${sans};font-size:12px;background:#fff;">${v2}</td>
</tr>`;

const earnDedRow = (
  earnLabel: string,
  earnVal: string,
  dedLabel: string,
  dedVal: string,
  opts?: { earnBold?: boolean; dedBold?: boolean },
) => {
  const eb = opts?.earnBold ? "font-weight:700;" : "";
  const db = opts?.dedBold ? "font-weight:700;" : "";
  return `
<tr>
  <td style="border:${border};padding:5px 10px;${eb}font-family:${sans};font-size:12px;background:#fff;">${earnLabel}</td>
  <td style="border:${border};padding:5px 10px;text-align:right;${eb}font-family:${sans};font-size:12px;background:#fff;">${earnVal}</td>
  <td style="border:${border};padding:5px 10px;${db}font-family:${sans};font-size:12px;background:#fff;">${dedLabel}</td>
  <td style="border:${border};padding:5px 10px;text-align:right;${db}font-family:${sans};font-size:12px;background:#fff;">${dedVal}</td>
</tr>`;
};

const em = (s: string) => escapeHtml(s);

/** Inner table: Excel-style salary statement (inline styles for PDF + email) */
export const buildSalaryStatementInnerHtml = (employee: PayrollEmployee): string => {
  const dash = "—";
  const period = em(employee.month || dash);
  const name = em(employee.employeeName);
  const join = employee.joiningDate ? em(employee.joiningDate) : dash;
  const email = em(employee.email);
  const des = employee.designation ? em(employee.designation) : dash;
  const code = em(employee.employeeId);
  const bank = employee.bankName ? em(employee.bankName) : dash;
  const ifsc = employee.ifsc ? em(employee.ifsc) : dash;
  const ac = employee.bankAccount ? em(employee.bankAccount) : dash;
  const holder = name;

  const g = employee.grossSalary;
  const d = employee.totalDeduction;
  const net = employee.netSalary;
  const words = escapeHtml(rupeesInWords(net));

  return `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border:${border};font-family:${sans};color:#000;background:#fff;">
  <tr>
    <td colspan="4" style="border:${border};padding:10px 12px;text-align:center;font-size:16px;font-weight:700;font-family:${sans};">Salary Statement</td>
  </tr>
  ${pairRow("Period", period, "Designation", des)}
  ${pairRow("Employee Name", name, "Date", em(payslipDate()))}
  ${pairRow("Date of Join", join, "Code", code)}
  ${pairRow("Email", email, "Gender", dash)}
  ${pairRow("Department", em(employee.department), "Address", dash)}
  <tr>
    <td colspan="4" style="border:${border};padding:4px 0;background:#fff;"></td>
  </tr>
  ${pairRow("Month Days", dash, "Total Paid Days", dash)}
  ${pairRow("Weekly Off", dash, "Unpaid Holidays", dash)}
  ${pairRow("Working Days", dash, "Max Payable Days", dash)}
  ${pairRow("LWP", "0", "Net Paid Days", dash)}
  ${pairRow("Present Days", dash, "Paid Leaves", "0")}
  <tr>
    <td colspan="4" style="border:${border};padding:4px 0;background:#fff;"></td>
  </tr>
  ${pairRow("AC Holder", holder, "Bank", bank)}
  ${pairRow("Account Number", ac, "IFSC", ifsc)}
  <tr>
    <td colspan="4" style="border:${border};padding:4px 0;background:#fff;"></td>
  </tr>
  <tr>
    <td style="border:${border};padding:8px 10px;font-weight:700;background:#eeeeee;text-align:left;font-size:12px;">Earnings</td>
    <td style="border:${border};padding:8px 10px;font-weight:700;background:#eeeeee;text-align:right;font-size:12px;">Amount Rs.</td>
    <td style="border:${border};padding:8px 10px;font-weight:700;background:#eeeeee;text-align:left;font-size:12px;">Deductions</td>
    <td style="border:${border};padding:8px 10px;font-weight:700;background:#eeeeee;text-align:right;font-size:12px;">Amount Rs.</td>
  </tr>
  ${earnDedRow("Basic Salary", cell(employee.basicSalary), "PF", cell(employee.pf))}
  ${earnDedRow("HRA", cell(employee.hra), "ESI", cell(employee.esi))}
  ${earnDedRow("Leave Travel Allowance", "—", "Professional Tax", cell(employee.pt))}
  ${earnDedRow("Other Allowance", cell(employee.otherAllowance), "TDS", cell(employee.tds))}
  ${earnDedRow("Special Allowance", "—", "&nbsp;", "&nbsp;")}
  ${earnDedRow("Arrear Salary", "—", "&nbsp;", "&nbsp;")}
  ${earnDedRow("Bonus", "—", "&nbsp;", "&nbsp;")}
  ${earnDedRow("Total Earning", formatRs(g), "Total Deductions", formatRs(d), { earnBold: true, dedBold: true })}
  <tr>
    <td colspan="2" style="border:${border};padding:0;background:#fff;"></td>
    <td style="border:${border};padding:5px 10px;font-family:${sans};font-size:12px;background:#fff;">&nbsp;</td>
    <td style="border:${border};padding:5px 10px;background:#fff;">&nbsp;</td>
  </tr>
  <tr>
    <td colspan="3" style="border:${border};padding:10px 12px;font-weight:700;font-size:13px;font-family:${sans};background:#fff;">Net Pay</td>
    <td style="border:${border};padding:10px 12px;text-align:right;font-weight:700;font-size:14px;color:#c00000;font-family:${sans};background:#fff;">${formatRs(net)}</td>
  </tr>
  <tr>
    <td colspan="4" style="border:${border};padding:8px 10px;font-size:11px;font-family:${sans};background:#fff;line-height:1.45;"><strong>In words:</strong> ${words}</td>
  </tr>
</table>
<p style="margin:10px 0 0;font-size:10px;color:#555;font-family:${sans};text-align:center;">Computer-generated salary statement.</p>`.trim();
};

/** Full HTML document for Puppeteer PDF */
export const buildSalaryStatementDocumentHtml = (employee: PayrollEmployee): string => {
  const inner = buildSalaryStatementInnerHtml(employee);
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <style>
    @page { margin: 12mm 10mm; }
    * { box-sizing: border-box; }
    body { margin: 0; padding: 8px; font-family: ${sans}; color: #000; background: #fff; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .sheet { max-width: 720px; margin: 0 auto; }
  </style>
</head>
<body>
  <div class="sheet">${inner}</div>
</body>
</html>`;
};

/** Email-safe outer wrapper */
export const buildSalaryStatementEmailHtml = (employee: PayrollEmployee): string => {
  const inner = buildSalaryStatementInnerHtml(employee);
  return `
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:720px;margin:16px 0;border-collapse:collapse;">
  <tr>
    <td style="padding:0;font-family:${sans};">${inner}</td>
  </tr>
</table>`.trim();
};
