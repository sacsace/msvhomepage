import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { INQUIRY_TYPE_VALUES } from "@/lib/i18n/contact-locale";
import { parseSmtpRecipientList, readMailSettings, smtpSocketIpv4Only } from "@/lib/mail-settings-store";

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
    if (!settings.host || recipients.length === 0) {
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
    const useAuth = hasUser && hasPass;
    const transporter = nodemailer.createTransport({
      host: settings.host,
      port: settings.port,
      secure: settings.secure,
      ...smtpSocketIpv4Only,
      ...(!settings.secure && settings.port === 587 ? { requireTLS: true } : {}),
      ...(useAuth ? { auth: { user: settings.user, pass: settings.pass } } : {}),
    });

    const authUser = String(settings.user || "").trim();
    const envelopeFrom = (String(settings.fromAddress || "").trim() || authUser || recipients[0]).trim();
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
    /** 표시 발신자 — 문의 작성자(이름·이메일). Gmail 등은 정책에 따라 `Sender`/SMTP 계정으로 표시를 덮을 수 있음 */
    const fromHeader = `"${safeDisplayName(name)}" <${email}>`;

    await transporter.sendMail({
      envelope: { from: envelopeFrom, to: recipients },
      from: fromHeader,
      /** 실제 SMTP로 제출하는 주소 — From과 다를 때 RFC 권장(일부 클라이언트가「대신 전송」으로 표시) */
      sender: envelopeFrom,
      replyTo: email,
      to: recipients,
      subject: subjectLine,
      text: `문의 유형: ${typeLine}\n보낸 사람: ${name}\n이메일: ${email}\n\n${message}`,
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
