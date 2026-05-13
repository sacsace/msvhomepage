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
    <div className="flex items-center gap-1 rounded-lg border border-zinc-300 bg-zinc-100/90 p-0.5 shadow-sm">
      <button
        type="button"
        onClick={() => select("ko")}
        className={`rounded-md px-2.5 py-1 text-xs font-semibold transition ${
          locale === "ko"
            ? "bg-white text-zinc-950 shadow-sm ring-1 ring-zinc-300/80"
            : "text-zinc-700 hover:bg-zinc-200/80 hover:text-zinc-950"
        }`}
        aria-pressed={locale === "ko"}
      >
        한국어
      </button>
      <button
        type="button"
        onClick={() => select("en")}
        className={`rounded-md px-2.5 py-1 text-xs font-semibold transition ${
          locale === "en"
            ? "bg-white text-zinc-950 shadow-sm ring-1 ring-zinc-300/80"
            : "text-zinc-700 hover:bg-zinc-200/80 hover:text-zinc-950"
        }`}
        aria-pressed={locale === "en"}
      >
        English
      </button>
    </div>
  );
}
