import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { readAnnouncements } from "@/lib/announcements-store";
import { hasHtmlTag, sanitizeRichHtml } from "@/lib/richtext";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const list = await readAnnouncements();
  const item = list.find((a) => a.id === id);
  return { title: item?.title ?? "공지" };
}

export default async function NoticeDetailPage({ params }: Props) {
  const { id } = await params;
  const list = await readAnnouncements();
  const item = list.find((a) => a.id === id);
  if (!item) notFound();

  return (
    <>
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-10">
          <p className="text-sm text-slate-500">
            <Link href="/" className="hover:text-slate-800">
              홈
            </Link>
            <span className="mx-1.5 text-slate-300">/</span>
            <Link href="/notice" className="hover:text-slate-800">
              공지사항
            </Link>
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-400">
            {item.pinned ? (
              <span className="rounded border border-slate-200 px-1.5 py-0.5 font-medium text-slate-500">
                고정
              </span>
            ) : null}
            <time dateTime={item.createdAt} className="tabular-nums">
              {new Date(item.createdAt).toLocaleString("ko-KR")}
            </time>
          </div>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            {item.title}
          </h1>
        </div>
      </div>
      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-12">
        {hasHtmlTag(item.body) ? (
          <div
            className="text-sm leading-relaxed text-slate-700 [&_a]:text-msv-blue [&_a]:underline [&_img]:h-auto [&_img]:max-w-full [&_li]:ml-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:my-2 [&_ul]:list-disc [&_ul]:pl-5"
            dangerouslySetInnerHTML={{ __html: sanitizeRichHtml(item.body) }}
          />
        ) : (
          <div className="text-sm leading-relaxed text-slate-700">
            <p className="whitespace-pre-wrap">{item.body}</p>
          </div>
        )}
        <p className="mt-12 border-t border-slate-100 pt-8 text-sm">
          <Link href="/notice" className="text-slate-600 underline-offset-4 hover:underline">
            ← 목록
          </Link>
        </p>
      </article>
    </>
  );
}
