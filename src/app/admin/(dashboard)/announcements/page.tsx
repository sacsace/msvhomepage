import { AnnouncementsManager } from "@/components/admin/AnnouncementsManager";
import { readAnnouncements } from "@/lib/announcements-store";

export default async function AdminAnnouncementsPage() {
  const initialItems = await readAnnouncements();

  return (
    <div>
      <h1 className="text-xl font-semibold text-zinc-900">공지사항</h1>
      <p className="mt-1 text-sm text-zinc-600">고정 공지는 목록 상단에 표시됩니다.</p>
      <div className="mt-8">
        <AnnouncementsManager initialItems={initialItems} />
      </div>
    </div>
  );
}
