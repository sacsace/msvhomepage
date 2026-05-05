import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { parseSmtpRecipientList, readMailSettings } from "@/lib/mail-settings-store";

export const runtime = "nodejs";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function safeDisplayName(name: string): string {
  return name.replace(/[\r\n\x00-\x1f"]/g, " ").trim() || "문의";
}

export async function POST(request: Request) {
  try {
    const json = (await request.json()) as {
      name?: string;
      email?: string;
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
    const subject = String(json.subject || "").trim();
    const message = String(json.message || "").trim();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "이름, 이메일, 문의 내용은 필수입니다." }, { status: 400 });
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

    const useAuth = Boolean(settings.user || settings.pass);
    const transporter = nodemailer.createTransport({
      host: settings.host,
      port: settings.port,
      secure: settings.secure,
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

    const subjectLine = subject ? `[웹 문의] ${subject}` : `[웹 문의] ${name}님`;
    /** 수신함에 보이는 발신자 — 문의 양식의 이메일. SMTP 인증은 `settings.user`(예: info@) 유지 */
    const fromHeader = `"${safeDisplayName(name)}" <${email}>`;

    await transporter.sendMail({
      envelope: { from: envelopeFrom, to: recipients },
      from: fromHeader,
      replyTo: email,
      to: recipients,
      subject: subjectLine,
      text: `보낸 사람: ${name}\n이메일: ${email}\n\n${message}`,
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
