import { NextResponse } from "next/server";
import {
  mergeMailSettings,
  parseSmtpRecipientList,
  readMailSettings,
} from "@/lib/mail-settings-store";
import { requireAdmin } from "@/lib/require-admin";
import type { MailSettings } from "@/types/mail-settings";
import {
  getTransactionalEmailMode,
  parseEmailAddressOnly,
  resolveTransactionalFromAddress,
  sendTransactionalEmail,
} from "@/lib/transactional-email";

export const runtime = "nodejs";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** 테스트 수신은 이 주소들로만 허용(오남용 방지) */
function allowedTestRecipients(s: MailSettings): Set<string> {
  const set = new Set<string>();
  for (const x of parseSmtpRecipientList(s.toAddress)) set.add(x.toLowerCase());
  const from = s.fromAddress.trim().toLowerCase();
  if (from) set.add(from);
  const user = s.user.trim().toLowerCase();
  if (user) set.add(user);
  return set;
}

export async function POST(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    const body = (await request.json()) as { to?: string; settings?: Partial<MailSettings> };
    const toRaw = String(body.to ?? "").trim();
    if (!emailRe.test(toRaw)) {
      return NextResponse.json({ error: "유효한 테스트 수신 이메일 주소를 입력하세요." }, { status: 400 });
    }
    const toLower = toRaw.toLowerCase();

    const existing = await readMailSettings();
    const draft = body.settings && typeof body.settings === "object" ? body.settings : {};
    const effective = mergeMailSettings(existing, draft);

    const mode = getTransactionalEmailMode();

    if (mode === "smtp" && !effective.host.trim()) {
      return NextResponse.json({ error: "SMTP 호스트가 비어 있습니다." }, { status: 400 });
    }

    const allowed = allowedTestRecipients(effective);
    if (!allowed.has(toLower)) {
      return NextResponse.json(
        {
          error:
            "테스트 수신은 「문의 수신(To)」「SMTP MAIL FROM」「SMTP 사용자」에 적힌 주소만 선택할 수 있습니다.",
        },
        { status: 400 },
      );
    }

    const poolRecipients = parseSmtpRecipientList(effective.toAddress);
    if (poolRecipients.length === 0) {
      return NextResponse.json({ error: "문의 수신(To)이 비어 있습니다." }, { status: 400 });
    }

    if (mode === "smtp") {
      const hasUser = Boolean(effective.user.trim());
      const hasPass = Boolean(String(effective.pass || "").trim());
      if (hasUser && !hasPass) {
        return NextResponse.json(
          {
            error:
              "SMTP 비밀번호가 비어 있습니다. 아래 비밀번호 칸에 앱 비밀번호 등을 입력하거나, 이미 저장했다면 저장 후 다시 불러온 뒤 테스트하세요.",
          },
          { status: 400 },
        );
      }
    }

    const authUser = String(effective.user || "").trim();
    const envelopeSmtp = (
      String(effective.fromAddress || "").trim() ||
      authUser ||
      poolRecipients[0] ||
      ""
    ).trim();
    const resolvedFrom = resolveTransactionalFromAddress(effective).trim();
    const envelopeFrom =
      mode === "smtp"
        ? envelopeSmtp
        : (parseEmailAddressOnly(resolvedFrom) || resolvedFrom).trim();
    if (!envelopeFrom) {
      return NextResponse.json(
        {
          error:
            mode === "smtp"
              ? "발신(MAIL FROM / SMTP 사용자)이 비어 있어 테스트를 보낼 수 없습니다."
              : "HTTPS API 발신 주소가 비어 있습니다. 「SMTP MAIL FROM」또는 MSV_TRANSACTIONAL_FROM 을 설정하세요.",
        },
        { status: 400 },
      );
    }

    const verifiedMailbox = parseEmailAddressOnly(resolvedFrom || envelopeFrom) || envelopeFrom;
    const fromHeader = `"Minsub Ventures" <${verifiedMailbox}>`;
    const subject =
      mode === "smtp"
        ? `[SMTP 테스트] ${new Date().toISOString().slice(0, 19)}Z`
        : `[메일 테스트 ${mode}] ${new Date().toISOString().slice(0, 19)}Z`;
    const text =
      mode === "smtp"
        ? "이 메일은 관리자 화면의 「테스트 발송」으로 전송되었습니다.\n\n" +
          "문의하기·법인 설립 신청 등에서도 동일한 SMTP 설정이 사용됩니다.\n" +
          `수신 주소: ${toRaw}\n` +
          `호스트: ${effective.host}:${effective.port} (secure=${effective.secure})\n`
        : `이 메일은 관리자 화면의 「테스트 발송」으로 전송되었습니다.\n\n` +
          `HTTPS 메일 API (${mode}) 로 전송되었습니다. 문의·법인 신청 등에서도 동일한 경로가 사용됩니다.\n` +
          `수신 주소: ${toRaw}\n`;

    await sendTransactionalEmail({
      settings: effective,
      to: [toRaw],
      subject,
      text,
      fromHeader,
      envelopeFrom,
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[api/admin/mail-settings/test]", e);
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json(
      { error: `테스트 발송에 실패했습니다. ${msg.slice(0, 200)}` },
      { status: 500 },
    );
  }
}
