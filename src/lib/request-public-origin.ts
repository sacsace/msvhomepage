/**
 * 리다이렉트 `Location` 등에 쓸 브라우저가 열 수 있는 절대 origin.
 * `next dev -H 0.0.0.0` 일 때 `request.url` 이 `http://0.0.0.0:3100/...` 이면 브라우저는 `ERR_ADDRESS_INVALID` 가 나므로
 * `Host` / `X-Forwarded-Host` 로 보정합니다.
 */
export function requestPublicOrigin(request: Request): string {
  const u = new URL(request.url);
  const xfHost = request.headers.get("x-forwarded-host")?.split(",")[0]?.trim();
  const rawHost = xfHost || request.headers.get("host")?.trim() || u.host;
  let host = rawHost;
  const hl = host.toLowerCase();
  if (hl === "0.0.0.0" || hl.startsWith("0.0.0.0:") || hl === "[::]" || hl.startsWith("[::]:")) {
    host = u.port ? `localhost:${u.port}` : "localhost";
  }
  const xfProto = request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim().toLowerCase();
  const proto = xfProto === "https" || u.protocol === "https:" ? "https" : "http";
  return `${proto}://${host}`;
}
