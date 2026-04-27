import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { findArticleBySlug } from "@/lib/articles-store";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await findArticleBySlug(decodeURIComponent(slug));
  return { title: article?.title ?? "글" };
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = await findArticleBySlug(decodeURIComponent(slug));
  if (!article) notFound();

  return (
    <>
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-10">
          <p className="text-sm text-slate-500">
            <Link href="/" className="hover:text-slate-800">
              홈
            </Link>
            <span className="mx-1.5 text-slate-300">/</span>
            <Link href="/articles" className="hover:text-slate-800">
              관련 글
            </Link>
          </p>
          <time
            dateTime={article.createdAt}
            className="mt-3 block text-xs text-slate-400 tabular-nums"
          >
            {new Date(article.createdAt).toLocaleDateString("ko-KR")}
          </time>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            {article.title}
          </h1>
          {article.excerpt ? (
            <p className="mt-3 text-sm leading-relaxed text-slate-600">{article.excerpt}</p>
          ) : null}
        </div>
      </div>
      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-12">
        <div className="text-sm leading-relaxed text-slate-700">
          <p className="whitespace-pre-wrap">{article.body}</p>
        </div>
        <p className="mt-12 border-t border-slate-100 pt-8 text-sm">
          <Link href="/articles" className="text-slate-600 underline-offset-4 hover:underline">
            ← 목록
          </Link>
        </p>
      </article>
    </>
  );
}
