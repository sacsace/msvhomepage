import { AdminPageViewStatsPanel } from "@/components/admin/AdminPageViewStatsPanel";
import { getAdminUiLocale } from "@/lib/admin-ui-locale";
import { adminPageViewStatsCopy } from "@/lib/admin-ui-strings";
import { getAdminPageViewStats } from "@/lib/page-view-store";

export default async function AdminPageViewStatsPage() {
  const uiLocale = await getAdminUiLocale();
  const pvCopy = adminPageViewStatsCopy(uiLocale);
  const stats = await getAdminPageViewStats();

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">{pvCopy.pageTitle}</h1>
      <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-zinc-600">{pvCopy.pageLead}</p>
      <div className="mt-10">
        <AdminPageViewStatsPanel copy={pvCopy} stats={stats} uiLocale={uiLocale} />
      </div>
    </div>
  );
}
