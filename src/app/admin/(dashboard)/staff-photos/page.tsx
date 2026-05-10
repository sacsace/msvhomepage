import { StaffPhotosManager } from "@/components/admin/StaffPhotosManager";
import { getAdminUiLocale } from "@/lib/admin-ui-locale";
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
      <p className="mt-1 text-sm text-zinc-600">
        리더십에 노출되는 경영진 프로필 사진과 소개를 관리합니다. 기본 인원은{" "}
        <code className="text-xs">site-content.ts</code>의 <code className="text-xs">leadership</code>에 정의하고,
        아래에서 추가 경영진을 등록할 수 있습니다.
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
