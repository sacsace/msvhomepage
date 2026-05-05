import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { parseSmtpRecipientList, readMailSettings } from "@/lib/mail-settings-store";

export const runtime = "nodejs";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_FILE_BYTES = 8 * 1024 * 1024;
/** 이사별·법인 주주별·일반 첨부 합산 상한 */
const MAX_FILES = 100;

function safeDisplayName(name: string): string {
  return name.replace(/[\r\n\x00-\x1f"]/g, " ").trim() || "법인설립신청";
}

function str(form: FormData, key: string): string {
  return String(form.get(key) ?? "").trim();
}

function intInRange(raw: string, fallback: number, min: number, max: number): number {
  const n = Number.parseInt(raw, 10);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, n));
}

const ROW_MIN = 2;
const ROW_MAX = 15;

function shareholderKind(form: FormData, index: number): "company" | "individual" {
  const k = str(form, `shareholderKind_${index}`);
  return k === "company" ? "company" : "individual";
}

function formatShareholding(form: FormData, count: number): string {
  const lines: string[] = [];
  for (let i = 0; i < count; i++) {
    const name = str(form, `shareholdingName_${i}`);
    const pct = str(form, `shareholdingPct_${i}`);
    const kind = shareholderKind(form, i);
    const kindLabel = kind === "company" ? "법인" : "개인";
    const same = str(form, `shareholderSameDirector_${i}`);
    const sameNote =
      kind === "individual" && same !== "" && /^\d+$/.test(same)
        ? ` [이사 ${Number.parseInt(same, 10) + 1}과 동일]`
        : "";
    lines.push(
      `주주 ${i + 1} (${kindLabel}): 이름 ${name || "(미입력)"}, 지분율 ${pct || "(미입력)"}${sameNote}`,
    );
  }
  return lines.join("\n");
}

function formatDirectorNames(form: FormData, count: number): string {
  const lines: string[] = [];
  for (let i = 0; i < count; i++) {
    const v = str(form, `directorName_${i}`);
    lines.push(`이사 ${i + 1}: ${v || "(미입력)"}`);
  }
  return lines.join("\n");
}

function formatDirEn(form: FormData, i: number): string {
  const keys: [string, string][] = [
    ["이름", `dirEn_${i}_name`],
    ["한국 휴대폰 번호", `dirEn_${i}_krPhone`],
    ["메일 주소", `dirEn_${i}_email`],
    ["최종학력 & 학교 및 전공", `dirEn_${i}_education`],
    ["출생일", `dirEn_${i}_dob`],
    ["출생지 (도시명)", `dirEn_${i}_pob`],
    ["현재 주소", `dirEn_${i}_address`],
    ["아버지 성함", `dirEn_${i}_fatherName`],
    ["인도내 회사 이사 등재 여부 및 보유 주식 수", `dirEn_${i}_indiaOther`],
  ];
  return keys.map(([label, key]) => `  ${label}: ${str(form, key) || "(없음)"}`).join("\n");
}

function formatDirAttachSummary(form: FormData, i: number): string {
  const rows: [string, string][] = [
    ["여권 사본 첨부", `dirAttach_${i}_passport`],
    ["영문 주민등록등본 첨부", `dirAttach_${i}_residence`],
    ["증명 사진 첨부", `dirAttach_${i}_photo`],
    ["운전면허증 사본 첨부", `dirAttach_${i}_license`],
  ];
  return rows
    .map(([label, key]) => {
      const e = form.get(key);
      const name = e instanceof File && e.size > 0 ? e.name : "(미첨부)";
      return `  ${label}: ${name}`;
    })
    .join("\n");
}

function sanitizeUploadBaseName(name: string): string {
  return name.replace(/[^\w.\-()\uAC00-\uD7A3\s]/g, "_").slice(0, 120) || "file";
}

async function addFormFileIfPresent(
  form: FormData,
  field: string,
  attachments: { filename: string; content: Buffer }[],
  filenamePrefix: string,
): Promise<string | null> {
  const entry = form.get(field);
  if (!(entry instanceof File) || entry.size === 0) return null;
  if (attachments.length >= MAX_FILES) {
    return `첨부 파일은 최대 ${MAX_FILES}개까지입니다.`;
  }
  if (entry.size > MAX_FILE_BYTES) {
    return `각 첨부 파일은 ${MAX_FILE_BYTES / 1024 / 1024}MB 이하여야 합니다: ${entry.name}`;
  }
  const buf = Buffer.from(await entry.arrayBuffer());
  const rawName = sanitizeUploadBaseName(entry.name);
  const filename = `${filenamePrefix}_${rawName}`.slice(0, 200);
  attachments.push({ filename, content: buf });
  return null;
}

function formatShInd(form: FormData, j: number): string {
  const keys: [string, string][] = [
    ["이름", `shInd_${j}_name`],
    ["국적", `shInd_${j}_nationality`],
    ["휴대폰 번호", `shInd_${j}_mobile`],
    ["이메일 주소", `shInd_${j}_email`],
    ["최종학력 / 학교 및 전공", `shInd_${j}_education`],
    ["출생일", `shInd_${j}_dob`],
    ["출생지 (도시명)", `shInd_${j}_pob`],
    ["인도 주소", `shInd_${j}_addrIndia`],
    ["한국 주소", `shInd_${j}_addrKorea`],
    ["아버지 성함", `shInd_${j}_fatherName`],
    ["인도 내 타회사 이사 등재 여부 및 보유 주식수", `shInd_${j}_otherDir`],
  ];
  return keys.map(([label, key]) => `  ${label}: ${str(form, key) || "(없음)"}`).join("\n");
}

function formatShCorp(form: FormData, j: number): string {
  const keys: [string, string][] = [
    ["회사 정식 명칭 (영문·현지어)", `shCorp_${j}_legalName`],
    ["등록국·등록번호", `shCorp_${j}_regCountryNo`],
    ["본점 주소", `shCorp_${j}_hqAddress`],
    ["대표자 성명·직책", `shCorp_${j}_rep`],
    ["지분율 (%)", `shCorp_${j}_sharePct`],
    ["회사 대표 이메일", `shCorp_${j}_email`],
    ["회사 대표 전화", `shCorp_${j}_phone`],
  ];
  return keys.map(([label, key]) => `  ${label}: ${str(form, key) || "(없음)"}`).join("\n");
}

function formatShCorpAttachSummary(form: FormData, j: number): string {
  const rows: [string, string][] = [
    ["법인 영문 사업자 등록증", `shCorpAttach_${j}_businessRegEng`],
    ["법인 정관", `shCorpAttach_${j}_articles`],
    ["법인 영문 주소 확인증 (세금 납부 확인증)", `shCorpAttach_${j}_addressTaxProof`],
    ["영문 이사 리스트", `shCorpAttach_${j}_directorsListEn`],
    ["영문 주주 명부 리스트 (주식 10% 이상)", `shCorpAttach_${j}_shareholdersRegister10En`],
  ];
  return rows
    .map(([label, key]) => {
      const e = form.get(key);
      const name = e instanceof File && e.size > 0 ? e.name : "(미첨부)";
      return `  ${label}: ${name}`;
    })
    .join("\n");
}

function formatShareholderDetailBlock(form: FormData, j: number): string {
  const kind = shareholderKind(form, j);
  const head = `— 9. 주주 상세 · 주주 ${j + 1} (${kind === "company" ? "법인" : "개인"}) —\n`;
  const same = str(form, `shareholderSameDirector_${j}`);
  const sameNote =
    kind === "individual" && same !== "" && /^\d+$/.test(same)
      ? `※ 본 주주는 등기이사 ${Number.parseInt(same, 10) + 1}의 6번·8.1 입력과 연동(자동 반영)되었습니다.\n`
      : "";
  const body = kind === "company" ? formatShCorp(form, j) : formatShInd(form, j);
  const attach =
    kind === "company" ? `\n첨부:\n${formatShCorpAttachSummary(form, j)}\n` : "";
  return `${head}${sameNote}${body}${attach}\n`;
}

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    if (String(form.get("website") ?? "").trim()) {
      return NextResponse.json({ ok: true });
    }

    const applicantName = str(form, "applicantName");
    const applicantEmail = str(form, "applicantEmail");
    const applicantPhone = str(form, "applicantPhone");

    const corpName1 = str(form, "corpName1");
    const corpName2 = str(form, "corpName2");
    const corpName3 = str(form, "corpName3");
    const addressFull = str(form, "addressFull");
    const capitalSubscribed = str(form, "capitalSubscribed");
    const capitalPaidIn = str(form, "capitalPaidIn");
    const capitalAuthorized = str(form, "capitalAuthorized");
    const shareholderRowCount = intInRange(str(form, "shareholderRowCount"), ROW_MIN, ROW_MIN, ROW_MAX);
    const directorRowCount = intInRange(str(form, "directorRowCount"), ROW_MIN, ROW_MIN, ROW_MAX);
    const directorExtraInfo = str(form, "directorExtraInfo");
    const shareholderOtherNotes = str(form, "shareholderOtherNotes");
    const attachmentNotes = str(form, "attachmentNotes");

    if (!applicantName || !applicantEmail || !corpName1 || !addressFull) {
      return NextResponse.json(
        { error: "신청자 이름·이메일·법인명(1순위)·본점 주소는 필수입니다." },
        { status: 400 },
      );
    }
    if (!emailRe.test(applicantEmail)) {
      return NextResponse.json({ error: "이메일 형식이 올바르지 않습니다." }, { status: 400 });
    }
    if (applicantName.length > 120 || applicantEmail.length > 254) {
      return NextResponse.json({ error: "입력 길이가 허용 범위를 넘었습니다." }, { status: 400 });
    }

    const settings = await readMailSettings();
    const recipients = parseSmtpRecipientList(settings.toAddress);
    if (!settings.host || recipients.length === 0) {
      return NextResponse.json(
        { error: "메일 서버가 설정되지 않았습니다. 잠시 후 다시 시도하거나 이메일로 직접 연락해 주세요." },
        { status: 503 },
      );
    }

    const attachments: { filename: string; content: Buffer }[] = [];

    const dirAttachSlots: [string, string][] = [
      ["passport", "여권"],
      ["residence", "영문주민등록"],
      ["photo", "증명사진"],
      ["license", "운전면허"],
    ];
    for (let i = 0; i < directorRowCount; i++) {
      const n = i + 1;
      for (const [suffix, shortLabel] of dirAttachSlots) {
        const err = await addFormFileIfPresent(
          form,
          `dirAttach_${i}_${suffix}`,
          attachments,
          `이사${n}_${shortLabel}`,
        );
        if (err) {
          return NextResponse.json({ error: err }, { status: 400 });
        }
      }
    }

    const shCorpAttachSlots: [string, string][] = [
      ["businessRegEng", "영문사업자등록"],
      ["articles", "법인정관"],
      ["addressTaxProof", "영문주소_세금납부"],
      ["directorsListEn", "영문이사리스트"],
      ["shareholdersRegister10En", "영문주주명부10pct"],
    ];
    for (let j = 0; j < shareholderRowCount; j++) {
      if (shareholderKind(form, j) !== "company") continue;
      const m = j + 1;
      for (const [suffix, shortLabel] of shCorpAttachSlots) {
        const err = await addFormFileIfPresent(
          form,
          `shCorpAttach_${j}_${suffix}`,
          attachments,
          `법인주주${m}_${shortLabel}`,
        );
        if (err) {
          return NextResponse.json({ error: err }, { status: 400 });
        }
      }
    }

    const fileEntries = form.getAll("attachments");
    for (const entry of fileEntries) {
      if (!(entry instanceof File) || entry.size === 0) continue;
      if (attachments.length >= MAX_FILES) {
        return NextResponse.json({ error: `첨부 파일은 최대 ${MAX_FILES}개까지입니다.` }, { status: 400 });
      }
      if (entry.size > MAX_FILE_BYTES) {
        return NextResponse.json(
          { error: `각 첨부 파일은 ${MAX_FILE_BYTES / 1024 / 1024}MB 이하여야 합니다: ${entry.name}` },
          { status: 400 },
        );
      }
      const buf = Buffer.from(await entry.arrayBuffer());
      const rawName = entry.name.replace(/[^\w.\-()\uAC00-\uD7A3\s]/g, "_").slice(0, 180) || "attachment";
      attachments.push({ filename: rawName, content: buf });
    }

    const shareholdingBlock = formatShareholding(form, shareholderRowCount);
    const directorNamesBlock = formatDirectorNames(form, directorRowCount);
    const dirEnBlocks = Array.from({ length: directorRowCount }, (_, i) => {
      return (
        `— 8.1 필요정보 (영문작성) · 이사 ${i + 1} —\n` +
        `${formatDirEn(form, i)}\n` +
        `첨부:\n${formatDirAttachSummary(form, i)}\n`
      );
    }).join("\n");
    const shDetailBlocks = Array.from({ length: shareholderRowCount }, (_, j) =>
      formatShareholderDetailBlock(form, j),
    ).join("\n");

    const body =
      `[웹] 법인 설립 신청서\n\n` +
      `— 신청자 —\n` +
      `이름: ${applicantName}\n` +
      `이메일: ${applicantEmail}\n` +
      `전화: ${applicantPhone || "(없음)"}\n\n` +
      `— 법인명 후보(1~3순위) —\n` +
      `1순위: ${corpName1}\n` +
      `2순위: ${corpName2 || "(없음)"}\n` +
      `3순위: ${corpName3 || "(없음)"}\n\n` +
      `— 본점 주소 —\n${addressFull}\n\n` +
      `— 자본금 —\n` +
      `자본금(인수/약정 등): ${capitalSubscribed || "(없음)"}\n` +
      `납입자본금: ${capitalPaidIn || "(없음)"}\n` +
      `수권자본금(Authorized): ${capitalAuthorized || "(없음)"}\n\n` +
      `— 5. 지분구조 —\n${shareholdingBlock}\n\n` +
      `— 6. 등기이사 —\n${directorNamesBlock}\n\n` +
      `${dirEnBlocks}\n` +
      `${shDetailBlocks}\n` +
      `— 등기이사 추가 정보 —\n${directorExtraInfo || "(없음)"}\n\n` +
      `— 주주 관련 추가 메모 —\n${shareholderOtherNotes || "(없음)"}\n\n` +
      `— 첨부 관련 메모 —\n${attachmentNotes || "(없음)"}\n`;

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
        { error: "메일 발신 설정이 비어 있습니다. 관리자 메일 설정을 확인하세요." },
        { status: 503 },
      );
    }

    const fromHeader = `"${safeDisplayName(applicantName)}" <${applicantEmail}>`;

    await transporter.sendMail({
      envelope: { from: envelopeFrom, to: recipients },
      from: fromHeader,
      replyTo: applicantEmail,
      to: recipients,
      subject: `[법인 설립 신청] ${corpName1} (${applicantName})`,
      text: body,
      attachments: attachments.length ? attachments : undefined,
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[corporate-incorporation-apply]", e);
    return NextResponse.json(
      { error: "신청 전송에 실패했습니다. 잠시 후 다시 시도해 주세요." },
      { status: 500 },
    );
  }
}
