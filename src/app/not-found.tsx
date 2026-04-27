import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-md flex-col px-4 py-20 text-center">
      <p className="text-xs text-slate-500">404</p>
      <h1 className="mt-2 text-xl font-semibold text-slate-900">페이지를 찾을 수 없습니다</h1>
      <p className="mt-2 text-sm text-slate-600">주소를 다시 확인해 주세요.</p>
      <Link href="/" className="mt-8 text-sm text-slate-900 underline-offset-2 hover:underline">
        홈으로
      </Link>
    </div>
  );
}
