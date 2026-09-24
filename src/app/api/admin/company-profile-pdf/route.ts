import { NextResponse } from "next/server";
import {
  COMPANY_PROFILE_PDF_MAX_BYTES,
  isPdfUpload,
  readCompanyProfilePdfMeta,
  writeCompanyProfilePdf,
} from "@/lib/company-profile-pdf";
import { adminApiCatchResponse } from "@/lib/db-api-error-response";
import { requireAdmin } from "@/lib/require-admin";

export const runtime = "nodejs";

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;
  try {
    const meta = await readCompanyProfilePdfMeta();
    return NextResponse.json(meta);
  } catch (e) {
    console.error("[api/admin/company-profile-pdf GET]", e);
    return adminApiCatchResponse(e, "조회 실패");
  }
}

export async function POST(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    if (!(file instanceof File) || file.size === 0) {
      return NextResponse.json({ error: "PDF 파일을 선택해 주세요." }, { status: 400 });
    }
    if (!isPdfUpload(file)) {
      return NextResponse.json({ error: "PDF 파일만 업로드할 수 있습니다." }, { status: 400 });
    }
    if (file.size > COMPANY_PROFILE_PDF_MAX_BYTES) {
      return NextResponse.json({ error: "파일은 25MB 이하여야 합니다." }, { status: 400 });
    }
    const buf = Buffer.from(await file.arrayBuffer());
    if (buf.length < 5 || buf.subarray(0, 5).toString("ascii") !== "%PDF-") {
      return NextResponse.json({ error: "유효한 PDF 파일이 아닙니다." }, { status: 400 });
    }
    const meta = await writeCompanyProfilePdf(buf);
    return NextResponse.json(meta, { status: 201 });
  } catch (e) {
    console.error("[api/admin/company-profile-pdf POST]", e);
    return adminApiCatchResponse(e, "업로드 실패");
  }
}
