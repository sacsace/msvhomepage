import { NextResponse } from "next/server";
import { ADMIN_COOKIE, adminCookieUseSecureForRequest } from "@/lib/admin-auth";

export async function POST(request: Request) {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, "", {
    httpOnly: true,
    secure: adminCookieUseSecureForRequest(request),
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return res;
}
