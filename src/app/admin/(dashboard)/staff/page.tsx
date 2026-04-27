import { StaffProfilesManager } from "@/components/admin/StaffProfilesManager";
import { readStaffProfiles } from "@/lib/staff-profiles-store";

export default async function AdminStaffPage() {
  const initialItems = await readStaffProfiles();

  return (
    <div>
      <h1 className="text-xl font-semibold text-zinc-900">직원 사진 · 소개</h1>
      <p className="mt-1 text-sm text-zinc-600">
        일반 직원의 사진과 소개를 등록·수정합니다. 업로드 파일은{" "}
        <code className="text-xs">public/uploads/staff/</code>에 저장됩니다.
      </p>
      <div className="mt-8">
        <StaffProfilesManager initialItems={initialItems} />
      </div>
    </div>
  );
}
