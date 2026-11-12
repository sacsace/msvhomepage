/**
 * 공개 사이트 HTTP 보안 헤더 — Next.js `headers()` 및 middleware에서 공통 사용.
 * CSP는 Next·Tailwind·Google Maps embed와의 호환을 유지하는 수준으로 설정합니다.
 */

export type SecurityHeader = { key: string; value: string };

export function buildContentSecurityPolicy(isProduction: boolean): string {
  const scriptSrc = isProduction
    ? "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com"
    : "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com";

  const connectSrc = isProduction
    ? "connect-src 'self' https:"
    : "connect-src 'self' https: http: ws: wss: blob:";

  return [
    "default-src 'self'",
    scriptSrc,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https:",
    "font-src 'self' data:",
    connectSrc,
    "frame-src 'self' blob: https://maps.google.com https://www.google.com https://www.googletagmanager.com",
    "frame-ancestors 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
    isProduction ? "upgrade-insecure-requests" : "",
  ]
    .filter(Boolean)
    .join("; ");
}

export function buildSecurityHeaders(isProduction: boolean): SecurityHeader[] {
  const headers: SecurityHeader[] = [
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "X-Frame-Options", value: "SAMEORIGIN" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
    /**
     * 공개 마케팅 사이트는 `same-site`보다 `cross-origin`이 안전합니다.
     * Googlebot 렌더·Search Console URL 검사에서 CORP 과다 제한이 간헐적 fetch 실패로 이어질 수 있습니다.
     */
    { key: "Cross-Origin-Resource-Policy", value: "cross-origin" },
    {
      key: "Permissions-Policy",
      value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
    },
    { key: "X-DNS-Prefetch-Control", value: "on" },
    { key: "Content-Security-Policy", value: buildContentSecurityPolicy(isProduction) },
  ];

  if (isProduction) {
    headers.push({
      key: "Strict-Transport-Security",
      value: "max-age=63072000; includeSubDomains; preload",
    });
  }

  return headers;
}
