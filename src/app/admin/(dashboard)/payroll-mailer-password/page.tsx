import { PayrollMailerPasswordForm } from "@/components/admin/PayrollMailerPasswordForm";
import { ADMIN_FORM_CARD_CLASS, ADMIN_PAGE_LEAD_CLASS } from "@/lib/admin-page-layout";

export default function AdminPayrollMailerPasswordPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-zinc-900">급여 명세서 발송 비밀번호</h1>
      <p className={ADMIN_PAGE_LEAD_CLASS}>
        공개 <code className="rounded bg-zinc-100 px-1 text-xs">/software/payroll-mailer</code> 메일 설정·제목·본문·발송용 비밀번호 — DB{" "}
        <code className="rounded bg-zinc-100 px-1 text-xs">PayrollMailerAuth</code> bcrypt 저장.
      </p>
      <div className={`${ADMIN_FORM_CARD_CLASS} rounded-lg border-zinc-200`}>
        <PayrollMailerPasswordForm />
      </div>
    </div>
  );
}
