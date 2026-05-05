import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { readPasswordHash } from "@/lib/admin-password-store";

export const ADMIN_COOKIE = "msv_admin";

/** 요청 URL 또는 `x-forwarded-proto` 기준으로 HTTPS 여부 판별(리버스 프록시 종단 HTTPS 포함). */
export function requestIsHttps(request: Request): boolean {
  const url = new URL(request.url);
  if (url.protocol === "https:") return true;
  const xf = request.headers.get("x-forwarded-proto");
  const first = xf?.split(",")[0]?.trim().toLowerCase();
  return first === "https";
}

/**
 * 관리자 세션 쿠키의 `Secure` 플래그.
 * **실제 HTTPS 요청일 때만 true** — `NODE_ENV=production` 이더라도 `http://192.168.x.x` 로 접속하면 false여서
 * LAN IP·HTTP에서도 로그인 쿠키가 저장됩니다.
 *
 * - `ADMIN_COOKIE_ALLOW_HTTP=1` → 항상 false(강제 HTTP 쿠키, 내부망 전용).
 * - `ADMIN_COOKIE_FORCE_SECURE=1` → 항상 true(특수 프록시 환경용, 비권장).
 */
export function adminCookieUseSecureForRequest(request: Request): boolean {
  if (String(process.env.ADMIN_COOKIE_ALLOW_HTTP || "").trim() === "1") {
    return false;
  }
  if (String(process.env.ADMIN_COOKIE_FORCE_SECURE || "").trim() === "1") {
    return true;
  }
  // `next dev` + LAN IP(http://192.168.x.x): 일부 환경에서 잘못된 x-forwarded-proto 로 Secure 가 켜지면
  // 브라우저가 쿠키를 버려 로그인이 무한 루프처럼 보일 수 있음.
  if (process.env.NODE_ENV === "development") {
    return false;
  }
  return requestIsHttps(request);
}

function resolvedSessionSecret(): string | null {
  const s = process.env.ADMIN_SESSION_SECRET;
  if (s && s.length >= 16) return s;
  if (process.env.NODE_ENV === "development") return "minsub-admin-dev-session-secret-key";
  return null;
}

function secretKey(): Uint8Array | null {
  const s = resolvedSessionSecret();
  if (!s) return null;
  return new TextEncoder().encode(s);
}

export async function createAdminToken(): Promise<string> {
  const key = secretKey();
  if (!key) {
    throw new Error("ADMIN_SESSION_SECRET is not configured");
  }
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("3d")
    .sign(key);
}

export async function verifyAdminToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const key = secretKey();
  if (!key) return false;
  try {
    await jwtVerify(token, key);
    return true;
  } catch {
    return false;
  }
}

/** JWT 발급 가능 여부 (운영에서는 반드시 환경 변수 권장) */
export function adminSessionSecretConfigured(): boolean {
  return secretKey() !== null;
}

/**
 * 로그인 API가 비밀번호를 검증할 수 있는지(DB bcrypt 또는 `ADMIN_PASSWORD`).
 * 없으면 503 으로 막습니다.
 */
export async function adminPasswordConfigured(): Promise<boolean> {
  if (!adminSessionSecretConfigured()) return false;
  if (process.env.ADMIN_PASSWORD?.trim()) return true;
  return Boolean(await readPasswordHash());
}

/**
 * 비밀번호 검증. DB의 bcrypt 해시가 있으면 우선 사용하고,
 * 없으면 환경 변수 `ADMIN_PASSWORD`(평문)와 비교합니다.
 */
export async function verifyAdminPassword(pw: string): Promise<boolean> {
  const hash = await readPasswordHash();
  if (hash) {
    return bcrypt.compareSync(pw, hash);
  }
  const expected = process.env.ADMIN_PASSWORD;
  if (expected) return pw === expected;
  return false;
}
