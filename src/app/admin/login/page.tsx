import Link from "next/link";
import { adminPasswordConfigured } from "@/lib/admin-auth";
import { LoginForm } from "./LoginForm";

export default function AdminLoginPage() {
  const ready = adminPasswordConfigured();

  return (
    <div className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-4 py-16">
      <h1 className="text-lg font-semibold tracking-tight text-zinc-900">관리자 로그인</h1>
      {!ready ? (
        <p className="mt-6 rounded border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
          로그인하려면 <code className="text-xs">data/admin-auth.json</code> 또는{" "}
          <code className="text-xs">ADMIN_PASSWORD</code>가 필요합니다. 운영 환경에서는{" "}
          <code className="text-xs">ADMIN_SESSION_SECRET</code>(16자 이상)도 설정해 주세요.
        </p>
      ) : (
        <div className="mt-6">
          <LoginForm />
        </div>
      )}
      <p className="mt-8 text-center text-sm text-zinc-500">
        <Link href="/" className="underline-offset-2 hover:underline">
          사이트로 돌아가기
        </Link>
      </p>
    </div>
  );
}
