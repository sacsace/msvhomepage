import { ClientsManager } from "@/components/admin/ClientsManager";
import { readClients, sortClientsPublic } from "@/lib/clients-store";

export default async function AdminClientsPage() {
  const initialItems = sortClientsPublic(await readClients());

  return (
    <div>
      <h1 className="text-xl font-semibold text-zinc-900">고객사</h1>
      <p className="mt-1 text-sm text-zinc-600">홈페이지 고객사·레퍼런스 섹션에 표시됩니다.</p>
      <div className="mt-8">
        <ClientsManager initialItems={initialItems} />
      </div>
    </div>
  );
}
