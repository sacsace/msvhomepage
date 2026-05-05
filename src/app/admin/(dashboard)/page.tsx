import Link from "next/link";

export default function AdminHomePage() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-zinc-900">대시보드</h1>
      <p className="mt-2 max-w-lg text-sm text-zinc-600">
        프로젝트 현황, 공지사항, 자료실을 이곳에서 관리할 수 있습니다. 변경 사항은 즉시 사이트에
        반영됩니다.
      </p>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        <li>
          <Link
            href="/admin/ongoing-tasks"
            className="block border border-zinc-200 bg-white p-5 text-sm transition hover:border-zinc-300"
          >
            <span className="font-medium text-zinc-900">프로젝트 현황 관리</span>
            <span className="mt-1 block text-zinc-500">등록 · 수정 · 삭제</span>
          </Link>
        </li>
        <li>
          <Link
            href="/admin/announcements"
            className="block border border-zinc-200 bg-white p-5 text-sm transition hover:border-zinc-300"
          >
            <span className="font-medium text-zinc-900">공지사항 관리</span>
            <span className="mt-1 block text-zinc-500">등록 · 수정 · 삭제</span>
          </Link>
        </li>
        <li>
          <Link
            href="/admin/articles"
            className="block border border-zinc-200 bg-white p-5 text-sm transition hover:border-zinc-300"
          >
            <span className="font-medium text-zinc-900">자료실 관리</span>
            <span className="mt-1 block text-zinc-500">등록 · 수정 · 삭제</span>
          </Link>
        </li>
        <li>
          <Link
            href="/admin/tax-calendar"
            className="block border border-zinc-200 bg-white p-5 text-sm transition hover:border-zinc-300"
          >
            <span className="font-medium text-zinc-900">신고·준수 달력</span>
            <span className="mt-1 block text-zinc-500">TDS·GST 등 일정 등록 · 수정 · 삭제</span>
          </Link>
        </li>
        <li>
          <Link
            href="/admin/staff-photos"
            className="block border border-zinc-200 bg-white p-5 text-sm transition hover:border-zinc-300"
          >
            <span className="font-medium text-zinc-900">경영진 사진·소개</span>
            <span className="mt-1 block text-zinc-500">리더십 프로필 업로드 및 소개 수정</span>
          </Link>
        </li>
        <li>
          <Link
            href="/admin/staff"
            className="block border border-zinc-200 bg-white p-5 text-sm transition hover:border-zinc-300"
          >
            <span className="font-medium text-zinc-900">직원 사진·소개</span>
            <span className="mt-1 block text-zinc-500">일반 직원 등록 · 수정 · 삭제</span>
          </Link>
        </li>
        <li>
          <Link
            href="/admin/clients"
            className="block border border-zinc-200 bg-white p-5 text-sm transition hover:border-zinc-300"
          >
            <span className="font-medium text-zinc-900">고객사</span>
            <span className="mt-1 block text-zinc-500">등록 · 수정 · 삭제</span>
          </Link>
        </li>
        <li>
          <Link
            href="/admin/mail-settings"
            className="block border border-zinc-200 bg-white p-5 text-sm transition hover:border-zinc-300"
          >
            <span className="font-medium text-zinc-900">메일 서버 (SMTP)</span>
            <span className="mt-1 block text-zinc-500">문의하기 발송 설정</span>
          </Link>
        </li>
        <li>
          <Link
            href="/admin/password"
            className="block border border-zinc-200 bg-white p-5 text-sm transition hover:border-zinc-300"
          >
            <span className="font-medium text-zinc-900">비밀번호 변경</span>
            <span className="mt-1 block text-zinc-500">관리자 로그인 비밀번호</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
