import { AdminPasswordChangeForm } from "@/components/admin/AdminPasswordChangeForm";
import { resolvedAdminLoginId } from "@/lib/admin-auth";
import { ADMIN_FORM_CARD_CLASS, ADMIN_PAGE_LEAD_CLASS } from "@/lib/admin-page-layout";

export default async function AdminPasswordPage() {
  const loginId = await resolvedAdminLoginId();

  return (
    <div>
      <h1 className="text-xl font-bold tracking-tight text-slate-900">비밀번호 변경</h1>
      <p className={ADMIN_PAGE_LEAD_CLASS}>
        관리자 아이디(<code className="rounded bg-slate-100 px-1 text-xs">{loginId}</code>)·현재 비밀번호 확인 후 새 비밀번호 설정 — DB{" "}
        <code className="rounded bg-slate-100 px-1 text-xs">AdminAuth</code> bcrypt 저장.
      </p>
      <div className={ADMIN_FORM_CARD_CLASS}>
        <AdminPasswordChangeForm defaultLoginId={loginId} />
      </div>
    </div>
  );
}
