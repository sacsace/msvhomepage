import type { PayrollEmployee } from "@/types/payroll-mailer";
import type { SiteLocale } from "@/lib/site-locale";
import { escapeHtml } from "@/lib/payroll-mailer/html-escape";
import { payrollMailerMailDocumentChrome } from "@/lib/i18n/payroll-mailer-locale";
import { getTemplateVariables, variablePattern, type TemplateVariables } from "@/lib/payroll-mailer/template";
import { renderPayslipEmailTable, renderPayslipPlainText } from "@/lib/payroll-mailer/payslip-email-html";

const payslipToken = /\{\{\s*payslip\s*\}\}/gi;

const replaceVarsHtmlEscaped = (segment: string, employee: PayrollEmployee): string => {
  const vars = getTemplateVariables(employee);
  return segment.replace(variablePattern, (_, key: keyof TemplateVariables) => escapeHtml(vars[key] ?? ""));
};

const segmentToParagraphsHtml = (segment: string, employee: PayrollEmployee): string => {
  const withVars = replaceVarsHtmlEscaped(segment, employee);
  return withVars
    .split(/\n\n+/)
    .map((block) => {
      const inner = block.trim() === "" ? "&nbsp;" : block.split("\n").join("<br />");
      return `<p style="margin:0 0 14px;line-height:1.65;color:#334155;font-size:15px;font-family:Inter,ui-sans-serif,system-ui,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif;">${inner}</p>`;
    })
    .join("");
};

/** Mail HTML body: greeting paragraphs + payslip block. */
export const renderMailHtmlDocument = (bodyTemplate: string, employee: PayrollEmployee, locale: SiteLocale = "ko"): string => {
  const payslip = renderPayslipEmailTable(employee);
  const chrome = payrollMailerMailDocumentChrome(locale);
  const tokens = bodyTemplate.split(payslipToken);
  let inner = tokens
    .map((seg, i) => segmentToParagraphsHtml(seg, employee) + (i < tokens.length - 1 ? payslip : ""))
    .join("");
  if (tokens.length === 1) {
    inner += payslip;
  }

  return `<!DOCTYPE html>
<html lang="${chrome.htmlLang}">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(chrome.docTitle)}</title>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#f1f5f9;padding:20px 10px;">
    <tr>
      <td align="center">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:960px;">
          <tr>
            <td style="background:#ffffff;border-radius:16px;padding:24px 22px 28px;border:1px solid #e2e8f0;box-shadow:0 1px 3px rgba(15,23,42,0.06);">
              ${inner}
            </td>
          </tr>
          <tr>
            <td style="padding:14px 8px 0;text-align:center;font-size:11px;color:#94a3b8;font-family:Inter,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif;">
              ${escapeHtml(chrome.footer)}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
};

/** Plain-text alternative body. */
export const renderMailPlainText = (bodyTemplate: string, employee: PayrollEmployee): string => {
  const vars = getTemplateVariables(employee);
  const replaceVars = (s: string) =>
    s.replace(variablePattern, (_, key: keyof TemplateVariables) => vars[key] ?? "");

  const plainPayslip = renderPayslipPlainText(employee);
  const tokens = bodyTemplate.split(payslipToken);
  let out = tokens.map((seg, i) => replaceVars(seg) + (i < tokens.length - 1 ? `\n\n${plainPayslip}\n\n` : "")).join("");
  if (tokens.length === 1) {
    out += `\n\n${plainPayslip}`;
  }
  return out.trimEnd();
};
