import { StaffPhotosManager } from "@/components/admin/StaffPhotosManager";
import { getAdminUiLocale } from "@/lib/admin-ui-locale";
import { ADMIN_PAGE_LEAD_CLASS } from "@/lib/admin-page-layout";
import { getLeadershipForPublic } from "@/lib/leadership-resolve";

function staffPhotosClientKey(members: Awaited<ReturnType<typeof getLeadershipForPublic>>) {
  return members
    .map((m) =>
      [
        m.email,
        m.name,
        m.role,
        m.summary,
        m.summaryEn ?? "",
        m.photoSrc ?? "",
        String(m.sortOrder ?? ""),
        m.source ?? "",
      ].join("\t"),
    )
    .join("\n");
}

export default async function AdminStaffPhotosPage() {
  const members = await getLeadershipForPublic();
  const adminUiLocale = await getAdminUiLocale();

  return (
    <div>
      <h1 className="text-xl font-semibold text-zinc-900">경영진 사진 · 소개</h1>
      <p className={ADMIN_PAGE_LEAD_CLASS}>
        경영진 프로필 사진·소개 관리 — 기본 인원은 <code className="text-xs">site-content.ts</code> ·{" "}
        <code className="text-xs">leadership</code>, 추가 등록 가능.
      </p>
      <div className="mt-8">
        <StaffPhotosManager
          key={staffPhotosClientKey(members)}
          initialMembers={members}
          adminUiLocale={adminUiLocale}
        />
      </div>
    </div>
  );
}
