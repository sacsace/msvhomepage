import { NextResponse } from "next/server";
import { z } from "zod";
import type { SendResult } from "@/types/payroll-mailer";
import type { SiteLocale } from "@/lib/site-locale";
import { payrollSendFailureMessage, sendPayrollEmail, verifyPayrollMailDelivery } from "@/lib/payroll-mailer/delivery";
import { renderMailHtmlDocument, renderMailPlainText } from "@/lib/payroll-mailer/email-compose";
import { renderTemplate } from "@/lib/payroll-mailer/template";
import { launchPayrollPdfBrowser } from "@/lib/payroll-mailer/launch-payroll-browser";
import { renderPayslipHtml } from "@/lib/payroll-mailer/payslip-pdf";

export const runtime = "nodejs";

const employeeSchema = z.object({
  rowNumber: z.number(),
  employeeName: z.string(),
  employeeId: z.string(),
  email: z.string().email(),
  designation: z.string(),
  department: z.string(),
  month: z.string(),
  payrollMonth: z.string().optional(),
  basicSalary: z.number(),
  hra: z.number(),
  otherAllowance: z.number(),
  grossSalary: z.number(),
  pf: z.number(),
  esi: z.number(),
  pt: z.number(),
  tds: z.number(),
  otherDeduction: z.number(),
  totalDeduction: z.number(),
  netSalary: z.number(),
  bankAccount: z.string().optional(),
  ifsc: z.string().optional(),
  bankName: z.string().optional(),
  joiningDate: z.string().optional(),
});

const siteLocaleSchema = z.enum(["ko", "en", "zh"]);

const payrollSmtpInputSchema = z.object({
  host: z.string().optional(),
  port: z.number().int().positive().optional(),
  secure: z.boolean().optional(),
  user: z.string().optional(),
  pass: z.string().optional(),
  from: z.string().min(1, "발신 주소(From)가 필요합니다."),
});

const sendRequestSchema = z.object({
  smtp: payrollSmtpInputSchema.optional(),
  employees: z.array(employeeSchema).min(1),
  subjectTemplate: z.string().min(1),
  bodyTemplate: z.string().min(1),
  onlyEmployeeIds: z.array(z.string()).optional(),
  locale: siteLocaleSchema.optional().default("ko"),
});

const sanitizeFileName = (value: string) => value.replace(/[^\w-]/g, "_");

export async function POST(request: Request) {
  try {
    const rawBody = await request.json();
    const parsedBody = sendRequestSchema.safeParse(rawBody);

    if (!parsedBody.success) {
      return NextResponse.json(
        {
          message: "요청 데이터가 올바르지 않습니다.",
          details: parsedBody.error.flatten(),
        },
        { status: 400 },
      );
    }

    const { smtp: smtpInput, employees, subjectTemplate, bodyTemplate, onlyEmployeeIds, locale } = parsedBody.data;
    const mailLocale = locale as SiteLocale;
    const targetEmployees = onlyEmployeeIds?.length
      ? employees.filter((employee) => onlyEmployeeIds.includes(employee.employeeId))
      : employees;

    if (!targetEmployees.length) {
      return NextResponse.json({ message: "발송 대상 직원이 없습니다." }, { status: 400 });
    }

    await verifyPayrollMailDelivery(smtpInput);

    const results: SendResult[] = [];
    const browser = await launchPayrollPdfBrowser();

    try {
      const page = await browser.newPage();
      try {
        for (const employee of targetEmployees) {
          const subject = renderTemplate(subjectTemplate, employee);
          const htmlBody = renderMailHtmlDocument(bodyTemplate, employee, mailLocale);
          const textBody = renderMailPlainText(bodyTemplate, employee, mailLocale);

          try {
            await page.setContent(renderPayslipHtml(employee, mailLocale), { waitUntil: "domcontentloaded" });
            const pdfBuffer = await page.pdf({
              format: "A4",
              printBackground: true,
              margin: {
                top: "12mm",
                right: "12mm",
                bottom: "12mm",
                left: "12mm",
              },
            });

            const fileToken = sanitizeFileName(
              `${employee.employeeId}_${employee.employeeName}_${employee.payrollMonth || employee.month}`,
            );

            await sendPayrollEmail({
              smtpInput,
              to: employee.email,
              subject,
              text: textBody,
              html: htmlBody,
              attachments: [
                {
                  filename: `Salary_Slip_${fileToken}.pdf`,
                  content: Buffer.from(pdfBuffer),
                  contentType: "application/pdf",
                },
              ],
            });

            results.push({
              employeeId: employee.employeeId,
              employeeName: employee.employeeName,
              email: employee.email,
              success: true,
              message: "발송 성공",
            });
          } catch (error) {
            results.push({
              employeeId: employee.employeeId,
              employeeName: employee.employeeName,
              email: employee.email,
              success: false,
              message: error instanceof Error ? error.message : "알 수 없는 오류",
            });
          }
        }
      } finally {
        await page.close().catch(() => undefined);
      }
    } finally {
      await browser.close();
    }

    const successCount = results.filter((result) => result.success).length;
    const failureCount = results.length - successCount;

    return NextResponse.json({
      message: `발송 완료 (성공 ${successCount}건, 실패 ${failureCount}건)`,
      results,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: payrollSendFailureMessage(error),
      },
      { status: 500 },
    );
  }
}
