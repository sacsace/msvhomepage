import { NextResponse } from "next/server";
import { recordSitePageView } from "@/lib/page-view-store";

export const runtime = "nodejs";

function isAllowedPublicPath(path: string): boolean {
  if (path.length < 1 || path.length > 512) return false;
  if (!path.startsWith("/")) return false;
  if (path.startsWith("/admin")) return false;
  if (path.startsWith("/api")) return false;
  if (path.includes("..")) return false;
  /** 정적·메타 경로는 제외 */
  if (path === "/favicon.ico" || path === "/robots.txt" || path === "/sitemap.xml") return false;
  return true;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { path?: unknown; referrer?: unknown };
    const path = typeof body.path === "string" ? body.path.trim() : "";
    const fromBody =
      typeof body.referrer === "string" && body.referrer.trim()
        ? body.referrer.trim().slice(0, 512)
        : null;
    const fromHeader =
      request.headers.get("referer")?.trim().slice(0, 512) ||
      request.headers.get("referrer")?.trim().slice(0, 512) ||
      null;
    /** 본문(document.referrer) 우선, 없으면 요청 Referer(같은 출처 내 이전 URL 등) */
    const referrer = fromBody || fromHeader || null;
    if (!isAllowedPublicPath(path)) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }
    await recordSitePageView(path, referrer);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[api/public/page-view POST]", e);
    /** 기록 실패해도 사용자 경험은 유지 */
    return new NextResponse(null, { status: 204 });
  }
}
