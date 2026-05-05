import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { StandardPageBody } from "@/components/layout/StandardPageBody";
import { staticPageSeo } from "@/lib/seo-metadata";
import { softwareLanding } from "@/lib/site-content";

export const metadata: Metadata = staticPageSeo("/software", {
  title: "소프트웨어",
  description: softwareLanding.headerSummary,
});

export default function SoftwarePage() {
  return (
    <>
      <PageHeader
        title="소프트웨어"
        description={softwareLanding.headerSummary}
        descriptionWide
      />
      <StandardPageBody>
        <ul className="grid gap-6 sm:grid-cols-2">
          {softwareLanding.cards.map((c) => (
            <li key={c.href}>
              <Link
                href={c.href}
                className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-msv-blue/35 hover:shadow-md"
              >
                <h2 className="text-lg font-bold text-msv-navy">{c.title}</h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">{c.desc}</p>
                <span className="mt-4 text-sm font-semibold text-msv-blue">자세히 보기 →</span>
              </Link>
            </li>
          ))}
        </ul>
      </StandardPageBody>
    </>
  );
}
