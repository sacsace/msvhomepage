import { MailSettingsForm } from "@/components/admin/MailSettingsForm";
import {
  getTransactionalEmailDiagnostics,
  getTransactionalEmailMode,
} from "@/lib/transactional-email";

/** 빌드 시점 env 고정 방지 — Railway Variables는 런타임에만 존재 */
export const dynamic = "force-dynamic";

export default function AdminMailSettingsPage() {
  const deliveryMode = getTransactionalEmailMode();
  const diag = getTransactionalEmailDiagnostics();
  const isApi = deliveryMode !== "smtp";
  const onRailway = diag.onRailway;
  const apiKeyMissing =
    onRailway &&
    !diag.hasResendKey &&
    !diag.hasSendgridKey &&
    !diag.hasPostmarkToken;

  return (
    <div>
      <h1 className="text-xl font-semibold text-zinc-900">메일 발송 설정</h1>

      {onRailway ? (
        <div
          className={`mt-3 max-w-2xl rounded-lg border px-4 py-3 text-sm leading-relaxed ${
            isApi
              ? "border-emerald-200 bg-emerald-50 text-emerald-950"
              : "border-amber-200 bg-amber-50 text-amber-950"
          }`}
        >
          <p className="font-semibold">서버가 인식한 발송 설정 (Railway 런타임)</p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-[13px]">
            <li>
              발송 모드: <strong>{diag.mode}</strong>
              {isApi ? " — HTTPS API 사용 중" : " — SMTP 사용 중 (Railway에서 타임아웃 가능)"}
            </li>
            <li>
              RESEND_API_KEY: <strong>{diag.hasResendKey ? "설정됨" : "없음"}</strong>
            </li>
            <li>MSV_EMAIL_PROVIDER: {diag.providerEnv ?? "(미설정)"}</li>
            <li>MSV_TRANSACTIONAL_FROM: {diag.transactionalFrom ?? "(미설정)"}</li>
          </ul>
          {apiKeyMissing ? (
            <p className="mt-2 font-medium">
              API 키가 서버에 보이지 않습니다. Variables는 <strong>msvhomepage 웹 서비스</strong>에 넣고, 저장 후{" "}
              <strong>Redeploy</strong> 하세요. Postgres 서비스가 아닌 Next 앱 서비스여야 합니다.
            </p>
          ) : null}
        </div>
      ) : null}

      {!isApi && onRailway ? (
        <div className="mt-3 max-w-2xl rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm leading-relaxed text-red-950">
          <p className="font-semibold">Railway에서는 SMTP 테스트가 타임아웃으로 실패하는 것이 흔합니다.</p>
          <p className="mt-2">
            아웃바운드 SMTP(465·587 등)가 막혀 있으면, 아래 폼의 호스트가 맞아도 TCP 연결이 되지 않습니다.{" "}
            <strong>Railway → msvhomepage(웹) 서비스 → Variables</strong>에{" "}
            <code className="rounded bg-red-100/80 px-1 text-xs">RESEND_API_KEY</code>를 추가하고{" "}
            <strong>재배포</strong>하세요. 위 「서버가 인식한 발송 설정」에서 RESEND_API_KEY가 「설정됨」·발송 모드가
            「resend」가 되어야 합니다.
          </p>
        </div>
      ) : null}
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-zinc-600">
        {isApi ? (
          <>
            현재 배포 환경은 <strong className="font-medium text-zinc-800">{deliveryMode}</strong> HTTPS 메일 API로
            발송합니다. Railway 등에서 SMTP가 막혀 있어도 동작합니다. 아래 「문의 수신」「발신 주소」는 API의 수신·발신
            필드에 그대로 쓰입니다.
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
