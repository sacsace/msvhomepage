"use client";

import { useRouter } from "next/navigation";

type Props = {
  label?: string;
};

export function LogoutButton({ label = "로그아웃" }: Props) {
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={() => void logout()}
      className="text-left text-sm font-medium text-slate-300 underline-offset-2 hover:text-white hover:underline"
    >
      {label}
    </button>
  );
}
