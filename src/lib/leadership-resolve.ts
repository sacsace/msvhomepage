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
  const staticPart: LeadershipMember[] = await Promise.all(
    leadership.map(async (m) => {
      const key = m.email.toLowerCase();
      const override = photoOverrides[key];
      const photoSrc =
        override && typeof override === "string" && (await publicFileExists(override))
          ? override
          : m.photoSrc;
      const sp = staticProfileOverrides[key];
      const sum = summaryOverrides[key];
      return {
        ...m,
        name: sp?.name ?? m.name,
        role: sp?.role ?? m.role,
        photoSrc,
        summary: sum?.summary ?? m.summary,
        summaryEn: sum?.summaryEn ?? "",
        source: "static" as const,
      };
    }),
  );

  const extras = await readLeadershipExtras();
  const extraPart: LeadershipMember[] = await Promise.all(
    extras.map(async (e) => {
      const key = e.emailLower;
      const override = photoOverrides[key];
      const photoSrc =
        override && typeof override === "string" && (await publicFileExists(override))
          ? override
          : undefined;
      const sum = summaryOverrides[key];
      return {
        role: e.role,
        name: e.name,
        email: e.emailLower,
        summary: sum?.summary ?? "",
        summaryEn: sum?.summaryEn ?? "",
        photoSrc,
        source: "extra" as const,
        sortOrder: e.sortOrder,
      };
    }),
  );

  return [...staticPart, ...extraPart];
}
