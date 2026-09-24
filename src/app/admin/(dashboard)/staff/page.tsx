import { StaffProfilesManager } from "@/components/admin/StaffProfilesManager";
import { ADMIN_PAGE_LEAD_CLASS } from "@/lib/admin-page-layout";
import { readStaffProfiles } from "@/lib/staff-profiles-store";

export default async function AdminStaffPage() {
  const initialItems = await readStaffProfiles();

  return (
    <div>
      <h1 className="text-xl font-semibold text-zinc-900">직원 사진 · 소개</h1>
      <p className={ADMIN_PAGE_LEAD_CLASS}>
        직원 사진·소개 등록·수정 — 업로드 경로: <code className="text-xs">MSV_UPLOADS_ROOT</code> 또는{" "}
        <code className="text-xs">public/uploads/staff/</code>.
      </p>
      <div className="mt-8">
        <StaffProfilesManager initialItems={initialItems} />
      </div>
    </div>
  );
}
