import { MailSettingsForm } from "@/components/admin/MailSettingsForm";

export default function AdminMailSettingsPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-zinc-900">메일 서버 (SMTP)</h1>
      <p className="mt-2 max-w-2xl text-sm text-zinc-600">
        문의하기 폼에서 접수된 내용을 이 주소로 발송합니다. 호스트·포트·계정은 사용 중인 메일 서비스(예: Google
        Workspace, SendGrid, 사내 SMTP) 안내에 맞춰 입력하세요. 비밀번호는 서버의{" "}
        <code className="text-xs">data/mail-settings.json</code>에만 저장됩니다.
      </p>
      <div className="mt-8 rounded-lg border border-zinc-200 bg-white p-6">
        <MailSettingsForm />
      </div>
    </div>
  );
}
