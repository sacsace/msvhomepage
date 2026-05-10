import { NextResponse } from "next/server";
import { INQUIRY_TYPE_VALUES } from "@/lib/i18n/contact-locale";
import { parseSmtpRecipientList, readMailSettings } from "@/lib/mail-settings-store";
import {
  getTransactionalEmailMode,
  parseEmailAddressOnly,
  resolveTransactionalFromAddress,
  sendTransactionalEmail,
} from "@/lib/transactional-email";

export const runtime = "nodejs";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const INQUIRY_ALLOWED = new Set<string>(INQUIRY_TYPE_VALUES);

/** 메일 본문용(운영자 참고) — 값은 클라이언트와 동일 키 */
const INQUIRY_MAIL_LINE: Record<string, string> = {
  incorporation: "법인 설립 / Incorporation",
  accounting_tax: "회계·세무 / Accounting & Tax",
  gst_tds: "GST / TDS",
  visa_frro: "비자·FRRO / Visa & FRRO",
  import_export_iec: "수출입·IEC / Import-export & IEC",
  groupware_mvs: "그룹웨어(MVS) / Groupware (MVS)",
  other: "기타 / Other",
};

function safeDisplayName(name: string): string {
  return name.replace(/[\r\n\x00-\x1f"]/g, " ").trim() || "문의";
}

export async function POST(request: Request) {
  try {
    const json = (await request.json()) as {
      name?: string;
      email?: string;
      inquiryType?: string;
      subject?: string;
      message?: string;
      /** 스팸 방지용 숨김 필드 — 값이 있으면 무시 */
      company?: string;
    };
    if (String(json.company || "").trim()) {
      return NextResponse.json({ ok: true });
    }

    const name = String(json.name || "").trim();
    const email = String(json.email || "").trim();
    const inquiryType = String(json.inquiryType || "").trim();
    const subject = String(json.subject || "").trim();
    const message = String(json.message || "").trim();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "이름, 이메일, 문의 내용은 필수입니다." }, { status: 400 });
    }
    if (!inquiryType || !INQUIRY_ALLOWED.has(inquiryType)) {
      return NextResponse.json({ error: "문의 유형이 올바르지 않습니다." }, { status: 400 });
    }
    if (name.length > 120 || email.length > 254 || subject.length > 200 || message.length > 20000) {
      return NextResponse.json({ error: "입력 길이가 허용 범위를 넘었습니다." }, { status: 400 });
    }
    if (!emailRe.test(email)) {
      return NextResponse.json({ error: "이메일 형식이 올바르지 않습니다." }, { status: 400 });
    }

    const settings = await readMailSettings();
    const recipients = parseSmtpRecipientList(settings.toAddress);
    if (recipients.length === 0) {
      return NextResponse.json(
        { error: "메일 서버가 설정되지 않았습니다. 잠시 후 다시 시도하거나 이메일로 직접 연락해 주세요." },
        { status: 503 },
      );
    }

    const mode = getTransactionalEmailMode();
    if (mode === "smtp") {
      if (!settings.host.trim()) {
        return NextResponse.json(
          { error: "메일 서버가 설정되지 않았습니다. 잠시 후 다시 시도하거나 이메일로 직접 연락해 주세요." },
          { status: 503 },
        );
      }
      const hasUser = Boolean(settings.user.trim());
      const hasPass = Boolean(String(settings.pass || "").trim());
      if (hasUser && !hasPass) {
        return NextResponse.json(
          { error: "SMTP 계정 비밀번호가 설정되지 않았습니다. 관리자 메일 설정을 확인하세요." },
          { status: 503 },
        );
      }
    } else {
      const resolved = resolveTransactionalFromAddress(settings).trim();
      if (!resolved) {
        return NextResponse.json(
          {
            error:
              "HTTPS 메일 API 발신 주소가 비어 있습니다. 관리자의 「SMTP MAIL FROM」또는 배포 환경 변수 MSV_TRANSACTIONAL_FROM 을 설정하세요.",
          },
          { status: 503 },
        );
      }
    }

    const authUser = String(settings.user || "").trim();
    const envelopeSmtp = (String(settings.fromAddress || "").trim() || authUser || recipients[0]).trim();
    const resolvedFrom = resolveTransactionalFromAddress(settings).trim();
    const envelopeFrom =
      mode === "smtp"
        ? envelopeSmtp
        : (parseEmailAddressOnly(resolvedFrom) || resolvedFrom).trim();
    if (!envelopeFrom) {
      return NextResponse.json(
        { error: "메일 발신(SMTP 사용자 또는 발신 주소)이 비어 있습니다. 관리자 메일 설정을 확인하세요." },
        { status: 503 },
      );
    }

    const typeLine = INQUIRY_MAIL_LINE[inquiryType] || inquiryType;
    const subjectLine = subject
      ? `[MSV Website Inquiry] ${subject}`
      : `[MSV Website Inquiry] ${name}님`;
    const fromHeader =
      mode === "smtp"
        ? `"${safeDisplayName(name)}" <${email}>`
        : `"${safeDisplayName(name)} (웹 문의)" <${parseEmailAddressOnly(resolvedFrom) || resolvedFrom}>`;

    await sendTransactionalEmail({
      settings,
      to: recipients,
      subject: subjectLine,
      text: `문의 유형: ${typeLine}\n보낸 사람: ${name}\n이메일: ${email}\n\n${message}`,
      replyTo: email,
      fromHeader,
      envelopeFrom,
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[contact]", e);
    return NextResponse.json(
      { error: "메일 전송에 실패했습니다. 잠시 후 다시 시도해 주세요." },
      { status: 500 },
    );
  }
}
