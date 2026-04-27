import { OngoingTasksManager } from "@/components/admin/OngoingTasksManager";
import { readOngoingTasks, sortOngoingTasks } from "@/lib/ongoing-tasks-store";

export default async function AdminOngoingTasksPage() {
  const initialItems = sortOngoingTasks(await readOngoingTasks());

  return (
    <div>
      <h1 className="text-xl font-semibold text-zinc-900">진행중인 업무</h1>
      <p className="mt-1 text-sm text-zinc-600">홈페이지에 노출할 현재 진행 업무를 등록하세요.</p>
      <div className="mt-8">
        <OngoingTasksManager initialItems={initialItems} />
      </div>
    </div>
  );
}
