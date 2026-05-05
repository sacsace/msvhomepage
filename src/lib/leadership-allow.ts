import { leadership } from "@/lib/site-content";
import { getLeadershipExtra } from "@/lib/leadership-extra-store";

/** 경영진 사진·소개 API 허용 이메일: site-content 또는 DB 추가 인원 */
export async function isLeadershipEmailAllowed(emailLower: string): Promise<boolean> {
  const key = emailLower.trim().toLowerCase();
  if (!key) return false;
  if (leadership.some((m) => m.email.toLowerCase() === key)) return true;
  const extra = await getLeadershipExtra(key);
  return Boolean(extra);
}
