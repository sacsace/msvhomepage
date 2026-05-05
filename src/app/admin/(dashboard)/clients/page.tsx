import { ClientsManager } from "@/components/admin/ClientsManager";
import { readClients, sortClientsPublic } from "@/lib/clients-store";

export default async function AdminClientsPage() {
  const initialItems = sortClientsPublic(await readClients());

  return (
    <div>
      <h1 className="text-xl font-semibold text-zinc-900">고객사</h1>
      <p className="mt-1 text-sm text-zinc-600">
        메인 화면 「해외 투자·송금」 블록 바로 아래 「주요 고객사」에는, 아래 목록에서 「메인 화면」으로 고른 항목이 최대 12곳까지 나갑니다. 전체 고객사 소개는{" "}
        <code className="rounded bg-zinc-100 px-1 text-xs">/about/clients</code> 에서 보입니다.
      </p>
      <div className="mt-8">
        <ClientsManager initialItems={initialItems} />
      </div>
    </div>
  );
}
