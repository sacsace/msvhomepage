import { headers } from "next/headers";

/** 미들웨어가 넣는 주소창 기준 경로 (`/en/about` 등). rewrite 내부 경로와 구분됩니다. */
export async function getRequestBrowserPath(): Promise<string> {
  const h = await headers();
  const p = h.get("x-msv-browser-path");
  if (p && p.startsWith("/")) return p;
  return "/";
}
