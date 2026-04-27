import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { readPasswordHashSync } from "@/lib/admin-password-store";

export const ADMIN_COOKIE = "msv_admin";

const DEV_FALLBACK_SESSION_SECRET = "minsub-admin-dev-session-secret-key";

function resolvedSessionSecret(): string | null {
  const s = process.env.ADMIN_SESSION_SECRET;
  if (s && s.length >= 16) return s;
  if (process.env.NODE_ENV === "development") return DEV_FALLBACK_SESSION_SECRET;
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

/** 로그인 가능: 세션 키 + (파일 해시 또는 ADMIN_PASSWORD) */
export function adminPasswordConfigured(): boolean {
  if (!adminSessionSecretConfigured()) return false;
  if (process.env.ADMIN_PASSWORD && process.env.ADMIN_PASSWORD.length > 0) return true;
  return Boolean(readPasswordHashSync());
}

/**
 * 비밀번호 검증. `data/admin-auth.json`의 bcrypt 해시가 있으면 우선 사용하고,
 * 없으면 환경 변수 `ADMIN_PASSWORD`(평문)와 비교합니다.
 */
export function verifyAdminPassword(pw: string): boolean {
  const hash = readPasswordHashSync();
  if (hash) {
    return bcrypt.compareSync(pw, hash);
  }
  const expected = process.env.ADMIN_PASSWORD;
  if (expected) return pw === expected;
  return false;
}
