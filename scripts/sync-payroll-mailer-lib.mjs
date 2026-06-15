import fs from "node:fs";
import path from "path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const webRoot = path.join(__dirname, "..");
const tescomLib = "D:/Software Project/Tescom Payroll System/payroll-mailer/src/lib";
const base = path.join(webRoot, "src/lib/payroll-mailer");

function copy(fromName, toName = fromName) {
  const from = path.join(tescomLib, fromName);
  const to = path.join(base, toName);
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.copyFileSync(from, to);
}

copy("payroll.ts");
copy("template.ts");
copy("html-escape.ts");
copy("smtp-client.ts");
copy("smtp.ts");
copy("email-compose.ts");
// MSV: Excel-style payslip HTML/PDF — maintained locally (do not overwrite from Tescom).
// copy("payslip-email-html.ts");
// copy("payslip-pdf.tsx", "payslip-pdf.ts");

const patches = [
  ["payroll.ts", [["@/types/payroll\"", "@/types/payroll-mailer\""]]],
  ["template.ts", [["@/types/payroll\"", "@/types/payroll-mailer\""]]],
  ["smtp-client.ts", [["@/types/smtp\"", "@/types/payroll-mailer\""]]],
  ["smtp.ts", [["@/types/smtp\"", "@/types/payroll-mailer\""]]],
  [
    "email-compose.ts",
    [
      ["@/types/payroll\"", "@/types/payroll-mailer\""],
      ["@/lib/html-escape\"", "@/lib/payroll-mailer/html-escape\""],
      ["@/lib/template\"", "@/lib/payroll-mailer/template\""],
      ["@/lib/payslip-email-html\"", "@/lib/payroll-mailer/payslip-email-html\""],
    ],
  ],
  [
    "payslip-email-html.ts",
    [
      ["@/types/payroll\"", "@/types/payroll-mailer\""],
      ["@/lib/payroll\"", "@/lib/payroll-mailer/payroll\""],
      ["@/lib/html-escape\"", "@/lib/payroll-mailer/html-escape\""],
    ],
  ],
  [
    "payslip-pdf.ts",
    [
      ["@/types/payroll\"", "@/types/payroll-mailer\""],
      ["@/lib/payroll\"", "@/lib/payroll-mailer/payroll\""],
      ["@/lib/html-escape\"", "@/lib/payroll-mailer/html-escape\""],
    ],
  ],
];

for (const [name, reps] of patches) {
  const p = path.join(base, name);
  let s = fs.readFileSync(p, "utf8");
  for (const [a, b] of reps) {
    s = s.split(a).join(b);
  }
  fs.writeFileSync(p, s, "utf8");
}

/** MSV web: newline headers, HRD->HRA, row pipeline, password copy (no in-app password). */
function finalizePayrollTs(payrollPath) {
  let s = fs.readFileSync(payrollPath, "utf8");

  const normBlock = `/** Normalize Excel header keys: newlines to spaces, collapse spaces, trim */
const normalizeHeaderKey = (key: string) =>
  key
    .replace(/\\r\\n/g, " ")
    .replace(/\\r/g, " ")
    .replace(/\\n/g, " ")
    .replace(/\\s+/g, " ")
    .trim();

const normalizeRowKeys = (row: Record<string, unknown>): Record<string, unknown> => {
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(row)) {
    out[normalizeHeaderKey(key)] = value;
  }
  return out;
};`;

  if (!s.includes("normalizeHeaderKey")) {
    s = s.replace(
      /const normalizeRowKeys = \(row: Record<string, unknown>\): Record<string, unknown> => \{\n  const out: Record<string, unknown> = \{\};\n  for \(const \[key, value\] of Object\.entries\(row\)\) \{\n    out\[key\.trim\(\)\] = value;\n  \}\n  return out;\n\};/,
      normBlock,
    );
  }

  if (!s.includes("HEADER_KEY_ALIASES")) {
    const aliasBlock = `

/** Map common header typos to canonical column names (values unchanged). */
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
`;
    s = s.replace(/(return out;\n\};)\n\n(const detectTemplate =)/, `$1${aliasBlock}\n$2`);
  }

  if (s.includes("const rows = rawRows.map(normalizeRowKeys);")) {
    s = s.replace(
      "const rows = rawRows.map(normalizeRowKeys);",
      "const rows = rawRows.map((r) => applyColumnAliases(normalizeRowKeys(r)));",
    );
  }

  s = s.replace(
    /"열람용 암호가 걸린 통합문서입니다\. 아래에 암호를 입력한 뒤[^"]+"/,
    '"열람용 암호가 걸린 통합문서입니다. Excel에서 「파일 → 정보 → 통합문서 암호화」를 해제한 뒤 저장한 .xlsx를 다시 업로드해 주세요. (이 화면에서는 암호를 입력해 열 수 없으며, 최신 암호 방식은 지원되지 않을 수 있습니다.)"',
  );

  fs.writeFileSync(payrollPath, s, "utf8");
}

finalizePayrollTs(path.join(base, "payroll.ts"));
console.log("payroll-mailer lib synced + patched");
