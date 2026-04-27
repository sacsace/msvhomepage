import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionTitle } from "@/components/SectionTitle";
import { findGroupCompanyBySlug } from "@/lib/group-companies";
import { staticPageSeo } from "@/lib/seo-metadata";
import { splitIntroParagraphs } from "@/lib/split-intro-paragraphs";
import { groupCompanies } from "@/lib/site-content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return groupCompanies.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const g = findGroupCompanyBySlug(slug);
  if (!g) return { title: "함께하는 회사" };
  return staticPageSeo(`/group/${g.slug}`, {
    title: g.menuLabel,
    absoluteTitle: `${g.menuLabel} | 함께하는 회사`,
    description: `${g.legalName} — ${g.role}`,
  });
}

export default async function GroupCompanyPage({ params }: Props) {
  const { slug } = await params;
  const g = findGroupCompanyBySlug(slug);
  if (!g) notFound();

  const aboutParagraphs = splitIntroParagraphs(g.intro);

  return (
    <div>
      <PageHeader
        title={g.menuLabel}
        description={`${g.legalName} — ${g.role}`}
      />
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
        {g.website || g.profilePdf ? (
          <section className="msv-card rounded-xl p-5 shadow-sm sm:p-6">
            <p className="msv-eyebrow">바로가기</p>
            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {g.website ? (
                <a
                  href={g.website}
                  className="font-semibold text-msv-blue underline-offset-2 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  웹사이트 →
                </a>
              ) : null}
              {g.profilePdf ? (
                <a
                  href={g.profilePdf}
                  className="font-semibold text-msv-blue underline-offset-2 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  비즈니스 소개 PDF →
                </a>
              ) : null}
            </div>
          </section>
        ) : null}

        <section className={g.website || g.profilePdf ? "mt-10 sm:mt-12" : ""}>
          <SectionTitle
            eyebrow="About"
            title="소개"
            spacing="tight"
            density="compact"
            contentWidth="full"
          />
          <div className="mt-4 space-y-4 sm:space-y-5">
            {aboutParagraphs.map((para, i) => (
              <p
                key={`${g.slug}-about-${i}`}
                className="max-w-none text-base leading-relaxed text-pretty text-slate-600 break-keep sm:text-[17px] sm:leading-[1.75]"
              >
                {para}
              </p>
            ))}
          </div>
        </section>

        {g.gallery && g.gallery.length > 0 ? (
          <section className="mt-14 sm:mt-16">
            <SectionTitle
              eyebrow="Gallery"
              title="사진"
              spacing="tight"
              density="compact"
              headingLevel={3}
              contentWidth="full"
            />
            <ul className="mt-6 grid list-none gap-5 sm:grid-cols-2">
              {g.gallery.map((img) => (
                <li
                  key={img.src}
                  className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
                >
                  <div className="relative aspect-[4/3] w-full bg-slate-100">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1152px) 50vw, 560px"
                    />
                  </div>
                  {img.caption ? (
                    <p className="border-t border-slate-100 px-3 py-2.5 text-xs leading-relaxed text-slate-600">
                      {img.caption}
                    </p>
                  ) : null}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section className="mt-14 sm:mt-16">
          <SectionTitle
            eyebrow="Highlights"
            title="주요 내용"
            spacing="tight"
            density="compact"
            contentWidth="full"
          />
          <div className="mt-6 msv-card rounded-xl p-6 shadow-sm sm:p-8">
            <ul className="list-inside list-disc space-y-2 text-sm leading-relaxed text-slate-600">
              {g.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-14 border-t border-slate-200 pt-12 sm:mt-16 sm:pt-14">
          <p className="text-sm text-slate-600">
            <Link href="/group" className="font-semibold text-msv-blue underline-offset-2 hover:underline">
              ← 함께하는 회사 목록
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
}
