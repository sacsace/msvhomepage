import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { findGroupCompanyBySlug } from "@/lib/group-companies";
import { groupCompanies } from "@/lib/site-content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return groupCompanies.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const g = findGroupCompanyBySlug(slug);
  if (!g) return { title: "함께하는 회사" };
  return {
    title: `${g.menuLabel} | 함께하는 회사`,
    description: `${g.legalName} — ${g.role}`,
  };
}

export default async function GroupCompanyPage({ params }: Props) {
  const { slug } = await params;
  const g = findGroupCompanyBySlug(slug);
  if (!g) notFound();

  return (
    <div>
      <PageHeader
        title={g.menuLabel}
        description={`${g.legalName} — ${g.role}`}
      />
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-12">
        {g.website ? (
          <p className="text-sm">
            <a
              href={g.website}
              className="font-semibold text-msv-blue underline-offset-2 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              웹사이트 →
            </a>
          </p>
        ) : null}
        <div className={`space-y-4 text-sm leading-relaxed text-slate-600 ${g.website ? "mt-4" : ""} whitespace-pre-line`}>
          {g.intro}
        </div>
        <ul className="mt-8 list-inside list-disc space-y-1.5 border-t border-slate-100 pt-8 text-sm text-slate-600">
          {g.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
        <p className="mt-10 text-sm">
          <Link href="/group" className="font-semibold text-msv-blue underline-offset-2 hover:underline">
            ← 함께하는 회사 목록
          </Link>
        </p>
      </div>
    </div>
  );
}
