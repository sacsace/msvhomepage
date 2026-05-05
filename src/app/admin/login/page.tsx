import Link from "next/link";
import { adminPasswordConfigured, adminSessionSecretConfigured } from "@/lib/admin-auth";
import { LoginForm } from "./LoginForm";

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams: Promise<{ error?: string | string[] }>;
};

export default async function AdminLoginPage({ searchParams }: PageProps) {
  const q = await searchParams;
  const raw = q.error;
  const error = typeof raw === "string" ? raw : Array.isArray(raw) ? raw[0] : undefined;

  const sessionOk = adminSessionSecretConfigured();
  const passwordReady = await adminPasswordConfigured();

  return (
    <div className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-4 py-16">
      <h1 className="text-lg font-semibold tracking-tight text-zinc-900">관리자 로그인</h1>
      {!sessionOk ? (
        <p className="mt-6 rounded border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
          세션 서명용 <code className="text-xs">ADMIN_SESSION_SECRET</code>(16자 이상)을 설정해 주세요.
          <span className="mt-2 block text-amber-800/90">
            개발 모드(<code className="text-xs">next dev</code>)에서는 기본 키가 쓰이므로 이 메시지가 나오면
            환경 설정을 확인하세요.
          </span>
        </p>
      ) : (
        <div className="mt-6">
          {!passwordReady ? (
            <p className="mb-4 rounded border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
              DB에 관리자 해시가 없거나 읽을 수 없습니다.{" "}
              <code className="text-xs">web/.env.development</code>의{" "}
              <code className="text-xs">ADMIN_PASSWORD</code>를 쓰거나,{" "}
              <code className="text-xs">npm run db:seed</code>로 시드하세요. (시드 기본 비밀번호는{" "}
              <code className="text-xs">admin123</code>입니다.) 운영에서는{" "}
              <code className="text-xs">ADMIN_SESSION_SECRET</code>을 반드시 설정하세요.
            </p>
          ) : null}
          <LoginForm error={error} />
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
