import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { buildSecurityHeaders } from "@/lib/security-headers";
import type { SiteLocale } from "@/lib/site-locale";

function localeFromPath(pathname: string): SiteLocale | null {
  if (pathname === "/en" || pathname.startsWith("/en/")) return "en";
  if (pathname === "/zh" || pathname.startsWith("/zh/")) return "zh";
  return null;
}

function stripLocalePath(pathname: string): string {
  if (pathname === "/en" || pathname === "/zh") return "/";
  if (pathname.startsWith("/en/")) return pathname.slice(3) || "/";
  if (pathname.startsWith("/zh/")) return pathname.slice(3) || "/";
  return pathname;
}

function withSecurityHeaders(response: NextResponse): NextResponse {
  const isProduction = process.env.NODE_ENV === "production";
  for (const { key, value } of buildSecurityHeaders(isProduction)) {
    response.headers.set(key, value);
  }
  return response;
}

/** Next.js 16+ `proxy` 파일 규약 — www 정규화 + 로케일 rewrite + 보안 헤더 */
export function proxy(request: NextRequest) {
  const host = (request.headers.get("host") || "").split(":")[0]?.toLowerCase() ?? "";
  /** apex가 Railway에 연결되면 https://www 로 301 — 잘못된 http://www 포워딩을 앱단에서 바로잡음 */
  if (host === "msventures.in") {
    const dest = request.nextUrl.clone();
    dest.protocol = "https:";
    dest.hostname = "www.msventures.in";
    dest.port = "";
    return withSecurityHeaders(NextResponse.redirect(dest, 301));
  }

  const pathname = request.nextUrl.pathname;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-msv-browser-path", pathname);

  const locale = localeFromPath(pathname);
  if (!locale) {
    return withSecurityHeaders(NextResponse.next({ request: { headers: requestHeaders } }));
  }

  const internalPath = stripLocalePath(pathname);
  const url = request.nextUrl.clone();
  url.pathname = internalPath;

  requestHeaders.set("x-msv-locale", locale);
  return withSecurityHeaders(NextResponse.rewrite(url, { request: { headers: requestHeaders } }));
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|\\.well-known|.*\\..*).*)",
  ],
};
