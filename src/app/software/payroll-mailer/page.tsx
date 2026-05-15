import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { StandardPageBody } from "@/components/layout/StandardPageBody";
import { PayrollMailerClient } from "@/components/payroll-mailer/PayrollMailerClient";
import { getRequestLocale } from "@/lib/get-request-locale";
import { payrollMailerPageCopy } from "@/lib/i18n/payroll-mailer-locale";
import { staticPageSeoLocalized } from "@/lib/seo-metadata";
import { company } from "@/lib/site-content";
import { pickLocale } from "@/lib/site-locale";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const title = pickLocale(locale, {
    ko: "급여 명세서 이메일 발송",
    en: "Payroll payslip email",
    zh: "工资单邮件发送",
  });
  const description = pickLocale(locale, {
    ko: "엑셀 급여 데이터 업로드, SMTP 설정, 직원별 HTML 메일 및 PDF 명세 첨부 발송. 서버·DB에 급여 데이터를 저장하지 않습니다.",
    en: "Upload payroll Excel, configure SMTP, send individual HTML emails with PDF payslip attachments. No payroll data is persisted on the server or in the database.",
    zh: "上传工资 Excel、配置 SMTP、发送带 PDF 工资单附件的个性化邮件。服务器与数据库不持久保存工资数据。",
  });
  return staticPageSeoLocalized(
    "/software/payroll-mailer",
    {
      title,
      description,
      absoluteTitle: `${title} | ${company.shortName}`,
    },
    locale,
  );
}

export default async function SoftwarePayrollMailerPage() {
  const locale = await getRequestLocale();
  const { pageTitle, pageHeaderDescription } = payrollMailerPageCopy(locale);

  return (
    <>
      <PageHeader title={pageTitle} description={pageHeaderDescription} descriptionWide />
      <StandardPageBody padding="spacious" className="bg-slate-50/80">
        <PayrollMailerClient key={locale} locale={locale} />
      </StandardPageBody>
    </>
  );
}
