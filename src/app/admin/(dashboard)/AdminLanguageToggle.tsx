"use client";

import { useRouter } from "next/navigation";
import { ADMIN_UI_LOCALE_COOKIE, type AdminUiLocale } from "@/lib/admin-ui-locale-constants";

type Props = {
  locale: AdminUiLocale;
};

function setLocaleCookie(next: AdminUiLocale) {
  const maxAge = 60 * 60 * 24 * 365;
  document.cookie = `${ADMIN_UI_LOCALE_COOKIE}=${next}; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
}

export function AdminLanguageToggle({ locale }: Props) {
  const router = useRouter();

  function select(next: AdminUiLocale) {
    if (next === locale) return;
    setLocaleCookie(next);
    router.refresh();
  }

  return (
    <div className="flex items-center gap-1 rounded-md border border-zinc-200 bg-zinc-50 p-0.5">
      <button
        type="button"
        onClick={() => select("ko")}
        className={`rounded px-2 py-1 text-xs font-medium transition ${
          locale === "ko"
            ? "bg-white text-zinc-900 shadow-sm"
            : "text-zinc-500 hover:text-zinc-800"
        }`}
        aria-pressed={locale === "ko"}
      >
        한국어
      </button>
      <button
        type="button"
        onClick={() => select("en")}
        className={`rounded px-2 py-1 text-xs font-medium transition ${
          locale === "en"
            ? "bg-white text-zinc-900 shadow-sm"
            : "text-zinc-500 hover:text-zinc-800"
        }`}
        aria-pressed={locale === "en"}
      >
        English
      </button>
    </div>
  );
}
