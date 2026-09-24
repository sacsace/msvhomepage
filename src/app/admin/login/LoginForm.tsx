"use client";

import { useState } from "react";
import { PasswordInput } from "@/components/admin/PasswordInput";

const LOGIN_ERRORS: Record<string, string> = {
  invalid: "아이디 또는 비밀번호가 올바르지 않습니다.",
  setup: "관리자 비밀번호가 설정되지 않았습니다.",
  bad: "요청 형식이 올바르지 않습니다.",
};

type Props = {
  /** `/api/admin/login-form` 실패 시 `?error=` 코드 */
  error?: string;
};

/**
 * 네이티브 `POST` 폼 — LAN 등에서 `/_next` JS 가 막혀도 로그인됩니다.
 * (주소창이 `.../admin/login?` 만 남는 경우는 보통 JS 미동작 후 GET 제출입니다.)
 */
export function LoginForm({ error }: Props) {
  const [password, setPassword] = useState("");
  const msg =
    error && Object.prototype.hasOwnProperty.call(LOGIN_ERRORS, error)
      ? LOGIN_ERRORS[error]
      : error
        ? "로그인에 실패했습니다."
        : null;

  return (
    <form method="POST" action="/api/admin/login-form" className="mt-8 space-y-4">
      <div>
        <label htmlFor="loginId" className="block text-xs font-medium text-zinc-600">
          아이디
        </label>
        <input
          id="loginId"
          name="loginId"
          type="text"
          autoComplete="username"
          required
          className="mt-1.5 w-full border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-400"
        />
      </div>
      <PasswordInput
        id="pw"
        name="password"
        label="비밀번호"
        value={password}
        onChange={setPassword}
        autoComplete="current-password"
        variant="login"
      />
      {msg ? <p className="text-sm text-red-600">{msg}</p> : null}
      <button
        type="submit"
        className="w-full border border-zinc-900 bg-zinc-900 py-2.5 text-sm font-medium text-white hover:bg-zinc-800"
      >
        로그인
      </button>
    </form>
  );
}
