import type { LeadershipMember } from "@/types/leadership";
import { readLeadershipExtras } from "@/lib/leadership-extra-store";
import { readLeadershipStaticProfiles } from "@/lib/leadership-static-profile-store";
import { readLeadershipSummaries } from "@/lib/leadership-summaries-store";
import { readStaffPhotos } from "@/lib/staff-photos-store";
import { publicFileExists } from "@/lib/public-file";
import { leadership } from "@/lib/site-content";

/** site-content 리더십 + DB 추가 인원 + 관리자 업로드 사진·소개 병합 */
export async function getLeadershipForPublic(): Promise<LeadershipMember[]> {
  const photoOverrides = await readStaffPhotos();
  const summaryOverrides = await readLeadershipSummaries();
  const staticProfileOverrides = await readLeadershipStaticProfiles();
  const staticPart: LeadershipMember[] = leadership.map((m) => {
    const key = m.email.toLowerCase();
    const override = photoOverrides[key];
    const photoSrc =
      override && typeof override === "string" && publicFileExists(override) ? override : m.photoSrc;
    const sp = staticProfileOverrides[key];
    return {
      ...m,
      name: sp?.name ?? m.name,
      role: sp?.role ?? m.role,
      photoSrc,
      summary: summaryOverrides[key] ?? m.summary,
      source: "static" as const,
    };
  });

  const extras = await readLeadershipExtras();
  const extraPart: LeadershipMember[] = extras.map((e) => {
    const key = e.emailLower;
    const override = photoOverrides[key];
    const photoSrc =
      override && typeof override === "string" && publicFileExists(override) ? override : undefined;
    return {
      role: e.role,
      name: e.name,
      email: e.emailLower,
      summary: summaryOverrides[key] ?? "",
      photoSrc,
      source: "extra" as const,
      sortOrder: e.sortOrder,
    };
  });

  return [...staticPart, ...extraPart];
}
