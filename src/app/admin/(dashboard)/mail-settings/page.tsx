import { MailSettingsForm } from "@/components/admin/MailSettingsForm";
import { ADMIN_FORM_CARD_CLASS, ADMIN_PAGE_LEAD_CLASS } from "@/lib/admin-page-layout";
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
          className={`mt-3 rounded-lg border px-4 py-3 text-sm break-keep ${
            isApi
              ? "border-emerald-200 bg-emerald-50 text-emerald-950"
              : "border-amber-200 bg-amber-50 text-amber-950"
          }`}
        >
          <p className="font-semibold">Railway 발송 설정</p>
          <p className="mt-1 text-[13px]">
            모드 <strong>{diag.mode}</strong>
            {isApi ? " (HTTPS API)" : " (SMTP — Railway 타임아웃 가능)"} · RESEND_API_KEY{" "}
            <strong>{diag.hasResendKey ? "설정됨" : "없음"}</strong> · MSV_EMAIL_PROVIDER{" "}
            {diag.providerEnv ?? "(미설정)"} · MSV_TRANSACTIONAL_FROM {diag.transactionalFrom ?? "(미설정)"}
          </p>
          {apiKeyMissing ? (
            <p className="mt-2 text-[13px] font-medium">
              API 키 미인식 — <strong>msvhomepage 웹</strong> Variables에 추가 후 <strong>Redeploy</strong> (Postgres 서비스 아님).
            </p>
          ) : null}
        </div>
      ) : null}

      {!isApi && onRailway ? (
        <div className="mt-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-950 break-keep">
          <p>
            <strong>Railway SMTP 타임아웃 흔함</strong> — 아웃바운드 465·587 차단 시 호스트가 맞아도 연결 실패.{" "}
            <strong>msvhomepage → Variables</strong>에 <code className="rounded bg-red-100/80 px-1 text-xs">RESEND_API_KEY</code> 추가·재배포 후 모드 resend·키 「설정됨」 확인.
          </p>
        </div>
      ) : null}
      <p className={ADMIN_PAGE_LEAD_CLASS}>
        {isApi ? (
          <>
            현재 <strong className="font-medium text-zinc-800">{deliveryMode}</strong> HTTPS API 발송 — Railway SMTP 차단 시에도 동작. 아래 문의 수신·발신 주소가 API에 사용됩니다.
          </>
        ) : (
          <>
            문의 메일은 아래 SMTP로 발송 — 호스트·포트·SSL은 메일 서비스 안내에 맞추세요. 비밀번호는 DB{" "}
            <code className="rounded bg-zinc-100 px-1 text-xs">MailSettings</code>에만 저장.
          </>
        )}
      </p>
      <div className={`${ADMIN_FORM_CARD_CLASS} rounded-lg border-zinc-200`}>
        <MailSettingsForm deliveryMode={deliveryMode} />
      </div>
    </div>
  );
}
