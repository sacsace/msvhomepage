import type { LeadershipMember } from "@/types/leadership";
import { readLeadershipSummaries } from "@/lib/leadership-summaries-store";
import { readStaffPhotos } from "@/lib/staff-photos-store";
import { publicFileExists } from "@/lib/public-file";
import { leadership } from "@/lib/site-content";

/** site-content 리더십 + 관리자 업로드 사진/소개(JSON) 병합 */
export async function getLeadershipForPublic(): Promise<LeadershipMember[]> {
  const photoOverrides = await readStaffPhotos();
  const summaryOverrides = await readLeadershipSummaries();
  return leadership.map((m) => {
    const key = m.email.toLowerCase();
    const override = photoOverrides[key];
    const photoSrc =
      override && typeof override === "string" && publicFileExists(override) ? override : m.photoSrc;
    return {
      ...m,
      photoSrc,
      summary: summaryOverrides[key] ?? m.summary,
    };
  });
}
