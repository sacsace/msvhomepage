import { AdminPasswordChangeForm } from "@/components/admin/AdminPasswordChangeForm";

export default function AdminPasswordPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-zinc-900">비밀번호 변경</h1>
      <p className="mt-2 max-w-lg text-sm text-zinc-600">
        비밀번호는 <code className="rounded bg-zinc-100 px-1 text-xs">data/admin-auth.json</code>에 bcrypt로
        저장됩니다. 운영 환경에서는 이 파일 권한을 제한하고,{" "}
        <code className="rounded bg-zinc-100 px-1 text-xs">ADMIN_SESSION_SECRET</code>(16자 이상)을 반드시
        환경 변수로 설정하세요.
      </p>
      <div className="mt-8 rounded-lg border border-zinc-200 bg-white p-6">
        <AdminPasswordChangeForm />
      </div>
    </div>
  );
}
