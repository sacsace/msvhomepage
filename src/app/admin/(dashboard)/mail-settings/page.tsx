import { MailSettingsForm } from "@/components/admin/MailSettingsForm";
import { getTransactionalEmailMode } from "@/lib/transactional-email";

export default function AdminMailSettingsPage() {
  const deliveryMode = getTransactionalEmailMode();
  const isApi = deliveryMode !== "smtp";
  /** Railway 배포 컨테이너에 자동 설정됨 — 로컬 `next dev` 에는 없음 */
  const onRailway = Boolean(process.env.RAILWAY_ENVIRONMENT?.trim());

  return (
    <div>
      <h1 className="text-xl font-semibold text-zinc-900">메일 발송 설정</h1>
      {!isApi && onRailway ? (
        <div className="mt-3 max-w-2xl rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm leading-relaxed text-red-950">
          <p className="font-semibold">Railway에서는 SMTP 테스트가 타임아웃으로 실패하는 것이 흔합니다.</p>
          <p className="mt-2">
            아웃바운드 SMTP(465·587 등)가 막혀 있으면, 아래 폼의 호스트가 맞아도 TCP 연결이 되지 않습니다.{" "}
            <strong>Railway → 웹 서비스 → Variables</strong>에{" "}
            <code className="rounded bg-red-100/80 px-1 text-xs">RESEND_API_KEY</code>(또는{" "}
            <code className="rounded bg-red-100/80 px-1 text-xs">SENDGRID_API_KEY</code>,{" "}
            <code className="rounded bg-red-100/80 px-1 text-xs">POSTMARK_SERVER_TOKEN</code>)을 추가하고{" "}
            <strong>재배포</strong>하세요. 선택: <code className="rounded bg-red-100/80 px-1 text-xs">MSV_EMAIL_PROVIDER</code>
            , 발신 검증 주소: <code className="rounded bg-red-100/80 px-1 text-xs">MSV_TRANSACTIONAL_FROM</code> 또는 아래
            「SMTP MAIL FROM」.
          </p>
        </div>
      ) : null}
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-zinc-600">
        {isApi ? (
          <>
            현재 배포 환경은 <strong className="font-medium text-zinc-800">{deliveryMode}</strong> HTTPS 메일 API로
            발송합니다. Railway 등에서 SMTP가 막혀 있어도 동작합니다. 아래 「문의 수신」「발신 주소」는 API의 수신·발신
            필드에 그대로 쓰입니다. API 키는 서버 환경 변수(
            <code className="rounded bg-zinc-100 px-1 text-xs">RESEND_API_KEY</code>,{" "}
            <code className="rounded bg-zinc-100 px-1 text-xs">SENDGRID_API_KEY</code>,{" "}
            <code className="rounded bg-zinc-100 px-1 text-xs">POSTMARK_SERVER_TOKEN</code>
            )에만 두면 됩니다. 선택: <code className="rounded bg-zinc-100 px-1 text-xs">MSV_EMAIL_PROVIDER</code>,{" "}
            <code className="rounded bg-zinc-100 px-1 text-xs">MSV_TRANSACTIONAL_FROM</code>.
          </>
        ) : (
          <>
            문의 등 접수 메일은 아래 SMTP로 발송됩니다. 호스트·포트·SSL은 이용 중인 메일 서비스 안내에 맞춰 주세요.
            비밀번호는 DB <code className="rounded bg-zinc-100 px-1 text-xs">MailSettings</code>에만 저장됩니다.
          </>
        )}
      </p>
      <div className="mt-8 rounded-lg border border-zinc-200 bg-white p-6">
        <MailSettingsForm deliveryMode={deliveryMode} />
      </div>
    </div>
  );
}
