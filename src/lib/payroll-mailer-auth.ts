import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { adminCookieUseSecureForRequest, adminSessionSecretConfigured } from "@/lib/admin-auth";
import { readPayrollMailerPasswordHash } from "@/lib/payroll-mailer-password-store";

export const PAYROLL_MAILER_COOKIE = "msv_payroll_mailer";

const SESSION_MAX_AGE_SEC = 8 * 60 * 60;

function secretKey(): Uint8Array | null {
  const s = process.env.ADMIN_SESSION_SECRET;
  if (s && s.length >= 16) return new TextEncoder().encode(s);
  if (process.env.NODE_ENV === "development") return new TextEncoder().encode("minsub-admin-dev-session-secret-key");
  return null;
}

export async function createPayrollMailerToken(): Promise<string> {
  const key = secretKey();
  if (!key) {
    throw new Error("ADMIN_SESSION_SECRET is not configured");
  }
  return new SignJWT({ role: "payroll-mailer" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE_SEC}s`)
    .sign(key);
}

export async function verifyPayrollMailerToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const key = secretKey();
  if (!key) return false;
  try {
    const { payload } = await jwtVerify(token, key);
    return payload.role === "payroll-mailer";
  } catch {
    return false;
  }
}

export async function payrollMailerPasswordConfigured(): Promise<boolean> {
  if (!adminSessionSecretConfigured()) return false;
  return Boolean(await readPayrollMailerPasswordHash());
}

export async function verifyPayrollMailerPassword(pw: string): Promise<boolean> {
  const hash = await readPayrollMailerPasswordHash();
  if (!hash) return false;
  return bcrypt.compareSync(pw, hash);
}

export function payrollMailerCookieOptions(request: Request) {
  return {
    httpOnly: true,
    secure: adminCookieUseSecureForRequest(request),
    sameSite: "lax" as const,
    path: "/",
    maxAge: SESSION_MAX_AGE_SEC,
  };
}
