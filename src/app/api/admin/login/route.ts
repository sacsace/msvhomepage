import { NextResponse } from "next/server";
import { adminApiCatchJson } from "@/lib/db-api-error-response";
import {
  ADMIN_COOKIE,
  adminCookieUseSecureForRequest,
  adminPasswordConfigured,
  createAdminToken,
  verifyAdminPassword,
} from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!(await adminPasswordConfigured())) {
    return NextResponse.json(
      { error: "관리자 비밀번호가 설정되지 않았습니다. DB(AdminAuth) 또는 ADMIN_PASSWORD를 확인하세요." },
      { status: 503 },
    );
  }
  try {
    const { password } = (await request.json()) as { password?: string };
    if (!password || !(await verifyAdminPassword(password))) {
      return NextResponse.json({ error: "비밀번호가 올바르지 않습니다." }, { status: 401 });
    }
    const token = await createAdminToken();
    const res = NextResponse.json({ ok: true });
    res.cookies.set(ADMIN_COOKIE, token, {
      httpOnly: true,
      secure: adminCookieUseSecureForRequest(request),
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 3,
    });
    return res;
  } catch (e) {
    console.error("[api/admin/login POST]", e);
    const { status, body } = adminApiCatchJson(e, "로그인 처리 실패");
    return NextResponse.json(body, { status });
  }
}
