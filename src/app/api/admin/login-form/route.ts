import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  adminCookieUseSecureForRequest,
  adminPasswordConfigured,
  createAdminToken,
  verifyAdminPassword,
} from "@/lib/admin-auth";
import { requestPublicOrigin } from "@/lib/request-public-origin";

export const runtime = "nodejs";

function loginUrl(request: Request, error?: string): URL {
  const u = new URL("/admin/login", requestPublicOrigin(request));
  if (error) u.searchParams.set("error", error);
  return u;
}

/**
 * HTML 폼 `POST` 전용 — JS 번들이 막혀도 로그인 가능(하이드레이션 불필요).
 * 성공 시 세션 쿠키 설정 후 `/admin` 으로 리다이렉트합니다.
 */
export async function POST(request: Request) {
  if (!(await adminPasswordConfigured())) {
    return NextResponse.redirect(loginUrl(request, "setup"));
  }
  let password = "";
  try {
    const fd = await request.formData();
    password = String(fd.get("password") ?? "").trim();
  } catch {
    return NextResponse.redirect(loginUrl(request, "bad"));
  }
  if (!password || !(await verifyAdminPassword(password))) {
    return NextResponse.redirect(loginUrl(request, "invalid"));
  }
  let token: string;
  try {
    token = await createAdminToken();
  } catch {
    return NextResponse.redirect(loginUrl(request, "setup"));
  }
  const res = NextResponse.redirect(new URL("/admin", requestPublicOrigin(request)));
  res.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: adminCookieUseSecureForRequest(request),
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 3,
  });
  return res;
}

export function GET(request: NextRequest) {
  return NextResponse.redirect(new URL("/admin/login", requestPublicOrigin(request)));
}
