import { PayrollMailerPasswordForm } from "@/components/admin/PayrollMailerPasswordForm";

export default function AdminPayrollMailerPasswordPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-zinc-900">급여 명세서 발송 비밀번호</h1>
      <p className="mt-2 max-w-2xl text-sm text-zinc-600">
        공개 사이트의{" "}
        <code className="rounded bg-zinc-100 px-1 text-xs">/software/payroll-mailer</code> 페이지에서 메일
        설정·제목·본문·발송을 사용하려면 여기서 설정한 비밀번호가 필요합니다. 비밀번호는 DB{" "}
        <code className="rounded bg-zinc-100 px-1 text-xs">PayrollMailerAuth</code>에 bcrypt로 저장됩니다.
      </p>
      <div className="mt-8 rounded-lg border border-zinc-200 bg-white p-6">
        <PayrollMailerPasswordForm />
      </div>
    </div>
  );
}
