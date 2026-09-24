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
    <div className="flex items-center gap-0 border border-white/20 bg-black/20 p-0.5">
      <button
        type="button"
        onClick={() => select("ko")}
        className={`px-2.5 py-1 text-xs font-semibold transition ${
          locale === "ko" ? "bg-white/15 text-white" : "text-slate-400 hover:text-slate-200"
        }`}
        aria-pressed={locale === "ko"}
      >
        한국어
      </button>
      <button
        type="button"
        onClick={() => select("en")}
        className={`px-2.5 py-1 text-xs font-semibold transition ${
          locale === "en" ? "bg-white/15 text-white" : "text-slate-400 hover:text-slate-200"
        }`}
        aria-pressed={locale === "en"}
      >
        English
      </button>
    </div>
  );
}
