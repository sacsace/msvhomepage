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
      className="text-left text-sm font-medium text-zinc-800 underline-offset-2 hover:text-zinc-950 hover:underline"
    >
      {label}
    </button>
  );
}
