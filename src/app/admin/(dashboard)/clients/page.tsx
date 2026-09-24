import { ClientsManager } from "@/components/admin/ClientsManager";
import { ADMIN_PAGE_LEAD_CLASS } from "@/lib/admin-page-layout";
import { readClients, sortClientsPublic } from "@/lib/clients-store";

export default async function AdminClientsPage() {
  const initialItems = sortClientsPublic(await readClients());

  return (
    <div>
      <h1 className="text-xl font-semibold text-zinc-900">고객사</h1>
      <p className={ADMIN_PAGE_LEAD_CLASS}>
        메인 「주요 고객사」는 「메인 화면」 지정 항목 최대 12곳 — 전체 목록은{" "}
        <code className="rounded bg-zinc-100 px-1 text-xs">/about/clients</code>.
      </p>
      <div className="mt-8">
        <ClientsManager initialItems={initialItems} />
      </div>
    </div>
  );
}
