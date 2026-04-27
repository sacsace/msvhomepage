import { StaffPhotosManager } from "@/components/admin/StaffPhotosManager";
import { getLeadershipForPublic } from "@/lib/leadership-resolve";

export default async function AdminStaffPhotosPage() {
  const members = await getLeadershipForPublic();

  return (
    <div>
      <h1 className="text-xl font-semibold text-zinc-900">경영진 사진 · 소개</h1>
      <p className="mt-1 text-sm text-zinc-600">
        리더십에 노출되는 경영진 프로필 사진과 소개를 관리합니다. 인원은{" "}
        <code className="text-xs">site-content.ts</code>의 <code className="text-xs">leadership</code>과 동일해야
        합니다.
      </p>
      <div className="mt-8">
        <StaffPhotosManager initialMembers={members} />
      </div>
    </div>
  );
}
